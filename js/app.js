/* js/app.js — Root App component and entry point */

const { createElement: h, useState, useEffect, useRef } = React;

function App() {
  const [view,      setView]      = useState('dash');
  const [activeNav, setNav]       = useState('dash');
  const [url,       setUrl]       = useState('');
  const [auditUrl,  setAuditUrl]  = useState('');
  const [step,      setStep]      = useState(-2);
  const [done,      setDone]      = useState([]);
  const [site,      setSite]      = useState(null);
  const [tab,       setTab]       = useState('overview');
  const stepsRef = useRef(null);

  /* ─── Agentic audit ticker ─── */
  useEffect(() => {
    if (view !== 'audit') return;
    if (step === -2) { setStep(-1); return; }
    if (step === -1) {
      const t = setTimeout(() => setStep(0), 400);
      return () => clearTimeout(t);
    }
    if (step >= STEPS.length) return;
    const dur = 550 + Math.random() * 500;
    const t = setTimeout(() => {
      setDone(prev => [...prev, step]);
      setStep(prev => prev + 1);
    }, dur);
    return () => clearTimeout(t);
  }, [view, step]);

  /* Auto-scroll steps list */
  useEffect(() => {
    if (stepsRef.current) stepsRef.current.scrollTop = stepsRef.current.scrollHeight;
  }, [done]);

  /* ─── Handlers ─── */
  const startAudit = (u) => {
    const target = u || url;
    if (!target.trim()) return;
    setAuditUrl(target);
    setDone([]);
    setStep(-2);
    setView('audit');
  };

  const openReport = (s) => {
    setSite(s);
    setTab('overview');
    setView('report');
  };

  const pct = step >= STEPS.length
    ? 100
    : Math.round((done.length / STEPS.length) * 100);

  /* ─── Render ─── */
  return h('div', { className: 'app-shell' },
    h(Sidebar, { activeNav, setNav, setView }),

    h('main', { className: 'main-content' },
      view === 'dash'   && h(DashboardView, {
        url, setUrl,
        onAudit:  startAudit,
        onReport: openReport,
      }),

      view === 'audit'  && h(AuditView, {
        auditUrl, step, done, pct,
        stepsRef,
        onViewReport: () => openReport(SITES[0]),
        onBack:       () => setView('dash'),
      }),

      view === 'report' && site && h(ReportView, {
        site,
        activeTab: tab,
        onTabChange: setTab,
        onBack:    () => setView('dash'),
        onReaudit: () => startAudit(`https://${site.name}`),
      })
    )
  );
}

ReactDOM.createRoot(document.getElementById('root')).render(h(App));
