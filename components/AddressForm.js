import React from "react";
import CheckoutInput from "./CheckoutInput";
import styles from "../styles/AddressForm.module.css";

export default function AddressForm() {
  return (
    <div className={styles.addressForm}>
      <div className="stepTitle">
        <div className="stepNumber">
          <p>2</p>
        </div>
        <h3>Información del envío</h3>
      </div>
      <div className="formContainer">
        <CheckoutInput label="Nombre" type="email" width={50} />
        <CheckoutInput label="Apellido" type="email" width={50} />
        <CheckoutInput label="Dirección" type="email" width={100} />
        <CheckoutInput label="Colonia" type="email" width={100} />
        <CheckoutInput label="Municipio" type="email" width={100} />
        <CheckoutInput label="Código postal" type="email" width={50} />
        <CheckoutInput label="Telefono" type="email" width={50} />
      </div>
    </div>
  );
}
