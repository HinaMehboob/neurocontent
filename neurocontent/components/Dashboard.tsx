// components/Dashboard.tsx
"use client";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import Header from "@/components/Header";
import { PlusCircle, FileText, Settings } from "lucide-react";
import { useRouter } from "next/navigation";

interface User {
  name: string;
  email?: string;
}

interface DashboardProps {
  user: User | null;
  onLogout: () => void;
}

export default function Dashboard({ user, onLogout }: DashboardProps) {
  const router = useRouter();

  return (
    <div className="min-h-screen bg-soft-white">
      <Header user={user} onLogout={onLogout} variant="app" />

      <div className="container-neuro py-12 lg:py-16">
        {/* Welcome Section */}
        <div className="mb-12 lg:mb-16">
          <h1 className="text-3xl lg:text-4xl font-bold text-midnight-black mb-4">
            Welcome back, {user?.name}!
          </h1>
          <p className="text-slate-gray text-lg lg:text-xl">
            Ready to create amazing content with AI? Let&apos;s get started.
          </p>
        </div>

        {/* Main Actions */}
        <div className="space-y-8">
          <div>
            <h2 className="text-2xl font-semibold text-midnight-black mb-8">
              Quick Actions
            </h2>
            <div className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto">
              <Card
                className="border-light-lavender hover:shadow-xl transition-all duration-300 cursor-pointer group transform hover:-translate-y-1"
                onClick={() => router.push("/generator")}
              >
                <CardHeader className="text-center pb-6">
                  <div className="w-16 h-16 bg-neuro-violet rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform">
                    <PlusCircle className="h-8 w-8 text-white" />
                  </div>
                  <CardTitle className="text-lg text-midnight-black">
                    Create New Content
                  </CardTitle>
                </CardHeader>
                <CardContent className="pt-0 pb-8">
                  <CardDescription className="text-center text-slate-gray text-base leading-relaxed">
                    Generate AI-powered content with custom keywords and tone
                  </CardDescription>
                </CardContent>
              </Card>

              <Card
                className="border-light-lavender hover:shadow-xl transition-all duration-300 cursor-pointer group transform hover:-translate-y-1"
                onClick={() => router.push("/saved-content")}
              >
                <CardHeader className="text-center pb-6">
                  <div className="w-16 h-16 bg-neon-blue rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform">
                    <FileText className="h-8 w-8 text-white" />
                  </div>
                  <CardTitle className="text-lg text-midnight-black">
                    View Saved Content
                  </CardTitle>
                </CardHeader>
                <CardContent className="pt-0 pb-8">
                  <CardDescription className="text-center text-slate-gray text-base leading-relaxed">
                    Access and manage your previously created content
                  </CardDescription>
                </CardContent>
              </Card>

              <Card
                className="border-light-lavender hover:shadow-xl transition-all duration-300 cursor-pointer group transform hover:-translate-y-1"
                onClick={() => router.push("/settings")}
              >
                <CardHeader className="text-center pb-6">
                  <div className="w-16 h-16 bg-slate-gray rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform">
                    <Settings className="h-8 w-8 text-white" />
                  </div>
                  <CardTitle className="text-lg text-midnight-black">
                    Account Settings
                  </CardTitle>
                </CardHeader>
                <CardContent className="pt-0 pb-8">
                  <CardDescription className="text-center text-slate-gray text-base leading-relaxed">
                    Update your profile, plan, and preferences
                  </CardDescription>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
