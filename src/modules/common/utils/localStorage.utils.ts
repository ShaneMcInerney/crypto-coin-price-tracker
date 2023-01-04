/**
 * Local storage wrapper class
 */
export class LocalStorage {
  /**
   * Get item from local storage.
   * @param key - key for local storage item
   */
  public static getItem<T>(key: string): T {
    const value = localStorage.getItem(key);

    try {
      return JSON.parse(value as string) as T;
    } catch {
      return value as unknown as T;
    }
  }

  /**
   * Set item in local storage.
   * @param key - key for local storage item
   * @param value - value of local storage item
   */
  public static setItem<T extends { toString: () => string }>(
    key: string,
    value: T
  ): void {
    let jsonValue: string = value.toString();

    try {
      jsonValue = JSON.stringify(value);
    } finally {
      localStorage.setItem(key, jsonValue);
    }
  }

  /**
   * Delete item from local storage.
   * @param key - key for local storage item
   */
  public static deleteItem(key: string): void {
    localStorage.removeItem(key);
  }
}
