import Link from "next/link";
import React from "react";

export default function orderConfirmation() {
  return (
    <div>
      <h2>¡Gracías por tu compra!</h2>
      <p>
        Estamos procesando tu orden y te informaremos cuando haya sido enviada.
      </p>
      <Link href="/">
        <button className="primaryButton">Seguir Comprando</button>
      </Link>
    </div>
  );
}
