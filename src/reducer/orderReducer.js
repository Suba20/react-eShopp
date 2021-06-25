export const orderReducer=(userState={},action)=>{
    if(action.type=='ADD_USER_DETAILS'){
        console.log('inside reducer order')
        const newState={...action.payload};
            return newState;
    }
    return userState;
}

