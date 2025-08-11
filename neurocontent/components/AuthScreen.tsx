"use client";

import { useState } from "react";
// If the Button component exists elsewhere, update the path accordingly, for example:
import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";
import { Label } from "../components/ui/label";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../components/ui/tabs";
import Header from "../components/Header";
import { ArrowLeft } from "lucide-react";

// Local User type since we don't have ../App in Next.js
export interface User {
  name: string;
  email: string;
  plan: string;
}

interface AuthScreenProps {
  onLogin: (user: User) => void;
  onNavigate: (screen: string) => void;
}

export default function AuthScreen({ onLogin, onNavigate }: AuthScreenProps) {
  const [activeTab, setActiveTab] = useState("login");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [errors, setErrors] = useState<{ [key: string]: string }>({});

  const validateForm = () => {
    const newErrors: { [key: string]: string } = {};

    if (!email) {
      newErrors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      newErrors.email = "Email is invalid";
    }

    if (!password) {
      newErrors.password = "Password is required";
    } else if (password.length < 6) {
      newErrors.password = "Password must be at least 6 characters";
    }

    if (activeTab === "signup" && !name) {
      newErrors.name = "Name is required";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (validateForm()) {
      const user: User = {
        name: name || "Demo User",
        email,
        plan: "freemium",
      };
      onLogin(user);
    }
  };

  const handleGoogleAuth = () => {
    const user: User = {
      name: "Google User",
      email: "user@gmail.com",
      plan: "freemium",
    };
    onLogin(user);
  };

  return (
    <div className="min-h-screen bg-soft-white">
      <Header onNavigate={onNavigate} variant="landing" />

      <div className="container-neuro py-16 lg:py-24">
        <div className="max-w-lg mx-auto">
          <Button
            variant="ghost"
            onClick={() => onNavigate("landing")}
            className="mb-8 text-slate-gray hover:text-midnight-black"
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Home
          </Button>

          <Card className="border-light-lavender shadow-lg">
            <CardHeader className="text-center pb-8">
              <CardTitle className="text-3xl text-midnight-black mb-3">
                Welcome to NeuroContent
              </CardTitle>
              <CardDescription className="text-slate-gray text-lg">
                Sign in to your account or create a new one
              </CardDescription>
            </CardHeader>
            <CardContent className="px-8 pb-8">
              <Tabs value={activeTab} onValueChange={setActiveTab}>
                <TabsList className="grid w-full grid-cols-2 mb-8 h-12">
                  <TabsTrigger value="login" className="text-base">
                    Login
                  </TabsTrigger>
                  <TabsTrigger value="signup" className="text-base">
                    Sign Up
                  </TabsTrigger>
                </TabsList>

                {/* LOGIN */}
                <TabsContent value="login">
                  <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="space-y-2">
                      <Label htmlFor="email" className="text-base">
                        Email
                      </Label>
                      <Input
                        id="email"
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className={`bg-light-lavender border-0 h-12 text-base ${
                          errors.email ? "border-crimson-red border" : ""
                        }`}
                        placeholder="Enter your email"
                      />
                      {errors.email && (
                        <p className="text-crimson-red text-sm mt-2">
                          {errors.email}
                        </p>
                      )}
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="password" className="text-base">
                        Password
                      </Label>
                      <Input
                        id="password"
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className={`bg-light-lavender border-0 h-12 text-base ${
                          errors.password ? "border-crimson-red border" : ""
                        }`}
                        placeholder="Enter your password"
                      />
                      {errors.password && (
                        <p className="text-crimson-red text-sm mt-2">
                          {errors.password}
                        </p>
                      )}
                    </div>

                    <div className="text-right">
                      <button
                        type="button"
                        className="text-neuro-violet hover:underline text-base"
                      >
                        Forgot Password?
                      </button>
                    </div>

                    <Button
                      type="submit"
                      className="w-full bg-neuro-violet hover:bg-neuro-violet/90 h-12 text-base mt-8"
                    >
                      Login
                    </Button>
                  </form>
                </TabsContent>

                {/* SIGNUP */}
                <TabsContent value="signup">
                  <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="space-y-2">
                      <Label htmlFor="name" className="text-base">
                        Full Name
                      </Label>
                      <Input
                        id="name"
                        type="text"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        className={`bg-light-lavender border-0 h-12 text-base ${
                          errors.name ? "border-crimson-red border" : ""
                        }`}
                        placeholder="Enter your full name"
                      />
                      {errors.name && (
                        <p className="text-crimson-red text-sm mt-2">
                          {errors.name}
                        </p>
                      )}
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="signup-email" className="text-base">
                        Email
                      </Label>
                      <Input
                        id="signup-email"
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className={`bg-light-lavender border-0 h-12 text-base ${
                          errors.email ? "border-crimson-red border" : ""
                        }`}
                        placeholder="Enter your email"
                      />
                      {errors.email && (
                        <p className="text-crimson-red text-sm mt-2">
                          {errors.email}
                        </p>
                      )}
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="signup-password" className="text-base">
                        Password
                      </Label>
                      <Input
                        id="signup-password"
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className={`bg-light-lavender border-0 h-12 text-base ${
                          errors.password ? "border-crimson-red border" : ""
                        }`}
                        placeholder="Create a password"
                      />
                      {errors.password && (
                        <p className="text-crimson-red text-sm mt-2">
                          {errors.password}
                        </p>
                      )}
                    </div>

                    <Button
                      type="submit"
                      className="w-full bg-neuro-violet hover:bg-neuro-violet/90 h-12 text-base mt-8"
                    >
                      Sign Up
                    </Button>
                  </form>
                </TabsContent>
              </Tabs>

              {/* Google Auth */}
              <div className="mt-8">
                <div className="relative">
                  <div className="absolute inset-0 flex items-center">
                    <div className="w-full border-t border-gray-300" />
                  </div>
                  <div className="relative flex justify-center text-base">
                    <span className="px-4 bg-white text-slate-gray">
                      Or continue with
                    </span>
                  </div>
                </div>

                <Button
                  variant="outline"
                  className="w-full mt-6 border-light-lavender h-12 text-base"
                  onClick={handleGoogleAuth}
                >
                  <svg className="w-5 h-5 mr-3" viewBox="0 0 24 24">
                    <path
                      fill="currentColor"
                      d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                    />
                    <path
                      fill="currentColor"
                      d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                    />
                    <path
                      fill="currentColor"
                      d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                    />
                    <path
                      fill="currentColor"
                      d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                    />
                  </svg>
                  Continue with Google
                </Button>
              </div>

              {/* Toggle Login/Signup */}
              <div className="mt-8 text-center text-base text-slate-gray">
                {activeTab === "login" ? (
                  <p>
                    Dont have an account?{" "}
                    <button
                      onClick={() => setActiveTab("signup")}
                      className="text-neuro-violet hover:underline"
                    >
                      Sign up
                    </button>
                  </p>
                ) : (
                  <p>
                    Already have an account?{" "}
                    <button
                      onClick={() => setActiveTab("login")}
                      className="text-neuro-violet hover:underline"
                    >
                      Login
                    </button>
                  </p>
                )}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
