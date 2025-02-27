import { clsx } from "clsx";
import { twMerge } from "tailwind-merge"

export function cn(...inputs) {
  return twMerge(clsx(inputs));
}

export function getLocalStorage(key) {
  if (typeof window !== 'undefined') {
    return JSON.parse(localStorage.getItem(key) || '[]');
  }
  return [];
}

export function generateUUID() {
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, (c) => {
    const r = (Math.random() * 16) | 0;
    const v = c === 'x' ? r : (r & 0x3) | 0x8;
    return v.toString(16);
  });
}

export function formatDate(dateString) {
  const date = new Date(dateString);
  return date.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });
}

export const convertToCents = (dollarAmount) => {
  return Math.round(dollarAmount * 100);
};

// Converting cents back to dollars for display
export const convertToDollars = (centAmount) => {
  return (centAmount / 100).toFixed(2);
};


// Form utils ============================== to merge with use form
/**
 * Check if a value is a plain object.
 * @param {*} item
 * @returns {boolean}
 */
function isObject(item) {
  return item && typeof item === "object" && !Array.isArray(item);
}

/**
 * Deeply merges two values. For arrays, it merges each index.
 * If a key in the source is undefined, the target value is kept.
 *
 * @param {*} target - The target value.
 * @param {*} source - The source value.
 * @returns {*} - The merged value.
 */
export function deepMerge(target, source) {
  // Handle merging arrays
  if (Array.isArray(target) && Array.isArray(source)) {
    const maxLen = Math.max(target.length, source.length);
    const result = [];
    for (let i = 0; i < maxLen; i++) {
      if (i in target && i in source) {
        result[i] = deepMerge(target[i], source[i]);
      } else if (i in target) {
        result[i] = target[i];
      } else {
        result[i] = source[i];
      }
    }
    return result;
  }

  // Handle merging objects
  if (isObject(target) && isObject(source)) {
    const result = { ...target };
    for (const key in source) {
      if (Object.prototype.hasOwnProperty.call(source, key)) {
        if (key in target) {
          result[key] = deepMerge(target[key], source[key]);
        } else {
          result[key] = source[key];
        }
      }
    }
    return result;
  }

  // For primitive values, use source if it's defined.
  return source !== undefined ? source : target;
}