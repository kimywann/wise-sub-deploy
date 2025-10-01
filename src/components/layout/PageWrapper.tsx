import { Suspense } from "react";
import { Outlet } from "react-router-dom";
import Layout from "@components/layout";

const PageWrapper = () => (
  <Suspense
    fallback={
      <div className="flex min-h-screen items-center justify-center">
        <div className="flex flex-col items-center space-y-4">
          <div className="h-10 w-10 animate-spin rounded-full border-4 border-slate-300 border-t-indigo-500"></div>
          <p className="text-base text-gray-600">페이지를 불러오는 중...</p>
        </div>
      </div>
    }
  >
    <Layout>
      <Outlet />
    </Layout>
  </Suspense>
);

export default PageWrapper;
