"use client";
import styled from "styled-components";
import Product from "../product/product";
import Image from "next/image";
import { CountButton } from "./count-button";
import { useState } from "react";
import { useCart } from "@/context/cart-context";

const CartItemContainer = styled.li`
  width: 80%;
  height: 95px;
  border-radius: 8px;
  background: var(--white);
  box-shadow: var(----secondary-shadow);
  display: grid;
  grid-template-columns: 50px 113px 60px 60px;
  grid-gap: 1rem;
  align-items: center;
  justify-content: space-around;
  padding: 1.25rem;
  position: relative;
  @media (max-width: 768px) {
    grid-template-columns: 1fr;
    grid-template-rows: 1fr 1fr 1fr;
    height: 220px;
    justify-content: center;
    align-items: center;
  }
`;

const CartItemRemoveButton = styled.button`
  color: var(--white);
  font-size: 14px;
  font-weight: 400;
  line-height: 17px;
  background-color: var(--black);
  border-radius: 50%;
  width: 18px;
  height: 18px;
  position: absolute;
  top: -6px;
  right: -6px;
  border: none;
  cursor: pointer;
  @media (max-width: 768px) {
    background: transparent;
    font-size: 42px;
    top: 20px;
    right: 24px;
    color: var(--black);
  }
`;

const ProductName = styled.p`
  color: var(--font-color);
  font-size: 13px;
  font-style: normal;
  font-weight: 400;
  line-height: 17px;
  margin-left: 20px;
  @media (max-width: 768px) {
    font-size: 16px;
    line-height: 19px;
    grid-row: 2;
    grid-column: 1/3;
    width: 100%;
  }
`;

const ProductPrice = styled.p`
  color: var(--black);
  font-size: 14px;
  font-style: normal;
  font-weight: 700;
  line-height: 17px;
  @media (max-width: 768px) {
    color: var(--white);
    font-size: 15px;
    font-style: normal;
    font-weight: 700;
    line-height: 15px;
    background: var(--grey);
    width: 84px;
    height: 35px;
    border-radius: 5px;
    display: flex;
    align-items: center;
    justify-content: center;
    grid-row: 3;
  }
`;
const ImageContainer = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  @media (max-width: 768px) {
    grid-row: 1;
    grid-column: 1/3;
  }
`;

type CartItemProps = {
  product: Product;
  onRemoveProduct: (productId: string) => void;
  onItemCountChange: (product: Product, newCount: number) => void;
};

export const CartItem = ({ product, onRemoveProduct }: CartItemProps) => {
  const { getProductCount } = useCart();
  const itemCount = getProductCount(product.id);
  const itemPrice = (parseFloat(product.price) * itemCount).toFixed(2);

  const handleRemoveProduct = () => {
    onRemoveProduct(product.id);
  };

  return (
    <CartItemContainer data-testid="cart-item-component">
      <ImageContainer>
        <Image
          src={product.photo}
          alt={product.name}
          width={window.innerWidth >= 768 ? 50 : 90}
          height={window.innerWidth >= 768 ? 60 : 105}
        />
      </ImageContainer>

      <ProductName>{product.name}</ProductName>
      <CountButton productId={product.id} />
      <ProductPrice>R${itemPrice.replace(".00", "")}</ProductPrice>
      <CartItemRemoveButton
        onClick={handleRemoveProduct}
        data-testid="cart-item-remove-button"
      >
        X
      </CartItemRemoveButton>
    </CartItemContainer>
  );
};

export default CartItem;
