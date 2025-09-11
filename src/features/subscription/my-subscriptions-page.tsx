import Dashboard from "./components/dashboard/dashboard";
import { useUser } from "@supabase/auth-helpers-react";
import { Navigate } from "react-router-dom";

function MySubscriptionsPage() {
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
export default MySubscriptionsPage;
