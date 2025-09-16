import { supabase } from "@/supabaseClient";

export const login = async (email: string, password: string) => {
  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });

  if (error) {
    throw error;
  }

  return data;
};

export const signup = async ({
  email,
  password,
}: {
  email: string;
  password: string;
}) => {
  const { data, error: authError } = await supabase.auth.signUp({
    email,
    password,
  });

  if (authError) {
    throw new Error(authError.message);
  }

  const userData = data.user;

  if (!userData) {
    throw new Error("회원가입 실패");
  }

  const { error: usersError } = await supabase.from("users").insert({
    id: userData.id,
    email,
  });

  if (usersError) {
    throw new Error(usersError.message || "회원가입 실패");
  }

  return data.user;
};
