import type { IconName } from '@/components/ui/Icon';

export interface NavItem {
  to: string;
  label: string;
}

export type ServiceId = 'web' | 'seo' | 'marketing';

export interface Service {
  id: ServiceId;
  icon: IconName;
  title: string;
  /** Short name used in compact lists and the footer. */
  name: string;
  summary: string;
  intro: string;
  deliverables: string[];
  problems: string[];
  suitedTo: string[];
  process: string[];
}

export interface Feature {
  icon: IconName;
  title: string;
  text: string;
}

export interface Step {
  title: string;
  text: string;
}

export type CaseKind = 'local' | 'landing' | 'firm';

export interface CaseStudy {
  kind: CaseKind;
  title: string;
  objective: string;
  need: string;
  solution: string;
  services: string;
}

export interface Faq {
  question: string;
  answer: string;
}
