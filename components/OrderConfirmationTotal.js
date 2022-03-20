import styles from "../styles/OrderConfirmationTotal.module.css";
import { FaTag } from "react-icons/fa";
import React from "react";

export default function OrderConfirmationTotal({ order, template }) {
  const displayShippingPrice = () => {
    if (order && order.shipment_delivery === true && order.shipping.service) {
      if (order.shipment_total === 0) {
        return "Gratis";
      } else {
        return "$" + order.shipment_total;
      }
    } else {
      return "--";
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
        {order ? (
          <p style={{ color: template.textColor }}> {"$" + order.sub_total}</p>
        ) : (
          "--"
        )}
      </div>
      {order && order.discounts && order.discounts ? (
        <div className={styles.rowSub}>
          <div style={{ display: "flex" }}>
            <p>Descuento</p>
            <div style={{ display: "flex" }}>
              <PromotionCard />
              {order && order.coupon_code ? <CouponCodeCard /> : ""}
            </div>
          </div>
          {order ? (
            <p style={{ color: template.primaryColor }}>
              {order.discount_total === 0 ? "" : "-$" + order.discount_total}
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
        <div style={{ display: "flex" }}>
          {order && order.shipment_discount > 0 ? (
            <p
              style={{
                textDecoration: "line-through",
                marginRight: "5px",
                color: template.secondaryTextColor,
              }}
            >
              ${order.shipment_price}
            </p>
          ) : (
            ""
          )}
          <p style={{ color: template.textColor }}>{displayShippingPrice()}</p>
        </div>
      </div>
      <div className="line"></div>
      <div className={styles.row} style={{ color: template.textColor }}>
        <p>Total</p>
        <p>{order ? <b>{"$" + order.grand_total}</b> : ""}</p>
      </div>
    </div>
  );
}
