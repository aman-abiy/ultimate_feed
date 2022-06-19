import axios from 'axios'
import store from '../store'
import {
    CLEAR_ERRORMSG,
    CLEAR_ACCOUNT_ISLOADING,
    UPDATE_ERRORMSG
} from '../store/action_types'
import { AUTH_LOGIN_ERROR_MSG } from './consts'
// import { errorMsgs } from './error_msgs'

const axiosInterceptors = () => {
    axios.interceptors.response.use((response) => {
        return response;
    }, function(error) {

        const errorMsgs = {
            400: 'Bad request.',
            401: 'User UnAuthorized.',
            403: 'This action is forbidden.',
            404: 'Resource not found.',
            409: 'User is already registered. Please sign-in.',
            422: 'Unable to process requested data.'
        }

        console.log('error => ', error.response)

        // clear error messages
        store.dispatch(CLEAR_ERRORMSG)
            // clear isLoading states
        store.dispatch(CLEAR_ACCOUNT_ISLOADING)

        // Do something with response error
        if (error.code === 'ECONNABORTED') {
            store.dispatch(UPDATE_ERRORMSG, { errorMsg: 'Error! Please check your connection.' })
            return
        }

        if (error.response.status === 401) {
            store.dispatch(UPDATE_ERRORMSG, { errorMsg: errorMsgs[error.response.status] })
            return
        }

        if (error.response.status === 403) {
            store.dispatch(UPDATE_ERRORMSG, { errorMsg: errorMsgs[error.response.status] })
            return
        }

        if (error.response.status === 404) {
            store.dispatch(UPDATE_ERRORMSG, { errorMsg: 'ERROR 404' })
            return
            // router.push({ name: '404' })
        }

        if (error.response.status === 409) {
            store.dispatch(UPDATE_ERRORMSG, { errorMsg: errorMsgs[error.response.status] })
            return
        }

        if (error.response.status === 422) {
            store.dispatch(UPDATE_ERRORMSG, { errorMsg: errorMsgs[error.response.status] })
            return
        }

        if (error.response.status === 500) {
            store.dispatch(UPDATE_ERRORMSG, { errorMsg: 'ERROR 505' })
            return
        }
        store.dispatch(UPDATE_ERRORMSG, { errorMsg: 'ERROR' })

    });
}

export default axiosInterceptors