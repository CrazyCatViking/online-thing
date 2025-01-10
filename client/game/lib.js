/**
 * @template T
 * @param {T} initialValue
 * @return {import('./types.d.ts').Ref<T>}
 */ 
export const ref = (initialValue) => ({
  value: initialValue,
});

/**
 * @param {string} char
 */ 
export const isAlphaNumberic = (char) => {
  return /[a-zA-Z0-9]/.test(char);
};
