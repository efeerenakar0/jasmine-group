document.addEventListener('DOMContentLoaded', () => {
  // Hero Slider
  if (document.querySelector('.hero-swiper')) {
    new Swiper('.hero-swiper', {
      loop: true,
      effect: 'fade',
      autoplay: { delay: 6000, disableOnInteraction: false },
      pagination: { el: '.swiper-pagination', clickable: true },
      navigation: { nextEl: '.swiper-button-next', prevEl: '.swiper-button-prev' },
    });
  }

  // Property Image Sliders
  const propSwipers = document.querySelectorAll('.prop-swiper');
  propSwipers.forEach(el => {
    new Swiper(el, {
      loop: true,
      navigation: {
        nextEl: el.parentElement.querySelector('.swiper-button-next'),
        prevEl: el.parentElement.querySelector('.swiper-button-prev')
      }
    });
  });
});

// --- i18n & Currency Logic ---

const translations = {
  "tr": {
    "nav_sale": "SATILIK",
    "nav_rent": "KİRALIK",
    "nav_sell": "MÜLK SATIŞI",
    "nav_guide": "ALIM REHBERİ",
    "nav_corporate": "KURUMSAL",
    "nav_blog": "BLOG",
    "nav_contact": "İLETİŞİM",
    "nav_login": "GİRİŞ YAP",
    "nav_call": "HEMEN ARA",
    "nav_mobile": "MOBİL",
    "nav_find": "EMLAK BUL",
    "nav_appt": "RANDEVU AL",
    "rent_month": "/ ay",
    "rent_day": "/ gün",
    "btn_advanced": "GELİŞMİŞ FİLTRE",
    "filter_loc": "Nerede?",
    "filter_type": "Emlak Tipi",
    "filter_room": "Oda Sayısı",
    "filter_pmin": "Fiyat (Min)",
    "filter_pmax": "Fiyat (Max)",
    "search_placeholder": "Örn. Alanya Oba'da satılık daire...",
    "hero_1": "Alanya'da Hayalinizdeki Evi Keşfedin",
    "hero_1_sub": "Yüzlerce seçkin emlak portföyü ile size en uygun yaşam alanını buluyoruz.",
    "hero_2": "Deniz Manzaralı Lüks Villalar",
    "hero_2_sub": "Özel havuzlu ve panoramik manzaralı elit yaşam alanları.",
    "hero_3": "Merkezi Konumda Eşsiz Yatırımlar",
    "hero_3_sub": "Şehrin kalbinde yüksek kira getirili ticari ve konut fırsatları.",
    "about_title": "Alanya'nın Lider Emlak Şirketi | Jasmine Group ®",
    "about_desc": "Jasmine Group, 2010 yılından bu yana Alanya ve çevresinde binlerce yerli ve yabancı müşteriye güvenilir gayrimenkul danışmanlığı hizmetleri sunmaktadır.",
    "about_more": "Hakkımızda Daha Fazla",
    "stat_sales": "Tamamlanan Satış",
    "stat_exp": "Yıllık Deneyim",
    "box_office": "Ofisimizi Ziyaret Edin",
    "box_office_desc": "Alanya merkezdeyiz, kahve eşliğinde sizi bekliyoruz.",
    "box_online": "Online Randevu",
    "box_online_desc": "Video görüşme ile evleri uzaktan inceleyin.",
    "box_guide": "Alım Rehberi",
    "box_guide_desc": "Türkiye'de mülk almanın adım adım kılavuzu.",
    "sec_sale": "Son Eklenen Satılık Mülkler",
    "sec_sale_all": "Tüm Satılıklar",
    "sec_rent": "Son Eklenen Kiralık Mülkler",
    "sec_rent_all": "Tüm Kiralıklar",
    "footer_desc": "Alanya'nın lider gayrimenkul şirketi. 2010'dan bu yana Alanya ve çevresinde binlerce mutlu müşteriye hizmet veriyoruz.",
    "footer_links": "Hızlı Linkler",
    "footer_regions": "Alanya Bölgeleri",
    "footer_contact": "İletişim",
    "badge_new": "YENİ İLAN",
    "props_found": "ilan bulundu",
    "sort_date_desc": "Tarihe Göre (Önce En Yeni)",
    "sort_price_asc": "Fiyata Göre (Önce En Düşük)",
    "sort_price_desc": "Fiyata Göre (Önce En Yüksek)",
    "prop_type_sale": "Satılık",
    "prop_type_rent": "Kiralık",
    "btn_apply": "UYGULA",
    "filter_title": "Filtreler",
    "page_title_rent": "Alanya'da Kiralık Emlaklar",
    "page_title_buy": "Alanya'da Satılık Emlaklar",
    "breadcrumb_rent": "Ana Sayfa > Kiralık",
    "breadcrumb_buy": "Ana Sayfa > Satılık",
    "filter_title_sidebar": "FİLTRELE",
    "filter_rent_type": "KİRALAMA TİPİ",
    "filter_sale_type": "SATIŞ TİPİ",
    "filter_region": "BÖLGE",
    "filter_all": "Tümü",
    "btn_clear": "TEMİZLE",
    "sort_newest": "En Yeniler",
    "nav_admin": "Admin Girişi"
  },
  "en": {
    "nav_sale": "FOR SALE",
    "nav_rent": "FOR RENT",
    "nav_sell": "SELL PROPERTY",
    "nav_guide": "BUYING GUIDE",
    "nav_corporate": "CORPORATE",
    "nav_blog": "BLOG",
    "nav_contact": "CONTACT",
    "nav_login": "LOGIN",
    "nav_call": "CALL NOW",
    "nav_mobile": "MOBILE",
    "nav_find": "FIND PROPERTY",
    "nav_appt": "APPOINTMENT",
    "rent_month": "/ month",
    "rent_day": "/ day",
    "btn_advanced": "ADVANCED FILTER",
    "filter_loc": "Location",
    "filter_type": "Property Type",
    "filter_room": "Rooms",
    "filter_pmin": "Min Price",
    "filter_pmax": "Max Price",
    "search_placeholder": "Ex. Apartment for sale in Oba...",
    "hero_1": "Discover Your Dream Home in Alanya",
    "hero_1_sub": "We find the best living space for you with hundreds of exclusive property portfolios.",
    "hero_2": "Luxury Villas with Sea View",
    "hero_2_sub": "Elite living spaces with private pools and panoramic views.",
    "hero_3": "Unique Investments in Central Location",
    "hero_3_sub": "High rental income commercial and residential opportunities in the heart of the city.",
    "about_title": "Alanya's Leading Real Estate Company | Jasmine Group ®",
    "about_desc": "Since 2010, Jasmine Group has been providing reliable real estate consultancy services to thousands of domestic and foreign customers in and around Alanya.",
    "about_more": "More About Us",
    "stat_sales": "Completed Sales",
    "stat_exp": "Years Experience",
    "box_office": "Visit Our Office",
    "box_office_desc": "We are in Alanya center, waiting for you with coffee.",
    "box_online": "Online Appointment",
    "box_online_desc": "Inspect houses remotely via video call.",
    "box_guide": "Buying Guide",
    "box_guide_desc": "Step by step guide to buying property in Turkey.",
    "sec_sale": "Recently Added Properties for Sale",
    "sec_sale_all": "All Properties for Sale",
    "sec_rent": "Recently Added Properties for Rent",
    "sec_rent_all": "All Properties for Rent",
    "footer_desc": "Alanya's leading real estate company. We have been serving thousands of happy customers in and around Alanya since 2010.",
    "footer_links": "Quick Links",
    "footer_regions": "Alanya Regions",
    "footer_contact": "Contact",
    "badge_new": "NEW LISTING",
    "props_found": "properties found",
    "sort_date_desc": "By Date (Newest First)",
    "sort_price_asc": "By Price (Lowest First)",
    "sort_price_desc": "By Price (Highest First)",
    "prop_type_sale": "For Sale",
    "prop_type_rent": "For Rent",
    "btn_apply": "APPLY",
    "filter_title": "Filters",
    "page_title_rent": "Properties for Rent in Alanya",
    "page_title_buy": "Properties for Sale in Alanya",
    "breadcrumb_rent": "Home > Rent",
    "breadcrumb_buy": "Home > Sale",
    "filter_title_sidebar": "FILTER",
    "filter_rent_type": "RENTAL TYPE",
    "filter_sale_type": "SALE TYPE",
    "filter_region": "REGION",
    "filter_all": "All",
    "btn_clear": "CLEAR",
    "sort_newest": "Newest First",
    "nav_admin": "Admin Login"
  },
  "ru": {
    "nav_sale": "ПРОДАЖА",
    "nav_rent": "АРЕНДА",
    "nav_sell": "ПРОДАТЬ НЕДВИЖИМОСТЬ",
    "nav_guide": "РУКОВОДСТВО",
    "nav_corporate": "О НАС",
    "nav_blog": "БЛОГ",
    "nav_contact": "КОНТАКТЫ",
    "nav_login": "ВОЙТИ",
    "nav_call": "ЗВОНИТЕ",
    "nav_mobile": "МОБИЛЬНЫЙ",
    "nav_find": "НАЙТИ НЕДВИЖИМОСТЬ",
    "nav_appt": "НАЗНАЧИТЬ ВСТРЕЧУ",
    "rent_month": "/ мес",
    "rent_day": "/ день",
    "btn_advanced": "ФИЛЬТРЫ",
    "filter_loc": "Где?",
    "filter_type": "Тип",
    "filter_room": "Комнаты",
    "filter_pmin": "Мин Цена",
    "filter_pmax": "Макс Цена",
    "search_placeholder": "Напр. Квартира в Оба...",
    "hero_1": "Найдите Дом Своей Мечты в Алании",
    "hero_1_sub": "Мы найдем для вас лучшее жилье благодаря сотням эксклюзивных портфолио.",
    "hero_2": "Роскошные Виллы с Видом на Море",
    "hero_2_sub": "Элитные жилые помещения с частными бассейнами и панорамными видами.",
    "hero_3": "Уникальные Инвестиции в Центре",
    "hero_3_sub": "Коммерческие и жилые объекты с высоким доходом от аренды.",
    "about_title": "Ведущее Агентство Недвижимости в Алании | Jasmine Group ®",
    "about_desc": "С 2010 года Jasmine Group предоставляет надежные услуги тысячам клиентов в Алании и ее окрестностях.",
    "about_more": "Подробнее о нас",
    "stat_sales": "Успешных продаж",
    "stat_exp": "Лет опыта",
    "box_office": "Посетите наш офис",
    "box_office_desc": "Мы находимся в центре Алании, ждем вас на кофе.",
    "box_online": "Онлайн встреча",
    "box_online_desc": "Осматривайте дома дистанционно по видеосвязи.",
    "box_guide": "Руководство покупателя",
    "box_guide_desc": "Пошаговое руководство по покупке в Турции.",
    "sec_sale": "Недавно добавленные объекты на продажу",
    "sec_sale_all": "Все объекты на продажу",
    "sec_rent": "Недавно добавленные объекты в аренду",
    "sec_rent_all": "Все объекты в аренду",
    "footer_desc": "Ведущее агентство недвижимости в Алании. С 2010 года обслуживаем тысячи довольных клиентов.",
    "footer_links": "Быстрые ссылки",
    "footer_regions": "Районы Алании",
    "footer_contact": "Контакты",
    "badge_new": "НОВИНКА",
    "props_found": "объектов найдено",
    "sort_date_desc": "По дате (сначала новые)",
    "sort_price_asc": "По цене (сначала дешевые)",
    "sort_price_desc": "По цене (сначала дорогие)",
    "prop_type_sale": "Продажа",
    "prop_type_rent": "Аренда",
    "btn_apply": "ПРИМЕНИТЬ",
    "filter_title": "Фильтры",
    "page_title_rent": "Недвижимость в аренду в Алании",
    "page_title_buy": "Недвижимость на продажу в Алании",
    "breadcrumb_rent": "Главная > Аренда",
    "breadcrumb_buy": "Главная > Продажа",
    "filter_title_sidebar": "ФИЛЬТР",
    "filter_rent_type": "ТИП АРЕНДЫ",
    "filter_sale_type": "ТИП ПРОДАЖИ",
    "filter_region": "РАЙОН",
    "filter_all": "Все",
    "btn_clear": "ОЧИСТИТЬ",
    "sort_newest": "Сначала новые",
    "nav_admin": "Вход админа"
  },
  "de": {
    "nav_sale": "KAUFEN",
    "nav_rent": "MIETEN",
    "nav_sell": "VERKAUFEN",
    "nav_guide": "KAUFRATGEBER",
    "nav_corporate": "ÜBER UNS",
    "nav_blog": "BLOG",
    "nav_contact": "KONTAKT",
    "nav_login": "ANMELDEN",
    "nav_call": "ANRUFEN",
    "nav_mobile": "MOBIL",
    "nav_find": "IMMOBILIEN FINDEN",
    "nav_appt": "TERMIN BUCHEN",
    "rent_month": "/ monat",
    "rent_day": "/ tag",
    "btn_advanced": "ERWEITERTER FILTER",
    "filter_loc": "Wo?",
    "filter_type": "Immobilientyp",
    "filter_room": "Zimmer",
    "filter_pmin": "Min Preis",
    "filter_pmax": "Max Preis",
    "search_placeholder": "Z.B. Wohnung in Oba...",
    "hero_1": "Finden Sie Ihr Traumhaus in Alanya",
    "hero_1_sub": "Mit hunderten exklusiven Immobilien-Portfolios finden wir den besten Wohnraum für Sie.",
    "hero_2": "Luxusvillen mit Meerblick",
    "hero_2_sub": "Elitäre Wohnräume mit privaten Pools und Panoramablick.",
    "hero_3": "Einzigartige Investitionen im Zentrum",
    "hero_3_sub": "Hohe Mieteinnahmen bei Gewerbe- und Wohnimmobilien im Herzen der Stadt.",
    "about_title": "Das führende Immobilienunternehmen in Alanya | Jasmine Group ®",
    "about_desc": "Seit 2010 bietet die Jasmine Group zuverlässige Immobilienberatung für Tausende von Kunden.",
    "about_more": "Mehr über uns",
    "stat_sales": "Verkaufte Immobilien",
    "stat_exp": "Jahre Erfahrung",
    "box_office": "Besuchen Sie unser Büro",
    "box_office_desc": "Wir sind im Zentrum von Alanya.",
    "box_online": "Online-Termin",
    "box_online_desc": "Häuser per Videoanruf aus der Ferne besichtigen.",
    "box_guide": "Kaufratgeber",
    "box_guide_desc": "Schritt-für-Schritt-Anleitung für den Kauf in der Türkei.",
    "sec_sale": "Zuletzt hinzugefügte Immobilien zum Verkauf",
    "sec_sale_all": "Alle zum Verkauf",
    "sec_rent": "Zuletzt hinzugefügte Immobilien zur Miete",
    "sec_rent_all": "Alle zur Miete",
    "footer_desc": "Das führende Immobilienunternehmen in Alanya. Wir bedienen seit 2010 glückliche Kunden.",
    "footer_links": "Schnelle Links",
    "footer_regions": "Alanya Regionen",
    "footer_contact": "Kontakt",
    "badge_new": "NEU",
    "props_found": "immobilien gefunden",
    "sort_date_desc": "Nach Datum (Neueste zuerst)",
    "sort_price_asc": "Nach Preis (Niedrigster zuerst)",
    "sort_price_desc": "Nach Preis (Höchster zuerst)",
    "prop_type_sale": "Kaufen",
    "prop_type_rent": "Mieten",
    "btn_apply": "ANWENDEN",
    "filter_title": "Filter",
    "page_title_rent": "Immobilien zur Miete in Alanya",
    "page_title_buy": "Immobilien zum Verkauf in Alanya",
    "breadcrumb_rent": "Startseite > Mieten",
    "breadcrumb_buy": "Startseite > Kaufen",
    "filter_title_sidebar": "FILTER",
    "filter_rent_type": "MIETART",
    "filter_sale_type": "VERKAUFSART",
    "filter_region": "REGION",
    "filter_all": "Alle",
    "btn_clear": "LÖSCHEN",
    "sort_newest": "Neueste zuerst",
    "nav_admin": "Admin-Login"
  },
  "fa": {
    "nav_sale": "برای فروش",
    "nav_rent": "برای اجاره",
    "nav_sell": "فروش ملک",
    "nav_guide": "راهنمای خرید",
    "nav_corporate": "درباره ما",
    "nav_blog": "وبلاگ",
    "nav_contact": "تماس با ما",
    "nav_login": "ورود",
    "nav_call": "تماس بگیرید",
    "nav_mobile": "موبایل",
    "nav_find": "جستجوی ملک",
    "nav_appt": "رزرو وقت",
    "rent_month": "/ ماه",
    "rent_day": "/ روز",
    "btn_advanced": "جستجوی پیشرفته",
    "filter_loc": "کجا؟",
    "filter_type": "نوع ملک",
    "filter_room": "اتاق ها",
    "filter_pmin": "حداقل قیمت",
    "filter_pmax": "حداکثر قیمت",
    "search_placeholder": "مثال: آپارتمان فروشی در اوبا...",
    "hero_1": "خانه رویایی خود را در آلانیا کشف کنید",
    "hero_1_sub": "ما بهترین فضای زندگی را با صدها ملک انحصاری برای شما پیدا می کنیم.",
    "hero_2": "ویلاهای لوکس با منظره دریا",
    "hero_2_sub": "فضاهای زندگی نخبگان با استخرهای خصوصی و منظره پانوراما.",
    "hero_3": "سرمایه گذاری های منحصر به فرد",
    "hero_3_sub": "فرصت های تجاری و مسکونی با درآمد اجاره بالا در قلب شهر.",
    "about_title": "شرکت املاک و مستغلات پیشرو در آلانیا | Jasmine Group ®",
    "about_desc": "از سال ۲۰۱۰، گروه یاسمین خدمات مشاوره املاک و مستغلات قابل اعتمادی را به هزاران مشتری داخلی و خارجی ارائه می دهد.",
    "about_more": "درباره ما بیشتر بدانید",
    "stat_sales": "فروش موفق",
    "stat_exp": "سال تجربه",
    "box_office": "بازدید از دفتر ما",
    "box_office_desc": "ما در مرکز آلانیا هستیم، منتظر شما با قهوه هستیم.",
    "box_online": "قرار آنلاین",
    "box_online_desc": "خانه ها را از راه دور از طریق تماس تصویری بررسی کنید.",
    "box_guide": "راهنمای خرید",
    "box_guide_desc": "راهنمای گام به گام خرید ملک در ترکیه.",
    "sec_sale": "املاک اضافه شده اخیر برای فروش",
    "sec_sale_all": "همه املاک برای فروش",
    "sec_rent": "املاک اضافه شده اخیر برای اجاره",
    "sec_rent_all": "همه املاک برای اجاره",
    "footer_desc": "شرکت املاک و مستغلات پیشرو در آلانیا. ما از سال ۲۰۱۰ به هزاران مشتری خوشحال خدمت کرده ایم.",
    "footer_links": "لینک های سریع",
    "footer_regions": "مناطق آلانیا",
    "footer_contact": "تماس",
    "badge_new": "جدید",
    "props_found": "ملک پیدا شد",
    "sort_date_desc": "بر اساس تاریخ (جدیدترین ها اول)",
    "sort_price_asc": "بر اساس قیمت (ارزان ترین ها اول)",
    "sort_price_desc": "بر اساس قیمت (گران ترین ها اول)",
    "prop_type_sale": "فروش",
    "prop_type_rent": "اجاره",
    "btn_apply": "اعمال",
    "filter_title": "فیلترها",
    "page_title_rent": "املاک برای اجاره در آلانیا",
    "page_title_buy": "املاک برای فروش در آلانیا",
    "breadcrumb_rent": "خانه > اجاره",
    "breadcrumb_buy": "خانه > فروش",
    "filter_title_sidebar": "فیلتر",
    "filter_rent_type": "نوع اجاره",
    "filter_sale_type": "نوع فروش",
    "filter_region": "منطقه",
    "filter_all": "همه",
    "btn_clear": "پاک کردن",
    "sort_newest": "جدیدترین ها",
    "nav_admin": "ورود مدیر"
  },
  "ar": {
    "nav_sale": "للبيع",
    "nav_rent": "للايجار",
    "nav_sell": "بيع عقار",
    "nav_guide": "دليل الشراء",
    "nav_corporate": "الشركة",
    "nav_blog": "المدونة",
    "nav_contact": "اتصل بنا",
    "nav_login": "دخول",
    "nav_call": "اتصل الان",
    "nav_mobile": "جوال",
    "nav_find": "البحث عن عقار",
    "nav_appt:": "موعد",
    "rent_month": "/ شهر",
    "rent_day": "/ يوم",
    "btn_advanced": "بحث متقدم",
    "filter_loc": "أين؟",
    "filter_type": "نوع العقار",
    "filter_room": "غرف",
    "filter_pmin": "السعر الأدنى",
    "filter_pmax": "السعر الأقصى",
    "search_placeholder": "مثال: شقة للبيع في أوبا...",
    "hero_1": "اكتشف منزل أحلامك في ألانيا",
    "hero_1_sub": "نجد لك أفضل مساحة معيشة مع مئات العقارات الحصرية.",
    "hero_2": "فلل فاخرة تطل على البحر",
    "hero_2_sub": "مساحات معيشة النخبة مع مسابح خاصة وإطلالات بانورامية.",
    "hero_3": "استثمارات فريدة في المركز",
    "hero_3_sub": "فرص تجارية وسكنية ذات دخل إيجار مرتفع في قلب المدينة.",
    "about_title": "شركة العقارات الرائدة في ألانيا | Jasmine Group ®",
    "about_desc": "منذ عام 2010، تقدم مجموعة ياسمين خدمات استشارية موثوقة لآلاف العملاء.",
    "about_more": "اقرأ المزيد",
    "stat_sales": "المبيعات الناجحة",
    "stat_exp": "سنوات الخبرة",
    "box_office": "قم بزيارة مكتبنا",
    "box_office_desc": "نحن في وسط ألانيا، ننتظرك مع القهوة.",
    "box_online": "موعد عبر الإنترنت",
    "box_online_desc": "فحص المنازل عن بعد عبر مكالمة فيديو.",
    "box_guide": "دليل الشراء",
    "box_guide_desc": "دليل خطوة بخطوة لشراء العقارات في تركيا.",
    "sec_sale": "عقارات مضافة حديثا للبيع",
    "sec_sale_all": "جميع العقارات للبيع",
    "sec_rent": "عقارات مضافة حديثا للإيجار",
    "sec_rent_all": "جميع العقارات للإيجار",
    "footer_desc": "شركة العقارات الرائدة في ألانيا. نحن نخدم آلاف العملاء السعداء منذ عام 2010.",
    "footer_links": "روابط سريعة",
    "footer_regions": "مناطق ألانيا",
    "footer_contact": "اتصال",
    "badge_new": "جديد",
    "props_found": "عقارات وجدت",
    "sort_date_desc": "حسب التاريخ (الأحدث أولاً)",
    "sort_price_asc": "حسب السعر (الأرخص أولاً)",
    "sort_price_desc": "حسب السعر (الأغلى أولاً)",
    "prop_type_sale": "بيع",
    "prop_type_rent": "إيجار",
    "btn_apply": "تطبيق",
    "filter_title": "تصفية",
    "page_title_rent": "عقارات للإيجار في ألانيا",
    "page_title_buy": "عقارات للبيع في ألانيا",
    "breadcrumb_rent": "الرئيسية > إيجار",
    "breadcrumb_buy": "الرئيسية > بيع",
    "filter_title_sidebar": "تصفية",
    "filter_rent_type": "نوع الإيجار",
    "filter_sale_type": "نوع البيع",
    "filter_region": "منطقة",
    "filter_all": "الكل",
    "btn_clear": "مسح",
    "sort_newest": "الأحدث",
    "nav_admin": "دخول المسؤول"
  },
  "fr": {
    "nav_sale": "À VENDRE",
    "nav_rent": "À LOUER",
    "nav_sell": "VENDRE PROPRIÉTÉ",
    "nav_guide": "GUIDE D'ACHAT",
    "nav_corporate": "ENTREPRISE",
    "nav_blog": "BLOG",
    "nav_contact": "CONTACT",
    "nav_login": "CONNEXION",
    "nav_call": "APPELER",
    "nav_mobile": "MOBILE",
    "nav_find": "TROUVER",
    "nav_appt": "RENDEZ-VOUS",
    "rent_month": "/ mois",
    "rent_day": "/ jour",
    "btn_advanced": "FILTRE AVANCÉ",
    "filter_loc": "Où?",
    "filter_type": "Type",
    "filter_room": "Pièces",
    "filter_pmin": "Prix Min",
    "filter_pmax": "Prix Max",
    "search_placeholder": "Ex. Appartement à Oba...",
    "hero_1": "Découvrez la Maison de vos Rêves",
    "hero_1_sub": "Des centaines de portefeuilles exclusifs pour vous.",
    "hero_2": "Villas de Luxe avec Vue Mer",
    "hero_2_sub": "Espaces de vie d'élite avec piscines privées.",
    "hero_3": "Investissements Uniques",
    "hero_3_sub": "Revenus locatifs élevés au cœur de la ville.",
    "about_title": "L'Agence Immobilière Leader à Alanya",
    "about_desc": "Depuis 2010, Jasmine Group offre des services fiables à des milliers de clients.",
    "about_more": "En Savoir Plus",
    "stat_sales": "Ventes Réussies",
    "stat_exp": "Années d'Expérience",
    "box_office": "Visitez Notre Bureau",
    "box_office_desc": "Nous sommes au centre d'Alanya.",
    "box_online": "Rendez-vous en Ligne",
    "box_online_desc": "Visites virtuelles par appel vidéo.",
    "box_guide": "Guide d'Achat",
    "box_guide_desc": "Guide étape par étape pour acheter en Turquie.",
    "sec_sale": "Récemment Ajoutés (Vente)",
    "sec_sale_all": "Tout à Vendre",
    "sec_rent": "Récemment Ajoutés (Location)",
    "sec_rent_all": "Tout à Louer",
    "footer_desc": "L'agence immobilière leader à Alanya. Au service de milliers de clients depuis 2010.",
    "footer_links": "Liens Rapides",
    "footer_regions": "Régions d'Alanya",
    "footer_contact": "Contact",
    "badge_new": "NOUVEAU",
    "props_found": "propriétés trouvées",
    "sort_date_desc": "Par Date (Plus Récents)",
    "sort_price_asc": "Par Prix (Croissant)",
    "sort_price_desc": "Par Prix (Décroissant)",
    "prop_type_sale": "Vente",
    "prop_type_rent": "Location",
    "btn_apply": "APPLIQUER",
    "filter_title": "Filtres",
    "page_title_rent": "Propriétés à Louer à Alanya",
    "page_title_buy": "Propriétés à Vendre à Alanya",
    "breadcrumb_rent": "Accueil > Louer",
    "breadcrumb_buy": "Accueil > Acheter",
    "filter_title_sidebar": "FILTRER",
    "filter_rent_type": "TYPE DE LOCATION",
    "filter_sale_type": "TYPE DE VENTE",
    "filter_region": "RÉGION",
    "filter_all": "Tout",
    "btn_clear": "EFFACER",
    "sort_newest": "Plus Récents",
    "nav_admin": "Connexion Admin"
  },
  "nl": {
    "nav_sale": "TE KOOP",
    "nav_rent": "TE HUUR",
    "nav_sell": "VERKOPEN",
    "nav_guide": "KOOPGIDS",
    "nav_corporate": "BEDRIJF",
    "nav_blog": "BLOG",
    "nav_contact": "CONTACT",
    "nav_login": "INLOGGEN",
    "nav_call": "BELLEN",
    "nav_mobile": "MOBIEL",
    "nav_find": "VINDEN",
    "nav_appt": "AFSPRAAK",
    "rent_month": "/ maand",
    "rent_day": "/ dag",
    "btn_advanced": "GEAVANCEERD",
    "filter_loc": "Waar?",
    "filter_type": "Type",
    "filter_room": "Kamers",
    "filter_pmin": "Min Prijs",
    "filter_pmax": "Max Prijs",
    "search_placeholder": "Bijv. Appartement in Oba...",
    "hero_1": "Vind uw Droomhuis in Alanya",
    "hero_1_sub": "Met honderden exclusieve portfolio's vinden wij de beste woning voor u.",
    "hero_2": "Luxe Villa's met Zeezicht",
    "hero_2_sub": "Elite woningen met privézwembaden en panoramisch uitzicht.",
    "hero_3": "Unieke Investeringen",
    "hero_3_sub": "Hoge huurinkomsten in het hart van de stad.",
    "about_title": "Het Leidende Makelaarskantoor in Alanya",
    "about_desc": "Sinds 2010 biedt Jasmine Group betrouwbare diensten aan duizenden klanten.",
    "about_more": "Meer Over Ons",
    "stat_sales": "Verkopen",
    "stat_exp": "Jaren Ervaring",
    "box_office": "Bezoek Ons Kantoor",
    "box_office_desc": "Wij zijn in het centrum van Alanya.",
    "box_online": "Online Afspraak",
    "box_online_desc": "Bekijk huizen op afstand via videobellen.",
    "box_guide": "Koopgids",
    "box_guide_desc": "Stap-voor-stap handleiding voor kopen in Turkije.",
    "sec_sale": "Recent Toegevoegd (Koop)",
    "sec_sale_all": "Alles Te Koop",
    "sec_rent": "Recent Toegevoegd (Huur)",
    "sec_rent_all": "Alles Te Huur",
    "footer_desc": "Het leidende makelaarskantoor in Alanya. Wij bedienen sinds 2010 duizenden klanten.",
    "footer_links": "Snelle Links",
    "footer_regions": "Regio's Alanya",
    "footer_contact": "Contact",
    "badge_new": "NIEUW",
    "props_found": "woningen gevonden",
    "sort_date_desc": "Op Datum (Nieuwste)",
    "sort_price_asc": "Op Prijs (Laagste)",
    "sort_price_desc": "Op Prijs (Hoogste)",
    "prop_type_sale": "Kopen",
    "prop_type_rent": "Huren",
    "btn_apply": "TOEPASSEN",
    "filter_title": "Filters",
    "page_title_rent": "Woningen te Huur in Alanya",
    "page_title_buy": "Woningen te Koop in Alanya",
    "breadcrumb_rent": "Home > Huren",
    "breadcrumb_buy": "Home > Kopen",
    "filter_title_sidebar": "FILTEREN",
    "filter_rent_type": "HUURTYPE",
    "filter_sale_type": "KOOPTYPE",
    "filter_region": "REGIO",
    "filter_all": "Alle",
    "btn_clear": "WISSEN",
    "sort_newest": "Nieuwste Eerst",
    "nav_admin": "Admin Login"
  },
  "sv": {
    "nav_sale": "TILL SALU",
    "nav_rent": "UTHYRES",
    "nav_sell": "SÄLJ",
    "nav_guide": "KÖPGUIDE",
    "nav_corporate": "FÖRETAG",
    "nav_blog": "BLOGG",
    "nav_contact": "KONTAKT",
    "nav_login": "LOGGA IN",
    "nav_call": "RING",
    "nav_mobile": "MOBIL",
    "nav_find": "HITTA",
    "nav_appt": "BOKA",
    "rent_month": "/ månad",
    "rent_day": "/ dag",
    "btn_advanced": "AVANCERAT",
    "filter_loc": "Var?",
    "filter_type": "Typ",
    "filter_room": "Rum",
    "filter_pmin": "Min Pris",
    "filter_pmax": "Max Pris",
    "search_placeholder": "Ex. Lägenhet i Oba...",
    "hero_1": "Hitta ditt Drömhem i Alanya",
    "hero_1_sub": "Med hundratals exklusiva portföljer hittar vi det bästa hemmet för dig.",
    "hero_2": "Lyxvillor med Havsutsikt",
    "hero_2_sub": "Elitboenden med privata pooler.",
    "hero_3": "Unika Investeringar",
    "hero_3_sub": "Höga hyresintäkter i hjärtat av staden.",
    "about_title": "Den Ledande Fastighetsbyrån i Alanya",
    "about_desc": "Sedan 2010 erbjuder Jasmine Group pålitliga tjänster till tusentals kunder.",
    "about_more": "Mer Om Oss",
    "stat_sales": "Försäljningar",
    "stat_exp": "Års Erfarenhet",
    "box_office": "Besök Vårt Kontor",
    "box_office_desc": "Vi finns i centrala Alanya.",
    "box_online": "Online Möte",
    "box_online_desc": "Inspektera hus på distans via videosamtal.",
    "box_guide": "Köpguide",
    "box_guide_desc": "Steg för steg guide för att köpa i Turkiet.",
    "sec_sale": "Nyligen Tillagda (Salu)",
    "sec_sale_all": "Alla Till Salu",
    "sec_rent": "Nyligen Tillagda (Hyra)",
    "sec_rent_all": "Alla Uthyres",
    "footer_desc": "Den ledande fastighetsbyrån i Alanya. Vi har betjänat tusentals kunder sedan 2010.",
    "footer_links": "Snabblänkar",
    "footer_regions": "Regioner Alanya",
    "footer_contact": "Kontakt",
    "badge_new": "NYHET",
    "props_found": "bostäder hittades",
    "sort_date_desc": "Efter Datum (Nyast)",
    "sort_price_asc": "Efter Pris (Lägst)",
    "sort_price_desc": "Efter Pris (Högst)",
    "prop_type_sale": "Sälja",
    "prop_type_rent": "Hyra",
    "btn_apply": "TILLÄMPA",
    "filter_title": "Filter",
    "page_title_rent": "Fastigheter Uthyres i Alanya",
    "page_title_buy": "Fastigheter Till Salu i Alanya",
    "breadcrumb_rent": "Hem > Hyra",
    "breadcrumb_buy": "Hem > Köpa",
    "filter_title_sidebar": "FILTRERA",
    "filter_rent_type": "HYRESTYP",
    "filter_sale_type": "FÖRSÄLJNINGSTYP",
    "filter_region": "REGION",
    "filter_all": "Alla",
    "btn_clear": "RENSA",
    "sort_newest": "Nyast Först",
    "nav_admin": "Admin Login"
  }
};

const rates = {
  eur: { rate: 1, symbol: '€' },
  try: { rate: 35.5, symbol: '₺' },
  usd: { rate: 1.08, symbol: '$' },
  sek: { rate: 11.5, symbol: 'kr' },
  rub: { rate: 100, symbol: '₽' },
  nok: { rate: 11.6, symbol: 'kr' },
  chf: { rate: 0.95, symbol: 'CHF' },
  gbp: { rate: 0.85, symbol: '£' },
  cny: { rate: 7.8, symbol: '¥' },
  cad: { rate: 1.45, symbol: 'C$' },
  sar: { rate: 4.05, symbol: 'SAR' },
  aed: { rate: 3.96, symbol: 'AED' }
};

function changeCurrency(curr) {
  localStorage.setItem('jg_currency', curr);
  const rateInfo = rates[curr] || rates.eur;
  const lang = localStorage.getItem('jg_lang') || 'tr';
  const dict = translations[lang] || translations.tr;

  // Update UI dropdown text
  const labels = {
    'eur': 'EUR (€)',
    'usd': 'USD ($)',
    'try': 'TRY (₺)',
    'rub': 'RUB (₽)',
    'gbp': 'GBP (£)'
  };
  document.querySelectorAll('#currentCurr').forEach(el => el.textContent = labels[curr] || curr.toUpperCase() + ' (' + rateInfo.symbol + ')');

  document.querySelectorAll('option[data-eur]').forEach(el => {
    const eurVal = parseFloat(el.getAttribute('data-eur'));
    const converted = Math.round(eurVal * rateInfo.rate);
    const suffix = el.getAttribute('data-suffix') || '';
    el.innerHTML = rateInfo.symbol + ' ' + converted.toLocaleString('de-DE') + suffix;
  });

  document.querySelectorAll('.prop-price[data-eur]').forEach(el => {
    const eurVal = parseFloat(el.getAttribute('data-eur'));
    const converted = Math.round(eurVal * rateInfo.rate);
    const formatted = converted.toLocaleString('de-DE');
    
    const type = el.getAttribute('data-type');
    let suffix = '';
    if (type === 'rent_month') suffix = ' <em>' + (dict.rent_month || '/ ay') + '</em>';
    if (type === 'rent_day') suffix = ' <em>' + (dict.rent_day || '/ gün') + '</em>';

    el.innerHTML = rateInfo.symbol + ' ' + formatted + suffix;
  });
}

function changeLang(lang) {
  localStorage.setItem('jg_lang', lang);
  const dict = translations[lang] || translations.tr;
  
  document.querySelectorAll('[data-i18n]').forEach(el => {
    const key = el.getAttribute('data-i18n');
    if (dict[key]) {
      if (el.tagName === 'INPUT') el.placeholder = dict[key];
      else el.textContent = dict[key];
    }
  });

  // Update UI flags
  const flags = { 'tr': '🇹🇷', 'en': '🇬🇧', 'ru': '🇷🇺', 'de': '🇩🇪', 'fa': '🇮🇷', 'ar': '🇸🇦', 'fr': '🇫🇷', 'nl': '🇳🇱', 'sv': '🇸🇪' };
  document.querySelectorAll('#currentLangFlag').forEach(el => el.textContent = flags[lang] || '🇹🇷');
  document.querySelectorAll('#currentLangText').forEach(el => el.textContent = lang.toUpperCase());

  // Update dynamic counters if present
  // Swiperları yeniden başlat
  document.querySelectorAll('.prop-swiper').forEach(el => {
    new Swiper(el, { loop: true, navigation: { nextEl: el.parentElement.querySelector('.swiper-button-next'), prevEl: el.parentElement.querySelector('.swiper-button-prev') } });
  });
  
  // Kurları uygula
  changeCurrency(localStorage.getItem('jg_currency') || 'eur');
}

// Yüklenince çalıştır

document.addEventListener('DOMContentLoaded', async () => {
  if(document.getElementById('prop-list')) {
    const props = await fetchProperties();
    
    const urlParams = new URLSearchParams(window.location.search);
    if (Array.from(urlParams.keys()).length > 0) {
        setTimeout(() => {
            if(document.getElementById('sidebar-loc') && urlParams.get('loc')) {
                document.getElementById('sidebar-loc').value = urlParams.get('loc');
            }
            if(document.getElementById('sidebar-type') && urlParams.get('type')) {
                const t = urlParams.get('type');
                if(t.includes('Daire') || t.includes('Apartman')) document.getElementById('sidebar-type').value = 'Daire';
                else if(t.includes('Villa')) document.getElementById('sidebar-type').value = 'Villa';
            }
            if(document.getElementById('sidebar-pmin') && urlParams.get('min')) {
                document.getElementById('sidebar-pmin').value = urlParams.get('min');
            }
            if(document.getElementById('sidebar-pmax') && urlParams.get('max')) {
                document.getElementById('sidebar-pmax').value = urlParams.get('max');
            }
        }, 100);
    }
    
    const btnApply = document.getElementById('btn-sidebar-apply');
    if (btnApply) {
        btnApply.addEventListener('click', () => applySidebarFilters(props));
    }
    const btnReset = document.getElementById('btn-sidebar-reset');
    if (btnReset) {
        btnReset.addEventListener('click', () => {
            if(document.getElementById('sidebar-loc')) document.getElementById('sidebar-loc').value = 'Tümü';
            if(document.getElementById('sidebar-type')) document.getElementById('sidebar-type').value = 'Tümü';
            if(document.getElementById('sidebar-pmin')) document.getElementById('sidebar-pmin').value = '';
            if(document.getElementById('sidebar-pmax')) document.getElementById('sidebar-pmax').value = '';
            window.history.pushState({}, document.title, window.location.pathname);
            renderProperties(props);
        });
    }
    
    const sortSelect = document.querySelector('.sort-bar select');
    if (sortSelect) {
        sortSelect.addEventListener('change', () => {
            if(document.getElementById('sidebar-loc')) applySidebarFilters(props);
            else renderProperties(props);
        });
    }
    
    setTimeout(() => {
        if(document.getElementById('sidebar-loc')) {
            applySidebarFilters(props);
        } else {
            renderProperties(props);
        }
    }, 150);
  }
});

async function fetchProperties() {
  try {
    const res = await fetch('admin/data.json?v=' + new Date().getTime());
    if (!res.ok) throw new Error("HTTP error");
    const data = await res.json();
    const props = data.properties || []; 
    if(typeof populateLocations === 'function') populateLocations(props); 
    return props;
  } catch (e) {
    console.error("İlanlar yüklenemedi:", e);
    return [];
  }
}

function renderProperties(props) {
  const list = document.getElementById('prop-list');
  if (!list) return;
  
  const isRentPage = window.location.pathname.includes('rent.html');
  const isBuyPage = window.location.pathname.includes('buy.html');
  const isIndexPage = !isRentPage && !isBuyPage && !window.location.pathname.includes('property-detail.html');
  
  let renderProps = [...props];
  
  const sortSelect = document.querySelector('.sort-bar select');
  if (sortSelect) {
      const sortVal = sortSelect.value.toLowerCase();
      if (sortVal.includes('düşük') || sortVal.includes('artan') || sortVal.includes('lowest') || sortVal.includes('croissant') || sortVal.includes('laagste') || sortVal.includes('lägst') || sortVal.includes('дешевые')) {
          renderProps.sort((a, b) => a.price_eur - b.price_eur);
      } else if (sortVal.includes('yüksek') || sortVal.includes('azalan') || sortVal.includes('highest') || sortVal.includes('décroissant') || sortVal.includes('hoogste') || sortVal.includes('högst') || sortVal.includes('дорогие')) {
          renderProps.sort((a, b) => b.price_eur - a.price_eur);
      } else {
          renderProps.sort((a, b) => parseInt(b.id.replace(/\D/g, '') || 0) - parseInt(a.id.replace(/\D/g, '') || 0));
      }
  } else {
      // Default newest first if no sort select
      renderProps.sort((a, b) => parseInt(b.id.replace(/\D/g, '') || 0) - parseInt(a.id.replace(/\D/g, '') || 0));
  }
  
  if (isIndexPage) {
    renderProps = renderProps.slice(0, 8); // Only show 8 latest properties on homepage
  }
  
  list.innerHTML = '';
  renderProps.forEach(p => {
    if (isRentPage && p.type !== 'rent') return;
    if (isBuyPage && p.type !== 'sale') return;
    
    let imgsHTML = p.images.map(img => `<div class="swiper-slide"><img src="${img}" alt="${p.title || 'Alanya Emlak'}" /></div>`).join('');
    let bClass = p.badge_color ? `prop-badge ${p.badge_color}` : `prop-badge`;
    let badgeHTML = p.badge ? `<span class="${bClass}">${p.badge}</span>` : '';
    let suffix = p.type === 'rent' ? ' <em>/ ay</em>' : '';
    
    // desc truncate
    let desc = p.desc || '';
    if (desc.length > 120) desc = desc.substring(0, 120) + '...';
    
    let html = `
      <div class="property-item">
        <div class="prop-img-side">
          <div class="swiper prop-swiper">
            <div class="swiper-wrapper">${imgsHTML}</div>
            <div class="swiper-button-next"></div>
            <div class="swiper-button-prev"></div>
          </div>
          ${badgeHTML}
          <div class="prop-code-strip"><span>${p.id}</span><span><i class="fa-solid fa-camera"></i> ${p.images.length}</span></div>
        </div>
        <div class="prop-info-side">
          <a href="property-detail.html?id=${p.id}" class="prop-title">${p.title}</a>
          <div class="prop-location"><i class="fa-solid fa-location-dot"></i> ${p.location.toUpperCase()}</div>
          <div class="prop-rooms">
            <span><i class="fa-solid fa-bed"></i> ${p.rooms}</span>
            <span><i class="fa-solid fa-bath"></i> ${p.bathrooms || '-'} Banyo</span>
            <span><i class="fa-solid fa-maximize"></i> ${p.area_net} m²</span>
            ${p.area_gross ? `<span><i class="fa-solid fa-vector-square"></i> ${p.area_gross} m²</span>` : ''}
          </div>
          <p class="prop-desc">${desc}</p>
          <div class="prop-footer">
            <div class="prop-price" data-eur="${p.price_eur}" data-type="${p.type === 'rent' ? 'rent_month' : 'sale'}">€ ${p.price_eur.toLocaleString('de-DE')}${suffix}</div>
            <div class="prop-actions">
              <button class="wishlist-btn" style="border:none;background:transparent;cursor:pointer;margin-right:10px;" onclick="toggleWishlist('${p.id}', this)" title="Favorilere Ekle"><i class="fa-regular fa-heart"></i></button>
              <a href="contact.html" class="prop-btn"><i class="fa-solid fa-message"></i> İLETİŞİM</a>
              <a href="property-detail.html?id=${p.id}" class="prop-btn primary"><i class="fa-solid fa-circle-info"></i> DETAYLAR</a>
            </div>
          </div>
        </div>
      </div>
    `;
    list.innerHTML += html;
  });
  
  document.querySelectorAll('.prop-swiper').forEach(el => {
    new Swiper(el, { loop: true, navigation: { nextEl: el.parentElement.querySelector('.swiper-button-next'), prevEl: el.parentElement.querySelector('.swiper-button-prev') } });
  });
  
  changeCurrency(localStorage.getItem('jg_currency') || 'eur');
  if(typeof updateWishlistUI === 'function') updateWishlistUI();
}

// --- Property Detail Page Logic ---
async function renderPropertyDetail() {
  const container = document.getElementById('detail-container');
  if (!container) return;
  
  const urlParams = new URLSearchParams(window.location.search);
  const id = urlParams.get('id');
  if (!id) {
    container.innerHTML = '<h2 style="text-align:center;">İlan Bulunamadı.</h2>';
    return;
  }
  
  const props = await fetchProperties();
  const p = props.find(x => x.id === id);
  if (!p) {
    container.innerHTML = '<h2 style="text-align:center;">İlan Bulunamadı veya Silinmiş.</h2>';
    return;
  }
  
  let mainImg = p.images.length > 0 ? p.images[0] : 'https://images.unsplash.com/photo-1560518883-ce09059eeffa?auto=format&fit=crop&w=800&q=80';
  let thumbsHTML = p.images.map((img, i) => `
    <img src="${img}" style="min-width:120px; width:120px; height:85px; object-fit:cover; border-radius:6px; cursor:pointer; opacity:${i===0?'1':'0.6'}; border:2px solid ${i===0?'var(--red)':'transparent'}; transition:0.3s;" onclick="changeMainImage(this, '${img}')" class="detail-thumb">
  `).join('');
  if(p.images.length === 0) thumbsHTML = '';
  
  let bClass = p.badge_color ? `prop-badge ${p.badge_color}` : `prop-badge`;
  let suffix = p.type === 'rent' ? ' <em>/ ay</em>' : '';
  
  container.innerHTML = `
    <div style="background:#fff; border-radius:12px; padding:30px; box-shadow:0 5px 20px rgba(0,0,0,0.05);">
      <div style="display:flex; justify-content:space-between; align-items:flex-start; margin-bottom:20px; flex-wrap:wrap; gap:20px;">
        <div>
          ${p.badge ? `<span class="${bClass}" style="position:static; margin-bottom:10px; display:inline-block;">${p.badge}</span>` : ''}
          <h1 style="font-size:28px; color:var(--navy); margin:0 0 10px;">${p.title}</h1>
          <p style="color:#666; font-size:16px; margin:0;"><i class="fa-solid fa-location-dot"></i> ${p.location}</p>
        </div>
        <div style="text-align:right;">
          <div class="prop-price" style="font-size:32px; font-weight:800; color:var(--red);" data-eur="${p.price_eur}" data-type="${p.type === 'rent' ? 'rent_month' : 'sale'}">€ ${p.price_eur.toLocaleString('de-DE')}${suffix}</div>
          <div style="color:#888; font-size:14px; margin-top:5px;">İlan Kodu: ${p.id}</div>
        </div>
      </div>
      
      <div style="margin-bottom:40px;">
        <div style="width:100%; height:550px; border-radius:12px; overflow:hidden; margin-bottom:15px; background:#0f172a; box-shadow:0 10px 25px rgba(0,0,0,0.1);">
            <img id="main-gallery-img" src="${mainImg}" style="width:100%; height:100%; object-fit:contain; cursor:pointer; transition:0.3s;" onclick="window.open(this.src, '_blank')" onmouseover="this.style.transform='scale(1.02)'" onmouseout="this.style.transform='scale(1)'"/>
        </div>
        <div style="display:flex; gap:12px; overflow-x:auto; padding-bottom:15px;" id="gallery-thumbs" class="custom-scrollbar">
            ${thumbsHTML}
        </div>
      </div>
      
      <div style="display:grid; grid-template-columns: repeat(4, 1fr); gap:15px; background:var(--off-white); padding:20px; border-radius:8px; margin-bottom:30px; text-align:center;">
        <div><i class="fa-solid fa-bed" style="font-size:24px; color:var(--red); margin-bottom:10px;"></i><br><strong>Oda:</strong> ${p.rooms}</div>
        <div><i class="fa-solid fa-bath" style="font-size:24px; color:var(--red); margin-bottom:10px;"></i><br><strong>Banyo:</strong> ${p.bathrooms || '-'}</div>
        <div><i class="fa-solid fa-maximize" style="font-size:24px; color:var(--red); margin-bottom:10px;"></i><br><strong>Net Alan:</strong> ${p.area_net}</div>
        <div><i class="fa-solid fa-chart-area" style="font-size:24px; color:var(--red); margin-bottom:10px;"></i><br><strong>Brüt/Arsa:</strong> ${p.area_gross || '-'}</div>
      </div>
      
      <h3 style="color:var(--navy); border-bottom:2px solid var(--red); padding-bottom:10px; display:inline-block;">İlan Açıklaması</h3>
      <p style="line-height:1.8; color:#444; margin-top:20px; font-size:16px;">${p.desc.replace(/\n/g, '<br>')}</p>
      
      
      <div style="margin-top:40px; padding:30px; background:var(--off-white); border-radius:12px; border:1px solid #e2e8f0;">
        <h3 style="color:var(--navy); margin-top:0; margin-bottom:20px;"><i class="fa-solid fa-calculator" style="color:var(--red);"></i> Mortgage / Kredi Hesaplama Aracı</h3>
        <div style="display:grid; grid-template-columns: 1fr 1fr; gap:20px; margin-bottom:20px;">
          <div>
            <label style="display:block; font-size:14px; font-weight:600; color:#475569; margin-bottom:8px;">Peşinat Tutarı (€)</label>
            <input type="number" id="mortgage-down" value="50000" style="width:100%; padding:12px; border-radius:8px; border:1px solid #cbd5e1; font-family:inherit; box-sizing:border-box;" />
          </div>
          <div>
            <label style="display:block; font-size:14px; font-weight:600; color:#475569; margin-bottom:8px;">Vade (Yıl)</label>
            <select id="mortgage-years" style="width:100%; padding:12px; border-radius:8px; border:1px solid #cbd5e1; font-family:inherit; box-sizing:border-box;">
              <option value="5">5 Yıl</option>
              <option value="10" selected>10 Yıl</option>
              <option value="15">15 Yıl</option>
              <option value="20">20 Yıl</option>
            </select>
          </div>
          <div>
            <label style="display:block; font-size:14px; font-weight:600; color:#475569; margin-bottom:8px;">Yıllık Faiz Oranı (%)</label>
            <input type="number" id="mortgage-rate" value="5.5" step="0.1" style="width:100%; padding:12px; border-radius:8px; border:1px solid #cbd5e1; font-family:inherit; box-sizing:border-box;" />
          </div>
          <div style="display:flex; align-items:flex-end;">
            <button onclick="calculateMortgage(${p.price_eur})" style="width:100%; padding:12px; border-radius:8px; border:none; background:var(--navy); color:#fff; font-weight:700; cursor:pointer;">HESAPLA</button>
          </div>
        </div>
        <div id="mortgage-result" style="display:none; background:#dbeafe; padding:20px; border-radius:8px; text-align:center; color:#1e40af; border:1px solid #bfdbfe;">
          <h4 style="margin:0 0 10px; font-size:16px;">Tahmini Aylık Ödeme</h4>
          <div style="font-size:32px; font-weight:800;" id="mortgage-monthly">€ 0</div>
          <p style="margin:10px 0 0; font-size:13px; color:#3b82f6;">Bu hesaplama yalnızca bilgilendirme amaçlıdır. Güncel oranlar için bankanızla görüşün.</p>
        </div>
      </div>

      <div style="margin-top:40px; padding:30px; background:var(--white); border-radius:12px; border:1px solid var(--border); box-shadow:var(--shadow);">
        <div style="display:flex; align-items:center; gap:20px; flex-wrap:wrap;">
          <div style="width:80px; height:80px; border-radius:50%; background:url('https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&w=200&q=80') center/cover; border:3px solid var(--navy);"></div>
          <div style="flex:1;">
            <h3 style="margin:0 0 5px; color:var(--navy);">Jasmine Group</h3>
            <p style="margin:0; color:var(--text-muted); font-size:14px;"><i class="fa-solid fa-star" style="color:gold;"></i> 4.9 (120 Değerlendirme) | Gayrimenkul Danışmanı</p>
          </div>
          <div style="display:flex; gap:10px;">
            <a href="https://wa.me/905330850769" target="_blank" style="background:#25D366; color:#fff; padding:10px 20px; border-radius:6px; font-weight:bold; text-decoration:none;"><i class="fa-brands fa-whatsapp"></i> Danışmana Yaz</a>
            <a href="tel:4446407" style="background:var(--navy); color:#fff; padding:10px 20px; border-radius:6px; font-weight:bold; text-decoration:none;"><i class="fa-solid fa-phone"></i> Hemen Ara</a>
            <a href="#" onclick="alert('PDF Broşür hazırlanıyor... Lütfen bekleyiniz.'); setTimeout(() => alert('PDF başarıyla indirildi!'), 2000); return false;" style="background:var(--red); color:#fff; padding:10px 20px; border-radius:6px; font-weight:bold; text-decoration:none;"><i class="fa-solid fa-file-pdf"></i> Broşür İndir</a>
          </div>
        </div>
      </div>
    </div>
  `;
  
  // Para birimi vs uygula
  changeCurrency(localStorage.getItem('jg_currency') || 'eur');
  
  // Re-run language translation for dynamic content if any
  const lang = localStorage.getItem('jg_lang') || 'tr';
  const dict = translations[lang] || translations.tr;
  document.querySelectorAll('[data-i18n]').forEach(el => {
    const key = el.getAttribute('data-i18n');
    if (dict[key]) {
      if(el.tagName === 'INPUT' && el.type === 'text') el.placeholder = dict[key];
      else el.innerHTML = dict[key];
    }
  });
}

// Add to DOMContentLoaded
document.addEventListener('DOMContentLoaded', () => {
  renderPropertyDetail();
});

// --- Advanced Filter Logic ---
window.currentSearchType = 'sale'; // default
function setSearchType(type) {
    window.currentSearchType = type;
    document.getElementById('tab-sale').classList.remove('active');
    document.getElementById('tab-rent').classList.remove('active');
    document.getElementById('tab-' + type).classList.add('active');
}


function applyFilters() {
    const sType = window.currentSearchType || 'sale';
    const sText = document.getElementById('main-search-input') ? document.getElementById('main-search-input').value : '';
    const loc = document.getElementById('filter-loc') ? document.getElementById('filter-loc').value : '';
    const type = document.getElementById('filter-type') ? document.getElementById('filter-type').value : '';
    const room = document.getElementById('filter-room') ? document.getElementById('filter-room').value : '';
    
    const pminEl = document.getElementById('filter-pmin');
    const pmaxEl = document.getElementById('filter-pmax');
    const pmin = (pminEl && pminEl.selectedIndex > 0 && pminEl.options[pminEl.selectedIndex].dataset.eur) ? pminEl.options[pminEl.selectedIndex].dataset.eur : '';
    const pmax = (pmaxEl && pmaxEl.selectedIndex > 0 && pmaxEl.options[pmaxEl.selectedIndex].dataset.eur) ? pmaxEl.options[pmaxEl.selectedIndex].dataset.eur : '';
    
    const target = sType === 'rent' ? 'rent.html' : 'buy.html';
    
    const params = new URLSearchParams();
    if(sText) params.append('q', sText);
    if(loc && !loc.includes('Nerede')) params.append('loc', loc);
    if(type && !type.includes('Emlak')) params.append('type', type);
    if(room && !room.includes('Oda')) params.append('room', room);
    if(pmin) params.append('min', pmin);
    if(pmax) params.append('max', pmax);
    
    window.location.href = target + '?' + params.toString();
}

function applySidebarFilters(props) {
    const loc = document.getElementById('sidebar-loc') ? document.getElementById('sidebar-loc').value : '';
    const type = document.getElementById('sidebar-type') ? document.getElementById('sidebar-type').value : '';
    const pminStr = document.getElementById('sidebar-pmin') ? document.getElementById('sidebar-pmin').value : '';
    const pmaxStr = document.getElementById('sidebar-pmax') ? document.getElementById('sidebar-pmax').value : '';
    
    const pmin = pminStr ? parseInt(pminStr) : 0;
    const pmax = pmaxStr ? parseInt(pmaxStr) : 999999999;
    
    const urlParams = new URLSearchParams(window.location.search);
    const q = urlParams.get('q') || '';
    const room = urlParams.get('room') || '';
    
    const filtered = props.filter(p => {
        const locLower = p.location.toLowerCase();
        const titleLower = p.title.toLowerCase();
        
        if (loc && loc !== 'Tümü' && !locLower.includes(loc.toLowerCase())) return false;
        
        if (type && type !== 'Tümü') {
            if (type === 'Daire' && !titleLower.includes('daire')) return false;
            if (type === 'Villa' && !titleLower.includes('villa')) return false;
        }
        
        if (p.price_eur < pmin || p.price_eur > pmax) return false;
        
        if (q && !titleLower.includes(q.toLowerCase()) && !locLower.includes(q.toLowerCase())) return false;
        
        if (room) {
            let rNum = room.charAt(0);
            if (p.rooms && !p.rooms.startsWith(rNum)) return false;
        }
        
        return true;
    });
    
    const sortSelect = document.querySelector('.sort-bar select');
    if (sortSelect) {
        const sortVal = sortSelect.value.toLowerCase();
        if (sortVal.includes('düşük') || sortVal.includes('artan') || sortVal.includes('lowest') || sortVal.includes('croissant') || sortVal.includes('laagste') || sortVal.includes('lägst') || sortVal.includes('дешевые')) {
            filtered.sort((a, b) => a.price_eur - b.price_eur);
        } else if (sortVal.includes('yüksek') || sortVal.includes('azalan') || sortVal.includes('highest') || sortVal.includes('décroissant') || sortVal.includes('hoogste') || sortVal.includes('högst') || sortVal.includes('дорогие')) {
            filtered.sort((a, b) => b.price_eur - a.price_eur);
        } else {
            // Newest first or Recommended
            filtered.sort((a, b) => parseInt(b.id.replace(/\D/g, '') || 0) - parseInt(a.id.replace(/\D/g, '') || 0));
        }
    }
    
    renderProperties(filtered);
}

// --- Blog Logic ---
async function fetchBlogs() {
    try {
        const res = await fetch('admin/blogs.json');
        const text = await res.text();
        const data = JSON.parse(text);
        return data.data || [];
    } catch (e) {
        console.error("Blog API error", e);
        return [];
    }
}

async function renderBlogList() {
    const container = document.getElementById('blog-container');
    if (!container) return;
    
    const blogs = await fetchBlogs();
    if(blogs.length === 0) {
        container.innerHTML = '<p>Blog yazısı bulunamadı.</p>';
        return;
    }
    
    let html = '';
    blogs.forEach(b => {
        html += `
        <div class="blog-card" style="background:#fff; border-radius:8px; overflow:hidden; box-shadow:0 2px 10px rgba(0,0,0,0.05); display:flex; flex-direction:column;">
            <img src="${b.image}" alt="${b.title || 'Jasmine Group Blog'}" style="width:100%; height:200px; object-fit:cover;">
            <div style="padding:20px; flex:1; display:flex; flex-direction:column;">
                <div style="color:var(--red); font-size:12px; font-weight:bold; margin-bottom:10px;">${b.date}</div>
                <h3 style="margin:0 0 10px; color:var(--navy); font-size:20px; line-height:1.3;">${b.title}</h3>
                <p style="color:#666; font-size:14px; margin-bottom:20px; flex:1;">${b.excerpt}</p>
                <a href="blog-detail.html?id=${b.id}" style="color:var(--primary); font-weight:bold; text-decoration:none;">Devamını Oku <i class="fa-solid fa-arrow-right"></i></a>
            </div>
        </div>
        `;
    });
    container.innerHTML = html;
}

async function renderBlogDetail() {
    const container = document.getElementById('blog-detail-container');
    if (!container) return;
    
    const urlParams = new URLSearchParams(window.location.search);
    const id = urlParams.get('id');
    if (!id) {
        container.innerHTML = '<h2 style="text-align:center;">Yazı Bulunamadı.</h2>';
        return;
    }
    
    const blogs = await fetchBlogs();
    const b = blogs.find(x => x.id === id);
    if (!b) {
        container.innerHTML = '<h2 style="text-align:center;">Yazı Bulunamadı veya Silinmiş.</h2>';
        return;
    }
    
    container.innerHTML = `
        <a href="blog.html" style="color:var(--navy); text-decoration:none; margin-bottom:20px; display:inline-block;"><i class="fa-solid fa-arrow-left"></i> Bloglara Dön</a>
        <div style="color:var(--red); font-weight:bold; margin-bottom:15px;">${b.date}</div>
        <h1 style="color:var(--navy); font-size:36px; margin-top:0; margin-bottom:25px; line-height:1.2;">${b.title}</h1>
        <img src="${b.image}" alt="${b.title || 'Jasmine Group Blog'}" style="width:100%; height:auto; max-height:450px; object-fit:cover; border-radius:8px; margin-bottom:30px;">
        <div style="font-size:17px; line-height:1.8; color:#333;">
            ${b.content}
        </div>
    `;
}

// Add to DOMContentLoaded
document.addEventListener('DOMContentLoaded', () => {
    renderBlogList();
    renderBlogDetail();
});

// --- Mega Menu Logic ---
function openMegaMenu() {
    document.getElementById('megaMenuOverlay').style.display = 'block';
    document.getElementById('megaMenuModal').style.display = 'block';
    
    // Set active states
    const curLang = localStorage.getItem('jg_lang') || 'tr';
    const curCurr = localStorage.getItem('jg_currency') || 'eur';
    
    document.querySelectorAll('.mega-lang').forEach(el => {
        el.classList.toggle('active', el.getAttribute('onclick').includes("'" + curLang + "'"));
    });
    document.querySelectorAll('.mega-curr').forEach(el => {
        el.classList.toggle('active', el.getAttribute('onclick').includes("'" + curCurr + "'"));
    });
}

function closeMegaMenu() {
    document.getElementById('megaMenuOverlay').style.display = 'none';
    document.getElementById('megaMenuModal').style.display = 'none';
}

function setLangMega(lang) {
    document.querySelectorAll('.mega-lang').forEach(el => el.classList.remove('active'));
    event.target.classList.add('active');
    changeLang(lang);
    updateMegaBtnText();
}

function setCurrMega(curr) {
    document.querySelectorAll('.mega-curr').forEach(el => el.classList.remove('active'));
    event.target.classList.add('active');
    changeCurrency(curr);
    updateMegaBtnText();
}

function setUnitMega(unit) {
    document.querySelectorAll('.mega-unit').forEach(el => el.classList.remove('active'));
    event.target.classList.add('active');
    // Unit logic can be implemented later (sqft vs m2)
}

function updateMegaBtnText() {
    const curLang = (localStorage.getItem('jg_lang') || 'tr').toUpperCase();
    const curCurr = (localStorage.getItem('jg_currency') || 'eur').toUpperCase();
    const btn = document.getElementById('megaMenuTrigger');
    if(btn) btn.innerHTML = `<i class="fa-solid fa-globe"></i> ${curLang} / ${curCurr} <i class="fa-solid fa-chevron-down"></i>`;
}

document.addEventListener('DOMContentLoaded', updateMegaBtnText);

// --- BLOG SYSTEM ---
const BLOG_POSTS = [
    {
        "id": "b1",
        "category": "YATIRIM",
        "title": "Alanya'da Gayrimenkul Yatırımı Yapmak İçin 5 Neden",
        "excerpt": "Alanya, Akdeniz bölgesinin en çok değer kazanan lokasyonlarından biri olmaya devam ediyor...",
        "content": "Alanya son yıllarda gayrimenkul yatırımcılarının gözdesi haline gelmiştir. Bunun en büyük nedenleri arasında sürekli gelişen altyapı, yabancı yatırımcı ilgisi, yüksek kira getirisi ve muazzam yaşam kalitesi bulunmaktadır. Özellikle Oba ve Mahmutlar bölgelerindeki yeni projeler yatırımcılarına döviz bazında yüksek karlar sağlamaktadır. Sahip olduğu turizm potansiyeli sayesinde Alanya'da alınan bir evin yılın her dönemi kiraya verilebilmesi, yatırımın geri dönüş süresini (ROI) oldukça kısaltmaktadır.",
        "date": "12 Ekim 2025",
        "image": "https://images.unsplash.com/photo-1560518883-ce09059eeffa?auto=format&fit=crop&w=800&q=80"
    },
    {
        "id": "b2",
        "category": "VATANDAŞLIK",
        "title": "Yatırım Yoluyla Türk Vatandaşlığı Alma Rehberi 2025",
        "excerpt": "Türkiye'de emlak alarak vatandaşlık edinme şartları ve güncel yatırım tutarları hakkında bilmeniz gereken her şey.",
        "content": "2024 yılı itibarıyla Türkiye'de 400.000 Amerikan Doları ve üzeri değerde gayrimenkul satın alan yabancılar, doğrudan Türk Vatandaşlığı başvurusunda bulunma hakkı kazanmaktadır. Süreç Tapu ve Kadastro Genel Müdürlüğü'nden alınan uygunluk belgesi ile başlar. Satın alınan mülkün 3 yıl boyunca satılamama şerhi tapuya işlenir. Tüm aile bireyleri (eş ve 18 yaş altı çocuklar) bu haktan faydalanabilir. Jasmine Group olarak uzman hukuk departmanımızla tüm başvuru sürecinizi A'dan Z'ye ücretsiz yönetiyoruz.",
        "date": "05 Ekim 2025",
        "image": "https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?auto=format&fit=crop&w=800&q=80"
    },
    {
        "id": "b3",
        "category": "KİRALAMA",
        "title": "Kısa Dönem Kiralama ile Yüksek Kira Getirisi Elde Etmek",
        "excerpt": "Turistik bölgelerde günlük ve haftalık kiralama sisteminin yatırımcılara sunduğu avantajlar.",
        "content": "Uzun dönem kiralamaya kıyasla kısa dönem kiralama (Airbnb, Booking vb.), özellikle sahil şeritlerinde 2 ila 3 kat daha fazla getiri sağlayabilmektedir. Antalya ve Alanya gibi bölgelerde yaz sezonu çok uzun olduğu için doluluk oranları yüksektir. Profesyonel yönetim firmaları (Jasmine Group gibi) temizlik, misafir karşılama ve fatura ödemelerini sizin yerinize takip ederek mülkünüzü pasif bir gelir makinesine dönüştürür. Yeni yasal düzenlemelerle birlikte Turizm Amaçlı Kiralama Belgesi alınması zorunludur ve ekibimiz bu işlemleri adınıza yapmaktadır.",
        "date": "28 Eylül 2025",
        "image": "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?auto=format&fit=crop&w=800&q=80"
    },
    {
        "id": "b4",
        "category": "BÖLGE REHBERİ",
        "title": "Antalya Konyaaltı vs Lara: Hangi Bölgeden Ev Alınmalı?",
        "excerpt": "Antalya'nın iki parlayan yıldızı Konyaaltı ve Lara bölgelerinin avantajlı karşılaştırması.",
        "content": "Konyaaltı muazzam sahili, dağ manzarası ve yeni Boğaçayı projesi ile doğayla iç içe lüks bir yaşam sunarken; Lara falezlerin üzerinde kurulu, iş dünyasına, büyük AVM'lere ve havalimanına daha yakın dinamik bir yaşam vadeder. Her iki bölge de yatırım açısından son derece güvenilirdir ancak yaşayış tarzınıza göre seçim yapmalısınız.",
        "date": "20 Eylül 2025",
        "image": "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?auto=format&fit=crop&w=800&q=80"
    },
    {
        "id": "b5",
        "category": "HUKUK",
        "title": "Yabancıların Türkiye'de Emlak Alımında Dikkat Etmesi Gerekenler",
        "excerpt": "Tapu devri, ekspertiz raporu ve yasal kısıtlamalar hakkında hukuki bir rehber.",
        "content": "Türkiye'de yabancı uyrukluların mülk edinimi mütekabiliyet esasına dayalı olarak serbest bırakılmıştır. Ancak askeri yasak bölgelerde alım yapılamaz ve ekspertiz raporu (Gayrimenkul Değerleme Raporu) alınması yasal bir zorunluluktur. Bu rapor, mülkün gerçek piyasa değerini belirler ve yabancı alıcıyı korur.",
        "date": "15 Eylül 2025",
        "image": "https://images.unsplash.com/photo-1589829085413-56de8ae18c73?auto=format&fit=crop&w=800&q=80"
    },
    {
        "id": "b6",
        "category": "PROJELER",
        "title": "Topraktan Ev Almak: Riskler ve Fırsatlar",
        "excerpt": "Henüz inşaat aşamasındayken konut projesine dahil olmanın kazançlı yönleri nelerdir?",
        "content": "Topraktan (Off-Plan) konut yatırımı, projeler tamamlandığında genelde %30-%50 arasında değer artışı sağlar. Fiyatların daha ulaşılabilir olması ve kişiye özel ödeme planları sunulması (taksit) en büyük avantajıdır. En kritik nokta güvenilir, referansları sağlam bir müteahhit firma ile çalışmaktır.",
        "date": "05 Eylül 2025",
        "image": "https://images.unsplash.com/photo-1503387762-592deb58ef4e?auto=format&fit=crop&w=800&q=80"
    },
    {
        "id": "b7",
        "category": "DEKORASYON",
        "title": "Yazlık Ev Dekorasyonunda 2024 Trendleri",
        "excerpt": "Akdeniz ruhunu evinize taşıyacak en yeni iç mimari dekorasyon fikirleri.",
        "content": "Bu yıl doğal malzemeler ön planda! Rattan mobilyalar, bambu detaylar, toprak tonları ve minimalizm yazlık evlerde huzuru getiriyor. Geniş terasların açık hava salonu gibi değerlendirildiği, bol yeşil bitkinin yer aldığı bohem stiller öne çıkıyor.",
        "date": "28 Ağustos 2025",
        "image": "https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&w=800&q=80"
    },
    {
        "id": "b8",
        "category": "YATIRIM",
        "title": "Kripto Para İle Türkiye'de Emlak Alınır Mı?",
        "excerpt": "Bitcoin, Ethereum ve USDT kullanarak gayrimenkul alma süreçleri hakkında bilmeniz gerekenler.",
        "content": "Teknik olarak doğrudan tapu dairesinde kripto ile işlem yapılamasa da, Jasmine Group olarak anlaşmalı olduğumuz yetkili aracı kurumlar üzerinden kripto paralarınızı saniyeler içinde nakde (Fiat) çeviriyor ve resmi tapu devir işleminizi tamamen yasal ve güvenli bir zeminde gerçekleştiriyoruz.",
        "date": "15 Ağustos 2025",
        "image": "https://images.unsplash.com/photo-1621416894569-0f39ed31d247?auto=format&fit=crop&w=800&q=80"
    },
    {
        "id": "b9",
        "category": "EKONOMİ",
        "title": "Faiz Oranlarının Gayrimenkul Piyasasına Etkisi",
        "excerpt": "Kredi faiz oranlarındaki değişimler ev fiyatlarını nasıl etkiliyor?",
        "content": "Faiz oranlarının yüksek olduğu dönemlerde ipotekli satışlar yavaşlarken nakit parası olan yatırımcı için pazarlık gücü maksimuma çıkar. Bu dönemler nakit yatırımı ile büyük indirimlerin alınabildiği tarihi fırsat zamanlarıdır. Faizler düştüğünde ise talep patlaması nedeniyle fiyatlar hızla yükselir.",
        "date": "02 Ağustos 2025",
        "image": "https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?auto=format&fit=crop&w=800&q=80"
    },
    {
        "id": "b10",
        "category": "YAŞAM",
        "title": "Emeklilik İçin Türkiye'ye Yerleşmek: Akdeniz Rüyası",
        "excerpt": "Yabancı emekliler için Türkiye'de yaşamanın avantajları, sağlık sistemi ve yaşam maliyetleri.",
        "content": "Ilıman iklimi, uygun yaşam maliyetleri, yüksek kaliteli ve uygun fiyatlı özel sağlık sistemi ile Antalya, Avrupa'lı emeklilerin yeni gözdesi. Türkiye'de bir emekli maaşıyla çok lüks ve kaliteli bir hayat standardı yakalamak mümkündür.",
        "date": "20 Temmuz 2025",
        "image": "https://images.unsplash.com/photo-1542314831-c6a4d1409392?auto=format&fit=crop&w=800&q=80"
    },
    {
        "id": "b11",
        "category": "BÖLGE REHBERİ",
        "title": "Kargıcak: Alanya'nın Lüks Villa Cenneti",
        "excerpt": "Dağların eteklerinde, panoramik deniz manzarasına sahip muazzam bir yaşam alanı: Kargıcak.",
        "content": "Alanya'nın doğusunda yer alan Kargıcak, özellikle lüks villaların ve premium komplekslerin bulunduğu bölgedir. Sessiz, sakin ve gürültüden uzak elit bir yaşam arayanlar için idealdir. Mahmutlar merkeze sadece birkaç dakika mesafededir.",
        "date": "10 Temmuz 2025",
        "image": "https://images.unsplash.com/photo-1600607686527-6fb886090705?auto=format&fit=crop&w=800&q=80"
    },
    {
        "id": "b12",
        "category": "MİMARİ",
        "title": "Akıllı Ev Sistemleri: Geleceğin Emlak Standardı",
        "excerpt": "Yeni projelerde standartlaşan akıllı ev altyapılarının sağladığı konfor ve enerji tasarrufu.",
        "content": "Artık dünyanın neresinde olursanız olun evinizin ışıklarını, panjurlarını, klimasını ve hatta su vanasını cep telefonunuzdan yönetebilirsiniz. Akıllı evler sadece konfor sağlamakla kalmıyor, gereksiz enerji tüketiminin de önüne geçiyor.",
        "date": "01 Temmuz 2025",
        "image": "https://images.unsplash.com/photo-1558002038-1055907df827?auto=format&fit=crop&w=800&q=80"
    },
    {
        "id": "b13",
        "category": "HUKUK",
        "title": "Emlak Vergisi ve Beyannameler Hakkında Bilinmesi Gerekenler",
        "excerpt": "Mülk sahiplerinin yıllık vergi yükümlülükleri ve değer artış kazancı vergisi.",
        "content": "Türkiye'de gayrimenkul alan her birey yıllık emlak vergisi ödemekle yükümlüdür (genellikle belediyelere ödenir ve rayiç bedel üzerinden hesaplanır). Ayrıca bir mülk alındıktan sonra ilk 5 yıl içinde satılırsa 'Değer Artış Kazancı Vergisi' gündeme gelmektedir.",
        "date": "15 Haziran 2025",
        "image": "https://images.unsplash.com/photo-1554224154-26032ffc0d07?auto=format&fit=crop&w=800&q=80"
    },
    {
        "id": "b14",
        "category": "TİCARİ",
        "title": "Ticari Gayrimenkul Yatırımı: Dükkan vs Ofis",
        "excerpt": "Ticari alan yatırımlarının avantajları, amortisman süreleri ve kira garantili dükkanlar.",
        "content": "Ticari mülklerin amortisman süresi (ROI) konutlara göre genellikle daha kısadır (12-15 yıl). Kurumsal kiracıların (bankalar, süpermarketler) bulunduğu dükkanlar en güvenli yatırım limanlarıdır. Ticari kiralamalarda enflasyon oranı baz alınarak yıllık yasal artışlar düzenli olarak yapılır.",
        "date": "01 Haziran 2025",
        "image": "https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=800&q=80"
    },
    {
        "id": "b15",
        "category": "YAŞAM",
        "title": "Türkiye'de Eğitim: Yabancı Öğrenciler İçin Uluslararası Okullar",
        "excerpt": "Çocuklu ailelerin Türkiye'ye yerleşirken en çok merak ettiği eğitim sistemi ve okul seçenekleri.",
        "content": "Antalya ve Alanya bölgesinde İngilizce, Rusça ve Almanca müfredat uygulayan tamamen uluslararası birçok seçkin kolej ve üniversite bulunmaktadır. Eğitim kalitesi Avrupa standartlarında olup ücretleri pek çok batı ülkesine kıyasla oldukça makuldür.",
        "date": "20 Mayıs 2025",
        "image": "https://images.unsplash.com/photo-1523050854058-8df90110c9f1?auto=format&fit=crop&w=800&q=80"
    }
,
    {
        "id": "b9",
        "category": "HUKUK",
        "title": "2025 Emlak Piyasasında Yeni Fırsatlar Bölüm 1",
        "excerpt": "Yeni yılda gayrimenkul sektörünü nelerin beklediğine dair en güncel detaylar ve tahminler...",
        "content": "Sürekli gelişen emlak sektörü 2025 yılında da yenilikçi fırsatlar sunmaya devam ediyor. Özellikle kıyı şeridindeki projeler yabancı yatırımcıların radarına girmeyi sürdürüyor. Teknoloji ile entegre akıllı evler artık bir standart haline geliyor. Jasmine Group olarak bu süreçte en doğru yatırımı yapmanız için profesyonel destek sağlıyoruz.",
        "date": "2 Şubat 2025",
        "image": "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=800&q=80"
    },
    {
        "id": "b10",
        "category": "BÖLGE REHBERİ",
        "title": "2025 Emlak Piyasasında Yeni Fırsatlar Bölüm 2",
        "excerpt": "Yeni yılda gayrimenkul sektörünü nelerin beklediğine dair en güncel detaylar ve tahminler...",
        "content": "Sürekli gelişen emlak sektörü 2025 yılında da yenilikçi fırsatlar sunmaya devam ediyor. Özellikle kıyı şeridindeki projeler yabancı yatırımcıların radarına girmeyi sürdürüyor. Teknoloji ile entegre akıllı evler artık bir standart haline geliyor. Jasmine Group olarak bu süreçte en doğru yatırımı yapmanız için profesyonel destek sağlıyoruz.",
        "date": "3 Şubat 2025",
        "image": "https://images.unsplash.com/photo-1580587771525-78b9dba3b914?auto=format&fit=crop&w=800&q=80"
    },
    {
        "id": "b11",
        "category": "KİRALAMA",
        "title": "2025 Emlak Piyasasında Yeni Fırsatlar Bölüm 3",
        "excerpt": "Yeni yılda gayrimenkul sektörünü nelerin beklediğine dair en güncel detaylar ve tahminler...",
        "content": "Sürekli gelişen emlak sektörü 2025 yılında da yenilikçi fırsatlar sunmaya devam ediyor. Özellikle kıyı şeridindeki projeler yabancı yatırımcıların radarına girmeyi sürdürüyor. Teknoloji ile entegre akıllı evler artık bir standart haline geliyor. Jasmine Group olarak bu süreçte en doğru yatırımı yapmanız için profesyonel destek sağlıyoruz.",
        "date": "4 Şubat 2025",
        "image": "https://images.unsplash.com/photo-1516156008625-3a9d6067fab5?auto=format&fit=crop&w=800&q=80"
    },
    {
        "id": "b12",
        "category": "PROJELER",
        "title": "2025 Emlak Piyasasında Yeni Fırsatlar Bölüm 4",
        "excerpt": "Yeni yılda gayrimenkul sektörünü nelerin beklediğine dair en güncel detaylar ve tahminler...",
        "content": "Sürekli gelişen emlak sektörü 2025 yılında da yenilikçi fırsatlar sunmaya devam ediyor. Özellikle kıyı şeridindeki projeler yabancı yatırımcıların radarına girmeyi sürdürüyor. Teknoloji ile entegre akıllı evler artık bir standart haline geliyor. Jasmine Group olarak bu süreçte en doğru yatırımı yapmanız için profesyonel destek sağlıyoruz.",
        "date": "5 Şubat 2025",
        "image": "https://images.unsplash.com/photo-1448630360428-65456885c650?auto=format&fit=crop&w=800&q=80"
    },
    {
        "id": "b13",
        "category": "DEKORASYON",
        "title": "2025 Emlak Piyasasında Yeni Fırsatlar Bölüm 5",
        "excerpt": "Yeni yılda gayrimenkul sektörünü nelerin beklediğine dair en güncel detaylar ve tahminler...",
        "content": "Sürekli gelişen emlak sektörü 2025 yılında da yenilikçi fırsatlar sunmaya devam ediyor. Özellikle kıyı şeridindeki projeler yabancı yatırımcıların radarına girmeyi sürdürüyor. Teknoloji ile entegre akıllı evler artık bir standart haline geliyor. Jasmine Group olarak bu süreçte en doğru yatırımı yapmanız için profesyonel destek sağlıyoruz.",
        "date": "6 Şubat 2025",
        "image": "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=800&q=80"
    },
    {
        "id": "b14",
        "category": "YATIRIM",
        "title": "2025 Emlak Piyasasında Yeni Fırsatlar Bölüm 6",
        "excerpt": "Yeni yılda gayrimenkul sektörünü nelerin beklediğine dair en güncel detaylar ve tahminler...",
        "content": "Sürekli gelişen emlak sektörü 2025 yılında da yenilikçi fırsatlar sunmaya devam ediyor. Özellikle kıyı şeridindeki projeler yabancı yatırımcıların radarına girmeyi sürdürüyor. Teknoloji ile entegre akıllı evler artık bir standart haline geliyor. Jasmine Group olarak bu süreçte en doğru yatırımı yapmanız için profesyonel destek sağlıyoruz.",
        "date": "7 Şubat 2025",
        "image": "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=800&q=80"
    },
    {
        "id": "b15",
        "category": "HUKUK",
        "title": "2025 Emlak Piyasasında Yeni Fırsatlar Bölüm 7",
        "excerpt": "Yeni yılda gayrimenkul sektörünü nelerin beklediğine dair en güncel detaylar ve tahminler...",
        "content": "Sürekli gelişen emlak sektörü 2025 yılında da yenilikçi fırsatlar sunmaya devam ediyor. Özellikle kıyı şeridindeki projeler yabancı yatırımcıların radarına girmeyi sürdürüyor. Teknoloji ile entegre akıllı evler artık bir standart haline geliyor. Jasmine Group olarak bu süreçte en doğru yatırımı yapmanız için profesyonel destek sağlıyoruz.",
        "date": "8 Şubat 2025",
        "image": "https://images.unsplash.com/photo-1580587771525-78b9dba3b914?auto=format&fit=crop&w=800&q=80"
    },
    {
        "id": "b16",
        "category": "BÖLGE REHBERİ",
        "title": "2025 Emlak Piyasasında Yeni Fırsatlar Bölüm 8",
        "excerpt": "Yeni yılda gayrimenkul sektörünü nelerin beklediğine dair en güncel detaylar ve tahminler...",
        "content": "Sürekli gelişen emlak sektörü 2025 yılında da yenilikçi fırsatlar sunmaya devam ediyor. Özellikle kıyı şeridindeki projeler yabancı yatırımcıların radarına girmeyi sürdürüyor. Teknoloji ile entegre akıllı evler artık bir standart haline geliyor. Jasmine Group olarak bu süreçte en doğru yatırımı yapmanız için profesyonel destek sağlıyoruz.",
        "date": "9 Şubat 2025",
        "image": "https://images.unsplash.com/photo-1516156008625-3a9d6067fab5?auto=format&fit=crop&w=800&q=80"
    },
    {
        "id": "b17",
        "category": "KİRALAMA",
        "title": "2025 Emlak Piyasasında Yeni Fırsatlar Bölüm 9",
        "excerpt": "Yeni yılda gayrimenkul sektörünü nelerin beklediğine dair en güncel detaylar ve tahminler...",
        "content": "Sürekli gelişen emlak sektörü 2025 yılında da yenilikçi fırsatlar sunmaya devam ediyor. Özellikle kıyı şeridindeki projeler yabancı yatırımcıların radarına girmeyi sürdürüyor. Teknoloji ile entegre akıllı evler artık bir standart haline geliyor. Jasmine Group olarak bu süreçte en doğru yatırımı yapmanız için profesyonel destek sağlıyoruz.",
        "date": "10 Şubat 2025",
        "image": "https://images.unsplash.com/photo-1448630360428-65456885c650?auto=format&fit=crop&w=800&q=80"
    },
    {
        "id": "b18",
        "category": "PROJELER",
        "title": "2025 Emlak Piyasasında Yeni Fırsatlar Bölüm 10",
        "excerpt": "Yeni yılda gayrimenkul sektörünü nelerin beklediğine dair en güncel detaylar ve tahminler...",
        "content": "Sürekli gelişen emlak sektörü 2025 yılında da yenilikçi fırsatlar sunmaya devam ediyor. Özellikle kıyı şeridindeki projeler yabancı yatırımcıların radarına girmeyi sürdürüyor. Teknoloji ile entegre akıllı evler artık bir standart haline geliyor. Jasmine Group olarak bu süreçte en doğru yatırımı yapmanız için profesyonel destek sağlıyoruz.",
        "date": "11 Şubat 2025",
        "image": "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=800&q=80"
    },
    {
        "id": "b19",
        "category": "DEKORASYON",
        "title": "2025 Emlak Piyasasında Yeni Fırsatlar Bölüm 11",
        "excerpt": "Yeni yılda gayrimenkul sektörünü nelerin beklediğine dair en güncel detaylar ve tahminler...",
        "content": "Sürekli gelişen emlak sektörü 2025 yılında da yenilikçi fırsatlar sunmaya devam ediyor. Özellikle kıyı şeridindeki projeler yabancı yatırımcıların radarına girmeyi sürdürüyor. Teknoloji ile entegre akıllı evler artık bir standart haline geliyor. Jasmine Group olarak bu süreçte en doğru yatırımı yapmanız için profesyonel destek sağlıyoruz.",
        "date": "12 Şubat 2025",
        "image": "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=800&q=80"
    },
    {
        "id": "b20",
        "category": "YATIRIM",
        "title": "2025 Emlak Piyasasında Yeni Fırsatlar Bölüm 12",
        "excerpt": "Yeni yılda gayrimenkul sektörünü nelerin beklediğine dair en güncel detaylar ve tahminler...",
        "content": "Sürekli gelişen emlak sektörü 2025 yılında da yenilikçi fırsatlar sunmaya devam ediyor. Özellikle kıyı şeridindeki projeler yabancı yatırımcıların radarına girmeyi sürdürüyor. Teknoloji ile entegre akıllı evler artık bir standart haline geliyor. Jasmine Group olarak bu süreçte en doğru yatırımı yapmanız için profesyonel destek sağlıyoruz.",
        "date": "13 Şubat 2025",
        "image": "https://images.unsplash.com/photo-1580587771525-78b9dba3b914?auto=format&fit=crop&w=800&q=80"
    },
    {
        "id": "b21",
        "category": "HUKUK",
        "title": "2025 Emlak Piyasasında Yeni Fırsatlar Bölüm 13",
        "excerpt": "Yeni yılda gayrimenkul sektörünü nelerin beklediğine dair en güncel detaylar ve tahminler...",
        "content": "Sürekli gelişen emlak sektörü 2025 yılında da yenilikçi fırsatlar sunmaya devam ediyor. Özellikle kıyı şeridindeki projeler yabancı yatırımcıların radarına girmeyi sürdürüyor. Teknoloji ile entegre akıllı evler artık bir standart haline geliyor. Jasmine Group olarak bu süreçte en doğru yatırımı yapmanız için profesyonel destek sağlıyoruz.",
        "date": "14 Şubat 2025",
        "image": "https://images.unsplash.com/photo-1516156008625-3a9d6067fab5?auto=format&fit=crop&w=800&q=80"
    },
    {
        "id": "b22",
        "category": "BÖLGE REHBERİ",
        "title": "2025 Emlak Piyasasında Yeni Fırsatlar Bölüm 14",
        "excerpt": "Yeni yılda gayrimenkul sektörünü nelerin beklediğine dair en güncel detaylar ve tahminler...",
        "content": "Sürekli gelişen emlak sektörü 2025 yılında da yenilikçi fırsatlar sunmaya devam ediyor. Özellikle kıyı şeridindeki projeler yabancı yatırımcıların radarına girmeyi sürdürüyor. Teknoloji ile entegre akıllı evler artık bir standart haline geliyor. Jasmine Group olarak bu süreçte en doğru yatırımı yapmanız için profesyonel destek sağlıyoruz.",
        "date": "15 Şubat 2025",
        "image": "https://images.unsplash.com/photo-1448630360428-65456885c650?auto=format&fit=crop&w=800&q=80"
    },
    {
        "id": "b23",
        "category": "KİRALAMA",
        "title": "2025 Emlak Piyasasında Yeni Fırsatlar Bölüm 15",
        "excerpt": "Yeni yılda gayrimenkul sektörünü nelerin beklediğine dair en güncel detaylar ve tahminler...",
        "content": "Sürekli gelişen emlak sektörü 2025 yılında da yenilikçi fırsatlar sunmaya devam ediyor. Özellikle kıyı şeridindeki projeler yabancı yatırımcıların radarına girmeyi sürdürüyor. Teknoloji ile entegre akıllı evler artık bir standart haline geliyor. Jasmine Group olarak bu süreçte en doğru yatırımı yapmanız için profesyonel destek sağlıyoruz.",
        "date": "16 Şubat 2025",
        "image": "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=800&q=80"
    }
];

function renderBlogs() {
    const list = document.getElementById('blog-list');
    if (!list) return;
    
    let html = '';
    BLOG_POSTS.forEach(b => {
        html += `
        <div class="blog-card" style="background:#fff; border-radius:12px; overflow:hidden; box-shadow:0 4px 15px rgba(0,0,0,0.05); transition:transform 0.3s;">
            <a href="blog-detail.html?id=${b.id}">
                <img src="${b.image}" alt="${b.title}" style="width:100%; height:220px; object-fit:cover; border-bottom:3px solid var(--red);" />
            </a>
            <div style="padding:20px;">
                <span style="background:var(--red-light); color:var(--red); padding:4px 10px; font-size:11px; font-weight:700; border-radius:4px;">${b.category}</span>
                <h3 style="margin:15px 0 10px; font-size:18px;"><a href="blog-detail.html?id=${b.id}" style="color:var(--navy); text-decoration:none;">${b.title}</a></h3>
                <p style="color:#666; font-size:14px; line-height:1.6; margin-bottom:15px;">${b.excerpt}</p>
                <div style="display:flex; justify-content:space-between; align-items:center; border-top:1px solid #eee; padding-top:15px;">
                    <span style="font-size:12px; color:#888;"><i class="fa-regular fa-calendar"></i> ${b.date}</span>
                    <a href="blog-detail.html?id=${b.id}" style="color:var(--navy); font-weight:600; font-size:13px; text-decoration:none;">Devamını Oku <i class="fa-solid fa-arrow-right"></i></a>
                </div>
            </div>
        </div>
        `;
    });
    list.innerHTML = html;
}

function renderBlogDetail() {
    const container = document.getElementById('blog-detail-container');
    if (!container) return;
    
    const urlParams = new URLSearchParams(window.location.search);
    const id = urlParams.get('id');
    const b = BLOG_POSTS.find(x => x.id === id);
    
    if (!b) {
        container.innerHTML = '<h2 style="text-align:center; padding:100px 0;">Blog Yazısı Bulunamadı.</h2>';
        return;
    }
    
    document.title = b.title + " | Jasmine Group";
    
    container.innerHTML = `
        <div style="max-width:800px; margin:0 auto; background:#fff; padding:40px; border-radius:12px; box-shadow:0 10px 40px rgba(0,0,0,0.05); transform:translateY(-80px); position:relative; z-index:5;">
            <div style="text-align:center; margin-bottom:30px;">
                <span style="background:var(--red-light); color:var(--red); padding:5px 15px; font-size:12px; font-weight:700; border-radius:20px;">${b.category}</span>
                <h1 style="font-size:32px; color:var(--navy); margin:20px 0;">${b.title}</h1>
                <div style="color:#888; font-size:14px;"><i class="fa-regular fa-calendar"></i> ${b.date}</div>
            </div>
            <img src="${b.image}" style="width:100%; border-radius:12px; margin-bottom:30px; max-height:400px; object-fit:cover;" />
            <div style="font-size:17px; line-height:1.9; color:#444; font-family:'Inter', sans-serif;">
                <p style="font-size:20px; font-weight:500; color:#222; margin-bottom:30px;">${b.excerpt}</p>
                <p>${b.content}</p>
            </div>
            <div style="margin-top:50px; padding-top:30px; border-top:1px solid #eee; text-align:center;">
                <a href="blog.html" style="background:var(--navy); color:#fff; padding:12px 25px; text-decoration:none; border-radius:6px; font-weight:600;"><i class="fa-solid fa-arrow-left"></i> Bloglara Dön</a>
            </div>
        </div>
    `;
}

document.addEventListener('DOMContentLoaded', () => {
    renderBlogs();
    renderBlogDetail();
});

// Global Floating WhatsApp Button
document.addEventListener('DOMContentLoaded', () => {
    const waBtn = document.createElement('a');
    waBtn.href = "https://wa.me/905330850769";
    waBtn.target = "_blank";
    waBtn.innerHTML = '<i class="fa-brands fa-whatsapp"></i>';
    Object.assign(waBtn.style, {
        position: 'fixed',
        bottom: '30px',
        right: '30px',
        backgroundColor: '#25D366',
        color: '#fff',
        width: '60px',
        height: '60px',
        borderRadius: '50%',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        fontSize: '35px',
        boxShadow: '0 4px 15px rgba(37, 211, 102, 0.4)',
        zIndex: '9999',
        textDecoration: 'none',
        transition: 'transform 0.3s'
    });
    waBtn.onmouseover = () => waBtn.style.transform = 'scale(1.1)';
    waBtn.onmouseout = () => waBtn.style.transform = 'scale(1)';
    document.body.appendChild(waBtn);
});


// Mortgage Calculator Logic
function calculateMortgage(price) {
    const downPayment = parseFloat(document.getElementById('mortgage-down').value) || 0;
    const years = parseInt(document.getElementById('mortgage-years').value) || 10;
    const rate = parseFloat(document.getElementById('mortgage-rate').value) || 5.5;
    
    const principal = price - downPayment;
    if (principal <= 0) {
        document.getElementById('mortgage-monthly').innerText = '€ 0';
    } else {
        const monthlyRate = rate / 100 / 12;
        const numberOfPayments = years * 12;
        
        let monthlyPayment;
        if (monthlyRate === 0) {
            monthlyPayment = principal / numberOfPayments;
        } else {
            monthlyPayment = principal * monthlyRate * Math.pow(1 + monthlyRate, numberOfPayments) / (Math.pow(1 + monthlyRate, numberOfPayments) - 1);
        }
        
        document.getElementById('mortgage-monthly').innerText = '€ ' + Math.round(monthlyPayment).toLocaleString('de-DE');
    }
    document.getElementById('mortgage-result').style.display = 'block';
}

// Newsletter Footer Injection
document.addEventListener('DOMContentLoaded', () => {
    const cols = document.querySelectorAll('.footer-col');
    cols.forEach(col => {
        const h4 = col.querySelector('h4');
        if (h4 && h4.innerText === 'Alanya Bölgeleri') {
            col.innerHTML = `
                <h4>Bülten Aboneliği</h4>
                <p style="color:#aaa; font-size:14px; margin-bottom:15px; line-height:1.6;">En yeni ilanlardan ve yatırım fırsatlarından anında haberdar olmak için e-posta bültenimize kayıt olun.</p>
                <form onsubmit="event.preventDefault(); alert('Aboneliğiniz başarıyla oluşturuldu! Teşekkür ederiz.'); this.reset();" style="display:flex; flex-direction:column; gap:10px;">
                    <input type="email" placeholder="E-posta Adresiniz" required style="padding:12px 15px; border-radius:6px; border:none; outline:none; font-family:inherit; font-size:14px; width:100%; box-sizing:border-box;">
                    <button type="submit" style="background:var(--red); color:#fff; border:none; padding:12px; border-radius:6px; font-weight:700; cursor:pointer; transition:0.2s;">ABONE OL</button>
                </form>
            `;
        }
    });
});

// Social Media Links Prevent Default (except WhatsApp)
document.addEventListener('DOMContentLoaded', () => {
    document.querySelectorAll('.footer-social a').forEach(a => {
        if(a.getAttribute('href') === '#') {
            a.addEventListener('click', (e) => {
                e.preventDefault();
                alert('Sosyal medya hesaplarımız çok yakında aktif olacaktır!');
            });
        }
    });
});

window.changeMainImage = function(el, src) {
    document.getElementById('main-gallery-img').src = src;
    document.querySelectorAll('.detail-thumb').forEach(t => {
        t.style.opacity = '0.6';
        t.style.borderColor = 'transparent';
    });
    el.style.opacity = '1';
    el.style.borderColor = 'var(--red)';
};


function populateLocations(props) {
  const selects = document.querySelectorAll('.filter-loc-select');
  if (selects.length === 0) return;
  
  // Extract unique neighborhoods
  const locations = new Set();
  props.forEach(p => {
    if (p.location) {
      const parts = p.location.split(' / ');
      let neighborhood = parts[parts.length - 1].replace(' Mh.', '').trim();
      locations.add(neighborhood);
    }
  });
  
  const sorted = Array.from(locations).sort();
  
  selects.forEach(sel => {
    // Keep only the first option (Nerede? or BÖLGE)
    const firstOpt = sel.options[0];
    sel.innerHTML = '';
    sel.appendChild(firstOpt);
    
    sorted.forEach(loc => {
      const opt = document.createElement('option');
      opt.value = loc;
      opt.textContent = loc;
      sel.appendChild(opt);
    });
  });
}

// --- WISHLIST & DARK MODE ---
let wishlist = JSON.parse(localStorage.getItem('jg_wishlist') || '[]');

function updateWishlistUI() {
  const counter = document.getElementById('wishlist-counter');
  if(counter) counter.innerText = wishlist.length;
  
  // Update heart colors
  document.querySelectorAll('.fa-heart').forEach(heart => {
    if(heart.id && heart.id.startsWith('heart-')) {
      const pid = heart.id.replace('heart-', '');
      if(wishlist.includes(pid)) {
        heart.style.color = 'var(--primary)';
        heart.parentElement.style.color = 'var(--primary)';
      } else {
        heart.style.color = 'inherit';
        heart.parentElement.style.color = 'var(--text-muted)';
      }
    }
  });
}

function toggleWishlist(id, e) {
  if (e) { e.preventDefault(); e.stopPropagation(); }
  
  if (wishlist.includes(id)) {
    wishlist = wishlist.filter(item => item !== id);
  } else {
    wishlist.push(id);
  }
  
  localStorage.setItem('jg_wishlist', JSON.stringify(wishlist));
  updateWishlistUI();
}

function openWishlist() {
  if (wishlist.length === 0) {
    alert('Favori listeniz boş.');
    return;
  }
  alert(wishlist.length + ' ilan favorilerinize eklendi. Seçilen İlan IDleri: ' + wishlist.join(', '));
}

function toggleDarkMode() {
  document.body.classList.toggle('dark-mode');
  const isDark = document.body.classList.contains('dark-mode');
  localStorage.setItem('jg_dark', isDark);
  const icon = document.querySelector('#darkModeToggle i');
  if(icon) {
    icon.className = isDark ? 'fa-solid fa-sun' : 'fa-solid fa-moon';
  }
}

// Call on load
document.addEventListener('DOMContentLoaded', () => {
  if(localStorage.getItem('jg_dark') === 'true') {
    document.body.classList.add('dark-mode');
    const icon = document.querySelector('#darkModeToggle i');
    if(icon) icon.className = 'fa-solid fa-sun';
  }
  setTimeout(updateWishlistUI, 500); // Give time for properties to render
});

// --- COMPARE LOGIC ---
let compareList = [];

function toggleCompare(id, isChecked) {
  if (isChecked) {
    if (compareList.length >= 3) {
      alert('En fazla 3 ilan karşılaştırabilirsiniz.');
      // uncheck the box
      event.target.checked = false;
      return;
    }
    if (!compareList.includes(id)) compareList.push(id);
  } else {
    compareList = compareList.filter(item => item !== id);
  }
  
  const floating = document.getElementById('compare-floating');
  const countSpan = document.getElementById('compare-count');
  if (floating && countSpan) {
    countSpan.innerText = compareList.length;
    if (compareList.length > 0) {
      floating.style.display = 'block';
    } else {
      floating.style.display = 'none';
      closeCompareModal();
    }
  }
}

async function openCompareModal() {
  const modal = document.getElementById('compareModal');
  const overlay = document.getElementById('compareModalOverlay');
  const content = document.getElementById('compare-content');
  if (!modal || !overlay || !content) return;
  
  const props = await fetchProperties();
  content.innerHTML = '';
  
  compareList.forEach(id => {
    const p = props.find(x => x.id === id);
    if (!p) return;
    
    let img = p.images.length > 0 ? p.images[0] : 'https://via.placeholder.com/400x300';
    let suffix = p.type === 'rent' ? ' / ay' : '';
    
    content.innerHTML += `
      <div style="background:var(--white); border:1px solid var(--border); border-radius:8px; padding:15px; position:relative;">
        <button onclick="toggleCompare('${id}', false); openCompareModal();" style="position:absolute; top:5px; right:5px; background:rgba(255,0,0,0.1); color:red; border:none; border-radius:50%; width:24px; height:24px; cursor:pointer;">&times;</button>
        <img src="${img}" style="width:100%; height:150px; object-fit:cover; border-radius:6px; margin-bottom:10px;">
        <h4 style="font-size:14px; margin:0 0 5px; color:var(--navy);">${p.title}</h4>
        <div style="color:var(--red); font-weight:bold; font-size:18px; margin-bottom:10px;">€ ${p.price_eur.toLocaleString('de-DE')}${suffix}</div>
        <ul style="list-style:none; padding:0; margin:0; font-size:13px; color:var(--text-muted);">
          <li style="padding:8px 0; border-bottom:1px solid var(--border);"><strong>Bölge:</strong> ${p.location}</li>
          <li style="padding:8px 0; border-bottom:1px solid var(--border);"><strong>Oda:</strong> ${p.rooms}</li>
          <li style="padding:8px 0; border-bottom:1px solid var(--border);"><strong>Alan:</strong> ${p.area_net}</li>
          <li style="padding:8px 0;"><strong>Durum:</strong> ${p.type === 'sale' ? 'Satılık' : 'Kiralık'}</li>
        </ul>
        <a href="property-detail.html?id=${id}" style="display:block; text-align:center; background:var(--navy); color:#fff; padding:8px; border-radius:6px; text-decoration:none; margin-top:15px; font-weight:bold; font-size:12px;">İlana Git</a>
      </div>
    `;
  });
  
  overlay.style.display = 'block';
  modal.style.display = 'block';
}

function closeCompareModal() {
  const modal = document.getElementById('compareModal');
  const overlay = document.getElementById('compareModalOverlay');
  if (modal) modal.style.display = 'none';
  if (overlay) overlay.style.display = 'none';
}
