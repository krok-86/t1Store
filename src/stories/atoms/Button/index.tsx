import React, { ReactNode } from 'react';

import styles from './button.module.css';

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  className?: string;
  label?: ReactNode;
  isSmall?: boolean;
}

const Button: React.FC<ButtonProps> = ({ className, label, isSmall,  ...restProps }) => {

  const size = isSmall ? `${styles.buttonSmall}` : `${styles.button}`;

  return (
    <button className={`${className} ${styles.button} ${size}`} {...restProps}>{label}</button>
  );
};

export default Button;
