import React from "react";
import "../styles/cart.css";
import { useCart } from "../context/CartContext";

interface CartBarProps {
  onOpen: () => void;
  isVisible: boolean;
}

export const CartBar: React.FC<CartBarProps> = ({ onOpen, isVisible }) => {
  const { cartCount, cartTotal } = useCart();

  return (
    <div className={`cart-bar ${isVisible && cartCount > 0 ? 'visible' : ''}`} onClick={onOpen}>
      <div className="cartbar-left">
        <div className="cartbar-emoji">🛒</div>
        <div>
          <div className="cartbar-label">Seu pedido</div>
          <div className="cartbar-summary">
            <span>{cartCount}</span> {cartCount === 1 ? 'item' : 'itens'} · R$<span>{cartTotal.toFixed(2).replace('.', ',')}</span>
          </div>
        </div>
      </div>
      <button className="cartbar-cta">Ver carrinho →</button>
    </div>
  );
};
