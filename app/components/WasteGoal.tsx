"use client";

import { useQuery } from "@tanstack/react-query";
import { useEffect } from "react";
import { useRouter, usePathname } from "next/navigation";

interface WasteGoalData {
  wasteType: string;
  achievementRate?: number; // Optional based on server data structure
}

// Function to fetch goals data (API call)
const fetchGoalsData = async (): Promise<WasteGoalData[]> => {
  const response = await fetch("http://localhost:3000/goals", {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      userId: "1", // Include userId in the headers
    },
  });

  if (!response.ok) {
    throw new Error("Failed to fetch data.");
  }

  const data = await response.json();
  return data;
};

const WasteGoal: React.FC = () => {
  const router = useRouter();
  const pathname = usePathname();
  const {
    data: goalsData,
    isLoading,
    error,
  } = useQuery<WasteGoalData[], Error>({
    queryKey: ["goalsData"],
    queryFn: fetchGoalsData,
  });

  // Define the base data array with initial percentages set to 0%
  const baseWasteData = [
    { type: "영농 폐기물", percentage: 0 },
    { type: "폐비닐", percentage: 0 },
    { type: "합성수지 (PE류 제외)", percentage: 0 },
    { type: "기타 폐기물", percentage: 0 },
    { type: "우수 및 오수", percentage: 0 },
  ];

  // Map server data to the base data and set achievement rates
  const wasteData = baseWasteData.map((base) => {
    const matchedGoal = goalsData?.find((goal) => goal.wasteType === base.type);
    const percentage = matchedGoal ? matchedGoal.achievementRate || 0 : 0;
    return {
      type: base.type,
      percentage: Math.round(percentage), // Display actual percentage, even if it exceeds 100%
      barWidth: Math.min(Math.round(percentage), 100), // Limit bar width to 100%
    };
  });

  // Show alert and navigate if no goals data and not on waste-management page
  useEffect(() => {
    if (
      goalsData &&
      goalsData.length === 0 &&
      pathname !== "/waste-management"
    ) {
      alert("목표 값이 없어요! 설정 페이지로 이동할게요.");
      router.push("/waste-management");
    }
  }, [goalsData, pathname, router]);

  if (isLoading) return <div>Loading...</div>;
  if (error)
    return <div>데이터를 가져오는 중 오류가 발생했습니다: {error.message}</div>;

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
              style={{ width: `${waste.barWidth}%` }} // Use barWidth to limit the width
            ></div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default WasteGoal;
