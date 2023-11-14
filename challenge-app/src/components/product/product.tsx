
"use client"
import styled from "styled-components";
import Image, { StaticImageData } from "next/image";
import ShoppingBagIcon from "@/assets/icons/shopping-bag.svg";
import { useCart } from "@/context/cart-context";


const ProductContainer = styled.div`
  width: 218px;
  height: 285px;
  display: flex;
  flex-direction: column;
  justify-content: end;
  align-items: end;
  border-radius: 8px;
  background: var(--white);
  box-shadow: var(--primary-shadow);
  box-sizing: border-box;
  `

const ProductTitle = styled.h3`
  color: var(--font-color);
  font-size: 1rem;
  font-style: normal;
  font-weight: 400;
  line-height: 19px;
  max-width: 16ch;
  padding: 0;
  margin-left: 0.875rem;
  `
const ProductDescription = styled.p`
  color: var(--font-color);
  font-size: 0.625rem;
  font-style: normal;
  font-weight: 300;
  line-height: 12px; 
  align-self: start;
  margin-top: 0.5rem;
  margin-bottom: 0.75rem;
  margin-left: 0.875rem;
  margin-right: 0.75rem;
  max-width: 30ch;
  `

const ProductPrice = styled.div`
  padding: 4px 6px;
  background-color: var(--grey);
  border-radius: 5px;
  color: var(--white);
  font-size: 15px;
  font-style: normal;
  font-weight: 700;
  line-height: 15px;
  margin-right: 0.75rem;
  `
const ProductInfo = styled.div`
  display: flex;
  height: 20px;
  width: 100%;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 0.5rem;
  margin-top: 0.875rem;
  gap: 0.25rem;
  `

const ActionButton = styled.button`
  width: 100%;
  height: 32px;
  border-radius: 0px 0px 8px 8px;
  background: var(--primary);
  color: var(--white);
  font-size: 14px;
  font-style: normal;
  font-weight: 600;
  line-height: 18px; 
  text-transform: uppercase;
  border: none;
  align-self: flex-end;
  justify-self: flex-end;
  display: flex;
  align-items: center;
  gap: 1rem;
  justify-content: center;
  cursor: pointer;
  `
const ImageContainer = styled.div`
  width: 120px;
  height: 140px;
  align-self: center;
  display: flex;
  align-items: center;
  justify-content: center;
  `

export interface Product {
  id: string;
  name: string;
  price: string;
  description: string;
  photo: string | StaticImageData;
  brand: string;
}
export interface ProductProps {
  product: Product;
  onAddToCart: (product: Product) => void;
}

export const Product = ({product, onAddToCart}: ProductProps) => {

  const { addToCart } = useCart();

  const handleAddToCart = () => {
    onAddToCart(product)
  }

  return (
    <ProductContainer key={product.id} data-testid="product">
      <ImageContainer>
      <Image 
        data-testid="product-photo"
        src={product.photo} 
        alt={product.name} 
        width={111}
        height={138}
      />
      </ImageContainer>

      <ProductInfo>
        <ProductTitle data-testid="product-name">{product.name}</ProductTitle>
        <ProductPrice data-testid="product-price">R${product.price.replace(".00", "")}</ProductPrice>
      </ProductInfo>
      <ProductDescription data-testid="product-description">{product.description}</ProductDescription>
      <ActionButton onClick={handleAddToCart} data-testid="product-buy">
        <Image 
          src={ShoppingBagIcon} 
          alt="add to cart icon"
        /> 
        comprar
      </ActionButton>
    </ProductContainer>
  )
}

export default Product;