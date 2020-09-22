import Vue from 'vue'
import Vuex from 'vuex'
import createPersistedState from 'vuex-persistedstate'

Vue.use(Vuex)

export default new Vuex.Store({
  plugins: [createPersistedState()],
  state: {
    token: ''
  },
  mutations: {
    token(state, item) {
      state.token = item
      console.log(state.token, "VUEX")
    }
  },
  actions: {
    token(context, item) {
      context.commit('token', item)
      console.log(item, "VUEX")
    }
  },
  modules: {}
})