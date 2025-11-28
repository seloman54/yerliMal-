import React from 'react';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'danger' | 'success';
}

export const Button: React.FC<ButtonProps> = ({ variant = 'primary', className = '', children, ...props }) => {
  const baseStyles = "px-6 py-3 rounded-xl font-bold transition-all transform hover:scale-105 active:scale-95 shadow-lg border-b-4";
  
  const variants = {
    primary: "bg-blue-500 hover:bg-blue-600 text-white border-blue-700",
    secondary: "bg-yellow-400 hover:bg-yellow-500 text-yellow-900 border-yellow-600",
    danger: "bg-red-500 hover:bg-red-600 text-white border-red-700",
    success: "bg-green-500 hover:bg-green-600 text-white border-green-700",
  };

  return (
    <button className={`${baseStyles} ${variants[variant]} ${className}`} {...props}>
      {children}
    </button>
  );
};