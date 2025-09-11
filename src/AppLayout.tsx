import { Suspense } from "react";
import { Outlet } from "react-router-dom";
import Layout from "@/common/components/Layout";

const AppLayout = () => (
  <Suspense fallback={<div>로딩 중...</div>}>
    <Layout>
      <Outlet />
    </Layout>
  </Suspense>
);

export default AppLayout;
