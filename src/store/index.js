import Vue from 'vue'
import Vuex from 'vuex'
import createPersistedState from 'vuex-persistedstate';
import api from './modules/api'
import auth from './modules/auth'
import error from './modules/error'
import feed from './modules/feed'
import engagement from './modules/engagement'
import activity from './modules/activity'

Vue.use(Vuex)

export default new Vuex.Store({
    modules: {
        api,
        auth,
        error,
        feed,
        engagement,
        activity
    },
    state: {

    },
    mutations: {

    },
    actions: {

    },
    plugins: [createPersistedState()]
})