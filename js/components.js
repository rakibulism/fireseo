/* js/components.js — Reusable UI components */

const { createElement: h } = React;

/* ─── SVG Icon ─── */
function Icon({ d, size = 14, sw = 1.8, color = 'currentColor' }) {
  return h('svg', {
    width: size, height: size, viewBox: '0 0 24 24',
    fill: 'none', stroke: color, strokeWidth: sw,
    strokeLinecap: 'round', strokeLinejoin: 'round',
    style: { flexShrink: 0, display: 'block' },
  }, h('path', { d }));
}

/* ─── Category pill ─── */
function Pill({ label, cat }) {
  const p = CAT[cat] || { c: T.sub, bg: T.s3, bd: T.bd };
  return h('span', {
    className: 'pill',
    style: { color: p.c, background: p.bg, border: `1px solid ${p.bd}` },
  }, label);
}

/* ─── Severity chip ─── */
function Chip({ sev, count, noCount }) {
  if (count === 0) return null;
  const p = SEV[sev];
  const label = noCount
    ? sev.charAt(0).toUpperCase() + sev.slice(1)
    : `${count} ${sev}`;
  return h('span', {
    className: 'chip',
    style: { color: p.c, background: p.bg, border: `1px solid ${p.bd}` },
  }, label);
}

/* ─── Score ring (SVG donut) ─── */
function Ring({ score, size = 40, sw = 4 }) {
  const r = (size - sw * 2) / 2;
  const circ = 2 * Math.PI * r;
  const offset = circ - (score / 100) * circ;
  const c  = scoreColor(score);
  const tc = scoreBorder(score);
  const cx = size / 2, cy = size / 2;

  return h('svg', {
    width: size, height: size,
    style: { transform: 'rotate(-90deg)', flexShrink: 0 },
  },
    h('circle', { cx, cy, r, fill: 'none', stroke: tc, strokeWidth: sw }),
    h('circle', {
      cx, cy, r, fill: 'none', stroke: c, strokeWidth: sw,
      strokeDasharray: circ, strokeDashoffset: offset, strokeLinecap: 'round',
    }),
    h('text', {
      x: '50%', y: '50%', textAnchor: 'middle', dominantBaseline: 'middle',
      style: {
        fill: c, fontSize: size * 0.245, fontWeight: 700, fontFamily: 'inherit',
        transform: 'rotate(90deg)', transformOrigin: '50% 50%',
      },
    }, score)
  );
}

/* ─── Mini score bar ─── */
function Bar({ score, w = 68 }) {
  const c = scoreColor(score);
  return h('div', { style: { display: 'flex', alignItems: 'center', gap: 6 } },
    h('div', { style: { width: w, height: 4, background: T.s4, borderRadius: 2, overflow: 'hidden' } },
      h('div', { style: { width: `${score}%`, height: '100%', background: c, borderRadius: 2 } })
    ),
    h('span', { style: { fontSize: 12, color: T.sub, minWidth: 22, fontWeight: 500 } }, score)
  );
}

/* ─── Stat card ─── */
function StatCard({ label, value, sub, color, icon }) {
  return h('div', { className: 'stat-card' },
    h('div', { className: 'stat-card-header' },
      h('span', { className: 'stat-card-label' }, label),
      h('span', { style: { color, opacity: 0.5, display: 'flex' } }, h(Icon, { d: icon, size: 14 }))
    ),
    h('div', { className: 'stat-card-value' }, value),
    h('div', { className: 'stat-card-sub' }, sub)
  );
}

/* ─── Score detail card (used in SEO/AEO tabs) ─── */
function ScoreDetailCard({ label, score, note }) {
  const c = scoreColor(score);
  return h('div', { className: 'score-detail-card' },
    h('div', { style: { fontSize: 11, color: T.mt, fontWeight: 500, marginBottom: 7 } }, label),
    h('div', { style: { fontSize: 26, fontWeight: 700, letterSpacing: '-.03em', color: c, marginBottom: 6 } }, score),
    h('div', { style: { height: 3, background: T.s4, borderRadius: 2, marginBottom: 6, overflow: 'hidden' } },
      h('div', { style: { width: `${score}%`, height: '100%', background: c, borderRadius: 2 } })
    ),
    h('div', { style: { fontSize: 11, color: T.sub } }, note)
  );
}

/* ─── Sidebar nav item ─── */
function NavItem({ id, label, icon, badge, active, onClick }) {
  return h('button', {
    className: `nav-btn nav-item ${active ? 'active' : ''}`,
    onClick,
    style: {
      background: active ? T.cyBg : 'transparent',
      color: active ? T.cy : T.sub,
    },
  },
    h('span', { style: { display: 'flex', color: active ? T.cy : T.mt } },
      h(Icon, { d: icon, size: 14 })
    ),
    h('span', null, label),
    badge && h('span', { className: 'nav-badge' }, badge)
  );
}

/* ─── Back button ─── */
function BackBtn({ onClick, label = 'Back' }) {
  return h('button', { className: 'back-btn btn-hover', onClick },
    h(Icon, { d: 'M19 12H5M12 5l-7 7 7 7', size: 14 }),
    label
  );
}
