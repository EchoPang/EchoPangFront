"use client";

import { useState } from "react";
import Layout from "../components/Layout";
import LineChart from "../components/LineChart";
import WasteGoal from "../components/WasteGoal";
import GoalSettingCard from "../components/GoalSettingCard";
import WasteRecordTable from "../components/WasteRecordTable";
import WasteCollectionCard from "../components/WasteCollectionCard"; // 새로 만든 컴포넌트 임포트

const WasteManagementPage = () => {
  const [selectedData, setSelectedData] = useState<"t/day" | "L/day">("t/day");

  // 목표 설정 후 추가 작업 수행할 때 사용할 함수
  const handleGoalSet = () => {
    console.log("목표가 설정되었습니다.");
  };

  // 상세 내역 버튼 클릭 시 호출될 함수
  const handleDetailClick = (detail: string) => {
    console.log("상세 내역:", detail);
  };

  return (
    <Layout>
      <h1 className="text-2xl font-bold font-pretendard mb-6">폐기물 관리</h1>

      {/* 라인 차트와 폐기물 목표 */}
      <div className="grid grid-cols-3 gap-4 mb-6 fade-in-up">
        <LineChart
          selectedData={selectedData}
          setSelectedData={setSelectedData}
        />
        <WasteGoal />
      </div>

      {/* 폐기물 기록 테이블 */}
      <div className="fade-in-up">
        <WasteRecordTable handleDetailClick={handleDetailClick} />
      </div>

      {/* 폐기물 수거 신청 카드 */}

      <div className="fade-in-up">
        <WasteCollectionCard />
      </div>

      {/* 목표 설정 카드 섹션 */}

      <div className="fade-in-up">
        <GoalSettingCard onGoalSet={handleGoalSet} />
      </div>
    </Layout>
  );
};

export default WasteManagementPage;
