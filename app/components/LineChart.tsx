"use client";

import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
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

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

interface WasteRecord {
  wasteId: number;
  wasteAmount: number;
  wasteType: string;
  recordDate: string;
}

interface LineChartProps {
  selectedData: "t/day" | "L/day";
  setSelectedData: React.Dispatch<React.SetStateAction<"t/day" | "L/day">>;
}

// 데이터를 가져오는 함수 (API 호출)
const fetchWasteData = async (): Promise<WasteRecord[]> => {
  const response = await fetch("http://localhost:3000/waste/record", {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      userId: "1", // 헤더에 userId 포함
    },
  });

  if (!response.ok) {
    throw new Error("데이터를 가져오는 데 실패했습니다.");
  }

  const data = await response.json();
  return data;
};

const LineChart: React.FC<LineChartProps> = ({
  selectedData,
  setSelectedData,
}) => {
  const {
    data: wasteRecords,
    isLoading,
    error,
  } = useQuery<WasteRecord[], Error>({
    queryKey: ["wasteData"],
    queryFn: fetchWasteData,
  });

  // 로딩 중이거나 에러가 있는 경우 처리
  if (isLoading) return <div>Loading...</div>;
  if (error)
    return <div>데이터를 가져오는 중 오류가 발생했습니다: {error.message}</div>;

  // wasteRecords 데이터가 로드된 후 정렬 및 필터링 작업을 수행
  const sortedRecords = wasteRecords
    ? [...wasteRecords]
        .filter(
          (record) =>
            (selectedData === "t/day" && record.wasteType === "영농 폐기물") ||
            (selectedData === "L/day" && record.wasteType === "오수량")
        )
        .sort(
          (a, b) =>
            new Date(a.recordDate).getTime() - new Date(b.recordDate).getTime()
        )
    : [];

  const labels = sortedRecords.map((record) => {
    const date = new Date(record.recordDate);
    return `${date.getMonth() + 1}/${date.getDate()}`;
  });

  const dataValues = sortedRecords.map((record) =>
    parseFloat(record.wasteAmount)
  );

  const data = {
    labels: labels,
    datasets: [
      {
        label:
          selectedData === "t/day"
            ? "영농 및 생활 폐기물량 (t/day)"
            : "오수량 (L/day)",
        data: dataValues,
        borderColor: "#6793CC",
        backgroundColor: "#6793CC",
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

  return (
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

      {/* 라인 차트 */}
      <div className="mt-4 w-full h-full">
        <Line data={data} options={options} />
      </div>
    </div>
  );
};

export default LineChart;
