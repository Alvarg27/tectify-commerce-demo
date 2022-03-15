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
  template,
  setTemplate,
}) {
  const [overlay, setOverlay] = useState(false);

  const handleOverlayClick = () => {
    setSlideCart(false);
  };

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
        <meta name="description" content="Tectify demo ecommerce site" />
        <link rel="icon" href="/favicon.ico" />
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1, maximum-scale=1"
        ></meta>
      </Head>
      <div
        onClick={() => handleOverlayClick()}
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
        template={template}
      />
      <SlideCart
        setSlideCart={setSlideCart}
        slideCart={slideCart}
        cart={cart}
        fetchCart={fetchCart}
        template={template}
      />
      <Header
        setSlideCart={setSlideCart}
        slideCart={slideCart}
        fetchCart={fetchCart}
        cart={cart}
        isCheckout={isCheckout}
        template={template}
        setTemplate={setTemplate}
      />
      {children}
    </div>
  );
}
