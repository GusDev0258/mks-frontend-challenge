import React, { useState, useEffect } from "react";
import styled from "styled-components";
import Image from "next/image";
import cartIcon from "@/assets/icons/cart.svg";
import cartIconMin from "@/assets/icons/cart-min.svg";
import { useCart } from "@/context/cart-context";

const CartButtonContainer = styled.button`
  width: 90px;
  height: 45px;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 1rem;
  border-radius: 8px;
  background: var(--white);
  margin-right: 5.5rem;
  cursor: pointer;
  border: none;
  @media (max-width: 768px) {
    margin-right: 1.438rem;
    width: 52px;
    height: 26px;
  }
`;

const ItemCount = styled.p`
  color: var(--black);
  font-size: 18px;
  font-style: normal;
  font-weight: 700;
  line-height: normal;
  @media (max-width: 768px) {
    font-size: 14px;
  }
`;

const CartButton = () => {
  const { itemCount, setIsCartOpen } = useCart();
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);

  useEffect(() => {
    function handleResize() {
      setWindowWidth(window.innerWidth);
    }

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const handleCartOpen = () => {
    setIsCartOpen(true);
  };

  return (
    <CartButtonContainer onClick={handleCartOpen} data-testid="cart-button">
      {windowWidth >= 768 ? (
        <Image src={cartIcon} alt="cart icon" />
      ) : (
        <Image src={cartIconMin} alt="cart icon" />
      )}
      <ItemCount data-testid="cart-button-item-count">{itemCount}</ItemCount>
    </CartButtonContainer>
  );
};

export default CartButton;
