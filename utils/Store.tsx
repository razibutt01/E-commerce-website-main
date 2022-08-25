import Cookies from "js-cookie";
import React from "react";
import { ProductType } from "../Components/componentTypes";
type InitialStateType = {
  cart: {
    cartItems: Array<ProductType>;
  };
  darkMode: boolean;
};
const initialState: InitialStateType = {
  darkMode: false,
  cart: {
    cartItems: [],
  },
};
export const Store = React.createContext<{
  state: InitialStateType;
  dispatch: React.Dispatch<any>;
}>({
  state: initialState,
  dispatch: () => null,
});
function reducer(state: InitialStateType, action: any) {
  switch (action.type) {
    case "DARK_MODE_ON":
      return { ...state, darkMode: true };
    case "DARK_MODE_OFF":
      return { ...state, darkMode: false };
    case "CART_ADD_ITEM": {
      console.log("dispatch");
      const newItem = action.payload;
      const existItem = state.cart.cartItems.find(
        (item: { title: string }) => item.title === newItem.title
      );

      const cartItems = existItem
        ? state.cart.cartItems.map((item: { title: string }) =>
            item.title === newItem.title ? newItem : item
          )
        : [...state.cart.cartItems, newItem];

      return { ...state, cart: { ...state.cart, cartItems: [...cartItems] } };
    }
    case "CART_REMOVE_ITEM": {
      console.log("removed");
      const cartItems = state.cart.cartItems.filter(
        (item) => item.id != action.payload.id
      );

      return {
        ...state,
        cart: { ...state.cart, cartItems: cartItems },
      };
    }
    default:
      return state;
  }
}

export function StoreProvider(props: {
  children:
    | string
    | number
    | boolean
    | React.ReactElement<any, string | React.JSXElementConstructor<any>>
    | React.ReactFragment
    | React.ReactPortal
    | null
    | undefined;
}) {
  const [state, dispatch] = React.useReducer(reducer, initialState);
  const value = { state, dispatch };
  return <Store.Provider value={value}>{props.children}</Store.Provider>;
}
