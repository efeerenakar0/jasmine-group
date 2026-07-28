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
degistirilebilir ve operasyon notlari eklenebilir.

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

Harici ilan sitelerinden fotograflar veya metinler kopyalanmamalidir. Medya
dosyalari Supabase Storage'daki `property-media` bucket'ina yuklenir.

## 5. Analitik ve reklam

Asagidaki degiskenlerden ihtiyac duyulanlari Vercel'e ekleyin:

```text
PUBLIC_GA4_ID
PUBLIC_GTM_ID
PUBLIC_META_PIXEL_ID
```

Analitik ve reklam betikleri ziyaretci cerez tercihini kabul etmeden
yuklenmez. Form gonderimi, ilan goruntuleme ve WhatsApp tiklamalari donusum
olayi olarak kaydedilir.

Fiyatlarin farkli para birimlerinde gosterimi `/api/rates` uzerinden Avrupa
Merkez Bankasi'nin gunluk EUR referans kurlarini kullanir. Kaynak erisilemezse
yanlis veya eski bir kur gostermek yerine arayuz yalnizca EUR secenegini
sunmaya devam eder.

## 6. Yayin kontrol listesi

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
- Telefon, WhatsApp, adres ve yasal metinlerin guncelligi

## 7. Icerik yayin politikasi

Odul, satis adedi, pazar liderligi, musteri yorumu veya ekip uyesi gibi
kanit gerektiren hicbir ifade belge ve acik yayin izni olmadan eklenmemelidir.
Bu bilgiler hazir oldugunda marka diline uygun sekilde admin/editorial
surecinden gecirilerek yayinlanmalidir.
