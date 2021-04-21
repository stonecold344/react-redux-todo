import {combineReducers} from "redux"
import listReducer from './listReducer'

const allReducers = combineReducers({
    list:listReducer,
})

export default allReducers