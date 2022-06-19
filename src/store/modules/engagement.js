import axios from 'axios'
import router from '../../router'
import asyncHandler from '@/utils/async_handler'
import { SET_ENGAGEMENT } from '../mutation_types'
import { GET_ENGAGEMENT, CLEAR_ENGAGEMENT_ISLOADING } from '../action_types'
import { ENGAGEMENT_URL } from '../../utils/urls'

const engagement = {
    state: {
        engagement: {
            data: null,
            isLoading: false
        }
    },
    getters: {
        engagement: state => state.engagement
    },
    mutations: {
        [SET_ENGAGEMENT]: (state, payload) => { payload.data != null ? state.engagement.data = payload.data : null, state.engagement.isLoading = payload.isLoading }
    },
    actions: {
        [GET_ENGAGEMENT]: asyncHandler(async({ commit }, payload) => {
            commit(SET_ENGAGEMENT, { data: null, isLoading: true })
                // const result = await axios.get(ENGAGEMENT_URL)
            console.log('result.data', result)

            if (result.status == 200) {
                commit(SET_ENGAGEMENT, { data: result.data, isLoading: false })
                return
            }
            commit(SET_ENGAGEMENT, { data: null, isLoading: false })
            commit(SET_ERRORMSG, AUTH_GET_ENGAGEMENT_ERROR_MSG)
        }),
        [CLEAR_ENGAGEMENT_ISLOADING]: asyncHandler(async({ commit }) => {
            commit(SET_ENGAGEMENT, { isLoading: false })
        })
    }
}

export default engagement