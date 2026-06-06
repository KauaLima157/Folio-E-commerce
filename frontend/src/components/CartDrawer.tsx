import React from "react";
import "../styles/cart.css";
import { useCart } from "../context/CartContext";
import { getBookCoverImage } from "../services/api";

interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
}

export const CartDrawer: React.FC<CartDrawerProps> = ({ isOpen, onClose }) => {
  const { items, updateQuantity, removeFromCart, cartTotal } = useCart();

  return (
    <>
      <div className={`drawer-overlay ${isOpen ? 'open' : ''}`} onClick={onClose} />
      <div className={`cart-drawer ${isOpen ? 'open' : ''}`}>
        <div className="drawer-handle" />
        <div className="drawer-header">
          <div className="drawer-title">
            <span className="drawer-title-text">Minha sacola</span>
          </div>
          <button className="drawer-close" onClick={onClose}>✕</button>
        </div>

        <div className="drawer-body">
          {items.length === 0 ? (
            <div style={{ padding: '24px', textAlign: 'center', color: 'var(--ash)' }}>
              Sua sacola está vazia.
            </div>
          ) : (
            items.map(item => (
              <div className="cart-item" key={item.id}>
                {(() => {
                  const cover = getBookCoverImage(item.title);
                  return cover ? (
                    <div className="cart-item-cover-wrapper">
                      <img src={cover} alt={item.title} className="cart-item-cover-img" />
                    </div>
                  ) : (
                    <div className="cart-item-icon">🛒</div>
                  );
                })()}
                <div className="cart-item-info">
                  <div className="cart-item-name">{item.title}</div>
                  <div className="cart-item-price">R$ {item.price.toFixed(2).replace('.', ',')}</div>
                </div>
                <div className="cart-item-controls">
                  <button className="qty-btn" onClick={() => updateQuantity(item.id, -1)}>−</button>
                  <span className="qty-value">{item.quantity}</span>
                  <button className="qty-btn" onClick={() => updateQuantity(item.id, 1)}>+</button>
                  <button className="remove-btn" onClick={() => removeFromCart(item.id)} style={{marginLeft: '8px', background: 'transparent', border: 'none', color: 'var(--terracotta)', cursor: 'pointer'}}>✕</button>
                </div>
              </div>
            ))
          )}
        </div>

        <div className="drawer-footer">
          <div className="drawer-total-row">
            <span className="drawer-total-label">Total</span>
            <span className="drawer-total-value">R$ <span>{cartTotal.toFixed(2).replace('.', ',')}</span></span>
          </div>
          <button className="checkout-btn" disabled={items.length === 0} style={{ opacity: items.length === 0 ? 0.5 : 1 }}>
            Finalizar compra →
          </button>
        </div>
      </div>
    </>
  );
};
