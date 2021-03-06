import styles from "../styles/OrderReviewProgressBar.module.css";

import React from "react";
import { payment } from "swell-js";
import { useState, useEffect } from "react";

export default function OrderReviewProgressBar({ order, template }) {
  const orderStatus = order ? order.status : "";
  const [orderStep, setOrderStep] = useState();
  const [barWidth, setBarWidth] = useState();

  useEffect(() => {
    if (orderStatus === "delivery_pending") {
      setOrderStep(1);
      setBarWidth("50%");
    } else if (orderStatus === "hold") {
      setOrderStep(2);
      setBarWidth("37%");
    } else if (orderStatus === "complete") {
      setOrderStep(3);
      setBarWidth("100%");
    } else if (orderStatus === "canceled") {
      setOrderStep(4);
      setBarWidth("100%");
    }
  }, [order]);

  return (
    <div className={styles.orderReviewProgressBar}>
      <div
        className={styles.progressBar}
        style={{ background: template.secondaryBackgroundColor }}
      >
        <div
          className={styles.progress}
          style={{ width: barWidth, background: template.primaryColor }}
        ></div>
      </div>
      {orderStatus === "canceled" ? (
        <div className={styles.labelContainer}>
          <label
            style={{
              textAlign: "left",
              color:
                orderStep === 4 ? template.primaryColor : template.textColor,
            }}
          >
            Pedido realizado
          </label>
          <label
            style={{
              textAlign: "right",
              color:
                orderStep === 4 ? template.primaryColor : template.textColor,
            }}
          >
            Cancelado
          </label>
        </div>
      ) : (
        <div className={styles.labelContainer}>
          <label
            style={{
              textAlign: "left",
              color:
                orderStep === 1 || orderStep == 2 || orderStep == 3
                  ? template.primaryColor
                  : template.textColor,
            }}
          >
            Pedido realizado
          </label>
          {orderStep === 2 ? (
            <label
              style={{
                textAlign: "center",
                color:
                  orderStep === 1 || orderStep == 2
                    ? template.primaryColor
                    : template.textColor,
              }}
            >
              En espera
            </label>
          ) : (
            ""
          )}
          <label
            style={{
              textAlign: "center",
              color:
                orderStep === 1 || orderStep == 3
                  ? template.primaryColor
                  : template.textColor,
            }}
          >
            Preparando
          </label>
          <label
            style={{
              textAlign: "right",
              color:
                orderStep === 3 ? template.primaryColor : template.textColor,
            }}
          >
            Enviado
          </label>
        </div>
      )}
    </div>
  );
}
