
import "../../css/style.css";

console.log("VSHOPPINGMART CART.JS LOADED");

const cartContainer =
  document.querySelector("#cart-container");

function getCart() {
  return JSON.parse(
    localStorage.getItem("so-cart")
  ) || [];
}

function renderCart() {

  const cart = getCart();

  updateCartCount(cart);

  /*
   * IMPORTANT:
   * Only products stored in "so-cart"
   * are displayed here.
   */

  if (cart.length === 0) {

    cartContainer.innerHTML = `
      <div class="empty-cart">

        <h2>Your cart is empty</h2>

        <p>
          You haven't added any products yet.
        </p>

        <a
          href="/products/"
          class="continue-shopping"
        >
          Continue Shopping
        </a>

      </div>
    `;

    return;
  }

  cartContainer.innerHTML = `

    <div class="cart-items">

      ${cart.map((product, index) => `

        <article class="cart-item">

          <img
            src="${product.thumbnail}"
            alt="${product.title}"
            class="cart-item-image"
          >

          <div class="cart-item-info">

            <h2>
              ${product.title}
            </h2>

            <p class="cart-item-price">
              $${Number(product.price).toFixed(2)}
            </p>

            <div class="quantity-controls">

              <button
                type="button"
                class="quantity-btn"
                data-action="decrease"
                data-index="${index}"
              >
                −
              </button>

              <span class="quantity">
                ${product.quantity || 1}
              </span>

              <button
                type="button"
                class="quantity-btn"
                data-action="increase"
                data-index="${index}"
              >
                +
              </button>

            </div>

            <button
              type="button"
              class="remove-item"
              data-index="${index}"
            >
              Remove
            </button>

          </div>

          <div class="cart-item-subtotal">

            $${(
              Number(product.price) *
              (product.quantity || 1)
            ).toFixed(2)}

          </div>

        </article>

      `).join("")}

    </div>

    <div class="cart-summary">

      <h2>
        Cart Summary
      </h2>

      <div class="cart-summary-row">

        <span>
          Subtotal
        </span>

        <strong>
          $${calculateSubtotal(cart).toFixed(2)}
        </strong>

      </div>

      <div class="cart-summary-row">

        <span>
          Shipping
        </span>

        <strong>
          Calculated at checkout
        </strong>

      </div>

      <div class="cart-summary-total">

        <span>
          Total
        </span>

        <strong>
          $${calculateSubtotal(cart).toFixed(2)}
        </strong>

      </div>

      <a
        href="/checkout/"
        class="checkout-btn"
      >
        Proceed to Checkout
      </a>

      <a
        href="/products/"
        class="continue-shopping"
      >
        ← Continue Shopping
      </a>

    </div>

  `;

  addCartEvents();
}

function calculateSubtotal(cart) {

  return cart.reduce(
    (total, product) => {

      return (
        total +
        Number(product.price) *
        (product.quantity || 1)
      );

    },
    0
  );
}

function addCartEvents() {

  document
    .querySelectorAll(".quantity-btn")
    .forEach((button) => {

      button.addEventListener(
        "click",
        () => {

          const index =
            Number(button.dataset.index);

          const action =
            button.dataset.action;

          changeQuantity(
            index,
            action
          );

        }
      );

    });

  document
    .querySelectorAll(".remove-item")
    .forEach((button) => {

      button.addEventListener(
        "click",
        () => {

          const index =
            Number(button.dataset.index);

          removeItem(index);

        }
      );

    });
}

function changeQuantity(
  index,
  action
) {

  const cart = getCart();

  if (!cart[index]) {
    return;
  }

  const currentQuantity =
    cart[index].quantity || 1;

  if (action === "increase") {

    cart[index].quantity =
      currentQuantity + 1;

  }

  if (action === "decrease") {

    if (currentQuantity > 1) {

      cart[index].quantity =
        currentQuantity - 1;

    }

  }

  localStorage.setItem(
    "so-cart",
    JSON.stringify(cart)
  );

  renderCart();
}

function removeItem(index) {

  const cart = getCart();

  if (!cart[index]) {
    return;
  }

  cart.splice(index, 1);

  localStorage.setItem(
    "so-cart",
    JSON.stringify(cart)
  );

  renderCart();
}

function updateCartCount(cart) {

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

    cartCount.textContent =
      count;

  }
}

renderCart();

