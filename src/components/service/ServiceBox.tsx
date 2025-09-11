import { useState, useEffect } from "react";
import { useUser } from "@supabase/auth-helpers-react";

import { SERVICES_LIST } from "@/constants/service-list";
import type { ServiceItem } from "@/types/service";
import type { UserSubscription } from "@/types/subscription";

import ServiceCard from "@/components/service/ServiceCard";

import { addSubscription, getSubscriptions } from "@/api/userSubscription";
import { toast } from "sonner";

export default function ServiceBox() {
  const user = useUser();
  const [existingSubscriptions, setExistingSubscriptions] = useState<
    UserSubscription[]
  >([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const fetchExistingSubscriptions = async () => {
      if (!user) return;

      try {
        const subscriptions = await getSubscriptions(user.id);
        setExistingSubscriptions(subscriptions || []);
      } catch (error) {
        console.error("구독 목록 조회 실패:", error);
      }
    };

    fetchExistingSubscriptions();
  }, [user]);

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

    setIsLoading(true);
    try {
      await addSubscription(user.id, service);

      const updatedSubscriptions = await getSubscriptions(user.id);
      setExistingSubscriptions(updatedSubscriptions || []);

      toast.success(`${service.name} 서비스가 추가되었습니다.`);
    } catch (error) {
      console.error("추가 실패:", error);
      toast.error("구독 추가에 실패했습니다.");
    } finally {
      setIsLoading(false);
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
                  onClick={() =>
                    !isSubscribed && !isLoading && addBoxClick(service)
                  }
                >
                  <ServiceCard service={service} />
                </div>
              );
            })}
          </div>
        </div>
      ))}
    </div>
  );
}
