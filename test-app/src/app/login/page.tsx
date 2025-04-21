"use client";

import { useState } from "react";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleCredentialsLogin = async () => {
    const res = await signIn("credentials", {
      email,
      password,
      redirect: false,
    });

    if (res?.ok) {
      router.push("/dashboard");
    } else {
      alert("Login failed");
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-white border-2 border-cyan-900">
      <h1 className="text-2xl text-black font-bold mb-4">Login</h1>

      <div className="flex flex-col gap-2 mb-6">
        <input
          type="text"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="px-4 py-2 border text-black rounded"
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="px-4 py-2 text-black border rounded"
        />
        <button
          onClick={handleCredentialsLogin}
          className="bg-black text-white px-4 py-2 rounded"
        >
          Login with Email
        </button>
      </div>

      <button
        onClick={() => signIn("facebook", { callbackUrl: "/dashboard" })}
        className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
      >
        Continue with Facebook
      </button>
    </div>
  );
}
