# Jasmine Group Operasyon Rehberi

Bu belge, web sitesindeki veri, admin, medya, CRM, e-posta ve analitik
altyapisini gercek servislerle etkinlestirmek icin tek kaynak olarak
kullanilmalidir.

## 1. Supabase kurulumu

1. Supabase'te yeni bir proje acin.
2. SQL Editor icinde `supabase/schema.sql` dosyasini calistirin.
3. Project Settings > API ekranindan proje URL'sini ve `service_role`
   anahtarini alin.
4. Vercel projesinde asagidaki degiskenleri Production, Preview ve
   Development ortamlarina ekleyin:

```text
SUPABASE_URL
SUPABASE_SERVICE_ROLE_KEY
SUPABASE_MEDIA_BUCKET=property-media
```

`service_role` anahtari yalnizca Vercel sunucu ortaminda tutulmalidir. Bu
anahtar HTML, istemci JavaScript'i veya herkese acik bir ortam degiskenine
yazilmamalidir.

Mevcut statik ilanlari once deneme modunda inceleyin:

```bash
npm run db:migrate
```

Sonuc uygunsa verileri Supabase'e aktarabilirsiniz:

```bash
npm run db:migrate -- --apply
```

## 2. Admin paneli

Guclu bir parola secip hash olusturun:

```bash
npm run admin:hash -- "guclu-ve-uzun-parola"
openssl rand -hex 32
```

Vercel'e su degiskenleri ekleyin:

```text
ADMIN_EMAIL
ADMIN_PASSWORD_HASH
ADMIN_SESSION_SECRET
```

Panel `/admin-login.html` adresindedir. Oturum, imzali HttpOnly ve Secure
cookie ile korunur. Duz metin parola istemciye gonderilmez.

## 3. Talepler ve CRM

Lead formlari Supabase'e kaydedilir ve istenirse Resend ile e-posta
bildirimi yollar. En az bir teslim kanali aktif olmalidir.

```text
RESEND_API_KEY
LEAD_FROM_EMAIL=Jasmine Group <leads@dogrulanmis-alan-adiniz.com>
LEAD_NOTIFICATION_EMAIL=jasminegroupemlak@gmail.com
LEAD_PRIVACY_SALT
```

`LEAD_PRIVACY_SALT` icin `openssl rand -hex 32` kullanin. Resend'de gonderici
alan adi dogrulanmadan e-posta teslimi aktif kabul edilmemelidir.

Admin panelindeki CRM ekraninda talepler goruntulenebilir, durumlari
degistirilebilir, operasyon notlari eklenebilir ve aktif filtre sonucu
CSV olarak disa aktarilabilir. CSV cikisi hesap tablosu formul enjeksiyonuna
karsi korumali uretilir.

## 4. Ilan ve medya operasyonu

1. Her ilan icin yalnizca Jasmine Group'un kullanma hakkina sahip oldugu
   fotograflari yukleyin.
2. Ilan basligi, fiyat, konum, oda ve alan bilgilerini tapu/portfoy
   belgeleriyle kontrol edin.
3. Taslak ilani yayinlamadan once mobil ve masaustu onizlemesini inceleyin.
4. Satilan veya kiralanan portfoyleri arsivleyin; yaniltici aktif ilan
   birakmayin.
5. Gercek ekip bilgileri ve izinli musteri yorumlari hazir olana kadar
   rol-temelli ekip yapisi ile yorum dogrulama politikasi kullanilir.
6. Kategori, yeni/ikinci el durumu, kat, yapim yili, esya, isitma ve mesafe
   alanlarini yalnizca portfoy sahibi veya dogrulanabilir portfoy belgesine
   dayanarak doldurun. Bilinmeyen alanlari tahmin etmeyin; bos birakilan
   alanlar ilan detayinda gosterilmez.

Harici ilan sitelerinden fotograflar veya metinler kopyalanmamalidir. Medya
dosyalari Supabase Storage'daki `property-media` bucket'ina yuklenir.
Admin panelindeki Medya Kalitesi ekrani hem harici baglantilari hem de
gorselsiz ilanlari tek kuyrukta gosterir.

Listeleme filtreleri Turkce ve Ingilizce sayfalarda ayni URL parametrelerini
(`q`, `loc`, `category`, `market`, `room`, `min`, `max`, `areaMin`) kullanir.
Bu adresler kisa liste paylasimi icindir; canonical adresler filtre
kopyalarini ayri SEO sayfalari gibi indeksletmez. Admin formuna yeni portfoy
alanlari eklenmeden once guncel `supabase/schema.sql` mutlaka
calistirilmalidir.

## 5. Analitik ve reklam

Birinci taraf donusum olcumunun calismasi icin guncel
`supabase/schema.sql` dosyasini calistirin. Bu sema `analytics_events`
tablosunu, gerekli indeksleri ve RLS korumasini kurar. Anonim oturum
kimlikleri tarayicidan geldigi haliyle saklanmaz; sunucuda tek yonlu HMAC
hash'e donusturulur. Ayrı bir anahtar kullanmak isterseniz Vercel'e su
degiskeni ekleyin:

```text
ANALYTICS_PRIVACY_SALT
```

Bu degisken tanimli degilse `LEAD_PRIVACY_SALT` kullanilir. Ikisinden biri
olmadan olay sayilari kaydedilir ancak anonim oturum sayisi hesaplanmaz.

Harici platformlar icin asagidaki degiskenlerden ihtiyac duyulanlari
Vercel'e ekleyin:

```text
PUBLIC_GA4_ID
PUBLIC_GTM_ID
PUBLIC_META_PIXEL_ID
```

Analitik ve reklam betikleri ziyaretci cerez tercihini kabul etmeden
yuklenmez; birinci taraf `/api/events` kaydi da ayni onay kuralina tabidir.
Form gonderimi, ilan goruntuleme ve WhatsApp tiklamalari donusum olayi
olarak Turkce ve Ingilizce rotalarda kaydedilir. Olay API'si izinli olay
listesi, alan uzunlugu dogrulamasi ve istek siniri uygular; ad, telefon,
e-posta, mesaj, tam IP veya URL sorgusu toplamaz.

Admin panelindeki `Donusum Analitigi` ekrani 7, 30 ve 90 gunluk huni,
anonim oturum, kampanya/kaynak ve ilan performansini yalnizca
toplulastirilmis olarak gosterir. Supabase veya tablo hazir degilse ornek
veri uretmek yerine aktivasyon durumunu gosterir.

## 6. Sistem durumu ekrani

Admin panelindeki `Sistem Durumu` ekrani su kontrolleri gizli degerleri
istemciye gondermeden yapar:

- Admin oturum degiskenleri
- Supabase ilan, CRM ve analitik tablolarina gercek okuma erisimi
- Medya bucket yapilandirmasi
- Resend bildirim yapilandirmasi
- Talep gizlilik tuzu
- Birinci taraf donusum olay deposu
- Istege bagli GA4, GTM veya Meta Pixel aktivasyonu

Kontroller `/api/admin/readiness` uzerinden yalnizca gecerli admin oturumuna
sunulur. Ekrandaki `Yeniden kontrol et` dugmesi Vercel degiskenleri
guncellendikten sonra sonucu tekrar sinar.

Fiyatlarin farkli para birimlerinde gosterimi `/api/rates` uzerinden Avrupa
Merkez Bankasi'nin gunluk EUR referans kurlarini kullanir. Kaynak erisilemezse
yanlis veya eski bir kur gostermek yerine arayuz yalnizca EUR secenegini
sunmaya devam eder.

## 7. Yayin kontrol listesi

```bash
npm install
npm run build
npm audit
```

Her yayin oncesinde asagidakileri manuel olarak da dogrulayin:

- Formlarin gercek Supabase kaydi ve e-posta bildirimi
- Admin girisi, ilan ekleme/duzenleme ve medya yukleme
- Turkce ve Ingilizce sayfalarda mobil gorunum
- Ilan arama, filtre, siralama ve detay baglantilari
- Canonical, hreflang, sitemap ve robots kurallari
- Cerez reddinde analitik betiklerinin yuklenmemesi
- Cerez reddinde `/api/events` istegi gonderilmemesi
- Admin donusum hunisinin gercek form, WhatsApp ve ilan olaylariyla guncellenmesi
- Telefon, WhatsApp, adres ve yasal metinlerin guncelligi

## 8. Icerik yayin politikasi

Odul, satis adedi, pazar liderligi, musteri yorumu veya ekip uyesi gibi
kanit gerektiren hicbir ifade belge ve acik yayin izni olmadan eklenmemelidir.

Bolge rehberlerinin Turkce ve Ingilizce icerik kaynagi
`regions-content.json` dosyasidir. `npm run build` her bolge icin iki dilde
statik SEO sayfasi, FAQ/Breadcrumb semasi ve sitemap kaydi uretir. Merkez ve
detay sayfalarindaki `data-region-count` alanlari yayindaki ilan verisinden
guncellenir. Aktif ilani bulunmayan bir bolge, aktif portfoy baglantisi olarak
sunulmamalidir.

Alim ve hizmet rehberlerinin iki dilli icerik kaynagi
`guides-content.json` dosyasidir. Her rehber resmi kurum baglantilari,
islem adimlari, kontrol listesi ve SSS verisi tasir. Derleme, Turkce ve
Ingilizce detay sayfalarini Article/FAQ/Breadcrumb semalariyla uretir.
Degisebilecek harc, esik veya basvuru kosullari sabit bir sonuc gibi
yayinlanmamali; ilgili TKGM, GIB, Goc Idaresi, e-Devlet veya DASK sayfasina
dogrudan dogrulama baglantisi verilmelidir.
Bu bilgiler hazir oldugunda marka diline uygun sekilde admin/editorial
surecinden gecirilerek yayinlanmalidir.

## 9. Portfoy kodu kalitesi

Her ilan kodu tekil olmalidir. Admin genel bakisi yinelenen kodlari gosterir;
bu kayitlar yayin ve sitemap ekraninda ilk gecerli kayda indirgenir, ancak
veri kaynagindan silinmez. Kopya kayitlar manuel olarak birlestirildikten
sonra `npm run db:migrate -- --apply` yalnizca tekil kodlari Supabase'e aktarir.
