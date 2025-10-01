import { createBrowserRouter } from "react-router";
import { lazy } from "react";

import PageWrapper from "@components/layout/PageWrapper";

import NotFoundPage from "@pages/NotFoundPage";

const HomePage = lazy(() => import("@pages/HomePage"));
const LoginPage = lazy(() => import("@pages/LoginPage"));
const SignUpPage = lazy(() => import("@pages/SignUpPage"));
const DashboardPage = lazy(() => import("@pages/DashboardPage"));
const AddSubscriptionPage = lazy(() => import("@pages/AddSubscriptionPage"));
const ChartPage = lazy(() => import("@pages/ChartPage"));

const router = createBrowserRouter([
  {
    path: "/",
    element: <PageWrapper />,
    children: [
      {
        index: true,
        element: <HomePage />,
      },
      {
        path: "signin",
        element: <LoginPage />,
      },
      {
        path: "signup",
        element: <SignUpPage />,
      },
      {
        path: "subscription",
        element: <DashboardPage />,
      },
      {
        path: "subscription/add",
        element: <AddSubscriptionPage />,
      },
      {
        path: "chart",
        element: <ChartPage />,
      },
      {
        path: "*",
        element: <NotFoundPage />,
      },
    ],
  },
]);

export default router;
