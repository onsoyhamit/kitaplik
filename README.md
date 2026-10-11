# Kitaplığım

Mobil uyumlu, kurulabilir bir PWA olarak çalışan kişisel kitaplık uygulaması. Her hesap kendi kitaplarını, tercihlerini ve görsellerini bulutta saklar.

## Özellikler

- E-posta ve parola ile hesap oluşturma/giriş, e-posta doğrulaması ve parola sıfırlama
- Şifre oluşturma/değiştirmede en az 6 karakter, harf, rakam ve noktalama işareti zorunluluğu
- Kullanıcıya özel kitaplık, kapak ve not fotoğrafları
- ISBN-13 alanı, kontrol basamağı doğrulaması ve CSV içe/dışa aktarımı
- Yeni kitap eklerken arka kamerayla ISBN barkodu tarama; geçerli ISBN yazıldığında otomatik katalog araması
- Başlık/yazar için katalog destekli yazım düzeltme ve yüksek güvenli eşleşmede otomatik künye doldurma
- Eksik ISBN’leri başlıkla toplu arama ve otomatik kaydetme
- Okuma durumu, ödünç takibi ve notlar
- Üç açık ve üç koyu tema; düzenlenmiş kitap detay ve ayarlar ekranları
- Cihaz ekranına göre uyarlanan, dikey kaydırma gerektirmeyen ana sayfa; açılır/kapanır ayarlar ve uygulama içi başlangıç rehberi
- Kitap detayında kapak/okuma takibi sol sayfada, ödünç ve notlar sağ sayfada
- Kitap detayında yalın yeşil okuma eylemleri; ana sayfada günlük söz ve isteğe bağlı Türkçe çeviri
- CSV içe/dışa aktarma ve JSON yedekleme
- ISBN veya başlık/yazar ile Open Library ve Google Books katalog/kapak araması
- 1000kitap'ta kapak arama ve görsel bağlantısı kopyalama aracı
- Çevrimdışı PWA kabuğu

## Teknoloji ve veri modeli

- Statik HTML/CSS/JavaScript
- Firebase Authentication (e-posta/parola)
- Cloud Firestore
- Firebase Hosting

Veri yolları:

- `users/{uid}`: hesap oluşturulma zamanı (parola burada tutulmaz)
- `users/{uid}/library/main`: kitaplar ve arayüz tercihleri
- `users/{uid}/covers/{bookId}`: kullanıcıya ait kapak resmi
- `users/{uid}/notePhotos/{photoId}`: not fotoğrafı

Şifreleri uygulama Firestore'a yazmaz; yalnızca Firebase Authentication yönetir. Web Firebase yapılandırmasındaki API anahtarı gizli parola değildir. Bununla birlikte Firebase Console'da API anahtarını uygun API'lerle sınırlandırın ve Firestore erişimini aşağıdaki kurallarla koruyun.

Google Books API anahtarı da tarayıcı kodunda kullanıldığı için gizli kabul edilemez. Google Cloud Console'da HTTP referrer ve kullanılabilir API kısıtlamalarını etkinleştirin; kota ve faturalandırmayı izleyin.

### E-posta teslimatı

Firebase'in varsayılan doğrulama e-postaları spam'e düşüyorsa, Firebase Console → Authentication → Templates bölümünden **Customize domain** seçeneğiyle kendi alan adını doğrula. Firebase'in verdiği DNS kayıtlarını uygula; SPF/DKIM yapılandırmasını tamamla ve DMARC kaydı ekle. Gönderen adını uygulama markasıyla eşleştir, doğrulama e-postası konusunu açık tut ve tekrar gönderme düğmesini art arda kullanma. Bu uygulama Auth e-postalarını Türkçe dil koduyla ister; bu, e-posta teslimat/itibar ayarlarının yerine geçmez.

Firebase, doğrulama e-postası için sender adı/adresi, konu ve özel gönderici alan adı yapılandırmasını destekler: [Firebase e-posta şablonlarını özelleştirme](https://support.google.com/firebase/answer/7000714). DNS değişikliği yayılımı zaman alabilir. Canlıya aldıktan sonra Gmail, Outlook ve farklı sağlayıcılarda test et; gönderim alan adının SPF/DKIM/DMARC durumunu doğrula.

### 1000kitap'tan kapak bağlantısı alma

Kapaksız bir kitabın **+ Kapak ekle** düğmesi 1000kitap arama sayfasını açar. Kopyalama aracını ilk kullanımda uygulamadaki düğmeden kopyala, bir yer imi oluştur ve yer iminin adresine yapıştır. Sonraki kullanımlarda 1000kitap sayfasındayken bu yer imine tıkla, ardından kitabın kapak görseline tıkla; görselin URL'si panoya kopyalanır. Uygulamaya dönüp **Panodan yapıştır** ile bağlantıyı kapak olarak kaydet. Tarayıcı bookmarklet'leri bazı mobil tarayıcılarda/Content Security Policy ayarlarında kısıtlanabilir; bu durumda görsele uzun basıp **Resim adresini kopyala** seçeneğini kullan.

Kitap eklerken veya düzenlerken ISBN-13 girebilirsin. Yeni kitap formunda 13 basamaklı ve kontrol basamağı geçerli bir ISBN tamamlandığında arama kendiliğinden başlar; önce Google Books, sonra Open Library kataloglarında aranır. Bulunan baskının kitap adı/yazarı forma gelir. İki kaynaktan da bilgi bulunamazsa başlık ve yazarı elle girebilirsin. Başlıkla eklemede yazım farklılıkları tolere edilir; kitap adı/yazarı yalnızca yüksek güvenli katalog eşleşmesinde düzeltilir ve otomatik doldurulur. ISBN CSV içe/dışa aktarıma da dahildir; eski dört sütunlu CSV dosyaları içe aktarılmaya devam eder.

Yeni kitap eklerken ISBN alanının yanındaki kamera simgesiyle arka kapaktaki ISBN barkodunu tara. Tarayıcı arka kamerayı, yüksek çözünürlük tercihlerini ve yalnızca EAN-13 barkod formatını kullanır; ekrandaki çerçeve barkodun hizalanmasına yardımcı olur. Kamera görüntüsü cihazda işlenir; katalog araması için yalnızca barkoddan okunan ISBN Google Books ve Open Library'ye gönderilir. Katalogda bulunursa başlık, yazar ve sağlanan yayın bilgileri forma alınır. Kamera kullanımı HTTPS ve tarayıcı izni gerektirir; ZXing barkod okuyucu ilk kullanımda jsDelivr üzerinden yüklenir. ISBN barkodu olmayan veya taranamayan kitaplarda 13 rakamlı ISBN'yi elle girebilirsin; ISBN araması otomatik başlar.

Ana sayfadaki **Günün Sözü**, önceki sürümlerdeki gibi günlük olarak çevrimiçi bir söz getirir; kaynak İngilizce söz döndürürse **Türkçeye çevir** düğmesiyle isteğe bağlı çeviri yapılabilir.

Open Library ve Google Books kitap ekleme, ISBN doğrulama ve kapak bulma akışlarında doğrudan katalog kaynağı olarak kullanılır. Uygulamanın kullanabildiği resmi bir 1000kitap katalog API'si bulunmadığından, 1000kitap için kitap arama bağlantısı ve kullanıcının seçtiği kapak URL'sini kaydetme aracı sunulur; sayfa içeriği otomatik olarak çekilmez.

Mevcut kitapların ISBN'lerini tek tek yazmak gerekmez. Profil → **Eksik ISBN’leri bul** işlemi kitap adıyla Open Library'de arar ve bulunamazsa Google Books'a geçer; yazarı arama şartı olarak kullanmaz, yalnızca eşleşen sonuçları öne almak için kullanır. Tam başlık eşleşen katalog baskılarından geçerli ISBN-13 kaydeder. İşlem durum çubuğunda bulunanları, sonuç çıkmayan kitapları ve API hatalarını ayrı gösterir; her 10 kitapta bulunanları buluta kaydeder ve durdurulabilir. Kataloglar baskı özelindeki ISBN'i her zaman doğru tespit edemeyeceğinden, bulunan numara fiziksel kitaptaki barkodla eşleşmeyebilir. Yüzlerce kitapta kamu kataloglarının hız/kota sınırlarına bağlı olarak birkaç dakika sürebilir.

Profil → **Eksik kapakları bul** işlemi kapağı olmayan kitapları ISBN ile, ISBN yoksa kitap adıyla Open Library ve Google Books'ta arar. Her 10 sonuçta bulunan kapaklar kitaplık kaydına kaydedilir; böylece aynı hesapla giriş yapılan diğer cihazlardaki kitaplık anlık eşitleme yoluyla kapak URL'lerini ve barkod taramasından gelen kitap bilgilerini de alır. Kullanıcının yüklediği kapak fotoğrafları ayrıca `users/{uid}/covers/{bookId}` altında Firestore'da saklanır ve aynı hesaptaki cihazlarla senkronize edilir. Senkronizasyon için internet ve aynı kullanıcı hesabı gerekir; dış katalog görsel bağlantıları sağlayıcı erişilebilir olduğu sürece görüntülenir.

ISBN kullandığın baskının barkodundan alınmalıdır; farklı baskıların ISBN'leri değişebilir. Google Books veya Open Library kapağı sunmuyorsa 1000kitap yer imi aracıyla görsel URL'sini alabilir ya da kapağı fotoğraf olarak yükleyebilirsin. Open Library API erişilemezse uygulama Google Books'a geçer.

## Firebase kurulumu

1. Firebase Console'da bir proje oluşturun ve bir **Web App** kaydedin.
2. **Authentication → Sign-in method** bölümünde **Email/Password** yöntemini etkinleştirin.
3. Authentication ayarlarında e-posta doğrulama şablonunu ve uygulamanın yayınlanacağı yetkili domaini yapılandırın. Parola politikasında en az 6 karakter, en az bir küçük harf, sayı ve alfasayısal olmayan karakter zorunluluklarını etkinleştirin; bu, e-posta parola sıfırlama akışında da kuralları uygular.
4. Firestore Database oluşturun.
5. Firebase Console'daki web app yapılandırmasını `index.html` içindeki `firebaseConfig` değerleriyle eşleştirin. Bu depo şu anda örnek/önceden tanımlı bir Firebase proje kimliği içeriyor; kendi projenizin sahibi ve erişim yetkilisi olduğunuzu doğrulamadan o projeye deploy etmeyin.
6. Hosting için Firebase CLI kurup projeyi seçin:

   ```sh
   npm install -g firebase-tools
   firebase login
   firebase use --add
   ```

7. `firebase use --add` sırasında kendi Firebase proje ID'nizi seçin. Ardından güvenlik kuralları ve siteyi yayınlayın:

   ```sh
   firebase deploy --only firestore:rules,hosting
   ```

`firebase.json`, `index.html` dosyasını Hosting kökü olarak yayınlar; `firestore.rules` kurallarını da deploy'a bağlar. Kuralları yayınlamadan herkese açık erişim vermeyin. İlk yayından sonra Hosting URL'sini Authentication'daki yetkili domainlere ekleyin ve kayıt, doğrulama, parola sıfırlama, farklı hesapla giriş ve kullanıcılar arası veri ayrımını iki ayrı test hesabıyla sınayın.

## Güvenlik ve veri saklama

- `firestore.rules`, kullanıcıların yalnızca kendi UID altındaki verilere erişmesini sağlar.
- Kütüphane, kapak ve fotoğraf okuma/yazma işlemleri doğrulanmış e-posta gerektirir.
- Fotoğraf alanları ve kitap listesi için Firestore kurallarında boyut sınırları uygulanır. Büyük ölçekli kullanımda görselleri Firestore belge alanları yerine Firebase Storage'a taşımak daha uygundur.
- Eski sürümdeki `library/main`, `covers` ve `notePhotos` ortak yollarındaki veriler otomatik olarak hesaplara kopyalanmaz. Bu verinin sahibini güvenle belirlemek mümkün değildir; otomatik kopyalama yeni kullanıcıların birbirinin verisini almasına yol açardı. Eski veriyi gerekiyorsa sahibini doğrulayıp doğru hesaba manuel yedek/geri yükleme yoluyla aktarın.
- Hesap silme, kullanıcıya ait tüm Firestore belgelerini/Storage dosyalarını temizleyen backend işlemi gerektirir; henüz uygulama içi hesap silme akışı yoktur.

## Yerel önizleme

Statik bir HTTP sunucusu ile repo kökünü yayınlayın ve tarayıcıda açın. Firebase Auth, Firestore ve service worker tarayıcı güvenlik gereksinimleri nedeniyle `file://` üzerinden tam çalışmaz.
