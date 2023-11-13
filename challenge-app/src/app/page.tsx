"use client";
import styled from "styled-components";
import Image from "next/image";
import cartIcon from "@/assets/icons/cart.svg";
import cartIconMin from "@/assets/icons/cart-min.svg";
import Product from "../components/product/product";
import { useEffect, useState } from "react";
import Cart from "@/components/cart/cart";

import { QueryClient, QueryClientProvider, useQuery } from "react-query";
import { ProductGrid } from "@/components/product/product-grid";
import { CartProvider } from "@/context/cart-context";
import CartButton from "@/components/cart/cart-button";

const Container = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: 0 auto;
  position: relative;
`;
const Header = styled.header`
  width: 100%;
  height: 101px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: var(--primary);
  color: var(--font-color);
`;
const LogoContainer = styled.div`
  color: var(--white);
  font-size: 1.25rem;
  font-style: normal;
  font-weight: 300;
  line-height: 19px;
  display: flex;
  align-items: baseline;
  justify-content: center;
  gap: 0.5rem;
  margin-left: 4.063rem;
  @media (max-width: 768px) {
    margin-left: 1.25rem;
    font-size: 1rem;
  }
`;
const Logo = styled.h1`
  font-size: 2.5rem;
  font-weight: 600;
  @media (max-width: 768px) {
    font-size: 2rem;
  }
`;

const Footer = styled.footer`
  width: 100%;
  height: 34px;
  background-color: var(--footer-color);
  color: var(--black);
  text-align: center;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-top: 172px;
  align-self: end;
  @media (max-width: 768px) {
    margin-top: 38px;
  }
`;

export default function Home() {
  const queryClient = new QueryClient();
  const [itemCount, setItemCount] = useState(0);
  const [cartItems, setCartItems] = useState<Product[]>([]);
  const [windowWidth, setWindowWidth] = useState(0);
  const [isCartOpen, setIsCartOpen] = useState(false);

  useEffect(() => {
    function handleResize() {
      setWindowWidth(window.innerWidth);
    }

    window.addEventListener("resize", handleResize);

    setWindowWidth(window.innerWidth);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);


  const handleItemCount = (count: number) => {
    setItemCount(count);
  };

  const handleCartOpen = () => {
    setIsCartOpen(!isCartOpen);
  };

  const handleCartItems = (items: Product[]) => {
    setCartItems(items);
  };

  const handleRemoveFromCart = (productId: string) => {
    setCartItems(cartItems.filter((item) => item.id !== productId));
    setItemCount((prevCount) => prevCount - 1)
  };

  return (
    <Container>
      <CartProvider>
        <Cart
          onClose={handleCartOpen}
          onRemoveProduct={handleRemoveFromCart}
        />
      <Header>
        <LogoContainer>
          <Logo>MKS</Logo>Sistemas
        </LogoContainer>
        <CartButton/>
      </Header>
      <QueryClientProvider client={queryClient}>
        <ProductGrid itemsCount={handleItemCount} itemsList={handleCartItems} />
      </QueryClientProvider>
      </CartProvider>
      <Footer>
        <p>MKS sistemas © Todos os direitos reservados</p>
      </Footer>
    </Container>
  );
}
