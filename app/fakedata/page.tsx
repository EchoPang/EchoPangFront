"use client";

import { useState } from "react";
import Layout from "../components/Layout";

// 서버에 폐기물 기록을 전송하는 함수 (API 호출)
const addWasteRecord = async (newRecord: {
  userId: number;
  wasteType: string;
  wasteAmount: number;
  recordDate: string;
}) => {
  const response = await fetch("http://localhost:3000/waste/record", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(newRecord),
  });

  if (!response.ok) {
    throw new Error("폐기물 기록을 추가하는 데 실패했습니다.");
  }

  return response.json();
};

// 서버에 보상 요청을 전송하는 함수 (API 호출)
const requestReward = async (rewardData: {
  userId: number;
  wasteType: string;
  description: string;
}) => {
  const response = await fetch("http://localhost:3000/rewards", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(rewardData),
  });

  if (!response.ok) {
    throw new Error("보상 요청을 보내는 데 실패했습니다.");
  }

  return response.json();
};

// 설명을 위한 예시 배열 (한국어로)
const descriptions = [
  "폐기물 재활용을 통한 CO2 배출 감소",
  "지속 가능한 농업 실천 촉진",
  "폐기물 관리로 토양 비옥도 향상",
  "플라스틱 재활용으로 매립지 사용 줄이기",
  "퇴비화를 통한 온실가스 배출 감소",
  "효율적인 관개로 물 보존 향상",
  "유기농 농업을 통한 생물 다양성 증가",
  "플라스틱 폐기물 재사용 촉진",
  "스마트 농업으로 에너지 소비 절감",
  "출처에서의 폐기물 분리 촉진",
  "순환 경제 촉진을 위한 폐기물 업사이클링",
  "더 나은 포장으로 폐기물 최소화",
  "제로 웨이스트 생활 방식 지원",
  "지역 퇴비화 이니셔티브 촉진",
  "음식물 쓰레기 관리를 통한 메탄 배출 감소",
  "도시 농업을 통한 식품 운송 거리 단축",
  "농업 소각 감소로 대기 질 향상",
  "점적 관개 도입으로 물 절약",
  "지역 소싱을 통한 탄소 발자국 감소",
  "지속 가능한 해산물 관리 촉진",
  "농업에서 재생 가능 에너지 사용 지원",
  "재생 농업 방법 촉진",
  "친환경 폐기물 처리를 장려",
  "유출수 관리로 수질 오염 감소",
  "유기 비료를 사용하여 토양 건강 향상",
  "폐기물 에너지 전환 촉진",
  "농촌 지역에서 재활용 촉진",
  "CO2 흡수를 위한 조림 지원",
  "지속 가능한 해충 방제 방법 촉진",
  "친환경 농업을 통한 지속 가능성 향상",
  "퇴비화 촉진을 통한 유기물 순환",
  "자연 서식지 보호 및 복원",
  "에너지 효율성을 높이기 위한 스마트 농업 기술 사용",
  "화석 연료 대신 재생 가능 에너지원 사용 장려",
  "폐수 재활용을 통한 자원 보존",
  "기후 변화에 대한 적응력 강화",
  "산림 보존을 통한 탄소 중립 달성",
  "비료 사용 최적화로 환경 오염 최소화",
  "폐기물 감축을 통한 자원 절약",
  "탄소 중립 농업 기술 도입 촉진",
  "공동체 기반의 폐기물 관리 강화",
  "물 사용 효율성을 높이기 위한 관개 개선",
  "해양 플라스틱 오염 감소 노력",
  "지역 농산물 소비 촉진으로 탄소 발자국 줄이기",
  "자연 자원 보호 및 지속 가능성 강화",
  "친환경 건축 자재 사용 장려",
  "지속 가능한 식량 시스템 구축",
  "생태계 복원을 통한 생물 다양성 보존",
  "기후 변화 완화 전략 강화",
];

const AddWasteRecordPage = () => {
  const [wasteType, setWasteType] = useState<string>("영농 폐기물");
  const [wasteAmount, setWasteAmount] = useState<number>(0);
  const [recordDate, setRecordDate] = useState<string>("");

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault(); // 기본 폼 제출 동작을 막습니다.

    try {
      const newRecord = {
        userId: 1, // 서버에서 userId는 생략할 수 있습니다.
        wasteType,
        wasteAmount,
        recordDate,
      };

      await addWasteRecord(newRecord);
      alert("폐기물 기록이 성공적으로 추가되었습니다!");

      // 보상 요청 데이터를 준비합니다.
      const randomDescription =
        descriptions[Math.floor(Math.random() * descriptions.length)];

      const rewardData = {
        userId: 1,
        wasteType,
        description: randomDescription,
      };

      await requestReward(rewardData);
      alert("보상 요청이 성공적으로 전송되었습니다!");

      // 입력 필드를 초기화합니다.
      setWasteType("영농 폐기물");
      setWasteAmount(0);
      setRecordDate("");
    } catch (error: any) {
      alert(`오류가 발생했습니다: ${error.message}`);
    }
  };

  return (
    <Layout>
      <h1 className="text-2xl font-bold font-pretendard mb-6">
        폐기물 기록 추가
      </h1>

      <form
        onSubmit={handleSubmit}
        className="bg-white p-6 rounded-lg shadow-md"
      >
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            폐기물 유형
          </label>
          <input
            type="text"
            value={wasteType}
            onChange={(e) => setWasteType(e.target.value)}
            className="w-full px-3 py-2 border rounded-md"
            placeholder="폐기물 유형을 입력하세요"
          />
        </div>

        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            폐기물 양 (kg)
          </label>
          <input
            type="number"
            value={wasteAmount}
            onChange={(e) => setWasteAmount(Number(e.target.value))}
            className="w-full px-3 py-2 border rounded-md"
            placeholder="폐기물 양을 입력하세요"
          />
        </div>

        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            기록 날짜
          </label>
          <input
            type="date"
            value={recordDate}
            onChange={(e) => setRecordDate(e.target.value)}
            className="w-full px-3 py-2 border rounded-md"
          />
        </div>

        <button
          type="submit"
          className="w-full bg-eco-main text-white py-2 px-4 rounded-md font-bold"
        >
          기록 추가
        </button>
      </form>
    </Layout>
  );
};

export default AddWasteRecordPage;
