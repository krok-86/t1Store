import { FC, useState, ChangeEvent } from "react";

import styles from './input.module.css';

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  className?: string;
}

const Input: FC<InputProps> = ({ className, ...restProps }) => {

  const [inputValue, setInputValue] = useState("");

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    setInputValue(event.target.value);
  };

  return (
    <input
      className={`${className} ${styles.input}`}
      onChange={handleChange}
      value={inputValue}
      {...restProps}
    />
  );
};

export default Input;
