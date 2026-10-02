import ExternalServices from "./ExternalServices.mjs";
import { createProductCard } from "./ProductCard.mjs";

export default class ProductList {
  constructor() {
    this.service = new ExternalServices();
  }

  async init() {
    try {
      const data = await this.service.getProducts();

      console.log("Products received:", data);

      return data.products || [];
    } catch (error) {
      console.error("Error loading products:", error);
      return [];
    }
  }

  renderProducts(products, container) {
    container.innerHTML = products
      .map((product) => createProductCard(product))
      .join("");
  }
}