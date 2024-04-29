"use client";

import { LoginForm } from "../components/Login";
import { useAuthContext } from "../context/AuthContext";

export default function LoginPage() {
  const { login } = useAuthContext();

  return (
    <div className="flex flex-col items-center justify-center h-screen gap-y-5">
      <LoginForm login={login} />
    </div>
  );
}
