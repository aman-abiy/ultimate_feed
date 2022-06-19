import axios from 'axios'
import router from '../../router'
import asyncHandler from '@/utils/async_handler'
import { SET_DOCS, CLEAR_DOCS_IS_LOADING } from '../mutation_types'
import {
    GET_DOCS
} from '../action_types'
import { DOCS_URL } from '../../utils/urls'

const docs = {
    state: {
        doc: {
            data: null,
            isLoading: false
        }
    },
    getters: {
        doc: state => state.doc,
    },
    mutations: {
        [SET_DOCS]: (state, payload) => { payload.data != null ? state.doc.data = payload.data : null, state.doc.isLoading = payload.isLoading },
    },
    actions: {
        [GET_DOCS]: asyncHandler(async({ commit }, payload) => {
            commit(SET_DOCS, { isLoading: true })
            const result = await axios.post(DOCS_URL)

            if (result.status == 200) {
                commit(SET_DOCS, { data: result.data, isLoading: false })
                return
            }
            commit(SET_DOCS, { isLoading: false })
        }),
        [CLEAR_DOCS_IS_LOADING]: asyncHandler(async({ commit }) => {
            commit(SET_DOCS, { isLoading: false })
        })
    }
}

export default docs