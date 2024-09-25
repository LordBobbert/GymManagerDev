// File: src/utils/nestedUtils.ts

// Utility function to safely get nested properties
export function getNestedValue<T, K extends keyof T>(obj: T, keyPath: string): T[K] | undefined {
    return keyPath.split('.').reduce((acc, part) => {
      // Return undefined if the current accumulator is not an object
      if (acc && typeof acc === 'object') {
        return (acc as any)[part];  // TypeScript will infer 'any' for deeper object parts
      }
      return undefined;
    }, obj as any);  // Start the reduction with the full object as the initial accumulator
  }
  
  // Utility function to safely set nested properties
  export function setNestedValue<T>(obj: T, keyPath: string, value: any): T {
    const keys = keyPath.split('.');
    const lastKey = keys.pop();
    const deepCopy = { ...obj }; // Shallow copy of the object to maintain immutability
    let current: any = deepCopy; // Work on the copied object
  
    keys.forEach((key) => {
      if (!(key in current)) {
        current[key] = {};  // Create nested objects if not already present
      }
      current = current[key]; // Dive deeper into the object
    });
  
    if (lastKey) {
      current[lastKey] = value;  // Set the final value at the deepest key
    }
  
    return deepCopy; // Return the updated copy of the object
  }
  