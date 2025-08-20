import Button from "@/common/components/Button";
import { Link, Navigate } from "react-router-dom";
import { useUser } from "@supabase/auth-helpers-react";

function HomePage() {
  const user = useUser();

  if (user) {
    return <Navigate to="/subscription" replace />;
  }

  return (
    <>
      <section className="h-screen w-full bg-[linear-gradient(180deg,transparent_50%,rgba(0,100,255,.1))]">
        <div className="sm flex h-full flex-col items-center justify-center">
          <div>
            <p className="mb-4 flex pt-4 text-center text-lg font-bold whitespace-nowrap text-slate-500 md:text-xl lg:text-3xl">
              모든 구독과 결제 일정, 지출 현황까지 <br /> 한눈에 보고 계획할 수
              있는 구독 관리 웹 서비스
            </p>
          </div>
          <div className="flex">
            <img src="/frame-home1.png" alt="home-image" className="w-1/2" />
            <img src="/frame-home2.png" alt="home-image" className="w-1/2" />
          </div>
          <div className="mt-6">
            <Link to="/signin">
              <Button type="button" size="md" variant="muted">
                구독 관리 시작하기
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}

export default HomePage;
