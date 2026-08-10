import React from "react";

const Logo = ({ variant = "dark" }) => {
  const textColor =
    variant === "light" ? "text-white" : "text-slate-900";

  const subTextColor =
    variant === "light" ? "text-gray-300" : "text-slate-500";

  return (
    <div className="flex items-center gap-3 select-none">
      {/* Logo Icon */}
      <div className="h-12 w-12">
        <svg
          viewBox="0 0 100 100"
          className="w-full h-full"
          xmlns="http://www.w3.org/2000/svg"
        >
          <defs>
            <linearGradient
              id={`logoGradient-${variant}`}
              x1="0%"
              y1="0%"
              x2="100%"
              y2="100%"
            >
              <stop offset="0%" stopColor="#F59E0B" />
              <stop offset="100%" stopColor="#D97706" />
            </linearGradient>
          </defs>

          {/* Outer Hexagon */}
          <polygon
            points="50,5 93,28 93,72 50,95 7,72 7,28"
            fill="none"
            stroke={`url(#logoGradient-${variant})`}
            strokeWidth="4"
          />

          {/* Inner Shape */}
          <polygon
            points="50,18 82,36 82,64 50,82 18,64 18,36"
            fill={`url(#logoGradient-${variant})`}
            opacity="0.15"
          />

          {/* HB */}
          <text
            x="50"
            y="53"
            textAnchor="middle"
            fontSize="28"
            fontWeight="700"
            fill={variant === "light" ? "#fff" : "#0F172A"}
            fontFamily="Inter"
          >
            H
          </text>

          <text
            x="50"
            y="74"
            textAnchor="middle"
            fontSize="12"
            fontWeight="700"
            letterSpacing="2"
            fill={variant === "light" ? "#fff" : "#0F172A"}
            opacity="0.8"
            fontFamily="Inter"
          >
            B
          </text>
        </svg>
      </div>

      {/* Text */}
      <div className="leading-none">
        <h1
          className={`font-extrabold text-2xl tracking-tight ${textColor}`}
        >
          HB{" "}
          <span className="bg-gradient-to-r from-amber-500 to-orange-600 bg-clip-text text-transparent">
            Hardware
          </span>
        </h1>

        <p
          className={`mt-1 text-[11px] uppercase tracking-[0.35em] font-semibold ${subTextColor}`}
        >
          Retail • Wholesale
        </p>
      </div>
    </div>
  );
};

export default Logo;