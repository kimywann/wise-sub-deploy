import clsx from "clsx";
import { SERVICES_LIST } from "@constants/service-list";
import {
  calculateNextPaymentDate,
  calculateDaysUntilNextPayment,
} from "@utils/cost-calculator";
import type { UserSubscription } from "@models/subscription";

interface SubscriptionCardProps {
  subscription: UserSubscription;
  onEdit: () => void;
}

const SubscriptionCard = ({ subscription, onEdit }: SubscriptionCardProps) => {
  const getServiceImage = (serviceName: string): string => {
    for (const category of Object.values(SERVICES_LIST)) {
      const service = category.find((item) => item.name === serviceName);
      if (service) return service.image;
    }
    return "";
  };

  const serviceImage = getServiceImage(subscription.service_name);

  return (
    <div
      onClick={onEdit}
      className="flex cursor-pointer items-center gap-3 rounded-2xl border border-slate-300 p-4 transition-all hover:border-indigo-500 hover:shadow-md"
    >
      {serviceImage ? (
        <img
          src={serviceImage}
          alt={subscription.service_name}
          className="h-12 w-15 rounded-lg"
        />
      ) : (
        <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-indigo-600">
          <span className="text-xs font-bold text-white">
            {subscription.service_name.charAt(0)}
          </span>
        </div>
      )}

      <div className="flex-1">
        <h3 className="text-lg font-semibold">{subscription.service_name}</h3>

        <p className="mt-1.5 text-sm text-slate-600">
          다음 결제일:{" "}
          <span className="font-bold">
            {calculateNextPaymentDate(
              subscription.start_date,
              subscription.billing_cycle,
            )}
          </span>
        </p>

        <p className="mt-1.5 text-sm text-slate-600">
          다음 결제일 까지:{" "}
          <span className="font-bold">
            {calculateDaysUntilNextPayment(
              subscription.start_date,
              subscription.billing_cycle,
            )}
          </span>
          일 남았습니다
        </p>

        <div className="mt-2 flex gap-2">
          <span
            className={clsx(
              "rounded-md px-2 py-1 text-sm font-medium",
              subscription.billing_cycle === "monthly"
                ? "bg-blue-100 text-blue-700"
                : "bg-orange-100 text-orange-700",
            )}
          >
            {subscription.billing_cycle === "monthly" ? "월간" : "연간"}
          </span>
          <span className="text-sm text-slate-600">
            {Number(subscription.price).toLocaleString()}원
          </span>
        </div>
      </div>
    </div>
  );
};

export default SubscriptionCard;
