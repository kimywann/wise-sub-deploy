import { useSubscriptionStore } from "@/stores/subscription-store";

export const useSetSelectedDate = () =>
  useSubscriptionStore((state) => state.setSelectedDate);

export const useFetchSubscriptions = () =>
  useSubscriptionStore((state) => state.fetchSubscriptions);

export const useUpdateSubscription = () =>
  useSubscriptionStore((state) => state.updateSubscription);

export const useDeleteSubscription = () =>
  useSubscriptionStore((state) => state.deleteSubscription);
