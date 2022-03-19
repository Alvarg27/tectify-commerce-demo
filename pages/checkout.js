import { useRouter } from "next/router";
import React from "react";
import { useEffect, useState } from "react";
import CheckoutPage from "../components/CheckoutPage";
import MobileOrderSummary from "../components/MobileOrderSummary";
import swell from "swell-js";

export default function Checkout({
  cart,
  fetchCart,
  setSlideCart,
  setMobileOrderSummary,
  setIsCheckout,
  order,
  setOrder,
  template,
  mobileOrderSummary,
  isBreakpoint,
}) {
  const router = useRouter();

  useEffect(() => {
    if (cart === null || cart === undefined) {
      router.push("/");
    } else {
      fetchCart();
      setIsCheckout(true);
      setSlideCart(false);
    }
  }, []);

  return (
    <div>
      {cart !== null && cart !== undefined ? (
        <CheckoutPage
          cart={cart}
          fetchCart={fetchCart}
          setMobileOrderSummary={setMobileOrderSummary}
          mobileOrderSummary={mobileOrderSummary}
          order={order}
          setOrder={setOrder}
          template={template}
          isBreakpoint={isBreakpoint}
        />
      ) : (
        ""
      )}
    </div>
  );
}
