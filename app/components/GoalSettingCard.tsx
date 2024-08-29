"use client";

import { useState } from "react";

interface GoalSettingCardProps {
  onGoalSet: () => void; // 목표가 설정된 후 실행할 함수
}

const GoalSettingCard: React.FC<GoalSettingCardProps> = ({ onGoalSet }) => {
  const [wasteType, setWasteType] = useState<string>("영농 폐기물");
  const [targetAmount, setTargetAmount] = useState<number>(0);
  const [unit, setUnit] = useState<string>("t/day");

  // 목표 설정 요청 보내는 함수
  const handleSetGoal = async () => {
    const date = new Date().toISOString().split("T")[0]; // 오늘 날짜 (YYYY-MM-DD 형식)
    const postData = {
      userId: 1,
      wasteType,
      targetAmount,
      unit,
      date,
    };

    try {
      const response = await fetch("http://localhost:3000/goals/set", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(postData),
      });

      if (response.ok) {
        alert("목표가 성공적으로 설정되었습니다.");
        onGoalSet(); // 목표 설정 후 추가 작업 수행
      } else {
        alert("목표 설정에 실패했습니다.");
      }
    } catch (error) {
      console.error("목표 설정 중 오류가 발생했습니다:", error);
      alert("목표 설정 중 오류가 발생했습니다.");
    }
  };

  // 폐기물 유형이 변경될 때마다 단위를 업데이트하는 함수
  const handleWasteTypeChange = (value: string) => {
    setWasteType(value);
    setUnit(value === "우수 및 오수" ? "L/day" : "t/day");
  };

  return (
    <div className="bg-white rounded-lg p-4 h-auto mb-6">
      <div className="font-pretendard font-bold text-lg mb-4">목표 설정</div>
      <div className="flex flex-col gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700">
            폐기물 종류
          </label>
          <select
            value={wasteType}
            onChange={(e) => handleWasteTypeChange(e.target.value)}
            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
          >
            <option value="영농 폐기물">영농 폐기물</option>
            <option value="폐비닐">폐비닐</option>
            <option value="합성수지 (PE류 제외)">합성수지 (PE류 제외)</option>
            <option value="기타 폐기물">기타 폐기물</option>
            <option value="우수 및 오수">우수 및 오수</option>
          </select>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">
            목표 값
          </label>
          <input
            type="number"
            value={targetAmount}
            onChange={(e) => setTargetAmount(parseFloat(e.target.value))}
            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
            placeholder="목표 값을 입력하세요"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">
            단위
          </label>
          <input
            type="text"
            value={unit}
            readOnly
            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2 bg-gray-100"
          />
        </div>
        <button
          onClick={handleSetGoal}
          className="bg-eco-main text-white rounded-md p-2 mt-4"
        >
          목표 설정
        </button>
      </div>
    </div>
  );
};

export default GoalSettingCard;
