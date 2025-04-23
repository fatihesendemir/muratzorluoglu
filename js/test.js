// Test Senaryoları
class ApplicationTester {
    constructor() {
        this.testResults = {
            passed: 0,
            failed: 0,
            total: 0
        };
        this.testLog = [];
    }
    
    // Test sürecini başlat
    runTests() {
        console.log("Kişilik Analizi Uygulaması Test Süreci Başlatılıyor...");
        
        // Anket akışı testleri
        this.testQuestionnaireFlow();
        
        // Puanlama sistemi testleri
        this.testScoringSystem();
        
        // Sonuç analizi testleri
        this.testResultAnalysis();
        
        // Karşılaştırma özellikleri testleri
        this.testComparisonFeatures();
        
        // Kullanıcı arayüzü testleri
        this.testUserInterface();
        
        // Test sonuçlarını raporla
        this.reportTestResults();
    }
    
    // Test sonucunu kaydet
    logTestResult(testName, passed, message) {
        this.testResults.total++;
        
        if (passed) {
            this.testResults.passed++;
            this.testLog.push({
                name: testName,
                status: 'BAŞARILI',
                message: message
            });
            console.log(`✅ BAŞARILI: ${testName} - ${message}`);
        } else {
            this.testResults.failed++;
            this.testLog.push({
                name: testName,
                status: 'BAŞARISIZ',
                message: message
            });
            console.log(`❌ BAŞARISIZ: ${testName} - ${message}`);
        }
    }
    
    // Anket akışını test et
    testQuestionnaireFlow() {
        console.log("\n--- Anket Akışı Testleri ---");
        
        // Test 1: Tüm adımların doğru sırayla gösterilmesi
        try {
            const steps = document.querySelectorAll('.step');
            const passed = steps.length === 7;
            this.logTestResult(
                "Adım Sayısı Kontrolü", 
                passed, 
                passed ? "Tüm adımlar mevcut (7/7)" : `Eksik adım var (${steps.length}/7)`
            );
        } catch (error) {
            this.logTestResult("Adım Sayısı Kontrolü", false, `Hata: ${error.message}`);
        }
        
        // Test 2: İlerleme çubuğu kontrolü
        try {
            const progressBar = document.getElementById('progress');
            this.logTestResult(
                "İlerleme Çubuğu Kontrolü", 
                !!progressBar, 
                !!progressBar ? "İlerleme çubuğu doğru çalışıyor" : "İlerleme çubuğu bulunamadı"
            );
        } catch (error) {
            this.logTestResult("İlerleme Çubuğu Kontrolü", false, `Hata: ${error.message}`);
        }
        
        // Test 3: Soru sayıları kontrolü
        try {
            const workethicQuestions = document.querySelectorAll('#workethic-questions .question').length;
            const loyaltyQuestions = document.querySelectorAll('#loyalty-questions .question').length;
            const strengthsQuestions = document.querySelectorAll('#strengths-questions .question').length;
            const weaknessesQuestions = document.querySelectorAll('#weaknesses-questions .question').length;
            const compatibilityQuestions = document.querySelectorAll('#compatibility-questions .question').length;
            
            const correctCounts = 
                workethicQuestions === 10 && 
                loyaltyQuestions === 10 && 
                strengthsQuestions === 15 && 
                weaknessesQuestions === 15 && 
                compatibilityQuestions === 10;
                
            this.logTestResult(
                "Soru Sayıları Kontrolü", 
                correctCounts, 
                correctCounts ? 
                    "Tüm kategorilerde doğru sayıda soru var" : 
                    `Soru sayıları hatalı: Çalışkanlık(${workethicQuestions}/10), Sadakat(${loyaltyQuestions}/10), Güçlü Yönler(${strengthsQuestions}/15), Zayıf Yönler(${weaknessesQuestions}/15), Uyumluluk(${compatibilityQuestions}/10)`
            );
        } catch (error) {
            this.logTestResult("Soru Sayıları Kontrolü", false, `Hata: ${error.message}`);
        }
        
        // Test 4: Form validasyonu kontrolü
        try {
            // Validasyon fonksiyonunu test et
            const app = new AppController();
            
            // Boş form için validasyon
            const emptyValidation = !app.validateStep(1);
            
            this.logTestResult(
                "Form Validasyonu Kontrolü", 
                emptyValidation, 
                emptyValidation ? "Form validasyonu doğru çalışıyor" : "Form validasyonu hatalı"
            );
        } catch (error) {
            this.logTestResult("Form Validasyonu Kontrolü", false, `Hata: ${error.message}`);
        }
    }
    
    // Puanlama sistemini test et
    testScoringSystem() {
        console.log("\n--- Puanlama Sistemi Testleri ---");
        
        // Test 1: Kategori puanı hesaplama
        try {
            const analyzer = new PersonalityAnalyzer();
            const testAnswers = [5, 4, 3, 4, 5]; // Örnek cevaplar
            const expectedScore = 21; // 5+4+3+4+5 = 21
            
            const calculatedScore = analyzer.calculateCategoryScore(testAnswers);
            
            this.logTestResult(
                "Kategori Puanı Hesaplama", 
                calculatedScore === expectedScore, 
                calculatedScore === expectedScore ? 
                    `Puan doğru hesaplandı (${calculatedScore})` : 
                    `Puan hesaplama hatası: Beklenen(${expectedScore}), Hesaplanan(${calculatedScore})`
            );
        } catch (error) {
            this.logTestResult("Kategori Puanı Hesaplama", false, `Hata: ${error.message}`);
        }
        
        // Test 2: Kategori yüzdesi hesaplama
        try {
            const analyzer = new PersonalityAnalyzer();
            const testScore = 40;
            const category = 'workethic'; // maxScore: 50
            const expectedPercentage = 80; // (40/50)*100 = 80
            
            const calculatedPercentage = analyzer.calculateCategoryPercentage(testScore, category);
            
            this.logTestResult(
                "Kategori Yüzdesi Hesaplama", 
                calculatedPercentage === expectedPercentage, 
                calculatedPercentage === expectedPercentage ? 
                    `Yüzde doğru hesaplandı (${calculatedPercentage}%)` : 
                    `Yüzde hesaplama hatası: Beklenen(${expectedPercentage}%), Hesaplanan(${calculatedPercentage}%)`
            );
        } catch (error) {
            this.logTestResult("Kategori Yüzdesi Hesaplama", false, `Hata: ${error.message}`);
        }
        
        // Test 3: Kategori seviyesi belirleme
        try {
            const analyzer = new PersonalityAnalyzer();
            
            const lowPercentage = 30;
            const mediumPercentage = 60;
            const highPercentage = 85;
            
            const lowLevel = analyzer.determineCategoryLevel(lowPercentage);
            const mediumLevel = analyzer.determineCategoryLevel(mediumPercentage);
            const highLevel = analyzer.determineCategoryLevel(highPercentage);
            
            const correctLevels = 
                lowLevel === "low" && 
                mediumLevel === "medium" && 
                highLevel === "high";
                
            this.logTestResult(
                "Kategori Seviyesi Belirleme", 
                correctLevels, 
                correctLevels ? 
                    "Seviyeler doğru belirlendi" : 
                    `Seviye belirleme hatası: Düşük(${lowLevel}), Orta(${mediumLevel}), Yüksek(${highLevel})`
            );
        } catch (error) {
            this.logTestResult("Kategori Seviyesi Belirleme", false, `Hata: ${error.message}`);
        }
    }
    
    // Sonuç analizini test et
    testResultAnalysis() {
        console.log("\n--- Sonuç Analizi Testleri ---");
        
        // Test 1: Kişilik profili oluşturma
        try {
            const analyzer = new PersonalityAnalyzer();
            
            // Test verileri
            const testAnswers = {
                workethic: [5, 4, 5, 4, 5, 4, 5, 4, 5, 4],
                loyalty: [4, 5, 4, 5, 4, 5, 4, 5, 4, 5],
                strengths: [5, 4, 5, 4, 5, 4, 5, 4, 5, 4, 5, 4, 5, 4, 5],
                weaknesses: [2, 3, 2, 3, 2, 3, 2, 3, 2, 3, 2, 3, 2, 3, 2],
                compatibility: [4, 5, 4, 5, 4, 5, 4, 5, 4, 5]
            };
            
            const testQuestions = questions;
            
            const testPersonalInfo = {
                name: "Test Kişisi",
                evaluator: "Test Değerlendirici",
                date: "2025-04-23",
                notes: "Test notları"
            };
            
            const profile = analyzer.createPersonalityProfile(testAnswers, testQuestions, testPersonalInfo);
            
            const profileCreated = 
                profile && 
                profile.personalInfo && 
                profile.categoryScores && 
                profile.categoryLevels && 
                profile.categoryAnalysis && 
                profile.topTraits && 
                profile.recommendations && 
                profile.overallSummary;
                
            this.logTestResult(
                "Kişilik Profili Oluşturma", 
                profileCreated, 
                profileCreated ? 
                    "Kişilik profili başarıyla oluşturuldu" : 
                    "Kişilik profili oluşturma hatası"
            );
        } catch (error) {
            this.logTestResult("Kişilik Profili Oluşturma", false, `Hata: ${error.message}`);
        }
        
        // Test 2: En belirgin özellikleri bulma
        try {
            const analyzer = new PersonalityAnalyzer();
            
            // Test verileri
            const testAnswers = [5, 3, 4, 2, 5];
            const testQuestions = [
                "Soru 1",
                "Soru 2",
                "Soru 3",
                "Soru 4",
                "Soru 5"
            ];
            
            const topTraits = analyzer.findTopTraits(testAnswers, testQuestions, 3);
            
            const correctTraits = 
                topTraits.length === 3 && 
                topTraits[0].score === 5 && 
                topTraits[1].score === 5 && 
                topTraits[2].score === 4;
                
            this.logTestResult(
                "En Belirgin Özellikleri Bulma", 
                correctTraits, 
                correctTraits ? 
                    "En belirgin özellikler doğru bulundu" : 
                    "En belirgin özellikleri bulma hatası"
            );
        } catch (error) {
            this.logTestResult("En Belirgin Özellikleri Bulma", false, `Hata: ${error.message}`);
        }
        
        // Test 3: Genel değerlendirme seviyesi belirleme
        try {
            const analyzer = new PersonalityAnalyzer();
            
            const poorPercentage = 20;
            const belowAveragePercentage = 40;
            const averagePercentage = 60;
            const goodPercentage = 75;
            const excellentPercentage = 90;
            
            const poorLevel = analyzer.determineOverallLevel(poorPercentage);
            const belowAverageLevel = analyzer.determineOverallLevel(belowAveragePercentage);
            const averageLevel = analyzer.determineOverallLevel(averagePercentage);
            const goodLevel = analyzer.determineOverallLevel(goodPercentage);
            const excellentLevel = analyzer.determineOverallLevel(excellentPercentage);
            
            const correctLevels = 
                poorLevel === "poor" && 
                belowAverageLevel === "belowAverage" && 
                averageLevel === "average" && 
                goodLevel === "good" && 
                excellentLevel === "excellent";
                
            this.logTestResult(
                "Genel Değerlendirme Seviyesi Belirleme", 
                correctLevels, 
                correctLevels ? 
                    "Genel değerlendirme seviyeleri doğru belirlendi" : 
                    "Genel değerlendirme seviyesi belirleme hatası"
            );
        } catch (error) {
            this.logTestResult("Genel Değerlendirme Seviyesi Belirleme", false, `Hata: ${error.message}`);
        }
    }
    
    // Karşılaştırma özelliklerini test et
    testComparisonFeatures() {
        console.log("\n--- Karşılaştırma Özellikleri Testleri ---");
        
        // Test 1: Profil karşılaştırma
        try {
            const analyzer = new PersonalityAnalyzer();
            
            // Test profilleri
            const profile1 = {
                personalInfo: {
                    name: "Test Kişisi 1"
                },
                categoryScores: {
                    workethic: 40,
                    loyalty: 45,
                    strengths: 60,
                    weaknesses: 30,
                    compatibility: 40
                },
                topTraits: {
                    strengths: [
                        { question: "Güçlü Yön 1" },
                        { question: "Güçlü Yön 2" },
                        { question: "Güçlü Yön 3" }
                    ],
                    weaknesses: [
                        { question: "Zayıf Yön 1" },
                        { question: "Zayıf Yön 2" },
                        { question: "Zayıf Yön 3" }
                    ]
                }
            };
            
            const profile2 = {
                personalInfo: {
                    name: "Test Kişisi 2"
                },
                categoryScores: {
                    workethic: 35,
                    loyalty: 40,
                    strengths: 55,
                    weaknesses: 35,
                    compatibility: 45
                },
                topTraits: {
                    strengths: [
                        { question: "Güçlü Yön 4" },
                        { question: "Güçlü Yön 5" },
                        { question: "Güçlü Yön 6" }
                    ],
                    weaknesses: [
                        { question: "Zayıf Yön 1" }, // Aynı zayıf yön
                        { question: "Zayıf Yön 4" },
                        { question: "Zayıf Yön 5" }
                    ]
                }
            };
            
            const comparison = analyzer.compareProfiles(profile1, profile2);
            
            const comparisonCreated = 
                comparison && 
                comparison.compatibilityScore && 
                comparison.compatibilityPercentage && 
                comparison.compatibilityLevel && 
                comparison.complementaryStrengths && 
                comparison.potentialConflicts && 
                comparison.recommendations;
                
            this.logTestResult(
                "Profil Karşılaştırma", 
                comparisonCreated, 
                comparisonCreated ? 
                    "Profil karşılaştırması başarıyla yapıldı" : 
                    "Profil karşılaştırma hatası"
            );
        } catch (error) {
            this.logTestResult("Profil Karşılaştırma", false, `Hata: ${error.message}`);
        }
        
        // Test 2: Tamamlayıcı güçlü yönleri bulma
        try {
            // Karşılaştırma sonucunda tamamlayıcı güçlü yönlerin doğru tespit edilip edilmediğini kontrol et
            const analyzer = new PersonalityAnalyzer();
            
            // Test profilleri (farklı güçlü yönlere sahip)
            const profile1 = {
                topTraits: {
                    strengths: [
                        { question: "Güçlü Yön 1" },
                        { question: "Güçlü Yön 2" },
                        { question: "Güçlü Yön 3" }
                    ]
                }
            };
            
            const profile2 = {
                topTraits: {
                    strengths: [
                        { question: "Güçlü Yön 4" },
                        { question: "Güçlü Yön 5" },
                        { question: "Güçlü Yön 6" }
                    ]
                }
            };
            
            const comparison = analyzer.compareProfiles(profile1, profile2);
            
            const correctComplementaryStrengths = 
                comparison.complementaryStrengths && 
                comparison.complementaryStrengths.length === 3;
                
            this.logTestResult(
                "Tamamlayıcı Güçlü Yönleri Bulma", 
                correctComplementaryStrengths, 
                correctComplementaryStrengths ? 
                    "Tamamlayıcı güçlü yönler doğru tespit edildi" : 
                    "Tamamlayıcı güçlü yönleri bulma hatası"
            );
        } catch (error) {
            this.logTestResult("Tamamlayıcı Güçlü Yönleri Bulma", false, `Hata: ${error.message}`);
        }
        
        // Test 3: Potansiyel çatışma alanlarını bulma
        try {
            // Karşılaştırma sonucunda potansiyel çatışma alanlarının doğru tespit edilip edilmediğini kontrol et
            const analyzer = new PersonalityAnalyzer();
            
            // Test profilleri (aynı zayıf yönlere sahip)
            const profile1 = {
                topTraits: {
                    weaknesses: [
                        { question: "Zayıf Yön 1" },
                        { question: "Zayıf Yön 2" },
                        { question: "Zayıf Yön 3" }
                    ]
                }
            };
            
            const profile2 = {
                topTraits: {
                    weaknesses: [
                        { question: "Zayıf Yön 1" }, // Aynı zayıf yön
                        { question: "Zayıf Yön 2" }, // Aynı zayıf yön
                        { question: "Zayıf Yön 4" }
                    ]
                }
            };
            
            const comparison = analyzer.compareProfiles(profile1, profile2);
            
            const correctPotentialConflicts = 
                comparison.potentialConflicts && 
                comparison.potentialConflicts.length === 2;
                
            this.logTestResult(
                "Potansiyel Çatışma Alanlarını Bulma", 
                correctPotentialConflicts, 
                correctPotentialConflicts ? 
                    "Potansiyel çatışma alanları doğru tespit edildi" : 
                    "Potansiyel çatışma alanlarını bulma hatası"
            );
        } catch (error) {
            this.logTestResult("Potansiyel Çatışma Alanlarını Bulma", false, `Hata: ${error.message}`);
        }
    }
    
    // Kullanıcı arayüzünü test et
    testUserInterface() {
        console.log("\n--- Kullanıcı Arayüzü Testleri ---");
        
        // Test 1: Responsive tasarım kontrolü
        try {
            const mediaQuery = window.matchMedia('(max-width: 768px)');
            const styleSheets = document.styleSheets;
            
            let hasResponsiveStyles = false;
            
            for (let i = 0; i < styleSheets.length; i++) {
                try {
                    const rules = styleSheets[i].cssRules || styleSheets[i].rules;
                    for (let j = 0; j < rules.length; j++) {
                        if (rules[j].type === CSSRule.MEDIA_RULE && rules[j].conditionText.includes('max-width')) {
                            hasResponsiveStyles = true;
                            break;
                        }
                    }
                } catch (e) {
                    // CORS hatası olabilir, devam et
                }
                
                if (hasResponsiveStyles) break;
            }
            
            this.logTestResult(
                "Responsive Tasarım Kontrolü", 
                hasResponsiveStyles, 
                hasResponsiveStyles ? 
                    "Responsive tasarım özellikleri mevcut" : 
                    "Responsive tasarım özellikleri eksik"
            );
        } catch (error) {
            this.logTestResult("Responsive Tasarım Kontrolü", false, `Hata: ${error.message}`);
        }
        
        // Test 2: Grafik oluşturma kontrolü
        try {
            const hasChartJS = typeof Chart !== 'undefined';
            
            this.logTestResult(
                "Grafik Kütüphanesi Kontrolü", 
                hasChartJS, 
                hasChartJS ? 
                    "Chart.js kütüphanesi doğru yüklenmiş" : 
                    "Chart.js kütüphanesi yüklenemedi"
            );
        } catch (error) {
            this.logTestResult("Grafik Kütüphanesi Kontrolü", false, `Hata: ${error.message}`);
        }
        
        // Test 3: Yazdırma stili kontrolü
        try {
            const styleSheets = document.styleSheets;
            
            let hasPrintStyles = false;
            
            for (let i = 0; i < styleSheets.length; i++) {
                try {
                    const rules = styleSheets[i].cssRules || styleSheets[i].rules;
                    for (let j = 0; j < rules.length; j++) {
                        if (rules[j].type === CSSRule.MEDIA_RULE && rules[j].conditionText.includes('print')) {
                            hasPrintStyles = true;
                            break;
                        }
                    }
                } catch (e) {
                    // CORS hatası olabilir, devam et
                }
                
                if (hasPrintStyles) break;
            }
            
            this.logTestResult(
                "Yazdırma Stili Kontrolü", 
                hasPrintStyles, 
                hasPrintStyles ? 
                    "Yazdırma stilleri mevcut" : 
                    "Yazdırma stilleri eksik"
            );
        } catch (error) {
            this.logTestResult("Yazdırma Stili Kontrolü", false, `Hata: ${error.message}`);
        }
    }
    
    // Test sonuçlarını raporla
    reportTestResults() {
        console.log("\n=== TEST SONUÇLARI ===");
        console.log(`Toplam Test: ${this.testResults.total}`);
        console.log(`Başarılı: ${this.testResults.passed}`);
        console.log(`Başarısız: ${this.testResults.failed}`);
        console.log(`Başarı Oranı: ${Math.round((this.testResults.passed / this.testResults.total) * 100)}%`);
        
        // Test sonuçlarını dosyaya kaydet
        this.saveTestResults();
    }
    
    // Test sonuçlarını dosyaya kaydet
    saveTestResults() {
        const testReport = {
            date: new Date().toISOString(),
            summary: {
                total: this.testResults.total,
                passed: this.testResults.passed,
                failed: this.testResults.failed,
                successRate: Math.round((this.testResults.passed / this.testResults.total) * 100)
            },
            details: this.testLog
        };
        
        // JSON formatında kaydet
        const jsonReport = JSON.stringify(testReport, null, 2);
        
        // LocalStorage'a kaydet
        localStorage.setItem('testReport', jsonReport);
        
        console.log("Test sonuçları kaydedildi.");
    }
}

// Test başlatma fonksiyonu
function startApplicationTest() {
    const tester = new ApplicationTester();
    tester.runTests();
}

// Sayfa yüklendiğinde testleri başlat
document.addEventListener('DOMContentLoaded', function() {
    console.log("Sayfa yüklendi, testler başlatılıyor...");
    startApplicationTest();
});
