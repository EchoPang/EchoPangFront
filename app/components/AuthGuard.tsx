"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

// AuthGuard 컴포넌트
const AuthGuard = ({ children }: { children: React.ReactNode }) => {
  const router = useRouter();
  const [loading, setLoading] = useState(true); // 로딩 상태 관리

  useEffect(() => {
    const accessToken = localStorage.getItem("accessToken");

    if (!accessToken) {
      // accessToken이 없으면 로그인 화면으로 이동
      router.push("/");
      setLoading(false); // 인증이 완료되면 로딩 상태를 false로 설정
    } else {
      setLoading(false); // 인증이 완료되면 로딩 상태를 false로 설정
    }
  }, [router]);

  if (loading) {
    // 로딩 중일 때 스켈레톤 UI를 보여줌
    return <SkeletonDashboard />;
  }

  // 로딩이 끝나면 자식 컴포넌트를 렌더링
  return <>{children}</>;
};

const SkeletonDashboard = () => {
  return (
    <div className="flex min-h-screen">
      {/* Sidebar skeleton */}
      <div className="w-64 bg-gray-200 p-4">
        <div className="animate-pulse">
          <div className="bg-gray-300 h-8 w-3/4 mb-4 rounded"></div>
          <div className="bg-gray-300 h-8 w-1/2 mb-4 rounded"></div>
          <div className="bg-gray-300 h-8 w-2/3 mb-4 rounded"></div>
        </div>
      </div>
      {/* Main content skeleton */}
      <div className="flex-grow bg-gray-100 p-8">
        <div className="animate-pulse space-y-4">
          {/* Header skeleton */}
          <div className="bg-gray-300 h-12 w-1/3 mb-6 rounded"></div>
          {/* Content blocks skeleton */}
          <div className="grid grid-cols-3 gap-4">
            <div className="bg-gray-300 h-40 rounded"></div>
            <div className="bg-gray-300 h-40 rounded"></div>
            <div className="bg-gray-300 h-40 rounded"></div>
          </div>
          <div className="grid grid-cols-3 gap-4 mt-4">
            <div className="bg-gray-300 h-40 rounded"></div>
            <div className="bg-gray-300 h-40 rounded"></div>
            <div className="bg-gray-300 h-40 rounded"></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AuthGuard;
