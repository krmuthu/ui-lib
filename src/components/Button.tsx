import React from 'react';

const Button = ({ 
  variant = 'contained', 
  color = 'primary',
  size = 'medium',
  disabled = false,
  fullWidth = false,
  startIcon = null,
  endIcon = null,
  onClick,
  children,
  className = '',
}) => {
  // Base styles for all buttons
  const baseStyle = 'font-medium rounded focus:outline-none transition-colors duration-200 inline-flex items-center justify-center';
  
  // Size variations
  const sizeClasses = {
    small: 'text-xs py-1 px-3',
    medium: 'text-sm py-2 px-4',
    large: 'text-base py-3 px-6',
  };
  
  // Color and variant combinations
  const variantClasses = {
    contained: {
      primary: 'bg-blue-600 hover:bg-blue-700 text-white shadow',
      secondary: 'bg-purple-600 hover:bg-purple-700 text-white shadow',
      success: 'bg-green-600 hover:bg-green-700 text-white shadow',
      error: 'bg-red-600 hover:bg-red-700 text-white shadow',
    },
    outlined: {
      primary: 'border border-blue-600 text-blue-600 hover:bg-blue-50',
      secondary: 'border border-purple-600 text-purple-600 hover:bg-purple-50',
      success: 'border border-green-600 text-green-600 hover:bg-green-50',
      error: 'border border-red-600 text-red-600 hover:bg-red-50',
    },
    text: {
      primary: 'text-blue-600 hover:bg-blue-50',
      secondary: 'text-purple-600 hover:bg-purple-50',
      success: 'text-green-600 hover:bg-green-50',
      error: 'text-red-600 hover:bg-red-50',
    },
  };
  
  // Disabled styles
  const disabledClasses = disabled ? 
    (variant === 'contained' ? 
      'bg-gray-300 text-gray-500 cursor-not-allowed shadow-none' : 
      'text-gray-400 border-gray-300 cursor-not-allowed hover:bg-transparent'
    ) : '';
  
  // Full width style
  const widthClass = fullWidth ? 'w-full' : '';
  
  // Icon spacing
  const startIconClass = startIcon ? 'mr-2' : '';
  const endIconClass = endIcon ? 'ml-2' : '';
  
  // Combine all classes
  const buttonClasses = `
    ${baseStyle}
    ${sizeClasses[size]}
    ${disabled ? disabledClasses : variantClasses[variant][color]}
    ${widthClass}
    ${className}
  `.trim();
  
  return (
    <button
      className={buttonClasses}
      onClick={disabled ? undefined : onClick}
      disabled={disabled}
    >
      {startIcon && <span className={startIconClass}>{startIcon}</span>}
      {children}
      {endIcon && <span className={endIconClass}>{endIcon}</span>}
    </button>
  );
};

export default Button;