import { useRouter } from "next/router";
import React from "react";
import { useEffect, useState } from "react";
import { BeatLoader } from "react-spinners";
import swell from "swell-js";
import LoadingComponent from "./LoadingComponent";

export default function PaymentPaypal({
  template,
  fetchCart,
  paymentMethod,
  step,
  isBreakpoint,
}) {
  const [loading, setLoading] = useState(false);
  const [processingOrder, setProcessingOrder] = useState(false);
  const [paypalError, setPaypalError] = useState();
  const router = useRouter();
  const paypalElement = async () => {
    setLoading(true);
    try {
      await swell.payment.createElements({
        paypal: {
          elementId: "#paypal-button", // default: #paypal-button
          style: {
            layout: "horizontal", // optional
            color: "gold",
            shape: "rect",
            label: "paypal",
            tagline: false,
          },
          onSuccess: (data, actions) => {
            submitOrder();
            setProcessingOrder(true);
          },
          onCancel: () => {
            setProcessingOrder(false);
            // optional, called on payment cancel
          },
          onError: (error) => {
            console.error(error.message);
            setPaypalError(error.message);
            setProcessingOrder(false);
          },
        },
      });
    } catch (err) {
      console.error(err.message);
    }
    setLoading(false);
  };

  const submitOrder = async () => {
    try {
      const response = await swell.cart.submitOrder();
      router.push(`/order-confirmation`);
      fetchCart();
      console.log(response);
    } catch (err) {
      console.error(err.message);

      fetchCart();
    }
  };

  useEffect(() => {}, []);

  useEffect(() => {
    paypalElement();
  }, []);

  return (
    <div>
      {processingOrder ? (
        ""
      ) : (
        <div className="paypalContainer" style={{ margin: "15px 0 0 0" }}>
          <div
            id="paypal-button"
            style={{
              display: loading ? "none" : "block",
            }}
          />
          {loading ? (
            <LoadingComponent template={template} height="55px" />
          ) : (
            ""
          )}
          <p
            style={{
              margin: "10px 0 0 0",
              fontSize: "12px",
              color: "lightgray",
            }}
          >
            Sera redireccionado a Paypal.com
          </p>
        </div>
      )}
      {paypalError ? <p className="errorMessage">{paypalError}</p> : ""}

      {processingOrder ? (
        <div
          style={{
            margin: "15px 0 0 0",
            display: "flex",
            justifyContent: "center",
            borderRadius: "7px",
            border: `1px solid ${template.borderColor}`,
            height: "100px",
          }}
        >
          <p
            style={{
              margin: "auto 0",
              color: template.secondaryTextColor,
              fontSize: "16px",
            }}
          >
            Procesando tu pedido
          </p>
          <div
            style={{
              margin: "auto 10px",
              opacity: ".5",
              transform: "translateY(2px)",
              minWidth: "42px",
            }}
          >
            <BeatLoader
              color={template.primaryColor}
              size={10}
              template={template}
            />
          </div>
        </div>
      ) : (
        ""
      )}
    </div>
  );
}
