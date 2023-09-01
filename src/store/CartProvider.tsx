import React, { useReducer } from "react";
import CartContext from "./cart-context";

const defaultCartState = {
  items: [],
  totalAmount: 0,
};

const cartReducer = (state: any, action: any) => {
  if (action.type === "ADD") {
    //concat- unlike push, it will not edit the existing array but adds new item and returns new array
    const updatedTotalAmount =
      state.totalAmount + action.item.price * action.item.amount;
    //checking for repeated items
    //findIndex will return index of the item if it exist
    const existingCartItemIndex = state.items.findIndex(
      (item: any) => item.id === action.item.id
    );
    const existingCartItem = state.items[existingCartItemIndex];
    let updatedItem;
    let updatedItems;

    if (existingCartItem) {
      updatedItem = {
        ...existingCartItem,
        amount: existingCartItem.amount + action.item.amount,
      };
      updatedItems = [...state.items];
      updatedItems[existingCartItemIndex] = updatedItem;
    } else {
      updatedItems = state.items.concat(action.item);
    }

    return {
      items: updatedItems,
      totalAmount: updatedTotalAmount,
    };
  }

  if (action.type === "REMOVE") {
    const existingCartItemIndex = state.items.findIndex(
      (item: any) => item.id === action.id //here we only use id, becasue for REMOVE type we dispatched
      //only id
    );
    //same logic as above
    const existingItem = state.items[existingCartItemIndex];
    // (-) in minus button should only remove 1 item price or item from the render so, one existingItem is used
    const updatedTotalAmount = state.totalAmount - existingItem.price;
    let updatedItems;
    //first if logic is for removing the item completely and else is just to update the amount
    if (existingItem.amount === 1) {
      //The filter() method creates a new array filled with elements that pass a test provided by a function.
      updatedItems = state.items.filter((item: any) => item.id !== action.id);
    } else {
      const updatedItem = { ...existingItem, amount: existingItem.amount - 1 };
      updatedItems = [...state.items];
      updatedItems[existingCartItemIndex] = updatedItem;
    }
    return {
      items: updatedItems,
      totalAmount: updatedTotalAmount,
    };
  }

  return defaultCartState;
};

const CartProvider = (props: any) => {
  const [cartState, dispatchCartAction] = useReducer(
    cartReducer,
    defaultCartState
  );
  const addItemToCartHandler = (item: any) => {
    dispatchCartAction({ type: "ADD", item: item });
  };
  const removeItemFromCartHandler = (id: any) => {
    dispatchCartAction({ type: "REMOVE", id: id });
  };
  const cartContext = {
    items: cartState.items,
    totalAmount: cartState.totalAmount,
    addItem: addItemToCartHandler,
    removeItem: removeItemFromCartHandler,
  };
  return (
    <CartContext.Provider value={cartContext}>
      {props.children}
    </CartContext.Provider>
  );
};

export default CartProvider;
