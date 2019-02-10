import Vue from 'vue'
import Vuex from 'vuex'
import * as types from './mutation-types'
Vue.use(Vuex)
const debug = process.env.NODE_ENV !== 'production'

// initial state
const state = {
  added: [],
  all: [
    {
      id: '1',
      measurement: '1 scoop',
      name: 'Vanilla',
      price: 1
    },
    {
      id: '2',
      measurement: '1 scoop',
      name: 'Chocolate',
      price: 1
    },
    {
      id: '3',
      measurement: '1 scoop',
      name:  'Mint Chocolate Chip',
      price: 1
    },
    {
      id: '4',
      measurement: '1 serving',
      name:  'Sprinkles',
      price: 0.25
    },
    {
      id: '5',
      measurement: '1 serving',
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
  checkout({ commit }) {
    alert('Pay us $' + this.total);
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