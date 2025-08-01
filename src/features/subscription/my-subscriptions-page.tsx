import Dashboard from "./components/dashboard/dashboard";
import { useUser } from "@supabase/auth-helpers-react";
import { Navigate } from "react-router-dom";
import Button from "@/common/components/Button";

function MySubscriptionsPage() {
  const user = useUser();

  if (!user) {
    return <Navigate to="/" replace />;
  }

  const handleFeedbackClick = () => {
    const feedbackFormUrl = "https://forms.gle/XCw7483Y14b5womv5";
    window.open(feedbackFormUrl, "_blank", "noopener,noreferrer");
  };

  return (
    <>
      <Dashboard />

      <div className="mt-6 rounded-lg border border-slate-200 bg-slate-50 p-6">
        <div className="text-center">
          <h3 className="mb-2 text-lg font-semibold text-slate-800">
            서비스 개선에 도움을 주세요! 🙏
          </h3>
          <p className="mb-4 text-slate-600">
            구독 관리 서비스를 더 좋게 만들기 위해 여러분의 소중한 의견을 듣고
            싶습니다.
          </p>
          <Button
            onClick={handleFeedbackClick}
            variant="muted"
            size="md"
            className="inline-flex items-center gap-2"
          >
            📝 피드백 보내기
          </Button>
        </div>
      </div>
    </>
  );
}
export default MySubscriptionsPage;
