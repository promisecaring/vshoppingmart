
import "../../css/style.css";
import ExternalServices from "../ExternalServices.mjs";

const app = document.querySelector("#app");

app.innerHTML = `
  <header class="site-header">
    <div class="header-container">

      <a href="/" class="logo">
        VshoppingMart
      </a>

      <nav class="site-nav" aria-label="Main navigation">

        <a href="/">
          Home
        </a>

        <a href="/products/">
          Products
        </a>

        <a href="/cart/">
          Cart
          <span class="cart-count">0</span>
        </a>

      </nav>

    </div>
  </header>

  <main>
    <section id="product-details" class="product-details">
      <p>Loading product...</p>
    </section>
  </main>

  <footer class="site-footer">
    <p>
      &copy; 2026 VshoppingMart. All rights reserved.
    </p>
  </footer>
`;

const service = new ExternalServices();

async function loadProduct() {
  const params = new URLSearchParams(
    window.location.search
  );

  const productId = params.get("id");

  const container =
    document.querySelector("#product-details");

  if (!productId) {
    container.innerHTML = `
      <h1>Product Not Found</h1>

      <p>
        No product ID was provided.
      </p>

      <a href="/products/">
        Return to Products
      </a>
    `;

    return;
  }

  try {
    const product =
      await service.getProductById(productId);

    renderProduct(product);
    updateCartCount();

  } catch (error) {

    console.error(
      "Error loading product:",
      error
    );

    container.innerHTML = `
      <h1>Unable to Load Product</h1>

      <p>
        Please try again later.
      </p>

      <a href="/products/">
        Return to Products
      </a>
    `;
  }
}

function renderProduct(product) {

  const container =
    document.querySelector("#product-details");

  container.innerHTML = `
    <div class="product-detail">

      <div class="product-detail-image">

        <img
          src="${product.thumbnail}"
          alt="${product.title}"
          class="product-detail-img"
        >

      </div>

      <div class="product-detail-info">

        <p class="product-category">
          ${product.category}
        </p>

        <h1>
          ${product.title}
        </h1>

        <p class="product-description">
          ${product.description}
        </p>

        <p class="product-detail-price">
          $${Number(product.price).toFixed(2)}
        </p>

        <p class="product-rating">
          ⭐ ${product.rating}
        </p>

        <p class="product-stock">
          Stock: ${product.stock}
        </p>

        <label for="quantity">
          Quantity:
        </label>

        <input
          type="number"
          id="quantity"
          min="1"
          max="${product.stock}"
          value="1"
        >

        <button
          id="add-to-cart"
          type="button"
        >
          Add to Cart
        </button>

        <p id="cart-message"></p>

        <a
          href="/products/"
          class="back-to-products"
        >
          ← Back to Products
        </a>

      </div>

    </div>
  `;

  document
    .querySelector("#add-to-cart")
    .addEventListener("click", () => {
      addToCart(product);
    });
}

function addToCart(product) {

  const cart =
    JSON.parse(
      localStorage.getItem("so-cart")
    ) || [];

  const quantityInput =
    document.querySelector("#quantity");

  let quantity =
    Number(quantityInput.value);

  if (!quantity || quantity < 1) {
    quantity = 1;
  }

  if (product.stock && quantity > product.stock) {
    quantity = product.stock;
    quantityInput.value = product.stock;
  }

  const existingProduct =
    cart.find(
      (item) =>
        String(item.id) ===
        String(product.id)
    );

  if (existingProduct) {

    existingProduct.quantity =
      (existingProduct.quantity || 1) +
      quantity;

  } else {

    cart.push({
      id: product.id,
      title: product.title,
      price: product.price,
      thumbnail: product.thumbnail,
      rating: product.rating,
      description: product.description,
      quantity: quantity
    });

  }

  localStorage.setItem(
    "so-cart",
    JSON.stringify(cart)
  );

  document.querySelector(
    "#cart-message"
  ).textContent =
    `${product.title} added to cart!`;

  updateCartCount();

  console.log(
    "Cart:",
    cart
  );
}

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

loadProduct();

