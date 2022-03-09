import Link from "next/link";
import React from "react";
import swell from "swell-js";
import SingleProduct from "../../components/SingleProduct";

export const getStaticPaths = async () => {
  const response = await swell.products.list({
    expand: ["variants"],
  });
  const paths = response
    ? response.results.map((product) => {
        return {
          params: { slug: product.slug },
        };
      })
    : "";
  return {
    paths,
    fallback: false,
  };
};

export const getStaticProps = async (context) => {
  const slug = context.params.slug;
  const response = await swell.products.get(slug);
  const data = await response;
  return {
    props: { product: data },
  };
};

export default function ProductPage({ product, fetchCart, setSlideCart }) {
  return (
    <div>
      <SingleProduct
        product={product}
        fetchCart={fetchCart}
        setSlideCart={setSlideCart}
      />
    </div>
  );
}
