import { RouterProvider } from "react-router";
import router from "./router";

import { SessionContextProvider } from "@supabase/auth-helpers-react";
import { supabase } from "./supabaseClient";
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
