import React from "react";
import CheckoutInput from "./CheckoutInput";
import styles from "../styles/AddressForm.module.css";

export default function AddressForm({ cart, fetchCart }) {
  return (
    <div className={styles.addressForm}>
      <div className="stepTitle">
        <div className="stepNumber">
          <p>2</p>
        </div>
        <h3>Información del envío</h3>
      </div>
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
    </div>
  );
}
