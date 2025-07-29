import type { UserSubscription } from "@/common/types/subscription-type";

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

  // 구독 시작일이 선택된 월보다 이전이거나 같은 경우에만 활성화
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
