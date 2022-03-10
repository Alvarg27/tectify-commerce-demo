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
  const [mobileOrderSummary, setMobileOrderSummary] = useState(true);
  const [products, setProducts] = useState();
  const [slideCart, setSlideCart] = useState();
  const [cart, setCart] = useState();

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
    fetchProducts();
    fetchCart();
  }, []);

  return (
    <Layout
      setSlideCart={setSlideCart}
      slideCart={slideCart}
      fetchCart={fetchCart}
      cart={cart}
      setMobileOrderSummary={setMobileOrderSummary}
      mobileOrderSummary={mobileOrderSummary}
    >
      <Component
        {...pageProps}
        products={products}
        fetchCart={fetchCart}
        setSlideCart={setSlideCart}
        cart={cart}
        setMobileOrderSummary={setMobileOrderSummary}
        mobileOrderSummary={mobileOrderSummary}
      />
    </Layout>
  );
}

export default MyApp;
