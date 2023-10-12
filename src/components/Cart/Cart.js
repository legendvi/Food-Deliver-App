import { useContext, useState } from "react";
import Modal from "../UI/Modal";
import classes from "./Cart.module.css";
import CartContext from "../../Store/cart-context";
import CartItem from "./CartItem";
import Checkout from "./Checkout";

const Cart = (props) => {
  const [isCheckout, setIsCheckout] = useState(false);
  const [isSubmiting, setIsSubmiting] = useState(false);
  const [didSubmit, setDidSubmit] = useState(false);
  const addItemHandler = (item) => {
    CartCtx.addItem({ ...item, amount: 1 });
  };
  const removeItemHandler = (id) => {
    CartCtx.removeItem(id);
  };
  const orderhandler = (event) => {
    setIsCheckout(true);
  };
  const CartCtx = useContext(CartContext);
  const hasItems = CartCtx.items.length > 0;
  const cartItems = (
    <ul className={classes["cart-items"]}>
      {CartCtx.items.map((item) => (
        <CartItem
          key={item.id}
          name={item.name}
          amount={item.amount}
          price={item.price}
          onAdd={addItemHandler.bind(null, item)}
          onRemove={removeItemHandler.bind(null, item.id)}
        ></CartItem>
      ))}
    </ul>
  );
  const orderButton = (
    <div className={classes.actions}>
      <button className={classes["button--alt"]} onClick={props.onClose}>
        Close
      </button>
      {hasItems && (
        <button className={classes.button} onClick={orderhandler}>
          Order
        </button>
      )}
    </div>
  );
  const sumitOrderHandler = async (userData) => {
    setIsSubmiting(true);
    await fetch(
      "https://react-movie-6402b-default-rtdb.firebaseio.com/orders.json",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          userInfo: userData,
          orderItem: CartCtx.items,
        }),
      }
    );
    setIsSubmiting(false);
    setDidSubmit(true);
    CartCtx.reset();
  };
  const cartData = (
    <>
      {cartItems}
      <div className={classes.total}>
        <span>Total Amount</span>
        <span>${CartCtx.totalAmount.toFixed(2)}</span>
      </div>
      {isCheckout && (
        <Checkout onConfirm={sumitOrderHandler} onCancel={props.onClose} />
      )}
      {!isCheckout && orderButton}
    </>
  );
  const isSubmitingData = (
    <>
      <p>We are Submiting your order</p>
    </>
  );
  const submitedData = (
    <>
      <p>Your order has been placed Successfully</p>
      <div className={classes.actions}>
        <button className={classes.button} onClick={props.onClose}>
          Close
        </button>
      </div>
    </>
  );
  return (
    <Modal onClose={props.onClose}>
      {!isSubmiting && !didSubmit && cartData}
      {isSubmiting && isSubmitingData}
      {!isSubmiting && didSubmit && submitedData}
    </Modal>
  );
};

export default Cart;
