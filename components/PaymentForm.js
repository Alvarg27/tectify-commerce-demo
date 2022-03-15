import styles from "../styles/PaymentForm.module.css";
import swell from "swell-js";
import { FaLock } from "react-icons/fa";
import React from "react";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import LoadingButton from "./LoadingButton";

export default function PaymentForm({
  fetchCart,
  step,
  order,
  setOrder,
  template,
  mobileOrderSummary,
}) {
  const [focused, setFocused] = useState(false);
  const [loading, setLoading] = useState(false);
  const [hovered, setHovered] = useState(false);
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
              color: template.textColor,
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
          setFocused(true);
        },
        onBlur: (event) => {
          checkCard();
          setFocused(false);
          // optional, called when the Element loses focus
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

  const checkCard = async () => {
    const response = await swell.payment.tokenize({
      card: {
        onError: (err) => {
          console.log(err);
          setCardError(err.message);

          // inform the customer there was an error
        },
        onSuccess: () => {
          //finally submit the form
        },
      },
      // ideal: { onError: (err) => {}, ...}
    });
  };

  const tokenizeCard = async () => {
    if (loading || mobileOrderSummary) {
      return;
    } else {
      setLoading(true);
      const response = await swell.payment.tokenize({
        card: {
          onError: (err) => {
            console.log(err);
            setCardError(err.message);
            setLoading(false);

            // inform the customer there was an error
          },
          onSuccess: () => {
            submitOrder();
            //finally submit the form
          },
        },
        // ideal: { onError: (err) => {}, ...}
      });
      fetchCart();
    }
  };

  const submitOrder = async () => {
    try {
      const response = await swell.cart.submitOrder();
      router.push(`/order-confirmation`);
      fetchCart();
    } catch (err) {
      console.log(err.message);
      alert("ocurrio un error al procesar su orden, intentelo más tarde");
      router.push("/");
      fetchCart();
    }
  };
  useEffect(() => {
    setLoading(false);
  }, []);

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
            background:
              stepStatus === "pending"
                ? template.borderColor
                : template.primaryColor,
          }}
        >
          <p>4</p>
        </div>
        <h3 style={{ color: template.textColor }}>Información de pago</h3>
      </div>
      {step === 4 ? (
        <div style={{ margin: "30px 0 0 0", width: "100%" }}>
          <label style={{ color: template.textColor }}>
            Tarjeta de crédito / débito
          </label>
          <div
            onMouseOver={() => setHovered(true)}
            onMouseOut={() => setHovered(false)}
            className={styles.stripeContainer}
            style={{
              background: template.secondaryBackgroundColor,
              borderColor: template.borderColor,
              transition: "0.3s",

              borderColor:
                hovered || focused
                  ? template.primaryColor
                  : template.borderColor,
            }}
          >
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
            template={template}
          />
        </div>
      ) : (
        ""
      )}
    </div>
  );
}
