import Vue from 'vue'
import Vuex from 'vuex'
import * as types from './mutation-types'
Vue.use(Vuex)

function getCartTotal(orders) {
  return orders.reduce((cartTotal, o) => {
    return cartTotal + o.orderTotal;
  }, 0)
}

const debug = process.env.NODE_ENV !== 'production'

// initial state
const state = {
  added: [],
  cartTotal: 0,
  all: [
    {
      id: '1',
      measurement: 'scoop(s)',
      name: 'Vanilla',
      price: 1.00
    },
    {
      id: '2',
      measurement: 'scoop(s)',
      name: 'Chocolate',
      price: 1.00
    },
    {
      id: '3',
      measurement: 'scoop(s)',
      name:  'Mint Chocolate Chip',
      price: 1.00
    },
    {
      id: '4',
      measurement: 'serving(s)',
      name:  'Sprinkles',
      price: 0.25
    },
    {
      id: '5',
      measurement: 'serving(s)',
      name:  'Chocolate Chips',
      price: 0.25
    }
  ]
}

// getters
const getters = {
  allProducts: state => state.all, // would need action/mutation if data fetched async
  getNumberOfProducts: state => (state.all) ? state.all.length : 0,
  cartOrders: state => state.added
}

// actions
const actions = {
  getCartTotal({ commit }) {
    commit(types.GET_CART_TOTAL);
  },
  addNewOrder({ commit }, order) {
    commit(types.ADD_NEW_ORDER, {
      id: order.id
    })
  },
  addToOrder({ commit }, order, product) {
    commit(types.ADD_TO_ORDER, {
      id: product.id,
      order_id: order.id
    })
  },
  deleteOrder({ commit }, order) {
    commit(types.DELETE_ORDER, {
      id: order.id
    })
  },
  checkout({ commit }, orders) {
    if (state.added.forEach(o => o.products.any(p => (p.id === 1 || p.id === 2 || p.id === 3)))) {
      alert('Pay us $' + getCartTotal(orders));
      commit(types.CHECKOUT);
    } else {
      alert('One of your orders does not contain any scoops of ice cream.  Each order must have at least one scoop of ice cream.')
    }
  }
}

// mutations
const mutations = {
  [types.GET_CART_TOTAL] (state) {
    state.cartTotal = state.cartTotal + state.added.reduce((cartTotal, o) => {
      return cartTotal + o.orderTotal;
    }, 0)
  },
  [types.ADD_NEW_ORDER] (state, { id }) {
    state.added.push({
      id,
      products: [],
      orderTotal: 0
    })
  },
  [types.ADD_TO_ORDER] (state, { orderId }, { productId }) {
    const orderRecord = state.added.find(o => o.id === orderId)
    const productRecord = orderRecord.find(p => p.id === productId)
    if (!productRecord) {
      orderRecord.push({
        id: productId,
        quantity: 1
      })
    } else {
      productRecord.quantity++
    }
  },
  [types.DELETE_ORDER] (state, { orderId }) {
    for (var i = 0; i < state.added.length; i++) {
      if (state.added[i].id === orderId) {
        state.added.splice(i, 1);
      }
    }
  },
  [types.CHECKOUT] (state) {
    state.added = [];
  }
}

// one store for entire application
export default new Vuex.Store({
  state,
  strict: debug,
  getters,
  actions,
  mutations
})