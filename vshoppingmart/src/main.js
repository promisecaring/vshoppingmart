
import "./css/style.css";
import ProductList from "./js/ProductList.mjs";

const app = document.querySelector("#app");

app.innerHTML = `
  <header class="site-header">

    <div class="header-container">

      <a href="/" class="logo">
        VshoppingMart
      </a>

      <nav class="site-nav" aria-label="Main navigation">

        <a href="/" class="active">
          Home
        </a>

        <a href="/src/js/pages/products/">
          Products
        </a>

        <a href="/src/js/pages/cart/">
          Cart
          <span class="cart-count">0</span>
        </a>

      </nav>

    </div>

  </header>

  <main class="home-page">

    <!-- HERO -->

    <section class="hero">

      <div class="hero-content">

        <p class="hero-label">
          WELCOME TO VSHOPPINGMART
        </p>

        <h1>
          Quality Products.<br>
          Great Prices. Easy Shopping.
        </h1>

        <p>
          Discover products you'll love and enjoy a simple,
          convenient shopping experience from the comfort of your home.
        </p>

        <a
          href="/src/js/pages/products/"
          class="hero-button"
        >
          Shop Now
        </a>

      </div>

    </section>


    <!-- FEATURED PRODUCTS -->

    <section class="products-section featured-section">

      <div class="section-heading">

        <p class="section-label">
          OUR SELECTION
        </p>

        <h2>
          Featured Products
        </h2>

        <p>
          Take a look at some of our popular products.
        </p>

      </div>

      <div
        id="product-grid"
        class="product-grid featured-products"
      >
        <p class="loading-message">
          Loading featured products...
        </p>
      </div>

      <div class="view-all-products">

        <a
          href="/src/js/pages/products/"
          class="checkout-btn"
        >
          View All Products
        </a>

      </div>

    </section>


    <!-- WHY SHOP WITH US -->

    <section class="why-shop">

      <div class="section-heading">

        <p class="section-label">
          SHOP WITH CONFIDENCE
        </p>

        <h2>
          Why Shop With VshoppingMart?
        </h2>

      </div>

      <div class="benefits-grid">

        <article class="benefit-card">

          <div class="benefit-icon">
            🛍️
          </div>

          <h3>
            Quality Products
          </h3>

          <p>
            Browse a wide selection of carefully presented
            products for your everyday needs.
          </p>

        </article>


        <article class="benefit-card">

          <div class="benefit-icon">
            💰
          </div>

          <h3>
            Great Prices
          </h3>

          <p>
            Find products at competitive prices while
            enjoying a convenient online shopping experience.
          </p>

        </article>


        <article class="benefit-card">

          <div class="benefit-icon">
            ⚡
          </div>

          <h3>
            Easy Shopping
          </h3>

          <p>
            Search, explore, add products to your cart,
            and complete your order with ease.
          </p>

        </article>


        <article class="benefit-card">

          <div class="benefit-icon">
            ❤️
          </div>

          <h3>
            Customer Focused
          </h3>

          <p>
            We aim to make every visit simple, enjoyable,
            and convenient for our customers.
          </p>

        </article>

      </div>

    </section>


    <!-- CUSTOMER REVIEWS -->

    <section class="testimonials">

      <div class="section-heading">

        <p class="section-label">
          CUSTOMER LOVE
        </p>

        <h2>
          What Our Customers Say
        </h2>

        <p>
          A great shopping experience should leave you smiling.
        </p>

      </div>


      <div class="testimonial-grid">

        <article class="testimonial-card">

          <div class="testimonial-stars">
            ★★★★★
          </div>

          <p class="testimonial-text">
            “I really enjoyed how easy it was to browse the
            products and place my order. The whole experience
            was simple and straightforward.”
          </p>

          <div class="customer">

            <div class="customer-avatar">
              A
            </div>

            <div>
              <h3>
                Amanda
              </h3>

              <p>
                Verified Customer
              </p>
            </div>

          </div>

        </article>


        <article class="testimonial-card">

          <div class="testimonial-stars">
            ★★★★★
          </div>

          <p class="testimonial-text">
            “The website is clean, easy to navigate, and I
            found what I was looking for without wasting time.
            I will definitely shop here again.”
          </p>

          <div class="customer">

            <div class="customer-avatar">
              D
            </div>

            <div>
              <h3>
                Daniel
              </h3>

              <p>
                Verified Customer
              </p>
            </div>

          </div>

        </article>


        <article class="testimonial-card">

          <div class="testimonial-stars">
            ★★★★★
          </div>

          <p class="testimonial-text">
            “I love the simple shopping experience. The product
            information is clear, adding items to the cart is
            easy, and checkout was very smooth.”
          </p>

          <div class="customer">

            <div class="customer-avatar">
              S
            </div>

            <div>
              <h3>
                Sophia
              </h3>

              <p>
                Verified Customer
              </p>

            </div>

          </div>

        </article>

      </div>

    </section>


    <!-- CALL TO ACTION -->

    <section class="home-cta">

      <h2>
        Ready to Start Shopping?
      </h2>

      <p>
        Explore our full collection and find something you'll love.
      </p>

      <a
        href="/src/js/pages/products/"
        class="hero-button"
      >
        Explore Products
      </a>

    </section>

  </main>


  <footer class="site-footer">

    <p>
      &copy; Promise Oghene 2026 VshoppingMart.
      All rights reserved.
    </p>

    <p>
      Quality products. Simple shopping. Great experience.
    </p>

  </footer>
`;

const productList = new ProductList();


/* ==============================
   LOAD FEATURED PRODUCTS
   ============================== */

async function loadFeaturedProducts() {

  const productGrid =
    document.querySelector("#product-grid");

  try {

    const products =
      await productList.init();

    if (!products || products.length === 0) {

      productGrid.innerHTML = `
        <p>
          Unable to load featured products.
        </p>
      `;

      return;
    }

    /*
      Display only the first 6 products
      on the homepage.
    */

    const featuredProducts =
      products.slice(0, 6);

    productList.renderProducts(
      featuredProducts,
      productGrid
    );

    updateCartCount();

  } catch (error) {

    console.error(
      "Error loading featured products:",
      error
    );

    productGrid.innerHTML = `
      <p>
        Unable to load featured products.
        Please try again later.
      </p>
    `;

  }

}


/* ==============================
   CART COUNT
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
    document.querySelector(".cart-count");

  if (cartCount) {

    cartCount.textContent =
      count;

  }

}


/* ==============================
   START
   ============================== */

loadFeaturedProducts();
