<template>
  <div class="cart">
    <h1 class="title">Your Cart</h1>
    <p v-show="!orders.length">
      <i>Your cart is empty!</i>
      <router-link to="/">Go shopping</router-link>
    </p>
    <table class="table is-striped" v-show="orders.length">
      <thead>
        <tr>
          <td>Order</td>
          <td>Items</td>
          <td>Cost</td>
        </tr>
      </thead>
      <tbody>
        <tr v-for="order in orders" :key="order.id">
            <td>{{ order.id }}</td>
            <td p-for="products in order" :key="product.id">{{ product.quantity }} {{ product.measurement }} {{ product.name }}</td>
            <td>{{ orderTotal(order) }}</td>
          </tr>
          <tr>
            <td><b>Total:</b></td>
            <td></td>
            <td><b>${{ cartTotal }}</b></td>
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
              <td>scoop/serving</td>
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
        length:   'getNumberOfOrders'
      }),
      orderTotal (order) {
        return order.products.reduce((orderTotal, p) => {
          return orderTotal + p.price * p.quantity
        }, 0)
      },
      cartTotal () {
        return this.orders.reduce((cartTotal, o) => {
          return cartTotal + o.products
        })
      }
    },
    methods: mapActions([
                'addNewOrder',
                'addToOrder',
                'checkout'
    ])
  }
</script>