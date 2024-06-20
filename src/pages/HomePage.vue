<template>
  <div>
    <h1>Товары</h1>
    <div class="filter-section">
      <input v-model="searchQuery" placeholder="Поиск товаров">
      <select v-model="selectedCategory">
        <option value="">Все категории</option>
        <option v-for="category in categories" :key="category" :value="category">{{ category }}</option>
      </select>
    </div>
    <div class="products">
      <div v-for="product in filteredProducts" :key="product.id" class="product-card">
        <div class="product-image-container">
          <img :src="product.image" alt="" class="product-image">
        </div>
        <div class="product-info">
          <h2 class="product-title">{{ product.title }}</h2>
          <p>{{ product.price }} $</p>
          <router-link :to="`/product/${product.id}`">Подробнее</router-link>
          <div v-if="isInCart(product.id)">
            <button @click="decrementQuantity(product.id)">-</button>
            <span>{{ getCartItem(product.id).quantity }}</span>
            <button @click="incrementQuantity(product.id)">+</button>
          </div>
          <button v-else @click="addToCart(product)">Добавить в корзину</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex';

export default {
  data() {
    return {
      searchQuery: '',
      selectedCategory: ''
    };
  },
  computed: {
    ...mapState(['products', 'cart']),
    categories() {
      return [...new Set(this.products.map(product => product.category))];
    },
    filteredProducts() {
      let products = this.products;
      if (this.selectedCategory) {
        products = products.filter(product => product.category === this.selectedCategory);
      }
      if (this.searchQuery) {
        products = products.filter(product =>
          product.title.toLowerCase().includes(this.searchQuery.toLowerCase())
        );
      }
      return products;
    }
  },
  methods: {
    ...mapActions(['fetchProducts', 'addToCart', 'removeFromCart', 'updateCartQuantity']),
    isInCart(productId) {
      return this.cart.some(item => item.id === productId);
    },
    getCartItem(productId) {
      return this.cart.find(item => item.id === productId);
    },
    incrementQuantity(productId) {
      const item = this.getCartItem(productId);
      this.updateCartQuantity({ productId, quantity: item.quantity + 1 });
    },
    decrementQuantity(productId) {
      const item = this.getCartItem(productId);
      if (item.quantity > 1) {
        this.updateCartQuantity({ productId, quantity: item.quantity - 1 });
      } else {
        this.removeFromCart(productId);
      }
    }
  },
  created() {
    this.fetchProducts();
  }
};
</script>

<style>
@import url('https://fonts.googleapis.com/css2?family=Roboto:wght@400;700&display=swap');

h1 {
  text-align: center;
  margin-bottom: 20px;
  font-size: 2.5rem;
}

input, select {
  display: inline-block;
  width: calc(50% - 10px);
  max-width: 300px;
  margin: 0 10px 20px 0;
  padding: 10px;
  font-size: 1rem;
  border: 1px solid #ccc;
  border-radius: 5px;
}

.filter-section {
  text-align: center;
  margin-bottom: 20px;
}

.products {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 16px;
}

.product-card {
  border: 1px solid #ccc;
  padding: 16px;
  margin: 16px;
  text-align: center;
  width: 300px;
  height: 500px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  transition: transform 0.3s ease, box-shadow 0.3s ease;
  background-color: #fff;
  border-radius: 10px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}

.product-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 8px 16px rgba(0, 123, 255, 0.2);
}

.product-image-container {
  width: 100%;
  height: 250px;
  overflow: hidden;
}

.product-image {
  width: 60%;
  height: 60%;
  object-fit: contain;
}

.product-info {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  flex-grow: 1;
}

.product-title {
  font-size: 1.2rem;
  margin-bottom: 8px;
  font-family: 'Roboto', sans-serif;
  height: 3rem;
  line-height: 1.5rem;
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
}

.product-info p {
  font-size: 1rem;
  font-family: 'Roboto', sans-serif;
}

.product-info a {
  text-decoration: none;
  color: #007BFF;
  font-size: 0.9rem;
  margin-bottom: 10px;
}

.product-info a:hover {
  text-decoration: underline;
}

.product-card button {
  background-color: #007BFF;
  color: white;
  border: none;
  padding: 10px 20px;
  cursor: pointer;
  transition: background-color 0.3s ease;
  border-radius: 5px;
  margin-top: 10px;
}

.product-card button:hover {
  background-color: #0056b3;
}

.product-card div {
  display: flex;
  align-items: center;
  justify-content: center;
}

.product-card span {
  margin: 0 8px;
}

@media (max-width: 600px) {
  .product-card {
    width: 100%;
    margin: 10px 0;
  }

  h1 {
    font-size: 2rem;
  }

  input, select {
    width: 100%;
    margin-right: 0;
    margin-bottom: 10px;
  }
}
</style>
