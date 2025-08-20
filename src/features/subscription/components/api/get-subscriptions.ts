import { supabase } from "@/common/lib/supabaseClient";

const getSubscriptions = async (userId: string) => {
  const { data, error } = await supabase
    .from("user_subscription")
    .select("id, user_id, service_name, price, start_date, billing_cycle")
    .eq("user_id", userId);

  if (error) {
    throw error;
  }

  return data;
};

export default getSubscriptions;
