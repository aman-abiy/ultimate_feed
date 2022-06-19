import axios from 'axios'
import router from '../../router'
import asyncHandler from '@/utils/async_handler'
import { SET_API_KEY, SET_API_KEYS, SET_ERRORMSG } from '../mutation_types'
import {
    GET_API_KEYS,
    CREATE_API_KEY,
    DELETE_API_KEY,
    CLEAR_API_ISLOADING
} from '../action_types'
import { API_KEY_URL } from '../../utils/urls'
import { AUTH_LOGIN_ERROR_MSG } from '../../utils/consts'

const api_key = {
    state: {
        api_keys: {
            data: null,
            isLoading: false
        },
        api_key: {
            data: null,
            isLoading: false
        }
    },
    getters: {
        api_key: state => state.api_key,
        api_keys: state => state.api_keys
    },
    mutations: {
        [SET_API_KEY]: (state, payload) => { payload.data != null ? state.api_key.data = payload.data : null, state.api_key.isLoading = payload.isLoading },
        [SET_API_KEYS]: (state, payload) => { payload.data != null ? state.api_keys.data = payload.data : null, state.api_keys.isLoading = payload.isLoading },
    },
    actions: {
        [GET_API_KEYS]: asyncHandler(async({ commit }, payload) => {
            commit(SET_API_KEYS, { isLoading: true })
            const result = await axios.get(API_KEY_URL)

            if (result.status == 200) {
                console.log('result.data - api-keys - ', result.data)
                commit(SET_API_KEYS, { data: result.data, isLoading: false })
                return
            }
            commit(SET_API_KEYS, { isLoading: false })
        }),
        [CREATE_API_KEY]: asyncHandler(async({ commit, state }, payload) => {
            commit(SET_API_KEY, { data: null, isLoading: true })
            const result = await axios.post(API_KEY_URL)

            if (result.status == 200) {
                state.api_keys.unshift(result.data)
                commit(SET_API_KEY, { data: result.data, isLoading: false })
                return
            }
            commit(SET_API_KEY, { isLoading: false })
        }),
        [DELETE_API_KEY]: asyncHandler(async({ commit, state }, payload) => {
            commit(SET_API_KEY, { data: null, isLoading: true })
            const result = await axios.delete(API_KEY_URL, {
                params: {
                    id: payload.id
                }
            })

            if (result.status == 200) {
                const deleteIndex = null
                state.api_keys.data.forEach((e, i) => {
                    if (e.id == payload.id) {
                        deleteIndex = i
                    }
                })

                if (deleteIndex) {
                    state.api_keys.data.splice(deleteIndex, 1)
                }

                commit(SET_API_KEY, { isLoading: false })
                return
            }
            commit(SET_API_KEY, { isLoading: false })
        }),
        [CLEAR_API_ISLOADING]: asyncHandler(async({ commit }) => {
            commit(SET_API_KEY, { isLoading: false })
        })
    }
}

export default api_key