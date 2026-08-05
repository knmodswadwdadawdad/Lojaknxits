const products = [
  {
    id: "android-pro",
    category: "android",
    categoryLabel: "SENSI ANDROID",
    title: "Sensi Android Pro — Controle e Precisão",
    oldPrice: 79.90,
    price: 29.90,
    discount: 63,
    theme: "blue",
    description: [
      "Configuração organizada para Free Fire com foco em controle de câmera e resposta de mira.",
      "Inclui valores de sensibilidade, orientação de adaptação e recomendações para testar no seu aparelho.",
      "Produto digital. Os ajustes podem variar conforme tela, DPI, HUD e costume de jogo."
    ]
  },
  {
    id: "android-rush",
    category: "android",
    categoryLabel: "SENSI ANDROID",
    title: "Sensi Rush Android — Resposta Rápida",
    oldPrice: 89.90,
    price: 34.90,
    discount: 61,
    theme: "cyan",
    description: [
      "Perfil com resposta mais solta para jogadores que preferem movimentação rápida.",
      "Acompanha sensibilidade por mira e um guia simples para adaptação gradual.",
      "Entrega digital após confirmação do pagamento quando o backend estiver conectado."
    ]
  },
  {
    id: "android-balance",
    category: "android",
    categoryLabel: "SENSI ANDROID",
    title: "Sensi Balance Android — Suave e Estável",
    oldPrice: 59.90,
    price: 24.90,
    discount: 58,
    theme: "purple",
    description: [
      "Configuração equilibrada para quem quer estabilidade antes de aumentar a velocidade.",
      "Boa base para aparelhos de diferentes faixas de desempenho.",
      "Inclui checklist de teste e recomendações de ajuste."
    ]
  },
  {
    id: "android-competitive",
    category: "android",
    categoryLabel: "SENSI ANDROID",
    title: "Sensi Competitiva Android — Ranqueada",
    oldPrice: 99.90,
    price: 39.90,
    discount: 60,
    theme: "red",
    description: [
      "Perfil mais firme para quem prioriza consistência em partidas ranqueadas.",
      "Valores separados por tipo de mira e recomendações de adaptação.",
      "Não modifica arquivos do jogo; é apenas configuração de sensibilidade."
    ]
  },
  {
    id: "iphone-precision",
    category: "iphone",
    categoryLabel: "SENSI IPHONE",
    title: "Sensi iPhone Precision — Controle Mobile",
    oldPrice: 99.90,
    price: 44.90,
    discount: 55,
    theme: "blue",
    description: [
      "Perfil pensado para telas iPhone, com foco em movimentos precisos e resposta consistente.",
      "Inclui ajustes gerais e por mira, além de instruções para adaptação.",
      "Compatível como referência de configuração em diferentes modelos de iPhone."
    ]
  },
  {
    id: "iphone-rush",
    category: "iphone",
    categoryLabel: "SENSI IPHONE",
    title: "Sensi iPhone Rush — Alta Resposta",
    oldPrice: 109.90,
    price: 49.90,
    discount: 55,
    theme: "cyan",
    description: [
      "Configuração mais rápida para quem prefere resposta leve no toque.",
      "Acompanha recomendações de teste para evitar excesso de velocidade.",
      "Produto digital com entrega preparada para automação."
    ]
  },
  {
    id: "iphone-stable",
    category: "iphone",
    categoryLabel: "SENSI IPHONE",
    title: "Sensi iPhone Stable — Precisão e Conforto",
    oldPrice: 89.90,
    price: 39.90,
    discount: 56,
    theme: "gold",
    description: [
      "Perfil equilibrado para quem prefere controle e conforto durante sessões longas.",
      "Inclui valores-base e orientação de ajuste fino.",
      "Pode ser adaptado conforme modelo e preferência pessoal."
    ]
  },
  {
    id: "iphone-elite",
    category: "iphone",
    categoryLabel: "SENSI IPHONE",
    title: "Sensi iPhone Elite — Perfil Completo",
    oldPrice: 129.90,
    price: 54.90,
    discount: 58,
    theme: "purple",
    description: [
      "Pacote individual premium com configuração completa para iPhone.",
      "Inclui perfil principal, alternativa mais rápida e guia de calibração.",
      "Entrega digital após confirmação de pagamento."
    ]
  },
  {
    id: "pack-android",
    category: "pack",
    categoryLabel: "PACKS",
    title: "Pack Android — 3 Perfis de Sensi",
    oldPrice: 149.90,
    price: 59.90,
    discount: 60,
    theme: "cyan",
    description: [
      "Pack com três perfis de sensibilidade para Android: controle, balance e rush.",
      "Ideal para testar estilos diferentes e escolher o que combina melhor com sua gameplay.",
      "Inclui guia de comparação entre os perfis."
    ]
  },
  {
    id: "pack-completo",
    category: "pack",
    categoryLabel: "PACKS",
    title: "Pack Completo KNXITS — Android + iPhone",
    oldPrice: 199.90,
    price: 79.90,
    discount: 60,
    theme: "blue",
    description: [
      "Pacote com configurações para Android e iPhone em diferentes estilos.",
      "Inclui perfis balanceados, rápidos e de controle.",
      "Produto digital organizado para consulta fácil após a compra."
    ]
  }
];

const groupConfig = [
  { key: "android", title: "SENSI FFH4X ANDROID" },
  { key: "iphone", title: "SENSI IPHONE FFH4X" },
  { key: "pack", title: "PACKS DE SENSI" }
];

const state = {
  selectedProduct: products[0],
  cart: loadCart(),
  paymentMethod: "pix",
  couponDiscount: 0
};

const el = {
  homeView: document.getElementById("homeView"),
  productView: document.getElementById("productView"),
  checkoutView: document.getElementById("checkoutView"),
  catalogSections: document.getElementById("catalogSections"),
  detailArt: document.getElementById("detailArt"),
  detailTitle: document.getElementById("detailTitle"),
  detailOldPrice: document.getElementById("detailOldPrice"),
  detailDiscount: document.getElementById("detailDiscount"),
  detailPrice: document.getElementById("detailPrice"),
  detailDescription: document.getElementById("detailDescription"),
  crumbCategory: document.getElementById("crumbCategory"),
  mobileProductName: document.getElementById("mobileProductName"),
  similarProducts: document.getElementById("similarProducts"),
  cartCount: document.getElementById("cartCount"),
  cartDrawer: document.getElementById("cartDrawer"),
  drawerCartItems: document.getElementById("drawerCartItems"),
  drawerTotal: document.getElementById("drawerTotal"),
  checkoutItems: document.getElementById("checkoutItems"),
  checkoutSubtotal: document.getElementById("checkoutSubtotal"),
  paymentFee: document.getElementById("paymentFee"),
  checkoutTotal: document.getElementById("checkoutTotal"),
  stickyPayTotal: document.getElementById("stickyPayTotal"),
  paymentOptions: document.getElementById("paymentOptions"),
  screenOverlay: document.getElementById("screenOverlay"),
  sideMenu: document.getElementById("sideMenu"),
  searchDrawer: document.getElementById("searchDrawer"),
  searchInput: document.getElementById("searchInput"),
  searchResults: document.getElementById("searchResults"),
  toast: document.getElementById("toast")
};

function money(value) {
  return value.toLocaleString("pt-BR", { style: "currency", currency: "BRL" });
}

function loadCart() {
  try {
    const parsed = JSON.parse(localStorage.getItem("knxits-cart-v2") || "{}");
    if (!parsed || typeof parsed !== "object") return {};
    const clean = {};
    Object.keys(parsed).forEach(id => {
      if (products.some(product => product.id === id) && Number(parsed[id]) > 0) clean[id] = Number(parsed[id]);
    });
    return clean;
  } catch (error) {
    return {};
  }
}

function saveCart() {
  localStorage.setItem("knxits-cart-v2", JSON.stringify(state.cart));
}

function artMarkup() {
  return '<span class="art-spark">↯</span><span class="art-device"></span>';
}

function productCard(product) {
  return `
    <article class="product-card">
      <button class="product-art ${product.theme}" type="button" data-open-product="${product.id}" aria-label="Abrir ${product.title}">
        ${artMarkup()}
      </button>
      <div class="product-body">
        <h3 class="product-title">${product.title}</h3>
        <div class="price-old-row">
          <span class="old-price">${money(product.oldPrice)}</span>
          <span class="discount-badge">⌁ ${product.discount}%</span>
        </div>
        <div class="product-price">
          <strong>${money(product.price)}</strong>
          <div class="mini-actions">
            <button type="button" data-add-cart="${product.id}" aria-label="Adicionar ao carrinho">◆</button>
            <button type="button" data-open-product="${product.id}" aria-label="Ver detalhes">↯</button>
          </div>
        </div>
        <div class="pix-label">À vista no PIX</div>
        <button class="buy-card-btn" type="button" data-buy-now="${product.id}">🛒 Comprar agora</button>
      </div>
    </article>
  `;
}

function renderCatalog() {
  el.catalogSections.innerHTML = groupConfig.map(group => {
    const list = products.filter(product => product.category === group.key);
    return `
      <section class="catalog-group" id="group-${group.key}">
        <div class="group-header">
          <div class="group-title">${group.title}</div>
          <button class="view-all" type="button" data-scroll-group="${group.key}">Ver todos ›</button>
        </div>
        <div class="product-grid">${list.map(productCard).join("")}</div>
      </section>
    `;
  }).join("");
}

function showView(name) {
  el.homeView.classList.toggle("active", name === "home");
  el.productView.classList.toggle("active", name === "product");
  el.checkoutView.classList.toggle("active", name === "checkout");
  window.scrollTo({ top: 0, behavior: "smooth" });
}

function goHome(hash) {
  showView("home");
  closeDrawers();
  if (hash) {
    setTimeout(() => {
      const target = document.querySelector(hash);
      if (target) target.scrollIntoView({ behavior: "smooth", block: "start" });
    }, 80);
  }
}

function openProduct(productId) {
  const product = products.find(item => item.id === productId);
  if (!product) return;
  state.selectedProduct = product;

  el.detailArt.className = `detail-art product-art ${product.theme}`;
  el.detailArt.innerHTML = artMarkup();
  el.detailTitle.textContent = product.title;
  el.detailOldPrice.textContent = money(product.oldPrice);
  el.detailDiscount.textContent = `⌁ ${product.discount}%`;
  el.detailPrice.textContent = money(product.price);
  el.crumbCategory.textContent = product.categoryLabel;
  el.mobileProductName.textContent = product.title;
  el.detailDescription.innerHTML = `<div class="description-list">${product.description.map((text, index) => `<p>${index === 0 ? "▣" : index === 1 ? "↯" : "✓"} <b>${text}</b></p>`).join("")}</div>`;
  renderSimilar(product);
  showView("product");
}

function renderSimilar(product) {
  let list = products.filter(item => item.id !== product.id && item.category === product.category);
  if (list.length < 3) list = [...list, ...products.filter(item => item.id !== product.id && item.category !== product.category)];
  el.similarProducts.innerHTML = list.slice(0, 5).map(productCard).join("");
}

function cartEntries() {
  return Object.keys(state.cart)
    .map(id => ({ product: products.find(item => item.id === id), qty: state.cart[id] }))
    .filter(entry => entry.product && entry.qty > 0);
}

function addToCart(productId, amount = 1) {
  state.cart[productId] = (state.cart[productId] || 0) + amount;
  saveCart();
  renderCart();
  const product = products.find(item => item.id === productId);
  if (product) showToast(`${product.title} adicionado ao carrinho.`);
}

function changeQty(productId, delta) {
  const next = (state.cart[productId] || 0) + delta;
  if (next <= 0) delete state.cart[productId];
  else state.cart[productId] = next;
  saveCart();
  renderCart();
}

function cartSubtotal() {
  return cartEntries().reduce((total, entry) => total + entry.product.price * entry.qty, 0);
}

function paymentFeeValue(subtotal) {
  if (state.paymentMethod === "pix") return subtotal > 0 ? 1 : 0;
  if (state.paymentMethod === "card") return subtotal * 0.035;
  return subtotal * 0.02;
}

function checkoutTotalValue() {
  const subtotal = cartSubtotal();
  const discounted = subtotal * (1 - state.couponDiscount);
  return discounted + paymentFeeValue(discounted);
}

function drawerItem(entry) {
  const product = entry.product;
  return `
    <div class="drawer-cart-row">
      <div class="product-art ${product.theme}">${artMarkup()}</div>
      <div class="drawer-cart-info"><strong>${product.title}</strong><span>${money(product.price)}</span></div>
      <div class="qty-control"><button data-qty="-1" data-id="${product.id}">−</button><span>${entry.qty}</span><button data-qty="1" data-id="${product.id}">+</button></div>
    </div>
  `;
}

function checkoutItem(entry) {
  const product = entry.product;
  return `
    <div class="checkout-item">
      <div class="checkout-thumb product-art ${product.theme}">${artMarkup()}</div>
      <div class="checkout-item-info">
        <strong>${product.title}</strong>
        <span class="old-price">${money(product.oldPrice)}</span>
        <span class="discount-badge">⌁ ${product.discount}%</span>
        <b>${money(product.price)} <small>Estoque ilimitado</small></b>
      </div>
      <div class="qty-control"><button data-qty="-1" data-id="${product.id}">−</button><span>${entry.qty}</span><button data-qty="1" data-id="${product.id}">+</button></div>
    </div>
  `;
}

function renderCart() {
  const entries = cartEntries();
  const count = entries.reduce((sum, entry) => sum + entry.qty, 0);
  const subtotal = cartSubtotal();
  const discountedSubtotal = subtotal * (1 - state.couponDiscount);
  const fee = paymentFeeValue(discountedSubtotal);
  const total = discountedSubtotal + fee;

  el.cartCount.textContent = String(count);
  el.drawerCartItems.innerHTML = entries.length ? entries.map(drawerItem).join("") : '<div class="search-result"><strong>Seu carrinho está vazio</strong><span>Adicione um produto para continuar.</span></div>';
  el.drawerTotal.textContent = money(total);
  el.checkoutItems.innerHTML = entries.length ? entries.map(checkoutItem).join("") : '<div class="search-result"><strong>Nenhum produto no carrinho</strong><span>Volte à loja e escolha uma sensi.</span></div>';
  el.checkoutSubtotal.textContent = money(discountedSubtotal);
  el.paymentFee.textContent = money(fee);
  el.checkoutTotal.textContent = money(total);
  el.stickyPayTotal.textContent = money(total);
}

function buyNow(productId) {
  if (!state.cart[productId]) state.cart[productId] = 1;
  saveCart();
  renderCart();
  showCheckout();
}

function showCheckout() {
  if (!cartEntries().length) {
    showToast("Seu carrinho está vazio.");
    return;
  }
  closeDrawers();
  showView("checkout");
}

function openDrawer(drawer) {
  [el.sideMenu, el.searchDrawer, el.cartDrawer].forEach(item => item.classList.remove("open"));
  drawer.classList.add("open");
  el.screenOverlay.classList.add("show");
  document.body.style.overflow = "hidden";
}

function closeDrawers() {
  [el.sideMenu, el.searchDrawer, el.cartDrawer].forEach(item => item.classList.remove("open"));
  el.screenOverlay.classList.remove("show");
  document.body.style.overflow = "";
}

function renderSearch(query) {
  const term = query.trim().toLowerCase();
  const list = term ? products.filter(product => `${product.title} ${product.categoryLabel}`.toLowerCase().includes(term)).slice(0, 8) : products.slice(0, 5);
  el.searchResults.innerHTML = list.map(product => `<button class="search-result" type="button" data-open-product="${product.id}"><strong>${product.title}</strong><span>${money(product.price)}</span></button>`).join("");
}

function showToast(message) {
  el.toast.textContent = message;
  el.toast.classList.add("show");
  clearTimeout(showToast.timer);
  showToast.timer = setTimeout(() => el.toast.classList.remove("show"), 2400);
}

function setPaymentMethod(method) {
  state.paymentMethod = method;
  document.querySelectorAll(".payment-choice").forEach(button => button.classList.toggle("active", button.dataset.method === method));
  renderCart();
}

function handleProductAction(target) {
  const open = target.closest("[data-open-product]");
  if (open) {
    openProduct(open.dataset.openProduct);
    closeDrawers();
    return true;
  }
  const add = target.closest("[data-add-cart]");
  if (add) {
    addToCart(add.dataset.addCart);
    return true;
  }
  const buy = target.closest("[data-buy-now]");
  if (buy) {
    buyNow(buy.dataset.buyNow);
    return true;
  }
  return false;
}

renderCatalog();
renderCart();
renderSearch("");

el.catalogSections.addEventListener("click", event => {
  if (handleProductAction(event.target)) return;
  const groupButton = event.target.closest("[data-scroll-group]");
  if (groupButton) document.getElementById(`group-${groupButton.dataset.scrollGroup}`)?.scrollIntoView({ behavior: "smooth" });
});

el.similarProducts.addEventListener("click", event => handleProductAction(event.target));
el.searchResults.addEventListener("click", event => handleProductAction(event.target));

document.querySelectorAll("[data-go-home]").forEach(button => button.addEventListener("click", () => goHome("#inicio")));

document.querySelectorAll(".category-card").forEach(button => button.addEventListener("click", () => {
  document.getElementById(`group-${button.dataset.category}`)?.scrollIntoView({ behavior: "smooth", block: "start" });
}));

document.getElementById("exploreButton").addEventListener("click", () => document.getElementById("group-android")?.scrollIntoView({ behavior: "smooth" }));

document.getElementById("buyNowButton").addEventListener("click", () => buyNow(state.selectedProduct.id));
document.getElementById("addCartButton").addEventListener("click", () => addToCart(state.selectedProduct.id));

document.getElementById("menuToggle").addEventListener("click", () => openDrawer(el.sideMenu));
document.getElementById("searchToggle").addEventListener("click", () => { openDrawer(el.searchDrawer); setTimeout(() => el.searchInput.focus(), 180); });
document.getElementById("cartToggle").addEventListener("click", () => openDrawer(el.cartDrawer));
document.getElementById("accountButton").addEventListener("click", () => showToast("Área da conta pronta para integrar ao login."));
document.getElementById("menuAccount").addEventListener("click", () => showToast("Área da conta pronta para integrar ao login."));
document.getElementById("drawerCheckoutButton").addEventListener("click", showCheckout);

el.screenOverlay.addEventListener("click", closeDrawers);
document.querySelectorAll("[data-close-drawers]").forEach(button => button.addEventListener("click", closeDrawers));

document.querySelectorAll("[data-menu-link]").forEach(link => link.addEventListener("click", event => {
  event.preventDefault();
  goHome(link.getAttribute("href"));
}));

el.searchInput.addEventListener("input", event => renderSearch(event.target.value));

[el.drawerCartItems, el.checkoutItems].forEach(container => container.addEventListener("click", event => {
  const button = event.target.closest("[data-qty]");
  if (!button) return;
  changeQty(button.dataset.id, Number(button.dataset.qty));
}));

el.paymentOptions.addEventListener("click", event => {
  const button = event.target.closest("[data-method]");
  if (button) setPaymentMethod(button.dataset.method);
});

document.getElementById("couponButton").addEventListener("click", () => {
  const input = document.getElementById("couponInput");
  if (input.value.trim().toUpperCase() === "KNX10") {
    state.couponDiscount = .10;
    renderCart();
    showToast("Cupom KNX10 aplicado: 10% de desconto.");
  } else {
    state.couponDiscount = 0;
    renderCart();
    showToast("Cupom inválido.");
  }
});

document.getElementById("payButton").addEventListener("click", () => {
  const email = document.getElementById("checkoutEmail").value.trim();
  const accepted = document.getElementById("termsCheck").checked;
  if (!email || !email.includes("@")) {
    showToast("Digite um email válido para receber o produto.");
    return;
  }
  if (!accepted) {
    showToast("Aceite os termos e condições para continuar.");
    return;
  }
  const labels = { pix: "Pix", card: "cartão", crypto: "crypto" };
  showToast(`Checkout de ${labels[state.paymentMethod]} pronto para conectar à API de pagamento.`);
});

document.getElementById("similarPrev").addEventListener("click", () => el.similarProducts.scrollBy({ left: -260, behavior: "smooth" }));
document.getElementById("similarNext").addEventListener("click", () => el.similarProducts.scrollBy({ left: 260, behavior: "smooth" }));

document.addEventListener("keydown", event => {
  if (event.key === "Escape") closeDrawers();
});
