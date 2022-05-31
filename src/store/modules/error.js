import { SET_ERRORMSG } from '../mutation_types'
import { CLEAR_ERRORMSG, UPDATE_ERRORMSG } from '../action_types'

const error = {
    state: {
        errorMsg: null
    },
    getters: {
        errorMsg: state => state.errorMsg
    },
    mutations: {
        [SET_ERRORMSG]: (state, payload) => { state.errorMsg = payload }
    },
    actions: {
        [CLEAR_ERRORMSG]: ({ commit }) => {
            commit(SET_ERRORMSG, null)
        },
        [UPDATE_ERRORMSG]: ({ commit }, payload) => {
            commit(SET_ERRORMSG, payload.errorMsg)
        }
    }
}

export default error