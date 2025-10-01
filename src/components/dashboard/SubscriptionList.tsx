import { useState } from "react";
import { Link } from "react-router-dom";

import Button from "@components/common/Button";
import EditSubscriptionModal from "./EditSubscriptionModal";
import SubscriptionCard from "./SubscriptionCard";

import type { UserSubscription } from "@models/subscription";

interface SubscriptionListProps {
  subscriptions: UserSubscription[];
}

export default function SubscriptionList({
  subscriptions,
}: SubscriptionListProps) {
  const [selectedSubscription, setSelectedSubscription] =
    useState<UserSubscription | null>(null);

  const handleOpenEditModal = (subscription: UserSubscription) => {
    setSelectedSubscription(subscription);
  };

  const handleCloseModal = () => {
    setSelectedSubscription(null);
  };

  if (subscriptions.length === 0) {
    return (
      <div className="mt-10">
        <div className="mb-6 flex justify-between">
          <h2 className="text-2xl font-semibold text-slate-900">
            구독 중인 서비스
          </h2>
          <Link to="/subscription/add">
            <Button size="md" variant="primary">
              구독 서비스 추가
            </Button>
          </Link>
        </div>

        <div className="flex h-64 items-center justify-center">
          <div className="text-center text-lg text-slate-500">
            아직 등록된 구독이 없어요.
            <br />
            구독 서비스를 추가해서 시작해보세요!
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="mt-10">
      <div className="mb-6 flex justify-between">
        <h2 className="text-2xl font-semibold text-slate-900">
          구독 중인 서비스
        </h2>
        <Link to="/subscription/add">
          <Button size="md" variant="primary">
            구독 서비스 추가
          </Button>
        </Link>
      </div>

      <div className="mb-10 grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
        {subscriptions.map((subscription) => (
          <SubscriptionCard
            key={subscription.id}
            subscription={subscription}
            onEdit={() => handleOpenEditModal(subscription)}
          />
        ))}
      </div>

      {selectedSubscription && (
        <EditSubscriptionModal
          id={selectedSubscription.id}
          userId={selectedSubscription.user_id}
          serviceName={selectedSubscription.service_name}
          price={selectedSubscription.price}
          startDate={selectedSubscription.start_date}
          billingCycle={selectedSubscription.billing_cycle}
          isOpen={!!selectedSubscription}
          onClose={handleCloseModal}
        />
      )}
    </div>
  );
}
