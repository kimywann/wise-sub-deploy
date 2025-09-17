import { RouterProvider } from "react-router";
import router from "./router";
import { useEffect } from "react";

import { SessionContextProvider } from "@supabase/auth-helpers-react";
import { supabase } from "./supabaseClient";
import { Toaster } from "sonner";
import { preloadImages, CRITICAL_IMAGES } from "@/utils/preload-images";

function App() {
  useEffect(() => {
    preloadImages(CRITICAL_IMAGES).catch((error) => {
      console.warn("이미지 프리로드 실패:", error);
    });
  }, []);

  return (
    <SessionContextProvider supabaseClient={supabase}>
      <Toaster richColors position="top-center" />
      <RouterProvider router={router} />
    </SessionContextProvider>
  );
}

export default App;
