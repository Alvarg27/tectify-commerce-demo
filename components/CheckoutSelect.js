import React from "react";
import { useState } from "react";
import swell from "swell-js";
import { useEffect } from "react";
import { setRevalidateHeaders } from "next/dist/server/send-payload";
import styles from "../styles/CheckoutSelect.module.css";

export default function CheckoutSelect({
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
  options,
  defaultOption,
}) {
  const [isEdited, setIsEdited] = useState(false);
  const [focused, setFocused] = useState();
  const [input, setInput] = useState();
  const cartValue =
    cart && cart[category] && cart[category][type]
      ? cart[category][type]
      : input;

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
    <div className={styles.checkoutSelect} style={{ width: `${width}%` }}>
      <div className={styles.container}>
        <label>{label}</label>
        <select
          value={isEdited ? input : cartValue}
          onClick={(e) => handleInput(e)}
          onChange={(e) => handleInput(e)}
          onFocus={() => handleFocus(true)}
          onBlur={() => handleBlur(false)}
        >
          <option value="" disabled selected>
            {defaultOption}
          </option>
          {options.map((item) => (
            <option key={item.id} value={item.id}>
              {item.name}
            </option>
          ))}
        </select>
        <div
          className={styles.confirmationDot}
          style={{ opacity: valid[type] ? 1 : 0 }}
        ></div>
        {(!focused && !valid[type] && isEdited) ||
        errorMessage ||
        (submitFail && !focused && !valid[type]) ? (
          <p className="errorMessage">
            {errorMessage
              ? error
              : `Debes de ingresar tu ${label.toLowerCase()}`}
          </p>
        ) : (
          ""
        )}
      </div>
    </div>
  );
}
