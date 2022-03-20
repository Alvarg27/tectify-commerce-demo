import React, { useState, useEffect } from "react";
import styles from "../styles/ShippingMethod.module.css";
import ShippingMethodCard from "./ShippingMethodCard";
import swell from "swell-js";
import { FaCheck } from "react-icons/fa";
import { set } from "swell-js/dist/utils";
import LoadingButton from "./LoadingButton";
import LinkButton from "./LinkButton";
import LoadingComponent from "./LoadingComponent";
import { BeatLoader } from "react-spinners";

export default function ShippingMethod({
  step,
  fetchCart,
  setStep,
  cart,
  template,
}) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState();
  const [selectedMethod, setSelectedMethod] = useState();
  const [shippingMethods, setShippingMethods] = useState();
  const stepNumber = 3;
  const [stepStatus, setStepStatus] = useState();
  const [loadingSelect, setLoadingSelect] = useState(false);
  const [loadingFetch, setLoadingFetch] = useState(false);

  const discounts = cart.discounts.map((discount) => {
    if (
      discount.rule.type === "shipment" &&
      (!discount.rule.shipment_service ||
        discount.rule.shipment_service === cart.shipping.service) &&
      discount.rule.value_type === "percent"
    ) {
      return (discount.rule.value_percent / 100) * cart.shipping.price;
    } else if (
      discount.rule.type === "shipment" &&
      (!discount.rule.shipment_service ||
        discount.rule.shipment_service === cart.shipping.service) &&
      discount.rule.value_type === "fixed"
    ) {
      return discount.rule.value_fixed;
    } else {
      return 0;
    }
  });

  const totalDiscount = discounts.reduce((a, b) => a + b, 0);

  const fetchShippingMethods = async () => {
    setLoadingFetch(true);
    try {
      const response = await swell.cart.getShippingRates();
      setShippingMethods(response);
      if (cart && !cart.shipping.service) {
        handleSelect(response.services[0].id);
      }
    } catch (err) {
      console.log(err.message);
    }
    setLoadingFetch(false);
  };

  const handleSelect = async (id) => {
    setSelectedMethod(id);
    setLoadingSelect(true);
    try {
      await swell.cart.update({
        shipping: {
          service: id,
        },
      });
      fetchCart();
    } catch (err) {
      console.error(err.message);
      setError(err.message);
    }
    setLoadingSelect(false);
  };

  const handleSubmit = async () => {
    if (cart && cart.shipping.service) {
      setStep(4);
      setError(null);
      fetchCart();
    } else {
      setError("Selecciona un método de envío");
    }
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
    setError();
    fetchShippingMethods();
  }, [step]);

  console.log(shippingMethods);
  return (
    <div className={styles.shippingMethod}>
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
          {stepStatus === "completed" ? (
            <FaCheck style={{ color: "white", margin: "auto" }} />
          ) : (
            <p>3</p>
          )}
        </div>

        <h3 style={{ color: template.textColor }}>Método de envío</h3>
      </div>
      {step === 3 ? (
        <div>
          <div className={styles.cardContainer}>
            {shippingMethods && !loadingFetch
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
                    cart={cart}
                    loadingSelect={loadingSelect}
                  />
                ))
              : ""}
          </div>
          {loadingFetch ||
          (shippingMethods && shippingMethods.services <= 0) ? (
            <div
              style={{
                display: "flex",
                border: `1px solid ${template.bordercolor}`,
                height: "100px",
                borderRadius: "7px",
              }}
            >
              {loadingFetch ? (
                <div style={{ margin: "auto" }}>
                  <BeatLoader color={template.borderColor} />
                </div>
              ) : (
                <p
                  style={{ margin: "auto", color: template.secondaryTextColor }}
                >
                  No existen métodos de envíó disponibles para tu dirección
                </p>
              )}
            </div>
          ) : (
            ""
          )}
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
          <div className="row" style={{ margin: "auto 0" }}>
            <div style={{ display: "flex" }}>
              <p style={{ color: "grey", margin: "auto 10px auto auto" }}>
                Envío
              </p>
              <p style={{ color: template.textColor }}>
                {cart && cart.shipping && cart.shipping.service ? (
                  cart.shipping.service_name
                ) : (
                  <BeatLoader size={10} color={template.borderColor} />
                )}
                {`${
                  cart && cart.shipping && cart.shipping.service
                    ? ` ${
                        cart.shipping.price - totalDiscount <= 0
                          ? "(Gratis)"
                          : `($${cart.shipping.price - totalDiscount})`
                      }`
                    : ""
                }`}
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
