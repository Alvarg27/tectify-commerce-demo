import React from "react";
import swell from "swell-js";
import { FaLock } from "react-icons/fa";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import LoadingButton from "./LoadingButton";
import styles from "../styles/PaymentForm.module.css";

export default function PaymentCreditCard({
  fetchCart,
  step,
  order,
  setOrder,
  template,
  mobileOrderSummary,
}) {
  const [cardError, setCardError] = useState();
  const [focused, setFocused] = useState(false);
  const [loading, setLoading] = useState(false);
  const [processingPayment, setProcessingPayment] = useState(false);
  const [processingOrder, setProcessingOrder] = useState(false);
  const [hovered, setHovered] = useState(false);
  const router = useRouter();

  const renderProcessingText = () => {
    if (processingPayment) {
      return "Procesando tu pago";
    } else if (processingOrder) {
      return "Procesando tu pedido";
    }
  };

  const tokenizeCard = async () => {
    if (loading || mobileOrderSummary) {
      return;
    } else {
      setLoading(true);
      setProcessingPayment(true);
      const response = await swell.payment.tokenize({
        card: {
          onError: (err) => {
            console.log(err);
            setCardError(err.message);
            setLoading(false);

            // inform the customer there was an error
          },
          onSuccess: () => {
            setProcessingPayment(false);
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
    setProcessingOrder(true);
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
    setProcessingOrder(false);
  }, []);

  useEffect(() => {
    setCardError(null);
  }, [step]);

  useEffect(() => {
    stripeElement();
  }, []);

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

  return (
    <div>
      <div
        onMouseOver={() => setHovered(true)}
        onMouseOut={() => setHovered(false)}
        className={styles.stripeContainer}
        style={{
          background: template.inputColor,
          borderColor: template.borderColor,
          transition: "0.3s",

          borderColor:
            hovered || focused ? template.primaryColor : template.borderColor,
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
        loadingText={renderProcessingText()}
        width="100%"
        action={tokenizeCard}
        template={template}
      />
    </div>
  );
}
