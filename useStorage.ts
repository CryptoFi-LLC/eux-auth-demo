import { useEffect, useState } from 'react';

import { captureError } from '~/utils';

interface StorageAccessHookReturn<T> {
  value: T | null;
  setValue: (value: T | ((prevValue: T) => T)) => void;
  removeValue: () => void;
  hasAccess: boolean;
}

const useStorageAccess = <T>(key: string, initialValue: T): StorageAccessHookReturn<T> => {
  const [storedValue, setStoredValue] = useState<T | null>(initialValue);
  const [hasAccess, setHasAccess] = useState<boolean>(false);

  // Check existing access on mount
  useEffect(() => {
    const initAccess = async (): Promise<void> => {
      try {
        const accessGranted = await document.hasStorageAccess();
        setHasAccess(accessGranted);

        if (accessGranted) {
          setStoredValue(initialValue);
        }
      } catch (error) {
        captureError({
          error: error instanceof Error ? error : new Error(String(error)),
        });
      }
    };

    initAccess();
  }, [key, initialValue]);

  const setValue = <U extends T>(value: U | ((prevValue: T) => U)): void => {
    if (!hasAccess) {
      return;
    }

    const valueToStore = value instanceof Function ? value(storedValue as T) : value;
    setStoredValue(valueToStore);
  };

  const removeValue = (): void => {
    if (!hasAccess) {
      return;
    }
    setStoredValue(null);
  };

  return {
    value: storedValue,
    setValue,
    removeValue,
    hasAccess,
  };
};

export default useStorageAccess;
