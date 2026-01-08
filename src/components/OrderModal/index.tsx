import { useEffect } from 'react';
import closeIcon from '../../assets/images/close-icon.svg'
import type { Order } from '../../types/Order';
import { formatCurrency } from '../../utils/formatCurrency';

import { Overlay, ModalBody, OrderDetails, Actions } from "./styles"

interface OrderModalProps {
  visible: boolean;
  order: Order | null;
  onClose: () => void;
  onCancelOrder: () => Promise<void>;
  isLoading: boolean;
}

export function OrderModal ({visible, order, onClose, onCancelOrder, isLoading}: OrderModalProps) {
  useEffect(() => {
    if (!visible) return;

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        console.log('escape activated')
        onClose();
      }
    }

    document.addEventListener('keydown', handleKeyDown);

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
    }

  }, [visible, onClose]);

  if (!visible || !order) {
    return null;
  }

  const total = order.products.reduce((total, { product, quantity }) => {
    return total + (product.price * quantity);
  }, 0);

  const BASE_URL = import.meta.env.VITE_API_BASE_URL ?? 'http://localhost:3001';

  const handleOverlayClick: React.MouseEventHandler<HTMLDivElement> = (e) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };


  return (
    <Overlay
      onClick={handleOverlayClick}
      role="dialog"
      aria-modal="true"
      aria-labelledby="order-modal-title"
    >
      <ModalBody>
        <header>
          <strong id="order-modal-title">Mesa {order.table}</strong>

          <button type="button" onClick={onClose} aria-label="Fechar modal">
            <img src={closeIcon} alt="" />
          </button>
        </header>

        <div className="status-container">
          <small>Status do Pedido</small>
          <div>
            <span>
              {order.status === 'WAITING' && '🕝'}
              {order.status === 'IN_PRODUCTION' && '🧑‍🍳'}
              {order.status === 'DONE' && '✅'}
            </span>
            <strong>
              {order.status === 'WAITING' && 'Fila de espera'}
              {order.status === 'IN_PRODUCTION' && 'Em preparação'}
              {order.status === 'DONE' && 'Pronto!'}
            </strong>
          </div>
        </div>

        <OrderDetails>
          <strong>Itens</strong>

          <div className="order-items">
            {order.products.map(({_id, product, quantity}) => (
            <div className="item" key={_id}>
              <img
                src={`${BASE_URL}/uploads/${product.imagePath}`}
                alt={product.name}
                width="56"
                height="28.51"
              />
              <span className="quantity">{quantity}x</span>
              <div className="product-details">
                <strong>{product.name}</strong>
                <span>{formatCurrency(product.price)}</span>
              </div>
            </div>
          ))}
          </div>

          <div className="total">
            <span>Total</span>
            <strong>{formatCurrency(total)}</strong>
          </div>



        </OrderDetails>

        <Actions>
          <button
            type="button"
            className="primary"
            disabled={isLoading}
          >
            <span>🧑‍🍳</span>
            <strong>Iniciar produção</strong>
          </button>
          <button
            type="button"
            className="secondary"
            onClick={onCancelOrder}
            disabled={isLoading}
          >
            Cancelar pedido
          </button>
        </Actions>
      </ModalBody>
    </Overlay>
  )
}
