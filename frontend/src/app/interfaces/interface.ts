export interface OrderHistory {
  transaction_id: string;
  product_name: string;
  quantity: number;
  total_amount: string;
  created_at: string;
}

export interface Customer {
  id: string;
  name: string;
  email: string;
  phone: string;
  address: string;
  level: string;
  favorite_menu: string;
  total_transaction: string;
  order_history: OrderHistory[];
}
