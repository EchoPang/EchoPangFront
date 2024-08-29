// components/ProductCard.tsx
import React from "react";

export interface Product {
  id: number;
  name: string;
  description: string;
  price: number;
  imageUrl: string; // Add imageUrl to Product interface
}

interface ProductCardProps {
  product: Product;
  handlePurchase: (product: Product) => void;
}

const ProductCard: React.FC<ProductCardProps> = ({
  product,
  handlePurchase,
}) => {
  return (
    <div className="rounded-lg p-2 bg-white flex flex-col justify-between">
      <img
        src={product.imageUrl}
        alt={product.name}
        className="w-full h-40 object-cover rounded-md mb-4"
        onError={(e) => {
          // Handle broken image links
          e.currentTarget.src = "https://via.placeholder.com/200";
        }}
      />
      <h2 className="text-lg font-bold mb-2">{product.name}</h2>
      <p className="text-sm text-gray-600 mb-4">{product.description}</p>
      <p className="text-md font-semibold mb-2">{product.price} 토큰</p>
      <button
        onClick={() => handlePurchase(product)}
        className="bg-eco-main text-white py-2 px-4 rounded "
      >
        구매하기
      </button>
    </div>
  );
};

export default ProductCard;
