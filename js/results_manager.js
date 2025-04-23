// Test sonuçlarını gizleme ve yönetme modülü
class ResultsManager {
    constructor() {
        // Sistem ayarlarını yükle
        this.loadSettings();
        
        // Sonuç görünürlük ayarları
        this.visibilitySettings = {
            admin_only: "Sadece Admin",
            evaluator: "Değerlendiren Kişi",
            both: "Her İkisi"
        };
    }
    
    // Sistem ayarlarını yükle
    loadSettings() {
        const settingsJson = localStorage.getItem('systemSettings');
        this.settings = settingsJson ? JSON.parse(settingsJson) : {
            resultVisibility: 'admin_only', // Varsayılan: Sadece admin görebilir
            dataRetention: 'unlimited'      // Varsayılan: Sınırsız veri saklama
        };
        
        // Ayarları kaydet (eğer yoksa)
        if (!settingsJson) {
            localStorage.setItem('systemSettings', JSON.stringify(this.settings));
        }
    }
    
    // Sonuç görünürlük ayarını güncelle
    updateVisibilitySetting(visibility) {
        if (this.visibilitySettings.hasOwnProperty(visibility)) {
            this.settings.resultVisibility = visibility;
            localStorage.setItem('systemSettings', JSON.stringify(this.settings));
            return true;
        }
        return false;
    }
    
    // Veri saklama süresini güncelle
    updateDataRetentionSetting(retention) {
        const validRetentions = ['30', '90', '180', '365', 'unlimited'];
        if (validRetentions.includes(retention)) {
            this.settings.dataRetention = retention;
            localStorage.setItem('systemSettings', JSON.stringify(this.settings));
            
            // Eski verileri temizle
            if (retention !== 'unlimited') {
                this.cleanupOldData(parseInt(retention));
            }
            
            return true;
        }
        return false;
    }
    
    // Eski verileri temizle
    cleanupOldData(retentionDays) {
        const evaluationsJson = localStorage.getItem('evaluations');
        if (!evaluationsJson) return;
        
        const evaluations = JSON.parse(evaluationsJson);
        const now = new Date();
        const cutoffDate = new Date(now.setDate(now.getDate() - retentionDays));
        
        // Belirtilen günden eski değerlendirmeleri filtrele
        const filteredEvaluations = evaluations.filter(eval => {
            const evalDate = new Date(eval.date);
            return evalDate >= cutoffDate;
        });
        
        // Güncellenmiş değerlendirmeleri kaydet
        localStorage.setItem('evaluations', JSON.stringify(filteredEvaluations));
    }
    
    // Değerlendirme sonucunu kaydet
    saveEvaluationResult(evaluation) {
        if (!evaluation) return false;
        
        // Değerlendirme ID'si oluştur
        evaluation.id = this.generateUniqueId();
        
        // Değerlendirme tarihini ekle
        evaluation.date = new Date().toISOString();
        
        // Mevcut değerlendirmeleri yükle
        const evaluationsJson = localStorage.getItem('evaluations');
        const evaluations = evaluationsJson ? JSON.parse(evaluationsJson) : [];
        
        // Yeni değerlendirmeyi ekle
        evaluations.push(evaluation);
        
        // Değerlendirmeleri kaydet
        localStorage.setItem('evaluations', JSON.stringify(evaluations));
        
        return evaluation.id;
    }
    
    // Değerlendirme sonucunu getir
    getEvaluationResult(id) {
        const evaluationsJson = localStorage.getItem('evaluations');
        if (!evaluationsJson) return null;
        
        const evaluations = JSON.parse(evaluationsJson);
        return evaluations.find(eval => eval.id === id);
    }
    
    // Tüm değerlendirme sonuçlarını getir
    getAllEvaluationResults() {
        const evaluationsJson = localStorage.getItem('evaluations');
        return evaluationsJson ? JSON.parse(evaluationsJson) : [];
    }
    
    // Değerlendirme sonucunu sil
    deleteEvaluationResult(id) {
        const evaluationsJson = localStorage.getItem('evaluations');
        if (!evaluationsJson) return false;
        
        const evaluations = JSON.parse(evaluationsJson);
        const updatedEvaluations = evaluations.filter(eval => eval.id !== id);
        
        // Değerlendirme bulunamadıysa false döndür
        if (updatedEvaluations.length === evaluations.length) return false;
        
        // Güncellenmiş değerlendirmeleri kaydet
        localStorage.setItem('evaluations', JSON.stringify(updatedEvaluations));
        
        return true;
    }
    
    // Tüm değerlendirme sonuçlarını sil
    deleteAllEvaluationResults() {
        localStorage.removeItem('evaluations');
        return true;
    }
    
    // Sonuç görünürlüğünü kontrol et
    checkResultVisibility(evaluatorName) {
        // Admin her zaman sonuçları görebilir
        const adminAuth = localStorage.getItem('adminAuth');
        if (adminAuth) {
            try {
                const auth = JSON.parse(adminAuth);
                if (auth && auth.isLoggedIn) {
                    return true;
                }
            } catch (e) {
                console.error('Error parsing admin auth:', e);
            }
        }
        
        // Ayarlara göre görünürlüğü kontrol et
        switch (this.settings.resultVisibility) {
            case 'admin_only':
                return false; // Sadece admin görebilir
            case 'evaluator':
                return evaluatorName ? true : false; // Değerlendiren kişi görebilir
            case 'both':
                return true; // Herkes görebilir
            default:
                return false;
        }
    }
    
    // Benzersiz ID oluştur
    generateUniqueId() {
        return 'eval_' + Date.now() + '_' + Math.random().toString(36).substr(2, 9);
    }
}

// Sonuç yönlendirme işleyicisi
class ResultRedirector {
    constructor(resultsManager) {
        this.resultsManager = resultsManager;
    }
    
    // Değerlendirme tamamlandığında çağrılır
    handleEvaluationComplete(evaluation, evaluatorName) {
        // Değerlendirme sonucunu kaydet
        const evaluationId = this.resultsManager.saveEvaluationResult(evaluation);
        
        // Sonuç görünürlüğünü kontrol et
        const canViewResults = this.resultsManager.checkResultVisibility(evaluatorName);
        
        if (canViewResults) {
            // Sonuçları göster
            return {
                showResults: true,
                evaluationId: evaluationId,
                evaluation: evaluation
            };
        } else {
            // Sonuçları gizle, teşekkür mesajı göster
            return {
                showResults: false,
                evaluationId: evaluationId,
                message: "Değerlendirmeniz başarıyla kaydedildi. Sonuçlar yönetici tarafından incelenecektir. Teşekkür ederiz!"
            };
        }
    }
    
    // Değerlendirme sonuçlarını görüntüleme isteği
    requestResultsView(evaluationId, evaluatorName) {
        // Sonuç görünürlüğünü kontrol et
        const canViewResults = this.resultsManager.checkResultVisibility(evaluatorName);
        
        if (canViewResults) {
            // Değerlendirme sonucunu getir
            const evaluation = this.resultsManager.getEvaluationResult(evaluationId);
            
            if (evaluation) {
                return {
                    showResults: true,
                    evaluation: evaluation
                };
            } else {
                return {
                    showResults: false,
                    error: "Değerlendirme bulunamadı."
                };
            }
        } else {
            return {
                showResults: false,
                error: "Bu değerlendirme sonuçlarını görüntüleme yetkiniz bulunmamaktadır."
            };
        }
    }
}

// Modülleri dışa aktar
if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
        ResultsManager,
        ResultRedirector
    };
}
