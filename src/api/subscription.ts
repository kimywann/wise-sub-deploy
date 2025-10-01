import { supabase } from "@/supabaseClient";

import type { ServiceItem } from "@models/service";
import type { UserSubscription } from "@models/subscription";

export const createSubscription = async (
  userId: string,
  service: ServiceItem,
) => {
  const { data, error } = await supabase.from("user_subscription").insert({
    user_id: userId,
    service_id: service.id,
    service_name: service.name,
  });

  if (error) {
    throw error;
  }

  return data;
};

export const getSubscriptions = async (userId: string) => {
  const { data, error } = await supabase
    .from("user_subscription")
    .select("id, user_id, service_name, price, start_date, billing_cycle")
    .eq("user_id", userId)
    .order("id", { ascending: false })
    .limit(100);

  if (error) {
    throw error;
  }

  return data;
};

export const updateSubscription = async (
  userSubscription: UserSubscription,
) => {
  const { data, error } = await supabase
    .from("user_subscription")
    .update({
      service_name: userSubscription.service_name,
      price: userSubscription.price,
      start_date: userSubscription.start_date,
      billing_cycle: userSubscription.billing_cycle,
    })
    .eq("id", userSubscription.id)
    .select();

  if (error) {
    throw error;
  }

  return data;
};

export const deleteSubscription = async (id: number) => {
  const { data, error } = await supabase
    .from("user_subscription")
    .delete()
    .eq("id", id);

  if (error) {
    throw error;
  }

  return data;
};
