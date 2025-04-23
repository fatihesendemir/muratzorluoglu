# Kişilik Analizi Uygulaması için GitHub Rehberi

Bu rehber, Kişilik Analizi ve İş Ortağı Uyumluluk Değerlendirmesi uygulamasını GitHub'a yükleme ve kendi domaininizde kullanma sürecini adım adım açıklar.

## İçindekiler

1. [GitHub Hesabı Oluşturma](#github-hesabı-oluşturma)
2. [Repository Oluşturma](#repository-oluşturma)
3. [Dosyaları Yükleme](#dosyaları-yükleme)
4. [GitHub Pages ile Yayınlama](#github-pages-ile-yayınlama)
5. [Özel Domain Entegrasyonu](#özel-domain-entegrasyonu)
6. [Değişiklik Yapma ve Güncelleme](#değişiklik-yapma-ve-güncelleme)

## GitHub Hesabı Oluşturma

Eğer henüz bir GitHub hesabınız yoksa:

1. [GitHub.com](https://github.com) adresine gidin.
2. "Sign up" butonuna tıklayın.
3. İstenilen bilgileri doldurun (e-posta, şifre, kullanıcı adı).
4. E-posta adresinizi doğrulayın.

## Repository Oluşturma

1. GitHub hesabınıza giriş yapın.
2. Sağ üst köşedeki "+" simgesine tıklayın ve "New repository" seçeneğini seçin.
3. Repository adını girin (örn. "kisilik-analizi").
4. Açıklama ekleyin: "Kişilik Analizi ve İş Ortağı Uyumluluk Değerlendirmesi Uygulaması".
5. Repository'nin "Public" (herkese açık) olmasını seçin.
6. "Initialize this repository with a README" seçeneğini işaretlemeyin (zaten bir README dosyamız var).
7. "Create repository" butonuna tıklayın.

## Dosyaları Yükleme

### Git Kullanarak (Önerilen)

Eğer Git bilgisine sahipseniz:

1. Bilgisayarınıza Git yükleyin (https://git-scm.com/downloads).
2. Komut satırını açın ve şu komutları çalıştırın:

```bash
# Kişilik analizi klasörüne gidin
cd /path/to/kisilik_analizi_github

# Git repository'sini başlatın
git init

# Tüm dosyaları ekleyin
git add .

# İlk commit'i oluşturun
git commit -m "İlk yükleme: Kişilik Analizi Uygulaması"

# GitHub repository'nizi uzak sunucu olarak ekleyin (URL'yi kendi repository'nizle değiştirin)
git remote add origin https://github.com/kullaniciadi/kisilik-analizi.git

# Dosyaları GitHub'a gönderin
git push -u origin main
```

### Git Kullanmadan (Web Arayüzü ile)

Eğer Git bilginiz yoksa:

1. GitHub'da oluşturduğunuz repository'ye gidin.
2. "Add file" > "Upload files" seçeneğine tıklayın.
3. Tüm dosya ve klasörleri sürükleyip bırakın veya "choose your files" butonuna tıklayarak seçin.
4. "Commit changes" butonuna tıklayın.

Not: GitHub web arayüzü ile klasör yapısını koruyarak yükleme yapmak zor olabilir. Çok sayıda dosya ve klasör olduğu için Git kullanmanız önerilir.

## GitHub Pages ile Yayınlama

1. GitHub'da repository'nize gidin.
2. "Settings" sekmesine tıklayın.
3. Sol menüden "Pages" seçeneğini bulun.
4. "Source" bölümünde, "Branch" kısmından "main" branch'ini seçin.
5. "Save" butonuna tıklayın.
6. Birkaç dakika bekleyin. Sayfanın üst kısmında sitenizin yayınlandığı URL görünecektir (genellikle https://kullaniciadi.github.io/kisilik-analizi/ formatında).

## Özel Domain Entegrasyonu

Kendi domaininizi kullanmak için:

1. Bir domain satın alın veya mevcut domaininizi kullanın.
2. GitHub repository'nizin "Settings" > "Pages" bölümüne gidin.
3. "Custom domain" alanına domaininizi girin (örn. "kisilik-analizi.com").
4. "Save" butonuna tıklayın.
5. Domain sağlayıcınızın DNS ayarlarına gidin ve şu kayıtları ekleyin:

   **A Kayıtları** (apex domain için):
   ```
   185.199.108.153
   185.199.109.153
   185.199.110.153
   185.199.111.153
   ```

   **CNAME Kaydı** (www subdomain için):
   ```
   www CNAME kullaniciadi.github.io.
   ```

6. DNS değişikliklerinin yayılması için 24-48 saat bekleyin.
7. GitHub'da "Enforce HTTPS" seçeneğini işaretleyin (DNS değişiklikleri yayıldıktan sonra).

## Değişiklik Yapma ve Güncelleme

### Git Kullanarak

1. Yerel değişikliklerinizi yapın.
2. Değişiklikleri commit edin ve GitHub'a gönderin:

```bash
git add .
git commit -m "Değişiklik açıklaması"
git push
```

### GitHub Web Arayüzü ile

1. GitHub'da repository'nize gidin.
2. Düzenlemek istediğiniz dosyaya tıklayın.
3. Sağ üst köşedeki kalem simgesine tıklayın.
4. Değişikliklerinizi yapın.
5. Sayfanın altındaki "Commit changes" butonuna tıklayın.

## Özelleştirme

Uygulamayı kendi markanıza uygun hale getirmek için:

1. `css/style.css` dosyasını düzenleyerek renkleri ve stilleri değiştirin.
2. HTML dosyalarındaki başlık ve metinleri güncelleyin.
3. Kendi logonuzu eklemek için `images` klasörüne logo yükleyin ve HTML dosyalarında referans verin.

## Sorun Giderme

- **404 Hatası**: GitHub Pages'in etkinleşmesi birkaç dakika sürebilir. Eğer 404 hatası alıyorsanız, biraz bekleyin ve sayfayı yenileyin.
- **CSS/JS Yüklenmiyor**: Dosya yollarının doğru olduğundan emin olun. GitHub Pages'te repository adı URL'nin bir parçası olduğu için, mutlak yollar kullanmanız gerekebilir.
- **HTTPS Sorunu**: Özel domain kullanıyorsanız, "Enforce HTTPS" seçeneğini işaretlediğinizden emin olun.

## Yardım ve Destek

Eğer GitHub veya özel domain entegrasyonu konusunda sorun yaşarsanız:

- GitHub Dokümantasyonu: https://docs.github.com/en/pages
- Domain DNS Ayarları: Domain sağlayıcınızın destek sayfalarına başvurun.

Bu rehber, Kişilik Analizi uygulamanızı GitHub'da yayınlamanıza ve kendi domaininizde kullanmanıza yardımcı olacaktır. Herhangi bir sorunla karşılaşırsanız, GitHub'ın kapsamlı dokümantasyonuna başvurabilirsiniz.
