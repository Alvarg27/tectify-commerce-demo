import styles from "../styles/CartCard.module.css";
import React from "react";
import swell from "swell-js";
import { FaMinus, FaPlus } from "react-icons/fa";
import { useState } from "react";
import LinkButton from "./LinkButton";

export default function CartCard({ item, fetchCart, template }) {
  const [loading, setLoading] = useState(false);
  const handleDelete = async (id) => {
    setLoading(true);
    if (loading) {
      return;
    } else {
      const response = await swell.cart.removeItem(id);
      fetchCart();
    }
    setLoading(false);
  };

  const increaseQuantity = async () => {
    const quantity = item.quantity;
    const response = await swell.cart.updateItem(item.id, {
      quantity: quantity + 1,
    });
    fetchCart();
  };

  const subtractQuantity = async () => {
    const quantity = item.quantity;
    const response = await swell.cart.updateItem(item.id, {
      quantity: quantity - 1,
    });
    fetchCart();
  };
  return (
    <div className={styles.cartCard}>
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
              <div
                className={styles.quantityButton}
                onClick={() => subtractQuantity()}
              >
                <FaMinus className={styles.icon} />
              </div>
              <div className={styles.quantity}>
                <p>{item.quantity}</p>
              </div>
              <div
                className={styles.quantityButton}
                onClick={() => increaseQuantity()}
              >
                <FaPlus className={styles.icon} />
              </div>
            </div>

            <LinkButton
              name="Eliminar"
              action={handleDelete}
              template={template}
              actionParam={item.id}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
