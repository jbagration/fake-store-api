<template>
  <div class="product-page">
    <ProductDisplay :product="product" @add-to-cart="addToCart"></ProductDisplay>
  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex';
import axios from 'axios';
import ProductDisplay from '../components/ProductDisplay.vue';

export default {
  components: {
    ProductDisplay
  },
  data() {
    return {
      product: {}
    };
  },
  computed: {
    ...mapState(['products'])
  },
  methods: {
    ...mapActions(['addToCart']),
    async fetchProduct() {
      try {
        const productId = this.$route.params.id;
        const response = await axios.get(`https://fakestoreapi.com/products/${productId}`);
        this.product = response.data;
      } catch (error) {
        console.error('Error fetching product:', error);
      }
    }
  },
  created() {
    this.fetchProduct();
  }
};
</script>

<style scoped>
.product-page {
  max-width: 800px;
  margin: 0 auto;
  padding: 16px;
  text-align: center;
}

</style>
