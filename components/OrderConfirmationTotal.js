import styles from "../styles/OrderConfirmationTotal.module.css";
import { FaTag } from "react-icons/fa";
import React from "react";

export default function OrderConfirmationTotal({ order, template }) {
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
            margin: "auto 10px auto 0px",
            fontSize: "12px",
            color: template.textColor,
          }}
        >
          {order.coupon_code}
        </p>
      </div>
    );
  };

  const PromotionCard = () => {
    return order.promotions.results.map((promotion) => (
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
    <div className={styles.orderConfirmationTotal}>
      <div className={styles.rowSub}>
        <p>Subtotal</p>
        {order ? <p>${order.sub_total}</p> : "--"}
      </div>
      <div className={styles.rowSub}>
        <p>Envío</p>
        {order ? <p>${order.shipment_total}</p> : "--"}
      </div>
      {order && order.discounts ? (
        <div className={styles.rowSub}>
          <div style={{ display: "flex" }}>
            <p>Descuento</p>
            <div style={{ display: "flex" }}>
              <PromotionCard />
              {order && order.coupon_code ? <CouponCodeCard /> : ""}
            </div>
          </div>
          {order ? (
            <p>
              <b>{"-$" + order.discount_total}</b>
            </p>
          ) : (
            "--"
          )}
        </div>
      ) : (
        ""
      )}
      <div className="line"></div>
      <div className={styles.row} style={{ color: template.textColor }}>
        <p>Total</p>
        <p>{order ? <b>${order.grand_total}</b> : ""}</p>
      </div>
    </div>
  );
}
