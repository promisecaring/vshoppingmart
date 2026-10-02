import "../../css/style.css";

const checkoutContainer =
  document.querySelector("#checkout-container");

function getCart() {
  return JSON.parse(
    localStorage.getItem("so-cart")
  ) || [];
}

function calculateSubtotal(cart) {
  return cart.reduce(
    (total, product) =>
      total +
      Number(product.price) *
        (product.quantity || 1),
    0
  );
}

function renderCheckout() {

  const cart = getCart();

  const cartCount = document.querySelector(
    ".cart-count"
  );

  const count = cart.reduce(
    (total, product) =>
      total + (product.quantity || 1),
    0
  );

  if (cartCount) {
    cartCount.textContent = count;
  }

  if (cart.length === 0) {

    checkoutContainer.innerHTML = `
      <div class="empty-cart">

        <h2>Your cart is empty</h2>

        <p>
          Please add a product before checking out.
        </p>

        <a
          href="/src/js/pages/products/"
          class="continue-shopping"
        >
          Continue Shopping
        </a>

      </div>
    `;

    return;
  }

  const subtotal =
    calculateSubtotal(cart);

  checkoutContainer.innerHTML = `

    <div class="checkout-layout">

      <section class="checkout-form">

        <h2>Customer Information</h2>

        <form id="checkout-form">

          <div class="form-group">

            <label for="name">
              Full Name
            </label>

            <input
              type="text"
              id="name"
              name="name"
              required
            >

          </div>

          <div class="form-group">

            <label for="email">
              Email Address
            </label>

            <input
              type="email"
              id="email"
              name="email"
              required
            >

          </div>

          <div class="form-group">

            <label for="address">
              Address
            </label>

            <input
              type="text"
              id="address"
              name="address"
              required
            >

          </div>

          <div class="form-group">

            <label for="city">
              City
            </label>

            <input
              type="text"
              id="city"
              name="city"
              required
            >

          </div>

          <div class="form-group">

            <label for="country">
              Country
            </label>

            <input
              type="text"
              id="country"
              name="country"
              value="Nigeria"
              required
            >

          </div>

          <button
            type="submit"
            class="checkout-btn"
          >
            Place Order
          </button>

        </form>

      </section>

      <aside class="checkout-summary">

        <h2>Order Summary</h2>

        <div class="checkout-products">

          ${cart.map((product) => `

            <div class="checkout-product">

              <img
                src="${product.thumbnail}"
                alt="${product.title}"
              >

              <div>

                <h3>
                  ${product.title}
                </h3>

                <p>
                  Quantity:
                  ${product.quantity || 1}
                </p>

                <p>
                  $${(
                    Number(product.price) *
                    (product.quantity || 1)
                  ).toFixed(2)}
                </p>

              </div>

            </div>

          `).join("")}

        </div>

        <div class="checkout-total">

          <span>
            Subtotal
          </span>

          <strong>
            $${subtotal.toFixed(2)}
          </strong>

        </div>

      </aside>

    </div>
  `;

  document
    .querySelector("#checkout-form")
    .addEventListener(
      "submit",
      handleCheckout
    );
}

function handleCheckout(event) {

  event.preventDefault();

  const form =
    event.target;

  const customer = {
    name:
      form.name.value.trim(),

    email:
      form.email.value.trim(),

    address:
      form.address.value.trim(),

    city:
      form.city.value.trim(),

    country:
      form.country.value.trim()
  };

  const cart = getCart();

  const order = {
    customer,
    items: cart,
    total: calculateSubtotal(cart),
    date: new Date().toISOString()
  };

  localStorage.setItem(
    "so-order",
    JSON.stringify(order)
  );

  localStorage.removeItem(
    "so-cart"
  );

  window.location.href =
    "/src/js/pages/success/";
}

renderCheckout();