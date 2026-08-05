const products = [
  {
    id: "ff-pro",
    game: "free-fire",
    category: "android",
    label: "Free Fire",
    title: "Sensi Pro Android",
    description: "Configuração equilibrada para puxada de capa, controle e movimentação.",
    oldPrice: 49.90,
    price: 19.90,
    discount: 60,
    theme: "green"
  },
  {
    id: "ff-rush",
    game: "free-fire",
    category: "android",
    label: "Free Fire",
    title: "Sensi Rush Mobile",
    description: "Perfil mais rápido para quem joga avançando e quer resposta leve.",
    oldPrice: 59.90,
    price: 24.90,
    discount: 58,
    theme: "blue"
  },
  {
    id: "ff-clean",
    game: "free-fire",
    category: "android",
    label: "Free Fire",
    title: "Sensi Balance",
    description: "Base suave e estável para adaptar ao seu aparelho sem exagero.",
    oldPrice: 39.90,
    price: 14.90,
    discount: 63,
    theme: "yellow"
  },
  {
    id: "blood-tracking",
    game: "blood-strike",
    category: "android",
    label: "Blood Strike",
    title: "Tracking Setup",
    description: "Ajuste focado em rastrear alvo e manter estabilidade durante trocação.",
    oldPrice: 69.90,
    price: 29.90,
    discount: 57,
    theme: "red"
  },
  {
    id: "cod-tactical",
    game: "cod-mobile",
    category: "android",
    label: "COD Mobile",
    title: "Tactical Sensi",
    description: "Configuração organizada por mira, indicada para precisão e controle.",
    oldPrice: 79.90,
    price: 34.90,
    discount: 56,
    theme: "blue"
  },
  {
    id: "pack-completo",
    game: "free-fire",
    category: "android",
    label: "Pack",
    title: "Pack Completo Mobile",
    description: "Pacote com perfis diferentes para testar e escolher o melhor para você.",
    oldPrice: 99.90,
    price: 44.90,
    discount: 55,
    theme: "green"
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
  productSearch: document.getElementById("productSearch"),
  searchFocus: document.getElementById("searchFocus"),
  categoryButtons: document.querySelectorAll(".category-chip"),
  cartToggle: document.getElementById("cartToggle"),
  cartDrawer: document.getElementById("cartDrawer"),
  cartClose: document.getElementById("cartClose"),
  overlay: document.getElementById("overlay"),
  cartItems: document.getElementById("cartItems"),
  cartEmpty: document.getElementById("cartEmpty"),
  cartFooter: document.getElementById("cartFooter"),
  cartCount: document.getElementById("cartCount"),
  cartTotal: document.getElementById("cartTotal"),
  checkoutButton: document.getElementById("checkoutButton"),
  toast: document.getElementById("toast"),
  menuToggle: document.getElementById("menuToggle"),
  mobileMenu: document.getElementById("mobileMenu"),
  year: document.getElementById("year")
};

function formatMoney(value) {
  return value.toLocaleString("pt-BR", {
    style: "currency",
    currency: "BRL"
  });
}

function loadCart() {
  try {
    const saved = JSON.parse(localStorage.getItem("knxits-clean-cart") || "[]");
    return Array.isArray(saved) ? saved : [];
  } catch (error) {
    return [];
  }
}

function saveCart() {
  localStorage.setItem("knxits-clean-cart", JSON.stringify(state.cart));
}

function getProductById(id) {
  return products.find(product => product.id === id);
}

function getFilteredProducts() {
  const term = state.search.trim().toLowerCase();

  return products.filter(product => {
    const matchesFilter = state.filter === "all" || product.game === state.filter || product.category === state.filter;
    const text = `${product.title} ${product.description} ${product.label}`.toLowerCase();
    const matchesSearch = !term || text.includes(term);
    return matchesFilter && matchesSearch;
  });
}

function productTemplate(product) {
  return `
    <article class="product-card">
      <div class="product-media ${product.theme}">
        <span class="product-badge">${product.label}</span>
      </div>
      <div class="product-content">
        <div class="product-topline">
          <span>Digital</span>
          <span>Android</span>
        </div>
        <h3 class="product-title">${product.title}</h3>
        <p class="product-description">${product.description}</p>

        <div class="price-row">
          <span class="old-price">${formatMoney(product.oldPrice)}</span>
          <span class="discount">-${product.discount}%</span>
        </div>
        <strong class="current-price">${formatMoney(product.price)}</strong>
        <span class="pix-text">À vista no PIX</span>

        <div class="card-actions">
          <button class="add-to-cart" type="button" data-add="${product.id}">Comprar</button>
          <button class="details-button" type="button" data-info="${product.id}" aria-label="Ver detalhes de ${product.title}">
            <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M12 5v14M5 12h14"/></svg>
          </button>
        </div>
      </div>
    </article>
  `;
}

function renderProducts() {
  const filtered = getFilteredProducts();
  els.productGrid.innerHTML = filtered.map(productTemplate).join("");
  els.productGrid.style.display = filtered.length ? "grid" : "none";
  els.emptyState.style.display = filtered.length ? "grid" : "none";
}

function renderCart() {
  const items = state.cart.map(getProductById).filter(Boolean);
  const total = items.reduce((sum, product) => sum + product.price, 0);

  els.cartCount.textContent = String(items.length);
  els.cartTotal.textContent = formatMoney(total);
  els.cartItems.innerHTML = items.map(product => `
    <div class="cart-item">
      <div class="cart-thumb"></div>
      <div class="cart-info">
        <strong>${product.title}</strong>
        <span>${product.label}</span>
      </div>
      <div class="cart-price">
        <strong>${formatMoney(product.price)}</strong>
        <button class="remove-button" type="button" data-remove="${product.id}">Remover</button>
      </div>
    </div>
  `).join("");

  const hasItems = items.length > 0;
  els.cartItems.style.display = hasItems ? "block" : "none";
  els.cartEmpty.style.display = hasItems ? "none" : "grid";
  els.cartFooter.style.display = hasItems ? "block" : "none";
}

function showToast(message) {
  els.toast.textContent = message;
  els.toast.classList.add("show");
  clearTimeout(showToast.timer);
  showToast.timer = setTimeout(() => els.toast.classList.remove("show"), 2200);
}

function addToCart(productId) {
  const product = getProductById(productId);
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
  els.cartDrawer.classList.add("open");
  els.overlay.classList.add("show");
  document.body.classList.add("modal-open");
}

function closeCart() {
  els.cartDrawer.classList.remove("open");
  els.overlay.classList.remove("show");
  document.body.classList.remove("modal-open");
}

els.productGrid.addEventListener("click", event => {
  const addButton = event.target.closest("[data-add]");
  const infoButton = event.target.closest("[data-info]");

  if (addButton) {
    addToCart(addButton.dataset.add);
    return;
  }

  if (infoButton) {
    const product = getProductById(infoButton.dataset.info);
    if (product) showToast(product.description);
  }
});

els.categoryButtons.forEach(button => {
  button.addEventListener("click", () => {
    els.categoryButtons.forEach(item => item.classList.remove("active"));
    button.classList.add("active");
    state.filter = button.dataset.filter;
    renderProducts();
  });
});

els.productSearch.addEventListener("input", event => {
  state.search = event.target.value;
  renderProducts();
});

els.searchFocus.addEventListener("click", () => {
  document.getElementById("produtos").scrollIntoView({ behavior: "smooth" });
  setTimeout(() => els.productSearch.focus(), 350);
});

els.cartToggle.addEventListener("click", openCart);
els.cartClose.addEventListener("click", closeCart);
els.overlay.addEventListener("click", closeCart);

els.cartItems.addEventListener("click", event => {
  const button = event.target.closest("[data-remove]");
  if (button) removeFromCart(button.dataset.remove);
});

els.checkoutButton.addEventListener("click", () => {
  showToast("Checkout pronto para conectar Pix/cartão.");
});

els.menuToggle.addEventListener("click", () => {
  els.mobileMenu.classList.toggle("open");
});

els.mobileMenu.addEventListener("click", event => {
  if (event.target.closest("a")) els.mobileMenu.classList.remove("open");
});

document.addEventListener("keydown", event => {
  if (event.key === "Escape") closeCart();
});

els.year.textContent = String(new Date().getFullYear());
renderProducts();
renderCart();
