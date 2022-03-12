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
  checkValid,
  orderData,
  setOrderData,
  errorMessage,
  valid,
  setErrorMessage,
  submitFail,
}) {
  const [isEdited, setIsEdited] = useState(false);
  const [focused, setFocused] = useState();
  const [input, setInput] = useState();
  const cartValue =
    cart && cart[category] && cart[category][type]
      ? cart[category][type]
      : input;

  const translateErrorMessage = () => {
    if (errorMessage === "Invalid e-mail address") {
      return "Tu correo electónico no es válido";
    } else if (errorMessage === "Required") {
      return `Debes de ingresar tu ${label.toLowerCase()}`;
    }
  };

  const handleInput = (e) => {
    e.preventDefault();
    setInput(e.target.value);
  };

  const handleFocus = () => {
    setFocused(true);
    setIsEdited(true);
  };
  const handleBlur = () => {
    setFocused(false);
    setIsEdited(true);
  };

  useEffect(() => {
    orderData[type] = input;
    setOrderData({ ...orderData });
    checkValid(type);
    setErrorMessage(null);
  }, [input]);

  useEffect(() => {
    orderData[type] = cartValue;
    setOrderData({ ...orderData });
    checkValid(type);
  }, [fetchCart]);

  return (
    <div className={styles.checkoutInput} style={{ width: `${width}%` }}>
      <div className={styles.container}>
        <label>{label}</label>
        <input
          type={type}
          value={isEdited ? input : cartValue}
          onClick={(e) => handleInput(e)}
          onChange={(e) => handleInput(e)}
          onFocus={() => handleFocus(true)}
          onBlur={() => handleBlur(false)}
        />
        <div
          className={styles.confirmationDot}
          style={{ opacity: valid[type] ? 1 : 0 }}
        ></div>
        {(!focused && !valid[type] && isEdited) ||
        errorMessage ||
        (submitFail && !focused && !valid[type]) ? (
          <p className="errorMessage">
            {errorMessage
              ? translateErrorMessage()
              : `Debes de ingresar tu ${label.toLowerCase()}`}
          </p>
        ) : (
          ""
        )}
      </div>
    </div>
  );
}
