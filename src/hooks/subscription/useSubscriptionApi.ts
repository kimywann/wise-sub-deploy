import { updateSubscription, deleteSubscription } from "@/api/userSubscription";
import type { UserSubscription } from "@/types/subscription";

export const useSubscriptionApi = () => {
  const handleUpdateSubscription = async (
    id: number,
    user_id: string,
    updatedData: {
      service_name: string;
      price: string;
      start_date: string;
      billing_cycle: "monthly" | "yearly";
    },
  ) => {
    const userSubscription: UserSubscription = {
      id,
      user_id,
      ...updatedData,
    };

    await updateSubscription(userSubscription);
  };

  const handleDeleteSubscription = async (id: number) => {
    await deleteSubscription(id);
  };

  return {
    handleUpdateSubscription,
    handleDeleteSubscription,
  };
};
