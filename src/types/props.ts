export interface EditSubscriptionModalProps {
  id: number;
  userId: string;
  serviceName: string;
  price: string;
  startDate: string;
  billingCycle: "monthly" | "yearly";
  onClose: () => void;
  onDelete: () => void;
  onUpdate: (updatedData: {
    service_name: string;
    price: string;
    start_date: string;
    billing_cycle: "monthly" | "yearly";
  }) => void;
}
