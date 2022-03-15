import styles from "../styles/OrderReviewCard.module.css";
import { FaMinus, FaPlus } from "react-icons/fa";
import React from "react";

export default function OrderReviewCard({ item }) {
  return (
    <div className={styles.orderReviewCard}>
      <div className={styles.container}>
        <div className={styles.imageContainer}>
          <img src={item.variant.images[0].file.url} />
        </div>
        <div className={styles.dataContainer}>
          <div className={styles.row}>
            <div className={styles.nameContainer}>
              <p className={styles.name}>{item.product.name}</p>
              <p className={styles.variantName}>{item.variant.name}</p>
            </div>
            <p className={styles.price}>${item.price_total}</p>
          </div>

          <div className={styles.row}>
            <div className={styles.quantityContainer}>
              <p>Cantidad:</p>
              <p>{item.quantity}</p>
            </div>
          </div>
        </div>
      </div>
      <div className="line"></div>
    </div>
  );
}
