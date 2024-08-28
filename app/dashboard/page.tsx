"use client";

import { useState } from "react";
import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import Layout from "../components/Layout";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

const DashboardPage = () => {
  const [selectedData, setSelectedData] = useState("t/day");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedDetail, setSelectedDetail] = useState(null);

  const data = {
    labels: ["1주차", "2주차", "3주차", "4주차", "5주차", "6주차"],
    datasets: [
      {
        label:
          selectedData === "t/day"
            ? "영농 및 생활 폐기물량 (t/day)"
            : "오수량 (L/day)",
        data:
          selectedData === "t/day"
            ? [
                0.004497421, 0.0054149, 0.0052835, 0.0052265, 0.0054184,
                0.005485,
              ]
            : [1545, 1515, 1500, 1500, 1380, 1380],
        borderColor: "#4CC699",
        backgroundColor: "#4CC699",
        fill: false,
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,

    plugins: {
      legend: {
        position: "top",
      },
    },
    scales: {
      y: {
        beginAtZero: true,
      },
    },
  };

  // 폐기물 관리 목표 달성도 데이터
  const wasteData = [
    { type: "영농 폐기물", percentage: 75 },
    { type: "폐비닐", percentage: 60 },
    { type: "합성수지 (PE류 제외)", percentage: 45 },
    { type: "기타 폐기물", percentage: 85 },
    { type: "우수 및 오수", percentage: 55 },
  ];

  // 더미 데이터 - 최근 토큰 보상 내역
  const rewardData = [
    {
      txId: "0x1234abcd",
      wasteType: "폐비닐",
      reason: "폐기물 분리배출",
      date: "2024-08-21",
      status: "지급 완료",
      rewardAmount: "100 TOKEN",
      detail: "지급 완료 상세 내역",
    },
    {
      txId: "0x5678efgh",
      wasteType: "영농 폐기물",
      reason: "폐기물 재활용",
      date: "2024-08-19",
      status: "지급 대기",
      rewardAmount: "150 TOKEN",
      detail: "지급 대기 상세 내역",
    },
    {
      txId: "0x91011ijk",
      wasteType: "기타 폐기물",
      reason: "올바른 폐기물 처리",
      date: "2024-08-18",
      status: "지급 완료",
      rewardAmount: "200 TOKEN",
      detail: "지급 완료 상세 내역",
    },
    {
      txId: "0x1213lmno",
      wasteType: "합성수지 (PE류 제외)",
      reason: "폐기물 분리배출",
      date: "2024-08-17",
      status: "지급 대기",
      rewardAmount: "250 TOKEN",
      detail: "지급 대기 상세 내역",
    },
    {
      txId: "0x1415pqrs",
      wasteType: "우수 및 오수",
      reason: "폐수 처리",
      date: "2024-08-15",
      status: "지급 완료",
      rewardAmount: "300 TOKEN",
      detail: "지급 완료 상세 내역",
    },
    {
      txId: "0x1617tuvw",
      wasteType: "폐비닐",
      reason: "폐기물 분리배출",
      date: "2024-08-14",
      status: "지급 완료",
      rewardAmount: "100 TOKEN",
      detail: "지급 완료 상세 내역",
    },
    {
      txId: "0x1819xyz",
      wasteType: "영농 폐기물",
      reason: "폐기물 재활용",
      date: "2024-08-13",
      status: "지급 대기",
      rewardAmount: "150 TOKEN",
      detail: "지급 대기 상세 내역",
    },
  ];

  const handleDetailClick = (detail) => {
    setSelectedDetail(detail);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedDetail(null);
  };

  return (
    <Layout>
      {/* 상단 제목 */}
      <h1 className="text-2xl font-bold font-pretendard mb-6">대시보드</h1>

      {/* 카드 레이아웃 */}
      <div className="grid grid-cols-3 gap-4 mb-6">
        {/* 작은 카드 3개 */}
        <div className="bg-white flex items-center justify-start rounded-lg p-4 h-32">
          <img src="/images/trophy.png" alt="trophy" className="w-20 h-20" />
          <div className="flex flex-col ml-4">
            <div className="font-pretendard font-bold text-sm text-[#525252] mt-1">
              이번 달 MVP
            </div>
            <div className="font-pretendard font-bold my-1">
              폐기물 절감 우수 농장
            </div>
            <div className="font-pretendard text-xs text-[#676767] my-1">
              폐기물 관리 목표를 n번 달성하셨어요!
            </div>
          </div>
        </div>
        <div className="bg-white flex items-center justify-start rounded-lg p-4 h-32">
          <img src="/images/tokens.png" alt="tokens" className="w-20 h-20" />
          <div className="flex flex-col ml-4">
            <div className="font-pretendard font-bold text-sm text-[#525252] mt-1">
              현재 ETF 잔액
            </div>
            <div className="font-pretendard font-bold my-1">n etf</div>
            <div className="font-pretendard text-xs text-[#676767] my-1">
              농자재 할인, 기술 지원 서비스 이용 등 다양한 혜택을 지금 바로
              누려보세요!
            </div>
          </div>
        </div>
        <div className="bg-white flex items-center justify-start rounded-lg p-4 h-32">
          <img
            src="/images/circlegraph.png"
            alt="circle graph"
            className="w-20 h-20"
          />
          <div className="flex flex-col ml-4">
            <div className="font-pretendard font-bold text-sm text-[#525252] mt-1">
              환경 성과 지수
            </div>
            <div className="font-pretendard font-bold my-1">🌎 EPI n점</div>
            <div className="font-pretendard text-xs text-[#676767] my-1">
              지속적인 폐기물 감축으로 더 나은 지구를 만들어가요
            </div>
          </div>
        </div>
      </div>

      {/* 중간 줄의 큰 카드와 작은 카드 */}
      <div className="grid grid-cols-3 gap-4 mb-6">
        {/* 큰 카드 */}
        <div className="flex flex-col col-span-2 bg-white items-start rounded-lg p-4 h-80">
          <div className="flex flex-row justify-between w-full items-center">
            <div className="font-pretendard font-bold text-lg">
              이번 주 폐기물 배출량
            </div>
            <div className="flex-row flex items-center">
              <button
                className={`px-2 py-2 mr-2 text-sm rounded ${
                  selectedData === "t/day"
                    ? "bg-eco-main text-white"
                    : "bg-gray-200"
                }`}
                onClick={() => setSelectedData("t/day")}
              >
                영농 및 생활 폐기물량 (t/day)
              </button>
              <button
                className={`px-2 py-2 text-sm rounded ${
                  selectedData === "L/day"
                    ? "bg-eco-main text-white"
                    : "bg-gray-200"
                }`}
                onClick={() => setSelectedData("L/day")}
              >
                오수량 (L/day)
              </button>
            </div>
          </div>

          {/* 선 그래프 */}
          <div className="mt-4 w-full h-full">
            <Line data={data} options={options} />
          </div>
        </div>

        {/* 작은 카드 */}
        <div className="bg-white rounded-lg p-4 h-80">
          {/* 폐기물 관리 목표 달성도 */}
          <div className="font-pretendard font-bold text-lg mb-4">
            폐기물 관리 목표 달성도 💧
          </div>
          {wasteData.map((waste, index) => (
            <div key={index} className="mb-4">
              <div className="flex justify-between mb-1">
                <span className="font-pretendard text-sm">{waste.type}</span>
                <span className="font-pretendard text-sm">
                  {waste.percentage}%
                </span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2.5">
                <div
                  className="bg-eco-main h-2.5 rounded-full"
                  style={{ width: `${waste.percentage}%` }}
                ></div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* 마지막 줄의 큰 카드 - 최근 토큰 보상 내역 */}
      <div className="bg-white rounded-lg p-4 h-auto">
        <div className="font-pretendard font-bold text-lg mb-4">
          최근 토큰 보상 내역
        </div>
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Tx ID
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                폐기물 유형
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                보상 사유
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                지급 일자
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                지급 상태
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                보상액
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                상세 내역
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {rewardData.map((reward, index) => (
              <tr key={index}>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {reward.txId}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {reward.wasteType}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {reward.reason}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {reward.date}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {reward.status}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {reward.rewardAmount}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-blue-500 underline cursor-pointer">
                  <button onClick={() => handleDetailClick(reward.detail)}>
                    상세 내역
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* 모달 */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white rounded-lg p-6 w-1/3">
            <h2 className="text-xl font-bold mb-4">상세 내역</h2>
            <p className="text-sm">{selectedDetail}</p>
            <button
              className="mt-4 px-4 py-2 bg-eco-main text-white rounded"
              onClick={closeModal}
            >
              닫기
            </button>
          </div>
        </div>
      )}
    </Layout>
  );
};

export default DashboardPage;
