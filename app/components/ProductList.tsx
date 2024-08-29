// components/ProductList.tsx
import React from "react";
import ProductCard from "./ProductCard"; // Make sure this import is correct

interface Product {
  id: number;
  name: string;
  description: string;
  price: number;
}

interface ProductListProps {
  products: Product[];
  handlePurchase: (product: Product) => void;
}

const ProductList: React.FC<ProductListProps> = ({
  products,
  handlePurchase,
}) => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 fade-in-up">
      {products.map((product) => (
        <ProductCard
          key={product.id}
          product={product}
          handlePurchase={handlePurchase}
        />
      ))}
    </div>
  );
};

export default ProductList; // Make sure ProductList is exported as default
