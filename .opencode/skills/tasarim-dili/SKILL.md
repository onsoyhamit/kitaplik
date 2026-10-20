---
name: Tasarım Dili ve Tercihler
description: Kitaplığım PWA'da kullanıcının kalıcı tasarım zevkini, yerleşim sıralarını ve davranış tercihlerini tanımlar. Her görsel/etkileşim/yerleşim kararında (renk, tipografi, buton, silme akışı, tam ekran katman, Türkçe metin, hangi bilgi nerede durur) ve kullanıcıya cevap verirken bu dosyayı temel al.
---

# Tasarım Dili ve Tercihler

**Amaç:** "Kullanıcı ne ister, nasıl ister?" sorusunun cevabı. Kod kuralları → `kod-degisikligi`, reçeteler → `yeni-ozellik`, veri → `veri-ve-guvenlik`.
Bu dosya bir zevk sözleşmesidir: buradaki maddeler kullanıcı tarafından açıkça istendi, **sorgusuz uygula**.

---

## 0. Çalışma tarzı (iletişim)

- **Türkçe ve kısa.** Sonucu ve gerekçeyi 1–2 cümlede söyle; uzun anlatım, gereksiz madde listesi yok.
- **Tek seferde tek sorun.** Kullanıcı uygulamayı gerçek cihazda kullanır ve sorunları sırayla bildirir. Sadece bildirdiği şeyi düzelt; "bu arada şunu da" yapma.
- **Kararı sen ver.** Küçük tasarım/uygulama detayları için soru sorma ("gerisini sen halledersin"). Yalnızca veri kaybı / geri dönüşü zor işlerde sor.
- **Kanıtla, anlatma.** Kısa bir ölçüm (px, sınıf, sonuç) veya ekran görüntüsü doğrulaması yeterli.
- Kullanıcının verisine kendi başına yıkıcı işlem yapma.

---

## 1. Görsel dil

- **Sıcak "kütüphane" hissi:** Fraunces (başlık) + DM Sans (gövde), sıcak toprak tonları, altın accent (`--ac`).
- **Cümle düzeni yazım; BÜYÜK HARF YOK.** Üst başlıklar/etiketler cümle düzenindedir (`.eb`, `.obkick`, `.strip .l` uppercase'leri bu nedenle kaldırıldı).
- **Soluk placeholder'lar**, italik alt başlıklar; alt başlıklar **daktilo animasyonuyla** yazılır (`.tw`, `data-tx`), her sekmeye girişte yeniden oynar.
- **Neon/parıltı ölçülü:** kapak çerçevesi (`.cframe`), durum satırı (`.stline`), tek parça neon panel (`.bub`), özel çizilmiş durum butonları (`.stb`).
- **Başlıklar ortalanır** (`mast` blokları); hiyerarşi net, süs değil okunurluk öncelikli.
- **Kart/görsel:** yuvarlatılmış köşe (~10px), ince kenarlık, hafif iç gölge; "fotoğraf rulosu" hissi.
- **Tema sistemi:** Sistem / Açık / Buz / Koyu / Orman. Swatch sırası: **Sistem, Açık, Buz, Koyu, Orman**; "Sistem" cihazı izler. Renkler yalnızca CSS değişkeniyle yazılır.

---

## 2. Etkileşim kuralları

- **Kontrolün ŞEKLİNİ değiştirme.** Sığmama/taşma sorununu şekli bozarak değil, tipografi ve yerleşimle çöz (örn. sayacı alt satıra almak, fontu küçültmek).
- **Görünümü değiştirmeden tıklanabilir yap** (örn. istatistik kutuları: aynı görünüm, dokununca filtreli ekrana gider).
- **Dokunma hedefi cömert** (≥44px); uygulama parmakla kullanılır, masaüstü ikincil ama çalışmalı.
- **Yanlışlıkla tetiklenen yıkıcı işlem yasak.** Silme her zaman ikinci adım ister (onay) ve silme düğmesi küçük thumbnail üzerine konmaz.
- **Tam ekran/katman işleri geri tuşuyla kapanmalı:** imperatif overlay + `history.pushState` / `popstate` kalıbı (zoom, tarih seçici, hesap modalı).
- **Modal:** uygulamanın kendi modalı (`#amov`). Yalnızca basit yıkıcı onay için `confirm()` kabul.
- **Elle yazma her yerde mümkün olmalı** (tarih alanı vb. sadece seçiciye mahkûm değil).
- **Boş durumlar boş başlar** (raflar şablon olarak boş gelir).
- **Anında tepki:** spinner yok, bekleme hissi yok; çevrimdışı dayanıklı davranış korunur.

---

## 3. Yerleşim ve sıra tercihleri (değiştirme)

- **Profil sırası:** ortalanmış başlık → Ödünç takibi → İstatistikler → Veriler → Uygulama görünümü → Hesabım ve güvenlik → Hakkımızda ve iletişim → Gizlilik/kullanım/izinler (en altta). Bölümler arası ince ayraç (`.pdiv`).
- **Metinler:** vitrin üst başlığı **"Kütüphane'm Vitrini"**, alt sekme **"Kütüphane'm"**.
- **Sıralama:** Başlık / Yazar / Eklenme + artan–azalan. Filtre ve sıralama butonları **aynı kare formda**, ortalanmış, filtrelerin hemen altında.
- **Detay sayfası:** kalem ikonu, özel durum butonları, durum balonu, kapağa dokununca **ekran yüksekliğinin %75'i** kadar büyütme, ISBN'in altında 1000kitap alanı.
- **Notlarım:** not alanı → Fotoğraf çek / Galeriden seç → **Notu kaydet** → fotoğraf şeridi (**butonun altında**). Şeritteki fotoğrafa dokununca tam ekran + pinch zoom.
- **Vitrin istatistik kutuları** dokununca ilgili filtreyle Kütüphane'm'e gider.
- Kullanıcı adı, uygulamanın kullanıcı adı gösterdiği **her yerde** aynı değeri gösterir.
- Vitrin raf şablonları boş başlar; kullanıcı doldurur.

---

## 4. Dil ve metin

- Tüm arayüz metni **Türkçe**, doğal ve kısa.
- **Türkçe dilbilgisi elle yazılmaz, hesaplanır:** iyelik eki ve ünlü uyumu (`Hamit'in`, `Ayşe'nin`, `Oğuz'un`, `Su'nun`, `Şükrü'nün`).
- Örnek/yer tutucu metinler gerçekçi ve soluk ("Örn. KitapKurdu").
- Hata/başarı mesajları kısa ve yol gösterici; teknik terim yok, suçlayıcı ton yok.
- Tarih/sayı biçimi Türkçe alışkanlığa uygun.

---

## 5. Her UI değişikliğinden sonra

- [ ] Şekil/yerleşim tercihine dokunmadım mı? (§2, §3)
- [ ] Metin cümle düzeninde mi? BÜYÜK HARF kaçağı yok mu?
- [ ] 5 temada da okunur mu? Sabit renk kaçağı yok mu?
- [ ] Dar ekranda taşma var mı? (ölç: `scrollWidth ≤ clientWidth`)
- [ ] Dokunma hedefleri ≥44px mi? Yanlışlıkla tetiklenme riski var mı?
- [ ] Boş durum ve tek eleman durumu bozuldu mu?
- [ ] Türkçe ek/ifade doğru mu? (`poss()` gibi hesaplayan yardımcı kullandım mı)
- [ ] Geri tuşu yeni katmanı kapatıyor mu?

---

## 6. Yapma

- İstenmeyen özellik, ayar veya düğme eklemek (kullanıcı istemedikçe kapsamı büyütme).
- Büyük harf yazmak; sabit renk yazmak; framework/bundler önermek.
- Filtre/kontrol şeklini değiştirmek.
- Thumbnail üzerine küçük çöp kutusu/× koymak.
- Kapağın %75 yükseklik zoom'unu bozmak.
- Profil sayfasının sırasını değiştirmek.
- Okunması gereken içeriği (sayfa fotoğrafı) küçük/kırpılmış halde bırakmak.
- Kullanıcının onayladığı bir davranışı "iyileştirme" adı altında değiştirmek.

---

## 7. Emin değilsen

- Görsel/etkileşim kararı → §1–2.
- Yerleşim/sıra → §3.
- Metin/dilbilgisi → §4.
- Kod kuralı ve regresyon → `kod-degisikligi`; yeni görünüm/aksiyon/ayar → `yeni-ozellik`; veri ve güvenlik → `veri-ve-guvenlik`.
- Kullanıcının açıkça istediği bir şeyle çelişiyorsa **kullanıcının son isteği kazanır**; bu dosyayı güncelle.
