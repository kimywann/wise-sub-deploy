import updateSubscription from "@/features/subscription/components/api/update-subscription";
import deleteSubscription from "@/features/subscription/components/api/delete-subscription";
import type { UserSubscription } from "@/common/types/subscription-type";

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
