const useReducer = (state = null , action) =>{
    switch(action.type){
        case "SET_USER":
            return state = action.payload
        default:
            return state
    }
}

export default useReducer