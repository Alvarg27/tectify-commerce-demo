import Head from "next/head";
import Image from "next/image";
import ProductCard from "../components/ProductCard";
import ProductsList from "../components/ProductsList";
import styles from "../styles/Home.module.css";
import react, { useEffect } from "react";

export default function Home({ products, setIsCheckout }) {
  useEffect(() => {
    setIsCheckout(false);
  }, []);
  return (
    <div className={styles.home}>
      <ProductsList products={products} />
    </div>
  );
}
