---
name: Yeni Özellik Ekleme
description: Bu Kitaplığım PWA'sına yeni bir ekran (view), buton/aksiyon, ayar (set içine) veya tema/renk eklerken izlenecek reçeteleri verir. Yeni görünüm eklerken updateURL/popstate/DOMContentLoaded üçlüsünü hatırlatır.
---

# Yeni Özellik Ekleme Reçeteleri

Bu projede yeni bir şey eklerken mevcut kalıplara birebir uy. Yeni bir isimlendirme sistemi veya mimari getirme.

---

## 1. Yeni görünüm (view) ekleme — 5 adımın hepsini yap

Görünümler `V` nesnesinde birer fonksiyondur ve **HTML metni (string) döndürür**.
Mevcut görünümler: `boot, ob, login, reg, reset, verify, home, stats, all, add, det, bin, prof, lhist`.

1. `V.yeniEkran = () => \`...\`` ekle.
2. Çizim zaten `(V[v]||V.home)()` yapısındadır; ekstra iş gerekmez.
3. `updateURL()` içine hash eşlemesini ekle (örn. `v==='yeniEkran'?'#yeni-ekran'`).
4. **`popstate`** dinleyicisine hash çözümlemesini ekle.
5. **`DOMContentLoaded`** içindeki hash çözümlemesine ekle.
6. (Yalnızca alt navigasyonda görünecekse) `NAVS` dizisine ekle.

> 3–4–5 adımlarını birlikte güncellemek zorunludur. Birini unutmak en sık yapılan hatadır.

---

## 2. Yeni buton / aksiyon ekleme

Tüm etkileşim **event delegation** ile çalışır: HTML'de `data-a="isim"`, JS'te `A.isim`.

1. İlgili `V` şablonuna `<button class="b" data-a="benimIsim">` ekle.
2. `A`'ya `benimIsim(x){ ... }` fonksiyonu ekle. (`x` = `data-v="..."` değeri)
3. Kalıcı değişiklikse `persist()` çağır.
4. Ekranı tazelemek için `render()`.

Not: `click` yakalayıcı `data-a` olan en yakın elementi bulur ve `preventDefault()` çağırır; `INPUT`'lar hariçtir. Metin girişleri için `input`/`change` dinleyicileri ayrıdır.

---

## 3. Yeni ayar ekleme (`set` içine)

1. `set.yeniAyar` oku/yaz.
2. İlgili aksiyonda `persist()` çağır.
3. `restoreJSON()` içinde tolere et: `set.yeniAyar ?? varsayılan`.
4. `set` bir map olduğu için `firestore.rules` **değişmez** — ama belgenin **üst düzey** alanını eklersen değişir (bkz. `veri-ve-guvenlik` skill'i).

---

## 4. Tema / renk ekleme

Üçünü **birlikte** güncelle:
1. `:root` / `[data-t=...]` CSS değişken bloğu (renkler).
2. `V.prof` içindeki tema seçici.
3. `theme()` fonksiyonu.

**Kural:** Renkler asla sabit yazılmaz; yalnızca CSS değişkenleri: `--bg, --p, --ac, --ro, --tx, --mu, --fa, --on, --ln`.

---

## 5. Arayüz genel kuralları

- Tema `document.documentElement.dataset.t` ile uygulanır (`gece`, `kagit`, `sistem`).
- Font boyutu `html{font-size}` + `localStorage.fs` ile yönetilir.
- İkonlar **Tabler Icons** webfont'undan: `<i class="ti ti-ikon-adi">`.
- Yazı tipleri: başlıklar **Fraunces**, gövde **DM Sans**. Yeni font ekleme.
- Sınıf adları kısa ve mevcut kalıba uygun olmalı (`.b`, `.pg`, `.rw`, `.cv`, `.shf`...).
- Tüm kullanıcı metinleri **Türkçe**.
- Erişilebilirlik: ikon butonlarında `aria-label`; gerekirse `role="button"`/`tabindex`.
- Animasyonlar `.anim` sınıfına bağlıdır ve `prefers-reduced-motion` destekler; kırma.

---

## 6. Emin değilsen

- Bu değişiklik **yeni bir görünüm** mü? → Bölüm 1.
- **Yeni bir etkileşim** mi? → Bölüm 2.
- Kalıcı veriye dokunuyor mu? → `veri-ve-guvenlik` skill'i.
- Sadece görsel/stil mi? → Bölüm 4–5.
- Emin değilsen **kullanıcıya sor**; tahmin edip geniş çaplı değişiklik yapma.
