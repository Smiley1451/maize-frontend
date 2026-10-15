import { useMemo, useState, type FormEvent } from 'react'
import { Link, NavLink, Route, Routes, useNavigate, useParams } from 'react-router-dom'
import { useQuery } from '@tanstack/react-query'
import { Activity, BarChart3, Bell, BookOpen, Bot, ChevronDown, ChevronRight, CircleHelp, Command, Database, Dna, Download, FlaskConical, Gauge, Info, Leaf, Menu, Search, ShieldCheck, Sparkles, Sprout, TableProperties, Wrench, X, Zap } from 'lucide-react'
import { CartesianGrid, Cell, Bar, BarChart, ResponsiveContainer, Scatter, ScatterChart, Tooltip, XAxis, YAxis, ZAxis } from 'recharts'
import { api, pretty, qs, rowsOf, type Row, type SourceDetail } from './api'
import { MarkdownView, SourceDetailsView } from './MarkdownView'
import { PredictionFieldGuide, RESEARCH_BENCHMARKS, FIELD_EXPLANATIONS, type BenchmarkGenotype } from './PredictionGuide'
import {
  DomainDistributionView,
  ClustersEnhancedView,
  ExplainabilityEnhancedView,
  WeatherEnhancedSuite,
  KarnatakaHistoricalProductionChart,
  BreedingMultiTraitView,
} from './ChartInsights'


type IconType = typeof Leaf
const navGroups: { title: string; items: { label: string; to: string; icon: IconType }[] }[] = [
  { title: 'WORKSPACE', items: [{ label: 'Overview', to: '/', icon: Gauge }] },
  { title: 'RESEARCH DATA', items: [{ label: 'Genotypes', to: '/genotypes', icon: Dna }, { label: 'Experiments', to: '/experiments', icon: FlaskConical }, { label: 'Observations', to: '/observations', icon: TableProperties }, { label: 'Data summary', to: '/data-summary', icon: Database }] },
  { title: 'ANALYSIS', items: [{ label: 'Yield', to: '/yield', icon: Sprout }, { label: 'TLB disease', to: '/tlb', icon: Activity }, { label: 'SDM disease', to: '/sdm', icon: Leaf }, { label: 'PCA & clusters', to: '/analytics/clusters', icon: BarChart3 }, { label: 'Weather readiness', to: '/analytics/weather', icon: Activity }, { label: 'Breeding intelligence', to: '/breeding-intelligence', icon: Dna }] },
  { title: 'MACHINE LEARNING', items: [{ label: 'Models & metrics', to: '/models', icon: BarChart3 }, { label: 'Prediction center', to: '/predictions', icon: Command }, { label: 'Explainability', to: '/explainability', icon: CircleHelp }] },
  { title: 'PROJECT', items: [{ label: 'AI assistant', to: '/assistant', icon: Bot }, { label: 'System status', to: '/system', icon: ShieldCheck }] },
]

function App() {
  const [mobileOpen, setMobileOpen] = useState(false)
  const [globalSearch, setGlobalSearch] = useState('')
  const [searchOpen, setSearchOpen] = useState(false)
  const navigate = useNavigate()
  const onSearch = (event: FormEvent) => { event.preventDefault(); if (globalSearch.trim()) { navigate(`/genotypes?q=${encodeURIComponent(globalSearch.trim())}`); setSearchOpen(false) } }
  return <div className="app-shell">
    {mobileOpen && <button className="mobile-scrim" onClick={() => setMobileOpen(false)} aria-label="Close navigation" />}
    <aside className={`sidebar ${mobileOpen ? 'sidebar-open' : ''}`}>
      <Link to="/" className="brand" onClick={() => setMobileOpen(false)}><span className="brand-mark"><Sprout size={21} /></span><span><b>maize<span className="brand-dot">.</span></b><small>RESEARCH STUDIO</small></span></Link>
      <div className="project-switch"><span className="project-avatar">M</span><span><small>ACTIVE PROJECT</small><b>Maize AI/ML</b></span><ChevronDown size={15} /></div>
      <nav>{navGroups.map(group => <div className="nav-group" key={group.title}><p className="nav-heading">{group.title}</p>{group.items.map(({ label, to, icon: Icon }) => <NavLink key={to} to={to} end={to === '/'} onClick={() => setMobileOpen(false)} className={({ isActive }) => `nav-link ${isActive ? 'nav-active' : ''}`}><Icon size={17} strokeWidth={1.8} /><span>{label}</span>{label === 'AI assistant' && <span className="nav-new">AI</span>}</NavLink>)}</div>)}</nav>
      <div className="sidebar-bottom"><div className="online-indicator"><i /> API connection <span>Check status</span></div><div className="profile"><span className="profile-avatar">R</span><span><b>Research workspace</b><small>Local environment</small></span><ChevronDown size={15} /></div></div>
    </aside>
    <main className="main-area">
      <header className="topbar"><button className="icon-button menu-button" onClick={() => setMobileOpen(true)} aria-label="Open navigation"><Menu size={20} /></button><div className="breadcrumbs"><span>Workspace</span><ChevronRight size={14} /><b>Maize research</b></div><div className="top-actions"><form className={`global-search ${searchOpen ? 'search-focused' : ''}`} onSubmit={onSearch}><Search size={16} /><input value={globalSearch} onFocus={() => setSearchOpen(true)} onBlur={() => window.setTimeout(() => setSearchOpen(false), 150)} onChange={e => setGlobalSearch(e.target.value)} placeholder="Search genotypes…" /><kbd>⌘ K</kbd></form><button className="icon-button notification-button" aria-label="Notifications"><Bell size={18} /><i /></button><span className="top-avatar">R</span></div></header>
      <div className="page-frame"><Routes>
        <Route path="/" element={<Dashboard />} /><Route path="/genotypes" element={<Genotypes />} /><Route path="/genotypes/:id" element={<GenotypeDetail />} /><Route path="/experiments" element={<Experiments />} /><Route path="/experiments/:id" element={<ExperimentDetail />} /><Route path="/observations" element={<Observations />} />
        <Route path="/yield" element={<DomainPage domain="yield" />} /><Route path="/tlb" element={<DomainPage domain="tlb" />} /><Route path="/sdm" element={<DomainPage domain="sdm" />} />
        <Route path="/data-summary" element={<DataSummary />} /><Route path="/analytics/clusters" element={<Clusters />} /><Route path="/analytics/weather" element={<Weather />} /><Route path="/breeding-intelligence" element={<Breeding />} />
        <Route path="/models" element={<Models />} /><Route path="/models/:id" element={<ModelDetail />} /><Route path="/predictions" element={<Predictions />} /><Route path="/explainability" element={<Explainability />} /><Route path="/assistant" element={<Assistant />} /><Route path="/system" element={<SystemPage />} /><Route path="*" element={<NotFound />} />
      </Routes></div>
    </main>
  </div>
}

function PageHeader({ eyebrow, title, description, action }: { eyebrow: string; title: string; description: string; action?: React.ReactNode }) { return <div className="page-header"><div><p className="eyebrow">{eyebrow}</p><h1>{title}</h1><p className="page-description">{description}</p></div>{action && <div className="page-action">{action}</div>}</div> }
function ErrorPanel({ error, retry }: { error: unknown; retry?: () => void }) { return <div className="error-panel"><span className="error-icon">!</span><div><b>Couldn’t load this data</b><p>{error instanceof Error ? error.message : 'The service returned an unexpected response.'}</p>{retry && <button className="text-button" onClick={retry}>Try again</button>}</div></div> }
function LoadingBlock({ label = 'Loading project data…' }: { label?: string }) { return <div className="loading-block"><span className="spinner" />{label}</div> }
function useApi<T = any>(key: string, path: string, enabled = true) { return useQuery<T>({ queryKey: [key, path], queryFn: () => api.get<T>(path), enabled }) }
function MetricCard({ label, value, hint, icon: Icon = Database, tone = 'green' }: { label: string; value: React.ReactNode; hint?: string; icon?: IconType; tone?: string }) { return <div className="metric-card"><span className={`metric-icon tone-${tone}`}><Icon size={18} /></span><div className="metric-label">{label}</div><div className="metric-value">{value}</div>{hint && <div className="metric-hint">{hint}</div>}</div> }

function DataTable({ rows, empty = 'No records found.', onSelect }: { rows: Row[]; empty?: string; onSelect?: (row: Row) => void }) {
  const columns = useMemo(() => { const set = new Set<string>(); rows.slice(0, 25).forEach(row => Object.keys(row).forEach(k => set.add(k))); return [...set].slice(0, 9) }, [rows])
  if (!rows.length) return <div className="empty-state"><span className="empty-icon"><Database size={20} /></span><b>No records to display</b><p>{empty}</p></div>
  return <div className="table-scroll"><table><thead><tr>{columns.map(c => <th key={c}>{c.replaceAll('_', ' ')}</th>)}{onSelect && <th />}</tr></thead><tbody>{rows.map((row, i) => <tr key={i} onClick={() => onSelect?.(row)} className={onSelect ? 'row-clickable' : ''}>{columns.map(c => <td key={c}><span className={typeof row[c] === 'boolean' ? (row[c] ? 'status-pill status-good' : 'status-pill status-muted') : ''}>{pretty(row[c])}</span></td>)}{onSelect && <td><ChevronRight size={15} /></td>}</tr>)}</tbody></table></div>
}
function DataPanel({ title, description, rows, loading, error, retry, onSelect, empty }: { title: string; description?: string; rows: Row[]; loading?: boolean; error?: unknown; retry?: () => void; onSelect?: (row: Row) => void; empty?: string }) { return <section className="panel"><div className="panel-heading"><div><h2>{title}</h2>{description && <p>{description}</p>}</div>{rows.length > 0 && <button className="button button-subtle button-small" onClick={() => exportCsv(rows, title)}><Download size={14} /> Export</button>}</div>{loading ? <LoadingBlock /> : error ? <ErrorPanel error={error} retry={retry} /> : <DataTable rows={rows} onSelect={onSelect} empty={empty} />}</section> }
function exportCsv(rows: Row[], filename = 'maize-data') { const columns = [...new Set(rows.flatMap(row => Object.keys(row)))]; const csv = [columns.join(','), ...rows.map(row => columns.map(c => `"${String(row[c] ?? '').replaceAll('"', '""')}"`).join(','))].join('\n'); const url = URL.createObjectURL(new Blob([csv], { type: 'text/csv;charset=utf-8' })); const a = document.createElement('a'); a.href = url; a.download = `${filename.toLowerCase().replace(/[^a-z0-9]+/g, '-')}.csv`; a.click(); URL.revokeObjectURL(url) }

function Dashboard() {
  const status = useApi('status', '/api/v1/status'), catalog = useApi('catalog', '/api/v1/catalog'), models = useApi('models', '/api/v1/models'), assistant = useQuery({ queryKey: ['assistant-status'], queryFn: () => api.assistantGet('/api/v1/assistant/status') })
  const genotypes = useApi('dashboard-genotypes', '/api/v1/genotypes?limit=1'), experiments = useApi('dashboard-experiments', '/api/v1/experiments?limit=1')
  const datasets = catalog.data?.datasets || [], totalRows = datasets.reduce((sum: number, d: any) => sum + (d.rows || 0), 0)
  const cards = [{ label: 'Genotypes', value: genotypes.data?.total, hint: 'Unique names across catalog domains', icon: Dna, tone: 'green' }, { label: 'Experiments', value: experiments.data?.total, hint: 'Unique experiment references', icon: FlaskConical, tone: 'blue' }, { label: 'Yield records', value: datasets.find((d: any) => d.domain === 'yield')?.rows, hint: 'Production observations', icon: Sprout, tone: 'amber' }, { label: 'TLB records', value: datasets.find((d: any) => d.domain === 'tlb')?.rows, hint: 'Disease observations', icon: Activity, tone: 'violet' }, { label: 'SDM records', value: datasets.find((d: any) => d.domain === 'sdm')?.rows, hint: 'Disease observations', icon: Leaf, tone: 'blue' }, { label: 'Available models', value: models.data?.models?.filter((m: any) => m.available).length, hint: 'Across prediction domains', icon: BarChart3, tone: 'green' }]
  const readiness = [{ label: 'Research API', ok: status.data?.api === 'UP', detail: status.data?.api || 'Checking' }, { label: 'Project data', ok: datasets.some((d: any) => d.available), detail: `${datasets.filter((d: any) => d.available).length || 0} datasets indexed` }, { label: 'Prediction models', ok: (status.data?.models_available || 0) > 0, detail: `${status.data?.models_available ?? '—'} of ${status.data?.models_total ?? '—'} ready` }, { label: 'AI assistant', ok: assistant.data?.indexed_chunks > 0, detail: assistant.data ? `${assistant.data.indexed_chunks} knowledge chunks` : 'Checking service' }]
  return <><PageHeader eyebrow="WORKSPACE / OVERVIEW" title="Good research starts here." description="A live view of your maize data, experiments and model readiness." action={<Link className="button button-primary" to="/assistant"><Bot size={17} /> Ask the AI assistant</Link>} />
    <div className="welcome-banner"><div className="welcome-copy"><span className="banner-tag"><i /> PROJECT SNAPSHOT</span><h2>Discover more in your<br />research data.</h2><p>Explore field observations, compare disease response and turn existing model outputs into clear research insights.</p><Link to="/genotypes" className="button button-light">Explore genotypes <ChevronRight size={16} /></Link></div><div className="banner-art" aria-hidden="true"><div className="sun-disc" /><div className="art-line art-line-one" /><div className="art-line art-line-two" /><div className="maize-stalk"><i /><i /><i /><b /><em /></div><div className="art-dot dot-a" /><div className="art-dot dot-b" /><div className="art-dot dot-c" /></div></div>
    <div className="metric-grid metric-grid-six">{cards.map(c => <MetricCard key={c.label} label={c.label} value={c.value == null ? '—' : Number(c.value).toLocaleString()} hint={c.hint} tone={c.tone} icon={c.icon} />)}</div>
    <div className="dashboard-columns"><section className="panel readiness-panel"><div className="panel-heading"><div><h2>Project readiness</h2><p>Live service and data availability</p></div><span className="live-tag"><i /> LIVE</span></div>{status.isLoading ? <LoadingBlock /> : <div className="readiness-list">{readiness.map(item => <div className="readiness-row" key={item.label}><span className={`readiness-check ${item.ok ? 'ready' : ''}`}>{item.ok ? '✓' : '·'}</span><span className="readiness-name">{item.label}</span><span className="readiness-detail">{item.detail}</span><span className={`readiness-state ${item.ok ? 'text-green' : ''}`}>{item.ok ? 'Ready' : 'Pending'}</span></div>)}</div>}</section>
      <section className="panel quick-panel"><div className="panel-heading"><div><h2>Jump back into research</h2><p>Common starting points</p></div></div><div className="quick-links"><QuickLink to="/genotypes" icon={Dna} title="Find a genotype" detail="Search the catalog" /><QuickLink to="/observations" icon={TableProperties} title="Browse observations" detail="Explore field records" /><QuickLink to="/predictions" icon={Command} title="Run a prediction" detail="Use available models" /><QuickLink to="/analytics/clusters" icon={BarChart3} title="Explore clusters" detail="View PCA outputs" /></div></section></div>
    <KarnatakaHistoricalProductionChart />
    <DataPanel title="Dataset catalog" description={`${totalRows.toLocaleString()} records across the available research domains`} rows={datasets.map((d: any) => ({ domain: d.domain, status: d.available ? 'Available' : 'Not found', records: d.rows, columns: d.columns?.length || 0, dataset: d.path }))} loading={catalog.isLoading} error={catalog.error} retry={() => catalog.refetch()} />
    <div className="footnote">All dashboard totals are returned by the project API; the frontend does not recalculate dataset statistics.</div></>
}
function QuickLink({ to, icon: Icon, title, detail }: { to: string; icon: IconType; title: string; detail: string }) { return <Link to={to} className="quick-link"><span><Icon size={17} /></span><b>{title}</b><small>{detail}</small><ChevronRight className="quick-arrow" size={15} /></Link> }

function Genotypes() {
  const [query, setQuery] = useState(new URLSearchParams(window.location.search).get('q') || ''), [domain, setDomain] = useState(''), [offset, setOffset] = useState(0)
  const data = useApi('genotypes', `/api/v1/genotypes${qs({ query, domain: domain || undefined, limit: 50, offset })}`)
  return <><PageHeader eyebrow="RESEARCH DATA / CATALOG" title="Genotype explorer" description="Find genotypes across yield, disease and multi-trait datasets." action={<span className="count-chip">{data.data?.total?.toLocaleString() ?? '—'} genotypes</span>} /><div className="filter-bar"><label className="filter-search"><Search size={16} /><input value={query} onChange={e => { setQuery(e.target.value); setOffset(0) }} placeholder="Search genotype names…" /></label><select value={domain} onChange={e => { setDomain(e.target.value); setOffset(0) }}><option value="">All domains</option><option value="yield">Yield</option><option value="tlb">TLB</option><option value="sdm">SDM</option><option value="multi_trait">Multi-trait</option></select><button className="button button-subtle" onClick={() => { setQuery(''); setDomain(''); setOffset(0) }}>Reset filters</button></div><DataPanel title="Genotype records" description="Select a genotype to inspect its available domain records." rows={rowsOf(data.data)} loading={data.isLoading} error={data.error} retry={() => data.refetch()} onSelect={row => window.location.assign(`/genotypes/${encodeURIComponent(String(row.genotype))}`)} empty="Try a broader search or choose a different domain." /><Pagination data={data.data} offset={offset} onChange={setOffset} /></>
}
function Pagination({ data, offset, onChange }: { data: any; offset: number; onChange: (n: number) => void }) { const limit = data?.limit || 50, total = data?.total || 0; return <div className="pagination"><span>Showing {total ? offset + 1 : 0}–{Math.min(offset + limit, total)} of {total.toLocaleString()}</span><div><button disabled={offset <= 0} onClick={() => onChange(Math.max(0, offset - limit))}>Previous</button><button disabled={offset + limit >= total} onClick={() => onChange(offset + limit)}>Next</button></div></div> }
function GenotypeDetail() {
  const { id = '' } = useParams(), name = decodeURIComponent(id), data = useApi('genotype', `/api/v1/genotypes/${encodeURIComponent(name)}`), [tab, setTab] = useState('overview')
  const domains: Record<string, any> = data.data?.domains || {}, current = tab === 'overview' ? Object.entries(domains).flatMap(([d, v]: [string, any]) => v.rows.map((r: Row) => ({ domain: d, ...r }))) : domains[tab]?.rows || []
  return <><PageHeader eyebrow="RESEARCH DATA / GENOTYPE" title={name} description="Genotype profile assembled from available backend research datasets." action={<Link className="button button-primary" to={`/assistant?q=${encodeURIComponent(`Tell me about genotype ${name}`)}`}><Bot size={16} /> Ask AI about this genotype</Link>} />{data.isLoading ? <LoadingBlock /> : data.error ? <ErrorPanel error={data.error} retry={() => data.refetch()} /> : <><div className="profile-summary"><div className="profile-symbol"><Dna size={25} /></div><div><b>{name}</b><p>Observed in {Object.keys(domains).length} data {Object.keys(domains).length === 1 ? 'domain' : 'domains'}</p></div><span className="domain-tags">{Object.keys(domains).map(d => <span key={d}>{d.replace('_', ' ')}</span>)}</span></div><div className="tab-list">{['overview', 'yield', 'tlb', 'sdm', 'multi_trait'].map(t => <button key={t} className={tab === t ? 'tab-active' : ''} onClick={() => setTab(t)}>{t.replace('_', ' ')}</button>)}</div><DataPanel title={`${tab === 'overview' ? 'All' : tab.toUpperCase()} records`} description={`${current.length} matching records from genotype detail`} rows={current} /></>}</>
}
function Experiments() {
  const [query, setQuery] = useState(''), [domain, setDomain] = useState(''), [offset, setOffset] = useState(0), data = useApi('experiments', `/api/v1/experiments${qs({ query, domain: domain || undefined, limit: 100, offset })}`)
  return <><PageHeader eyebrow="RESEARCH DATA / TRIALS" title="Experiment explorer" description="Browse trials and field experiment metadata indexed in the project datasets." /><div className="filter-bar"><label className="filter-search"><Search size={16} /><input placeholder="Search location, season, trial…" value={query} onChange={e => { setQuery(e.target.value); setOffset(0) }} /></label><select value={domain} onChange={e => { setDomain(e.target.value); setOffset(0) }}><option value="">All domains</option>{['yield', 'tlb', 'sdm', 'multi_trait'].map(x => <option key={x}>{x}</option>)}</select><button className="button button-subtle" onClick={() => { setQuery(''); setDomain(''); setOffset(0) }}>Reset filters</button></div><DataPanel title="Experiments" description="Unique experiment and trial references returned by the API." rows={rowsOf(data.data)} loading={data.isLoading} error={data.error} retry={() => data.refetch()} onSelect={row => window.location.assign(`/experiments/${encodeURIComponent(String(row.experiment_id || row.experiment_no || row.trial_no || row.location || 'experiment'))}?domain=${row.domain || ''}`)} /><Pagination data={data.data} offset={offset} onChange={setOffset} /></>
}
function ExperimentDetail() {
  const { id = '' } = useParams(), name = decodeURIComponent(id), params = new URLSearchParams(window.location.search), domain = params.get('domain') || '', data = useApi('experiment-rows', `/api/v1/observations${qs({ domain: domain || 'yield', experiment: name, limit: 1000 })}`)
  return <><PageHeader eyebrow="RESEARCH DATA / EXPERIMENT" title={name} description="Records that match this experiment reference. Select another domain in the observations explorer." action={<Link className="button button-primary" to={`/assistant?q=${encodeURIComponent(`Summarize experiment ${name}`)}`}><Bot size={16} /> Explain experiment</Link>} /><div className="detail-meta"><span>Domain</span><b>{domain || 'yield (default)'}</b><span>Matched records</span><b>{data.data?.total ?? '—'}</b></div><DataPanel title="Experiment observations" rows={rowsOf(data.data)} loading={data.isLoading} error={data.error} retry={() => data.refetch()} /></>
}
function Observations() {
  const [domain, setDomain] = useState('yield'), [genotype, setGenotype] = useState(''), [variable, setVariable] = useState(''), [experiment, setExperiment] = useState(''), [offset, setOffset] = useState(0)
  const data = useApi('observations', `/api/v1/observations${qs({ domain, genotype, variable, experiment, limit: 100, offset })}`)
  return <><PageHeader eyebrow="RESEARCH DATA / OBSERVATIONS" title="Observation browser" description="Filter raw research records by data domain, genotype, trait and experiment." /><div className="filter-bar filter-wrap"><select value={domain} onChange={e => { setDomain(e.target.value); setOffset(0) }}>{['yield', 'tlb', 'sdm', 'multi_trait'].map(x => <option key={x} value={x}>{x.replace('_', ' ')}</option>)}</select><FilterInput label="Genotype" value={genotype} onChange={setGenotype} /><FilterInput label="Trait / variable" value={variable} onChange={setVariable} /><FilterInput label="Experiment" value={experiment} onChange={setExperiment} /><button className="button button-subtle" onClick={() => { setGenotype(''); setVariable(''); setExperiment(''); setOffset(0) }}>Reset</button></div><DataPanel title={`${domain.toUpperCase()} records`} description={data.data?.dataset || 'Observation rows served by the research API.'} rows={rowsOf(data.data)} loading={data.isLoading} error={data.error} retry={() => data.refetch()} /><Pagination data={data.data} offset={offset} onChange={setOffset} /></>
}
function FilterInput({ label, value, onChange }: { label: string; value: string; onChange: (v: string) => void }) { return <label className="compact-field"><small>{label}</small><input value={value} onChange={e => onChange(e.target.value)} placeholder={`Filter ${label.toLowerCase()}`} /></label> }

function DomainPage({ domain }: { domain: 'yield' | 'tlb' | 'sdm' }) {
  const isYield = domain === 'yield', diseasePath = domain === 'tlb' ? '/api/v1/disease/tlb' : '/api/v1/disease/sdm'
  const observations = useApi('domain-observations', isYield ? `/api/v1/observations${qs({ domain, limit: 100 })}` : `${diseasePath}?limit=100`), summary = useApi('domain-summary', `/api/v1/dataset-summary/${domain}`), metrics = useApi('domain-metrics', `/api/v1/model-metrics${qs({ domain, kind: isYield ? 'regression' : 'classification' })}`)
  const title = domain === 'yield' ? 'Yield analysis' : domain === 'tlb' ? 'Turcicum leaf blight' : 'Sorghum downy mildew'
  return <><PageHeader eyebrow={`ANALYSIS / ${domain.toUpperCase()}`} title={title} description={isYield ? 'Explore yield observations, trial performance and production metrics.' : `Review ${domain.toUpperCase()} disease screening observations, severity classifications and model readiness.`} action={<Link className="button button-primary" to={`/predictions?domain=${domain}`}><Command size={16} /> Run {domain.toUpperCase()} prediction</Link>} />
    <div className="metric-grid metric-grid-three"><MetricCard label="Dataset records" value={summary.data?.rows?.toLocaleString() ?? '—'} hint={summary.data?.available ? 'Loaded from project dataset' : 'Dataset unavailable'} icon={Database} /><MetricCard label="Features" value={summary.data?.columns?.length ?? '—'} hint="Columns available in this domain" icon={BarChart3} tone="blue" /><MetricCard label="Metric rows" value={metrics.data?.items?.length ?? '—'} hint={metrics.data?.available ? 'Model comparison results' : 'No metrics artifact found'} icon={Activity} tone="violet" /></div>
    {observations.isLoading ? <LoadingBlock /> : observations.error ? <ErrorPanel error={observations.error} retry={() => observations.refetch()} /> : <DomainDistributionView domain={domain} rows={rowsOf(observations.data)} />}
    <DataPanel title="Recent observations" description="Browse and export the first 100 records; use the observation browser for filters and paging." rows={rowsOf(observations.data)} loading={observations.isLoading} error={observations.error} retry={() => observations.refetch()} />
    <DataPanel title="Model comparison metrics" description="Only fields and values returned by the backend are shown." rows={rowsOf(metrics.data)} loading={metrics.isLoading} error={metrics.error} retry={() => metrics.refetch()} empty="No model comparison output is available for this domain." /></>
}
function chartData(rows: Row[], key: string) { if (!key) return []; const count: Record<string, number> = {}; rows.forEach(row => { const value = Number(row[key]); if (Number.isFinite(value)) { const bucket = Math.round(value * 10) / 10; count[String(bucket)] = (count[String(bucket)] || 0) + 1 } }); return Object.entries(count).slice(0, 20).map(([name, value]) => ({ name, value })) }

function DataSummary() {
  const [domain, setDomain] = useState('yield'), data = useApi('dataset-summary', `/api/v1/dataset-summary/${domain}`), numericRows = data.data?.numeric_summary || []
  return <><PageHeader eyebrow="ANALYSIS / DATASET PROFILE" title="Dataset summary" description="Schema and descriptive statistics computed by the backend for each domain." /><div className="tab-list">{['yield', 'tlb', 'sdm', 'multi_trait'].map(d => <button className={domain === d ? 'tab-active' : ''} key={d} onClick={() => setDomain(d)}>{d.replace('_', ' ')}</button>)}</div>{data.isLoading ? <LoadingBlock /> : data.error ? <ErrorPanel error={data.error} retry={() => data.refetch()} /> : !data.data?.available ? <div className="panel"><div className="empty-inline">The {domain} dataset is not available in the configured project root.</div></div> : <><div className="metric-grid metric-grid-three"><MetricCard label="Rows" value={data.data.rows?.toLocaleString()} icon={Database} /><MetricCard label="Columns" value={data.data.columns?.length} icon={TableProperties} tone="blue" /><MetricCard label="Numeric features" value={numericRows.length} icon={BarChart3} tone="violet" /></div><DataPanel title="Dataset columns" description={data.data.path} rows={(data.data.columns || []).map((column: string, index: number) => ({ position: index + 1, column, numeric: numericRows.some((r: Row) => r.feature === column) }))} /><DataPanel title="Numeric statistics" description="Summary values are presented exactly as returned by the dataset summary endpoint." rows={numericRows} /></>}</>
}
function Clusters() {
  const status = useApi('clusters-status', '/api/v1/clusters/status'), data = useApi('cluster-data', `/api/v1/clusters/data${qs({ limit: 500 })}`), rows = rowsOf(data.data), columns = Object.keys(rows[0] || {}), xKey = columns.find(k => /pc.?1|component.?1/i.test(k)), yKey = columns.find(k => /pc.?2|component.?2/i.test(k)), clusterKey = columns.find(k => /cluster/i.test(k)), nameKey = columns.find(k => /genotype|name|line/i.test(k))
  const points = rows.map(r => ({ x: Number(r[xKey || '']), y: Number(r[yKey || '']), group: pretty(r[clusterKey || '']), label: pretty(r[nameKey || '']) })).filter(p => Number.isFinite(p.x) && Number.isFinite(p.y))
  return <><PageHeader eyebrow="ANALYSIS / UNSUPERVISED" title="PCA & clusters" description="Inspect clustering artifacts and principal component coordinates when available." /><div className="metric-grid metric-grid-three"><MetricCard label="Clustering artifact" value={status.data?.available ? 'Available' : status.isLoading ? 'Checking' : 'Unavailable'} hint={status.data?.path || status.data?.message || 'Status from artifact service'} icon={BarChart3} /><MetricCard label="Records loaded" value={data.data?.total ?? rows.length} icon={Database} tone="blue" /><MetricCard label="PCA coordinates" value={points.length} hint="Rows with both numeric components" icon={Dna} tone="violet" /></div>{data.isLoading ? <LoadingBlock /> : data.error ? <ErrorPanel error={data.error} retry={() => data.refetch()} /> : <ClustersEnhancedView points={points} xKey={xKey} yKey={yKey} />}<DataPanel title="Cluster artifact records" description={data.data?.filename || status.data?.path || 'Backend cluster output'} rows={rows} loading={data.isLoading} error={data.error} retry={() => data.refetch()} /></>
}
function Weather() {
  const data = useApi('weather-status', '/api/v1/weather/status');
  return <><PageHeader eyebrow="ANALYSIS / ENVIRONMENT" title="Weather readiness" description="Current weather data availability and disease-weather readiness reported by the backend." /><div className="metric-grid metric-grid-three"><MetricCard label="Status" value={data.data?.available === true ? 'Available' : data.isLoading ? 'Checking' : data.data?.status || 'Not reported'} icon={Activity} /><MetricCard label="Disease-weather readiness" value={data.data?.disease_weather_ready == null ? '—' : data.data.disease_weather_ready ? 'Ready' : 'Not ready'} icon={Leaf} tone="blue" /><MetricCard label="Weather records" value={data.data?.rows ?? data.data?.record_count ?? '—'} icon={Database} tone="violet" /></div><WeatherEnhancedSuite />{data.isLoading ? <LoadingBlock /> : data.error ? <ErrorPanel error={data.error} retry={() => data.refetch()} /> : <DataPanel title="Backend weather status" description="Raw readiness fields from the status artifact." rows={[data.data || {}]} />}</>
}
function Breeding() {
  const data = useApi('breeding', `/api/v1/observations${qs({ domain: 'multi_trait', limit: 200 })}`), summary = useApi('breeding-summary', '/api/v1/dataset-summary/multi_trait');
  return <><PageHeader eyebrow="ANALYSIS / BREEDING" title="Breeding intelligence" description="Explore the available multi-trait production summary as returned by the project API." /><div className="metric-grid metric-grid-three"><MetricCard label="Multi-trait records" value={summary.data?.rows?.toLocaleString() ?? '—'} icon={Dna} /><MetricCard label="Available traits" value={summary.data?.columns?.length ?? '—'} icon={BarChart3} tone="blue" /><MetricCard label="Rows in preview" value={data.data?.items?.length ?? '—'} icon={Database} tone="violet" /></div><BreedingMultiTraitView rows={rowsOf(data.data)} /><DataPanel title="Multi-trait records" description={data.data?.dataset} rows={rowsOf(data.data)} loading={data.isLoading} error={data.error} retry={() => data.refetch()} empty="No multi-trait records were returned by the backend." /></>
}

function Models() {
  const data = useApi('models', '/api/v1/models'), metricsDomain = new URLSearchParams(window.location.search).get('domain') || 'yield', kind = new URLSearchParams(window.location.search).get('kind') || 'regression', metrics = useApi('model-metrics', `/api/v1/model-metrics${qs({ domain: metricsDomain, kind })}`)
  return <><PageHeader eyebrow="MACHINE LEARNING / MODEL REGISTRY" title="Models & metrics" description="Inspect available model artifacts and backend evaluation outputs." action={<button className="button button-subtle" onClick={() => api.post('/api/v1/models/reload', {}).then(() => data.refetch()).catch(() => data.refetch())}>Reload model registry</button>} /><section className="panel"><div className="panel-heading"><div><h2>Registered models</h2><p>Availability and model metadata from the model service</p></div><span className="count-chip">{data.data?.models?.filter((m: any) => m.available).length ?? '—'} available</span></div>{data.isLoading ? <LoadingBlock /> : data.error ? <ErrorPanel error={data.error} retry={() => data.refetch()} /> : <div className="model-grid">{(data.data?.models || []).map((model: any) => <Link to={`/models/${encodeURIComponent(model.model_key)}`} className="model-card" key={model.model_key}><div className="model-card-top"><span className="model-icon"><BarChart3 size={18} /></span><span className={`status-pill ${model.available ? 'status-good' : 'status-muted'}`}>{model.available ? 'Available' : 'Unavailable'}</span></div><h3>{model.model_key?.replaceAll('_', ' ')}</h3><p>{model.package_type || model.kind || 'Prediction artifact'}</p><div className="model-card-meta"><span>{model.feature_count ?? model.features?.length ?? '—'} features</span><ChevronRight size={15} /></div></Link>)}</div>}</section><section className="panel"><div className="panel-heading"><div><h2>Evaluation metrics</h2><p>Select a domain and task to view its model comparison output.</p></div><div className="inline-selects"><select value={metricsDomain} onChange={e => window.location.assign(`/models?domain=${e.target.value}&kind=${kind}`)}>{['yield', 'tlb', 'sdm'].map(d => <option key={d}>{d}</option>)}</select><select value={kind} onChange={e => window.location.assign(`/models?domain=${metricsDomain}&kind=${e.target.value}`)}><option value="regression">Regression</option><option value="classification">Classification</option></select></div></div><DataTable rows={rowsOf(metrics.data)} empty={metrics.data?.available === false ? 'No model metrics artifact is available for this domain and task.' : 'No metric rows returned.'} /></section></>
}
function ModelDetail() { const { id = '' } = useParams(), data = useApi('model-detail', `/api/v1/models/${encodeURIComponent(id)}`); return <><PageHeader eyebrow="MACHINE LEARNING / MODEL" title={id.replaceAll('_', ' ')} description="Model detail returned by the frozen Phase 19 model API." action={<Link className="button button-primary" to={`/explainability?model=${encodeURIComponent(id)}`}><CircleHelp size={16} /> Explain model</Link>} />{data.isLoading ? <LoadingBlock /> : data.error ? <ErrorPanel error={data.error} retry={() => data.refetch()} /> : <DataPanel title="Model metadata" rows={[data.data || {}]} />}<div className="footnote">Model reload requires a configured API key when API-key security is enabled.</div></> }

const phenotypeFields = [
  ['days_to_50_percent_pollen_shedding', 'Pollen shedding', 'Days (DAS)', 'number'],
  ['days_to_50_percent_silking', 'Silking', 'Days (DAS)', 'number'],
  ['days_to_75_percent_dry_husk', 'Dry husk (Maturity)', 'Days (DAS)', 'number'],
  ['plant_height', 'Plant height', 'cm', 'number'],
  ['ear_height', 'Ear height', 'cm', 'number'],
  ['plant_stand', 'Plant stand', "'000/ha", 'number'],
  ['shelling_percentage', 'Shelling percentage', '%', 'number'],
] as const

function Predictions() {
  const params = new URLSearchParams(window.location.search)
  const [domain, setDomain] = useState(params.get('domain') || 'all')
  const [mode, setMode] = useState('single')
  const [values, setValues] = useState<Record<string, string>>({})
  const [selectedGenotype, setSelectedGenotype] = useState<string>('IMH 2-22R-10')
  const [customGenotype, setCustomGenotype] = useState('')
  const [openHelp, setOpenHelp] = useState<Record<string, boolean>>({})
  const [result, setResult] = useState<any>()
  const [error, setError] = useState('')
  const [busy, setBusy] = useState(false)

  const features = useApi('features', '/api/v1/features')
  const genotypesQuery = useApi('prediction-genotypes', '/api/v1/genotypes?limit=100')

  const catalogGenotypes = useMemo(() => {
    const items = rowsOf(genotypesQuery.data)
    return Array.from(
      new Set(items.map((r: any) => String(r.genotype || '')).filter(Boolean))
    ).filter(name => !RESEARCH_BENCHMARKS.some(b => b.name === name))
  }, [genotypesQuery.data])

  const activeBenchmark = useMemo(() => {
    return RESEARCH_BENCHMARKS.find(b => b.id === selectedGenotype)
  }, [selectedGenotype])

  const effectiveGenotype =
    selectedGenotype === '__CUSTOM__'
      ? customGenotype.trim() || 'UNKNOWN'
      : selectedGenotype

  const handleSelectGenotype = (genotypeId: string) => {
    setSelectedGenotype(genotypeId)
    if (genotypeId !== '__CUSTOM__') {
      setValues(prev => ({ ...prev, genotype: genotypeId }))
    } else {
      setValues(prev => ({ ...prev, genotype: customGenotype.trim() || 'UNKNOWN' }))
    }
  }

  const applyPreset = (benchmark: BenchmarkGenotype) => {
    setValues(prev => ({
      ...prev,
      genotype: benchmark.name,
      ...benchmark.preset,
    }))
    setSelectedGenotype(benchmark.id)
  }

  const toggleHelp = (key: string) => {
    setOpenHelp(prev => ({ ...prev, [key]: !prev[key] }))
  }

  const submitSingle = async (event: FormEvent) => {
    event.preventDefault()
    setBusy(true)
    setError('')
    setResult(undefined)
    const payload: Row = {
      genotype: effectiveGenotype,
    }
    phenotypeFields.forEach(([key, , , type]) => {
      const v = values[key]
      if (v !== undefined && v !== '') {
        payload[key] = type === 'number' ? Number(v) : v
      }
    })
    try {
      setResult(await api.post(`/api/v1/predict/${domain}`, payload))
    } catch (e) {
      setError(e instanceof Error ? e.message : 'Prediction failed.')
    } finally {
      setBusy(false)
    }
  }

  const upload = async (file?: File) => {
    if (!file) return
    setBusy(true)
    setError('')
    setResult(undefined)
    const ext = file.name.toLowerCase().endsWith('.csv')
      ? 'csv'
      : file.name.toLowerCase().endsWith('.json')
      ? 'json'
      : ''
    if (!ext) {
      setError('Choose a .csv or .json file.')
      setBusy(false)
      return
    }
    try {
      setResult(await api.upload(`/api/v1/predict/batch-${ext}`, file))
    } catch (e) {
      setError(e instanceof Error ? e.message : 'Batch prediction failed.')
    } finally {
      setBusy(false)
    }
  }

  return (
    <>
      <PageHeader
        eyebrow="MACHINE LEARNING / INFERENCE"
        title="Prediction center"
        description="Run the backend’s existing yield and disease models with supplied field traits and benchmark genotypes."
      />
      <div className="notice-strip">
        <CircleHelp size={16} />
        <span>
          Inputs follow the Phase 19 API schema. Yield (t/ha), TLB (1–9 score & reaction), and SDM (PDI %) predictions depend on trained model artifacts.
        </span>
      </div>
      <div className="tab-list">
        <button onClick={() => setMode('single')} className={mode === 'single' ? 'tab-active' : ''}>
          Single prediction
        </button>
        <button onClick={() => setMode('csv')} className={mode === 'csv' ? 'tab-active' : ''}>
          Batch CSV
        </button>
        <button onClick={() => setMode('json')} className={mode === 'json' ? 'tab-active' : ''}>
          Batch JSON
        </button>
      </div>

      {mode === 'single' ? (
        <section className="panel prediction-panel">
          <div className="panel-heading">
            <div>
              <h2>Prediction inputs</h2>
              <p>Select a genotype from research trials or enter custom values; optional traits can be left blank.</p>
            </div>
            <select value={domain} onChange={e => setDomain(e.target.value)}>
              <option value="all">All domains</option>
              <option value="yield">Yield only</option>
              <option value="tlb">TLB only</option>
              <option value="sdm">SDM only</option>
            </select>
          </div>

          <form onSubmit={submitSingle}>
            <div className="feature-grid">
              {/* Genotype Dropdown Field */}
              <div className="feature-field">
                <div className="field-header-row">
                  <span>
                    <b>Genotype</b>
                    <span className="field-unit-badge">Identifier</span>
                  </span>
                  <button
                    type="button"
                    className="field-info-btn"
                    onClick={() => toggleHelp('genotype')}
                  >
                    <Info size={11} /> {openHelp['genotype'] ? 'Hide' : 'What this means'}
                  </button>
                </div>
                <small className="feature-description">
                  Identity label of the maize entry (select benchmark hybrid/check or custom).
                </small>

                <div className="genotype-select-group">
                  <select
                    value={selectedGenotype}
                    onChange={e => handleSelectGenotype(e.target.value)}
                    className="genotype-select"
                  >
                    <optgroup label="⭐ High-Yielding Hybrids & Checks (ZARS Mandya)">
                      {RESEARCH_BENCHMARKS.filter(b => b.group === 'yield').map(b => (
                        <option key={b.id} value={b.id}>
                          {b.name} ({b.role})
                        </option>
                      ))}
                    </optgroup>
                    <optgroup label="🛡️ Turcicum Leaf Blight (TLB) Resistance Entries">
                      {RESEARCH_BENCHMARKS.filter(b => b.group === 'tlb').map(b => (
                        <option key={b.id} value={b.id}>
                          {b.name} ({b.role})
                        </option>
                      ))}
                    </optgroup>
                    <optgroup label="🌿 Sorghum Downy Mildew (SDM) Resistance Entries">
                      {RESEARCH_BENCHMARKS.filter(b => b.group === 'sdm').map(b => (
                        <option key={b.id} value={b.id}>
                          {b.name} ({b.role})
                        </option>
                      ))}
                    </optgroup>
                    {catalogGenotypes.length > 0 && (
                      <optgroup label="📂 Project Catalog Genotypes">
                        {catalogGenotypes.map(name => (
                          <option key={name} value={name}>
                            {name}
                          </option>
                        ))}
                      </optgroup>
                    )}
                    <optgroup label="✏️ Custom Entry">
                      <option value="__CUSTOM__">Enter custom genotype name…</option>
                    </optgroup>
                  </select>

                  {selectedGenotype === '__CUSTOM__' && (
                    <input
                      type="text"
                      className="custom-genotype-input"
                      placeholder="Type custom genotype name (e.g. MH-2024-X)"
                      value={customGenotype}
                      onChange={e => {
                        setCustomGenotype(e.target.value)
                        setValues(prev => ({ ...prev, genotype: e.target.value }))
                      }}
                      autoFocus
                    />
                  )}
                </div>

                {activeBenchmark && (
                  <div className="preset-banner">
                    <div className="preset-info">
                      <Sparkles size={13} className="text-brand" style={{ flexShrink: 0 }} />
                      <span>
                        <b>{activeBenchmark.name}</b> — {activeBenchmark.notes}
                      </span>
                    </div>
                    <button
                      type="button"
                      className="preset-btn"
                      onClick={() => applyPreset(activeBenchmark)}
                      title="Auto-fill form with authentic trial data for this genotype"
                    >
                      <Zap size={11} /> Auto-fill trial data
                    </button>
                  </div>
                )}

                {openHelp['genotype'] && FIELD_EXPLANATIONS['genotype'] && (
                  <div className="field-info-panel">
                    <small>FIELD MEANING & MEASUREMENT</small>
                    <p>{FIELD_EXPLANATIONS['genotype'].meaning}</p>
                    <p><b>Biological Role:</b> {FIELD_EXPLANATIONS['genotype'].biologicalRole}</p>
                    <p><b>Trial Benchmarks:</b> {FIELD_EXPLANATIONS['genotype'].benchmarks}</p>
                  </div>
                )}
              </div>

              {/* Numerical Phenotype Input Fields */}
              {phenotypeFields.map(([key, label, unit, type]) => {
                const exp = FIELD_EXPLANATIONS[key]
                const isOpen = !!openHelp[key]
                return (
                  <label className="feature-field" key={key}>
                    <div className="field-header-row">
                      <span>
                        {label}
                        <span className="field-unit-badge">{unit}</span>
                        <small style={{ marginLeft: '4px' }}>OPTIONAL</small>
                      </span>
                      <button
                        type="button"
                        className="field-info-btn"
                        onClick={e => {
                          e.preventDefault()
                          toggleHelp(key)
                        }}
                      >
                        <Info size={11} /> {isOpen ? 'Hide' : 'What this means'}
                      </button>
                    </div>
                    <small className="feature-description">{exp?.shortDesc || label}</small>
                    <input
                      type={type}
                      value={values[key] ?? ''}
                      min={0}
                      step="any"
                      onChange={e => setValues({ ...values, [key]: e.target.value })}
                      placeholder={exp?.benchmarks ? `e.g. ${exp.benchmarks.split(';')[0]?.replace(/[^0-9.]/g, '') || 'Not provided'}` : 'Not provided'}
                    />

                    {isOpen && exp && (
                      <div className="field-info-panel" onClick={e => e.stopPropagation()}>
                        <small>FIELD MEANING & MEASUREMENT</small>
                        <p>{exp.meaning}</p>
                        <p><b>Biological Significance:</b> {exp.biologicalRole}</p>
                        {exp.formula && (
                          <div>
                            <small>FORMULA / CALCULATION</small>
                            <code>{exp.formula}</code>
                          </div>
                        )}
                        {exp.benchmarks && (
                          <div>
                            <small>BENCHMARK OBSERVATION</small>
                            <span>{exp.benchmarks}</span>
                          </div>
                        )}
                      </div>
                    )}
                  </label>
                )
              })}
            </div>

            <div className="form-footer">
              <span>
                Fields returned from backend: {features.data?.base_features?.length ?? '—'} base features
              </span>
              <div style={{ display: 'flex', gap: '8px' }}>
                <button
                  type="button"
                  className="button button-subtle"
                  onClick={() => setValues({})}
                  disabled={busy || !Object.keys(values).length}
                >
                  Clear fields
                </button>
                <button className="button button-primary" disabled={busy}>
                  {busy ? (
                    <>
                      <span className="button-spinner" /> Running…
                    </>
                  ) : (
                    <>
                      <Command size={16} /> Run prediction
                    </>
                  )}
                </button>
              </div>
            </div>
          </form>
        </section>
      ) : (
        <section className="panel upload-panel">
          <div className="upload-drop">
            <span className="upload-icon">
              <Download size={20} />
            </span>
            <h2>Upload a {mode.toUpperCase()} file</h2>
            <p>
              Submit records to the backend batch prediction endpoint. Rows must match the accepted prediction input fields.
            </p>
            <label className="button button-primary">
              Choose {mode.toUpperCase()} file
              <input
                type="file"
                accept={mode === 'csv' ? '.csv,text/csv' : '.json,application/json'}
                onChange={e => upload(e.target.files?.[0])}
                hidden
              />
            </label>
          </div>
        </section>
      )}

      {error && <ErrorPanel error={error} />}
      {busy && <LoadingBlock label="Running prediction through the backend model service…" />}
      {result && (
        <section className="panel result-panel">
          <div className="panel-heading">
            <div>
              <h2>Prediction result</h2>
              <p>
                {result.count != null
                  ? `${result.count} records processed`
                  : `Genotype: ${result.genotype || '—'}`}
              </p>
            </div>
            <button
              className="button button-subtle button-small"
              onClick={() => exportCsv(predictionRows(result), 'prediction-results')}
            >
              <Download size={14} /> Export results
            </button>
          </div>
          {result.warnings?.length > 0 && (
            <div className="warning-strip">{result.warnings.join(' ')}</div>
          )}
          <DataPanel title="Output fields" rows={predictionRows(result)} />
          {result.model_status && <DataPanel title="Model status" rows={[result.model_status]} />}
        </section>
      )}

      {/* Comprehensive Research Data Field Guide */}
      <PredictionFieldGuide />
    </>
  )
}
function predictionRows(result: any): Row[] { if (Array.isArray(result?.results)) return result.results; if (result?.results && typeof result.results === 'object') return [result.results]; return rowsOf(result) }

function Explainability() {
  const keys = ['yield', 'tlb_regression', 'tlb_classifier', 'sdm_regression', 'sdm_classifier'], initial = new URLSearchParams(window.location.search).get('model') || 'yield', [model, setModel] = useState(initial), data = useApi('explainability', `/api/v1/explainability/${encodeURIComponent(model)}`)
  const source = data.data || {}, importance = Array.isArray(source.feature_importance) ? source.feature_importance : Array.isArray(source.items) ? source.items : Array.isArray(source.features) ? source.features : []
  const normalized = importance.map((r: any) => typeof r === 'object' ? r : { feature: String(r) })
  const a = normalized.length ? importanceKey(normalized[0]) : ''
  const b = normalized.length ? scoreKey(normalized[0]) : ''
  const chartRows = normalized.slice(0, 15).map((r: Row) => ({ name: pretty(r[a]), value: Number(r[b]) })).filter((r: { name: string; value: number }) => Number.isFinite(r.value))

  return <><PageHeader eyebrow="MACHINE LEARNING / INTERPRETATION" title="Explainability center" description="Inspect feature importance, permutation scores, and agronomic feature impacts." /><div className="filter-bar"><label className="compact-field"><small>MODEL KEY</small><select value={model} onChange={e => setModel(e.target.value)}>{keys.map(k => <option key={k}>{k}</option>)}</select></label></div>{data.isLoading ? <LoadingBlock /> : data.error ? <ErrorPanel error={data.error} retry={() => data.refetch()} /> : <><div className="panel chart-panel"><div className="panel-heading"><div><h2>Feature importance & model explanation</h2><p>Permutation importance and impact metrics for {model.toUpperCase()}</p></div><span className="count-chip">{chartRows.length} ranked features</span></div>{chartRows.length > 0 ? <ExplainabilityEnhancedView modelKey={model} chartRows={chartRows} /> : <div className="empty-inline">No structured feature importance table was found in this model response. The raw backend response is available below.</div>}</div><DataPanel title="Explanation details" rows={normalized} empty="No tabular feature contribution data was returned." /><details className="raw-details"><summary>View raw response</summary><pre>{JSON.stringify(data.data, null, 2)}</pre></details></>}</>
}
function importanceKey(row: Row) { return Object.keys(row).find(k => /feature|name/i.test(k)) || '' }
function scoreKey(row: Row) { return Object.keys(row).find(k => /importance|impact|contribution|weight|score/i.test(k)) || '' }


interface MessageItem {
  role: 'user' | 'assistant'
  text: string
  sources?: string[]
  source_details?: SourceDetail[]
  tools_used?: string[]
  provider?: string
  model?: string
  confidence?: number
}

function Assistant() {
  const param = new URLSearchParams(window.location.search).get('q') || ''
  const [question, setQuestion] = useState(param)
  const [messages, setMessages] = useState<MessageItem[]>([])
  const [busy, setBusy] = useState(false)
  const [error, setError] = useState('')
  const [highlightedSource, setHighlightedSource] = useState<string | null>(null)

  const status = useQuery({
    queryKey: ['assistant-status'],
    queryFn: () => api.assistantGet('/api/v1/assistant/status'),
  })

  const prompts = [
    'Summarize the project status and available data.',
    'What yield datasets and models are available?',
    'Find information about genotype MAH-22-17.',
    'Summarize the latest TLB and SDM model metrics.',
  ]

  const handleCitationClick = (citationId: string) => {
    setHighlightedSource(citationId)
    setTimeout(() => {
      const el = document.getElementById(`source-card-${citationId}`)
      if (el) {
        el.scrollIntoView({ behavior: 'smooth', block: 'nearest' })
      }
    }, 50)
  }

  const send = async (event?: FormEvent, value = question) => {
    event?.preventDefault()
    const q = value.trim()
    if (!q || busy) return
    setQuestion('')
    setError('')
    setMessages(prev => [...prev, { role: 'user', text: q }])
    setBusy(true)

    try {
      const history = messages.slice(-10).map(m => ({
        role: m.role,
        content: m.text,
      }))
      const res = await api.chat(q, history)
      setMessages(prev => [
        ...prev,
        {
          role: 'assistant',
          text: res.answer || 'The assistant did not return an answer.',
          sources: res.sources || [],
          source_details: res.source_details || [],
          tools_used: res.tools_used || [],
          provider: res.provider,
          model: res.model,
          confidence: res.confidence,
        },
      ])
    } catch (e) {
      setError(e instanceof Error ? e.message : 'Assistant request failed.')
    } finally {
      setBusy(false)
    }
  }

  const clearChat = () => {
    setMessages([])
    setError('')
  }

  return (
    <>
      <PageHeader
        eyebrow="PROJECT / AI RESEARCH WORKSPACE"
        title="Research assistant"
        description="Ask grounded questions about project datasets, models, pipeline artifacts and research records."
        action={
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            {messages.length > 0 && (
              <button
                type="button"
                className="button button-subtle"
                onClick={clearChat}
                style={{ fontSize: '11px', padding: '4px 10px', height: '30px' }}
              >
                Clear chat
              </button>
            )}
            <span className={`connection-chip ${status.data?.indexed_chunks ? 'connected' : ''}`}>
              <i />{' '}
              {status.data?.indexed_chunks
                ? `${status.data.indexed_chunks.toLocaleString()} indexed chunks`
                : status.isLoading
                ? 'Connecting'
                : 'Service unavailable'}
            </span>
          </div>
        }
      />
      <div className="assistant-layout">
        <div className="assistant-main">
          <div className="chat-heading">
            <span className="assistant-avatar">
              <Bot size={20} />
            </span>
            <div>
              <b>Maize AI assistant</b>
              <small>Project-grounded research support · Groq RAG & Local Engine</small>
            </div>
            <span className="secure-label">
              <ShieldCheck size={14} /> Grounded RAG
            </span>
          </div>

          <div className="conversation">
            {!messages.length && (
              <div className="chat-welcome">
                <span className="welcome-orb">
                  <Sprout size={25} />
                </span>
                <h2>What are you researching?</h2>
                <p>
                  Ask about the project, a genotype, field data, model metrics or pipeline outputs.
                </p>
                <div className="prompt-grid">
                  {prompts.map(p => (
                    <button
                      key={p}
                      onClick={() => {
                        setQuestion(p)
                        void send(undefined, p)
                      }}
                    >
                      {p}
                      <ChevronRight size={15} />
                    </button>
                  ))}
                </div>
              </div>
            )}

            {messages.map((m, i) => (
              <div className={`message-row ${m.role}`} key={i}>
                <span className={`message-avatar ${m.role}`}>
                  {m.role === 'user' ? 'R' : <Bot size={16} />}
                </span>
                <div className="message-content">
                  <div style={{ display: 'flex', alignItems: 'center', gap: '6px', flexWrap: 'wrap' }}>
                    <small style={{ fontWeight: 700 }}>
                      {m.role === 'user' ? 'You' : 'Assistant'}
                    </small>
                    {m.role === 'assistant' && (
                      <div className="chat-meta-bar" style={{ margin: 0 }}>
                        {m.provider && (
                          <span className="meta-pill meta-pill-provider">
                            <Sparkles size={9} />
                            {m.provider === 'groq'
                              ? `Groq · ${m.model || 'llama-3.3-70b'}`
                              : m.provider}
                          </span>
                        )}
                        {m.tools_used?.map((tool, tIdx) => (
                          <span key={tIdx} className="meta-pill meta-pill-tool">
                            <Wrench size={9} />
                            {tool}
                          </span>
                        ))}
                        {typeof m.confidence === 'number' && m.confidence > 0 && (
                          <span className="meta-pill meta-pill-confidence">
                            {Math.round(m.confidence * 100)}% match
                          </span>
                        )}
                      </div>
                    )}
                  </div>

                  <div className="message-text">
                    {m.role === 'assistant' ? (
                      <MarkdownView
                        content={m.text}
                        onCitationClick={handleCitationClick}
                      />
                    ) : (
                      m.text
                    )}
                  </div>

                  {m.role === 'assistant' && (
                    <>
                      <b className="sources-heading" style={{ marginTop: '10px' }}>
                        <Database size={12} style={{ display: 'inline', marginRight: '4px' }} />
                        Grounded Sources{' '}
                        <span>{m.source_details?.length || m.sources?.length || 0}</span>
                      </b>
                      <SourceDetailsView
                        sources={m.sources}
                        sourceDetails={m.source_details}
                        highlightedId={highlightedSource}
                        onSourceClick={id => setHighlightedSource(id)}
                      />
                    </>
                  )}
                </div>
              </div>
            ))}

            {busy && (
              <div className="message-row assistant">
                <span className="message-avatar assistant">
                  <Bot size={16} />
                </span>
                <div className="message-content">
                  <small>Assistant</small>
                  <div className="typing">
                    <i />
                    <i />
                    <i /> Retrieving vector evidence & formulating response…
                  </div>
                </div>
              </div>
            )}

            {error && <ErrorPanel error={error} />}
          </div>

          <form className="chat-compose" onSubmit={send}>
            <textarea
              value={question}
              onChange={e => setQuestion(e.target.value)}
              onKeyDown={e => {
                if (e.key === 'Enter' && !e.shiftKey) {
                  e.preventDefault()
                  void send()
                }
              }}
              placeholder="Ask a question about your maize project…"
              rows={2}
            />
            <div className="compose-footer">
              <span>Enter to send · Shift + Enter for a new line</span>
              <button className="button button-primary" disabled={busy || !question.trim()}>
                Send <ChevronRight size={15} />
              </button>
            </div>
          </form>
        </div>

        <aside className="assistant-side">
          <section className="side-info">
            <span className="side-info-icon">
              <Activity size={17} />
            </span>
            <h3>Assistant status</h3>
            <p>Phase 21 project research assistant.</p>
            <div className="side-stat">
              <span>Knowledge chunks</span>
              <b>{status.data?.indexed_chunks ? status.data.indexed_chunks.toLocaleString() : '—'}</b>
            </div>
            <div className="side-stat">
              <span>LLM provider</span>
              <b>{status.data?.llm_configured ? 'Configured (Groq)' : status.data ? 'Local mode' : '—'}</b>
            </div>
            <div className="side-stat">
              <span>API endpoint</span>
              <b>{api.backendHost}</b>
            </div>
          </section>
          <section className="side-info">
            <span className="side-info-icon">
              <CircleHelp size={17} />
            </span>
            <h3>Try asking</h3>
            {prompts.slice(0, 3).map(p => (
              <button
                className="side-prompt"
                key={p}
                onClick={() => {
                  setQuestion(p)
                  void send(undefined, p)
                }}
              >
                {p}
              </button>
            ))}
          </section>
        </aside>
      </div>
    </>
  )
}

function SystemPage() {
  const health = useApi('health', '/health'), ready = useApi('ready', '/ready'), info = useApi('info', '/api/v1/info'), status = useApi('status', '/api/v1/status'), verification = useApi('verification', '/api/v1/project/verification')
  const checks = [{ name: 'Health', result: health.data, loading: health.isLoading, error: health.error }, { name: 'Readiness', result: ready.data, loading: ready.isLoading, error: ready.error }, { name: 'API info', result: info.data, loading: info.isLoading, error: info.error }, { name: 'Project status', result: status.data, loading: status.isLoading, error: status.error }]
  return <><PageHeader eyebrow="PROJECT / OPERATIONS" title="System status" description="Backend health, readiness, version, model availability and project verification." action={<a className="button button-subtle" href={`${api.url}/docs`} target="_blank" rel="noreferrer">Open API docs <ChevronRight size={15} /></a>} /><div className="metric-grid metric-grid-three"><MetricCard label="API health" value={health.data?.status || (health.isLoading ? 'Checking' : 'Unavailable')} icon={Activity} /><MetricCard label="Readiness" value={ready.data?.status || (ready.isLoading ? 'Checking' : 'Unavailable')} icon={ShieldCheck} tone="blue" /><MetricCard label="API version" value={info.data?.version || '—'} icon={Command} tone="violet" /></div><div className="system-grid">{checks.map(c => <details className="system-card" key={c.name} open><summary><span className="system-bullet" /><b>{c.name}</b><span>{c.loading ? 'Checking' : c.error ? 'Unavailable' : 'Responding'}</span></summary>{c.loading ? <LoadingBlock /> : c.error ? <p className="system-error">{(c.error as Error).message}</p> : <pre>{JSON.stringify(c.result, null, 2)}</pre>}</details>)}</div><DataPanel title="Project verification artifacts" description={verification.data?.project_root || ''} rows={(verification.data?.available_artifacts || []).map((path: string) => ({ artifact: path }))} loading={verification.isLoading} error={verification.error} retry={() => verification.refetch()} empty="No verification artifacts were found." /></>
}
function NotFound() { return <div className="not-found"><span>404</span><h1>Page not found</h1><p>This research page doesn’t exist.</p><Link className="button button-primary" to="/">Return to overview</Link></div> }

export default App
