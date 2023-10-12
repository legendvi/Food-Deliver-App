import Input from "../../UI/Input";
import classes from "./MealItemForm.module.css";
import { useRef } from "react";

const MealItemForm = (props) => {
  const inputRef = useRef();
  const submitHandler = (e) => {
    e.preventDefault();

    props.onAddToCart(+inputRef.current.value);
  };
  return (
    <form onSubmit={submitHandler} className={classes.form}>
      <Input
        label="Amount"
        input={{
          ref: inputRef,
          id: "amount_" + props.id,
          type: "number",
          min: "1",
          max: "5",
          step: "1",
          defaultValue: "1",
        }}
      />
      <button type="submit">+ Add</button>
    </form>
  );
};

export default MealItemForm;
