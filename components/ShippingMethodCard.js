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
            selectedMethod === id || hovered ? "#0077ff" : "lightgray",
        }}
      >
        <div className={styles.row}>
          <p>{name}</p>
          <FaCheckCircle
            className={styles.checkIcon}
            style={{
              opacity: selectedMethod === id ? "1" : "0",
            }}
          />
        </div>
        <p className={styles.description}>{description}</p>
        <p className={styles.price}>${price}</p>
      </div>
    </div>
  );
}
