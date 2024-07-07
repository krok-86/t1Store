import React, { ReactNode } from 'react';

import styles from './button.module.css';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  className?: string;
  label?: ReactNode;
  isOnlySymbol?: boolean;
  isSmall?: boolean;
}

const Button: React.FC<ButtonProps> = ({ className, label, isSmall, isOnlySymbol, ...restProps }) => {

  const size = isSmall && isOnlySymbol ? `${styles.buttonSmall}` : `${styles.button}`;

  return (
    <button className={`${className} ${styles.button} ${size}`} {...restProps}>{label}</button>
  );
};

export default Button;