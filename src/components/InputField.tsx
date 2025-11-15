import React from 'react';

interface InputFieldProps {
  label: string;
  placeholder?: string;
  value: string;
  onChange: (value: string) => void;
  type?: 'text' | 'email' | 'password' | 'number';
  required?: boolean;
  optional?: boolean;
  disabled?: boolean;
  className?: string;
  error?: string;
}

const InputField: React.FC<InputFieldProps> = ({
  label,
  placeholder = '',
  value,
  onChange,
  type = 'text',
  required = false,
  optional = false,
  disabled = false,
  className = '',
  error = ''
}) => {
  return (
    <div className={`flex flex-col gap-2 ${className}`}>
      <label className="text-sm font-medium text-[#15191E]">
        {label}
        {optional && <span className="text-[#566676] ml-1">(Optional)</span>}
      </label>
      <input
        type={type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        required={required}
        disabled={disabled}
        className={`w-full px-3 py-2 border rounded text-sm text-[#15191E] placeholder:text-[#566676] focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent disabled:bg-gray-50 disabled:cursor-not-allowed ${
          error ? 'border-red-500' : 'border-[#CAD2D8]'
        }`}
      />
      {error && (
        <p className="text-xs text-red-500 mt-0.5">{error}</p>
      )}
    </div>
  );
};

export default InputField;