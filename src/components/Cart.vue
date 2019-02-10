<template>
  <div class="cart">
    <h1 class="title">Your Cart</h1>
    <p v-show="!products.length">
      <i>Your cart is empty!</i>
      <router-link to="/">Go shopping</router-link>
    </p>
    <table class="table is-striped" v-show="products.length">
      <thead>
        <tr>
          <td>Name</td>
          <td>Price</td>
          <td>Quantity</td>
        </tr>
      </thead>
      <tbody>
        <tr v-for="product in products" :key="product.id">
            <td>{{ product.name }}</td>
            <td>${{ product.price }}</td>
            <td>{{ product.quantity }}</td>
          </tr>
          <tr>
            <td><b>Total:</b></td>
            <td></td>
            <td><b>${{ total }}</b></td>
          </tr>
      </tbody>
    </table>
    <p><button v-show="products.length" class='button is-primary' @click='checkout(products)'>Checkout</button></p>

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
  </div>

</template>

<script>
  import { mapGetters, mapActions } from 'vuex'
  export default {
    computed: {
      ...mapGetters({
        products: 'cartProducts'
      }),
      total () {
        return this.products.reduce((total, p) => {
          return total + p.price * p.quantity
        }, 0)
      }
    },
    methods: mapActions([
                'addToCart',
                'checkout'
    ])
  }
</script>