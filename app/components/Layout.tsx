"use client";

import AuthGuard from "./AuthGuard";
import Sidebar from "./Sidebar";

const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <AuthGuard>
      <div className="flex min-h-screen">
        {/* 사이드바 */}
        <Sidebar />
        {/* 메인 컨텐츠 */}
        <main className="flex-grow bg-gray-100 p-8">{children}</main>
      </div>
    </AuthGuard>
  );
};

export default Layout;
