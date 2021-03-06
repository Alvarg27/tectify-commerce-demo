import styles from "../styles/CheckoutForm.module.css";

import React from "react";
import CheckoutInput from "./CheckoutInput";
import CustomerForm from "./CustomerForm";
import AddressForm from "./AddressForm";
import ShippingMethod from "./ShippingMethod";
import PaymentForm from "./PaymentForm";
import { FaLock } from "react-icons/fa";
import { useState, useEffect } from "react";
import swell from "swell-js";
import { useRouter } from "next/router";

export default function CheckoutForm({
  cart,
  fetchCart,
  order,
  setOrder,
  template,
  mobileOrderSummary,
  isBreakpoint,
}) {
  const router = useRouter();
  const [step, setStep] = useState(1);

  useEffect(() => {
    if (step === 1) {
      router.push("/checkout", undefined, {
        shallow: true,
      });
    } else if (step === 2) {
      router.push("/checkout/?información-de-envio", undefined, {
        shallow: true,
      });
    } else if (step === 3) {
      router.push("/checkout/?metodo-de-envío", undefined, {
        shallow: true,
      });
    } else if (step === 4) {
      router.push("/checkout/?metodo-de-pago", undefined, {
        shallow: true,
      });
    } else {
      return;
    }
  }, [step]);

  useEffect(() => {
    () => {
      router.push("/checkout");
    };
  });

  return (
    <div className={styles.checkoutForm}>
      <div className={styles.container}>
        <CustomerForm
          cart={cart}
          fetchCart={fetchCart}
          step={step}
          setStep={setStep}
          template={template}
          isBreakpoint={isBreakpoint}
        />
        <AddressForm
          cart={cart}
          fetchCart={fetchCart}
          step={step}
          setStep={setStep}
          template={template}
          isBreakpoint={isBreakpoint}
        />
        <ShippingMethod
          cart={cart}
          fetchCart={fetchCart}
          step={step}
          setStep={setStep}
          template={template}
          isBreakpoint={isBreakpoint}
        />
        <PaymentForm
          cart={cart}
          fetchCart={fetchCart}
          step={step}
          setStep={setStep}
          order={order}
          setOrder={setOrder}
          template={template}
          mobileOrderSummary={mobileOrderSummary}
          isBreakpoint={isBreakpoint}
        />

        <p className={styles.powered}>
          powered by <b>tectify.io</b>
        </p>
      </div>
    </div>
  );
}
