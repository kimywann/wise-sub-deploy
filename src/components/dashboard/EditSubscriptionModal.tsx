import close from "@/assets/icon/x.svg";

import { useState, useEffect, useCallback } from "react";
import { useSubscriptionApi } from "@/hooks/subscription/useSubscriptionApi";

import type { EditSubscriptionModalProps } from "@/types/props";

function EditSubscriptionModal({
  id,
  userId,
  serviceName,
  price,
  startDate,
  billingCycle,
  onClose,
  onDelete,
  onUpdate,
}: EditSubscriptionModalProps) {
  const [editedServiceName, setEditedServiceName] = useState(serviceName);
  const [editedServicePrice, setEditedServicePrice] = useState(price);
  const [editedStartDate, setEditedStartDate] = useState(startDate);
  const [editedBillingCycle, setEditedBillingCycle] = useState(billingCycle);

  const { handleUpdateSubscription, handleDeleteSubscription } =
    useSubscriptionApi();

  const handleKeyDown = useCallback(
    (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        onClose();
      }
    },
    [onClose],
  );

  useEffect(() => {
    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [handleKeyDown]);

  const handleUpdate = async () => {
    try {
      await handleUpdateSubscription(id, userId, {
        service_name: editedServiceName,
        price: editedServicePrice,
        start_date: editedStartDate,
        billing_cycle: editedBillingCycle,
      });

      onUpdate({
        service_name: editedServiceName,
        price: editedServicePrice,
        start_date: editedStartDate,
        billing_cycle: editedBillingCycle,
      });
    } catch (error) {
      console.error("구독 업데이트 실패", error);
    }
  };

  const handleDelete = async () => {
    try {
      await handleDeleteSubscription(id);
      onDelete();
      onClose();
    } catch (error) {
      console.error("구독 삭제 실패", error);
    }
  };

  return (
    <div className="mx-auto mb-10 h-[565px] w-[400px] rounded-xl border border-slate-300 bg-white p-8 shadow-md">
      <header className="flex flex-row justify-between">
        <div></div>
        <button
          type="button"
          onClick={onClose}
          className="mb-4 hover:cursor-pointer"
        >
          <img src={close} alt="left" className="h-6 w-6" />
        </button>
      </header>

      <div className="mb-1 font-bold">구독 서비스명</div>
      <div className="mb-6 flex flex-col rounded-lg border border-slate-300 p-4 shadow-sm">
        <input
          type="text"
          value={editedServiceName}
          onChange={(e) => setEditedServiceName(e.target.value)}
        />
      </div>

      <div className="mb-1 font-bold">비용</div>
      <div className="mb-6 flex flex-col rounded-lg border border-slate-300 p-4 shadow-sm">
        <input
          value={editedServicePrice}
          onChange={(e) => setEditedServicePrice(e.target.value)}
          type="text"
          placeholder="이 구독 서비스에 한 달에 얼마 쓰고 계신가요?"
        />
      </div>

      <div className="mb-1 font-bold">구독 시작일</div>
      <div className="mb-6 flex flex-col rounded-lg border border-slate-300 p-4 shadow-sm">
        <input
          type="date"
          value={editedStartDate}
          onChange={(e) => setEditedStartDate(e.target.value)}
          max={new Date().toISOString().split("T")[0]}
        />
      </div>

      <div className="mb-1 font-bold">결제 주기</div>
      <div className="mb-6 flex flex-col rounded-lg border border-slate-300 p-4 shadow-sm">
        <select
          value={editedBillingCycle}
          onChange={(e) =>
            setEditedBillingCycle(e.target.value as "monthly" | "yearly")
          }
        >
          <option value="monthly">월간</option>
          <option value="yearly">연간</option>
        </select>
      </div>

      <div className="mt-3 flex flex-row justify-center gap-16">
        <button
          type="button"
          onClick={handleDelete}
          className="rounded-2xl px-4 py-2 text-lg font-bold text-red-500 hover:cursor-pointer hover:rounded-xl hover:bg-red-100"
        >
          삭제
        </button>
        <button
          type="button"
          onClick={handleUpdate}
          className="rounded-2xl px-4 py-2 text-lg font-bold text-blue-500 hover:cursor-pointer hover:rounded-xl hover:bg-blue-100"
        >
          저장
        </button>
      </div>
    </div>
  );
}

export default EditSubscriptionModal;
