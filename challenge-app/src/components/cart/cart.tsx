import styled from "styled-components";
import Product from "../product/product";
import CartItem from "./cart-item";
import { useEffect, useState } from "react";
import { ProductCartItem, useCart } from "@/context/cart-context";

const CartContainer = styled.section`
  width: 486px;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: end;
  position: absolute;
  right: 0;
  bottom: 0;
  top: 0;
  background-color: var(--primary);
  box-shadow: -5px 0px 6px 0px rgba(0, 0, 0, 0.13);
  @media (max-width: 768px) {
    width: 330px;
  }
`;
const CartHeader = styled.header`
  width: 80%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  font-size: 27px;
  font-weight: 700;
  font-style: normal;
  line-height: normal;
  color: var(--white);
  margin-left: 47px;
  margin-right: 22px;
  @media (max-width: 768px) {
    margin-top: 1.5rem;
  }
`;
const CartCloseButton = styled.button`
  color: var(--white);
  font-size: 28px;
  font-weight: 400;
  line-height: 15px;
  background-color: var(--black);
  border-radius: 50%;
  width: 38px;
  height: 38px;
  border: none;
  cursor: pointer;
`;

const CartItemList = styled.ul`
  width: 100%;
  height: 65%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: start;
  gap: 1.375rem;
  margin: 0;
  list-style: none;
  overflow-y: scroll;
  padding: 0.5rem;
  margin: 70px 47px 0 60px;
`;

const CheckoutButton = styled.button`
  width: 100%;
  height: 97px;
  color: var(--white);
  background: var(--black);
  border: none;
  font-size: 28px;
  font-style: normal;
  font-weight: 700;
  line-height: 15px;
  text-transform: uppercase;
  margin: 0 auto;
  cursor: pointer;
`;

const TotalPrice = styled.p`
  width: 80%;
  color: var(--white);
  font-size: 28px;
  font-style: normal;
  font-weight: 700;
  line-height: 15px;
  margin: 42px 47px 42px 63px;
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

export const Cart = () => {
  const {
    cartItems,
    removeFromCart,
    updateCartItemQuantity,
    totalPrice,
    isCartOpen,
    setIsCartOpen,
  } = useCart();

  const handleItemCountChange = (product: Product, newCount: number) => {
    updateCartItemQuantity(product.id, newCount);
  };

  return (
    isCartOpen && (
      <CartContainer data-testid="cart">
        <CartHeader>
          <p>
            Carrinho <br /> de compras
          </p>
          <CartCloseButton
            onClick={() => setIsCartOpen(false)}
            data-testid="cart-close-button"
          >
            X
          </CartCloseButton>
        </CartHeader>
        <CartItemList data-testid="items-list">
          {cartItems &&
            cartItems.map((cartItem: ProductCartItem) => {
              return (
                <CartItem
                  product={cartItem.product}
                  key={cartItem.product.id}
                  onRemoveProduct={removeFromCart}
                  onItemCountChange={handleItemCountChange}
                />
              );
            })}
        </CartItemList>
        <TotalPrice data-testid="cart-total-price">
          Total: <span>R${totalPrice}</span>
        </TotalPrice>
        <CheckoutButton>Finalizar Compra</CheckoutButton>
      </CartContainer>
    )
  );
};

export default Cart;
