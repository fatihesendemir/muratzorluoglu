# Kişilik Analizi ve İş Ortağı Uyumluluk Değerlendirmesi

Bu proje, kişilik analizi yaparak potansiyel iş ortaklarının uyumluluğunu değerlendiren kapsamlı bir web uygulamasıdır. Çalışkanlık, sadakat, güçlü yönler ve zayıf yönleri detaylı bir şekilde analiz ederek, iş ortağı seçiminde profesyonel ve net sonuçlar sunar.

## Özellikler

- **Kapsamlı Kişilik Analizi**: Çalışkanlık, sadakat, güçlü yönler ve zayıf yönleri değerlendiren detaylı anket
- **Görsel Sonuç Analizi**: Sonuçları grafiklerle görselleştirme
- **İş Ortağı Uyumluluk Değerlendirmesi**: İki kişinin profilini karşılaştırarak uyumluluk analizi
- **Admin Paneli**: Sonuçları yönetmek ve detaylı raporlar oluşturmak için güvenli yönetim arayüzü
- **Detaylı Raporlama**: Farklı formatlarda (HTML, PDF, CSV, JSON) kapsamlı raporlar
- **Sonuç Gizleme**: Test sonuçlarını test yapan kişiden gizleme özelliği
- **Mobil Uyumlu Tasarım**: Tüm cihazlarda sorunsuz çalışan responsive tasarım

## Kurulum

### Gereksinimler

- Web sunucusu (Apache, Nginx vb.)
- Tarayıcı (Chrome, Firefox, Safari, Edge)

### Basit Kurulum

1. Bu repository'yi klonlayın veya ZIP olarak indirin
2. Dosyaları web sunucunuza yükleyin
3. Tarayıcınızdan uygulamaya erişin

```bash
git clone https://github.com/kullanici-adi/kisilik-analizi.git
cd kisilik-analizi
```

### Admin Paneli Kurulumu

Admin paneli varsayılan olarak aşağıdaki bilgilerle erişilebilir:

- Kullanıcı adı: `admin`
- Şifre: `admin123`

Güvenlik için ilk girişten sonra şifrenizi değiştirmeniz önerilir.

## Kullanım

### Kişilik Analizi Yapma

1. Ana sayfada "Değerlendirme Başlat" düğmesine tıklayın
2. Değerlendirilen ve değerlendiren kişi bilgilerini girin
3. Anket sorularını yanıtlayın
4. "Değerlendirmeyi Tamamla" düğmesine tıklayın

### Admin Paneline Erişim

1. Ana sayfanın alt kısmında bulunan "Yönetici Paneli" bağlantısına tıklayın
2. Kullanıcı adı ve şifrenizi girin
3. "Giriş Yap" düğmesine tıklayın

### Detaylı Raporlar Oluşturma

1. Admin panelinde "Değerlendirmeler" sekmesine gidin
2. İlgili değerlendirmeyi seçin
3. "Rapor Oluştur" düğmesine tıklayın
4. Rapor formatını ve detay seviyesini seçin
5. "Rapor Oluştur" düğmesine tıklayın

### Karşılaştırma Raporu Oluşturma

1. Admin panelinde "Karşılaştırma" sekmesine gidin
2. Karşılaştırmak istediğiniz iki değerlendirmeyi seçin
3. "Karşılaştır" düğmesine tıklayın

## Özelleştirme

### Görünüm Özelleştirme

CSS dosyalarını düzenleyerek uygulamanın görünümünü özelleştirebilirsiniz:

- `css/style.css`: Ana uygulama stilleri
- `css/admin.css`: Admin paneli stilleri
- `css/detailed_report.css`: Detaylı rapor stilleri

### Anket Sorularını Özelleştirme

Anket sorularını değiştirmek veya eklemek için:

1. `js/script.js` dosyasındaki `questions` nesnesini düzenleyin
2. `index.html` dosyasındaki ilgili form alanlarını güncelleyin

### Sistem Ayarları

Admin panelindeki "Ayarlar" sekmesinden şu ayarları yapılandırabilirsiniz:

- **Sonuç Görünürlüğü**: Değerlendirme sonuçlarının kimler tarafından görüntülenebileceği
- **Veri Saklama**: Değerlendirme verilerinin ne kadar süre saklanacağı
- **Admin Hesabı**: Kullanıcı adı ve şifre değiştirme

## Kendi Domaininizde Kullanma

Uygulamayı kendi domaininizde kullanmak için:

1. Dosyaları web sunucunuza yükleyin
2. Domain DNS ayarlarınızı yapılandırın
3. SSL sertifikası ekleyerek HTTPS desteği sağlayın

Detaylı talimatlar için `docs/DOMAIN_INTEGRATION.md` dosyasına bakın.

## Dosya Yapısı

```
kisilik-analizi/
├── css/                  # Stil dosyaları
│   ├── style.css         # Ana uygulama stilleri
│   ├── admin.css         # Admin paneli stilleri
│   ├── detailed_report.css # Detaylı rapor stilleri
│   └── thank_you.css     # Teşekkür sayfası stilleri
├── js/                   # JavaScript dosyaları
│   ├── script.js         # Ana uygulama kodları
│   ├── admin.js          # Admin paneli kodları
│   ├── detailed_report.js # Detaylı raporlama modülü
│   ├── results_manager.js # Sonuç yönetimi modülü
│   ├── partner_compatibility.js # Uyumluluk hesaplama modülü
│   └── integration.js    # Entegrasyon kodları
├── docs/                 # Dokümantasyon dosyaları
│   ├── INSTALLATION.md   # Kurulum rehberi
│   ├── GITHUB_GUIDE.md   # GitHub kullanım rehberi
│   └── DOMAIN_INTEGRATION.md # Domain entegrasyon rehberi
├── images/               # Görsel dosyaları
├── index.html            # Ana sayfa
├── admin.html            # Admin paneli
├── results.html          # Sonuç sayfası
├── karsilastirma.html    # Karşılaştırma sayfası
├── README.md             # Proje açıklaması
├── LICENSE               # Lisans bilgisi
└── CONTRIBUTING.md       # Katkıda bulunma rehberi
```

## Katkıda Bulunma

Projeye katkıda bulunmak istiyorsanız:

1. Bu repository'yi fork edin
2. Yeni bir branch oluşturun (`git checkout -b feature/amazing-feature`)
3. Değişikliklerinizi commit edin (`git commit -m 'Add some amazing feature'`)
4. Branch'inizi push edin (`git push origin feature/amazing-feature`)
5. Pull Request oluşturun

Detaylı bilgi için `CONTRIBUTING.md` dosyasına bakın.

## Lisans

Bu proje MIT Lisansı altında lisanslanmıştır. Detaylar için `LICENSE` dosyasına bakın.

## İletişim

Sorularınız veya geri bildirimleriniz için GitHub üzerinden issue açabilirsiniz.

---

Kişilik Analizi ve İş Ortağı Uyumluluk Değerlendirmesi © 2025
