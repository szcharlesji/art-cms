"use client";

import { usePathname } from "next/navigation";
import { useEffect } from "react";
import Headbar from "./Headbar";
import Footer from "./Footer";

export function ConditionalLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const isAdminRoute = pathname?.startsWith("/admin") ?? false;

  useEffect(() => {
    if (isAdminRoute) {
      document.body.classList.add("admin-route");
    } else {
      document.body.classList.remove("admin-route");
    }
    return () => {
      document.body.classList.remove("admin-route");
    };
  }, [isAdminRoute]);

  if (isAdminRoute) {
    // Admin routes have their own layout structure, don't wrap in main
    return <>{children}</>;
  }

  return (
    <>
      <Headbar />
      <main>{children}</main>
      <Footer />
    </>
  );
}

