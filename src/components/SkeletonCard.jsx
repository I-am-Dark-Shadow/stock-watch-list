import React from 'react';

const SkeletonCard = ({ isCompactView, isSortMenuOpen }) => {
  const cardClasses = isCompactView
    ? `bg-[#181D31] text-white p-4 rounded-xl shadow-lg border border-gray-700 w-full cursor-pointer transition-all duration-300 transform hover:shadow-cyan-500/50 hover:shadow-2xl relative ${isSortMenuOpen ? '-z-50' : 'z-50'}`
    : `bg-[#181D31] text-white p-4 rounded-xl shadow-lg border border-gray-700 w-full cursor-pointer transition-all duration-300 transform hover:scale-105 hover:shadow-cyan-500/50 hover:shadow-2xl relative ${isSortMenuOpen ? '-z-50' : 'z-50'}`;

  return (
    <div className={cardClasses}>
      {/* Header */}
      <div className="flex justify-between items-center mb-2 animate-pulse">
        <div className="flex items-center space-x-2">
          <div className="w-8 h-8 rounded-lg bg-white/10"></div>
          <div className="h-4 w-20 bg-white/10 rounded"></div>
        </div>
        <div className="h-6 w-6 bg-white/10 rounded-full"></div>
      </div>

      {/* Price and Change */}
      <div className="flex justify-between items-center my-3 animate-pulse">
        <div className="h-6 w-24 bg-white/10 rounded"></div>
        <div className="h-5 w-20 bg-white/10 rounded"></div>
      </div>

      {/* Price Type and Last Updated */}
      <div className="flex justify-between text-xs text-gray-400 animate-pulse">
        <div className="h-3 w-16 bg-white/10 rounded"></div>
        <div className="h-3 w-12 bg-white/10 rounded"></div>
      </div>

      {/* Progress Bar */}
      <div className="h-1 bg-gray-600 rounded-full mt-4 animate-pulse">
        <div className="h-full w-3/4 rounded-full bg-white/10"></div>
      </div>
    </div>
  );
};

export default SkeletonCard;
