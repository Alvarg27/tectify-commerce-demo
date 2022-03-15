import React, { useState, useEffect } from "react";
import styles from "../styles/ShippingMethod.module.css";
import ShippingMethodCard from "./ShippingMethodCard";
import swell from "swell-js";
import { FaCheck } from "react-icons/fa";
import { set } from "swell-js/dist/utils";
import LoadingButton from "./LoadingButton";
import LinkButton from "./LinkButton";

export default function ShippingMethod({
  step,
  fetchCart,
  setStep,
  cart,
  template,
}) {
  const [loading, setLoading] = useState();
  const [error, setError] = useState();
  const [selectedMethod, setSelectedMethod] = useState();
  const [shippingMethods, setShippingMethods] = useState();
  const stepNumber = 3;
  const [stepStatus, setStepStatus] = useState();

  const fetchShippingMethods = async () => {
    try {
      const response = await swell.cart.getShippingRates();
      setShippingMethods(response);
    } catch (err) {
      console.log(err.message);
      setError(err.message);
    }
  };

  const handleSelect = (id) => {
    setSelectedMethod(id);
  };

  const handleSubmit = async () => {
    if (selectedMethod) {
      setLoading(true);
      try {
        const response = await swell.cart.update({
          shipping: {
            service: selectedMethod,
          },
        });
        fetchCart();
        setStep(4);
      } catch (err) {
        console.log(err.message);
        setError(err.message);
      }
      setLoading(false);
    }
    setError("Selecciona un método de envío");
  };

  useEffect(() => {
    if (step === stepNumber) {
      setStepStatus("current");
    } else if (step < stepNumber) {
      setStepStatus("pending");
    } else if (step > stepNumber) {
      setStepStatus("completed");
    }
    fetchCart();
    fetchShippingMethods();
    setError(null);
  }, [step]);

  useEffect(() => {
    handleSelect(
      cart && cart.shipping && cart.shipping.service
        ? cart.shipping.service
        : ""
    );
  }, [fetchCart]);

  useEffect(() => {
    if (selectedMethod) {
      setError(null);
    } else {
      return;
    }
  }, [selectedMethod]);

  return (
    <div className={styles.shippingMethod}>
      <div className="stepTitle">
        <div
          className="stepNumber"
          style={{
            background:
              stepStatus === "pending" ? "lightgray" : template.primaryColor,
          }}
        >
          {stepStatus === "completed" ? (
            <FaCheck style={{ color: "white", margin: "auto" }} />
          ) : (
            <p
              style={{
                color: stepStatus === "pending" ? template.inputColor : "white",
              }}
            >
              3
            </p>
          )}
        </div>

        <h3 style={{ color: template.textColor }}>Método de envío</h3>
      </div>
      {step === 3 ? (
        <div>
          <div className={styles.cardContainer}>
            {shippingMethods
              ? shippingMethods.services.map((item) => (
                  <ShippingMethodCard
                    key={item.id}
                    name={item.name}
                    price={item.price}
                    description={item.description}
                    id={item.id}
                    selectedMethod={selectedMethod}
                    handleSelect={handleSelect}
                    fetchCart={fetchCart}
                    template={template}
                  />
                ))
              : ""}
          </div>
          <p className="errorMessage">{error}</p>
          <LoadingButton
            loading={loading}
            name="Continuar"
            width="100%"
            action={handleSubmit}
            template={template}
          />
        </div>
      ) : (
        ""
      )}
      {stepStatus === "completed" ? (
        <div
          className="dataReviewCard"
          style={{
            background: template.inputColor,
            borderColor: template.borderColor,
          }}
        >
          <div className="row">
            <div style={{ display: "flex" }}>
              <p style={{ color: "grey", margin: "auto 10px auto auto" }}>
                Envío
              </p>
              <p style={{ color: template.textColor }}>
                {cart && cart.shipping && cart.shipping.service
                  ? cart.shipping.service_name
                  : "--"}{" "}
                {`($${
                  cart && cart.shipping && cart.shipping.service
                    ? cart.shipping.price
                    : "--"
                })`}
              </p>
            </div>
            <LinkButton
              action={setStep}
              actionParam={3}
              name="Editar"
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
