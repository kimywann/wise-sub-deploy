import { useUser } from "@supabase/auth-helpers-react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";

import {
  getSubscriptions,
  updateSubscription,
  deleteSubscription,
  createSubscription,
} from "@/api/subscription";

import type { ServiceItem } from "@/types/service";
import type { UserSubscription } from "@/types/subscription";

export const useSubscriptionsQuery = () => {
  const user = useUser();

  const query = useQuery({
    queryKey: ["subscriptions", user?.id],
    queryFn: () => getSubscriptions(user!.id),
    enabled: !!user?.id,
  });

  return query;
};

export const useUpdateSubscriptionMutation = () => {
  const queryClient = useQueryClient();
  const user = useUser();

  return useMutation({
    mutationFn: updateSubscription,
    // 낙관적 업데이트
    onMutate: async (newSubscription: UserSubscription) => {
      // 진행 중인 쿼리 취소
      await queryClient.cancelQueries({
        queryKey: ["subscriptions", user?.id],
      });

      // 이전 데이터 백업
      const previousSubscriptions = queryClient.getQueryData<
        UserSubscription[]
      >(["subscriptions", user?.id]);

      // 낙관적으로 새 데이터 설정
      if (previousSubscriptions) {
        const optimisticData = previousSubscriptions.map((sub) =>
          sub.id === newSubscription.id ? newSubscription : sub,
        );

        queryClient.setQueryData(["subscriptions", user?.id], optimisticData);
      }

      // 롤백을 위한 컨텍스트 반환
      return { previousSubscriptions };
    },
    // 에러 시 롤백
    onError: (_err, _newSubscription, context) => {
      if (context?.previousSubscriptions) {
        queryClient.setQueryData(
          ["subscriptions", user?.id],
          context.previousSubscriptions,
        );
      }
    },
    // 성공하든 실패하든 쿼리 무효화
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ["subscriptions", user?.id] });
    },
  });
};

export const useDeleteSubscriptionMutation = () => {
  const queryClient = useQueryClient();
  const user = useUser();

  return useMutation({
    mutationFn: deleteSubscription,
    // 낙관적 업데이트
    onMutate: async (deletedId: number) => {
      await queryClient.cancelQueries({
        queryKey: ["subscriptions", user?.id],
      });

      const previousSubscriptions = queryClient.getQueryData<
        UserSubscription[]
      >(["subscriptions", user?.id]);

      if (previousSubscriptions) {
        const optimisticData = previousSubscriptions.filter(
          (sub) => sub.id !== deletedId,
        );

        queryClient.setQueryData(["subscriptions", user?.id], optimisticData);
      }

      return { previousSubscriptions };
    },
    onError: (_err, _deletedId, context) => {
      if (context?.previousSubscriptions) {
        queryClient.setQueryData(
          ["subscriptions", user?.id],
          context.previousSubscriptions,
        );
      }
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ["subscriptions", user?.id] });
    },
  });
};

export const useAddSubscriptionMutation = () => {
  const queryClient = useQueryClient();
  const user = useUser();

  return useMutation({
    mutationFn: ({ service }: { service: ServiceItem }) =>
      createSubscription(user!.id, service),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["subscriptions", user?.id] });
    },
  });
};
