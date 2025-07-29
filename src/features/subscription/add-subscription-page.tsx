import { useNavigate } from "react-router-dom";

import leftIcon from "@/assets/icon/left.svg";
import ServiceBox from "./components/service/components/service-box";

function AddSubscriptionPage() {
  const navigate = useNavigate();

  return (
    <>
      <header className="relative mt-20 mb-8 flex w-full items-center justify-center">
        <img
          src={leftIcon}
          alt="뒤로가기"
          className="absolute top-1/2 left-15 h-10 w-10 -translate-y-1/2 cursor-pointer"
          onClick={() => navigate("/subscription")}
        />

        <div className="text-center">
          <h1 className="mb-2 text-3xl font-bold text-indigo-600">
            구독 서비스 추가
          </h1>
          <p className="text-md text-slate-500">클릭 하면 추가 됩니다.</p>
        </div>
      </header>

      <main className="flex items-center justify-center">
        <ServiceBox />
      </main>
    </>
  );
}

export default AddSubscriptionPage;
