import React from "react";
import styles from "../styles/ProductCard.module.css";
import Image from "next/image";
import { useState } from "react";
import Link from "next/link";
import { useEffect } from "react";

export default function ProductCard({ product, template }) {
  const [imageHover, setImageHover] = useState(false);
  const [imageSrc, setImageSrc] = useState(product.images[0].file.url);

  useEffect(() => {
    if (imageHover && product.images.length > 1) {
      setImageSrc(product.images[1].file.url);
    } else {
      setImageSrc(product.images[0].file.url);
    }
  }, [imageHover]);
  return (
    <div className={styles.productCard}>
      <Link href={`/productos/${product.slug}`}>
        <div className={styles.container}>
          <img
            onMouseOver={() => {
              setImageHover(true);
            }}
            onMouseOut={() => setImageHover(false)}
            src={imageSrc}
          />
          <div className={styles.textContainer}>
            <div
              className={styles.column}
              style={{ color: template.textColor }}
            >
              <p className={styles.name}>{product.name}</p>
              <p className={styles.price}>${product.price}</p>
            </div>
          </div>
        </div>
      </Link>
    </div>
  );
}
