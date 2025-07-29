import { supabase } from "@/lib/supabaseClient";

export async function signup({
  email,
  password,
  nickname,
  birthYear,
}: {
  email: string;
  password: string;
  nickname: string;
  birthYear: number;
}) {
  const { data, error } = await supabase.auth.signUp({
    email,
    password,
  });

  if (error || !data.user) {
    throw new Error(error?.message || "회원가입 실패");
  }

  // 프로필 테이블에 nickname, birthYear 저장
  const { error: insertError } = await supabase.from("user_detail").insert([
    {
      id: data.user.id,
      nickname,
      birth_year: birthYear,
    },
  ]);

  if (insertError) {
    throw new Error(insertError.message || "프로필 생성 실패");
  }

  return data.user;
}
