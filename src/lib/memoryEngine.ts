export const GRID_SIZE = 3;
export const FEATURE_DIM = GRID_SIZE * GRID_SIZE;

export interface ARCTaskPair {
  id: number;
  inputGrid: number[];
  outputGrid: number[];
  ruleName: string;
}

export const PRESET_TASKS: ARCTaskPair[] = [
  {
    id: 1,
    inputGrid:  [1, 0, 0, 0, 1, 0, 0, 0, 1],
    outputGrid: [2, 0, 0, 0, 2, 0, 0, 0, 2],
    ruleName: "Color Transform: Blue to Green",
  },
  {
    id: 2,
    inputGrid:  [0, 1, 0, 1, 1, 1, 0, 1, 0],
    outputGrid: [0, 2, 0, 2, 2, 2, 0, 2, 0],
    ruleName: "Cross Geometry Shift",
  },
  {
    id: 3,
    inputGrid:  [1, 1, 0, 1, 0, 0, 0, 0, 0],
    outputGrid: [2, 2, 0, 2, 0, 0, 0, 0, 0],
    ruleName: "Top-Left Cluster",
  },
  {
    id: 4,
    inputGrid:  [0, 0, 0, 0, 1, 0, 0, 0, 0],
    outputGrid: [0, 0, 0, 0, 2, 0, 0, 0, 0],
    ruleName: "Center Dot Preservation",
  },
  {
    id: 5,
    inputGrid:  [1, 0, 1, 0, 1, 0, 1, 0, 1],
    outputGrid: [2, 0, 2, 0, 2, 0, 2, 0, 2],
    ruleName: "Symmetric X Map",
  },
  {
    id: 6,
    inputGrid:  [1, 1, 1, 0, 0, 0, 0, 0, 0],
    outputGrid: [2, 2, 2, 0, 0, 0, 0, 0, 0],
    ruleName: "Horizontal Stripe",
  },
];

export function normalizeVector(v: number[]): number[] {
  const norm = Math.sqrt(v.reduce((sum, x) => sum + x * x, 0)) || 1;
  return v.map((x) => x / norm);
}

export function cosineSim(a: number[], b: number[]): number {
  let dot = 0;
  let normA = 0;
  let normB = 0;
  for (let i = 0; i < a.length; i++) {
    dot += a[i] * b[i];
    normA += a[i] * a[i];
    normB += b[i] * b[i];
  }
  if (!normA || !normB) return 0;
  return Number((dot / (Math.sqrt(normA) * Math.sqrt(normB))).toFixed(3));
}

export function runTransformerInference(
  queryGrid: number[],
  demonstrations: ARCTaskPair[]
) {
  const qNorm = normalizeVector(queryGrid);
  const keys = demonstrations.map((d) => normalizeVector(d.inputGrid));
  const values = demonstrations.map((d) => d.outputGrid);

  const scores = keys.map((k) =>
    qNorm.reduce((sum, val, i) => sum + val * k[i], 0) * 4
  );
  const maxScore = Math.max(...scores);
  const expScores = scores.map((s) => Math.exp(s - maxScore));
  const sumExp = expScores.reduce((a, b) => a + b, 0);
  const weights = expScores.map((s) => s / (sumExp || 1));

  const outputGrid = new Array(FEATURE_DIM).fill(0);
  demonstrations.forEach((_, idx) => {
    const w = weights[idx];
    values[idx].forEach((v, cellIdx) => {
      outputGrid[cellIdx] += w * v;
    });
  });

  const discreteOutput = outputGrid.map((val) => Math.round(val));
  const memoryBytes = demonstrations.length * 2 * FEATURE_DIM * 4;
  const costUSD = demonstrations.length * 0.0018;

  return {
    outputGrid: discreteOutput,
    rawOutput: outputGrid,
    memoryBytes,
    costUSD,
    attentionWeights: weights,
  };
}

export function runBDHRecurrentInference(
  queryGrid: number[],
  demonstrations: ARCTaskPair[],
  latentRecurrenceSteps: number,
  cueOverlapNoise: number
) {
  let W: number[][] = Array.from({ length: FEATURE_DIM }, () =>
    new Array(FEATURE_DIM).fill(0)
  );

  demonstrations.forEach((demo) => {
    const k = normalizeVector(
      demo.inputGrid.map((val, idx) => (1 - cueOverlapNoise) * val + cueOverlapNoise * (idx % 2))
    );
    const v = demo.outputGrid;

    for (let r = 0; r < FEATURE_DIM; r++) {
      for (let c = 0; c < FEATURE_DIM; c++) {
        W[r][c] += 0.35 * (k[r] * v[c]);
      }
    }
  });

  let latentState = [...queryGrid];
  for (let t = 0; t < latentRecurrenceSteps; t++) {
    const nextLatent = new Array(FEATURE_DIM).fill(0);
    for (let c = 0; c < FEATURE_DIM; c++) {
      for (let r = 0; r < FEATURE_DIM; r++) {
        nextLatent[c] += latentState[r] * W[r][c];
      }
      nextLatent[c] = Math.max(0, nextLatent[c]);
    }
    latentState = latentState.map((prev, idx) => 0.4 * prev + 0.6 * nextLatent[idx]);
  }

  const discreteOutput = latentState.map((val) => Math.min(4, Math.round(val)));
  const memoryBytes = FEATURE_DIM * FEATURE_DIM * 4;
  const costUSD = 0.0007;

  return {
    outputGrid: discreteOutput,
    rawOutput: latentState,
    synapticMatrix: W,
    memoryBytes,
    costUSD,
  };
}