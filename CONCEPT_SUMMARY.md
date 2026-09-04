# Associative Recurrent State vs. Key-Value Attention in In-Context Demonstration Learning

**Adhithya Navaneethakrishnan** | DataForge 2026: Pathway Track (NeurIPS 2026 Education Format)  
**Artifact URL:** https://bdh-memory-explainer-nexora-7367.vercel.app/  
**Source Code:** https://github.com/Adhi426/bdh-memory-explainer  

---

### 1. Problem Definition & Architectural Motivation
Standard Transformers process in-context demonstrations (e.g., few-shot prompt exemplars, multi-turn reasoning traces, or visual transformation pairs) by storing the projection tokens in an explicit Key-Value (KV) cache. For a sequence of $N$ demonstration tokens with embedding dimension $d$, memory scales as $O(N \cdot d)$. At long sequence horizons, this KV footprint induces high-bandwidth memory (HBM) bandwidth saturation, restricts batch throughput, and enforces quadratic attention compute during token generation.

Pathway's Dragon Hatchling (BDH) and BDH-CQ architectures reformulate contextual memory by treating attention not as a growing cache, but as recurrent synaptic plasticity. Rather than preserving every token vector in high-bandwidth memory, demonstrations are accumulated into a fixed-shape associative state, providing unbounded sequence processing in $O(1)$ memory without dynamic allocation bottlenecks.

---

### 2. Theoretical Mechanism: Additive Synaptic Memory & Latent Recurrence
BDH-CQ replaces dynamic token caches with an associative recurrent memory matrix $W \in \mathbb{R}^{d \times d}$[cite: 3]. For each contextual demonstration pair $(x_t, y_t)$ with key projection $k_t = f(x_t)$ and value projection $v_t = g(y_t)$, memory writes occur via an additive Hebbian formulation[cite: 3]:
$$W_t = (1 - \gamma) W_{t-1} + \eta (k_t v_t^T)$$
where $\gamma \in [0, 1)$ represents synaptic decay (recency discount) and $\eta$ is an update scaling factor[cite: 3]. Context retrieval for an unseen test query $q = f(x_{\text{test}})$ is computed as a direct linear projection[cite: 3]:
$$\hat{v} = q W_t$$

Unlike token-generating autoregressive models that verbalize intermediate thoughts through natural language Chain-of-Thought (CoT), BDH-CQ performs inference-time scaling through **recurrent latent-space reasoning**[cite: 3]. The internal hidden state $h$ is iteratively refined across $T$ recurrent workspace passes[cite: 3]:
$$h^{(\tau + 1)} = \sigma \left( h^{(\tau)} W_t + b \right)$$
where $\sigma$ applies a non-negative thresholding activation enforcing biological sparsity[cite: 3].

---

### 3. Architectural Comparison

| Dimension | Standard Transformer | State-Space Model (Mamba) | BDH-CQ (Pathway) |
| :--- | :--- | :--- | :--- |
| **Context Memory Footprint** | $O(N \cdot d)$ (Linearly expanding)[cite: 3] | $O(S)$ (Compressed hidden state)[cite: 3] | $O(d^2)$ (Fixed Synaptic Weight Matrix)[cite: 3] |
| **Context Accumulation Rule** | Dynamic concatenation[cite: 3] | Continuous-time linear ODE / Scan[cite: 3] | Additive Hebbian outer product writes[cite: 3] |
| **Reasoning Substrate** | Serialized verbal tokens (CoT)[cite: 3] | Token-by-token recurrence[cite: 3] | Latent workspace recurrent passes[cite: 3] |
| **Task Efficiency (ARC-AGI)** | $\$0.015 - \$0.040$ / task | Variable / Unverified[cite: 3] | $\$0.0007$ / task (Reported pass@2)[cite: 3] |
| **State Nature** | Non-parametric growing cache[cite: 3] | Evolving parametric vector[cite: 3] | Synaptic fast weights / Associative matrix[cite: 3] |

---

### 4. Empirical Benchmark Evidence (ARC-AGI-1)
On the Abstraction and Reasoning Corpus (ARC-AGI-1)—which evaluates a system's ability to infer spatial transformation rules from sparse demonstrations—a 150M parameter BDH-CQ model achieved **29.5% pass@2** at an inference cost of **$\$0.0007$ per task** without verbalized chain-of-thought[cite: 3]. By scaling compute along the latent recurrent dimension rather than generating verbose natural language tokens, BDH-CQ operates on a superior cost-accuracy Pareto frontier compared to frontier LLM prompting frameworks[cite: 3].

---

### 5. Falsifiable Limitation & Failure Boundary
While fixed associative recurrent memory resolves the $O(N)$ KV memory wall, it introduces an inherent trade-off: **associative cross-talk under cue collision**[cite: 3]. Linear retrieval $\hat{v} = q W_t$ requires keys $\{k_1, \dots, k_N\}$ to remain approximately orthogonal[cite: 3]. When demonstration tasks contain collinear cues or overlapping low-rank subspaces ($k_i^T k_j \to 1$), the outer-product terms in $W_t$ interfere constructively and destructively[cite: 3]. While softmax attention isolates overlapping tokens through non-linear exponentiated competition, BDH-CQ's linear readout experiences representation blurring and corrupted predictions when cue similarity exceeds the network's capacity[cite: 3].

---

### 6. Primary References
1. Kosowski, A., et al. (2025). *The Dragon Hatchling: The Missing Link between the Transformer and Models of the Brain*. arXiv:2509.26507[cite: 3].
2. Pathway Research. (2026). *BDH-CQ: In-Context Learning with Recurrent Latent Reasoning*. arXiv:2608.09888[cite: 3].
3. Vaswani, A., et al. (2017). *Attention Is All You Need*. Advances in Neural Information Processing Systems (NeurIPS)[cite: 3].