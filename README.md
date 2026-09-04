<div align="center">

# 🧠⚡ LATENT SYNAPTIC MEMORY

### `BDH-CQ × FAST WEIGHTS × RECURRENT LATENT REASONING`

<br>

<img src="https://capsule-render.vercel.app/api?type=waving&color=0:0f172a,50:312e81,100:06b6d4&height=220&section=header&text=BDH-CQ%20SYNAPTIC%20MEMORY&fontSize=42&fontColor=ffffff&animation=fadeIn&fontAlignY=38&desc=Deconstructing%20KV-Cache%20Explosion%20through%20Recurrent%20Latent%20Memory&descAlignY=62&descSize=16"/>

<br>

[![🚀 LIVE SUBSTRATE](https://img.shields.io/badge/🚀%20LIVE%20SUBSTRATE-EXPLORE-06b6d4?style=for-the-badge\&logo=vercel\&logoColor=white)](https://bdh-memory-explainer-nexora-7367.vercel.app/)
[![⚡ DATAFORGE 2026](https://img.shields.io/badge/⚡%20DATAFORGE-2026-8b5cf6?style=for-the-badge)](https://pathway.com/)
[![🧠 AI RESEARCH](https://img.shields.io/badge/🧠%20AI%20RESEARCH-FAST%20WEIGHTS-ec4899?style=for-the-badge)](https://arxiv.org/)
[![📜 MIT](https://img.shields.io/badge/📜%20LICENSE-MIT-f59e0b?style=for-the-badge)](LICENSE)

<br><br>

> ### **What if an AI could remember demonstrations without storing every token?**

<br>

**A browser-native exploration of synaptic fast weights, Hebbian plasticity,
recurrent latent reasoning, and associative memory interference.**

<br>

`MEMORY` · `PLASTICITY` · `REASONING` · `INTERFERENCE`

</div>

---

<div align="center">

## 🌌 THE CORE IDEA

### **From Token Memory → Synaptic Memory**

</div>

```text
╔══════════════════════════════════════════════════════════════════════╗
║                         TRADITIONAL MEMORY                           ║
╠══════════════════════════════════════════════════════════════════════╣
║                                                                      ║
║   D₁   D₂   D₃   D₄   D₅   D₆   D₇   D₈   ...   Dₙ                 ║
║    │    │    │    │    │    │    │    │             │               ║
║    └────┴────┴────┴────┴────┴────┴────┴─────────────┘               ║
║                            │                                         ║
║                            ▼                                         ║
║                      ┌─────────────┐                                 ║
║                      │  KV CACHE   │                                 ║
║                      └─────────────┘                                 ║
║                            │                                         ║
║                       O(N · d)                                       ║
║                                                                      ║
╚══════════════════════════════════════════════════════════════════════╝


                              VS.


╔══════════════════════════════════════════════════════════════════════╗
║                          SYNAPTIC MEMORY                             ║
╠══════════════════════════════════════════════════════════════════════╣
║                                                                      ║
║   D₁ ─┐                                                              ║
║   D₂ ─┤                                                              ║
║   D₃ ─┤                                                              ║
║   D₄ ─┤───→  HEBBIAN PLASTICITY  ───→  ┌─────────────┐              ║
║   D₅ ─┤                                  │      W      │              ║
║   D₆ ─┤                                  │    d × d    │              ║
║   Dₙ ─┘                                  └──────┬──────┘              ║
║                                                │                     ║
║                                           O(d²)                     ║
║                                                                      ║
╚══════════════════════════════════════════════════════════════════════╝
```

<br>

### `THE MEMORY DOESN'T GROW.`

### `THE SYNAPTIC STATE LEARNS.`

---

# ⚡ THE PHILOSOPHY

Large language models traditionally carry contextual information through sequences of tokens and attention states.

BDH-style recurrent learning explores a different question:

> **Can contextual experience be written into a compact, reusable internal state?**

Instead of:

```text
Context → Tokens → KV Cache → Attention → Output
```

we explore:

```text
Context
   ↓
Key / Value Encoding
   ↓
Hebbian Plasticity
   ↓
Synaptic Matrix W
   ↓
Latent Recurrence
   ↓
Direct Visual Readout
```

The result is a computational substrate where **memory formation and reasoning become visible mathematical processes.**

---

<div align="center">

# 🧬 SYNAPTIC MEMORY

### `FAST WEIGHTS AS CONTEXT`

</div>

For every contextual demonstration:

$$
(x_t,y_t)
$$

we construct key and value representations:

$$
k_t=f(x_t)
$$

$$
v_t=g(y_t)
$$

The synaptic memory then evolves through:

$$
W_t=(1-\gamma)W_{t-1}+\eta(k_tv_t^T)
$$

### ⚙️ PARAMETERS

| Symbol | Meaning                        |
| :----: | ------------------------------ |
|   `W`  | Synaptic memory matrix         |
|   `γ`  | Synaptic decay                 |
|   `η`  | Plasticity / learning rate     |
|   `k`  | Encoded demonstration key      |
|   `v`  | Associated demonstration value |

The important structural property is:

$$
W\in\mathbb{R}^{d\times d}
$$

The matrix maintains a **fixed dimensionality** as demonstrations accumulate.

---

# 🔄 RECURRENT LATENT REASONING

<div align="center">

```text
INPUT
  │
  ▼
┌──────────────┐
│   LATENT h⁰  │
└──────┬───────┘
       │
       ▼
┌──────────────┐
│   LATENT h¹  │
└──────┬───────┘
       │
       ▼
┌──────────────┐
│   LATENT h²  │
└──────┬───────┘
       │
       ▼
      ...
       │
       ▼
┌──────────────┐
│   LATENT hᵀ  │
└──────┬───────┘
       │
       ▼
🎨 GRID READOUT
```

</div>

The latent state evolves through recurrent transformations:

$$
h^{(\tau+1)}
=
ReLU(h^{(\tau)}W_t+b)
$$

Rather than requiring a serialized textual reasoning chain, the system performs repeated transformations inside a latent workspace.

The final prediction can be decoded directly:

$$
\hat v=qW_t
$$

---

# 🧠 MEMORY AS A DYNAMIC SYSTEM

```text
             ┌─────────────────────────┐
             │       EXPERIENCE        │
             └────────────┬────────────┘
                          │
                          ▼
                 ┌─────────────────┐
                 │  KEY / VALUE    │
                 │   PROJECTION    │
                 └────────┬────────┘
                          │
                          ▼
                 ┌─────────────────┐
                 │    HEBBIAN      │
                 │    UPDATE       │
                 └────────┬────────┘
                          │
                          ▼
               ╔══════════════════════╗
               ║     SYNAPTIC W       ║
               ║                      ║
               ║    d × d MEMORY      ║
               ║                      ║
               ╚══════════╤═══════════╝
                          │
                          ▼
                 ┌─────────────────┐
                 │ LATENT RECURRENT│
                 │    WORKSPACE    │
                 └────────┬────────┘
                          │
                          ▼
                 ┌─────────────────┐
                 │   GRID DECODER  │
                 └────────┬────────┘
                          │
                          ▼
                     🎨 OUTPUT
```

---

# ⚔️ ARCHITECTURAL SHOWDOWN

<div align="center">

|                         |  TRANSFORMER  |   MAMBA / SSM   |          BDH-CQ          |
| :---------------------- | :-----------: | :-------------: | :----------------------: |
| Context representation  |     Tokens    |   Hidden State  |    **Synaptic State**    |
| Memory mechanism        |    KV Cache   | State Evolution |  **Hebbian Plasticity**  |
| Context scaling         |    `O(N·d)`   |      `O(S)`     |        **`O(d²)`**       |
| Reasoning               |   Attention   |    Recurrence   |   **Latent Recurrence**  |
| Textual CoT             | Commonly used |     Optional    |     **Not required**     |
| Memory structure        |    Dynamic    |     Dynamic     | **Fixed dimensionality** |
| Interference experiment |       —       |        —        |       **Built-in**       |

</div>

---

# 💥 THE BEAUTIFUL FAILURE

<div align="center">

## ⚠️ ASSOCIATIVE CROSS-TALK

### **Every memory system has a boundary.**

</div>

For associative retrieval:

$$
\hat v=qW
$$

and:

$$
W=\sum_i k_iv_i^T
$$

therefore:

$$
\hat v
=
\sum_i
\langle q,k_i\rangle v_i
$$

When keys are sufficiently distinct:

```text
k₁ ─────────→ v₁
k₂ ─────────→ v₂
k₃ ─────────→ v₃

       CLEAN
```

But when representations overlap:

```text
             k₁
              ╲
               ╲
                ╲
                 ▼
              ┌──────┐
k₂ ──────────→│  W   │
              └──┬───┘
                 ▲
                ╱
               ╱
              ╱
             k₃

        ⚠️ INTERFERENCE
```

The retrieved value becomes:

$$
v_{target}
+
\sum_{j\neq target}
\langle q,k_j\rangle v_j
$$

The additional terms create **associative cross-talk**.

---

# 🌫️ CUE COLLISION

As representations become increasingly correlated:

```text
0.0 ─────────── 0.2 ─────────── 0.5 ─────────── 0.8 ─────────── 1.0
 │                 │               │               │               │
 ▼                 ▼               ▼               ▼               ▼
CLEAN           MINOR           MIXED          BLURRED          COLLAPSE
```

Conceptually:

```text
LOW COLLISION

█████████
█████████
█████████


          ↓


HIGH COLLISION

██░░██░░█
░██░░██░░
██░░░░███
```

This provides a controllable boundary between:

**association → interference → degradation**

---

# 🧩 WHY ARC-AGI?

ARC-style visual reasoning provides a compact environment for studying:

* abstraction
* few-shot learning
* transformation induction
* relational reasoning
* visual pattern composition
* generalization from demonstrations

A typical task follows:

```text
┌──────────────┐
│ Demonstration│
│      A       │
└──────┬───────┘
       │
       ▼
   INFER RULE
       │
       ▼
┌──────────────┐
│ Demonstration│
│      B       │
└──────┬───────┘
       │
       ▼
     APPLY
       │
       ▼
┌──────────────┐
│   NEW GRID   │
└──────────────┘
```

This makes ARC-style tasks a useful environment for examining how compact representations can support few-shot visual transformations.

---

# 📊 MEMORY SCALING

<div align="center">

### `DEMONSTRATIONS → MEMORY REPRESENTATION`

```text
Demonstrations

  2    3    4    5    6
  │    │    │    │    │
  ▼    ▼    ▼    ▼    ▼

KV CACHE

  ▂    ▃    ▅    ▆    █
  └─────── GROWING ───────→


SYNAPTIC MATRIX

  █    █    █    █    █
  └────── FIXED STATE ─────→
```

</div>

The distinction is not that one architecture has "memory" while another does not.

The distinction is **how contextual information is represented.**

---

# 🎛️ INTERACTIVE PARAMETERS

The live substrate exposes the underlying mechanisms through adjustable controls.

### 🧩 Demonstrations

Controls the number of contextual examples written into memory.

### ⚡ Plasticity

Controls the strength of the Hebbian update.

### 🌫️ Synaptic Decay

Controls how quickly previous associations fade.

### 🔄 Latent Inference Steps

Controls the number of recurrent workspace transformations.

### 💥 Cue Collision

Controls similarity between competing memory representations.

### 🎯 Query Similarity

Controls how strongly the current query activates stored associations.

---

# 🔬 FROM EQUATIONS TO COMPUTATION

The mathematical pipeline becomes executable computation:

```text
                    INPUT
                      │
                      ▼
              ┌───────────────┐
              │ Feature Encode│
              └───────┬───────┘
                      │
                      ▼
                 ┌────────┐
                 │   k    │
                 └───┬────┘
                     │
                     │   ×
                     │
                 ┌───▼────┐
                 │   vᵀ   │
                 └───┬────┘
                     │
                     ▼
              ┌───────────────┐
              │ Hebbian Write │
              └───────┬───────┘
                      │
                      ▼
                ╔═══════════╗
                ║     W     ║
                ║   d × d   ║
                ╚═════╤═════╝
                      │
                      ▼
              ┌───────────────┐
              │   Recurrence  │
              └───────┬───────┘
                      │
                  T STEPS
                      │
                      ▼
              ┌───────────────┐
              │ Linear Decode │
              └───────┬───────┘
                      │
                      ▼
                    OUTPUT
```

---

# 💻 TECH STACK

<div align="center">

![Next.js](https://img.shields.io/badge/Next.js%2016-000000?style=for-the-badge\&logo=next.js)
![React](https://img.shields.io/badge/React%2019-61DAFB?style=for-the-badge\&logo=react\&logoColor=black)
![TypeScript](https://img.shields.io/badge/TypeScript-3178C6?style=for-the-badge\&logo=typescript\&logoColor=white)
![Vercel](https://img.shields.io/badge/Vercel-000000?style=for-the-badge\&logo=vercel)
![ARC](https://img.shields.io/badge/ARC--AGI-Visual%20Reasoning-8B5CF6?style=for-the-badge)

</div>

<br>

| Layer             | Technology                 |
| :---------------- | :------------------------- |
| 🖥️ Frontend      | Next.js 16                 |
| ⚛️ UI             | React 19                   |
| 🧮 Matrix Engine  | TypeScript                 |
| 🧠 Memory         | Hebbian Fast Weights       |
| 🔄 Reasoning      | Recurrent Latent Workspace |
| 🎨 Domain         | ARC-style 3×3 Grid Tasks   |
| ☁️ Deployment     | Vercel                     |
| 🔐 Authentication | None required              |

---

# ⚙️ ENGINEERING

The core computational layer is implemented in:

```text
src/lib/memoryEngine.ts
```

The engine performs:

```text
Matrix Initialization
       ↓
Vector Projection
       ↓
Cosine Similarity
       ↓
Hebbian Memory Update
       ↓
Synaptic State Evolution
       ↓
Latent Recurrence
       ↓
Grid Transformation
       ↓
Prediction
```

The computation is performed directly through TypeScript rather than relying on prerecorded visual states.

---

# 🗂️ PROJECT STRUCTURE

```text
bdh-memory-explainer/
│
├── app/
│   ├── page.tsx
│   ├── layout.tsx
│   └── globals.css
│
├── src/
│   └── lib/
│       └── memoryEngine.ts
│
├── public/
│   └── assets/
│
├── CONCEPT_SUMMARY.pdf
├── package.json
├── README.md
└── LICENSE
```

---

# 🚀 QUICK START

```bash
git clone https://github.com/Adhi426/bdh-memory-explainer.git

cd bdh-memory-explainer

npm install

npm run dev
```

Then open:

```text
http://localhost:3000
```

---

# 🌐 LIVE

<div align="center">

<a href="https://bdh-memory-explainer-nexora-7367.vercel.app/">

<img src="https://img.shields.io/badge/⚡%20ENTER%20THE%20SYNAPTIC%20SUBSTRATE-06b6d4?style=for-the-badge&labelColor=0f172a"/>

</a>

<br><br>

### `MEMORY IS NOT A BUFFER.`

### `MEMORY IS A STATE.`

</div>

---

# 📚 RESEARCH FOUNDATION

### 🧠 The Dragon Hatchling

Kosowski, A., et al. (2025).

*The Dragon Hatchling: The Missing Link between the Transformer and Models of the Brain.*

---

### ⚡ BDH-CQ

Pathway Research (2026).

*BDH-CQ: In-Context Learning with Recurrent Latent Reasoning.*

---

### 🔥 Attention Is All You Need

Vaswani, A., et al. (2017).

*Attention Is All You Need.*

---

# 📄 RESOURCES

<div align="center">

[![LIVE](https://img.shields.io/badge/🚀%20LIVE%20SUBSTRATE-06b6d4?style=for-the-badge)](https://bdh-memory-explainer-nexora-7367.vercel.app/)

[![GITHUB](https://img.shields.io/badge/💻%20SOURCE%20CODE-18181B?style=for-the-badge\&logo=github)](https://github.com/Adhi426/bdh-memory-explainer)

[![PDF](https://img.shields.io/badge/📄%20CONCEPT%20SUMMARY-8B5CF6?style=for-the-badge)](CONCEPT_SUMMARY.pdf)

</div>

---

# 🛡️ SCIENTIFIC DISCLOSURE

This repository is an **interactive research demonstrator** exploring synaptic fast-weight memory and recurrent latent reasoning.

Reported benchmark figures from external publications are not represented as independently reproduced results unless explicitly stated.

The implementation focuses on making the underlying mechanisms:

```text
VISIBLE
   ↓
INTERACTIVE
   ↓
MEASURABLE
   ↓
FALSIFIABLE
```

AI-assisted development was used for portions of architectural ideation and frontend scaffolding under human review.

The mathematical operations, memory updates, similarity calculations, and grid transformations are implemented within the project's computational layer.

---

<div align="center">

<img src="https://capsule-render.vercel.app/api?type=waving&color=0:06b6d4,50:312e81,100:0f172a&height=140&section=footer&animation=fadeIn"/>

# 🧠 `REMEMBER DIFFERENTLY.`

### *From context windows to synaptic state.*

<br>

`HEBBIAN PLASTICITY` · `FAST WEIGHTS` · `LATENT REASONING` · `ARC-AGI`

<br>

**⚡ Explore the substrate → Learn the mechanism → Push the boundary**

</div>
<div align="center">

<br><br>

```text
╔══════════════════════════════════════════════════╗
║                                                  ║
║              🧠  MEMORY IS A STATE               ║
║                                                  ║
║        not just a sequence of tokens.            ║
║                                                  ║
╚══════════════════════════════════════════════════╝
```

<br>

### ✦ **Think. Learn. Remember. Recur.**

`⚡ FAST WEIGHTS` · `🧬 PLASTICITY` · `🔄 RECURRENCE` · `🎨 REASONING`

<br><br>

**Made with ♥ & late-night matrix multiplication.**

<br>

`BDH-CQ SYNAPTIC MEMORY • 2026`

<br><br>

<img src="https://capsule-render.vercel.app/api?type=waving&color=0:06b6d4,50:312e81,100:0f172a&height=100&section=footer&animation=fadeIn"/>

</div>
