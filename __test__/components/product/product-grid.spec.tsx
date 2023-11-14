import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import "@testing-library/jest-dom/";
import { CartContext, CartProvider } from "@/context/cart-context";
import { ProductGrid } from '@/components/product/product-grid';
import Product from '@/components/product/product';
import { QueryClient, QueryClientProvider } from 'react-query';
import { act } from 'react-dom/test-utils';

describe("Product grid list component", () => {

  const productListFnMock: (products: Product[]) => void = (products) => {}
  const queryClient = new QueryClient();
  const productListMock: Product[] = [];

  it("Should be able to render the product list properly", () => {
    act(() => {
      render(
        <QueryClientProvider client={queryClient}>
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
            <ProductGrid itemsList={productListFnMock} />
          </CartContext.Provider>
        </CartProvider>
        </QueryClientProvider>
      );
    })

    expect(screen.getByTestId("product-grid-list")).toBeInTheDocument();
  })
})