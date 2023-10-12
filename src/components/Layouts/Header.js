import HeaderCartButton from "./HeaderCartButton.js";
import classes from "./Header.module.css";
import mealTable from "./../../assests/meals.jpg";

const Header = (props) => {
  return (
    <>
      <header className={classes.header}>
        <h1>Magnetic Meals</h1>
        <HeaderCartButton onShow={props.onShow} />
      </header>
      <div className={classes["main-image"]}>
        <img src={mealTable} alt="Table of Food" />
      </div>
    </>
  );
};

export default Header;
