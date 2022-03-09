import Head from "next/head";
import Image from "next/image";
import ProductCard from "../components/ProductCard";
import ProductsList from "../components/ProductsList";
import styles from "../styles/Home.module.css";

export default function Home({ products }) {
  return (
    <div className={styles.home}>
      <ProductsList products={products} />
    </div>
  );
}
