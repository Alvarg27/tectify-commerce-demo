import styles from "../styles/ShippingMethodCard.module.css";

import React from "react";
import { FaCheckCircle } from "react-icons/fa";
import { useState, useEffect } from "react";
import { cart } from "swell-js";
import { BeatLoader } from "react-spinners";

export default function ShippingMethodCard({
  name,
  price,
  description,
  id,
  handleSelect,
  selectedMethod,
  fetchCart,
  template,
  cart,
  loadingSelect,
}) {
  const [hovered, setHovered] = useState();

  const discounts = cart.discounts.map((discount) => {
    if (
      discount.rule.type === "shipment" &&
      (!discount.rule.shipment_service ||
        discount.rule.shipment_service === id) &&
      discount.rule.value_type === "percent"
    ) {
      return (discount.rule.value_percent / 100) * price;
    } else if (
      discount.rule.type === "shipment" &&
      (!discount.rule.shipment_service ||
        discount.rule.shipment_service === id) &&
      discount.rule.value_type === "fixed"
    ) {
      return discount.rule.value_fixed;
    } else {
      return 0;
    }
  });

  const totalDiscount = discounts.reduce((a, b) => a + b, 0);

  return (
    <div className={styles.shippingMethodCard}>
      <div
        className={styles.container}
        onClick={() => handleSelect(id)}
        onMouseOver={() => setHovered(true)}
        onMouseOut={() => setHovered(false)}
        style={{
          borderColor:
            selectedMethod === id
              ? template.primaryColor
              : hovered
              ? template.secondaryTextColor
              : template.borderColor,
        }}
      >
        {loadingSelect && selectedMethod === id ? (
          <div
            style={{
              position: "absolute",
              top: "18px",
              right: "15px",
            }}
          >
            <BeatLoader color={template.borderColor} />
          </div>
        ) : (
          ""
        )}
        <div className={styles.row}>
          <p style={{ color: template.textColor }}>{name}</p>
          <FaCheckCircle
            className={styles.checkIcon}
            style={{
              opacity: selectedMethod === id && !loadingSelect ? "1" : "0",
              color: template.primaryColor,
            }}
          />
        </div>
        <p className={styles.description}>{description}</p>
        <div style={{ display: "flex", margin: "auto 0" }}>
          {cart &&
          cart.shipment_discount > 0 &&
          cart.shipping.service === id ? (
            <p
              style={{
                textDecoration: "line-through",
                margin: "auto 5px auto 0",
                color: template.secondaryTextColor,
              }}
            >
              ${price}
            </p>
          ) : (
            ""
          )}
          <p
            className={styles.price}
            style={{ color: template.textColor, margin: "0 0" }}
          >
            {price - totalDiscount <= 0
              ? "Gratis"
              : `$${price - totalDiscount}`}
          </p>
        </div>
      </div>
    </div>
  );
}
