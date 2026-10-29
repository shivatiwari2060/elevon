import { describe, expect, it } from 'vitest';
import { buildMailtoUrl, toPayload } from './submit';

const values = {
  name: '  Asha Rai ',
  email: ' asha@example.com ',
  company: '',
  services: ['SEO', 'Digital Marketing'],
  budget: '',
  timeline: '',
  message: ' Need help with search. ',
  consent: true,
  website: '',
};

describe('toPayload', () => {
  it('trims text and joins services', () => {
    const payload = toPayload(values);
    expect(payload.name).toBe('Asha Rai');
    expect(payload.services).toBe('SEO, Digital Marketing');
  });

  it('labels an empty service selection', () => {
    expect(toPayload({ ...values, services: [] }).services).toBe('Not specified');
  });
});

describe('buildMailtoUrl', () => {
  it('addresses Elevon and encodes the inquiry', () => {
    const url = buildMailtoUrl(toPayload(values));
    expect(url.startsWith('mailto:elevonnp@gmail.com?subject=')).toBe(true);
    expect(url).toContain(encodeURIComponent('Project inquiry from Asha Rai'));
    expect(url).toContain(encodeURIComponent('Services: SEO, Digital Marketing'));
  });
});
