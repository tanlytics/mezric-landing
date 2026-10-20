import { useEffect, useMemo, useState } from 'react';
import type { LucideIcon } from 'lucide-react';
import {
  ArrowDownRight,
  ArrowRight,
  BarChart3,
  BellRing,
  Check,
  ChevronDown,
  ChevronRight,
  CircleAlert,
  CircleCheck,
  Clock3,
  Database,
  FileBarChart,
  Gauge,
  LineChart,
  Menu,
  MessageSquareText,
  Search,
  ShieldCheck,
  ShoppingBag,
  Sparkles,
  Store,
  X,
} from 'lucide-react';
const TALLY_FORM_ID: string = 'PRddYb';
const TALLY_SUCCESS_MESSAGE = "You're on the Mezric waitlist. We'll be in touch with a thoughtful update soon.";

function MezricMark({ size = 38 }: { size?: number }) {
  return (
    <svg aria-hidden="true" width={size} height={size} viewBox="0 0 48 48" fill="none">
      <defs>
        <linearGradient id="mezric-mark-gradient" x1="7" y1="5" x2="41" y2="44" gradientUnits="userSpaceOnUse">
          <stop stopColor="#6366F1" />
          <stop offset="1" stopColor="#4338CA" />
        </linearGradient>
      </defs>
      <rect x="1" y="1" width="46" height="46" rx="14" fill="url(#mezric-mark-gradient)" />
      <path d="M12.5 35.5H35.5" stroke="#C7D2FE" strokeWidth="2" strokeLinecap="round" opacity="0.85" />
      <path d="M13.5 31.5V23.8L20 17.2L26 23.2L35 12.5V31.5" stroke="white" strokeWidth="3.5" strokeLinecap="round" strokeLinejoin="round" />
      <circle cx="35" cy="12.5" r="2.5" fill="white" />
    </svg>
  );
}

type PreviewKind = 'overview' | 'insights' | 'campaigns' | 'reports';

const productFeatures: Array<{
  title: string;
  description: string;
  icon: LucideIcon;
  kind: PreviewKind;
}> = [
  {
    title: 'A calmer overview',
    description: 'See spend, revenue, ROAS, conversions, alerts, and campaign movement in one readable workspace.',
    icon: Gauge,
    kind: 'overview',
  },
  {
    title: 'Evidence-backed insights',
    description: 'Move from a detected pattern to the evidence, likely explanations, and the next useful check.',
    icon: Sparkles,
    kind: 'insights',
  },
  {
    title: 'Campaign-level answers',
    description: 'Follow a movement to the campaign behind it and understand its share of spend, revenue, and alerts.',
    icon: BarChart3,
    kind: 'campaigns',
  },
  {
    title: 'Reports your team can use',
    description: 'Create scheduled snapshots for recurring reviews, with clear periods, metrics, and exports.',
    icon: FileBarChart,
    kind: 'reports',
  },
];

const waitlistFields = [
  'Email',
  'Name',
  'Company or store name',
  'What best describes you?',
  'Ecommerce platform',
  'Ad platforms used',
  'Biggest pain points today (optional)',
  'Permission to contact you',
];

const faqs = [
  {
    question: 'Who is Mezric for?',
    answer: 'Mezric is for ecommerce operators, growth teams, agencies, and founders who need to understand what changed across their advertising and store performance without living in five dashboards.',
  },
  {
    question: 'Which platforms will Mezric support?',
    answer: 'The first monitoring experience is centered on Google Ads and Meta Ads, with Shopify and store-performance context joining the picture as the product expands. The roadmap is intentionally shaped by the teams on the waitlist.',
  },
  {
    question: 'Will Mezric change my campaigns automatically?',
    answer: 'Mezric starts read-only. It helps your team investigate movement and decide what to do next. Any future action workflows will be reviewable and approval-gated.',
  },
  {
    question: 'What does "evidence-backed" mean?',
    answer: 'Every insight should show the comparison window, affected entity, changed metric, data coverage, and supporting signals. When important context is missing, Mezric should say so instead of guessing.',
  },
  {
    question: 'How will I hear about the beta?',
    answer: 'Join the pilot waitlist with the platforms and problems that matter to you. We will use that context to shape access and send a clear update when your cohort is ready.',
  },
];

function Metric({ label, value, change, tone = 'positive' }: { label: string; value: string; change: string; tone?: 'positive' | 'warning' }) {
  return (
    <div className="metric-tile">
      <div className="metric-label">{label}</div>
      <div className="metric-value">{value}</div>
      <div className={`metric-change ${tone === 'warning' ? 'metric-change-warning' : ''}`}>{change}</div>
    </div>
  );
}

function ProductPreview({ kind }: { kind: PreviewKind }) {
  if (kind === 'insights') {
    return (
      <div className="preview-stack">
        <div className="preview-heading-row">
          <div><div className="eyebrow">Primary intelligence</div><div className="preview-title">Insights & actions</div></div>
          <span className="muted-small">4 detected</span>
        </div>
        <div className="signal signal-warning">
          <div className="signal-topline"><span className="signal-label">Waste signal</span><span className="status-chip status-warning">Review soon</span></div>
          <div className="signal-title">Spend increased without conversion gain</div>
          <div className="signal-copy">A lower-level entity used spend with few recorded conversions.</div>
          <div className="signal-tags"><span>spend +13.9%</span><span>conversions flat</span></div>
        </div>
        <div className="list-panel">
          {['CTR deterioration', 'Creative performance decline'].map((item) => <div className="list-row" key={item}><span>{item}</span><span className="list-action">Review <ArrowRight size={12} /></span></div>)}
        </div>
      </div>
    );
  }

  if (kind === 'campaigns') {
    return (
      <div className="preview-stack">
        <div className="preview-heading-row">
          <div><div className="eyebrow">Campaign explorer</div><div className="preview-title">Campaign contribution</div></div>
          <Search size={15} className="muted-icon" />
        </div>
        <div className="search-field">Search campaigns</div>
        <div className="list-panel">
          {[
            ['Demo | Spend spike', '$4,820', '42%', 'purple'],
            ['Demo | ROAS drop', '$3,240', '28%', 'orange'],
            ['Demo | Healthy baseline', '$2,160', '19%', 'green'],
          ].map(([name, spend, share, tone]) => <div className="campaign-row" key={name}><span className={`campaign-dot campaign-dot-${tone}`} /><span className="campaign-name">{name}</span><span className="campaign-metric"><b>{spend}</b><small>{share} of spend</small></span><ChevronRight size={14} className="muted-icon" /></div>)}
        </div>
      </div>
    );
  }

  if (kind === 'reports') {
    return (
      <div className="preview-stack">
        <div className="preview-heading-row">
          <div><div className="eyebrow">Report history</div><div className="preview-title">Weekly insight digest</div></div>
          <span className="status-chip status-good">Scheduled</span>
        </div>
        <div className="report-panel"><div className="report-topline"><div><b>Every Monday - 09:00 UTC</b><span>Spend, ROAS, CPA, conversions, and anomalies</span></div><span className="pulse-dot" /></div><div className="report-footer"><span>Last generated today</span><b>Open report <ArrowRight size={12} /></b></div></div>
        <div className="report-metrics"><span><small>Spend</small><b>$11.5k</b></span><span><small>ROAS</small><b>5.39x</b></span><span><small>Alerts</small><b>11</b></span></div>
      </div>
    );
  }

  return (
    <div className="preview-stack">
      <div className="preview-heading-row"><div><div className="eyebrow">Workspace overview</div><div className="preview-title">Performance at a glance</div></div><span className="status-chip status-good"><span className="pulse-dot" />Data current</span></div>
      <div className="metric-grid"><Metric label="Spend" value="$11,505" change="+8.0% vs prior" /><Metric label="Revenue" value="$61,965" change="+2.1% vs prior" /><Metric label="ROAS" value="5.39x" change="-7.6% vs prior" tone="warning" /></div>
      <div className="signal signal-danger"><div className="signal-topline"><span className="signal-label"><BellRing size={12} /> Active alert</span><span className="status-chip status-danger">Critical</span></div><div className="signal-title">Spend moved outside its normal range</div><div className="signal-copy">Demo | Spend spike - $280 vs $100 baseline</div></div>
      <div className="bar-chart" aria-label="Illustrative spend trend"><span style={{ height: '31%' }} /><span style={{ height: '38%' }} /><span style={{ height: '35%' }} /><span style={{ height: '46%' }} /><span style={{ height: '42%' }} /><span style={{ height: '56%' }} /><span style={{ height: '48%' }} /><span style={{ height: '62%' }} /><span style={{ height: '56%' }} /><span style={{ height: '72%' }} /><span style={{ height: '76%' }} /><span className="bar-emphasis" style={{ height: '94%' }} /></div>
    </div>
  );
}

function LogoLockup({ light = false }: { light?: boolean }) {
  return <a className={`logo-lockup ${light ? 'logo-lockup-light' : ''}`} href="#top" aria-label="Mezric home"><MezricMark size={38} /><span><strong>Mezric</strong><small>Growth intelligence</small></span></a>;
}

function App() {
  const [mobileNavOpen, setMobileNavOpen] = useState(false);
  const [activeProduct, setActiveProduct] = useState<PreviewKind>('overview');
  const [submitted, setSubmitted] = useState(false);

  const tallyUrl = useMemo(() => {
    if (TALLY_FORM_ID === 'YOUR_TALLY_FORM_ID' || typeof window === 'undefined') return '';
    const pageParams = new URLSearchParams(window.location.search);
    const embedParams = new URLSearchParams({ alignLeft: '1', hideTitle: '1', transparentBackground: '1', dynamicHeight: '1' });
    ['utm_source', 'utm_medium', 'utm_campaign', 'utm_term', 'utm_content', 'source'].forEach((key) => {
      const value = pageParams.get(key);
      if (value) embedParams.set(key, value);
    });
    return `https://tally.so/embed/${TALLY_FORM_ID}?${embedParams.toString()}`;
  }, []);

  useEffect(() => {
    const onTallyEvent = () => setSubmitted(true);
    const onMessage = (event: MessageEvent) => {
      if (event.origin !== 'https://tally.so') return;
      const data = event.data as { event?: string; type?: string } | undefined;
      if (data?.event === 'Tally.FormSubmitted' || data?.type === 'tally:formSubmitted') onTallyEvent();
    };
    window.addEventListener('Tally.FormSubmitted', onTallyEvent);
    window.addEventListener('message', onMessage);
    return () => {
      window.removeEventListener('Tally.FormSubmitted', onTallyEvent);
      window.removeEventListener('message', onMessage);
    };
  }, []);

  const scrollTo = (id: string) => {
    setMobileNavOpen(false);
    document.querySelector(id)?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div id="top" className="site-shell">
      <header className="site-header">
        <div className="container header-inner">
          <LogoLockup />
          <nav className="desktop-nav" aria-label="Main navigation">
            <a href="#product">Product</a><a href="#use-cases">Use cases</a><a href="#how-it-works">How it works</a><a href="#roadmap">Roadmap</a>
          </nav>
          <div className="header-actions"><a className="button button-quiet" href="#faq">FAQ</a><a className="button button-primary" href="#waitlist">Join the pilot waitlist <ArrowRight size={15} /></a></div>
          <button className="icon-button mobile-menu-button" type="button" onClick={() => setMobileNavOpen((open) => !open)} aria-label={mobileNavOpen ? 'Close navigation' : 'Open navigation'} aria-expanded={mobileNavOpen}>{mobileNavOpen ? <X size={20} /> : <Menu size={20} />}</button>
        </div>
        {mobileNavOpen && <nav className="mobile-nav" aria-label="Mobile navigation"><a href="#product" onClick={() => setMobileNavOpen(false)}>Product</a><a href="#use-cases" onClick={() => setMobileNavOpen(false)}>Use cases</a><a href="#how-it-works" onClick={() => setMobileNavOpen(false)}>How it works</a><a href="#roadmap" onClick={() => setMobileNavOpen(false)}>Roadmap</a><a className="button button-primary" href="#waitlist" onClick={() => setMobileNavOpen(false)}>Join the pilot waitlist <ArrowRight size={15} /></a></nav>}
      </header>

      <main>
        <section className="hero-section">
          <div className="container hero-grid">
            <div className="hero-copy">
              <div className="eyebrow-pill"><span className="eyebrow-dot" />Growth intelligence for ecommerce teams</div>
              <h1>Make every growth decision with context.</h1>
              <p className="hero-lede">Mezric connects advertising, store performance, data health, and evidence-backed investigation in one calm workspace, helping teams decide what deserves attention next.</p>
              <div className="hero-actions"><a className="button button-primary button-large" href="#waitlist">Join the pilot waitlist <ArrowRight size={17} /></a><a className="button button-secondary button-large" href="#product">Explore Mezric <ChevronRight size={17} /></a></div>
              <div className="hero-proof"><span><CircleCheck size={17} />Plain-language guidance</span><span><ShieldCheck size={17} />Read-only by default</span><span><LineChart size={17} />Campaign drilldown</span></div>
            </div>
<div className="hero-product-wrap"><div className="hero-product-card"><div className="product-window-bar"><div className="window-dots"><span /><span /><span /></div><span className="window-title">mezric / workspace overview</span><span className="demo-chip">Demo workspace</span></div><div className="hero-product-body"><aside className="product-sidebar" aria-label="Workspace preview navigation"><div className="sidebar-brand"><MezricMark size={22} /></div><span className="sidebar-item sidebar-item-active"><Gauge size={13} />Overview</span><span className="sidebar-item"><Sparkles size={13} />Insights</span><span className="sidebar-item"><BarChart3 size={13} />Campaigns</span><span className="sidebar-item"><Database size={13} />Data health</span><span className="sidebar-item"><FileBarChart size={13} />Reports</span></aside><div className="product-canvas"><div className="product-canvas-head"><div><span className="canvas-kicker">Workspace overview</span><h2>Performance at a glance</h2></div><span className="date-chip">Last 30 days</span></div><div className="metric-grid"><Metric label="Spend" value="$11,505" change="+8.0% vs prior" /><Metric label="Revenue" value="$61,965" change="+2.1% vs prior" /><Metric label="ROAS" value="5.39x" change="-7.6% vs prior" tone="warning" /></div><div className="dashboard-grid"><div className="dashboard-chart"><div className="chart-head"><span>Blended performance</span><span className="chart-legend"><i className="legend-purple" />Current <i className="legend-gray" />Prior</span></div><div className="large-chart" aria-label="Illustrative blended performance chart"><div className="chart-grid-lines"><i /><i /><i /><i /></div><svg viewBox="0 0 600 170" preserveAspectRatio="none" role="img" aria-label="Performance trend rising over the last 30 days"><path d="M0 133 C70 126 80 99 140 108 S210 132 267 92 S344 103 392 77 S456 85 507 50 S560 56 600 27 L600 170 L0 170 Z" fill="#eef2ff" /><path d="M0 133 C70 126 80 99 140 108 S210 132 267 92 S344 103 392 77 S456 85 507 50 S560 56 600 27" fill="none" stroke="#6366f1" strokeWidth="3" strokeLinecap="round" /></svg></div></div><div className="dashboard-alert"><div className="alert-label"><CircleAlert size={12} />Active alert<span>Critical</span></div><strong>Spend moved outside its normal range</strong><small>Demo | Spend spike - $280 vs $100 baseline</small><a href="#waitlist">Review signal <ArrowRight size={12} /></a></div></div></div></div><div className="hero-product-caption"><span><span className="pulse-dot" />Data current</span><span>Illustrative workspace preview</span></div></div></div>
          </div>
        </section>

  <section className="pilot-band"><div className="container pilot-band-inner"><div><span className="eyebrow">Founding pilot</span><h2>Free access for a limited founding pilot.</h2><p>We are inviting a focused mix of independent operators, ecommerce teams, and agencies managing multiple stores. Selected participants help shape the product through practical onboarding and feedback.</p></div><a className="button button-primary" href="#waitlist">Join the pilot waitlist <ArrowRight size={16} /></a></div></section>

        <section id="product" className="section section-product"><div className="container"><div className="section-intro"><span className="eyebrow">The Mezric workspace</span><h2>The important parts of growth operations, connected.</h2><p>Start with the overview. Go deeper only when the evidence says you should. Each surface is designed to answer a different question.</p></div><div className="product-showcase"><div className="feature-list">{productFeatures.map((feature) => { const Icon = feature.icon; const active = activeProduct === feature.kind; return <button className={`feature-row ${active ? 'feature-row-active' : ''}`} key={feature.title} onClick={() => setActiveProduct(feature.kind)} type="button" aria-pressed={active}><span className="feature-icon"><Icon size={19} /></span><span className="feature-copy"><strong>{feature.title}</strong><span>{feature.description}</span></span><ChevronRight size={16} className="feature-arrow" /></button>; })}</div><div className="showcase-preview"><div className="showcase-topline"><span>Product preview</span><span className="preview-tab"><span className="pulse-dot" />Demo data</span></div><ProductPreview kind={activeProduct} /><div className="showcase-footer"><span>Illustrative workspace preview</span><span>Explore with the waitlist <ArrowRight size={12} /></span></div></div></div></div></section>

        <section id="use-cases" className="section section-band"><div className="container"><div className="section-intro section-intro-wide"><span className="eyebrow">One view of the growth system</span><h2>From ad delivery to store performance.</h2><p>Mezric keeps the important context close: the campaign, the data health, and the ecommerce outcome your team is trying to protect.</p></div><div className="use-case-grid"><article className="feature-card"><div className="feature-card-icon feature-card-icon-purple"><Gauge size={21} /></div><span className="eyebrow">01 - Monitor</span><h3>Google Ads and Meta Ads, side by side.</h3><p>Watch spend, clicks, conversions, CPA, ROAS, and delivery signals across the platforms that move your business.</p><div className="platform-row"><span className="platform-badge"><span className="google-mark">G</span>Google Ads</span><span className="platform-badge"><span className="meta-mark" aria-hidden="true">∞</span>Meta Ads</span></div></article><article className="feature-card"><div className="feature-card-icon feature-card-icon-orange"><ShoppingBag size={21} /></div><span className="eyebrow">02 - Connect</span><h3>Read ad performance in store context.</h3><p>Keep Shopify, orders, revenue, refunds, and product signals in the conversation when a campaign movement needs an explanation.</p><div className="context-mini"><span><Store size={15} /> Shopify store</span><span><CircleCheck size={15} /> Orders synced</span><span><ArrowDownRight size={15} /> Refunds in view</span></div></article><article className="feature-card"><div className="feature-card-icon feature-card-icon-green"><ShieldCheck size={21} /></div><span className="eyebrow">03 - Decide</span><h3>Know when the data is ready for a decision.</h3><p>See freshness, coverage, and source health before you overreact to a partial day or an incomplete comparison window.</p><div className="health-mini"><span><i className="health-dot health-good" />Google Ads</span><b>Synced 8 min ago</b><span><i className="health-dot health-warn" />Shopify</span><b>Sync delayed</b></div></article></div></div></section>

        <section id="how-it-works" className="section section-band"><div className="container split-section workflow-section"><div className="split-copy"><span className="eyebrow">How Mezric works</span><h2>A short path from connection to action.</h2><p>Mezric keeps the monitoring loop focused: connect your data, see the movement, then investigate only what deserves attention.</p><a className="button button-primary" href="#waitlist">Join the pilot waitlist <ArrowRight size={15} /></a></div><div className="workflow-list"><div className="workflow-step"><span>01</span><div><h3>Connect the sources that matter.</h3><p>Bring Google Ads, Meta Ads, Shopify, and the context your team already uses into one workspace.</p></div></div><div className="workflow-step"><span>02</span><div><h3>Let Mezric compare movement.</h3><p>Current performance is compared with stored baselines, source freshness, and coverage.</p></div></div><div className="workflow-step"><span>03</span><div><h3>Review and act with confidence.</h3><p>Open the affected campaign, inspect the evidence, and decide what to change next.</p></div></div></div></div></section>

        <section id="waitlist" className="section section-waitlist"><div className="container waitlist-layout"><div className="waitlist-copy"><span className="eyebrow">Free founding pilot</span><h2>Help shape the product you wish your dashboards had.</h2><p>Tell us where you spend, what you sell, and what is hardest to understand today. The pilot is free for selected participants, with no payment details required.</p><div className="waitlist-points"><span><CircleCheck size={16} />Free pilot access for selected participants</span><span><CircleCheck size={16} />Useful product updates</span><span><CircleCheck size={16} />No noisy sales sequence</span></div><div id="privacy" className="privacy-note" role="note" tabIndex={-1}><ShieldCheck size={16} /><span><strong>Privacy and consent.</strong> We will only use your details to contact you about Mezric access and relevant product updates. You can opt out at any time. Read the consent statement in the form before submitting.</span></div></div><div className="waitlist-form-wrap"><div className="form-heading"><div><span className="eyebrow">Mezric waitlist</span><h3>Get the first look.</h3></div><span className="form-secure"><ShieldCheck size={14} />Private by default</span></div>{submitted ? <div className="success-message" role="status"><div className="success-icon"><Check size={23} /></div><h3>Thanks for joining Mezric.</h3><p>{TALLY_SUCCESS_MESSAGE}</p><a className="text-link" href="#top">Back to the top <ArrowRight size={15} /></a></div> : TALLY_FORM_ID === 'YOUR_TALLY_FORM_ID' ? <div className="tally-placeholder" data-tally-form-id={TALLY_FORM_ID}><div className="tally-placeholder-icon"><MessageSquareText size={22} /></div><h3>The waitlist form is ready to connect.</h3><p>Replace <code>YOUR_TALLY_FORM_ID</code> in <code>src/App.tsx</code> with the ID from your published Tally form. The live embed will appear here automatically.</p><div className="placeholder-url">https://tally.so/embed/YOUR_TALLY_FORM_ID</div><div className="placeholder-fields"><span>Configured fields</span><div>{waitlistFields.slice(0, 6).map((field) => <span key={field}>{field}</span>)}</div><small>See README for the complete field setup and Google Sheets connection steps.</small></div></div> : <iframe title="Join the Mezric waitlist" className="tally-iframe" src={tallyUrl} data-tally-success-message={TALLY_SUCCESS_MESSAGE} />}</div></div></section>
        <section className="section section-evidence"><div className="container split-section"><div className="split-copy"><span className="eyebrow">Clarity under pressure</span><h2>Every signal earns its place with evidence.</h2><p>When performance moves, Mezric gives the team a trail to follow: what changed, where it changed, how complete the data is, and which next check will reduce uncertainty.</p><div className="check-list"><span><Check size={16} />Comparison windows that stay visible</span><span><Check size={16} />Platform-reported and observed metrics kept distinct</span><span><Check size={16} />Missing context called out instead of guessed</span></div><a className="text-link" href="#waitlist">Get the product notes <ArrowRight size={15} /></a></div><div className="evidence-panel"><div className="evidence-topline"><span className="eyebrow">Evidence inbox</span><span className="status-chip status-warning">Needs review</span></div><div className="evidence-title">Conversions fell while clicks stayed stable</div><div className="evidence-copy">Traffic is present, but recorded conversion volume weakened against the previous period.</div><div className="evidence-metrics"><span><small>Clicks</small><b>+1.4%</b></span><span><small>Conversions</small><b className="text-danger">-18.7%</b></span><span><small>Coverage</small><b>92%</b></span></div><div className="evidence-divider" /><div className="evidence-next"><span className="next-icon"><Search size={15} /></span><div><small>Recommended next check</small><strong>Verify conversion tracking freshness, then inspect the landing-page and checkout funnel.</strong></div></div><div className="evidence-footer"><span><CircleAlert size={14} />Insufficient evidence for a landing-page diagnosis</span><a href="#waitlist">Open investigation <ChevronRight size={14} /></a></div></div></div></section>

        <section className="section section-band section-investigation"><div className="container split-section split-section-reverse"><div className="investigation-panel"><div className="investigation-header"><div><span className="eyebrow">Campaign investigation</span><h3>Demo | Spend spike</h3></div><span className="status-chip status-danger">Critical</span></div><div className="investigation-summary"><span><small>Spend</small><b>$4,820</b><em>+42%</em></span><span><small>Conversions</small><b>84</b><em className="neutral">-3%</em></span><span><small>ROAS</small><b>3.2x</b><em className="negative">-18%</em></span></div><div className="investigation-table"><div><span>Account</span><b>Demo Store - Google Ads</b></div><div><span>Movement</span><b>Spend rose above the learned baseline</b></div><div><span>Review next</span><b>Budget pacing, search terms, and conversion coverage</b></div></div><div className="investigation-footer"><span><Clock3 size={14} />Observed 14 min ago</span><span><ShieldCheck size={14} />Read-only review</span></div></div><div className="split-copy"><span className="eyebrow">Go from account to campaign</span><h2>Find the part of the account that deserves attention.</h2><p>Campaign-level investigation turns a vague "ROAS is down" conversation into a focused review of the entities and signals that actually moved.</p><div className="check-list"><span><Check size={16} />Search across campaigns and accounts</span><span><Check size={16} />See contribution to spend and revenue</span><span><Check size={16} />Carry findings into recurring reports</span></div></div></div></section>


        <section className="section section-reports"><div className="container report-layout"><div className="section-intro"><span className="eyebrow">Scheduled reports</span><h2>Make the weekly review easier to repeat.</h2><p>Turn the signals your team already reviewed into a useful recurring digest for operators, founders, and clients.</p><a className="button button-secondary" href="#waitlist">See the roadmap <ArrowRight size={15} /></a></div><div className="report-preview"><div className="report-preview-head"><div className="report-icon"><FileBarChart size={19} /></div><div><span className="eyebrow">Monday, 09:00 UTC</span><h3>Weekly insight digest</h3></div><span className="status-chip status-good">Scheduled</span></div><div className="report-line"><span><i className="report-line-dot report-line-purple" />Performance overview</span><b>Included</b></div><div className="report-line"><span><i className="report-line-dot report-line-orange" />Evidence inbox</span><b>4 findings</b></div><div className="report-line"><span><i className="report-line-dot report-line-green" />Data health</span><b>92% coverage</b></div><div className="report-preview-foot"><span>Last generated today</span><span className="text-link-small">Open report <ArrowRight size={13} /></span></div></div></div></section>

        <section id="roadmap" className="section section-roadmap"><div className="container"><div className="section-heading-row"><div className="section-intro"><span className="eyebrow">Product roadmap</span><h2>Built around decisions that protect growth.</h2></div><span className="roadmap-note"><Sparkles size={16} />Shaped with early teams</span></div><div className="roadmap-grid"><article className="roadmap-card roadmap-card-live"><div className="roadmap-status"><span className="status-chip status-good">Live direction</span><span className="roadmap-index">01</span></div><h3>Ad performance monitoring</h3><p>Bring meaningful movement, alerts, and source health into one focused review loop.</p><div className="roadmap-progress"><span style={{ width: '78%' }} /></div><small>Monitoring foundation</small></article><article className="roadmap-card"><div className="roadmap-status"><span className="status-chip status-warning">In progress</span><span className="roadmap-index">02</span></div><h3>Ecommerce context</h3><p>Connect store performance, order signals, and product context to the ad decision.</p><div className="roadmap-progress"><span style={{ width: '46%' }} /></div><small>Store-aware investigation</small></article><article className="roadmap-card"><div className="roadmap-status"><span className="status-chip status-neutral">Exploring</span><span className="roadmap-index">03</span></div><h3>A broader growth decision layer</h3><p>Bring more commercial context and team workflows into each decision without losing the evidence.</p><div className="roadmap-progress"><span style={{ width: '22%' }} /></div><small>Long-term direction</small></article></div></div></section>

        <section id="faq" className="section section-faq section-band"><div className="container faq-layout"><div className="section-intro"><span className="eyebrow">Questions, answered</span><h2>A little more context before you join.</h2><p>Mezric is being built for teams who prefer clear evidence and useful next steps over another noisy dashboard.</p></div><div className="faq-list">{faqs.map((faq) => <details key={faq.question}><summary>{faq.question}<ChevronDown size={17} /></summary><p>{faq.answer}</p></details>)}</div></div></section>

      </main>

      <footer className="site-footer"><div className="container footer-inner"><LogoLockup light /><div className="footer-copy"><span>Growth intelligence with ecommerce context.</span><span>Copyright {new Date().getFullYear()} Mezric</span></div><nav className="footer-links" aria-label="Footer navigation"><a href="#privacy">Privacy</a><a href="#waitlist">Contact</a><a href="#faq">FAQ</a></nav></div></footer>
    </div>
  );
}

export default App;
