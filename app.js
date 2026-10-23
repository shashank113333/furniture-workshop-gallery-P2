"use strict";

(function () {
  const DICT = {
    en: {
      skip: "Skip to Gallery Content",
      heading: "Workshop Gallery",
      subheading: "Handcrafted Furniture • Internal Floor Staff System",
      netOnline: "Network: Online",
      netSlow: "Network: Slow 3G (Simulated)",
      searchLabel: "Search Inventory",
      searchPlaceholder: "Search by name, wood type, or joinery...",
      woodLabel: "Wood Species",
      statusLabel: "Availability",
      slow3g: "Simulate Slow 3G",
      sync: "Synchronizing workshop records...",
      catalogTitle: "Current Workshop Pieces",
      emptyTitle: "No data found",
      emptyDesc: "No handcrafted pieces match your search or filter criteria.",
      resetBtn: "Reset Filters",
      formTitle: "Log New Workshop Piece",
      formSubtext: "Fields marked with an asterisk (*) are mandatory.",
      labelTitle: "Piece Title",
      labelWood: "Wood Species",
      labelPrice: "Base Price",
      labelJoinery: "Joinery Method",
      labelStatus: "Floor Status",
      labelDims: "Dimensions",
      labelPhoto: "Upload Photo from Gallery (Optional)",
      submitBtn: "Save to Gallery",
      specTimber: "Timber:",
      specJoinery: "Joinery:",
      specDims: "Dimensions:",
      specPrice: "Price",
      allSpecies: "All Species",
      allStatuses: "All Statuses",
      selectSpecies: "Select Species...",
      statusAvail: "Available",
      statusProg: "In Progress",
      statusRes: "Reserved",
      woodTeak: "Teak",
      woodWalnut: "Walnut",
      woodOak: "Oak",
      woodAsh: "Ash",
      errTitle: "Piece title is required.",
      errWood: "Please select wood species.",
      errPrice: "Please enter a valid price.",
      errJoinery: "Joinery method is required.",
      errStatus: "Please select status.",
      errDims: "Dimensions are required.",
      footerBrand: "Atelier Heritage Woodworks",
      footerAbout: "Internal floor staff management and artisan joinery catalog system. Engineered for high-reliability warehouse and workshop environments.",
      footerTitle: "Floor Operations",
      foot1: "Timber Inventory Tracking",
      foot2: "Joinery Specification Index",
      foot3: "Custom Commission Dispatch",
      footerCopy: "© Atelier Heritage Woodworks. All rights reserved. Internal operational interface."
    },
    hi: {
      skip: "गैलरी सामग्री पर जाएँ",
      heading: "वर्कशॉप गैलरी",
      subheading: "हस्तशिल्प फर्नीचर • इंटरनल फ्लोर स्टाफ सिस्टम",
      netOnline: "नेटवर्क: ऑनलाइन",
      netSlow: "नेटवर्क: धीमा 3G (सिमुलेटेड)",
      searchLabel: "इन्वेंटरी खोजें",
      searchPlaceholder: "नाम, लकड़ी का प्रकार या कारीगरी से खोजें...",
      woodLabel: "लकड़ी की प्रजाति",
      statusLabel: "उपलब्धता",
      slow3g: "धीमा 3G नेटवर्क सिमुलेट करें",
      sync: "वर्कशॉप रिकॉर्ड्स लोड हो रहे हैं...",
      catalogTitle: "वर्तमान वर्कशॉप फर्नीचर",
      emptyTitle: "कोई डेटा नहीं मिला",
      emptyDesc: "आपकी खोज या फ़िल्टर से मेल खाता कोई फर्नीचर नहीं मिला।",
      resetBtn: "फ़िल्टर रीसेट करें",
      formTitle: "नया वर्कशॉप फर्नीचर दर्ज करें",
      formSubtext: "तारांकित (*) चिन्ह वाले फ़ील्ड अनिवार्य हैं।",
      labelTitle: "फर्नीचर का नाम",
      labelWood: "लकड़ी की प्रजाति",
      labelPrice: "कीमत",
      labelJoinery: "कारीगरी / जोड़ विधि",
      labelStatus: "फ्लोर स्थिति",
      labelDims: "आयाम (Dimensions)",
      labelPhoto: "गैलरी से फोटो अपलोड करें (वैकल्पिक)",
      submitBtn: "गैलरी में सेव करें",
      specTimber: "लकड़ी:",
      specJoinery: "कारीगरी:",
      specDims: "आयाम:",
      specPrice: "कीमत",
      allSpecies: "सभी प्रजातियाँ",
      allStatuses: "सभी स्थितियाँ",
      selectSpecies: "प्रजाति चुनें...",
      statusAvail: "उपलब्ध (Available)",
      statusProg: "प्रगति पर (In Progress)",
      statusRes: "आरक्षित (Reserved)",
      woodTeak: "सागौन (Teak)",
      woodWalnut: "अखरोट (Walnut)",
      woodOak: "ओक (Oak)",
      woodAsh: "ऐश (Ash)",
      errTitle: "फर्नीचर का नाम अनिवार्य है।",
      errWood: "कृपया लकड़ी की प्रजाति चुनें।",
      errPrice: "कृपया वैध कीमत दर्ज करें।",
      errJoinery: "कारीगरी विधि अनिवार्य है।",
      errStatus: "कृपया फ्लोर स्थिति चुनें।",
      errDims: "आयाम (Dimensions) अनिवार्य हैं।",
      footerBrand: "एटेलियर हेरिटेज वुडवर्क्स",
      footerAbout: "फ्लोर स्टाफ प्रबंधन और कारीगरी सूची प्रणाली। वेयरहाउस और वर्कशॉप फ्लोर के लिए निर्मित।",
      footerTitle: "फ्लोर संचालन",
      foot1: "इन्वेंटरी ट्रैकिंग",
      foot2: "कारीगरी विनिर्देश सूचकांक",
      foot3: "कस्टम ऑर्डर प्रेषण",
      footerCopy: "© एटेलियर हेरिटेज वुडवर्क्स। सर्वाधिकार सुरक्षित। आंतरिक फ्लोर इंटरफ़ेस।"
    }
  };

  let currentLang = "en";
  let currentCurrency = "USD";
  const USD_TO_INR = 83;

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
  const langToggleBtn = document.getElementById("lang-toggle-btn");
  const currencyToggleBtn = document.getElementById("currency-toggle-btn");

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

  function formatPriceDisplay(usdPrice) {
    if (currentCurrency === "INR") {
      const inrAmount = Math.round(usdPrice * USD_TO_INR);
      return `₹${inrAmount.toLocaleString("en-IN")}`;
    }
    return `$${Number(usdPrice).toLocaleString("en-US")}`;
  }

  function applyLanguage(lang) {
    currentLang = lang;
    const t = DICT[lang];

    document.getElementById("skip-link-text").textContent = t.skip;
    document.getElementById("ui-main-heading").textContent = t.heading;
    document.getElementById("ui-sub-heading").innerHTML = t.subheading;
    networkStatusText.textContent = slow3gToggle.checked ? t.netSlow : t.netOnline;

    document.getElementById("ui-search-label").textContent = t.searchLabel;
    searchInput.placeholder = t.searchPlaceholder;
    document.getElementById("ui-wood-label").textContent = t.woodLabel;
    document.getElementById("ui-status-label").textContent = t.statusLabel;
    document.getElementById("ui-slow3g-label").textContent = t.slow3g;
    document.getElementById("ui-loading-text").textContent = t.sync;

    woodFilter.options[0].text = t.allSpecies;
    woodFilter.options[1].text = t.woodTeak;
    woodFilter.options[2].text = t.woodWalnut;
    woodFilter.options[3].text = t.woodOak;
    woodFilter.options[4].text = t.woodAsh;

    statusFilter.options[0].text = t.allStatuses;
    statusFilter.options[1].text = t.statusAvail;
    statusFilter.options[2].text = t.statusProg;
    statusFilter.options[3].text = t.statusRes;

    document.getElementById("ui-catalog-title").textContent = t.catalogTitle;
    document.getElementById("ui-empty-title").textContent = t.emptyTitle;
    document.getElementById("ui-empty-desc").textContent = t.emptyDesc;
    resetFiltersBtn.textContent = t.resetBtn;

    document.getElementById("ui-form-title").textContent = t.formTitle;
    document.getElementById("ui-form-subtext").innerHTML = t.formSubtext;
    document.getElementById("ui-label-title").innerHTML = `${t.labelTitle} <span class="required">*</span>`;
    document.getElementById("ui-label-wood").innerHTML = `${t.labelWood} <span class="required">*</span>`;
    document.getElementById("ui-label-price").innerHTML = `${t.labelPrice} (${currentCurrency}) <span class="required">*</span>`;
    document.getElementById("ui-label-joinery").innerHTML = `${t.labelJoinery} <span class="required">*</span>`;
    document.getElementById("ui-label-status").innerHTML = `${t.labelStatus} <span class="required">*</span>`;
    document.getElementById("ui-label-dimensions").innerHTML = `${t.labelDims} <span class="required">*</span>`;
    document.getElementById("ui-label-photo").textContent = t.labelPhoto;
    document.getElementById("submit-btn").textContent = t.submitBtn;

    const itemWoodSelect = document.getElementById("item-wood");
    itemWoodSelect.options[0].text = t.selectSpecies;
    itemWoodSelect.options[1].text = t.woodTeak;
    itemWoodSelect.options[2].text = t.woodWalnut;
    itemWoodSelect.options[3].text = t.woodOak;
    itemWoodSelect.options[4].text = t.woodAsh;

    const itemStatusSelect = document.getElementById("item-status");
    itemStatusSelect.options[0].text = t.statusAvail;
    itemStatusSelect.options[1].text = t.statusProg;
    itemStatusSelect.options[2].text = t.statusRes;

    document.getElementById("ui-footer-brand").textContent = t.footerBrand;
    document.getElementById("ui-footer-about").textContent = t.footerAbout;
    document.getElementById("ui-footer-title").textContent = t.footerTitle;
    document.getElementById("ui-foot-item1").textContent = t.foot1;
    document.getElementById("ui-foot-item2").textContent = t.foot2;
    document.getElementById("ui-foot-item3").textContent = t.foot3;
    document.getElementById("ui-footer-copyright").textContent = t.footerCopy;

    langToggleBtn.textContent = lang === "en" ? "हिंदी" : "English";

    renderCatalog();
  }

  function renderCatalog() {
    loadingSpinner.hidden = true;
    const t = DICT[currentLang];

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

    resultsCount.textContent = `${filtered.length} ${currentLang === "hi" ? "आइटम" : "items"}`;

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
        const priceDisplay = formatPriceDisplay(item.price);
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
                <span class="spec-title">${t.specTimber}</span>
                <span class="spec-value">${safeWood}</span>
              </li>
              <li class="card-spec-row">
                <span class="spec-title">${t.specJoinery}</span>
                <span class="spec-value">${safeJoinery}</span>
              </li>
              <li class="card-spec-row">
                <span class="spec-title">${t.specDims}</span>
                <span class="spec-value">${safeDims}</span>
              </li>
            </ul>
          </div>

          <div class="card-footer">
            <div>
              <span class="card-price-label">${t.specPrice}</span>
              <span class="card-price">${priceDisplay}</span>
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

  langToggleBtn.addEventListener("click", function () {
    const nextLang = currentLang === "en" ? "hi" : "en";
    applyLanguage(nextLang);
    logTelemetry("Language Switched", nextLang.toUpperCase());
  });

  currencyToggleBtn.addEventListener("click", function () {
    currentCurrency = currentCurrency === "USD" ? "INR" : "USD";
    currencyToggleBtn.textContent = currentCurrency === "USD" ? "₹ INR" : "$ USD";
    document.getElementById("ui-label-price").innerHTML = `${DICT[currentLang].labelPrice} (${currentCurrency}) <span class="required">*</span>`;
    renderCatalog();
    logTelemetry("Currency Switched", currentCurrency);
  });

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
    const t = DICT[currentLang];
    if (slow3gToggle.checked) {
      networkStatusText.textContent = t.netSlow;
      logTelemetry("Slow 3G Latency Simulation Enabled");
    } else {
      networkStatusText.textContent = t.netOnline;
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
    const t = DICT[currentLang];

    let isValid = true;
    let firstInvalidInput = null;

    const titleEl = document.getElementById("item-title");
    if (!titleEl.value.trim()) {
      markFieldError(titleEl, "title-error", t.errTitle);
      isValid = false;
      if (!firstInvalidInput) firstInvalidInput = titleEl;
    }

    const woodEl = document.getElementById("item-wood");
    if (!woodEl.value) {
      markFieldError(woodEl, "wood-error", t.errWood);
      isValid = false;
      if (!firstInvalidInput) firstInvalidInput = woodEl;
    }

    const priceEl = document.getElementById("item-price");
    let numPrice = parseFloat(priceEl.value);
    if (isNaN(numPrice) || numPrice <= 0) {
      markFieldError(priceEl, "price-error", t.errPrice);
      isValid = false;
      if (!firstInvalidInput) firstInvalidInput = priceEl;
    }

    const joineryEl = document.getElementById("item-joinery");
    if (!joineryEl.value.trim()) {
      markFieldError(joineryEl, "joinery-error", t.errJoinery);
      isValid = false;
      if (!firstInvalidInput) firstInvalidInput = joineryEl;
    }

    const statusEl = document.getElementById("item-status");
    if (!statusEl.value) {
      markFieldError(statusEl, "status-error", t.errStatus);
      isValid = false;
      if (!firstInvalidInput) firstInvalidInput = statusEl;
    }

    const dimsEl = document.getElementById("item-dimensions");
    if (!dimsEl.value.trim()) {
      markFieldError(dimsEl, "dimensions-error", t.errDims);
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

    let standardUsdPrice = numPrice;
    if (currentCurrency === "INR") {
      standardUsdPrice = Math.round(numPrice / USD_TO_INR);
    }

    const defaultImage = "https://images.unsplash.com/photo-1538688525198-9b88f6f53126?auto=format&fit=crop&w=600&q=80";

    const newItem = {
      id: `FW-${Date.now()}`,
      title: sanitizeText(titleEl.value.trim()),
      wood: sanitizeText(woodEl.value),
      price: standardUsdPrice,
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

  applyLanguage("en");
  logTelemetry("Initial Catalog Rendered");
})();