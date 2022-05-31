import store from '../store/index'
import { UPDATE_ERRORMSG } from '../store/action_types'

const asyncHandler = fn => (req, res, next) =>
    Promise
    .resolve(fn(req, res, next))
    .catch((error) => {
        if (!error) {
            store.dispatch(UPDATE_ERRORMSG, `Error! ${error}`)
        }
        next
    });

export default asyncHandler;