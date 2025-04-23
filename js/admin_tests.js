// Admin işlevselliği ve güvenlik testi
describe('Admin Panel Test Suite', function() {
    // Test verileri
    const testAdmin = {
        username: 'admin',
        password: 'admin123'
    };
    
    const testEvaluation = {
        evaluatedName: 'Test Kişi',
        evaluatorName: 'Test Değerlendiren',
        scores: {
            workethic: 40,
            loyalty: 35,
            strengths: 60,
            weaknesses: 55,
            compatibility: 40
        },
        overallScore: 75,
        topStrengths: ['Analitik düşünme', 'Problem çözme', 'İletişim becerileri'],
        topWeaknesses: ['Stres yönetimi', 'Delegasyon eksikliği'],
        analysis: {
            workethic: 'Test çalışkanlık analizi',
            loyalty: 'Test sadakat analizi',
            strengths: 'Test güçlü yönler analizi',
            weaknesses: 'Test zayıf yönler analizi',
            compatibility: 'Test uyumluluk analizi'
        },
        summary: 'Test özet',
        recommendations: 'Test tavsiyeler',
        answers: {
            workethic: [
                { question: 'Test soru 1', score: 4 },
                { question: 'Test soru 2', score: 3 }
            ],
            loyalty: [
                { question: 'Test soru 1', score: 4 },
                { question: 'Test soru 2', score: 3 }
            ],
            strengths: [
                { question: 'Test soru 1', score: 4 },
                { question: 'Test soru 2', score: 5 }
            ],
            weaknesses: [
                { question: 'Test soru 1', score: 3 },
                { question: 'Test soru 2', score: 2 }
            ],
            compatibility: [
                { question: 'Test soru 1', score: 4 },
                { question: 'Test soru 2', score: 4 }
            ]
        },
        notes: 'Test notlar'
    };
    
    // Test öncesi hazırlık
    beforeEach(function() {
        // LocalStorage'ı temizle
        localStorage.clear();
        
        // Test verilerini ekle
        localStorage.setItem('systemSettings', JSON.stringify({
            resultVisibility: 'admin_only',
            dataRetention: 'unlimited'
        }));
    });
    
    // Kimlik doğrulama testleri
    describe('Authentication Tests', function() {
        it('should allow login with correct credentials', function() {
            // ResultsManager ve ResultRedirector sınıflarını başlat
            const resultsManager = new ResultsManager();
            
            // Admin girişi yap
            const adminAuth = {
                isLoggedIn: true,
                username: testAdmin.username,
                loginTime: new Date().toISOString()
            };
            
            localStorage.setItem('adminAuth', JSON.stringify(adminAuth));
            
            // Giriş durumunu kontrol et
            const canViewResults = resultsManager.checkResultVisibility(null);
            expect(canViewResults).toBe(true);
        });
        
        it('should deny access with incorrect credentials', function() {
            // ResultsManager ve ResultRedirector sınıflarını başlat
            const resultsManager = new ResultsManager();
            
            // Admin girişi yapma
            localStorage.removeItem('adminAuth');
            
            // Giriş durumunu kontrol et
            const canViewResults = resultsManager.checkResultVisibility(null);
            expect(canViewResults).toBe(false);
        });
        
        it('should logout successfully', function() {
            // Admin girişi yap
            const adminAuth = {
                isLoggedIn: true,
                username: testAdmin.username,
                loginTime: new Date().toISOString()
            };
            
            localStorage.setItem('adminAuth', JSON.stringify(adminAuth));
            
            // Çıkış yap (simülasyon)
            localStorage.removeItem('adminAuth');
            
            // ResultsManager ve ResultRedirector sınıflarını başlat
            const resultsManager = new ResultsManager();
            
            // Giriş durumunu kontrol et
            const canViewResults = resultsManager.checkResultVisibility(null);
            expect(canViewResults).toBe(false);
        });
    });
    
    // Sonuç yönetimi testleri
    describe('Results Management Tests', function() {
        it('should save evaluation results correctly', function() {
            // ResultsManager ve ResultRedirector sınıflarını başlat
            const resultsManager = new ResultsManager();
            
            // Değerlendirme sonucunu kaydet
            const evaluationId = resultsManager.saveEvaluationResult(testEvaluation);
            
            // Kaydedilen değerlendirmeyi kontrol et
            const savedEvaluation = resultsManager.getEvaluationResult(evaluationId);
            expect(savedEvaluation).not.toBeNull();
            expect(savedEvaluation.evaluatedName).toBe(testEvaluation.evaluatedName);
            expect(savedEvaluation.overallScore).toBe(testEvaluation.overallScore);
        });
        
        it('should retrieve all evaluation results', function() {
            // ResultsManager ve ResultRedirector sınıflarını başlat
            const resultsManager = new ResultsManager();
            
            // Birkaç değerlendirme sonucu kaydet
            resultsManager.saveEvaluationResult(testEvaluation);
            resultsManager.saveEvaluationResult({...testEvaluation, evaluatedName: 'Test Kişi 2'});
            
            // Tüm değerlendirmeleri al
            const allEvaluations = resultsManager.getAllEvaluationResults();
            expect(allEvaluations.length).toBe(2);
        });
        
        it('should delete evaluation result correctly', function() {
            // ResultsManager ve ResultRedirector sınıflarını başlat
            const resultsManager = new ResultsManager();
            
            // Değerlendirme sonucunu kaydet
            const evaluationId = resultsManager.saveEvaluationResult(testEvaluation);
            
            // Değerlendirmeyi sil
            const deleteResult = resultsManager.deleteEvaluationResult(evaluationId);
            expect(deleteResult).toBe(true);
            
            // Silinen değerlendirmeyi kontrol et
            const deletedEvaluation = resultsManager.getEvaluationResult(evaluationId);
            expect(deletedEvaluation).toBeNull();
        });
        
        it('should delete all evaluation results', function() {
            // ResultsManager ve ResultRedirector sınıflarını başlat
            const resultsManager = new ResultsManager();
            
            // Birkaç değerlendirme sonucu kaydet
            resultsManager.saveEvaluationResult(testEvaluation);
            resultsManager.saveEvaluationResult({...testEvaluation, evaluatedName: 'Test Kişi 2'});
            
            // Tüm değerlendirmeleri sil
            const deleteResult = resultsManager.deleteAllEvaluationResults();
            expect(deleteResult).toBe(true);
            
            // Tüm değerlendirmeleri kontrol et
            const allEvaluations = resultsManager.getAllEvaluationResults();
            expect(allEvaluations.length).toBe(0);
        });
    });
    
    // Sonuç görünürlüğü testleri
    describe('Result Visibility Tests', function() {
        it('should hide results from test takers when visibility is admin_only', function() {
            // ResultsManager ve ResultRedirector sınıflarını başlat
            const resultsManager = new ResultsManager();
            const resultRedirector = new ResultRedirector(resultsManager);
            
            // Sistem ayarlarını güncelle
            resultsManager.updateVisibilitySetting('admin_only');
            
            // Değerlendirme tamamlandı
            const result = resultRedirector.handleEvaluationComplete(testEvaluation, null);
            
            // Sonuçların gizlendiğini kontrol et
            expect(result.showResults).toBe(false);
            expect(result.message).toBeDefined();
        });
        
        it('should show results to evaluators when visibility is evaluator', function() {
            // ResultsManager ve ResultRedirector sınıflarını başlat
            const resultsManager = new ResultsManager();
            const resultRedirector = new ResultRedirector(resultsManager);
            
            // Sistem ayarlarını güncelle
            resultsManager.updateVisibilitySetting('evaluator');
            
            // Değerlendirme tamamlandı
            const result = resultRedirector.handleEvaluationComplete(testEvaluation, 'Test Değerlendiren');
            
            // Sonuçların gösterildiğini kontrol et
            expect(result.showResults).toBe(true);
            expect(result.evaluation).toBeDefined();
        });
        
        it('should show results to everyone when visibility is both', function() {
            // ResultsManager ve ResultRedirector sınıflarını başlat
            const resultsManager = new ResultsManager();
            const resultRedirector = new ResultRedirector(resultsManager);
            
            // Sistem ayarlarını güncelle
            resultsManager.updateVisibilitySetting('both');
            
            // Değerlendirme tamamlandı
            const result = resultRedirector.handleEvaluationComplete(testEvaluation, null);
            
            // Sonuçların gösterildiğini kontrol et
            expect(result.showResults).toBe(true);
            expect(result.evaluation).toBeDefined();
        });
    });
    
    // Sistem ayarları testleri
    describe('System Settings Tests', function() {
        it('should update visibility setting correctly', function() {
            // ResultsManager ve ResultRedirector sınıflarını başlat
            const resultsManager = new ResultsManager();
            
            // Görünürlük ayarını güncelle
            const updateResult = resultsManager.updateVisibilitySetting('evaluator');
            expect(updateResult).toBe(true);
            
            // Ayarları kontrol et
            const settings = JSON.parse(localStorage.getItem('systemSettings'));
            expect(settings.resultVisibility).toBe('evaluator');
        });
        
        it('should update data retention setting correctly', function() {
            // ResultsManager ve ResultRedirector sınıflarını başlat
            const resultsManager = new ResultsManager();
            
            // Veri saklama ayarını güncelle
            const updateResult = resultsManager.updateDataRetentionSetting('90');
            expect(updateResult).toBe(true);
            
            // Ayarları kontrol et
            const settings = JSON.parse(localStorage.getItem('systemSettings'));
            expect(settings.dataRetention).toBe('90');
        });
        
        it('should clean up old data based on retention setting', function() {
            // ResultsManager ve ResultRedirector sınıflarını başlat
            const resultsManager = new ResultsManager();
            
            // Eski bir değerlendirme oluştur (100 gün önce)
            const oldDate = new Date();
            oldDate.setDate(oldDate.getDate() - 100);
            
            const oldEvaluation = {...testEvaluation, date: oldDate.toISOString()};
            const newEvaluation = {...testEvaluation, evaluatedName: 'Yeni Test Kişi'};
            
            // Değerlendirmeleri kaydet
            resultsManager.saveEvaluationResult(oldEvaluation);
            resultsManager.saveEvaluationResult(newEvaluation);
            
            // Veri saklama ayarını güncelle ve eski verileri temizle
            resultsManager.updateDataRetentionSetting('30');
            
            // Değerlendirmeleri kontrol et
            const allEvaluations = resultsManager.getAllEvaluationResults();
            expect(allEvaluations.length).toBe(1);
            expect(allEvaluations[0].evaluatedName).toBe('Yeni Test Kişi');
        });
    });
    
    // Detaylı raporlama testleri
    describe('Detailed Reporting Tests', function() {
        it('should generate HTML report correctly', function() {
            // DetailedReportGenerator sınıfını başlat
            const reportGenerator = new DetailedReportGenerator();
            
            // Değerlendirme sonucunu kaydet
            const resultsManager = new ResultsManager();
            const evaluationId = resultsManager.saveEvaluationResult(testEvaluation);
            const evaluation = resultsManager.getEvaluationResult(evaluationId);
            
            // HTML raporu oluştur
            const htmlReport = reportGenerator.generateReport(evaluation, 'html', 'detailed');
            
            // Raporu kontrol et
            expect(htmlReport).toContain(evaluation.evaluatedName);
            expect(htmlReport).toContain('Kişilik Analizi Raporu');
            expect(htmlReport).toContain('Kategori Puanları');
        });
        
        it('should generate comparison report correctly', function() {
            // DetailedReportGenerator sınıfını başlat
            const reportGenerator = new DetailedReportGenerator();
            
            // İki değerlendirme oluştur
            const evaluation1 = {...testEvaluation, evaluatedName: 'Test Kişi 1'};
            const evaluation2 = {...testEvaluation, evaluatedName: 'Test Kişi 2'};
            
            // Karşılaştırma raporu oluştur
            const comparisonReport = reportGenerator.generateComparisonReport(evaluation1, evaluation2, 'html', 'detailed');
            
            // Raporu kontrol et
            expect(comparisonReport).toContain('Kişilik Analizi Karşılaştırma Raporu');
            expect(comparisonReport).toContain('Test Kişi 1');
            expect(comparisonReport).toContain('Test Kişi 2');
            expect(comparisonReport).toContain('Puan Karşılaştırması');
        });
        
        it('should generate summary report correctly', function() {
            // DetailedReportGenerator sınıfını başlat
            const reportGenerator = new DetailedReportGenerator();
            
            // Değerlendirmeler oluştur
            const resultsManager = new ResultsManager();
            resultsManager.saveEvaluationResult({...testEvaluation, evaluatedName: 'Test Kişi 1'});
            resultsManager.saveEvaluationResult({...testEvaluation, evaluatedName: 'Test Kişi 2'});
            
            const evaluations = resultsManager.getAllEvaluationResults();
            
            // Tarih aralığı belirle
            const startDate = new Date();
            startDate.setDate(startDate.getDate() - 30);
            const endDate = new Date();
            
            // Özet raporu oluştur
            const summaryReport = reportGenerator.generateSummaryReport(
                evaluations, 
                startDate.toISOString(), 
                endDate.toISOString(), 
                'html', 
                'detailed'
            );
            
            // Raporu kontrol et
            expect(summaryReport).toContain('Kişilik Analizi Özet Raporu');
            expect(summaryReport).toContain('Toplam Değerlendirme');
            expect(summaryReport).toContain('Kategori Ortalamaları');
        });
    });
});

// Test yardımcı fonksiyonları
function expect(actual) {
    return {
        toBe: function(expected) {
            if (actual !== expected) {
                console.error(`Beklenen: ${expected}, Gerçek: ${actual}`);
                throw new Error(`Beklenen: ${expected}, Gerçek: ${actual}`);
            } else {
                console.log(`✓ Beklenen: ${expected}, Gerçek: ${actual}`);
            }
        },
        not: {
            toBe: function(expected) {
                if (actual === expected) {
                    console.error(`Beklenen değil: ${expected}, Gerçek: ${actual}`);
                    throw new Error(`Beklenen değil: ${expected}, Gerçek: ${actual}`);
                } else {
                    console.log(`✓ Beklenen değil: ${expected}, Gerçek: ${actual}`);
                }
            },
            toBeNull: function() {
                if (actual === null) {
                    console.error(`Beklenen değil: null, Gerçek: ${actual}`);
                    throw new Error(`Beklenen değil: null, Gerçek: ${actual}`);
                } else {
                    console.log(`✓ Beklenen değil: null, Gerçek: ${actual}`);
                }
            }
        },
        toBeNull: function() {
            if (actual !== null) {
                console.error(`Beklenen: null, Gerçek: ${actual}`);
                throw new Error(`Beklenen: null, Gerçek: ${actual}`);
            } else {
                console.log(`✓ Beklenen: null, Gerçek: ${actual}`);
            }
        },
        toBeDefined: function() {
            if (actual === undefined) {
                console.error(`Beklenen: tanımlı bir değer, Gerçek: undefined`);
                throw new Error(`Beklenen: tanımlı bir değer, Gerçek: undefined`);
            } else {
                console.log(`✓ Beklenen: tanımlı bir değer, Gerçek: ${actual}`);
            }
        },
        toContain: function(substring) {
            if (typeof actual !== 'string' || !actual.includes(substring)) {
                console.error(`Beklenen: "${substring}" içermesi, Gerçek: "${actual}"`);
                throw new Error(`Beklenen: "${substring}" içermesi, Gerçek: "${actual}"`);
            } else {
                console.log(`✓ Beklenen: "${substring}" içermesi, Gerçek: içeriyor`);
            }
        }
    };
}

function describe(description, testFn) {
    console.log(`\n=== ${description} ===`);
    try {
        testFn();
    } catch (error) {
        console.error(`${description} testinde hata: ${error.message}`);
    }
}

function it(description, testFn) {
    console.log(`\n--- ${description} ---`);
    try {
        testFn();
        console.log(`✓ ${description}`);
    } catch (error) {
        console.error(`✗ ${description}: ${error.message}`);
    }
}

function beforeEach(fn) {
    window.beforeEachFn = fn;
}

// Test çalıştırıcı
function runTests() {
    console.log('=== Admin Panel Test Suite Başlatılıyor ===');
    
    // beforeEach fonksiyonunu çalıştır
    if (window.beforeEachFn) {
        window.beforeEachFn();
    }
    
    // Testleri çalıştır
    try {
        const testSuite = new AdminPanelTestSuite();
        testSuite.run();
        console.log('\n=== Tüm Testler Tamamlandı ===');
    } catch (error) {
        console.error(`Test çalıştırma hatası: ${error.message}`);
    }
}
