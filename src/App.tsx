import { useEffect, useMemo, useState } from 'react'

type IconName = 'arrow' | 'spark' | 'shield' | 'file' | 'code' | 'scan' | 'check' | 'alert' | 'clock' | 'lock' | 'copy' | 'play' | 'chevron' | 'plus' | 'link' | 'menu' | 'x'

type IconProps = { name: IconName; size?: number; stroke?: number }

const iconPaths: Record<IconName, string> = {
  arrow: 'M5 12h14M13 6l6 6-6 6',
  spark: 'M12 3l1.8 5.2L19 10l-5.2 1.8L12 17l-1.8-5.2L5 10l5.2-1.8L12 3Zm7 14 .7 2.3L22 20l-2.3.7L19 23l-.7-2.3L16 20l2.3-.7L19 17Z',
  shield: 'M12 3 20 6v5c0 5.1-3.4 8.7-8 10-4.6-1.3-8-4.9-8-10V6l8-3Z',
  file: 'M6 3h8l4 4v14H6V3Zm8 0v5h4M9 13h6M9 17h4',
  code: 'm8 9-3 3 3 3m8-6 3 3-3 3m-3-8-2 10',
  scan: 'M4 8V5a1 1 0 0 1 1-1h3M16 4h3a1 1 0 0 1 1 1v3M20 16v3a1 1 0 0 1-1 1h-3M8 20H5a1 1 0 0 1-1-1v-3',
  check: 'm5 12 4 4L19 6',
  alert: 'M12 4 21 20H3L12 4Zm0 5v5m0 3h.01',
  clock: 'M12 7v5l3 2m6-2a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z',
  lock: 'M6 10h12v10H6V10Zm3 0V7a3 3 0 0 1 6 0v3',
  copy: 'M8 8h10v12H8V8Zm-3 8H4V4h10v1',
  play: 'm9 6 9 6-9 6V6Z',
  chevron: 'm9 18 6-6-6-6',
  plus: 'M12 5v14M5 12h14',
  link: 'M10 13a5 5 0 0 0 7.1.1l1.4-1.4a5 5 0 0 0-7.1-7.1L10.6 5.4m3.4 5.2a5 5 0 0 0-7.1-.1l-1.4 1.4a5 5 0 0 0 7.1 7.1l.8-.8',
  menu: 'M4 7h16M4 12h16M4 17h16',
  x: 'M6 6l12 12M18 6 6 18',
}

function Icon({ name, size = 18, stroke = 1.8 }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={stroke} strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d={iconPaths[name]} />
    </svg>
  )
}

const DEMO_INPUT = `Client wants a website for ₹50,000. Pay ₹20,000 after the design is approved and ₹30,000 when the website is delivered. Client has 5 days to review each milestone. If there is a disagreement, freeze the payment until both parties resolve it.`

const milestones = [
  { id: 'milestone-1', number: '01', label: 'Design approval', amount: '₹20,000', percent: 40, detail: 'Released after design is approved' },
  { id: 'milestone-2', number: '02', label: 'Website delivery', amount: '₹30,000', percent: 60, detail: 'Released after final delivery' },
]

const legalClauses = [
  { id: 'milestone-1', label: 'Milestone 01 · Design approval', value: '₹20,000', tone: 'lime', copy: 'Client shall release forty percent of the total fee following written approval of the design milestone.' },
  { id: 'milestone-2', label: 'Milestone 02 · Website delivery', value: '₹30,000', tone: 'blue', copy: 'The remaining balance is due upon delivery of the completed website and handoff of source files.' },
  { id: 'review', label: 'Review window', value: '5 days', tone: 'purple', copy: 'The client has five calendar days to review each submitted milestone and communicate acceptance or a specific rejection.' },
  { id: 'dispute', label: 'Dispute condition', value: 'Payment freeze', tone: 'coral', copy: 'If either party raises a dispute, the affected payment remains frozen until a mutually recorded resolution.' },
]

function App() {
  const [input, setInput] = useState(DEMO_INPUT)
  const [isParsed, setIsParsed] = useState(true)
  const [isParsing, setIsParsing] = useState(false)
  const [tampered, setTampered] = useState(false)
  const [activeClause, setActiveClause] = useState('milestone-1')
  const [toast, setToast] = useState('Demo agreement loaded')
  const [mobileNav, setMobileNav] = useState(false)

  const parityScore = tampered ? 74 : 100

  const activeLegalClause = useMemo(
    () => legalClauses.find((clause) => clause.id === activeClause) ?? legalClauses[0],
    [activeClause],
  )

  useEffect(() => {
    if (!toast) return
    const timeout = window.setTimeout(() => setToast(''), 3200)
    return () => window.clearTimeout(timeout)
  }, [toast])

  const runParser = () => {
    if (!input.trim()) {
      setToast('Add a plain-English agreement first')
      return
    }
    setIsParsing(true)
    setToast('LEGALX is extracting the agreement…')
    window.setTimeout(() => {
      setIsParsing(false)
      setIsParsed(true)
      setTampered(false)
      setToast('Interpretation ready for confirmation')
    }, 850)
  }

  const loadDemo = () => {
    setInput(DEMO_INPUT)
    setIsParsed(true)
    setTampered(false)
    setActiveClause('milestone-1')
    setToast('Seeded ₹50,000 agreement loaded')
  }

  const toggleTamper = () => {
    setTampered((current) => !current)
    setActiveClause('milestone-2')
    setToast(!tampered ? 'Tamper simulation enabled — parity dropped' : 'Original terms restored — parity is 100%')
  }

  return (
    <div className="app-shell">
      <header className="topbar">
        <a className="brand" href="#top" aria-label="LEGALX home">
          <span className="brand-mark"><span>⌁</span></span>
          <span className="brand-type">LEGAL<span>X</span><small>by lexora</small></span>
        </a>
        <nav className={mobileNav ? 'topnav is-open' : 'topnav'} aria-label="Primary navigation">
          <a className="nav-link active" href="#workspace" onClick={() => setMobileNav(false)}>Workspace</a>
          <a className="nav-link" href="#parity" onClick={() => setMobileNav(false)}>How parity works</a>
          <a className="nav-link" href="#trust" onClick={() => setMobileNav(false)}>Trust layer</a>
        </nav>
        <div className="top-actions">
          <span className="network-chip"><i /> Sepolia testnet</span>
          <button className="avatar-button" aria-label="Open profile">NB</button>
          <button className="mobile-menu" onClick={() => setMobileNav((open) => !open)} aria-label="Toggle navigation">
            <Icon name={mobileNav ? 'x' : 'menu'} />
          </button>
        </div>
      </header>

      <div className="page-layout" id="top">
        <aside className="sidebar">
          <div className="sidebar-intro">
            <span className="eyebrow">LEGALX WORKSPACE</span>
            <p>One source of truth.<br />Two outputs. Zero surprises.</p>
          </div>
          <div className="step-list" aria-label="Agreement steps">
            <div className="step-item done">
              <span className="step-number">01</span>
              <div><strong>Describe the deal</strong><small>Plain English or Hinglish</small></div>
              <Icon name="check" size={15} />
            </div>
            <div className={isParsed ? 'step-item active' : 'step-item'}>
              <span className="step-number">02</span>
              <div><strong>Confirm terms</strong><small>Contract IR extracted</small></div>
              {isParsed && <span className="step-live">LIVE</span>}
            </div>
            <div className="step-item">
              <span className="step-number">03</span>
              <div><strong>Verify parity</strong><small>Legal ↔ executable logic</small></div>
            </div>
          </div>
          <div className="sidebar-divider" />
          <div className="recent-title"><span>RECENT AGREEMENTS</span><button aria-label="Add agreement"><Icon name="plus" size={16} /></button></div>
          <button className="recent-card" onClick={loadDemo}>
            <span className="recent-icon"><Icon name="file" size={16} /></span>
            <span className="recent-copy"><strong>Website project</strong><small>₹50,000 · Draft saved</small></span>
            <Icon name="chevron" size={15} />
          </button>
          <div className="sidebar-bottom">
            <div className="secure-note"><Icon name="lock" size={15} /><span>Private workspace<br /><b>Encrypted in transit</b></span></div>
            <button className="help-link">Need a walkthrough? <Icon name="arrow" size={13} /></button>
          </div>
        </aside>

        <main className="main-content">
          <section className="hero-section">
            <div className="hero-copy">
              <div className="hero-kicker"><span className="pulse-dot" /> PS-03 · Smart Contract Creation</div>
              <h1>From human<br /><em>agreements</em> to<br /><strong>executable trust.</strong></h1>
              <p className="hero-lede">LEGALX turns the way you <i>actually</i> speak about a deal into a legal agreement and smart contract that can be checked against each other.</p>
              <div className="hero-proof"><span><Icon name="check" size={14} /> AI structured</span><span><Icon name="check" size={14} /> Source-grounded</span><span><Icon name="check" size={14} /> Parity verified</span></div>
            </div>
            <div className="hero-visual" aria-label="LEGALX relationship between legal agreement and smart contract">
              <div className="visual-orbit orbit-one" />
              <div className="visual-orbit orbit-two" />
              <div className="visual-core"><span className="core-spark"><Icon name="spark" size={23} /></span><b>100%</b><small>PARITY READY</small></div>
              <div className="visual-node node-legal"><Icon name="file" size={18} /><span>legal<br /><b>agreement</b></span></div>
              <div className="visual-node node-code"><Icon name="code" size={18} /><span>smart<br /><b>contract</b></span></div>
              <span className="orbit-label label-left">human terms</span><span className="orbit-label label-right">code logic</span>
            </div>
          </section>

          <section className="composer-card section-anchor" id="workspace">
            <div className="section-heading-row">
              <div><span className="section-number">01</span><div><span className="eyebrow">START WITH THE DEAL</span><h2>Tell us what you agreed.</h2></div></div>
              <span className="powered-badge"><Icon name="spark" size={14} /> Powered by structured AI</span>
            </div>
            <div className="composer-body">
              <div className="input-wrap">
                <label htmlFor="deal-input">Describe the agreement in your own words</label>
                <textarea id="deal-input" value={input} onChange={(event) => setInput(event.target.value)} placeholder="e.g. Client hires me to design a website for ₹50,000…" />
                <div className="input-footer"><span><i className="tiny-dot" /> English + Hinglish supported</span><span>{input.length} / 1,000</span></div>
              </div>
              <div className="composer-actions">
                <button className="primary-button" onClick={runParser} disabled={isParsing}><span>{isParsing ? 'Extracting terms' : 'Extract terms'}</span><Icon name={isParsing ? 'scan' : 'arrow'} size={17} /></button>
                <button className="text-button" onClick={loadDemo}><Icon name="play" size={14} /> Load seeded demo</button>
              </div>
            </div>
          </section>

          {isParsed && <>
            <section className="interpretation-section section-anchor" id="interpretation">
              <div className="section-heading-row compact-heading">
                <div><span className="section-number">02</span><div><span className="eyebrow">CONTRACT IR · CONFIRMED</span><h2>Here’s what LEGALX understood.</h2></div></div>
                <button className="outline-button"><Icon name="copy" size={15} /> Copy contract IR</button>
              </div>
              <div className="interpretation-grid">
                <div className="summary-card">
                  <div className="summary-top"><span className="status-label"><i /> Extraction complete</span><span className="confidence">98.4% confidence</span></div>
                  <h3>Freelance website<br />development agreement</h3>
                  <div className="party-row"><div className="party-avatar">CL</div><div><small>CLIENT</small><strong>Client / Small business</strong></div><span className="party-arrow">↔</span><div className="party-avatar mint">FR</div><div><small>PROVIDER</small><strong>Freelance developer</strong></div></div>
                  <div className="summary-meta"><span><small>TOTAL VALUE</small><b>₹50,000</b></span><span><small>REVIEW WINDOW</small><b>5 days</b></span><span><small>DISPUTE MODE</small><b>Freeze payment</b></span></div>
                </div>
                <div className="milestone-card">
                  <div className="card-label-row"><span className="eyebrow">PAYMENT MILESTONES</span><span className="inline-check"><Icon name="check" size={13} /> Adds up to 100%</span></div>
                  <div className="milestone-bars">{milestones.map((milestone) => <button key={milestone.id} className={activeClause === milestone.id ? 'milestone-row selected' : 'milestone-row'} onClick={() => setActiveClause(milestone.id)}><span className="milestone-index">{milestone.number}</span><span className="milestone-detail"><b>{milestone.label}</b><small>{milestone.detail}</small><span className="bar-track"><i style={{ width: `${milestone.percent}%` }} /></span></span><strong className="milestone-amount">{milestone.amount}</strong></button>)}</div>
                </div>
              </div>
            </section>

            <section className="parity-section section-anchor" id="parity">
              <div className="section-heading-row compact-heading">
                <div><span className="section-number">03</span><div><span className="eyebrow">LEGAL-TO-CODE PARITY ENGINE</span><h2>Does the code say the same thing?</h2></div></div>
                <div className={tampered ? 'tamper-toggle is-on' : 'tamper-toggle'}><button onClick={toggleTamper} aria-pressed={tampered}><span className="toggle-dot" /> Simulate tamper</button></div>
              </div>
              <div className="parity-grid">
                <div className="document-card legal-card">
                  <div className="document-header"><div className="document-title"><span className="document-icon legal"><Icon name="file" size={17} /></span><div><b>Legal agreement</b><small>Human-readable output</small></div></div><span className="doc-status"><Icon name="check" size={13} /> generated</span></div>
                  <div className="document-content"><div className="agreement-name">SERVICE AGREEMENT <span>· v1.0</span></div><p className="legal-opening">This Service Agreement is entered into by the <mark className="mark-lime">Client</mark> and the <mark className="mark-blue">Service Provider</mark> for the creation and delivery of a website.</p><div className="clause-list">{legalClauses.map((clause) => <button key={clause.id} className={activeClause === clause.id ? `clause-row active ${clause.tone}` : `clause-row ${clause.tone}`} onClick={() => setActiveClause(clause.id)}><span className="clause-bullet" /><span><b>{clause.label}</b><small>{clause.copy}</small></span><strong>{clause.value}</strong></button>)}</div></div>
                  <div className="document-footer"><span><Icon name="lock" size={13} /> Clause sources preserved</span><button onClick={() => setToast('Agreement preview copied')}>Preview PDF <Icon name="arrow" size={13} /></button></div>
                </div>

                <div className={tampered ? 'document-card code-card tampered' : 'document-card code-card'}>
                  <div className="document-header"><div className="document-title"><span className="document-icon code"><Icon name="code" size={17} /></span><div><b>Solidity escrow logic</b><small>Executable output</small></div></div><span className={tampered ? 'doc-status warning' : 'doc-status'}><Icon name={tampered ? 'alert' : 'check'} size={13} /> {tampered ? 'mismatch found' : 'parity matched'}</span></div>
                  <div className="code-content"><div className="code-file"><span>EscrowAgreement.sol</span><span>SEPOLIA</span></div><pre><code><span className="code-purple">contract</span> <span className="code-blue">EscrowAgreement</span> {'{'}{`\n`}  <span className="code-purple">uint256</span> <span className="code-blue">totalAmount</span> = <span className="code-yellow">50000</span>;{`\n`}  <span className="code-purple">uint256</span> <span className="code-blue">reviewWindow</span> = <span className="code-yellow">5 days</span>;{`\n\n`}  <span className="code-purple">function</span> <span className="code-blue">releaseMilestone</span>(<span className="code-purple">uint8</span> id) {'{'}{`\n`}    <span className="code-gray">// approval → payout</span>{`\n`}    <span className="code-purple">require</span>(approved[id] == <span className="code-green">true</span>);{`\n`}    <span className="code-purple">payable</span>(provider).transfer(amount[id]);{`\n`}  {'}'}{`\n\n`}  <span className="code-purple">function</span> <span className="code-blue">raiseDispute</span>() {'{'}{`\n`}    <span className="code-gray">// freeze affected payment</span>{`\n`}    frozen = <span className="code-green">true</span>;{`\n`}  {'}'}{`\n`}{'}'}</code></pre>{tampered && <div className="code-tamper-line"><span>!</span><b>Line 08 changed</b><small>Payment is released after 2 days, not 5.</small></div>}</div>
                  <div className="document-footer"><span><Icon name="link" size={13} /> Derived from Contract IR</span><button onClick={() => setToast('Solidity snippet copied')}>Copy code <Icon name="copy" size={13} /></button></div>
                </div>

                <aside className={tampered ? 'parity-score-card warning-state' : 'parity-score-card'}>
                  <div className="score-top"><span className="eyebrow">PARITY SCORE</span><span className="score-pulse" /></div>
                  <div className="score-number"><strong>{parityScore}</strong><span>%</span></div>
                  <h3>{tampered ? 'Review before you deploy.' : 'Same meaning. Different medium.'}</h3>
                  <p>{tampered ? 'The engine found one executable condition that does not match the written agreement.' : 'Every defined payment condition is represented in both the legal agreement and the escrow logic.'}</p>
                  <div className="score-checks"><div className="score-check passed"><Icon name="check" size={14} /><span>Milestone amounts</span><b>{tampered ? '2 / 2' : '2 / 2'}</b></div><div className={tampered ? 'score-check failed' : 'score-check passed'}><Icon name={tampered ? 'alert' : 'check'} size={14} /><span>Review window</span><b>{tampered ? 'Mismatch' : '5 days'}</b></div><div className="score-check passed"><Icon name="check" size={14} /><span>Dispute freeze</span><b>Matched</b></div></div>
                  <div className="score-cta"><Icon name={tampered ? 'alert' : 'shield'} size={17} /><span><b>{tampered ? '1 issue needs attention' : 'Ready for independent verification'}</b><small>{tampered ? 'Fix the code or update the agreement' : 'Not a legal enforceability guarantee'}</small></span></div>
                  <button className={tampered ? 'verify-button warning' : 'verify-button'} onClick={toggleTamper}>{tampered ? 'Restore matching logic' : 'Run verification again'} <Icon name="arrow" size={15} /></button>
                </aside>
              </div>
            </section>

            <section className="trust-strip" id="trust">
              <div className="trust-intro"><span className="eyebrow">WHY LEGALX</span><h2>Trust is a relationship<br />we can inspect.</h2></div>
              <div className="trust-items"><div><span className="trust-icon"><Icon name="spark" size={16} /></span><b>Understand first</b><small>AI asks before it assumes.</small></div><div><span className="trust-icon"><Icon name="link" size={16} /></span><b>One source of truth</b><small>Legal and code share a schema.</small></div><div><span className="trust-icon"><Icon name="scan" size={16} /></span><b>Verify independently</b><small>Parity before commitment.</small></div></div>
            </section>
          </>}

          <footer className="site-footer"><span>LEXORA / LEGALX <b>·</b> Built for humans who make deals.</span><span>Blockchain can execute terms. It cannot replace legal advice.</span></footer>
        </main>
      </div>
      {toast && <div className="toast" role="status"><span className="toast-icon"><Icon name="check" size={14} /></span>{toast}</div>}
    </div>
  )
}

export default App
