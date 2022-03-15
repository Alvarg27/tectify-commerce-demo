import styles from "../styles/CouponCode.module.css";

import React, { useState, useEffect } from "react";
import CheckoutInput from "./CheckoutInput";
import LoadingButton from "./LoadingButton";

export default function CouponCode({ template }) {
  const [hovered, setHovered] = useState(false);
  const [focused, setFocused] = useState(false);
  return (
    <div className={styles.couponCode}>
      <div className={styles.container}>
        <label>Código de descuento</label>
        <div className={styles.row}>
          <input
            style={{
              borderColor:
                hovered || focused ? template.primaryColor : "lightgray",
            }}
            onFocus={() => setFocused(true)}
            onBlur={() => setFocused(false)}
            onMouseOver={() => setHovered(true)}
            onMouseOut={() => setHovered(false)}
          />
          <LoadingButton name="Aplicar" template={template} margin="0" />
        </div>
      </div>
    </div>
  );
}
