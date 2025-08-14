import { useEffect, useMemo, useState } from "react";
import "./ui.css";

/** ---------- Pure logic ---------- */
const MIN = 90, MAX = 150;
const clamp = (n: number) => Math.max(MIN, Math.min(MAX, n));
const volumeBand = (pct: number) => {
  if (pct <= 100) return { label: "High", width: 85, max: 100 };
  if (pct <= 110) return { label: "Good", width: 65, max: 110 };
  if (pct <= 120) return { label: "Moderate", width: 45, max: 120 };
  return { label: "Low", width: 25, max: 150 };
};
const projections = (annual: number, centers: number) => ({
  one:  { perCenter: annual * 1,  total: annual * 1  * centers },
  five: { perCenter: annual * 5,  total: annual * 5  * centers },
  ten:  { perCenter: annual * 10, total: annual * 10 * centers },
});

// Replace with your real county/state maps if needed
const STATES_ORDER = ["AL","AZ","CA","CO","CT","DC","DE","FL","GA","IL","MA","MD","MI","NC","NJ","NY","OH","PA","SC","TN","TX","VA","WA"];

type Center = { id: string; name: string; state: string; city?: string };
type Procedure = { cpt: string; name: string };

type PricingSelection = {
  globalDefault: number;                // 90..150
  stateRates: Record<string, number>;   // e.g., { FL: 100, GA: 110 }
  centerOverrides: Record<string, number>;
  period: "one"|"five"|"ten";
};

function effectiveRate(center: Center, sel: PricingSelection) {
  if (sel.centerOverrides[center.id]) return sel.centerOverrides[center.id];
  if (sel.stateRates[center.state])   return sel.stateRates[center.state];
  return sel.globalDefault;
}

/** ---------- Fake fetcher (stub) ----------
 * Swap with a real API that returns pricing rows per CPT for a given (state, county or region).
 * For now, we model revenue using baseAnnualAt100 and the % rate.
 */
async function fetchPricingStub(_: { state: string; procedures: Procedure[] }) {
  // Pretend these are server results
  return _.procedures.map(p => ({
    cpt: p.cpt,
    name: p.name,
    pricing: { medicare_rate: 200, hospital_estimate: 800 }
  }));
}

/** ---------- Main Island ---------- */
export default function MultiPricingApp({
  centers,
  procedures,
  facilityCount,
  baseAnnualAt100 = 200000
}: {
  centers: Center[];
  procedures: Procedure[];
  facilityCount: number;
  baseAnnualAt100?: number;
}) {
  // Seed state lists
  const states = useMemo(() => {
    const s = Array.from(new Set(centers.map(c => c.state)));
    return s.sort((a,b) => STATES_ORDER.indexOf(a) - STATES_ORDER.indexOf(b));
  }, [centers]);

  // Selection model
  const [sel, setSel] = useState<PricingSelection>(() => {
    const saved = localStorage.getItem("usrad_multi_selection");
    if (saved) return JSON.parse(saved);
    return { globalDefault: 100, stateRates: {}, centerOverrides: {}, period: "five" };
  });

  // Persist
  useEffect(() => {
    localStorage.setItem("usrad_multi_selection", JSON.stringify(sel));
  }, [sel]);

  // Derived groups
  const centersByState = useMemo(() => {
    const map: Record<string, Center[]> = {};
    centers.forEach(c => {
      map[c.state] = map[c.state] || [];
      map[c.state].push(c);
    });
    return map;
  }, [centers]);

  // Portfolio math: compute effective avg rate across centers
  const avgPct = useMemo(() => {
    if (!centers.length) return sel.globalDefault;
    const total = centers.reduce((sum, c) => sum + effectiveRate(c, sel), 0);
    return total / centers.length;
  }, [centers, sel]);

  // Base per-center annual revenue modeled from baseAnnualAt100 and average pct
  const band = volumeBand(avgPct);
  const baseAnnual = useMemo(() => {
    // Scale baseAnnualAt100 by pct; band.max gives a simple volume proxy
    return (baseAnnualAt100 * (avgPct/100));
  }, [baseAnnualAt100, avgPct]);

  const proj = useMemo(() => projections(baseAnnual, facilityCount), [baseAnnual, facilityCount]);

  // (Optional) hit server for live CPT reference pricing (kept stubbed here)
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    let cancel = false;
    (async () => {
      setLoading(true);
      try {
        await fetchPricingStub({ state: states[0] || "FL", procedures });
      } finally {
        if (!cancel) setLoading(false);
      }
    })();
    return () => { cancel = true; };
  }, [states, procedures]);

  // Helpers
  const setGlobal = (n: number) =>
    setSel(s => ({ ...s, globalDefault: clamp(n) }));

  const setStateRate = (st: string, n: number) =>
    setSel(s => ({ ...s, stateRates: { ...s.stateRates, [st]: clamp(n) }}));

  const clearStateRate = (st: string) =>
    setSel(s => {
      const next = { ...s.stateRates }; delete next[st];
      return { ...s, stateRates: next };
    });

  const setCenterOverride = (id: string, n: number) =>
    setSel(s => ({ ...s, centerOverrides: { ...s.centerOverrides, [id]: clamp(n) }}));

  const clearCenterOverride = (id: string) =>
    setSel(s => {
      const next = { ...s.centerOverrides }; delete next[id];
      return { ...s, centerOverrides: next };
    });

  const resetStateCentersToStateRate = (st: string) =>
    setSel(s => {
      const next = { ...s.centerOverrides };
      centersByState[st].forEach(c => { delete next[c.id]; });
      return { ...s, centerOverrides: next };
    });

  const applyGlobalToAllStates = () =>
    setSel(s => {
      const rates: Record<string, number> = {};
      states.forEach(st => { rates[st] = s.globalDefault; });
      return { ...s, stateRates: rates };
    });

  const payload = useMemo(() => ({
    role: "multi",
    globalDefault: sel.globalDefault,
    stateRates: sel.stateRates,
    centerOverrides: sel.centerOverrides,
    period: sel.period
  }), [sel]);

  const fmtUSD = (n: number) =>
    n.toLocaleString(undefined, { style: "currency", currency: "USD", maximumFractionDigits: 0 });

  return (
    <div className="mp-grid">
      {/* STEP 1 — Defaults */}
      <section className="mp-card">
        <header className="mp-header">
          <h2>Step 1 — Set Defaults</h2>
          <p>Choose a global default rate. You can customize states and individual centers later.</p>
        </header>

        <div className="row items-center gap-3">
          <label className="label">Global Default</label>
          <input
            type="range" min={MIN} max={MAX} step={1}
            value={sel.globalDefault}
            onChange={(e)=>setGlobal(Number(e.target.value))}
          />
          <div className="pill">{sel.globalDefault}% of Medicare</div>
        </div>

        <div className="row gap-2 mt-3">
          <button className="btn" onClick={applyGlobalToAllStates}>Apply to All States</button>
        </div>
      </section>

      {/* STEP 2 — State Rates & Center Overrides */}
      <section className="mp-card">
        <header className="mp-header">
          <h2>Step 2 — Set Rates by State</h2>
          <p>Adjust state rates. Optionally override specific centers.</p>
        </header>

        <div className="state-table">
          <div className="state-row head">
            <div>State</div><div>Centers</div><div>Rate</div><div>Actions</div>
          </div>

          {states.map(st => {
            const list = centersByState[st] || [];
            const stateRate = sel.stateRates[st] ?? sel.globalDefault;
            return (
              <div key={st} className="state-row">
                <div className="st">{st}</div>
                <div>{list.length}</div>
                <div className="rate-cell">
                  <input
                    type="range" min={MIN} max={MAX} step={1}
                    value={stateRate}
                    onChange={(e)=>setStateRate(st, Number(e.target.value))}
                  />
                  <input
                    className="rate-input"
                    type="number" min={MIN} max={MAX}
                    value={stateRate}
                    onChange={(e)=>setStateRate(st, Number(e.target.value))}
                  />
                  <span className="unit">%</span>
                </div>
                <div className="actions">
                  <button className="link" onClick={()=>setStateRate(st, sel.globalDefault)}>Copy Global</button>
                  <button className="link" onClick={()=>setStateRate(st, 100)}>Set 100%</button>
                  <button className="link danger" onClick={()=>clearStateRate(st)}>Reset</button>
                </div>

                {/* Per-center overrides */}
                <details className="overrides">
                  <summary>Center overrides</summary>
                  <div className="override-list">
                    {list.map(c => {
                      const eff = effectiveRate(c, sel);
                      const hasOverride = sel.centerOverrides[c.id] != null;
                      return (
                        <div key={c.id} className="override-row">
                          <div className="name">
                            <strong>{c.name}</strong>
                            {c.city ? <span className="muted"> — {c.city}</span> : null}
                          </div>
                          <div className="rate-cell">
                            <input
                              type="number" min={MIN} max={MAX}
                              value={eff}
                              onChange={(e)=>setCenterOverride(c.id, Number(e.target.value))}
                            />
                            <span className="unit">%</span>
                          </div>
                          <div className="actions">
                            {hasOverride
                              ? <button className="link danger" onClick={()=>clearCenterOverride(c.id)}>Clear</button>
                              : <span className="muted">inherits {stateRate}%</span>}
                          </div>
                        </div>
                      );
                    })}
                  </div>
                  <div className="row">
                    <button className="link" onClick={()=>resetStateCentersToStateRate(st)}>Reset all to state rate</button>
                  </div>
                </details>
              </div>
            );
          })}
        </div>
      </section>

      {/* STEP 3 — Summary */}
      <section className="mp-card">
        <header className="mp-header">
          <h2>Step 3 — Review & Confirm</h2>
          <p>5-year view is the default. You can change the period below.</p>
        </header>

        <div className="projection-toggle">
          {(["one","five","ten"] as const).map(p => (
            <button
              key={p}
              className={`toggle-btn ${sel.period===p ? "active":""}`}
              onClick={()=>setSel(s=>({ ...s, period: p }))}
            >
              {p==="one"?"1 Year":p==="five"?"5 Years":"10 Years"}
            </button>
          ))}
        </div>

        <div className="revenue-projection-enhanced">
          <div className="projection-header">
            <h3>Your Revenue Potential</h3>
            <span className="per-center-label">Per Center</span>
          </div>

          <div className="projection-featured">
            <div className="time-period">
              {sel.period==="one"?"1-Year Total":sel.period==="five"?"5-Year Total":"10-Year Total"}
            </div>
            <div className="amount-large">
              {fmtUSD(sel.period==="one"?proj.one.perCenter:sel.period==="five"?proj.five.perCenter:proj.ten.perCenter)}
            </div>
          </div>

          <div className="projection-breakdown">
            <div className="metric"><span>Annual</span><strong>{fmtUSD(baseAnnual)}</strong></div>
            <div className="metric"><span>Monthly Avg</span><strong>{fmtUSD(baseAnnual/12)}</strong></div>
          </div>

          {facilityCount>1 && (
            <div className="portfolio-total">
              <div className="total-label">
                All {facilityCount} Centers ({sel.period==="one"?"1 Year":sel.period==="five"?"5 Years":"10 Years"})
              </div>
              <div className="total-amount">
                {fmtUSD(sel.period==="one"?proj.one.total:sel.period==="five"?proj.five.total:proj.ten.total)}
              </div>
              <div className="impact-message">Total partnership value</div>
            </div>
          )}

          <div className="muted mt-3">Average portfolio rate: <strong>{avgPct.toFixed(0)}%</strong> — Expected Volume: <strong>{band.label}</strong></div>
        </div>

        <div className="row mt-4">
          <button
            className="btn primary"
            onClick={async ()=>{
              // TODO: replace with your POST
              console.log("Submitting selection", payload);
              localStorage.setItem("usrad_multi_selection_submitted", JSON.stringify(payload));
              window.location.href = "/providers/onboarding/confirmation"; // or your next step
            }}
            disabled={loading}
          >
            Accept These Rates & Continue
          </button>
        </div>
      </section>
    </div>
  );
}
