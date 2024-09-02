"use client";

import { useState } from "react";
import { useQuery } from "@tanstack/react-query";

interface Reward {
  txId: string;
  wasteType: string;
  reason: string;
  date: string;
  status: string;
  rewardAmount: string;
  detail: string;
}

interface RewardTableProps {
  handleDetailClick: (detail: string) => void;
}

// Fetch rewards data from API
const fetchRewardsData = async (): Promise<Reward[]> => {
  const response = await fetch("http://localhost:3000/rewards", {
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
  console.log(data);

  // Convert fetched data to Reward format
  const rewards = data.rewards.map((reward: any) => ({
    txId: reward.transactionId,
    wasteType: reward.wasteType,
    reason: reward.description,
    date: new Date(reward.rewardDate).toLocaleDateString(), // Format date
    status: reward.rewardState,
    rewardAmount: `${reward.tokenAmount} TOKEN`,
    detail: `Goal ID: ${reward.goal.goalId}, Achievement: ${reward.goal.achievementRate}%`, // Create detail string
  }));

  return rewards;
};

// Truncate text to a maximum length
const truncateText = (text: string, maxLength: number) => {
  return text.length > maxLength ? text.substring(0, maxLength) + "..." : text;
};

const RewardTable: React.FC<RewardTableProps> = ({ handleDetailClick }) => {
  const [currentPage, setCurrentPage] = useState(1); // State for the current page
  const itemsPerPage = 10; // Number of items per page

  const {
    data: rewardData,
    isLoading,
    error,
  } = useQuery<Reward[], Error>({
    queryKey: ["rewardsData"],
    queryFn: fetchRewardsData,
  });

  if (isLoading) return <div>Loading...</div>;
  if (error)
    return <div>데이터를 가져오는 중 오류가 발생했습니다: {error.message}</div>;

  // Calculate the index range for the current page
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentRewards = rewardData?.slice(startIndex, endIndex); // Slice the data for the current page

  // Calculate total number of pages
  const totalPages = rewardData
    ? Math.ceil(rewardData.length / itemsPerPage)
    : 0;

  // Handle page change
  const handlePageChange = (pageNumber: number) => {
    setCurrentPage(pageNumber);
  };

  return (
    <div className="bg-white rounded-lg p-4 h-auto fade-in-up">
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
          {currentRewards?.map((reward, index) => (
            <tr key={index}>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 underline cursor-pointer text-blue-500">
                <a
                  href={`https://sepolia.arbiscan.io/tx/${reward.txId}`}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {truncateText(reward.txId, 15)}
                </a>
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

      {/* Pagination controls */}
      <div className="flex justify-center mt-4">
        {Array.from({ length: totalPages }, (_, index) => index + 1).map(
          (pageNumber) => (
            <button
              key={pageNumber}
              onClick={() => handlePageChange(pageNumber)}
              className={`mx-1 px-3 py-1 rounded ${
                pageNumber === currentPage
                  ? "bg-eco-main text-white"
                  : "bg-eco-main text-gray-700"
              }`}
            >
              {pageNumber}
            </button>
          )
        )}
      </div>
    </div>
  );
};

export default RewardTable;
