import { create } from "zustand";
import { devtools, persist } from "zustand/middleware";
import { getSubscriptions } from "@/api/userSubscription";
import type { SubscriptionState } from "@/types/store";

export const useSubscriptionStore = create<SubscriptionState>()(
  devtools(
    persist(
      (set, get) => ({
        userSubscriptions: [],
        selectedDate: new Date(),
        isLoading: false,
        error: null,

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
      }),
      {
        name: "subscription-storage",
        partialize: (state) => ({
          userSubscriptions: state.userSubscriptions,
          selectedDate: state.selectedDate,
        }),
        onRehydrateStorage: () => (state) => {
          if (state) {
            if (typeof state.selectedDate === "string") {
              state.selectedDate = new Date(state.selectedDate);
            }
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
