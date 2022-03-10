import React from "react";
import { useEffect, useState } from "react";
import Header from "./Header";
import SlideCart from "./SlideCart";
import Head from "next/head";
import MobileOrderSummary from "./MobileOrderSummary";

export default function Layout({
  children,
  slideCart,
  setSlideCart,
  cart,
  fetchCart,
  mobileOrderSummary,
  setMobileOrderSummary,
  isCheckout,
}) {
  const [overlay, setOverlay] = useState(false);
  useEffect(() => {
    if (slideCart || mobileOrderSummary) {
      setOverlay(true);
      document.body.style.overflow = "hidden";
    } else {
      setOverlay(false);
      document.body.style.overflow = "auto";
    }
  }, [slideCart, mobileOrderSummary]);
  return (
    <div>
      <Head>
        <title>Commerce</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div
        style={{
          width: "100%",
          height: "100%",
          background: "rgb(0,0,0,0.5)",
          opacity: slideCart ? 1 : 0,
          position: "fixed",
          transition: "0.5s",
          backdropFilter: "blur(5px)",
          visibility: overlay ? "visible" : "hidden",
          zIndex: "100",
        }}
      ></div>
      <MobileOrderSummary
        cart={cart}
        fetchCart={fetchCart}
        setMobileOrderSummary={setMobileOrderSummary}
        mobileOrderSummary={mobileOrderSummary}
      />
      <SlideCart
        setSlideCart={setSlideCart}
        slideCart={slideCart}
        cart={cart}
        fetchCart={fetchCart}
      />
      <Header
        setSlideCart={setSlideCart}
        slideCart={slideCart}
        fetchCart={fetchCart}
        cart={cart}
        isCheckout={isCheckout}
      />
      {children}
    </div>
  );
}
