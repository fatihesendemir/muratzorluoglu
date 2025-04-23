// Taşınabilir uygulama başlatıcı
document.addEventListener('DOMContentLoaded', function() {
    // Konfigürasyon ayarlarını yükle
    initializeApp();
});

// Uygulamayı başlat
function initializeApp() {
    // Konfigürasyon ayarlarını uygula
    applyConfiguration();
    
    // Admin paneli mi yoksa ana uygulama mı olduğunu kontrol et
    const isAdminPanel = window.location.pathname.includes('admin.html');
    const isResultsPage = window.location.pathname.includes('results.html');
    const isComparisonPage = window.location.pathname.includes('karsilastirma.html');
    
    // Sayfa türüne göre uygun başlatma fonksiyonunu çağır
    if (isAdminPanel) {
        initializeAdminPanel();
    } else if (isResultsPage) {
        initializeResultsPage();
    } else if (isComparisonPage) {
        initializeComparisonPage();
    } else {
        initializeMainApp();
    }
    
    // Ortak bileşenleri başlat
    initializeCommonComponents();
}

// Konfigürasyon ayarlarını uygula
function applyConfiguration() {
    // Uygulama adını güncelle
    document.title = AppConfig.app.name;
    
    // Özelleştirme ayarlarını uygula
    applyCustomStyles();
    
    // LocalStorage önekini ayarla
    window.storagePrefix = AppConfig.storage.prefix;
    
    // Hata ayıklama modunu ayarla
    window.debugMode = AppConfig.system.debugMode;
}

// Özel stilleri uygula
function applyCustomStyles() {
    // Özel renkleri ve yazı tipini uygula
    const customStyle = document.createElement('style');
    customStyle.textContent = `
        :root {
            --primary-color: ${AppConfig.customization.primaryColor};
            --secondary-color: ${AppConfig.customization.secondaryColor};
            --font-family: ${AppConfig.customization.fontFamily};
        }
        
        body {
            font-family: var(--font-family);
        }
        
        .btn, button.primary, .primary-bg {
            background-color: var(--primary-color);
        }
        
        h1, h2, h3, h4, h5, h6, .secondary-color {
            color: var(--secondary-color);
        }
        
        ${AppConfig.customization.customCSS}
    `;
    document.head.appendChild(customStyle);
    
    // Karanlık mod desteği
    if (AppConfig.customization.enableDarkMode) {
        enableDarkModeSupport();
    }
}

// Karanlık mod desteğini etkinleştir
function enableDarkModeSupport() {
    // Sistem karanlık mod tercihini kontrol et
    const prefersDarkMode = window.matchMedia('(prefers-color-scheme: dark)').matches;
    
    if (prefersDarkMode) {
        document.body.classList.add('dark-mode');
    }
    
    // Karanlık mod geçiş düğmesi ekle
    const header = document.querySelector('header .container');
    if (header) {
        const darkModeToggle = document.createElement('button');
        darkModeToggle.className = 'dark-mode-toggle';
        darkModeToggle.innerHTML = '🌓';
        darkModeToggle.title = 'Karanlık/Aydınlık Mod';
        
        darkModeToggle.addEventListener('click', function() {
            document.body.classList.toggle('dark-mode');
            
            // Tercihi kaydet
            const isDarkMode = document.body.classList.contains('dark-mode');
            localStorage.setItem(window.storagePrefix + 'dark_mode', isDarkMode);
        });
        
        header.appendChild(darkModeToggle);
    }
    
    // Kaydedilmiş tercihi kontrol et
    const savedDarkMode = localStorage.getItem(window.storagePrefix + 'dark_mode');
    if (savedDarkMode === 'true') {
        document.body.classList.add('dark-mode');
    } else if (savedDarkMode === 'false') {
        document.body.classList.remove('dark-mode');
    }
}

// Admin panelini başlat
function initializeAdminPanel() {
    console.log('Admin paneli başlatılıyor...');
    
    // Admin oturumunu kontrol et
    checkAdminSession();
    
    // Admin paneli bileşenlerini başlat
    if (typeof initializeAdminComponents === 'function') {
        initializeAdminComponents();
    }
}

// Admin oturumunu kontrol et
function checkAdminSession() {
    const adminAuth = localStorage.getItem(window.storagePrefix + 'adminAuth');
    
    // Giriş sayfasında değilsek ve oturum yoksa, giriş sayfasına yönlendir
    if (!window.location.hash.includes('#login')) {
        if (!adminAuth) {
            window.location.hash = '#login';
            renderLoginForm();
            return;
        }
        
        try {
            const auth = JSON.parse(adminAuth);
            
            // Oturum zaman aşımını kontrol et
            if (auth && auth.isLoggedIn) {
                const loginTime = new Date(auth.loginTime);
                const now = new Date();
                const minutesPassed = (now - loginTime) / (1000 * 60);
                
                if (minutesPassed > AppConfig.admin.sessionTimeout) {
                    // Oturum zaman aşımına uğradı
                    localStorage.removeItem(window.storagePrefix + 'adminAuth');
                    window.location.hash = '#login';
                    renderLoginForm();
                    alert('Oturumunuz zaman aşımına uğradı. Lütfen tekrar giriş yapın.');
                    return;
                }
            } else {
                window.location.hash = '#login';
                renderLoginForm();
                return;
            }
        } catch (e) {
            console.error('Oturum kontrolü hatası:', e);
            window.location.hash = '#login';
            renderLoginForm();
            return;
        }
    }
}

// Giriş formunu göster
function renderLoginForm() {
    const mainContent = document.getElementById('admin-content');
    if (!mainContent) return;
    
    mainContent.innerHTML = `
        <div class="login-container">
            <h2>Yönetici Girişi</h2>
            <form id="login-form">
                <div class="form-group">
                    <label for="username">Kullanıcı Adı</label>
                    <input type="text" id="username" name="username" required>
                </div>
                <div class="form-group">
                    <label for="password">Şifre</label>
                    <input type="password" id="password" name="password" required>
                </div>
                <button type="submit" class="btn">Giriş Yap</button>
            </form>
        </div>
    `;
    
    // Giriş formunu dinle
    const loginForm = document.getElementById('login-form');
    if (loginForm) {
        loginForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const username = document.getElementById('username').value;
            const password = document.getElementById('password').value;
            
            // Giriş bilgilerini kontrol et
            if (username === AppConfig.admin.defaultUsername && password === AppConfig.admin.defaultPassword) {
                // Başarılı giriş
                const adminAuth = {
                    isLoggedIn: true,
                    username: username,
                    loginTime: new Date().toISOString()
                };
                
                localStorage.setItem(window.storagePrefix + 'adminAuth', JSON.stringify(adminAuth));
                window.location.hash = '#dashboard';
                
                // Admin panelini yeniden yükle
                if (typeof initializeAdminComponents === 'function') {
                    initializeAdminComponents();
                }
            } else {
                // Başarısız giriş
                alert('Geçersiz kullanıcı adı veya şifre!');
            }
        });
    }
}

// Sonuçlar sayfasını başlat
function initializeResultsPage() {
    console.log('Sonuçlar sayfası başlatılıyor...');
    
    // URL'den değerlendirme ID'sini al
    const urlParams = new URLSearchParams(window.location.search);
    const evaluationId = urlParams.get('id');
    
    if (!evaluationId) {
        showError('Değerlendirme ID\'si bulunamadı.');
        return;
    }
    
    // Sonuç yöneticisini başlat
    const resultsManager = new ResultsManager();
    const resultRedirector = new ResultRedirector(resultsManager);
    
    // Değerlendirme sonucunu getir
    const evaluation = resultsManager.getEvaluationResult(evaluationId);
    
    if (!evaluation) {
        showError('Değerlendirme bulunamadı.');
        return;
    }
    
    // Sonuç görünürlüğünü kontrol et
    const result = resultRedirector.requestResultsView(evaluationId, evaluation.evaluatorName);
    
    if (result.showResults) {
        // Rapor oluşturucuyu başlat
        const reportGenerator = new DetailedReportGenerator();
        
        // HTML raporu oluştur
        const reportHtml = reportGenerator.generateReport(evaluation, 'html', 'detailed');
        
        // Raporu göster
        document.getElementById('report-container').innerHTML = reportHtml;
        
        // Grafikleri oluştur
        createCharts(evaluation);
    } else {
        // Hata mesajı göster
        showError(result.error || 'Bu değerlendirme sonuçlarını görüntüleme yetkiniz bulunmamaktadır.');
    }
}

// Karşılaştırma sayfasını başlat
function initializeComparisonPage() {
    console.log('Karşılaştırma sayfası başlatılıyor...');
    
    // Karşılaştırma sayfası özel başlatma kodları buraya gelecek
}

// Ana uygulamayı başlat
function initializeMainApp() {
    console.log('Ana uygulama başlatılıyor...');
    
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
            
            // Sonuç yöneticisini başlat
            const resultsManager = new ResultsManager();
            const resultRedirector = new ResultRedirector(resultsManager);
            
            // Değerlendirme tamamlandı, sonuçları yönet
            const result = resultRedirector.handleEvaluationComplete(evaluation, evaluatorName);
            
            if (result.showResults) {
                // Sonuçları göster
                window.location.href = `results.html?id=${result.evaluationId}`;
            } else {
                // Teşekkür mesajı göster
                showThankYouMessage(result.message, result.evaluationId);
            }
        });
    }
}

// Ortak bileşenleri başlat
function initializeCommonComponents() {
    // Yıl güncellemesi
    const yearElements = document.querySelectorAll('.current-year');
    yearElements.forEach(function(element) {
        element.textContent = new Date().getFullYear();
    });
    
    // Admin bağlantısını ekle
    addAdminLink();
}

// Admin bağlantısını ekle
function addAdminLink() {
    const footer = document.querySelector('footer');
    
    if (footer && !document.querySelector('footer a[href="admin.html"]')) {
        // Admin bağlantısı oluştur
        const adminLinkContainer = document.createElement('p');
        adminLinkContainer.innerHTML = '<a href="admin.html" target="_blank">Yönetici Paneli</a>';
        
        // Footer'a ekle
        footer.appendChild(adminLinkContainer);
    }
}

// Hata mesajı göster
function showError(message) {
    const container = document.getElementById('report-container') || document.querySelector('.container');
    if (container) {
        container.innerHTML = `
            <div class="error-message">
                <h2>Hata</h2>
                <p>${message}</p>
                <button class="btn" onclick="window.location.href='index.html'">Ana Sayfaya Dön</button>
            </div>
        `;
    }
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

// Grafikleri oluştur
function createCharts(evaluation) {
    // Bu fonksiyon, gerçek uygulamada Chart.js gibi bir kütüphane kullanarak
    // değerlendirme verilerine dayalı grafikler oluşturur
    console.log('Grafikler oluşturuluyor:', evaluation);
    
    // Chart.js yüklü ise grafikleri oluştur
    if (typeof Chart !== 'undefined') {
        // Radar grafiği
        const radarChartElements = document.querySelectorAll('[data-type="radar"]');
        radarChartElements.forEach(function(element) {
            createRadarChart(element, evaluation);
        });
        
        // Çubuk grafiği
        const barChartElements = document.querySelectorAll('[data-type="bar"]');
        barChartElements.forEach(function(element) {
            createBarChart(element, evaluation);
        });
    }
}

// Radar grafiği oluştur
function createRadarChart(element, evaluation) {
    // Kategori puanlarını yüzdeye çevir
    const workethicPercent = Math.round(evaluation.scores.workethic * 100 / 50);
    const loyaltyPercent = Math.round(evaluation.scores.loyalty * 100 / 50);
    const strengthsPercent = Math.round(evaluation.scores.strengths * 100 / 75);
    const weaknessesPercent = Math.round(evaluation.scores.weaknesses * 100 / 75);
    const compatibilityPercent = Math.round(evaluation.scores.compatibility * 100 / 50);
    
    // Canvas oluştur
    const canvas = document.createElement('canvas');
    element.appendChild(canvas);
    
    // Grafik oluştur
    new Chart(canvas, {
        type: 'radar',
        data: {
            labels: ['Çalışkanlık', 'Sadakat', 'Güçlü Yönler', 'Zayıf Yönler', 'Uyumluluk'],
            datasets: [{
                label: 'Kategori Puanları',
                data: [workethicPercent, loyaltyPercent, strengthsPercent, weaknessesPercent, compatibilityPercent],
                backgroundColor: 'rgba(52, 152, 219, 0.2)',
                borderColor: 'rgba(52, 152, 219, 1)',
                pointBackgroundColor: 'rgba(52, 152, 219, 1)',
                pointBorderColor: '#fff',
                pointHoverBackgroundColor: '#fff',
                pointHoverBorderColor: 'rgba(52, 152, 219, 1)'
            }]
        },
        options: {
            scale: {
                ticks: {
                    beginAtZero: true,
                    max: 100
                }
            }
        }
    });
}

// Çubuk grafiği oluştur
function createBarChart(element, evaluation) {
    // Kategori puanlarını yüzdeye çevir
    const workethicPercent = Math.round(evaluation.scores.workethic * 100 / 50);
    const loyaltyPercent = Math.round(evaluation.scores.loyalty * 100 / 50);
    const strengthsPercent = Math.round(evaluation.scores.strengths * 100 / 75);
    const weaknessesPercent = Math.round(evaluation.scores.weaknesses * 100 / 75);
    const compatibilityPercent = Math.round(evaluation.scores.compatibility * 100 / 50);
    
    // Canvas oluştur
    const canvas = document.createElement('canvas');
    element.appendChild(canvas);
    
    // Grafik oluştur
    new Chart(canvas, {
        type: 'bar',
        data: {
            labels: ['Çalışkanlık', 'Sadakat', 'Güçlü Yönler', 'Zayıf Yönler', 'Uyumluluk'],
            datasets: [{
                label: 'Kategori Puanları (%)',
                data: [workethicPercent, loyaltyPercent, strengthsPercent, weaknessesPercent, compatibilityPercent],
                backgroundColor: [
                    'rgba(52, 152, 219, 0.7)',
                    'rgba(46, 204, 113, 0.7)',
                    'rgba(155, 89, 182, 0.7)',
                    'rgba(230, 126, 34, 0.7)',
                    'rgba(52, 73, 94, 0.7)'
                ],
                borderColor: [
                    'rgba(52, 152, 219, 1)',
                    'rgba(46, 204, 113, 1)',
                    'rgba(155, 89, 182, 1)',
                    'rgba(230, 126, 34, 1)',
                    'rgba(52, 73, 94, 1)'
                ],
                borderWidth: 1
            }]
        },
        options: {
            scales: {
                y: {
                    beginAtZero: true,
                    max: 100
                }
            }
        }
    });
}
