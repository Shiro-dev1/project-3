// ===== Меню кофейни =====
// Чтобы добавить позицию, просто допиши строку в нужный список.
const MENU = {
  coffee: [
    { ru: ["Эспрессо", "Крепкий и ароматный, 30 мл"], en: ["Espresso", "Strong and aromatic, 30 ml"], price: 150 },
    { ru: ["Американо", "Эспрессо с горячей водой, 250 мл"], en: ["Americano", "Espresso with hot water, 250 ml"], price: 180 },
    { ru: ["Капучино", "Нежная молочная пенка, 300 мл"], en: ["Cappuccino", "Silky milk foam, 300 ml"], price: 230 },
    { ru: ["Латте", "Мягкий вкус с большим количеством молока, 350 мл"], en: ["Latte", "Mild taste with lots of milk, 350 ml"], price: 250 },
    { ru: ["Раф с корицей", "Фирменный напиток со сливками и корицей"], en: ["Cinnamon Raf", "Our signature drink with cream and cinnamon"], price: 290 },
    { ru: ["Флэт уайт", "Двойной эспрессо и бархатное молоко"], en: ["Flat White", "Double espresso and velvety milk"], price: 260 },
  ],
  tea: [
    { ru: ["Чёрный с чабрецом", "Чайник 500 мл"], en: ["Black tea with thyme", "500 ml pot"], price: 220 },
    { ru: ["Зелёный жасмин", "Чайник 500 мл"], en: ["Jasmine green tea", "500 ml pot"], price: 240 },
    { ru: ["Облепиховый", "С мёдом и апельсином"], en: ["Sea buckthorn tea", "With honey and orange"], price: 280 },
    { ru: ["Матча латте", "Японский чай с молоком"], en: ["Matcha latte", "Japanese tea with milk"], price: 290 },
  ],
  desserts: [
    { ru: ["Синнабон", "Булочка с корицей и сливочным кремом"], en: ["Cinnamon roll", "With cream cheese frosting"], price: 210 },
    { ru: ["Чизкейк Нью-Йорк", "Классический, нежный"], en: ["New York cheesecake", "Classic and creamy"], price: 260 },
    { ru: ["Морковный торт", "С грецкими орехами"], en: ["Carrot cake", "With walnuts"], price: 240 },
    { ru: ["Круассан", "Свежий, хрустящий"], en: ["Croissant", "Fresh and flaky"], price: 150 },
  ],
};

// ===== Переводы =====
const EN = {
  "nav.about": "About", "nav.menu": "Menu", "nav.gallery": "Gallery", "nav.reviews": "Reviews", "nav.contacts": "Contacts",
  "hero.eyebrow": "Coffee house since 2026",
  "hero.title": "Coffee that warms you up",
  "hero.text": "Freshly roasted beans, homemade desserts and a place where you want to stay a little longer.",
  "hero.btn": "See the menu", "hero.btn2": "Find us",
  "about.title": "About us",
  "about.p1": "Korica is a small coffee house in the heart of the city. We choose our beans from trusted roasters and make every cup as if we were making it for a friend.",
  "about.p2": "It smells of fresh pastries and cinnamon, soft music plays, and there is always a seat by the window to read or work.",
  "about.f1": "kinds of coffee", "about.f2": "homemade desserts", "about.f3": "open every day",
  "menu.title": "Menu", "menu.coffee": "Coffee", "menu.tea": "Tea", "menu.desserts": "Desserts",
  "gallery.title": "Gallery",
  "reviews.title": "Guest reviews",
  "reviews.r1": "The best cinnamon raf in town! I stop by every morning before classes.", "reviews.n1": "Anya, student",
  "reviews.r2": "Quiet, cozy and there is a socket at every table. Perfect for working on a laptop.", "reviews.n2": "Max, designer",
  "reviews.r3": "The cheesecake just melts in your mouth, and the barista always remembers my order.", "reviews.n3": "Olga, regular guest",
  "contacts.title": "Contacts",
  "contacts.address": "12 Chestnut St. (fictional address)",
  "contacts.hours": "Mon–Fri 7:00–22:00, Sat–Sun 9:00–23:00",
  "contacts.map": "The map will be here",
  "footer.note": "© 2026 Korica. Practice project, this coffee house doesn't exist.",
};

// Запоминаем русские тексты прямо со страницы, чтобы переключаться обратно
const RU = {};
document.querySelectorAll("[data-i18n]").forEach((el) => { RU[el.dataset.i18n] = el.textContent; });

let lang = "ru";
let currentTab = "coffee";

function renderMenu() {
  const list = document.getElementById("menu-list");
  const currency = lang === "ru" ? "₽" : "RUB";
  list.innerHTML = MENU[currentTab].map((item) => {
    const [name, desc] = item[lang];
    return `<div class="item">
      <div class="item__top"><span class="item__name">${name}</span><span class="item__dots"></span><span class="item__price">${item.price} ${currency}</span></div>
      <p class="item__desc">${desc}</p>
    </div>`;
  }).join("");
}

function setLang(next) {
  lang = next;
  const dict = lang === "en" ? EN : RU;
  document.querySelectorAll("[data-i18n]").forEach((el) => { el.textContent = dict[el.dataset.i18n]; });
  document.documentElement.lang = lang;
  document.getElementById("lang").textContent = lang === "ru" ? "EN" : "RU";
  document.title = lang === "ru" ? "Корица — кофейня" : "Korica — coffee house";
  document.querySelector(".logo").firstChild.textContent = lang === "ru" ? "Корица" : "Korica";
  renderMenu();
  try { localStorage.setItem("lang", lang); } catch (e) {}
}

// Вкладки меню
document.querySelectorAll(".tab").forEach((tab) => {
  tab.addEventListener("click", () => {
    document.querySelector(".tab.is-active").classList.remove("is-active");
    tab.classList.add("is-active");
    currentTab = tab.dataset.tab;
    renderMenu();
  });
});

// Кнопка языка
document.getElementById("lang").addEventListener("click", () => setLang(lang === "ru" ? "en" : "ru"));

// Бургер-меню на телефоне
const burger = document.getElementById("burger");
const nav = document.getElementById("nav");
burger.addEventListener("click", () => {
  const open = nav.classList.toggle("is-open");
  burger.classList.toggle("is-open", open);
  burger.setAttribute("aria-expanded", open);
});
nav.querySelectorAll("a").forEach((a) => a.addEventListener("click", () => {
  nav.classList.remove("is-open");
  burger.classList.remove("is-open");
  burger.setAttribute("aria-expanded", false);
}));

// Если фото не загрузилось, прячем его, остаётся красивый фон
document.querySelectorAll(".photo img").forEach((img) => {
  const hide = () => { img.style.display = "none"; };
  if (img.complete && img.naturalWidth === 0) hide();
  img.addEventListener("error", hide);
});

// Старт
let saved = "ru";
try { saved = localStorage.getItem("lang") || "ru"; } catch (e) {}
setLang(saved);
