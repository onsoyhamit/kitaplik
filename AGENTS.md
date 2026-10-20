# AGENTS.md — Kitaplığım (v1) Proje Kuralları

> Bu dosya **her istekte** otomatik okunur; bu yüzden kısa tutulur.
> Uzun iş akışları `.opencode/skills/` altındaki skill'lerdedir (bkz. §7).
> Kod değiştirmeden önce burayı oku; işine uyan skill'i yükle.

---

## 0. Özet

Tek dosyalı (`index.html`), framework'süz (saf JavaScript), Firebase (Auth + Firestore) üzerine kurulu, çevrimdışı çalışan bir **PWA** kişisel kitaplık uygulaması. Kurulum, paket indirme (`npm`) veya derleme (build) adımı yok; tarayıcı `index.html`'i doğrudan çalıştırır.

## 1. Hızlı Bilgiler

| Alan | Değer |
|---|---|
| Dil | Arayüz ve kod yorumları **Türkçe** |
| Frontend | Vanilla JS (ES modül), tek dosya |
| Stil | Tek `<style>` bloğu, CSS değişkenleriyle temalama |
| Backend | Firebase Auth + Firestore (10.14.1, CDN import) |
| Deploy | `main`'e push → GitHub Actions → Firebase Hosting |
| Hedef | Mobil öncelikli (max-width 520px) |
| Veri sınırı | Kullanıcı başına **en fazla 500 kitap** |

## 2. 🔴 Kırmızı Çizgiler

1. **Tek dosya:** Tüm uygulama kodu `index.html` içinde. Yeni uygulama `.js`/`.css` dosyası açma (istisnalar: `sw.js`, yerel üçüncü taraf varlığı `vendor/zxing.min.js`, geliştirme aracı `tools/csp-hash.mjs`).
2. **CSP hash'i kodla senkron tut.** `index.html` içindeki satır içi modülün SHA-256 özeti `firebase.json` CSP'sindedir. Satır içi betiği değiştirdikten sonra `node tools/csp-hash.mjs --write` çalıştır; aksi hâlde uygulama boş açılır. `hosting` iki site içerir (`kitapligim55` + `kitapligim`); CSP/başlık değişikliğini **iki girdiye birden** uygula (iki girdi birebir aynı olmalı, `--check` doğrular).
2. **`index1.html` uygulamanın parçası değildir.** Hata düzeltmek için onu düzenleme; sadece tasarım referansıdır.
3. **Firebase yapılandırmasını (`fapp`) değiştirme.** Proje kimlikleri sabittir.
4. **`render()`'ı veya mimariyi değiştirme.** Uygulama baştan çizim üzerine kuruludur; framework'e geçiş teklif etme.
5. **`V` ve `A` nesnelerinin adını/yapısını değiştirme.** Sadece yeni anahtar ekle.
6. **Veri modeli anahtarlarını (`t, a, r, k, l, ad, x`...) yeniden adlandırma.** Firestore'daki kayıtlı veriyi bozar (detay: `veri-ve-guvenlik`).
7. **`firestore.rules` ile kod uyumunu bozma.** Şemayı değiştirirsen kuralı da güncelle ve deploy et.
8. **Kullanıcı verisini `esc()` olmadan HTML'e basma.** (XSS)
9. **Renkleri sabit yazma.** Yalnızca CSS değişkenleri (`--bg, --ac, --tx`...).
10. **`sw.js` `C` sürümünü artırmadan statik dosya değiştirme.**
11. **Her commit'te sürümü artır.** `index.html` içindeki `VERS` üç parçalıdır (`A.B.C`) ve `node tools/ver-bump.mjs` ile artırılır. Kural: `C` 0–9 arası artar; `C=9` iken sonraki artışta `B+1` ve `C=0`; `B=9` iken `A+1`, `B=0`, `C=0`. Örnek: `1.4.7 → 1.4.8 → 1.4.9 → 1.5.0`, `1.9.9 → 2.0.0`. Araç ayrıca CSP hash'ini ve `sw.js` `C` sürümünü günceller. Sürüm commit mesajında da yazılır.
12. **Simge fontu yereldir ve alt kümedir.** `vendor/tabler-icons.css` + `vendor/fonts/tabler-icons.woff2` yalnız kullanılan simgeleri içerir; CDN'den yüklenmez (engel/kesinti olunca ikonlar kayboluyordu). Yeni bir `ti-*` sınıfı kullanacaksan `node tools/icons.mjs --build` çalıştır; `--check` ile doğrula. Font kırpma `python -m fonttools` ister (`python -m pip install fonttools brotli`).

## 3. Dosya Sorumlulukları

| Dosya | Sorumluluk | Değişince dikkat |
|---|---|---|
| `index.html` | Uygulamanın tamamı (HTML + CSS + JS) | Tek gerçek kaynak. |
| `sw.js` | Service worker, çevrimdışı önbellek | `C` sürümünü **artır**. |
| `manifest.webmanifest` | PWA meta | Ad/ikon değişirse güncelle. |
| `firestore.rules` | Veri erişimi + şema doğrulama | Alan eklersen kuralı güncelle + deploy. |
| `firebase.json` | Hosting (iki site) + header/cache | Genelde dokunma. İki hosting girdisinin `ignore`/`headers` blokları birebir aynı kalmalı. |
| `README.md` | Kullanıcı dokümanı | Özellik/veri değişince güncelle. |
| `index1.html` | Eski/alternatif tasarım | **Kullanılmıyor.** Dokunma. |
| `vendor/zxing.min.js` | Barkod okuyucu (üçüncü taraf, yerel) | Sürüm yükseltirken dosyayı değiştir; CSP'de ek alan gerekmez. |
| `vendor/tabler-icons.css` | Simge fontu CSS'i (üretilmiş **alt küme**) | Elle düzenleme. Yeni simge için `node tools/icons.mjs`. |
| `vendor/fonts/tabler-icons.woff2` | Simge fontu (alt küme, ~12 KB) | Yeni simge eklenince yeniden üret (aşağıdaki komut). |
| `tools/csp-hash.mjs` | CSP hash doğrulama/güncelleme (çok site) | `index.html` betiği değişince `--write`; CI `--check` çalıştırır. |
| `tools/ver-bump.mjs` | Sürüm artırma (`VERS` + CSP hash + `sw.js` `C`) | Commit öncesi çalıştır. |
| `tools/icons.mjs` | Simge CSS'i alt kümesini üretir/denetler | Yeni `ti-*` sınıfı kullanınca çalıştır. |

## 4. Mimari Çekirdek (en sık kırılan yer)

- **Görünümler → `V`:** Her ekran `V` içinde, HTML string döndüren bir fonksiyon. (`boot, ob, login, reg, reset, verify, home, stats, all, add, det, bin, prof, lhist`)
- **İşlemler → `A`:** Etkileşim `data-a="isim"` + `A.isim` ile event delegation üzerinden çalışır. `data-v` ile parametre geçer.
- **Çizim → `render()`:** `#app.innerHTML` baştan yazılır. Görünüm değişmediyse form alanları `keep` ile korunur (`#qq` ve `type=file` hariç).
- **Yönlendirme:** URL hash tabanlıdır ve **3 yerde** tekrar eder — `updateURL()`, `popstate`, `DOMContentLoaded`. Birini güncelleyip diğerini unutmak en sık yapılan hatadır.
- **Kalıcı veri:** `persist()` yazar (`setDoc({books,set})`), `onSnapshot` okur. Değişiklik sonrası `persist()` çağır.
- **Çıkış / hesap silme:** Çıkış `signOut(auth)` yerine `hardOut()` ile yapılır (yerel Firestore önbelleğini de temizler). Yeni çıkış noktası eklerken `hardOut()` kullan.

## 5. Veri Modeli (özet)

Kitap anahtarları **kasıtlı kısa**: `id, t, a, y, isbn, c, u, r, k, l, n, ad, x`.
`set`: `th, fs, sh, sa, lh, un`.
Tam tablo, şema değiştirme ve güvenlik detayları → `veri-ve-guvenlik` skill'i.

## 6. Arayüz Kuralları (özet)

- Tema: `document.documentElement.dataset.t` (`gece`, `kagit`, `buz`, `orman`, `sistem`). Yeni tema eklerken `:root` bloğuna `[data-t=...]` değişken seti ekle + profil swatch listesine ekle.
- İkonlar: Tabler Icons (`<i class="ti ti-...">`). Fontlar: Fraunces (başlık), DM Sans (gövde).
- Tüm metinler **Türkçe**; sınıf adları kısa ve mevcut kalıba uygun.
- Animasyonlar `.anim` + `prefers-reduced-motion` destekler; kırma.

## 7. Skill'ler (detaylı iş akışları)

Bu projedeki uzun prosedürler skill'lere taşınmıştır; ilgili işi yaparken yükle:

| Skill | Ne zaman yüklenir |
|---|---|
| **`kod-degisikligi`** | Her kod düzeltmesi/değişikliğinde + değişiklik sonrası regresyon kontrolü + deploy |
| **`yeni-ozellik`** | Yeni ekran (view), buton/aksiyon, ayar (`set`) veya tema eklerken |
| **`veri-ve-guvenlik`** | Veri modelini/şemayı değiştirirken, `firestore.rules`, yedek/CSV/geri yükleme |

## 8. Emin değilsen

- Kalıcı veriye dokunuyor mu? → `veri-ve-guvenlik`.
- Yeni görünüm/etkileşim mi? → `yeni-ozellik`.
- Sadece görsel/stil mi? → §6 + `yeni-ozellik`.
- Statik dosya değişti mi? → `sw.js` sürümünü artır.
- Her durumda: değişiklikten sonra `kod-degisikligi`'ndeki kontrol listesini uygula.
- Emin değilsen **kullanıcıya sor**; tahmin edip geniş çaplı değişiklik yapma.

---

_Son güncelleme: Ekim 2026 · Bu dosya canlı bir sözleşmedir; mimari değişirse birlikte güncellenir._
