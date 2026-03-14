/* js/data.js — App data */

const SITES = [
  {
    id: 1, name: 'altumcode.com', fav: 'A', audits: 22, score: 91,
    seo: 88, aeo: 72, geo: 65, tech: 95,
    iss: { critical: 2, high: 8, medium: 18, low: 10 },
    last: '2h ago',
  },
  {
    id: 2, name: 'youtube.com', fav: 'Y', audits: 2, score: 77,
    seo: 82, aeo: 45, geo: 38, tech: 88,
    iss: { critical: 1, high: 5, medium: 7, low: 3 },
    last: '3d ago',
  },
  {
    id: 3, name: '66biolinks.com', fav: '6', audits: 2, score: 83,
    seo: 79, aeo: 68, geo: 71, tech: 90,
    iss: { critical: 0, high: 3, medium: 4, low: 2 },
    last: '1d ago',
  },
  {
    id: 4, name: 'wikipedia.org', fav: 'W', audits: 2, score: 82,
    seo: 91, aeo: 85, geo: 78, tech: 73,
    iss: { critical: 1, high: 6, medium: 6, low: 3 },
    last: '5d ago',
  },
  {
    id: 5, name: 'vercel.com', fav: 'V', audits: 1, score: 94,
    seo: 92, aeo: 89, geo: 88, tech: 97,
    iss: { critical: 0, high: 2, medium: 3, low: 1 },
    last: '1w ago',
  },
];

const STEPS = [
  { id: 'c1', label: 'Discovering and crawling all pages',            cat: 'Technical', finding: '847 pages found — 12 redirect chains, 3 broken links' },
  { id: 'c2', label: 'Analyzing title tags & meta descriptions',      cat: 'SEO',       finding: '23 missing meta descriptions, 8 duplicate titles' },
  { id: 'c3', label: 'Evaluating content quality & depth signals',    cat: 'SEO',       finding: 'Thin content (<300 words) on 14 priority pages' },
  { id: 'c4', label: 'Keyword intent & semantic cluster mapping',     cat: 'SEO',       finding: 'Keyword cannibalization detected on 4 URL pairs' },
  { id: 'c5', label: 'Validating structured data (JSON-LD)',          cat: 'AEO',       finding: 'FAQ schema missing on 31 high-traffic pages' },
  { id: 'c6', label: 'Featured snippet eligibility analysis',         cat: 'AEO',       finding: '18 eligible pages — 0 currently optimized' },
  { id: 'c7', label: 'Q&A pairs for AI overview readiness',           cat: 'AEO',       finding: 'Low answer-format coverage — need 45+ Q&A sections' },
  { id: 'c8', label: 'LLM citability & entity authority test',        cat: 'GEO',       finding: 'Brand entity not verified in knowledge graph' },
  { id: 'c9', label: 'Topical authority mapping',                     cat: 'GEO',       finding: 'Missing clusters: pricing, comparisons, alternatives' },
  { id: 'ca', label: 'Core Web Vitals & page experience',             cat: 'Technical', finding: 'LCP 4.2s (poor) · CLS 0.18 (needs improvement)' },
  { id: 'cb', label: 'Internal linking & backlink audit',             cat: 'SEO',       finding: '127 orphaned pages, 3 broken internal links' },
  { id: 'cc', label: 'Generating prioritized AI fix plan',            cat: 'AI',        finding: '38 issues ranked by impact score — plan ready' },
];

const FIXES = [
  {
    id: 1, sev: 'critical', cat: 'AEO',
    title: 'Add FAQ schema to top 31 pages',
    impact: '+12 AEO', effort: 'Medium',
    desc: 'FAQ structured data enables rich results and AI overview eligibility. Affects 38% of organic traffic pages.',
  },
  {
    id: 2, sev: 'critical', cat: 'Technical',
    title: 'Fix LCP — compress & lazy-load hero images',
    impact: '+8 Tech', effort: 'Low',
    desc: 'LCP 4.2s is failing Core Web Vitals. Compress images and use next-gen formats to get below 2.5s threshold.',
  },
  {
    id: 3, sev: 'high', cat: 'GEO',
    title: 'Verify brand entity in Google Knowledge Graph',
    impact: '+15 GEO', effort: 'Low',
    desc: 'Unverified brand entity reduces appearance in generative AI answers. Add entity markup and authority signals.',
  },
  {
    id: 4, sev: 'high', cat: 'SEO',
    title: 'Resolve keyword cannibalization (4 URL pairs)',
    impact: '+6 SEO', effort: 'High',
    desc: 'Competing pages split ranking authority. Consolidate or implement canonical tags on affected pairs.',
  },
  {
    id: 5, sev: 'high', cat: 'AEO',
    title: 'Add Q&A content blocks to 45 pages',
    impact: '+18 AEO', effort: 'High',
    desc: 'Low answer-format coverage limits AI overview appearances. Add Q&A sections targeting informational queries.',
  },
  {
    id: 6, sev: 'medium', cat: 'SEO',
    title: 'Write meta descriptions for 23 pages',
    impact: '+4 SEO', effort: 'Low',
    desc: 'Missing meta descriptions reduce CTR from search results. AI-generated drafts available for all 23 pages.',
  },
  {
    id: 7, sev: 'medium', cat: 'GEO',
    title: 'Build content cluster: pricing & alternatives pages',
    impact: '+9 GEO', effort: 'High',
    desc: 'Missing topical clusters reduce LLM coverage. Create supporting pages for each identified cluster gap.',
  },
  {
    id: 8, sev: 'medium', cat: 'Technical',
    title: 'Fix CLS — pin ad and embed dimensions',
    impact: '+5 Tech', effort: 'Low',
    desc: 'CLS 0.18 causes layout shift. Set explicit width/height on embeds and dynamic content blocks.',
  },
];
