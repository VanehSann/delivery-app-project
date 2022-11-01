import { SET_PRODUCT_ACTION } from '../utils';

const INITIAL_STATE = {
  addProduct: { contador: 0 },
  cart: [],
};

const sizeButtons = (state = INITIAL_STATE, action) => {
  switch (action.type) {
  case SET_PRODUCT_ACTION:
    return {
      ...state,
      addProduct: action.payload.addProduct,
      // cart: action
    };
  default:
    return state;
  }
};

export default sizeButtons;
