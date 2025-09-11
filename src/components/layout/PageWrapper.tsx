import { Suspense } from "react";
import { Outlet } from "react-router-dom";
import Layout from "@/components/layout";

const PageWrapper = () => (
  <Suspense fallback={<div>로딩 중...</div>}>
    <Layout>
      <Outlet />
    </Layout>
  </Suspense>
);

export default PageWrapper;
