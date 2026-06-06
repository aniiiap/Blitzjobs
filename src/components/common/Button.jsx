import React from 'react';

export const Button = ({
  variant = 'primary',
  children,
  className = '',
  ...props
}) => {
  const baseStyles = 'px-5 py-2.5 rounded-lg font-medium transition-all duration-200 text-sm focus:outline-none focus:ring-2';

  const variants = {
    primary: 'bg-blue-600 text-white hover:bg-blue-700 focus:ring-blue-500/50',
    secondary: 'bg-gray-100 text-gray-800 hover:bg-gray-200 focus:ring-gray-300',
    outline: 'border border-gray-300 text-gray-700 hover:bg-gray-50 focus:ring-gray-200'
  };

  return (
    <button
      className={`${baseStyles} ${variants[variant]} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
};
