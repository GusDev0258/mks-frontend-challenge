"use client";
import styled from "styled-components";
import Product from "../product/product";
import Image from "next/image";
import { CountButton } from "./count-button";
import { useState } from "react";

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
`;

const ProductName = styled.p`
  color: var(--font-color);
  font-size: 13px;
  font-style: normal;
  font-weight: 400;
  line-height: 17px;
  max-width: 16ch;
  margin-left: 20px;
`;

const ProductPrice = styled.p`
  color: var(--black);
  font-size: 14px;
  font-style: normal;
  font-weight: 700;
  line-height: 17px;
`;

type CartItemProps = {
  product: Product;
  onRemoveProduct: (productId: string) => void;
  onItemCountChange: (product: Product, newCount: number) => void;
};

export const CartItem = ({ product, onRemoveProduct, onItemCountChange }: CartItemProps) => {
  const [itemCount, setItemCount] = useState(1);
  const itemPrice = (parseFloat(product.price) * itemCount).toFixed(2);

  const handleDecrease = () => {
    if (itemCount > 1) {
      setItemCount(itemCount - 1);
      onItemCountChange(product, itemCount - 1);
    }
  };

  const handleIncrease = () => {
    setItemCount(itemCount + 1);
    onItemCountChange(product, itemCount + 1);
  };

  return (
    <CartItemContainer>
      <Image
        src={product.photo}
        alt={product.name}
        width={50}
        height={60}
      />
      <ProductName>{product.name}</ProductName>
      <CountButton
        itemCount={itemCount}
        onDecrease={handleDecrease}
        onIncrease={handleIncrease}
      />
      <ProductPrice>R${itemPrice.replace(".00", "")}</ProductPrice>
      <CartItemRemoveButton
        onClick={() => onRemoveProduct(product.id)}
      >
        X
      </CartItemRemoveButton>
    </CartItemContainer>
  );
};

export default CartItem;
