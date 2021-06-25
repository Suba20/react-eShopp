export const cartReducer = (cartState = [], action) => {
  switch (action.type) {
    case "NEW_ITEM":{
      const newState = [
        ...cartState,
        { ...action.payload, id: action.payload._id, qty: 1 },
      ];
      return newState;
    }
    case "ADD_ITEM":{
      const newState = cartState.map((cartItem) => {
        if (cartItem._id == action.payload._id)
          return { ...cartItem, qty: cartItem.qty + 1 };
        else return { ...cartItem };
      });
      return newState;
    }
    case "SUB_ITEM":{
      const newState = cartState.map((cartItem) => {
        if (cartItem._id == action.payload._id)
          return { ...cartItem, qty: cartItem.qty - 1 };
        else return { ...cartItem };
      });
      return newState;
    }
    case "REMOVE_ITEM":{
      const newState = cartState.filter((cartItem) => 
        cartItem._id != action.payload._id)
      return newState;
    }
    default:
      return cartState;
  }
};
