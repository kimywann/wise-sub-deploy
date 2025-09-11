import { create } from "zustand";
import { devtools, persist } from "zustand/middleware";

import type { UserSubscription } from "@/types/subscription";

import { getSubscriptions } from "@/api/userSubscription";

import {
  isSubscriptionActiveInMonth,
  isYearlySubscriptionInStartMonth,
  getDateComponents,
} from "@/hooks/dashboard/useDateUtils";

interface MonthlyData {
  month: string;
  cost: number;
  count: number;
  year: number;
  monthNumber: number;
}

interface SubscriptionState {
  userSubscriptions: UserSubscription[];
  selectedDate: Date;
  isLoading: boolean;
  error: string | null;
  monthlyData: MonthlyData[];

  // Actions
  setUserSubscriptions: (subscriptions: UserSubscription[]) => void;
  setSelectedDate: (date: Date) => void;
  fetchSubscriptions: (userId: string) => Promise<void>;
  updateSubscription: (subscription: UserSubscription) => void;
  deleteSubscription: (id: number) => void;
  generateMonthlyData: (months: number) => void;
}

export const useSubscriptionStore = create<SubscriptionState>()(
  devtools(
    persist(
      (set, get) => ({
        // 초기 상태
        userSubscriptions: [],
        selectedDate: new Date(),
        isLoading: false,
        error: null,
        monthlyData: [],

        // Actions
        setUserSubscriptions: (subscriptions) => {
          set({ userSubscriptions: subscriptions });
        },

        setSelectedDate: (date) => {
          set({ selectedDate: date });
        },

        fetchSubscriptions: async (userId) => {
          set({ isLoading: true, error: null });

          try {
            const data = await getSubscriptions(userId);
            get().setUserSubscriptions(data);
          } catch (error) {
            console.error("구독 불러오기 실패", error);
            set({
              error: "구독 데이터를 불러오는데 실패했습니다.",
              isLoading: false,
            });
          } finally {
            set({ isLoading: false });
          }
        },

        updateSubscription: (updatedSubscription) => {
          const { userSubscriptions } = get();
          const newSubscriptions = userSubscriptions.map((sub) =>
            sub.id === updatedSubscription.id ? updatedSubscription : sub,
          );
          get().setUserSubscriptions(newSubscriptions);
        },

        deleteSubscription: (id) => {
          const { userSubscriptions } = get();
          const newSubscriptions = userSubscriptions.filter(
            (sub) => sub.id !== id,
          );
          get().setUserSubscriptions(newSubscriptions);
        },

        // 차트용 월별 데이터 생성 (지정된 개월 수만큼)
        generateMonthlyData: (months = 12) => {
          const { userSubscriptions } = get();
          const monthlyData: MonthlyData[] = [];

          const endDate = new Date();
          const startDate = new Date();
          startDate.setMonth(startDate.getMonth() - (months - 1));

          const current = new Date(startDate);
          while (current <= endDate) {
            const activeSubscriptions = getActiveSubscriptions(
              userSubscriptions,
              current,
            );
            const cost = calculateMonthlyCost(activeSubscriptions, current);
            const { year, month } = getDateComponents(current);

            monthlyData.push({
              month: current.toLocaleDateString("ko-KR", {
                month: "short",
              }),
              cost,
              count: activeSubscriptions.length,
              year,
              monthNumber: month,
            });

            current.setMonth(current.getMonth() + 1);
          }

          set({ monthlyData });
        },
      }),
      {
        name: "subscription-storage", // 로컬 스토리지 키
        // persist할 필드들만 선택 (isLoading, error는 제외)
        partialize: (state) => ({
          userSubscriptions: state.userSubscriptions,
          selectedDate: state.selectedDate,
          monthlyData: state.monthlyData,
        }),
        // 하이드레이션 후 실행되는 함수
        onRehydrateStorage: () => (state) => {
          if (state) {
            // selectedDate가 문자열인 경우 Date 객체로 변환
            if (typeof state.selectedDate === "string") {
              state.selectedDate = new Date(state.selectedDate);
            }
            // selectedDate가 유효하지 않은 경우 현재 날짜로 설정
            if (
              !(state.selectedDate instanceof Date) ||
              isNaN(state.selectedDate.getTime())
            ) {
              state.selectedDate = new Date();
            }
          }
        },
      },
    ),
    {
      name: "subscription-store",
    },
  ),
);

// 계산 함수들 (스토어 외부로 분리)
const calculateMonthlyCost = (
  subscriptions: UserSubscription[],
  date: Date,
): number => {
  return subscriptions.reduce((acc, subscription) => {
    // 연간 구독인 경우 시작일 월에만 가격 포함
    if (isYearlySubscriptionInStartMonth(subscription, date)) {
      return acc + Number(subscription.price);
    }

    // 월간 구독인 경우 항상 가격 포함
    if (subscription.billing_cycle === "monthly") {
      return acc + Number(subscription.price);
    }

    return acc;
  }, 0);
};

const getActiveSubscriptions = (
  subscriptions: UserSubscription[],
  date: Date,
): UserSubscription[] => {
  // date가 유효한 Date 객체인지 확인
  if (!(date instanceof Date) || isNaN(date.getTime())) {
    console.warn("Invalid date provided to getActiveSubscriptions:", date);
    return [];
  }

  return subscriptions.filter((subscription) =>
    isSubscriptionActiveInMonth(subscription.start_date, date),
  );
};

// 기본 상태 selectors
export const useUserSubscriptions = () =>
  useSubscriptionStore((state) => state.userSubscriptions);

export const useSelectedDate = () =>
  useSubscriptionStore((state) => state.selectedDate);

export const useMonthlyData = () =>
  useSubscriptionStore((state) => state.monthlyData);

export const useSubscriptionLoading = () =>
  useSubscriptionStore((state) => state.isLoading);

export const useSubscriptionError = () =>
  useSubscriptionStore((state) => state.error);

// 계산된 값들을 위한 별도 훅들
export const useActiveSubscriptions = () => {
  const userSubscriptions = useSubscriptionStore(
    (state) => state.userSubscriptions,
  );
  const selectedDate = useSubscriptionStore((state) => state.selectedDate);

  return getActiveSubscriptions(userSubscriptions, selectedDate);
};

export const useMonthlyCost = () => {
  const userSubscriptions = useSubscriptionStore(
    (state) => state.userSubscriptions,
  );
  const selectedDate = useSubscriptionStore((state) => state.selectedDate);

  const activeSubscriptions = getActiveSubscriptions(
    userSubscriptions,
    selectedDate,
  );
  return calculateMonthlyCost(activeSubscriptions, selectedDate);
};

export const useSubscriptionCount = () => {
  const userSubscriptions = useSubscriptionStore(
    (state) => state.userSubscriptions,
  );
  const selectedDate = useSubscriptionStore((state) => state.selectedDate);

  const activeSubscriptions = getActiveSubscriptions(
    userSubscriptions,
    selectedDate,
  );
  return activeSubscriptions.length;
};

// Actions - 개별적으로 export
export const useSetSelectedDate = () =>
  useSubscriptionStore((state) => state.setSelectedDate);

export const useFetchSubscriptions = () =>
  useSubscriptionStore((state) => state.fetchSubscriptions);

export const useUpdateSubscription = () =>
  useSubscriptionStore((state) => state.updateSubscription);

export const useDeleteSubscription = () =>
  useSubscriptionStore((state) => state.deleteSubscription);

export const useGenerateMonthlyData = () =>
  useSubscriptionStore((state) => state.generateMonthlyData);
