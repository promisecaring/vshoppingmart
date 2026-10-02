/**
 * ExternalServices
 *
 * Handles communication with the DummyJSON API.
 */

export default class ExternalServices {
  constructor() {
    this.productsUrl = "https://dummyjson.com/products";
  }

  async getProducts() {
    const response = await fetch(this.productsUrl);

    if (!response.ok) {
      throw new Error("Unable to retrieve products.");
    }

    return response.json();
  }

  async getProductById(id) {
    const response = await fetch(
      `${this.productsUrl}/${id}`
    );

    if (!response.ok) {
      throw new Error("Unable to retrieve product.");
    }

    return response.json();
  }
}