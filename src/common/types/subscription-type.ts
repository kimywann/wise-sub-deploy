export interface SubscriptionModalData {
  service_name: string;
  price: string;
  start_date: string;
  billing_cycle: "monthly" | "yearly";
}

export interface UserSubscription extends SubscriptionModalData {
  id: number;
  user_id: string;
  created_at?: string;
  updated_at?: string;
}
