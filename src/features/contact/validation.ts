export interface InquiryValues {
  name: string;
  email: string;
  company: string;
  services: string[];
  budget: string;
  timeline: string;
  message: string;
  consent: boolean;
  /** Honeypot: real visitors never see or fill this. */
  website: string;
}

export type ValidatedField = 'name' | 'email' | 'message' | 'consent';
export type InquiryErrors = Partial<Record<ValidatedField, string>>;

const EMAIL_PATTERN = /^[^@\s]+@[^@\s]+\.[^@\s]+$/;

const RULES: { [K in ValidatedField]: (value: InquiryValues[K]) => string } = {
  name: (value) => (value.trim().length > 1 ? '' : 'Please enter your name.'),
  email: (value) => (EMAIL_PATTERN.test(value.trim()) ? '' : 'Please enter a valid email address.'),
  message: (value) =>
    value.trim().length > 9 ? '' : 'Please describe your project (a few words at least).',
  consent: (value) => (value ? '' : 'Please confirm you agree to the Privacy Notice.'),
};

const FIELD_ORDER: ValidatedField[] = ['name', 'email', 'message', 'consent'];

export function validateField<K extends ValidatedField>(field: K, value: InquiryValues[K]): string {
  return RULES[field](value);
}

export function validateInquiry(values: InquiryValues): InquiryErrors {
  const errors: InquiryErrors = {};
  for (const field of FIELD_ORDER) {
    const message = (RULES[field] as (value: unknown) => string)(values[field]);
    if (message) errors[field] = message;
  }
  return errors;
}

export const firstInvalidField = (errors: InquiryErrors): ValidatedField | null =>
  FIELD_ORDER.find((field) => errors[field]) ?? null;
