"use client";

import { createContext, useContext, useEffect, useState, ReactNode } from "react";

export type Lang = "uz" | "ru" | "en";

const dict = {
  uz: {
    nav_products: "Mahsulotlar",
    nav_how: "Qanday ishlaydi",
    nav_login: "Kirish",
    nav_register: "Ro'yxatdan o'tish",
    nav_logout: "Chiqish",
    hero_badge: "🚀 Toshkent bo'ylab yetkazib berish · 60 daqiqada",
    hero_title_1: "MUSA —",
    hero_title_2: "Muzqaymoq",
    hero_title_3: "va ovqatlar",
    hero_desc: "20+ xil marojni, organic bar va premium gelatolar. Do'konlar uchun ham, oddiy mijozlar uchun ham.",
    hero_cta_catalog: "Katalogni ko'rish 🍦",
    stat_flavors: "Marojni turi",
    stat_food: "Ovqat mahsulot",
    stat_organic: "Organic barlar",
    stat_delivery: "Yetkazib berish",
    how_title: "Qanday ishlaydi?",
    how_1_title: "Mahsulot tanlang",
    how_1_desc: "Katalogdan o'zingizga yoqganini tanlang",
    how_2_title: "Miqdor kiriting",
    how_2_desc: "Nechtasini olishingizni belgilang",
    how_3_title: "Manzil ko'rsating",
    how_3_desc: "Xaritada joylashuvingizni belgilang",
    how_4_title: "Yetkazib beramiz",
    how_4_desc: "60 daqiqada eshigingizda",
    catalog_label: "Katalog",
    catalog_title: "Mahsulotlarimiz",
    catalog_desc: "Har bir tovar haqida batafsil — uni bosib ko'ring",
    filter_all: "Barchasi",
    filter_ice: "Muzqaymoq",
    filter_food: "Ovqat",
    order_btn: "Buyurtma",
    view_btn: "Ko'rish",
    operator_wholesale: "Do'konlar uchun ulgurji buyurtma",
    operator_contact: "Operator bilan bog'laning",
    footer_rights: "Musa Operator",
    // Order modal
    om_order_title: "Buyurtma berish",
    om_customer_type: "Mijoz turi",
    om_type_individual: "👤 Oddiy mijoz",
    om_type_shop: "🏪 Do'kon",
    om_name: "Ismingiz",
    om_name_ph: "To'liq ismingiz",
    om_phone: "Telefon raqam",
    om_qty: "Miqdor",
    om_total: "Jami summa",
    om_continue: "Davom etish →",
    om_address_title: "Yetkazib berish manzili",
    om_address_desc: "Xaritada o'z manzilingizni bosing",
    om_back: "← Orqaga",
    om_confirm: "Tasdiqlash →",
    om_confirm_title: "Buyurtmani tasdiqlang",
    om_product: "Mahsulot",
    om_amount: "Summa",
    om_address_label: "Manzil",
    om_submit: "✓ Buyurtma berish",
    om_submitting: "Yuborilmoqda...",
    om_done_title: "Buyurtma qabul qilindi!",
    om_done_desc: "Tez orada operator siz bilan bog'lanadi.",
    om_close: "Yopish",
  },
  ru: {
    nav_products: "Товары",
    nav_how: "Как это работает",
    nav_login: "Войти",
    nav_register: "Регистрация",
    nav_logout: "Выйти",
    hero_badge: "🚀 Доставка по Ташкенту · за 60 минут",
    hero_title_1: "MUSA —",
    hero_title_2: "Мороженое",
    hero_title_3: "и еда",
    hero_desc: "20+ видов мороженого, органик-бары и премиум джелато. Для магазинов и обычных клиентов.",
    hero_cta_catalog: "Смотреть каталог 🍦",
    stat_flavors: "Видов мороженого",
    stat_food: "Продуктов питания",
    stat_organic: "Органик-баров",
    stat_delivery: "Доставка",
    how_title: "Как это работает?",
    how_1_title: "Выберите товар",
    how_1_desc: "Выберите понравившийся товар из каталога",
    how_2_title: "Укажите количество",
    how_2_desc: "Отметьте, сколько хотите заказать",
    how_3_title: "Укажите адрес",
    how_3_desc: "Отметьте своё местоположение на карте",
    how_4_title: "Доставим",
    how_4_desc: "За 60 минут к вашей двери",
    catalog_label: "Каталог",
    catalog_title: "Наши товары",
    catalog_desc: "Подробнее о каждом товаре — нажмите на него",
    filter_all: "Все",
    filter_ice: "Мороженое",
    filter_food: "Еда",
    order_btn: "Заказать",
    view_btn: "Смотреть",
    operator_wholesale: "Оптовый заказ для магазинов",
    operator_contact: "Связаться с оператором",
    footer_rights: "Musa Operator",
    om_order_title: "Оформление заказа",
    om_customer_type: "Тип клиента",
    om_type_individual: "👤 Обычный клиент",
    om_type_shop: "🏪 Магазин",
    om_name: "Ваше имя",
    om_name_ph: "Полное имя",
    om_phone: "Номер телефона",
    om_qty: "Количество",
    om_total: "Итого",
    om_continue: "Продолжить →",
    om_address_title: "Адрес доставки",
    om_address_desc: "Нажмите на карту, чтобы указать адрес",
    om_back: "← Назад",
    om_confirm: "Подтвердить →",
    om_confirm_title: "Подтвердите заказ",
    om_product: "Товар",
    om_amount: "Сумма",
    om_address_label: "Адрес",
    om_submit: "✓ Оформить заказ",
    om_submitting: "Отправка...",
    om_done_title: "Заказ принят!",
    om_done_desc: "Оператор скоро свяжется с вами.",
    om_close: "Закрыть",
  },
  en: {
    nav_products: "Products",
    nav_how: "How it works",
    nav_login: "Log in",
    nav_register: "Sign up",
    nav_logout: "Log out",
    hero_badge: "🚀 Delivery across Tashkent · in 60 minutes",
    hero_title_1: "MUSA —",
    hero_title_2: "Ice cream",
    hero_title_3: "& food",
    hero_desc: "20+ ice cream flavors, organic bars and premium gelato. For shops and everyday customers alike.",
    hero_cta_catalog: "Browse catalog 🍦",
    stat_flavors: "Ice cream flavors",
    stat_food: "Food products",
    stat_organic: "Organic bars",
    stat_delivery: "Delivery time",
    how_title: "How it works",
    how_1_title: "Pick a product",
    how_1_desc: "Choose what you like from the catalog",
    how_2_title: "Set the quantity",
    how_2_desc: "Choose how many you want",
    how_3_title: "Set your address",
    how_3_desc: "Mark your location on the map",
    how_4_title: "We deliver",
    how_4_desc: "To your door in 60 minutes",
    catalog_label: "Catalog",
    catalog_title: "Our products",
    catalog_desc: "Tap any item for full details",
    filter_all: "All",
    filter_ice: "Ice cream",
    filter_food: "Food",
    order_btn: "Order",
    view_btn: "View",
    operator_wholesale: "Wholesale orders for shops",
    operator_contact: "Contact the operator",
    footer_rights: "Musa Operator",
    om_order_title: "Place an order",
    om_customer_type: "Customer type",
    om_type_individual: "👤 Individual",
    om_type_shop: "🏪 Shop",
    om_name: "Your name",
    om_name_ph: "Full name",
    om_phone: "Phone number",
    om_qty: "Quantity",
    om_total: "Total",
    om_continue: "Continue →",
    om_address_title: "Delivery address",
    om_address_desc: "Tap the map to set your address",
    om_back: "← Back",
    om_confirm: "Confirm →",
    om_confirm_title: "Confirm your order",
    om_product: "Product",
    om_amount: "Amount",
    om_address_label: "Address",
    om_submit: "✓ Place order",
    om_submitting: "Submitting...",
    om_done_title: "Order received!",
    om_done_desc: "An operator will contact you shortly.",
    om_close: "Close",
  },
} as const;

export type TranslationKey = keyof (typeof dict)["uz"];

interface LanguageContextValue {
  lang: Lang;
  setLang: (l: Lang) => void;
  t: (key: TranslationKey) => string;
}

const LanguageContext = createContext<LanguageContextValue | null>(null);

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [lang, setLangState] = useState<Lang>("uz");

  useEffect(() => {
    const saved = localStorage.getItem("musa_lang") as Lang | null;
    if (saved && (saved === "uz" || saved === "ru" || saved === "en")) {
      setLangState(saved);
    }
  }, []);

  function setLang(l: Lang) {
    setLangState(l);
    localStorage.setItem("musa_lang", l);
  }

  function t(key: TranslationKey): string {
    return dict[lang][key] ?? dict.uz[key] ?? key;
  }

  return <LanguageContext.Provider value={{ lang, setLang, t }}>{children}</LanguageContext.Provider>;
}

export function useLanguage() {
  const ctx = useContext(LanguageContext);
  if (!ctx) throw new Error("useLanguage must be used within LanguageProvider");
  return ctx;
}
