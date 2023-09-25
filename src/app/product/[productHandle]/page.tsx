"use client";

import React, { useEffect, useState } from "react";

import ProductPrice from "@/components/single-product/price/ProductPrice";
import ProductImage from "@/components/single-product/images/ProductImage";
import ProductVariants from "@/components/single-product/variants/ProductVariants";
import QuantitySelector from "@/components/single-product/quantity-selector/QuantitySelector";
import TheAccordion from "@/components/single-product/accordion/Accordion";
import TheButton from "@/components/ui/TheButton";
import { useShopifyContext } from "@/app/context/store";

type Props = {
  params: { productHandle: string };
};

export default function ProductPage({ params }: Props) {
  const { product, fetchProductWithHandle, addItemToCheckout } =
    useShopifyContext();
  const [selectedVariantId, setSelectedVariantId] = useState("");
  const [quantity, setQuantity] = useState(1);

  useEffect(() => {
    fetchProductWithHandle(params.productHandle);
  }, [params.productHandle]);

  useEffect(() => {
    if (product?.variants && product.variants.length === 1) {
      setSelectedVariantId(product?.variants[0]?.id);
    }
  }, [product]);

  const addItemToCartHandler = () => {
    console.log("addItemToCartHandler called");
    if (selectedVariantId) {
      addItemToCheckout(selectedVariantId, quantity);
      setQuantity(1);
    } else {
      console.log("Please select a variant before adding to cart.");
      return null;
    }
  };

  if (!product) {
    return <p>No product...</p>;
  }

  if (!product.variants) {
    return <p>No variants available for this product</p>;
  }
  // console.log("product.variants:", product);
  return (
    <div className="flex flex-col lg:flex-row justify-center items-center gap-10 p-[5rem] bg-[#fafafa] w-screen">
      <div className="flex  flex-col gap-10">
        <div className="flex flex-col">
          <ProductImage
            images={product?.images}
            available={product?.availableForSale}
          />
          <div className="mt-[100px] hidden lg:flex">
            <TheAccordion metafields={product.metafields} />
          </div>
        </div>
      </div>
      <div className="flex flex-col relative items-center lg:items-start lg:left-[50px] lg:w-[400px] gap-10">
        <div className="flex flex-col items-center gap-3">
          <p className="text-xl tracking-wide uppercase">{product?.title}</p>
          <div className="flex items-center justify-start gap-5 border-b pt-10 pb-5">
            <ProductPrice product={product} />
          </div>
        </div>
        <div className="items-center justify-center flex-wrap">
          <ProductVariants
            variants={product.variants}
            selectedVariantId={selectedVariantId}
            onVariantSelect={(variantId: any) => {
              setSelectedVariantId(variantId);
              console.log("hello", variantId);
            }}
          />
        </div>
        <div>
          <QuantitySelector quantity={quantity} setQuantity={setQuantity} />
        </div>
        <div className="flex flex-col justify-center items-center gap-[3rem] w-[400px]">
          <TheButton
            label={product.availableForSale ? "Add to cart" : "Sold out"}
            onClick={selectedVariantId ? addItemToCartHandler : undefined}
            disabled={!product.availableForSale || !selectedVariantId}
          />
          <p className="text-sm tracking-wide leading-6 text-center lg:text-left">
            {product.metafields[3]?.value}
          </p>
          <div className="flex lg:hidden">
            <TheAccordion metafields={product.metafields} />
          </div>
        </div>
      </div>
    </div>
  );
}
