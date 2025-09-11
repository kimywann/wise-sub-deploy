import Dashboard from "@/components/dashboard";
import { useUser } from "@supabase/auth-helpers-react";
import { Navigate } from "react-router-dom";

function DashboardPage() {
  const user = useUser();

  if (!user) {
    return <Navigate to="/" replace />;
  }

  return (
    <>
      <Dashboard />
    </>
  );
}
export default DashboardPage;
