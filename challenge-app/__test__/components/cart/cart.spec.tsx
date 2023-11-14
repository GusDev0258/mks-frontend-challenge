import React from "react";
import { render, screen, fireEvent } from '@testing-library/react';
import "@testing-library/jest-dom/";
import { CartContext, CartProvider, ProductCartItem } from "@/context/cart-context";
import Cart from "@/components/cart/cart";
import Product from "@/components/product/product";

describe("Cart Button Component", () => {
  it("Should render the cart component properly when cart is open", () => {
    render(
      <CartProvider>
        <CartContext.Provider
          value={{
            cartItems: [],
            addToCart: () => {},
            removeFromCart: () => {},
            updateCartItemQuantity: () => {},
            totalItems: 0,
            totalPrice: 0,
            itemCount: 0,
            isCartOpen: true,
            setIsCartOpen: () => {},
            getProductCount: () => 1,
          }}
        >
          <Cart />
        </CartContext.Provider>
      </CartProvider>
    );
    expect(screen.getByTestId("cart")).toBeInTheDocument();
  });

  it("Should not render the cart component when cart is closed", () => {
    render(
      <CartProvider>
        <CartContext.Provider
          value={{
            cartItems: [],
            addToCart: () => {},
            removeFromCart: () => {},
            updateCartItemQuantity: () => {},
            totalItems: 0,
            totalPrice: 0,
            itemCount: 0,
            isCartOpen: false,
            setIsCartOpen: () => {},
            getProductCount: () => 1,
          }}
        >
          <Cart />
        </CartContext.Provider>
      </CartProvider>
    );
    expect(screen.queryByTestId("cart")).not.toBeInTheDocument();
  });

  const productMock: Product = {
    id: "1",
    name: "Test Product",
    brand: "Test",
    price: "100",
    photo: "https://via.placeholder.com/150",
    description: "Test description",
  };
  const productMock2: Product = {
    id: "2",
    name: "Test Product",
    brand: "Test",
    price: "100",
    photo: "https://via.placeholder.com/150",
    description: "Test description",
  };

  const productTest: ProductCartItem = {
    product: productMock, quantity: 1,
  };

  const productTestTwo: ProductCartItem = {
    product: productMock2, quantity: 1,
  };

  it("Should render the cart component with 2 items", () => {
    render(
      <CartProvider>
        <CartContext.Provider
          value={{
            cartItems: [
              productTest,
              productTestTwo,
            ],
            addToCart: () => {},
            removeFromCart: () => {},
            updateCartItemQuantity: () => {},
            totalItems: 2,
            totalPrice: 0,
            itemCount: 2,
            isCartOpen: true,
            setIsCartOpen: () => {},
            getProductCount: () => 1,
          }}
        >
          <Cart />
        </CartContext.Provider>
      </CartProvider>
    );
    const itemsList = screen.getByTestId("items-list");
    expect(itemsList).toBeInTheDocument();
    expect(itemsList.childElementCount).toBe(2);
  });

  it("Should render the cart with total price of 200", () => {
    render(
      <CartProvider>
        <CartContext.Provider
          value={{
            cartItems: [
              productTest,
              productTestTwo,
            ],
            addToCart: () => {},
            removeFromCart: () => {},
            updateCartItemQuantity: () => {},
            totalItems: 2,
            totalPrice: 200,
            itemCount: 2,
            isCartOpen: true,
            setIsCartOpen: () => {},
            getProductCount: () => 1,
          }}
        >
          <Cart />
        </CartContext.Provider>
      </CartProvider>
    );
    const totalPrice = screen.getByTestId("cart-total-price");
    expect(totalPrice).toBeInTheDocument();
    expect(totalPrice.textContent).toBe("Total: R$200");
  });

  it("Should close the cart when close button is clicked", () => {
    const setIsCartOpen = jest.fn();
    render(
      <CartProvider>
        <CartContext.Provider
          value={{
            cartItems: [
              productTest,
              productTestTwo,
            ],
            addToCart: () => {},
            removeFromCart: () => {},
            updateCartItemQuantity: () => {},
            totalItems: 2,
            totalPrice: 200,
            itemCount: 2,
            isCartOpen: true,
            setIsCartOpen: () => setIsCartOpen(),
            getProductCount: () => 1,
          }}
        >
          <Cart />
        </CartContext.Provider>
      </CartProvider>
    );
    const closeButton = screen.getByTestId("cart-close-button");
    expect(closeButton).toBeInTheDocument();
    fireEvent.click(closeButton);
    expect(setIsCartOpen).toHaveBeenCalled();
  });

  it("Should render the cart item properly when cart is open", () => {
    render(
      <CartProvider>
        <CartContext.Provider
          value={{
            cartItems: [
              productTest,
            ],
            addToCart: () => {},
            removeFromCart: () => {},
            updateCartItemQuantity: () => {},
            totalItems: 1,
            totalPrice: 200,
            itemCount: 1,
            isCartOpen: true,
            setIsCartOpen: () => {},
            getProductCount: () => 1,
          }}
        >
          <Cart />
        </CartContext.Provider>
      </CartProvider>
    );
    expect(screen.getByTestId("cart-item-component")).toBeInTheDocument();
  })

});
