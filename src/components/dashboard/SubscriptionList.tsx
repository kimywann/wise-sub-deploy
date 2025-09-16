import { useState } from "react";
import { Link } from "react-router-dom";
import clsx from "clsx";

import Button from "@/components/common/Button";

import EditSubscriptionModal from "@/components/dashboard/EditSubscriptionModal";

import { useSubscriptionState } from "@/hooks/subscription/useStoreState";
import {
  calculateNextPaymentDate,
  calculateDaysUntilNextPayment,
} from "@/hooks/dashboard/useCostCalculator";

import { SERVICES_LIST } from "@/constants/service-list";

import type { UserSubscription } from "@/types/subscription";

interface SubscriptionListProps {
  subscriptions: UserSubscription[];
  onSubscriptionUpdate: (updatedSubscriptions: UserSubscription[]) => void;
}

export default function SubscriptionList({
  subscriptions,
  onSubscriptionUpdate,
}: SubscriptionListProps) {
  const [openEditModal, setOpenEditModal] = useState<number | null>(null);

  const { handleUpdate, handleDelete } = useSubscriptionState({
    subscriptions,
    onSubscriptionUpdate,
  });

  const handleOpenEditModal = (id: number) => {
    setOpenEditModal(id);
  };

  const handleCloseModal = () => {
    setOpenEditModal(null);
  };

  const handleUpdateSubscription = async (
    id: number,
    updatedData: {
      service_name: string;
      price: string;
      start_date: string;
      billing_cycle: "monthly" | "yearly";
    },
    user_id: string,
  ) => {
    const success = await handleUpdate(id, updatedData, user_id);
    if (success) {
      setOpenEditModal(null);
    }
  };

  const handleDeleteSubscription = async (id: number) => {
    const success = await handleDelete(id);
    if (success) {
      setOpenEditModal(null);
    }
  };

  const getServiceImage = (serviceName: string): string => {
    for (const category of Object.values(SERVICES_LIST)) {
      const service = category.find((item) => item.name === serviceName);
      if (service) {
        return service.image;
      }
    }
    if (serviceName === "커스텀") return "";
    return "";
  };

  return (
    <div>
      <div className="mt-10 mb-6 flex flex-row justify-between">
        <h2 className="text-2xl font-semibold text-slate-900">
          구독 중인 서비스
        </h2>

        <div>
          <Link to="/subscription/add">
            <Button type="button" size="md" variant="primary">
              구독 서비스 추가
            </Button>
          </Link>
        </div>
      </div>

      {subscriptions.length === 0 ? (
        <div className="flex h-64 items-center justify-center">
          <div className="text-center text-lg text-slate-500">
            아직 등록된 구독이 없어요.
            <br />
            구독 서비스를 추가해서 시작해보세요!
          </div>
        </div>
      ) : (
        <div className="mb-10 grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
          {subscriptions.map((item) => (
            <div key={item.id}>
              <div
                onClick={() => handleOpenEditModal(item.id)}
                className="flex cursor-pointer items-center gap-3 rounded-2xl border border-slate-300 p-4 hover:border-indigo-500 hover:shadow-md"
              >
                {getServiceImage(item.service_name) ? (
                  <img
                    src={getServiceImage(item.service_name)}
                    alt={item.service_name}
                    className="h-12 w-15 rounded-lg"
                  />
                ) : (
                  <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-indigo-600">
                    <span className="text-xs font-bold text-white">
                      {item.service_name.charAt(0)}
                    </span>
                  </div>
                )}
                <div className="flex-1">
                  <h3 className="text-lg font-semibold">{item.service_name}</h3>
                  <p className="mt-1.5 text-sm text-slate-600">
                    다음 결제일:{" "}
                    <span className="font-bold">
                      {calculateNextPaymentDate(
                        item.start_date,
                        item.billing_cycle,
                      )}
                    </span>
                  </p>
                  <p className="mt-1.5 text-sm text-slate-600">
                    다음 결제일 까지:{" "}
                    <span className="font-bold">
                      {calculateDaysUntilNextPayment(
                        item.start_date,
                        item.billing_cycle,
                      )}
                    </span>
                    일 남았습니다
                  </p>
                  <div className="mt-2 flex flex-row gap-2">
                    <p
                      className={clsx(
                        "text-base",
                        item.billing_cycle === "monthly"
                          ? "rounded-md bg-blue-100 px-1 font-medium text-blue-700"
                          : "rounded-md bg-orange-100 px-1 font-medium text-orange-700",
                      )}
                    >
                      {item.billing_cycle === "monthly" ? "월간" : "연간"}
                    </p>
                    <p className="text-md text-slate-600">
                      {Number(item.price).toLocaleString()}원
                    </p>
                  </div>
                </div>
              </div>

              {openEditModal === item.id && (
                <div className="fixed inset-0 z-20 flex items-center justify-center bg-gray-400/30">
                  <EditSubscriptionModal
                    id={item.id}
                    userId={item.user_id}
                    serviceName={item.service_name}
                    price={item.price}
                    startDate={item.start_date}
                    billingCycle={item.billing_cycle}
                    onClose={handleCloseModal}
                    onUpdate={(updatedData) =>
                      handleUpdateSubscription(
                        item.id,
                        updatedData as Parameters<
                          typeof handleUpdateSubscription
                        >[1],
                        item.user_id,
                      )
                    }
                    onDelete={() => handleDeleteSubscription(item.id)}
                  />
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
