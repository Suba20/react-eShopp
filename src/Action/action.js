import * as actionTypes from "../actionType";

export const newAction = (prod) => {
  return {
    type: actionTypes.NEW_ITEM,
    payload: {
      ...prod,
    },
  };
};
export const addAction = (prod) => {
  return {
    type: actionTypes.ADD_ITEM,
    payload: {
      ...prod,
    },
  };
};
export const subAction = (prod) => {
  return {
    type: actionTypes.SUB_ITEM,
    payload: {
      ...prod,
    },
  };
};

export const removeAction = (prod) => {
  return {
    type: actionTypes.REMOVE_ITEM,
    payload: {
      ...prod,
    },
  };
};


export const userAction=(user)=>{
  return {
      type:actionTypes.ADD_USER_DETAILS,
      payload:{
          ...user
      }
  }
}