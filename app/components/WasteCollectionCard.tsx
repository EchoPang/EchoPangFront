"use client";

import { useState } from "react";

// 폐기물 수거 신청 카드 컴포넌트
const WasteCollectionCard = () => {
  const [dischargeTime, setDischargeTime] = useState("");
  const [dischargeAddress, setDischargeAddress] = useState("");
  const [processingBuilding, setProcessingBuilding] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  // 폼 제출 시 호출되는 함수
  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    setIsSubmitting(true);

    const requestBody = {
      dischargeTime,
      dischargeAddress,
      processingBuilding,
    };

    try {
      const response = await fetch("http://localhost:3000/waste/collect", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(requestBody),
      });

      if (!response.ok) {
        throw new Error("폐기물 수거 신청에 실패했습니다.");
      }

      // 성공적으로 신청되었을 때 처리
      alert("폐기물 수거 신청이 완료되었습니다.");
      setDischargeTime("");
      setDischargeAddress("");
      setProcessingBuilding("");
    } catch (error) {
      console.error("Error:", error);
      alert("신청 중 오류가 발생했습니다.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="bg-white rounded-lg p-4 mb-6">
      <h2 className="text-lg font-bold mb-4">폐기물 수거 신청</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700 mb-1">
            배출 일시
          </label>
          <input
            type="datetime-local"
            value={dischargeTime}
            onChange={(e) => setDischargeTime(e.target.value)}
            className="w-full border border-gray-300 rounded px-3 py-2"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700 mb-1">
            배출 주소
          </label>
          <input
            type="text"
            value={dischargeAddress}
            onChange={(e) => setDischargeAddress(e.target.value)}
            className="w-full border border-gray-300 rounded px-3 py-2"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700 mb-1">
            처리동
          </label>
          <input
            type="text"
            value={processingBuilding}
            onChange={(e) => setProcessingBuilding(e.target.value)}
            className="w-full border border-gray-300 rounded px-3 py-2"
            required
          />
        </div>
        <button
          type="submit"
          className={`w-full py-2 px-4 bg-eco-main text-white rounded ${
            isSubmitting ? "opacity-50 cursor-not-allowed" : ""
          }`}
          disabled={isSubmitting}
        >
          {isSubmitting ? "신청 중..." : "신청하기"}
        </button>
      </form>
    </div>
  );
};

export default WasteCollectionCard;
