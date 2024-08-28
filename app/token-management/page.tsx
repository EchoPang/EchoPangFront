"use client";
import { useState } from "react";
import Layout from "../components/Layout";

const WasteManagementPage = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedDetail, setSelectedDetail] = useState(null);

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
      <h1 className="text-2xl font-bold font-pretendard mb-6">토큰 관리</h1>
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

export default WasteManagementPage;
