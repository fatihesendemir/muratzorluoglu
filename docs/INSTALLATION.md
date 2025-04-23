# Kişilik Analizi Uygulaması Kurulum Rehberi

Bu rehber, Kişilik Analizi ve İş Ortağı Uyumluluk Değerlendirmesi uygulamasının kendi sunucunuza veya web barındırma hizmetinize kurulumu için adım adım talimatlar içermektedir.

## İçindekiler

1. [Gereksinimler](#gereksinimler)
2. [Temel Kurulum](#temel-kurulum)
3. [Özel Domain Entegrasyonu](#özel-domain-entegrasyonu)
4. [Konfigürasyon Ayarları](#konfigürasyon-ayarları)
5. [SSL Sertifikası Kurulumu](#ssl-sertifikası-kurulumu)
6. [Sorun Giderme](#sorun-giderme)

## Gereksinimler

Kişilik Analizi uygulamasını çalıştırmak için aşağıdaki gereksinimlere ihtiyacınız vardır:

- Web sunucusu (Apache, Nginx, IIS vb.)
- HTML, CSS ve JavaScript desteği
- Tarayıcı erişimi

Uygulama tamamen istemci tarafında çalıştığı için PHP, Node.js veya veritabanı gibi sunucu tarafı teknolojilere ihtiyaç yoktur.

## Temel Kurulum

### 1. Dosyaları İndirme

GitHub repository'sinden dosyaları indirin:

```bash
git clone https://github.com/kullanici-adi/kisilik-analizi.git
cd kisilik-analizi
```

Alternatif olarak, repository'yi ZIP olarak indirip açabilirsiniz.

### 2. Dosyaları Sunucuya Yükleme

FTP, SFTP veya tercih ettiğiniz dosya transfer yöntemiyle tüm dosyaları web sunucunuza yükleyin. Dosyaları web sunucunuzun kök dizinine veya bir alt dizine yükleyebilirsiniz.

**Örnek Dizin Yapısı:**
```
public_html/
└── kisilik-analizi/
    ├── css/
    ├── js/
    ├── images/
    ├── docs/
    ├── index.html
    ├── admin.html
    └── ...
```

### 3. Konfigürasyon Ayarlarını Düzenleme

`js/config.js` dosyasını açın ve uygulamanın ayarlarını kendi ihtiyaçlarınıza göre düzenleyin:

```javascript
const AppConfig = {
    app: {
        name: "Şirketinizin Adı - Kişilik Analizi",
        // Diğer ayarlar...
    },
    // Diğer konfigürasyon bölümleri...
};
```

### 4. Erişimi Test Etme

Web tarayıcınızı açın ve uygulamanın URL'sine gidin:

```
http://sizin-sunucunuz.com/kisilik-analizi/
```

Ana sayfa yükleniyorsa, kurulum başarılı demektir.

## Özel Domain Entegrasyonu

### 1. Domain Satın Alma ve DNS Ayarları

Eğer henüz bir domaininiz yoksa, bir domain kayıt hizmetinden (GoDaddy, Namecheap, Google Domains vb.) bir domain satın alın.

Domain DNS ayarlarını web barındırma hizmetinizin sunucularına yönlendirin:

**A Kaydı Örneği:**
```
Tür: A
Ad: @
Değer: 123.456.789.10 (sunucu IP adresi)
TTL: 3600
```

**CNAME Kaydı Örneği (Alt Domain için):**
```
Tür: CNAME
Ad: kisilik
Değer: sizin-sunucunuz.com
TTL: 3600
```

### 2. Web Sunucusu Konfigürasyonu

#### Apache için (`.htaccess` dosyası):

```apache
# Ana domain için
<VirtualHost *:80>
    ServerName kisilik-analizi.com
    DocumentRoot /var/www/html/kisilik-analizi
    
    <Directory /var/www/html/kisilik-analizi>
        Options -Indexes +FollowSymLinks
        AllowOverride All
        Require all granted
    </Directory>
    
    ErrorLog ${APACHE_LOG_DIR}/kisilik-analizi-error.log
    CustomLog ${APACHE_LOG_DIR}/kisilik-analizi-access.log combined
</VirtualHost>
```

#### Nginx için:

```nginx
server {
    listen 80;
    server_name kisilik-analizi.com www.kisilik-analizi.com;
    
    root /var/www/html/kisilik-analizi;
    index index.html;
    
    location / {
        try_files $uri $uri/ =404;
    }
}
```

### 3. Uygulama URL'lerini Güncelleme

Eğer özel bir domain kullanıyorsanız, `js/config.js` dosyasında bunu belirtebilirsiniz:

```javascript
const AppConfig = {
    app: {
        name: "Şirketinizin Adı - Kişilik Analizi",
        baseUrl: "https://kisilik-analizi.com"
    },
    // Diğer ayarlar...
};
```

## Konfigürasyon Ayarları

`js/config.js` dosyasında düzenleyebileceğiniz önemli ayarlar:

### Uygulama Ayarları

```javascript
app: {
    name: "Şirketinizin Adı - Kişilik Analizi", // Uygulama adı
    version: "1.2.0",                           // Versiyon numarası
    defaultLanguage: "tr"                       // Varsayılan dil
}
```

### Admin Paneli Ayarları

```javascript
admin: {
    defaultUsername: "admin",                   // Varsayılan kullanıcı adı
    defaultPassword: "admin123",                // Varsayılan şifre (değiştirin!)
    sessionTimeout: 30,                         // Oturum zaman aşımı (dakika)
    maxLoginAttempts: 5,                        // Maksimum giriş denemesi
    lockoutTime: 15                             // Hesap kilitleme süresi (dakika)
}
```

### Rapor Ayarları

```javascript
reports: {
    defaultFormat: "html",                      // Varsayılan rapor formatı
    defaultDetailLevel: "detailed",             // Varsayılan detay seviyesi
    companyLogo: "/images/logo.png",            // Şirket logosu URL
    companyName: "Şirketinizin Adı",            // Şirket adı
    contactInfo: "info@sirketiniz.com"          // İletişim bilgileri
}
```

### Sistem Ayarları

```javascript
system: {
    resultVisibility: "admin_only",             // Sonuç görünürlüğü
    dataRetention: "unlimited",                 // Veri saklama süresi
    enableAnalytics: false,                     // Analitik toplama
    debugMode: false                            // Hata ayıklama modu
}
```

### Özelleştirme Ayarları

```javascript
customization: {
    primaryColor: "#3498db",                    // Ana renk
    secondaryColor: "#2c3e50",                  // İkincil renk
    fontFamily: "Arial, sans-serif",            // Yazı tipi
    enableDarkMode: false,                      // Karanlık mod desteği
    customCSS: ""                               // Özel CSS
}
```

## SSL Sertifikası Kurulumu

Güvenli bir bağlantı için SSL sertifikası kurmanız önerilir.

### Let's Encrypt ile Ücretsiz SSL Sertifikası

#### 1. Certbot Kurulumu

```bash
sudo apt-get update
sudo apt-get install certbot
```

Apache için:
```bash
sudo apt-get install python3-certbot-apache
```

Nginx için:
```bash
sudo apt-get install python3-certbot-nginx
```

#### 2. Sertifika Alma

Apache için:
```bash
sudo certbot --apache -d kisilik-analizi.com -d www.kisilik-analizi.com
```

Nginx için:
```bash
sudo certbot --nginx -d kisilik-analizi.com -d www.kisilik-analizi.com
```

#### 3. Otomatik Yenileme

Sertifikaların otomatik yenilenmesini sağlamak için:

```bash
sudo certbot renew --dry-run
```

### Ticari SSL Sertifikası

Ticari bir SSL sertifikası satın aldıysanız, sertifika sağlayıcınızın talimatlarını izleyerek kurulumu gerçekleştirin.

## Sorun Giderme

### Yaygın Sorunlar ve Çözümleri

#### Uygulama Yüklenmiyor

- Tüm dosyaların doğru şekilde yüklendiğinden emin olun
- Tarayıcı konsolunda hata mesajlarını kontrol edin (F12 tuşuna basın)
- Web sunucusu günlük dosyalarını kontrol edin

#### Admin Paneline Erişilemiyor

- Doğru kullanıcı adı ve şifreyi kullandığınızdan emin olun
- Tarayıcı çerezlerini ve önbelleğini temizleyin
- LocalStorage'ı temizleyin (Tarayıcı konsolunda `localStorage.clear()` komutunu çalıştırın)

#### Değerlendirme Sonuçları Kaydedilmiyor

- Tarayıcınızın LocalStorage'a erişim izni olduğundan emin olun
- Tarayıcınızın gizli modda olmadığından emin olun
- Farklı bir tarayıcı deneyin

#### Özelleştirmeler Uygulanmıyor

- `js/config.js` dosyasındaki sözdizimini kontrol edin
- Tarayıcı önbelleğini temizleyin
- Sayfayı yeniden yükleyin (Ctrl+F5 veya Cmd+Shift+R)

### Destek Alma

Sorunlarınız devam ediyorsa, GitHub repository'sinde bir issue açabilir veya doğrudan iletişime geçebilirsiniz.

---

Bu kurulum rehberi, Kişilik Analizi ve İş Ortağı Uyumluluk Değerlendirmesi uygulamasının kendi sunucunuza kurulumu için temel adımları içermektedir. Özel ihtiyaçlarınıza göre ek yapılandırmalar gerekebilir.
