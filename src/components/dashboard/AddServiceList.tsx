import { useUser } from "@supabase/auth-helpers-react";
import { toast } from "sonner";

import { SERVICES_LIST } from "@/constants/service-list";
import type { ServiceItem } from "@/types/service";

import AddServiceCard from "@/components/dashboard/AddServiceCard";

import {
  useAddSubscriptionMutation,
  useSubscriptionsQuery,
} from "@/hooks/useSubscriptionQuery";

export default function AddServiceList() {
  const user = useUser();
  const { data: existingSubscriptions = [] } = useSubscriptionsQuery();
  const addSubscriptionMutation = useAddSubscriptionMutation();

  const isServiceAlreadySubscribed = (serviceName: string) => {
    if (serviceName === "직접입력") {
      return false;
    }

    return existingSubscriptions.some(
      (subscription) => subscription.service_name === serviceName,
    );
  };

  const addBoxClick = async (service: ServiceItem) => {
    if (!user) {
      alert("로그인 후 이용해주세요!");
      return;
    }

    try {
      await addSubscriptionMutation.mutateAsync({ service });
      toast.success(`${service.name} 서비스가 추가되었습니다.`);
    } catch (error) {
      console.error("추가 실패:", error);
      toast.error("구독 추가에 실패했습니다.");
    }
  };

  return (
    <div className="mt-5">
      {Object.entries(SERVICES_LIST).map(([category, services]) => (
        <div key={category}>
          <p className="mb-2 text-lg font-semibold">{category}</p>

          <div className="mb-5 grid grid-cols-2 gap-6 md:grid-cols-4 lg:grid-cols-6">
            {services.map((service) => {
              const isSubscribed = isServiceAlreadySubscribed(service.name);

              return (
                <div
                  key={service.name}
                  className={`relative flex h-30 w-30 cursor-pointer flex-col rounded-2xl border ${
                    isSubscribed
                      ? "cursor-not-allowed border-gray-300 bg-gray-100 opacity-60"
                      : "border-slate-300 hover:border-indigo-500 hover:shadow-md"
                  }`}
                  onClick={() => !isSubscribed && addBoxClick(service)}
                >
                  <AddServiceCard service={service} />
                </div>
              );
            })}
          </div>
        </div>
      ))}
    </div>
  );
}
