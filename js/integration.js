// Mevcut uygulama ile admin paneli entegrasyonu
document.addEventListener('DOMContentLoaded', function() {
    // Sonuç yöneticisini başlat
    const resultsManager = new ResultsManager();
    const resultRedirector = new ResultRedirector(resultsManager);
    
    // Değerlendirme formunu bul
    const evaluationForm = document.getElementById('personality-form');
    
    if (evaluationForm) {
        // Form gönderimini yakala
        evaluationForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Form verilerini topla
            const formData = new FormData(evaluationForm);
            const evaluatedName = formData.get('evaluatedName');
            const evaluatorName = formData.get('evaluatorName');
            
            // Değerlendirme sonuçlarını hesapla
            const evaluation = calculateEvaluationResults(formData);
            
            // Değerlendirme tamamlandı, sonuçları yönet
            const result = resultRedirector.handleEvaluationComplete(evaluation, evaluatorName);
            
            if (result.showResults) {
                // Sonuçları göster
                showResults(result.evaluation);
            } else {
                // Teşekkür mesajı göster
                showThankYouMessage(result.message, result.evaluationId);
            }
        });
    }
    
    // Admin paneline yönlendirme bağlantısı ekle
    addAdminLink();
});

// Admin paneline yönlendirme bağlantısı ekle
function addAdminLink() {
    const footer = document.querySelector('footer');
    
    if (footer) {
        // Admin bağlantısı oluştur
        const adminLink = document.createElement('p');
        adminLink.innerHTML = '<a href="admin.html" target="_blank">Yönetici Paneli</a>';
        
        // Footer'a ekle
        footer.appendChild(adminLink);
    }
}

// Değerlendirme sonuçlarını hesapla
function calculateEvaluationResults(formData) {
    // Bu fonksiyon mevcut script.js dosyasındaki hesaplama mantığını kullanır
    // Burada sadece örnek bir yapı gösterilmiştir
    
    // Değerlendirilen ve değerlendiren kişi bilgileri
    const evaluatedName = formData.get('evaluatedName');
    const evaluatorName = formData.get('evaluatorName');
    
    // Kategori puanlarını hesapla
    const workethicScore = calculateCategoryScore(formData, 'workethic');
    const loyaltyScore = calculateCategoryScore(formData, 'loyalty');
    const strengthsScore = calculateCategoryScore(formData, 'strengths');
    const weaknessesScore = calculateCategoryScore(formData, 'weaknesses');
    const compatibilityScore = calculateCategoryScore(formData, 'compatibility');
    
    // Genel puanı hesapla
    const overallScore = calculateOverallScore(
        workethicScore, 
        loyaltyScore, 
        strengthsScore, 
        weaknessesScore, 
        compatibilityScore
    );
    
    // Güçlü ve zayıf yönleri belirle
    const topStrengths = determineTopStrengths(formData);
    const topWeaknesses = determineTopWeaknesses(formData);
    
    // Analiz metinlerini oluştur
    const analysis = generateAnalysisTexts(
        workethicScore, 
        loyaltyScore, 
        strengthsScore, 
        weaknessesScore, 
        compatibilityScore
    );
    
    // Özet ve tavsiyeler
    const summary = generateSummary(overallScore, topStrengths, topWeaknesses);
    const recommendations = generateRecommendations(
        workethicScore, 
        loyaltyScore, 
        strengthsScore, 
        weaknessesScore, 
        compatibilityScore,
        topStrengths,
        topWeaknesses
    );
    
    // Soru ve cevapları topla
    const answers = collectAnswers(formData);
    
    // Değerlendirme sonucunu oluştur
    return {
        evaluatedName: evaluatedName,
        evaluatorName: evaluatorName,
        scores: {
            workethic: workethicScore,
            loyalty: loyaltyScore,
            strengths: strengthsScore,
            weaknesses: weaknessesScore,
            compatibility: compatibilityScore
        },
        overallScore: overallScore,
        topStrengths: topStrengths,
        topWeaknesses: topWeaknesses,
        analysis: analysis,
        summary: summary,
        recommendations: recommendations,
        answers: answers,
        notes: formData.get('notes') || ''
    };
}

// Kategori puanını hesapla
function calculateCategoryScore(formData, category) {
    // Bu fonksiyon mevcut script.js dosyasındaki hesaplama mantığını kullanır
    // Burada sadece örnek bir hesaplama gösterilmiştir
    
    // Gerçek uygulamada, formData'dan ilgili kategori sorularının cevaplarını alıp puanı hesaplayın
    // Örnek: Her kategoride 5 soru olduğunu ve her sorunun 0-5 arası puanlandığını varsayalım
    
    let totalScore = 0;
    let questionCount = 0;
    
    // Form verilerini döngüyle kontrol et
    for (const [key, value] of formData.entries()) {
        if (key.startsWith(category + '_q')) {
            totalScore += parseInt(value);
            questionCount++;
        }
    }
    
    // Eğer hiç soru cevaplanmadıysa, varsayılan değerler kullan
    if (questionCount === 0) {
        switch (category) {
            case 'workethic': return 35; // 50 üzerinden
            case 'loyalty': return 30; // 50 üzerinden
            case 'strengths': return 50; // 75 üzerinden
            case 'weaknesses': return 45; // 75 üzerinden
            case 'compatibility': return 35; // 50 üzerinden
            default: return 0;
        }
    }
    
    // Kategori maksimum puanlarını belirle
    const maxScores = {
        workethic: 50,
        loyalty: 50,
        strengths: 75,
        weaknesses: 75,
        compatibility: 50
    };
    
    // Puanı normalize et
    const normalizedScore = (totalScore / (questionCount * 5)) * maxScores[category];
    
    return Math.round(normalizedScore);
}

// Genel puanı hesapla
function calculateOverallScore(workethic, loyalty, strengths, weaknesses, compatibility) {
    // Kategori ağırlıkları
    const weights = {
        workethic: 0.25,
        loyalty: 0.20,
        strengths: 0.25,
        weaknesses: 0.15,
        compatibility: 0.15
    };
    
    // Kategori puanlarını yüzdeye çevir
    const workethicPercent = workethic * 100 / 50;
    const loyaltyPercent = loyalty * 100 / 50;
    const strengthsPercent = strengths * 100 / 75;
    const weaknessesPercent = weaknesses * 100 / 75;
    const compatibilityPercent = compatibility * 100 / 50;
    
    // Ağırlıklı ortalama hesapla
    const overallScore = 
        workethicPercent * weights.workethic +
        loyaltyPercent * weights.loyalty +
        strengthsPercent * weights.strengths +
        weaknessesPercent * weights.weaknesses +
        compatibilityPercent * weights.compatibility;
    
    return Math.round(overallScore);
}

// En güçlü yönleri belirle
function determineTopStrengths(formData) {
    // Gerçek uygulamada, formData'dan güçlü yönleri belirleyin
    // Burada örnek veri döndürüyoruz
    return [
        "Problem çözme becerisi",
        "Analitik düşünme",
        "Takım çalışmasına yatkınlık",
        "İletişim becerileri",
        "Zaman yönetimi"
    ];
}

// En zayıf yönleri belirle
function determineTopWeaknesses(formData) {
    // Gerçek uygulamada, formData'dan zayıf yönleri belirleyin
    // Burada örnek veri döndürüyoruz
    return [
        "Stres yönetimi",
        "Detaylara dikkat",
        "Delegasyon eksikliği",
        "Sabırsızlık",
        "Mükemmeliyetçilik"
    ];
}

// Analiz metinlerini oluştur
function generateAnalysisTexts(workethic, loyalty, strengths, weaknesses, compatibility) {
    // Gerçek uygulamada, puanlara göre analiz metinleri oluşturun
    // Burada örnek metinler döndürüyoruz
    
    return {
        workethic: "Değerlendirilen kişi, çalışkanlık açısından ortalamanın üzerinde bir performans göstermektedir. İşine bağlılığı ve sorumluluk duygusu yüksektir. Zorlu görevleri üstlenmekten çekinmez ve hedeflerine ulaşmak için gerekli çabayı gösterir.",
        
        loyalty: "Sadakat konusunda güvenilir bir profil sergilemektedir. Kuruma ve ekip arkadaşlarına karşı bağlılığı yüksektir. Zor zamanlarda bile destek olmaya devam eder ve verdiği sözleri tutma eğilimindedir.",
        
        strengths: "Güçlü analitik düşünme becerileri ve problem çözme yeteneği öne çıkmaktadır. İletişim becerileri gelişmiştir ve takım çalışmasına yatkındır. Zaman yönetimi konusunda başarılıdır ve öncelikleri belirlemede etkilidir.",
        
        weaknesses: "Stres altında performansı düşebilmektedir. Detaylara dikkat konusunda zaman zaman eksiklikleri olabilir. Delegasyon konusunda zorlanabilir ve mükemmeliyetçi yaklaşımı bazen verimliliğini düşürebilir.",
        
        compatibility: "İş ortaklığı açısından uyumlu bir profil sergilemektedir. İşbirliğine açıktır ve farklı çalışma stillerine adapte olabilir. Ekip içinde dengeli bir rol üstlenebilir ve ortak hedeflere ulaşmak için çaba gösterir."
    };
}

// Özet metni oluştur
function generateSummary(overallScore, topStrengths, topWeaknesses) {
    // Gerçek uygulamada, puana ve özelliklere göre özet oluşturun
    // Burada örnek bir metin döndürüyoruz
    
    return "Değerlendirilen kişi, genel olarak iyi bir performans sergilemektedir. Analitik düşünme ve problem çözme becerileri öne çıkarken, stres yönetimi konusunda gelişim alanı bulunmaktadır. İş ortaklığı için uygun bir profil sergilemekte olup, doğru yönlendirme ile potansiyelini daha da artırabilir.";
}

// Tavsiyeler oluştur
function generateRecommendations(workethic, loyalty, strengths, weaknesses, compatibility, topStrengths, topWeaknesses) {
    // Gerçek uygulamada, puanlara ve özelliklere göre tavsiyeler oluşturun
    // Burada örnek bir metin döndürüyoruz
    
    return `
        <h3>Güçlü Yönleri Geliştirme</h3>
        <p>Problem çözme ve analitik düşünme becerilerini daha karmaşık projelerde kullanarak geliştirmeye devam edebilir. İletişim becerilerini sunum ve müzakere yeteneklerini geliştirerek daha da ilerletebilir.</p>
        
        <h3>Gelişim Alanları</h3>
        <p>Stres yönetimi için mindfulness ve zaman yönetimi teknikleri öğrenilebilir. Detaylara dikkat konusunda kontrol listeleri ve gözden geçirme rutinleri oluşturulabilir. Delegasyon becerilerini geliştirmek için küçük görevlerden başlayarak yetki devri yapabilir.</p>
        
        <h3>İş Ortaklığı Tavsiyeleri</h3>
        <p>Detaylara dikkat eden, sabırlı ve stres yönetimi konusunda güçlü bir iş ortağı ile çalışması faydalı olabilir. Böylece kendi zayıf yönlerini tamamlayacak bir ortaklık kurabilir.</p>
    `;
}

// Soru ve cevapları topla
function collectAnswers(formData) {
    // Gerçek uygulamada, formData'dan tüm soru ve cevapları toplayın
    // Burada örnek veri döndürüyoruz
    
    return {
        workethic: [
            { question: "İş sorumluluklarını zamanında yerine getirir mi?", score: 4 },
            { question: "Zorlu görevleri üstlenmekten kaçınır mı?", score: 2 },
            { question: "Ekstra çaba göstermeye istekli midir?", score: 5 },
            { question: "Kaliteli iş çıkarmak için özen gösterir mi?", score: 4 },
            { question: "Verimli çalışma alışkanlıklarına sahip midir?", score: 3 }
        ],
        loyalty: [
            { question: "Kuruma ve ekibe bağlılık gösterir mi?", score: 4 },
            { question: "Zor zamanlarda destek olur mu?", score: 5 },
            { question: "Verdiği sözleri tutar mı?", score: 4 },
            { question: "Gizli bilgileri korur mu?", score: 5 },
            { question: "Kurum değerlerini benimser mi?", score: 3 }
        ],
        strengths: [
            { question: "Problem çözme becerisi nasıldır?", score: 5 },
            { question: "Analitik düşünme yeteneği var mıdır?", score: 5 },
            { question: "İletişim becerileri nasıldır?", score: 4 },
            { question: "Takım çalışmasına yatkın mıdır?", score: 4 },
            { question: "Zaman yönetimi konusunda başarılı mıdır?", score: 4 }
        ],
        weaknesses: [
            { question: "Stres altında performansı düşer mi?", score: 2 },
            { question: "Detaylara dikkat eder mi?", score: 3 },
            { question: "Görev delegasyonu konusunda zorlanır mı?", score: 2 },
            { question: "Mükemmeliyetçilik sorunu var mıdır?", score: 2 },
            { question: "Eleştiriye açık mıdır?", score: 4 }
        ],
        compatibility: [
            { question: "Farklı çalışma stillerine adapte olabilir mi?", score: 4 },
            { question: "Çatışma çözme becerileri nasıldır?", score: 3 },
            { question: "Ortak hedeflere ulaşmak için işbirliği yapar mı?", score: 4 },
            { question: "Fikir ayrılıklarını yapıcı şekilde yönetir mi?", score: 3 },
            { question: "Güven oluşturma becerisi var mıdır?", score: 4 }
        ]
    };
}

// Sonuçları göster
function showResults(evaluation) {
    // Sonuç sayfasına yönlendir
    window.location.href = `results.html?id=${evaluation.id}`;
}

// Teşekkür mesajı göster
function showThankYouMessage(message, evaluationId) {
    // Mevcut içeriği temizle
    const container = document.querySelector('.container');
    if (container) {
        container.innerHTML = '';
        
        // Teşekkür mesajı oluştur
        const thankYouDiv = document.createElement('div');
        thankYouDiv.className = 'thank-you-message';
        thankYouDiv.innerHTML = `
            <h2>Değerlendirme Tamamlandı</h2>
            <div class="success-icon">
                <i class="fas fa-check-circle"></i>
            </div>
            <p>${message}</p>
            <p>Değerlendirme ID: <strong>${evaluationId}</strong></p>
            <p>Bu ID'yi not alarak daha sonra yöneticinizden sonuçları talep edebilirsiniz.</p>
            <div class="button-container">
                <button class="btn" onclick="window.location.href='index.html'">Ana Sayfaya Dön</button>
            </div>
        `;
        
        // Sayfaya ekle
        container.appendChild(thankYouDiv);
    }
}
