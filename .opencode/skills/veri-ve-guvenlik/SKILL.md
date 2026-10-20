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

**Yazma/okuma:** Kalıcı veri `persist()` (`setDoc(ref,{books,set})`) ile yazılır; `start()` içindeki `onSnapshot` dinleyicileriyle okunur. Veriyi değiştirdikten sonra **her zaman** `persist()` çağır. `persist()` yazmadan önce `set`'i kurallara uygun hâle getirir (bilinmeyen anahtarları atar; `sh` ≤ 20, `lh` ≤ 500, `sa` ≤ 500, `un` ≤ 30) — eski/bozuk veri yazmayı kilitlemesin diye bu temizliği koru.

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
- `users/{uid}/library/main` → yalnızca `{books, set}`; `books` liste ve **≤ 500**; `set` map; `set` alt alanları tip/boyut doğrulamasından geçer (raflar ≤ 20, ödünç geçmişi ≤ 500, kullanıcı adı ≤ 30).
- Kitaplık `books` içeriği kural tarafından eleman eleman doğrulanamaz; istemcide (`A.save`, `restoreJSON`, CSV içe aktarma) doğrulanır ve alan uzunlukları sınırlanır.
- `users/{uid}/covers/{bookId}` → yalnızca `{d}`; `coverId` `[A-Za-z0-9_-]{1,60}`; `d` `data:image/(jpeg|png|webp);base64,...` biçiminde ve **≤ 500.000** karakter.
- `users/{uid}/notePhotos/{photoId}` → yalnızca `{b, d, t}`; `photoId` `[A-Za-z0-9_-]{1,64}`; `b` ≤ 100 ve `[A-Za-z0-9_-]{1,60}`; `d` aynı görsel biçimi ve **≤ 700.000**; `t` int.
- Tüm okuma/yazma için kullanıcı **e-posta doğrulanmış** olmalı (`email_verified == true`).

Veri şeklini değiştirirsen kuralı **deploy etmeyi unutma**: `firebase deploy --only firestore:rules,hosting`.
Yeni koleksiyon/alan açacaksan güvenlik kurallarını **önce** yaz.

---

## 4. Güvenlik (XSS)

- **Kullanıcı kaynaklı her değer HTML'e `esc()` ile basılır.** Yeni şablon yazarken `esc()` atlama. `href`/`src` gibi URL alanlarını daima `esc()` + şema doğrulaması ile bas.
- Hazır yardımcılar: `esc` (HTML kaçışı), `fold` (Türkçe duyarlı arama için küçük harf), `okPw` (parola kuralı), `okHttps` (https URL), `okBookUrl` (yalnızca 1000kitap), `isImgData` (data:image görsel), `ID_OK` (kimlik biçimi), `str` (kırp + kontrol karakterlerini at), `num` (sayı doğrula).
- Harici bağlantılar `window.open(u,'_blank','noopener')` ile açılır; `b.u` doğrulanmadan asla açılmaz.
- Kapak/not fotoğrafı yazımları `compressImage(file,maxW,quality,maxChars)` ile boyut sınırına sıkıştırılır; sınır aşılırsa yazım reddedilir.
- Sır/anahtar (API key) eklemeyin veya dışa aktarmayın. Mevcut Firebase web API anahtarı istemci tarafı için normaldir.
- Satır içi betik değişirse `firebase.json` CSP hash'ini `node tools/csp-hash.mjs --write` ile güncelle.

---

## 5. Yedekleme / geri yükleme / CSV

Bu üç işlem veri modeline **bağlıdır**; model değişince birlikte kontrol et:

- **Yedekleme (`bak`):** `{books, set}` JSON olarak indirilir.
- **Geri yükleme (`restoreJSON`):** dosya boyutu ≤ 10 MB; `books` alanları tek tek doğrulanır/kırpılır, kimlikler güvenli biçime zorlanır, `≤ 500` ile sınırlanır; `set` yalnızca bilinen anahtarlarla yeniden kurulur.
- **CSV dışa (`csv`) / içe (`imp`):** Sütun sırası **Başlık, Yazar, Okundu, Not, ISBN**. İlk sütun başlığı "Başlık" olmalı. Dışa aktarımda formül enjeksiyonuna karşı `= + - @` ile başlayan hücrelerin önüne `'` eklenir.
- Kapak/görsel sınırları: yeni yazımlarda kapak ≤ 400.000, not fotoğrafı ≤ 600.000 karakter olacak şekilde sıkıştırılır; kural kapak için 500.000, not fotoğrafı için 700.000 karakteri zorunlu kılar (eski büyük kayıtlar okunmaya devam eder).

---

## 6. Kalıcı veriye dokunan bir değişiklikte kontrol listesi

- [ ] `firestore.rules` güncellendi mi?
- [ ] `README.md` veri modeli güncellendi mi?
- [ ] `persist()` çağrılıyor mu?
- [ ] Yedek/geri yükleme/CSV etkilendi mi?
- [ ] Eski kayıtlar için geriye dönük uyumluluk (varsayılan değer) var mı?
- [ ] Sınırlar (500 kitap; kapak ≤ 500.000 / not fotoğrafı ≤ 700.000, yeni yazım hedefleri 400.000/600.000) korunuyor mu?
- [ ] Kullanıcı verisi HTML'e `esc()` ile mi basıldı? URL/görsel alanları doğrulandı mı?
- [ ] Satır içi betik değiştiyse CSP hash'i güncellendi mi (`node tools/csp-hash.mjs --write`)?
