// İş Ortağı Uyumluluk Modülü
class PartnerCompatibilityManager {
    constructor() {
        this.analyzer = new PersonalityAnalyzer();
        this.dataManager = new DataManager();
        this.profiles = [];
        this.selectedProfiles = {
            profile1: null,
            profile2: null
        };
        this.comparisonResult = null;
    }
    
    // Modülü başlat
    initialize() {
        this.loadProfiles();
        this.populateProfileDropdowns();
        this.setupEventListeners();
    }
    
    // Profilleri yükle
    loadProfiles() {
        this.profiles = this.dataManager.loadProfiles();
    }
    
    // Profil açılır listelerini doldur
    populateProfileDropdowns() {
        const profile1Select = document.getElementById('profile1-select');
        const profile2Select = document.getElementById('profile2-select');
        
        if (!profile1Select || !profile2Select) return;
        
        // Mevcut seçenekleri temizle
        profile1Select.innerHTML = '<option value="">Profil seçin...</option>';
        profile2Select.innerHTML = '<option value="">Profil seçin...</option>';
        
        // Profilleri ekle
        this.profiles.forEach((profile, index) => {
            const option1 = document.createElement('option');
            option1.value = index;
            option1.textContent = profile.personalInfo.name;
            profile1Select.appendChild(option1);
            
            const option2 = document.createElement('option');
            option2.value = index;
            option2.textContent = profile.personalInfo.name;
            profile2Select.appendChild(option2);
        });
    }
    
    // Olay dinleyicilerini ayarla
    setupEventListeners() {
        // Profil seçimi değiştiğinde
        const profile1Select = document.getElementById('profile1-select');
        const profile2Select = document.getElementById('profile2-select');
        const compareBtn = document.getElementById('compare-btn');
        
        if (profile1Select) {
            profile1Select.addEventListener('change', (e) => {
                const index = e.target.value;
                if (index !== '') {
                    this.selectedProfiles.profile1 = this.profiles[index];
                    this.updateProfilePreview('profile1-preview', this.selectedProfiles.profile1);
                } else {
                    this.selectedProfiles.profile1 = null;
                    this.clearProfilePreview('profile1-preview');
                }
                this.updateCompareButtonState();
            });
        }
        
        if (profile2Select) {
            profile2Select.addEventListener('change', (e) => {
                const index = e.target.value;
                if (index !== '') {
                    this.selectedProfiles.profile2 = this.profiles[index];
                    this.updateProfilePreview('profile2-preview', this.selectedProfiles.profile2);
                } else {
                    this.selectedProfiles.profile2 = null;
                    this.clearProfilePreview('profile2-preview');
                }
                this.updateCompareButtonState();
            });
        }
        
        // Karşılaştır butonu tıklandığında
        if (compareBtn) {
            compareBtn.addEventListener('click', () => {
                this.compareProfiles();
            });
        }
        
        // Yeni profil oluştur butonu tıklandığında
        const newProfileBtn = document.getElementById('new-profile-btn');
        if (newProfileBtn) {
            newProfileBtn.addEventListener('click', () => {
                window.location.href = 'index.html';
            });
        }
        
        // Geri dön butonu tıklandığında
        const backBtn = document.getElementById('back-to-comparison-btn');
        if (backBtn) {
            backBtn.addEventListener('click', () => {
                document.getElementById('comparison-results').style.display = 'none';
                document.querySelector('.comparison-form').style.display = 'block';
            });
        }
        
        // Yazdır butonu tıklandığında
        const printBtn = document.getElementById('print-comparison-btn');
        if (printBtn) {
            printBtn.addEventListener('click', () => {
                window.print();
            });
        }
    }
    
    // Karşılaştır butonunun durumunu güncelle
    updateCompareButtonState() {
        const compareBtn = document.getElementById('compare-btn');
        if (!compareBtn) return;
        
        if (this.selectedProfiles.profile1 && this.selectedProfiles.profile2) {
            compareBtn.disabled = false;
        } else {
            compareBtn.disabled = true;
        }
    }
    
    // Profil önizlemesini güncelle
    updateProfilePreview(previewId, profile) {
        const previewElement = document.getElementById(previewId);
        if (!previewElement) return;
        
        previewElement.innerHTML = `
            <div class="profile-card">
                <h4>${profile.personalInfo.name}</h4>
                <p><strong>Değerlendirme Tarihi:</strong> ${this.formatDate(profile.personalInfo.date)}</p>
                <div class="profile-scores">
                    <div class="score-item">
                        <span class="score-label">Çalışkanlık:</span>
                        <span class="score-value">${profile.categoryScores.workethic}/50</span>
                    </div>
                    <div class="score-item">
                        <span class="score-label">Sadakat:</span>
                        <span class="score-value">${profile.categoryScores.loyalty}/50</span>
                    </div>
                    <div class="score-item">
                        <span class="score-label">Güçlü Yönler:</span>
                        <span class="score-value">${profile.categoryScores.strengths}/75</span>
                    </div>
                    <div class="score-item">
                        <span class="score-label">Zayıf Yönler:</span>
                        <span class="score-value">${profile.categoryScores.weaknesses}/75</span>
                    </div>
                    <div class="score-item">
                        <span class="score-label">Uyumluluk:</span>
                        <span class="score-value">${profile.categoryScores.compatibility}/50</span>
                    </div>
                </div>
            </div>
        `;
    }
    
    // Profil önizlemesini temizle
    clearProfilePreview(previewId) {
        const previewElement = document.getElementById(previewId);
        if (previewElement) {
            previewElement.innerHTML = '';
        }
    }
    
    // Profilleri karşılaştır
    compareProfiles() {
        if (!this.selectedProfiles.profile1 || !this.selectedProfiles.profile2) {
            alert('Lütfen karşılaştırmak için iki profil seçin.');
            return;
        }
        
        // Karşılaştırma sonucunu hesapla
        this.comparisonResult = this.analyzer.compareProfiles(
            this.selectedProfiles.profile1,
            this.selectedProfiles.profile2
        );
        
        // Sonuçları göster
        this.displayComparisonResults();
        
        // Karşılaştırma formunu gizle, sonuçları göster
        document.querySelector('.comparison-form').style.display = 'none';
        document.getElementById('comparison-results').style.display = 'block';
    }
    
    // Karşılaştırma sonuçlarını göster
    displayComparisonResults() {
        if (!this.comparisonResult) return;
        
        // Uyumluluk puanını göster
        const scoreValue = document.getElementById('compatibility-score-value');
        if (scoreValue) {
            scoreValue.textContent = `${Math.round(this.comparisonResult.compatibilityPercentage)}%`;
        }
        
        // Uyumluluk seviyesini göster
        const levelText = document.getElementById('compatibility-level-text');
        if (levelText) {
            let levelName = '';
            switch (this.comparisonResult.compatibilityLevel) {
                case 'low':
                    levelName = 'Düşük Uyumluluk';
                    break;
                case 'medium':
                    levelName = 'Orta Uyumluluk';
                    break;
                case 'high':
                    levelName = 'Yüksek Uyumluluk';
                    break;
            }
            levelText.textContent = levelName;
        }
        
        // Uyumluluk puanı dairesini güncelle
        const scoreCircle = document.getElementById('compatibility-score-circle');
        if (scoreCircle) {
            const percentage = this.comparisonResult.compatibilityPercentage;
            let color = '';
            
            if (percentage < 40) {
                color = '#e74c3c'; // Kırmızı
            } else if (percentage < 70) {
                color = '#f39c12'; // Turuncu
            } else {
                color = '#2ecc71'; // Yeşil
            }
            
            scoreCircle.style.background = `conic-gradient(${color} ${percentage}%, #ecf0f1 0)`;
        }
        
        // Tamamlayıcı güçlü yönleri göster
        const strengthsList = document.getElementById('complementary-strengths-list');
        if (strengthsList) {
            strengthsList.innerHTML = '';
            
            if (this.comparisonResult.complementaryStrengths.length > 0) {
                this.comparisonResult.complementaryStrengths.forEach(strength => {
                    const li = document.createElement('li');
                    li.textContent = strength;
                    strengthsList.appendChild(li);
                });
            } else {
                const li = document.createElement('li');
                li.textContent = 'Tamamlayıcı güçlü yön bulunamadı.';
                strengthsList.appendChild(li);
            }
        }
        
        // Potansiyel çatışma alanlarını göster
        const conflictsList = document.getElementById('potential-conflicts-list');
        if (conflictsList) {
            conflictsList.innerHTML = '';
            
            if (this.comparisonResult.potentialConflicts.length > 0) {
                this.comparisonResult.potentialConflicts.forEach(conflict => {
                    const li = document.createElement('li');
                    li.textContent = conflict;
                    conflictsList.appendChild(li);
                });
            } else {
                const li = document.createElement('li');
                li.textContent = 'Potansiyel çatışma alanı bulunamadı.';
                conflictsList.appendChild(li);
            }
        }
        
        // Tavsiyeleri göster
        const recommendationsText = document.getElementById('compatibility-recommendations-text');
        if (recommendationsText) {
            recommendationsText.textContent = this.comparisonResult.recommendations;
        }
        
        // Radar grafiğini oluştur
        this.createComparisonRadarChart();
    }
    
    // Karşılaştırma radar grafiğini oluştur
    createComparisonRadarChart() {
        const ctx = document.getElementById('comparison-radar-chart').getContext('2d');
        
        // Eğer önceden bir grafik varsa yok et
        if (window.comparisonRadarChart) {
            window.comparisonRadarChart.destroy();
        }
        
        const profile1 = this.selectedProfiles.profile1;
        const profile2 = this.selectedProfiles.profile2;
        
        window.comparisonRadarChart = new Chart(ctx, {
            type: 'radar',
            data: {
                labels: ['Çalışkanlık', 'Sadakat', 'Güçlü Yönler', 'Zayıf Yönler', 'Uyumluluk'],
                datasets: [
                    {
                        label: profile1.personalInfo.name,
                        data: [
                            (profile1.categoryScores.workethic / 50) * 100,
                            (profile1.categoryScores.loyalty / 50) * 100,
                            (profile1.categoryScores.strengths / 75) * 100,
                            100 - ((profile1.categoryScores.weaknesses / 75) * 100), // Zayıf yönler için ters çevir
                            (profile1.categoryScores.compatibility / 50) * 100
                        ],
                        backgroundColor: 'rgba(52, 152, 219, 0.2)',
                        borderColor: 'rgba(52, 152, 219, 1)',
                        borderWidth: 2,
                        pointBackgroundColor: 'rgba(52, 152, 219, 1)',
                        pointBorderColor: '#fff',
                        pointHoverBackgroundColor: '#fff',
                        pointHoverBorderColor: 'rgba(52, 152, 219, 1)'
                    },
                    {
                        label: profile2.personalInfo.name,
                        data: [
                            (profile2.categoryScores.workethic / 50) * 100,
                            (profile2.categoryScores.loyalty / 50) * 100,
                            (profile2.categoryScores.strengths / 75) * 100,
                            100 - ((profile2.categoryScores.weaknesses / 75) * 100), // Zayıf yönler için ters çevir
                            (profile2.categoryScores.compatibility / 50) * 100
                        ],
                        backgroundColor: 'rgba(46, 204, 113, 0.2)',
                        borderColor: 'rgba(46, 204, 113, 1)',
                        borderWidth: 2,
                        pointBackgroundColor: 'rgba(46, 204, 113, 1)',
                        pointBorderColor: '#fff',
                        pointHoverBackgroundColor: '#fff',
                        pointHoverBorderColor: 'rgba(46, 204, 113, 1)'
                    }
                ]
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
                }
            }
        });
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

// Karşılaştırma CSS stillerini ekle
function addComparisonStyles() {
    const styleElement = document.createElement('style');
    styleElement.textContent = `
        .profile-selection {
            display: flex;
            justify-content: space-between;
            align-items: center;
            margin: 30px 0;
            flex-wrap: wrap;
        }
        
        .profile-select-container {
            flex: 1;
            min-width: 300px;
            margin: 10px;
        }
        
        .comparison-divider {
            display: flex;
            justify-content: center;
            align-items: center;
            padding: 0 20px;
            font-size: 24px;
            color: var(--primary-color);
        }
        
        .profile-dropdown {
            width: 100%;
            padding: 12px;
            border: 1px solid #ddd;
            border-radius: var(--border-radius);
            font-size: 16px;
            margin-bottom: 15px;
        }
        
        .profile-card {
            background-color: #f8f9fa;
            border-radius: var(--border-radius);
            padding: 15px;
            border-left: 4px solid var(--primary-color);
        }
        
        .profile-card h4 {
            color: var(--primary-color);
            margin-bottom: 10px;
        }
        
        .profile-scores {
            margin-top: 15px;
        }
        
        .score-item {
            display: flex;
            justify-content: space-between;
            margin-bottom: 5px;
        }
        
        .score-label {
            font-weight: 600;
        }
        
        .compatibility-score-container {
            display: flex;
            justify-content: space-around;
            align-items: center;
            margin: 30px 0;
            flex-wrap: wrap;
        }
        
        .compatibility-score {
            display: flex;
            flex-direction: column;
            align-items: center;
        }
        
        .score-circle {
            width: 150px;
            height: 150px;
            border-radius: 50%;
            background: conic-gradient(var(--primary-color) 0%, #ecf0f1 0);
            display: flex;
            justify-content: center;
            align-items: center;
            margin-bottom: 15px;
            position: relative;
        }
        
        .score-circle::before {
            content: '';
            position: absolute;
            width: 120px;
            height: 120px;
            border-radius: 50%;
            background-color: white;
        }
        
        #compatibility-score-value {
            position: relative;
            z-index: 1;
            font-size: 32px;
            font-weight: bold;
            color: var(--dark-color);
        }
        
        .compatibility-level {
            text-align: center;
            padding: 20px;
            background-color: #f8f9fa;
            border-radius: var(--border-radius);
            min-width: 300px;
        }
        
        .compatibility-level h3 {
            margin-bottom: 10px;
            color: var(--dark-color);
        }
        
        .compatibility-level p {
            font-size: 24px;
            font-weight: bold;
            color: var(--primary-color);
        }
        
        .complementary-traits {
            display: flex;
            flex-wrap: wrap;
            gap: 20px;
            margin: 30px 0;
        }
        
        .traits-section {
            flex: 1;
            min-width: 300px;
            background-color: #f8f9fa;
            border-radius: var(--border-radius);
            padding: 20px;
        }
        
        .traits-section h3 {
            color: var(--primary-color);
            margin-bottom: 15px;
        }
        
        .compatibility-recommendations {
            background-color: #f8f9fa;
            border-radius: var(--border-radius);
            padding: 20px;
            margin: 30px 0;
            border-left: 4px solid var(--success-color);
        }
        
        .compatibility-recommendations h3 {
            color: var(--success-color);
            margin-bottom: 15px;
        }
        
        @media print {
            .button-group {
                display: none;
            }
        }
    `;
    
    document.head.appendChild(styleElement);
}

// Sayfa yüklendiğinde
document.addEventListener('DOMContentLoaded', function() {
    // Karşılaştırma stillerini ekle
    addComparisonStyles();
    
    // Uyumluluk yöneticisini başlat
    const compatibilityManager = new PartnerCompatibilityManager();
    compatibilityManager.initialize();
});
