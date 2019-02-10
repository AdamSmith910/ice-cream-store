<template>
  <div>
    <h1 class="title">All Items</h1>
      <table class="table is-striped">
        <thead>
          <tr>
            <th>Quantity</th>
            <th>Name</th>
            <th>Price</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="product in products" :key="product.id">
            <td>{{ product.measurement }}</td>
            <td>{{ product.name }}</td>
            <td>${{ product.price }}</td>
            <td><button @click='addToCart(product)' class='button is-info'>Add to cart</button></td>
          </tr>
        </tbody>
    </table>
  </div>
</template>

<script>
  import { mapGetters, mapActions } from 'vuex'
  export default {
    name: 'app',
    computed: mapGetters({
      products: 'allProducts',
      length: 'getNumberOfProducts'
    }),
    methods: mapActions([
      'addToCart'
    ])
  }
</script>