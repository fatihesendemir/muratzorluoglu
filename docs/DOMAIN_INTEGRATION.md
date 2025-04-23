# Özel Domain Entegrasyonu Rehberi

Bu rehber, Kişilik Analizi ve İş Ortağı Uyumluluk Değerlendirmesi uygulamasını kendi özel domaininizde nasıl kullanacağınızı detaylı olarak açıklar.

## İçindekiler

1. [Domain Satın Alma](#domain-satın-alma)
2. [DNS Ayarları](#dns-ayarları)
3. [GitHub Pages ile Özel Domain Kullanımı](#github-pages-ile-özel-domain-kullanımı)
4. [Netlify ile Özel Domain Kullanımı](#netlify-ile-özel-domain-kullanımı)
5. [Vercel ile Özel Domain Kullanımı](#vercel-ile-özel-domain-kullanımı)
6. [Kendi Sunucunuzda Özel Domain Kullanımı](#kendi-sunucunuzda-özel-domain-kullanımı)
7. [SSL Sertifikası Kurulumu](#ssl-sertifikası-kurulumu)
8. [Sorun Giderme](#sorun-giderme)

## Domain Satın Alma

Eğer henüz bir domaininiz yoksa, aşağıdaki domain sağlayıcılarından birini kullanarak satın alabilirsiniz:

- [Google Domains](https://domains.google)
- [Namecheap](https://www.namecheap.com)
- [GoDaddy](https://www.godaddy.com)
- [Name.com](https://www.name.com)
- [Isimtescil](https://www.isimtescil.net) (Türkiye)

Domain seçerken dikkat edilmesi gerekenler:
- Kolay hatırlanabilir olması
- Markanızı veya uygulamanın amacını yansıtması
- Mümkünse kısa olması
- .com, .net, .org gibi yaygın uzantılar kullanılması

## DNS Ayarları

Domain satın aldıktan sonra, DNS ayarlarını yapmanız gerekecektir. Bu ayarlar, domaininizi uygulamanızın barındırıldığı sunucuya yönlendirir.

### DNS Temel Kavramlar

- **A Kaydı**: Domaininizi bir IP adresine yönlendirir.
- **CNAME Kaydı**: Domaininizi başka bir domaine yönlendirir.
- **MX Kaydı**: E-posta sunucularını belirtir.
- **TXT Kaydı**: Doğrulama ve güvenlik amaçlı metin bilgileri içerir.
- **NS Kaydı**: Domain için yetkili isim sunucularını belirtir.

## GitHub Pages ile Özel Domain Kullanımı

### Adım 1: GitHub Repository Ayarları

1. GitHub'da repository'nize gidin.
2. "Settings" sekmesine tıklayın.
3. Sol menüden "Pages" seçeneğini bulun.
4. "Custom domain" alanına domaininizi girin (örn. "kisilik-analizi.com").
5. "Save" butonuna tıklayın.
6. GitHub, repository'nizde bir CNAME dosyası oluşturacaktır.

### Adım 2: DNS Ayarları

#### Apex Domain için (örn. kisilik-analizi.com):

Domain sağlayıcınızın DNS yönetim panelinde aşağıdaki A kayıtlarını ekleyin:

```
A @ 185.199.108.153
A @ 185.199.109.153
A @ 185.199.110.153
A @ 185.199.111.153
```

#### www Subdomain için (örn. www.kisilik-analizi.com):

```
CNAME www kullaniciadi.github.io.
```

### Adım 3: Doğrulama ve HTTPS

1. DNS değişikliklerinin yayılması için 24-48 saat bekleyin.
2. GitHub'da repository'nizin "Settings" > "Pages" bölümüne gidin.
3. Domaininizin doğrulandığından emin olun.
4. "Enforce HTTPS" seçeneğini işaretleyin.

## Netlify ile Özel Domain Kullanımı

### Adım 1: Netlify'da Site Oluşturma

1. [Netlify](https://www.netlify.com)'e kaydolun veya giriş yapın.
2. "New site from Git" butonuna tıklayın.
3. GitHub hesabınızı bağlayın ve repository'nizi seçin.
4. Dağıtım ayarlarını yapılandırın ve "Deploy site" butonuna tıklayın.

### Adım 2: Özel Domain Ekleme

1. Netlify kontrol panelinizde, sitenizi seçin.
2. "Domain settings" veya "Domain management" bölümüne gidin.
3. "Add custom domain" butonuna tıklayın.
4. Domaininizi girin ve "Verify" butonuna tıklayın.

### Adım 3: DNS Ayarları

#### Netlify DNS Kullanımı (Önerilen):

1. Netlify'da "Set up Netlify DNS" butonuna tıklayın.
2. Talimatları izleyerek domain sağlayıcınızda nameserver'ları Netlify'ın nameserver'ları ile değiştirin.

#### Mevcut DNS Sağlayıcınızı Kullanma:

Domain sağlayıcınızın DNS yönetim panelinde:

```
CNAME www [netlify-site-name].netlify.app.
```

Apex domain için:

```
A @ 75.2.60.5
```

## Vercel ile Özel Domain Kullanımı

### Adım 1: Vercel'de Proje Oluşturma

1. [Vercel](https://vercel.com)'e kaydolun veya giriş yapın.
2. "New Project" butonuna tıklayın.
3. GitHub hesabınızı bağlayın ve repository'nizi seçin.
4. Dağıtım ayarlarını yapılandırın ve "Deploy" butonuna tıklayın.

### Adım 2: Özel Domain Ekleme

1. Vercel kontrol panelinizde, projenizi seçin.
2. "Settings" sekmesine gidin.
3. Sol menüden "Domains" seçeneğini tıklayın.
4. "Add" butonuna tıklayın ve domaininizi girin.

### Adım 3: DNS Ayarları

Vercel size iki seçenek sunacaktır:

#### Vercel DNS Kullanımı:

1. "Use Vercel DNS" seçeneğini seçin.
2. Talimatları izleyerek domain sağlayıcınızda nameserver'ları Vercel'in nameserver'ları ile değiştirin.

#### Mevcut DNS Sağlayıcınızı Kullanma:

Vercel size gerekli DNS kayıtlarını gösterecektir. Genellikle:

```
CNAME www cname.vercel-dns.com.
```

Apex domain için:

```
A @ 76.76.21.21
```

## Kendi Sunucunuzda Özel Domain Kullanımı

### Adım 1: Web Sunucusu Kurulumu

Kendi sunucunuzda Apache veya Nginx gibi bir web sunucusu kurmanız gerekir.

#### Apache Yapılandırması:

```apache
<VirtualHost *:80>
    ServerName kisilik-analizi.com
    ServerAlias www.kisilik-analizi.com
    DocumentRoot /var/www/html/kisilik-analizi
    
    <Directory /var/www/html/kisilik-analizi>
        Options -Indexes +FollowSymLinks
        AllowOverride All
        Require all granted
    </Directory>
    
    ErrorLog ${APACHE_LOG_DIR}/kisilik-analizi.com-error.log
    CustomLog ${APACHE_LOG_DIR}/kisilik-analizi.com-access.log combined
</VirtualHost>
```

#### Nginx Yapılandırması:

```nginx
server {
    listen 80;
    server_name kisilik-analizi.com www.kisilik-analizi.com;
    root /var/www/html/kisilik-analizi;
    index index.html;
    
    location / {
        try_files $uri $uri/ /index.html;
    }
}
```

### Adım 2: DNS Ayarları

Domain sağlayıcınızın DNS yönetim panelinde:

```
A @ sunucu_ip_adresi
CNAME www kisilik-analizi.com.
```

## SSL Sertifikası Kurulumu

HTTPS protokolü kullanmak için SSL sertifikası gereklidir. Let's Encrypt ücretsiz SSL sertifikaları sunar.

### Let's Encrypt ile SSL Kurulumu

#### Certbot Kullanımı:

1. Certbot'u yükleyin:

```bash
sudo apt-get update
sudo apt-get install certbot
```

2. Apache için:

```bash
sudo certbot --apache -d kisilik-analizi.com -d www.kisilik-analizi.com
```

3. Nginx için:

```bash
sudo certbot --nginx -d kisilik-analizi.com -d www.kisilik-analizi.com
```

4. Talimatları izleyin ve sertifikanızı alın.

### Otomatik Yenileme

Let's Encrypt sertifikaları 90 gün geçerlidir. Otomatik yenileme için:

```bash
sudo crontab -e
```

Aşağıdaki satırı ekleyin:

```
0 3 * * * /usr/bin/certbot renew --quiet
```

## Sorun Giderme

### DNS Sorunları

- **DNS Değişiklikleri Yansımıyor**: DNS değişikliklerinin yayılması 24-48 saat sürebilir. Sabırlı olun.
- **DNS Kayıtlarını Doğrulama**: `dig` veya `nslookup` komutlarını kullanarak DNS kayıtlarınızı kontrol edebilirsiniz:

```bash
dig kisilik-analizi.com
dig www.kisilik-analizi.com
```

### SSL Sorunları

- **Sertifika Hatası**: Sertifikanın doğru domain için alındığından emin olun.
- **Mixed Content Uyarısı**: Sayfanızda HTTP kaynakları kullanılıyor olabilir. Tüm kaynakların HTTPS olduğundan emin olun.

### Erişim Sorunları

- **404 Hatası**: Dosya yollarının doğru olduğundan emin olun.
- **403 Hatası**: Dosya izinlerini kontrol edin.
- **500 Hatası**: Sunucu loglarını kontrol edin.

Bu rehber, Kişilik Analizi uygulamanızı kendi özel domaininizde kullanmanıza yardımcı olacaktır. Herhangi bir sorunla karşılaşırsanız, domain sağlayıcınızın veya hosting hizmetinizin destek ekibiyle iletişime geçebilirsiniz.
