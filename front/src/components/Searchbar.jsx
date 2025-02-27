import React from "react";

const SearchBar = ({
  placeholder = "Buscar...",
  value,
  onChange,
  onSearch,
  className = "",
  disabled = false,
  icon = null,
}) => {
  return (
    <div
      className={`flex items-center bg-white rounded-lg shadow-md p-2 focus-within:ring-2 focus-within:ring-blue-400 ${className}`}
    >
      {icon ? (
        <div className="p-2 text-blue-500">{icon}</div>
      ) : (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={2}
          stroke="currentColor"
          className="w-6 h-6 text-blue-500"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M21 21l-4.35-4.35m1.7-5.15a7.5 7.5 0 11-15 0 7.5 7.5 0 0115 0z"
          />
        </svg>
      )}
      <input
        type="text"
        value={value}
        onChange={onChange}
        onKeyDown={(e) => e.key === "Enter" && onSearch && onSearch(value)}
        placeholder={placeholder}
        className="flex-1 p-2 bg-transparent text-gray-700 focus:outline-none"
        disabled={disabled}
      />
    </div>
  );
};

export default SearchBar;
