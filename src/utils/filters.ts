import type { UserSubscription } from "@/types/subscription";
import { isSubscriptionActiveInMonth } from "@/utils/date-utils";

export const useSubscriptionFilters = (
  userSubscriptions: UserSubscription[],
) => {
  const getActiveSubscriptions = (date: Date): UserSubscription[] => {
    return userSubscriptions.filter((subscription) =>
      isSubscriptionActiveInMonth(subscription.start_date, date),
    );
  };

  return {
    getActiveSubscriptions,
  };
};
