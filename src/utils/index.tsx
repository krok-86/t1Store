import { useEffect, useState } from "react";

import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import { IProductCart } from "../types/types";

export const formRatingArray = (rate: number) => {
  const imgs: string[] = [];
  for (let i = 1; i <= 5; i++) {
    if (rate - i >= - 0.5) {
      imgs.push('/pictures/yellowStar.svg');
      continue;
    }
    imgs.push('/pictures/grayStar.svg');
  }
  return imgs;
}

export function useDebounce<T>(value: T, delay: number): T {
  const [debouncedValue, setDebouncedValue] = useState(value);

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    return () => {
      clearTimeout(handler);
    };
  }, [value, delay]);

  return debouncedValue;
}

export class SessionStorageUtil {
  static getItem(key: string): string | null {
    return window.sessionStorage.getItem(key);
  }

  static setItem(key: string, value: string): void {
    window.sessionStorage.setItem(key, value);
  }

  static removeItem(key: string): void {
    window.sessionStorage.removeItem(key);
  }
}


export const successToast = (message: string) => {
  return toast.success(message, {
    position: 'top-right',
    autoClose: 5000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    theme: 'light',
  });
};

export const errorToast = (message: string) => {
  return toast.error(message, {
    position: 'top-right',
    autoClose: 5000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    theme: 'light',
  });
};

export const countInCart = (items:  IProductCart[], id: number) => {
  return items?.find((el: IProductCart) => el.id == id)?.quantity || 0;
}
