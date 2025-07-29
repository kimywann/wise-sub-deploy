import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabaseClient";
import type { User } from "@supabase/supabase-js";

import Button from "./Button";
import { Link, useNavigate } from "react-router-dom";

function Header() {
  const [user, setUser] = useState<User | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    // 초기 세션 가져오기
    const getInitialSession = async () => {
      const {
        data: { session },
      } = await supabase.auth.getSession();
      setUser(session?.user ?? null);
    };

    getInitialSession();

    // 인증 상태 변경 리스너 설정
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange(async (_event, session) => {
      setUser(session?.user ?? null);
    });

    // 컴포넌트 언마운트 시 리스너 정리
    return () => subscription.unsubscribe();
  }, []);

  const handleLogout = async () => {
    await supabase.auth.signOut();
    navigate("/");
  };

  return (
    <div className="mt-4 flex justify-between">
      <Link to="/">
        <div className="font-bold text-indigo-600">WiseSub</div>
      </Link>
      <div className="flex gap-1.5">
        {user ? (
          <Button size="sm" variant="primary" onClick={handleLogout}>
            로그아웃
          </Button>
        ) : (
          <>
            <Link to="/signin">
              <Button size="sm" variant="primary">
                로그인
              </Button>
            </Link>
            <Link to="/signup">
              <Button size="sm" variant="secondary">
                회원가입
              </Button>
            </Link>
          </>
        )}
      </div>
    </div>
  );
}

export default Header;
