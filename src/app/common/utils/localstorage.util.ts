// Utility to safely access localStorage in SSR/browser environments
export function getFromLocalStorage(key: string): string | null {
  if (typeof window !== 'undefined' && window.localStorage) {
    return window.localStorage.getItem(key);
  }
  return null;
}
