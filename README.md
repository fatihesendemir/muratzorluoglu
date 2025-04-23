# Kişilik Analizi ve İş Ortağı Uyumluluk Değerlendirmesi

Bu proje, potansiyel iş ortaklarının kişilik özelliklerini detaylı bir şekilde analiz etmeye ve aralarındaki uyumluluğu değerlendirmeye yardımcı olan profesyonel bir web uygulamasıdır. Kodlama bilgisi gerektirmeden kullanılabilecek şekilde tasarlanmıştır.

## Özellikler

- **Kapsamlı Kişilik Analizi**: Çalışkanlık, sadakat, güçlü yönler ve zayıf yönleri değerlendiren detaylı anket
- **Görsel Sonuç Raporları**: Kişilik özelliklerini grafikler ve tablolarla görselleştirme
- **İş Ortağı Uyumluluk Değerlendirmesi**: İki kişilik profilini karşılaştırarak uyumluluk analizi yapma
- **Tamamlayıcı Özellik Tespiti**: Tamamlayıcı güçlü yönleri ve potansiyel çatışma alanlarını belirleme
- **Profesyonel Tavsiyeler**: Kişilik profili ve uyumluluk sonuçlarına göre özelleştirilmiş tavsiyeler
- **Mobil Uyumlu Tasarım**: Tüm cihazlarda sorunsuz çalışan responsive arayüz
- **Yerel Veri Saklama**: Kullanıcı verilerini tarayıcının yerel depolama alanında saklama

## Demo

Uygulamanın canlı demosuna [buradan](https://pkplkijz.manus.space) erişebilirsiniz.

## Kurulum

### Gereksinimler

Bu uygulama tamamen istemci taraflıdır ve herhangi bir sunucu gerektirmez. Statik dosyaları barındırabilen herhangi bir web sunucusu ile çalıştırılabilir.

### Yerel Kurulum

1. Bu repository'yi klonlayın:
   ```
   git clone https://github.com/kullaniciadi/kisilik-analizi.git
   cd kisilik-analizi
   ```

2. Dosyaları bir web sunucusu ile sunun. Örneğin, Python'un yerleşik HTTP sunucusunu kullanabilirsiniz:
   ```
   python -m http.server 8000
   ```

3. Tarayıcınızda `http://localhost:8000` adresine giderek uygulamayı görüntüleyin.

### Canlı Ortama Dağıtım

Uygulamayı canlı ortama dağıtmak için aşağıdaki platformlardan birini kullanabilirsiniz:

- **GitHub Pages**: Repository'nizi GitHub'a yükleyin ve GitHub Pages özelliğini etkinleştirin.
- **Netlify**: Repository'nizi Netlify'a bağlayın veya dosyaları doğrudan yükleyin.
- **Vercel**: Repository'nizi Vercel'e bağlayın.
- **Kendi Sunucunuz**: Dosyaları kendi web sunucunuza yükleyin.

## Özel Domain Entegrasyonu

Uygulamayı kendi domaininizde kullanmak için:

1. Uygulamayı yukarıdaki yöntemlerden biriyle dağıtın.
2. Domain sağlayıcınızın DNS ayarlarından, domaininizi uygulamanın dağıtıldığı adrese yönlendirin.
3. SSL sertifikası ekleyerek HTTPS desteği sağlayın.

## Dosya Yapısı

```
kisilik-analizi/
├── css/                  # CSS stil dosyaları
│   └── style.css         # Ana stil dosyası
├── js/                   # JavaScript dosyaları
│   ├── script.js         # Ana JavaScript dosyası
│   ├── personality_analyzer.js  # Kişilik analizi algoritması
│   ├── partner_compatibility.js # İş ortağı uyumluluk modülü
│   └── test.js           # Test senaryoları
├── docs/                 # Dokümantasyon dosyaları
│   ├── gereksinim_analizi.md       # Gereksinim analizi
│   ├── kisilik_degerlendirme_anketi.md  # Anket soruları
│   ├── kullanim_kilavuzu.md        # Kullanım kılavuzu
│   └── todo.md           # Yapılacaklar listesi
├── images/               # Görsel dosyaları
├── index.html            # Ana sayfa
├── karsilastirma.html    # Karşılaştırma sayfası
├── test.html             # Test sayfası
└── README.md             # Bu dosya
```

## Özelleştirme

Uygulamayı kendi ihtiyaçlarınıza göre özelleştirmek için:

### Görünüm Değiştirme

`css/style.css` dosyasını düzenleyerek renkleri, yazı tiplerini ve diğer görsel öğeleri değiştirebilirsiniz.

### Anket Sorularını Değiştirme

`js/personality_analyzer.js` dosyasındaki `questions` nesnesini düzenleyerek anket sorularını değiştirebilirsiniz.

### Değerlendirme Metinlerini Değiştirme

`js/personality_analyzer.js` dosyasındaki `evaluationTexts` ve `recommendations` nesnelerini düzenleyerek değerlendirme metinlerini ve tavsiyeleri değiştirebilirsiniz.

## Katkıda Bulunma

1. Bu repository'yi fork edin
2. Yeni bir branch oluşturun (`git checkout -b feature/amazing-feature`)
3. Değişikliklerinizi commit edin (`git commit -m 'Add some amazing feature'`)
4. Branch'inizi push edin (`git push origin feature/amazing-feature`)
5. Pull request oluşturun

## Lisans

Bu proje MIT lisansı altında lisanslanmıştır. Detaylar için `LICENSE` dosyasına bakın.

## İletişim

Proje Sahibi - [E-posta Adresiniz](mailto:email@example.com)

Proje Linki: [https://github.com/kullaniciadi/kisilik-analizi](https://github.com/kullaniciadi/kisilik-analizi)
