import { useSubscriptionStore } from "@/stores/subscription-store";

export const useUserSubscriptions = () =>
  useSubscriptionStore((state) => state.userSubscriptions);

export const useSelectedDate = () =>
  useSubscriptionStore((state) => state.selectedDate);

export const useSubscriptionLoading = () =>
  useSubscriptionStore((state) => state.isLoading);

export const useSubscriptionError = () =>
  useSubscriptionStore((state) => state.error);
