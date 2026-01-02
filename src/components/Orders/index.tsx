import type { Order } from "../../types/Order";
import { OrdersBoard } from "../OrdersBoard";
import { Container } from "./styles";

const orders: Order[] = [
  {
		"_id": "6918d851c56654dd10c2d3b3",
		"table": "13",
		"status": "WAITING",
		"products": [
			{
				"product": {
					"name": "Pizza quatro queijos",
					"imagePath": "1763231410507--quatro-queijos.png",
					"price": 40,
				},
				"quantity": 2,
				"_id": "6918d851c56654dd10c2d3b4"
			},
			{
				"product": {
					"name": "Coca cola",
					"imagePath": "1763232115531--coca-cola.png",
					"price": 6,
				},
				"quantity": 1,
				"_id": "6918d851c56654dd10c2d3b5"
			}
		]
	}
];

export function Orders() {
  return(
    <Container>

      <OrdersBoard
        icon="🕑"
        title="Fila de espera"
        orders={orders}
      />
      <OrdersBoard
        icon="🧑‍🍳"
        title="Em preparação"
        orders={[]}
      />
      <OrdersBoard
        icon="✅"
        title="Pronto"
        orders={[]}
      />

    </Container>
  )
}
