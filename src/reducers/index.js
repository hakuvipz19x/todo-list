import { combineReducers } from 'redux'

import todoReducer  from './todo'
import checkListReducer from './checkList'

const rootReducer = combineReducers({
    todo: todoReducer,
    check: checkListReducer
})

export default rootReducer