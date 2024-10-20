// File: src/utils/apiHelpers.ts

export const handleResponse = async (res: Response, errorMessage: string): Promise<any> => {
    if (!res.ok) {
      const errorDetails = await res.text();
      console.error(`Error ${res.status}: ${errorDetails}`);
      throw new Error(`${errorMessage} - Status: ${res.status}`);
    }
    return await res.json();
  };
  