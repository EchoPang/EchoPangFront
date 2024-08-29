"use client";

import { useState } from "react";
import Layout from "../components/Layout";

const WasteManagementPage = () => {
  const [userName, setUserName] = useState("홍길동");
  const [profileImage, setProfileImage] = useState("/images/profile.png");

  return (
    <Layout>
      {/* Page Title */}
      <h1 className="text-2xl font-bold font-pretendard mb-6 ">마이 페이지</h1>

      {/* Profile Section */}
      <div className="bg-white rounded-lg p-4 mb-6 flex items-center fade-in-up">
        {/* <img
          src={profileImage}
          alt="Profile"
          className="w-20 h-20 rounded-full mr-4"
        /> */}
        <div>
          <div className="text-lg font-pretendard font-bold">{userName}</div>
          <button className="text-sm text-blue-500 mt-2">개인 정보 수정</button>
        </div>
      </div>

      {/* Recent Activity Section */}
      <div className="bg-white rounded-lg p-4 mb-6 fade-in-up">
        <h2 className="font-pretendard font-bold text-lg mb-4">내 활동 기록</h2>
        <ul className="list-disc list-inside">
          <li className="font-pretendard text-sm text-gray-600">
            2024-08-21: 폐비닐 분리 배출
          </li>
          <li className="font-pretendard text-sm text-gray-600">
            2024-08-19: 폐기물 재활용
          </li>
          {/* Add more activities as needed */}
        </ul>
      </div>

      {/* Goal Management Section */}
      <div className="bg-white rounded-lg p-4 mb-6 fade-in-up">
        <h2 className="font-pretendard font-bold text-lg mb-4">목표 관리</h2>
        {/* Example goal progress */}
        <div className="mb-4">
          <div className="flex justify-between mb-1">
            <span className="font-pretendard text-sm">
              이번 달 폐기물 10kg 감량
            </span>
            <span className="font-pretendard text-sm">50%</span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2.5">
            <div
              className="bg-eco-main h-2.5 rounded-full"
              style={{ width: "50%" }}
            ></div>
          </div>
        </div>
        {/* Add more goals as needed */}
      </div>

      {/* Notifications Section */}
      <div className="bg-white rounded-lg p-4 mb-6 fade-in-up">
        <h2 className="font-pretendard font-bold text-lg mb-4">알림</h2>
        <p className="font-pretendard text-sm text-gray-600">
          새로운 폐기물 분리 배출 방법이 업데이트되었습니다!
        </p>
        {/* Add more notifications as needed */}
      </div>

      {/* Settings Section */}
      <div className="bg-white rounded-lg p-4 mb-6 fade-in-up">
        <h2 className="font-pretendard font-bold text-lg mb-4">설정</h2>
        <button className="text-sm text-blue-500">알림 설정</button>
        <button className="text-sm text-blue-500 ml-4">계정 관리</button>
      </div>
    </Layout>
  );
};

export default WasteManagementPage;
