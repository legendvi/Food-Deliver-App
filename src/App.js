import { useState } from "react";
import Header from "./components/Layouts/Header";
import Meals from "./components/Meals/Meals";
import Cart from "./components/Cart/Cart";
import CartProvider from "./Store/CartProvider";
function App() {
  const [cartState, setcartState] = useState(false);

  const showCartHandler = () => {
    setcartState(true);
  };
  const hideCartHandler = () => {
    setcartState(false);
  };
  return (
    <CartProvider>
      {cartState && <Cart onClose={hideCartHandler} />}
      <Header onShow={showCartHandler} />
      <main>
        <Meals />
      </main>
    </CartProvider>
  );
}

export default App;
