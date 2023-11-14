import React from "react";
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom/";
import CartItem from "@/components/cart/cart-item";
import Product from "@/components/product/product";
import { CartContext, CartProvider } from '../../../src/context/cart-context';

describe("Cart Item Component", () => {

  const productMock: Product = {
    id: "1",
    name: "Test Product",
    brand: "Test",
    price: "100",
    photo: "https://via.placeholder.com/150",
    description: "Test description",
  };

  it("Should render the cart item component", () => {
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
      <CartItem
        product={productMock}
        onRemoveProduct={() => {}}
        onItemCountChange={() => {}}
      />
      </CartContext.Provider>
    </CartProvider>
    );
    expect(screen.getByTestId("cart-item-component")).toBeInTheDocument();
  });

  it("Should render the cart item component with the correct product name", () => {
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
      <CartItem
        product={productMock}
        onRemoveProduct={() => {}}
        onItemCountChange={() => {}}
      />
      </CartContext.Provider>
    </CartProvider>
    );
    const productPrice = screen.getByTestId("cart-item-price");
    expect(productPrice).toBeInTheDocument();
    expect(productPrice).toHaveTextContent(`R$${productMock.price}`)
  });

  it("Should render the cart item component with the correct product price", () => {
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
      <CartItem
        product={productMock}
        onRemoveProduct={() => {}}
        onItemCountChange={() => {}}
      />
      </CartContext.Provider>
    </CartProvider>
    );
    expect(screen.getByText("R$100")).toBeInTheDocument();
  });

  it("Should render the cart item component with the correct product quantity", () => {
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
      <CartItem
        product={productMock}
        onRemoveProduct={() => {}}
        onItemCountChange={() => {}}
      />
      </CartContext.Provider>
    </CartProvider>

    );
    const itemCount = screen.getByTestId("cart-item-count-quantity");
    expect(itemCount).toHaveTextContent("1");
  });

  it("Should render the cart item component with the correct product photo alt text", () => {
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
      <CartItem
        product={productMock}
        onRemoveProduct={() => {}}
        onItemCountChange={() => {}}
      />
      </CartContext.Provider>
    </CartProvider>
    );
    expect(screen.getByAltText("Test Product")).toBeInTheDocument();
  });

  it("Should remove the item when the remove button is clicked", () => {
    const removeProduct = jest.fn();
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
      <CartItem
        product={productMock}
        onRemoveProduct={removeProduct}
        onItemCountChange={() => {}}
      />
      </CartContext.Provider>
    </CartProvider>
    );
    screen.getByTestId("cart-item-remove-button").click();
    expect(removeProduct).toHaveBeenCalledTimes(1);
  });


})