type ClassValue = string | false | null | undefined;

/** Joins class names, skipping falsy values. */
export const cn = (...values: ClassValue[]): string => values.filter(Boolean).join(' ');
