import { useState, useEffect } from "react";
import { useUser } from "@supabase/auth-helpers-react";
import getSubscriptions from "../../api/get-subscriptions";
import type { UserSubscription } from "@/common/types/subscription-type";
import { useSubscriptionFilters } from "./useSubscriptionFilters";
import { useCostCalculator } from "./useCostCalculator";

export const useDashboardState = () => {
  const [userSubscriptions, setUserSubscriptions] = useState<
    UserSubscription[]
  >([]);
  const [selectedDate, setSelectedDate] = useState<Date>(new Date());
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const user = useUser();

  // 분리된 훅들 사용
  const { getActiveSubscriptions } = useSubscriptionFilters(userSubscriptions);
  const { calculateMonthlyCost } = useCostCalculator();

  useEffect(() => {
    if (!user) return;

    const fetchData = async () => {
      setIsLoading(true);
      setError(null);

      try {
        const data = await getSubscriptions(user.id);
        setUserSubscriptions(data);
      } catch (error) {
        console.error("구독 불러오기 실패", error);
        setError("구독 데이터를 불러오는데 실패했습니다.");
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, [user]);

  // 계산된 값들
  const activeSubscriptions = getActiveSubscriptions(selectedDate);
  const monthlyCost = calculateMonthlyCost(activeSubscriptions, selectedDate);
  const subscriptionCount = activeSubscriptions.length;

  return {
    // 상태
    userSubscriptions,
    selectedDate,
    activeSubscriptions,
    monthlyCost,
    subscriptionCount,
    isLoading,
    error,

    // 액션
    setUserSubscriptions,
    setSelectedDate,
  };
};
