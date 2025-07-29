import { useDashboardState } from "./hooks/useDashboardState";
import SubscriptionList from "./components/subscription-list";
import SubscriptionSummary from "./components/subscription-summary";
import MonthNavigator from "./components/month-navigator";

function Dashboard() {
  const {
    selectedDate,
    activeSubscriptions,
    monthlyCost,
    subscriptionCount,
    isLoading,
    error,
    setUserSubscriptions,
    setSelectedDate,
  } = useDashboardState();

  if (isLoading) {
    return (
      <div className="flex h-64 items-center justify-center">
        <div className="text-lg text-slate-600">구독 정보를 불러오는 중...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex h-64 items-center justify-center">
        <div className="text-lg text-red-600">{error}</div>
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
        onSubscriptionUpdate={setUserSubscriptions}
      />
    </div>
  );
}

export default Dashboard;
