import { supabase } from "@/lib/supabaseClient";
import type { UserSubscription } from "@/common/types/subscription-type";

const updateSubscription = async (userSubscription: UserSubscription) => {
  const { data, error } = await supabase
    .from("user_subscription")
    .update({
      service_name: userSubscription.service_name,
      price: userSubscription.price,
      start_date: userSubscription.start_date,
      billing_cycle: userSubscription.billing_cycle,
    })
    .eq("id", userSubscription.id);

  if (error) {
    throw error;
  }

  return data;
};

export default updateSubscription;
