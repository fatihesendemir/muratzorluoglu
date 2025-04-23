// Anket Soruları
const questions = {
    workethic: [
        "Zorlu görevleri bile sonuna kadar götürme eğilimindedir.",
        "Belirlenen son teslim tarihlerine her zaman uyar.",
        "İş kalitesinden ödün vermeden verimli çalışır.",
        "Kendi kendini motive edebilir ve dış motivasyona ihtiyaç duymaz.",
        "Uzun saatler çalışması gerektiğinde şikayet etmeden bunu yapar.",
        "Detaylara dikkat eder ve işini titizlikle tamamlar.",
        "Birden fazla görevi aynı anda etkili bir şekilde yönetebilir.",
        "İşle ilgili bilgi ve becerilerini sürekli geliştirmeye çalışır.",
        "Zor durumlarda bile odaklanmayı sürdürebilir.",
        "İş önceliklerini doğru belirler ve zamanını etkili kullanır."
    ],
    loyalty: [
        "Verdiği sözleri her zaman tutar.",
        "Zor zamanlarda bile ekip arkadaşlarını destekler.",
        "Şirket/proje çıkarlarını kişisel çıkarlarının önünde tutar.",
        "Gizli bilgileri koruma konusunda güvenilirdir.",
        "Uzun vadeli ilişkilere değer verir ve bunları sürdürür.",
        "Ekip kararlarına saygı gösterir, karşı olduğunda bile yapıcı davranır.",
        "Kriz durumlarında bile bağlılığını sürdürür.",
        "Geribildirim ve eleştirilere açıktır.",
        "İş ortaklarına ve müşterilere karşı tutarlı davranır.",
        "Şirket/proje değerlerini içselleştirir ve bunlara uygun davranır."
    ],
    strengths: [
        "Karmaşık problemleri etkili bir şekilde çözebilir.",
        "Yeni ve yaratıcı fikirler üretebilir.",
        "Stresli durumlarda sakin kalabilir.",
        "Etkili iletişim becerileri gösterir.",
        "İnsanları ikna etme ve etkileme yeteneğine sahiptir.",
        "Değişime hızla uyum sağlayabilir.",
        "Stratejik düşünme yeteneği gösterir.",
        "Liderlik özellikleri sergiler.",
        "Analitik düşünme becerisi yüksektir.",
        "Takım çalışmasında etkili performans gösterir.",
        "Finansal konularda bilgili ve dikkatlidir.",
        "Müzakere becerisi güçlüdür.",
        "Teknik uzmanlık alanında derinlemesine bilgiye sahiptir.",
        "Zaman yönetimi konusunda başarılıdır.",
        "Networking becerileri gelişmiştir."
    ],
    weaknesses: [
        "Bazen aşırı mükemmeliyetçilik gösterir.",
        "Eleştiriye karşı savunmacı olabilir.",
        "Risk almaktan kaçınma eğilimindedir.",
        "Karar vermekte zorlanabilir.",
        "Duygusal tepkilerini kontrol etmekte güçlük çekebilir.",
        "Delegasyon konusunda isteksiz olabilir.",
        "Detaylara fazla odaklanıp büyük resmi kaçırabilir.",
        "İş-yaşam dengesi kurmakta zorlanabilir.",
        "Çatışmalardan kaçınma eğilimindedir.",
        "Bazen iletişimde doğrudan olmaktan kaçınabilir.",
        "Teknoloji kullanımında zorluk yaşayabilir.",
        "Finansal konularda dikkatli olmayabilir.",
        "Zaman yönetiminde sorunlar yaşayabilir.",
        "Esneklik göstermekte zorlanabilir.",
        "Yeni fikirlere karşı dirençli olabilir."
    ],
    compatibility: [
        "Ortak hedefler ve vizyonlar konusunda hemfikirdir.",
        "İş değerleri ve etik anlayışı benzerdir.",
        "Karar alma süreçlerinde uyumlu çalışabilir.",
        "Risk toleransı seviyesi benzerdir.",
        "Finansal konularda benzer yaklaşımlara sahiptir.",
        "İletişim tarzları birbirini tamamlayıcıdır.",
        "Çatışma çözme yaklaşımları uyumludur.",
        "Güçlü yönleri birbirini tamamlar niteliktedir.",
        "Zayıf yönleri birbirini dengeleyici niteliktedir.",
        "Uzun vadeli iş ilişkisi potansiyeli yüksektir."
    ]
};

// Değerlendirme Metinleri
const evaluationTexts = {
    workethic: {
        low: "Çalışkanlık konusunda gelişime açık alanlar bulunmaktadır. İş disiplini, motivasyon ve verimlilik alanlarında iyileştirmeler yapılması faydalı olabilir.",
        medium: "Çalışkanlık konusunda ortalama bir performans sergilemektedir. Bazı alanlarda güçlü, bazı alanlarda ise gelişime açık yönleri bulunmaktadır.",
        high: "Çalışkanlık konusunda oldukça güçlü bir profile sahiptir. İş disiplini, motivasyon ve verimlilik açısından üst düzey performans sergilemektedir."
    },
    loyalty: {
        low: "Sadakat ve güvenilirlik konusunda gelişime açık alanlar bulunmaktadır. Bağlılık ve tutarlılık alanlarında iyileştirmeler yapılması faydalı olabilir.",
        medium: "Sadakat konusunda ortalama bir performans sergilemektedir. Bazı durumlarda güçlü bağlılık gösterirken, bazı durumlarda ise daha değişken olabilmektedir.",
        high: "Sadakat ve güvenilirlik konusunda oldukça güçlü bir profile sahiptir. Bağlılık, tutarlılık ve güven oluşturma açısından üst düzey performans sergilemektedir."
    },
    strengths: {
        low: "Belirgin güçlü yönleri sınırlı sayıdadır. Potansiyel güçlü yönlerin geliştirilmesi için çalışmalar yapılması faydalı olabilir.",
        medium: "Çeşitli alanlarda güçlü yönlere sahiptir. Bu güçlü yönlerin daha da geliştirilmesi ve iş ortamında daha etkin kullanılması mümkündür.",
        high: "Çok sayıda belirgin güçlü yöne sahiptir. Bu güçlü yönler iş ortamında büyük avantaj sağlayabilir ve başarılı bir iş ortaklığı için olumlu katkı sunabilir."
    },
    weaknesses: {
        low: "Çok az zayıf yön göstermektedir. Bu durum, ya gerçekten çok az gelişime açık alanı olduğunu ya da öz farkındalığın düşük olabileceğini gösterebilir.",
        medium: "Bazı alanlarda gelişime açık yönleri bulunmaktadır. Bu alanların farkında olunması ve üzerinde çalışılması, kişisel ve profesyonel gelişim için faydalı olacaktır.",
        high: "Çeşitli alanlarda gelişime açık yönleri bulunmaktadır. Bu durum, kişisel farkındalığın yüksek olduğunu gösterebilir. Bu alanların iyileştirilmesi için planlı bir çalışma yapılması önerilir."
    },
    compatibility: {
        low: "İş ortaklığı uyumluluğu düşük seviyededir. Ortak çalışma dinamikleri, değerler ve yaklaşımlar konusunda önemli farklılıklar bulunmaktadır.",
        medium: "İş ortaklığı uyumluluğu orta seviyededir. Bazı alanlarda uyum gösterirken, bazı alanlarda farklılıklar bulunmaktadır. Bu farklılıkların yönetilmesi durumunda başarılı bir ortaklık mümkün olabilir.",
        high: "İş ortaklığı uyumluluğu yüksek seviyededir. Ortak çalışma dinamikleri, değerler ve yaklaşımlar konusunda önemli benzerlikler bulunmaktadır. Başarılı bir iş ortaklığı potansiyeli yüksektir."
    }
};

// Tavsiyeler
const recommendations = {
    workethic: {
        low: "Çalışkanlık alanında gelişim için: Zaman yönetimi teknikleri öğrenme, hedef belirleme alışkanlığı geliştirme ve düzenli geri bildirim alma üzerine odaklanılması önerilir.",
        medium: "Çalışkanlık alanında daha da gelişim için: Güçlü olduğu alanlarda (örn. detay odaklılık) daha da uzmanlaşma, gelişime açık alanlarda ise mentorluk desteği alma üzerine odaklanılması faydalı olabilir.",
        high: "Çalışkanlık alanındaki üstün performansın sürdürülebilirliği için: İş-yaşam dengesi kurma, tükenmişlik sendromunu önleme ve bilgi birikimini aktarma konularına özen gösterilmesi önerilir."
    },
    loyalty: {
        low: "Sadakat alanında gelişim için: Tutarlı davranış kalıpları geliştirme, söz-eylem uyumuna dikkat etme ve güven inşa etme teknikleri üzerine odaklanılması önerilir.",
        medium: "Sadakat alanında daha da gelişim için: İlişki yönetimi becerilerini geliştirme, çatışma çözümü teknikleri öğrenme ve değer odaklı iletişim kurma üzerine odaklanılması faydalı olabilir.",
        high: "Sadakat alanındaki üstün performansın sürdürülebilirliği için: Sınır koyma becerilerini geliştirme, sağlıklı iş ilişkileri kurma ve kişisel değerlerle kurumsal değerleri dengeleme konularına özen gösterilmesi önerilir."
    },
    strengths: {
        low: "Güçlü yönlerin geliştirilmesi için: Yetenek değerlendirme testleri yapma, farklı alanlarda deneyim kazanma ve geri bildirim mekanizmaları kurma üzerine odaklanılması önerilir.",
        medium: "Güçlü yönlerin daha da geliştirilmesi için: Mevcut güçlü yönleri tamamlayıcı beceriler edinme, uzmanlık alanlarını derinleştirme ve bu yönleri daha görünür kılma stratejileri geliştirme üzerine odaklanılması faydalı olabilir.",
        high: "Güçlü yönlerin en iyi şekilde kullanılması için: Bu yönleri iş ortaklığında stratejik avantaja dönüştürme, bilgi ve deneyim aktarımı yapma ve sürekli yenilenme ile güncel kalma konularına özen gösterilmesi önerilir."
    },
    weaknesses: {
        low: "Gelişim alanlarının belirlenmesi için: Daha fazla öz farkındalık çalışması yapma, 360 derece geri bildirim alma ve kör noktaları keşfetme üzerine odaklanılması önerilir.",
        medium: "Gelişim alanlarının iyileştirilmesi için: Öncelikli gelişim alanlarını belirleme, bu alanlarda eğitim ve mentorluk desteği alma ve düzenli ilerleme değerlendirmesi yapma üzerine odaklanılması faydalı olabilir.",
        high: "Gelişim alanlarının yönetilmesi için: Bu alanları dengeleyecek iş ortakları veya ekip üyeleri ile çalışma, gelişim planı oluşturma ve bu alanların iş performansını etkilemesini minimize edecek stratejiler geliştirme konularına özen gösterilmesi önerilir."
    },
    compatibility: {
        low: "Uyumluluk seviyesini artırmak için: Ortak değerler ve hedefler belirleme, iletişim protokolleri oluşturma ve çatışma çözüm mekanizmaları geliştirme üzerine odaklanılması önerilir.",
        medium: "Uyumluluk seviyesini daha da artırmak için: Farklılıkları avantaja çevirme stratejileri geliştirme, düzenli uyum değerlendirme toplantıları yapma ve ortak karar alma süreçlerini netleştirme üzerine odaklanılması faydalı olabilir.",
        high: "Yüksek uyumluluk seviyesini korumak için: Düzenli iletişim ve geri bildirim mekanizmaları kurma, değişen koşullara birlikte adapte olma stratejileri geliştirme ve başarılı ortaklık dinamiklerini dokümante etme konularına özen gösterilmesi önerilir."
    }
};

// Genel Değerlendirme Metinleri
const overallSummary = {
    excellent: "Değerlendirilen kişi, iş ortaklığı için mükemmel bir aday profili sergilemektedir. Çalışkanlık, sadakat, güçlü yönler ve uyumluluk alanlarında üst düzey performans göstermektedir. Zayıf yönleri sınırlı sayıdadır ve bunların çoğu gelişime açıktır. İş ortaklığı potansiyeli oldukça yüksektir.",
    good: "Değerlendirilen kişi, iş ortaklığı için iyi bir aday profili sergilemektedir. Birçok alanda güçlü performans gösterirken, bazı alanlarda gelişime açık yönleri bulunmaktadır. Bu gelişim alanlarının farkında olunması ve yönetilmesi durumunda başarılı bir iş ortaklığı kurulabilir.",
    average: "Değerlendirilen kişi, iş ortaklığı için ortalama bir aday profili sergilemektedir. Güçlü ve zayıf yönleri dengeli bir dağılım göstermektedir. İş ortaklığı kararı verilirken, bu kişinin güçlü yönlerinin iş hedeflerinizle ne kadar uyumlu olduğu ve zayıf yönlerinin ne ölçüde tolere edilebileceği değerlendirilmelidir.",
    belowAverage: "Değerlendirilen kişi, iş ortaklığı için gelişime açık bir aday profili sergilemektedir. Bazı önemli alanlarda düşük performans göstermektedir. İş ortaklığı kararı verilirken, bu kişinin gelişim potansiyeli ve tamamlayıcı becerilere sahip diğer ortakların varlığı göz önünde bulundurulmalıdır.",
    poor: "Değerlendirilen kişi, iş ortaklığı için uygun bir aday profili sergilememektedir. Birçok kritik alanda düşük performans göstermektedir. İş ortaklığı kurulması durumunda önemli zorluklar yaşanabilir. Alternatif adayların değerlendirilmesi önerilir."
};

// Adım Kontrolü için Değişkenler
let currentStep = 1;
const totalSteps = 7;

// DOM Yüklendikten Sonra Çalışacak Fonksiyonlar
document.addEventListener('DOMContentLoaded', function() {
    // Soruları Oluştur
    createQuestions('workethic', questions.workethic);
    createQuestions('loyalty', questions.loyalty);
    createQuestions('strengths', questions.strengths);
    createQuestions('weaknesses', questions.weaknesses);
    createQuestions('compatibility', questions.compatibility);
    
    // İlerleme Çubuğunu Güncelle
    updateProgressBar();
    
    // Adım Etiketlerini Ekle
    const steps = document.querySelectorAll('.step');
    const stepTitles = ['Giriş', 'Çalışkanlık', 'Sadakat', 'Güçlü Yönler', 'Zayıf Yönler', 'Uyumluluk', 'Sonuçlar'];
    steps.forEach((step, index) => {
        step.setAttribute('data-title', stepTitles[index]);
    });
});

// Soruları Oluşturan Fonksiyon
function createQuestions(category, questionList) {
    const container = document.getElementById(`${category}-questions`);
    
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

// İlerleme Çubuğunu Güncelleyen Fonksiyon
function updateProgressBar() {
    const progressBar = document.getElementById('progress');
    const progressPercentage = ((currentStep - 1) / (totalSteps - 1)) * 100;
    progressBar.style.width = `${progressPercentage}%`;
    
    const steps = document.querySelectorAll('.step');
    steps.forEach((step, index) => {
        if (index + 1 < currentStep) {
            step.classList.add('completed');
            step.classList.remove('active');
        } else if (index + 1 === currentStep) {
            step.classList.add('active');
            step.classList.remove('completed');
        } else {
            step.classList.remove('active');
            step.classList.remove('completed');
        }
    });
}

// Sonraki Adıma Geçen Fonksiyon
function nextStep() {
    // Geçerli adımın validasyonu
    if (!validateStep(currentStep)) {
        return;
    }
    
    // Mevcut adımı gizle
    document.getElementById(`step-${currentStep}`).style.display = 'none';
    
    // Sonraki adıma geç
    currentStep++;
    
    // Sonraki adımı göster
    document.getElementById(`step-${currentStep}`).style.display = 'block';
    
    // İlerleme çubuğunu güncelle
    updateProgressBar();
    
    // Sayfayı en üste kaydır
    window.scrollTo(0, 0);
}

// Önceki Adıma Geçen Fonksiyon
function prevStep() {
    // Mevcut adımı gizle
    document.getElementById(`step-${currentStep}`).style.display = 'none';
    
    // Önceki adıma geç
    currentStep--;
    
    // Önceki adımı göster
    document.getElementById(`step-${currentStep}`).style.display = 'block';
    
    // İlerleme çubuğunu güncelle
    updateProgressBar();
    
    // Sayfayı en üste kaydır
    window.scrollTo(0, 0);
}

// Adım Validasyonu Yapan Fonksiyon
function validateStep(step) {
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

// Sonuçları Hesaplayan Fonksiyon
function calculateResults() {
    if (!validateStep(currentStep)) {
        return;
    }
    
    // Kişi bilgilerini al
    const name = document.getElementById('evaluated-name').value;
    const evaluator = document.getElementById('evaluator-name').value;
    const date = document.getElementById('evaluation-date').value;
    const notes = document.getElementById('additional-notes').value;
    
    // Sonuç başlığını güncelle
    document.getElementById('result-name').textContent = name;
    document.getElementById('result-date').textContent = `Değerlendirme Tarihi: ${formatDate(date)}`;
    document.getElementById('result-evaluator').textContent = `Değerlendiren: ${evaluator}`;
    document.getElementById('additional-notes-display').textContent = notes || "Ek not bulunmamaktadır.";
    
    // Kategori puanlarını hesapla
    const scores = {
        workethic: calculateCategoryScore('workethic', 10),
        loyalty: calculateCategoryScore('loyalty', 10),
        strengths: calculateCategoryScore('strengths', 15),
        weaknesses: calculateCategoryScore('weaknesses', 15),
        compatibility: calculateCategoryScore('compatibility', 10)
    };
    
    // Puanları göster
    document.getElementById('workethic-score').textContent = scores.workethic;
    document.getElementById('loyalty-score').textContent = scores.loyalty;
    document.getElementById('strengths-score').textContent = scores.strengths;
    document.getElementById('weaknesses-score').textContent = scores.weaknesses;
    document.getElementById('compatibility-score').textContent = scores.compatibility;
    
    // Analizleri göster
    document.getElementById('workethic-analysis').textContent = getAnalysisText('workethic', scores.workethic, 50);
    document.getElementById('loyalty-analysis').textContent = getAnalysisText('loyalty', scores.loyalty, 50);
    document.getElementById('strengths-analysis').textContent = getAnalysisText('strengths', scores.strengths, 75);
    document.getElementById('weaknesses-analysis').textContent = getAnalysisText('weaknesses', scores.weaknesses, 75);
    document.getElementById('compatibility-analysis').textContent = getAnalysisText('compatibility', scores.compatibility, 50);
    
    // Uyumluluk ölçeğini güncelle
    const compatibilityPercentage = (scores.compatibility / 50) * 100;
    document.getElementById('compatibility-meter').style.width = `${compatibilityPercentage}%`;
    
    // En yüksek güçlü yönleri göster
    const topStrengths = getTopTraits('strengths', 5);
    const topStrengthsList = document.getElementById('top-strengths');
    topStrengthsList.innerHTML = '';
    topStrengths.forEach(trait => {
        const li = document.createElement('li');
        li.textContent = trait.question;
        topStrengthsList.appendChild(li);
    });
    
    // En belirgin zayıf yönleri göster
    const topWeaknesses = getTopTraits('weaknesses', 5);
    const topWeaknessesList = document.getElementById('top-weaknesses');
    topWeaknessesList.innerHTML = '';
    topWeaknesses.forEach(trait => {
        const li = document.createElement('li');
        li.textContent = trait.question;
        topWeaknessesList.appendChild(li);
    });
    
    // Tavsiyeleri göster
    const recommendationsContent = document.getElementById('recommendations-content');
    recommendationsContent.innerHTML = '';
    
    Object.keys(scores).forEach(category => {
        const maxScore = category === 'strengths' || category === 'weaknesses' ? 75 : 50;
        const percentage = (scores[category] / maxScore) * 100;
        let level;
        
        if (percentage < 40) level = 'low';
        else if (percentage < 70) level = 'medium';
        else level = 'high';
        
        const p = document.createElement('p');
        p.textContent = recommendations[category][level];
        recommendationsContent.appendChild(p);
    });
    
    // Genel değerlendirmeyi göster
    const totalScore = scores.workethic + scores.loyalty + scores.strengths + (75 - scores.weaknesses) + scores.compatibility;
    const maxTotalScore = 50 + 50 + 75 + 75 + 50;
    const totalPercentage = (totalScore / maxTotalScore) * 100;
    
    let overallLevel;
    if (totalPercentage >= 85) overallLevel = 'excellent';
    else if (totalPercentage >= 70) overallLevel = 'good';
    else if (totalPercentage >= 50) overallLevel = 'average';
    else if (totalPercentage >= 30) overallLevel = 'belowAverage';
    else overallLevel = 'poor';
    
    document.getElementById('overall-summary').textContent = overallSummary[overallLevel];
    
    // Grafikleri oluştur
    createCategoryChart(scores);
    createStrengthsWeaknessesChart(scores);
    
    // Sonuç sayfasına geç
    nextStep();
}

// Kategori Puanını Hesaplayan Fonksiyon
function calculateCategoryScore(category, questionCount) {
    let totalScore = 0;
    
    for (let i = 1; i <= questionCount; i++) {
        const radios = document.getElementsByName(`${category}-q${i}`);
        
        for (let j = 0; j < radios.length; j++) {
            if (radios[j].checked) {
                totalScore += parseInt(radios[j].value);
                break;
            }
        }
    }
    
    return totalScore;
}

// Analiz Metni Getiren Fonksiyon
function getAnalysisText(category, score, maxScore) {
    const percentage = (score / maxScore) * 100;
    
    if (percentage < 40) return evaluationTexts[category].low;
    else if (percentage < 70) return evaluationTexts[category].medium;
    else return evaluationTexts[category].high;
}

// En Yüksek Özellikleri Getiren Fonksiyon
function getTopTraits(category, count) {
    const traits = [];
    const questionCount = questions[category].length;
    
    for (let i = 1; i <= questionCount; i++) {
        const radios = document.getElementsByName(`${category}-q${i}`);
        let score = 0;
        
        for (let j = 0; j < radios.length; j++) {
            if (radios[j].checked) {
                score = parseInt(radios[j].value);
                break;
            }
        }
        
        traits.push({
            question: questions[category][i-1],
            score: score
        });
    }
    
    // Puanlara göre sırala (zayıf yönler için tersten)
    if (category === 'weaknesses') {
        traits.sort((a, b) => b.score - a.score);
    } else {
        traits.sort((a, b) => b.score - a.score);
    }
    
    // İlk 'count' kadar özelliği döndür
    return traits.slice(0, count);
}

// Kategori Grafiğini Oluşturan Fonksiyon
function createCategoryChart(scores) {
    const ctx = document.getElementById('category-chart').getContext('2d');
    
    // Eğer önceden bir grafik varsa yok et
    if (window.categoryChart) {
        window.categoryChart.destroy();
    }
    
    window.categoryChart = new Chart(ctx, {
        type: 'radar',
        data: {
            labels: ['Çalışkanlık', 'Sadakat', 'Güçlü Yönler', 'Zayıf Yönler', 'Uyumluluk'],
            datasets: [{
                label: 'Kategori Puanları',
                data: [
                    (scores.workethic / 50) * 100,
                    (scores.loyalty / 50) * 100,
                    (scores.strengths / 75) * 100,
                    100 - ((scores.weaknesses / 75) * 100), // Zayıf yönler için ters çevir
                    (scores.compatibility / 50) * 100
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

// Güçlü ve Zayıf Yönler Grafiğini Oluşturan Fonksiyon
function createStrengthsWeaknessesChart(scores) {
    const ctx = document.getElementById('strengths-weaknesses-chart').getContext('2d');
    
    // Eğer önceden bir grafik varsa yok et
    if (window.strengthsWeaknessesChart) {
        window.strengthsWeaknessesChart.destroy();
    }
    
    // En yüksek güçlü yönleri al
    const topStrengths = getTopTraits('strengths', 5);
    // En belirgin zayıf yönleri al
    const topWeaknesses = getTopTraits('weaknesses', 5);
    
    window.strengthsWeaknessesChart = new Chart(ctx, {
        type: 'bar',
        data: {
            labels: [
                ...topStrengths.map((trait, index) => `Güçlü ${index + 1}`),
                ...topWeaknesses.map((trait, index) => `Zayıf ${index + 1}`)
            ],
            datasets: [{
                label: 'Puan',
                data: [
                    ...topStrengths.map(trait => trait.score),
                    ...topWeaknesses.map(trait => trait.score)
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

// Tarihi Formatlayan Fonksiyon
function formatDate(dateString) {
    const date = new Date(dateString);
    return date.toLocaleDateString('tr-TR', {
        day: 'numeric',
        month: 'long',
        year: 'numeric'
    });
}

// Sonuçları Yazdıran Fonksiyon
function printResults() {
    window.print();
}

// Sonuçları PDF Olarak Kaydeden Fonksiyon
function saveAsPDF() {
    alert('PDF olarak kaydetme özelliği şu anda geliştirme aşamasındadır. Lütfen tarayıcınızın yazdırma özelliğini kullanarak PDF olarak kaydediniz.');
    window.print();
}

// Formu Sıfırlayan Fonksiyon
function resetForm() {
    if (confirm('Tüm değerlendirme verileri silinecek ve yeni bir değerlendirme başlatılacaktır. Devam etmek istiyor musunuz?')) {
        location.reload();
    }
}
