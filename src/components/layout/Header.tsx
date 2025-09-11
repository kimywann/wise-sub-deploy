import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import { supabase } from "@/lib/supabaseClient";
import type { User } from "@supabase/supabase-js";

import Button from "@/components/common/Button";

function Header() {
  const [user, setUser] = useState<User | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const getInitialSession = async () => {
      const {
        data: { session },
      } = await supabase.auth.getSession();
      setUser(session?.user ?? null);
    };

    getInitialSession();

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange(async (_event, session) => {
      setUser(session?.user ?? null);
    });

    return () => subscription.unsubscribe();
  }, []);

  const handleLogout = async () => {
    await supabase.auth.signOut();
    navigate("/");
  };

  return (
    <header className="mt-4 flex justify-between">
      <div className="flex items-center gap-6">
        <h1 className="font-bold text-indigo-600">
          <Link to="/">WiseSub</Link>
        </h1>

        <nav className="flex gap-2">
          {user && (
            <>
              <Link
                to="/subscription"
                className="cursor-pointer rounded-md px-4 py-1 text-slate-600 hover:bg-slate-100"
              >
                대시보드
              </Link>
              <Link
                to="/chart"
                className="cursor-pointer rounded-md px-4 py-1 text-slate-600 hover:bg-slate-100"
              >
                차트
              </Link>
            </>
          )}
        </nav>
      </div>

      <section className="flex gap-1.5">
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
      </section>
    </header>
  );
}

export default Header;
