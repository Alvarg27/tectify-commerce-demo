import React from "react";
import { useState } from "react";
import { useEffect } from "react";
import styles from "../styles/SingleProduct.module.css";
import OptionSelector from "./OptionSelector";
import swell, { products } from "swell-js";
import Link from "next/link";
import LoadingButton from "./LoadingButton";

export default function SingleProduct({ product, fetchCart, setSlideCart }) {
  const [loading, setLoading] = useState();
  const [inStock, setInStock] = useState();
  const [selectedVariant, setSelectedVariant] = useState();
  const [selectedOptions, setSelectedOptions] = useState({
    Color: "Negro",
    Talla: "Chico",
  });

  const handleAddToCart = async () => {
    setLoading(true);
    if (inStock) {
      const response = await swell.cart.addItem({
        product_id: product.id,
        quantity: 1,
        options: {
          ...selectedOptions,
        },
      });
      fetchCart();
      setSlideCart(true);
      console.log(response);
    }
    setLoading(false);
  };

  const checkStock = () => {
    if (
      selectedVariant &&
      selectedVariant.stock_level === 0 &&
      product.stock_tracking === true &&
      product.stock_purchasable === false
    ) {
      setInStock(false);
    } else {
      setInStock(true);
    }
  };

  const updateOptions = (name, value) => {
    selectedOptions[name] = value;
    setSelectedOptions({ ...selectedOptions });
  };

  const fetchVariants = async () => {
    const response = await swell.products.variation(product, selectedOptions);
    setSelectedVariant(response);
  };

  useEffect(() => {
    fetchVariants();
  }, [selectedOptions]);

  useEffect(() => {
    checkStock();
  }, [selectedVariant]);

  return (
    <div className={styles.singleProduct}>
      <div className={styles.container}>
        <div className={styles.gallery}>
          <img
            src={
              selectedVariant
                ? selectedVariant.images[0].file.url
                : product.images[0].file.url
            }
          />
        </div>
        <div className={styles.dataContainer}>
          <div className={styles.textContainer}>
            <div className={styles.breadcrumbs}>
              <Link href="/">
                <p>Inicio</p>
              </Link>
              <p>/</p>
              <Link href="/">
                <p>Productos</p>
              </Link>
              <p>/</p>
              <p style={{ color: "#0077ff" }}>{product.name}</p>
            </div>
            <div className={styles.row}>
              <h3 className={styles.name}>{product.name}</h3>
              <h3 className={styles.price}>
                ${selectedVariant ? selectedVariant.price : product.price}
              </h3>
            </div>
            {product.options.map((option) => (
              <OptionSelector
                key={option.id}
                option={option}
                updateOptions={updateOptions}
                selectedOptions={selectedOptions}
              />
            ))}
            <p className={styles.label}>Descripción</p>
            <p>{product.description}</p>
            <LoadingButton
              loading={loading}
              name="Añadir al carrito"
              width="100%"
              action={handleAddToCart}
              loadingText="Añadiendo"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
