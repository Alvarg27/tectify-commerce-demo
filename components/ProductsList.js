import styles from "../styles/ProductsList.module.css";
import React from "react";
import ProductCard from "./ProductCard";

export default function ProductsList({ products, template }) {
  return (
    <div className={styles.productsList}>
      <div className={styles.container}>
        {products
          ? products.results.map((product) => (
              <ProductCard
                key={product.id}
                product={product}
                template={template}
              />
            ))
          : ""}
      </div>
    </div>
  );
}
