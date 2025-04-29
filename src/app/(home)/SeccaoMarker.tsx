import React from "react";

interface SeccaoMarkerProps {
  children: React.ReactNode;
}

const SeccaoMarker: React.FC<SeccaoMarkerProps> = ({ children }) => {
  return (
    <div className="flex flex-row text-2xl  gap-3 font-bold text-black">
      <div className="w-4   bg-orange-500 rounded-lg"></div>
      {children}
    </div>
  );
};

export default SeccaoMarker;
