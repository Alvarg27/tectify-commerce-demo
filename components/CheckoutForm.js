import styles from "../styles/CheckoutForm.module.css";

import React from "react";
import CheckoutInput from "./CheckoutInput";
import CustomerForm from "./CustomerForm";
import AddressForm from "./AddressForm";
import ShippingMethod from "./ShippingMethod";
import PaymentForm from "./PaymentForm";
import { FaLock } from "react-icons/fa";
import { useState } from "react";
import swell from "swell-js";

export default function CheckoutForm({ cart, fetchCart }) {
  const [step, setStep] = useState(1);

  return (
    <div className={styles.checkoutForm}>
      <div className={styles.container}>
        <CustomerForm
          cart={cart}
          fetchCart={fetchCart}
          step={step}
          setStep={setStep}
        />
        <AddressForm
          cart={cart}
          fetchCart={fetchCart}
          step={step}
          setStep={setStep}
        />
        <ShippingMethod
          cart={cart}
          fetchCart={fetchCart}
          step={step}
          setStep={setStep}
        />
        <PaymentForm
          cart={cart}
          fetchCart={fetchCart}
          step={step}
          setStep={setStep}
        />

        <p className={styles.powered}>
          powered by <b>tectify.io</b>
        </p>
      </div>
    </div>
  );
}
