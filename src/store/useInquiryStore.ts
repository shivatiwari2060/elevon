import { create } from 'zustand';
import {
  firstInvalidField,
  validateField,
  validateInquiry,
  type InquiryErrors,
  type InquiryValues,
  type ValidatedField,
} from '@/features/contact/validation';
import { buildMailtoUrl, postInquiry, toPayload } from '@/features/contact/submit';

const ENDPOINT = import.meta.env.VITE_FORM_ENDPOINT ?? '';

export type InquiryStatus = 'idle' | 'sending' | 'sent' | 'mailto' | 'error';

const EMPTY_VALUES: InquiryValues = {
  name: '',
  email: '',
  company: '',
  services: [],
  budget: '',
  timeline: '',
  message: '',
  consent: false,
  website: '',
};

interface InquiryState {
  values: InquiryValues;
  errors: InquiryErrors;
  status: InquiryStatus;
  setField: <K extends keyof InquiryValues>(field: K, value: InquiryValues[K]) => void;
  blurField: (field: ValidatedField) => void;
  toggleService: (service: string) => void;
  reset: () => void;
  /** Resolves to the first invalid field (so the UI can focus it), or null. */
  submit: () => Promise<ValidatedField | null>;
}

const withError = (
  errors: InquiryErrors,
  field: ValidatedField,
  message: string,
): InquiryErrors => {
  const next = { ...errors };
  if (message) next[field] = message;
  else delete next[field];
  return next;
};

export const useInquiryStore = create<InquiryState>()((set, get) => ({
  values: EMPTY_VALUES,
  errors: {},
  status: 'idle',

  setField: (field, value) =>
    set((state) => {
      const values = { ...state.values, [field]: value };
      // Only re-validate a field once it has been flagged, so typing clears its error.
      const key = field as string as ValidatedField;
      const errors =
        key in state.errors
          ? withError(state.errors, key, validateField(key, values[key] as never))
          : state.errors;
      return { values, errors };
    }),

  blurField: (field) =>
    set((state) => ({
      errors: withError(state.errors, field, validateField(field, state.values[field] as never)),
    })),

  toggleService: (service) =>
    set((state) => {
      const current = state.values.services;
      const services = current.includes(service)
        ? current.filter((item) => item !== service)
        : [...current, service];
      return { values: { ...state.values, services } };
    }),

  reset: () => set({ values: EMPTY_VALUES, errors: {}, status: 'idle' }),

  submit: async () => {
    const { values } = get();
    if (values.website) return null; // honeypot tripped: ignore silently

    const errors = validateInquiry(values);
    set({ errors });
    const invalid = firstInvalidField(errors);
    if (invalid) return invalid;

    const payload = toPayload(values);
    if (!ENDPOINT) {
      window.location.href = buildMailtoUrl(payload);
      set({ status: 'mailto' });
      return null;
    }

    set({ status: 'sending' });
    try {
      await postInquiry(ENDPOINT, payload);
      set({ status: 'sent' });
    } catch {
      set({ status: 'error' });
    }
    return null;
  },
}));
