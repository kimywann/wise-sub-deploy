import type { UserSubscription } from "@models/subscription";
import { isSubscriptionActiveInMonth } from "@/utils/date-utils";

export const getActiveSubscriptions = (
  subscriptions: UserSubscription[],
  date: Date,
): UserSubscription[] => {
  if (!(date instanceof Date) || isNaN(date.getTime())) {
    console.warn("Invalid date provided to getActiveSubscriptions:", date);
    return [];
  }

  return subscriptions.filter((subscription) =>
    isSubscriptionActiveInMonth(subscription.start_date, date),
  );
};
