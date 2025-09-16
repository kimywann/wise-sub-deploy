import { useMemo } from "react";
import { useSubscriptionStore } from "@/stores/subscription-store";
import { getActiveSubscriptions } from "@/utils/getActiveSubscriptions";
import { getMonthlyTotalCost } from "@/utils/getMonthlyTotalCost";
import { getDateComponents } from "@/utils/date";
import type { MonthlySubscriptionData } from "@/types/store";

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
  return getMonthlyTotalCost(activeSubscriptions, selectedDate);
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

export const useMonthlySubscriptionData = (months = 12) => {
  const userSubscriptions = useSubscriptionStore(
    (state) => state.userSubscriptions,
  );

  return useMemo(() => {
    const monthlyData: MonthlySubscriptionData[] = [];
    const endDate = new Date();
    const startDate = new Date();
    startDate.setMonth(startDate.getMonth() - (months - 1));

    const current = new Date(startDate);
    while (current <= endDate) {
      const activeSubscriptions = getActiveSubscriptions(
        userSubscriptions,
        current,
      );
      const cost = getMonthlyTotalCost(activeSubscriptions, current);
      const { year, month } = getDateComponents(current);

      monthlyData.push({
        year,
        month: current.toLocaleDateString("ko-KR", { month: "short" }),
        monthIndex: month,
        cost,
        activeCount: activeSubscriptions.length,
      });

      current.setMonth(current.getMonth() + 1);
    }

    return monthlyData;
  }, [userSubscriptions, months]);
};

export const useAvailableYears = () => {
  const userSubscriptions = useSubscriptionStore(
    (state) => state.userSubscriptions,
  );

  return useMemo(() => {
    if (userSubscriptions.length === 0) return [];

    const years = new Set<number>();
    const currentYear = new Date().getFullYear();

    userSubscriptions.forEach((subscription) => {
      const startDate = new Date(subscription.start_date);
      const startYear = startDate.getFullYear();

      for (let year = startYear; year <= currentYear; year++) {
        years.add(year);
      }
    });

    return Array.from(years).sort((a, b) => b - a);
  }, [userSubscriptions]);
};

// 복잡한 반복 계산 - useMemo 유지
export const useYearlySubscriptionData = (selectedYear: number) => {
  const userSubscriptions = useSubscriptionStore(
    (state) => state.userSubscriptions,
  );

  return useMemo(() => {
    const monthlyData: MonthlySubscriptionData[] = [];

    for (let month = 0; month < 12; month++) {
      const targetDate = new Date(selectedYear, month, 1);
      const activeSubscriptions = getActiveSubscriptions(
        userSubscriptions,
        targetDate,
      );
      const cost = getMonthlyTotalCost(activeSubscriptions, targetDate);

      monthlyData.push({
        year: selectedYear,
        month: targetDate.toLocaleDateString("ko-KR", { month: "short" }),
        monthIndex: month + 1,
        cost,
        activeCount: activeSubscriptions.length,
      });
    }

    return monthlyData;
  }, [userSubscriptions, selectedYear]);
};
