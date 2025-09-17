import React from "react";
import { ErrorBoundary as ReactErrorBoundary } from "react-error-boundary";

interface ErrorFallbackProps {
  error: Error;
  resetErrorBoundary: () => void;
}

const ErrorFallback = ({ error, resetErrorBoundary }: ErrorFallbackProps) => (
  <div className="flex min-h-screen items-center justify-center bg-gray-50">
    <div className="mx-auto max-w-md rounded-xl bg-white p-12 shadow-md">
      <div className="text-center">
        <h1 className="mb-2 text-xl font-semibold text-gray-900">
          앗! 문제가 발생했어요
        </h1>

        <p className="mb-6 text-gray-600">
          예상치 못한 오류가 발생했습니다. <br />
          페이지를 다시 시도해 주세요.
        </p>

        {process.env.NODE_ENV === "development" && (
          <details className="mb-6 rounded-md bg-red-50 p-4 text-left">
            <summary className="cursor-pointer text-sm font-medium text-red-800">
              개발자 정보 (개발 환경에서만 표시)
            </summary>
            <pre className="mt-2 text-xs whitespace-pre-wrap text-red-700">
              {error.message}
            </pre>
            <pre className="mt-2 text-xs text-red-600">{error.stack}</pre>
          </details>
        )}

        <div className="flex flex-col gap-3 sm:flex-row sm:justify-center">
          <button
            onClick={resetErrorBoundary}
            className="inline-flex items-center justify-center rounded-md bg-indigo-600 px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-indigo-700 focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 focus:outline-none"
          >
            다시 시도
          </button>

          <button
            onClick={() => (window.location.href = "/")}
            className="inline-flex items-center justify-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 transition-colors hover:bg-gray-50 focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 focus:outline-none"
          >
            홈으로 이동
          </button>
        </div>
      </div>
    </div>
  </div>
);

const handleError = (error: Error, errorInfo: React.ErrorInfo) => {
  if (process.env.NODE_ENV === "development") {
    console.error("Error:", error);
    console.error("Error Info:", errorInfo);
  }

  // TODO: Sentry, LogRocket 등의 에러 모니터링 서비스 연동
  if (process.env.NODE_ENV === "production") {
    // 예시: 에러 모니터링 서비스에 전송
  }
};

interface ErrorBoundaryProps {
  children: React.ReactNode;
  fallback?: React.ComponentType<ErrorFallbackProps>;
  onError?: (error: Error, errorInfo: React.ErrorInfo) => void;
}

const ErrorBoundary = ({
  children,
  fallback = ErrorFallback,
  onError = handleError,
}: ErrorBoundaryProps) => {
  return (
    <ReactErrorBoundary
      FallbackComponent={fallback}
      onError={onError}
      onReset={() => {
        window.location.reload();
      }}
    >
      {children}
    </ReactErrorBoundary>
  );
};

export default ErrorBoundary;
export { ErrorFallback };
export type { ErrorFallbackProps, ErrorBoundaryProps };
