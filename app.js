const products = [
  {
    id: "ff-pro",
    game: "free-fire",
    label: "Free Fire",
    title: "Sensi Pro Android",
    short: "Controle + puxada",
    description: "Configuração equilibrada para puxada de capa, controle de câmera e movimentação. Ideal para quem quer uma base pronta e organizada para ajustar no próprio aparelho.",
    oldPrice: 49.90,
    price: 19.90,
    discount: 60,
    theme: "green",
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
    oldPrice: 59.90,
    price: 24.90,
    discount: 58,
    theme: "blue",
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
    oldPrice: 39.90,
    price: 14.90,
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
    oldPrice: 69.90,
    price: 29.90,
    discount: 57,
    theme: "red",
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
    oldPrice: 79.90,
    price: 34.90,
    discount: 56,
    theme: "blue",
    compatibility: "Android mobile. Focado em COD Mobile, mira por zoom e movimentação mais controlada.",
    includes: ["Sensibilidade por zoom", "Ajuste tático", "Configuração de câmera", "Checklist de testes"]
  },
  {
    id: "full-pack",
    game: "free-fire",
    label: "Pacote",
    title: "Pack Completo Sensi",
    short: "3 perfis inclusos",
    description: "Pacote com três perfis diferentes para testar, comparar e escolher o que mais combina com seu jeito de jogar.",
    oldPrice: 99.90,
    price: 39.90,
    discount: 60,
    theme: "green",
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
  filters: document.getElementById("filters"),
  productSearch: document.getElementById("productSearch"),
  searchFocus: document.getElementById("searchFocus"),
  menuToggle: document.getElementById("menuToggle"),
  mobileMenu: document.getElementById("mobileMenu"),
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
  summaryArt: document.getElementById("summaryArt"),
  summaryTitle: document.getElementById("summaryTitle"),
  summaryLabel: document.getElementById("summaryLabel"),
  summarySubtotal: document.getElementById("summarySubtotal"),
  summaryTotal: document.getElementById("summaryTotal"),
  paymentMethods: document.getElementById("paymentMethods"),
  paymentPanel: document.getElementById("paymentPanel"),
  finishOrderButton: document.getElementById("finishOrderButton"),
  toast: document.getElementById("toast")
};

function formatPrice(value) {
  return value.toLocaleString("pt-BR", { style: "currency", currency: "BRL" });
}

function showView(viewName) {
  els.homeView.classList.toggle("view-active", viewName === "home");
  els.productView.classList.toggle("view-active", viewName === "product");
  els.checkoutView.classList.toggle("view-active", viewName === "checkout");
  window.scrollTo({ top: 0, behavior: "smooth" });
}

function filteredProducts() {
  const term = state.search.trim().toLowerCase();
  return products.filter(product => {
    const matchesFilter = state.filter === "all" || product.game === state.filter;
    const matchesSearch = !term || `${product.title} ${product.short} ${product.description} ${product.label}`.toLowerCase().includes(term);
    return matchesFilter && matchesSearch;
  });
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
          <button class="outline-button" type="button" data-action="details" data-id="${product.id}">Detalhes</button>
          <button class="primary-button" type="button" data-action="details" data-id="${product.id}">Comprar</button>
        </div>
      </div>
    </article>
  `;
}

function renderProducts() {
  const list = filteredProducts();
  els.productGrid.innerHTML = list.map(productCard).join("");
  els.productGrid.style.display = list.length ? "grid" : "none";
  els.emptyState.style.display = list.length ? "grid" : "none";
}

function setProductArt(element, product) {
  element.className = `product-art ${product.theme}`;
}

function openProduct(productId) {
  const product = products.find(item => item.id === productId) || products[0];
  state.selectedProduct = product;

  setProductArt(els.detailArt, product);
  els.detailBadge.textContent = product.label;
  els.detailArtTitle.textContent = product.title;
  els.detailArtSubtitle.textContent = product.short;
  els.detailLabel.textContent = product.label;
  els.detailTitle.textContent = product.title;
  els.detailDescription.textContent = product.description;
  els.detailOldPrice.textContent = formatPrice(product.oldPrice);
  els.detailPrice.textContent = formatPrice(product.price);
  els.detailDiscount.textContent = `-${product.discount}%`;
  els.detailIncludes.innerHTML = product.includes.map(item => `<li>${item}</li>`).join("");
  els.detailCompatibility.textContent = product.compatibility;

  showView("product");
}

function renderCheckout() {
  const product = state.selectedProduct || products[0];
  setProductArt(els.summaryArt, product);
  els.summaryTitle.textContent = product.title;
  els.summaryLabel.textContent = product.label;
  els.summarySubtotal.textContent = formatPrice(product.price);
  els.summaryTotal.textContent = formatPrice(product.price);
  renderPaymentPanel();
}

function openCheckout() {
  renderCheckout();
  showView("checkout");
}

function renderPaymentPanel() {
  const product = state.selectedProduct || products[0];
  const panels = {
    pix: `
      <h3>Pagamento via Pix</h3>
      <p>Ideal para aprovação rápida. Depois conectamos a API para gerar QR Code e copia e cola real.</p>
      <div class="payment-info-grid">
        <div><span>Produto</span><strong>${product.title}</strong></div>
        <div><span>Total</span><strong>${formatPrice(product.price)}</strong></div>
        <div><span>Status</span><strong>Aguardando integração Pix</strong></div>
      </div>
    `,
    card: `
      <h3>Pagamento com cartão</h3>
      <p>Área preparada para cartão de crédito ou débito. Os campos reais devem vir do provedor de pagamento.</p>
      <div class="payment-info-grid">
        <div><span>Bandeiras</span><strong>Visa, Mastercard e outras</strong></div>
        <div><span>Segurança</span><strong>Checkout tokenizado</strong></div>
        <div><span>Status</span><strong>Aguardando API de cartão</strong></div>
      </div>
    `,
    crypto: `
      <h3>Pagamento com crypto moedas</h3>
      <p>Área preparada para USDT, BTC ou ETH. Depois conectamos carteira/gateway e confirmação automática.</p>
      <div class="payment-info-grid">
        <div><span>Moedas</span><strong>USDT, BTC, ETH</strong></div>
        <div><span>Rede</span><strong>Definir no backend</strong></div>
        <div><span>Status</span><strong>Aguardando integração crypto</strong></div>
      </div>
    `
  };

  els.paymentPanel.innerHTML = panels[state.paymentMethod];
}

let toastTimer;
function showToast(message) {
  els.toast.textContent = message;
  els.toast.classList.add("show");
  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => els.toast.classList.remove("show"), 2400);
}

els.productGrid.addEventListener("click", event => {
  const button = event.target.closest("[data-action='details']");
  if (!button) return;
  openProduct(button.dataset.id);
});

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

els.searchFocus.addEventListener("click", () => {
  showView("home");
  setTimeout(() => {
    document.getElementById("produtos").scrollIntoView({ behavior: "smooth" });
    els.productSearch.focus();
  }, 150);
});

els.goCheckoutButton.addEventListener("click", openCheckout);

els.paymentMethods.addEventListener("click", event => {
  const button = event.target.closest(".payment-option");
  if (!button) return;

  document.querySelectorAll(".payment-option").forEach(item => item.classList.remove("active"));
  button.classList.add("active");
  state.paymentMethod = button.dataset.method;
  renderPaymentPanel();
});

els.finishOrderButton.addEventListener("click", () => {
  const labels = { pix: "Pix", card: "cartão", crypto: "crypto moedas" };
  showToast(`Pagamento por ${labels[state.paymentMethod]} pronto para conectar na API.`);
});

document.querySelectorAll("[data-back-home], [data-route='home']").forEach(element => {
  element.addEventListener("click", event => {
    event.preventDefault();
    showView("home");
    const href = element.getAttribute("href");
    if (href && href.startsWith("#")) {
      setTimeout(() => document.querySelector(href)?.scrollIntoView({ behavior: "smooth" }), 120);
    }
  });
});

document.querySelectorAll("[data-back-product]").forEach(element => {
  element.addEventListener("click", () => showView("product"));
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

renderProducts();
openProduct(products[0].id);
showView("home");
