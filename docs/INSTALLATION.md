# Kurulum ve Dağıtım Rehberi

Bu rehber, Kişilik Analizi ve İş Ortağı Uyumluluk Değerlendirmesi uygulamasını farklı platformlarda nasıl kuracağınızı ve dağıtacağınızı açıklar.

## İçindekiler

- [Yerel Kurulum](#yerel-kurulum)
- [GitHub Pages ile Dağıtım](#github-pages-ile-dağıtım)
- [Netlify ile Dağıtım](#netlify-ile-dağıtım)
- [Vercel ile Dağıtım](#vercel-ile-dağıtım)
- [Kendi Sunucunuzda Dağıtım](#kendi-sunucunuzda-dağıtım)
- [Özel Domain Entegrasyonu](#özel-domain-entegrasyonu)

## Yerel Kurulum

### Gereksinimler

- Git (isteğe bağlı)
- Herhangi bir web sunucusu (örn. Python, Node.js, Apache, Nginx)

### Adımlar

1. Repository'yi klonlayın veya ZIP olarak indirin:
   ```bash
   git clone https://github.com/kullaniciadi/kisilik-analizi.git
   cd kisilik-analizi
   ```

2. Dosyaları bir web sunucusu ile sunun:

   **Python ile:**
   ```bash
   python -m http.server 8000
   ```

   **Node.js ile:**
   ```bash
   npx serve
   ```

3. Tarayıcınızda `http://localhost:8000` (veya sunucunuzun belirttiği URL) adresine giderek uygulamayı görüntüleyin.

## GitHub Pages ile Dağıtım

GitHub Pages, GitHub repository'nizden doğrudan statik web siteleri yayınlamanıza olanak tanır.

### Adımlar

1. GitHub'da yeni bir repository oluşturun.

2. Repository'nizi GitHub'a push edin:
   ```bash
   git init
   git add .
   git commit -m "Initial commit"
   git branch -M main
   git remote add origin https://github.com/kullaniciadi/kisilik-analizi.git
   git push -u origin main
   ```

3. GitHub repository'nizin ayarlar sayfasına gidin.

4. Sol menüden "Pages" seçeneğini bulun.

5. "Source" bölümünde, "Branch" kısmından "main" branch'ini ve "/(root)" klasörünü seçin.

6. "Save" butonuna tıklayın.

7. GitHub Pages siteniz birkaç dakika içinde `https://kullaniciadi.github.io/kisilik-analizi/` adresinde yayınlanacaktır.

## Netlify ile Dağıtım

Netlify, sürekli dağıtım ve otomatik SSL sertifikaları gibi özellikler sunar.

### Adımlar

1. [Netlify](https://www.netlify.com/)'e kaydolun veya giriş yapın.

2. "New site from Git" butonuna tıklayın.

3. Git sağlayıcınızı seçin (GitHub, GitLab veya Bitbucket).

4. Repository'nizi seçin.

5. Dağıtım ayarlarını yapılandırın:
   - Build command: (boş bırakın)
   - Publish directory: (boş bırakın veya `.` girin)

6. "Deploy site" butonuna tıklayın.

7. Siteniz birkaç saniye içinde `https://random-name.netlify.app` adresinde yayınlanacaktır.

## Vercel ile Dağıtım

Vercel, özellikle frontend projeleri için optimize edilmiş bir dağıtım platformudur.

### Adımlar

1. [Vercel](https://vercel.com/)'e kaydolun veya giriş yapın.

2. "New Project" butonuna tıklayın.

3. Git sağlayıcınızı seçin ve repository'nizi içe aktarın.

4. Dağıtım ayarlarını yapılandırın:
   - Framework Preset: Other
   - Build Command: (boş bırakın)
   - Output Directory: (boş bırakın)

5. "Deploy" butonuna tıklayın.

6. Siteniz birkaç saniye içinde `https://kisilik-analizi.vercel.app` adresinde yayınlanacaktır.

## Kendi Sunucunuzda Dağıtım

### Apache Web Sunucusu

1. Dosyaları Apache'nin belge kök dizinine kopyalayın (genellikle `/var/www/html/`):
   ```bash
   cp -r * /var/www/html/kisilik-analizi/
   ```

2. Apache'yi yeniden başlatın:
   ```bash
   sudo systemctl restart apache2
   ```

### Nginx Web Sunucusu

1. Dosyaları Nginx'in belge kök dizinine kopyalayın (genellikle `/usr/share/nginx/html/`):
   ```bash
   cp -r * /usr/share/nginx/html/kisilik-analizi/
   ```

2. Nginx yapılandırma dosyasını oluşturun:
   ```bash
   sudo nano /etc/nginx/conf.d/kisilik-analizi.conf
   ```

3. Aşağıdaki içeriği ekleyin:
   ```nginx
   server {
       listen 80;
       server_name kisilik-analizi.example.com;
       root /usr/share/nginx/html/kisilik-analizi;
       index index.html;
       
       location / {
           try_files $uri $uri/ /index.html;
       }
   }
   ```

4. Nginx'i yeniden başlatın:
   ```bash
   sudo systemctl restart nginx
   ```

## Özel Domain Entegrasyonu

### GitHub Pages ile Özel Domain

1. Domain sağlayıcınızın DNS ayarlarında, aşağıdaki A kayıtlarını ekleyin:
   ```
   185.199.108.153
   185.199.109.153
   185.199.110.153
   185.199.111.153
   ```

2. Alternatif olarak, bir CNAME kaydı ekleyebilirsiniz:
   ```
   CNAME: kullaniciadi.github.io
   ```

3. GitHub repository'nizin ayarlar sayfasında, "Pages" bölümüne gidin.

4. "Custom domain" alanına domaininizi girin ve "Save" butonuna tıklayın.

5. "Enforce HTTPS" seçeneğini işaretleyin.

### Netlify ile Özel Domain

1. Netlify kontrol panelinizde, sitenizi seçin.

2. "Domain settings" veya "Domain management" bölümüne gidin.

3. "Add custom domain" butonuna tıklayın.

4. Domaininizi girin ve "Verify" butonuna tıklayın.

5. Domain sağlayıcınızın DNS ayarlarında, Netlify'ın sağladığı DNS kayıtlarını ekleyin veya nameserver'larınızı Netlify'ın nameserver'ları ile değiştirin.

### Vercel ile Özel Domain

1. Vercel kontrol panelinizde, projenizi seçin.

2. "Settings" sekmesine gidin.

3. Sol menüden "Domains" seçeneğini tıklayın.

4. "Add" butonuna tıklayın ve domaininizi girin.

5. Domain sağlayıcınızın DNS ayarlarında, Vercel'in sağladığı DNS kayıtlarını ekleyin.

### Kendi Sunucunuzda Özel Domain

1. Domain sağlayıcınızın DNS ayarlarında, A kaydı ekleyin:
   ```
   A: sunucu_ip_adresi
   ```

2. Web sunucunuzun yapılandırmasını güncelleyin:

   **Apache:**
   ```apache
   <VirtualHost *:80>
       ServerName domain.com
       ServerAlias www.domain.com
       DocumentRoot /var/www/html/kisilik-analizi
       
       <Directory /var/www/html/kisilik-analizi>
           Options -Indexes +FollowSymLinks
           AllowOverride All
           Require all granted
       </Directory>
       
       ErrorLog ${APACHE_LOG_DIR}/domain.com-error.log
       CustomLog ${APACHE_LOG_DIR}/domain.com-access.log combined
   </VirtualHost>
   ```

   **Nginx:**
   ```nginx
   server {
       listen 80;
       server_name domain.com www.domain.com;
       root /usr/share/nginx/html/kisilik-analizi;
       index index.html;
       
       location / {
           try_files $uri $uri/ /index.html;
       }
   }
   ```

3. SSL sertifikası eklemek için Let's Encrypt kullanabilirsiniz:
   ```bash
   sudo certbot --apache -d domain.com -d www.domain.com
   ```
   veya
   ```bash
   sudo certbot --nginx -d domain.com -d www.domain.com
   ```

Bu rehber, uygulamanızı farklı platformlarda nasıl dağıtacağınızı ve özel domaininizle nasıl entegre edeceğinizi açıklamaktadır. Herhangi bir sorunla karşılaşırsanız, lütfen GitHub üzerinden bir issue açın.
