/* ============================================================
   Ledger Supply Co. — cart logic
   Temple Essien / AK22/PHS/CSC/042
   Plain JavaScript. No libraries.

   The single source of truth is the `cart` array below.
   The DOM never stores state — it is redrawn from `cart`
   every time `cart` changes.
   ============================================================ */

/* ---------- Catalogue ---------- */
const PRODUCTS = [
  { id: 1, icon: '\u{1F510}', tag: 'Hardware',   name: 'Vault One Signer',      price: 148000, desc: 'Air-gapped signing device. Secure element, no radio, no USB data lines.' },
  { id: 2, icon: '\u{1F5DD}', tag: 'Hardware',   name: 'Vault Mini',            price:  86000, desc: 'Entry-level cold wallet. Same secure element, smaller screen, half the price.' },
  { id: 3, icon: '\u{1F9F1}', tag: 'Backup',     name: 'Steel Seed Plate',      price:  42000, desc: 'Stamped titanium seed backup. Rated to 1,400°C. Fire will not read your keys.' },
  { id: 4, icon: '\u{1F4E1}', tag: 'Accessory',  name: 'Faraday Pouch',         price:  15500, desc: 'Signal-blocking sleeve. Kills NFC, cellular, and Wi-Fi while the device is inside.' },
  { id: 5, icon: '\u{1F50C}', tag: 'Accessory',  name: 'Data-Blocker Cable',    price:   9800, desc: 'Power-only USB-C. Charges the device without exposing a data path.' },
  { id: 6, icon: '\u{1F4BC}', tag: 'Bundle',     name: 'Full Custody Kit',      price: 205000, desc: 'Vault One, a steel plate, a Faraday pouch, and the blocker cable. Everything, once.' }
];

const SHIPPING_FLAT = 3500;   // Naira
const FREE_OVER     = 150000; // Free shipping threshold

/* ---------- State ---------- */
let cart = [];   // [{ id, qty }]

/* ---------- Helpers ---------- */
const $ = (sel) => document.querySelector(sel);

function naira(n) {
  return '\u20A6' + n.toLocaleString('en-NG');
}

function findProduct(id) {
  return PRODUCTS.find((p) => p.id === id);
}

/* ---------- Cart operations ---------- */
function addToCart(id) {
  const line = cart.find((item) => item.id === id);
  if (line) {
    line.qty += 1;
  } else {
    cart.push({ id: id, qty: 1 });
  }
  flashButton(id);
  renderCart();
}

function changeQty(id, delta) {
  const line = cart.find((item) => item.id === id);
  if (!line) return;

  line.qty += delta;
  if (line.qty < 1) {
    removeFromCart(id);
    return;
  }
  renderCart();
}

function removeFromCart(id) {
  cart = cart.filter((item) => item.id !== id);
  renderCart();
}

function emptyCart() {
  cart = [];
  renderCart();
}

/* ---------- Totals ---------- */
function subtotal() {
  return cart.reduce((sum, item) => sum + findProduct(item.id).price * item.qty, 0);
}

function shippingCost() {
  if (cart.length === 0) return 0;
  return subtotal() >= FREE_OVER ? 0 : SHIPPING_FLAT;
}

function itemCount() {
  return cart.reduce((n, item) => n + item.qty, 0);
}

/* ---------- Rendering: catalogue ---------- */
function renderProducts() {
  const grid = $('#product-grid');
  grid.innerHTML = '';

  PRODUCTS.forEach((p) => {
    const card = document.createElement('article');
    card.className = 'card';
    card.innerHTML =
      '<div class="thumb">' + p.icon + '</div>' +
      '<div class="body">' +
        '<span class="tag">' + p.tag + '</span>' +
        '<h3>' + p.name + '</h3>' +
        '<p class="desc">' + p.desc + '</p>' +
        '<div class="foot">' +
          '<span class="price">' + naira(p.price) + '</span>' +
          '<button class="add-btn" data-add="' + p.id + '">Add to cart</button>' +
        '</div>' +
      '</div>';
    grid.appendChild(card);
  });
}

/* Brief confirmation on the button that was pressed */
function flashButton(id) {
  const btn = document.querySelector('[data-add="' + id + '"]');
  if (!btn) return;

  btn.textContent = 'Added \u2713';
  btn.classList.add('added');

  setTimeout(() => {
    btn.textContent = 'Add to cart';
    btn.classList.remove('added');
  }, 900);
}

/* ---------- Rendering: cart ---------- */
function renderCart() {
  const body    = $('#cart-body');
  const summary = $('#cart-summary');

  body.innerHTML = '';

  if (cart.length === 0) {
    body.innerHTML = '<div class="empty">Cart is empty. Add something from the catalogue above.</div>';
    summary.hidden = true;
    return;
  }

  summary.hidden = false;

  cart.forEach((item) => {
    const p    = findProduct(item.id);
    const line = p.price * item.qty;

    const row = document.createElement('div');
    row.className = 'row';
    row.innerHTML =
      '<span class="ico">' + p.icon + '</span>' +
      '<div class="info">' +
        '<div class="nm">' + p.name + '</div>' +
        '<div class="ea">' + naira(p.price) + ' each</div>' +
      '</div>' +
      '<div class="qty">' +
        '<button data-dec="' + p.id + '" aria-label="Reduce quantity">\u2212</button>' +
        '<span class="count">' + item.qty + '</span>' +
        '<button data-inc="' + p.id + '" aria-label="Increase quantity">+</button>' +
      '</div>' +
      '<span class="sum">' + naira(line) + '</span>' +
      '<button class="kill" data-kill="' + p.id + '" aria-label="Remove item">\u00D7</button>';

    body.appendChild(row);
  });

  const ship = shippingCost();
  $('#subtotal').textContent = naira(subtotal());
  $('#shipping').textContent = ship === 0 ? 'Free' : naira(ship);
  $('#total').textContent    = naira(subtotal() + ship);
}

/* ---------- Checkout ---------- */
function checkout() {
  if (cart.length === 0) return;

  const count = itemCount();
  const paid  = subtotal() + shippingCost();
  const ref   = 'LSC-' + Math.floor(100000 + Math.random() * 900000);

  $('#receipt-head').textContent = 'Order ' + ref + ' confirmed.';
  $('#receipt-body').innerHTML =
    count + (count === 1 ? ' item' : ' items') + ' \u2014 ' + naira(paid) + ' charged.<br>' +
    'A confirmation is on its way to your inbox. Ships within two working days.';

  $('#receipt').hidden = false;
  $('#cart').scrollIntoView({ behavior: 'smooth' });

  emptyCart();
}

/* ---------- Event wiring (delegated) ---------- */
document.addEventListener('click', (e) => {
  const t = e.target;

  if (t.dataset.add)  addToCart(Number(t.dataset.add));
  if (t.dataset.inc)  changeQty(Number(t.dataset.inc),  1);
  if (t.dataset.dec)  changeQty(Number(t.dataset.dec), -1);
  if (t.dataset.kill) removeFromCart(Number(t.dataset.kill));
});

$('#checkout-btn').addEventListener('click', checkout);
$('#clear-btn').addEventListener('click', emptyCart);
$('#receipt-btn').addEventListener('click', () => {
  $('#receipt').hidden = true;
  $('#catalogue').scrollIntoView({ behavior: 'smooth' });
});

/* ---------- Boot ---------- */
renderProducts();
renderCart();
