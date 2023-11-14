"use client";
import { useCart } from "@/context/cart-context";
import { useState } from "react";
import styled from "styled-components";

const CountButtonContainer = styled.div`
  width: 50px;
  height: 19px;
  border-radius: 4px;
  border: 0.3px solid #bfbfbf;
  background: var(--white);
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  @media (max-width: 768px) {
    width: 97px;
    height: 35px;
    grid-row: 3;
    gap: 0.5rem;
    align-items: baseline;
  }
`;

const CountButtonDecrease = styled.button`
  color: var(--black);
  font-size: 8px;
  font-style: normal;
  font-weight: 400;
  line-height: normal;
  border: none;
  width: 20px;
  height: 100%;
  background: transparent;
  display: flex;
  align-items: center;
  justify-content: center;
  border-right: 0.3px solid #bfbfbf;
  @media (max-width: 768px) {
    font-size: 22px;
  }
`;

const CountButtonIncrease = styled.button`
  color: var(--black);
  font-size: 8px;
  font-style: normal;
  font-weight: 400;
  line-height: normal;
  border: none;
  width: 20px;
  height: 100%;
  background: transparent;
  display: flex;
  align-items: center;
  justify-content: center;
  border-left: 0.3px solid #bfbfbf;
  @media (max-width: 768px) {
    font-size: 22px;
  }
`;

const CartItemCount = styled.p`
  color: var(--black);
  font-size: 8px;
  font-style: normal;
  font-weight: 400;
  line-height: normal;
  padding: 0 0.3rem;
  @media (max-width: 768px) {
    font-size: 20px;
  }
`;

const CountLabel = styled.p`
  color: var(--black);
  font-size: 5px;
  font-style: normal;
  font-weight: 400;
  line-height: normal;
  position: absolute;
  top: -10px;
  left: 0;
  @media (max-width: 768px) {
    display: none;
  }
`;

type CountButtonProps = {
  productId: string;
};

export const CountButton = ({ productId }: CountButtonProps) => {
  const { updateCartItemQuantity, getProductCount } = useCart();
  const productCount = getProductCount(productId);

  const handleDecrease = () => {
    if (productCount > 1) {
      updateCartItemQuantity(productId, productCount - 1);
    }
  };

  const handleIncrease = () => {
    updateCartItemQuantity(productId, productCount + 1);
  };

  return (
    <CountButtonContainer data-testid="cart-item-count-button">
      <CountLabel>Qtd:</CountLabel>
      <CountButtonDecrease
        onClick={handleDecrease}
        data-testid="cart-item-decrease-button"
      >
        -
      </CountButtonDecrease>
      <CartItemCount data-testid="cart-item-count-quantity">
        {productCount}
      </CartItemCount>
      <CountButtonIncrease
        onClick={handleIncrease}
        data-testid="cart-item-increase-button"
      >
        +
      </CountButtonIncrease>
    </CountButtonContainer>
  );
};
