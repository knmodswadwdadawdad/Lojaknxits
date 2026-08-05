const products = [
  {
    id: "ff-pro-max",
    game: "free-fire",
    gameLabel: "Free Fire",
    title: "Sensi FFH4X Pro Max Android — Atualizada 🎯",
    artTitle: "SENSI FF",
    artSub: "PERFEITA",
    artTag: "MÁXIMO DE CAPA",
    oldPrice: 59.90,
    price: 19.90,
    theme: "green"
  },
  {
    id: "ff-xitada",
    game: "free-fire",
    gameLabel: "Free Fire",
    title: "Sensi Mobile Xitada Android — Precisão FF 🔥",
    artTitle: "SENSI",
    artSub: "XITADA MOBILE",
    artTag: "ALTA PRECISÃO",
    oldPrice: 69.90,
    price: 24.90,
    theme: "cyan"
  },
  {
    id: "ff-emulator",
    game: "free-fire",
    gameLabel: "Free Fire",
    title: "Sensi Emulador Mobile — Controle Total 🎮",
    artTitle: "SENSI",
    artSub: "NÍVEL EMULADOR",
    artTag: "CONTROLE TOTAL",
    oldPrice: 79.90,
    price: 29.90,
    theme: "purple"
  },
  {
    id: "ff-ranked",
    game: "free-fire",
    gameLabel: "Free Fire",
    title: "Sensi Competitiva Android — Ranqueada 🏆",
    artTitle: "SENSI",
    artSub: "COMPETITIVA",
    artTag: "RANQUEADA",
    oldPrice: 89.90,
    price: 29.90,
    theme: "red"
  },
  {
    id: "bs-tracking",
    game: "blood-strike",
    gameLabel: "Blood Strike",
    title: "Sensi Tracking Pro Mobile — Precisão e Controle",
    artTitle: "TRACKING",
    artSub: "PRO MOBILE",
    artTag: "BLOOD STRIKE",
    oldPrice: 64.90,
    price: 22.90,
    theme: "blue"
  },
  {
    id: "cod-tactical",
    game: "cod-mobile",
    gameLabel: "COD Mobile",
    title: "Sensi Tactical Mobile — Mira Estável e Rápida",
    artTitle: "TACTICAL",
    artSub: "MOBILE PRO",
    artTag: "COD MOBILE",
    oldPrice: 74.90,
    price: 27.90,
    theme: "orange"
  }
];

const state = {
  filter: "all",
  search: "",
  cart: loadCart()
};

const els = {
  productGrid: document.getElementById("productGrid"),
  emptyState: document.getElementById("emptyState"),
  categoryChips: document.getElementById("categoryChips"),
  sectionTitle: document.getElementById("sectionTitle"),
  productSearch: document.getElementById("productSearch"),
  searchPanel: document.getElementById("searchPanel"),
  searchToggle: document.getElementById("searchToggle"),
  searchClose: document.getElementById("searchClose"),
  exploreButton: document.getElementById("exploreButton"),
  seeAll: document.getElementById("seeAll"),
  cartToggle: document.getElementById("cartToggle"),
  cartClose: document.getElementById("cartClose"),
  cartDrawer: document.getElementById("cartDrawer"),
  cartItems: document.getElementById("cartItems"),
  cartEmpty: document.getElementById("cartEmpty"),
  cartFooter: document.getElementById("cartFooter"),
  cartTotal: document.getElementById("cartTotal"),
  cartCount: document.getElementById("cartCount"),
  checkoutButton: document.getElementById("checkoutButton"),
  overlay: document.getElementById("overlay"),
  toast: document.getElementById("toast"),
  accountButton: document.getElementById("accountButton"),
  menuToggle: document.getElementById("menuToggle"),
  mobileMenu: document.getElementById("mobileMenu"),
  year: document.getElementById("year")
};

function formatPrice(value) {
  return value.toLocaleString("pt-BR", {
    style: "currency",
    currency: "BRL"
  });
}

function discountPercent(oldPrice, price) {
  return Math.round((1 - price / oldPrice) * 100);
}

function loadCart() {
  try {
    const saved = JSON.parse(localStorage.getItem("knxits-cart") || "[]");
    if (!Array.isArray(saved)) return [];
    return saved.filter(id => products.some(product => product.id === id));
  } catch (error) {
    return [];
  }
}

function saveCart() {
  localStorage.setItem("knxits-cart", JSON.stringify(state.cart));
}

function cartIcon() {
  return `
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path d="M3 4h2l2.2 10.1a2 2 0 0 0 2 1.6h7.7a2 2 0 0 0 2-1.6L20.5 8H6"></path>
      <circle cx="9" cy="20" r="1"></circle>
      <circle cx="18" cy="20" r="1"></circle>
    </svg>
  `;
}

function pixIcon() {
  return `
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path d="m8.2 5.1 3.8-3.8 3.8 3.8a3.4 3.4 0 0 0 4.8 0"></path>
      <path d="m18.9 8.2 3.8 3.8-3.8 3.8a3.4 3.4 0 0 0 0 4.8"></path>
      <path d="m15.8 18.9-3.8 3.8-3.8-3.8a3.4 3.4 0 0 0-4.8 0"></path>
      <path d="m5.1 15.8-3.8-3.8 3.8-3.8a3.4 3.4 0 0 0 0-4.8"></path>
      <path d="m8 8 8 8m0-8-8 8"></path>
    </svg>
  `;
}

function boltIcon() {
  return `
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path d="m13 2-8 12h7l-1 8 8-12h-7l1-8Z"></path>
    </svg>
  `;
}

function productTemplate(product) {
  const discount = discountPercent(product.oldPrice, product.price);

  return `
    <article class="product-card theme-${product.theme}" data-id="${product.id}">
      <div class="product-art">
        <span class="flash-badge">ϟ</span>
        <span class="art-crosshair"></span>
        <span class="art-panel"></span>
        <div class="art-title">
          <div>
            <strong>${product.artTitle}</strong>
            <em>${product.artSub}</em>
          </div>
          <small>${product.artTag}</small>
        </div>
      </div>

      <div class="product-body">
        <h3 class="product-title">${product.title}</h3>

        <div class="product-price-row">
          <span class="old-price">${formatPrice(product.oldPrice)}</span>
          <span class="discount">↘ ${discount}%</span>
        </div>

        <strong class="current-price">${formatPrice(product.price)}</strong>

        <div class="pix-row">
          <span>À vista no PIX</span>
          <div class="mini-actions">
            <button class="product-mini-action" type="button" data-info="pix" aria-label="Pagamento via Pix">${pixIcon()}</button>
            <button class="product-mini-action" type="button" data-info="delivery" aria-label="Entrega digital">${boltIcon()}</button>
          </div>
        </div>

        <button class="product-buy" type="button" data-buy="${product.id}">
          ${cartIcon()}
          Comprar agora
        </button>
      </div>
    </article>
  `;
}

function getFilteredProducts() {
  const term = state.search.trim().toLowerCase();

  return products.filter(product => {
    const filterMatch = state.filter === "all" || product.game === state.filter;
    const text = `${product.title} ${product.gameLabel} ${product.artTitle} ${product.artSub}`.toLowerCase();
    const searchMatch = !term || text.includes(term);
    return filterMatch && searchMatch;
  });
}

function renderProducts() {
  const filtered = getFilteredProducts();
  els.productGrid.innerHTML = filtered.map(productTemplate).join("");
  els.productGrid.style.display = filtered.length ? "grid" : "none";
  els.emptyState.style.display = filtered.length ? "none" : "grid";
}

function updateSectionTitle() {
  const labels = {
    all: "SENSIS EM DESTAQUE",
    "free-fire": "SENSI FREE FIRE ANDROID",
    "blood-strike": "SENSI BLOOD STRIKE",
    "cod-mobile": "SENSI COD MOBILE"
  };

  els.sectionTitle.textContent = labels[state.filter] || labels.all;
}

function applyFilter(filter) {
  state.filter = filter;
  document.querySelectorAll(".category-chip").forEach(button => {
    button.classList.toggle("active", button.dataset.filter === filter);
  });
  updateSectionTitle();
  renderProducts();
}

function cartItemTemplate(product) {
  return `
    <div class="cart-item">
      <div class="cart-thumb">K</div>
      <div class="cart-item-copy">
        <strong>${product.title}</strong>
        <span>${product.gameLabel}</span>
      </div>
      <div class="cart-item-side">
        <strong>${formatPrice(product.price)}</strong>
        <button type="button" data-remove="${product.id}">Remover</button>
      </div>
    </div>
  `;
}

function renderCart() {
  const cartProducts = state.cart
    .map(id => products.find(product => product.id === id))
    .filter(Boolean);

  const total = cartProducts.reduce((sum, product) => sum + product.price, 0);

  els.cartItems.innerHTML = cartProducts.map(cartItemTemplate).join("");
  els.cartCount.textContent = String(cartProducts.length);
  els.cartTotal.textContent = formatPrice(total);

  const hasProducts = cartProducts.length > 0;
  els.cartItems.style.display = hasProducts ? "block" : "none";
  els.cartEmpty.style.display = hasProducts ? "grid" : "none";
  els.cartFooter.style.display = hasProducts ? "block" : "none";
}

function addToCart(productId, openAfter = false) {
  const product = products.find(item => item.id === productId);
  if (!product) return;

  if (!state.cart.includes(productId)) {
    state.cart.push(productId);
    saveCart();
    renderCart();
    showToast(`${product.title} adicionado.`);
  } else {
    showToast("Esse produto já está no carrinho.");
  }

  if (openAfter) {
    setTimeout(openCart, 180);
  }
}

function removeFromCart(productId) {
  state.cart = state.cart.filter(id => id !== productId);
  saveCart();
  renderCart();
}

function openCart() {
  els.cartDrawer.classList.add("open");
  els.overlay.classList.add("show");
  document.body.classList.add("locked");
}

function closeCart() {
  els.cartDrawer.classList.remove("open");
  els.overlay.classList.remove("show");
  document.body.classList.remove("locked");
}

function openSearch() {
  els.searchPanel.classList.add("open");
  document.getElementById("produtos").scrollIntoView({ behavior: "smooth", block: "start" });
  setTimeout(() => els.productSearch.focus(), 400);
}

function closeSearch() {
  els.searchPanel.classList.remove("open");
  els.productSearch.blur();
}

let toastTimer;
function showToast(message) {
  els.toast.querySelector("p").textContent = message;
  els.toast.classList.add("show");
  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => els.toast.classList.remove("show"), 2200);
}

els.categoryChips.addEventListener("click", event => {
  const button = event.target.closest("[data-filter]");
  if (!button) return;
  applyFilter(button.dataset.filter);
});

els.productSearch.addEventListener("input", event => {
  state.search = event.target.value;
  renderProducts();
});

els.productGrid.addEventListener("click", event => {
  const buyButton = event.target.closest("[data-buy]");
  if (buyButton) {
    addToCart(buyButton.dataset.buy, true);
    return;
  }

  const infoButton = event.target.closest("[data-info]");
  if (infoButton) {
    if (infoButton.dataset.info === "pix") showToast("Pagamento via PIX será habilitado no checkout.");
    if (infoButton.dataset.info === "delivery") showToast("Produto com entrega digital após confirmação.");
  }
});

els.cartItems.addEventListener("click", event => {
  const button = event.target.closest("[data-remove]");
  if (!button) return;
  removeFromCart(button.dataset.remove);
});

els.searchToggle.addEventListener("click", openSearch);
els.searchClose.addEventListener("click", closeSearch);

els.exploreButton.addEventListener("click", () => {
  els.categoryChips.scrollIntoView({ behavior: "smooth", block: "center" });
  showToast("Escolha uma categoria abaixo.");
});

els.seeAll.addEventListener("click", () => {
  state.search = "";
  els.productSearch.value = "";
  applyFilter("all");
});

els.cartToggle.addEventListener("click", openCart);
els.cartClose.addEventListener("click", closeCart);
els.overlay.addEventListener("click", closeCart);

els.accountButton.addEventListener("click", () => {
  showToast("Área da conta pronta para conectar ao login.");
});

els.checkoutButton.addEventListener("click", () => {
  showToast("Próximo passo: conectar PIX/cartão ao checkout.");
});

els.menuToggle.addEventListener("click", () => {
  const open = els.mobileMenu.classList.toggle("open");
  els.menuToggle.classList.toggle("active", open);
});

els.mobileMenu.addEventListener("click", event => {
  if (!event.target.closest("a")) return;
  els.mobileMenu.classList.remove("open");
  els.menuToggle.classList.remove("active");
});

document.addEventListener("keydown", event => {
  if (event.key === "Escape") {
    closeCart();
    closeSearch();
    els.mobileMenu.classList.remove("open");
    els.menuToggle.classList.remove("active");
  }
});

els.year.textContent = String(new Date().getFullYear());
updateSectionTitle();
renderProducts();
renderCart();
