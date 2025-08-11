"use client";

import { useRouter } from "next/navigation";
import LandingPage from "@/components/LandingPage"; // adjust path if needed

export default function HomePage() {
  const router = useRouter();

  return (
    <div className="min-h-screen bg-soft-white">
      <LandingPage
        onNavigate={(screen: any) => router.push(`/${screen}`)}
      />
    </div>
  );
}
