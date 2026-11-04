// ===== Меню кофейни =====
// Цены в долларах. У кофе три цены: маленький, средний, большой размер.
// Чтобы добавить позицию, просто допиши строку в нужный список.
const MENU = {
  coffee: [
    { ru: ["Эспрессо", "Крепкий и ароматный"], en: ["Espresso", "Strong and aromatic"], price: [2.5, 3.0, 3.5] },
    { ru: ["Американо", "Эспрессо с горячей водой"], en: ["Americano", "Espresso with hot water"], price: [3.0, 3.5, 4.0] },
    { ru: ["Капучино", "Нежная молочная пенка"], en: ["Cappuccino", "Silky milk foam"], price: [3.75, 4.25, 4.75] },
    { ru: ["Латте", "Мягкий вкус с большим количеством молока"], en: ["Latte", "Mild taste with lots of milk"], price: [4.0, 4.5, 5.0] },
    { ru: ["Раф с корицей", "Фирменный напиток со сливками и корицей"], en: ["Cinnamon Raf", "Our signature drink with cream and cinnamon"], price: [4.75, 5.25, 5.75] },
    { ru: ["Флэт уайт", "Двойной эспрессо и бархатное молоко"], en: ["Flat White", "Double espresso and velvety milk"], price: [4.25, 4.75, 5.25] },
  ],
  tea: [
    { ru: ["Чёрный с чабрецом", "Чайник на одного"], en: ["Black tea with thyme", "Pot for one"], price: 3.5 },
    { ru: ["Зелёный жасмин", "Чайник на одного"], en: ["Jasmine green tea", "Pot for one"], price: 3.75 },
    { ru: ["Облепиховый", "С мёдом и апельсином"], en: ["Sea buckthorn tea", "With honey and orange"], price: 4.25 },
    { ru: ["Матча латте", "Японский чай с молоком"], en: ["Matcha latte", "Japanese tea with milk"], price: 5.0 },
  ],
  desserts: [
    { ru: ["Синнабон", "Булочка с корицей и сливочным кремом"], en: ["Cinnamon roll", "With cream cheese frosting"], price: 4.5 },
    { ru: ["Чизкейк Нью-Йорк", "Классический, нежный"], en: ["New York cheesecake", "Classic and creamy"], price: 5.5 },
    { ru: ["Морковный торт", "С грецкими орехами"], en: ["Carrot cake", "With walnuts"], price: 5.0 },
    { ru: ["Круассан", "Свежий, хрустящий"], en: ["Croissant", "Fresh and flaky"], price: 3.25 },
  ],
};

// Размеры кофе (объём в унциях, как в США)
const SIZES = {
  ru: [["S", "Маленький, 8 oz"], ["M", "Средний, 12 oz"], ["L", "Большой, 16 oz"]],
  en: [["S", "Small, 8 oz"], ["M", "Medium, 12 oz"], ["L", "Large, 16 oz"]],
};
const SIZE_LABEL = { ru: "Размер:", en: "Size:" };

// ===== Переводы =====
const EN = {
  "nav.about": "About", "nav.menu": "Menu", "nav.gallery": "Gallery", "nav.reviews": "Reviews", "nav.contacts": "Contacts",
  "hero.eyebrow": "Coffee house since 2026",
  "hero.title": "Coffee that warms you up",
  "hero.text": "Freshly roasted beans, homemade desserts and a place where you want to stay a little longer.",
  "hero.btn": "See the menu", "hero.btn2": "Find us",
  "about.title": "About us",
  "about.p1": "Coffee & Chill is a small coffee house in the heart of the city. We choose our beans from trusted roasters and make every cup as if we were making it for a friend.",
  "about.p2": "It smells of fresh pastries and cinnamon, soft music plays, and there is always a seat by the window to read or work.",
  "about.f1": "kinds of coffee", "about.f2": "homemade desserts", "about.f3": "open every day", "about.f3num": "7 AM",
  "menu.title": "Menu", "menu.coffee": "Coffee", "menu.tea": "Tea", "menu.desserts": "Desserts",
  "gallery.title": "Gallery",
  "reviews.title": "Guest reviews",
  "reviews.r1": "The best cinnamon raf in town! I stop by every morning before classes.", "reviews.n1": "Anya, student",
  "reviews.r2": "Quiet, cozy and there is a socket at every table. Perfect for working on a laptop.", "reviews.n2": "Max, designer",
  "reviews.r3": "The cheesecake just melts in your mouth, and the barista always remembers my order.", "reviews.n3": "Olga, regular guest",
  "contacts.title": "Contacts",
  "contacts.address": "12 Chestnut St, Portland, OR, USA (fictional address)",
  "contacts.hours": "Mon–Fri 7 AM – 10 PM, Sat–Sun 8 AM – 11 PM",
  "contacts.map": "The map will be here",
  "footer.note": "© 2026 Coffee & Chill. Practice project, this coffee house doesn't exist.",
};

// Запоминаем русские тексты прямо со страницы, чтобы переключаться обратно
const RU = {};
document.querySelectorAll("[data-i18n]").forEach((el) => { RU[el.dataset.i18n] = el.textContent; });

let lang = "ru";
let currentTab = "coffee";

// Выбранный размер для каждого кофе (по умолчанию средний)
const chosenSize = {};

const money = (n) => "$" + n.toFixed(2);

function renderMenu() {
  const list = document.getElementById("menu-list");
  list.innerHTML = MENU[currentTab].map((item, i) => {
    const [name, desc] = item[lang];
    const hasSizes = Array.isArray(item.price);
    const size = chosenSize[i] ?? 1;
    const price = hasSizes ? item.price[size] : item.price;
    const sizes = hasSizes
      ? `<div class="sizes"><span class="sizes__label">${SIZE_LABEL[lang]}</span>${SIZES[lang].map(([short, full], s) =>
          `<button type="button" class="size${s === size ? " is-active" : ""}" data-item="${i}" data-size="${s}" title="${full}">${short}</button>`
        ).join("")}<span class="sizes__hint">${SIZES[lang][size][1]}</span></div>`
      : "";
    return `<div class="item">
      <div class="item__top"><span class="item__name">${name}</span><span class="item__dots"></span><span class="item__price">${money(price)}</span></div>
      <p class="item__desc">${desc}</p>
      <div class="item__bottom">${sizes}<button type="button" class="add" data-add="${i}">+ ${UI[lang].add}</button></div>
    </div>`;
  }).join("");
}

// Клик по размеру: меняем цену. Клик по «В корзину»: добавляем товар
document.getElementById("menu-list").addEventListener("click", (e) => {
  const add = e.target.closest(".add");
  if (add) {
    const i = Number(add.dataset.add);
    const hasSizes = Array.isArray(MENU[currentTab][i].price);
    addToCart(currentTab, i, hasSizes ? (chosenSize[i] ?? 1) : null);
    add.classList.add("is-added");
    add.textContent = "✓ " + UI[lang].added;
    setTimeout(() => { add.classList.remove("is-added"); add.textContent = "+ " + UI[lang].add; }, 1000);
    return;
  }
  const btn = e.target.closest(".size");
  if (!btn) return;
  const i = Number(btn.dataset.item);
  const size = Number(btn.dataset.size);
  chosenSize[i] = size;
  // Обновляем только эту позицию, без перерисовки всего меню
  const item = btn.closest(".item");
  item.querySelectorAll(".size").forEach((b) => b.classList.toggle("is-active", b === btn));
  item.querySelector(".item__price").textContent = money(MENU[currentTab][i].price[size]);
  item.querySelector(".sizes__hint").textContent = SIZES[lang][size][1];
});

// ===== Корзина =====
const UI = {
  ru: {
    add: "В корзину", added: "Добавлено", cart: "Корзина", empty: "Корзина пуста. Загляните в меню ☕",
    total: "Итого", checkout: "Оформить заказ", clear: "Очистить корзину", remove: "Удалить",
    thanks: "Спасибо! Заказ принят (это демо, деньги не списываются).", size: { 0: "маленький", 1: "средний", 2: "большой" },
  },
  en: {
    add: "Add to cart", added: "Added", cart: "Cart", empty: "Your cart is empty. Check out the menu ☕",
    total: "Total", checkout: "Checkout", clear: "Clear cart", remove: "Remove",
    thanks: "Thank you! Order placed (this is a demo, no money is charged).", size: { 0: "small", 1: "medium", 2: "large" },
  },
};

// Каждая строка корзины: { tab, i, size, qty }. size = null для чая и десертов.
let cart = [];
try { cart = JSON.parse(localStorage.getItem("cart")) || []; } catch (e) { cart = []; }

const cartEl = document.getElementById("cart");
const overlay = document.getElementById("overlay");

function unitPrice(row) {
  const p = MENU[row.tab][row.i].price;
  return row.size === null ? p : p[row.size];
}

function saveCart() {
  try { localStorage.setItem("cart", JSON.stringify(cart)); } catch (e) {}
}

function addToCart(tab, i, size) {
  const row = cart.find((r) => r.tab === tab && r.i === i && r.size === size);
  if (row) row.qty += 1;
  else cart.push({ tab, i, size, qty: 1 });
  saveCart();
  renderCart();
  const badge = document.getElementById("cart-count");
  badge.classList.remove("bump"); void badge.offsetWidth; badge.classList.add("bump");
}

function renderCart() {
  const t = UI[lang];
  const count = cart.reduce((sum, r) => sum + r.qty, 0);
  const total = cart.reduce((sum, r) => sum + unitPrice(r) * r.qty, 0);
  document.getElementById("cart-count").textContent = count;
  document.getElementById("cart-count").hidden = count === 0;
  document.getElementById("cart-title").textContent = t.cart;
  document.getElementById("cart-total-label").textContent = t.total;
  document.getElementById("cart-total").textContent = money(total);
  document.getElementById("checkout").textContent = t.checkout;
  document.getElementById("clear").textContent = t.clear;
  document.getElementById("checkout").disabled = count === 0;
  document.getElementById("clear").disabled = count === 0;

  const list = document.getElementById("cart-list");
  if (cart.length === 0) {
    list.innerHTML = `<p class="cart__empty">${t.empty}</p>`;
    return;
  }
  list.innerHTML = cart.map((r, k) => {
    const name = MENU[r.tab][r.i][lang][0];
    const size = r.size === null ? "" : `<span class="cart__size">${SIZES[lang][r.size][0]} · ${t.size[r.size]}</span>`;
    return `<div class="cart__row">
      <div class="cart__info">
        <div class="cart__name">${name}</div>
        ${size}
        <div class="cart__unit">${money(unitPrice(r))}</div>
      </div>
      <div class="qty">
        <button type="button" data-minus="${k}" aria-label="−1">−</button>
        <span>${r.qty}</span>
        <button type="button" data-plus="${k}" aria-label="+1">+</button>
      </div>
      <div class="cart__sum">${money(unitPrice(r) * r.qty)}</div>
      <button type="button" class="cart__remove" data-remove="${k}" title="${t.remove}" aria-label="${t.remove}">✕</button>
    </div>`;
  }).join("");
}

function openCart() {
  cartEl.classList.add("is-open");
  overlay.classList.add("is-open");
  document.body.style.overflow = "hidden";
}
function closeCart() {
  cartEl.classList.remove("is-open");
  overlay.classList.remove("is-open");
  document.body.style.overflow = "";
}

document.getElementById("cart-open").addEventListener("click", openCart);
document.getElementById("cart-close").addEventListener("click", closeCart);
overlay.addEventListener("click", closeCart);
document.addEventListener("keydown", (e) => { if (e.key === "Escape") closeCart(); });

// Кнопки внутри корзины: −, +, удалить
document.getElementById("cart-list").addEventListener("click", (e) => {
  const b = e.target.closest("button");
  if (!b) return;
  if (b.dataset.plus !== undefined) cart[b.dataset.plus].qty += 1;
  if (b.dataset.minus !== undefined) {
    const k = Number(b.dataset.minus);
    cart[k].qty -= 1;
    if (cart[k].qty === 0) cart.splice(k, 1);
  }
  if (b.dataset.remove !== undefined) cart.splice(Number(b.dataset.remove), 1);
  saveCart();
  renderCart();
});

document.getElementById("clear").addEventListener("click", () => {
  cart = [];
  saveCart();
  renderCart();
});

document.getElementById("checkout").addEventListener("click", () => {
  cart = [];
  saveCart();
  renderCart();
  document.getElementById("cart-list").innerHTML = `<p class="cart__thanks">${UI[lang].thanks}</p>`;
});

function setLang(next) {
  lang = next;
  const dict = lang === "en" ? EN : RU;
  document.querySelectorAll("[data-i18n]").forEach((el) => { el.textContent = dict[el.dataset.i18n]; });
  document.documentElement.lang = lang;
  document.getElementById("lang").textContent = lang === "ru" ? "EN" : "RU";
  document.title = lang === "ru" ? "Coffee & Chill — кофейня" : "Coffee & Chill — coffee house";
  document.getElementById("cart-open").setAttribute("aria-label", UI[lang].cart);
  renderMenu();
  renderCart();
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

// Клик по логотипу: плавно наверх, на главный экран
document.querySelector(".logo").addEventListener("click", (e) => {
  e.preventDefault();
  window.scrollTo({ top: 0, behavior: "smooth" });
  history.replaceState(null, "", location.pathname);
  nav.classList.remove("is-open");
  burger.classList.remove("is-open");
  burger.setAttribute("aria-expanded", false);
});

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
