import React from "react";

const Loading: React.FC = () => {
  return (
    <div className="flex items-center justify-center mt-10 sm:mt-20 md:mt-30">
      <div
        className="w-8 h-8 border-4 border-[#FF7700] border-t-transparent rounded-full animate-spin"
        role="status"
      />
    </div>
  );
};

export default Loading;
