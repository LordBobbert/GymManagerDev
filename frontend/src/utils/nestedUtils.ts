// File: src/utils/nestedUtils.ts

// Utility function to safely get nested properties
export function getNestedValue<T>(obj: T, keyPath: string): any {
    return keyPath.split('.').reduce((acc: any, part: string) => (acc && acc[part] !== undefined ? acc[part] : undefined), obj);
  }
  
  // Utility function to safely set nested properties
  export function setNestedValue<T>(obj: T, keyPath: string, value: any): T {
    const keys = keyPath.split('.');
    const lastKey = keys.pop() as string;
    const deepCopy: T = { ...obj }; // Shallow copy
    let current: any = deepCopy;
  
    keys.forEach((key) => {
      if (!(key in current)) {
        current[key] = {};
      }
      current = current[key];
    });
  
    current[lastKey] = value;
    return deepCopy;
  }
  