"use client";

import { useMemo, useState } from "react";
import styles from "./page.module.css";

// ─── Types ───────────────────────────────────────────────────────────────────

type Setup = {
  wheelWidth: string;
  wheelDia: string;
  et: string;
  tyreWidth: string;
  aspectRatio: string;
};

type Calcs = {
  wheelWidthMm: number;
  wheelDiaMm: number;
  et: number;
  tyreWidthMm: number;
  sidewall: number;
  overallDiameter: number;
  overallRadius: number;
  outerFromHub: number;
  innerFromHub: number;
  valid: boolean;
};

// ─── Defaults ────────────────────────────────────────────────────────────────

const DEFAULT_CUR: Setup = {
  wheelWidth: "9.5",
  wheelDia: "19",
  et: "35",
  tyreWidth: "235",
  aspectRatio: "35",
};

const DEFAULT_NEW: Setup = {
  wheelWidth: "10",
  wheelDia: "20",
  et: "30",
  tyreWidth: "255",
  aspectRatio: "30",
};

// ─── Maths ───────────────────────────────────────────────────────────────────

function compute(s: Setup): Calcs {
  const ww = parseFloat(s.wheelWidth);
  const wd = parseFloat(s.wheelDia);
  const et = parseFloat(s.et);
  const tw = parseFloat(s.tyreWidth);
  const ar = parseFloat(s.aspectRatio);

  if (
    isNaN(ww) || ww <= 0 ||
    isNaN(wd) || wd <= 0 ||
    isNaN(et) ||
    isNaN(tw) || tw <= 0 ||
    isNaN(ar) || ar <= 0
  ) {
    return {
      wheelWidthMm: 0, wheelDiaMm: 0, et: 0, tyreWidthMm: 0,
      sidewall: 0, overallDiameter: 0, overallRadius: 0,
      outerFromHub: 0, innerFromHub: 0, valid: false,
    };
  }

  const wheelWidthMm  = ww * 25.4;
  const wheelDiaMm    = wd * 25.4;
  const sidewall      = tw * ar / 100;
  const overallDiameter = wheelDiaMm + sidewall * 2;
  const overallRadius = overallDiameter / 2;
  const outerFromHub  = wheelWidthMm / 2 - et;
  const innerFromHub  = wheelWidthMm / 2 + et;

  return {
    wheelWidthMm, wheelDiaMm, et, tyreWidthMm: tw,
    sidewall, overallDiameter, overallRadius,
    outerFromHub, innerFromHub, valid: true,
  };
}

function signed(n: number, dp = 1) {
  const s = n.toFixed(dp);
  return n >= 0 ? `+${s}` : s;
}

// ─── SVG diagram constants ────────────────────────────────────────────────────

const VW        = 700;
const VH        = 400;
const HUB_X     = VW / 2;
const HUB_Y     = VH / 2 + 18;
const PAD       = 60;
const CUR_COLOR = "#5b9cf6";
const NEW_COLOR = "#e03535";

function getScale(c: Calcs, n: Calcs): number {
  const refs = [c, n].filter((r) => r.valid);
  if (!refs.length) return 0.5;

  const maxAxial = Math.max(
    ...refs.map((r) =>
      Math.max(r.outerFromHub, r.innerFromHub) +
      Math.max(0, (r.tyreWidthMm - r.wheelWidthMm) / 2) + 8
    ),
    70,
  );
  const maxRad = Math.max(...refs.map((r) => r.overallRadius), 180);

  return Math.min(
    (HUB_X - PAD) / maxAxial,
    (HUB_Y - PAD) / maxRad,
  );
}

type Geom = {
  tyreCX: number;
  outerX: number;
  innerX: number;
  tyreLeft: number;
  tyreRight: number;
  tyreTopY: number;
  tyreBotY: number;
  rimTopY: number;
  rimBotY: number;
};

function buildGeom(c: Calcs, s: number): Geom {
  const tyreCX    = HUB_X - c.et * s;
  const outerX    = HUB_X + c.outerFromHub * s;
  const innerX    = HUB_X - c.innerFromHub * s;
  const tyreHW    = (c.tyreWidthMm / 2) * s;
  const radPx     = c.overallRadius * s;
  const rimRadPx  = (c.wheelDiaMm / 2) * s;
  return {
    tyreCX, outerX, innerX,
    tyreLeft: tyreCX - tyreHW,
    tyreRight: tyreCX + tyreHW,
    tyreTopY: HUB_Y - radPx,
    tyreBotY: HUB_Y + radPx,
    rimTopY:  HUB_Y - rimRadPx,
    rimBotY:  HUB_Y + rimRadPx,
  };
}

// ─── SVG Diagram ─────────────────────────────────────────────────────────────

function Diagram({ cur, nw }: { cur: Calcs; nw: Calcs }) {
  const scale = getScale(cur, nw);
  const cg = cur.valid ? buildGeom(cur, scale) : null;
  const ng  = nw.valid  ? buildGeom(nw, scale)  : null;

  const groundY = Math.max(cg?.tyreBotY ?? HUB_Y + 10, ng?.tyreBotY ?? HUB_Y + 10) + 10;

  const stanceDiff = cur.valid && nw.valid ? nw.outerFromHub - cur.outerFromHub : 0;
  const showDimension = cg && ng && Math.abs(ng.outerX - cg.outerX) > 4;

  const gridX = Array.from({ length: Math.ceil(VW / 40) + 1 }, (_, i) => i * 40);
  const gridY = Array.from({ length: Math.ceil(VH / 40) + 1 }, (_, i) => i * 40);

  return (
    <svg
      viewBox={`0 0 ${VW} ${VH}`}
      style={{ width: "100%", height: "auto", display: "block" }}
      aria-label="Wheel fitment cross-section comparison diagram"
    >
      {/* Background */}
      <rect width={VW} height={VH} fill="#110f0d" />

      {/* Subtle warm grid */}
      {gridX.map((x) => (
        <line key={`vg${x}`} x1={x} y1={0} x2={x} y2={VH} stroke="rgba(230,210,186,0.04)" strokeWidth={1} />
      ))}
      {gridY.map((y) => (
        <line key={`hg${y}`} x1={0} y1={y} x2={VW} y2={y} stroke="rgba(230,210,186,0.04)" strokeWidth={1} />
      ))}

      {/* Ground */}
      <line x1={0} y1={groundY} x2={VW} y2={groundY} stroke="rgba(230,210,186,0.22)" strokeWidth={1.5} />
      <text x={VW - 12} y={groundY - 7} textAnchor="end" fill="rgba(230,210,186,0.32)" fontSize={9} fontFamily="monospace" letterSpacing={1}>
        GROUND
      </text>

      {/* Axle dashed line */}
      <line x1={20} y1={HUB_Y} x2={VW - 20} y2={HUB_Y} stroke="rgba(230,210,186,0.2)" strokeWidth={1} strokeDasharray="5 4" />

      {/* Direction labels */}
      <text x={VW - 14} y={HUB_Y - 16} textAnchor="end" fill="rgba(230,210,186,0.32)" fontSize={9} fontFamily="monospace" letterSpacing={1}>
        OUTER →
      </text>
      <text x={14} y={HUB_Y - 16} textAnchor="start" fill="rgba(230,210,186,0.32)" fontSize={9} fontFamily="monospace" letterSpacing={1}>
        ← INNER
      </text>

      {/* ── Current setup ── */}
      {cg && (
        <g>
          {/* Tyre envelope */}
          <rect
            x={cg.tyreLeft} y={cg.tyreTopY}
            width={cg.tyreRight - cg.tyreLeft}
            height={cg.tyreBotY - cg.tyreTopY}
            fill={CUR_COLOR} fillOpacity={0.07}
            stroke={CUR_COLOR} strokeOpacity={0.45} strokeWidth={1.5}
            rx={10}
          />
          {/* Tyre sidewall highlight — top strip */}
          <rect
            x={cg.tyreLeft} y={cg.tyreTopY}
            width={cg.tyreRight - cg.tyreLeft}
            height={(cg.rimTopY - cg.tyreTopY)}
            fill={CUR_COLOR} fillOpacity={0.04}
            rx={10}
          />
          {/* Wheel barrel */}
          <rect
            x={cg.innerX} y={cg.rimTopY}
            width={cg.outerX - cg.innerX}
            height={cg.rimBotY - cg.rimTopY}
            fill={CUR_COLOR} fillOpacity={0.16}
            stroke={CUR_COLOR} strokeOpacity={0.8} strokeWidth={1.5}
          />
          {/* Lip ticks */}
          <line x1={cg.outerX} y1={HUB_Y - 10} x2={cg.outerX} y2={HUB_Y + 10} stroke={CUR_COLOR} strokeWidth={2.5} />
          <line x1={cg.innerX} y1={HUB_Y - 10} x2={cg.innerX} y2={HUB_Y + 10} stroke={CUR_COLOR} strokeWidth={2.5} />
          {/* Label */}
          <text x={cg.tyreCX} y={cg.tyreTopY - 9} textAnchor="middle" fill={CUR_COLOR} fontSize={9} fontFamily="monospace" fillOpacity={0.85} letterSpacing={1}>
            CURRENT
          </text>
          {/* Outer lip label */}
          <text x={cg.outerX + 5} y={HUB_Y + 22} fill={CUR_COLOR} fontSize={9} fontFamily="monospace" fillOpacity={0.75}>
            {cur.outerFromHub.toFixed(0)}mm
          </text>
        </g>
      )}

      {/* ── New setup ── */}
      {ng && (
        <g>
          {/* Tyre envelope */}
          <rect
            x={ng.tyreLeft} y={ng.tyreTopY}
            width={ng.tyreRight - ng.tyreLeft}
            height={ng.tyreBotY - ng.tyreTopY}
            fill={NEW_COLOR} fillOpacity={0.09}
            stroke={NEW_COLOR} strokeOpacity={0.45} strokeWidth={1.5}
            rx={10}
          />
          {/* Tyre sidewall highlight — top strip */}
          <rect
            x={ng.tyreLeft} y={ng.tyreTopY}
            width={ng.tyreRight - ng.tyreLeft}
            height={(ng.rimTopY - ng.tyreTopY)}
            fill={NEW_COLOR} fillOpacity={0.04}
            rx={10}
          />
          {/* Wheel barrel */}
          <rect
            x={ng.innerX} y={ng.rimTopY}
            width={ng.outerX - ng.innerX}
            height={ng.rimBotY - ng.rimTopY}
            fill={NEW_COLOR} fillOpacity={0.18}
            stroke={NEW_COLOR} strokeOpacity={0.8} strokeWidth={1.5}
          />
          {/* Lip ticks */}
          <line x1={ng.outerX} y1={HUB_Y - 10} x2={ng.outerX} y2={HUB_Y + 10} stroke={NEW_COLOR} strokeWidth={2.5} />
          <line x1={ng.innerX} y1={HUB_Y - 10} x2={ng.innerX} y2={HUB_Y + 10} stroke={NEW_COLOR} strokeWidth={2.5} />
          {/* Label */}
          <text x={ng.tyreCX} y={ng.tyreTopY - 9} textAnchor="middle" fill={NEW_COLOR} fontSize={9} fontFamily="monospace" fillOpacity={0.85} letterSpacing={1}>
            NEW
          </text>
          {/* Outer lip label */}
          <text x={ng.outerX + 5} y={HUB_Y + 34} fill={NEW_COLOR} fontSize={9} fontFamily="monospace" fillOpacity={0.75}>
            {nw.outerFromHub.toFixed(0)}mm
          </text>
        </g>
      )}

      {/* ── Stance diff dimension line ── */}
      {showDimension && cg && ng && (
        <>
          <line
            x1={cg.outerX} y1={HUB_Y + 50} x2={ng.outerX} y2={HUB_Y + 50}
            stroke="rgba(230,210,186,0.45)" strokeWidth={1}
          />
          <line x1={cg.outerX} y1={HUB_Y + 44} x2={cg.outerX} y2={HUB_Y + 56} stroke="rgba(230,210,186,0.45)" strokeWidth={1} />
          <line x1={ng.outerX}  y1={HUB_Y + 44} x2={ng.outerX}  y2={HUB_Y + 56} stroke="rgba(230,210,186,0.45)" strokeWidth={1} />
          <text
            x={(cg.outerX + ng.outerX) / 2} y={HUB_Y + 68}
            textAnchor="middle" fill="rgba(230,210,186,0.6)"
            fontSize={9} fontFamily="monospace"
          >
            {stanceDiff >= 0 ? `+${stanceDiff.toFixed(1)}` : stanceDiff.toFixed(1)}mm stance
          </text>
        </>
      )}

      {/* ── Hub centre ── */}
      <line x1={HUB_X} y1={6} x2={HUB_X} y2={VH - 6} stroke="rgba(230,210,186,0.38)" strokeWidth={1} strokeDasharray="8 5" />
      <text x={HUB_X} y={18} textAnchor="middle" fill="rgba(230,210,186,0.35)" fontSize={9} fontFamily="monospace" letterSpacing={1}>
        HUB
      </text>

      {/* Hub bolt graphic */}
      <circle cx={HUB_X} cy={HUB_Y} r={8} fill="#1e1a17" stroke="rgba(230,210,186,0.55)" strokeWidth={1.5} />
      <circle cx={HUB_X} cy={HUB_Y} r={3} fill="rgba(230,210,186,0.65)" />

      {/* ── Legend ── */}
      <rect x={14} y={VH - 28} width={9} height={9} fill={CUR_COLOR} fillOpacity={0.85} />
      <text x={27} y={VH - 20} fill={CUR_COLOR} fontSize={10} fontFamily="monospace" fillOpacity={0.9}>
        Current
      </text>
      <rect x={90} y={VH - 28} width={9} height={9} fill={NEW_COLOR} fillOpacity={0.85} />
      <text x={103} y={VH - 20} fill={NEW_COLOR} fontSize={10} fontFamily="monospace" fillOpacity={0.9}>
        New
      </text>
    </svg>
  );
}

// ─── Field component ──────────────────────────────────────────────────────────

function Field({
  label, unit, value, onChange, placeholder,
}: {
  label: string;
  unit: string;
  value: string;
  onChange: (v: string) => void;
  placeholder: string;
}) {
  return (
    <label className={styles.field}>
      <span className={styles.fieldLabel}>{label}</span>
      <div className={styles.fieldRow}>
        <input
          type="number"
          inputMode="decimal"
          step="any"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder={placeholder}
          className={styles.input}
        />
        <span className={styles.unit}>{unit}</span>
      </div>
    </label>
  );
}

// ─── Result card ─────────────────────────────────────────────────────────────

function ResultCard({
  label, value, note, warn = false,
}: {
  label: string;
  value: string;
  note: string;
  warn?: boolean;
}) {
  return (
    <div className={`${styles.resultCard} ${warn ? styles.resultWarn : ""}`}>
      <p className={styles.resultLabel}>{label}</p>
      <p className={`${styles.resultValue} ${warn ? styles.resultValueWarn : ""}`}>{value}</p>
      <p className={styles.resultNote}>{note}</p>
    </div>
  );
}

// ─── Main export ─────────────────────────────────────────────────────────────

export function FitmentToolClient() {
  const [cur, setCur] = useState<Setup>(DEFAULT_CUR);
  const [nw,  setNw]  = useState<Setup>(DEFAULT_NEW);

  const cCalcs = useMemo(() => compute(cur), [cur]);
  const nCalcs = useMemo(() => compute(nw),  [nw]);

  const both = cCalcs.valid && nCalcs.valid;

  const diamDiff   = both ? nCalcs.overallDiameter - cCalcs.overallDiameter : 0;
  const stanceDiff = both ? nCalcs.outerFromHub - cCalcs.outerFromHub : 0;
  const innerDiff  = both ? nCalcs.innerFromHub  - cCalcs.innerFromHub  : 0;
  const speedoErr  = both
    ? ((nCalcs.overallDiameter - cCalcs.overallDiameter) / cCalcs.overallDiameter) * 100
    : 0;

  function setCurField(k: keyof Setup, v: string) {
    setCur((p) => ({ ...p, [k]: v }));
  }
  function setNwField(k: keyof Setup, v: string) {
    setNw((p) => ({ ...p, [k]: v }));
  }

  return (
    <div className={styles.tool}>

      {/* ── Inputs ── */}
      <div className={styles.inputWrap}>
        {/* Current column */}
        <div className={styles.col}>
          <div className={styles.colHead}>
            <span className={styles.colDot} style={{ background: CUR_COLOR }} />
            <span className={styles.colTitle}>Current Setup</span>
          </div>
          <Field label="Wheel Width"    unit="in"  value={cur.wheelWidth}   onChange={(v) => setCurField("wheelWidth", v)}   placeholder="e.g. 9.5" />
          <Field label="Wheel Diameter" unit="in"  value={cur.wheelDia}     onChange={(v) => setCurField("wheelDia", v)}     placeholder="e.g. 19" />
          <Field label="Offset / ET"    unit="mm"  value={cur.et}           onChange={(v) => setCurField("et", v)}           placeholder="e.g. 35" />
          <Field label="Tyre Width"     unit="mm"  value={cur.tyreWidth}    onChange={(v) => setCurField("tyreWidth", v)}    placeholder="e.g. 235" />
          <Field label="Aspect Ratio"   unit="%"   value={cur.aspectRatio}  onChange={(v) => setCurField("aspectRatio", v)}  placeholder="e.g. 35" />
          {cCalcs.valid && (
            <div className={styles.miniCalc}>
              <span>{cCalcs.overallDiameter.toFixed(0)}mm OD</span>
              <span>·</span>
              <span>{cCalcs.outerFromHub.toFixed(0)}mm poke</span>
              <span>·</span>
              <span>{cCalcs.sidewall.toFixed(0)}mm wall</span>
            </div>
          )}
        </div>

        <div className={styles.divider} aria-hidden />

        {/* New column */}
        <div className={styles.col}>
          <div className={styles.colHead}>
            <span className={styles.colDot} style={{ background: NEW_COLOR }} />
            <span className={styles.colTitle}>New Setup</span>
          </div>
          <Field label="Wheel Width"    unit="in"  value={nw.wheelWidth}   onChange={(v) => setNwField("wheelWidth", v)}   placeholder="e.g. 10" />
          <Field label="Wheel Diameter" unit="in"  value={nw.wheelDia}     onChange={(v) => setNwField("wheelDia", v)}     placeholder="e.g. 20" />
          <Field label="Offset / ET"    unit="mm"  value={nw.et}           onChange={(v) => setNwField("et", v)}           placeholder="e.g. 30" />
          <Field label="Tyre Width"     unit="mm"  value={nw.tyreWidth}    onChange={(v) => setNwField("tyreWidth", v)}    placeholder="e.g. 255" />
          <Field label="Aspect Ratio"   unit="%"   value={nw.aspectRatio}  onChange={(v) => setNwField("aspectRatio", v)}  placeholder="e.g. 30" />
          {nCalcs.valid && (
            <div className={styles.miniCalc}>
              <span>{nCalcs.overallDiameter.toFixed(0)}mm OD</span>
              <span>·</span>
              <span>{nCalcs.outerFromHub.toFixed(0)}mm poke</span>
              <span>·</span>
              <span>{nCalcs.sidewall.toFixed(0)}mm wall</span>
            </div>
          )}
        </div>
      </div>

      {/* ── Diagram ── */}
      <div className={styles.diagramWrap}>
        <p className={styles.diagramCaption}>Cross-section · axle view from behind · hub centre reference</p>
        <Diagram cur={cCalcs} nw={nCalcs} />
      </div>

      {/* ── Results ── */}
      {both && (
        <div className={styles.results}>
          <ResultCard
            label="Diameter Difference"
            value={`${signed(diamDiff)} mm`}
            note={
              diamDiff > 0 ? "New tyre is taller — higher than stock"
              : diamDiff < 0 ? "New tyre is shorter — lower than stock"
              : "Same overall diameter"
            }
          />
          <ResultCard
            label="Stance Difference"
            value={`${signed(stanceDiff)} mm`}
            note={
              stanceDiff > 0 ? "More poke — outer lip further out"
              : stanceDiff < 0 ? "More tuck — outer lip recedes"
              : "Same outer position"
            }
          />
          <ResultCard
            label="Inner Clearance"
            value={`${signed(innerDiff)} mm`}
            note={
              innerDiff > 5 ? "Significant extra intrusion — verify clearance"
              : innerDiff > 0 ? "Slight extra intrusion — check clearance"
              : innerDiff < 0 ? "Less intrusion — more clearance"
              : "Same inner position"
            }
            warn={innerDiff > 5}
          />
          <ResultCard
            label="Speedo Error"
            value={`${signed(speedoErr, 2)} %`}
            note={
              Math.abs(speedoErr) > 2
                ? `${Math.abs(speedoErr).toFixed(1)}% deviation — noticeable, tune recommended`
                : "Within acceptable range"
            }
            warn={Math.abs(speedoErr) > 2}
          />
        </div>
      )}

      {/* ── Breakdown ── */}
      {both && (
        <details className={styles.breakdown}>
          <summary className={styles.breakdownToggle}>Calculation breakdown</summary>
          <div className={styles.breakdownGrid}>
            <div>
              <p className={styles.breakdownHead} style={{ color: CUR_COLOR }}>Current</p>
              <p>Wheel width: {cCalcs.wheelWidthMm.toFixed(1)} mm</p>
              <p>Wheel diameter: {cCalcs.wheelDiaMm.toFixed(1)} mm</p>
              <p>Sidewall height: {cCalcs.sidewall.toFixed(1)} mm</p>
              <p>Overall diameter: {cCalcs.overallDiameter.toFixed(1)} mm</p>
              <p>Overall radius: {cCalcs.overallRadius.toFixed(1)} mm</p>
              <p>Outer from hub: {cCalcs.outerFromHub.toFixed(1)} mm</p>
              <p>Inner from hub: {cCalcs.innerFromHub.toFixed(1)} mm</p>
            </div>
            <div>
              <p className={styles.breakdownHead} style={{ color: NEW_COLOR }}>New</p>
              <p>Wheel width: {nCalcs.wheelWidthMm.toFixed(1)} mm</p>
              <p>Wheel diameter: {nCalcs.wheelDiaMm.toFixed(1)} mm</p>
              <p>Sidewall height: {nCalcs.sidewall.toFixed(1)} mm</p>
              <p>Overall diameter: {nCalcs.overallDiameter.toFixed(1)} mm</p>
              <p>Overall radius: {nCalcs.overallRadius.toFixed(1)} mm</p>
              <p>Outer from hub: {nCalcs.outerFromHub.toFixed(1)} mm</p>
              <p>Inner from hub: {nCalcs.innerFromHub.toFixed(1)} mm</p>
            </div>
          </div>
        </details>
      )}
    </div>
  );
}
