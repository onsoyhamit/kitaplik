---
name: Kod Değişikliği İş Akışı
description: Bu projede (Kitaplığım PWA) herhangi bir kod düzeltmesi veya değişikliği yaparken ve değişiklik sonrası "başka bir yeri bozdum mu?" regresyon kontrolü yapmadan önce kullan. Deploy adımlarını da içerir.
---

# Kod Değişikliği İş Akışı

**Amaç:** Bir yeri düzeltirken başka bir yeri bozmamak. Kod değiştiren her işte bu adımları uygula.

---

## Her değişiklikte 5 adım

1. **Kapsamı sabitle.** Sadece istenen şeyi değiştir. "Bu arada şunu da düzelteyim" **yapma**. İstenmeyen ekstra değişiklik = yeni hata kaynağı.
2. **Etki alanını bul.** Değiştireceğin fonksiyon/değişken nerede kullanılıyor? Anahtar ismini `grep` ile tüm dosyada ara.
3. **Şablon + işlem birlikte.** HTML tarafını (`V`) değiştirdiysen ona bağlı işlemi (`A`) ve `data-a`/`data-v` eşleşmesini kontrol et. Biri olmadan diğeri çalışmaz.
4. **Kalıcı veriyi düşün.** Veri değiştiyse: `persist()` çağrılıyor mu? `firestore.rules` uyumlu mu? Yedek/geri yükleme etkilenir mi?
5. **Statik varlık değiştiyse** `sw.js` içindeki `C` sürümünü artır (örn. `kitaplik-v21` → `v22`).

---

## Değişiklik sonrası regresyon kontrol listesi

Bir şeyi düzelttikten sonra **mutlaka** bunları düşün (hepsi etkilenmiş olabilir):

- [ ] **Navigasyon:** Alt menü (`home/all/prof`) geçişleri ve göstergesi (`ind`) doğru mu?
- [ ] **Geri tuşu:** `A.back()` ve `popstate` hâlâ tutarlı mı? Yeni ekran geri tuşunda doğru yere dönüyor mu?
- [ ] **URL/hash:** `updateURL()`, `popstate` ve `DOMContentLoaded` üçlüsü güncel mi? Yenileyince doğru ekranda kalıyor mu?
- [ ] **Form koruması:** Görünüm değişmeden `render()` çağrıldığında yazılan değerler kayboluyor mu?
- [ ] **Tema:** 3 tema da (gece/kagit/sistem) bozulmadan görünüyor mu? Sabit renk kaçağı var mı?
- [ ] **Boş durumlar:** Kitap yok / sonuç yok / raf boş ekranları çalışıyor mu? Null/undefined hatası yok mu?
- [ ] **Ödünç akışı:** `l` alanı `null` iken detay ekranı patlamıyor mu?
- [ ] **Senkron:** `persist()` sonrası `onSnapshot` güncellemesi doğru mu? Çift kayıt / veri kaybı yok mu?
- [ ] **Çevrimdışı:** `offline` bandı ve önbellek davranışı bozulmadı mı?
- [ ] **Silme/geri alma:** Çöp kutusu (7 gün) ve "Geri al" çalışıyor mu?
- [ ] **Erişilebilirlik:** Klavye (Enter/Space) ile yeni etkileşim çalışıyor mu?
- [ ] **Sınırlar:** 500 kitap ve 900.000 karakter kapak sınırları korunuyor mu?

---

## Bilinen kırılgan noktalar

1. **`render()` tam yeniden çizim yapar.** Bir ekranı düzeltirken global durumu (`f`, `q`, `cur`, `lo`) yanlışlıkla değiştirmek başka ekranı bozar.
2. **Hash yönlendirme 3 yerde tekrar eder** (`updateURL`, `popstate`, `DOMContentLoaded`). En sık kırılan yer.
3. **`data-a` / `A` eşleşmesi isimle bağlıdır.** HTML'de `data-a="foo"` yazıp `A.foo` tanımlamamak sessiz hatadır (tıklama hiçbir şey yapmaz).
4. **`books` sunucudan `onSnapshot` ile gelir.** Yerel değişiklikleri her zaman `persist()` ile yaz; aksi hâlde senkron geri alır.
5. **`l` alanı `null` olabilir.** Detay ekranındaki ödünç koşullarını bozma.
6. **Silme yumuşaktır** (`x` alanı, 7 gün). Gerçekten silmek kodu bozar; geri alma akışını koru.
7. **Service worker "önce internet, sonra önbellek"** kullanır. Sürüm artırılmazsa güncelleme bildirimi gelmez.
8. **`index.html` çok sıkışık yazılmıştır** (satır başına birden çok ifade). Geniş çaplı yeniden biçimlendirme (prettier vb.) devasa ve gözden kaçan diff'ler üretir. Yalnızca küçük, yerel düzenlemeler yap.

---

## Yasaklar (anti-pattern)

- İstenmeyen dosya oluşturmak (yeni `.js`, `.css`, `package.json`, bundler konfigürasyonu).
- Yazılı olmayan yerlere dokunmak / "iyileştirme" adı altında refactor yapmak.
- Kısa veri anahtarlarını "okunaklı olsun diye" uzun isimlerle değiştirmek.
- Sabit (hardcoded) renk veya tema-dışı stil yazmak.
- `render()` yerine kısmi DOM güncelleme mantığı serpiştirmek.
- `innerHTML`'e `esc()`'siz kullanıcı verisi basmak.
- `firestore.rules`'u güncellemeden veri şemasını değiştirmek.
- `sw.js` sürümünü artırmadan statik dosya değiştirmek.

---

## Deploy

- `main` dalına push → GitHub Actions otomatik deploy eder (`.github/workflows/firebase-hosting-merge.yml`).
- Firestore kuralları değiştiyse ayrıca: `firebase deploy --only firestore:rules,hosting`.
