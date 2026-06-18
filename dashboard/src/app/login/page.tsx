"use client";

import { useEffect } from "react";

export default function LoginPage() {
  useEffect(() => {
    const landingUrl = process.env.NEXT_PUBLIC_LANDING_URL || "http://localhost:3000";
    window.location.href = `${landingUrl}/en/login`;
  }, []);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-900 text-white">
      <div className="text-center">
        <div className="animate-spin text-4xl mb-4">⏳</div>
        <p className="text-gray-400">Redirecting to login portal...</p>
      </div>
    </div>
  );
}
