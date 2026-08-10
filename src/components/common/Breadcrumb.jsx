import React from "react";
import { Link } from "react-router-dom";
import { ChevronRight, Home } from "lucide-react";

const Breadcrumb = ({ items }) => {
  return (
    <nav
      aria-label="Breadcrumb"
      className="border-b border-gray-200 bg-gradient-to-r from-slate-50 via-white to-slate-50"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <ol className="flex flex-wrap items-center gap-2 py-4 text-sm">
          {items.map((item, index) => {
            const isLast = index === items.length - 1;
            const isFirst = index === 0;

            return (
              <li key={index} className="flex items-center">
                {!isFirst && (
                  <ChevronRight className="mx-2 h-4 w-4 text-gray-400" />
                )}

                {isLast ? (
                  <span
                    aria-current="page"
                    className="rounded-full bg-blue-50 px-3 py-1 font-semibold text-blue-600"
                  >
                    {item.label}
                  </span>
                ) : (
                  <Link
                    to={item.path}
                    className="flex items-center gap-1 rounded-full px-3 py-1 text-gray-500 transition-all duration-300 hover:bg-gray-100 hover:text-blue-600"
                  >
                    {isFirst && <Home className="h-4 w-4" />}
                    {item.label}
                  </Link>
                )}
              </li>
            );
          })}
        </ol>
      </div>
    </nav>
  );
};

export default Breadcrumb;