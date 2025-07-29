import type { UserSubscription } from "@/common/types/subscription-type";
import { isSubscriptionActiveInMonth } from "./useDateUtils";

export const useSubscriptionFilters = (
  userSubscriptions: UserSubscription[],
) => {
  // 선택된 월에 활성화된 구독 필터링
  const getActiveSubscriptions = (date: Date): UserSubscription[] => {
    return userSubscriptions.filter((subscription) =>
      isSubscriptionActiveInMonth(subscription.start_date, date),
    );
  };

  return {
    getActiveSubscriptions,
  };
};
