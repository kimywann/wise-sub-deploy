import { RouterProvider } from "react-router";
import router from "./route";

import { SessionContextProvider } from "@supabase/auth-helpers-react";
import { supabase } from "./common/lib/supabaseClient";

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
