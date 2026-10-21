# 📚 Kitaplığım

Modern, kullanıcı dostu ve tamamen mobil uyumlu kişisel kitaplık uygulaması. Progressive Web App (PWA) teknolojisiyle cihazınıza kurulabilir ve çevrimdışı çalışabilir.

<p align="center">
  <img src="icon-512.png" alt="Kitaplığım Logo" width="200"/>
</p>

## ✨ Özellikler

### 📖 Kitap Yönetimi
- **Kitap Ekleme & Düzenleme**: Kitaplarınızı başlık, yazar, ISBN ve kapak görseli ile ekleyin
- **ISBN Barkod Tarama**: Kamera ile ISBN-13 barkodunu tarayın, kitap bilgileri otomatik gelsin
  - Animasyonlu barkod tarama çerçevesi
  - Gerçek zamanlı tarama göstergesi
  - ISBN okununca başlık, yazar, yayınevi ve kapak otomatik doldurulur
- **Bilgi Getir**: ISBN veya başlık+yazar yazıp bilgileri elle de aratabilirsiniz
- **Çoklu Kaynak Arama**: Önce Google Books, bulunamazsa Open Library (ISBN ve başlık araması) denenir; sonuç yoksa uygulama sizi elle girmeye yönlendirir (uydurma bilgi göstermez)
- **Kapak Görselleri**: Katalogdan otomatik kapak bulma veya kendi fotoğrafınızı yükleyin
- **Okuma Takibi**: "Okundu", "Okunmadı" veya "Şu an okuyorum" durumlarını tek parça durum kontrolüyle işaretleyin; kapak çevresindeki neon çerçeve ve kapak altındaki durum satırı anında güncellenir, kapak fotoğrafına dokununca animasyonlu büyütülür
- **Ödünç Takibi**: Kitabı kime, ne zaman verdiğinizi kaydedin
- **Notlar**: Kitaplarınız hakkında düşüncelerinizi yazın; yanına **Fotoğraf çek** (kamera) veya **Galeriden seç** ile fotoğraf ekleyin. Eklenen sayfa fotoğrafları film rulosu şeridinde saklanır, dokununca tam ekranda açılır; **iki parmakla yakınlaştırma (pinch)**, çift dokunuşla zoom, sürükleyerek gezinme desteklenir. Silme yalnızca tam ekranda ve onay sorularak yapılır

### 🎨 Tema ve Kişiselleştirme
- **Uygulama Görünümü** (Profil'de açılır bölüm):
  - 🌙 **Koyu** - Sıcak koyu tema
  - 📄 **Açık** - Sıcak kağıt tonlu açık tema
  - ❄️ **Buz** - Serin, mavi-gri açık tema (varsayılan)
  - 🌲 **Orman** - Yeşil tonlu koyu tema
  - 🔄 **Sistem (cihaz)** - Telefonunuzun tema ayarını otomatik izler
- **Tanıtım Ekranı**: Uygulama tanıtımı (onboarding) her temada açık renk paletiyle gösterilir
- **Kişiselleştirilmiş Başlık**: Kullanıcı adına Türkçe iyelik eki otomatik uygulanır (örn. "Hamit'in Kütüphanesi", "Ayşe'nin Kütüphanesi", "Oğuz'un Kütüphanesi") — vitrin ve kütüphane başlıklarında görünür. Ödünç bölümünde de isimler kesme işaretiyle ayrılıp hâl ekleri ünlü uyumuna göre yazılır ("Sümeyye'de", "Onur'dan", "Hamit'te", "Ayşe'ye")

### 🔍 Arama ve Filtreleme
- **Akıllı Arama**: Kitap adı veya yazar ile hızlı arama
- **Kategori Filtreleri**:
  - Tüm kitaplar
  - Okunanlar
  - Okunmayanlar
  - Ödünçte olanlar
  - Notlu kitaplar
- **Türkçe Karakter Desteği**: Büyük/küçük harf ve Türkçe karakter duyarlı olmayan arama

### 📱 Mobil Deneyim
- **Kaydırılabilir Tanıtım**: İlk açılışta parmakla kaydırılabilen veya "Devam et" ile ilerlenen 4 ekranlık tanıtım (animasyonlu simgeler). Giriş yapıldıysa tanıtım atlanıp doğrudan ana sayfa açılır; tanıtım renkleri cihazın tema ayarına uyar.
- **Akıllı Geri Tuşu**:
  - Ara ve Profil sayfalarından Ana Sayfa'ya döner
  - Ana Sayfa'da çıkmak için 2 kez geri tuşuna basın (uyarı verir)
- **Sekmeler Arası Kaydırma**: Vitrin ↔ Kütüphanem ↔ Profil arasında parmağı sağa/sola kaydırarak geçiş yapılabilir; alttaki navigasyon tuşları aynı şekilde çalışmaya devam eder. Filtre/arama çipleri, raflar ve form alanları üzerindeki kaydırmalar sayfa geçişini tetiklemez.
- **URL Yönetimi**: Sayfa yenilediğinizde kaldığınız yerde kalırsınız
  - Kitap detay sayfaları: `#kitap/ID`
  - Diğer sayfalar: `#home`, `#ara`, `#profil`
- **Boş Durum Mesajları**: Kütüphane tamamen boşsa "Kendi kütüphaneni kur" karşılaması ve "İlk kitabını ekle" butonu görünür; "Sonuç bulunamadı" uyarısı yalnızca arama kutusuna yazılan metinle eşleşen kitap yoksa gösterilir, filtre boşsa filtreye özel mesaj çıkar
- **Touch Optimizasyonu**: Mobil cihazlar için optimize edilmiş dokunmatik kontroller

### 💾 Veri Yönetimi
- **Otomatik Senkronizasyon**: Kitaplarınız bulutta saklanır ve cihazlar arası senkronize olur
- **CSV İçe/Dışa Aktarma**: Kitap listenizi Excel ile paylaşın
- **JSON Yedekleme**: Kitaplar ve ayarlar için yedek alın (kapaklar ve not fotoğrafları boyutu nedeniyle yedeğe dahil edilmez)
- **Çevrimdışı Çalışma**: İnternet olmadan da kitaplarınıza erişin

### 🔐 Güvenlik
- **E-posta Doğrulama**: Hesap güvenliği için e-posta doğrulaması zorunludur
- **Kullanıcı Adı**: Kayıtta zorunludur ve kütüphane başlıklarında gösterilir
- **Şifre Politikası**: En az 10 karakter; harf ve rakam içermeli; yaygın/zayıf şifreler reddedilir
- **Parola Sıfırlama**: E-posta ile güvenli parola sıfırlama
- **Deneme Sınırı**: Art arda hatalı girişlerde artan bekleme; sıfırlama/doğrulama e-postalarında 60 sn bekleme
- **Kişisel Veri**: Her kullanıcının verisi tamamen ayrı ve gizlidir
- **App Check**: reCAPTCHA Enterprise ile Firebase istekleri doğrulanır; botlar ve uygulama dışı istemciler engellenir
- **Güvenlik Başlıkları**: CSP (`script-src` hash tabanlı, `script-src-attr 'none'`), HSTS, `X-Frame-Options`, COOP/CORP ve `Permissions-Policy` ile sıkılaştırılmıştır
- **XSS Koruması**: Kullanıcı kaynaklı tüm değerler `esc()` ile kaçırılır; bağlantı/görsel alanları şema ve boyut doğrulamasından geçer
- **Çıkışta Yerel Temizlik**: Çıkış yapınca cihazdaki çevrimdışı Firestore önbelleği temizlenir
- **Hesap Silme**: Şifre doğrulaması sonrası kitaplık, kapaklar, not fotoğrafları ve kullanıcı belgesi kalıcı olarak silinir

### 👤 Hesabım ve Güvenlik (Profil)
Profil sayfasındaki **Hesabım ve güvenlik** bölümünde:
- **Kullanıcı adı değiştirme** - şifre doğrulaması ister; şifre bilinmiyorsa "Şifremi unuttum" ile sıfırlama bağlantısı gönderilir
- **Şifre değiştirme** - mevcut şifre + yeni şifre (iki kez) doğrulaması
- **Çıkış yap** - "Evet / Vazgeç" onayı ile
- **Hesabımı sil** - şifre doğrulaması sonrası kitaplık, notlar, kapaklar ve hesap kalıcı olarak silinir

Ayrıca aynı sayfada **Veriler**, **Hakkımızda ve iletişim** (geri bildirim) ve **Gizlilik politikası / kullanım şartları / uygulama izinleri** bölümleri bulunur.

## 🚀 Kurulum

### Kullanıcı Olarak Kullanım

1. **Tarayıcıda Aç**: Uygulamanın yayınlandığı URL'ye gidin
2. **Ana Ekrana Ekle**:
   - **Android**: Chrome → ⋮ → "Ana ekrana ekle"
   - **iOS**: Safari → Paylaş → "Ana Ekrana Ekle"
3. **Hesap Oluştur**: Ad, e-posta ve güçlü bir parola ile kayıt olun
4. **E-posta Doğrula**: Gelen kutunuza gelen doğrulama linkine tıklayın; bağlantı sayfasındaki **Devam et**'e bastığınızda uygulamaya dönün — uygulama açıkken doğrulama kendiliğinden algılanır ve ana ekrana geçilir
5. **Kitap Eklemeye Başlayın**: İlk kitabınızı ekleyin!

### Geliştirici Olarak Kurulum

#### Gereksinimler
- Firebase projesi
- Node.js ve npm (Firebase CLI için)
- Modern web tarayıcısı

#### Firebase Yapılandırması

1. **Firebase Projesi Oluşturun**:
   ```bash
   # Firebase Console'a gidin: https://console.firebase.google.com
   # Yeni proje oluşturun
   # Web app ekleyin
   ```

2. **Authentication Ayarları**:
   - Firebase Console → Authentication → Sign-in method
   - **Email/Password** yöntemini etkinleştirin
   - Authentication → Settings → Authorized domains bölümünde hosting URL'inizi ekleyin

3. **Firestore Database**:
   - Firebase Console → Firestore Database oluşturun
   - `firestore.rules` dosyasını deploy edin

4. **Firebase Yapılandırma**:
   - `index.html` dosyasındaki `firebaseConfig` nesnesini kendi proje bilgilerinizle güncelleyin:
   ```javascript
   const fapp=initializeApp({
     apiKey: "YOUR_API_KEY",
     authDomain: "YOUR_PROJECT.firebaseapp.com",
     projectId: "YOUR_PROJECT_ID",
     storageBucket: "YOUR_PROJECT.appspot.com",
     messagingSenderId: "YOUR_SENDER_ID",
     appId: "YOUR_APP_ID"
   });
   ```

#### Yerel Geliştirme

```bash
# Firebase CLI kurulumu
npm install -g firebase-tools

# Firebase'e giriş
firebase login

# Projenizi seçin
firebase use --add

# Yerel sunucu başlatın
firebase serve
```

Tarayıcınızda `http://localhost:5000` adresine gidin.

#### Yayınlama

```bash
# Firestore kuralları ve hosting'i yayınlayın
firebase deploy --only firestore:rules,hosting
```

#### CSP hash (önemli)

`index.html` içindeki satır içi modülün SHA-256 özeti `firebase.json` içindeki CSP'de yazılıdır. Satır içi betiği değiştirdikten sonra hash'i güncelleyin:

```bash
node tools/csp-hash.mjs --write   # firebase.json'daki sha256-... değerini günceller
node tools/csp-hash.mjs --check   # deploy öncesi doğrulama
```

Hash uyuşmazsa tarayıcı betiği çalıştırmaz (boş ekran). GitHub Actions her deploy öncesi `--check` adımını çalıştırır.

#### Sürüm artırma

`index.html` içindeki `VERS` üç parçalıdır (`A.B.C`). Her commit'te `C` bir artar; `C=9` iken sonraki artışta `B` bir artar ve `C` sıfırlanır; `B=9` iken `A` artar (`1.9.9 → 2.0.0`). Örnek: `1.4.7 → 1.4.8 → 1.4.9 → 1.5.0`.

```bash
node tools/ver-bump.mjs         # VERS'i artırır, CSP hash'ini ve sw.js C sürümünü yeniler
node tools/ver-bump.mjs --dry   # sadece yeni sürümü gösterir
```

#### Simgeler (yerel, alt küme)

Buton simgeleri **Tabler Icons**'tan gelir ama CDN'den yüklenmez: `vendor/tabler-icons.css` ve `vendor/fonts/tabler-icons.woff2` yereldir ve yalnız kullanılan simgeleri içerir (~12 KB). Böylece CDN engeli/kesintisi veya çevrimdışı durumda ikonlar kaybolmaz.

Daha önce kullanılmayan bir `ti-*` simgesi eklediyseniz:

```bash
node tools/icons.mjs --build   # CSS + font alt kümesini yeniler (python + fonttools gerekir)
node tools/icons.mjs --check   # eksik simge var mı denetler
```

Font kırpma için bir kez: `python -m pip install fonttools brotli`.

#### Kapak görselleri

Kapaklar Open Library / Google Books'tan gelir. Open Library'nin büyük kapakları `archive.org` adresine yönlendiği için CSP `img-src` bu alan adlarını da içerir; yeni bir kapak kaynağı eklerken `firebase.json` içindeki `img-src` listesini iki hosting girdisinde de güncelleyin.

Canlı adresler:

- **https://kitapligim55.web.app** (birincil)
- **https://kitapligim.web.app** (eski adres)

`firebase.json` içindeki `hosting` **iki site** tanımlar (`site` alanları `kitapligim55` ve `kitapligim`); `firebase deploy --only hosting` ve GitHub Actions her ikisine de aynı sürümü yayınlar. Eski adres de güvenli sürümü sunar, böylece eski sürümün zayıf CSP'si (`'unsafe-inline'`, `esm.sh`) hiçbir adreste açık kalmaz.

İki hosting girdisinin `ignore` ve `headers` blokları **birebir aynı olmalıdır**. Başlık/CSP değiştirirken her iki girdiye de uygula; `node tools/csp-hash.mjs --check` hem hash'i hem de iki girdinin aynılığını doğrular (uyuşmazsa çıkış kodu 1 verir). Doğrulama e-postalarındaki dönüş adresi `https://kitapligim55.web.app/` olur.

## 📂 Proje Yapısı

```
kitaplik-pwa/
├── index.html              # Ana uygulama (HTML + CSS + JS)
├── manifest.webmanifest    # PWA manifest
├── sw.js                   # Service Worker (çevrimdışı destek)
├── vendor/zxing.min.js     # Barkod okuyucu (yerel kopya, CDN'e bağımlı değil)
├── tools/csp-hash.mjs      # CSP hash doğrulama/güncelleme yardımcısı
├── firestore.rules         # Firestore güvenlik kuralları
├── firebase.json           # Firebase yapılandırması
├── icon-192.png           # PWA ikonu (192×192)
├── icon-512.png           # PWA ikonu (512×512)
├── icon-maskable-512.png  # Maskable ikon (Android)
├── apple-touch-icon.png   # iOS ana ekran ikonu
├── favicon.ico            # Tarayıcı ikonu
└── README.md              # Bu dosya
```

## 🛡️ Güvenlik Kuralları

### Firestore Kuralları (`firestore.rules`)

Kuralların tamamı `firestore.rules` dosyasındadır. Özet:

- **Erişim**: yalnızca giriş yapmış ve e-posta adresi doğrulanmış kullanıcı kendi `users/{uid}` ağacına erişebilir; `list` kapalıdır.
- **Doğrulama**: `library/main` yalnızca `{books, set}` alanlarını kabul eder; en fazla 500 kitap; `set` yalnızca `th, fs, sh, sa, lh, un` anahtarlarını taşıyabilir ve her alan tip/boyut doğrulamasından geçer (raflar ≤ 20, ödünç geçmişi ≤ 500, kullanıcı adı ≤ 30).
- **Boyut ve biçim**: kapak görselleri `data:image/(jpeg|png|webp);base64,...` biçiminde ve ≤ 500.000 karakter; not fotoğrafları aynı biçimde ≤ 700.000 karakterdir. Kapak kimliği ve not fotoğrafının bağlı olduğu kitap kimliği yalnızca `[A-Za-z0-9_-]` karakterlerini içerebilir.
- **Kitaplık içeriği**: Firestore kuralları dizi elemanlarını tek tek doğrulayamadığı için `books` içeriği istemcide (`A.save`, `restoreJSON`, CSV içe aktarma) doğrulanır ve alan uzunlukları sınırlandırılır.
- **Silme**: yalnızca sahibi ve e-posta doğrulaması yapılmış kullanıcı silebilir (hesap silme akışı).
- **Varsayılan**: eşleşmeyen tüm yollar reddedilir (`allow read, write: if false`).

### Veri Modeli

**Kullanıcı Belgesi**: `users/{uid}`
```json
{
  "createdAt": "timestamp"
}
```

**Kitaplık Belgesi**: `users/{uid}/library/main`
```json
{
  "books": [
    {
      "id": "unique-id",
      "t": "Kitap Başlığı",
      "a": "Yazar Adı",
      "isbn": "9781234567890",
      "c": "https://kapak-url.com/image.jpg",
      "r": true,
      "k": false,
      "l": {"to": "Ahmet", "d": 1234567890},
      "n": "Notlarım...",
      "ad": 1234567890,
      "x": false
    }
  ],
  "set": {
    "theme": "gece",
    "fontSize": "16px"
  }
}
```

## 🎨 Tasarım Detayları

### Renk Paleti

**Gece Kütüphanesi (Koyu Tema)**:
- Arka plan: `#1a1310` (Derin kahve)
- Panel: `#2a201a` (Koyu kahve)
- Vurgu: `#e8a23a` (Sıcak amber)
- Metin: `#f3e9dc` (Krem beyaz)

**Kağıt (Açık Tema)**:
- Arka plan: `#f6f0e6` (Kağıt bej)
- Panel: `#ece3d4` (Açık bej)
- Vurgu: `#b5651d` (Koyu amber)
- Metin: `#2a201a` (Koyu kahve)

### Tipografi
- **Başlıklar**: Fraunces (serif)
- **Gövde Metni**: DM Sans (sans-serif)
- **Boyutlar**: 14px, 16px (varsayılan), 18px

## 🔧 Teknik Detaylar

### Teknoloji Yığını
- **Frontend**: Vanilla JavaScript (framework yok)
- **Stil**: Custom CSS (CSS değişkenleri ile temalama)
- **Backend**: Firebase (Auth + Firestore)
- **Hosting**: Firebase Hosting
- **PWA**: Service Worker + Web App Manifest

### Tarayıcı Desteği
- Chrome/Edge 90+
- Safari 14+
- Firefox 88+
- Samsung Internet 14+

### API Entegrasyonları
- **Google Books API**: Kitap bilgisi ve kapak arama (birincil kaynak)
- **Open Library API**: ISBN ve başlık araması (Google Books sonuç vermezse yedek kaynak)
- **ZXing (@zxing/library)**: ISBN barkod çözümleme (kamera) — `vendor/zxing.min.js` olarak yerel barındırılır (üçüncü taraf CDN'e çalışma anında bağımlılık yok)

## 📖 Kullanım Kılavuzu

### Kitap Ekleme

1. **Yöntem 1: Barkod Tarama**
   - Ana sayfada "+" butonuna tıklayın
   - "ISBN tara" butonuna basın
   - Kamerayı kitabın arka kapağındaki barkoda tutun
   - Bilgiler otomatik gelecek, "Kaydet" deyin

2. **Yöntem 2: Manuel Giriş**
   - Ana sayfada "+" butonuna tıklayın
   - Başlık ve yazar girin
   - İsterseniz ISBN girin, ardından "Bilgi getir" ile başlık/yazar/yayınevi/kapağı otomatik doldurun
   - Arama sonuç vermezse bilgileri elle doldurun; "Kaydet" deyin

### Kitap Düzenleme
- Kitaba tıklayın
- Sağ üstteki düzenle ikonuna basın
- Değişiklikleri yapın ve kaydedin

### Kitap Silme
- Kitaba tıklayın, sağ üstteki kalemle düzenlemeye geçin
- "Kitabı sil" butonuna basın
- Açılan onay penceresinde "Kitabı sil" ile doğrulayın (yanlışlıkla silmeye karşı "Vazgeç" odaklıdır)
- Kitap silindikten sonra uygulama sizi geldiğiniz yere (kütüphane listesi veya vitrin) döndürür; kaybolan kitap 7 gün "Silinen kitaplar" bölümünde kalır ve bildirimdeki "Geri al" ile hemen geri getirilebilir

### Veri Yedekleme / Dışa Aktarma
1. Profil → "Veriler" → **Dışa aktar**
2. Biçim seçin:
   - **JSON yedeği (.json)** → kitaplar + ayarlar (kapaklar ve not fotoğrafları dahil değildir), güvenli bir yerde saklayın
   - **CSV tablosu (.csv)** → Excel veya Google Sheets ile açın; sütunlar: Başlık, Yazar, Okundu, Not, ISBN

### Veri Geri Yükleme / İçe Aktarma
1. Profil → "Veriler" → **İçe aktar**
2. Biçim seçin:
   - **JSON yedeğinden geri yükle** → daha önce indirdiğiniz `.json` dosyasını seçin
   - **CSV dosyasından aktar** → `.csv` dosyasını seçin (yinelenen kayıtlar atlanır)

## 🐛 Sorun Giderme

### E-posta gelmiyor
- Spam klasörünü kontrol edin
- Firebase Console'da e-posta şablonlarını kontrol edin
- Domain doğrulaması yapın (SPF/DKIM)

### Barkod taramıyor
- HTTPS üzerinden eriştiğinizden emin olun
- Kamera iznini verin
- Tarayıcınız BarcodeDetector API'yi desteklemiyor olabilir (Chrome/Edge kullanın)

### Çevrimdışı çalışmıyor
- İlk açılışta internet bağlantısı olmalı (Service Worker kurulumu için)
- Tarayıcı önbelleğini temizlemediyseniz veriler durmalı

### Tema değişmiyor
- Sayfayı yenileyin (Ctrl+F5)
- Tarayıcı cache'ini temizleyin

## 🤝 Katkıda Bulunma

Bu proje açık kaynak değil ancak önerilerinizi ve hata bildirimlerinizi memnuniyetle karşılıyoruz.

## 📄 Lisans

Bu proje kişisel kullanım için geliştirilmiştir.

## 🙏 Teşekkürler

- **Firebase**: Backend altyapı
- **Google Books API**: Kitap bilgileri
- **Tabler Icons**: İkon seti
- **Google Fonts**: DM Sans ve Fraunces fontları

---

**Geliştirici**: Hamit  
**Versiyon**: 1.4.6  
**Son Güncelleme**: Ekim 2026

---

📚 **Mutlu okumalar!**
