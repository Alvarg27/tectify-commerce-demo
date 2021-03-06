import styles from "../styles/CheckoutProductCard.module.css";
import swell from "swell-js";
import { FaMinus, FaPlus } from "react-icons/fa";
import React from "react";
import LinkButton from "./LinkButton";

export default function CheckoutProductCard({
  item,
  fetchCart,
  cart,
  template,
}) {
  const handleDelete = async (id) => {
    if (cart.items.length > 1) {
      const response = await swell.cart.removeItem(id);
      fetchCart();
    } else {
      alert("¡No puedes eliminar todos los productos dentro del checkout!");
    }
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
    <div className={styles.checkoutProductCard}>
      <div className={styles.container}>
        <div className={styles.imageContainer}>
          <img src={item.variant.images[0].file.url} />
        </div>
        <div className={styles.dataContainer}>
          <div className={styles.row}>
            <div className={styles.nameContainer}>
              <p className={styles.name} style={{ color: template.textColor }}>
                {item.product.name}
              </p>
              <p
                className={styles.variantName}
                style={{ color: template.secondaryTextColor }}
              >
                {item.variant.name}
              </p>
            </div>
            <p className={styles.price} style={{ color: template.textColor }}>
              ${item.price_total}
            </p>
          </div>

          <div className={styles.row}>
            <div
              className={styles.quantityContainer}
              style={{ color: template.textColor }}
            >
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
            {cart.items.length > 1 ? (
              <LinkButton
                name="Eliminar"
                action={handleDelete}
                template={template}
                actionParam={item.id}
              />
            ) : (
              ""
            )}
          </div>
        </div>
      </div>
      <div className="line"></div>
    </div>
  );
}
