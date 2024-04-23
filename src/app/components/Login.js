"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useState } from "react";
import { useRouter } from "next/navigation";

export function LoginForm({ login, isAuthenticated }) {
  const [loginInfo, setLoginInfo] = useState({
    email: "",
    password: "",
  });

  const router = useRouter();

  const handleSubmit = (e) => {
    e.preventDefault();
    login(loginInfo);
    if (isAuthenticated) {
      router.push("/dashboard");
    }
  };

  return (
    <Card className="mx-auto max-w-sm">
      <CardHeader>
        <CardTitle className="text-2xl">Login</CardTitle>
        <CardDescription>
          Enter your email below to login to your account
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="grid gap-4">
          <div className="grid gap-2">
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              type="email"
              placeholder="m@example.com"
              required
              onChange={(e) =>
                setLoginInfo({ ...loginInfo, email: e.target.value })
              }
            />
          </div>
          <div className="grid gap-2">
            <div className="flex items-center">
              <Label htmlFor="password">Password</Label>
              <Link href="#" className="ml-auto inline-block text-sm underline">
                Forgot your password?
              </Link>
            </div>
            <Input
              id="password"
              placeholder="Password"
              type="password"
              required
              onChange={(e) =>
                setLoginInfo({ ...loginInfo, password: e.target.value })
              }
            />
          </div>
          <Button
            type="submit"
            className="w-full"
            size="sm"
            onClick={handleSubmit}
            disabled={!loginInfo.email || !loginInfo.password}
          >
            Login
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
