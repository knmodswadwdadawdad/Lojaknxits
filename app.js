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
    compatibility: "Android mobile. Inclui perfis para controle, rush e balanceado.",
    includes: ["3 perfis de sensi", "Guia de comparação", "Recomendações de uso", "Atualização do pacote inicial"]
  }
];

const state = {
  filter: "all",
  search: "",
  selectedProductId: localStorage.getItem("knxits-selected-product") || products[0].id,
  paymentMethod: "pix"
};

const els = {
  homeView: document.getElementById("homeView"),
  productView: document.getElementById("productView"),
  checkoutView: document.getElementById("checkoutView"),
  productGrid: document.getElementById("productGrid"),
  emptyState: document.getElementById("emptyState"),
  categoryGrid: document.getElementById("categoryGrid"),
  productSearch: document.getElementById("productSearch"),
  searchFocus: document.getElementById("searchFocus"),
  cartToggle: document.getElementById("cartToggle"),
  cartCount: document.getElementById("cartCount"),
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
  copyProductButton: document.getElementById("copyProductButton"),
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

function getSelectedProduct() {
  return products.find(product => product.id === state.selectedProductId) || products[0];
}

function themeClass(product) {
  return `theme-${product.theme || "blue"}`;
}

function setProductArt(element, product) {
  element.className = `product-art ${themeClass(product)}`;
}

function productCardTemplate(product) {
  return `
    <article class="product-card">
      <div class="product-art ${themeClass(product)}">
        <span class="art-badge">${product.label}</span>
        <div class="art-device"><span></span><span></span><span></span><span></span></div>
        <strong>${product.title}</strong>
        <small>${product.short}</small>
      </div>
      <div class="product-body">
        <div class="product-meta">
          <span>${product.label}</span>
          <span>Digital</span>
        </div>
        <h3>${product.title}</h3>
        <p>${product.description}</p>
        <div class="price-row">
          <div>
            <span class="old-price">${formatPrice(product.oldPrice)}</span>
            <strong>${formatPrice(product.price)}</strong>
            <div class="pix-line">À vista no Pix</div>
          </div>
          <span class="discount-pill">-${product.discount}%</span>
        </div>
        <div class="product-actions">
          <button class="details-button" type="button" data-open-detail="${product.id}">Ver detalhes</button>
          <button class="buy-button" type="button" data-buy-product="${product.id}">Comprar</button>
        </div>
      </div>
    </article>
  `;
}

function getFilteredProducts() {
  const term = state.search.trim().toLowerCase();
  return products.filter(product => {
    const matchesFilter = state.filter === "all" || product.game === state.filter;
    const searchable = `${product.title} ${product.label} ${product.description}`.toLowerCase();
    const matchesSearch = !term || searchable.includes(term);
    return matchesFilter && matchesSearch;
  });
}

function renderProducts() {
  const filtered = getFilteredProducts();
  els.productGrid.innerHTML = filtered.map(productCardTemplate).join("");
  els.productGrid.style.display = filtered.length ? "grid" : "none";
  els.emptyState.style.display = filtered.length ? "none" : "block";
}

function renderProductDetail() {
  const product = getSelectedProduct();
  setProductArt(els.detailArt, product);
  els.detailBadge.textContent = product.label;
  els.detailArtTitle.textContent = product.title;
  els.detailArtSubtitle.textContent = product.short;
  els.detailLabel.textContent = product.label;
  els.detailTitle.textContent = product.title;
  els.detailDescription.textContent = product.description;
  els.detailOldPrice.textContent = product.oldPrice ? formatPrice(product.oldPrice) : "";
  els.detailPrice.textContent = formatPrice(product.price);
  els.detailDiscount.textContent = `-${product.discount}%`;
  els.detailIncludes.innerHTML = product.includes.map(item => `<li>${item}</li>`).join("");
  els.detailCompatibility.textContent = product.compatibility;
  localStorage.setItem("knxits-selected-product", product.id);
}

function renderCheckout() {
  const product = getSelectedProduct();
  setProductArt(els.summaryArt, product);
  els.summaryTitle.textContent = product.title;
  els.summaryLabel.textContent = product.label;
  els.summarySubtotal.textContent = formatPrice(product.price);
  els.summaryTotal.textContent = formatPrice(product.price);
  renderPaymentPanel();
}

function showView(viewName) {
  els.homeView.classList.remove("view-active");
  els.productView.classList.remove("view-active");
  els.checkoutView.classList.remove("view-active");

  if (viewName === "product") {
    renderProductDetail();
    els.productView.classList.add("view-active");
  } else if (viewName === "checkout") {
    renderCheckout();
    els.checkoutView.classList.add("view-active");
  } else {
    els.homeView.classList.add("view-active");
  }

  window.scrollTo({ top: 0, behavior: "smooth" });
}

function selectProduct(productId, nextView = "product") {
  const exists = products.some(product => product.id === productId);
  if (!exists) return;
  state.selectedProductId = productId;
  els.cartCount.textContent = "1";
  showView(nextView);
}

function setPaymentMethod(method) {
  state.paymentMethod = method;
  document.querySelectorAll(".payment-option").forEach(button => {
    button.classList.toggle("active", button.dataset.method === method);
  });
  renderPaymentPanel();
}

function renderPaymentPanel() {
  const product = getSelectedProduct();
  const amount = formatPrice(product.price);

  if (state.paymentMethod === "card") {
    els.paymentPanel.innerHTML = `
      <h3>Pagamento com cartão</h3>
      <p>Campos visuais prontos. Depois conectamos isso a um gateway seguro, sem salvar dados do cartão no frontend.</p>
      <div class="form-grid">
        <label class="field"><span>Nome no cartão</span><input type="text" placeholder="Nome completo" /></label>
        <label class="field"><span>Número do cartão</span><input type="text" inputmode="numeric" placeholder="0000 0000 0000 0000" /></label>
        <div class="form-grid two">
          <label class="field"><span>Validade</span><input type="text" inputmode="numeric" placeholder="MM/AA" /></label>
          <label class="field"><span>CVV</span><input type="text" inputmode="numeric" placeholder="123" /></label>
        </div>
      </div>
    `;
    els.finishOrderButton.textContent = "Pagar com cartão";
    return;
  }

  if (state.paymentMethod === "crypto") {
    els.paymentPanel.innerHTML = `
      <h3>Pagamento com crypto moedas</h3>
      <p>Escolha a moeda. A carteira/endereço real deve vir do backend ou de uma API de pagamento crypto.</p>
      <div class="crypto-grid">
        <div class="crypto-item"><strong>USDT</strong><span>Rede TRC20/BEP20</span></div>
        <div class="crypto-item"><strong>BTC</strong><span>Bitcoin</span></div>
        <div class="crypto-item"><strong>ETH</strong><span>Ethereum</span></div>
      </div>
      <div class="form-grid">
        <label class="field"><span>Moeda desejada</span><select><option>USDT</option><option>BTC</option><option>ETH</option></select></label>
      </div>
    `;
    els.finishOrderButton.textContent = "Continuar com crypto";
    return;
  }

  els.paymentPanel.innerHTML = `
    <h3>Pagamento via Pix</h3>
    <p>Valor do pedido: <strong>${amount}</strong>. O código abaixo é exemplo visual até conectar o provedor Pix.</p>
    <div class="pix-copy">
      <div class="pix-code" id="pixCode">00020126580014BR.GOV.BCB.PIX0136KNXITS-PIX-DEMO-NAO-PAGAR-${product.id.toUpperCase()}520400005303986540${product.price.toFixed(2)}5802BR5925KNXITS STORE6009SAO PAULO</div>
      <button class="copy-button" type="button" data-copy-pix>Copiar</button>
    </div>
  `;
  els.finishOrderButton.textContent = "Gerar Pix";
}

let toastTimer;
function showToast(message) {
  els.toast.textContent = message;
  els.toast.classList.add("show");
  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => els.toast.classList.remove("show"), 2600);
}

els.productGrid.addEventListener("click", event => {
  const detailButton = event.target.closest("[data-open-detail]");
  const buyButton = event.target.closest("[data-buy-product]");

  if (detailButton) selectProduct(detailButton.dataset.openDetail, "product");
  if (buyButton) selectProduct(buyButton.dataset.buyProduct, "product");
});

els.categoryGrid.addEventListener("click", event => {
  const button = event.target.closest("[data-filter]");
  if (!button) return;

  state.filter = button.dataset.filter;
  document.querySelectorAll(".category-card").forEach(item => item.classList.remove("active"));
  button.classList.add("active");
  renderProducts();
  document.getElementById("produtos").scrollIntoView({ behavior: "smooth" });
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
  }, 250);
});

els.cartToggle.addEventListener("click", () => {
  if (!state.selectedProductId) {
    showToast("Escolha um produto primeiro.");
    return;
  }
  showView("checkout");
});

els.goCheckoutButton.addEventListener("click", () => showView("checkout"));

els.copyProductButton.addEventListener("click", async () => {
  const product = getSelectedProduct();
  try {
    await navigator.clipboard.writeText(product.title);
    showToast("Nome do produto copiado.");
  } catch (error) {
    showToast(product.title);
  }
});

els.paymentMethods.addEventListener("click", event => {
  const button = event.target.closest("[data-method]");
  if (!button) return;
  setPaymentMethod(button.dataset.method);
});

els.paymentPanel.addEventListener("click", async event => {
  const button = event.target.closest("[data-copy-pix]");
  if (!button) return;
  const code = document.getElementById("pixCode")?.textContent || "";
  try {
    await navigator.clipboard.writeText(code);
    showToast("Código Pix copiado.");
  } catch (error) {
    showToast("Não foi possível copiar automaticamente.");
  }
});

els.finishOrderButton.addEventListener("click", () => {
  const product = getSelectedProduct();
  const labels = { pix: "Pix", card: "cartão", crypto: "crypto moedas" };
  showToast(`Pedido de ${product.title} pronto para conectar pagamento por ${labels[state.paymentMethod]}.`);
});

document.querySelectorAll("[data-back-home]").forEach(button => {
  button.addEventListener("click", () => showView("home"));
});

document.querySelectorAll("[data-back-product]").forEach(button => {
  button.addEventListener("click", () => showView("product"));
});

document.querySelectorAll("[data-route='home']").forEach(link => {
  link.addEventListener("click", () => {
    showView("home");
    els.mobileMenu.classList.remove("open");
  });
});

document.querySelectorAll("[data-scroll-categories]").forEach(button => {
  button.addEventListener("click", () => document.getElementById("categorias").scrollIntoView({ behavior: "smooth" }));
});

els.menuToggle.addEventListener("click", () => {
  els.mobileMenu.classList.toggle("open");
});

window.addEventListener("keydown", event => {
  if (event.key === "Escape") {
    showView("home");
    els.mobileMenu.classList.remove("open");
  }
});

renderProducts();
renderProductDetail();
renderCheckout();
els.cartCount.textContent = localStorage.getItem("knxits-selected-product") ? "1" : "0";
