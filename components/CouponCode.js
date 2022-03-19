import styles from "../styles/CouponCode.module.css";
import swell from "swell-js";
import React, { useState, useEffect } from "react";
import CheckoutInput from "./CheckoutInput";
import LoadingButton from "./LoadingButton";

export default function CouponCode({ template, fetchCart }) {
  const [loading, setLoading] = useState();
  const [input, setInput] = useState();
  const [hovered, setHovered] = useState(false);
  const [focused, setFocused] = useState(false);
  const [error, setError] = useState(null);

  const translateErrorMessage = () => {
    if (error === "Your coupon code was not found or no longer valid") {
      return "Tu código de cupón no se encontró o ya no es válido";
    } else if (error === "") {
      return "Ingresa un código de descuento antes";
    } else {
      return error;
    }
  };

  const handleApplyCoupon = async () => {
    setLoading(true);
    if (input && input.length > 0) {
      try {
        const response = await swell.cart.applyCoupon(input);
        console.log(response);
        fetchCart();
        setError(null);
      } catch (err) {
        console.error(err.message);
        setError(err.message);
      }
    } else {
      setError("Ingresa un código de descuento antes");
    }
    setLoading(false);
  };

  useEffect(() => {
    setError(null);
  }, []);
  return (
    <div className={styles.couponCode}>
      <div className={styles.container}>
        <label style={{ color: template.textColor }}>Código de descuento</label>
        <div className={styles.row}>
          <input
            style={{
              color: template.textColor,
              borderColor:
                hovered || focused
                  ? template.primaryColor
                  : template.borderColor,
              background: template.inputColor,
            }}
            onFocus={() => setFocused(true)}
            onBlur={() => setFocused(false)}
            onMouseOver={() => setHovered(true)}
            onMouseOut={() => setHovered(false)}
            onChange={(e) => setInput(e.target.value)}
          />
          <LoadingButton
            name="Aplicar"
            template={template}
            margin="0"
            width="55%"
            action={handleApplyCoupon}
            loading={loading}
            loadingText="Buscando"
          />
        </div>
        <p className="errorMessage">{translateErrorMessage()}</p>
      </div>
    </div>
  );
}
