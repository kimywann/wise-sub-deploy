import { useSubscriptionApi } from "@/features/subscription/components/hooks/useSubscriptionApi";
import type { UserSubscription } from "@/common/types/subscription-type";

interface UseSubscriptionStateProps {
  subscriptions: UserSubscription[];
  onSubscriptionUpdate: (updatedSubscriptions: UserSubscription[]) => void;
}

export const useSubscriptionState = ({
  subscriptions,
  onSubscriptionUpdate,
}: UseSubscriptionStateProps) => {
  const { handleUpdateSubscription, handleDeleteSubscription } =
    useSubscriptionApi();

  const handleUpdate = async (
    id: number,
    updatedData: {
      service_name: string;
      price: string;
      start_date: string;
      billing_cycle: "monthly" | "yearly";
    },
    user_id: string,
  ) => {
    try {
      await handleUpdateSubscription(id, user_id, updatedData);

      // 로컬 상태 업데이트
      const updatedSubscriptions = subscriptions.map((sub) =>
        sub.id === id
          ? {
              ...sub,
              service_name: updatedData.service_name,
              price: updatedData.price,
              start_date: updatedData.start_date,
              billing_cycle: updatedData.billing_cycle,
            }
          : sub,
      );

      onSubscriptionUpdate(updatedSubscriptions);
      return true;
    } catch (error) {
      console.error("구독 업데이트 실패", error);
      return false;
    }
  };

  const handleDelete = async (id: number) => {
    try {
      await handleDeleteSubscription(id);

      const updatedSubscriptions = subscriptions.filter((sub) => sub.id !== id);
      onSubscriptionUpdate(updatedSubscriptions);
      return true;
    } catch (error) {
      console.error("구독 삭제 실패", error);
      return false;
    }
  };

  return {
    handleUpdate,
    handleDelete,
  };
};
