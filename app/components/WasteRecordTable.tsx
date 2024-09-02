"use client";

import { useState } from "react";
import { useQuery } from "@tanstack/react-query";

// Define the WasteRecord data type
interface WasteRecord {
  wasteId: number;
  wasteAmount: string;
  wasteType: string;
  recordDate: string;
  wasteHash: string;
  transactionHash: string;
}

interface WasteRecordTableProps {
  handleDetailClick: (detail: string) => void;
}

// Fetch data function (API call)
const fetchWasteRecords = async (): Promise<WasteRecord[]> => {
  const response = await fetch("http://localhost:3000/waste/record", {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });

  if (!response.ok) {
    throw new Error("Failed to fetch data.");
  }

  const data = await response.json();
  console.log(data);
  return data; // Data is already in the WasteRecord format, no conversion needed
};

const WasteRecordTable: React.FC<WasteRecordTableProps> = ({
  handleDetailClick,
}) => {
  const [currentPage, setCurrentPage] = useState(1); // State for the current page
  const itemsPerPage = 10; // Number of items per page

  const {
    data: wasteData,
    isLoading,
    error,
  } = useQuery<WasteRecord[], Error>({
    queryKey: ["wasteRecords"],
    queryFn: fetchWasteRecords,
  });

  const truncateText = (text: string | null | undefined, maxLength: number) => {
    if (!text) return ""; // Return empty string if text is null or undefined
    return text.length > maxLength
      ? text.substring(0, maxLength) + "..."
      : text;
  };

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error fetching data: {error.message}</div>;

  // Calculate the index range for the current page
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentRecords = wasteData?.slice(startIndex, endIndex); // Slice the data for the current page

  // Calculate total number of pages
  const totalPages = wasteData ? Math.ceil(wasteData.length / itemsPerPage) : 0;

  // Handle page change
  const handlePageChange = (pageNumber: number) => {
    setCurrentPage(pageNumber);
  };

  return (
    <div className="bg-white rounded-lg p-4 h-auto fade-in-up mb-5">
      <div className="font-pretendard font-bold text-lg mb-4">
        최근 폐기물 기록 내역
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
              일주일 배출량
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              기록 일자
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              폐기물 기록 hash
            </th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {currentRecords?.map((record, index) => (
            <tr key={index}>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 underline cursor-pointer text-blue-500">
                <a
                  href={`https://sepolia.arbiscan.io/tx/${record.transactionHash}`}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {truncateText(record.transactionHash, 15)}
                </a>
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                {record.wasteType}
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                {record.wasteAmount}
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                {new Date(record.recordDate).toLocaleDateString()}
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                {truncateText(record.wasteHash, 15)}
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
                  : "bg-gray-200 text-eco-main"
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

export default WasteRecordTable;
