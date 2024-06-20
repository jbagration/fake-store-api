<template>
    <div class="product-card">
      <img :src="product.image" alt="">
      <h2>{{ product.title }}</h2>
      <p>{{ product.price }} $</p>
      <router-link :to="`/product/${product.id}`">Подробнее</router-link>
      <button @click="$emit('add-to-cart', product)">Добавить в корзину</button>
    </div>
  </template>
  
  <script>
  export default {
    props: ['product']
  };
  </script>
  
  <style>
  .product-card {
    border: 1px solid #ccc;
    padding: 16px;
    margin: 16px;
    text-align: center;
  }
  </style>
  