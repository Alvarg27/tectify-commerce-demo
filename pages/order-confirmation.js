import styles from "../styles/OrderConfirmation.module.css";
import swell from "swell-js";
import { useState } from "react";
import { useEffect } from "react";
import React from "react";
import OrderReviewCard from "../components/OrderReviewCard";
import OrderConfirmationTotal from "../components/OrderConfirmationTotal";
import { FaCcVisa, FaCcAmex, FaCcMastercard } from "react-icons/fa";
import Link from "next/link";
import OrderReviewProgressBar from "../components/OrderReviewProgressBar";
import LoadingButton from "../components/LoadingButton";
import { useRouter } from "next/router";

export default function OrderConfirmation({
  setOrder,
  order,
  setIsCheckout,
  fetchCart,
  template,
}) {
  const router = useRouter();
  const [loading, setLoading] = useState();
  const [title, setTitle] = useState({
    title: "¡Gracias por tu compra!",
    subtitle: "Estamos preparando tu pedido y te avisaremos cuando se envíe.",
  });
  const fetchOrder = async () => {
    try {
      const response = await swell.cart.getOrder();
      console.log(response);
      setOrder(response);
    } catch (err) {
      console.log(err);
    }
  };

  const returnHome = () => {
    setLoading(true);
    router.push("/");
    setLoading(false);
  };

  const renderTitle = () => {
    if (order && order.status === "canceled") {
      setTitle({
        title: "¡Tu pedido ha sido cancelado!",
        subtitle:
          "Hemos cancelado tu pedido, pronto recibiras el reembolso en tu forma de pago, si requieres más información ponte en contacto con nosotros.",
      });
    } else if (order && order.status === "hold") {
      setTitle({
        title: "¡Tu pedido está en espera!",
        subtitle:
          "Hemos puesto tu pedido en espera, te notificaremos de cualquier actualización en el estado de tu pedido , si requieres más información ponte en contacto con nosotros.",
      });
    } else if (order && order.status === "completed") {
      setTitle({
        title: "¡Tu pedido ha sido enviado!",
        subtitle:
          "Hemos enviado tu pedido, pronto recibirias en tu correo electrónico los detalles del envío, si requieres más información ponte en contacto con nosotros.",
      });
    } else {
      setTitle({
        title: "¡Gracias por tu compra!",
        subtitle:
          "Estamos preparando tu pedido y te avisaremos cuando se envíe.",
      });
    }
  };

  const renderCardLogo = () => {
    if (order && order.billing.card && order.billing.card.brand === "visa") {
      return (
        <FaCcVisa className={styles.ccIcon} styles={{ color: "#1A1F71" }} />
      );
    } else if (
      order &&
      order.billing.card &&
      order.billing.card.brand === "amex"
    ) {
      return (
        <FaCcAmex className={styles.ccIcon} styles={{ color: "#2E77BB" }} />
      );
    } else if (
      order &&
      order.billing.card &&
      order.billing.card.brand === "mastercard"
    ) {
      return (
        <FaCcMastercard className={styles.ccIcon} style={{ color: "EB001B" }} />
      );
    }
  };

  useEffect(() => {
    fetchCart();
    fetchOrder();
    setIsCheckout(false);
    renderTitle();
  }, []);

  useEffect(() => {
    renderTitle();
  }, [order]);

  return (
    <div className={styles.orderConfirmation}>
      <div className={styles.container}>
        <div className={styles.title}>
          {order && order.paid === true ? (
            <p style={{ color: template.primaryColor }}>Pago exitoso</p>
          ) : (
            ""
          )}
          <h1>{title.title}</h1>
          <p>{title.subtitle}</p>
        </div>
        <div className={styles.orderNumber}>
          <p>Número de pedido</p>
          <p style={{ color: template.primaryColor }}>
            {order ? order.number : "--"}
          </p>
        </div>
        <div className="line" />
        <OrderReviewProgressBar order={order} template={template} />
        <div className="line" />
        <div className={styles.cardContainer}>
          {order
            ? order.items.map((item) => (
                <OrderReviewCard key={item.id} item={item} />
              ))
            : ""}
        </div>
        <OrderConfirmationTotal order={order} />
        <div className={styles.orderInfo}>
          <h3>Informaion de envío</h3>
          <p>{order ? order.shipping.name : ""}</p>
          <p>
            {order
              ? `${order.shipping.address1}, ${order.shipping.address2}`
              : ""}
          </p>
          <p>
            {order
              ? `${order.shipping.city}, ${order.shipping.state}, ${order.shipping.country}, ${order.shipping.zip}`
              : ""}
          </p>
          <p> {order ? `${order.shipping.phone}` : ""}</p>
        </div>
        <div className={styles.orderInfo}>
          <h3>Informaion de Pago</h3>
          <div style={{ display: "flex" }}>
            {renderCardLogo()}
            <div>
              <p>Terminación en {order ? order.billing.card.last4 : "--"}</p>
              <p>
                Expiración en{" "}
                {order
                  ? `${order.billing.card.exp_month} / ${order.billing.card.exp_year}`
                  : ""}
              </p>
            </div>
          </div>
        </div>
        <div className="line" />
        <Link href={"/"}>
          <LoadingButton
            action={() => returnHome()}
            name="Seguir comprando"
            width="100%"
            template={template}
          />
        </Link>
      </div>
    </div>
  );
}
