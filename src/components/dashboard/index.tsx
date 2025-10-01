import { useMemo, useState } from "react";

import { useSubscriptionsQuery } from "@hooks/useSubscriptionQuery";
import { getActiveSubscriptions } from "@utils/get-active-subscriptions";
import { getMonthlyTotalCost } from "@utils/get-monthly-total-cost";

import SubscriptionList from "./SubscriptionList";
import SubscriptionSummary from "./SubscriptionSummary";
import MonthNavigator from "./MonthNavigator";

function Dashboard() {
  const [selectedDate, setSelectedDate] = useState(new Date());
  const {
    data: subscriptions = [],
    isLoading,
    error,
  } = useSubscriptionsQuery();

  const dashboardData = useMemo(() => {
    const activeSubscriptions = getActiveSubscriptions(
      subscriptions,
      selectedDate,
    );
    const monthlyCost = getMonthlyTotalCost(activeSubscriptions, selectedDate);
    const subscriptionCount = activeSubscriptions.length;

    return {
      activeSubscriptions,
      monthlyCost,
      subscriptionCount,
    };
  }, [subscriptions, selectedDate]);

  if (isLoading) {
    return (
      <div className="flex h-64 items-center justify-center">
        <div className="text-lg text-gray-600">로딩 중...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex h-64 items-center justify-center">
        <div className="text-lg text-red-600">
          구독 데이터를 불러오는데 실패했습니다.
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <MonthNavigator
        selectedDate={selectedDate}
        onDateChange={setSelectedDate}
      />

      <SubscriptionSummary
        monthlyCost={dashboardData.monthlyCost}
        subscriptionCount={dashboardData.subscriptionCount}
      />

      <SubscriptionList subscriptions={dashboardData.activeSubscriptions} />
    </div>
  );
}

export default Dashboard;
