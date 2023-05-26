"use client";

import { ThemeProvider } from "@mui/material";
import { theme } from "../theme/theme";

export const Providers = ({ children }: { children: React.ReactNode }) => {
  return <ThemeProvider theme={theme}>{children}</ThemeProvider>;
};
