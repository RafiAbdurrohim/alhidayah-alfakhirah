"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useAuthStore } from "@/lib/hooks/useAuth";

export default function LoginPage() {
  const router = useRouter();
  const { signIn } = useAuthStore();
  const [statusText, setStatusText] = useState("Redirecting to login portal...");

  useEffect(() => {
    const handleAutoLogin = async () => {
      const params = new URLSearchParams(window.location.search);
      const email = params.get("email");
      const password = params.get("password");
      const landingUrl = process.env.NEXT_PUBLIC_LANDING_URL || "http://localhost:3000";

      if (email && password) {
        setStatusText("Authenticating secure session...");
        try {
          // Lakukan sign-in di domain dashboard agar session tersimpan di LocalStorage domain ini
          await signIn(decodeURIComponent(email), decodeURIComponent(password));
          setStatusText("Session established. Redirecting to dashboard...");
          
          // Setelah berhasil, arahkan ke dashboard
          router.replace("/dashboard");
        } catch (err: any) {
          console.error("Auto login error:", err);
          let errMsg = "Login gagal. Periksa kembali email dan password Anda.";
          if (err.message && err.message.includes("auth/")) {
            errMsg = "Email atau password salah.";
          } else if (err.message) {
            errMsg = err.message;
          }
          // Jika gagal, kembalikan ke landing login dengan pesan error
          window.location.href = `${landingUrl}/en/login?error=${encodeURIComponent(errMsg)}`;
        }
      } else {
        // Jika tidak ada parameter kredensial, langsung redirect ke landing page login
        window.location.href = `${landingUrl}/en/login`;
      }
    };

    handleAutoLogin();
  }, [signIn, router]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-900 text-white">
      <div className="text-center">
        <div className="animate-spin text-4xl mb-4">⏳</div>
        <p className="text-gray-400 font-light tracking-wide">{statusText}</p>
      </div>
    </div>
  );
}
