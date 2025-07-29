import { RouterProvider } from "react-router";
import router from "./route";

import { SessionContextProvider } from "@supabase/auth-helpers-react";
import { supabase } from "./lib/supabaseClient";

import { Toaster } from "sonner";

function App() {
  return (
    <SessionContextProvider supabaseClient={supabase}>
      <Toaster richColors position="top-right" />
      <RouterProvider router={router} />
    </SessionContextProvider>
  );
}

export default App;
