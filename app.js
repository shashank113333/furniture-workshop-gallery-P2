"use strict";

(function () {
  function logTelemetry(action, detail) {
    const detailText = detail ? ` - ${detail}` : "";
    console.log(`[Analytics] User interacted with Handcrafted Furniture Workshop Gallery - ${action}${detailText}`);
  }

  function sanitizeText(str) {
    if (typeof str !== "string") return "";
    return str
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;")
      .replace(/'/g, "&#x27;")
      .replace(/\//g, "&#x2F;");
  }

  const initialItems = [
    {
      id: "FW-1",
      title: "Solid Teak Dining Table",
      wood: "Teak",
      price: 2400,
      joinery: "Mortise and Tenon",
      status: "Available",
      dimensions: "84L x 38W x 30H",
      image: "https://images.unsplash.com/photo-1615066390971-03e4e1c36ddf?auto=format&fit=crop&w=600&q=80"
    },
    {
      id: "FW-2",
      title: "Walnut Low-Back Lounge Chair",
      wood: "Walnut",
      price: 1350,
      joinery: "Bridle Joinery",
      status: "Available",
      dimensions: "30W x 32D x 28H",
      image: "https://images.unsplash.com/photo-1567538096630-e0c55bd6374c?auto=format&fit=crop&w=600&q=80"
    },
    {
      id: "FW-3",
      title: "Quarter-Sawn White Oak Credenza",
      wood: "Oak",
      price: 3100,
      joinery: "Half-Blind Dovetails",
      status: "In Progress",
      dimensions: "72L x 20D x 32H",
      image: "https://images.unsplash.com/photo-1595428774223-ef52624120d2?auto=format&fit=crop&w=600&q=80"
    },
    {
      id: "FW-4",
      title: "Ash Floating Drafting Desk",
      wood: "Ash",
      price: 1950,
      joinery: "Through-Tenon Splines",
      status: "Available",
      dimensions: "60W x 28D x 30H",
      image: "https://images.unsplash.com/photo-1518455027359-f3f8164ba6bd?auto=format&fit=crop&w=600&q=80"
    },
    {
      id: "FW-5",
      title: "Live Edge Walnut Bench",
      wood: "Walnut",
      price: 980,
      joinery: "Butterfly Key Inlays",
      status: "Reserved",
      dimensions: "54L x 16D x 18H",
      image: "https://images.unsplash.com/photo-1538688525198-9b88f6f53126?auto=format&fit=crop&w=600&q=80"
    },
    {
      id: "FW-6",
      title: "Scandinavian Oak Bookshelf",
      wood: "Oak",
      price: 1750,
      joinery: "Sliding Housing",
      status: "In Progress",
      dimensions: "42W x 14D x 70H",
      image: "https://images.unsplash.com/photo-1594026112284-02bb6f3352fe?auto=format&fit=crop&w=600&q=80"
    }
  ];

  let catalog = [...initialItems];

  const searchInput = document.getElementById("search-input");
  const woodFilter = document.getElementById("wood-filter");
  const statusFilter = document.getElementById("status-filter");
  const slow3gToggle = document.getElementById("slow-3g-toggle");
  const loadingSpinner = document.getElementById("loading-spinner");
  const cardsGrid = document.getElementById("cards-grid");
  const emptyStateView = document.getElementById("empty-state-view");
  const resetFiltersBtn = document.getElementById("reset-filters-btn");
  const resultsCount = document.getElementById("results-count");
  const networkStatusText = document.getElementById("network-status-text");
  const furnitureForm = document.getElementById("furniture-form");
  const fileInput = document.getElementById("item-file");

  let delayTimer = null;
  let currentUploadedPhoto = "";

  if (fileInput) {
    fileInput.addEventListener("change", function () {
      if (fileInput.files && fileInput.files[0]) {
        const reader = new FileReader();
        reader.onload = function (e) {
          currentUploadedPhoto = e.target.result;
        };
        reader.readAsDataURL(fileInput.files[0]);
      } else {
        currentUploadedPhoto = "";
      }
    });
  }

  function renderCatalog() {
    loadingSpinner.hidden = true;

    const query = searchInput.value.toLowerCase().trim();
    const wood = woodFilter.value;
    const status = statusFilter.value;

    const filtered = catalog.filter(function (item) {
      const matchQuery =
        !query ||
        item.title.toLowerCase().includes(query) ||
        item.wood.toLowerCase().includes(query) ||
        item.joinery.toLowerCase().includes(query);

      const matchWood = wood === "ALL" || item.wood === wood;
      const matchStatus = status === "ALL" || item.status === status;

      return matchQuery && matchWood && matchStatus;
    });

    resultsCount.textContent = `${filtered.length} items`;

    if (filtered.length === 0) {
      cardsGrid.innerHTML = "";
      cardsGrid.hidden = true;
      emptyStateView.hidden = false;
      return;
    }

    emptyStateView.hidden = true;
    cardsGrid.hidden = false;

    cardsGrid.innerHTML = filtered
      .map(function (item) {
        const safeTitle = sanitizeText(item.title);
        const safeWood = sanitizeText(item.wood);
        const safeJoinery = sanitizeText(item.joinery);
        const safeStatus = sanitizeText(item.status);
        const safeDims = sanitizeText(item.dimensions);
        const formattedPrice = Number(item.price).toLocaleString("en-US");
        const defaultFallback = "https://images.unsplash.com/photo-1538688525198-9b88f6f53126?auto=format&fit=crop&w=600&q=80";
        const itemImg = item.image || defaultFallback;

        return `
        <article class="card">
          <div class="card-img-container">
            <img src="${itemImg}" alt="${safeTitle} in ${safeWood}" class="card-img" loading="lazy">
            <span class="card-badge">${safeStatus}</span>
          </div>

          <div class="card-body">
            <h3 class="card-title">${safeTitle}</h3>

            <ul class="card-specs">
              <li class="card-spec-row">
                <span class="spec-title">Timber:</span>
                <span class="spec-value">${safeWood}</span>
              </li>
              <li class="card-spec-row">
                <span class="spec-title">Joinery:</span>
                <span class="spec-value">${safeJoinery}</span>
              </li>
              <li class="card-spec-row">
                <span class="spec-title">Dimensions:</span>
                <span class="spec-value">${safeDims}</span>
              </li>
            </ul>
          </div>

          <div class="card-footer">
            <div>
              <span class="card-price-label">Price</span>
              <span class="card-price">$${formattedPrice}</span>
            </div>
          </div>
        </article>
      `;
      })
      .join("");
  }

  function applyFilters(actionName, detail) {
    if (slow3gToggle.checked) {
      loadingSpinner.hidden = false;
      cardsGrid.hidden = true;
      emptyStateView.hidden = true;

      if (delayTimer) clearTimeout(delayTimer);

      delayTimer = setTimeout(function () {
        renderCatalog();
        logTelemetry(actionName, detail);
      }, 500);
    } else {
      renderCatalog();
      logTelemetry(actionName, detail);
    }
  }

  searchInput.addEventListener("input", function () {
    const query = searchInput.value.trim();
    applyFilters("Search Query Executed", query ? `Search: "${query}"` : "Search Cleared");
  });

  woodFilter.addEventListener("change", function () {
    applyFilters("Filter Changed", `Wood: ${woodFilter.value}`);
  });

  statusFilter.addEventListener("change", function () {
    applyFilters("Filter Changed", `Status: ${statusFilter.value}`);
  });

  slow3gToggle.addEventListener("change", function () {
    if (slow3gToggle.checked) {
      networkStatusText.textContent = "Network: Slow 3G (Simulated)";
      logTelemetry("Slow 3G Latency Simulation Enabled");
    } else {
      networkStatusText.textContent = "Network: Online";
      logTelemetry("Slow 3G Latency Simulation Disabled");
    }
  });

  resetFiltersBtn.addEventListener("click", function () {
    searchInput.value = "";
    woodFilter.value = "ALL";
    statusFilter.value = "ALL";
    applyFilters("Filters Reset to Default");
    searchInput.focus();
  });

  function clearErrors() {
    const errorInputs = document.querySelectorAll(".input-error");
    for (let i = 0; i < errorInputs.length; i++) {
      errorInputs[i].classList.remove("input-error");
    }
    const errorSpans = document.querySelectorAll(".error-text");
    for (let j = 0; j < errorSpans.length; j++) {
      errorSpans[j].textContent = "";
    }
  }

  function markFieldError(inputElement, errorElementId, message) {
    inputElement.classList.add("input-error");
    const errSpan = document.getElementById(errorElementId);
    if (errSpan) {
      errSpan.textContent = message;
    }

    function removeError() {
      inputElement.classList.remove("input-error");
      if (errSpan) {
        errSpan.textContent = "";
      }
      inputElement.removeEventListener("input", removeError);
      inputElement.removeEventListener("change", removeError);
    }

    inputElement.addEventListener("input", removeError);
    inputElement.addEventListener("change", removeError);
  }

  furnitureForm.addEventListener("submit", function (e) {
    e.preventDefault();
    clearErrors();

    let isValid = true;
    let firstInvalidInput = null;

    const titleEl = document.getElementById("item-title");
    if (!titleEl.value.trim()) {
      markFieldError(titleEl, "title-error", "Piece title is required.");
      isValid = false;
      if (!firstInvalidInput) firstInvalidInput = titleEl;
    }

    const woodEl = document.getElementById("item-wood");
    if (!woodEl.value) {
      markFieldError(woodEl, "wood-error", "Please select wood species.");
      isValid = false;
      if (!firstInvalidInput) firstInvalidInput = woodEl;
    }

    const priceEl = document.getElementById("item-price");
    const numPrice = parseFloat(priceEl.value);
    if (isNaN(numPrice) || numPrice <= 0) {
      markFieldError(priceEl, "price-error", "Please enter a valid price.");
      isValid = false;
      if (!firstInvalidInput) firstInvalidInput = priceEl;
    }

    const joineryEl = document.getElementById("item-joinery");
    if (!joineryEl.value.trim()) {
      markFieldError(joineryEl, "joinery-error", "Joinery method is required.");
      isValid = false;
      if (!firstInvalidInput) firstInvalidInput = joineryEl;
    }

    const statusEl = document.getElementById("item-status");
    if (!statusEl.value) {
      markFieldError(statusEl, "status-error", "Please select status.");
      isValid = false;
      if (!firstInvalidInput) firstInvalidInput = statusEl;
    }

    const dimsEl = document.getElementById("item-dimensions");
    if (!dimsEl.value.trim()) {
      markFieldError(dimsEl, "dimensions-error", "Dimensions are required.");
      isValid = false;
      if (!firstInvalidInput) firstInvalidInput = dimsEl;
    }

    if (!isValid) {
      if (firstInvalidInput) {
        firstInvalidInput.focus();
      }
      logTelemetry("Form Submission Rejected - Validation Failed");
      return;
    }

    const defaultImage = "https://images.unsplash.com/photo-1538688525198-9b88f6f53126?auto=format&fit=crop&w=600&q=80";

    const newItem = {
      id: `FW-${Date.now()}`,
      title: sanitizeText(titleEl.value.trim()),
      wood: sanitizeText(woodEl.value),
      price: numPrice,
      joinery: sanitizeText(joineryEl.value.trim()),
      status: sanitizeText(statusEl.value),
      dimensions: sanitizeText(dimsEl.value.trim()),
      image: currentUploadedPhoto || defaultImage
    };

    catalog.unshift(newItem);
    furnitureForm.reset();
    currentUploadedPhoto = "";
    applyFilters("New Workshop Piece Added Successfully", newItem.title);
  });

  renderCatalog();
  logTelemetry("Initial Catalog Rendered");
})();