import axios from 'axios'
import router from '../../router'
import asyncHandler from '@/utils/async_handler'
import { SET_FEED } from '../mutation_types'
import { GET_FEED, CLEAR_FEED_ISLOADING } from '../action_types'
import { FEED_URL } from '../../utils/urls'
import { AUTH_GET_FEED_ERROR_MSG } from '../../utils/consts'

const feed = {
    state: {
        feed: {
            data: null,
            isLoading: false
        }
    },
    getters: {
        feed: state => state.feed
    },
    mutations: {
        [SET_FEED]: (state, payload) => { payload.data != null ? state.feed.data = payload.data : null, state.feed.status = payload.status, state.feed.isLoading = payload.isLoading }
    },
    actions: {
        [GET_FEED]: asyncHandler(async({ commit }, payload) => {
            commit(SET_FEED, { data: null, isLoading: true })
            console.log('payload', payload)
            const result = await axios.get(FEED_URL, {
                params: {
                    userId: payload.userId,
                    length: 10
                }
            })
            console.log('result', result)

            if (result.status == 200) {
                commit(SET_FEED, { data: result.data.data, isLoading: false })
                return
            }
            commit(SET_FEED, { data: null, isLoading: false })
            commit(SET_ERRORMSG, AUTH_GET_FEED_ERROR_MSG)
        }),
        [CLEAR_FEED_ISLOADING]: asyncHandler(async({ commit }) => {
            commit(SET_FEED, { isLoading: false })
        })
    }
}

export default feed