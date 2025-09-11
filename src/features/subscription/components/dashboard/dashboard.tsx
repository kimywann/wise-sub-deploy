import { useEffect } from "react";
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
} from "@/stores/subscription-store";
import SubscriptionList from "./components/subscription-list";
import SubscriptionSummary from "./components/subscription-summary";
import MonthNavigator from "./components/month-navigator";

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

  useEffect(() => {
    if (user?.id) {
      fetchSubscriptions(user.id);
    }
  }, [user?.id, fetchSubscriptions]);

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
        <div className="text-lg text-gray-600">로딩 중...</div>
      </div>
    );
  }

  return (
    <div>
      <MonthNavigator
        selectedDate={selectedDate}
        onDateChange={setSelectedDate}
      />

      <SubscriptionSummary
        monthlyCost={monthlyCost}
        subscriptionCount={subscriptionCount}
      />

      <SubscriptionList
        subscriptions={activeSubscriptions}
        onSubscriptionUpdate={(updatedSubscriptions) => {
          updatedSubscriptions.forEach((sub) => {
            updateSubscription(sub);
          });
        }}
      />
    </div>
  );
}

export default Dashboard;
