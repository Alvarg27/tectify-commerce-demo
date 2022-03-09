import React from "react";
import { useEffect } from "react";
import CheckoutPage from "../components/CheckoutPage";

export default function checkout({ cart, fetchCart, setSlideCart }) {
  useEffect(() => {
    setSlideCart(false);
  }, []);
  return (
    <div>
      <CheckoutPage cart={cart} fetchCart={fetchCart} />
    </div>
  );
}
