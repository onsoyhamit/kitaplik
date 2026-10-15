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
  - Google Books ve Open Library entegrasyonu
- **Kapak Görselleri**: Katalogdan otomatik kapak bulma veya kendi fotoğrafınızı yükleyin
- **Okuma Takibi**: "Okundu", "Okunmadı" veya "Şu an okuyorum" durumlarını işaretleyin
- **Ödünç Takibi**: Kitabı kime, ne zaman verdiğinizi kaydedin
- **Notlar**: Kitaplarınız hakkında düşüncelerinizi yazın

### 🎨 Tema ve Kişiselleştirme
- **Üç Tema Seçeneği**:
  - 🌙 **Gece Kütüphanesi** - Koyu, göz dostu tema
  - 📄 **Kağıt** - Açık, minimalist tema
  - 🔄 **Sistem (Otomatik)** - Telefonunuzun tema ayarına göre otomatik geçiş yapar
- **Yazı Boyutu**: Küçük, Orta, Büyük seçenekleriyle özelleştirin
- **Kişiselleştirilmiş Başlık**: "(Adınız) Kütüphanesi" şeklinde özel karşılama

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
- **Kaydırılabilir Tanıtım**: İlk açılışta parmakla kaydırılabilen 3 ekranlık tanıtım
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
- **Güçlü Şifre Politikası**: En az 6 karakter, harf, rakam ve noktalama işareti
- **Parola Sıfırlama**: E-posta ile güvenli parola sıfırlama
- **Kişisel Veri**: Her kullanıcının verisi tamamen ayrı ve gizlidir

## 🚀 Kurulum

### Kullanıcı Olarak Kullanım

1. **Tarayıcıda Aç**: Uygulamanın yayınlandığı URL'ye gidin
2. **Ana Ekrana Ekle**:
   - **Android**: Chrome → ⋮ → "Ana ekrana ekle"
   - **iOS**: Safari → Paylaş → "Ana Ekrana Ekle"
3. **Hesap Oluştur**: Ad, e-posta ve güçlü bir parola ile kayıt olun
4. **E-posta Doğrula**: Gelen kutunuza gelen doğrulama linkine tıklayın
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

```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    match /users/{uid} {
      allow read, write: if request.auth != null && request.auth.uid == uid;
      
      match /library/{doc} {
        allow read, write: if request.auth != null 
                          && request.auth.uid == uid 
                          && request.auth.token.email_verified == true;
      }
      
      match /covers/{bookId} {
        allow read, write: if request.auth != null 
                          && request.auth.uid == uid;
      }
    }
  }
}
```

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
- **Google Books API**: Kitap bilgisi ve kapak arama
- **BarcodeDetector API**: ISBN tarama (Chrome/Edge)

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
   - İsterseniz ISBN girin (otomatik arama yapılır)
   - "Kaydet" deyin

### Kitap Düzenleme
- Kitaba tıklayın
- Sağ üstteki düzenle ikonuna basın
- Değişiklikleri yapın ve kaydedin

### Kitap Silme
- Kitaba tıklayın
- "Kitabı sil" butonuna basın
- Onaylayın (silinen kitaplar "Çöp Kutusu"na gider)

### Veri Yedekleme
1. Profil sayfasına gidin
2. "Yedekle (JSON indir)" seçeneğine tıklayın
3. Dosya indirilecek, güvenli bir yerde saklayın

### CSV Dışa Aktarma
1. Profil → "CSV olarak dışa aktar"
2. Excel veya Google Sheets ile açın
3. Sütunlar: Başlık, Yazar, Okundu, Not, ISBN

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
