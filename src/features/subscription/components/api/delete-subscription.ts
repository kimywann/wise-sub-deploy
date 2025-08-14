import { supabase } from "@/common/lib/supabaseClient";

const deleteSubscription = async (id: number) => {
  const { data, error } = await supabase
    .from("user_subscription")
    .delete()
    .eq("id", id);

  if (error) {
    throw error;
  }

  return data;
};

export default deleteSubscription;
