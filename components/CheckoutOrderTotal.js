import styles from "../styles/CheckoutOrderTotal.module.css";

import React from "react";
import { useState } from "react";
import { FaTag, FaTimes } from "react-icons/fa";
import swell from "swell-js";

export default function CheckoutOrderTotal({ cart, template, fetchCart }) {
  const displayShippingPrice = () => {
    if (cart && cart.shipment_delivery === true && cart.shipping.service) {
      if (cart.shipment_total === 0) {
        return "Gratis";
      } else {
        return "$" + cart.shipment_total;
      }
    } else {
      return "--";
    }
  };

  const handleRemoveCoupon = async () => {
    try {
      const response = await swell.cart.removeCoupon();
      fetchCart();
    } catch (err) {
      console.log(err);
    }
  };

  const CouponCodeCard = () => {
    return (
      <div
        style={{
          display: "flex",
          border: `1px solid ${template.borderColor}`,
          borderRadius: "7px",
          height: "26px",
          margin: "0 5px",
        }}
      >
        <FaTag
          style={{
            margin: "auto 10px",
            fontSize: "12px",
            color: template.primaryColor,
          }}
        />
        <p
          style={{
            margin: "auto 0",
            fontSize: "12px",
            color: template.textColor,
          }}
        >
          {cart.coupon_code}
        </p>
        <FaTimes
          onClick={() => handleRemoveCoupon()}
          style={{
            margin: "auto 10px",
            fontSize: "12px",
            cursor: "pointer",
            color: template.textColor,
          }}
        />
      </div>
    );
  };

  const PromotionCard = () => {
    return cart.promotions.results.map((promotion) => (
      <div
        key={promotion.id}
        style={{
          display: "flex",
          border: `1px solid ${template.borderColor}`,
          borderRadius: "7px",
          height: "26px",
          margin: "0 5px",
        }}
      >
        <FaTag
          style={{
            margin: "auto 10px",
            fontSize: "12px",
            color: template.primaryColor,
          }}
        />
        <p
          style={{
            margin: "auto 10px auto 0px",
            fontSize: "12px",
            color: template.textColor,
          }}
        >
          {promotion.name}
        </p>
      </div>
    ));
  };

  return (
    <div className={styles.checkoutOrderTotal}>
      <div className={styles.rowSub}>
        <p>Subtotal</p>
        {cart ? <p>{"$" + cart.sub_total}</p> : "--"}
      </div>
      {cart && cart.discounts ? (
        <div className={styles.rowSub}>
          <div style={{ display: "flex" }}>
            <p>Descuento</p>
            <div style={{ display: "flex" }}>
              <PromotionCard />
              {cart && cart.coupon_code ? <CouponCodeCard /> : ""}
            </div>
          </div>
          {cart ? (
            <p style={{ color: template.primaryColor }}>
              {"-$" + cart.discount_total}
            </p>
          ) : (
            "--"
          )}
        </div>
      ) : (
        ""
      )}

      <div className={styles.rowSub}>
        <p>Envío</p>
        {cart ? <p>{displayShippingPrice()}</p> : "--"}
      </div>
      <div className="line"></div>
      <div className={styles.row} style={{ color: template.textColor }}>
        <p>Total</p>
        <p>{cart ? <b>{"$" + cart.grand_total}</b> : ""}</p>
      </div>
    </div>
  );
}
