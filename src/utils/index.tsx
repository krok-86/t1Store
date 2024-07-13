import { useEffect, useState } from "react";

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
