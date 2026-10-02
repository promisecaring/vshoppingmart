
import "../../css/style.css";

const container =
  document.querySelector("#success-container");

function getOrder() {
  return JSON.parse(
    localStorage.getItem("so-order")
  );
}

function renderSuccess() {

  const order = getOrder();

  const cartCount =
    document.querySelector(".cart-count");

  if (cartCount) {
    cartCount.textContent = "0";
  }

  if (!order) {

    container.innerHTML = `
      <div class="success-message">

        <h1>No Order Found</h1>

        <p>
          We could not find a recent order.
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

  const orderTotal =
    Number(order.total || 0);

  container.innerHTML = `

    <div class="success-message">

      <h1>
        Thank You For Your Order!
      </h1>

      <p>
        Your order has been received successfully.
      </p>

      <div class="order-confirmation">

        <h2>
          Order Summary
        </h2>

        <p>
          <strong>
            Customer:
          </strong>

          ${order.customer.name}
        </p>

        <p>
          <strong>
            Email:
          </strong>

          ${order.customer.email}
        </p>

        <div class="success-items">

          ${order.items.map((product) => `

            <div class="success-item">

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

        <div class="success-total">

          <strong>
            Order Total:
          </strong>

          <strong>
            $${orderTotal.toFixed(2)}
          </strong>

        </div>

      </div>

      <a
        href="/products/"
        class="continue-shopping"
      >
        Continue Shopping
      </a>

    </div>
  `;
}

renderSuccess();

