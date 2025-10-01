import Button from "@components/common/Button";
import { Link } from "react-router-dom";

const NotFoundPage = () => {
  return (
    <div className="flex min-h-[calc(100vh-120px)] flex-col items-center justify-center px-4">
      <div className="text-center">
        <h1 className="mb-4 text-9xl font-bold text-slate-300">404</h1>

        <h2 className="mb-4 text-2xl font-bold text-slate-800 md:text-3xl">
          페이지를 찾을 수 없습니다
        </h2>

        <p className="mb-8 text-lg text-slate-600 md:text-xl">
          요청하신 페이지가 존재하지 않거나 이동되었을 수 있습니다.
        </p>

        <div className="flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
          <Link to="/">
            <Button type="button" size="md" variant="primary">
              홈으로 돌아가기
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default NotFoundPage;
