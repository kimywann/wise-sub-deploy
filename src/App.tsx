import { RouterProvider } from "react-router";
import router from "./router";

import { SessionContextProvider } from "@supabase/auth-helpers-react";
import { supabase } from "./lib/supabaseClient";

import { Analytics } from "@vercel/analytics/react";

import { Toaster } from "sonner";

function App() {
  return (
    <SessionContextProvider supabaseClient={supabase}>
      <Analytics />
      <Toaster richColors position="top-right" />
      <RouterProvider router={router} />
    </SessionContextProvider>
  );
}

export default App;
