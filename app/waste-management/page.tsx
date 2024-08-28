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

const WasteManagementPage = () => {
  const [selectedData, setSelectedData] = useState("t/day");
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
  ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend
  );

  // 폐기물 관리 목표 달성도 데이터
  const wasteData = [
    { type: "영농 폐기물", percentage: 75 },
    { type: "폐비닐", percentage: 60 },
    { type: "합성수지 (PE류 제외)", percentage: 45 },
    { type: "기타 폐기물", percentage: 85 },
    { type: "우수 및 오수", percentage: 55 },
  ];
  return (
    <Layout>
      <h1 className="text-2xl font-bold font-pretendard mb-6">폐기물 관리</h1>
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
    </Layout>
  );
};

export default WasteManagementPage;
