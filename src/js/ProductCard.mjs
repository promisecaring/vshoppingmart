
export function createProductCard(product) {
  return `
    <article class="product-card">

      <a
        href="/product/?id=${product.id}"
        class="product-card-link"
      >

        <img
          src="${product.thumbnail}"
          alt="${product.title}"
          class="product-image"
        >

        <div class="product-info">

          <h2>${product.title}</h2>

          <p class="product-price">
            $${Number(product.price).toFixed(2)}
          </p>

          <p class="product-rating">
            ⭐ ${product.rating}
          </p>

        </div>

      </a>

    </article>
  `;
}

