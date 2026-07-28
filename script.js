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
    "about_title": "Alanya'da Gayrimenkul Danışmanlığı | Jasmine Group ®",
    "about_desc": "Jasmine Group, Alanya ve çevresinde ev veya yatırım arayan müşterilere portföy seçimi, gösterim ve işlem koordinasyonu sunar.",
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
    "footer_desc": "Alanya ve çevresinde portföy seçimi, gösterim ve gayrimenkul işlem koordinasyonu sunuyoruz.",
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
    "about_title": "Property Guidance in Alanya | Jasmine Group ®",
    "about_desc": "Jasmine Group provides property selection, viewing and transaction coordination for home buyers and investors in and around Alanya.",
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
    "footer_desc": "Property selection, viewing and real estate transaction coordination in and around Alanya.",
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
    "about_desc": "Jasmine Group помогает покупателям жилья и инвесторам с подбором объектов, просмотрами и координацией сделки в Алании и окрестностях.",
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
    "footer_desc": "Подбор объектов, просмотры и координация сделок с недвижимостью в Алании и окрестностях.",
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
    "about_desc": "Jasmine Group unterstützt Käufer und Investoren bei Objektauswahl, Besichtigungen und Transaktionskoordination in und um Alanya.",
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
    "footer_desc": "Immobilienauswahl, Besichtigungen und Transaktionskoordination in und um Alanya.",
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
    "about_desc": "تساعد مجموعة ياسمين مشتري المنازل والمستثمرين في اختيار العقارات والمعاينة وتنسيق المعاملات في ألانيا ومحيطها.",
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
    "footer_desc": "اختيار العقارات والمعاينة وتنسيق معاملات العقارات في ألانيا ومحيطها.",
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
    "about_desc": "Jasmine Group accompagne acheteurs et investisseurs dans la sélection, les visites et la coordination des transactions à Alanya et ses environs.",
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
    "footer_desc": "Sélection de biens, visites et coordination des transactions immobilières à Alanya et ses environs.",
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
    "about_desc": "Jasmine Group helpt woningkopers en investeerders met selectie, bezichtigingen en transactiecoördinatie in en rond Alanya.",
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
    "footer_desc": "Woningselectie, bezichtigingen en transactiecoördinatie in en rond Alanya.",
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
    "about_desc": "Jasmine Group hjälper bostadsköpare och investerare med urval, visningar och samordning av affären i och runt Alanya.",
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
    "footer_desc": "Fastighetsurval, visningar och samordning av affärer i och runt Alanya.",
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
  eur: { rate: 1, symbol: '€' }
};

function changeCurrency(curr) {
  if (!rates[curr]) curr = 'eur';
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

async function initLiveCurrencyRates() {
  const symbols = { EUR: '€', USD: '$', TRY: '₺', GBP: '£', CHF: 'CHF', SEK: 'kr', NOK: 'kr', CNY: '¥', CAD: 'C$' };
  try {
    const response = await fetch('/api/rates');
    if (!response.ok || !response.headers.get('content-type')?.includes('application/json')) throw new Error('Rates unavailable');
    const data = await response.json();
    Object.entries(data.rates || {}).forEach(([code, rate]) => {
      if (Number.isFinite(Number(rate)) && symbols[code]) {
        rates[code.toLowerCase()] = { rate: Number(rate), symbol: symbols[code] };
      }
    });
    document.querySelectorAll('.thb-dropbtn, #megaMenuTrigger').forEach(button => {
      button.title = `Döviz kaynağı: Avrupa Merkez Bankası · ${data.asOf || ''}`;
    });
  } catch {
    localStorage.setItem('jg_currency', 'eur');
  }

  const supported = new Set(Object.keys(rates));
  document.querySelectorAll('[onclick*="changeCurrency("], .mega-curr').forEach(link => {
    const match = link.getAttribute('onclick')?.match(/(?:changeCurrency|setCurrMega)\('([^']+)'\)/);
    if (match && !supported.has(match[1])) link.remove();
  });
  const selected = localStorage.getItem('jg_currency') || 'eur';
  changeCurrency(supported.has(selected) ? selected : 'eur');
  updateMegaBtnText();
}

function changeLang(lang) {
  if (lang === 'en') {
    const page = window.location.pathname.split('/').pop();
    const translatedPages = new Set([
      'buy.html', 'rent.html', 'property-detail.html', 'contact.html', 'services.html', 'regions.html',
      'buying-guide.html', 'corporate.html', 'team.html', 'customer-stories.html', 'blog.html',
      'privacy.html', 'kvkk.html', 'terms.html', 'cookie-policy.html',
    ]);
    const target = translatedPages.has(page) ? page : '';
    const preserveQuery = ['buy.html', 'rent.html', 'property-detail.html', 'contact.html'].includes(target);
    window.location.href = `/en/${target}${preserveQuery ? window.location.search : ''}`;
    return;
  }
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
  const hasPropertyList = document.getElementById('prop-list') || document.getElementById('sale-prop-list') || document.getElementById('rent-prop-list');
  if(hasPropertyList) {
    const props = await fetchProperties();
    window.currentAllListingProperties = props;
    hydrateListingControls();

    const btnApply = document.getElementById('btn-sidebar-apply');
    if (btnApply) btnApply.addEventListener('click', () => applySidebarFilters(props));
    const btnReset = document.getElementById('btn-sidebar-reset');
    if (btnReset) {
      btnReset.addEventListener('click', () => clearListingFilter('all'));
    }

    document.getElementById('sidebar-keyword')?.addEventListener('keydown', event => {
      if (event.key === 'Enter') applySidebarFilters(props);
    });
    const sortSelect = document.querySelector('.sort-bar select');
    if (sortSelect) sortSelect.addEventListener('change', () => (
      document.getElementById('sidebar-loc') ? applySidebarFilters(props) : renderProperties(props)
    ));
    document.getElementById('active-filter-chips')?.addEventListener('click', event => {
      const button = event.target.closest('[data-clear-filter]');
      if (button) clearListingFilter(button.dataset.clearFilter);
    });
    document.getElementById('save-search-button')?.addEventListener('click', event => {
      localStorage.setItem('jg_saved_search', JSON.stringify({ path: window.location.pathname, query: listingQuery(readListingFilters()).toString(), savedAt: new Date().toISOString() }));
      event.currentTarget.innerHTML = '<i class="fa-solid fa-bookmark"></i> Arama kaydedildi';
    });
    document.getElementById('share-search-button')?.addEventListener('click', async event => {
      const url = window.location.href;
      try {
        if (navigator.share) await navigator.share({ title: document.title, url });
        else await navigator.clipboard.writeText(url);
        event.currentTarget.innerHTML = '<i class="fa-solid fa-check"></i> Bağlantı hazır';
      } catch {
        event.currentTarget.innerHTML = '<i class="fa-solid fa-link"></i> Adres çubuğundan kopyalayın';
      }
    });

    if(document.getElementById('sidebar-loc')) applySidebarFilters(props, { skipHistory: true });
    else renderProperties(props);
  }
});

async function fetchProperties() {
  let props = [];
  try {
    const res = await fetch('/api/properties?limit=500');
    if (!res.ok) throw new Error('API unavailable');
    const data = await res.json();
    props = data.properties || [];
  } catch (e) {
    try {
      const fallback = await fetch('admin/data.json');
      if (!fallback.ok) throw new Error('Static data unavailable');
      props = (await fallback.json()).properties || [];
    } catch (fallbackError) {
      console.error('İlanlar yüklenemedi:', fallbackError);
      return [];
    }
  }

  const normalized = props.map(normalizeProperty);
  if (typeof populateLocations === 'function') populateLocations(normalized);
  return normalized;
}

async function hydrateRegionCounts() {
  const counters = [...document.querySelectorAll('[data-region-count]')];
  if (!counters.length) return;
  const properties = await fetchProperties();
  counters.forEach(counter => {
    const location = String(counter.dataset.regionCount || '').toLocaleLowerCase('tr-TR');
    const count = properties.filter(property => (
      (!property.status || property.status === 'published')
      && String(property.location || '').toLocaleLowerCase('tr-TR').includes(location)
    )).length;
    counter.textContent = String(count);
  });
}

function isTrustedPropertyImage(url) {
  const value = String(url || '').trim();
  if (!value) return false;
  const safeSegments = pathname => {
    try {
      return decodeURIComponent(pathname).split('/').every(segment => segment !== '.' && segment !== '..');
    } catch {
      return false;
    }
  };
  if (!/^https?:\/\//i.test(value)) {
    return /^images\/[a-z0-9._/-]+$/i.test(value) && safeSegments(value);
  }
  try {
    const parsed = new URL(value);
    const localImage = parsed.origin === window.location.origin && parsed.pathname.startsWith('/images/');
    const storageImage = /(?:^|\.)supabase\.co$/i.test(parsed.hostname)
      && parsed.pathname.includes('/storage/v1/object/public/');
    return (localImage || storageImage) && safeSegments(parsed.pathname);
  } catch {
    return false;
  }
}

const propertyCategoryLabels = {
  apartment: 'Daire',
  villa: 'Villa',
  land: 'Arsa',
  commercial: 'Ticari',
};

const marketStatusLabels = {
  new: 'Yeni yapı',
  resale: 'İkinci el',
  under_construction: 'İnşaat halinde',
};

function inferPropertyCategory(property) {
  if (propertyCategoryLabels[property.category]) return property.category;
  const source = String(property.title || '').toLocaleLowerCase('tr-TR');
  if (source.includes('villa')) return 'villa';
  if (source.includes('arsa')) return 'land';
  if (source.includes('ticari') || source.includes('dükkan') || source.includes('ofis')) return 'commercial';
  return 'apartment';
}

function metricNumber(value) {
  const match = String(value || '').replace(',', '.').match(/\d+(?:\.\d+)?/);
  return match ? Number(match[0]) : 0;
}

function normalizeProperty(property) {
  const trustedImages = Array.isArray(property.images) ? property.images.filter(isTrustedPropertyImage) : [];
  const id = String(property.id || '').replace(/[^\p{L}\p{N}._-]/gu, '').slice(0, 80);
  const price = Number(property.price_eur);
  const optionalNumber = value => {
    const number = Number(value);
    return value !== null && value !== '' && Number.isFinite(number) && number >= 0 ? number : null;
  };
  return {
    ...property,
    id,
    type: property.type === 'rent' ? 'rent' : 'sale',
    category: inferPropertyCategory(property),
    market_status: marketStatusLabels[property.market_status] ? property.market_status : '',
    price_eur: Number.isFinite(price) && price >= 0 ? price : 0,
    badge_color: ['red', 'blue', 'green'].includes(property.badge_color) ? property.badge_color : '',
    desc: property.description || property.desc || '',
    features: Array.isArray(property.features) ? property.features.map(item => String(item || '').trim()).filter(Boolean).slice(0, 80) : [],
    year_built: optionalNumber(property.year_built),
    distance_sea_m: optionalNumber(property.distance_sea_m),
    distance_airport_km: optionalNumber(property.distance_airport_km),
    status: property.status || 'published',
    media_pending: trustedImages.length === 0,
    verified_image_count: trustedImages.length,
    images: trustedImages.length ? trustedImages : ['images/property-placeholder.svg'],
  };
}

function renderProperties(props) {
  const isRentPage = window.location.pathname.includes('rent.html');
  const isBuyPage = window.location.pathname.includes('buy.html');
  const isIndexPage = !isRentPage && !isBuyPage && !window.location.pathname.includes('property-detail.html');
  const lists = isIndexPage
    ? [
        { element: document.getElementById('sale-prop-list'), type: 'sale' },
        { element: document.getElementById('rent-prop-list'), type: 'rent' }
      ]
    : [{ element: document.getElementById('prop-list'), type: null }];
  if (!lists.some(({ element }) => element)) return;
  
  let renderProps = [...props];
  if (!isIndexPage) window.currentListingProperties = props;
  
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
  
  lists.forEach(({ element: list, type: homeType }) => {
    if (!list) return;
    const allVisibleProperties = (homeType ? renderProps.filter(p => p.type === homeType) : renderProps)
      .filter(p => !isRentPage || p.type === 'rent')
      .filter(p => !isBuyPage || p.type === 'sale')
    const listingLimit = window.listingVisibleCount || 24;
    const visibleProperties = allVisibleProperties.slice(0, isIndexPage ? 4 : listingLimit);

    list.innerHTML = '';
    if (visibleProperties.length === 0 && isIndexPage) {
      list.innerHTML = `
        <article class="property-empty-state">
          <i class="fa-solid fa-key"></i>
          <div>
            <h3>Yeni kiralık portföyümüz hazırlanıyor.</h3>
            <p>Aradığınız evi bize anlatın; size uygun seçenekleri öncelikli olarak paylaşalım.</p>
          </div>
          <a href="contact.html">Kiralık talebi oluştur <i class="fa-solid fa-arrow-right"></i></a>
        </article>`;
      return;
    }
    if (visibleProperties.length === 0) {
      list.innerHTML = `
        <article class="listing-empty-state">
          <i class="fa-solid fa-magnifying-glass"></i>
          <h3>Aramanızla eşleşen ilan bulunamadı.</h3>
          <p>Filtreleri genişletebilir veya kriterlerinizi danışmanımıza iletebilirsiniz.</p>
          <a href="contact.html">Özel portföy talebi oluştur</a>
        </article>`;
    }
    const count = document.getElementById('listing-count');
    if (count) count.textContent = `${allVisibleProperties.length} portföy`;
    const loadMore = document.getElementById('load-more-properties');
    if (loadMore) {
      loadMore.hidden = visibleProperties.length >= allVisibleProperties.length;
      loadMore.textContent = `DAHA FAZLA PORTFÖY GÖSTER (${visibleProperties.length}/${allVisibleProperties.length})`;
    }
    visibleProperties.forEach(p => {
    const displayTitle = formatPropertyTitle(p.title);
    let imgsHTML = p.images.map(img => `<div class="swiper-slide"><img src="${escapeHTML(img)}" alt="${escapeHTML(displayTitle || 'Alanya Emlak')}" loading="lazy" /></div>`).join('');
    let bClass = p.badge_color ? `prop-badge ${p.badge_color}` : `prop-badge`;
    let badgeHTML = p.badge ? `<span class="${bClass}">${escapeHTML(p.badge)}</span>` : '';
    let suffix = p.type === 'rent' ? ' <em>/ ay</em>' : '';
    const quickMessage = encodeURIComponent(`Merhaba, ${p.id} kodlu portföy hakkında güncel bilgi almak istiyorum.`);
    const compareButton = document.getElementById('compare-floating')
      ? `<button class="compare-btn" data-compare-id="${escapeHTML(p.id)}" onclick="toggleCompare('${escapeHTML(p.id)}', this)" title="Karşılaştırmaya ekle" aria-label="Karşılaştırmaya ekle" aria-pressed="false"><i class="fa-solid fa-code-compare"></i></button>`
      : '';
    
    // desc truncate
    let desc = formatPropertyDescription(p.desc);
    if (desc.length > 120) desc = desc.substring(0, 120) + '...';
    
    let html = `
      <article class="property-item property-card-v2">
        <div class="prop-img-side property-card-media">
          <div class="swiper prop-swiper">
            <div class="swiper-wrapper">${imgsHTML}</div>
            <div class="swiper-button-next"></div>
            <div class="swiper-button-prev"></div>
          </div>
          ${badgeHTML}
          ${p.media_pending ? '<span class="media-pending-badge"><i class="fa-solid fa-camera"></i> Fotoğraf hazırlanıyor</span>' : ''}
          <div class="prop-code-strip"><span>${escapeHTML(p.id)}</span><span><i class="fa-solid fa-camera"></i> ${p.verified_image_count ?? p.images.length}</span></div>
        </div>
        <div class="prop-info-side property-card-content">
          <div class="property-card-eyebrow">${p.type === 'rent' ? 'KİRALIK' : 'SATILIK'} · ${escapeHTML(propertyCategoryLabels[p.category] || 'Gayrimenkul')} · ${escapeHTML(p.location.split('/').slice(-1)[0].trim())}</div>
          <a href="property-detail.html?id=${encodeURIComponent(p.id)}" class="prop-title">${escapeHTML(displayTitle)}</a>
          <div class="prop-location"><i class="fa-solid fa-location-dot"></i> ${escapeHTML(p.location)}</div>
          <div class="prop-rooms">
            <span><i class="fa-solid fa-bed"></i> ${escapeHTML(p.rooms || '-')}</span>
            <span><i class="fa-solid fa-bath"></i> ${escapeHTML(p.bathrooms || '-')}</span>
            <span><i class="fa-solid fa-maximize"></i> ${escapeHTML(formatArea(p.area_net))}</span>
          </div>
          <div class="prop-footer">
            <div><small>Fiyat</small><div class="prop-price" data-eur="${p.price_eur}" data-type="${p.type === 'rent' ? 'rent_month' : 'sale'}">€ ${p.price_eur.toLocaleString('de-DE')}${suffix}</div></div>
            <div class="prop-actions">
              ${compareButton}
              <button class="wishlist-btn" data-wishlist-id="${escapeHTML(p.id)}" onclick="toggleWishlist('${escapeHTML(p.id)}', this)" title="Favorilere ekle" aria-label="Favorilere ekle" aria-pressed="false"><i class="fa-regular fa-heart"></i></button>
              <a href="https://wa.me/905330850769?text=${quickMessage}" target="_blank" class="property-quick-contact" aria-label="${escapeHTML(p.id)} için WhatsApp ile bilgi alın"><i class="fa-brands fa-whatsapp"></i></a>
              <a href="property-detail.html?id=${encodeURIComponent(p.id)}" class="prop-btn primary">İNCELE <i class="fa-solid fa-arrow-right"></i></a>
            </div>
          </div>
          <p class="property-card-verification"><i class="fa-solid fa-circle-check"></i> Fiyat ve müsaitlik danışman teyidine tabidir.</p>
        </div>
      </article>
    `;
      list.innerHTML += html;
    });
  });
  
  document.querySelectorAll('.prop-swiper').forEach(el => {
    new Swiper(el, { loop: true, navigation: { nextEl: el.parentElement.querySelector('.swiper-button-next'), prevEl: el.parentElement.querySelector('.swiper-button-prev') } });
  });
  
  changeCurrency(localStorage.getItem('jg_currency') || 'eur');
  if(typeof updateWishlistUI === 'function') updateWishlistUI();
  if(typeof updateCompareUI === 'function') updateCompareUI();
}

function showMoreProperties() {
  window.listingVisibleCount = (window.listingVisibleCount || 24) + 24;
  renderProperties(window.currentListingProperties || []);
}

function escapeHTML(value) {
  return String(value ?? '').replace(/[&<>"']/g, character => ({
    '&': '&amp;',
    '<': '&lt;',
    '>': '&gt;',
    '"': '&quot;',
    "'": '&#039;'
  })[character]);
}

function formatArea(value) {
  const area = String(value || '').trim();
  if (!area) return '-';
  return /m(?:²|2)/i.test(area) ? area : `${area} m²`;
}

function formatPropertyTitle(value) {
  const title = String(value || '').trim().replace(/\s+/g, ' ');
  if (!title || title !== title.toLocaleUpperCase('tr-TR')) return title;
  const lower = title.toLocaleLowerCase('tr-TR');
  return lower.charAt(0).toLocaleUpperCase('tr-TR') + lower.slice(1);
}

function formatPropertyDescription(value) {
  return String(value || '').trim();
}

function setMetaContent(selector, content) {
  let element = document.querySelector(selector);
  if (!element) {
    element = document.createElement('meta');
    const attribute = selector.includes('property=') ? 'property' : 'name';
    const match = selector.match(/["']([^"']+)["']/);
    element.setAttribute(attribute, match ? match[1] : '');
    document.head.appendChild(element);
  }
  element.setAttribute('content', content);
}

function updatePropertySEO(property, mainImage) {
  const propertyTitle = formatPropertyTitle(property.title);
  const title = `${propertyTitle} | Jasmine Group`;
  const description = `${property.location} bölgesindeki ${property.rooms} ${property.type === 'rent' ? 'kiralık' : 'satılık'} gayrimenkulü inceleyin. Fiyat ve müsaitlik bilgisi danışman teyidine tabidir.`.slice(0, 160);
  const canonicalUrl = `https://jasmine-group.vercel.app/property-detail.html?id=${encodeURIComponent(property.id)}`;
  const canonical = document.querySelector('link[rel="canonical"]');

  document.title = title;
  setMetaContent('meta[name="description"]', description);
  setMetaContent('meta[property="og:title"]', title);
  setMetaContent('meta[property="og:description"]', description);
  setMetaContent('meta[property="og:type"]', 'website');
  setMetaContent('meta[property="og:url"]', canonicalUrl);
  setMetaContent('meta[property="og:image"]', mainImage);
  if (canonical) canonical.href = canonicalUrl;

  const previousSchema = document.getElementById('property-schema');
  if (previousSchema) previousSchema.remove();
  const additionalProperties = [
    ['Gayrimenkul tipi', propertyCategoryLabels[property.category]],
    ['Portföy durumu', marketStatusLabels[property.market_status]],
    ['Bulunduğu kat', property.floor],
    ['Yapım yılı', property.year_built],
    ['Isıtma', property.heating],
    ['Denize mesafe', property.distance_sea_m !== null ? `${property.distance_sea_m} m` : null],
    ['Havalimanına mesafe', property.distance_airport_km !== null ? `${property.distance_airport_km} km` : null],
  ].filter(([, value]) => value !== null && value !== undefined && value !== '')
    .map(([name, value]) => ({ '@type': 'PropertyValue', name, value }));
  const schema = document.createElement('script');
  schema.id = 'property-schema';
  schema.type = 'application/ld+json';
  schema.textContent = JSON.stringify({
    '@context': 'https://schema.org',
    '@type': 'RealEstateListing',
    name: propertyTitle,
    description: formatPropertyDescription(property.desc) || description,
    url: canonicalUrl,
    image: property.images || [],
    datePosted: property.created_at || undefined,
    offers: {
      '@type': 'Offer',
      price: property.price_eur,
      priceCurrency: 'EUR'
    },
    address: {
      '@type': 'PostalAddress',
      addressLocality: property.location,
      addressRegion: 'Antalya',
      addressCountry: 'TR'
    },
    floorSize: property.area_net ? {
      '@type': 'QuantitativeValue',
      value: Number.parseFloat(String(property.area_net).replace(',', '.')),
      unitCode: 'MTK'
    } : undefined,
    numberOfRooms: property.rooms || undefined,
    additionalProperty: additionalProperties.length ? additionalProperties : undefined
  });
  document.head.appendChild(schema);
}

function initLeadForms(root = document) {
  root.querySelectorAll('form[data-lead-form]').forEach(form => {
    if (form.dataset.leadReady === 'true') return;
    form.dataset.leadReady = 'true';

    form.addEventListener('submit', async event => {
      event.preventDefault();
      const status = form.querySelector('.form-status');
      const button = form.querySelector('button[type="submit"]');

      if (!form.checkValidity()) {
        form.reportValidity();
        if (status) {
          status.className = 'form-status is-error';
          status.textContent = 'Lütfen zorunlu alanları doldurun ve KVKK onayını işaretleyin.';
        }
        return;
      }

      const data = new FormData(form);
      const payload = Object.fromEntries(data.entries());
      payload.consent = data.get('consent') === 'on';
      payload.pageUrl = window.location.href;
      payload.locale = document.documentElement.lang || 'tr';
      const campaign = new URLSearchParams(window.location.search);
      payload.utmSource = campaign.get('utm_source') || '';
      payload.utmMedium = campaign.get('utm_medium') || '';
      payload.utmCampaign = campaign.get('utm_campaign') || '';
      if (button) {
        button.disabled = true;
        button.dataset.originalText = button.textContent;
        button.textContent = 'GÖNDERİLİYOR...';
      }
      if (status) {
        status.className = 'form-status';
        status.textContent = 'Talebiniz güvenli şekilde iletiliyor.';
      }

      try {
        const response = await fetch('/api/leads', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(payload)
        });
        const result = await response.json().catch(() => ({}));
        if (!response.ok) throw new Error(result.error || 'Talep iletilemedi.');

        form.reset();
        if (status) {
          status.className = 'form-status is-success';
          status.textContent = result.message || 'Talebiniz alındı. En kısa sürede sizinle iletişime geçeceğiz.';
        }
        trackEvent('generate_lead', { source: payload.source || 'website', property_id: payload.propertyId || '' });
      } catch (error) {
        if (status) {
          status.className = 'form-status is-error';
          status.textContent = `${error.message} WhatsApp: 0533 085 0769`;
        }
      } finally {
        if (button) {
          button.disabled = false;
          button.textContent = button.dataset.originalText || 'GÖNDER';
        }
      }
    });
  });
}

function initLegalFooter() {
  document.querySelectorAll('.footer-bottom .container').forEach(container => {
    if (container.querySelector('.footer-legal-links')) return;
    const links = document.createElement('span');
    links.className = 'footer-legal-links';
    links.innerHTML = '<a href="privacy.html">Gizlilik</a><a href="kvkk.html">KVKK</a><a href="terms.html">Kullanım Koşulları</a><a href="cookie-policy.html">Çerezler</a>';
    container.appendChild(links);
  });
}

function initGlobalNavigation() {
  const supportedLanguages = new Set(['tr', 'en']);
  document.querySelectorAll('[onclick*="changeLang("], .mega-lang').forEach(link => {
    const match = link.getAttribute('onclick')?.match(/(?:changeLang|setLangMega)\('([^']+)'\)/);
    if (match && !supportedLanguages.has(match[1])) link.remove();
  });

  document.querySelectorAll('.main-nav').forEach(nav => {
    if (nav.querySelector('a[href="services.html"]')) return;
    const services = document.createElement('a');
    services.href = 'services.html';
    services.textContent = 'HİZMETLER';
    const rentLink = nav.querySelector('a[href="rent.html"]');
    if (rentLink) rentLink.insertAdjacentElement('afterend', services);
    else nav.appendChild(services);
  });

  document.querySelectorAll('.msm-nav').forEach(nav => {
    [['services.html', 'Hizmetler'], ['regions.html', 'Bölgeler']].forEach(([href, label]) => {
      if (nav.querySelector(`a[href="${href}"]`)) return;
      const link = document.createElement('a');
      link.href = href;
      link.textContent = label;
      nav.appendChild(link);
    });
  });

  document.querySelectorAll('.footer-grid .footer-col:nth-child(2) ul').forEach(list => {
    [['services.html', 'Hizmetler'], ['regions.html', 'Bölge Rehberi'], ['team.html', 'Ekibimiz'], ['customer-stories.html', 'Müşteri Deneyimi']].forEach(([href, label]) => {
      if (list.querySelector(`a[href="${href}"]`)) return;
      const item = document.createElement('li');
      item.innerHTML = `<a href="${href}"><i class="fa-solid fa-chevron-right"></i> ${label}</a>`;
      list.appendChild(item);
    });
  });

  document.querySelectorAll('.footer-social a[href="#"]').forEach(link => link.remove());
  document.querySelectorAll('.mega-unit').forEach(link => {
    const section = link.parentElement?.parentElement;
    if (section?.querySelector('h4')?.textContent.includes('MEASUREMENT UNIT')) section.remove();
  });
  document.querySelectorAll('.footer-bottom').forEach(footer => {
    footer.innerHTML = footer.innerHTML.replace(/©\s*20\d{2}/, `© ${new Date().getFullYear()}`);
  });
}

function analyticsSessionId() {
  let sessionId = sessionStorage.getItem('jg_analytics_session');
  if (sessionId) return sessionId;
  if (window.crypto?.randomUUID) sessionId = window.crypto.randomUUID();
  else {
    const bytes = new Uint8Array(16);
    window.crypto.getRandomValues(bytes);
    sessionId = Array.from(bytes, value => value.toString(16).padStart(2, '0')).join('');
  }
  sessionStorage.setItem('jg_analytics_session', sessionId);
  return sessionId;
}

function analyticsAttribution() {
  const params = new URLSearchParams(window.location.search);
  const current = {
    utmSource: params.get('utm_source') || '',
    utmMedium: params.get('utm_medium') || '',
    utmCampaign: params.get('utm_campaign') || '',
    referrerHost: '',
  };
  if (current.utmSource || current.utmMedium || current.utmCampaign) {
    sessionStorage.setItem('jg_analytics_attribution', JSON.stringify(current));
    return current;
  }
  try {
    const storedAttribution = sessionStorage.getItem('jg_analytics_attribution');
    if (storedAttribution) return JSON.parse(storedAttribution);
  } catch {
    // Invalid session data is replaced with a fresh attribution record.
  }
  try {
    const referrer = document.referrer ? new URL(document.referrer) : null;
    current.referrerHost = referrer && referrer.hostname !== window.location.hostname ? referrer.hostname : '';
  } catch {
    current.referrerHost = '';
  }
  sessionStorage.setItem('jg_analytics_attribution', JSON.stringify(current));
  return current;
}

function recordFirstPartyEvent(name, parameters = {}) {
  const attribution = analyticsAttribution();
  const width = window.innerWidth;
  const device = width < 768 ? 'mobile' : (width < 1100 ? 'tablet' : 'desktop');
  fetch('/api/events', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    keepalive: true,
    body: JSON.stringify({
      consent: true,
      eventName: name,
      sessionId: analyticsSessionId(),
      propertyId: parameters.property_id || '',
      pathname: window.location.pathname,
      locale: document.documentElement.lang === 'en' ? 'en' : 'tr',
      eventSource: parameters.source || '',
      utmSource: attribution.utmSource || '',
      utmMedium: attribution.utmMedium || '',
      utmCampaign: attribution.utmCampaign || '',
      referrerHost: attribution.referrerHost || '',
      device,
    }),
  }).catch(() => {});
}

function trackEvent(name, parameters = {}) {
  if (localStorage.getItem('jg_cookie_consent') !== 'accepted') return false;
  recordFirstPartyEvent(name, parameters);
  if (typeof window.gtag === 'function') window.gtag('event', name, parameters);
  if (typeof window.fbq === 'function') window.fbq('trackCustom', name, parameters);
  window.dataLayer = window.dataLayer || [];
  window.dataLayer.push({ event: name, ...parameters });
  return true;
}

function trackCurrentPropertyView() {
  if (!window.__jasminePropertyContext || window.__jasminePropertyViewTracked) return;
  if (trackEvent('view_property', window.__jasminePropertyContext)) {
    window.__jasminePropertyViewTracked = true;
  }
}

function loadApprovedAnalytics() {
  if (window.__jasmineAnalyticsLoaded) return;
  const config = window.JASMINE_ANALYTICS || {};
  window.__jasmineAnalyticsLoaded = true;

  if (config.gtmId) {
    window.dataLayer = window.dataLayer || [];
    window.dataLayer.push({ 'gtm.start': Date.now(), event: 'gtm.js' });
    const gtm = document.createElement('script');
    gtm.async = true;
    gtm.src = `https://www.googletagmanager.com/gtm.js?id=${encodeURIComponent(config.gtmId)}`;
    document.head.appendChild(gtm);
  } else if (config.ga4Id) {
    const ga = document.createElement('script');
    ga.async = true;
    ga.src = `https://www.googletagmanager.com/gtag/js?id=${encodeURIComponent(config.ga4Id)}`;
    document.head.appendChild(ga);
    window.dataLayer = window.dataLayer || [];
    window.gtag = function gtag() { window.dataLayer.push(arguments); };
    window.gtag('js', new Date());
    window.gtag('config', config.ga4Id, { anonymize_ip: true });
  }

  if (config.metaPixelId) {
    window.fbq = window.fbq || function fbq() { (window.fbq.queue = window.fbq.queue || []).push(arguments); };
    const pixel = document.createElement('script');
    pixel.async = true;
    pixel.src = 'https://connect.facebook.net/en_US/fbevents.js';
    document.head.appendChild(pixel);
    window.fbq('init', config.metaPixelId);
    window.fbq('track', 'PageView');
  }
  trackCurrentPropertyView();
}

function initCookieConsent() {
  const consent = localStorage.getItem('jg_cookie_consent');
  if (consent === 'accepted') {
    loadApprovedAnalytics();
    return;
  }
  if (consent === 'rejected' || document.querySelector('.cookie-consent')) return;

  const banner = document.createElement('section');
  banner.className = 'cookie-consent';
  banner.setAttribute('aria-label', 'Çerez tercihi');
  banner.innerHTML = `
    <div><strong>Gizliliğiniz sizin kontrolünüzde.</strong><p>Zorunlu tercihler dışında analiz ve reklam teknolojilerini yalnızca onayınızla çalıştırırız. <a href="cookie-policy.html">Çerez politikasını inceleyin.</a></p></div>
    <div class="cookie-actions"><button type="button" data-cookie="reject">Reddet</button><button type="button" data-cookie="accept">Kabul et</button></div>`;
  document.body.appendChild(banner);
  banner.querySelectorAll('[data-cookie]').forEach(button => button.addEventListener('click', () => {
    const accepted = button.dataset.cookie === 'accept';
    localStorage.setItem('jg_cookie_consent', accepted ? 'accepted' : 'rejected');
    banner.remove();
    if (accepted) loadApprovedAnalytics();
  }));
}

function loadAnalyticsConfiguration() {
  const script = document.createElement('script');
  script.src = 'analytics-config.js';
  script.onload = initCookieConsent;
  script.onerror = initCookieConsent;
  document.head.appendChild(script);
}

function initGlobalStructuredData() {
  if (document.getElementById('organization-schema')) return;
  const schema = document.createElement('script');
  schema.id = 'organization-schema';
  schema.type = 'application/ld+json';
  schema.textContent = JSON.stringify({
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'RealEstateAgent',
        '@id': 'https://jasmine-group.vercel.app/#organization',
        name: 'Jasmine Group',
        url: 'https://jasmine-group.vercel.app/',
        logo: 'https://jasmine-group.vercel.app/images/logo.jpg',
        image: 'https://jasmine-group.vercel.app/images/jasmine_office.jpg',
        telephone: '+90 533 085 0769',
        email: 'jasminegroupemlak@gmail.com',
        address: {
          '@type': 'PostalAddress',
          streetAddress: 'Oba Mah. Mesut Cad. 13. Sok. Best Home Comfort 7, A Blok No: 40/18-19',
          addressLocality: 'Alanya',
          addressRegion: 'Antalya',
          postalCode: '07400',
          addressCountry: 'TR'
        },
        areaServed: ['Alanya', 'Antalya']
      },
      {
        '@type': 'WebSite',
        '@id': 'https://jasmine-group.vercel.app/#website',
        url: 'https://jasmine-group.vercel.app/',
        name: 'Jasmine Group',
        publisher: { '@id': 'https://jasmine-group.vercel.app/#organization' },
        potentialAction: {
          '@type': 'SearchAction',
          target: 'https://jasmine-group.vercel.app/buy.html?q={search_term_string}',
          'query-input': 'required name=search_term_string'
        }
      }
    ]
  });
  document.head.appendChild(schema);
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
  
  let mainImg = p.images.length > 0 ? p.images[0] : 'images/property-placeholder.svg';
  updatePropertySEO(p, mainImg);
  const safeId = escapeHTML(p.id);
  const safeTitle = escapeHTML(formatPropertyTitle(p.title));
  const safeLocation = escapeHTML(p.location);
  const safeRooms = escapeHTML(p.rooms);
  const descriptionText = formatPropertyDescription(p.desc) || 'Bu ilan hakkında ayrıntılı bilgi almak için danışmanımıza ulaşın.';
  const safeDescription = escapeHTML(descriptionText).replace(/\n/g, '<br>');
  let thumbsHTML = p.images.map((img, i) => `
    <img src="${escapeHTML(img)}" alt="${safeTitle} görseli ${i + 1}" class="detail-thumb ${i===0?'active':''}" onclick="changeMainImage(this, '${escapeHTML(img)}')">
  `).join('');
  if(p.images.length === 0) thumbsHTML = '';
  
  let bClass = p.badge_color ? `prop-badge ${p.badge_color}` : `prop-badge`;
  let typeLabel = p.type === 'rent' ? 'Kiralık' : 'Satılık';
  let suffix = p.type === 'rent' ? ' <em>/ ay</em>' : '';
  const furnishedLabels = { furnished: 'Eşyalı', unfurnished: 'Eşyasız', optional: 'Opsiyonel' };
  const specificationRows = [
    ['İlan No', safeId],
    ['Durumu', typeLabel],
    ['Gayrimenkul tipi', propertyCategoryLabels[p.category] || 'Gayrimenkul'],
    ['Portföy durumu', marketStatusLabels[p.market_status] || null],
    ['Oda Sayısı', safeRooms || '-'],
    ['Banyo', p.bathrooms || '-'],
    ['Brüt / Arsa Alanı', formatArea(p.area_gross)],
    ['Net Alan', formatArea(p.area_net)],
    ['Bulunduğu kat', p.floor],
    ['Yapım yılı', p.year_built],
    ['Eşya durumu', furnishedLabels[p.furnished_status]],
    ['Isıtma', p.heating],
  ].filter(([, value]) => value !== null && value !== undefined && value !== '');
  const specificationsHTML = specificationRows.map(([label, value]) => `<div class="spec-item"><span class="spec-label">${escapeHTML(label)}</span><span class="spec-value">${escapeHTML(value)}</span></div>`).join('');
  const distanceFacts = [
    p.distance_sea_m !== null ? ['fa-water', 'Denize mesafe', `${Number(p.distance_sea_m).toLocaleString('tr-TR')} m`] : null,
    p.distance_airport_km !== null ? ['fa-plane-departure', 'Havalimanına mesafe', `${Number(p.distance_airport_km).toLocaleString('tr-TR')} km`] : null,
  ].filter(Boolean);
  const featuresHTML = p.features.length
    ? `<div class="detail-feature-box"><div class="detail-specs-title"><i class="fa-solid fa-star"></i> Portföy Özellikleri</div><div class="detail-feature-grid">${p.features.map(feature => `<span><i class="fa-solid fa-check"></i>${escapeHTML(feature)}</span>`).join('')}</div></div>`
    : '';
  const distancesHTML = distanceFacts.length
    ? `<div class="detail-distance-box"><div class="detail-specs-title"><i class="fa-solid fa-location-crosshairs"></i> Konum Mesafeleri</div><div class="detail-distance-grid">${distanceFacts.map(([icon, label, value]) => `<div><i class="fa-solid ${icon}"></i><span>${escapeHTML(label)}</span><strong>${escapeHTML(value)}</strong></div>`).join('')}</div><p>Mesafeler portföy kaydından alınır ve rota/gösterim öncesinde danışman tarafından teyit edilir.</p></div>`
    : '';
  
  const currentDistrict = String(p.location || '').split('/').slice(-1)[0].trim().toLocaleLowerCase('tr-TR');
  const similar = props
    .filter(property => property.id !== p.id && property.type === p.type)
    .map(property => {
      const district = String(property.location || '').split('/').slice(-1)[0].trim().toLocaleLowerCase('tr-TR');
      const priceDifference = Math.abs(property.price_eur - p.price_eur) / Math.max(p.price_eur, 1);
      const score = (district === currentDistrict ? 8 : 0)
        + (property.category === p.category ? 5 : 0)
        + (property.rooms === p.rooms ? 3 : 0)
        + Math.max(0, 3 - (priceDifference * 3));
      return { property, score };
    })
    .sort((left, right) => right.score - left.score)
    .slice(0, 4)
    .map(item => item.property);
  let simHTML = '';
  if (similar.length > 0) {
    simHTML = `<div style="margin-top:50px;"><h2 class="detail-similar-title">Benzer İlanlar</h2><div style="display:grid; grid-template-columns:repeat(auto-fill, minmax(260px, 1fr)); gap:20px;">`;
    similar.forEach(sp => {
      const spImg = sp.images && sp.images.length > 0 ? sp.images[0] : '';
      const spSuffix = sp.type === 'rent' ? ' / ay' : '';
      simHTML += `
        <a href="property-detail.html?id=${encodeURIComponent(sp.id)}" class="similar-property-card">
          <img src="${escapeHTML(spImg)}" alt="${escapeHTML(formatPropertyTitle(sp.title))}" loading="lazy" />
          <div style="padding:15px;">
            <h4>${escapeHTML(formatPropertyTitle(sp.title))}</h4>
            <p><i class="fa-solid fa-location-dot"></i> ${escapeHTML(sp.location)}</p>
            <div style="color:var(--red); font-weight:800; font-size:16px;">€ ${sp.price_eur.toLocaleString('de-DE')}${spSuffix}</div>
          </div>
        </a>`;
    });
    simHTML += `</div></div>`;
  }

  container.innerHTML = `
    <!-- BREADCRUMB -->
    <div class="breadcrumb">
      <a href="index.html">Ana Sayfa</a>
      <span class="separator"><i class="fa-solid fa-chevron-right"></i></span>
      <a href="buy.html">Emlak</a>
      <span class="separator"><i class="fa-solid fa-chevron-right"></i></span>
      <a href="buy.html">Alanya</a>
      <span class="separator"><i class="fa-solid fa-chevron-right"></i></span>
      <span style="color:var(--navy);">${safeTitle}</span>
    </div>

    <div class="detail-page-wrapper">
      <!-- LEFT COLUMN -->
      <div class="detail-left-col">
        
        <h1 class="detail-main-title">${safeTitle}</h1>
        <div class="detail-location-subtitle">
          <i class="fa-solid fa-location-dot"></i> ${safeLocation}
          ${p.badge ? `<span class="${bClass}" style="margin-left:15px; font-size:11px; padding:2px 8px; position:static;">${escapeHTML(p.badge)}</span>` : ''}
        </div>

        <!-- GALLERY -->
        <div class="detail-gallery-container">
          <div class="detail-badge-overlay">${typeLabel}</div>
          <div class="detail-fav-overlay" onclick="toggleWishlist('${safeId}', event)"><i class="fa-regular fa-heart"></i></div>
          ${p.media_pending ? '<div class="detail-media-notice"><i class="fa-solid fa-camera"></i> Doğrulanmış mülk fotoğrafları hazırlanıyor</div>' : ''}
          
          <div class="detail-main-img-box">
             <img id="main-gallery-img" src="${escapeHTML(mainImg)}" alt="${safeTitle}" onclick="openLightbox(${JSON.stringify(p.images).replace(/"/g, '&quot;')}, 0)" />
          </div>
          <div class="detail-thumbs-scroll custom-scrollbar" id="gallery-thumbs">
            ${thumbsHTML}
          </div>
        </div>

        <!-- SPECS TABLE -->
        <div class="detail-specs-box">
          <div class="detail-specs-title"><i class="fa-solid fa-list" style="color:var(--red); margin-right:8px;"></i> İlan Özellikleri</div>
          <div class="detail-specs-grid">
            ${specificationsHTML}
          </div>
        </div>

        <!-- DESCRIPTION -->
        <div class="detail-desc-box">
          <div class="detail-specs-title"><i class="fa-solid fa-align-left" style="color:var(--red); margin-right:8px;"></i> İlan Açıklaması</div>
          <div class="detail-desc-text">${safeDescription}</div>
        </div>
        ${featuresHTML}
        ${distancesHTML}

        <!-- SIMILAR PROPERTIES -->
        ${simHTML}

      </div>

      <!-- RIGHT COLUMN (SIDEBAR) -->
      <div class="detail-right-col">
        
        <!-- PRICE BOX -->
        <div class="sidebar-price-box">
          <div class="sidebar-price prop-price" data-eur="${p.price_eur}" data-type="${p.type === 'rent' ? 'rent_month' : 'sale'}">€ ${p.price_eur.toLocaleString('de-DE')}${suffix}</div>
          <div class="sidebar-ref">İlan Kodu: ${safeId}</div>
          <p class="price-verification"><i class="fa-solid fa-circle-check"></i> Fiyat ve müsaitlik danışman tarafından teyit edilir.</p>
        </div>

        <!-- AGENT & CONTACT FORM -->
        <div class="sidebar-contact-box">
          <div class="sidebar-agent">
            <div class="sidebar-agent-mark" aria-hidden="true"><i class="fa-solid fa-house-chimney-window"></i></div>
            <div class="sidebar-agent-info">
              <h4>Jasmine Group Portföy Ekibi</h4>
              <p>Alanya bölge danışmanlığı</p>
            </div>
          </div>

          <form class="sidebar-form" data-lead-form novalidate>
            <h4>İlan Hakkında Bilgi Alın</h4>
            <input type="hidden" name="source" value="property-detail">
            <input type="hidden" name="propertyId" value="${safeId}">
            <div class="hp-field" aria-hidden="true"><label>Web sitesi<input type="text" name="website" tabindex="-1" autocomplete="off"></label></div>
            <label for="lead-name">Adınız Soyadınız</label>
            <input id="lead-name" name="name" type="text" autocomplete="name" required maxlength="100">
            <label for="lead-phone">Telefon Numaranız</label>
            <input id="lead-phone" name="phone" type="tel" autocomplete="tel" inputmode="tel" required maxlength="30">
            <label for="lead-email">E-posta Adresiniz <small>(isteğe bağlı)</small></label>
            <input id="lead-email" name="email" type="email" autocomplete="email" maxlength="120">
            <label for="lead-message">Mesajınız</label>
            <textarea id="lead-message" name="message" rows="3" required maxlength="2000">Merhaba, ${safeId} referans numaralı ilan hakkında bilgi almak istiyorum.</textarea>
            <label class="consent-field">
              <input type="checkbox" name="consent" required>
              <span><a href="kvkk.html" target="_blank">KVKK metnini</a> okudum ve talebim için iletişime geçilmesini kabul ediyorum.</span>
            </label>
            <button type="submit">TALEBİ GÖNDER</button>
            <div class="form-status" role="status" aria-live="polite"></div>
          </form>

          <div class="sidebar-actions">
            <a href="https://wa.me/905330850769?text=${encodeURIComponent('Merhaba, ' + p.id + ' ilanınız hakkında bilgi alabilir miyim? ' + window.location.href)}" target="_blank" class="sidebar-action-btn wa"><i class="fa-brands fa-whatsapp"></i> WhatsApp</a>
            <a href="tel:+905330850769" class="sidebar-action-btn call"><i class="fa-solid fa-phone"></i> Hemen Ara</a>
          </div>
        </div>

        <!-- SHARE / PRINT -->
        <div style="display:grid; grid-template-columns:1fr 1fr; gap:10px;">
          <button class="share-btn copy-link" style="width:100%; border:none; background:var(--navy); color:#fff; padding:12px; border-radius:6px; cursor:pointer; font-weight:600; font-size:13px; display:flex; justify-content:center; align-items:center; gap:8px;" onclick="copyLink()"><i class="fa-solid fa-link"></i> Linki Kopyala</button>
          <button class="share-btn" style="width:100%; background:var(--bg-light); color:var(--navy); border:1px solid var(--border); padding:12px; border-radius:6px; cursor:pointer; font-weight:600; font-size:13px; display:flex; justify-content:center; align-items:center; gap:8px;" onclick="window.print()"><i class="fa-solid fa-print"></i> Yazdır</button>
        </div>

      </div>
    </div>
  `;
  
  // Para birimi vs uygula
  changeCurrency(localStorage.getItem('jg_currency') || 'eur');
  initLeadForms(container);
  window.__jasminePropertyContext = { property_id: p.id, value: p.price_eur, currency: 'EUR' };
  trackCurrentPropertyView();
  
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
  initLeadForms();
  initLegalFooter();
  initGlobalNavigation();
  initGlobalStructuredData();
  loadAnalyticsConfiguration();
  initLiveCurrencyRates();
  document.addEventListener('click', event => {
    const link = event.target.closest('a[href*="wa.me"]');
    if (link) trackEvent('contact_whatsapp', {
      page: window.location.pathname,
      property_id: window.__jasminePropertyContext?.property_id || '',
      source: 'whatsapp',
    });
  });
  renderPropertyDetail();
  hydrateRegionCounts();
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

function listingControlValue(id) {
  return document.getElementById(id)?.value?.trim() || '';
}

function readListingFilters() {
  return {
    q: listingControlValue('sidebar-keyword'),
    loc: listingControlValue('sidebar-loc') === 'Tümü' ? '' : listingControlValue('sidebar-loc'),
    category: listingControlValue('sidebar-type'),
    market: listingControlValue('sidebar-market'),
    room: listingControlValue('sidebar-room'),
    min: listingControlValue('sidebar-pmin'),
    max: listingControlValue('sidebar-pmax'),
    areaMin: listingControlValue('sidebar-area-min'),
    sort: listingControlValue('listing-sort'),
  };
}

function listingQuery(filters) {
  const params = new URLSearchParams();
  ['q', 'loc', 'category', 'market', 'room', 'min', 'max', 'areaMin'].forEach(key => {
    if (filters[key]) params.set(key, filters[key]);
  });
  if (filters.sort && !/önerilen|en yeniler/i.test(filters.sort)) params.set('sort', filters.sort);
  return params;
}

function hydrateListingControls() {
  const params = new URLSearchParams(window.location.search);
  const legacyCategory = params.get('type') || '';
  const values = {
    'sidebar-keyword': params.get('q') || '',
    'sidebar-loc': params.get('loc') || '',
    'sidebar-type': params.get('category') || (/villa/i.test(legacyCategory) ? 'villa' : /daire|apartman/i.test(legacyCategory) ? 'apartment' : ''),
    'sidebar-market': params.get('market') || '',
    'sidebar-room': params.get('room') || '',
    'sidebar-pmin': params.get('min') || '',
    'sidebar-pmax': params.get('max') || '',
    'sidebar-area-min': params.get('areaMin') || '',
    'listing-sort': params.get('sort') || '',
  };
  Object.entries(values).forEach(([id, value]) => {
    const control = document.getElementById(id);
    if (!control || !value) return;
    const option = control.tagName === 'SELECT'
      ? [...control.options].find(item => item.value === value || item.textContent === value || item.value.toLocaleLowerCase('tr-TR').includes(value.toLocaleLowerCase('tr-TR')))
      : null;
    if (control.tagName !== 'SELECT') control.value = value;
    else if (option) control.value = option.value;
  });
}

function renderActiveListingFilters(filters, resultCount) {
  const container = document.getElementById('active-filter-chips');
  if (!container) return;
  const labels = {
    q: value => `“${value}”`,
    loc: value => value,
    category: value => propertyCategoryLabels[value] || value,
    market: value => marketStatusLabels[value] || value,
    room: value => value === '4' ? '4+ oda' : `${value}+1`,
    min: value => `Min €${Number(value).toLocaleString('tr-TR')}`,
    max: value => `Maks €${Number(value).toLocaleString('tr-TR')}`,
    areaMin: value => `Min ${value} m²`,
  };
  const active = Object.entries(labels).filter(([key]) => filters[key]);
  container.innerHTML = active.length
    ? `<span class="filter-result-summary">${resultCount} sonuç</span>${active.map(([key, formatter]) => `<button type="button" data-clear-filter="${key}">${escapeHTML(formatter(filters[key]))} <i class="fa-solid fa-xmark"></i></button>`).join('')}<button type="button" class="clear-all-filters" data-clear-filter="all">Tümünü temizle</button>`
    : `<span class="filter-result-summary">${resultCount} güncel portföy</span><span class="filter-empty-note">Filtre seçerek kısa listenizi daraltın.</span>`;
}

function clearListingFilter(key) {
  const controlIds = {
    q: 'sidebar-keyword', loc: 'sidebar-loc', category: 'sidebar-type', market: 'sidebar-market',
    room: 'sidebar-room', min: 'sidebar-pmin', max: 'sidebar-pmax', areaMin: 'sidebar-area-min',
  };
  if (key === 'all') Object.values(controlIds).forEach(id => {
    const control = document.getElementById(id);
    if (control) control.value = id === 'sidebar-loc' ? 'Tümü' : '';
  });
  else {
    const control = document.getElementById(controlIds[key]);
    if (control) control.value = key === 'loc' ? 'Tümü' : '';
  }
  applySidebarFilters(window.currentAllListingProperties || []);
}

function applySidebarFilters(props, options = {}) {
    const filters = readListingFilters();
    const q = filters.q.toLocaleLowerCase('tr-TR');
    const minimumPrice = Number(filters.min || 0);
    const maximumPrice = Number(filters.max || Number.MAX_SAFE_INTEGER);
    const minimumArea = Number(filters.areaMin || 0);

    const filtered = props.filter(property => {
      const haystack = `${property.id} ${property.title} ${property.location} ${property.desc} ${(property.features || []).join(' ')}`.toLocaleLowerCase('tr-TR');
      const roomCount = Number.parseInt(String(property.rooms || ''), 10);
      return (!filters.loc || String(property.location).toLocaleLowerCase('tr-TR').includes(filters.loc.toLocaleLowerCase('tr-TR')))
        && (!filters.category || property.category === filters.category)
        && (!filters.market || property.market_status === filters.market)
        && (!q || haystack.includes(q))
        && (!filters.room || (filters.room === '4' ? roomCount >= 4 : roomCount === Number(filters.room)))
        && property.price_eur >= minimumPrice
        && property.price_eur <= maximumPrice
        && metricNumber(property.area_net) >= minimumArea;
    });

    if (!options.skipHistory) {
      const query = listingQuery(filters).toString();
      window.history.replaceState({}, document.title, `${window.location.pathname}${query ? `?${query}` : ''}`);
    }
    window.listingVisibleCount = 24;
    window.currentFilteredListingProperties = filtered;
    renderProperties(filtered);
    renderActiveListingFilters(filters, filtered.length);
}

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

function setLangMega(lang, source) {
    source?.preventDefault?.();
    document.querySelectorAll('.mega-lang').forEach(el => el.classList.remove('active'));
    (source?.currentTarget || source)?.classList?.add('active');
    changeLang(lang);
    updateMegaBtnText();
}

function setCurrMega(curr, source) {
    source?.preventDefault?.();
    document.querySelectorAll('.mega-curr').forEach(el => el.classList.remove('active'));
    (source?.currentTarget || source)?.classList?.add('active');
    changeCurrency(curr);
    updateMegaBtnText();
}

function updateMegaBtnText() {
    const curLang = (localStorage.getItem('jg_lang') || 'tr').toUpperCase();
    const curCurr = (localStorage.getItem('jg_currency') || 'eur').toUpperCase();
    const btn = document.getElementById('megaMenuTrigger');
    if(btn) btn.innerHTML = `<i class="fa-solid fa-globe"></i> ${curLang} / ${curCurr} <i class="fa-solid fa-chevron-down"></i>`;
}

document.addEventListener('DOMContentLoaded', updateMegaBtnText);

// --- BLOG SYSTEM ---
let cachedBlogs = null;
async function fetchBlogs() {
    if (cachedBlogs) return cachedBlogs;
    try {
        const response = await fetch('blogs.json?v=' + Date.now());
        if (!response.ok) throw new Error('Ağ hatası');
        cachedBlogs = await response.json();
        return cachedBlogs;
    } catch (error) {
        console.error('Bloglar yüklenirken hata oluştu:', error);
        return [];
    }
}

async function renderBlogs() {
    const list = document.getElementById('blog-list');
    if (!list) return;
    
    const blogs = await fetchBlogs();
    
    let html = '';
    blogs.forEach(b => {
        html += `
        <div class="blog-card" style="background:#fff; border-radius:12px; overflow:hidden; box-shadow:0 4px 15px rgba(0,0,0,0.05); transition:transform 0.3s;">
            <a href="blog/${encodeURIComponent(b.id)}.html">
                <img src="${b.image}" alt="${b.title}" style="width:100%; height:220px; object-fit:cover; border-bottom:3px solid var(--red);" />
            </a>
            <div style="padding:20px;">
                <span style="background:var(--red-light); color:var(--red); padding:4px 10px; font-size:11px; font-weight:700; border-radius:4px;">${b.category}</span>
                <h3 style="margin:15px 0 10px; font-size:18px;"><a href="blog/${encodeURIComponent(b.id)}.html" style="color:var(--navy); text-decoration:none;">${escapeHTML(b.title)}</a></h3>
                <p style="color:#666; font-size:14px; line-height:1.6; margin-bottom:15px;">${b.excerpt}</p>
                <div style="display:flex; justify-content:space-between; align-items:center; border-top:1px solid #eee; padding-top:15px;">
                    <span style="font-size:12px; color:#888;"><i class="fa-regular fa-calendar"></i> ${b.date}</span>
                    <a href="blog/${encodeURIComponent(b.id)}.html" style="color:var(--navy); font-weight:600; font-size:13px; text-decoration:none;">Devamını Oku <i class="fa-solid fa-arrow-right"></i></a>
                </div>
            </div>
        </div>
        `;
    });
    list.innerHTML = html;
}

async function renderBlogDetail() {
    const container = document.getElementById('blog-detail-container');
    if (!container || document.body.dataset.staticBlog === 'true') return;
    
    const urlParams = new URLSearchParams(window.location.search);
    const id = urlParams.get('id');
    
    const blogs = await fetchBlogs();
    const b = blogs.find(x => x.id === id);
    
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
                <div class="blog-html-content">${b.content}</div>
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
    const preferredButton = document.querySelector('.float-wa');
    if (preferredButton) {
        document.querySelectorAll('.wa-float').forEach(button => button.remove());
        return;
    }
    if (document.querySelector('.wa-float')) return;
    const waBtn = document.createElement('a');
    waBtn.className = 'float-wa';
    waBtn.href = "https://wa.me/905330850769";
    waBtn.target = "_blank";
    waBtn.setAttribute('aria-label', 'WhatsApp ile yazın');
    waBtn.innerHTML = '<i class="fa-brands fa-whatsapp"></i>';
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

  document.querySelectorAll('[data-wishlist-id]').forEach(button => {
    const active = wishlist.includes(button.dataset.wishlistId);
    button.classList.toggle('active', active);
    button.setAttribute('aria-pressed', String(active));
    const icon = button.querySelector('i');
    if (icon) icon.className = active ? 'fa-solid fa-heart' : 'fa-regular fa-heart';
  });
}

function toggleWishlist(id, source) {
  if (source?.preventDefault) {
    source.preventDefault();
    source.stopPropagation();
  }
  
  if (wishlist.includes(id)) {
    wishlist = wishlist.filter(item => item !== id);
  } else {
    wishlist.push(id);
  }
  
  localStorage.setItem('jg_wishlist', JSON.stringify(wishlist));
  updateWishlistUI();
}

function ensureWishlistModal() {
  let modal = document.getElementById('wishlist-modal');
  if (modal) return modal;
  modal = document.createElement('section');
  modal.id = 'wishlist-modal';
  modal.className = 'collection-modal';
  modal.setAttribute('aria-modal', 'true');
  modal.setAttribute('role', 'dialog');
  modal.setAttribute('aria-label', 'Favori portföyler');
  modal.innerHTML = `
    <button class="collection-modal-backdrop" type="button" onclick="closeWishlist()" aria-label="Favorileri kapat"></button>
    <div class="collection-modal-panel">
      <header><div><p class="section-kicker">KISA LİSTENİZ</p><h2>Favori Portföyler</h2></div><button type="button" onclick="closeWishlist()" aria-label="Favorileri kapat"><i class="fa-solid fa-xmark"></i></button></header>
      <div class="collection-modal-content"></div>
    </div>`;
  document.body.appendChild(modal);
  return modal;
}

async function openWishlist() {
  const modal = ensureWishlistModal();
  const content = modal.querySelector('.collection-modal-content');
  modal.classList.add('active');
  document.body.style.overflow = 'hidden';
  if (!wishlist.length) {
    content.innerHTML = '<div class="collection-empty"><i class="fa-regular fa-heart"></i><h3>Henüz favori portföyünüz yok.</h3><p>Beğendiğiniz ilanlardaki kalp simgesini kullanarak kısa listenizi oluşturabilirsiniz.</p><a href="buy.html">Portföyleri keşfet</a></div>';
    return;
  }

  content.innerHTML = '<div class="collection-loading"><i class="fa-solid fa-spinner fa-spin"></i> Favoriler hazırlanıyor...</div>';
  const props = await fetchProperties();
  const selected = props.filter(property => wishlist.includes(property.id));
  content.innerHTML = selected.map(property => `
    <article class="collection-item">
      <img src="${escapeHTML(property.images[0] || 'images/property-placeholder.svg')}" alt="${escapeHTML(formatPropertyTitle(property.title))}">
      <div><small>${escapeHTML(property.location)}</small><h3>${escapeHTML(formatPropertyTitle(property.title))}</h3><strong>€ ${property.price_eur.toLocaleString('de-DE')}</strong></div>
      <div><a href="property-detail.html?id=${encodeURIComponent(property.id)}">İncele</a><button type="button" data-remove-wishlist="${escapeHTML(property.id)}">Kaldır</button></div>
    </article>`).join('') || '<div class="collection-empty"><h3>Favori ilanlar artık yayında değil.</h3><a href="buy.html">Güncel portföyler</a></div>';
  content.querySelectorAll('[data-remove-wishlist]').forEach(button => button.addEventListener('click', () => {
    toggleWishlist(button.dataset.removeWishlist);
    openWishlist();
  }));
}

function closeWishlist() {
  document.getElementById('wishlist-modal')?.classList.remove('active');
  document.body.style.overflow = '';
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

function updateCompareUI() {
  const floating = document.getElementById('compare-floating');
  const countSpan = document.getElementById('compare-count');
  if (countSpan) countSpan.innerText = compareList.length;
  if (floating) floating.style.display = compareList.length ? 'block' : 'none';

  document.querySelectorAll('[data-compare-id]').forEach(button => {
    const active = compareList.includes(button.dataset.compareId);
    button.classList.toggle('active', active);
    button.setAttribute('aria-pressed', String(active));
  });
}

function toggleCompare(id, source) {
  const adding = !compareList.includes(id);
  if (adding) {
    if (compareList.length >= 3) {
      source?.classList.add('limit-reached');
      setTimeout(() => source?.classList.remove('limit-reached'), 600);
      return;
    }
    if (!compareList.includes(id)) compareList.push(id);
  } else {
    compareList = compareList.filter(item => item !== id);
  }
  
  updateCompareUI();
  if (!compareList.length) closeCompareModal();
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
    
    let img = p.images.length > 0 ? p.images[0] : 'images/property-placeholder.svg';
    let suffix = p.type === 'rent' ? ' / ay' : '';
    
    content.innerHTML += `
      <div style="background:var(--white); border:1px solid var(--border); border-radius:8px; padding:15px; position:relative;">
        <button onclick="toggleCompare('${escapeHTML(id)}'); openCompareModal();" style="position:absolute; top:5px; right:5px; background:rgba(255,0,0,0.1); color:red; border:none; border-radius:50%; width:24px; height:24px; cursor:pointer;" aria-label="Karşılaştırmadan kaldır">&times;</button>
        <img src="${escapeHTML(img)}" alt="${escapeHTML(formatPropertyTitle(p.title))}" style="width:100%; height:150px; object-fit:cover; border-radius:6px; margin-bottom:10px;">
        <h4 style="font-size:14px; margin:0 0 5px; color:var(--navy);">${escapeHTML(formatPropertyTitle(p.title))}</h4>
        <div style="color:var(--red); font-weight:bold; font-size:18px; margin-bottom:10px;">€ ${p.price_eur.toLocaleString('de-DE')}${suffix}</div>
        <ul style="list-style:none; padding:0; margin:0; font-size:13px; color:var(--text-muted);">
          <li style="padding:8px 0; border-bottom:1px solid var(--border);"><strong>Bölge:</strong> ${escapeHTML(p.location)}</li>
          <li style="padding:8px 0; border-bottom:1px solid var(--border);"><strong>Oda:</strong> ${escapeHTML(p.rooms)}</li>
          <li style="padding:8px 0; border-bottom:1px solid var(--border);"><strong>Alan:</strong> ${escapeHTML(formatArea(p.area_net))}</li>
          <li style="padding:8px 0;"><strong>Durum:</strong> ${p.type === 'sale' ? 'Satılık' : 'Kiralık'}</li>
        </ul>
        <a href="property-detail.html?id=${encodeURIComponent(id)}" style="display:block; text-align:center; background:var(--navy); color:#fff; padding:8px; border-radius:6px; text-decoration:none; margin-top:15px; font-weight:bold; font-size:12px;">İlana Git</a>
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


function toggleMobileMenu() {
  const menu = document.getElementById("mobileSideMenu");
  const overlay = document.getElementById("msmOverlay");
  if(menu && overlay) {
    menu.classList.toggle("active");
    overlay.classList.toggle("active");
  }
}

/* ============================================================
   PROFESSIONAL UPGRADE — ANIMATIONS & FEATURES
   ============================================================ */

// 1. SCROLL FADE-IN ANIMATION (IntersectionObserver)
(function initFadeIn() {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.1, rootMargin: '0px 0px -40px 0px' });

  document.addEventListener('DOMContentLoaded', () => {
    document.querySelectorAll('.fade-in-up').forEach(el => observer.observe(el));
  });
  // Also run if DOM already loaded
  if (document.readyState !== 'loading') {
    setTimeout(() => {
      document.querySelectorAll('.fade-in-up').forEach(el => observer.observe(el));
    }, 200);
  }
})();

// 2. COUNTER ANIMATION
function animateCounters() {
  document.querySelectorAll('.stat-number').forEach(el => {
    if (el.dataset.animated) return;
    const text = el.textContent.replace(/\s/g, '');
    const match = text.match(/([\d\.]+)/);
    if (!match) return;
    const target = parseFloat(match[1].replace('.', ''));
    const suffix = text.replace(match[1], '');
    const hasDecimal = match[1].includes('.');
    const duration = 2000;
    const startTime = performance.now();
    el.dataset.animated = 'true';

    function update(currentTime) {
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const easeOut = 1 - Math.pow(1 - progress, 3);
      let current = Math.round(target * easeOut);
      if (hasDecimal) {
        el.innerHTML = current.toLocaleString('tr-TR') + suffix;
      } else {
        el.innerHTML = current.toLocaleString('tr-TR') + suffix;
      }
      if (progress < 1) requestAnimationFrame(update);
    }
    requestAnimationFrame(update);
  });
}

const counterObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      animateCounters();
      counterObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.3 });

document.addEventListener('DOMContentLoaded', () => {
  document.querySelectorAll('.about-stats, .stat-box').forEach(el => counterObserver.observe(el));
});
if (document.readyState !== 'loading') {
  setTimeout(() => {
    document.querySelectorAll('.about-stats, .stat-box').forEach(el => counterObserver.observe(el));
  }, 300);
}

// 3. STICKY HEADER SHRINK
(function initStickyHeader() {
  function handleScroll() {
    const header = document.querySelector('.main-header');
    if (!header) return;
    if (window.scrollY > 80) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }
  }
  window.addEventListener('scroll', handleScroll, { passive: true });
})();

// 4. LIGHTBOX GALLERY
let lightboxImages = [];
let lightboxIndex = 0;

function openLightbox(images, index) {
  lightboxImages = images;
  lightboxIndex = index || 0;
  
  let overlay = document.getElementById('lightboxOverlay');
  if (!overlay) {
    overlay = document.createElement('div');
    overlay.id = 'lightboxOverlay';
    overlay.className = 'lightbox-overlay';
    overlay.innerHTML = `
      <div class="lightbox-close" onclick="closeLightbox()"><i class="fa-solid fa-xmark"></i></div>
      <div class="lightbox-arrow left" onclick="lightboxPrev()"><i class="fa-solid fa-chevron-left"></i></div>
      <img class="lightbox-img" id="lightboxImg" src="" alt="Gallery" />
      <div class="lightbox-arrow right" onclick="lightboxNext()"><i class="fa-solid fa-chevron-right"></i></div>
      <div class="lightbox-counter" id="lightboxCounter"></div>
    `;
    document.body.appendChild(overlay);
    
    overlay.addEventListener('click', (e) => {
      if (e.target === overlay) closeLightbox();
    });
    
    document.addEventListener('keydown', (e) => {
      if (!overlay.classList.contains('active')) return;
      if (e.key === 'Escape') closeLightbox();
      if (e.key === 'ArrowLeft') lightboxPrev();
      if (e.key === 'ArrowRight') lightboxNext();
    });
  }
  
  updateLightbox();
  overlay.classList.add('active');
  document.body.style.overflow = 'hidden';
}

function closeLightbox() {
  const overlay = document.getElementById('lightboxOverlay');
  if (overlay) {
    overlay.classList.remove('active');
    document.body.style.overflow = '';
  }
}

function lightboxPrev() {
  lightboxIndex = (lightboxIndex - 1 + lightboxImages.length) % lightboxImages.length;
  updateLightbox();
}

function lightboxNext() {
  lightboxIndex = (lightboxIndex + 1) % lightboxImages.length;
  updateLightbox();
}

function updateLightbox() {
  const img = document.getElementById('lightboxImg');
  const counter = document.getElementById('lightboxCounter');
  if (img) img.src = lightboxImages[lightboxIndex];
  if (counter) counter.textContent = (lightboxIndex + 1) + ' / ' + lightboxImages.length;
}

// 5. SHARE BUTTONS FUNCTIONS
function shareOnWhatsApp(title, url) {
  const text = encodeURIComponent(title + ' — ' + url);
  window.open('https://wa.me/?text=' + text, '_blank');
}

function copyLink(url) {
  navigator.clipboard.writeText(url || window.location.href).then(() => {
    const btn = document.querySelector('.share-btn.copy-link');
    if (btn) {
      const orig = btn.innerHTML;
      btn.innerHTML = '<i class="fa-solid fa-check"></i> Kopyalandı!';
      setTimeout(() => { btn.innerHTML = orig; }, 2000);
    }
  });
}

// 6. AUTO-ADD FADE-IN CLASSES TO SECTIONS
document.addEventListener('DOMContentLoaded', () => {
  const selectors = [
    '.about-section', '.box-banners', '.section-title-bar',
    '.property-list', '.why-choose-section', '.testimonials-section',
    '.contact-info-grid', '.form-row', '.values-grid',
    '.sell-steps', '.corporate-intro', '.blog-grid'
  ];
  selectors.forEach(sel => {
    document.querySelectorAll(sel).forEach(el => {
      if (!el.classList.contains('fade-in-up')) {
        el.classList.add('fade-in-up');
      }
    });
  });
  // Re-observe newly added elements
  setTimeout(() => {
    const obs = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          obs.unobserve(entry.target);
        }
      });
    }, { threshold: 0.1 });
    document.querySelectorAll('.fade-in-up:not(.visible)').forEach(el => obs.observe(el));
  }, 300);
});
