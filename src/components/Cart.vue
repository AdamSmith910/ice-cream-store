<template>
  <div class="cart">
    <h1 class="title">Your Cart</h1>
    <p v-show="!orders.length">
      <i>Your cart is empty!</i>
    </p>
    <table class="table is-striped" v-show="orders.length">
      <thead>
        <tr>
          <td>Order</td>
          <td>Items</td>
          <td>Cost</td>
        </tr>
      </thead>
      <tbody v-if="orders.length">
        <tr v-for="order in orders" :key="order.id">
            <td>{{ order.id }}</td>
            <td v-for="product in order.products" :key="product.id">{{ product.quantity }} {{ product.measurement }} {{ product.name }}</td>
            <td>${{ order.orderTotal }}</td>
          </tr>
          <tr>
            <td><b>Total:</b></td>
            <td></td>
            <td><b>{{ getCartTotal }}</b></td>
          </tr>
      </tbody>
    </table>
    <p><button class='button' @click='addNewOrder'>Add new order to cart</button></p>
    <p><button v-show="orders.length" class='button is-primary' @click='checkout(orders)'>Checkout</button></p>

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
              <td>1 scoop/serving</td>
              <td>{{ product.name }}</td>
              <td>${{ product.price }}</td>
              <td><button @click='addToOrder(product)' class='button is-info'>Add to order</button></td>
            </tr>
          </tbody>
      </table>
    </div>
  </div>

</template>

<script>
  import { mapGetters, mapActions } from 'vuex'
  export default {
    name: 'app',
    computed: {
      ...mapGetters({
        orders:   'cartOrders',
        products: 'allProducts',
        length:   'getNumberOfOrders'
      })
    },
    methods: mapActions([
                'getCartTotal',
                'addNewOrder',
                'checkout'
    ])
  }
</script>