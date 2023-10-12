import react from "react";

const CartContext = react.createContext({
  items: [],
  totalAmount: 0,
  addItem: () => {},
  removeItem: () => {},
  reset:()=>{}
});

export default CartContext;
