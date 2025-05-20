import React from "react";

interface CardProps {
  title: string;
  amount?: number;
  children?: React.ReactNode;
}

const Card = ({ title, amount, children }: CardProps) => {
  return (
    <div className="border-solid border-2 border-gray-300 rounded-lg p-6 w-full">
      <p className="text-sm text-gray-700 font-semibold">{title}</p>
      <p className="text-3xl font-bold text-gray-900 mt-2">{amount}</p>
      {children}
    </div>
  );
};

export default Card;
