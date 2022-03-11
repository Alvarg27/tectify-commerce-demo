import styles from "../styles/CheckoutInput.module.css";
import React from "react";
import { useState } from "react";
import swell from "swell-js";
import { useEffect } from "react";

export default function CheckoutInput({
  label,
  width,
  type,
  category,
  cart,
  fetchCart,
}) {
  const [input, setInput] = useState(
    cart && cart[category][type] ? cart[category][type] : ""
  );

  const handleData = async () => {
    try {
      const response = await swell.cart.update({
        [category]: {
          [type]: input,
        },
      });
      fetchCart();
      console.log(response);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    fetchCart();
  }, []);

  return (
    <div className={styles.checkoutInput} style={{ width: `${width}%` }}>
      <div className={styles.container}>
        <label>{label}</label>
        {cart && cart[category][type] ? cart[category][type] : ""}
        <input
          value={input}
          onFocus={() => handleData()}
          onBlur={() => handleData()}
          onChange={(e) => setInput(e.target.value)}
        />
      </div>
    </div>
  );
}
