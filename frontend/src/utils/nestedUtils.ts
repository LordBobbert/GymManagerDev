// File: src/utils/nestedUtils.ts

// Utility function to safely get nested properties
export function getNestedValue<T>(obj: T, keyPath: string): unknown {
    return keyPath.split('.').reduce<unknown>((acc: unknown, part: string) => {
      if (acc && typeof acc === 'object' && part in acc) {
        return (acc as Record<string, unknown>)[part];
      }
      return undefined;
    }, obj);
  }
  
  // Utility function to safely set nested properties
  export function setNestedValue<T>(obj: T, keyPath: string, value: unknown): T {
    const keys = keyPath.split('.');
    const lastKey = keys.pop() as string;
    const deepCopy = { ...obj }; // Shallow copy
    let current: Record<string, unknown> = deepCopy as Record<string, unknown>;
  
    keys.forEach((key) => {
      if (!(key in current)) {
        current[key] = {};
      }
      current = current[key] as Record<string, unknown>;
    });
  
    current[lastKey] = value;
    return deepCopy;
  }
  