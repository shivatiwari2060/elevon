import { SITE } from '@/data/site';
import type { InquiryValues } from './validation';

export interface InquiryPayload {
  name: string;
  email: string;
  company: string;
  services: string;
  budget: string;
  timeline: string;
  message: string;
}

export function toPayload(values: InquiryValues): InquiryPayload {
  return {
    name: values.name.trim(),
    email: values.email.trim(),
    company: values.company.trim(),
    services: values.services.join(', ') || 'Not specified',
    budget: values.budget,
    timeline: values.timeline,
    message: values.message.trim(),
  };
}

/** POSTs the inquiry as JSON to a form service. Throws on a non-2xx response. */
export async function postInquiry(endpoint: string, payload: InquiryPayload): Promise<void> {
  const response = await fetch(endpoint, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
    body: JSON.stringify(payload),
  });
  if (!response.ok) throw new Error(`Inquiry request failed (${response.status})`);
}

/** Fallback when no form service is configured: a pre-filled email to Elevon. */
export function buildMailtoUrl(payload: InquiryPayload): string {
  const body = [
    `Name: ${payload.name}`,
    `Email: ${payload.email}`,
    `Company: ${payload.company || '-'}`,
    `Services: ${payload.services}`,
    `Budget: ${payload.budget || '-'}`,
    `Timeline: ${payload.timeline || '-'}`,
    '',
    'Project description:',
    payload.message,
  ].join('\n');
  const subject = `Project inquiry from ${payload.name}`;
  return `mailto:${SITE.email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
}
