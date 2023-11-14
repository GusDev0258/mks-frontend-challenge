"use client"
import { requestProducts } from "@/infra/http/request-products";


import styled from "styled-components";
import { useQuery } from "react-query";
import Product from "./product";
import { useEffect, useState } from "react";
import Skeleton from "react-loading-skeleton";
import { useCart } from "@/context/cart-context";

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

export const ProductGrid = ({itemsList}: ProductGridProps) => {
  
  const { isLoading, error, data: products } = useQuery({
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
  },[cartItems])

  return (
  <ProductGridContainer data-testid="product-grid-list">
    {isLoading && (<Skeleton count={8} width={285} height={218} />)}
    {products && products.map((product: Product) => (
      <Product key={product.id} product={product} onAddToCart={handleAddToCart} />
    ))}
  </ProductGridContainer>
  );
};
