/* js/views.js — Dashboard, Audit, and Report views */

const { createElement: h, useRef } = React;

const NAV_ITEMS = [
  { id: 'dash',     label: 'Dashboard',       icon: 'M3 3h7v7H3zm11 0h7v7h-7zM3 14h7v7H3zm11 0h7v7h-7z' },
  { id: 'audits',   label: 'Audits',           icon: 'M13 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V9z' },
  { id: 'sites',    label: 'Websites',         icon: 'M12 2a10 10 0 1 0 0 20A10 10 0 0 0 12 2zM2 12h20' },
  { id: 'intel',    label: 'Competitor Intel', icon: 'M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z' },
  { id: 'alerts',   label: 'Alerts',           icon: 'M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9M13.73 21a2 2 0 0 1-3.46 0', badge: '3' },
  { id: 'fixes',    label: 'AI Fix Queue',     icon: 'M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 1 1 7.072 0l-.548.547A3.374 3.374 0 0 0 14 18.469V19a2 2 0 1 1-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z' },
  { id: 'settings', label: 'Settings',         icon: 'M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 0 0 2.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 0 0 1.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 0 0-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 0 0-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 0 0-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 0 0-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 0 0 1.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065zM15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0z' },
];

/* ══════════════════════════════════════
   Sidebar
══════════════════════════════════════ */
function Sidebar({ activeNav, setNav, setView }) {
  return h('aside', { className: 'sidebar' },
    h('div', { className: 'sidebar-logo' },
      h('div', { className: 'sidebar-logo-inner' },
        h('div', { className: 'sidebar-logo-icon' },
          h(Icon, { d: 'M13 2L3 14h9l-1 8 10-12h-9l1-8z', size: 14, sw: 2, color: '#fff' })
        ),
        h('div', null,
          h('div', { className: 'sidebar-logo-name' }, 'AuditAI'),
          h('div', { className: 'sidebar-logo-tagline' }, 'Agentic SEO Platform')
        )
      )
    ),
    h('nav', { className: 'sidebar-nav' },
      ...NAV_ITEMS.map(item =>
        h(NavItem, {
          key: item.id, ...item,
          active: activeNav === item.id,
          onClick: () => { setNav(item.id); if (item.id === 'dash') setView('dash'); },
        })
      )
    ),
    h('div', { className: 'sidebar-user' },
      h('div', { className: 'sidebar-user-card' },
        h('div', { className: 'sidebar-avatar' }, 'AC'),
        h('div', null,
          h('div', { style: { fontSize: 12, fontWeight: 600, color: T.tx } }, 'AltumCode'),
          h('div', { style: { fontSize: 10, color: T.mt } }, 'Pro Plan')
        )
      )
    )
  );
}

/* ══════════════════════════════════════
   Dashboard View
══════════════════════════════════════ */
function DashboardView({ url, setUrl, onAudit, onReport }) {
  const totalIssues = s => s.iss.critical + s.iss.high + s.iss.medium + s.iss.low;

  return h('div', { className: 'view-wrapper' },
    h('div', { style: { marginBottom: 20 } },
      h('h1', { className: 'page-title' }, 'Dashboard'),
      h('p', { className: 'page-subtitle' }, 'Agentic SEO · AEO · GEO audit platform')
    ),

    /* Audit bar */
    h('div', { className: 'audit-bar' },
      h('div', { className: 'audit-input-wrap' },
        h('span', { className: 'audit-input-icon' },
          h(Icon, { d: 'M21 21l-4.35-4.35M11 19a8 8 0 1 0 0-16 8 8 0 0 0 0 16z', size: 13 })
        ),
        h('input', {
          className: 'audit-input',
          value: url,
          onChange: ev => setUrl(ev.target.value),
          onKeyDown: ev => ev.key === 'Enter' && onAudit(),
          placeholder: 'Enter URL to audit — https://yoursite.com',
        })
      ),
      h('button', {
        className: 'btn-start-audit btn-hover',
        onClick: () => onAudit(),
      },
        h(Icon, { d: 'M13 2L3 14h9l-1 8 10-12h-9l1-8z', size: 13, sw: 2, color: '#fff' }),
        'Start Audit'
      )
    ),

    /* Stat cards */
    h('div', { className: 'stat-grid' },
      h(StatCard, { label: 'Sites monitored',   value: '8',  sub: '+2 this month',    color: T.cy, icon: 'M12 2a10 10 0 1 0 0 20A10 10 0 0 0 12 2z' }),
      h(StatCard, { label: 'Avg health score',  value: '85', sub: '+3 pts this week',  color: T.gn, icon: 'M22 11.08V12a10 10 0 1 1-5.93-9.14' }),
      h(StatCard, { label: 'Critical issues',   value: '4',  sub: '−2 resolved today', color: T.rd, icon: 'M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z' }),
      h(StatCard, { label: 'Audits this month', value: '12', sub: '3 scheduled',       color: T.pu, icon: 'M13 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V9z' })
    ),

    /* Sites table */
    h('div', { className: 'sites-table' },
      h('div', { className: 'sites-table-header' },
        h('div', { style: { display: 'flex', alignItems: 'center', gap: 9 } },
          h('span', { className: 'sites-table-title' }, 'Monitored Websites'),
          h('span', { className: 'sites-count-badge' }, `${SITES.length} sites`)
        ),
        h('div', { style: { display: 'flex', gap: 5, alignItems: 'center' } },
          h(Pill, { label: 'SEO', cat: 'SEO' }),
          h(Pill, { label: 'AEO', cat: 'AEO' }),
          h(Pill, { label: 'GEO', cat: 'GEO' }),
          h('span', { style: { fontSize: 11, color: T.dim } }, '← score layers')
        )
      ),
      h('div', { className: 'table-col-headers' },
        ['Website', 'Score', 'SEO', 'AEO', 'GEO', 'Issues', ''].map((lbl, i) =>
          h('div', { key: i, className: 'col-header' }, lbl)
        )
      ),
      ...SITES.map((s, i) =>
        h('div', {
          key: s.id,
          className: 'table-row row-hover',
          onClick: () => onReport(s),
          style: { borderBottom: i < SITES.length - 1 ? `1px solid ${T.bd}` : 'none' },
        },
          h('div', { style: { display: 'flex', alignItems: 'center', gap: 10 } },
            h('div', { className: 'site-favicon' }, s.fav),
            h('div', null,
              h('div', { className: 'site-name' }, s.name),
              h('div', { className: 'site-meta' }, `${s.audits} audits · ${s.last}`)
            )
          ),
          h(Ring, { score: s.score, size: 36, sw: 3.5 }),
          h(Bar, { score: s.seo }),
          h(Bar, { score: s.aeo }),
          h(Bar, { score: s.geo }),
          h('div', { style: { display: 'flex', flexWrap: 'wrap', gap: 3 } },
            s.iss.critical > 0 && h(Chip, { sev: 'critical', count: s.iss.critical }),
            s.iss.high > 0     && h(Chip, { sev: 'high',     count: s.iss.high }),
            s.iss.medium > 0   && h(Chip, { sev: 'medium',   count: s.iss.medium })
          ),
          h('div', { className: 'row-actions' },
            h('button', {
              className: 'btn-row-action btn-hover',
              onClick: ev => { ev.stopPropagation(); onAudit(`https://${s.name}`); },
            }, h(Icon, { d: 'M13 2L3 14h9l-1 8 10-12h-9l1-8z', size: 11, sw: 2 }), 'Audit'),
            h('button', {
              className: 'btn-row-action btn-hover',
              onClick: ev => { ev.stopPropagation(); onReport(s); },
            }, 'Report')
          )
        )
      )
    )
  );
}

/* ══════════════════════════════════════
   Audit View
══════════════════════════════════════ */
function AuditView({ auditUrl, step, done, pct, stepsRef, onViewReport, onBack }) {
  const isComplete = step >= STEPS.length;

  return h('div', { className: 'view-wrapper view-wrapper--audit' },
    h(BackBtn, { onClick: onBack, label: 'Back to dashboard' }),

    h('div', { className: 'audit-header-card' },
      h('div', { style: { display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 14 } },
        h('div', null,
          h('div', { style: { fontSize: 10, fontWeight: 600, color: T.mt, textTransform: 'uppercase', letterSpacing: '.07em', marginBottom: 4 } }, 'Running audit on'),
          h('div', { style: { fontSize: 16, fontWeight: 700, letterSpacing: '-.02em', color: T.tx } }, auditUrl || 'https://example.com')
        ),
        isComplete
          ? h('div', { className: 'audit-status-complete' }, 'Complete')
          : h('div', { className: 'audit-status-running' },
              h('span', { className: 'audit-status-dot' }), 'Running'
            )
      ),
      h('div', { className: 'progress-bar-track' },
        h('div', {
          className: 'progress-bar-fill',
          style: { width: `${pct}%`, background: isComplete ? T.gn : T.cy },
        })
      ),
      h('div', { style: { display: 'flex', justifyContent: 'space-between', fontSize: 11, color: T.mt } },
        h('span', null, `${done.length} / ${STEPS.length} checks`),
        h('span', { style: { fontWeight: 600 } }, `${pct}%`)
      )
    ),

    h('div', { style: { display: 'flex', gap: 5, marginBottom: 11, flexWrap: 'wrap' } },
      Object.keys(CAT).map(cat => h(Pill, { key: cat, label: cat, cat }))
    ),

    h('div', { ref: stepsRef, className: 'steps-list' },
      ...STEPS.map((s, i) => {
        const isCom = done.includes(i);
        const isAct = step === i && !isCom;
        const isPen = !isCom && !isAct;
        return h('div', {
          key: s.id,
          className: 'step-item step-row',
          style: { opacity: isPen ? 0.35 : 1 },
        },
          h('div', {
            className: 'step-dot',
            style: {
              background: isCom ? T.gnBg : isAct ? T.cyBg : T.s3,
              border: `1.5px solid ${isCom ? T.gnBd : isAct ? T.cyBd : T.dim}`,
            },
          },
            isCom
              ? h('svg', { width: 9, height: 9, viewBox: '0 0 24 24', fill: 'none', stroke: T.gn, strokeWidth: 3 },
                  h('polyline', { points: '20 6 9 17 4 12' })
                )
              : h('div', { style: { width: 5, height: 5, borderRadius: '50%', background: isAct ? T.cy : T.dim } })
          ),
          h('div', { style: { flex: 1 } },
            h('div', { style: { display: 'flex', alignItems: 'center', gap: 7, flexWrap: 'wrap', marginBottom: isCom ? 3 : 0 } },
              h('span', { style: { fontSize: 12.5, color: isCom ? T.tx : isAct ? T.cy : T.sub, fontWeight: isAct ? 600 : 400 } }, s.label),
              h(Pill, { label: s.cat, cat: s.cat })
            ),
            isCom && h('div', { className: 'step-finding' },
              h('span', { style: { color: T.dim, marginRight: 4 } }, '↳'), s.finding
            )
          )
        );
      })
    ),

    isComplete && h('div', { className: 'audit-complete-banner' },
      h('div', null,
        h('div', { style: { fontSize: 13, fontWeight: 600, color: T.gn, marginBottom: 2 } }, 'Audit complete — 38 issues across 12 categories'),
        h('div', { style: { fontSize: 12, color: T.sub } }, '2 critical · 8 high · 18 medium · 10 low')
      ),
      h('button', {
        className: 'btn-hover',
        onClick: onViewReport,
        style: { padding: '8px 16px', background: T.gn, color: '#fff', border: 'none', borderRadius: 7, fontSize: 13, fontWeight: 600, whiteSpace: 'nowrap', cursor: 'pointer' },
      }, 'View Report →')
    )
  );
}

/* ══════════════════════════════════════
   Report View
══════════════════════════════════════ */
function ReportView({ site, onBack, onReaudit, onTabChange, activeTab }) {
  const total = site.iss.critical + site.iss.high + site.iss.medium + site.iss.low;

  return h('div', { className: 'view-wrapper view-wrapper--report' },
    h(BackBtn, { onClick: onBack, label: 'Back to dashboard' }),

    /* Site header */
    h('div', { style: { display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', marginBottom: 20 } },
      h('div', { style: { display: 'flex', alignItems: 'center', gap: 12 } },
        h('div', { style: { width: 40, height: 40, borderRadius: 10, background: T.cyBg, border: `1px solid ${T.cyBd}`, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 15, fontWeight: 800, color: T.cy } }, site.fav),
        h('div', null,
          h('h1', { style: { margin: '0 0 2px', fontSize: 17, fontWeight: 700, letterSpacing: '-.02em', color: T.tx } }, site.name),
          h('div', { style: { fontSize: 12, color: T.mt } }, `${site.audits} audits · Last: ${site.last}`)
        )
      ),
      h('div', { style: { display: 'flex', gap: 7 } },
        h('button', {
          className: 'btn-hover',
          style: { padding: '7px 13px', background: T.s2, color: T.sub, border: `1px solid ${T.bd}`, borderRadius: 7, fontSize: 12, fontWeight: 500, display: 'flex', alignItems: 'center', gap: 5, cursor: 'pointer' },
        }, h(Icon, { d: 'M4 12v8a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-8M16 6l-4-4-4 4M12 2v13', size: 13 }), 'Export'),
        h('button', {
          className: 'btn-hover',
          onClick: onReaudit,
          style: { padding: '7px 14px', background: T.cy, color: '#fff', border: 'none', borderRadius: 7, fontSize: 12, fontWeight: 600, display: 'flex', alignItems: 'center', gap: 5, cursor: 'pointer' },
        }, h(Icon, { d: 'M13 2L3 14h9l-1 8 10-12h-9l1-8z', size: 12, sw: 2.5, color: '#fff' }), 'Re-audit')
      )
    ),

    /* Score cards */
    h('div', { className: 'report-score-grid' },
      ...[
        { lbl: 'Overall', s: site.score },
        { lbl: 'SEO',     s: site.seo,  cat: 'SEO' },
        { lbl: 'AEO',     s: site.aeo,  cat: 'AEO' },
        { lbl: 'GEO',     s: site.geo,  cat: 'GEO' },
      ].map((it, i) =>
        h('div', {
          key: i,
          className: 'score-card',
          onClick: () => it.cat && onTabChange(it.cat.toLowerCase()),
          style: { border: `1px solid ${scoreBorder(it.s)}`, cursor: it.cat ? 'pointer' : 'default' },
        },
          h('div', { style: { fontSize: 10, fontWeight: 600, color: T.mt, textTransform: 'uppercase', letterSpacing: '.04em' } }, it.lbl),
          h(Ring, { score: it.s, size: 70, sw: 6 }),
          it.cat && h(Pill, { label: it.cat, cat: it.cat })
        )
      )
    ),

    /* Tabs */
    h('div', { className: 'report-tabs' },
      ...['overview', 'seo', 'aeo', 'geo', 'technical', 'ai-fixes'].map(t =>
        h('button', {
          key: t,
          className: `report-tab-btn btn-hover ${activeTab === t ? 'active' : ''}`,
          onClick: () => onTabChange(t),
        }, t === 'ai-fixes' ? 'AI Fixes' : t.toUpperCase())
      )
    ),

    /* Tab: Overview */
    activeTab === 'overview' && h('div', { className: 'overview-grid' },
      h('div', { className: 'panel' },
        h('div', { className: 'panel-title' }, 'Issue severity breakdown'),
        ...[
          { sv: 'Critical', n: site.iss.critical, c: T.rd, desc: 'Blocks rankings or indexing' },
          { sv: 'High',     n: site.iss.high,     c: T.or, desc: 'Significant traffic impact' },
          { sv: 'Medium',   n: site.iss.medium,   c: T.am, desc: 'Optimization opportunities' },
          { sv: 'Low',      n: site.iss.low,      c: T.bl, desc: 'Minor refinements' },
        ].map((it, i) =>
          h('div', { key: i, style: { marginBottom: 12 } },
            h('div', { style: { display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 5 } },
              h('div', { style: { display: 'flex', alignItems: 'center', gap: 7 } },
                h('div', { style: { width: 7, height: 7, borderRadius: '50%', background: it.c } }),
                h('span', { style: { fontSize: 12, color: T.sub } }, `${it.sv} — ${it.desc}`)
              ),
              h('span', { style: { fontSize: 14, fontWeight: 700, color: it.c } }, it.n)
            ),
            h('div', { className: 'sev-bar-track' },
              h('div', { style: { height: '100%', width: `${(it.n / total) * 100}%`, background: it.c, borderRadius: 2, opacity: 0.75 } })
            )
          )
        )
      ),
      h('div', { className: 'panel' },
        h('div', { style: { fontWeight: 600, fontSize: 13, color: T.tx, marginBottom: 11, display: 'flex', alignItems: 'center', gap: 6 } },
          h(Icon, { d: 'M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 1 1 7.072 0l-.548.547A3.374 3.374 0 0 0 14 18.469V19a2 2 0 1 1-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z', size: 13, color: T.am }),
          'Top AI recommendations'
        ),
        ...FIXES.slice(0, 3).map(fx =>
          h('div', {
            key: fx.id,
            className: 'row-hover',
            onClick: () => onTabChange('ai-fixes'),
            style: { marginBottom: 7, padding: '9px 10px', background: T.s2, borderRadius: 7, border: `1px solid ${T.bd}`, cursor: 'pointer' },
          },
            h('div', { style: { display: 'flex', gap: 4, marginBottom: 5 } },
              h(Chip, { sev: fx.sev, noCount: true }),
              h(Pill, { label: fx.cat, cat: fx.cat })
            ),
            h('div', { style: { fontSize: 12, fontWeight: 500, color: T.tx, marginBottom: 3, lineHeight: 1.3 } }, fx.title),
            h('div', { style: { fontSize: 11, fontWeight: 600, color: T.gn } }, fx.impact)
          )
        ),
        h('button', {
          className: 'btn-hover',
          onClick: () => onTabChange('ai-fixes'),
          style: { width: '100%', padding: '7px', background: 'transparent', border: `1px solid ${T.bd}`, color: T.sub, borderRadius: 6, fontSize: 11, marginTop: 3, cursor: 'pointer' },
        }, `View all ${FIXES.length} recommendations →`)
      )
    ),

    /* Tab: SEO */
    activeTab === 'seo' && h('div', { className: 'panel' },
      h('div', { style: { fontWeight: 600, fontSize: 13, color: T.tx, marginBottom: 3 } }, 'Traditional SEO Analysis'),
      h('div', { style: { fontSize: 12, color: T.mt, marginBottom: 16 } }, 'On-page, off-page, technical, and content SEO signals.'),
      h('div', { className: 'score-detail-grid' },
        ...[
          { label: 'On-page SEO',       score: site.seo, note: '23 missing meta descriptions' },
          { label: 'Link authority',    score: 74,       note: '127 orphaned pages' },
          { label: 'Content quality',   score: 81,       note: 'Thin content on 14 pages' },
          { label: 'Keyword targeting', score: 76,       note: '4 cannibalization pairs' },
          { label: 'Crawlability',      score: 92,       note: 'Clean sitemap & robots.txt' },
          { label: 'Mobile indexing',   score: 94,       note: 'Fully mobile-first' },
        ].map((it, i) => h(ScoreDetailCard, { key: i, ...it }))
      )
    ),

    /* Tab: AEO */
    activeTab === 'aeo' && h('div', { className: 'panel' },
      h('div', { style: { fontWeight: 600, fontSize: 13, color: T.tx, marginBottom: 3 } }, 'Answer Engine Optimization'),
      h('div', { style: { fontSize: 12, color: T.mt, marginBottom: 16 } }, 'Featured snippets, structured data, AI overview eligibility, and voice search readiness.'),
      h('div', { className: 'score-detail-grid' },
        ...[
          { label: 'Schema coverage',        score: 34, note: '31 pages missing FAQ schema' },
          { label: 'Snippet eligibility',    score: 18, note: '18 eligible, 0 optimized' },
          { label: 'AI overview readiness',  score: 22, note: 'Low Q&A format coverage' },
          { label: 'Voice search fit',       score: 55, note: 'Moderate conversational content' },
          { label: 'Answer format coverage', score: 29, note: 'Need more direct answer blocks' },
          { label: 'Entity markup',          score: 48, note: 'Partial entity definitions' },
        ].map((it, i) => h(ScoreDetailCard, { key: i, ...it }))
      )
    ),

    /* Tab: GEO */
    activeTab === 'geo' && h('div', { className: 'panel' },
      h('div', { style: { fontWeight: 600, fontSize: 13, color: T.tx, marginBottom: 3 } }, 'Generative Engine Optimization'),
      h('div', { style: { fontSize: 12, color: T.mt, marginBottom: 16 } }, 'Visibility in LLM-generated answers — Perplexity, ChatGPT Search, Google AI Overviews.'),
      h('div', { className: `score-detail-grid score-detail-grid--2col` },
        ...[
          { lbl: 'Entity authority',   s: 45, n: 'Brand not in knowledge graph' },
          { lbl: 'LLM citability',     s: 38, n: 'Low citation signals from AI tools' },
          { lbl: 'Topical coverage',   s: 71, n: 'Missing: pricing, comparisons' },
          { lbl: 'Structural clarity', s: 88, n: 'Good LLM-parseable structure' },
          { lbl: 'Freshness signals',  s: 62, n: 'Some stale content clusters' },
          { lbl: 'Trust & authority',  s: 56, n: 'Limited expert authorship signals' },
        ].map((it, i) =>
          h('div', { key: i, className: 'geo-row-card' },
            h('div', null,
              h('div', { style: { fontSize: 12, fontWeight: 500, color: T.tx, marginBottom: 3 } }, it.lbl),
              h('div', { style: { fontSize: 11, color: T.sub } }, it.n)
            ),
            h('div', { style: { fontSize: 24, fontWeight: 700, letterSpacing: '-.03em', color: scoreColor(it.s), flexShrink: 0 } }, it.s)
          )
        )
      )
    ),

    /* Tab: Technical */
    activeTab === 'technical' && h('div', { className: 'panel' },
      h('div', { style: { fontWeight: 600, fontSize: 13, color: T.tx, marginBottom: 3 } }, 'Technical SEO & Core Web Vitals'),
      h('div', { style: { fontSize: 12, color: T.mt, marginBottom: 16 } }, 'Performance, page experience, crawlability, and indexing health.'),
      h('div', { className: 'score-detail-grid' },
        ...[
          { lbl: 'LCP',           val: '4.2s',  st: 'poor', n: 'Target < 2.5s — failing' },
          { lbl: 'FID / INP',     val: '62ms',  st: 'good', n: 'Within threshold' },
          { lbl: 'CLS',           val: '0.18',  st: 'warn', n: 'Target < 0.1' },
          { lbl: 'TTFB',          val: '380ms', st: 'good', n: 'Good server response' },
          { lbl: 'Pages crawled', val: '847',   st: 'info', n: '12 redirect chains found' },
          { lbl: 'Broken links',  val: '3',     st: 'warn', n: '3 internal 404 errors' },
        ].map((it, i) => {
          const c  = it.st === 'poor' ? T.rd : it.st === 'warn' ? T.am : it.st === 'good' ? T.gn : T.cy;
          const bg = it.st === 'poor' ? T.rdBg : it.st === 'warn' ? T.amBg : it.st === 'good' ? T.gnBg : T.cyBg;
          const bd = it.st === 'poor' ? T.rdBd : it.st === 'warn' ? T.amBd : it.st === 'good' ? T.gnBd : T.cyBd;
          return h('div', { key: i, className: 'cwv-card', style: { background: bg, border: `1px solid ${bd}` } },
            h('div', { style: { fontSize: 10, fontWeight: 600, color: T.sub, marginBottom: 7, letterSpacing: '.05em', textTransform: 'uppercase' } }, it.lbl),
            h('div', { style: { fontSize: 24, fontWeight: 700, letterSpacing: '-.03em', color: c, marginBottom: 3 } }, it.val),
            h('div', { style: { fontSize: 11, color: T.sub } }, it.n)
          );
        })
      )
    ),

    /* Tab: AI Fixes */
    activeTab === 'ai-fixes' && h('div', null,
      h('div', { style: { display: 'flex', alignItems: 'center', gap: 7, marginBottom: 14, fontSize: 12, color: T.mt } },
        h(Icon, { d: 'M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 1 1 7.072 0l-.548.547A3.374 3.374 0 0 0 14 18.469V19a2 2 0 1 1-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z', size: 14, color: T.am }),
        h('span', { style: { fontWeight: 500, color: T.sub } }, 'AI-generated fix plan — sorted by impact score')
      ),
      h('div', { style: { display: 'flex', flexDirection: 'column', gap: 9 } },
        ...FIXES.map(fx =>
          h('div', { key: fx.id, className: 'fix-card' },
            h('div', { style: { display: 'flex', alignItems: 'flex-start', gap: 13 } },
              h('div', { style: { flex: 1 } },
                h('div', { style: { display: 'flex', gap: 5, marginBottom: 7, flexWrap: 'wrap', alignItems: 'center' } },
                  h(Chip, { sev: fx.sev, noCount: true }),
                  h(Pill, { label: fx.cat, cat: fx.cat }),
                  h('span', { style: { fontSize: 11, color: T.mt } }, `Effort: ${fx.effort}`)
                ),
                h('div', { style: { fontSize: 13, fontWeight: 600, color: T.tx, marginBottom: 4 } }, fx.title),
                h('div', { style: { fontSize: 12, color: T.sub, lineHeight: 1.55 } }, fx.desc)
              ),
              h('div', { style: { display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: 7, flexShrink: 0 } },
                h('div', { className: 'fix-impact-badge' }, fx.impact),
                h('button', { className: 'btn-ai-fix btn-hover' }, 'AI Fix')
              )
            )
          )
        )
      )
    )
  );
}
