import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import CheckoutPage from "../components/CheckoutPage";
import MobileOrderSummary from "../components/MobileOrderSummary";

export default function checkout({
  cart,
  fetchCart,
  setSlideCart,
  setMobileOrderSummary,
}) {
  useEffect(() => {
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
