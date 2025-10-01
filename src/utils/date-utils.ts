import type { UserSubscription } from "@/models/subscription";

export const getDateComponents = (date: Date) => ({
  year: date.getFullYear(),
  month: date.getMonth() + 1,
});

export const isSubscriptionActiveInMonth = (
  subscriptionStartDate: string,
  targetDate: Date,
): boolean => {
  const { year: targetYear, month: targetMonth } =
    getDateComponents(targetDate);
  const startDate = new Date(subscriptionStartDate);
  const { year: startYear, month: startMonth } = getDateComponents(startDate);

  if (startYear < targetYear) return true;
  if (startYear === targetYear && startMonth <= targetMonth) return true;

  return false;
};

export const isYearlySubscriptionInStartMonth = (
  subscription: UserSubscription,
  targetDate: Date,
): boolean => {
  if (subscription.billing_cycle !== "yearly") return false;

  const { year: targetYear, month: targetMonth } =
    getDateComponents(targetDate);
  const startDate = new Date(subscription.start_date);
  const { year: startYear, month: startMonth } = getDateComponents(startDate);

  return startYear === targetYear && startMonth === targetMonth;
};
