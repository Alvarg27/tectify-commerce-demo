import styles from "../styles/CheckoutInput.module.css";
import React from "react";
import { useState } from "react";
import swell from "swell-js";
import { useEffect } from "react";
import { setRevalidateHeaders } from "next/dist/server/send-payload";

export default function CheckoutInput({
  label,
  width,
  type,
  category,
  cart,
  fetchCart,
  setValid,
  valid,
  submitFail,
  orderData,
  setOrderData,
  errorMessage,
}) {
  const [isEdited, setIsEdited] = useState(false);
  const [focused, setFocused] = useState();
  const [invalid, setInvalid] = useState();
  const [input, setInput] = useState();
  const cartValue = cart ? cart[category][type] : "";

  const handleInput = (e) => {
    setInput(e.target.value);
  };

  const handleFocus = () => {
    setFocused(focused);
    setIsEdited(true);
  };
  const handleBlur = () => {
    setFocused(false);
    setIsEdited(true);
  };
  useEffect(() => {
    orderData[type] = input;
    setOrderData({ ...orderData });
  }, [input]);

  return (
    <div className={styles.checkoutInput} style={{ width: `${width}%` }}>
      <div className={styles.container}>
        <label>{label}</label>
        <input
          value={isEdited ? input : cartValue}
          onClick={(e) => handleInput(e)}
          onChange={(e) => handleInput(e)}
          onFocus={() => handleFocus(true)}
          onBlur={() => handleBlur(false)}
        />
        <div className={styles.confirmationDot}></div>
        <p className="errorMessage">{errorMessage}</p>
      </div>
    </div>
  );
}
