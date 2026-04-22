"use client";

import React from "react";

interface Option {
  value: string;
  label: string;
}

interface SelectProps {
  options: Option[];
  placeholder?: string;
  value?: string; 
  onChange: (value: string) => void;
  className?: string;
}

const Select: React.FC<SelectProps> = ({
  options,
  placeholder = "Select an option",
  value = "",
  onChange,
  className = "",
}) => {
  return (
    <select
      value={value} 
      onChange={(e) => onChange(e.target.value)}
      className={`h-11 w-full rounded-lg border border-gray-300 px-4 py-2.5 text-sm
        focus:outline-none focus:ring-2 focus:ring-blue-500
        ${
          value
            ? "text-gray-800 dark:text-white"
            : "text-gray-400"
        }
        ${className}`}
    >
      {/* Placeholder */}
      <option value="" disabled>
        {placeholder}
      </option>

      {/* Options */}
      {options.map((option) => (
        <option key={option.value} value={option.value}>
          {option.label}
        </option>
      ))}
    </select>
  );
};

export default Select;