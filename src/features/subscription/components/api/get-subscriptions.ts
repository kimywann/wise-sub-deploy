import { supabase } from "@/lib/supabaseClient";

const getSubscriptions = async (userId: string) => {
  const { data, error } = await supabase
    .from("user_subscription")
    .select("*")
    .eq("user_id", userId);

  if (error) {
    throw error;
  }

  return data;
};

export default getSubscriptions;
