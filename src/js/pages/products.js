
import "../../css/style.css";
import "../ProductList.mjs";

import ProductList from "../ProductList.mjs";

const app = document.querySelector("#app");

app.innerHTML = `
  <header class="site-header">
    <div class="header-container">

<a href="/" class="logo" aria-label="VshoppingMart Home">
  <img
    src="/logo.svg"
    alt="VshoppingMart"
    width="210"
    height="55"
    style="display: block; width: 210px; max-width: 100%; height: auto;"
  />
</a>

<nav class="site-nav" aria-label="Main navigation">

        <a href="/">
          Home
        </a>

        <a href="/products/">
          Products
        </a>

       <a href="/cart/" class="cart-link">
  <span class="cart-icon" aria-hidden="true">🛒</span>
  <span>Cart</span>
  <span class="cart-count">0</span>
</a>

      </nav>

    </div>
  </header>

  <main class="products-page">

    <section class="products-section">

      <h1>Shop All Products</h1>

      <div class="product-controls">

        <div class="search-box">

          <label for="product-search">
            Search Products
          </label>

          <input
            type="search"
            id="product-search"
            placeholder="Search for a product..."
            autocomplete="off"
          >

        </div>

        <div class="category-box">

          <label for="category-filter">
            Category
          </label>

          <select id="category-filter">

            <option value="all">
              All Categories
            </option>

          </select>

        </div>

      </div>

      <div
        id="product-results"
        class="product-results"
      >
        <p class="loading-message">
          Loading products...
        </p>
      </div>

      <div
        id="product-grid"
        class="product-grid"
      ></div>

      <p
        id="no-products"
        class="no-products"
        hidden
      >
        No products match your search.
      </p>

    </section>

  </main>

  <footer class="site-footer">

    <p>
      &copy; 2026 VshoppingMart.
      All rights reserved.
    </p>

  </footer>
`;

const productList = new ProductList();

let allProducts = [];


/* ==============================
   Load Products
   ============================== */

async function loadProducts() {
  const productGrid =
    document.querySelector("#product-grid");

  const productResults =
    document.querySelector("#product-results");

  try {
    allProducts = await productList.init();

    if (!allProducts || allProducts.length === 0) {

      productResults.innerHTML = `
        <p>
          Unable to load products.
        </p>
      `;

      return;
    }

    productResults.innerHTML = `
      <p class="results-count">
        ${allProducts.length} products available
      </p>
    `;

    createCategoryOptions(allProducts);

    displayProducts(allProducts);

    updateCartCount();

  } catch (error) {

    console.error(
      "Error loading products:",
      error
    );

    productGrid.innerHTML = `
      <p>
        Unable to load products.
        Please try again.
      </p>
    `;
  }
}


/* ==============================
   Create Category Options
   ============================== */

function createCategoryOptions(products) {

  const categoryFilter =
    document.querySelector("#category-filter");

  const categories = [
    ...new Set(
      products.map(
        (product) => product.category
      )
    )
  ];

  categories.sort();

  categories.forEach((category) => {

    const option =
      document.createElement("option");

    option.value = category;

    option.textContent =
      formatCategoryName(category);

    categoryFilter.appendChild(option);

  });
}


/* ==============================
   Format Category Name
   ============================== */

function formatCategoryName(category) {

  return category
    .split("-")
    .map(
      (word) =>
        word.charAt(0).toUpperCase() +
        word.slice(1)
    )
    .join(" ");
}


/* ==============================
   Display Products
   ============================== */

function displayProducts(products) {

  const productGrid =
    document.querySelector("#product-grid");

  const noProducts =
    document.querySelector("#no-products");

  const productResults =
    document.querySelector("#product-results");

  if (!products || products.length === 0) {

    productGrid.innerHTML = "";

    noProducts.hidden = false;

    productResults.innerHTML = `
      <p class="results-count">
        0 products found
      </p>
    `;

    return;
  }

  noProducts.hidden = true;

  productList.renderProducts(
    products,
    productGrid
  );

  productResults.innerHTML = `
    <p class="results-count">
      ${products.length}
      ${products.length === 1 ? "product" : "products"}
      found
    </p>
  `;
}


/* ==============================
   Filter Products
   ============================== */

function filterProducts() {

  const searchInput =
    document.querySelector("#product-search");

  const categoryFilter =
    document.querySelector("#category-filter");

  const searchText =
    searchInput.value
      .trim()
      .toLowerCase();

  const selectedCategory =
    categoryFilter.value;

  const filteredProducts =
    allProducts.filter((product) => {

      const matchesSearch =
        product.title
          .toLowerCase()
          .includes(searchText);

      const matchesCategory =
        selectedCategory === "all" ||
        product.category === selectedCategory;

      return (
        matchesSearch &&
        matchesCategory
      );
    });

  displayProducts(filteredProducts);
}


/* ==============================
   Search Event
   ============================== */

document.addEventListener(
  "input",
  (event) => {

    if (
      event.target.id ===
      "product-search"
    ) {
      filterProducts();
    }

  }
);


/* ==============================
   Category Event
   ============================== */

document.addEventListener(
  "change",
  (event) => {

    if (
      event.target.id ===
      "category-filter"
    ) {
      filterProducts();
    }

  }
);


/* ==============================
   Cart Count
   ============================== */

function updateCartCount() {

  const cart =
    JSON.parse(
      localStorage.getItem("so-cart")
    ) || [];

  const count =
    cart.reduce(
      (total, product) =>
        total +
        (product.quantity || 1),
      0
    );

  const cartCount =
    document.querySelector(
      ".cart-count"
    );

  if (cartCount) {
    cartCount.textContent = count;
  }
}


/* ==============================
   Start
   ============================== */

loadProducts();

