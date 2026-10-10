import "../../css/style.css";

const checkoutContainer = document.querySelector(
  "#checkout-container"
);

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
        <p>Please add a product before checking out.</p>
        <a href="/products/" class="continue-shopping">
          Continue Shopping
        </a>
      </div>
    `;
    return;
  }

  const subtotal = calculateSubtotal(cart);

  checkoutContainer.innerHTML = `
    <div class="checkout-layout">

      <section class="checkout-form">
        <h2>Customer Information</h2>

        <form id="checkout-form">
          <div class="form-group">
            <label for="name">Full Name</label>
            <input type="text" id="name" name="name" required>
          </div>

          <div class="form-group">
            <label for="email">Email Address</label>
            <input type="email" id="email" name="email" required>
          </div>

          <div class="form-group">
            <label for="address">Address</label>
            <input type="text" id="address" name="address" required>
          </div>

          <div class="form-group">
            <label for="city">City</label>
            <input type="text" id="city" name="city" required>
          </div>

          <div class="form-group">
            <label for="country">Country</label>
            <input type="text" id="country" name="country" value="Nigeria" required>
          </div>

          <div class="atm-demo">
            <h2>ATM Card Payment</h2>
            <p class="demo-notice">
              Demo only — no real payment will be processed.
            </p>

            <div class="demo-card">
              <div class="demo-card-top">
                <span>VshoppingMart</span>
                <span class="chip-icon">▦</span>
              </div>

              <div class="demo-card-number" id="card-preview">
                •••• •••• •••• ••••
              </div>

              <div class="demo-card-bottom">
                <div>
                  <small>CARDHOLDER</small>
                  <div id="card-name-preview">YOUR NAME</div>
                </div>
                <div>
                  <small>EXPIRES</small>
                  <div id="expiry-preview">MM/YY</div>
                </div>
              </div>
            </div>

            <div class="form-group">
              <label for="demo-card-name">Cardholder Name</label>
              <input
                type="text"
                id="demo-card-name"
                autocomplete="off"
                placeholder="Name on card"
                maxlength="60"
              >
            </div>

            <div class="form-group">
              <label for="demo-card-number">Card Number</label>
              <input
                type="text"
                id="demo-card-number"
                inputmode="numeric"
                autocomplete="off"
                placeholder="Demo card number (not collected)"
                maxlength="19"
              >
            </div>

            <div class="card-fields">
              <div class="form-group">
                <label for="demo-expiry">Expiry Date</label>
                <input
                  type="text"
                  id="demo-expiry"
                  inputmode="numeric"
                  autocomplete="off"
                  placeholder="MM/YY"
                  maxlength="5"
                >
              </div>

              <div class="form-group">
                <label for="demo-cvv">CVV</label>
                <input
                  type="password"
                  id="demo-cvv"
                  inputmode="numeric"
                  autocomplete="off"
                  placeholder="Demo only"
                  maxlength="4"
                >
              </div>
            </div>

            <p class="demo-security">
              This demonstration does not transmit or save card details.
              Do not enter a real card number, CVV, or PIN.
            </p>
          </div>

          <button type="submit" class="checkout-btn">
            Complete Demo Order
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
                <h3>${product.title}</h3>
                <p>Quantity: ${product.quantity || 1}</p>
                <p>$${(
                  Number(product.price) *
                  (product.quantity || 1)
                ).toFixed(2)}</p>
              </div>
            </div>
          `).join("")}
        </div>

        <div class="checkout-total">
          <span>Subtotal</span>
          <strong>$${subtotal.toFixed(2)}</strong>
        </div>
      </aside>

    </div>
  `;

  const form = document.querySelector("#checkout-form");
  const cardName = document.querySelector("#demo-card-name");
  const cardNumber = document.querySelector("#demo-card-number");
  const expiry = document.querySelector("#demo-expiry");

  cardName.addEventListener("input", () => {
    document.querySelector("#card-name-preview").textContent =
      cardName.value.trim().toUpperCase() || "YOUR NAME";
  });

  cardNumber.addEventListener("input", () => {
    const digits = cardNumber.value.replace(/\D/g, "").slice(0, 16);
    cardNumber.value = digits.replace(/(.{4})/g, "$1 ").trim();

    document.querySelector("#card-preview").textContent =
      digits
        ? digits.replace(/\d(?=\d{4})/g, "•")
          .replace(/(.{4})/g, "$1 ").trim()
        : "•••• •••• •••• ••••";
  });

  expiry.addEventListener("input", () => {
    const digits = expiry.value.replace(/\D/g, "").slice(0, 4);
    expiry.value = digits.length > 2
      ? `${digits.slice(0, 2)}/${digits.slice(2)}`
      : digits;

    document.querySelector("#expiry-preview").textContent =
      expiry.value || "MM/YY";
  });

  form.addEventListener("submit", handleCheckout);
}

function handleCheckout(event) {
  event.preventDefault();

  const form = event.target;

  if (!form.reportValidity()) {
    return;
  }

  const cardName = document.querySelector(
    "#demo-card-name"
  ).value.trim();

  const cardNumber = document.querySelector(
    "#demo-card-number"
  ).value.replace(/\D/g, "");

  const expiry = document.querySelector(
    "#demo-expiry"
  ).value.trim();

  const cvv = document.querySelector(
    "#demo-cvv"
  ).value.trim();

  if (!cardName || cardNumber.length < 12 ||
      !/^(0[1-9]|1[0-2])\/\d{2}$/.test(expiry) ||
      !/^\d{3,4}$/.test(cvv)) {
    alert("For this demonstration, complete all the sample card fields using fictitious details.");
    return;
  }

  alert(
    "Demo checkout completed. No payment was made. " +
    "No card details have been saved."
  );

  const customer = {
    name: form.name.value.trim(),
    email: form.email.value.trim(),
    address: form.address.value.trim(),
    city: form.city.value.trim(),
    country: form.country.value.trim()
  };

  const cart = getCart();

  const order = {
    customer,
    items: cart,
    total: calculateSubtotal(cart),
    currency: "USD",
    paymentStatus: "demo-only-not-paid",
    date: new Date().toISOString()
  };

  localStorage.setItem("so-order", JSON.stringify(order));
  localStorage.removeItem("so-cart");

  window.location.href = "/success/";
}

renderCheckout();