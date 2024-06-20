<template>
  <div id="app">
    <header>
      <h1>Интернет-магазин</h1>
    </header>
    <nav>
      <router-link to="/">Главная</router-link>
      <router-link to="/cart">Корзина</router-link>
    </nav>
    <main>
      <router-view @add-to-cart="addToCart" @remove-from-cart="removeFromCart" />
    </main>
  </div>
</template>

<script>
export default {
  data() {
    return {
      cart: [],
    };
  },
  methods: {
    addToCart(product) {
      const existingProduct = this.cart.find((item) => item.id === product.id);
      if (existingProduct) {
        existingProduct.quantity++;
      } else {
        this.cart.push({ ...product, quantity: 1 });
      }
      this.saveCart();
    },
    removeFromCart(product) {
      const index = this.cart.findIndex((item) => item.id === product.id);
      if (index !== -1) {
        if (this.cart[index].quantity > 1) {
          this.cart[index].quantity--;
        } else {
          this.cart.splice(index, 1);
        }
        this.saveCart();
      }
    },
    saveCart() {
      localStorage.setItem('cart', JSON.stringify(this.cart));
    },
    loadCart() {
      const savedCart = JSON.parse(localStorage.getItem('cart'));
      if (savedCart) {
        this.cart = savedCart;
      }
    },
  },
  mounted() {
    this.loadCart();
  },
};
</script>

<style>
#app {
  text-align: center;
  background-color: #f2f2f2;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  transition: background-color 0.3s ease;
}

body {
  font-family: 'Roboto', sans-serif;
  margin: 0;
  padding: 0;
  box-sizing: border-box;
  background-color: #f2f2f2; 
  transition: background-color 0.3s ease; 
}

button {
  font-family: 'Roboto', sans-serif;
  cursor: pointer;
  transition: background-color 0.3s ease, transform 0.2s ease;
}

header {
  background-color: #27517e;
  color: white;
  padding: 16px 0;
  transition: background-color 0.3s ease; 
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

nav {
  margin: 16px 0;
  display: flex;
  justify-content: center;
}

nav a {
  margin: 0 16px;
  text-decoration: none;
  color: #333;
  font-weight: bold;
  transition: color 0.3s ease; 
}

nav a:hover {
  color: #007BFF;
}

main {
  flex: 1;
  padding: 16px;
  background-color: white; 
  border-radius: 10px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1); 
  transition: box-shadow 0.3s ease;
}

main:hover {
  box-shadow: 0 8px 16px rgba(0, 0, 0, 0.2);
}

@media (max-width: 600px) {
  nav {
    flex-direction: column;
  }

  nav a {
    margin: 8px 0;
  }
}
</style>
