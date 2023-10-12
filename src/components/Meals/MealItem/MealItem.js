import classes from "./MealItem.module.css";
import { useContext } from "react";
import CartContext from "../../../Store/cart-context";
import MealItemForm from "./MealItemForm";
const MealItem = (props) => {
  const CartCtx = useContext(CartContext);
  const price = `$${+props.price}`;
  const addToCartHandler = (amount) => {
    CartCtx.addItem({
      id: props.id,
      name: props.name,
      amount: amount,
      price: +props.price,
    });
  };
  return (
    <li className={classes.meal}>
      <div>
        <h3>{props.name}</h3>
        <div className={classes.description}>{props.description}</div>
        <div className={classes.price}>{price}</div>
      </div>
      <div>
        <MealItemForm onAddToCart={addToCartHandler} id={props.id} />
      </div>
    </li>
  );
};

export default MealItem;
