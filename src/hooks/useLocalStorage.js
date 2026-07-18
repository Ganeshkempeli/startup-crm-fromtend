import { useState, useCallback } from 'react';

/**
 * Custom hook to manage state synchronized with localStorage.
 * Handles localStorage unavailability (e.g., private browsing) and JSON parsing errors gracefully.
 *
 * @template T
 * @param {string} key - The localStorage key under which data is stored
 * @param {T | (() => T)} initialValue - The fallback value or function returning it if no data exists in localStorage
 * @returns {[T, (value: T | ((val: T) => T)) => void]} A stateful value and a function to update it
 */
export function useLocalStorage(key, initialValue) {
  // State to store our value
  // Pass initial state function to useState so logic is only executed once on mount
  const [storedValue, setStoredValue] = useState(() => {
    try {
      if (typeof window !== 'undefined' && window.localStorage) {
        const item = window.localStorage.getItem(key);
        // Parse stored json or if none return initialValue
        if (item !== null) {
          try {
            return JSON.parse(item);
          } catch (parseError) {
            console.warn(`JSON parsing error for localStorage key "${key}":`, parseError);
            return typeof initialValue === 'function' ? initialValue() : initialValue;
          }
        }
      }
      return typeof initialValue === 'function' ? initialValue() : initialValue;
    } catch (error) {
      // If error or localStorage is disabled, return initialValue
      console.warn(`Error reading localStorage key "${key}":`, error);
      return typeof initialValue === 'function' ? initialValue() : initialValue;
    }
  });

  // Return a wrapped version of useState's setter function that persists the new value to localStorage.
  const setValue = useCallback((value) => {
    try {
      // Allow value to be a function so we have same API as useState
      setStoredValue((currentVal) => {
        const valueToStore = value instanceof Function ? value(currentVal) : value;
        try {
          if (typeof window !== 'undefined' && window.localStorage) {
            window.localStorage.setItem(key, JSON.stringify(valueToStore));
          }
        } catch (storageError) {
          console.warn(`Error writing to localStorage for key "${key}":`, storageError);
        }
        return valueToStore;
      });
    } catch (error) {
      console.warn(`Error setting value state for key "${key}":`, error);
    }
  }, [key]);

  return [storedValue, setValue];
}

export default useLocalStorage;

