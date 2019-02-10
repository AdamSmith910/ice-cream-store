import Vue from 'vue'
import Vuex from 'vuex'
import * as types from './mutation-types'
Vue.use(Vuex)

function getTotal(products) {
  return products.reduce((total, p) => {
    return total + p.price * p.quantity
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
  cartProducts: state => {
    return state.added.map(({ id, quantity }) => {
      const product = state.all.find(p => p.id === id)
        return {
                name: product.name,
                price: product.price,
                quantity
              }
        })
    }
}

// actions
const actions = {
  addToCart({ commit }, product) {
    commit(types.ADD_TO_CART, {
      id: product.id
    })
  },
  checkout({ commit }, products) {
    alert('Pay us $' + getTotal(products));
    commit(types.CHECKOUT);
  }
}

// mutations
const mutations = {
  [types.ADD_TO_CART] (state, { id }) {
        const record = state.added.find(p => p.id === id)
  if (!record) {
          state.added.push({
            id,
            quantity: 1
          })
        } else {
          record.quantity++
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