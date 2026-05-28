import { useEffect, useState } from 'react';

export const useDebounce = <T>(value: T, delayMs: number = 500): T => {
  const [debouncedValue, setDebouncedValue] = useState<T>(value);

  useEffect(() => {
    const contextTimeoutHandler = setTimeout(() => {
      setDebouncedValue(value);
    }, delayMs);

    return () => {
      clearTimeout(contextTimeoutHandler);
    };
  }, [value, delayMs]);

  return debouncedValue;
};