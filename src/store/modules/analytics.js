import axios from 'axios'
import router from '../../router'
import asyncHandler from '@/utils/async_handler'
import { SET_ANALYTICS } from '../mutation_types'
import { GET_ANALYTICS, CLEAR_ANALYTICS_ISLOADING } from '../action_types'
import { ANALYTICS_URL } from '../../utils/urls'

const analytics = {
    state: {
        analytics: {
            data: null,
            isLoading: false
        }
    },
    getters: {
        analytics: state => state.analytics
    },
    mutations: {
        [SET_ANALYTICS]: (state, payload) => { payload.data != null ? state.analytics.data = payload.data : null, state.analytics.isLoading = payload.isLoading }
    },
    actions: {
        [GET_ANALYTICS]: asyncHandler(async({ commit }, payload) => {
            commit(SET_ANALYTICS, { data: null, isLoading: true })
            const result = await axios.get(ANALYTICS_URL, {
                param: {
                    from: payload.from,
                    to: payload.to
                }
            })
            console.log('result.data', result)

            if (result.status == 200) {
                commit(SET_ANALYTICS, { data: result.data, isLoading: false })
                return
            }
            commit(SET_ANALYTICS, { data: null, isLoading: false })
            commit(SET_ERRORMSG, AUTH_GET_ENGAGEMENT_ERROR_MSG)
        }),
        [CLEAR_ANALYTICS_ISLOADING]: asyncHandler(async({ commit }) => {
            commit(SET_ANALYTICS, { isLoading: false })
        })
    }
}

export default analytics