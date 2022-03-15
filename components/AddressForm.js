import React from "react";
import CheckoutInput from "./CheckoutInput";
import styles from "../styles/AddressForm.module.css";
import { useEffect, useState } from "react";
import { FaCheck } from "react-icons/fa";
import swell from "swell-js";
import CheckoutSelect from "./CheckoutSelect";
import LoadingButton from "./LoadingButton";
import { useRouter } from "next/router";
import LinkButton from "./LinkButton";

const countryOptions = [{ id: "MX", name: "México" }];

const stateOptions = [
  {
    name: "Ciudad de México",
    code: "MX-CMX",
    subdivision: "federal district",
  },
  {
    name: "Aguascalientes",
    code: "MX-AGU",
    subdivision: "state",
  },
  {
    name: "Baja California",
    code: "MX-BCN",
    subdivision: "state",
  },
  {
    name: "Baja California Sur",
    code: "MX-BCS",
    subdivision: "state",
  },
  {
    name: "Campeche",
    code: "MX-CAM",
    subdivision: "state",
  },
  {
    name: "Chiapas",
    code: "MX-CHP",
    subdivision: "state",
  },
  {
    name: "Chihuahua",
    code: "MX-CHH",
    subdivision: "state",
  },
  {
    name: "Coahuila",
    code: "MX-COA",
    subdivision: "state",
  },
  {
    name: "Colima",
    code: "MX-COL",
    subdivision: "state",
  },
  {
    name: "Durango",
    code: "MX-DUR",
    subdivision: "state",
  },
  {
    name: "Guanajuato",
    code: "MX-GUA",
    subdivision: "state",
  },
  {
    name: "Guerrero",
    code: "MX-GRO",
    subdivision: "state",
  },
  {
    name: "Hidalgo",
    code: "MX-HID",
    subdivision: "state",
  },
  {
    name: "Jalisco",
    code: "MX-JAL",
    subdivision: "state",
  },
  {
    name: "Michoacán",
    code: "MX-MIC",
    subdivision: "state",
  },
  {
    name: "Morelos",
    code: "MX-MOR",
    subdivision: "state",
  },
  {
    name: "México",
    code: "MX-MEX",
    subdivision: "state",
  },
  {
    name: "Nayarit",
    code: "MX-NAY",
    subdivision: "state",
  },
  {
    name: "Nuevo León",
    code: "MX-NLE",
    subdivision: "state",
  },
  {
    name: "Oaxaca",
    code: "MX-OAX",
    subdivision: "state",
  },
  {
    name: "Puebla",
    code: "MX-PUE",
    subdivision: "state",
  },
  {
    name: "Querétaro",
    code: "MX-QUE",
    subdivision: "state",
  },
  {
    name: "Quintana Roo",
    code: "MX-ROO",
    subdivision: "state",
  },
  {
    name: "San Luis Potosí",
    code: "MX-SLP",
    subdivision: "state",
  },
  {
    name: "Sinaloa",
    code: "MX-SIN",
    subdivision: "state",
  },
  {
    name: "Sonora",
    code: "MX-SON",
    subdivision: "state",
  },
  {
    name: "Tabasco",
    code: "MX-TAB",
    subdivision: "state",
  },
  {
    name: "Tamaulipas",
    code: "MX-TAM",
    subdivision: "state",
  },
  {
    name: "Tlaxcala",
    code: "MX-TLA",
    subdivision: "state",
  },
  {
    name: "Veracruz",
    code: "MX-VER",
    subdivision: "state",
  },
  {
    name: "Yucatán",
    code: "MX-YUC",
    subdivision: "state",
  },
  {
    name: "Zacatecas",
    code: "MX-ZAC",
    subdivision: "state",
  },
];

export default function AddressForm({
  cart,
  fetchCart,
  step,
  setStep,
  template,
}) {
  const [loading, setLoading] = useState();
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
      setLoading(true);
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
      setLoading(false);
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
            background:
              stepStatus === "pending"
                ? template.borderColor
                : template.primaryColor,
          }}
        >
          {stepStatus === "completed" ? (
            <FaCheck style={{ color: "white", margin: "auto" }} />
          ) : (
            <p>2</p>
          )}
        </div>
        <h3 style={{ color: template.textColor }}>Información del envío</h3>
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
              id="nombre"
              template={template}
            />
            <CheckoutInput
              valid={valid}
              checkValid={checkValid}
              orderData={orderData}
              setOrderData={setOrderData}
              fetchCart={fetchCart}
              cart={cart}
              label="Apellido"
              category="shipping"
              type="last_name"
              width={50}
              errorMessage={error}
              setErrorMessage={setError}
              submitFail={submitFail}
              id="apellido"
              template={template}
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
              id="direccion"
              template={template}
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
              template={template}
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
              id="pais"
              template={template}
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
              id="estado"
              template={template}
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
              id="ciudad"
              template={template}
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
              id="zip"
              template={template}
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
              id="telefono"
              template={template}
            />
          </div>
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
            <div style={{ display: "flex", margin: "0 30px 0 0" }}>
              <p style={{ color: "grey", margin: "auto 10px auto auto" }}>
                Envío
              </p>
              <p style={{ color: template.textColor }}>
                {cart && cart.shipping && cart.shipping.name
                  ? `${cart.shipping.name}, ${cart.shipping.address1} ${cart.shipping.address2}, ${cart.shipping.city}, ${cart.shipping.state}, ${cart.shipping.country},  ${cart.shipping.zip},  ${cart.shipping.phone}`
                  : "--"}
              </p>
            </div>
            <LinkButton
              action={setStep}
              actionParam={2}
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
