import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";
import { QueryClientProvider } from "@tanstack/react-query";
import { ThemeProvider, CssBaseline } from "@mui/material";
import theme from "./theme";
import { BinProvider } from "@/context/BinProvider";
import { UserProvider } from "./context/UserProvider.tsx";

import { QueryClient } from "@tanstack/react-query";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <QueryClientProvider client={new QueryClient()}>
        <UserProvider>
          <BinProvider>
            <App />
          </BinProvider>
        </UserProvider>
      </QueryClientProvider>
    </ThemeProvider>
  </StrictMode>
);
