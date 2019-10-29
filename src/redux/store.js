import {createStore} from "redux"

const theOldState = {
    email: "",
    password: "",
}
const currentUser = (state = theOldState, action)=>{
    return state
}
const store = createStore(currentUser)
export default store