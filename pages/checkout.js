import React from "react";
import { useEffect, useState } from "react";
import CheckoutPage from "../components/CheckoutPage";
import MobileOrderSummary from "../components/MobileOrderSummary";

export default function Checkout({
  cart,
  fetchCart,
  setSlideCart,
  setMobileOrderSummary,
  setIsCheckout,
}) {
  useEffect(() => {
    setIsCheckout(true);
    setSlideCart(false);
  }, []);
  return (
    <div>
      <CheckoutPage
        cart={cart}
        fetchCart={fetchCart}
        setMobileOrderSummary={setMobileOrderSummary}
      />
    </div>
  );
}
