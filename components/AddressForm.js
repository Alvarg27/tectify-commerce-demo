import React from "react";
import CheckoutInput from "./CheckoutInput";
import styles from "../styles/AddressForm.module.css";
import { useEffect, useState } from "react";
import { FaCheck } from "react-icons/fa";

export default function AddressForm({ cart, fetchCart, step, setStep }) {
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
              cart={cart}
              fetchCart={fetchCart}
              label="Nombre"
              category="shipping"
              type="first_name"
              width={50}
            />
            <CheckoutInput
              cart={cart}
              fetchCart={fetchCart}
              label="Apellido"
              category="shipping"
              type="last_name"
              width={50}
            />
            <CheckoutInput
              cart={cart}
              fetchCart={fetchCart}
              label="Dirección"
              category="shipping"
              type="address1"
              width={100}
            />
            <CheckoutInput
              cart={cart}
              fetchCart={fetchCart}
              label="Colonia"
              category="shipping"
              type="address2"
              width={100}
            />
            <CheckoutInput
              cart={cart}
              fetchCart={fetchCart}
              label="Municipio"
              category="shipping"
              type="city"
              width={100}
            />
            <CheckoutInput
              cart={cart}
              fetchCart={fetchCart}
              label="Código postal"
              category="shipping"
              type="zip"
              width={50}
            />
            <CheckoutInput
              cart={cart}
              fetchCart={fetchCart}
              label="Telefono"
              category="shipping"
              type="phone"
              width={50}
            />
          </div>
          <button onClick={() => setStep(3)} className="primaryButton">
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
                {cart
                  ? `${cart.shipping.name}, ${cart.shipping.address1} ${cart.shipping.address2}, ${cart.shipping.city},  ${cart.shipping.zip},  ${cart.shipping.phone}`
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
