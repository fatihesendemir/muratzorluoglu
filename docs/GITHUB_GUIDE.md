# GitHub Kullanım Rehberi

Bu rehber, Kişilik Analizi ve İş Ortağı Uyumluluk Değerlendirmesi uygulamasını GitHub'da yayınlamak ve yönetmek için adım adım talimatlar içermektedir.

## İçindekiler

1. [GitHub Hesabı Oluşturma](#github-hesabı-oluşturma)
2. [Repository Oluşturma](#repository-oluşturma)
3. [Dosyaları Yükleme](#dosyaları-yükleme)
4. [GitHub Pages ile Yayınlama](#github-pages-ile-yayınlama)
5. [Özel Domain Kullanma](#özel-domain-kullanma)
6. [Repository Yönetimi](#repository-yönetimi)
7. [İşbirliği ve Katkıda Bulunma](#i̇şbirliği-ve-katkıda-bulunma)

## GitHub Hesabı Oluşturma

Eğer henüz bir GitHub hesabınız yoksa:

1. [GitHub.com](https://github.com) adresine gidin
2. "Sign up" (Kaydol) düğmesine tıklayın
3. İstenilen bilgileri doldurun:
   - Kullanıcı adı
   - E-posta adresi
   - Şifre
4. E-posta adresinizi doğrulayın
5. Hesap kurulumunu tamamlayın

## Repository Oluşturma

1. GitHub hesabınıza giriş yapın
2. Sağ üst köşedeki "+" simgesine tıklayın ve "New repository" (Yeni repository) seçeneğini seçin
3. Repository bilgilerini doldurun:
   - **Repository name**: kisilik-analizi (veya tercih ettiğiniz bir isim)
   - **Description**: Kişilik Analizi ve İş Ortağı Uyumluluk Değerlendirmesi
   - **Visibility**: Public (Herkese açık) veya Private (Özel)
   - "Initialize this repository with a README" seçeneğini işaretleyin
4. "Create repository" (Repository oluştur) düğmesine tıklayın

## Dosyaları Yükleme

### Web Arayüzü ile Yükleme

1. Repository sayfanızda "Add file" (Dosya ekle) düğmesine tıklayın ve "Upload files" (Dosyaları yükle) seçeneğini seçin
2. Dosyaları sürükleyip bırakın veya "choose your files" (dosyalarınızı seçin) bağlantısına tıklayın
3. Yükleme açıklaması ekleyin (örn. "İlk dosya yüklemesi")
4. "Commit changes" (Değişiklikleri kaydet) düğmesine tıklayın

### Git Komut Satırı ile Yükleme

1. Git'i bilgisayarınıza yükleyin (eğer yüklü değilse)
2. Repository'yi klonlayın:

```bash
git clone https://github.com/kullanici-adiniz/kisilik-analizi.git
cd kisilik-analizi
```

3. Dosyaları kopyalayın
4. Değişiklikleri ekleyin, commit edin ve push edin:

```bash
git add .
git commit -m "İlk dosya yüklemesi"
git push origin main
```

### GitHub Desktop ile Yükleme

1. [GitHub Desktop](https://desktop.github.com/) uygulamasını indirin ve yükleyin
2. GitHub hesabınızla giriş yapın
3. Repository'nizi klonlayın
4. Dosyaları kopyalayın
5. Değişiklikleri commit edin ve push edin

## GitHub Pages ile Yayınlama

GitHub Pages, repository'nizdeki statik web sitelerini doğrudan yayınlamanıza olanak tanır.

1. Repository sayfanızda "Settings" (Ayarlar) sekmesine tıklayın
2. Sol menüden "Pages" seçeneğine tıklayın
3. "Source" (Kaynak) bölümünde:
   - Branch: main (veya master)
   - Folder: / (root)
4. "Save" (Kaydet) düğmesine tıklayın

GitHub, sitenizi şu formatta yayınlayacaktır:
```
https://kullanici-adiniz.github.io/kisilik-analizi/
```

### GitHub Pages Yapılandırması

GitHub Pages'in doğru çalışması için repository'nizde bir `index.html` dosyası bulunmalıdır. Bu dosya, sitenizin ana sayfası olarak kullanılacaktır.

## Özel Domain Kullanma

GitHub Pages ile kendi domaininizi kullanabilirsiniz:

1. Repository sayfanızda "Settings" > "Pages" bölümüne gidin
2. "Custom domain" (Özel domain) alanına domaininizi girin (örn. kisilik-analizi.com)
3. "Save" (Kaydet) düğmesine tıklayın
4. Domain sağlayıcınızın DNS ayarlarında aşağıdaki değişiklikleri yapın:

### Apex Domain için (örn. kisilik-analizi.com)

Aşağıdaki A kayıtlarını ekleyin:

```
A    @    185.199.108.153
A    @    185.199.109.153
A    @    185.199.110.153
A    @    185.199.111.153
```

### www Subdomain için (örn. www.kisilik-analizi.com)

Bir CNAME kaydı ekleyin:

```
CNAME    www    kullanici-adiniz.github.io
```

5. DNS değişikliklerinin yayılmasını bekleyin (24-48 saat sürebilir)
6. "Enforce HTTPS" (HTTPS'yi zorunlu kıl) seçeneğini işaretleyin

## Repository Yönetimi

### Dosya Düzenleme

1. Repository'nizde düzenlemek istediğiniz dosyaya tıklayın
2. Sağ üst köşedeki kalem simgesine tıklayın
3. Değişikliklerinizi yapın
4. Sayfanın altında bir commit mesajı girin
5. "Commit changes" (Değişiklikleri kaydet) düğmesine tıklayın

### Sürüm Oluşturma (Release)

1. Repository sayfanızda "Releases" bölümüne gidin
2. "Create a new release" (Yeni sürüm oluştur) düğmesine tıklayın
3. Sürüm bilgilerini doldurun:
   - Tag version: v1.0.0
   - Release title: İlk Sürüm
   - Description: Sürüm notları ve değişiklikler
4. "Publish release" (Sürümü yayınla) düğmesine tıklayın

### İstatistikleri Görüntüleme

Repository sayfanızda "Insights" sekmesi altında şunları görebilirsiniz:
- Katkıda bulunanlar
- Commit sıklığı
- Kod frekansı
- Bağımlılık grafiği
- Ağ grafiği

## İşbirliği ve Katkıda Bulunma

### Issue (Sorun) Oluşturma

1. Repository sayfanızda "Issues" sekmesine tıklayın
2. "New issue" (Yeni sorun) düğmesine tıklayın
3. Başlık ve açıklama girin
4. Etiketler, kilometre taşları ve atananlar ekleyin
5. "Submit new issue" (Yeni sorunu gönder) düğmesine tıklayın

### Pull Request (Çekme İsteği) Oluşturma

1. Repository'yi fork edin (sağ üst köşedeki "Fork" düğmesi)
2. Kendi fork'unuzda değişiklikler yapın
3. "Pull requests" sekmesine tıklayın
4. "New pull request" (Yeni çekme isteği) düğmesine tıklayın
5. Değişiklikleri gözden geçirin
6. "Create pull request" (Çekme isteği oluştur) düğmesine tıklayın
7. Başlık ve açıklama girin
8. "Create pull request" düğmesine tekrar tıklayın

### İşbirlikçi Ekleme

1. Repository sayfanızda "Settings" > "Manage access" bölümüne gidin
2. "Invite a collaborator" (İşbirlikçi davet et) düğmesine tıklayın
3. Kullanıcı adı veya e-posta adresi girin
4. "Add" (Ekle) düğmesine tıklayın

## Önemli Dosyalar

Repository'nizde aşağıdaki önemli dosyaları bulundurmanız önerilir:

### README.md

Bu dosya, repository'nizin ana sayfasında görüntülenir ve projenizin genel bir açıklamasını içerir.

### LICENSE

Projenizin lisans bilgilerini içerir. MIT, Apache, GPL gibi açık kaynak lisanslarından birini seçebilirsiniz.

### CONTRIBUTING.md

Başkalarının projenize nasıl katkıda bulunabileceğini açıklar.

### CODE_OF_CONDUCT.md

Projenizin davranış kurallarını belirtir.

---

Bu rehber, Kişilik Analizi ve İş Ortağı Uyumluluk Değerlendirmesi uygulamasını GitHub'da yayınlamak ve yönetmek için temel adımları içermektedir. GitHub'un sunduğu diğer özellikler ve araçlar hakkında daha fazla bilgi için [GitHub Docs](https://docs.github.com) sayfasını ziyaret edebilirsiniz.
