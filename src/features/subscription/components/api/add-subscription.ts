import { supabase } from "@/lib/supabaseClient";

import type { ServiceItem } from "../service/constants/service-list";

export const addSubscription = async (userId: string, service: ServiceItem) => {
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
