import { useEffect, useCallback, useMemo } from "react";
import { useUser } from "@supabase/auth-helpers-react";

import {
  useActiveSubscriptions,
  useMonthlyCost,
  useSubscriptionCount,
  useSelectedDate,
  useSubscriptionLoading,
  useSubscriptionError,
  useSetSelectedDate,
  useFetchSubscriptions,
  useUpdateSubscription,
} from "@/hooks/subscription";
import SubscriptionList from "./SubscriptionList";
import SubscriptionSummary from "./SubscriptionSummary";
import MonthNavigator from "./MouthNavigator";

import type { UserSubscription } from "@/types/subscription";

function Dashboard() {
  const user = useUser();
  const isLoading = useSubscriptionLoading();
  const error = useSubscriptionError();
  const activeSubscriptions = useActiveSubscriptions();
  const monthlyCost = useMonthlyCost();
  const subscriptionCount = useSubscriptionCount();
  const selectedDate = useSelectedDate();
  const setSelectedDate = useSetSelectedDate();
  const fetchSubscriptions = useFetchSubscriptions();
  const updateSubscription = useUpdateSubscription();

  const dashboardData = useMemo(
    () => ({
      monthlyCost,
      subscriptionCount,
      activeSubscriptions,
    }),
    [monthlyCost, subscriptionCount, activeSubscriptions],
  );

  useEffect(() => {
    if (user?.id) {
      fetchSubscriptions(user.id);
    }
  }, [user?.id, fetchSubscriptions]);

  const handleSubscriptionUpdate = useCallback(
    (updatedSubscriptions: UserSubscription[]) => {
      updatedSubscriptions.forEach((sub) => {
        updateSubscription(sub);
      });
    },
    [updateSubscription],
  );

  if (error) {
    return (
      <div className="flex h-64 items-center justify-center">
        <div className="text-lg text-red-600">{error}</div>
      </div>
    );
  }

  if (isLoading) {
    return (
      <div className="flex h-64 items-center justify-center">
        <div className="animate-pulse space-y-4">
          <div className="h-8 w-48 rounded bg-gray-200"></div>
          <div className="h-32 w-full rounded bg-gray-200"></div>
          <div className="h-64 w-full rounded bg-gray-200"></div>
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

      <SubscriptionList
        subscriptions={dashboardData.activeSubscriptions}
        onSubscriptionUpdate={handleSubscriptionUpdate}
      />
    </div>
  );
}

export default Dashboard;
