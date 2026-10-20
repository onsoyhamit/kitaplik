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
  - 🌙 **Koyu** - Sıcak koyu tema (varsayılan koyu)
  - 📄 **Açık** - Sıcak kağıt tonlu açık tema
  - ❄️ **Buz** - Serin, mavi-gri açık tema
  - 🌲 **Orman** - Yeşil tonlu koyu tema
  - 🔄 **Sistem (cihaz)** - Telefonunuzun tema ayarını otomatik izler
- **Kişiselleştirilmiş Başlık**: Kullanıcı adına Türkçe iyelik eki otomatik uygulanır (örn. "Hamit'in Kütüphanesi", "Ayşe'nin Kütüphanesi", "Oğuz'un Kütüphanesi") — vitrin ve kütüphane başlıklarında görünür

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
- **URL Yönetimi**: Sayfa yenilediğinizde kaldığınız yerde kalırsınız
  - Kitap detay sayfaları: `#kitap/ID`
  - Diğer sayfalar: `#home`, `#ara`, `#profil`
- **Touch Optimizasyonu**: Mobil cihazlar için optimize edilmiş dokunmatik kontroller

### 💾 Veri Yönetimi
- **Otomatik Senkronizasyon**: Kitaplarınız bulutta saklanır ve cihazlar arası senkronize olur
- **CSV İçe/Dışa Aktarma**: Kitap listenizi Excel ile paylaşın
- **JSON Yedekleme**: Tam veri yedeği alın
- **Çevrimdışı Çalışma**: İnternet olmadan da kitaplarınıza erişin

### 🔐 Güvenlik
- **E-posta Doğrulama**: Hesap güvenliği için e-posta doğrulaması zorunludur
- **Kullanıcı Adı**: Kayıtta zorunludur ve kütüphane başlıklarında gösterilir
- **Şifre Politikası**: En az 6 karakter, harf ve rakam içermeli
- **Parola Sıfırlama**: E-posta ile güvenli parola sıfırlama
- **Kişisel Veri**: Her kullanıcının verisi tamamen ayrı ve gizlidir
- **App Check**: reCAPTCHA Enterprise ile Firebase istekleri doğrulanır; botlar ve uygulama dışı istemciler engellenir
- **Güvenlik Başlıkları**: CSP, HSTS, `X-Frame-Options` ve `Permissions-Policy` ile sıkılaştırılmıştır
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

Canlı adres **https://kitapligim55.web.app**'tir. Bu adres `kitapligim55` projesinin varsayılan Hosting sitesidir; `firebase.json` ve GitHub Actions doğrudan bu siteye yayınlar. `https://kitapligim.web.app` adresi eski/alternatif site olarak açık kalır ancak yeni sürümler buraya gönderilmez; doğrulama e-postalarındaki dönüş adresi de `https://kitapligim55.web.app/` olur.

## 📂 Proje Yapısı

```
kitaplik-pwa/
├── index.html              # Ana uygulama (HTML + CSS + JS)
├── manifest.webmanifest    # PWA manifest
├── sw.js                   # Service Worker (çevrimdışı destek)
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
- **Doğrulama**: `library/main` yalnızca `{books, set}` alanlarını kabul eder; en fazla 500 kitap; `set` yalnızca `th, fs, sh, sa, lh, un` anahtarlarını taşıyabilir.
- **Boyut**: kapak ve not fotoğrafları en fazla 900.000 karakter (base64) olabilir.
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
- **ZXing (@zxing/library)**: ISBN barkod çözümleme (kamera)

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
- Kitaba tıklayın
- "Kitabı sil" butonuna basın
- Onaylayın (silinen kitaplar "Çöp Kutusu"na gider)

### Veri Yedekleme / Dışa Aktarma
1. Profil → "Veriler" → **Dışa aktar**
2. Biçim seçin:
   - **JSON yedeği (.json)** → tam veri yedeği (kitaplar + ayarlar), güvenli bir yerde saklayın
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
**Versiyon**: 1.0.0  
**Son Güncelleme**: Ekim 2026

---

📚 **Mutlu okumalar!**
