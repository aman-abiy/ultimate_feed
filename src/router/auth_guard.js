import store from '../store';
import router from '../router'
import {
    GET_ACCOUNT,
    CLEAR_ERRORMSG,
    CLEAR_ACCOUNT_ISLOADING,
} from '../store/action_types'

export const ifNotAuthDeny = (to, from, next) => {
    // clear error messages
    store.dispatch(CLEAR_ERRORMSG)
        // clear isLoading states
    store.dispatch(CLEAR_ACCOUNT_ISLOADING)

    if (store.getters.sessionToken == null || store.getters.account.data == null) {
        router.push({ name: 'Sign-In' })
        return
    }

    next();
}


export const ifAuthDeny = (to, from, next) => {
    // clear error messages
    store.dispatch(GET_ACCOUNT)
    store.dispatch(CLEAR_ERRORMSG)
        // clear isLoading states
    store.dispatch(CLEAR_ACCOUNT_ISLOADING)

    if (store.getters.sessionToken != null && store.getters.account.data != null) {
        router.push(from.fullPath)
        return
    }
    next();
}