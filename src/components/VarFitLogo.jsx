import React from "react";

const VarFitLogo = () => {
  return (
    <div className="flex items-center gap-2">
      {/* Heartbeat "V" Logo */}
      <svg
        width="50"
        height="50"
        viewBox="0 0 100 100"
        xmlns="http://www.w3.org/2000/svg"
      >
        <polyline
          points="5,50 25,50 35,20 45,80 55,30 65,50 95,50"
          fill="none"
          stroke="red"
          strokeWidth="6"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          {/* Heartbeat animation (scaling) */}
          <animateTransform
            attributeType="XML"
            attributeName="transform"
            type="scale"
            values="1;1.2;1"
            dur="1.6s"
            repeatCount="indefinite"
            transformOrigin="50% 50%" 
          />
          
          {/* Color change animation */}
          <animate
            attributeName="stroke"
            values="red;#9f1e38;red"
            dur="1.6s"
            repeatCount="indefinite"
          />
        </polyline>
      </svg>

      {/* Brand Name */}
      <span className="text-3xl font-bold text-red-600">VarFit</span>
    </div>
  );
};

export default VarFitLogo;
