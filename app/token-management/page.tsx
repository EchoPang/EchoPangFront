"use client";
import { useState } from "react";
import Layout from "../components/Layout";
import RewardTable from "../components/RewardTable";
import DetailModal from "../components/DetailModal";

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

      <RewardTable handleDetailClick={handleDetailClick} />

      {/* 상세 모달 */}
      {isModalOpen && (
        <DetailModal selectedDetail={selectedDetail} closeModal={closeModal} />
      )}
    </Layout>
  );
};

export default WasteManagementPage;
