import { describe, expect, it } from 'vitest';
import {
  firstInvalidField,
  validateField,
  validateInquiry,
  type InquiryValues,
} from './validation';

const valid: InquiryValues = {
  name: 'Asha Rai',
  email: 'asha@example.com',
  company: '',
  services: [],
  budget: '',
  timeline: '',
  message: 'We need a new website for our clinic.',
  consent: true,
  website: '',
};

describe('validateInquiry', () => {
  it('accepts a complete inquiry', () => {
    expect(validateInquiry(valid)).toEqual({});
  });

  it('flags every missing required field', () => {
    const errors = validateInquiry({ ...valid, name: '', email: '', message: '', consent: false });
    expect(Object.keys(errors)).toEqual(['name', 'email', 'message', 'consent']);
  });

  it('rejects malformed emails', () => {
    expect(validateField('email', 'not-an-email')).not.toBe('');
    expect(validateField('email', 'a@b')).not.toBe('');
    expect(validateField('email', ' ok@example.com ')).toBe('');
  });

  it('requires a meaningful project description', () => {
    expect(validateField('message', 'too short')).not.toBe('');
    expect(validateField('message', 'a long enough description')).toBe('');
  });
});

describe('firstInvalidField', () => {
  it('returns fields in form order so the UI can focus the first one', () => {
    expect(firstInvalidField({ message: 'x', email: 'y' })).toBe('email');
    expect(firstInvalidField({})).toBeNull();
  });
});
