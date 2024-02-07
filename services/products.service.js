const { faker } = require("@faker-js/faker");
const boom = require('@hapi/boom');
class ProductsService {

  constructor() {
    this.products = [];
    this.generate()
  }

  async generate() {
    let limit = 100
    for (let i = 0; i < limit; i++) {
        this.products.push({
            id: faker.string.uuid(),
            name: faker.commerce.productName(),
            price: parseInt(faker.commerce.price(), 10),
            image: faker.image.url(),
            blocked: faker.datatype.boolean()
        });
    }
  }

  async create(data) {
    const product = {
      id: faker.string.uuid(),
      ...data
    }
    this.products.push(product);
    return product;
  }

  find() {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        resolve(this.products)
      }, 400)
    })
  }

  async findOne(id) {
    const product = this.products.find(item => item.id === id);
    if(!product) {
      throw boom.notFound('Product not found')
    }
    if(product.blocked) {
      throw boom.conflict('Product is blocked')
    }
    return product;
  }

  async update(updatedProduct, id) {
    const productIndex = this.products.findIndex(item => item.id === id);
    if(productIndex === -1) {
      throw boom.notFound('Product not found')
    }
    const product = this.products[productIndex]
    this.products[productIndex] = {
      ...product,
      ...updatedProduct}

    return this.products[productIndex];
  }

  async delete(id) {
    const productIndex = this.products.findIndex(item => item.id === id);
    if(productIndex === -1) {
      throw boom.notFound('Product not found')
    }
    this.products.splice(productIndex, 1);
   return {id}
  }

}

module.exports = ProductsService
