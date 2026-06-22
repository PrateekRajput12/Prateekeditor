"use client";

import dynamic from "next/dynamic";

// ssr:false is only valid inside a Client Component
const CustomCursor   = dynamic(() => import("@/components/ui/CustomCursor"),   { ssr: false });
const ScrollProgress = dynamic(() => import("@/components/ui/ScrollProgress"), { ssr: false });

export default function ClientProviders() {
  return (
    <>
      <CustomCursor />
      <ScrollProgress />
    </>
  );
}
