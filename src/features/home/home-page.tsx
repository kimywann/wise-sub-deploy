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
        <div className="flex h-full flex-col items-center justify-center">
          <p className="flex text-2xl font-bold whitespace-nowrap md:text-4xl">
            이렇게 많은 구독 서비스를 쓰고 있었다고?
          </p>
          <div>
            <p className="text-md flex pt-4 text-center font-medium whitespace-nowrap text-gray-400 md:text-2xl">
              결제일은 까먹고, 지출은 점점 늘어나고... <br /> 이제 구독 내역을
              한눈에 관리해보세요.
            </p>
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
