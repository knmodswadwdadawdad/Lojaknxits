const products = [
  {
    id: "ff-pro",
    game: "free-fire",
    label: "Free Fire",
    title: "Sensi Pro Android",
    short: "Controle + puxada",
    description: "Configuração equilibrada para puxada de capa, controle de câmera e movimentação. Ideal para quem quer uma base pronta e organizada para ajustar no próprio aparelho.",
    oldPrice: 49.9,
    price: 19.9,
    discount: 60,
    theme: "blue",
    compatibility: "Android mobile. Recomendado para jogadores de Free Fire com DPI e HUD já configurados.",
    includes: ["Sensibilidade geral", "Ajuste por mira", "Guia de adaptação", "Suporte básico de instalação"]
  },
  {
    id: "ff-rush",
    game: "free-fire",
    label: "Free Fire",
    title: "Sensi Rush Mobile",
    short: "Rápida + responsiva",
    description: "Perfil mais rápido para quem joga avançando, troca tiro de perto e prefere uma resposta leve ao arrastar a tela.",
    oldPrice: 59.9,
    price: 24.9,
    discount: 58,
    theme: "green",
    compatibility: "Android mobile. Melhor para jogadores que usam movimentação agressiva e sensibilidade alta.",
    includes: ["Perfil rush", "Ajustes de câmera", "Ajustes de mira", "Recomendações de teste"]
  },
  {
    id: "ff-clean",
    game: "free-fire",
    label: "Free Fire",
    title: "Sensi Balance",
    short: "Suave + estável",
    description: "Base suave e estável para adaptar ao seu aparelho sem exagero. Boa escolha para quem quer controle antes de aumentar velocidade.",
    oldPrice: 39.9,
    price: 14.9,
    discount: 63,
    theme: "yellow",
    compatibility: "Android mobile. Funciona como base para aparelhos fracos, médios e fortes.",
    includes: ["Perfil balanceado", "Configuração inicial", "Ajuste por estilo", "Guia simples"]
  },
  {
    id: "blood-tracking",
    game: "blood-strike",
    label: "Blood Strike",
    title: "Tracking Setup",
    short: "Tracking + precisão",
    description: "Ajuste focado em rastrear alvo e manter estabilidade durante trocação, com foco em conforto e controle contínuo.",
    oldPrice: 69.9,
    price: 29.9,
    discount: 57,
    theme: "purple",
    compatibility: "Android mobile. Recomendado para Blood Strike em partidas rápidas e trocação constante.",
    includes: ["Configuração de mira", "Configuração de câmera", "Guia de tracking", "Recomendações de adaptação"]
  },
  {
    id: "cod-tactical",
    game: "cod-mobile",
    label: "COD Mobile",
    title: "Tactical Sensi",
    short: "Tática + controle",
    description: "Configuração voltada para precisão, estabilidade de mira e adaptação entre diferentes tipos de zoom dentro do jogo.",
    oldPrice: 79.9,
    price: 34.9,
    discount: 56,
    theme: "blue",
    compatibility: "Android mobile. Focado em COD Mobile, mira por zoom e movimentação mais controlada.",
    includes: ["Sensibilidade por zoom", "Ajuste tático", "Configuração de câmera", "Checklist de testes"]
  },
  {
    id: "full-pack",
    game: "pack",
    label: "Pacote",
    title: "Pack Completo Sensi",
    short: "3 perfis inclusos",
    description: "Pacote com três perfis diferentes para testar, comparar e escolher o que mais combina com seu jeito de jogar.",
    oldPrice: 99.9,
    price: 39.9,
    discount: 60,
    theme: "red",
    compatibility: "Android mobile. Indicado para quem quer testar mais de um estilo de sensibilidade.",
    includes: ["Perfil controle", "Perfil rush", "Perfil balanceado", "Guia de comparação"]
  }
];

const state = {
  filter: "all",
  search: "",
  selectedProduct: products[0],
  paymentMethod: "pix"
};

const els = {
  homeView: document.getElementById("homeView"),
  productView: document.getElementById("productView"),
  checkoutView: document.getElementById("checkoutView"),
  productGrid: document.getElementById("productGrid"),
  emptyState: document.getElementById("emptyState"),
  categoryPills: document.querySelectorAll(".category-pill"),
  viewAllButton: document.querySelector(".view-all-button"),
  topSearch: document.getElementById("topSearch"),
  catalogSearch: document.getElementById("catalogSearch"),
  searchFocus: document.getElementById("searchFocus"),
  menuToggle: document.getElementById("menuToggle"),
  mobileMenu: document.getElementById("mobileMenu"),
  cartToggle: document.getElementById("cartToggle"),
  cartCount: document.getElementById("cartCount"),
  detailArt: document.getElementById("detailArt"),
  detailBadge: document.getElementById("detailBadge"),
  detailArtTitle: document.getElementById("detailArtTitle"),
  detailArtSubtitle: document.getElementById("detailArtSubtitle"),
  detailLabel: document.getElementById("detailLabel"),
  detailTitle: document.getElementById("detailTitle"),
  detailDescription: document.getElementById("detailDescription"),
  detailOldPrice: document.getElementById("detailOldPrice"),
  detailPrice: document.getElementById("detailPrice"),
  detailDiscount: document.getElementById("detailDiscount"),
  detailIncludes: document.getElementById("detailIncludes"),
  detailCompatibility: document.getElementById("detailCompatibility"),
  goCheckoutButton: document.getElementById("goCheckoutButton"),
  copyProductButton: document.getElementById("copyProductButton"),
  summaryArt: document.getElementById("summaryArt"),
  summaryTitle: document.getElementById("summaryTitle"),
  summaryLabel: document.getElementById("summaryLabel"),
  summarySubtotal: document.getElementById("summarySubtotal"),
  summaryTotalPhone: document.getElementById("summaryTotalPhone"),
  paymentMethods: document.getElementById("paymentMethods"),
  paymentPanel: document.getElementById("paymentPanel"),
  finishOrderButton: document.getElementById("finishOrderButton"),
  paymentStatusTitle: document.getElementById("paymentStatusTitle"),
  toast: document.getElementById("toast")
};

function formatPrice(value) {
  return value.toLocaleString("pt-BR", { style: "currency", currency: "BRL" });
}

function showToast(message) {
  els.toast.textContent = message;
  els.toast.classList.add("show");
  clearTimeout(showToast.timer);
  showToast.timer = setTimeout(() => els.toast.classList.remove("show"), 2400);
}

function showView(name) {
  els.homeView.classList.toggle("view-active", name === "home");
  els.productView.classList.toggle("view-active", name === "product");
  els.checkoutView.classList.toggle("view-active", name === "checkout");
  window.scrollTo({ top: 0, behavior: "smooth" });
}

function getFilteredProducts() {
  const term = state.search.trim().toLowerCase();
  return products.filter(product => {
    const matchesFilter = state.filter === "all" || product.game === state.filter;
    const haystack = `${product.title} ${product.short} ${product.description} ${product.label}`.toLowerCase();
    const matchesSearch = !term || haystack.includes(term);
    return matchesFilter && matchesSearch;
  });
}

function setFilter(filter) {
  state.filter = filter;
  els.categoryPills.forEach(pill => pill.classList.toggle("active", pill.dataset.filter === filter));
  renderProducts();
}

function setSearch(value) {
  state.search = value;
  if (els.topSearch && els.topSearch.value !== value) els.topSearch.value = value;
  if (els.catalogSearch && els.catalogSearch.value !== value) els.catalogSearch.value = value;
  renderProducts();
}

function productCard(product) {
  return `
    <article class="product-card">
      <button class="product-art ${product.theme}" type="button" data-action="details" data-id="${product.id}" aria-label="Abrir ${product.title}">
        <span class="art-badge">${product.label}</span>
        <div class="art-lines"><span></span><span></span><span></span></div>
      </button>
      <div class="product-body">
        <div class="product-meta">
          <span class="product-label">${product.short}</span>
          <span class="discount-pill">-${product.discount}%</span>
        </div>
        <h3>${product.title}</h3>
        <p>${product.description}</p>
        <div class="price-row">
          <div class="price-stack">
            <span class="old-price">${formatPrice(product.oldPrice)}</span>
            <strong>${formatPrice(product.price)}</strong>
            <small>À vista no Pix</small>
          </div>
        </div>
        <div class="card-actions">
          <button class="ghost-button" type="button" data-action="details" data-id="${product.id}">Detalhes</button>
          <button class="primary-button" type="button" data-action="details" data-id="${product.id}">Comprar</button>
        </div>
      </div>
    </article>
  `;
}

function renderProducts() {
  const filtered = getFilteredProducts();
  els.productGrid.innerHTML = filtered.map(productCard).join("");
  els.productGrid.style.display = filtered.length ? "grid" : "none";
  els.emptyState.style.display = filtered.length ? "block" : "none";
}

function setArtClass(element, product) {
  if (!element) return;
  element.className = `product-art ${product.theme}`;
}

function openProduct(productId) {
  const product = products.find(item => item.id === productId);
  if (!product) return;
  state.selectedProduct = product;

  setArtClass(els.detailArt, product);
  els.detailBadge.textContent = product.label;
  els.detailArtTitle.textContent = product.title;
  els.detailArtSubtitle.textContent = product.short;
  els.detailLabel.textContent = product.label;
  els.detailTitle.textContent = product.title;
  els.detailDescription.textContent = product.description;
  els.detailOldPrice.textContent = formatPrice(product.oldPrice);
  els.detailPrice.textContent = formatPrice(product.price);
  els.detailDiscount.textContent = `-${product.discount}%`;
  els.detailCompatibility.textContent = product.compatibility;
  els.detailIncludes.innerHTML = product.includes.map(item => `<li>${item}</li>`).join("");

  if (els.cartCount) els.cartCount.textContent = "1";
  showView("product");
}

function renderCheckout() {
  const product = state.selectedProduct;
  setArtClass(els.summaryArt, product);
  els.summaryTitle.textContent = product.title;
  els.summaryLabel.textContent = product.label;
  els.summarySubtotal.textContent = formatPrice(product.price);
  els.summaryTotalPhone.textContent = formatPrice(product.price);
  renderPaymentPanel();
}

function openCheckout() {
  renderCheckout();
  showView("checkout");
}

function renderPaymentPanel() {
  const product = state.selectedProduct;
  const amount = formatPrice(product.price);

  const panels = {
    pix: `
      <strong>Pix selecionado</strong>
      <p>Será gerado um QR Code e um código copia e cola para o cliente pagar ${amount}.</p>
      <code>00020126...KNXITS-${product.id.toUpperCase()}...6304</code>
    `,
    card: `
      <strong>Cartão selecionado</strong>
      <p>Conecte um gateway de pagamento para receber crédito ou débito com segurança.</p>
      <code>Checkout de cartão aguardando integração</code>
    `,
    crypto: `
      <strong>Crypto moedas selecionado</strong>
      <p>Prepare carteiras ou gateway para receber USDT, BTC ou ETH e liberar o produto após confirmação.</p>
      <code>USDT / BTC / ETH aguardando integração</code>
    `
  };

  els.paymentPanel.innerHTML = panels[state.paymentMethod];
  els.paymentStatusTitle.textContent = state.paymentMethod === "pix" ? "Cobrança gerada" : state.paymentMethod === "card" ? "Pagamento com cartão" : "Pagamento crypto";
  els.paymentMethods.querySelectorAll(".payment-option").forEach(option => {
    option.classList.toggle("active", option.dataset.method === state.paymentMethod);
  });
}

els.categoryPills.forEach(pill => {
  pill.addEventListener("click", () => setFilter(pill.dataset.filter));
});

if (els.viewAllButton) {
  els.viewAllButton.addEventListener("click", () => {
    setFilter("all");
    document.getElementById("produtos").scrollIntoView({ behavior: "smooth" });
  });
}

[els.topSearch, els.catalogSearch].forEach(input => {
  if (!input) return;
  input.addEventListener("input", event => setSearch(event.target.value));
});

els.searchFocus.addEventListener("click", () => {
  showView("home");
  document.getElementById("produtos").scrollIntoView({ behavior: "smooth" });
  setTimeout(() => (els.catalogSearch || els.topSearch)?.focus(), 350);
});

els.productGrid.addEventListener("click", event => {
  const button = event.target.closest("[data-action='details']");
  if (!button) return;
  openProduct(button.dataset.id);
});

els.goCheckoutButton.addEventListener("click", openCheckout);

els.copyProductButton.addEventListener("click", async () => {
  const name = state.selectedProduct.title;
  try {
    await navigator.clipboard.writeText(name);
    showToast("Nome do produto copiado.");
  } catch (error) {
    showToast(name);
  }
});

els.paymentMethods.addEventListener("click", event => {
  const option = event.target.closest(".payment-option");
  if (!option) return;
  state.paymentMethod = option.dataset.method;
  renderPaymentPanel();
});

els.finishOrderButton.addEventListener("click", () => {
  showToast("Tela pronta. Falta conectar a API de pagamento real.");
});

els.cartToggle.addEventListener("click", () => {
  if (!state.selectedProduct) return showToast("Escolha um produto primeiro.");
  openCheckout();
});

els.menuToggle.addEventListener("click", () => {
  els.mobileMenu.classList.toggle("open");
});

els.mobileMenu.addEventListener("click", event => {
  if (!event.target.closest("a")) return;
  els.mobileMenu.classList.remove("open");
  showView("home");
});

document.addEventListener("click", event => {
  if (event.target.closest("[data-back-home]") || event.target.closest("[data-route='home']")) {
    showView("home");
  }
  if (event.target.closest("[data-back-product]")) {
    showView("product");
  }
});

document.addEventListener("keydown", event => {
  if (event.key === "Escape") showView("home");
});

renderProducts();
renderCheckout();
