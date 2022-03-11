import styles from "../styles/CheckoutForm.module.css";

import React from "react";
import CheckoutInput from "./CheckoutInput";
import CustomerForm from "./CustomerForm";
import AddressForm from "./AddressForm";
import ShippingMethod from "./ShippingMethod";
import PaymentForm from "./PaymentForm";
import { FaLock } from "react-icons/fa";

export default function CheckoutForm({ cart, fetchCart }) {
  return (
    <div className={styles.checkoutForm}>
      <div className={styles.container}>
        <CustomerForm cart={cart} fetchCart={fetchCart} />
        <AddressForm cart={cart} fetchCart={fetchCart} />
        <ShippingMethod cart={cart} fetchCart={fetchCart} />
        <PaymentForm cart={cart} fetchCart={fetchCart} />
        <p
          style={{ margin: "10px 0 0 0", fontSize: "12px", color: "lightgray" }}
        >
          Todas las transacciones son seguras y encriptadas <FaLock />
        </p>
        <button
          className="primaryButton"
          style={{ width: "100%", margin: "30px 0 0 0 " }}
        >
          Pagar
        </button>
        <p className={styles.powered}>
          powered by <b>tectify.io</b>
        </p>
      </div>
    </div>
  );
}
