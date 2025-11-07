"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function PerformanceReports() {
  const router = useRouter();

  useEffect(() => {
    router.replace("/admin/dashboard?tab=reports&report=performance");
  }, [router]);

  return null;
}
