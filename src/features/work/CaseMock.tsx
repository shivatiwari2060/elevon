import type { CaseKind } from '@/types';

const LABELS: Record<CaseKind, string> = {
  local: 'Concept preview: a service business homepage with a hero banner and three service cards',
  landing: 'Concept preview: a centered landing page with a headline, sign-up field and button',
  firm: 'Concept preview: a consultancy site with a side navigation and two content cards',
};

const SERVICE_CARD_X = [16, 115, 214];
const SIDE_NAV_Y = [56, 70, 84];
const FIRM_CARD_X = [86, 196];

/** Decorative concept-project previews, drawn in the brand palette. */
export function CaseMock({ kind }: { kind: CaseKind }) {
  const accent = `url(#mock-${kind})`;
  return (
    <svg viewBox="0 0 320 190" role="img" aria-label={LABELS[kind]}>
      <defs>
        <linearGradient id={`mock-${kind}`} x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#00f0e0" />
          <stop offset="1" stopColor="#1c86c6" />
        </linearGradient>
      </defs>
      <rect width="320" height="190" fill="#04162c" />
      <rect width="320" height="22" fill="#071d38" />
      {[12, 23, 34].map((x) => (
        <circle key={x} cx={x} cy="11" r="3" fill="#1d3a5c" />
      ))}

      {kind === 'local' && (
        <>
          <rect x="16" y="36" width="44" height="9" rx="4.5" fill="#e8f0fa" />
          <rect x="196" y="38" width="26" height="5" rx="2.5" fill="#1d3a5c" />
          <rect x="230" y="38" width="26" height="5" rx="2.5" fill="#1d3a5c" />
          <rect x="266" y="34" width="38" height="14" rx="7" fill={accent} />
          <rect y="58" width="320" height="64" fill="#071d38" />
          <rect x="16" y="74" width="150" height="10" rx="5" fill="#fff" />
          <rect x="16" y="92" width="98" height="6" rx="3" fill="#3b5a80" />
          <rect x="16" y="106" width="48" height="10" rx="5" fill={accent} />
          <path d="M210 122l50-48h60v48z" fill={accent} opacity=".25" />
          {SERVICE_CARD_X.map((x) => (
            <g key={x}>
              <rect x={x} y="134" width="90" height="44" rx="6" fill="#071d38" stroke="#12304f" />
              <rect x={x + 8} y="142" width="14" height="14" rx="4" fill="#00f0e0" opacity=".25" />
              <rect x={x + 8} y="162" width="52" height="5" rx="2.5" fill="#3b5a80" />
            </g>
          ))}
        </>
      )}

      {kind === 'landing' && (
        <>
          <rect x="112" y="40" width="96" height="8" rx="4" fill="#00f0e0" opacity=".35" />
          <rect x="58" y="58" width="204" height="14" rx="7" fill="#fff" />
          <rect x="84" y="78" width="152" height="14" rx="7" fill="#fff" />
          <rect x="94" y="102" width="132" height="6" rx="3" fill="#3b5a80" />
          <rect x="108" y="114" width="104" height="6" rx="3" fill="#3b5a80" />
          <rect x="62" y="136" width="136" height="26" rx="13" fill="#071d38" stroke="#1d3a5c" />
          <rect x="204" y="136" width="56" height="26" rx="13" fill={accent} />
          <path d="M0 190V150l60 40z" fill={accent} opacity=".3" />
        </>
      )}

      {kind === 'firm' && (
        <>
          <rect y="22" width="68" height="168" fill="#071d38" />
          <rect x="12" y="36" width="38" height="8" rx="4" fill={accent} />
          {SIDE_NAV_Y.map((y) => (
            <rect
              key={y}
              x="12"
              y={y}
              width={y === 70 ? 38 : 30}
              height="5"
              rx="2.5"
              fill="#3b5a80"
            />
          ))}
          <rect x="86" y="36" width="150" height="12" rx="6" fill="#fff" />
          <rect x="86" y="58" width="210" height="6" rx="3" fill="#3b5a80" />
          <rect x="86" y="70" width="180" height="6" rx="3" fill="#3b5a80" />
          {FIRM_CARD_X.map((x) => (
            <g key={x}>
              <rect x={x} y="92" width="100" height="84" rx="8" fill="#071d38" stroke="#12304f" />
              <rect x={x + 10} y="102" width="80" height="34" rx="5" fill="#00f0e0" opacity=".14" />
              <rect x={x + 10} y="146" width="60" height="5" rx="2.5" fill="#3b5a80" />
            </g>
          ))}
        </>
      )}
    </svg>
  );
}
