const WHATSAPP_NUMBER = "447350160864";


// ======================================================
// TRANSLATIONS
// ======================================================

const TRANSLATIONS = {

  pt: {

    reseller:
      "Revendedora Independente",

    home:
      "Início",

    products:
      "Produtos",

    favourites:
      "Favoritos",

    contact:
      "Contacto",

    heroTitle:
      "Encontra os produtos de que gostas.",

    heroText:
      "Explora o catálogo, guarda os teus favoritos e pergunta diretamente à revendedora sobre disponibilidade e ofertas atuais.",

    browse:
      "Ver produtos",

    viewFavourites:
      "Ver favoritos",

    categories:
      "Categorias",

    browseCategory:
      "Explora por categoria",

    exploreProducts:
      "Explorar produtos",

    viewAll:
      "Ver todos",

    allProducts:
      "Todos os produtos",

    productHelp:
      "Pesquisa ou filtra o catálogo para encontrares aquilo que procuras.",

    saved:
      "Guardados",

    yourFavourites:
      "Os teus favoritos",

    favouriteHelp:
      "Guarda vários produtos e pergunta por todos numa única mensagem.",

    askFavourites:
      "Perguntar pelos meus favoritos",

    askReseller:
      "Fala diretamente com a revendedora",

    contactText:
      "Pergunta sobre disponibilidade, produtos, promoções, pagamento ou entrega.",

    disclaimer:
      "Revendedora independente O Boticário. Este não é o site oficial d'O Boticário.",

    availability:
      "Confirma sempre a disponibilidade e as ofertas atuais diretamente com a revendedora.",

    all:
      "Todos",

    perfumery:
      "Perfumaria",

    male:
      "Cuidados Masculinos",

    baby:
      "Infantil",

    body:
      "Cuidados com o Corpo",

    hair:
      "Cabelo",

    sun:
      "Solares",

    facial:
      "Cuidados Faciais",

    makeup:
      "Maquilhagem",

    view:
      "Ver produto",

    ask:
      "Perguntar no WhatsApp",

    save:
      "Guardar",

    remove:
      "Remover",

    noResults:
      "Nenhum produto encontrado.",

    productsFound:
      "produtos encontrados",

    variants:
      "Opções",

    imagePreparing:
      "Imagem em preparação",

    imageUnavailable:
      "Imagem temporariamente indisponível",

    productNotice:
      "A disponibilidade e as ofertas podem mudar. Confirma sempre os detalhes diretamente com a revendedora."

  },


  en: {

    reseller:
      "Independent Reseller",

    home:
      "Home",

    products:
      "Products",

    favourites:
      "Favourites",

    contact:
      "Contact",

    heroTitle:
      "Find the products you love.",

    heroText:
      "Explore the catalogue, save your favourites and ask the reseller directly about availability and current offers.",

    browse:
      "Browse products",

    viewFavourites:
      "View favourites",

    categories:
      "Categories",

    browseCategory:
      "Browse by category",

    exploreProducts:
      "Explore products",

    viewAll:
      "View all",

    allProducts:
      "All products",

    productHelp:
      "Search or filter the catalogue to find what you're looking for.",

    saved:
      "Saved",

    yourFavourites:
      "Your favourites",

    favouriteHelp:
      "Save several products and ask about all of them in one message.",

    askFavourites:
      "Ask about my favourites",

    askReseller:
      "Contact the reseller",

    contactText:
      "Ask about availability, products, offers, payment or delivery.",

    disclaimer:
      "Independent O Boticário reseller. This is not the official O Boticário website.",

    availability:
      "Always confirm availability and current offers directly with the reseller.",

    all:
      "All",

    perfumery:
      "Perfumery",

    male:
      "Men's Care",

    baby:
      "Baby",

    body:
      "Body Care",

    hair:
      "Hair",

    sun:
      "Sun Care",

    facial:
      "Facial Care",

    makeup:
      "Makeup",

    view:
      "View product",

    ask:
      "Ask on WhatsApp",

    save:
      "Save",

    remove:
      "Remove",

    noResults:
      "No products found.",

    productsFound:
      "products found",

    variants:
      "Options",

    imagePreparing:
      "Image being prepared",

    imageUnavailable:
      "Image temporarily unavailable",

    productNotice:
      "Availability and offers may change. Always confirm the details directly with the reseller."

  }

};


// ======================================================
// CATEGORIES
// ======================================================

const CATEGORIES = [
  "all",
  "perfumery",
  "male",
  "baby",
  "body",
  "hair",
  "sun",
  "facial",
  "makeup"
];


// ======================================================
// HERO
// ======================================================

function createHeroSlides() {

  const preferredIds = [
    "lily-eau-de-parfum",
    "her-code",
    "lily-absolu-eau-de-parfum",
    "elysee",
    "her-code-touch"
  ];


  const slides =
    preferredIds
      .map(id =>
        PRODUCTS.find(
          product =>
            product.id === id
            &&
            product.image
        )
      )
      .filter(Boolean);


  if (slides.length) {
    return slides;
  }


  return PRODUCTS
    .filter(product => product.image)
    .slice(0,5);

}


let HERO_SLIDES = [];

let heroIndex = 0;

let heroShowingA = true;

let heroTimer = null;


// ======================================================
// STATE
// ======================================================

const state = {

  language: "pt",

  page: "home",

  search: "",

  category: "all",

  currentProduct: null,

  favourites:
    new Set(
      JSON.parse(
        localStorage.getItem(
          "boti-favourites"
        ) || "[]"
      )
    )

};


// ======================================================
// UTILITIES
// ======================================================

function t(key) {

  return (
    TRANSLATIONS[state.language][key]
    || key
  );

}


function productName(product) {

  if (
    state.language === "en"
    &&
    product.nameEN
  ) {

    return product.nameEN;

  }

  return product.name;

}


function productType(product) {

  if (
    state.language === "en"
    &&
    product.typeEN
  ) {

    return product.typeEN;

  }

  return product.type;

}


function saveFavourites() {

  localStorage.setItem(
    "boti-favourites",
    JSON.stringify(
      [...state.favourites]
    )
  );

}


// ======================================================
// HERO
// ======================================================

function renderHeroDots() {

  const holder =
    document.getElementById(
      "heroDots"
    );


  if (!holder) {
    return;
  }


  holder.innerHTML =
    HERO_SLIDES
      .map(
        (_,index) => `

          <button
            class="
              hero-dot
              ${
                index === heroIndex
                  ? "active"
                  : ""
              }
            "
            data-hero-slide="${index}"
            aria-label="Slide ${index + 1}"
          ></button>

        `
      )
      .join("");


  holder
    .querySelectorAll(
      "[data-hero-slide]"
    )
    .forEach(
      button => {

        button.onclick =
          () => {

            const index =
              Number(
                button.dataset.heroSlide
              );

            showHeroSlide(
              index,
              true
            );

          };

      }
    );

}


function updateHeroLabel(product) {

  const range =
    document.getElementById(
      "heroRange"
    );

  const name =
    document.getElementById(
      "heroProductName"
    );


  if (range) {
    range.textContent =
      product.range;
  }


  if (name) {
    name.textContent =
      productName(product);
  }

}


function showHeroSlide(
  newIndex,
  resetTimer = false
) {

  if (!HERO_SLIDES.length) {
    return;
  }


  heroIndex =
    (
      newIndex
      +
      HERO_SLIDES.length
    )
    %
    HERO_SLIDES.length;


  const product =
    HERO_SLIDES[heroIndex];


  const imageA =
    document.getElementById(
      "heroImageA"
    );

  const imageB =
    document.getElementById(
      "heroImageB"
    );


  if (!imageA || !imageB) {
    return;
  }


  const incoming =
    heroShowingA
      ? imageB
      : imageA;


  const outgoing =
    heroShowingA
      ? imageA
      : imageB;


  incoming.src =
    product.image;

  incoming.alt =
    productName(product);


  incoming.classList.add(
    "active"
  );

  outgoing.classList.remove(
    "active"
  );


  heroShowingA =
    !heroShowingA;


  updateHeroLabel(product);

  renderHeroDots();


  if (resetTimer) {

    restartHeroTimer();

  }

}


function restartHeroTimer() {

  clearInterval(
    heroTimer
  );


  heroTimer =
    setInterval(
      () => {

        showHeroSlide(
          heroIndex + 1
        );

      },
      5000
    );

}


function initialiseHero() {

  HERO_SLIDES =
    createHeroSlides();


  if (!HERO_SLIDES.length) {
    return;
  }


  const imageA =
    document.getElementById(
      "heroImageA"
    );


  const firstProduct =
    HERO_SLIDES[0];


  imageA.src =
    firstProduct.image;

  imageA.alt =
    productName(
      firstProduct
    );


  updateHeroLabel(
    firstProduct
  );

  renderHeroDots();

  restartHeroTimer();

}


// ======================================================
// NAVIGATION
// ======================================================

function updateActiveNavigation(page) {

  document
    .querySelectorAll(
      ".desktop-nav [data-page], .mobile-nav [data-page]"
    )
    .forEach(button => {

      button.classList.toggle(
        "active-nav",
        button.dataset.page === page
      );

    });

}


function showPage(page) {

  state.page = page;


  updateActiveNavigation(page);


  document
    .querySelectorAll(
      ".page"
    )
    .forEach(section => {

      section.classList.remove(
        "active"
      );

    });


  const target =
    document.getElementById(
      `${page}Page`
    );


  if (target) {

    target.classList.add(
      "active"
    );

  }


  closeDrawer();


  window.scrollTo({
    top: 0,
    behavior: "smooth"
  });

}


function openDrawer() {

  document
    .getElementById(
      "drawer"
    )
    .classList.add(
      "open"
    );

}


function closeDrawer() {

  document
    .getElementById(
      "drawer"
    )
    .classList.remove(
      "open"
    );

}


// ======================================================
// IMAGES
// ======================================================

function imageMarkup(product) {

  if (!product.image) {

    return `

      <div class="image-unavailable">

        <span>
          ${t("imagePreparing")}
        </span>

      </div>

    `;

  }


  return `

    <img
      src="${product.image}"
      alt="${productName(product)}"
      class="product-photo"
      loading="lazy"
      referrerpolicy="no-referrer"

      onerror="
        this.style.display='none';
        this.nextElementSibling.style.display='grid';
      "
    />


    <div
      class="image-unavailable"
      style="display:none;"
    >

      <span>
        ${t("imageUnavailable")}
      </span>

    </div>

  `;

}


// ======================================================
// CATEGORY IMAGES
// ======================================================

function getCategoryImage(category) {

  const exactProduct =
    PRODUCTS.find(
      product =>
        product.category === category
        &&
        product.image
    );


  if (exactProduct) {
    return exactProduct.image;
  }


  const fallbackIds = {

    perfumery:
      "lily-eau-de-parfum",

    male:
      "her-code",

    baby:
      "lily-cream",

    body:
      "lily-cashmere-creme",

    hair:
      "lily-shampoo-acetinado",

    sun:
      "lily-eau-de-parfum",

    facial:
      "her-code-cream",

    makeup:
      "lily-absolu-eau-de-parfum"

  };


  const fallback =
    PRODUCTS.find(
      product =>
        product.id ===
        fallbackIds[category]
    );


  return (
    fallback?.image
    ||
    PRODUCTS.find(
      product =>
        product.image
    )?.image
    ||
    ""
  );

}


// ======================================================
// CATEGORY CARDS
// ======================================================

function renderCategoryCards() {

  const grid =
    document.getElementById(
      "categoryGrid"
    );


  grid.innerHTML =
    CATEGORIES

      .filter(
        category =>
          category !== "all"
      )

      .map(category => {

        const image =
          getCategoryImage(category);


        return `

          <button
            class="category-card"
            data-category-home="${category}"
          >

            ${
              image
                ? `
                  <img
                    class="category-card-image"
                    src="${image}"
                    alt="${t(category)}"
                    loading="lazy"
                  />
                `
                : ""
            }


            <div
              class="category-card-overlay"
            ></div>


            <div
              class="category-card-content"
            >

              <span
                class="category-card-title"
              >
                ${t(category)}
              </span>


              <span
                class="category-arrow"
              >
                →
              </span>

            </div>

          </button>

        `;

      })

      .join("");


  grid
    .querySelectorAll(
      "[data-category-home]"
    )
    .forEach(button => {

      button.onclick =
        () => {

          state.category =
            button.dataset.categoryHome;


          renderFilters();

          renderProducts();

          showPage(
            "products"
          );

        };

    });

}


// ======================================================
// PRODUCT CARD
// ======================================================

function productCard(product) {

  const saved =
    state.favourites.has(
      product.id
    );


  return `

    <article class="product-card">

      <div
        class="product-image"
        data-open="${product.id}"
      >

        ${imageMarkup(product)}


        <button
          class="favourite-floating"
          data-favourite="${product.id}"
          aria-label="Favourite"
        >

          ${saved ? "♥" : "♡"}

        </button>

      </div>


      <div class="product-body">

        <h3>
          ${productName(product)}
        </h3>


        <div class="product-meta">

          ${product.range}

          ·

          ${productType(product)}

          ${
            product.size
              ? `· ${product.size}`
              : ""
          }

        </div>


        <p class="product-note">
          ${t("productNotice")}
        </p>


        <div class="product-actions">

          <button
            class="view-btn"
            data-open="${product.id}"
          >
            ${t("view")}
          </button>


          <button
            class="whatsapp-btn"
            data-whatsapp="${product.id}"
          >
            ${t("ask")}
          </button>

        </div>

      </div>

    </article>

  `;

}


// ======================================================
// FILTERS
// ======================================================

function filteredProducts() {

  const query =
    state.search
      .trim()
      .toLowerCase();


  return PRODUCTS.filter(product => {


    const categoryMatch =

      state.category === "all"

      ||

      product.category ===
      state.category;


    const variantText =

      product.variants
        ?.map(
          variant =>
            `${variant.name} ${variant.code || ""}`
        )
        .join(" ")

      || "";


    const searchable = `

      ${product.name}

      ${product.nameEN || ""}

      ${product.range}

      ${product.type}

      ${product.typeEN || ""}

      ${product.size || ""}

      ${product.code || ""}

      ${variantText}

    `.toLowerCase();


    const searchMatch =

      !query

      ||

      searchable.includes(query);


    return (
      categoryMatch
      &&
      searchMatch
    );

  });

}


function renderFilters() {

  const holder =
    document.getElementById(
      "categoryFilters"
    );


  holder.innerHTML =
    CATEGORIES
      .map(category => `

        <button
          class="
            filter-chip
            ${
              state.category === category
                ? "active"
                : ""
            }
          "
          data-filter="${category}"
        >

          ${t(category)}

        </button>

      `)
      .join("");


  holder
    .querySelectorAll(
      "[data-filter]"
    )
    .forEach(button => {

      button.onclick =
        () => {

          state.category =
            button.dataset.filter;

          renderFilters();

          renderProducts();

        };

    });

}


// ======================================================
// PRODUCT GRID
// ======================================================

function renderProducts() {

  const products =
    filteredProducts();


  const grid =
    document.getElementById(
      "productGrid"
    );


  document.getElementById(
    "resultCount"
  ).textContent =
    `${products.length} ${t("productsFound")}`;


  if (!products.length) {

    grid.innerHTML = `

      <p>
        ${t("noResults")}
      </p>

    `;

    return;

  }


  grid.innerHTML =
    products
      .map(productCard)
      .join("");


  bindProductActions(
    grid
  );

}


function renderHomeProducts() {

  const holder =
    document.getElementById(
      "homeProducts"
    );


  holder.innerHTML =
    PRODUCTS
      .slice(0,8)
      .map(productCard)
      .join("");


  bindProductActions(
    holder
  );

}


// ======================================================
// PRODUCT ACTIONS
// ======================================================

function bindProductActions(scope) {

  scope
    .querySelectorAll(
      "[data-open]"
    )
    .forEach(element => {

      element.onclick =
        event => {

          if (
            event.target.closest(
              "[data-favourite]"
            )
          ) {
            return;
          }


          openProduct(
            element.dataset.open
          );

        };

    });


  scope
    .querySelectorAll(
      "[data-whatsapp]"
    )
    .forEach(button => {

      button.onclick =
        () => {

          openWhatsapp([
            button.dataset.whatsapp
          ]);

        };

    });


  scope
    .querySelectorAll(
      "[data-favourite]"
    )
    .forEach(button => {

      button.onclick =
        event => {

          event.stopPropagation();

          toggleFavourite(
            button.dataset.favourite
          );

        };

    });

}


// ======================================================
// FAVOURITES
// ======================================================

function toggleFavourite(id) {

  if (
    state.favourites.has(id)
  ) {

    state.favourites.delete(id);

  }

  else {

    state.favourites.add(id);

  }


  saveFavourites();

  renderProducts();

  renderHomeProducts();

  renderFavourites();


  if (
    state.currentProduct === id
    &&
    state.page === "product"
  ) {

    renderProductDetail(id);

  }

}


// ======================================================
// PRODUCT DETAIL
// ======================================================

function openProduct(id) {

  state.currentProduct =
    id;


  renderProductDetail(id);


  showPage(
    "product"
  );

}


function renderProductDetail(id) {

  const product =
    PRODUCTS.find(
      item =>
        item.id === id
    );


  if (!product) {
    return;
  }


  const saved =
    state.favourites.has(id);


  const variants =

    product.variants?.length

      ? `

        <div>

          <strong>
            ${t("variants")}
          </strong>

          <div class="variant-list">

            ${
              product.variants
                .map(
                  variant => `

                    <span class="variant">
                      ${variant.name}
                    </span>

                  `
                )
                .join("")
            }

          </div>

        </div>

      `

      : "";


  document.getElementById(
    "productDetail"
  ).innerHTML = `

    <div class="product-detail">

      <div class="detail-image">

        ${imageMarkup(product)}

      </div>


      <div class="detail-content">

        <span class="eyebrow">
          ${product.range}
        </span>


        <h1>
          ${productName(product)}
        </h1>


        <p class="product-meta">

          ${productType(product)}

          ${
            product.size
              ? `· ${product.size}`
              : ""
          }

        </p>


        ${variants}


        <div class="detail-note">

          ${t("productNotice")}

        </div>


        <div class="detail-actions">

          <button
            id="detailFavourite"
            class="secondary large"
          >

            ${
              saved
                ? `♥ ${t("remove")}`
                : `♡ ${t("save")}`
            }

          </button>


          <button
            id="detailWhatsapp"
            class="primary large"
          >

            ${t("ask")}

          </button>

        </div>

      </div>

    </div>

  `;


  document.getElementById(
    "detailFavourite"
  ).onclick =
    () => {

      toggleFavourite(id);

    };


  document.getElementById(
    "detailWhatsapp"
  ).onclick =
    () => {

      openWhatsapp([
        id
      ]);

    };

}


// ======================================================
// FAVOURITES PAGE
// ======================================================

function renderFavourites() {

  const products =
    PRODUCTS.filter(
      product =>
        state.favourites.has(
          product.id
        )
    );


  const grid =
    document.getElementById(
      "favouriteGrid"
    );


  const button =
    document.getElementById(
      "askFavourites"
    );


  if (!products.length) {

    grid.innerHTML = `

      <p>

        ${
          state.language === "pt"

            ? "Ainda não guardaste nenhum produto."

            : "You haven't saved any products yet."
        }

      </p>

    `;


    button.classList.add(
      "hidden"
    );

    return;

  }


  grid.innerHTML =
    products
      .map(productCard)
      .join("");


  button.classList.remove(
    "hidden"
  );


  bindProductActions(
    grid
  );

}


// ======================================================
// WHATSAPP
// ======================================================

function buildWhatsappMessage(ids) {

  const products =
    ids
      .map(
        id =>
          PRODUCTS.find(
            product =>
              product.id === id
          )
      )
      .filter(Boolean);


  if (!products.length) {

    return (

      state.language === "pt"

        ? "Olá! Vi o catálogo de produtos O Boticário e gostaria de perguntar sobre disponibilidade e ofertas atuais."

        : "Hi! I saw the O Boticário product catalogue and I would like to ask about availability and current offers."

    );

  }


  const list =
    products
      .map(
        (product,index) =>

          `${index + 1}. ${productName(product)} — ${productType(product)}${product.size ? `, ${product.size}` : ""}`

      )
      .join("\n");


  if (
    state.language === "pt"
  ) {

    return `Olá! Tenho interesse ${
      products.length > 1
        ? "nestes produtos"
        : "neste produto"
    }:

${list}

Pode confirmar a disponibilidade e dizer-me se existe alguma oferta ou promoção atual?

Obrigada!`;

  }


  return `Hi! I'm interested in ${
    products.length > 1
      ? "these products"
      : "this product"
  }:

${list}

Could you confirm availability and let me know whether there are any current offers or promotions?

Thank you!`;

}


function openWhatsapp(ids) {

  const message =
    buildWhatsappMessage(ids);


  const url =
    `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;


  const opened =
    window.open(
      url,
      "_blank"
    );


  if (!opened) {

    window.location.href =
      url;

  }

}


// ======================================================
// LANGUAGE
// ======================================================

function applyLanguage() {

  document.documentElement.lang =
    state.language;


  document
    .querySelectorAll(
      "[data-i18n]"
    )
    .forEach(element => {

      element.textContent =
        t(
          element.dataset.i18n
        );

    });


  document.getElementById(
    "languageButton"
  ).textContent =

    state.language === "pt"

      ? "🇵🇹 PT"

      : "🇬🇧 EN";


  document.getElementById(
    "searchInput"
  ).placeholder =

    state.language === "pt"

      ? "Pesquisar produtos..."

      : "Search products...";


  renderCategoryCards();

  renderFilters();

  renderProducts();

  renderHomeProducts();

  renderFavourites();


  if (
    HERO_SLIDES.length
  ) {

    updateHeroLabel(
      HERO_SLIDES[heroIndex]
    );

  }


  if (
    state.currentProduct
    &&
    state.page === "product"
  ) {

    renderProductDetail(
      state.currentProduct
    );

  }

}


// ======================================================
// START
// ======================================================

document.addEventListener(
  "DOMContentLoaded",
  () => {


    document
      .querySelectorAll(
        "[data-page]"
      )
      .forEach(button => {

        button.onclick =
          () => {

            showPage(
              button.dataset.page
            );

          };

      });


    document.getElementById(
      "menuButton"
    ).onclick =
      openDrawer;


    document.getElementById(
      "closeDrawer"
    ).onclick =
      closeDrawer;


    document.getElementById(
      "languageButton"
    ).onclick =
      () => {

        state.language =

          state.language === "pt"

            ? "en"

            : "pt";


        applyLanguage();

      };


    document.getElementById(
      "searchInput"
    ).oninput =
      event => {

        state.search =
          event.target.value;

        renderProducts();

      };


    document.getElementById(
      "backProducts"
    ).onclick =
      () => {

        showPage(
          "products"
        );

      };


    document.getElementById(
      "askFavourites"
    ).onclick =
      () => {

        openWhatsapp(
          [...state.favourites]
        );

      };


    document.getElementById(
      "generalWhatsapp"
    ).onclick =
      () => {

        openWhatsapp([]);

      };


    applyLanguage();

    initialiseHero();

    showPage(
      "home"
    );

  }
);