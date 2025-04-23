// Taşınabilir konfigürasyon ayarları
const AppConfig = {
    // Uygulama ayarları
    app: {
        name: "Kişilik Analizi ve İş Ortağı Uyumluluk Değerlendirmesi",
        version: "1.2.0",
        defaultLanguage: "tr"
    },
    
    // Depolama ayarları
    storage: {
        prefix: "personality_assessment_",  // LocalStorage anahtar öneki
        encryptData: false,                 // Veri şifreleme (isteğe bağlı)
        backupInterval: 0                   // Otomatik yedekleme aralığı (dakika, 0=kapalı)
    },
    
    // Admin paneli ayarları
    admin: {
        defaultUsername: "admin",
        defaultPassword: "admin123",        // İlk kurulumda değiştirilmeli
        sessionTimeout: 30,                 // Oturum zaman aşımı (dakika)
        maxLoginAttempts: 5,                // Maksimum giriş denemesi
        lockoutTime: 15                     // Hesap kilitleme süresi (dakika)
    },
    
    // Rapor ayarları
    reports: {
        defaultFormat: "html",              // Varsayılan rapor formatı (html, pdf, csv, json)
        defaultDetailLevel: "detailed",     // Varsayılan detay seviyesi (basic, standard, detailed, comprehensive)
        companyLogo: "",                    // Şirket logosu URL (raporlarda gösterilir)
        companyName: "",                    // Şirket adı (raporlarda gösterilir)
        contactInfo: ""                     // İletişim bilgileri (raporlarda gösterilir)
    },
    
    // Sistem ayarları
    system: {
        resultVisibility: "admin_only",     // Sonuç görünürlüğü (admin_only, evaluator, both)
        dataRetention: "unlimited",         // Veri saklama süresi (30, 90, 180, 365, unlimited)
        enableAnalytics: false,             // Analitik toplama (true/false)
        debugMode: false                    // Hata ayıklama modu (true/false)
    },
    
    // Özelleştirme ayarları
    customization: {
        primaryColor: "#3498db",            // Ana renk
        secondaryColor: "#2c3e50",          // İkincil renk
        fontFamily: "Arial, sans-serif",    // Yazı tipi
        enableDarkMode: false,              // Karanlık mod desteği
        customCSS: ""                       // Özel CSS
    }
};

// Konfigürasyonu dışa aktar
if (typeof module !== 'undefined' && module.exports) {
    module.exports = AppConfig;
}
