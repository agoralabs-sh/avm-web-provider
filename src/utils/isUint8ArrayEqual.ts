/**
 * Convenience function that checks if two Uint8Arrays are equal.
 * @param {Uint8Array} arr1 - The first array.
 * @param {Uint8Array} arr2 - The second array.
 * @returns {boolean} True if the two arrays are equal, false otherwise.
 */
export default function isUint8ArrayEqual(arr1: Uint8Array, arr2: Uint8Array): boolean {
  // check if the arrays have the same length
  if (arr1.length !== arr2.length) {
    return false;
  }

  return arr1.every((value, index) => value === arr2[index]);
}
