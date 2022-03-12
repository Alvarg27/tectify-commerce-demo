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
  valid,
  setValid,
}) {
  const [isEdited, setIsEdited] = useState(false);
  const [isFocus, setIsFocus] = useState(false);
  const [input, setInput] = useState();
  const [error, setError] = useState();
  const cartValue =
    cart && cart[category] && cart[category][type]
      ? cart[category][type]
      : input;

  const translatedError = () => {
    if (error === "Required") {
      return `El ${label.toLowerCase()} es requerido`;
    } else if (error === "Invalid e-mail address") {
      return `El ${label.toLowerCase()} es invalido`;
    }
  };

  const handleFocus = () => {
    setIsEdited(true);
    setIsFocus(true);
    handleData();
  };
  const handleBlur = () => {
    setIsEdited(true);
    setIsFocus(false);
    handleData();
  };

  const handleData = async () => {
    try {
      const response = await swell.cart.update({
        [category]: {
          [type]: input,
        },
      });
      fetchCart();
      setError(null);
    } catch (err) {
      console.log(err.message);
      fetchCart();
      setError(err.message);
    }
  };

  return (
    <div className={styles.checkoutInput} style={{ width: `${width}%` }}>
      <div className={styles.container}>
        <label>{label}</label>
        <input
          value={isEdited ? input : cartValue}
          onFocus={() => handleFocus()}
          onBlur={() => handleBlur()}
          onChange={(e) => setInput(e.target.value)}
        />
        <div className={styles.confirmationDot}></div>

        <p className="errorMessage">{translatedError()}</p>
      </div>
    </div>
  );
}
