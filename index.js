// An e-commerce console

let company = "Infinity stores"
console.log(company)

class Product {
    constructor(id, name, price) {
      this.id = id;
      this.name = name;
      this.price = price;
    }
  }
  
  class ShoppingCart {
    constructor() {
      this.items = [];
    }
  
    addItem(product, quantity) {
      this.items.push({ product, quantity });
    }
  
    getTotal() {
      return this.items.reduce((total, item) => total + item.product.price * item.quantity, 0);
    }
  
    displayCart() {
      console.log("\nShopping Cart:");
      this.items.forEach(item => {
        console.log(`${item.product.name} - $${item.product.price} x ${item.quantity}`);
      });
      console.log(`\nTotal: $${this.getTotal().toFixed(2)}`);
    }
  }
  
  const products = [
    new Product(1, "Laptop", 999.99),
    new Product(2, "Headphones", 49.99),
    new Product(3, "Smartphone", 399.99)
  ];
  
  function displayProducts() {
    console.log("\nAvailable Products:");
    products.forEach(product => {
      console.log(`${product.id}. ${product.name} - $${product.price}`);
    });
  }
  
  function main() {
    const shoppingCart = new ShoppingCart();
  
    displayProducts();
  
    const readline = require('readline').createInterface({
      input: process.stdin,
      output: process.stdout
    });
  
    function promptUser() {
      readline.question('\nEnter the product ID to add to the cart (or type "checkout" to complete): ', (input) => {
        if (input.toLowerCase() === 'checkout') {
          shoppingCart.displayCart();
          console.log("\nThank you for shopping with us!");
          readline.close();
        } else {
          const productId = parseInt(input);
          const selectedProduct = products.find(product => product.id === productId);
  
          if (selectedProduct) {
            readline.question(`Enter the quantity for ${selectedProduct.name}: `, (quantity) => {
              const parsedQuantity = parseInt(quantity);
              shoppingCart.addItem(selectedProduct, parsedQuantity || 1);
              console.log(`Added ${parsedQuantity || 1} ${selectedProduct.name}(s) to the cart.`);
              shoppingCart.displayCart();
              promptUser();
            });
          } else {
            console.log("Invalid product ID. Please try again.");
            promptUser();
          }
        }
      });
    }
  
    promptUser();
  }
  
  main();
  
  
  