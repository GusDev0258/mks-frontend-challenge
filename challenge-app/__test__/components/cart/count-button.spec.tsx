import React from "react";
import {
  act,
  fireEvent,
  render,
  screen,
  waitFor,
} from "@testing-library/react";
import "@testing-library/jest-dom/";
import { CartContext, CartProvider } from "@/context/cart-context";
import { CountButton } from "@/components/cart/count-button";
import Product from "@/components/product/product";

describe("Cart item count button component", () => {
  const productMock: Product = {
    id: "1",
    name: "Test Product",
    brand: "Test",
    price: "100",
    photo: "https://via.placeholder.com/150",
    description: "Test description",
  };
  it("Should render the cart item count button component", () => {
    render(
      <CartProvider>
        <CountButton productId={productMock.id} />
      </CartProvider>
    );
    expect(screen.getByTestId("cart-item-count-button")).toBeInTheDocument();
  });

  it("Should increase the item count when the increase button is clicked", async () => {
    let countMock = 0;
    const increaseMock = () => {
      return countMock++;
    };
    render(
      <CartProvider>
        <CartContext.Provider
          value={{
            cartItems: [],
            addToCart: () => {},
            removeFromCart: () => {},
            updateCartItemQuantity: () => increaseMock(),
            totalItems: 1,
            totalPrice: 0,
            itemCount: 1,
            isCartOpen: true,
            setIsCartOpen: () => {},
            getProductCount: () => increaseMock(),
          }}
        >
          <CountButton productId={productMock.id} />
        </CartContext.Provider>
      </CartProvider>
    );
    const itemCount = screen.getByTestId("cart-item-count-quantity");
    const increaseButton = screen.getByTestId("cart-item-increase-button");
    expect(increaseButton).toBeInTheDocument();
    expect(increaseButton).toHaveTextContent("+");
    increaseButton.click();
    expect(itemCount).toHaveTextContent("6");
  });
});
