"use client";

interface Option {
  value: string;
  label: string;
}

interface Props {
  label?: string;
  name?: string;
  value: string;
  placeholder?: string;
  onChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
  options: Option[];
  className?: string;
}

export default function Select({
  label,
  name,
  value,
  onChange,
  options,
  placeholder = "-- Select --",
  className = "",
}: Props) {
  return (
    <div>
      {label && (
        <label className="block mb-1 text-sm font-medium text-white">
          {label}
        </label>
      )}

      <select
        name={name}
        value={value}
        onChange={onChange}
        className={`w-full px-4 py-2 border rounded-md bg-[#2d314b] text-white border-gray-500
        focus:outline-none focus:ring-2 focus:ring-pink-500 ${className}`}
      >
        {/* USE placeholder properly */}
        <option value="">{placeholder}</option>

        {options.map((opt) => (
          <option key={opt.value} value={opt.value}>
            {opt.label}
          </option>
        ))}
      </select>
    </div>
  );
}