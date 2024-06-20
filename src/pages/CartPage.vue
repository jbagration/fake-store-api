<template>
  <div class="cart-container">
    <h1>Корзина</h1>
    <div v-if="cart.length">
      <h2>Сумма: {{ total.toFixed(2) }} $</h2>
      <div class="cart-items">
        <div v-for="item in cart" :key="item.id" class="cart-item">
          <div class="cart-item-left">
            <div class="cart-item-image-container">
              <img :src="item.image" alt="" class="cart-item-image">
            </div>
            <div class="cart-item-title-container">
              <h2 class="cart-item-title">{{ item.title }}</h2>
            </div>
          </div>
          <div class="cart-item-right">
            <div class="cart-item-price-container">
              <p class="cart-item-price">{{ item.price }} $</p>
            </div>
            <div class="quantity-control">
              <button @click="decrementQuantity(item.id)">-</button>
              <input type="text" v-model="item.quantity" @input="onQuantityInput($event, item.id)" pattern="[1-9][0-9]*">
              <button @click="incrementQuantity(item.id)">+</button>
            </div>
            <button @click="removeFromCart(item.id)" class="remove-button">Удалить</button>
          </div>
        </div>
      </div>
    </div>
    <div v-else>
      <p>Корзина пуста</p>
    </div>
  </div>
</template>

<script>
import { mapState, mapMutations } from 'vuex';

export default {
  computed: {
    ...mapState(['cart']),
    total() {
      return this.cart.reduce((acc, item) => acc + item.price * item.quantity, 0);
    }
  },
  methods: {
    ...mapMutations(['removeFromCart', 'updateCartQuantity']),
    decrementQuantity(productId) {
      const item = this.cart.find(item => item.id === productId);
      if (item.quantity > 1) {
        this.updateCartQuantity({ productId, quantity: item.quantity - 1 });
      } else {
        this.removeFromCart(productId);
      }
    },
    incrementQuantity(productId) {
      const item = this.cart.find(item => item.id === productId);
      this.updateCartQuantity({ productId, quantity: item.quantity + 1 });
    },
    onQuantityInput(event, productId) {
      let newValue = event.target.value.replace(/[^\d]/g, '');
      if (newValue.length > 0 && newValue[0] === '0') {
        newValue = newValue.substring(1);
      }
      if (newValue === '') {
        newValue = '1';
      }
      this.updateCartQuantity({ productId, quantity: parseInt(newValue, 10) });
    }
  }
};
</script>

<style scoped>
.cart-container {
  max-width: 700px;
  margin: 0 auto;
  padding: 16px;
  text-align: center;
}

.cart-items {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
}

.cart-item {
  width: calc(50% - 16px);
  margin-bottom: 16px;
  background-color: #fff;
  border: 1px solid #ccc;
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  transition: transform 0.3s ease, box-shadow 0.3s ease;
}

.cart-item:hover {
  transform: translateY(-5px);
  box-shadow: 0 8px 16px rgba(0, 123, 255, 0.2);
}

.cart-item-left {
  display: flex;
  align-items: center;
  margin: 16px;
}

.cart-item-image-container {
  width: 130px;
  height: 130px;
  margin-right: 16px;
}

.cart-item-image {
  width: 100%;
  height: 100%;
  object-fit: contain;
}

.cart-item-title-container {
  flex: 1;
}

.cart-item-title {
  font-size: 1rem;
}

.cart-item-right {
  text-align: center;
  margin-bottom: 16px
}

.cart-item-price-container {
  flex: 1;
}

.cart-item-price {
  font-size: 1rem;
  margin-bottom: 8px;
}

.quantity-control {
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 8px;
}

.quantity-control button {
  background-color: #007BFF;
  color: white;
  border: none;
  padding: 4px 8px;
  cursor: pointer;
  transition: background-color 0.3s ease;
  border-radius: 4px;
}

.quantity-control button:hover {
  background-color: #0056b3;
}

.quantity-control input {
  width: 40px;
  text-align: center;
  margin: 0 8px;
  padding: 4px;
  border: 1px solid #ccc;
  border-radius: 4px;
}

.remove-button {
  background-color: #FF4136;
  color: white;
  border: none;
  padding: 8px 16px;
  cursor: pointer;
  transition: background-color 0.3s ease;
  border-radius: 4px;
}

.remove-button:hover {
  background-color: #b32a21;
}

@media (max-width: 600px) {
  .cart-item {
    width: 100%; 
  }

  .cart-item-left,
  .cart-item-right {
    width: 100%;
    margin-bottom: 16px;
  }

  .cart-item-left {
    margin-top: 16px;
    margin-left: 8px;
  }
  .cart-item-image-container {
    margin-bottom: 16px;
  }

  .cart-item-title {
  max-width: 150px;
}
}
</style>
