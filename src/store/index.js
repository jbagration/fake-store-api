import { createApp } from 'vue';
import Vuex from 'vuex';
import axios from 'axios';

const app = createApp({});
app.use(Vuex);

export default new Vuex.Store({
  state: {
    products: [],
    cart: JSON.parse(localStorage.getItem('cart')) || []
  },
  mutations: {
    setProducts(state, products) {
      state.products = products;
    },
    addToCart(state, product) {
      const item = state.cart.find(i => i.id === product.id);
      if (item) {
        item.quantity++;
      } else {
        state.cart.push({ ...product, quantity: 1 });
      }
      localStorage.setItem('cart', JSON.stringify(state.cart));
    },
    removeFromCart(state, productId) {
      state.cart = state.cart.filter(item => item.id !== productId);
    },
    updateCartQuantity(state, { productId, quantity }) {
      const item = state.cart.find(i => i.id === productId);
      if (item) {
        item.quantity = quantity;
        localStorage.setItem('cart', JSON.stringify(state.cart));
      }
    }
  },
  actions: {
    async fetchProducts({ commit }) {
      const response = await axios.get('https://fakestoreapi.com/products');
      commit('setProducts', response.data);
    },
    addToCart({ commit }, product) {
      commit('addToCart', product);
    },
    removeFromCart({ commit }, productId) {
      commit('removeFromCart', productId);
    },
    updateCartQuantity({ commit }, payload) {
      commit('updateCartQuantity', payload);
    }
  }
});
