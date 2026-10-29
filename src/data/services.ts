import type { Service } from '@/types';

export const SERVICES: Service[] = [
  {
    id: 'web',
    icon: 'monitor',
    title: 'Website Design & Development',
    name: 'Website Development',
    summary:
      'Modern, responsive, user-friendly websites that communicate your value and turn visitors into potential customers.',
    intro:
      'We help businesses establish a credible online presence through modern, responsive, and user-friendly websites that communicate value, build trust, and help convert visitors into potential customers.',
    deliverables: [
      'Business and corporate websites',
      'Landing pages',
      'Website redesign and improvement',
      'Portfolio and professional websites',
      'Contact and inquiry forms',
      'Maintenance and support',
    ],
    problems: [
      'Outdated or hard-to-use website',
      'No online presence yet',
      'Site not working well on mobile',
      'Visitors not becoming inquiries',
    ],
    suitedTo: [
      'Small and medium businesses',
      'Startups',
      'Professional firms',
      'Local service providers',
    ],
    process: [
      'Discovery and scope',
      'Design direction and approval',
      'Development and testing',
      'Launch and handover',
    ],
  },
  {
    id: 'seo',
    icon: 'search',
    title: 'Search Engine Optimization',
    name: 'SEO',
    summary:
      'Better-organized, search-friendly websites that support discoverability and long-term organic growth.',
    intro:
      'We help businesses improve visibility in search engines and make it easier for potential customers to discover their services online. We do not promise specific rankings.',
    deliverables: [
      'SEO audit',
      'Keyword research',
      'On-page SEO',
      'Technical SEO improvements',
      'Content optimization',
      'Local SEO, where appropriate',
      'Search performance monitoring',
    ],
    problems: [
      'Customers can’t find you online',
      'Site structure or speed issues',
      'Content not aligned with what people search for',
    ],
    suitedTo: [
      'Businesses with an existing website',
      'Local service providers',
      'Growing online businesses',
    ],
    process: [
      'Audit and research',
      'Prioritized recommendations',
      'Implementation',
      'Monitoring and reporting',
    ],
  },
  {
    id: 'marketing',
    icon: 'megaphone',
    title: 'Digital Marketing',
    name: 'Digital Marketing',
    summary:
      'A structured approach to online visibility, audience engagement, and campaign performance.',
    intro:
      'We help businesses strengthen their digital presence and reach relevant audiences through strategic online marketing activities.',
    deliverables: [
      'Digital marketing planning',
      'Social media strategy and management',
      'Content planning and creation',
      'Digital campaign support',
      'Paid advertising management, where available',
      'Campaign performance reporting',
    ],
    problems: [
      'Inconsistent online activity',
      'Unclear marketing direction',
      'Difficulty reaching the right audience',
    ],
    suitedTo: ['Startups and new ventures', 'SMEs', 'Digital-first businesses'],
    process: [
      'Goals and audience review',
      'Strategy and calendar',
      'Execution',
      'Reporting and refinement',
    ],
  },
];
