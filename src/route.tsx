import { createBrowserRouter } from "react-router";
import { lazy } from "react";

import AppLayout from "./AppLayout";

import NotFoundPage from "./common/not-found";

const HomePage = lazy(() => import("./features/home/home-page"));
const SignInPage = lazy(() => import("./features/auth/sign-in-page"));
const SignUpPage = lazy(() => import("./features/auth/sign-up-page"));
const MySubscriptionsPage = lazy(
  () => import("./features/subscription/my-subscriptions-page"),
);
const AddSubscriptionPage = lazy(
  () => import("./features/subscription/add-subscription-page"),
);
const MySubChart = lazy(() => import("./features/chart/my-sub-chart"));

const router = createBrowserRouter([
  {
    path: "/",
    element: <AppLayout />,
    children: [
      {
        index: true, // path: "/" 와 같은 의미
        element: <HomePage />,
      },
      {
        path: "signin",
        element: <SignInPage />,
      },
      {
        path: "signup",
        element: <SignUpPage />,
      },
      {
        path: "subscription",
        element: <MySubscriptionsPage />,
      },
      {
        path: "subscription/add",
        element: <AddSubscriptionPage />,
      },
      {
        path: "chart",
        element: <MySubChart />,
      },
      {
        path: "*",
        element: <NotFoundPage />,
      },
    ],
  },
]);

export default router;
