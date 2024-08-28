"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useQuery, useMutation } from "@tanstack/react-query";
import { ethers } from "ethers";
export default function Home() {
  const [account, setAccount] = useState<string | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false); // 첫 번째 모달 상태
  const [isCategoryModalOpen, setIsCategoryModalOpen] = useState(false); // 분야 선택 모달 상태
  const [selectedCategory, setSelectedCategory] = useState<string>(""); // 선택된 분야 상태
  const [formData, setFormData] = useState({
    email: "",
    businessRegistrationNumber: "",
    companyName: "",
    representativeName: "",
    location: "",
  });
  const router = useRouter();

  // 지갑 연결 함수
  async function connect() {
    if (window.ethereum == null) {
      console.log("MetaMask not installed; using read-only defaults");
      return;
    }

    const provider = new ethers.BrowserProvider(window.ethereum);
    const signer = await provider.getSigner();
    const walletAddress = await signer.getAddress();
    setAccount(walletAddress);

    // Check if account is already registered
    checkRegistration();
  }

  // 유효성 검사 함수
  const validateForm = () => {
    const {
      email,
      businessRegistrationNumber,
      companyName,
      representativeName,
      location,
    } = formData;
    if (
      !email ||
      !businessRegistrationNumber ||
      !companyName ||
      !representativeName ||
      !selectedCategory ||
      !location
    ) {
      alert("모든 필드를 입력해주세요.");
      return false;
    }
    // 추가적인 유효성 검사 (이메일 형식 등) 필요시 추가
    return true;
  };

  // 등록 여부 확인 쿼리
  const { refetch: checkRegistration } = useQuery({
    queryKey: ["checkRegistration", account],
    queryFn: async () => {
      const res = await fetch("/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ walletAddress: account }),
      });

      if (!res.ok) {
        throw new Error("Not registered");
      }

      const data = await res.json();
      return data;
    },
    enabled: false, // 초기에는 실행되지 않도록 설정
    onSuccess: (data) => {
      // 이미 등록된 지갑이면 대시보드로 이동
      localStorage.setItem("accessToken", data.accessToken);
      router.push("/dashboard");
    },
    onError: () => {
      // 등록되지 않은 지갑이면 가입 모달을 표시
      setIsModalOpen(true);
    },
  });

  // 등록 요청 뮤테이션
  const registerMutation = useMutation({
    mutationFn: async () => {
      const res = await fetch("/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          walletAddress: account,
          email: formData.email,
          farmInfo: {
            businessRegistrationNumber: formData.businessRegistrationNumber,
            companyName: formData.companyName,
            representativeName: formData.representativeName,
            sector: selectedCategory,
            location: formData.location,
          },
        }),
      });

      if (!res.ok) {
        throw new Error("Failed to register");
      }

      const data = await res.json();
      return data;
    },
    onSuccess: (data) => {
      localStorage.setItem("accessToken", data.accessToken);
      router.push("/dashboard");
    },
    onError: (error) => {
      console.error(error);
      alert("등록에 실패했습니다. 다시 시도해주세요.");
    },
  });

  // 로그인 버튼 클릭 시 connect 함수 호출
  const handleLogin = () => {
    connect();
  };

  // 가입 요청
  const handleRegister = () => {
    if (validateForm()) {
      registerMutation.mutate();
    }
  };

  // 모달 닫기 함수
  const closeModal = () => {
    setIsModalOpen(false);
  };

  // 분야 선택 모달 열기 함수
  const openCategoryModal = () => {
    setIsCategoryModalOpen(true);
  };

  // 분야 선택 모달 닫기 함수
  const closeCategoryModal = () => {
    setIsCategoryModalOpen(false);
  };

  // 분야 선택 함수
  const selectCategory = (category: string) => {
    setSelectedCategory(category);
    closeCategoryModal();
  };

  return (
    <div
      className="min-h-screen flex flex-col items-center justify-center bg-cover bg-center"
      style={{ backgroundImage: `url('/images/background.png')` }}
    >
      <div className="text-center items-center justify-center flex flex-col">
        {/* 로고와 텍스트 */}
        <img
          src="/images/logo.png"
          alt="Logo"
          className="w-48 h-auto mb-4 fade-in-up"
        />
        <img
          src="/images/textlogo.png"
          alt="Logo"
          className="w-96 h-auto mb-4 fade-in-up"
        />
        {/* 로그인 버튼 */}
        {account ? (
          <p className="text-2xl text-white font-pretendard fade-in-up">
            Connected account: {account}
          </p>
        ) : (
          <button
            onClick={handleLogin}
            className="font-pretendard bg-eco-main w-48 h-14 rounded-lg mt-12 shadow-lg text-white text-xl fade-in-up"
          >
            로그인
          </button>
        )}
      </div>

      {/* 첫 번째 모달 오버레이 및 컨텐츠 */}
      {isModalOpen && (
        <div className="modal-overlay flex justify-center items-center fade-in-up">
          <div className="modal-content relative mt-20">
            {/* 이메일 */}
            <div className="mb-4 flex items-center">
              <label className="w-1/3 text-gray-700 text-sm font-pretendard mr-2">
                이메일
              </label>
              <input
                type="email"
                value={formData.email}
                onChange={(e) =>
                  setFormData({ ...formData, email: e.target.value })
                }
                className="shadow appearance-none border rounded w-2/3 py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              />
            </div>
            {/* 사업자 등록 번호 */}
            <div className="mb-4 flex items-center">
              <label className="w-1/3 text-gray-700 text-sm font-pretendard mr-2">
                사업자 등록 번호
              </label>
              <input
                type="text"
                value={formData.businessRegistrationNumber}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    businessRegistrationNumber: e.target.value,
                  })
                }
                className="shadow appearance-none border rounded w-2/3 py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              />
            </div>
            {/* 기업명 */}
            <div className="mb-4 flex items-center">
              <label className="w-1/3 text-gray-700 text-sm font-pretendard mr-2">
                기업명
              </label>
              <input
                type="text"
                value={formData.companyName}
                onChange={(e) =>
                  setFormData({ ...formData, companyName: e.target.value })
                }
                className="shadow appearance-none border rounded w-2/3 py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              />
            </div>
            {/* 대표자명 */}
            <div className="mb-4 flex items-center">
              <label className="w-1/3 text-gray-700 text-sm font-pretendard mr-2">
                대표자명
              </label>
              <input
                type="text"
                value={formData.representativeName}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    representativeName: e.target.value,
                  })
                }
                className="shadow appearance-none border rounded w-2/3 py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              />
            </div>
            {/* 분야 */}
            <div className="mb-4 flex items-center">
              <label className="w-1/3 text-gray-700 text-sm font-pretendard mr-2">
                분야
              </label>
              <input
                type="text"
                value={selectedCategory}
                readOnly
                onClick={openCategoryModal}
                className="shadow appearance-none border rounded w-2/3 py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline cursor-pointer"
              />
            </div>
            {/* 주소 */}
            <div className="mb-4 flex items-center">
              <label className="w-1/3 text-gray-700 text-sm font-pretendard mr-2">
                주소
              </label>
              <input
                type="text"
                value={formData.location}
                onChange={(e) =>
                  setFormData({ ...formData, location: e.target.value })
                }
                className="shadow appearance-none border rounded w-2/3 py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              />
            </div>
            {/* 회원가입 버튼 */}
            <div onClick={handleRegister} className="flex justify-center">
              <button className="font-pretendard bg-eco-main w-48 h-12 rounded-lg mt-4 shadow-lg text-white text-xl">
                회원가입
              </button>
            </div>
          </div>
        </div>
      )}

      {/* 분야 선택 모달 */}
      {isCategoryModalOpen && (
        <div className="modal-overlay flex justify-center items-center fade-in-up">
          <div className="modal-content p-6">
            <h2 className="text-lg font-pretendard mb-4">분야 선택</h2>
            <ul>
              <li
                className="cursor-pointer mb-2 text-center bg-eco-main text-white py-2 rounded-lg"
                onClick={() => selectCategory("시설원예")}
              >
                시설원예
              </li>
              <li
                className="cursor-pointer mb-2 text-center bg-eco-main text-white py-2 rounded-lg"
                onClick={() => selectCategory("과수")}
              >
                과수
              </li>
              <li
                className="cursor-pointer mb-2 text-center bg-eco-main text-white py-2 rounded-lg"
                onClick={() => selectCategory("노지")}
              >
                노지
              </li>
            </ul>
          </div>
        </div>
      )}
    </div>
  );
}
