"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

// AuthGuard 컴포넌트
const AuthGuard = ({ children }: { children: React.ReactNode }) => {
  const router = useRouter();

  useEffect(() => {
    const accessToken = localStorage.getItem("accessToken");

    if (!accessToken) {
      // accessToken이 없으면 로그인 화면으로 이동
      router.push("/");
    }
  }, [router]);

  return <>{children}</>;
};

export default AuthGuard;
