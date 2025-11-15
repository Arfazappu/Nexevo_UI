import React, { useState } from 'react';

interface SelectFieldProps {
  label: string;
  placeholder?: string;
  value: string[];
  onChange: (value: string[]) => void;
  options: string[];
  disabled?: boolean;
  className?: string;
  error?: string;
}

const SelectField: React.FC<SelectFieldProps> = ({
  label,
  placeholder = '',
  value,
  onChange,
  options,
  disabled = false,
  className = '',
  error = ''
}) => {
  const [isOpen, setIsOpen] = useState(false);

  const handleToggle = (option: string) => {
    if (disabled) return;
    if (value.includes(option)) {
      onChange(value.filter(v => v !== option));
    } else {
      onChange([...value, option]);
    }
  };

  return (
    <div className={`flex flex-col gap-2 ${className}`}>
      <label className="text-sm font-medium text-[#15191E]">{label}</label>
      <div className="relative">
        <div
          onClick={() => !disabled && setIsOpen(!isOpen)}
          className={`w-full px-3 py-2 border rounded text-sm flex items-center justify-between bg-white ${
            disabled ? 'cursor-not-allowed bg-gray-50' : 'cursor-pointer'
          } ${error ? 'border-red-500' : 'border-[#CAD2D8]'}`}
        >
          <span className={value.length === 0 ? 'text-[#566676]' : 'text-[#15191E]'}>
            {placeholder}
          </span>
          <div className="flex items-center border-l border-[#CAD2D8] pl-2 ml-2">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className={`text-[#566676] transition-transform ${isOpen ? 'rotate-180' : ''}`}
            >
              <path d="m6 9 6 6 6-6" />
            </svg>
          </div>
        </div>

        {isOpen && !disabled && (
          <>
            <div className="fixed inset-0 z-40" onClick={() => setIsOpen(false)}></div>
            <div className="absolute z-50 w-full mt-1 bg-white border border-[#CAD2D8] rounded shadow-lg max-h-48 overflow-y-auto">
              <div className="py-1">
                {options.map((option) => (
                  <div
                    key={option}
                    onClick={() => handleToggle(option)}
                    className={`px-3 py-2 text-sm cursor-pointer hover:bg-gray-50 flex items-center gap-2 ${
                      value.includes(option) ? 'bg-blue-50' : ''
                    }`}
                  >
                    <input
                      type="checkbox"
                      checked={value.includes(option)}
                      readOnly
                      className="w-4 h-4"
                    />
                    <span className="text-[#15191E]">{option}</span>
                  </div>
                ))}
              </div>
            </div>
          </>
        )}
      </div>

      {value.length > 0 && (
        <div className="flex flex-wrap gap-2 mt-1">
          {value.map((item) => (
            <span
              key={item}
              className="px-2.5 py-1 bg-white text-[#15191E] text-xs rounded border border-[#CAD2D8] flex items-center gap-1"
            >
              {item}
              {!disabled && (
                <button
                  onClick={() => handleToggle(item)}
                  className="hover:text-red-500"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="12"
                    height="12"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M18 6 6 18" />
                    <path d="m6 6 12 12" />
                  </svg>
                </button>
              )}
            </span>
          ))}
        </div>
      )}
      
      {error && (
        <p className="text-xs text-red-500 mt-0.5">{error}</p>
      )}
    </div>
  );
};

export default SelectField;