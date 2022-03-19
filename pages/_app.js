import "../styles/globals.css";
import swell from "swell-js";
import React from "react";
import { useState } from "react";
import { useEffect } from "react";
import Layout from "../components/Layout";
import { useCallback } from "react";
swell.init(
  process.env.NEXT_PUBLIC_SWELL_STORE_ID,
  process.env.NEXT_PUBLIC_SWELL_PUBLIC_KEY
);

const lightModeTemplate = {
  primaryColor: "#0077ff",
  primaryColorHover: "#0067dd",
  backgroundColor: "white",
  secondaryBackgroundColor: "rgb(247,247,247)",
  textColor: "black",
  secondaryTextColor: "grey",
  borderColor: "lightgrey",
  inputColor: "white",
};
const darkModeTemplate = {
  primaryColor: "#0077ff",
  primaryColorHover: "#0067dd",
  backgroundColor: "#15171c",
  secondaryBackgroundColor: "#181c24",
  textColor: "white",
  secondaryTextColor: "grey",
  borderColor: "#292d38",
  inputColor: "#1c2029",
};

function MyApp({ Component, pageProps }) {
  const [template, setTemplate] = useState(lightModeTemplate);
  const [mobileOrderSummary, setMobileOrderSummary] = useState(false);
  const [products, setProducts] = useState();
  const [slideCart, setSlideCart] = useState();
  const [cart, setCart] = useState();
  const [isCheckout, setIsCheckout] = useState(false);
  const [order, setOrder] = useState();

  // USE MEDIA QUERY

  const useMediaQuery = (width) => {
    const [targetReached, setTargetReached] = useState(false);

    const updateTarget = useCallback((e) => {
      if (e.matches) {
        setTargetReached(true);
      } else {
        setTargetReached(false);
      }
    }, []);

    useEffect(() => {
      const media = window.matchMedia(`(max-width: ${width}px)`);
      media.addEventListener("change", (e) => updateTarget(e));

      // Check on mount (callback is not called until a change occurs)
      if (media.matches) {
        setTargetReached(true);
      }

      return () => media.removeEventListener("change", (e) => updateTarget(e));
    }, []);

    return targetReached;
  };

  // IS BREAKPOINT

  const isBreakpoint = useMediaQuery(768);

  // FETCH CART

  const fetchCart = async () => {
    try {
      const response = await swell.cart.get();
      console.log(response);
      setCart(response);
    } catch (err) {
      console.error(err.message);
    }
  };

  // FETCH PRODUCTS

  const fetchProducts = async () => {
    try {
      const response = await swell.products.list({
        expand: ["variants"],
      });
      setProducts(response);
    } catch (err) {
      console.error(err.message);
    }
  };

  // EFFECTS

  useEffect(() => {
    fetchCart();
    fetchProducts();
    setMobileOrderSummary(false);
  }, []);

  return (
    <Layout
      setSlideCart={setSlideCart}
      slideCart={slideCart}
      fetchCart={fetchCart}
      cart={cart}
      setMobileOrderSummary={setMobileOrderSummary}
      mobileOrderSummary={mobileOrderSummary}
      isCheckout={isCheckout}
      template={template}
      setTemplate={setTemplate}
      lightModeTemplate={lightModeTemplate}
      darkModeTemplate={darkModeTemplate}
      isBreakpoint={isBreakpoint}
    >
      <Component
        {...pageProps}
        products={products}
        fetchCart={fetchCart}
        setSlideCart={setSlideCart}
        cart={cart}
        setMobileOrderSummary={setMobileOrderSummary}
        mobileOrderSummary={mobileOrderSummary}
        setIsCheckout={setIsCheckout}
        order={order}
        setOrder={setOrder}
        template={template}
        isBreakpoint={isBreakpoint}
      />
    </Layout>
  );
}

export default MyApp;
