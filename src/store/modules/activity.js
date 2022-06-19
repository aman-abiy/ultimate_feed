import axios from 'axios'
import router from '../../router'
import asyncHandler from '@/utils/async_handler'
import { SET_ACTIVITY } from '../mutation_types'
import { GET_ACTIVITY, CLEAR_ACTIVITY_ISLOADING } from '../action_types'
import { ACTIVITY_URL } from '../../utils/urls'

const activity = {
    state: {
        activity: {
            data: null,
            isLoading: false
        }
    },
    getters: {
        activity: state => state.activity
    },
    mutations: {
        [SET_ACTIVITY]: (state, payload) => { payload.data != null ? state.activity.data = payload.data : null, state.activity.isLoading = payload.isLoading }
    },
    actions: {
        [GET_ACTIVITY]: asyncHandler(async({ commit }, payload) => {
            commit(SET_ACTIVITY, { data: null, isLoading: true })
            const result = await axios.get(ACTIVITY_URL)

            if (result.status == 200) {
                commit(SET_ACTIVITY, { data: result.data, isLoading: false })
                return
            }
            commit(SET_ACTIVITY, { data: null, isLoading: false })
            commit(SET_ERRORMSG, AUTH_GET_ENGAGEMENT_ERROR_MSG)
        }),
        [CLEAR_ACTIVITY_ISLOADING]: asyncHandler(async({ commit }) => {
            commit(SET_ACTIVITY, { isLoading: false })
        })
    }
}

export default activity