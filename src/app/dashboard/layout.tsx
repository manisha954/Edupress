/** @format */
"use client";

import { DisplayProviderAdminMain } from "@/components/UI/Provider/displayProviders/DisplayProviderAdminMain";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import React, { useEffect } from "react";

export default function Layout({
  children,
  adminDash,
}: {
  children: React.ReactNode;
  adminDash: React.ReactNode;
}) {
  const { data: session, status } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (status === "unauthenticated") {
      router.push("/login");
    }
  }, []);

  if (status === "loading") {
    return <p>Loading...</p>; // Or any other loading indicator
  }

  const userRole = session?.user?.role;
  console.log(userRole);
  return (
    <>
      {children}
      {userRole === "Admin" && (
        <DisplayProviderAdminMain>{adminDash}</DisplayProviderAdminMain>
      )}
    </>
  );
}
