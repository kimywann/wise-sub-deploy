import { useState } from "react";
import { toast } from "sonner";

import Modal from "@components/common/Modal";
import Input from "@components/common/Input";
import Select from "@components/common/Select";
import Button from "@components/common/Button";

import {
  useUpdateSubscriptionMutation,
  useDeleteSubscriptionMutation,
} from "@hooks/useSubscriptionQuery";

import type { EditSubscriptionModalProps } from "@models/props";

const BILLING_CYCLE_OPTIONS = [
  { value: "monthly", label: "월간" },
  { value: "yearly", label: "연간" },
];

function EditSubscriptionModal({
  id,
  userId,
  serviceName,
  price,
  startDate,
  billingCycle,
  isOpen,
  onClose,
}: EditSubscriptionModalProps & { isOpen: boolean }) {
  const [formData, setFormData] = useState({
    serviceName,
    price,
    startDate,
    billingCycle,
  });

  const updateMutation = useUpdateSubscriptionMutation();
  const deleteMutation = useDeleteSubscriptionMutation();

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleUpdate = async () => {
    try {
      await updateMutation.mutateAsync({
        id,
        user_id: userId,
        service_name: formData.serviceName,
        price: formData.price,
        start_date: formData.startDate,
        billing_cycle: formData.billingCycle as "monthly" | "yearly",
      });

      toast.success("구독이 성공적으로 업데이트되었습니다!");
      onClose();
    } catch (error) {
      console.error("구독 업데이트 실패", error);
      toast.error("구독 업데이트에 실패했습니다.");
    }
  };

  const handleDelete = async () => {
    if (!confirm("정말로 이 구독을 삭제하시겠습니까?")) return;

    try {
      await deleteMutation.mutateAsync(id);
      toast.success("구독이 성공적으로 삭제되었습니다!");
      onClose();
    } catch (error) {
      console.error("구독 삭제 실패", error);
      toast.error("구독 삭제에 실패했습니다.");
    }
  };

  const isLoading = updateMutation.isPending || deleteMutation.isPending;

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="구독 정보 수정">
      <form
        onSubmit={(e) => {
          e.preventDefault();
          handleUpdate();
        }}
      >
        <Input
          label="구독 서비스명"
          value={formData.serviceName}
          onChange={(e) => handleInputChange("serviceName", e.target.value)}
          disabled={isLoading}
          variant="bordered"
        />

        <Input
          label="비용"
          value={formData.price}
          onChange={(e) => handleInputChange("price", e.target.value)}
          placeholder="이 구독 서비스에 한 달에 얼마 쓰고 계신가요?"
          disabled={isLoading}
          variant="bordered"
        />

        <Input
          label="구독 시작일"
          type="date"
          value={formData.startDate}
          onChange={(e) => handleInputChange("startDate", e.target.value)}
          max={new Date().toISOString().split("T")[0]}
          disabled={isLoading}
          variant="bordered"
        />

        <Select
          label="결제 주기"
          value={formData.billingCycle}
          onChange={(e) => handleInputChange("billingCycle", e.target.value)}
          options={BILLING_CYCLE_OPTIONS}
          disabled={isLoading}
        />

        <div className="flex justify-center gap-4">
          <Button
            type="button"
            onClick={handleDelete}
            disabled={isLoading}
            variant="secondary"
            className="text-red-500 hover:bg-red-50 hover:text-red-600"
          >
            {deleteMutation.isPending ? "삭제 중..." : "삭제"}
          </Button>
          <Button type="submit" disabled={isLoading} variant="primary">
            {updateMutation.isPending ? "저장 중..." : "저장"}
          </Button>
        </div>
      </form>
    </Modal>
  );
}

export default EditSubscriptionModal;
