"use client";

import { usePathname } from "next/navigation";
import Headbar from "./Headbar";
import Footer from "./Footer";

export function ConditionalLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const isAdminRoute = pathname?.startsWith("/admin") ?? false;

  return (
    <>
      {!isAdminRoute && <Headbar />}
      <main>{children}</main>
      {!isAdminRoute && <Footer />}
    </>
  );
}

