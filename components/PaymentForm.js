import styles from "../styles/PaymentForm.module.css";
import swell from "swell-js";
import { FaLock } from "react-icons/fa";
import React from "react";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import LoadingButton from "./LoadingButton";

export default function PaymentForm({ fetchCart, step }) {
  const [loading, setLoading] = useState();
  const router = useRouter();
  const stepNumber = 4;
  const [stepStatus, setStepStatus] = useState();

  useEffect(() => {
    if (step === stepNumber) {
      setStepStatus("current");
    } else if (step < stepNumber) {
      setStepStatus("pending");
    } else if (step > stepNumber) {
      setStepStatus("completed");
    }
  }, [step]);

  const stripeElement = async () => {
    await swell.payment.createElements({
      card: {
        elementId: "#card-element-id", // default: #card-element
        options: {
          hidePostalCode: true,
          // options are passed as a direct argument to stripe.js
          style: {
            base: {
              fontWeight: 500,
              fontSize: "16px",
            },
          },
        },
        onChange: (event) => {
          setCardError(null);
        },
        onReady: (event) => {
          // optional, called when the Element is fully rendered
        },
        onFocus: (event) => {
          // optional, called when the Element gains focus
        },
        onBlur: (event) => {
          // optional, called when the Element loses focus
          tokenizeCard();
        },
        onEscape: (event) => {
          // optional, called when the escape key is pressed within an Element
        },
        onClick: (event) => {
          // optional, called when the Element is clicked
        },
        onSuccess: (result) => {
          // optional, called on card payment success
        },
        onError: (error) => {
          // optional, called on card payment error
        },
      },
    });
  };

  const tokenizeCard = async () => {
    if (loading) {
      return;
    } else {
      setLoading(true);
      const response = await swell.payment.tokenize({
        card: {
          onError: (err) => {
            console.log(err);
            setCardError(err.message);

            // inform the customer there was an error
          },
          onSuccess: () => {
            submitOrder();
            //finally submit the form
          },
        },
        // ideal: { onError: (err) => {}, ...}
      });
    }
    setLoading(false);
  };

  const submitOrder = async () => {
    try {
      const response = await swell.cart.submitOrder();
      router.push("/order-confirmation");
      console.log(response);
      fetchCart();
    } catch (err) {
      console.log(err.message);
      alert("ocurrio un error al procesar su orden");
      router.push("/");
      fetchCart();
    }
  };

  useEffect(() => {
    stripeElement();
    setCardError(null);
  }, [step]);

  useEffect(() => {
    if (step === stepNumber) {
      setStepStatus("current");
    } else if (step < stepNumber) {
      setStepStatus("pending");
    } else if (step > stepNumber) {
      setStepStatus("completed");
    }
  }, [step]);
  const [cardError, setCardError] = useState();

  return (
    <div className={styles.paymentForm}>
      <div className="stepTitle">
        <div
          className="stepNumber"
          style={{
            background: stepStatus === "pending" ? "lightgray" : "#0077ff",
          }}
        >
          <p>4</p>
        </div>
        <h3>Información de pago</h3>
      </div>
      {step === 4 ? (
        <div style={{ margin: "30px 0 0 0", width: "100%" }}>
          <label>Tarjeta de crédito / débito</label>
          <div className={styles.stripeContainer}>
            <div style={{ margin: "auto 0" }} id="card-element-id"></div>
          </div>
          {cardError ? <p className="errorMessage">{cardError}</p> : ""}
          <p
            style={{
              margin: "10px 0 0 0",
              fontSize: "12px",
              color: "lightgray",
            }}
          >
            Todas las transacciones son seguras y encriptadas <FaLock />
          </p>
          <LoadingButton
            loading={loading}
            name="Pagar"
            loadingText="Procesando"
            width="100%"
            action={tokenizeCard}
          />
        </div>
      ) : (
        ""
      )}
    </div>
  );
}
