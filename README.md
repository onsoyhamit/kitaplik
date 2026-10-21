# 📚 Kitaplığım

Kişisel kitaplığını telefonunda taşı. Kitaplarını ekle, okuma durumunu işaretle, kime ödünç verdiğini takip et, notlarını ve sayfa fotoğraflarını sakla. Kurulabilir bir web uygulaması (PWA) olduğu için ana ekranına ekleyebilir, çevrimdışı da kullanabilirsin.

<p align="center">
  <img src="icon-512.png" alt="Kitaplığım" width="180"/>
</p>

**Canlı adresler**

- **https://kitapligim55.web.app** (birincil)
- **https://kitapligim.web.app** (eski adres)

## ✨ Neler yapabilirsin?

### 📖 Kitaplar
- Kitap ekle, düzenle; başlık, yazar, yayınevi, ISBN ve kapak bilgilerini sakla
- Arka kapaktaki **ISBN barkodunu kamerayla tara**, bilgiler otomatik dolsun
- **Bilgi getir** ile başlık, yazar veya ISBN'den katalog araması yap
- Kapağı katalogdan bul ya da kendi fotoğrafını yükle
- **Eksik ISBN'leri toplu bul** (Profil → Veriler) — bulunan ISBN farklı bir baskıya ait olabileceği için barkodla doğrula
- Kitaplarını **Okundu / Okuyorum / Okunmadı** olarak işaretle
- Kitap notları yaz, yanına kamera veya galeriden fotoğraf ekle; fotoğrafları tam ekranda yakınlaştırarak incele
- Kitabı kime, ne zaman ödünç verdiğini kaydet

### 🎨 Görünüm
- Dört tema: **Koyu**, **Açık**, **Buz** (varsayılan), **Orman** — ayrıca telefonunun temasını izleyen **Sistem** seçeneği
- Kütüphane başlığı kullanıcı adına göre kişiselleşir ("Hamit'in Kütüphanesi" gibi)

### 🔍 Arama ve filtreleme
- Kitap adı veya yazara göre arama; Türkçe karakter ve büyük/küçük harf duyarsız
- **Tümü, Okunanlar, Okunmayanlar, Ödünçte, Notlu** filtreleri
- Tarih, başlık veya yazara göre sıralama

### 📱 Mobil deneyim
- Ana ekrana ekleme, çevrimdışı kullanım
- **Vitrin ↔ Kütüphanem ↔ Profil** arasında parmakla kaydırma; alttaki tuşlar da çalışır
- Akıllı geri tuşu; sayfayı yenilesen bile kaldığın yerde kalırsın
- Kütüphane boşken seni ilk kitabını eklemeye yönlendiren karşılama ekranı

### 💾 Veriler
- Bulutta otomatik yedekleme ve cihazlar arası senkronizasyon
- **JSON** yedeği al / geri yükle
- **CSV** olarak dışa aktar (Excel, Google Sheets) veya içe aktar

### 🔐 Hesap ve güvenlik
- E-posta doğrulaması zorunlu; şifre sıfırlama e-posta ile
- Şifre en az **8 karakter** olmalı, harf ve rakam içermeli
- Herkesin verisi kendine özel; başka bir hesap göremez
- Hesabını ve tüm verilerini istediğinde kalıcı olarak silebilirsin

## 🚀 Başlarken

1. **Tarayıcıda aç**: yukarıdaki adreslerden biri
2. **Ana ekrana ekle**:
   - **Android (Chrome)**: ⋮ → "Ana ekrana ekle"
   - **iOS (Safari)**: Paylaş → "Ana Ekrana Ekle"
3. **Hesap oluştur**: kullanıcı adı, e-posta ve şifre
4. **E-postanı doğrula**: gelen kutundaki bağlantıya dokun, "Devam et" ile uygulamaya dön
5. **İlk kitabını ekle**: sağ alttaki **+** düğmesi

## 📖 Kullanım

### Kitap ekleme
- **Barkodla**: **+** → **ISBN tara** → kamerayı arka kapaktaki barkoda tut → bilgiler gelir → **Kaydet**
- **Elle**: **+** → başlık ve yazarı yaz → istersen ISBN gir → **Bilgi getir** → eksikleri tamamla → **Kaydet**

### Kitap düzenleme
Kitaba dokun → sağ üstteki kalem → değişiklikleri yap → **Kaydet**.

### Kitap silme
Kitaba dokun → kalem → **Kitabı sil** → onay penceresinde **Kitabı sil**.
Silinen kitap 7 gün boyunca **Profil → Veriler → Silinen kitaplar** bölümünde bekler; bildirimdeki **Geri al** ile hemen kurtarabilirsin.

### Eksik kapakları / ISBN'leri bulma
**Profil → Veriler** bölümünde iki toplu arama var:
- **Eksik kapakları bul** — kapağı olmayan kitaplar için katalogdan kapak arar
- **Eksik ISBN'leri bul** — ISBN'i eksik kitaplar için başlık ve yazara göre katalogda arar; kaç kitabın kontrol edildiğini ve kaç ISBN bulunduğunu canlı gösterir, istersen **Aramayı durdur** ile iptal edersin

> Bulunan ISBN, kitabın katalogdaki başka bir baskısına ait olabilir. Önemliyse kitabın arkasındaki barkodla karşılaştır.

### Yedekleme
**Profil → Veriler → Dışa aktar**
- **JSON**: kitaplar ve ayarlar (kapaklar ve not fotoğrafları dosya boyutu nedeniyle yedeğe dahil değildir)
- **CSV**: Başlık, Yazar, Okundu, Not, ISBN sütunlarıyla tablo

### Geri yükleme
**Profil → Veriler → İçe aktar** → JSON yedeğini veya CSV dosyanı seç. CSV'de yinelenen kayıtlar atlanır.

## 🐛 Sorun giderme

**E-posta gelmiyor**
- Spam/gereksiz klasörünü kontrol et
- Birkaç dakika bekle, tekrar dene
- Hâlâ gelmiyorsa uygulamadaki geri bildirim formundan yaz

**Barkod taranmıyor**
- Adresin **https** ile açıldığından emin ol
- Kamera iznini ver
- Chrome veya Edge kullan (bazı tarayıcılar barkod okumayı desteklemez)

**Çevrimdışı çalışmıyor**
- İlk açılışta internet gerekir (uygulama önbelleğe alınır)
- Daha önce açtıysan tarayıcı verilerini silmediğin sürece çalışır

**Tema değişmiyor / eski sürüm görünüyor**
- Sayfayı yenile (Ctrl+F5); bildirim gelirse **Güncelle**'ye dokun

**Kapak veya bilgi bulunamıyor**
- Kitabın adını ve yazarını kısaca yazıp tekrar dene
- Bazı kitaplar kataloglarda yoktur; bilgileri elle girebilirsin

## 🤝 Geri bildirim

Öneri ve hata bildirimlerini uygulama içinden iletebilirsin:
**Profil → Hakkımızda ve iletişim → Geri bildirim gönder**

## 📄 Lisans

Bu proje kişisel kullanım için geliştirilmiştir.

## 🙏 Teşekkürler

- **Firebase** — hesaplar ve veri senkronizasyonu
- **Google Books** ve **Open Library** — kitap bilgileri ve kapaklar
- **Tabler Icons** — simgeler
- **Google Fonts** — DM Sans ve Fraunces yazı tipleri

---

**Geliştirici**: Hamit
**Sürüm**: 1.4.9
**Son güncelleme**: Ekim 2026

📚 **Mutlu okumalar!**
