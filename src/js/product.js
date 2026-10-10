
import "../css/style.css";
import ProductList from "./ProductList.mjs";

const app = document.querySelector("#app");

// Get product ID from the URL
const params = new URLSearchParams(window.location.search);
const productId = params.get("id");

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
        <a href="/">Home</a>
        <a href="/products/">Products</a>
        <a href="/cart/" class="cart-link">
          Cart <span class="cart-count">0</span>
        </a>
      </nav>
    </div>
  </header>

  <main>
    <section class="product-detail-section">
      <div id="product-detail">
        <p>Loading product...</p>
      </div>
    </section>
  </main>

  <footer class="site-footer">
    <p>&copy; 2026 VshoppingMart. All rights reserved.</p>
  </footer>
`;

const productList = new ProductList();

async function loadProduct() {
  try {
    if (!productId) {
      document.querySelector("#product-detail").innerHTML = `
        <h1>Product ID Missing</h1>
        <p>No product ID was provided.</p>
        <a href="/products/">Back to Products</a>
      `;
      return;
    }

    const products = await productList.init();

    console.log("Products received:", products);
    console.log("Requested product ID:", productId);

    const product = products.find(
      (item) => String(item.id) === String(productId)
    );

    if (!product) {
      document.querySelector("#product-detail").innerHTML = `
        <h1>Product Not Found</h1>
        <p>We could not find product ${productId}.</p>
        <a href="/products/">Back to Products</a>
      `;
      return;
    }

    console.log("Selected product:", product);

    renderProduct(product);
  } catch (error) {
    console.error("Error loading product:", error);

    document.querySelector("#product-detail").innerHTML = `
      <h1>Unable to Load Product</h1>
      <p>Please try again later.</p>
      <a href="/products/">Back to Products</a>
    `;
  }
}

function renderProduct(product) {
  const productDetail = document.querySelector("#product-detail");

  productDetail.innerHTML = `
    <div class="product-detail">

      <div class="product-detail-image">
        <img
          src="${product.thumbnail}"
          alt="${product.title}"
          class="product-detail-img"
        />
      </div>

      <div class="product-detail-info">

        <h1>${product.title}</h1>

        <p class="product-price">
          $${product.price.toFixed(2)}
        </p>

        <p class="product-rating">
          ⭐ ${product.rating}
        </p>

        <p class="product-description">
          ${product.description || "No description available."}
        </p>

        <button
          id="add-to-cart"
          class="add-to-cart"
          type="button"
        >
          Add to Cart
        </button>

        <p id="cart-message" class="cart-message"></p>

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

      document.querySelector("#cart-message").textContent =
        "Product added to cart!";
    });
}

function addToCart(product) {
  const cart = JSON.parse(localStorage.getItem("so-cart")) || [];

  const existingProduct = cart.find(
    (item) => String(item.id) === String(product.id)
  );

  if (existingProduct) {
    existingProduct.quantity =
      (existingProduct.quantity || 1) + 1;
  } else {
    cart.push({
      id: product.id,
      title: product.title,
      price: product.price,
      thumbnail: product.thumbnail,
      rating: product.rating,
      description: product.description,
      quantity: 1
    });
  }

  localStorage.setItem("so-cart", JSON.stringify(cart));

  console.log("Cart after adding product:", cart);

  updateCartCount();
}

function updateCartCount() {
  const cart = JSON.parse(localStorage.getItem("so-cart")) || [];

  const count = cart.reduce(
    (total, item) => total + (item.quantity || 1),
    0
  );

  const cartCount = document.querySelector(".cart-count");

  if (cartCount) {
    cartCount.textContent = count;
  }
}

updateCartCount();
loadProduct();

