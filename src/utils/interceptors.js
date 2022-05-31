import axios from 'axios'
import store from '../store'
import {
    CLEAR_ERRORMSG,
    CLEAR_ACCOUNT_ISLOADING,
    UPDATE_ERRORMSG
} from '../store/action_types'

const axiosInterceptors = () => {
    axios.interceptors.response.use((response) => {
        return response;
    }, function(error) {
        console.log('error => ', error.response)
            // clear error messages
        store.dispatch(CLEAR_ERRORMSG)
            // clear isLoading states
        store.dispatch(CLEAR_ACCOUNT_ISLOADING)
            // Do something with response error
        if (error.code === 'ECONNABORTED') {
            store.dispatch(UPDATE_ERRORMSG, { errorMsg: 'Error! Please check your connection.' })
        }

        if (error.response.status === 401) {
            store.dispatch(UPDATE_ERRORMSG, { errorMsg: 'ERROR' })
        }

        if (error.response.status === 403) {
            store.dispatch(UPDATE_ERRORMSG, { errorMsg: 'ERROR' })
        }

        if (error.response.status === 404) {
            store.dispatch(UPDATE_ERRORMSG, { errorMsg: 'ERROR' })
                // router.push({ name: '404' })
        }

        if (error.response.status === 409) {
            store.dispatch(UPDATE_ERRORMSG, { errorMsg: 'ERROR' })
        }

        if (error.response.status === 500) {
            store.dispatch(UPDATE_ERRORMSG, { errorMsg: 'ERROR' })
        }
    });
}

export default axiosInterceptors