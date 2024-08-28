"use client";

import { useEffect, useState } from "react";
const ethers = require("ethers");

export default function Home() {
  const [account, setAccount] = useState<string | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false); // 모달 상태 추가

  // 지갑 연결 함수
  async function connect() {
    let signer = null;
    let provider;

    if (window.ethereum == null) {
      // MetaMask가 설치되지 않은 경우
      console.log("MetaMask not installed; using read-only defaults");
      provider = ethers.getDefaultProvider();
    } else {
      // MetaMask와 연결된 브라우저 프로바이더 사용
      provider = new ethers.BrowserProvider(window.ethereum);

      // 사용자의 계정 서명자 가져오기
      signer = await provider.getSigner();
      setAccount(await signer.getAddress());
      setIsModalOpen(true); // 지갑 연결 후 모달 표시
    }
  }

  // 로그인 버튼 클릭 시 connect 함수 호출
  const handleLogin = () => {
    connect();
  };

  // 모달 닫기 함수
  const closeModal = () => {
    setIsModalOpen(false);
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

      {/* 모달 오버레이 및 컨텐츠 */}
      {isModalOpen && (
        <div className="modal-overlay">
          <div className="modal-content">
            <form>
              {/* 이메일 */}
              <div className="mb-4 flex items-center">
                <label className="w-1/3 text-gray-700 text-sm font-pretendard mr-2">
                  이메일
                </label>
                <input
                  type="email"
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
                  className="shadow appearance-none border rounded w-2/3 py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                />
              </div>
              {/* 주소 */}
              <div className="mb-4 flex items-center">
                <label className="w-1/3 text-gray-700 text-sm font-pretendard mr-2">
                  주소
                </label>
                <input
                  type="text"
                  className="shadow appearance-none border rounded w-2/3 py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                />
              </div>
              {/* 회원가입 버튼 */}
              <button
                type="submit"
                className="font-pretendard bg-eco-main w-full h-12 rounded-lg mt-4 shadow-lg text-white text-xl"
              >
                회원가입
              </button>
            </form>
            {/* 닫기 버튼 */}
            {/* <button
              onClick={closeModal}
              className="mt-4 text-eco-main hover:text-eco-dark font-pretendard"
            >
              닫기
            </button> */}
          </div>
        </div>
      )}
    </div>
  );
}
