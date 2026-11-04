// ===== Меню кофейни =====
// Цены в долларах. У кофе три цены: маленький, средний, большой размер.
// Чтобы добавить позицию, просто допиши строку в нужный список.
// tags: vegan — веган, lf — без лактозы, sf — без сахара, hit — хит, season — сезонное
// Новые позиции добавляем в КОНЕЦ списка, чтобы не сломать сохранённые корзины.
const MENU = {
  coffee: [
    { ru: ["Эспрессо", "Крепкий и ароматный"], en: ["Espresso", "Strong and aromatic"], price: [2.5, 3.0, 3.5], tags: ["vegan", "lf", "sf"] },
    { ru: ["Американо", "Эспрессо с горячей водой"], en: ["Americano", "Espresso with hot water"], price: [3.0, 3.5, 4.0], tags: ["vegan", "lf", "sf", "hit"] },
    { ru: ["Капучино", "Нежная молочная пенка"], en: ["Cappuccino", "Silky milk foam"], price: [3.75, 4.25, 4.75], tags: ["sf", "hit"] },
    { ru: ["Латте", "Мягкий вкус с большим количеством молока"], en: ["Latte", "Mild taste with lots of milk"], price: [4.0, 4.5, 5.0], tags: ["sf"] },
    { ru: ["Раф с корицей", "Фирменный напиток со сливками и корицей"], en: ["Cinnamon Raf", "Our signature drink with cream and cinnamon"], price: [4.75, 5.25, 5.75], tags: ["hit"] },
    { ru: ["Флэт уайт", "Двойной эспрессо и бархатное молоко"], en: ["Flat White", "Double espresso and velvety milk"], price: [4.25, 4.75, 5.25], tags: ["sf"] },
    { ru: ["Латте на овсяном", "Растительное молоко, без лактозы"], en: ["Oat milk latte", "Plant-based milk, lactose-free"], price: [4.5, 5.0, 5.5], tags: ["vegan", "lf"] },
    { ru: ["Тыквенный латте", "Тыква, корица и мускатный орех. Только осенью"], en: ["Pumpkin spice latte", "Pumpkin, cinnamon and nutmeg. Fall only"], price: [4.75, 5.25, 5.75], tags: ["season"] },
  ],
  tea: [
    { ru: ["Чёрный с чабрецом", "Чайник на одного"], en: ["Black tea with thyme", "Pot for one"], price: 3.5, tags: ["vegan", "lf", "sf"] },
    { ru: ["Зелёный жасмин", "Чайник на одного"], en: ["Jasmine green tea", "Pot for one"], price: 3.75, tags: ["vegan", "lf", "sf"] },
    { ru: ["Облепиховый", "С мёдом и апельсином"], en: ["Sea buckthorn tea", "With honey and orange"], price: 4.25, tags: ["lf", "season"] },
    { ru: ["Матча латте", "Японский чай с молоком"], en: ["Matcha latte", "Japanese tea with milk"], price: 5.0, tags: ["hit"] },
  ],
  desserts: [
    { ru: ["Синнабон", "Булочка с корицей и сливочным кремом"], en: ["Cinnamon roll", "With cream cheese frosting"], price: 4.5, tags: ["hit"] },
    { ru: ["Чизкейк Нью-Йорк", "Классический, нежный"], en: ["New York cheesecake", "Classic and creamy"], price: 5.5, tags: ["hit"] },
    { ru: ["Морковный торт", "С грецкими орехами"], en: ["Carrot cake", "With walnuts"], price: 5.0, tags: ["season"] },
    { ru: ["Круассан", "Свежий, хрустящий"], en: ["Croissant", "Fresh and flaky"], price: 3.25, tags: [] },
    { ru: ["Банановый хлеб", "Без яиц и молока"], en: ["Banana bread", "No eggs, no dairy"], price: 4.25, tags: ["vegan", "lf"] },
    { ru: ["Брауни на стевии", "Тёмный шоколад, без добавленного сахара"], en: ["Stevia brownie", "Dark chocolate, no added sugar"], price: 4.75, tags: ["sf"] },
  ],
};

// Подробности для карточки товара: состав, калории, можно ли выбрать молоко и сироп.
// Порядок совпадает с MENU.
const DETAILS = {
  coffee: [
    { kcal: 5,   milk: false, syrup: true, ru: "Двойная порция эспрессо из нашей арабики", en: "Double shot of our arabica" },
    { kcal: 10,  milk: true,  syrup: true, ru: "Эспрессо, горячая вода", en: "Espresso, hot water" },
    { kcal: 130, milk: true,  syrup: true, ru: "Эспрессо, молоко, молочная пена", en: "Espresso, milk, milk foam" },
    { kcal: 190, milk: true,  syrup: true, ru: "Эспрессо, много молока, тонкая пенка", en: "Espresso, lots of milk, thin foam" },
    { kcal: 320, milk: false, syrup: true, ru: "Эспрессо, сливки 10%, ванильный сахар, корица", en: "Espresso, 10% cream, vanilla sugar, cinnamon" },
    { kcal: 120, milk: true,  syrup: true, ru: "Двойной ристретто, молоко", en: "Double ristretto, milk" },
    { kcal: 150, milk: false, syrup: true, ru: "Эспрессо, овсяное молоко", en: "Espresso, oat milk" },
    { kcal: 290, milk: true,  syrup: true, ru: "Эспрессо, молоко, тыквенное пюре, корица, мускатный орех", en: "Espresso, milk, pumpkin purée, cinnamon, nutmeg" },
  ],
  tea: [
    { kcal: 2,   milk: false, syrup: false, ru: "Цейлонский чёрный чай, чабрец", en: "Ceylon black tea, thyme" },
    { kcal: 2,   milk: false, syrup: false, ru: "Зелёный чай с цветками жасмина", en: "Green tea with jasmine flowers" },
    { kcal: 90,  milk: false, syrup: false, ru: "Облепиха, мёд, апельсин, имбирь", en: "Sea buckthorn, honey, orange, ginger" },
    { kcal: 150, milk: true,  syrup: true,  ru: "Японская матча, молоко", en: "Japanese matcha, milk" },
  ],
  desserts: [
    { kcal: 420, ru: "Тесто на сливочном масле, корица, сливочный сыр", en: "Butter dough, cinnamon, cream cheese" },
    { kcal: 450, ru: "Сливочный сыр, песочная основа, ваниль", en: "Cream cheese, shortbread crust, vanilla" },
    { kcal: 410, ru: "Морковь, грецкие орехи, специи, крем-чиз", en: "Carrot, walnuts, spices, cream cheese frosting" },
    { kcal: 270, ru: "Слоёное тесто на сливочном масле", en: "Puff pastry with butter" },
    { kcal: 310, ru: "Бананы, мука, кокосовое масло, орехи", en: "Bananas, flour, coconut oil, nuts" },
    { kcal: 280, ru: "Тёмный шоколад 70%, стевия, миндальная мука", en: "70% dark chocolate, stevia, almond flour" },
  ],
};

// Молоко и сиропы (доплата в долларах)
const MILKS = {
  regular: { price: 0,   ru: "Обычное", en: "Regular" },
  oat:     { price: 0.5, ru: "Овсяное", en: "Oat" },
  almond:  { price: 0.5, ru: "Миндальное", en: "Almond" },
  lf:      { price: 0.5, ru: "Без лактозы", en: "Lactose-free" },
};
const SYRUPS = {
  vanilla:  { price: 0.6, ru: "Ваниль", en: "Vanilla" },
  caramel:  { price: 0.6, ru: "Карамель", en: "Caramel" },
  hazelnut: { price: 0.6, ru: "Лесной орех", en: "Hazelnut" },
  cinnamon: { price: 0.6, ru: "Корица", en: "Cinnamon" },
};
const CATEGORY_ICON = { coffee: "☕", tea: "🍵", desserts: "🍰" };

// Метки: значок и подпись
const TAGS = {
  vegan:  { icon: "🌱", ru: "Веган", en: "Vegan" },
  lf:     { icon: "🥛", ru: "Без лактозы", en: "Lactose-free" },
  sf:     { icon: "🚫", ru: "Без сахара", en: "Sugar-free" },
  hit:    { icon: "🔥", ru: "Хит", en: "Bestseller" },
  season: { icon: "🍂", ru: "Сезонное", en: "Seasonal" },
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
  "story.eyebrow": "Coffee Story", "story.title": "Where our beans come from",
  "story.lead": "Our arabica: Brazil & Ethiopia, medium roast, notes of chocolate and dried fruit.",
  "story.origin": "Origin", "story.brazil": "Brazil", "story.ethiopia": "Ethiopia",
  "story.brazil.note": "Body and chocolate sweetness", "story.ethiopia.note": "Brightness and fruity aroma",
  "story.roast": "Roast", "story.light": "Light", "story.medium": "Medium", "story.dark": "Dark",
  "story.roast.note": "Balanced: no bitterness, no sourness",
  "story.notes": "Tasting notes", "story.choc": "Chocolate", "story.fruit": "Dried fruit",
  "story.bean": "Bean", "story.arabica": "100% arabica", "story.bean.note": "Roasted fresh every week",
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
let currentFilter = "all"; // какая метка выбрана в фильтре

// Выбранный размер для каждого кофе (по умолчанию средний)
const chosenSize = {};

const money = (n) => "$" + n.toFixed(2);

function renderFilters() {
  const keys = ["all", ...Object.keys(TAGS)];
  document.getElementById("filters").innerHTML = keys.map((k) => {
    const label = k === "all" ? UI[lang].all : `${TAGS[k].icon} ${TAGS[k][lang]}`;
    return `<button type="button" class="filter${k === currentFilter ? " is-active" : ""}" data-filter="${k}">${label}</button>`;
  }).join("");
}

function renderMenu() {
  const list = document.getElementById("menu-list");
  // Сохраняем исходный номер позиции (i), чтобы корзина и размеры работали и с фильтром
  const items = MENU[currentTab]
    .map((item, i) => ({ item, i }))
    .filter(({ item }) => currentFilter === "all" || item.tags.includes(currentFilter));
  if (items.length === 0) {
    list.innerHTML = `<p class="menu__empty">${UI[lang].noItems}</p>`;
    return;
  }
  list.innerHTML = items.map(({ item, i }) => {
    const [name, desc] = item[lang];
    const hasSizes = Array.isArray(item.price);
    const size = chosenSize[i] ?? 1;
    const price = hasSizes ? item.price[size] : item.price;
    const badges = item.tags.length
      ? `<div class="badges">${item.tags.map((t) => `<span class="badge badge--${t}">${TAGS[t].icon} ${TAGS[t][lang]}</span>`).join("")}</div>`
      : "";
    const sizes = hasSizes
      ? `<div class="sizes"><span class="sizes__label">${SIZE_LABEL[lang]}</span>${SIZES[lang].map(([short, full], s) =>
          `<button type="button" class="size${s === size ? " is-active" : ""}" data-item="${i}" data-size="${s}" title="${full}">${short}</button>`
        ).join("")}<span class="sizes__hint">${SIZES[lang][size][1]}</span></div>`
      : "";
    return `<div class="item" data-i="${i}">
      <div class="item__top"><span class="item__name">${name}</span><span class="item__dots"></span><span class="item__price">${money(price)}</span></div>
      <p class="item__desc">${desc}</p>
      ${badges}
      <div class="item__bottom">${sizes}<div class="item__btns"><button type="button" class="more" data-more="${i}">${UI[lang].more}</button><button type="button" class="add" data-add="${i}">+ ${UI[lang].add}</button></div></div>
    </div>`;
  }).join("");
}

// Клик по фильтру
document.getElementById("filters").addEventListener("click", (e) => {
  const b = e.target.closest(".filter");
  if (!b) return;
  currentFilter = b.dataset.filter;
  renderFilters();
  renderMenu();
});

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
  if (!btn) {
    // Клик по «Подробнее» или по самой карточке открывает окно товара
    const more = e.target.closest(".more");
    const card = e.target.closest(".item");
    if (more) openProduct(currentTab, Number(more.dataset.more));
    else if (card && !e.target.closest("button")) openProduct(currentTab, Number(card.dataset.i));
    return;
  }
  const i = Number(btn.dataset.item);
  const size = Number(btn.dataset.size);
  chosenSize[i] = size;
  // Обновляем только эту позицию, без перерисовки всего меню
  const item = btn.closest(".item");
  item.querySelectorAll(".size").forEach((b) => b.classList.toggle("is-active", b === btn));
  item.querySelector(".item__price").textContent = money(MENU[currentTab][i].price[size]);
  item.querySelector(".sizes__hint").textContent = SIZES[lang][size][1];
});

// ===== Тексты интерфейса =====
const UI = {
  ru: {
    all: "Все", noItems: "В этой категории нет позиций с такой меткой. Попробуйте другую вкладку 🙂",
    add: "В корзину", added: "Добавлено", more: "Подробнее", cart: "Корзина", empty: "Корзина пуста. Загляните в меню ☕",
    total: "Итого", checkout: "Оформить заказ", clear: "Очистить корзину", remove: "Удалить",
    size: { 0: "маленький", 1: "средний", 2: "большой" },
    // карточка товара
    comp: "Состав", kcal: "ккал", kcalM: "для размера M", sizeT: "Размер", milkT: "Молоко", syrupT: "Сироп", syrupHint: "можно несколько, +$0.60 каждый",
    addFor: "Добавить", close: "Закрыть",
    // оформление
    form: "Оформление заказа", name: "Ваше имя", phone: "Телефон", time: "Когда заберёте?", comment: "Комментарий",
    commentPh: "Например: без крышки, побольше корицы", asap: "Как можно скорее (~10 мин)", inMin: (m) => `Через ${m} мин`,
    pay: "Оплата при получении: картой или наличными", confirm: "Подтвердить заказ", back: "← Назад в корзину",
    errName: "Введите имя (минимум 2 буквы)", errPhone: "Введите номер: минимум 10 цифр",
    doneTitle: (n) => `Заказ №${n} принят!`, doneReady: "Будет готов", doneWhen: (d, t) => `${d} в ${t}`,
    today: "сегодня", tomorrow: "завтра", tz: "по времени Портленда",
    doneText: (name) => `${name}, ждём вас по адресу: Честнат-стрит, 12. Назовите номер заказа бариста.`,
    demo: "Это демо: заказ никуда не отправляется, деньги не списываются.", toMenu: "Вернуться в меню",
    // статус и тема
    open: "Открыто", closed: "Закрыто", until: (t) => `до ${t}`, soon: (m) => `закроемся через ${m} мин`,
    opensAt: (d, t) => `откроемся ${d} в ${t}`, themeDark: "Тёмная тема", themeLight: "Светлая тема",
  },
  en: {
    all: "All", noItems: "No items with this label in this category. Try another tab 🙂",
    add: "Add to cart", added: "Added", more: "Details", cart: "Cart", empty: "Your cart is empty. Check out the menu ☕",
    total: "Total", checkout: "Checkout", clear: "Clear cart", remove: "Remove",
    size: { 0: "small", 1: "medium", 2: "large" },
    comp: "Ingredients", kcal: "kcal", kcalM: "for size M", sizeT: "Size", milkT: "Milk", syrupT: "Syrup", syrupHint: "pick any, +$0.60 each",
    addFor: "Add", close: "Close",
    form: "Checkout", name: "Your name", phone: "Phone", time: "Pickup time", comment: "Comment",
    commentPh: "E.g. no lid, extra cinnamon", asap: "As soon as possible (~10 min)", inMin: (m) => `In ${m} min`,
    pay: "Pay on pickup: card or cash", confirm: "Place order", back: "← Back to cart",
    errName: "Enter your name (at least 2 letters)", errPhone: "Enter a number: at least 10 digits",
    doneTitle: (n) => `Order #${n} confirmed!`, doneReady: "Ready", doneWhen: (d, t) => `${d} at ${t}`,
    today: "today", tomorrow: "tomorrow", tz: "Portland time",
    doneText: (name) => `${name}, see you at 12 Chestnut St. Just tell the barista your order number.`,
    demo: "This is a demo: the order isn't sent anywhere and no money is charged.", toMenu: "Back to menu",
    open: "Open", closed: "Closed", until: (t) => `until ${t}`, soon: (m) => `closing in ${m} min`,
    opensAt: (d, t) => `opens ${d} at ${t}`, themeDark: "Dark theme", themeLight: "Light theme",
  },
};

// ===== Часы работы и статус «Открыто / Закрыто» =====
// Кофейня в Портленде, поэтому время считаем по часовому поясу America/Los_Angeles.
const CAFE_TZ = "America/Los_Angeles";
// [открытие, закрытие] в минутах от полуночи. 0 = воскресенье ... 6 = суббота
const HOURS = { 0: [480, 1380], 1: [420, 1320], 2: [420, 1320], 3: [420, 1320], 4: [420, 1320], 5: [420, 1320], 6: [480, 1380] };

function cafeNow() {
  const parts = new Intl.DateTimeFormat("en-US", { timeZone: CAFE_TZ, weekday: "short", hour: "numeric", minute: "numeric", hourCycle: "h23" })
    .formatToParts(new Date());
  const get = (t) => parts.find((p) => p.type === t).value;
  const day = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].indexOf(get("weekday"));
  return { day, min: Number(get("hour")) * 60 + Number(get("minute")) };
}

function fmtTime(min) {
  min = ((min % 1440) + 1440) % 1440;
  const h = Math.floor(min / 60), m = min % 60;
  if (lang === "ru") return `${h}:${String(m).padStart(2, "0")}`;
  const h12 = h % 12 || 12;
  return `${h12}${m ? ":" + String(m).padStart(2, "0") : ""} ${h < 12 ? "AM" : "PM"}`;
}

function cafeStatus() {
  const { day, min } = cafeNow();
  const [open, close] = HOURS[day];
  if (min >= open && min < close) return { isOpen: true, close, left: close - min };
  if (min < open) return { isOpen: false, nextDay: UI[lang].today, nextOpen: open };
  return { isOpen: false, nextDay: UI[lang].tomorrow, nextOpen: HOURS[(day + 1) % 7][0] };
}

function renderStatus() {
  const t = UI[lang];
  const st = cafeStatus();
  let text;
  if (st.isOpen) text = `${t.open} · ${st.left <= 60 ? t.soon(st.left) : t.until(fmtTime(st.close))}`;
  else text = `${t.closed} · ${t.opensAt(st.nextDay, fmtTime(st.nextOpen))}`;
  document.querySelectorAll("[data-status]").forEach((el) => {
    el.classList.toggle("is-open", st.isOpen);
    el.classList.toggle("is-soon", st.isOpen && st.left <= 60);
    el.querySelector(".status__text").textContent = text;
  });
}
setInterval(renderStatus, 60 * 1000);

// ===== Корзина =====
// Каждая строка: { tab, i, size, milk, syrups, qty }. size = null для чая и десертов.
let cart = [];
try { cart = JSON.parse(localStorage.getItem("cart")) || []; } catch (e) { cart = []; }
let cartView = "list"; // list — список, form — оформление, done — заказ принят
let lastOrder = null;

const cartEl = document.getElementById("cart");
const overlay = document.getElementById("overlay");

function extrasPrice(milk, syrups) {
  return (MILKS[milk || "regular"]?.price || 0) + (syrups || []).reduce((s, k) => s + SYRUPS[k].price, 0);
}
function basePrice(tab, i, size) {
  const p = MENU[tab][i].price;
  return size === null ? p : p[size];
}
function unitPrice(row) {
  return basePrice(row.tab, row.i, row.size) + extrasPrice(row.milk, row.syrups);
}

function saveCart() {
  try { localStorage.setItem("cart", JSON.stringify(cart)); } catch (e) {}
}

function addToCart(tab, i, size, milk = "regular", syrups = [], qty = 1) {
  syrups = [...syrups].sort();
  const same = (r) => r.tab === tab && r.i === i && r.size === size &&
    (r.milk || "regular") === milk && (r.syrups || []).join() === syrups.join();
  const row = cart.find(same);
  if (row) row.qty += qty;
  else cart.push({ tab, i, size, milk, syrups, qty });
  if (cartView === "done") cartView = "list";
  saveCart();
  renderCart();
  const badge = document.getElementById("cart-count");
  badge.classList.remove("bump"); void badge.offsetWidth; badge.classList.add("bump");
}

function optionsText(r) {
  const t = UI[lang];
  const parts = [];
  if (r.size !== null) parts.push(`${SIZES[lang][r.size][0]} · ${t.size[r.size]}`);
  if (r.milk && r.milk !== "regular") parts.push(MILKS[r.milk][lang]);
  (r.syrups || []).forEach((k) => parts.push(SYRUPS[k][lang]));
  return parts.join(", ");
}

const cartTotal = () => cart.reduce((sum, r) => sum + unitPrice(r) * r.qty, 0);

function renderCart() {
  const t = UI[lang];
  const count = cart.reduce((sum, r) => sum + r.qty, 0);
  document.getElementById("cart-count").textContent = count;
  document.getElementById("cart-count").hidden = count === 0;
  document.getElementById("cart-title").textContent = cartView === "form" ? t.form : t.cart;
  document.getElementById("cart-total-label").textContent = t.total;
  document.getElementById("cart-total").textContent = money(cartTotal());
  const foot = document.querySelector(".cart__foot");
  const checkout = document.getElementById("checkout");
  const clear = document.getElementById("clear");
  const list = document.getElementById("cart-list");

  foot.hidden = cartView === "done";
  checkout.textContent = cartView === "form" ? t.confirm : t.checkout;
  clear.textContent = cartView === "form" ? t.back : t.clear;
  checkout.disabled = count === 0;
  clear.disabled = count === 0 && cartView !== "form";

  if (cartView === "done") { list.innerHTML = doneHTML(); return; }
  if (cartView === "form") { renderForm(); return; }

  if (cart.length === 0) {
    list.innerHTML = `<p class="cart__empty">${t.empty}</p>`;
    return;
  }
  list.innerHTML = cart.map((r, k) => {
    const name = MENU[r.tab][r.i][lang][0];
    const opts = optionsText(r);
    return `<div class="cart__row">
      <div class="cart__info">
        <div class="cart__name">${name}</div>
        ${opts ? `<span class="cart__size">${opts}</span>` : ""}
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

// ----- Форма оформления -----
const formData = { name: "", phone: "", time: "0", comment: "" };

function renderForm() {
  const t = UI[lang];
  const times = [0, 15, 30, 45, 60];
  const summary = cart.map((r) => `<li><span>${r.qty} × ${MENU[r.tab][r.i][lang][0]}${optionsText(r) ? ` <small>(${optionsText(r)})</small>` : ""}</span><b>${money(unitPrice(r) * r.qty)}</b></li>`).join("");
  document.getElementById("cart-list").innerHTML = `
    <form class="order" id="order-form" novalidate>
      <ul class="order__summary">${summary}</ul>
      <label class="field"><span>${t.name} *</span>
        <input name="name" autocomplete="name" value="${escapeHTML(formData.name)}" placeholder="John">
        <em class="field__err" data-err="name"></em></label>
      <label class="field"><span>${t.phone} *</span>
        <input name="phone" type="tel" autocomplete="tel" value="${escapeHTML(formData.phone)}" placeholder="+1 (555) 123-4567">
        <em class="field__err" data-err="phone"></em></label>
      <label class="field"><span>${t.time}</span>
        <select name="time">${times.map((m) => `<option value="${m}"${String(m) === formData.time ? " selected" : ""}>${m === 0 ? t.asap : t.inMin(m)}</option>`).join("")}</select></label>
      <label class="field"><span>${t.comment}</span>
        <textarea name="comment" rows="2" placeholder="${t.commentPh}">${escapeHTML(formData.comment)}</textarea></label>
      <p class="order__pay">💳 ${t.pay}</p>
    </form>`;
  const form = document.getElementById("order-form");
  form.addEventListener("input", (e) => {
    formData[e.target.name] = e.target.value;
    const err = form.querySelector(`[data-err="${e.target.name}"]`);
    if (err) { err.textContent = ""; e.target.classList.remove("is-error"); }
  });
  form.addEventListener("submit", (e) => { e.preventDefault(); submitOrder(); });
}

function escapeHTML(str) {
  return String(str).replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));
}

function submitOrder() {
  const t = UI[lang];
  const form = document.getElementById("order-form");
  let ok = true;
  const setErr = (field, msg) => {
    form.querySelector(`[data-err="${field}"]`).textContent = msg;
    form.elements[field].classList.toggle("is-error", !!msg);
    if (msg && ok) form.elements[field].focus();
    if (msg) ok = false;
  };
  setErr("name", formData.name.trim().length >= 2 ? "" : t.errName);
  setErr("phone", formData.phone.replace(/\D/g, "").length >= 10 ? "" : t.errPhone);
  if (!ok) return;

  // Время готовности: сейчас + выбранные минуты (минимум 10). Если кофейня закрыта, то к открытию + 15 минут.
  const wait = Math.max(10, Number(formData.time));
  const { day, min } = cafeNow();
  let ready = min + wait, readyDay = "today";
  const [open, close] = HOURS[day];
  if (min < open) ready = Math.max(ready, open + 15);
  else if (ready >= close) { ready = HOURS[(day + 1) % 7][0] + 15; readyDay = "tomorrow"; }
  ready = Math.ceil(ready / 5) * 5; // округляем до 5 минут

  lastOrder = { no: Math.floor(1000 + Math.random() * 9000), name: formData.name.trim(), ready, readyDay, total: cartTotal() };
  cart = [];
  saveCart();
  formData.comment = "";
  cartView = "done";
  renderCart();
}

function doneHTML() {
  const t = UI[lang];
  const o = lastOrder;
  return `<div class="done">
    <div class="done__icon">✅</div>
    <h4>${t.doneTitle(o.no)}</h4>
    <p class="done__ready">${t.doneReady} <b>${t.doneWhen(t[o.readyDay], fmtTime(o.ready))}</b><br><small>${t.tz}</small></p>
    <p>${t.doneText(escapeHTML(o.name))}</p>
    <p class="done__total">${t.total}: <b>${money(o.total)}</b></p>
    <p class="done__demo">${t.demo}</p>
    <button type="button" class="btn btn--primary" id="done-close">${t.toMenu}</button>
  </div>`;
}

function openCart() {
  if (cartView === "done") cartView = "list";
  renderCart();
  cartEl.classList.add("is-open");
  overlay.classList.add("is-open");
  document.body.style.overflow = "hidden";
}
function closeCart() {
  cartEl.classList.remove("is-open");
  overlay.classList.remove("is-open");
  document.body.style.overflow = "";
  if (cartView === "form") { cartView = "list"; renderCart(); }
}

document.getElementById("cart-open").addEventListener("click", openCart);
document.getElementById("cart-close").addEventListener("click", closeCart);
overlay.addEventListener("click", closeCart);

// Кнопки внутри корзины: −, +, удалить, «Вернуться в меню»
document.getElementById("cart-list").addEventListener("click", (e) => {
  const b = e.target.closest("button");
  if (!b) return;
  if (b.id === "done-close") {
    closeCart();
    cartView = "list";
    renderCart();
    document.getElementById("menu").scrollIntoView({ behavior: "smooth" });
    return;
  }
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

// Нижние кнопки: в режиме списка «Оформить» / «Очистить», в режиме формы «Подтвердить» / «Назад»
document.getElementById("clear").addEventListener("click", () => {
  if (cartView === "form") cartView = "list";
  else cart = [];
  saveCart();
  renderCart();
});
document.getElementById("checkout").addEventListener("click", () => {
  if (cartView === "form") { submitOrder(); return; }
  cartView = "form";
  renderCart();
  document.querySelector('#order-form [name="name"]').focus();
});

// ===== Окно товара =====
const productEl = document.getElementById("product");
let pm = null; // { tab, i, size, milk, syrups: [], qty }

function openProduct(tab, i) {
  const hasSizes = Array.isArray(MENU[tab][i].price);
  pm = { tab, i, size: hasSizes ? (chosenSize[i] ?? 1) : null, milk: "regular", syrups: [], qty: 1 };
  renderProduct();
  productEl.hidden = false;
  requestAnimationFrame(() => productEl.classList.add("is-open"));
  document.body.style.overflow = "hidden";
  document.getElementById("p-close").focus();
}
function closeProduct() {
  if (productEl.hidden) return;
  productEl.classList.remove("is-open");
  document.body.style.overflow = "";
  setTimeout(() => { productEl.hidden = true; }, 250);
}

function renderProduct() {
  if (!pm) return;
  const t = UI[lang];
  const item = MENU[pm.tab][pm.i];
  const d = DETAILS[pm.tab][pm.i];
  const [name, desc] = item[lang];
  const unit = basePrice(pm.tab, pm.i, pm.size) + extrasPrice(pm.milk, pm.syrups);
  const badges = item.tags.map((k) => `<span class="badge badge--${k}">${TAGS[k].icon} ${TAGS[k][lang]}</span>`).join("");
  const sizes = pm.size === null ? "" : `
    <div class="pm__group"><h4>${t.sizeT}</h4><div class="seg">
      ${SIZES[lang].map(([short, full], s) => `<button type="button" class="seg__btn${s === pm.size ? " is-active" : ""}" data-psize="${s}">
        <b>${short}</b><small>${full.split(", ")[1]}</small><small>${money(item.price[s])}</small></button>`).join("")}
    </div></div>`;
  const milks = !d.milk ? "" : `
    <div class="pm__group"><h4>${t.milkT}</h4><div class="chips">
      ${Object.entries(MILKS).map(([k, m]) => `<button type="button" class="chip${k === pm.milk ? " is-active" : ""}" data-milk="${k}">${m[lang]}${m.price ? ` +${money(m.price)}` : ""}</button>`).join("")}
    </div></div>`;
  const syrups = !d.syrup ? "" : `
    <div class="pm__group"><h4>${t.syrupT} <small>${t.syrupHint}</small></h4><div class="chips">
      ${Object.entries(SYRUPS).map(([k, sy]) => `<button type="button" class="chip${pm.syrups.includes(k) ? " is-active" : ""}" data-syrup="${k}">${sy[lang]}</button>`).join("")}
    </div></div>`;

  document.getElementById("p-body").innerHTML = `
    <div class="pm__hero pm__hero--${pm.tab}"><span>${CATEGORY_ICON[pm.tab]}</span></div>
    <div class="pm__content">
      <h3 id="p-name">${name}</h3>
      <p class="pm__desc">${desc}</p>
      ${badges ? `<div class="badges">${badges}</div>` : ""}
      <div class="pm__group"><h4>${t.comp}</h4><p>${d[lang]}</p>
        <p class="pm__kcal">≈ ${d.kcal} ${t.kcal}${pm.size !== null ? ` · ${t.kcalM}` : ""}</p></div>
      ${sizes}${milks}${syrups}
    </div>
    <div class="pm__foot">
      <div class="qty">
        <button type="button" data-pqty="-1" aria-label="−1">−</button>
        <span>${pm.qty}</span>
        <button type="button" data-pqty="1" aria-label="+1">+</button>
      </div>
      <button type="button" class="btn btn--primary pm__add" data-padd>${t.addFor} · ${money(unit * pm.qty)}</button>
    </div>`;
  document.getElementById("p-close").setAttribute("aria-label", t.close);
}

productEl.addEventListener("click", (e) => {
  if (e.target === productEl || e.target.closest("#p-close")) { closeProduct(); return; }
  const b = e.target.closest("button");
  if (!b || !pm) return;
  if (b.dataset.psize !== undefined) pm.size = Number(b.dataset.psize);
  if (b.dataset.milk) pm.milk = b.dataset.milk;
  if (b.dataset.syrup) {
    const k = b.dataset.syrup;
    pm.syrups = pm.syrups.includes(k) ? pm.syrups.filter((x) => x !== k) : [...pm.syrups, k];
  }
  if (b.dataset.pqty) pm.qty = Math.max(1, pm.qty + Number(b.dataset.pqty));
  if (b.dataset.padd !== undefined) {
    addToCart(pm.tab, pm.i, pm.size, pm.milk, pm.syrups, pm.qty);
    closeProduct();
    return;
  }
  renderProduct();
});

document.addEventListener("keydown", (e) => {
  if (e.key !== "Escape") return;
  if (!productEl.hidden) closeProduct();
  else closeCart();
});

// ===== Язык =====
function setLang(next) {
  lang = next;
  const dict = lang === "en" ? EN : RU;
  document.querySelectorAll("[data-i18n]").forEach((el) => { el.textContent = dict[el.dataset.i18n]; });
  document.documentElement.lang = lang;
  document.getElementById("lang").textContent = lang === "ru" ? "EN" : "RU";
  document.title = lang === "ru" ? "Coffee & Chill — кофейня" : "Coffee & Chill — coffee house";
  document.getElementById("cart-open").setAttribute("aria-label", UI[lang].cart);
  renderFilters();
  renderMenu();
  renderCart();
  renderStatus();
  renderProduct();
  updateThemeButton();
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

// ===== Тёмная тема =====
// Тема ставится ещё в <head> (чтобы не было вспышки), здесь только кнопка.
const themeBtn = document.getElementById("theme");
function updateThemeButton() {
  const dark = document.documentElement.dataset.theme === "dark";
  themeBtn.textContent = dark ? "☀️" : "🌙";
  const label = dark ? UI[lang].themeLight : UI[lang].themeDark;
  themeBtn.setAttribute("aria-label", label);
  themeBtn.title = label;
}
themeBtn.addEventListener("click", () => {
  const next = document.documentElement.dataset.theme === "dark" ? "light" : "dark";
  document.documentElement.dataset.theme = next;
  try { localStorage.setItem("theme", next); } catch (e) {}
  updateThemeButton();
});

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

// ===== Анимации при прокрутке =====
// Блоки плавно появляются, когда до них долистываешь.
(function reveal() {
  const targets = document.querySelectorAll(
    ".section__title, .about__photo, .about p, .facts, .story__eyebrow, .story__lead, .story__card, " +
    ".tabs, .filters, .gallery .photo, .review, .contacts__list, .map"
  );
  if (!("IntersectionObserver" in window)) return;
  // Элементы одной сетки появляются по очереди
  targets.forEach((el) => {
    const siblings = [...el.parentElement.children].filter((c) => c.classList.contains(el.classList[0]));
    el.style.setProperty("--d", `${Math.min(siblings.indexOf(el), 5) * 90}ms`);
    el.classList.add("reveal");
  });
  const io = new IntersectionObserver((entries) => {
    entries.forEach((en) => {
      if (en.isIntersecting) { en.target.classList.add("is-visible"); io.unobserve(en.target); }
    });
  }, { threshold: 0.15, rootMargin: "0px 0px -40px 0px" });
  targets.forEach((el) => io.observe(el));
})();

// Старт
let saved = "ru";
try { saved = localStorage.getItem("lang") || "ru"; } catch (e) {}
setLang(saved);
