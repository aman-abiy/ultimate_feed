import Vue from 'vue'
import Vuex from 'vuex'
import createPersistedState from 'vuex-persistedstate';
import account from './modules/account'
import error from './modules/error'
import feed from './modules/feed'
import engagement from './modules/engagement'

Vue.use(Vuex)

export default new Vuex.Store({
    modules: {
        account,
        error,
        feed,
        engagement
    },
    state: {

    },
    mutations: {

    },
    actions: {

    },
    plugins: [createPersistedState()]
})