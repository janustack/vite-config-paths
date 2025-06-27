import { platform } from "node:os";

// On Windows and macOS (by default), filesystems are case-insensitive
const caseSensitive = !["win32", "darwin"].includes(platform());

/**
 * Normalize file path casing according to filesystem sensitivity.
 */
export function fixFilePathCasing(filePath: string): string {
  return caseSensitive ? filePath : filePath.toLowerCase();
}

/**
 * Check if an array includes a file path, normalizing casing.
 */
export function includesFilePath(array: string[], filePath: string): boolean {
  return array.includes(fixFilePathCasing(filePath));
}

/**
 * A Map keyed by normalized file paths.
 */
export class FilePathMap<T> {
  private map = new Map<string, T>();

  get(filePath: string): T | undefined {
    return this.map.get(fixFilePathCasing(filePath));
  }

  set(filePath: string, value: T): this {
    this.map.set(fixFilePathCasing(filePath), value);
    return this;
  }

  values(): IterableIterator<T> {
    return this.map.values();
  }
}
