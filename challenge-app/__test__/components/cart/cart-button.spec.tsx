import React from "react";
import { render, screen } from "@testing-library/react";
import CartButton from "@/components/cart/cart-button";
import "@testing-library/jest-dom/";
import { CartContext, CartProvider } from "@/context/cart-context";
import Cart from "@/components/cart/cart";

describe("Cart Button Component", () => {
  it("Should render the cart button properly", () => {
    render(
      <CartProvider>
        <CartButton />
      </CartProvider>
    );
    expect(screen.getByTestId("cart-button")).toBeInTheDocument();
  });

  it("Should render the cart button with 0 items", () => {
    render(
      <CartProvider>
        <CartButton />
      </CartProvider>
    );
    expect(screen.getByTestId("cart-button-item-count")).toHaveTextContent("0");
  });

  it("Should render the cart button with 1 item", () => {
    render(
      <CartProvider>
        <CartContext.Provider
          value={{
            cartItems: [],
            addToCart: () => {},
            removeFromCart: () => {},
            updateCartItemQuantity: () => {},
            totalItems: 1,
            totalPrice: 0,
            itemCount: 1,
            isCartOpen: false,
            setIsCartOpen: () => {},
            getProductCount: () => 1,
          }}
        >
          <CartButton />
        </CartContext.Provider>
      </CartProvider>
    );
    expect(screen.getByTestId("cart-button-item-count")).toHaveTextContent("1");
  });

  it("Should render the cart when cart button is clicked", () => {
    render(
      <CartProvider>
        <CartContext.Provider
          value={{
            cartItems: [],
            addToCart: () => {},
            removeFromCart: () => {},
            updateCartItemQuantity: () => {},
            totalItems: 1,
            totalPrice: 0,
            itemCount: 1,
            isCartOpen: true,
            setIsCartOpen: () => {},
            getProductCount: () => 1,
          }}
        >
          <CartButton />
          <Cart />
        </CartContext.Provider>
      </CartProvider>
    );
    screen.getByTestId("cart-button").click();
    expect(screen.getByTestId("cart")).toBeInTheDocument();
  });
});
