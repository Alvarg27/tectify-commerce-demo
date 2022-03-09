import React from "react";
import styles from "../styles/ProductCard.module.css";
import Image from "next/image";
import { useState } from "react";
import Link from "next/link";

export default function ProductCard({ product }) {
  const [imageHover, setImageHover] = useState(false);
  return (
    <div className={styles.productCard}>
      <Link href={`/productos/${product.slug}`}>
        <div className={styles.container}>
          <img
            onMouseOver={() => {
              setImageHover(true);
            }}
            onMouseOut={() => setImageHover(false)}
            src={
              imageHover
                ? product.images[1].file.url
                : product.images[0].file.url
            }
          />
          <div className={styles.textContainer}>
            <div className={styles.column}>
              <p className={styles.name}>{product.name}</p>
              <p className={styles.price}>${product.price}</p>
            </div>
          </div>
        </div>
      </Link>
    </div>
  );
}
