import { useEffect, useState } from "react";
import type { Order } from "../../types/Order";
import { OrdersBoard } from "../OrdersBoard";
import { Container } from "./styles";
import { api } from "../../utils/api";

export function Orders() {
  const [orders, setOrders] = useState<Order[]>([]);

  useEffect(() => {
    api.get('/orders')
      .then(({ data }) => {
        setOrders(data);
      })
  }, []);

  const waitingOrders = orders.filter((order) => order.status === 'WAITING');
  const inProductionOrders = orders.filter((order) => order.status === 'IN_PRODUCTION');
  const doneOrders = orders.filter((order) => order.status === 'DONE');

  function handleCancelOrder (orderId: string) {
    setOrders((prevState) => prevState.filter(order => order._id !== orderId));
  }

  return(
    <Container>

      <OrdersBoard
        icon="🕑"
        title="Fila de espera"
        orders={waitingOrders}
        onCancelOrder={handleCancelOrder}
      />
      <OrdersBoard
        icon="🧑‍🍳"
        title="Em preparação"
        orders={inProductionOrders}
        onCancelOrder={handleCancelOrder}
      />
      <OrdersBoard
        icon="✅"
        title="Pronto"
        orders={doneOrders}
        onCancelOrder={handleCancelOrder}
      />

    </Container>
  )
}
