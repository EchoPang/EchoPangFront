"use client";

import { useQuery } from "@tanstack/react-query";

interface WasteGoalData {
  wasteType: string;
  achievementRate?: number; // 서버에서 가져오는 데이터의 구조에 따라 optional로 설정
}

// 데이터를 가져오는 함수 (API 호출)
const fetchGoalsData = async (): Promise<WasteGoalData[]> => {
  const response = await fetch("http://localhost:3000/goals", {
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

const WasteGoal: React.FC = () => {
  const {
    data: goalsData,
    isLoading,
    error,
  } = useQuery<WasteGoalData[], Error>({
    queryKey: ["goalsData"],
    queryFn: fetchGoalsData,
  });

  if (isLoading) return <div>Loading...</div>;
  if (error)
    return <div>데이터를 가져오는 중 오류가 발생했습니다: {error.message}</div>;

  // 기준 데이터 배열을 정의하고 초기 값을 0%로 설정합니다.
  const baseWasteData = [
    { type: "영농 폐기물", percentage: 0 },
    { type: "폐비닐", percentage: 0 },
    { type: "합성수지 (PE류 제외)", percentage: 0 },
    { type: "기타 폐기물", percentage: 0 },
    { type: "우수 및 오수", percentage: 0 },
  ];

  // 서버 데이터와 기준 데이터를 매핑하여 목표 달성도를 설정합니다.
  const wasteData = baseWasteData.map((base) => {
    const matchedGoal = goalsData?.find((goal) => goal.wasteType === base.type);
    return {
      type: base.type,
      percentage: matchedGoal
        ? Math.round(matchedGoal.achievementRate || 0)
        : 0, // 서버 데이터가 없으면 0으로 표시
    };
  });

  return (
    <div className="bg-white rounded-lg p-4 h-80">
      <div className="font-pretendard font-bold text-lg mb-4">
        폐기물 관리 목표 달성도 💧
      </div>
      {wasteData.map((waste, index) => (
        <div key={index} className="mb-4">
          <div className="flex justify-between mb-1">
            <span className="font-pretendard text-sm">{waste.type}</span>
            <span className="font-pretendard text-sm">{waste.percentage}%</span>
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
  );
};

export default WasteGoal;
