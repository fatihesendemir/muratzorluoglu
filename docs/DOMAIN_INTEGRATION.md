# Özel Domain Entegrasyonu Rehberi

Bu rehber, Kişilik Analizi ve İş Ortağı Uyumluluk Değerlendirmesi uygulamasını kendi domaininizde kullanmak için adım adım talimatlar içermektedir.

## İçindekiler

1. [Domain Seçimi ve Satın Alma](#domain-seçimi-ve-satın-alma)
2. [DNS Ayarları](#dns-ayarları)
3. [Web Sunucusu Konfigürasyonu](#web-sunucusu-konfigürasyonu)
4. [Uygulama Entegrasyonu](#uygulama-entegrasyonu)
5. [SSL Sertifikası](#ssl-sertifikası)
6. [Özel Alan Adı Yönlendirmeleri](#özel-alan-adı-yönlendirmeleri)
7. [Sorun Giderme](#sorun-giderme)

## Domain Seçimi ve Satın Alma

### Domain Seçimi

Uygulamanız için uygun bir domain adı seçin. İdeal bir domain adı:
- Kısa ve akılda kalıcı olmalı
- Uygulamanızın amacını yansıtmalı
- Yazması ve telaffuzu kolay olmalı
- Tercihen .com, .net veya ülke uzantısı (.com.tr, .co.uk vb.) kullanmalı

### Domain Satın Alma

Aşağıdaki güvenilir domain sağlayıcılarından birini kullanabilirsiniz:
- [GoDaddy](https://www.godaddy.com)
- [Namecheap](https://www.namecheap.com)
- [Google Domains](https://domains.google)
- [Name.com](https://www.name.com)
- [Türkiye'de: İsimtescil](https://www.isimtescil.net)

Domain satın alma adımları:
1. Domain sağlayıcısının web sitesine gidin
2. İstediğiniz domain adını arayın
3. Kullanılabilir ise sepete ekleyin
4. Ödeme işlemini tamamlayın
5. Domain yönetim panelinize erişin

## DNS Ayarları

Domain satın aldıktan sonra, DNS ayarlarını web barındırma hizmetinize yönlendirmeniz gerekir.

### A Kaydı Ekleme (Ana Domain için)

1. Domain sağlayıcınızın yönetim paneline giriş yapın
2. DNS yönetimi veya DNS ayarları bölümünü bulun
3. Yeni bir A kaydı ekleyin:
   - **Ad/Host**: @ (veya boş bırakın)
   - **Değer/Hedef**: Web sunucunuzun IP adresi
   - **TTL**: 3600 (veya önerilen değer)

### CNAME Kaydı Ekleme (Alt Domain için)

Eğer uygulamayı bir alt domain üzerinde çalıştırmak istiyorsanız (örn. kisilik.siteadi.com):

1. DNS yönetimi bölümüne gidin
2. Yeni bir CNAME kaydı ekleyin:
   - **Ad/Host**: kisilik (veya istediğiniz alt domain adı)
   - **Değer/Hedef**: Ana domaininiz (örn. siteadi.com)
   - **TTL**: 3600 (veya önerilen değer)

### www Yönlendirmesi

Ana domain için www yönlendirmesi eklemek isterseniz:

1. Yeni bir CNAME kaydı ekleyin:
   - **Ad/Host**: www
   - **Değer/Hedef**: Ana domaininiz (örn. siteadi.com)
   - **TTL**: 3600 (veya önerilen değer)

### DNS Değişikliklerinin Yayılması

DNS değişikliklerinin internet genelinde yayılması 24-48 saat sürebilir. Bu süre zarfında, bazı kullanıcılar eski, bazıları ise yeni DNS ayarlarını görebilir.

## Web Sunucusu Konfigürasyonu

### Apache Web Sunucusu

#### Virtual Host Konfigürasyonu

1. SSH ile sunucunuza bağlanın
2. Bir metin editörü ile yeni bir virtual host dosyası oluşturun:

```bash
sudo nano /etc/apache2/sites-available/kisilik-analizi.conf
```

3. Aşağıdaki konfigürasyonu ekleyin:

```apache
<VirtualHost *:80>
    ServerName siteadi.com
    ServerAlias www.siteadi.com
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

4. Dosyayı kaydedin ve çıkın
5. Virtual host'u etkinleştirin:

```bash
sudo a2ensite kisilik-analizi.conf
sudo systemctl reload apache2
```

#### .htaccess Dosyası

Uygulamanın kök dizininde bir `.htaccess` dosyası oluşturun:

```apache
# URL yeniden yazma kuralları
<IfModule mod_rewrite.c>
    RewriteEngine On
    RewriteBase /
    
    # www olmayan URL'leri www'ye yönlendir
    RewriteCond %{HTTP_HOST} ^siteadi\.com [NC]
    RewriteRule ^(.*)$ http://www.siteadi.com/$1 [L,R=301]
    
    # HTTPS'ye yönlendir (SSL sertifikanız varsa)
    RewriteCond %{HTTPS} off
    RewriteRule ^(.*)$ https://%{HTTP_HOST}%{REQUEST_URI} [L,R=301]
</IfModule>

# Tarayıcı önbelleğe alma
<IfModule mod_expires.c>
    ExpiresActive On
    ExpiresByType image/jpg "access plus 1 year"
    ExpiresByType image/jpeg "access plus 1 year"
    ExpiresByType image/gif "access plus 1 year"
    ExpiresByType image/png "access plus 1 year"
    ExpiresByType text/css "access plus 1 month"
    ExpiresByType application/javascript "access plus 1 month"
    ExpiresByType text/html "access plus 1 day"
</IfModule>
```

### Nginx Web Sunucusu

1. SSH ile sunucunuza bağlanın
2. Bir metin editörü ile yeni bir server bloğu oluşturun:

```bash
sudo nano /etc/nginx/sites-available/kisilik-analizi
```

3. Aşağıdaki konfigürasyonu ekleyin:

```nginx
server {
    listen 80;
    server_name siteadi.com www.siteadi.com;
    
    root /var/www/html/kisilik-analizi;
    index index.html;
    
    location / {
        try_files $uri $uri/ =404;
    }
    
    # Tarayıcı önbelleğe alma
    location ~* \.(jpg|jpeg|png|gif|ico|css|js)$ {
        expires 1y;
        add_header Cache-Control "public, max-age=31536000";
    }
    
    # Hata sayfaları
    error_page 404 /404.html;
    error_page 500 502 503 504 /50x.html;
}
```

4. Dosyayı kaydedin ve çıkın
5. Sembolik bağlantı oluşturun ve Nginx'i yeniden yükleyin:

```bash
sudo ln -s /etc/nginx/sites-available/kisilik-analizi /etc/nginx/sites-enabled/
sudo nginx -t
sudo systemctl reload nginx
```

## Uygulama Entegrasyonu

### Dosyaları Yükleme

1. FTP istemcinizi kullanarak uygulamanın tüm dosyalarını web sunucunuza yükleyin
2. Dosyaların doğru izinlere sahip olduğundan emin olun:

```bash
sudo chown -R www-data:www-data /var/www/html/kisilik-analizi
sudo find /var/www/html/kisilik-analizi -type d -exec chmod 755 {} \;
sudo find /var/www/html/kisilik-analizi -type f -exec chmod 644 {} \;
```

### Konfigürasyon Ayarlarını Güncelleme

`js/config.js` dosyasını açın ve domain bilgilerinizi güncelleyin:

```javascript
const AppConfig = {
    app: {
        name: "Şirketinizin Adı - Kişilik Analizi",
        version: "1.2.0",
        baseUrl: "https://siteadi.com"  // Domaininizi buraya ekleyin
    },
    
    // Şirket bilgilerinizi güncelleyin
    reports: {
        companyLogo: "https://siteadi.com/images/logo.png",
        companyName: "Şirketinizin Adı",
        contactInfo: "info@siteadi.com"
    },
    
    // Diğer ayarlar...
};
```

### Bağlantıları Kontrol Etme

Uygulamanın HTML dosyalarındaki tüm bağlantıların doğru olduğundan emin olun. Mutlak URL'ler yerine göreceli URL'ler kullanmanız önerilir:

```html
<!-- Doğru (göreceli URL) -->
<link rel="stylesheet" href="css/style.css">
<script src="js/app.js"></script>

<!-- Yanlış (mutlak URL) -->
<link rel="stylesheet" href="https://siteadi.com/css/style.css">
<script src="https://siteadi.com/js/app.js"></script>
```

## SSL Sertifikası

### Let's Encrypt ile Ücretsiz SSL

#### Apache için:

```bash
sudo apt-get update
sudo apt-get install certbot python3-certbot-apache
sudo certbot --apache -d siteadi.com -d www.siteadi.com
```

#### Nginx için:

```bash
sudo apt-get update
sudo apt-get install certbot python3-certbot-nginx
sudo certbot --nginx -d siteadi.com -d www.siteadi.com
```

### Ticari SSL Sertifikası

Ticari bir SSL sertifikası satın aldıysanız:

1. CSR (Certificate Signing Request) oluşturun
2. CSR'yi SSL sağlayıcınıza gönderin
3. Sertifika dosyalarını indirin
4. Sertifikaları web sunucunuza yükleyin ve yapılandırın

### SSL Kontrolü

SSL kurulumunuzu [SSL Labs](https://www.ssllabs.com/ssltest/) ile test edin.

## Özel Alan Adı Yönlendirmeleri

### Farklı Sayfalar için Özel Alt Domainler

Uygulamanın farklı bölümleri için özel alt domainler kullanmak isterseniz:

#### Admin Paneli için Alt Domain

1. DNS yönetiminizde yeni bir CNAME kaydı ekleyin:
   - **Ad/Host**: admin
   - **Değer/Hedef**: Ana domaininiz (örn. siteadi.com)

2. Web sunucunuzu yapılandırın:

Apache için:
```apache
<VirtualHost *:80>
    ServerName admin.siteadi.com
    DocumentRoot /var/www/html/kisilik-analizi
    
    # Admin sayfasına yönlendir
    RedirectMatch 302 ^/$ /admin.html
</VirtualHost>
```

Nginx için:
```nginx
server {
    listen 80;
    server_name admin.siteadi.com;
    
    root /var/www/html/kisilik-analizi;
    
    location = / {
        return 302 /admin.html;
    }
}
```

### URL Yönlendirmeleri

Kullanıcı dostu URL'ler oluşturmak için:

Apache için `.htaccess` dosyasına ekleyin:
```apache
# Kullanıcı dostu URL'ler
RewriteRule ^degerlendirme$ index.html [L]
RewriteRule ^sonuclar/([0-9a-zA-Z_-]+)$ results.html?id=$1 [L]
RewriteRule ^admin$ admin.html [L]
RewriteRule ^karsilastir$ karsilastirma.html [L]
```

Nginx için:
```nginx
location /degerlendirme {
    return 302 /index.html;
}

location ~ ^/sonuclar/([0-9a-zA-Z_-]+)$ {
    return 302 /results.html?id=$1;
}

location /admin {
    return 302 /admin.html;
}

location /karsilastir {
    return 302 /karsilastirma.html;
}
```

## Sorun Giderme

### DNS Sorunları

#### DNS Değişikliklerinin Yayılmaması

- DNS değişikliklerinin yayılması 24-48 saat sürebilir
- DNS önbelleğinizi temizleyin: `ipconfig /flushdns` (Windows) veya `sudo killall -HUP mDNSResponder` (Mac)
- [DNS Checker](https://dnschecker.org/) ile DNS yayılımını kontrol edin

#### Yanlış DNS Kayıtları

- A kaydının doğru IP adresini gösterdiğinden emin olun
- CNAME kayıtlarının doğru hedeflere yönlendirildiğinden emin olun
- MX kayıtlarının e-posta hizmetinize doğru şekilde yapılandırıldığından emin olun

### Web Sunucusu Sorunları

#### 404 Hatası

- Dosyaların doğru dizine yüklendiğinden emin olun
- Web sunucusu konfigürasyonunda DocumentRoot ayarının doğru olduğunu kontrol edin
- Dosya izinlerini kontrol edin

#### 500 Hatası

- Web sunucusu hata günlüklerini kontrol edin:
  - Apache: `/var/log/apache2/error.log`
  - Nginx: `/var/log/nginx/error.log`
- Konfigürasyon dosyalarında sözdizimi hatası olmadığından emin olun

#### SSL Sorunları

- Sertifika dosyalarının doğru yolda olduğunu kontrol edin
- Sertifikanın süresi dolmadığından emin olun
- Sertifikanın domain adınızla eşleştiğinden emin olun

### Uygulama Sorunları

#### Sayfa Yüklenmiyor

- Tarayıcı konsolunda JavaScript hatalarını kontrol edin (F12)
- Tüm gerekli dosyaların yüklendiğinden emin olun
- Tarayıcı önbelleğini temizleyin

#### Veriler Kaydedilmiyor

- LocalStorage'ın tarayıcınızda etkin olduğundan emin olun
- Tarayıcınızın gizli modda olmadığından emin olun
- Tarayıcı konsolunda hata mesajlarını kontrol edin

---

Bu rehber, Kişilik Analizi uygulamasını kendi domaininizde kullanmak için temel adımları içermektedir. Özel ihtiyaçlarınıza göre ek yapılandırmalar gerekebilir.
