"use client";

import { Button } from "./ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "./ui/card";
import Header from "./Header";
import { Zap, Edit3, Download, ArrowRight, CheckCircle } from "lucide-react";
import Image from "next/image";
import { useRouter } from "next/navigation";

import neuraContentLogo from "@/public/neuraContentLogo.png";

export default function LandingPage() {
  const router = useRouter();

  const onNavigate = (screen: string) => {
    switch (screen) {
      case "auth":
        router.push("/auth");
        break;
      case "dashboard":
        router.push("/dashboard");
        break;
      case "landing":
      default:
        router.push("/");
        break;
    }
  };

  return (
    <div className="min-h-screen bg-soft-white">
      <Header onNavigate={onNavigate} variant="landing" />

      {/* Hero Section */}
      <section className="container-neuro pt-56 pb-32 lg:pt-72 lg:pb-40">
        <div className="text-center max-w-4xl mx-auto">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-midnight-black mb-8">
            AI-Powered Content at Your Fingertips
          </h1>
          <p className="text-xl lg:text-2xl text-slate-gray mb-12 max-w-3xl mx-auto leading-relaxed">
            Generate blogs, posts, and copy in seconds. Transform your ideas
            into professional content with our advanced AI writing assistant.
          </p>
          <div className="flex justify-center">
            <Button
              size="lg"
              onClick={() => onNavigate("auth")}
              className="bg-neuro-violet hover:bg-neuro-violet/90 text-white px-10 py-4 text-lg"
            >
              Get Started
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="container-neuro py-32 lg:py-40">
        <div className="text-center mb-24">
          <h2 className="text-3xl lg:text-4xl font-bold text-midnight-black mb-8">
            Powerful Features for Content Creation
          </h2>
          <p className="text-xl text-slate-gray max-w-3xl mx-auto leading-relaxed">
            Everything you need to create, edit, and export professional content
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-16 max-w-7xl mx-auto">
          {[
            {
              icon: <Zap className="h-10 w-10 text-white" />,
              title: "Instant AI Writing",
              desc: "Generate high-quality content in seconds with our advanced AI technology",
              color: "bg-neuro-violet",
            },
            {
              icon: <Edit3 className="h-10 w-10 text-white" />,
              title: "Editable Content",
              desc: "Full WYSIWYG editor to customize and perfect your AI-generated content",
              color: "bg-neon-blue",
            },
            {
              icon: <Download className="h-10 w-10 text-white" />,
              title: "Multiple Exports",
              desc: "Export your content as PDF, DOCX, or Markdown for any platform",
              color: "bg-emerald-green",
            },
            {
              icon: <CheckCircle className="h-10 w-10 text-white" />,
              title: "Quality Control",
              desc: "Advanced algorithms ensure professional, error-free content every time",
              color: "bg-slate-gray",
            },
          ].map((feature, i) => (
            <Card
              key={i}
              className="border-light-lavender bg-white hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 group"
            >
              <CardHeader className="text-center pb-8 pt-10">
                <div
                  className={`w-20 h-20 ${feature.color} rounded-3xl flex items-center justify-center mx-auto mb-8 group-hover:scale-110 transition-transform duration-300`}
                >
                  {feature.icon}
                </div>
                <CardTitle className="text-midnight-black text-xl mb-4">
                  {feature.title}
                </CardTitle>
              </CardHeader>
              <CardContent className="pt-0 pb-10 px-8">
                <CardDescription className="text-center text-slate-gray text-base leading-relaxed">
                  {feature.desc}
                </CardDescription>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      {/* How It Works Section */}
      <section className="bg-light-lavender/30 py-24 lg:py-32">
        <div className="container-neuro">
          <div className="text-center mb-20">
            <h2 className="text-3xl lg:text-4xl font-bold text-midnight-black mb-6">
              How It Works
            </h2>
            <p className="text-xl text-slate-gray max-w-3xl mx-auto leading-relaxed">
              Get professional content in three simple steps
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-12 lg:gap-16 max-w-5xl mx-auto">
            {[
              {
                num: "1",
                title: "Enter Your Requirements",
                desc: "Specify keywords, tone, and content length to guide our AI",
                color: "bg-neuro-violet",
              },
              {
                num: "2",
                title: "AI Generates Content",
                desc: "Our advanced AI creates professional content tailored to your needs",
                color: "bg-neon-blue",
              },
              {
                num: "3",
                title: "Edit & Export",
                desc: "Refine your content and export in your preferred format",
                color: "bg-emerald-green",
              },
            ].map((step, i) => (
              <div key={i} className="text-center">
                <div
                  className={`w-20 h-20 ${step.color} rounded-full flex items-center justify-center mx-auto mb-8`}
                >
                  <span className="text-white text-3xl font-bold">
                    {step.num}
                  </span>
                </div>
                <h3 className="text-2xl font-semibold text-midnight-black mb-6">
                  {step.title}
                </h3>
                <p className="text-slate-gray text-lg leading-relaxed">
                  {step.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-deep-indigo-gray text-soft-white py-12">
        <div className="container-neuro text-center">
          <div className="flex items-center justify-center space-x-3 mb-6">
            <Image
              src={neuraContentLogo}
              alt="NeuroContent Logo"
              className="object-contain"
              width={48}
              height={48}
            />
            <span className="text-2xl font-semibold">NeuroContent</span>
          </div>
          <p className="text-slate-gray text-base">
            &copy; 2025 NeuroContent. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
}
