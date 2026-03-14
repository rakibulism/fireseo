/* js/tokens.js — Design tokens */

const T = {
  /* Surfaces */
  bg:      '#F4F4F7',
  surf:    '#FFFFFF',
  s2:      '#FAFAFA',
  s3:      '#F3F3F6',
  s4:      '#EAEAEF',

  /* Borders */
  bd:      '#E3E3EA',
  bdhi:    '#CDCDD8',

  /* Text */
  tx:      '#111118',
  sub:     '#5C5C70',
  mt:      '#9595A8',
  dim:     '#C8C8D4',

  /* Cyan (primary) */
  cy:      '#0891B2',
  cyBg:    '#EFF9FC',
  cyBd:    '#BAE6F7',

  /* Green */
  gn:      '#059669',
  gnBg:    '#ECFDF5',
  gnBd:    '#A7F3D0',

  /* Purple */
  pu:      '#7C3AED',
  puBg:    '#F5F0FF',
  puBd:    '#DDD5FB',

  /* Amber */
  am:      '#B45309',
  amBg:    '#FFFBEB',
  amBd:    '#FDE68A',

  /* Red */
  rd:      '#DC2626',
  rdBg:    '#FEF2F2',
  rdBd:    '#FECACA',

  /* Orange */
  or:      '#C2410C',
  orBg:    '#FFF7ED',
  orBd:    '#FED7AA',

  /* Blue */
  bl:      '#1D4ED8',
  blBg:    '#EFF6FF',
  blBd:    '#BFDBFE',
};

const CAT = {
  SEO:       { c: T.cy, bg: T.cyBg, bd: T.cyBd },
  AEO:       { c: T.pu, bg: T.puBg, bd: T.puBd },
  GEO:       { c: T.gn, bg: T.gnBg, bd: T.gnBd },
  Technical: { c: T.bl, bg: T.blBg, bd: T.blBd },
  AI:        { c: T.am, bg: T.amBg, bd: T.amBd },
};

const SEV = {
  critical: { c: T.rd, bg: T.rdBg, bd: T.rdBd },
  high:     { c: T.or, bg: T.orBg, bd: T.orBd },
  medium:   { c: T.am, bg: T.amBg, bd: T.amBd },
  low:      { c: T.bl, bg: T.blBg, bd: T.blBd },
};

function scoreColor(s)  { return s >= 85 ? T.gn : s >= 65 ? T.cy : s >= 45 ? T.am : T.rd; }
function scoreBorder(s) { return s >= 85 ? T.gnBd : s >= 65 ? T.cyBd : s >= 45 ? T.amBd : T.rdBd; }
function scoreBg(s)     { return s >= 85 ? T.gnBg : s >= 65 ? T.cyBg : s >= 45 ? T.amBg : T.rdBg; }
