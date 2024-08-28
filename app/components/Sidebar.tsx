"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const Sidebar = () => {
  const pathname = usePathname();

  return (
    <aside className="w-64 bg-white shadow-md flex flex-col p-2">
      <div className="flex items-center justify-start px-4 py-4">
        {/* 로고와 텍스트 로고 */}
        <img src="/images/logo.png" alt="Logo" className="w-10 h-10 mr-2" />
        <img src="/images/textlogo.png" alt="Text Logo" className="w-40 h-6" />
      </div>
      {/* 메뉴 항목 */}
      <nav className="mt-4 flex-grow">
        <ul>
          {/* 대시보드 메뉴 */}
          <li
            className={`flex items-center px-4 py-3 cursor-pointer  ${
              pathname === "/dashboard"
                ? "bg-eco-main text-white rounded-md"
                : "text-[#808191]"
            }`}
          >
            <Link
              href="/dashboard"
              className="min-w-60 w-full flex items-center"
            >
              <div className="w-6 h-6 flex items-center justify-center mr-2">
                <img
                  src={
                    pathname === "/dashboard"
                      ? "/images/dashboard.png"
                      : "/images/dashboardNot.png"
                  }
                  alt="대시보드 아이콘"
                  className="w-5 h-5"
                />
              </div>
              <span className="font-pretendard">대시보드</span>
            </Link>
          </li>

          {/* 폐기물관리 메뉴 */}
          <li
            className={`flex items-center px-4 py-3 cursor-pointer  ${
              pathname === "/waste-management"
                ? "bg-eco-main text-white rounded-md"
                : "text-[#808191]"
            }`}
          >
            <Link
              href="/waste-management"
              className="min-w-60 w-full  flex items-center"
            >
              <div className="w-6 h-6 flex items-center justify-center mr-2">
                <img
                  src={
                    pathname === "/waste-management"
                      ? "/images/trash.png"
                      : "/images/trashNot.png"
                  }
                  alt="폐기물관리 아이콘"
                  className="max-w-full max-h-full"
                />
              </div>
              <span className="font-pretendard">폐기물관리</span>
            </Link>
          </li>

          {/* 토큰 관리 메뉴 */}
          <li
            className={`flex items-center px-4 py-3 cursor-pointer  ${
              pathname === "/token-management"
                ? "bg-eco-main text-white rounded-md"
                : "text-[#808191]"
            }`}
          >
            <Link
              href="/token-management"
              className="min-w-60 w-full flex items-center"
            >
              <div className="w-6 h-6 flex items-center justify-center mr-2">
                <img
                  src={
                    pathname === "/token-management"
                      ? "/images/token.png"
                      : "/images/tokenNot.png"
                  }
                  alt="토큰 관리 아이콘"
                  className="max-w-full max-h-full"
                />
              </div>
              <span className="font-pretendard">토큰 관리</span>
            </Link>
          </li>

          {/* 마이 페이지 메뉴 */}
          <li
            className={`flex items-center px-4 py-3 cursor-pointer  ${
              pathname === "/my-page"
                ? "bg-eco-main text-white rounded-md"
                : "text-[#808191]"
            }`}
          >
            <Link href="/my-page" className="min-w-60 w-full flex items-center">
              <div className="w-6 h-6 flex items-center justify-center mr-2">
                <img
                  src={
                    pathname === "/my-page"
                      ? "/images/mypage.png"
                      : "/images/mypageNot.png"
                  }
                  alt="마이 페이지 아이콘"
                  className="max-w-full max-h-full"
                />
              </div>
              <span className="font-pretendard">마이 페이지</span>
            </Link>
          </li>
        </ul>
      </nav>
    </aside>
  );
};

export default Sidebar;
