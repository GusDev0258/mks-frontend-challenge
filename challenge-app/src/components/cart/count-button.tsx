"use client"
import { useState } from "react";
import styled from "styled-components";

const CountButtonContainer = styled.div`
  width: 50px;
  height: 19px;
  border-radius: 4px;
  border: 0.3px solid #bfbfbf;
  background: var(--white);
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
`;

const CountButtonAction = styled.button`
  color: var(--black);
  font-size: 8px;
  font-style: normal;
  font-weight: 400;
  line-height: normal;
  border: none;
  padding: 4px;
  background: transparent;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const CartItemCount = styled.p`
  color: var(--black);
  font-size: 8px;
  font-style: normal;
  font-weight: 400;
  line-height: normal;
`

const CountLabel = styled.p`
  color: var(--black);
  font-size: 5px;
  font-style: normal;
  font-weight: 400;
  line-height: normal;
  position: absolute;
  top: -10px;
  left: 0;
`

type CountButtonProps = {
  itemCount: number;
  onDecrease: () => void;
  onIncrease: () => void;
};

export const CountButton = ({ itemCount, onDecrease, onIncrease }: CountButtonProps) => {

  return (
    <CountButtonContainer>
      <CountLabel>Qtd:</CountLabel>
      <CountButtonAction onClick={onDecrease}>
        -
      </CountButtonAction>
      <CartItemCount>
        {itemCount}
      </CartItemCount>
      <CountButtonAction onClick={onIncrease}>
        +
      </CountButtonAction>
    </CountButtonContainer>
  );
};
