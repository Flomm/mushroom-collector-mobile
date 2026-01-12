export function isUndefined<T>(obj: T | undefined): obj is undefined {
  return typeof obj === 'undefined';
}
