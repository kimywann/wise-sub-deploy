import { supabase } from "@/common/lib/supabaseClient";

export async function signup({
  email,
  password,
}: {
  email: string;
  password: string;
}) {
  const { data, error } = await supabase.auth.signUp({
    email,
    password,
  });

  if (error || !data.user) {
    throw new Error(error?.message || "회원가입 실패");
  }

  return data.user;
}
