import CartIcon from "../Cart/CartIcon";
import classes from "./HeaderCartButton.module.css";
import { useContext, useState, useEffect } from "react";
import CartContext from "../../Store/cart-context.js";

const HeaderCartButton = (props) => {
  const { items } = useContext(CartContext);
  const [bumpstate, setBumpState] = useState(false);
  const btnClassess = `${classes.button} ${bumpstate && classes.bump}`;
  const numberOfItems = items.reduce((curNumber, item) => {
    return curNumber + item.amount;
  }, 0);

  useEffect(() => {
    if (items.length === 0) return;
    setBumpState(true);
    const timer = setTimeout(() => {
      setBumpState(false);
    }, 300);

    return () => {
      clearTimeout(timer);
    };
  }, [items]);
  return (
    <button className={btnClassess} onClick={props.onShow}>
      <span className={classes.icon}>
        <CartIcon />
      </span>
      <span>Your Cart</span>
      <span className={classes.badge}>{numberOfItems}</span>
    </button>
  );
};

export default HeaderCartButton;
