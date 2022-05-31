import Vue from 'vue'
import Vuex from 'vuex'
import createPersistedState from 'vuex-persistedstate';
import account from './modules/account'
import error from './modules/error'
import feed from './modules/feed'

Vue.use(Vuex)

export default new Vuex.Store({
    modules: {
        account,
        error,
        feed
    },
    state: {

    },
    mutations: {

    },
    actions: {

    },
    plugins: [createPersistedState()]
})