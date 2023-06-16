"use client";

import { ThemeProvider } from "@mui/system";
import { theme, darkTheme } from "./theme";
import CssBaseline from "@mui/material/CssBaseline";
import createCache from "@emotion/cache";
import { CacheProvider } from "@emotion/react";
import Head from "next/head";


export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const cache = createCache({ key: "css", prepend: true });
  return (
    <html lang="en">
      <CacheProvider value={cache}>
        <ThemeProvider theme={theme}>
          <CssBaseline />
          <body>{children}</body>
        </ThemeProvider>
      </CacheProvider>
    </html>
  );
}
