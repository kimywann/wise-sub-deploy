import type { UserSubscription } from "@/common/types/subscription-type";
import { isYearlySubscriptionInStartMonth } from "./useDateUtils";

export const useCostCalculator = () => {
  // 월별 비용 계산 (연간 구독은 시작일 월에만 포함)
  const calculateMonthlyCost = (
    subscriptions: UserSubscription[],
    date: Date,
  ): number => {
    return subscriptions.reduce((acc, subscription) => {
      // 연간 구독인 경우 시작일 월에만 가격 포함
      if (isYearlySubscriptionInStartMonth(subscription, date)) {
        return acc + Number(subscription.price);
      }

      // 월간 구독인 경우 항상 가격 포함
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

  // 시작일의 일자 추출
  const startDay = start.getDate();

  // 오늘 날짜를 기준으로 다음 결제일 계산
  const nextPayment = new Date(today);

  if (billingCycle === "monthly") {
    // 월간 결제: 다음 달의 같은 일자
    nextPayment.setMonth(nextPayment.getMonth() + 1);
    nextPayment.setDate(startDay);
  } else {
    // 연간 결제: 다음 해의 같은 월, 일자
    nextPayment.setFullYear(nextPayment.getFullYear() + 1);
    nextPayment.setMonth(start.getMonth());
    nextPayment.setDate(startDay);
  }

  // 만약 계산된 다음 결제일이 오늘보다 이전이라면, 한 번 더 진행
  if (nextPayment <= today) {
    if (billingCycle === "monthly") {
      nextPayment.setMonth(nextPayment.getMonth() + 1);
    } else {
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

  // 시간을 00:00:00으로 설정하여 일수만 계산
  today.setHours(0, 0, 0, 0);
  nextPayment.setHours(0, 0, 0, 0);

  // 밀리초 차이를 일수로 변환하고 1을 빼서 정확한 남은 일수 계산
  const timeDiff = nextPayment.getTime() - today.getTime();
  const daysDiff = Math.ceil(timeDiff / (1000 * 60 * 60 * 24)) - 1;

  return daysDiff;
};
