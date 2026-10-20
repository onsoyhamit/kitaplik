---
name: Veri Modeli ve Güvenlik
description: Kitaplığım PWA'sında veri modelini değiştirirken, yeni kalıcı alan eklerken, Firestore güvenlik kurallarını (firestore.rules) veya yedekleme/CSV/geri yükleme işlemlerini düzenlerken kullan. Veri anahtarlarını yeniden adlandırmanın neden yasak olduğunu ve XSS korumasını açıklar.
---

# Veri Modeli, Güvenlik ve Yedekleme

---

## 1. Veri modeli (kasıtlı kısa anahtarlar — değiştirme!)

Kitap nesnesi — kısa anahtarlar Firestore'da yer kazanmak için **kasıtlıdır**:

| Anahtar | Anlam | Tip |
|---|---|---|
| `id` | Benzersiz kimlik | string |
| `t` | Başlık | string |
| `a` | Yazar | string |
| `y` | Yayınevi | string |
| `isbn` | ISBN-13 | string |
| `c` | Kapak görsel URL'i (harici) | string |
| `u` | 1000kitap bağlantısı | string |
| `r` | Okundu | bool |
| `k` | Şu an okunuyor | bool |
| `l` | Ödünç `{type:'ver'\|'al', to, d}` | object\|null |
| `n` | Notlar | string |
| `ad` | Eklenme zamanı (ms) | int |
| `x` | Silinme zamanı (ms) — 7 gün sonra kalıcı silinir | int\|false |

`set` (kullanıcı ayarları): `th` (tema), `fs` (yazı boyutu), `sh` (özel raflar `[{id,name}]`), `sa` (kitap→raf eşlemesi `{bookId:shelfId}`), `lh` (ödünç geçmişi `[{id,bookTitle,type,to,d,rd}]`), `un` (kullanıcı adı — kayıtta alınır, profilden değiştirilir; `displayName` yerine bu okunur).

**Yerel durum değişkenleri:** `v` (görünüm), `cur` (aktif kitap id), `f` (filtre), `q` (arama), `srt` (sıralama), `books`, `set`, `covers`, `notePhotos`, `user`, `lo`.

**Yazma/okuma:** Kalıcı veri `persist()` (`setDoc(ref,{books,set})`) ile yazılır; `start()` içindeki `onSnapshot` dinleyicileriyle okunur. Veriyi değiştirdikten sonra **her zaman** `persist()` çağır.

---

## 2. Yeni kalıcı alan eklerken 4 adım

1. `firestore.rules`'daki `hasOnly([...])` / `hasAll([...])` listesini güncelle.
2. `README.md` veri modeli bölümünü güncelle.
3. Yedekleme (`bak`), geri yükleme (`restoreJSON`) ve CSV (`csv`/`imp`) işlemlerini kontrol et — veri kaybı olmasın.
4. Eski kayıtlarda alan olmayabilir; `?.` veya varsayılan değerle tolere et.

---

## 3. Firestore güvenlik kuralları (`firestore.rules`)

Kural, koda bağlı şema doğrulaması yapar. Mevcut sözleşme:

- `users/{uid}` → yalnızca `{uid, createdAt}`; `get`/`create`/`delete` sahibi (delete ayrıca e-posta doğrulaması ister), `update` kapalı.
- `library/main` → `{books, set}`; `set` yalnızca `th, fs, sh, sa, lh, un` anahtarlarını taşıyabilir; `delete` sahibi + e-posta doğrulaması (hesap silme akışı için).
- `users/{uid}/library/main` → yalnızca `{books, set}`; `books` liste ve **≤ 500**; `set` map.
- `users/{uid}/covers/{bookId}` → yalnızca `{d}`; `d` string, **≤ 900.000** karakter.
- `users/{uid}/notePhotos/{photoId}` → yalnızca `{b, d, t}`; `b` ≤ 100, `d` ≤ 900.000, `t` int.
- Tüm okuma/yazma için kullanıcı **e-posta doğrulanmış** olmalı (`email_verified == true`).

Veri şeklini değiştirirsen kuralı **deploy etmeyi unutma**: `firebase deploy --only firestore:rules,hosting`.
Yeni koleksiyon/alan açacaksan güvenlik kurallarını **önce** yaz.

---

## 4. Güvenlik (XSS)

- **Kullanıcı kaynaklı her değer HTML'e `esc()` ile basılır.** Yeni şablon yazarken `esc()` atlama.
- Hazır yardımcılar: `esc` (HTML kaçışı), `fold` (Türkçe duyarlı arama için küçük harf), `okPw` (parola kuralı).
- Sır/anahtar (API key) eklemeyin veya dışa aktarmayın. Mevcut Firebase web API anahtarı istemci tarafı için normaldir.

---

## 5. Yedekleme / geri yükleme / CSV

Bu üç işlem veri modeline **bağlıdır**; model değişince birlikte kontrol et:

- **Yedekleme (`bak`):** `{books, set}` JSON olarak indirilir.
- **Geri yükleme (`restoreJSON`):** `books` doğrulanır, `≤ 500` ile sınırlanır; `set` uygulanır.
- **CSV dışa (`csv`) / içe (`imp`):** Sütun sırası **Başlık, Yazar, Okundu, Not, ISBN**. İlk sütun başlığı "Başlık" olmalı.
- Kapak/görsel sınırları: kapak ve not fotoğrafı verileri ≤ 900.000 karakter (kural zorunlu kılar).

---

## 6. Kalıcı veriye dokunan bir değişiklikte kontrol listesi

- [ ] `firestore.rules` güncellendi mi?
- [ ] `README.md` veri modeli güncellendi mi?
- [ ] `persist()` çağrılıyor mu?
- [ ] Yedek/geri yükleme/CSV etkilendi mi?
- [ ] Eski kayıtlar için geriye dönük uyumluluk (varsayılan değer) var mı?
- [ ] Sınırlar (500 kitap, 900.000 karakter) korunuyor mu?
