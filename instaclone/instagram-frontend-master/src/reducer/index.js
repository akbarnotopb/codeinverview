import userReducer from "./userReducer.js"
import { combineReducers } from "redux"

const combineReducer = combineReducers({
    userReducer : userReducer,
})

export default combineReducer