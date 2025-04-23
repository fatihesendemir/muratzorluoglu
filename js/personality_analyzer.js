// Kişilik Analizi Algoritması
class PersonalityAnalyzer {
    constructor() {
        this.categories = {
            workethic: {
                name: "Çalışkanlık",
                maxScore: 50,
                questions: 10
            },
            loyalty: {
                name: "Sadakat",
                maxScore: 50,
                questions: 10
            },
            strengths: {
                name: "Güçlü Yönler",
                maxScore: 75,
                questions: 15
            },
            weaknesses: {
                name: "Zayıf Yönler",
                maxScore: 75,
                questions: 15
            },
            compatibility: {
                name: "Uyumluluk",
                maxScore: 50,
                questions: 10
            }
        };
        
        this.evaluationLevels = {
            low: { min: 0, max: 40, name: "Düşük" },
            medium: { min: 40, max: 70, name: "Orta" },
            high: { min: 70, max: 100, name: "Yüksek" }
        };
        
        this.overallLevels = {
            poor: { min: 0, max: 30, name: "Zayıf" },
            belowAverage: { min: 30, max: 50, name: "Ortalamanın Altı" },
            average: { min: 50, max: 70, name: "Ortalama" },
            good: { min: 70, max: 85, name: "İyi" },
            excellent: { min: 85, max: 100, name: "Mükemmel" }
        };
    }
    
    // Kategori puanını hesapla
    calculateCategoryScore(answers) {
        let totalScore = 0;
        
        for (const answer of answers) {
            totalScore += answer;
        }
        
        return totalScore;
    }
    
    // Kategori yüzdesini hesapla
    calculateCategoryPercentage(score, category) {
        return (score / this.categories[category].maxScore) * 100;
    }
    
    // Kategori seviyesini belirle
    determineCategoryLevel(percentage) {
        if (percentage < this.evaluationLevels.medium.min) {
            return "low";
        } else if (percentage < this.evaluationLevels.high.min) {
            return "medium";
        } else {
            return "high";
        }
    }
    
    // Genel değerlendirme seviyesini belirle
    determineOverallLevel(totalPercentage) {
        if (totalPercentage < this.overallLevels.belowAverage.min) {
            return "poor";
        } else if (totalPercentage < this.overallLevels.average.min) {
            return "belowAverage";
        } else if (totalPercentage < this.overallLevels.good.min) {
            return "average";
        } else if (totalPercentage < this.overallLevels.excellent.min) {
            return "good";
        } else {
            return "excellent";
        }
    }
    
    // En yüksek puanlı özellikleri bul
    findTopTraits(answers, questions, count, isWeakness = false) {
        const traits = [];
        
        for (let i = 0; i < answers.length; i++) {
            traits.push({
                question: questions[i],
                score: answers[i]
            });
        }
        
        // Puanlara göre sırala (zayıf yönler için tersten)
        if (isWeakness) {
            traits.sort((a, b) => b.score - a.score);
        } else {
            traits.sort((a, b) => b.score - a.score);
        }
        
        // İlk 'count' kadar özelliği döndür
        return traits.slice(0, count);
    }
    
    // Uyumluluk derecesini hesapla
    calculateCompatibilityDegree(compatibilityScore) {
        const percentage = (compatibilityScore / this.categories.compatibility.maxScore) * 100;
        
        if (percentage < this.evaluationLevels.medium.min) {
            return "Düşük Uyumluluk";
        } else if (percentage < this.evaluationLevels.high.min) {
            return "Orta Uyumluluk";
        } else {
            return "Yüksek Uyumluluk";
        }
    }
    
    // Kişilik profili oluştur
    createPersonalityProfile(allAnswers, questions, personalInfo) {
        const profile = {
            personalInfo: personalInfo,
            categoryScores: {},
            categoryLevels: {},
            categoryAnalysis: {},
            topTraits: {},
            recommendations: {},
            overallSummary: "",
            compatibilityDegree: ""
        };
        
        // Kategori puanlarını hesapla
        for (const category in this.categories) {
            profile.categoryScores[category] = this.calculateCategoryScore(allAnswers[category]);
        }
        
        // Kategori seviyelerini belirle
        for (const category in this.categories) {
            const percentage = this.calculateCategoryPercentage(profile.categoryScores[category], category);
            profile.categoryLevels[category] = this.determineCategoryLevel(percentage);
        }
        
        // Kategori analizlerini oluştur
        for (const category in this.categories) {
            profile.categoryAnalysis[category] = evaluationTexts[category][profile.categoryLevels[category]];
        }
        
        // En belirgin özellikleri bul
        profile.topTraits.strengths = this.findTopTraits(allAnswers.strengths, questions.strengths, 5);
        profile.topTraits.weaknesses = this.findTopTraits(allAnswers.weaknesses, questions.weaknesses, 5, true);
        
        // Tavsiyeleri oluştur
        for (const category in this.categories) {
            profile.recommendations[category] = recommendations[category][profile.categoryLevels[category]];
        }
        
        // Uyumluluk derecesini hesapla
        profile.compatibilityDegree = this.calculateCompatibilityDegree(profile.categoryScores.compatibility);
        
        // Genel değerlendirmeyi oluştur
        const totalScore = profile.categoryScores.workethic + 
                          profile.categoryScores.loyalty + 
                          profile.categoryScores.strengths + 
                          (this.categories.weaknesses.maxScore - profile.categoryScores.weaknesses) + 
                          profile.categoryScores.compatibility;
                          
        const maxTotalScore = this.categories.workethic.maxScore + 
                             this.categories.loyalty.maxScore + 
                             this.categories.strengths.maxScore + 
                             this.categories.weaknesses.maxScore + 
                             this.categories.compatibility.maxScore;
                             
        const totalPercentage = (totalScore / maxTotalScore) * 100;
        const overallLevel = this.determineOverallLevel(totalPercentage);
        
        profile.overallSummary = overallSummary[overallLevel];
        profile.overallLevel = overallLevel;
        profile.totalScore = totalScore;
        profile.maxTotalScore = maxTotalScore;
        profile.totalPercentage = totalPercentage;
        
        return profile;
    }
    
    // Karşılaştırmalı analiz yap
    compareProfiles(profile1, profile2) {
        const comparison = {
            compatibilityScore: 0,
            compatibilityPercentage: 0,
            compatibilityLevel: "",
            complementaryStrengths: [],
            potentialConflicts: [],
            recommendations: ""
        };
        
        // Uyumluluk puanını hesapla
        let compatibilityScore = 0;
        
        // Çalışkanlık uyumu (benzer seviyeler daha uyumlu)
        const workethicDiff = Math.abs(profile1.categoryScores.workethic - profile2.categoryScores.workethic);
        compatibilityScore += (this.categories.workethic.maxScore - workethicDiff) / 2;
        
        // Sadakat uyumu (benzer seviyeler daha uyumlu)
        const loyaltyDiff = Math.abs(profile1.categoryScores.loyalty - profile2.categoryScores.loyalty);
        compatibilityScore += (this.categories.loyalty.maxScore - loyaltyDiff) / 2;
        
        // Güçlü yönler uyumu (farklı güçlü yönler daha uyumlu - tamamlayıcı)
        let strengthsComplementary = 0;
        for (const strength1 of profile1.topTraits.strengths) {
            let isComplementary = true;
            for (const strength2 of profile2.topTraits.strengths) {
                if (strength1.question === strength2.question) {
                    isComplementary = false;
                    break;
                }
            }
            if (isComplementary) {
                strengthsComplementary++;
                comparison.complementaryStrengths.push(strength1.question);
            }
        }
        compatibilityScore += strengthsComplementary * 3;
        
        // Zayıf yönler uyumu (farklı zayıf yönler daha uyumlu - tamamlayıcı)
        let weaknessesComplementary = 0;
        for (const weakness1 of profile1.topTraits.weaknesses) {
            let isComplementary = true;
            for (const weakness2 of profile2.topTraits.weaknesses) {
                if (weakness1.question === weakness2.question) {
                    isComplementary = false;
                    comparison.potentialConflicts.push(weakness1.question);
                    break;
                }
            }
            if (isComplementary) {
                weaknessesComplementary++;
            }
        }
        compatibilityScore += weaknessesComplementary * 3;
        
        // Uyumluluk yüzdesini hesapla
        comparison.compatibilityScore = compatibilityScore;
        comparison.compatibilityPercentage = (compatibilityScore / 50) * 100;
        
        // Uyumluluk seviyesini belirle
        if (comparison.compatibilityPercentage < this.evaluationLevels.medium.min) {
            comparison.compatibilityLevel = "low";
        } else if (comparison.compatibilityPercentage < this.evaluationLevels.high.min) {
            comparison.compatibilityLevel = "medium";
        } else {
            comparison.compatibilityLevel = "high";
        }
        
        // Tavsiyeler oluştur
        switch (comparison.compatibilityLevel) {
            case "low":
                comparison.recommendations = "Bu iş ortaklığında önemli uyumsuzluklar bulunmaktadır. Ortaklık kurulması durumunda, iletişim protokolleri oluşturma, çatışma çözüm mekanizmaları geliştirme ve ortak değerler belirleme üzerine yoğun çalışma yapılması önerilir.";
                break;
            case "medium":
                comparison.recommendations = "Bu iş ortaklığında hem uyumlu hem de uyumsuz alanlar bulunmaktadır. Tamamlayıcı güçlü yönlere odaklanarak ve potansiyel çatışma alanlarını önceden belirleyerek başarılı bir ortaklık kurulabilir.";
                break;
            case "high":
                comparison.recommendations = "Bu iş ortaklığı yüksek uyumluluk potansiyeli taşımaktadır. Tamamlayıcı güçlü yönler ve az sayıdaki çatışma alanı, başarılı bir iş ilişkisi için olumlu göstergelerdir.";
                break;
        }
        
        return comparison;
    }
}

// Analiz sonuçlarını görselleştirme
class ResultVisualizer {
    constructor(profile) {
        this.profile = profile;
    }
    
    // Kategori grafiğini oluştur
    createCategoryChart(ctx) {
        return new Chart(ctx, {
            type: 'radar',
            data: {
                labels: ['Çalışkanlık', 'Sadakat', 'Güçlü Yönler', 'Zayıf Yönler', 'Uyumluluk'],
                datasets: [{
                    label: 'Kategori Puanları',
                    data: [
                        (this.profile.categoryScores.workethic / 50) * 100,
                        (this.profile.categoryScores.loyalty / 50) * 100,
                        (this.profile.categoryScores.strengths / 75) * 100,
                        100 - ((this.profile.categoryScores.weaknesses / 75) * 100), // Zayıf yönler için ters çevir
                        (this.profile.categoryScores.compatibility / 50) * 100
                    ],
                    backgroundColor: 'rgba(52, 152, 219, 0.2)',
                    borderColor: 'rgba(52, 152, 219, 1)',
                    borderWidth: 2,
                    pointBackgroundColor: 'rgba(52, 152, 219, 1)',
                    pointBorderColor: '#fff',
                    pointHoverBackgroundColor: '#fff',
                    pointHoverBorderColor: 'rgba(52, 152, 219, 1)'
                }]
            },
            options: {
                scales: {
                    r: {
                        angleLines: {
                            display: true
                        },
                        suggestedMin: 0,
                        suggestedMax: 100
                    }
                },
                plugins: {
                    legend: {
                        display: false
                    }
                }
            }
        });
    }
    
    // Güçlü ve zayıf yönler grafiğini oluştur
    createStrengthsWeaknessesChart(ctx) {
        return new Chart(ctx, {
            type: 'bar',
            data: {
                labels: [
                    ...this.profile.topTraits.strengths.map((trait, index) => `Güçlü ${index + 1}`),
                    ...this.profile.topTraits.weaknesses.map((trait, index) => `Zayıf ${index + 1}`)
                ],
                datasets: [{
                    label: 'Puan',
                    data: [
                        ...this.profile.topTraits.strengths.map(trait => trait.score),
                        ...this.profile.topTraits.weaknesses.map(trait => trait.score)
                    ],
                    backgroundColor: [
                        ...Array(5).fill('rgba(46, 204, 113, 0.7)'),
                        ...Array(5).fill('rgba(231, 76, 60, 0.7)')
                    ],
                    borderColor: [
                        ...Array(5).fill('rgba(46, 204, 113, 1)'),
                        ...Array(5).fill('rgba(231, 76, 60, 1)')
                    ],
                    borderWidth: 1
                }]
            },
            options: {
                scales: {
                    y: {
                        beginAtZero: true,
                        max: 5
                    }
                },
                plugins: {
                    legend: {
                        display: false
                    }
                }
            }
        });
    }
    
    // Uyumluluk ölçeğini güncelle
    updateCompatibilityMeter(meterElement) {
        const compatibilityPercentage = (this.profile.categoryScores.compatibility / 50) * 100;
        meterElement.style.width = `${compatibilityPercentage}%`;
    }
    
    // PDF raporu oluştur
    generatePDFReport() {
        // PDF oluşturma işlemleri (jsPDF gibi bir kütüphane kullanılabilir)
        // Bu fonksiyon ileride geliştirilecek
    }
}

// Veri Yönetimi
class DataManager {
    constructor() {
        this.profiles = [];
    }
    
    // Profil kaydet
    saveProfile(profile) {
        this.profiles.push(profile);
        this.saveToLocalStorage();
    }
    
    // Profilleri yerel depolamadan yükle
    loadProfiles() {
        const savedProfiles = localStorage.getItem('personalityProfiles');
        if (savedProfiles) {
            this.profiles = JSON.parse(savedProfiles);
        }
        return this.profiles;
    }
    
    // Profilleri yerel depolamaya kaydet
    saveToLocalStorage() {
        localStorage.setItem('personalityProfiles', JSON.stringify(this.profiles));
    }
    
    // Profil sil
    deleteProfile(index) {
        this.profiles.splice(index, 1);
        this.saveToLocalStorage();
    }
    
    // Profil güncelle
    updateProfile(index, updatedProfile) {
        this.profiles[index] = updatedProfile;
        this.saveToLocalStorage();
    }
    
    // Profil ara
    searchProfiles(query) {
        return this.profiles.filter(profile => 
            profile.personalInfo.name.toLowerCase().includes(query.toLowerCase())
        );
    }
}

// Uygulama Kontrolcüsü
class AppController {
    constructor() {
        this.analyzer = new PersonalityAnalyzer();
        this.dataManager = new DataManager();
        this.currentProfile = null;
        this.currentStep = 1;
        this.totalSteps = 7;
    }
    
    // Uygulamayı başlat
    initialize() {
        this.createQuestions();
        this.updateProgressBar();
        this.setupEventListeners();
    }
    
    // Soruları oluştur
    createQuestions() {
        this.createCategoryQuestions('workethic', questions.workethic);
        this.createCategoryQuestions('loyalty', questions.loyalty);
        this.createCategoryQuestions('strengths', questions.strengths);
        this.createCategoryQuestions('weaknesses', questions.weaknesses);
        this.createCategoryQuestions('compatibility', questions.compatibility);
    }
    
    // Kategori sorularını oluştur
    createCategoryQuestions(category, questionList) {
        const container = document.getElementById(`${category}-questions`);
        if (!container) return;
        
        container.innerHTML = '';
        
        questionList.forEach((question, index) => {
            const questionDiv = document.createElement('div');
            questionDiv.className = 'question';
            
            const questionText = document.createElement('p');
            questionText.textContent = `${index + 1}. ${question}`;
            questionDiv.appendChild(questionText);
            
            const ratingDiv = document.createElement('div');
            ratingDiv.className = 'rating';
            
            const ratingTexts = ['Kesinlikle katılmıyorum', 'Katılmıyorum', 'Kararsızım', 'Katılıyorum', 'Kesinlikle katılıyorum'];
            
            for (let i = 1; i <= 5; i++) {
                const optionDiv = document.createElement('div');
                optionDiv.className = 'rating-option';
                
                const input = document.createElement('input');
                input.type = 'radio';
                input.name = `${category}-q${index + 1}`;
                input.id = `${category}-q${index + 1}-r${i}`;
                input.value = i;
                
                const label = document.createElement('label');
                label.htmlFor = `${category}-q${index + 1}-r${i}`;
                label.textContent = i;
                
                const ratingText = document.createElement('span');
                ratingText.className = 'rating-text';
                ratingText.textContent = ratingTexts[i - 1];
                
                optionDiv.appendChild(input);
                optionDiv.appendChild(label);
                optionDiv.appendChild(ratingText);
                ratingDiv.appendChild(optionDiv);
            }
            
            questionDiv.appendChild(ratingDiv);
            container.appendChild(questionDiv);
        });
    }
    
    // İlerleme çubuğunu güncelle
    updateProgressBar() {
        const progressBar = document.getElementById('progress');
        if (!progressBar) return;
        
        const progressPercentage = ((this.currentStep - 1) / (this.totalSteps - 1)) * 100;
        progressBar.style.width = `${progressPercentage}%`;
        
        const steps = document.querySelectorAll('.step');
        steps.forEach((step, index) => {
            if (index + 1 < this.currentStep) {
                step.classList.add('completed');
                step.classList.remove('active');
            } else if (index + 1 === this.currentStep) {
                step.classList.add('active');
                step.classList.remove('completed');
            } else {
                step.classList.remove('active');
                step.classList.remove('completed');
            }
        });
    }
    
    // Olay dinleyicilerini ayarla
    setupEventListeners() {
        // İleri butonları
        const nextButtons = document.querySelectorAll('.next-btn');
        nextButtons.forEach(button => {
            button.addEventListener('click', () => {
                if (button.textContent.includes('Sonuçları Göster')) {
                    this.calculateResults();
                } else {
                    this.nextStep();
                }
            });
        });
        
        // Geri butonları
        const prevButtons = document.querySelectorAll('.prev-btn');
        prevButtons.forEach(button => {
            button.addEventListener('click', () => {
                this.prevStep();
            });
        });
        
        // Yazdır butonu
        const printButton = document.querySelector('button[onclick="printResults()"]');
        if (printButton) {
            printButton.addEventListener('click', () => {
                window.print();
            });
        }
        
        // PDF olarak kaydet butonu
        const pdfButton = document.querySelector('button[onclick="saveAsPDF()"]');
        if (pdfButton) {
            pdfButton.addEventListener('click', () => {
                alert('PDF olarak kaydetme özelliği şu anda geliştirme aşamasındadır. Lütfen tarayıcınızın yazdırma özelliğini kullanarak PDF olarak kaydediniz.');
                window.print();
            });
        }
        
        // Yeni değerlendirme butonu
        const resetButton = document.querySelector('button[onclick="resetForm()"]');
        if (resetButton) {
            resetButton.addEventListener('click', () => {
                if (confirm('Tüm değerlendirme verileri silinecek ve yeni bir değerlendirme başlatılacaktır. Devam etmek istiyor musunuz?')) {
                    location.reload();
                }
            });
        }
    }
    
    // Sonraki adıma geç
    nextStep() {
        if (!this.validateStep(this.currentStep)) {
            return;
        }
        
        document.getElementById(`step-${this.currentStep}`).style.display = 'none';
        this.currentStep++;
        document.getElementById(`step-${this.currentStep}`).style.display = 'block';
        this.updateProgressBar();
        window.scrollTo(0, 0);
    }
    
    // Önceki adıma geç
    prevStep() {
        document.getElementById(`step-${this.currentStep}`).style.display = 'none';
        this.currentStep--;
        document.getElementById(`step-${this.currentStep}`).style.display = 'block';
        this.updateProgressBar();
        window.scrollTo(0, 0);
    }
    
    // Adım validasyonu yap
    validateStep(step) {
        if (step === 1) {
            const name = document.getElementById('evaluated-name').value;
            const evaluator = document.getElementById('evaluator-name').value;
            const date = document.getElementById('evaluation-date').value;
            
            if (!name || !evaluator || !date) {
                alert('Lütfen tüm bilgileri doldurunuz.');
                return false;
            }
            return true;
        }
        
        if (step >= 2 && step <= 6) {
            let category;
            switch (step) {
                case 2: category = 'workethic'; break;
                case 3: category = 'loyalty'; break;
                case 4: category = 'strengths'; break;
                case 5: category = 'weaknesses'; break;
                case 6: category = 'compatibility'; break;
            }
            
            const questionCount = questions[category].length;
            let answeredCount = 0;
            
            for (let i = 1; i <= questionCount; i++) {
                const radios = document.getElementsByName(`${category}-q${i}`);
                let answered = false;
                
                for (let j = 0; j < radios.length; j++) {
                    if (radios[j].checked) {
                        answered = true;
                        break;
                    }
                }
                
                if (answered) {
                    answeredCount++;
                }
            }
            
            if (answeredCount < questionCount) {
                alert(`Lütfen tüm soruları yanıtlayınız. (${answeredCount}/${questionCount} tamamlandı)`);
                return false;
            }
            return true;
        }
        
        return true;
    }
    
    // Cevapları topla
    collectAnswers() {
        const allAnswers = {
            workethic: [],
            loyalty: [],
            strengths: [],
            weaknesses: [],
            compatibility: []
        };
        
        // Her kategori için cevapları topla
        for (const category in allAnswers) {
            const questionCount = questions[category].length;
            
            for (let i = 1; i <= questionCount; i++) {
                const radios = document.getElementsByName(`${category}-q${i}`);
                let answer = 0;
                
                for (let j = 0; j < radios.length; j++) {
                    if (radios[j].checked) {
                        answer = parseInt(radios[j].value);
                        break;
                    }
                }
                
                allAnswers[category].push(answer);
            }
        }
        
        return allAnswers;
    }
    
    // Kişisel bilgileri topla
    collectPersonalInfo() {
        return {
            name: document.getElementById('evaluated-name').value,
            evaluator: document.getElementById('evaluator-name').value,
            date: document.getElementById('evaluation-date').value,
            notes: document.getElementById('additional-notes').value
        };
    }
    
    // Sonuçları hesapla
    calculateResults() {
        if (!this.validateStep(this.currentStep)) {
            return;
        }
        
        // Cevapları ve kişisel bilgileri topla
        const allAnswers = this.collectAnswers();
        const personalInfo = this.collectPersonalInfo();
        
        // Kişilik profili oluştur
        this.currentProfile = this.analyzer.createPersonalityProfile(allAnswers, questions, personalInfo);
        
        // Profili kaydet
        this.dataManager.saveProfile(this.currentProfile);
        
        // Sonuçları göster
        this.displayResults();
        
        // Sonraki adıma geç
        this.nextStep();
    }
    
    // Sonuçları göster
    displayResults() {
        if (!this.currentProfile) return;
        
        // Kişi bilgilerini göster
        document.getElementById('result-name').textContent = this.currentProfile.personalInfo.name;
        document.getElementById('result-date').textContent = `Değerlendirme Tarihi: ${this.formatDate(this.currentProfile.personalInfo.date)}`;
        document.getElementById('result-evaluator').textContent = `Değerlendiren: ${this.currentProfile.personalInfo.evaluator}`;
        document.getElementById('additional-notes-display').textContent = this.currentProfile.personalInfo.notes || "Ek not bulunmamaktadır.";
        
        // Kategori puanlarını göster
        document.getElementById('workethic-score').textContent = this.currentProfile.categoryScores.workethic;
        document.getElementById('loyalty-score').textContent = this.currentProfile.categoryScores.loyalty;
        document.getElementById('strengths-score').textContent = this.currentProfile.categoryScores.strengths;
        document.getElementById('weaknesses-score').textContent = this.currentProfile.categoryScores.weaknesses;
        document.getElementById('compatibility-score').textContent = this.currentProfile.categoryScores.compatibility;
        
        // Analizleri göster
        document.getElementById('workethic-analysis').textContent = this.currentProfile.categoryAnalysis.workethic;
        document.getElementById('loyalty-analysis').textContent = this.currentProfile.categoryAnalysis.loyalty;
        document.getElementById('strengths-analysis').textContent = this.currentProfile.categoryAnalysis.strengths;
        document.getElementById('weaknesses-analysis').textContent = this.currentProfile.categoryAnalysis.weaknesses;
        document.getElementById('compatibility-analysis').textContent = this.currentProfile.categoryAnalysis.compatibility;
        
        // Uyumluluk ölçeğini güncelle
        const compatibilityPercentage = (this.currentProfile.categoryScores.compatibility / 50) * 100;
        document.getElementById('compatibility-meter').style.width = `${compatibilityPercentage}%`;
        
        // En yüksek güçlü yönleri göster
        const topStrengthsList = document.getElementById('top-strengths');
        topStrengthsList.innerHTML = '';
        this.currentProfile.topTraits.strengths.forEach(trait => {
            const li = document.createElement('li');
            li.textContent = trait.question;
            topStrengthsList.appendChild(li);
        });
        
        // En belirgin zayıf yönleri göster
        const topWeaknessesList = document.getElementById('top-weaknesses');
        topWeaknessesList.innerHTML = '';
        this.currentProfile.topTraits.weaknesses.forEach(trait => {
            const li = document.createElement('li');
            li.textContent = trait.question;
            topWeaknessesList.appendChild(li);
        });
        
        // Tavsiyeleri göster
        const recommendationsContent = document.getElementById('recommendations-content');
        recommendationsContent.innerHTML = '';
        
        for (const category in this.currentProfile.recommendations) {
            const p = document.createElement('p');
            p.textContent = this.currentProfile.recommendations[category];
            recommendationsContent.appendChild(p);
        }
        
        // Genel değerlendirmeyi göster
        document.getElementById('overall-summary').textContent = this.currentProfile.overallSummary;
        
        // Grafikleri oluştur
        const visualizer = new ResultVisualizer(this.currentProfile);
        
        const categoryChartCtx = document.getElementById('category-chart').getContext('2d');
        if (window.categoryChart) {
            window.categoryChart.destroy();
        }
        window.categoryChart = visualizer.createCategoryChart(categoryChartCtx);
        
        const strengthsWeaknessesChartCtx = document.getElementById('strengths-weaknesses-chart').getContext('2d');
        if (window.strengthsWeaknessesChart) {
            window.strengthsWeaknessesChart.destroy();
        }
        window.strengthsWeaknessesChart = visualizer.createStrengthsWeaknessesChart(strengthsWeaknessesChartCtx);
    }
    
    // Tarihi formatla
    formatDate(dateString) {
        const date = new Date(dateString);
        return date.toLocaleDateString('tr-TR', {
            day: 'numeric',
            month: 'long',
            year: 'numeric'
        });
    }
}

// Uygulama başlatma
document.addEventListener('DOMContentLoaded', function() {
    const app = new AppController();
    app.initialize();
});
