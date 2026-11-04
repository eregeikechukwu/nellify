import type { Project } from '@/content/projects';

/** Procedural SVG artwork per project, so the portfolio needs no stock photos. */
export default function ProjectArt({ kind }: { kind: Project['art'] }) {
  return (
    <svg viewBox="0 0 800 600" preserveAspectRatio="xMidYMid slice" width="100%" height="100%" role="img" aria-label={`${kind} concept artwork`}>
      <defs>
        <linearGradient id={`g-${kind}`} x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor={kind === 'dining' ? '#2a1608' : '#0e1c33'} />
          <stop offset="1" stopColor={kind === 'portal' ? '#0b1a2e' : '#07101f'} />
        </linearGradient>
        <radialGradient id={`r-${kind}`} cx="0.7" cy="0.25" r="0.7">
          <stop offset="0" stopColor={kind === 'portal' ? '#3d7bff' : '#f5a524'} stopOpacity="0.55" />
          <stop offset="1" stopColor="#000" stopOpacity="0" />
        </radialGradient>
      </defs>
      <rect width="800" height="600" fill={`url(#g-${kind})`} />
      <rect width="800" height="600" fill={`url(#r-${kind})`} />
      {kind === 'estate' && (
        <g>
          <rect x="120" y="270" width="200" height="230" fill="#13223a" stroke="#f5a524" strokeOpacity="0.5" />
          <rect x="320" y="190" width="170" height="310" fill="#17294a" stroke="#f5a524" strokeOpacity="0.7" />
          <rect x="490" y="320" width="190" height="180" fill="#13223a" stroke="#f5a524" strokeOpacity="0.5" />
          {[0, 1, 2, 3, 4].map((i) => <rect key={i} x="342" y={215 + i * 54} width="126" height="30" fill="#f5a524" opacity={0.12 + i * 0.06} />)}
          {[0, 1, 2].map((i) => <rect key={i} x="146" y={298 + i * 62} width="148" height="36" fill="#3d7bff" opacity="0.16" />)}
          <line x1="60" y1="500" x2="740" y2="500" stroke="#f2efe8" strokeOpacity="0.25" />
        </g>
      )}
      {kind === 'dining' && (
        <g>
          <circle cx="400" cy="320" r="190" fill="none" stroke="#f5a524" strokeOpacity="0.5" strokeWidth="2" />
          <circle cx="400" cy="320" r="140" fill="#3b1f0c" stroke="#f5a524" strokeOpacity="0.8" strokeWidth="2" />
          <circle cx="400" cy="320" r="70" fill="#f5a524" opacity="0.85" />
          <path d="M210 330 Q 400 150 590 330" stroke="#f2efe8" strokeOpacity="0.5" fill="none" strokeWidth="2" />
          <rect x="140" y="480" width="520" height="6" fill="#f5a524" opacity="0.5" />
        </g>
      )}
      {kind === 'portal' && (
        <g>
          <rect x="90" y="110" width="620" height="380" rx="14" fill="#0c1a2e" stroke="#3d7bff" strokeOpacity="0.5" />
          <rect x="90" y="110" width="150" height="380" rx="14" fill="#0a1526" />
          {[0, 1, 2, 3].map((i) => <rect key={i} x="110" y={150 + i * 44} width="110" height="16" rx="4" fill="#3d7bff" opacity={0.25 - i * 0.04} />)}
          {[0, 1, 2].map((i) => <rect key={i} x={270 + i * 140} y="140" width="120" height="70" rx="8" fill="#f5a524" opacity={0.22 - i * 0.05} />)}
          {[0, 1, 2, 3, 4].map((i) => <rect key={i} x="270" y={240 + i * 46} width="410" height="28" rx="6" fill="#f2efe8" opacity="0.07" />)}
        </g>
      )}
    </svg>
  );
}
