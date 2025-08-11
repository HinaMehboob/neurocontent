"use client";

import Image from "next/image";
import { Button } from "./ui/button";

interface User {
  name: string;
  email: string;
  plan: "freemium" | "premium";
}

interface HeaderProps {
  user?: User | null;
  onNavigate: (screen: string) => void;
  onLogout?: () => void;
  variant?: "landing" | "app";
}

export default function Header({
  user,
  onNavigate,
  onLogout,
  variant = "landing",
}: HeaderProps) {
  return (
    <header className="bg-deep-indigo-gray">
      <div className="container-neuro">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div
            className="flex items-center space-x-2 cursor-pointer"
            onClick={() => onNavigate(user ? "dashboard" : "landing")}
          >
            <Image
              src="/neuraContentLogo.png"
              alt="NeuroContent Logo"
              width={40}
              height={40}
              className="object-contain"
            />
            <span className="text-soft-white text-xl font-semibold">
              NeuroContent
            </span>
          </div>

          {/* Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            {variant === "landing" && (
              <>
                <button className="text-soft-white hover:text-neon-blue transition-colors">
                  Features
                </button>
                <button className="text-soft-white hover:text-neon-blue transition-colors">
                  Pricing
                </button>
                <button className="text-soft-white hover:text-neon-blue transition-colors">
                  Contact
                </button>
              </>
            )}
          </nav>

          {/* Auth/User Actions */}
          <div className="flex items-center space-x-4">
            {user ? (
              <>
                <span className="text-soft-white">Welcome, {user.name}!</span>
                <div
                  className={`px-2 py-1 rounded-full text-xs ${
                    user.plan === "premium"
                      ? "bg-emerald-green text-white"
                      : "bg-slate-gray text-white"
                  }`}
                >
                  {user.plan === "premium" ? "Premium" : "Freemium"}
                </div>
                {onLogout && (
                  <Button
                    size="sm"
                    onClick={onLogout}
                    className="bg-crimson-red text-white hover:bg-crimson-red/80 border-0"
                  >
                    Logout
                  </Button>
                )}
              </>
            ) : (
              <>
                <Button
                  variant="ghost"
                  onClick={() => onNavigate("auth")}
                  className="text-soft-white hover:text-neon-blue hover:bg-transparent"
                >
                  Login
                </Button>
                <Button
                  onClick={() => onNavigate("auth")}
                  className="bg-neuro-violet hover:bg-neuro-violet/90 text-white"
                >
                  Get Started
                </Button>
              </>
            )}
          </div>
        </div>
      </div>
    </header>
  );
}
