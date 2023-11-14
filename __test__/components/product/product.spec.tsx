import React from "react";
import { fireEvent, render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import { CartProvider } from "@/context/cart-context";
import Product from "@/components/product/product";
import { CartContext } from "../../../src/context/cart-context";

describe("Product card component", () => {
  const productMock: Product = {
    id: "1",
    name: "mock",
    price: "50",
    description: "mock product",
    photo: "https://via.placeholder.com/111x138",
    brand: "mock brand",
  };
  const onAddToCart = jest.fn();
  beforeEach(() => {
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
          <Product onAddToCart={onAddToCart} product={productMock} />
        </CartContext.Provider>
      </CartProvider>
    );
  })
  it("Should be able to render the product card component properly", () => {
    expect(screen.getByTestId("product")).toBeInTheDocument();
  });
  it("Should be able to add a product to the cart", () => {

    const buyButton = screen.getByTestId("product-buy");
    fireEvent.click(buyButton);
    expect(onAddToCart).toHaveBeenCalled();
  });

  it("Should be able to render the product photo", () => {
    const productPhoto = screen.getByTestId("product-photo");
    expect(productPhoto).toBeInTheDocument();
    expect(productPhoto).toHaveAttribute("alt", productMock.name);
  });

  it("Should be able to render the product name", () => {
    const productName = screen.getByTestId("product-name");
    expect(productName).toBeInTheDocument();
    expect(productName).toHaveTextContent(productMock.name);
  });
});
