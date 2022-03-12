import React from "react";
import CheckoutInput from "./CheckoutInput";
import styles from "../styles/AddressForm.module.css";
import { useEffect, useState } from "react";
import { FaCheck } from "react-icons/fa";
import swell from "swell-js";
import CheckoutSelect from "./CheckoutSelect";

const countryOptions = [
  { id: "MX", name: "México" },
  { id: "US", name: "Estados Unidos" },
];

const stateOptions = [
  { id: "MX-AGU", name: "Aguascalientes" },
  { id: "MX-QUE", name: "Querétaro" },
];

export default function AddressForm({ cart, fetchCart, step, setStep }) {
  const [submitFail, setSubmitFail] = useState(false);
  const [allFieldsValid, setAllFieldsValid] = useState(false);
  const [error, setError] = useState();
  const [orderData, setOrderData] = useState({
    first_name: undefined,
    last_name: undefined,
    address1: undefined,
    address2: undefined,
    city: undefined,
    zip: undefined,
    phone: undefined,
    country: undefined,
    state: undefined,
  });

  const checkValid = (type) => {
    if (orderData[type] === undefined || orderData[type] === "") {
      valid[type] = false;
      setValid({ ...valid });
    } else {
      valid[type] = true;
      setValid({ ...valid });
    }
  };

  const [valid, setValid] = useState({
    first_name: undefined,
    last_name: undefined,
    address1: undefined,
    address2: undefined,
    city: undefined,
    zip: undefined,
    phone: undefined,
    country: undefined,
    state: undefined,
  });
  const stepNumber = 2;
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

  const handleSubmit = async () => {
    if (allFieldsValid) {
      try {
        const response = await swell.cart.update({
          shipping: {
            first_name: orderData.first_name,
            last_name: orderData.last_name,
            address1: orderData.address1,
            address2: orderData.address2,
            city: orderData.city,
            zip: orderData.zip,
            phone: orderData.phone,
            country: orderData.country,
            state: orderData.state,
          },
        });
        setError(null);
        fetchCart();
        setStep(3);
      } catch (err) {
        console.log(err.message);
        setError(err.message);
      }
    } else {
      setSubmitFail(true);
    }
  };

  useEffect(() => {
    if (
      Object.values(valid).indexOf(undefined) > -1 ||
      Object.values(valid).indexOf(false) > -1
    ) {
      setAllFieldsValid(false);
    } else {
      setAllFieldsValid(true);
    }
  }, [valid]);

  return (
    <div className={styles.addressForm}>
      <div className="stepTitle">
        <div
          className="stepNumber"
          style={{
            background: stepStatus === "pending" ? "lightgray" : "#0077ff",
          }}
        >
          {stepStatus === "completed" ? (
            <FaCheck style={{ color: "white", margin: "auto" }} />
          ) : (
            <p>2</p>
          )}
        </div>
        <h3>Información del envío</h3>
      </div>
      {stepStatus === "current" ? (
        <div>
          <div className="formContainer">
            <CheckoutInput
              valid={valid}
              checkValid={checkValid}
              orderData={orderData}
              setOrderData={setOrderData}
              fetchCart={fetchCart}
              cart={cart}
              label="Nombre"
              category="shipping"
              type="first_name"
              width={50}
              errorMessage={error}
              setErrorMessage={setError}
              submitFail={submitFail}
              id="input_first_name"
            />
            <CheckoutInput
              valid={valid}
              checkValid={checkValid}
              orderData={orderData}
              setOrderData={setOrderData}
              fetchCart={fetchCart}
              cart={cart}
              label="Nombre"
              category="shipping"
              type="last_name"
              width={50}
              errorMessage={error}
              setErrorMessage={setError}
              submitFail={submitFail}
              id="input_last_name"
            />
            <CheckoutInput
              valid={valid}
              checkValid={checkValid}
              orderData={orderData}
              setOrderData={setOrderData}
              fetchCart={fetchCart}
              cart={cart}
              label="Dirección"
              category="shipping"
              type="address1"
              width={100}
              errorMessage={error}
              setErrorMessage={setError}
              submitFail={submitFail}
              id="input_address"
            />
            <CheckoutInput
              valid={valid}
              checkValid={checkValid}
              orderData={orderData}
              setOrderData={setOrderData}
              fetchCart={fetchCart}
              cart={cart}
              label="Colonia"
              category="shipping"
              type="address2"
              width={100}
              errorMessage={error}
              setErrorMessage={setError}
              submitFail={submitFail}
              id="colonia"
            />
            <CheckoutSelect
              valid={valid}
              checkValid={checkValid}
              orderData={orderData}
              setOrderData={setOrderData}
              fetchCart={fetchCart}
              cart={cart}
              label="País"
              category="shipping"
              type="country"
              width={50}
              errorMessage={error}
              setErrorMessage={setError}
              submitFail={submitFail}
              options={countryOptions}
              defaultOption="Selecciona un país"
              id="input_country"
            />
            <CheckoutSelect
              valid={valid}
              checkValid={checkValid}
              orderData={orderData}
              setOrderData={setOrderData}
              fetchCart={fetchCart}
              cart={cart}
              label="Estado"
              category="shipping"
              type="state"
              width={50}
              errorMessage={error}
              setErrorMessage={setError}
              submitFail={submitFail}
              options={stateOptions}
              defaultOption="Selecciona un estado"
              id="input_state"
            />
            <CheckoutInput
              valid={valid}
              checkValid={checkValid}
              orderData={orderData}
              setOrderData={setOrderData}
              fetchCart={fetchCart}
              cart={cart}
              label="Municipio"
              category="shipping"
              type="city"
              width={100}
              errorMessage={error}
              setErrorMessage={setError}
              submitFail={submitFail}
              id="input_city"
            />
            <CheckoutInput
              valid={valid}
              checkValid={checkValid}
              orderData={orderData}
              setOrderData={setOrderData}
              fetchCart={fetchCart}
              cart={cart}
              label="Código postal"
              category="shipping"
              type="zip"
              width={50}
              errorMessage={error}
              setErrorMessage={setError}
              submitFail={submitFail}
              id="input_zip"
            />
            <CheckoutInput
              valid={valid}
              checkValid={checkValid}
              orderData={orderData}
              setOrderData={setOrderData}
              fetchCart={fetchCart}
              cart={cart}
              label="Teléfono"
              category="shipping"
              type="phone"
              width={50}
              errorMessage={error}
              setErrorMessage={setError}
              submitFail={submitFail}
              id="input_phone"
            />
          </div>
          <button
            style={{ margin: "15px 0 0 0", width: "100%" }}
            onClick={() => handleSubmit()}
            className="primaryButton"
          >
            Continuar
          </button>
        </div>
      ) : (
        ""
      )}
      {stepStatus === "completed" ? (
        <div className="dataReviewCard">
          <div className="row">
            <div style={{ display: "flex", margin: "0 30px 0 0" }}>
              <p style={{ color: "grey", margin: "auto 10px auto auto" }}>
                Envío
              </p>
              <p>
                {cart && cart.shipping
                  ? `${cart.shipping.name}, ${cart.shipping.address1} ${cart.shipping.address2}, ${cart.shipping.city}, ${cart.shipping.state}, ${cart.shipping.country},  ${cart.shipping.zip},  ${cart.shipping.phone}`
                  : ""}
              </p>
            </div>
            <button onClick={() => setStep(2)} className="linkButton">
              Editar
            </button>
          </div>
        </div>
      ) : (
        ""
      )}
    </div>
  );
}
