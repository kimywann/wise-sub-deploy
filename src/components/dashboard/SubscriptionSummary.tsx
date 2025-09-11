interface SubscriptionSummaryProps {
  monthlyCost: number;
  subscriptionCount: number;
}

const SubscriptionSummary = ({
  monthlyCost,
  subscriptionCount,
}: SubscriptionSummaryProps) => {
  return (
    <div className="flex flex-row justify-center gap-6">
      <div className="flex flex-col items-center p-6">
        <h3 className="text-lg font-medium text-slate-600">월 구독 비용</h3>
        <p className="mt-2 text-3xl font-bold text-slate-900">
          {monthlyCost.toLocaleString()}원
        </p>
      </div>

      <div className="flex flex-col items-center p-6">
        <h3 className="text-lg font-medium text-slate-600">구독 개수</h3>
        <p className="mt-2 text-3xl font-bold text-slate-900">
          {subscriptionCount}개
        </p>
      </div>
    </div>
  );
};

export default SubscriptionSummary;
