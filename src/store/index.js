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
  cartOrders: state => {
    return state.added.map(({ id }) => {
      const order = state.added.find(o => o.id === id)
        return {
                id: order.id,
                products: order.products,
                orderTotal: order.orderTotal,
              }
        })
    }
}

// actions
const actions = {
  addToOrder({ commit }, product) {
    commit(types.ADD_TO_ORDER, {
      id: product.id
    })
  },
  checkout({ commit }, orders) {
    alert('Pay us $' + getCartTotal(orders));
    commit(types.CHECKOUT);
  }
}

// mutations
const mutations = {
  [types.ADD_TO_ORDER] (state, { id }) {
    const record = state.added.find(o => o.id === id)
    if (!record.products) {
      record.products.push({
        id,
        quantity: 1
      })
    } else {
      record.products.quantity++
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