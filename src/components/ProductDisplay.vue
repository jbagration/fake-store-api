<template>
    <div class="product-container">
      <h1>{{ product.title }}</h1>
      <div class="product-image-container">
        <img :src="product.image" alt="Product Image" class="product-image">
      </div>
      <p>{{ product.description }}</p>
      <p>{{ product.price }} $</p>
      <button @click="addToCartClicked">Добавить в корзину</button>
    </div>
  </template>
  
  <script>
  export default {
    props: {
      product: {
        type: Object,
        required: true
      }
    },
    methods: {
      addToCartClicked() {
        this.$emit('add-to-cart', this.product);
      }
    }
  };
  </script>
  
  <style scoped>
  .product-image-container {
    display: flex;
    justify-content: center;
  }
  
  .product-image {
    max-width: 100%;
    height: 70%;
    max-height: 300px; 
    object-fit: contain; 
  }
  
  .product-container h1 {
    font-size: 2rem;
    margin-bottom: 16px;
  }
  
  .product-container p {
    font-size: 1rem;
    margin-bottom: 16px;
  }
  
  .product-container button {
    background-color: #007BFF;
    color: white;
    border: none;
    border-radius: 5px;
    padding: 8px 16px;
    cursor: pointer;
    transition: background-color 0.3s ease;
  }
  
  .product-container button:hover {
    background-color: #0056b3;
  }
  
  @media (max-width: 600px) {
    .product-container h1 {
      font-size: 1.5rem;
    }
  
    .product-container p {
      font-size: 0.9rem;
    }
  
    .product-container button {
      padding: 6px 12px;
    }
  }
  </style>
  