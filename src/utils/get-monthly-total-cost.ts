import type { UserSubscription } from "@models/subscription";
import { isYearlySubscriptionInStartMonth } from "@/utils/date-utils";

export const getMonthlyTotalCost = (
  subscriptions: UserSubscription[],
  date: Date,
): number => {
  return subscriptions.reduce((acc, subscription) => {
    if (isYearlySubscriptionInStartMonth(subscription, date)) {
      return acc + Number(subscription.price);
    }

    if (subscription.billing_cycle === "monthly") {
      return acc + Number(subscription.price);
    }

    return acc;
  }, 0);
};
