// CartContext.tsx
import Product from '@/components/product/product';
import React, { createContext, useContext, useState, ReactNode } from 'react';

export interface ProductCartItem {
  product: Product;
  quantity: number;
}

export interface CartContextType {
  cartItems: ProductCartItem[];
  addToCart: (product: Product) => void;
  removeFromCart: (productId: string) => void;
  updateCartItemQuantity: (productId: string, quantity: number) => void;
  totalItems: number;
  totalPrice: number;
  itemCount: number; 
  isCartOpen: boolean; 
  setIsCartOpen: (open: boolean) => void; 
}

export const CartContext = createContext<CartContextType | undefined>(undefined);

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};

interface CartProviderProps {
  children: ReactNode;
}

export const CartProvider: React.FC<CartProviderProps> = ({ children }) => {
  const [cartItems, setCartItems] = useState<ProductCartItem[]>([]);
  const [itemCount, setItemCount] = useState(0);
  const [isCartOpen, setIsCartOpen] = useState(false);

  const addToCart = (product: Product) => {
    const existingItem = cartItems.find((item) => item.product.id === product.id);

    if (existingItem) {
      updateCartItemQuantity(existingItem.product.id, existingItem.quantity + 1);
    } else {
      setCartItems([...cartItems, { product, quantity: 1 }]);
    }
    setItemCount(itemCount + 1); 
  };

  const removeFromCart = (productId: string) => {
    setCartItems(cartItems.filter((item) => item.product.id !== productId));
    setItemCount(itemCount - 1); 
  };

  const updateCartItemQuantity = (productId: string, quantity: number) => {
    setCartItems((prevItems) =>
      prevItems.map((item) =>
        item.product.id === productId ? { ...item, quantity } : item
      )
    );
  };

  const totalItems = cartItems.reduce((total, item) => total + item.quantity, 0);

  const totalPrice = cartItems.reduce((total, item) => {
    const itemPrice = parseFloat(item.product.price) * item.quantity;
    return total + itemPrice;
  }, 0);

  return (
    <CartContext.Provider
      value={{ cartItems, addToCart, removeFromCart, updateCartItemQuantity, totalItems, totalPrice, itemCount, isCartOpen, setIsCartOpen }}
    >
      {children}
    </CartContext.Provider>
  );
};
