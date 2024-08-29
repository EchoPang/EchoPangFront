// pages/WasteManagementPage.tsx

"use client";
import { useState } from "react";
import Layout from "../components/Layout";
import RewardTable from "../components/RewardTable";
import DetailModal from "../components/DetailModal";
import ProductList from "../components/ProductList"; // Import ProductList
import { Product } from "../components/ProductCard"; // Import Product interface

const WasteManagementPage = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedDetail, setSelectedDetail] = useState(null);

  // Initialize a list of products (this can be fetched from an API)
  const [products, setProducts] = useState<Product[]>([
    {
      id: 1,
      name: "유기농 비료",
      description: "자연에서 유래된 성분으로 만든 고품질 유기농 비료입니다.",
      price: 15,
      imageUrl: "https://picsum.photos/200/300?random=1",
    },
    {
      id: 2,
      name: "씨앗 세트",
      description: "다양한 작물을 재배할 수 있는 씨앗 세트입니다.",
      price: 8,
      imageUrl: "https://picsum.photos/200/300?random=2",
    },
    {
      id: 3,
      name: "컴포스트 빈",
      description:
        "음식물 쓰레기와 정원 폐기물을 퇴비로 만들 수 있는 용기입니다.",
      price: 25,
      imageUrl: "https://picsum.photos/200/300?random=3",
    },
    {
      id: 4,
      name: "자연 방충제",
      description: "화학 성분 없이 해충을 퇴치할 수 있는 방충제입니다.",
      price: 12,
      imageUrl: "https://picsum.photos/200/300?random=4",
    },
    {
      id: 5,
      name: "물 절약 호스",
      description: "효율적인 물 사용을 돕는 물 절약 호스입니다.",
      price: 20,
      imageUrl: "https://picsum.photos/200/300?random=5",
    },
    {
      id: 6,
      name: "정원 가위",
      description: "가지치기와 수확에 적합한 고품질 정원 가위입니다.",
      price: 18,
      imageUrl: "https://picsum.photos/200/300?random=6",
    },
    {
      id: 7,
      name: "다목적 퇴비",
      description: "모든 종류의 식물에 사용할 수 있는 다목적 퇴비입니다.",
      price: 22,
      imageUrl: "https://picsum.photos/200/300?random=7",
    },
    {
      id: 8,
      name: "미생물 토양 활성제",
      description: "토양 속 미생물을 활성화시켜 식물 성장을 촉진합니다.",
      price: 30,
      imageUrl: "https://picsum.photos/200/300?random=8",
    },
    {
      id: 9,
      name: "온실 키트",
      description: "작은 공간에서도 식물을 키울 수 있는 미니 온실 키트입니다.",
      price: 40,
      imageUrl: "https://picsum.photos/200/300?random=9",
    },
    {
      id: 10,
      name: "스프링클러 시스템",
      description:
        "정원 전역에 고르게 물을 뿌릴 수 있는 스프링클러 시스템입니다.",
      price: 50,
      imageUrl: "https://picsum.photos/200/300?random=10",
    },
    {
      id: 11,
      name: "자동 급수 장치",
      description:
        "부재 중에도 정원에 물을 공급할 수 있는 자동 급수 장치입니다.",
      price: 35,
      imageUrl: "https://picsum.photos/200/300?random=11",
    },
  ]);

  // Function to handle the purchase action
  const handlePurchase = (product: Product) => {
    alert(`You have purchased: ${product.name} for ${product.price} tokens.`);
    // Here, you can implement further logic like deducting the tokens, updating state, etc.
  };

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

      <div className="fade-in-up">
        <RewardTable handleDetailClick={handleDetailClick} />
      </div>

      {/* Product list component */}
      <div className="mt-8">
        <h2 className="text-2xl font-bold mb-4 font-pretendard ">
          구매 가능한 상품
        </h2>
        <ProductList products={products} handlePurchase={handlePurchase} />
      </div>

      {/* 상세 모달 */}
      {isModalOpen && (
        <DetailModal selectedDetail={selectedDetail} closeModal={closeModal} />
      )}
    </Layout>
  );
};

export default WasteManagementPage;
