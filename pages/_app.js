import "../styles/globals.css";
import swell from "swell-js";
import React from "react";
import { useState } from "react";
import { useEffect } from "react";
import Layout from "../components/Layout";
swell.init(
  process.env.NEXT_PUBLIC_SWELL_STORE_ID,
  process.env.NEXT_PUBLIC_SWELL_PUBLIC_KEY
);

function MyApp({ Component, pageProps }) {
  const [template, setTemplate] = useState({
    primaryColor: "#0077ff",
    primaryColorHover: "#0067dd",
    backgroundColor: "#15171c",
    secondaryBackgroundColor: "#1e2129",
    textColor: "white",
    secondaryTextColor: "grey",
    borderColor: "#292d38",
  });

  const [mobileOrderSummary, setMobileOrderSummary] = useState(false);
  const [products, setProducts] = useState();
  const [slideCart, setSlideCart] = useState();
  const [cart, setCart] = useState();
  const [isCheckout, setIsCheckout] = useState(false);
  const [order, setOrder] = useState();

  const fetchCart = async () => {
    const response = await swell.cart.get();
    console.log(response);
    setCart(response);
  };

  const fetchProducts = async () => {
    const response = await swell.products.list({
      expand: ["variants"],
    });
    setProducts(response);
  };

  useEffect(() => {
    fetchCart();
    fetchProducts();
    setMobileOrderSummary(false);
  }, []);

  console.log(order);

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
      />
    </Layout>
  );
}

export default MyApp;
