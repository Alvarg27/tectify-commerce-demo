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
          />
          <LoadingButton name="Aplicar" template={template} margin="0" />
        </div>
      </div>
    </div>
  );
}
