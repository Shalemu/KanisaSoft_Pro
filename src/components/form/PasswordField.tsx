"use client";

import { useState } from "react";
import {
  FaEye,
  FaEyeSlash,
} from "react-icons/fa";

interface Props {
  label: string;
  name: string;
  value: string;
  onChange: any;
}

export default function PasswordField({
  label,
  name,
  value,
  onChange,
}: Props) {
  const [show, setShow] =
    useState(false);

  return (
    <div>
      <label className="block mb-1 text-sm font-medium">
        {label}
      </label>

      <div className="relative">
        <input
          type={show ? "text" : "password"}
          name={name}
          value={value}
          onChange={onChange}
          className="w-full px-4 py-2 pr-10 rounded-lg bg-[#2d314b] border border-gray-500"
        />

        <button
          type="button"
          onClick={() =>
            setShow(!show)
          }
          className="absolute right-3 top-1/2 -translate-y-1/2"
        >
          {show ? (
            <FaEyeSlash />
          ) : (
            <FaEye />
          )}
        </button>
      </div>
    </div>
  );
}