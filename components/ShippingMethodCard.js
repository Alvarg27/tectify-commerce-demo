import styles from "../styles/ShippingMethodCard.module.css";

import React from "react";
import { FaCheckCircle } from "react-icons/fa";
import { useState, useEffect } from "react";
import { cart } from "swell-js";

export default function ShippingMethodCard({
  name,
  price,
  description,
  id,
  handleSelect,
  selectedMethod,
  fetchCart,
  template,
}) {
  const [hovered, setHovered] = useState();

  return (
    <div className={styles.shippingMethodCard}>
      <div
        className={styles.container}
        onClick={() => handleSelect(id)}
        onMouseOver={() => setHovered(true)}
        onMouseOut={() => setHovered(false)}
        style={{
          borderColor:
            selectedMethod === id || hovered
              ? template.primaryColor
              : template.borderColor,

          background: template.secondaryBackgroundColor,
        }}
      >
        <div className={styles.row}>
          <p style={{ color: template.textColor }}>{name}</p>
          <FaCheckCircle
            className={styles.checkIcon}
            style={{
              opacity: selectedMethod === id ? "1" : "0",
              color: template.primaryColor,
            }}
          />
        </div>
        <p className={styles.description}>{description}</p>
        <p className={styles.price} style={{ color: template.textColor }}>
          ${price}
        </p>
      </div>
    </div>
  );
}
