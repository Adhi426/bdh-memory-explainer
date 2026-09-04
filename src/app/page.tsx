"use client";

import React, { useState, useMemo } from "react";
import {
  GRID_SIZE,
  PRESET_TASKS,
  runTransformerInference,
  runBDHRecurrentInference,
  cosineSim,
} from "@/lib/memoryEngine";

const COLOR_PALETTE: Record<number, string> = {
  0: "#0f172a",
  1: "#38bdf8",
  2: "#10b981",
  3: "#f59e0b",
  4: "#ef4444",
};

export default function AdvancedExplainer() {
  const [numDemos, setNumDemos] = useState<number>(4);
  const [cueOverlap, setCueOverlap] = useState<number>(0.0);
  const [latentSteps, setLatentSteps] = useState<number>(3);
  const [selectedCell, setSelectedCell] = useState<{ r: number; c: number } | null>(null);

  const activeDemos = useMemo(() => PRESET_TASKS.slice(0, numDemos), [numDemos]);
  const testQuery = PRESET_TASKS[0];

  const tfResult = useMemo(
    () => runTransformerInference(testQuery.inputGrid, activeDemos),
    [testQuery, activeDemos]
  );

  const bdhResult = useMemo(
    () => runBDHRecurrentInference(testQuery.inputGrid, activeDemos, latentSteps, cueOverlap),
    [testQuery, activeDemos, latentSteps, cueOverlap]
  );

  const tfFidelity = cosineSim(tfResult.rawOutput, testQuery.outputGrid);
  const bdhFidelity = cosineSim(bdhResult.rawOutput, testQuery.outputGrid);

  const renderGrid = (grid: number[], label: string, colorAccent: string) => (
    <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "6px" }}>
      <span style={{ fontSize: "11px", color: "#94a3b8", fontWeight: "bold" }}>{label}</span>
      <div
        style={{
          display: "grid",
          gridTemplateColumns: `repeat(${GRID_SIZE}, 24px)`,
          gap: "3px",
          backgroundColor: "#020617",
          padding: "4px",
          borderRadius: "6px",
          border: `1px solid ${colorAccent}`,
        }}
      >
        {grid.map((cellVal, i) => (
          <div
            key={i}
            style={{
              width: "24px",
              height: "24px",
              backgroundColor: COLOR_PALETTE[cellVal] || COLOR_PALETTE[0],
              borderRadius: "3px",
              border: "1px solid rgba(255,255,255,0.1)",
            }}
          />
        ))}
      </div>
    </div>
  );

  return (
    <main style={{ minHeight: "100vh", backgroundColor: "#020617", color: "#f8fafc", padding: "36px 20px", fontFamily: "ui-monospace, monospace" }}>
      <header style={{ maxWidth: "1200px", margin: "0 auto 28px auto", borderBottom: "1px solid #1e293b", paddingBottom: "20px" }}>
        <div style={{ display: "flex", gap: "8px", alignItems: "center", marginBottom: "10px" }}>
          <span style={{ fontSize: "10px", fontWeight: "bold", textTransform: "uppercase", backgroundColor: "#064e3b", color: "#34d399", padding: "3px 8px", borderRadius: "4px", border: "1px solid #059669" }}>
            DataForge 2026: Pathway Track Substrate
          </span>
          <span style={{ fontSize: "11px", color: "#64748b" }}>Primary Case Study: BDH-CQ Latent ARC-AGI-1</span>
        </div>
        <h1 style={{ fontSize: "24px", fontWeight: "800", color: "#ffffff", letterSpacing: "-0.5px" }}>
          Recurrent Latent Reasoning vs. Key-Value Attention in Demonstration Learning
        </h1>
        <p style={{ color: "#94a3b8", fontSize: "13px", lineHeight: "1.6", maxWidth: "950px", marginTop: "8px" }}>
          <strong style={{ color: "#f1f5f9" }}>One-Sentence Claim:</strong> Accumulating demonstrations into fixed synaptic fast weights achieves O(1) memory scaling and sub-cent ARC reasoning without verbal Chain-of-Thought, but incurs associative cross-talk when demonstration cues share low-rank features.
        </p>
      </header>

      {/* Control Console */}
      <section style={{ maxWidth: "1200px", margin: "0 auto 28px auto", display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))", gap: "16px", backgroundColor: "#0f172a", border: "1px solid #1e293b", padding: "20px", borderRadius: "8px" }}>
        <div>
          <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "6px" }}>
            <span style={{ fontSize: "12px", fontWeight: "bold", color: "#cbd5e1" }}>Demonstrations (N):</span>
            <span style={{ fontSize: "12px", color: "#34d399", fontWeight: "bold" }}>{numDemos} pairs</span>
          </div>
          <input
            type="range"
            min="2"
            max="6"
            value={numDemos}
            onChange={(e) => setNumDemos(Number(e.target.value))}
            style={{ width: "100%", cursor: "pointer", accentColor: "#10b981" }}
          />
          <span style={{ fontSize: "11px", color: "#64748b", display: "block", marginTop: "4px" }}>
            Expands KV cache linearly; BDH-CQ matrix stays constant.
          </span>
        </div>

        <div>
          <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "6px" }}>
            <span style={{ fontSize: "12px", fontWeight: "bold", color: "#cbd5e1" }}>Latent Inference Steps (T):</span>
            <span style={{ fontSize: "12px", color: "#34d399", fontWeight: "bold" }}>{latentSteps} cycles</span>
          </div>
          <input
            type="range"
            min="1"
            max="5"
            value={latentSteps}
            onChange={(e) => setLatentSteps(Number(e.target.value))}
            style={{ width: "100%", cursor: "pointer", accentColor: "#10b981" }}
          />
          <span style={{ fontSize: "11px", color: "#64748b", display: "block", marginTop: "4px" }}>
            BDH-CQ internal reasoning cycles without producing tokens.
          </span>
        </div>

        <div>
          <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "6px" }}>
            <span style={{ fontSize: "12px", fontWeight: "bold", color: "#cbd5e1" }}>Subspace Cue Collision:</span>
            <span style={{ fontSize: "12px", color: "#ef4444", fontWeight: "bold" }}>{cueOverlap}</span>
          </div>
          <input
            type="range"
            min="0.0"
            max="0.8"
            step="0.1"
            value={cueOverlap}
            onChange={(e) => setCueOverlap(Number(e.target.value))}
            style={{ width: "100%", cursor: "pointer", accentColor: "#ef4444" }}
          />
          <span style={{ fontSize: "11px", color: "#64748b", display: "block", marginTop: "4px" }}>
            Forces keys to align, demonstrating the associative interference limit.
          </span>
        </div>
      </section>

      {/* Active Demonstrations Strip */}
      <section style={{ maxWidth: "1200px", margin: "0 auto 28px auto", backgroundColor: "#0f172a", border: "1px solid #1e293b", padding: "16px 20px", borderRadius: "8px" }}>
        <span style={{ fontSize: "11px", fontWeight: "bold", color: "#94a3b8", textTransform: "uppercase", letterSpacing: "1px", display: "block", marginBottom: "12px" }}>
          In-Context Demonstrations Loaded in Memory:
        </span>
        <div style={{ display: "flex", gap: "20px", overflowX: "auto", paddingBottom: "6px" }}>
          {activeDemos.map((demo) => (
            <div key={demo.id} style={{ display: "flex", alignItems: "center", gap: "8px", backgroundColor: "#020617", padding: "10px 12px", borderRadius: "6px", border: "1px solid #1e293b" }}>
              {renderGrid(demo.inputGrid, `In #${demo.id}`, "#334155")}
              <span style={{ color: "#64748b", fontSize: "14px" }}>&rarr;</span>
              {renderGrid(demo.outputGrid, `Out #${demo.id}`, "#334155")}
            </div>
          ))}
        </div>
      </section>

      {/* Side-by-Side Evaluation Panels */}
      <section style={{ maxWidth: "1200px", margin: "0 auto 28px auto", display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(340px, 1fr))", gap: "20px" }}>
        {/* PANEL A */}
        <div style={{ backgroundColor: "#0f172a", border: "1px solid #1e293b", borderRadius: "8px", padding: "20px" }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "16px" }}>
            <div>
              <h2 style={{ fontSize: "15px", fontWeight: "bold", color: "#38bdf8" }}>Standard Transformer Attention</h2>
              <span style={{ fontSize: "11px", color: "#64748b" }}>Explicit Token-by-Token KV Memory</span>
            </div>
            <span style={{ fontSize: "11px", backgroundColor: "#0c4a6e", color: "#7dd3fc", border: "1px solid #0284c7", padding: "2px 6px", borderRadius: "4px" }}>
              O(N) Space
            </span>
          </div>

          <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "10px", marginBottom: "16px" }}>
            <div style={{ backgroundColor: "#020617", border: "1px solid #1e293b", padding: "10px", borderRadius: "6px" }}>
              <span style={{ fontSize: "10px", color: "#64748b", display: "block" }}>KV VRAM Buffer</span>
              <span style={{ fontSize: "16px", fontWeight: "bold", color: "#38bdf8" }}>{tfResult.memoryBytes} B</span>
            </div>
            <div style={{ backgroundColor: "#020617", border: "1px solid #1e293b", padding: "10px", borderRadius: "6px" }}>
              <span style={{ fontSize: "10px", color: "#64748b", display: "block" }}>Cost / Task</span>
              <span style={{ fontSize: "16px", fontWeight: "bold", color: "#f59e0b" }}>${tfResult.costUSD.toFixed(4)}</span>
            </div>
            <div style={{ backgroundColor: "#020617", border: "1px solid #1e293b", padding: "10px", borderRadius: "6px" }}>
              <span style={{ fontSize: "10px", color: "#64748b", display: "block" }}>Fidelity</span>
              <span style={{ fontSize: "16px", fontWeight: "bold", color: "#34d399" }}>{tfFidelity}</span>
            </div>
          </div>

          <div style={{ display: "flex", justifyContent: "space-around", alignItems: "center", backgroundColor: "#020617", border: "1px solid #1e293b", padding: "16px", borderRadius: "6px" }}>
            {renderGrid(testQuery.inputGrid, "Query Input", "#38bdf8")}
            <span style={{ color: "#64748b" }}>&rarr;</span>
            {renderGrid(tfResult.outputGrid, "Predicted Output", "#38bdf8")}
          </div>
        </div>

        {/* PANEL B */}
        <div style={{ backgroundColor: "#0f172a", border: "1px solid #1e293b", borderRadius: "8px", padding: "20px" }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "16px" }}>
            <div>
              <h2 style={{ fontSize: "15px", fontWeight: "bold", color: "#34d399" }}>BDH-CQ (Latent Synaptic Memory)</h2>
              <span style={{ fontSize: "11px", color: "#64748b" }}>Recurrent Workspace Reasoning</span>
            </div>
            <span style={{ fontSize: "11px", backgroundColor: "#064e3b", color: "#6ee7b7", border: "1px solid #059669", padding: "2px 6px", borderRadius: "4px" }}>
              O(1) State
            </span>
          </div>

          <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "10px", marginBottom: "16px" }}>
            <div style={{ backgroundColor: "#020617", border: "1px solid #1e293b", padding: "10px", borderRadius: "6px" }}>
              <span style={{ fontSize: "10px", color: "#64748b", display: "block" }}>Synaptic State</span>
              <span style={{ fontSize: "16px", fontWeight: "bold", color: "#f8fafc" }}>{bdhResult.memoryBytes} B</span>
            </div>
            <div style={{ backgroundColor: "#020617", border: "1px solid #1e293b", padding: "10px", borderRadius: "6px" }}>
              <span style={{ fontSize: "10px", color: "#64748b", display: "block" }}>Cost / Task</span>
              <span style={{ fontSize: "16px", fontWeight: "bold", color: "#34d399" }}>${bdhResult.costUSD.toFixed(4)}</span>
            </div>
            <div style={{ backgroundColor: "#020617", border: "1px solid #1e293b", padding: "10px", borderRadius: "6px" }}>
              <span style={{ fontSize: "10px", color: "#64748b", display: "block" }}>Fidelity</span>
              <span style={{ fontSize: "16px", fontWeight: "bold", color: bdhFidelity < 0.7 ? "#ef4444" : "#34d399" }}>
                {bdhFidelity}
              </span>
            </div>
          </div>

          <div style={{ display: "flex", justifyContent: "space-around", alignItems: "center", backgroundColor: "#020617", border: "1px solid #1e293b", padding: "16px", borderRadius: "6px" }}>
            {renderGrid(testQuery.inputGrid, "Query Input", "#34d399")}
            <span style={{ color: "#64748b" }}>&rarr;</span>
            {renderGrid(bdhResult.outputGrid, "Latent Solved Grid", bdhFidelity < 0.7 ? "#ef4444" : "#34d399")}
          </div>
        </div>
      </section>

      {/* Synaptic Matrix Inspection Heatmap */}
      <section style={{ maxWidth: "1200px", margin: "0 auto", backgroundColor: "#0f172a", border: "1px solid #1e293b", padding: "20px", borderRadius: "8px" }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "12px" }}>
          <div>
            <span style={{ fontSize: "12px", fontWeight: "bold", textTransform: "uppercase", letterSpacing: "1px", color: "#cbd5e1" }}>
              BDH Synaptic Connection Fabric (9x9 Matrix)
            </span>
            <span style={{ fontSize: "11px", color: "#64748b", display: "block" }}>
              Hover over matrix synapses to inspect associative weights mapping input pixels to output pixels.
            </span>
          </div>
          {selectedCell && (
            <span style={{ fontSize: "11px", color: "#34d399", backgroundColor: "#020617", padding: "4px 8px", borderRadius: "4px", border: "1px solid #1e293b" }}>
              Synapse [In Cell {selectedCell.r} &rarr; Out Cell {selectedCell.c}]: {bdhResult.synapticMatrix[selectedCell.r][selectedCell.c].toFixed(3)}
            </span>
          )}
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(9, 1fr)", gap: "4px", backgroundColor: "#020617", padding: "12px", borderRadius: "6px" }}>
          {bdhResult.synapticMatrix.map((row, rIdx) =>
            row.map((weight, cIdx) => (
              <div
                key={`${rIdx}-${cIdx}`}
                onMouseEnter={() => setSelectedCell({ r: rIdx, c: cIdx })}
                style={{
                  height: "28px",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontSize: "9px",
                  borderRadius: "2px",
                  cursor: "crosshair",
                  backgroundColor: `rgba(16, 185, 129, ${Math.min(0.9, Math.abs(weight) * 0.4 + 0.05)})`,
                  color: "#f8fafc",
                  border: "1px solid rgba(255, 255, 255, 0.05)",
                }}
              >
                {weight.toFixed(1)}
              </div>
            ))
          )}
        </div>
      </section>
    </main>
  );
}