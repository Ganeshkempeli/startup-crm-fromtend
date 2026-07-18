// Component: Button
// Category: Atom
// Description: Base button component with multiple variants

import React from 'react';
import './Button.css';

export const Button = ({
  children,
  variant = 'primary', // primary, secondary, success, warning, danger
  size = 'medium', // small, medium, large
  disabled = false,
  icon = null,
  onClick,
  fullWidth = false,
  className = '',
  type = 'button',
  ...props
}) => {
  const baseClass = 'btn';
  const variantClass = `btn-${variant}`;
  const sizeClass = `btn-${size}`;
  const widthClass = fullWidth ? 'btn-full-width' : '';
  const finalClass = `${baseClass} ${variantClass} ${sizeClass} ${widthClass} ${className}`;

  return (
    <button
      type={type}
      className={finalClass}
      disabled={disabled}
      onClick={onClick}
      {...props}
    >
      {icon && <span className="btn-icon">{icon}</span>}
      {children && <span className="btn-text">{children}</span>}
    </button>
  );
};

// Usage Example:
/*
<Button variant="primary" size="medium">
  Click Me
</Button>

<Button variant="success" icon={<CheckIcon />}>
  Confirm
</Button>

<Button variant="danger" disabled>
  Delete
</Button>
*/

export default Button;
