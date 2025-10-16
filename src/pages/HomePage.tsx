import { useUser } from "@supabase/auth-helpers-react";
import { Link, Navigate } from "react-router-dom";

import Button from "@components/common/Button";

function HomePage() {
  const user = useUser();

  if (user) {
    return <Navigate to="/subscription" replace />;
  }

  return (
    <>
      <section className="min-h-screen w-full bg-[linear-gradient(180deg,transparent_50%,rgba(0,100,255,.1))]">
        <div className="mx-auto flex min-h-screen max-w-screen-lg flex-col items-center justify-start px-4 py-8">
          <div className="mt-8 mb-8">
            <p className="text-center text-lg font-bold text-slate-500 md:text-xl lg:text-3xl">
              모든 구독과 결제 일정, 지출 현황까지 <br /> 한눈에 보고 계획할 수
              있는 구독 관리 웹 서비스
            </p>
          </div>
          <div className="mb-8 flex flex-col items-center justify-center space-y-6 sm:flex-row sm:space-y-0 sm:space-x-6">
            <picture>
              <source
                type="image/webp"
                sizes="(max-width: 1024px) 272px, 400px"
              />
              <img
                src="/frame-home1.png"
                alt="구독 관리 대시보드 미리보기"
                className="h-[17rem] w-[17rem] max-w-full object-contain lg:h-[25rem] lg:w-[25rem]"
                width="400"
                height="389"
              />
            </picture>
            <picture>
              <source
                type="image/webp"
                sizes="(max-width: 1024px) 272px, 400px"
              />
              <img
                src="/frame-home2.png"
                alt="구독 통계 차트 미리보기"
                className="h-[17rem] w-[17rem] max-w-full object-contain lg:h-[25rem] lg:w-[25rem]"
                width="400"
                height="419"
              />
            </picture>
          </div>
          <div>
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
