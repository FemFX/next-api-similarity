"use client";
import { ThemeProvider } from "next-themes";
import { FC, PropsWithChildren } from "react";
import { SessionProvider } from "next-auth/react";

const Providers: FC<PropsWithChildren> = ({ children }) => {
  return (
    <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
      <SessionProvider>{children}</SessionProvider>
    </ThemeProvider>
  );
};
export default Providers;
