const products = [
  {
    id: "ff-competitive",
    game: "free-fire",
    gameLabel: "Free Fire",
    title: "Sensi Competitiva",
    subtitle: "Controle + precisão",
    price: 12.90,
    code: "PROFILE / FF01",
    description: "Perfil equilibrado para quem quer movimentação rápida sem perder controle na puxada. Ideal como base para ajustar ao seu aparelho.",
    features: ["Configuração geral", "Ajustes por mira", "Orientação de adaptação", "Entrega digital"]
  },
  {
    id: "ff-rush",
    game: "free-fire",
    gameLabel: "Free Fire",
    title: "Sensi Rush",
    subtitle: "Rápida + responsiva",
    price: 14.90,
    code: "PROFILE / FF02",
    description: "Perfil voltado para gameplay agressiva, trocas rápidas e resposta mais solta nos movimentos de câmera.",
    features: ["Perfil para rush", "Ajustes de câmera", "Configuração de mira", "Guia de adaptação"]
  },
  {
    id: "ff-balanced",
    game: "free-fire",
    gameLabel: "Free Fire",
    title: "Sensi Balance",
    subtitle: "Suave + versátil",
    price: 9.90,
    code: "PROFILE / FF03",
    description: "Uma configuração mais neutra para quem prefere equilíbrio entre velocidade, estabilidade e conforto.",
    features: ["Perfil balanceado", "Boa base para iniciantes", "Ajustes organizados", "Entrega digital"]
  },
  {
    id: "bs-precision",
    game: "blood-strike",
    gameLabel: "Blood Strike",
    title: "Precision Setup",
    subtitle: "Tracking + controle",
    price: 16.90,
    code: "PROFILE / BS01",
    description: "Configuração focada em rastreio de alvo e controle de câmera para partidas rápidas no mobile.",
    features: ["Ajustes por mira", "Configuração de câmera", "Perfil de tracking", "Guia de uso"]
  },
  {
    id: "bs-speed",
    game: "blood-strike",
    gameLabel: "Blood Strike",
    title: "Speed Setup",
    subtitle: "Mobilidade + resposta",
    price: 13.90,
    code: "PROFILE / BS02",
    description: "Perfil mais ágil para quem prioriza movimentação rápida e mudanças de direção durante a trocação.",
    features: ["Resposta rápida", "Ajustes de câmera", "Perfil mobile", "Entrega digital"]
  },
  {
    id: "cod-tactical",
    game: "cod-mobile",
    gameLabel: "COD Mobile",
    title: "Tactical Sensi",
    subtitle: "Precisão + estabilidade",
    price: 17.90,
    code: "PROFILE / COD01",
    description: "Configuração tática voltada para estabilidade, controle e adaptação entre diferentes tipos de mira.",
    features: ["Sensibilidade por zoom", "Câmera organizada", "Perfil de precisão", "Guia de adaptação"]
  }
];

const state = {
  filter: "all",
  search: "",
  cart: loadCart(),
  activeProduct: null
};

const els = {
  productGrid: document.getElementById("productGrid"),
  filters: document.getElementById("filters"),
  productSearch: document.getElementById("productSearch"),
  searchBox: document.getElementById("searchBox"),
  searchToggle: document.getElementById("searchToggle"),
  emptyState: document.getElementById("emptyState"),
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
  productModal: document.getElementById("productModal"),
  modalClose: document.getElementById("modalClose"),
  modalTag: document.getElementById("modalTag"),
  modalCode: document.getElementById("modalCode"),
  modalTitle: document.getElementById("modalTitle"),
  modalDescription: document.getElementById("modalDescription"),
  modalFeatures: document.getElementById("modalFeatures"),
  modalPrice: document.getElementById("modalPrice"),
  modalAdd: document.getElementById("modalAdd"),
  toast: document.getElementById("toast"),
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

function getFilteredProducts() {
  const term = state.search.trim().toLowerCase();

  return products.filter(product => {
    const matchesFilter = state.filter === "all" || product.game === state.filter;
    const searchableText = `${product.title} ${product.subtitle} ${product.gameLabel}`.toLowerCase();
    const matchesSearch = !term || searchableText.includes(term);
    return matchesFilter && matchesSearch;
  });
}

function productCardTemplate(product, index) {
  return `
    <article class="product-card" data-id="${product.id}">
      <div class="product-visual">
        <span class="product-visual-tag">${product.gameLabel.toUpperCase()}</span>
        <span class="product-dot"></span>
        <span class="product-visual-code">${product.code}</span>
      </div>
      <div class="product-content">
        <div class="product-meta">
          <span>${product.gameLabel}</span>
          <span>#${String(index + 1).padStart(2, "0")}</span>
        </div>
        <h3>${product.title}</h3>
        <p>${product.subtitle}. ${product.description.slice(0, 72)}...</p>
        <div class="product-bottom">
          <div class="product-price">
            <small>PREÇO</small>
            <strong>${formatPrice(product.price)}</strong>
          </div>
          <div class="product-actions">
            <button class="details-button" type="button" data-action="details" data-id="${product.id}">Detalhes</button>
            <button class="add-button" type="button" data-action="add" data-id="${product.id}" aria-label="Adicionar ${product.title} ao carrinho">+</button>
          </div>
        </div>
      </div>
    </article>
  `;
}

function renderProducts() {
  const filtered = getFilteredProducts();
  els.productGrid.innerHTML = filtered.map((product, index) => productCardTemplate(product, index)).join("");
  els.productGrid.style.display = filtered.length ? "grid" : "none";
  els.emptyState.style.display = filtered.length ? "none" : "grid";
}

function cartItemTemplate(product) {
  return `
    <div class="cart-item">
      <div class="cart-item-thumb"></div>
      <div class="cart-item-info">
        <strong>${product.title}</strong>
        <span>${product.gameLabel}</span>
      </div>
      <div class="cart-item-actions">
        <strong>${formatPrice(product.price)}</strong>
        <button class="remove-item" type="button" data-remove="${product.id}">Remover</button>
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

  const hasItems = cartProducts.length > 0;
  els.cartItems.style.display = hasItems ? "block" : "none";
  els.cartEmpty.style.display = hasItems ? "none" : "grid";
  els.cartFooter.style.display = hasItems ? "block" : "none";
}

function addToCart(productId) {
  const product = products.find(item => item.id === productId);
  if (!product) return;

  if (!state.cart.includes(productId)) {
    state.cart.push(productId);
    saveCart();
    renderCart();
    showToast(`${product.title} adicionado ao carrinho.`);
  } else {
    showToast(`${product.title} já está no carrinho.`);
  }
}

function removeFromCart(productId) {
  state.cart = state.cart.filter(id => id !== productId);
  saveCart();
  renderCart();
}

function openCart() {
  closeProductModal(false);
  els.cartDrawer.classList.add("open");
  els.overlay.classList.add("show");
  document.body.classList.add("modal-open");
}

function closeCart(removeOverlay = true) {
  els.cartDrawer.classList.remove("open");
  if (removeOverlay) {
    els.overlay.classList.remove("show");
    document.body.classList.remove("modal-open");
  }
}

function openProductModal(productId) {
  const product = products.find(item => item.id === productId);
  if (!product) return;

  state.activeProduct = product.id;
  els.modalTag.textContent = product.gameLabel.toUpperCase();
  els.modalCode.textContent = product.code;
  els.modalTitle.textContent = product.title;
  els.modalDescription.textContent = product.description;
  els.modalFeatures.innerHTML = product.features.map(feature => `<li>${feature}</li>`).join("");
  els.modalPrice.textContent = formatPrice(product.price);

  els.productModal.classList.add("show");
  els.overlay.classList.add("show");
  document.body.classList.add("modal-open");
}

function closeProductModal(removeOverlay = true) {
  els.productModal.classList.remove("show");
  state.activeProduct = null;
  if (removeOverlay) {
    els.overlay.classList.remove("show");
    document.body.classList.remove("modal-open");
  }
}

let toastTimer;
function showToast(message) {
  const text = els.toast.querySelector("p");
  text.textContent = message;
  els.toast.classList.add("show");
  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => els.toast.classList.remove("show"), 2300);
}

function closeAll() {
  closeCart(false);
  closeProductModal(false);
  els.overlay.classList.remove("show");
  document.body.classList.remove("modal-open");
}

els.filters.addEventListener("click", event => {
  const button = event.target.closest(".filter");
  if (!button) return;

  document.querySelectorAll(".filter").forEach(item => item.classList.remove("active"));
  button.classList.add("active");
  state.filter = button.dataset.filter;
  renderProducts();
});

els.productSearch.addEventListener("input", event => {
  state.search = event.target.value;
  renderProducts();
});

els.searchToggle.addEventListener("click", () => {
  document.getElementById("produtos").scrollIntoView({ behavior: "smooth" });
  setTimeout(() => els.productSearch.focus(), 450);
});

els.productGrid.addEventListener("click", event => {
  const button = event.target.closest("button[data-action]");
  if (!button) return;

  const productId = button.dataset.id;
  if (button.dataset.action === "add") addToCart(productId);
  if (button.dataset.action === "details") openProductModal(productId);
});

els.cartItems.addEventListener("click", event => {
  const button = event.target.closest("[data-remove]");
  if (!button) return;
  removeFromCart(button.dataset.remove);
});

els.cartToggle.addEventListener("click", openCart);
els.cartClose.addEventListener("click", () => closeCart());
els.modalClose.addEventListener("click", () => closeProductModal());
els.overlay.addEventListener("click", closeAll);

els.modalAdd.addEventListener("click", () => {
  if (!state.activeProduct) return;
  addToCart(state.activeProduct);
  closeProductModal(false);
  openCart();
});

els.checkoutButton.addEventListener("click", () => {
  showToast("Checkout pronto para receber sua integração de pagamento.");
});

els.menuToggle.addEventListener("click", () => {
  const isOpen = els.mobileMenu.classList.toggle("open");
  els.menuToggle.classList.toggle("active", isOpen);
});

els.mobileMenu.addEventListener("click", event => {
  if (!event.target.closest("a")) return;
  els.mobileMenu.classList.remove("open");
  els.menuToggle.classList.remove("active");
});

document.addEventListener("keydown", event => {
  if (event.key === "Escape") closeAll();
});

window.addEventListener("resize", () => {
  if (window.innerWidth > 820) {
    els.mobileMenu.classList.remove("open");
    els.menuToggle.classList.remove("active");
  }
});

els.year.textContent = String(new Date().getFullYear());
renderProducts();
renderCart();
