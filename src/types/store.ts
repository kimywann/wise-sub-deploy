import type { UserSubscription } from "@/types/subscription";

export interface SubscriptionState
  extends SubscriptionStateType,
    SubscriptionActions {}

export type SubscriptionStateType = {
  userSubscriptions: UserSubscription[];
  selectedDate: Date;
  isLoading: boolean;
  error: string | null;
};

export interface SubscriptionActions {
  setUserSubscriptions: (subscriptions: UserSubscription[]) => void;
  setSelectedDate: (date: Date) => void;
  fetchSubscriptions: (userId: string) => Promise<void>;
  updateSubscription: (subscription: UserSubscription) => void;
  deleteSubscription: (id: number) => void;
}

export interface MonthlySubscriptionData {
  year: number;
  month: string;
  monthIndex: number;
  cost: number;
  activeCount: number;
}
