import { StrictMode } from "react";
import "./index.css";
import Router from "./Router/Router";
import { AuthProvider } from "./AuthContext/AuthProvider";

import { createRoot } from "react-dom/client";
import { RouterProvider } from "react-router";
import { Toaster } from "react-hot-toast";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <AuthProvider>
      <Toaster
        position="top-center"
        reverseOrder={false}
        toastOptions={{ style: { zIndex: 9999 } }}
      />
      <RouterProvider router={Router} />
    </AuthProvider>
  </StrictMode>
);
