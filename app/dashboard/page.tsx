"use client";

import { useState, useEffect } from "react";
import Layout from "../components/Layout";
import LineChart from "../components/LineChart";
import Card from "../components/Card";
import WasteGoal from "../components/WasteGoal";
import RewardTable from "../components/RewardTable";
import DetailModal from "../components/DetailModal";

const DashboardPage = () => {
  const [selectedData, setSelectedData] = useState<"t/day" | "L/day">("t/day");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedDetail, setSelectedDetail] = useState<string | null>(null);
  const [balance, setBalance] = useState<string | null>(null);

  const handleDetailClick = (detail: string) => {
    setSelectedDetail(detail);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedDetail(null);
  };

  // Fetch the balance from the API
  useEffect(() => {
    const fetchBalance = async () => {
      try {
        const response = await fetch("http://localhost:3000/rewards/balance", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        });

        if (!response.ok) {
          throw new Error("Failed to fetch balance");
        }

        const data = await response.json();
        setBalance(data.balance); // Set the fetched balance to state
      } catch (error) {
        console.error("Error fetching balance:", error);
      }
    };

    fetchBalance();
  }, []); // Empty dependency array ensures this runs once on mount

  return (
    <Layout>
      <h1 className="text-2xl font-bold font-pretendard mb-6">대시보드</h1>

      {/* 카드 레이아웃 */}
      <div className="grid grid-cols-3 gap-4 mb-6 fade-in-up">
        <Card
          imageSrc="/images/trophy.png"
          title="이번 달 MVP"
          subtitle="폐기물 절감 우수 농장"
          description="폐기물 관리 목표를 2번 달성하셨어요!"
        />
        <Card
          imageSrc="/images/tokens.png"
          title="현재 EFT 잔액"
          subtitle={balance ? balance : "로딩 중..."} // Display the balance or a loading state
          description="농자재 할인, 기술 지원 서비스 이용 등 다양한 혜택을 지금 바로 누려보세요!"
        />
        <Card
          imageSrc="/images/circlegraph.png"
          title="환경 성과 지수"
          subtitle="🌎 EPI 221점"
          description="지속적인 폐기물 감축으로 더 나은 지구를 만들어가요"
        />
      </div>

      {/* 라인 차트와 폐기물 목표 */}
      <div className="grid grid-cols-3 gap-4 mb-6 fade-in-up">
        <LineChart
          selectedData={selectedData}
          setSelectedData={setSelectedData}
        />
        <WasteGoal />
      </div>

      {/* 토큰 보상 테이블 */}
      <RewardTable handleDetailClick={handleDetailClick} />

      {/* 상세 모달 */}
      {isModalOpen && (
        <DetailModal selectedDetail={selectedDetail} closeModal={closeModal} />
      )}
    </Layout>
  );
};

export default DashboardPage;
