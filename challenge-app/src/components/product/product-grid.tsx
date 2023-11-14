"use client";
import { requestProducts } from "@/infra/http/request-products";

import styled from "styled-components";
import { useQuery } from "react-query";
import Product from "./product";
import { useEffect, useState } from "react";
import Skeleton, { SkeletonTheme } from "react-loading-skeleton";
import { useCart } from "@/context/cart-context";
import "react-loading-skeleton/dist/skeleton.css";

const ProductGridContainer = styled.main`
  max-width: 1000px;
  max-height: 600px;
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  flex-wrap: wrap;
  flex: 1;
  gap: 1.375rem;
  margin-top: 116px;
  overflow-y: scroll;
  padding: 0px 0.5rem;
  @media (max-width: 1024px) {
    grid-template-columns: repeat(3, 1fr);
  }
  @media (max-width: 768px) {
    grid-template-columns: 1fr;
    margin-top: 18px;
  }
`;

interface ProductGridProps {
  itemsList: (products: Product[]) => void;
}

export const ProductGrid = ({ itemsList }: ProductGridProps) => {
  const {
    isLoading,
    error,
    data: products,
  } = useQuery({
    queryFn: async () => await requestProducts(),
    queryKey: "cart-products",
  });

  const [cartItems, setCartItems] = useState<Product[]>([]);

  const { addToCart } = useCart();

  const handleAddToCart = (product: Product) => {
    addToCart(product);
  };

  useEffect(() => {
    itemsList(cartItems);
  }, [cartItems]);

  return (
    <ProductGridContainer data-testid="product-grid-list">
      {isLoading ? (
        <div style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          height: "100%",
          width: "100%",
        }}>
        <div
          style={{
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "center",
            gap: "1rem",
            height: "600px",
            width: "1000px",
            overflowY: "scroll",
            flexWrap: "wrap",
          }}
        >
          <Skeleton width={218} height={285} enableAnimation={true} />
          <Skeleton width={218} height={285} enableAnimation={true} />
          <Skeleton width={218} height={285} enableAnimation={true} />
          <Skeleton width={218} height={285} enableAnimation={true} />
          <Skeleton width={218} height={285} enableAnimation={true} />
          <Skeleton width={218} height={285} enableAnimation={true} />
          <Skeleton width={218} height={285} enableAnimation={true} />
          <Skeleton width={218} height={285} enableAnimation={true} />
        </div>
        </div>
      ) : (
        products &&
        products.map((product: Product) => (
          <Product
            key={product.id}
            product={product}
            onAddToCart={handleAddToCart}
          />
        ))
      )}
    </ProductGridContainer>
  );
};
