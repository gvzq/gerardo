"use client";

import React, { forwardRef } from "react";
import { cn } from "@/lib/utils";

interface PhoneInputProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  className?: string;
  required?: boolean;
  maxLength?: number;
  pattern?: string;
  id?: string;
  name?: string;
}

const PhoneInput = forwardRef<HTMLInputElement, PhoneInputProps>(
  ({
    value,
    onChange,
    placeholder = "(321) 123-4567",
    className = "",
    required = false,
    maxLength = 14,
    pattern = "^\\(\\d{3}\\) \\d{3}-\\d{4}$",
    id,
    name
  }, ref) => {
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      let inputValue = e.target.value;

      // Remove all non-digits
      const digits = inputValue.replace(/\D/g, "");

      // Format as (XXX) XXX-XXXX
      if (digits.length >= 6) {
        inputValue = `(${digits.slice(0, 3)}) ${digits.slice(3, 6)}-${digits.slice(6, 10)}`;
      } else if (digits.length >= 3) {
        inputValue = `(${digits.slice(0, 3)}) ${digits.slice(3)}`;
      } else {
        inputValue = digits;
      }

      onChange(inputValue);
    };

    return (
      <div className="relative">
        <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
          <div className="flex items-center space-x-2">
            {/* USA Flag */}
            <div className="w-6 h-4 rounded-sm overflow-hidden border border-gray-200">
              <svg
                viewBox="0 0 24 16"
                className="w-full h-full"
                xmlns="http://www.w3.org/2000/svg"
              >
                {/* Red stripes */}
                <rect width="24" height="16" fill="#B22234" />
                <rect y="1.23" width="24" height="1.23" fill="white" />
                <rect y="3.69" width="24" height="1.23" fill="white" />
                <rect y="6.15" width="24" height="1.23" fill="white" />
                <rect y="8.62" width="24" height="1.23" fill="white" />
                <rect y="11.08" width="24" height="1.23" fill="white" />
                <rect y="13.54" width="24" height="1.23" fill="white" />

                {/* Blue canton */}
                <rect width="9.6" height="8.62" fill="#3C3B6E" />

                {/* Stars (simplified as white dots) */}
                <g fill="white">
                  <circle cx="1.2" cy="1.2" r="0.3" />
                  <circle cx="2.4" cy="1.2" r="0.3" />
                  <circle cx="3.6" cy="1.2" r="0.3" />
                  <circle cx="4.8" cy="1.2" r="0.3" />
                  <circle cx="6" cy="1.2" r="0.3" />
                  <circle cx="7.2" cy="1.2" r="0.3" />
                  <circle cx="8.4" cy="1.2" r="0.3" />

                  <circle cx="1.8" cy="2.4" r="0.3" />
                  <circle cx="3" cy="2.4" r="0.3" />
                  <circle cx="4.2" cy="2.4" r="0.3" />
                  <circle cx="5.4" cy="2.4" r="0.3" />
                  <circle cx="6.6" cy="2.4" r="0.3" />
                  <circle cx="7.8" cy="2.4" r="0.3" />

                  <circle cx="1.2" cy="3.6" r="0.3" />
                  <circle cx="2.4" cy="3.6" r="0.3" />
                  <circle cx="3.6" cy="3.6" r="0.3" />
                  <circle cx="4.8" cy="3.6" r="0.3" />
                  <circle cx="6" cy="3.6" r="0.3" />
                  <circle cx="7.2" cy="3.6" r="0.3" />
                  <circle cx="8.4" cy="3.6" r="0.3" />

                  <circle cx="1.8" cy="4.8" r="0.3" />
                  <circle cx="3" cy="4.8" r="0.3" />
                  <circle cx="4.2" cy="4.8" r="0.3" />
                  <circle cx="5.4" cy="4.8" r="0.3" />
                  <circle cx="6.6" cy="4.8" r="0.3" />
                  <circle cx="7.8" cy="4.8" r="0.3" />

                  <circle cx="1.2" cy="6" r="0.3" />
                  <circle cx="2.4" cy="6" r="0.3" />
                  <circle cx="3.6" cy="6" r="0.3" />
                  <circle cx="4.8" cy="6" r="0.3" />
                  <circle cx="6" cy="6" r="0.3" />
                  <circle cx="7.2" cy="6" r="0.3" />
                  <circle cx="8.4" cy="6" r="0.3" />

                  <circle cx="1.8" cy="7.2" r="0.3" />
                  <circle cx="3" cy="7.2" r="0.3" />
                  <circle cx="4.2" cy="7.2" r="0.3" />
                  <circle cx="5.4" cy="7.2" r="0.3" />
                  <circle cx="6.6" cy="7.2" r="0.3" />
                  <circle cx="7.8" cy="7.2" r="0.3" />
                </g>
              </svg>
            </div>

            {/* Country code */}
            <span className="text-gray-700 font-medium">+1</span>

            {/* Separator */}
            <div className="w-px h-4 bg-gray-300" />
          </div>
        </div>

        <input
          ref={ref}
          type="tel"
          id={id}
          name={name}
          value={value}
          onChange={handleChange}
          maxLength={maxLength}
          pattern={pattern}
          required={required}
          className={cn(
            "w-full pl-20 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent",
            className
          )}
          placeholder={placeholder}
        />
      </div>
    );
  }
);

PhoneInput.displayName = "PhoneInput";

export default PhoneInput;