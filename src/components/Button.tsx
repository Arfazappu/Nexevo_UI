import React from 'react';

interface ButtonProps {
  text: string;
  variant?: 'primary' | 'secondary' | 'tertiary';
  icon?: React.ReactNode; // <-- SVG as React node
  onClick?: () => void;
  disabled?: boolean;
  className?: string;
  type?: 'button' | 'submit' | 'reset';
}

const Button: React.FC<ButtonProps> = ({
  text,
  variant = 'primary',
  icon,
  onClick,
  disabled = false,
  className = '',
  type = 'button'
}) => {
  const baseStyles =
    'inline-flex items-center justify-center gap-2 px-4 py-2 cursor-pointer rounded-full font-semibold text-sm transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed';

  const variantStyles = {
    primary: 'bg-black text-white hover:bg-gray-800 active:bg-gray-900',
    secondary: 'bg-[#00438A]/6 text-[#15191E] hover:bg-[#00438A]/12 active:bg-gray-100',
    tertiary: 'bg-transparent text-[#15191E] border-[1.5px] border-[#15191E] hover:bg-gray-100 active:bg-gray-200'
  };

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={`${baseStyles} ${variantStyles[variant]} ${className}`}
    >
      {icon && <span className="w-4 h-4 flex items-center">{icon}</span>}
      {text}
    </button>
  );
};

export default Button;
