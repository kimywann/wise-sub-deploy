import type { UserSubscription } from "@/types/subscription";
import { isYearlySubscriptionInStartMonth } from "@/utils/date";

export const useCostCalculator = () => {
  const calculateMonthlyCost = (
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

  return {
    calculateMonthlyCost,
  };
};

export const calculateNextPaymentDate = (
  startDate: string,
  billingCycle: "monthly" | "yearly",
): string => {
  const start = new Date(startDate);
  const today = new Date();

  const nextPayment = new Date(start);

  if (billingCycle === "monthly") {
    while (nextPayment <= today) {
      nextPayment.setMonth(nextPayment.getMonth() + 1);
    }
  } else {
    while (nextPayment <= today) {
      nextPayment.setFullYear(nextPayment.getFullYear() + 1);
    }
  }

  return nextPayment.toISOString().split("T")[0];
};

export const calculateDaysUntilNextPayment = (
  startDate: string,
  billingCycle: "monthly" | "yearly",
): number => {
  const nextPaymentDate = calculateNextPaymentDate(startDate, billingCycle);
  const nextPayment = new Date(nextPaymentDate);
  const today = new Date();

  today.setHours(0, 0, 0, 0);
  nextPayment.setHours(0, 0, 0, 0);

  const timeDiff = nextPayment.getTime() - today.getTime();
  const daysDiff = Math.ceil(timeDiff / (1000 * 60 * 60 * 24));

  return daysDiff;
};
