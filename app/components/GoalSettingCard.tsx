"use client";

import { useState, useEffect } from "react";

interface WasteGoalData {
  wasteType: string;
  targetAmount: number;
  unit: string;
}

interface GoalSettingCardProps {
  onGoalSet: () => void; // 목표가 설정된 후 실행할 함수
}

// 목표 데이터를 가져오는 함수 (API 호출)
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

  // 목표 데이터가 없을 경우 기본 데이터로 설정
  const defaultData: WasteGoalData[] = [
    { wasteType: "영농 폐기물", targetAmount: 0, unit: "t/day" },
    { wasteType: "폐비닐", targetAmount: 0, unit: "t/day" },
    { wasteType: "합성수지 (PE류 제외)", targetAmount: 0, unit: "t/day" },
    { wasteType: "기타 폐기물", targetAmount: 0, unit: "t/day" },
    { wasteType: "우수 및 오수", targetAmount: 0, unit: "L/day" },
  ];

  // 가져온 데이터와 기본 데이터를 병합하여 반환 (기본 데이터가 우선)
  const mergedData = defaultData.map((defaultGoal) => {
    const foundGoal = data.find(
      (goal: WasteGoalData) => goal.wasteType === defaultGoal.wasteType
    );
    return foundGoal ? foundGoal : defaultGoal;
  });

  return mergedData;
};

const GoalSettingCard: React.FC<GoalSettingCardProps> = ({ onGoalSet }) => {
  const [goalsData, setGoalsData] = useState<WasteGoalData[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const loadGoalsData = async () => {
      try {
        const data = await fetchGoalsData();
        setGoalsData(data);
      } catch (error) {
        console.error("데이터를 가져오는 중 오류가 발생했습니다:", error);
        alert("데이터를 가져오는 데 실패했습니다.");
      } finally {
        setLoading(false);
      }
    };

    loadGoalsData();
  }, []);

  // 목표 데이터를 서버에 개별적으로 제출하는 함수
  const handleSubmitGoals = async () => {
    const date = new Date().toISOString().split("T")[0]; // 오늘 날짜 (YYYY-MM-DD 형식)

    for (const goal of goalsData) {
      const postData = {
        ...goal,
        date,
        userId: 1, // 사용자 ID 추가
      };

      try {
        const response = await fetch("http://localhost:3000/goals/set", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(postData),
        });

        if (!response.ok) {
          alert(`${goal.wasteType}에 대한 목표 설정에 실패했습니다.`);
        }
      } catch (error) {
        console.error(
          `${goal.wasteType} 목표 설정 중 오류가 발생했습니다:`,
          error
        );
        alert(`${goal.wasteType} 목표 설정 중 오류가 발생했습니다.`);
      }
    }

    alert("모든 목표가 성공적으로 설정되었습니다.");
    onGoalSet(); // 목표 설정 후 추가 작업 수행
  };

  // 목표 데이터를 수정하는 함수
  const handleGoalChange = (index: number, newValue: number) => {
    const updatedGoals = [...goalsData];
    updatedGoals[index].targetAmount = newValue;
    setGoalsData(updatedGoals);
  };

  if (loading) return <div>Loading...</div>;

  return (
    <div className="bg-white rounded-lg shadow-md p-6 h-auto mb-6 mx-auto">
      <div className="font-pretendard font-bold text-lg mb-4">목표 설정</div>
      <div className="flex flex-col gap-6">
        {goalsData.map((goal, index) => (
          <div
            key={index}
            className="flex justify-between items-center bg-gray-50 p-4 rounded-md shadow-sm"
          >
            <label className="block text-sm font-medium text-gray-800 w-1/2">
              {goal.wasteType}
            </label>
            <div className="flex items-center w-1/2">
              <input
                type="number"
                value={goal.targetAmount}
                onChange={(e) =>
                  handleGoalChange(index, parseFloat(e.target.value))
                }
                className="w-full border border-gray-300 rounded-md shadow-sm p-2 text-center focus:outline-none focus:ring-2 focus:ring-eco-main"
              />
              <span className="ml-3 text-sm text-gray-600">{goal.unit}</span>
            </div>
          </div>
        ))}
      </div>
      <button
        onClick={handleSubmitGoals}
        className="bg-eco-main text-white font-bold rounded-md p-3 mt-6 w-full hover:bg-eco-dark transition duration-300"
      >
        목표 제출
      </button>
    </div>
  );
};

export default GoalSettingCard;
