window.IDP_DATA = Object.assign(window.IDP_DATA || {}, {
  "fde-s7": {
    "n": "7. Discuss retrieval, grounding, model interaction, and tools",
    "p": "agent",
    "w": "Ground answers in tagged retrieval. Prefer deterministic workflow and tool allowlists for mechanical work. Model only where judgment is required. MCP (Model Context Protocol) tools stay behind policy.",
    "y": "Ungrounded generation and open tools are how demos become incidents.",
    "d": [
      "Spine step 7 of 14 from the FDE interview sheet.",
      "Bias to deterministic workflow and allowlisted tools; model for judgment only."
    ],
    "story": "fde"
  },
  "fde-s8": {
    "n": "8. Address privacy, identity, tenant isolation, and auditability",
    "p": "ctrl",
    "w": "Tenant = customer boundary. Identity for human and agent. Short-lived scoped tokens (delegation), never passwords in chat. Every sensitive action is auditable.",
    "y": "Enterprise buyers buy isolation and audit as much as they buy accuracy.",
    "d": [
      "Spine step 8 of 14 from the FDE interview sheet.",
      "Privacy, identity, tenant isolation, audit: same trust story as step 6, customer-facing."
    ],
    "story": "fde"
  },
  "fde-s9": {
    "n": "9. Define evaluation and hallucination controls",
    "p": "agent",
    "w": "Evals, schema validation, grounding checks, fail-closed gates before side effects. A failed gate writes a board; it does not silently continue.",
    "y": "Hallucination control is a product requirement, not a prompt tip.",
    "d": [
      "Spine step 9 of 14 from the FDE interview sheet.",
      "Evals and fail-closed gates before side effects."
    ],
    "story": "fde"
  },
  "fde-s10": {
    "n": "10. Define monitoring, latency, cost, reliability, and operations",
    "p": "obs",
    "w": "SLO (service level objective) and SLA (service level agreement) plus business outcome metrics (TTR, tickets avoided), not only latency. Cost and error budgets are first-class.",
    "y": "Ops is how the platform stays honest after the demo.",
    "d": [
      "Spine step 10 of 14 from the FDE interview sheet.",
      "SLO/SLA plus business outcomes, not only latency."
    ],
    "story": "fde"
  },
  "fde-s11": {
    "n": "11. Troubleshoot failures systematically",
    "p": "alert",
    "w": "Reproduce, isolate plane (data, control, model, tool), read stigmergic boards (shared traces), freeze autonomous loops if observe is dark.",
    "y": "Systematic triage beats improvisation when a tenant is on fire.",
    "d": [
      "Spine step 11 of 14 from the FDE interview sheet."
    ],
    "story": "fde"
  },
  "fde-s12": {
    "n": "12. Compare alternatives and tradeoffs",
    "p": "step",
    "w": "Compare deterministic workflow vs free-form agent, managed vs self-host, build vs buy. Name cost, risk, time-to-value.",
    "y": "Tradeoffs prove you heard the customer constraints.",
    "d": [
      "Spine step 12 of 14 from the FDE interview sheet."
    ],
    "story": "fde"
  },
  "fde-s13": {
    "n": "13. Make a concrete customer-facing recommendation",
    "p": "step",
    "w": "One clear path: what to ship first, what to defer, who owns what, and how success will be measured in 30/90 days.",
    "y": "FDE ends in a decision the customer can act on, not a menu of options.",
    "d": [
      "Spine step 13 of 14 from the FDE interview sheet."
    ],
    "story": "fde"
  },
  "fde-s14": {
    "n": "14. Convert field pain into product feedback",
    "p": "stig",
    "w": "Stigmergy: write toil, incidents, and gaps to boards. Field pain becomes paved road (allowlist, workflow, eval, template). Prefer a rule over another prompt tip.",
    "y": "The loop closes when ops pain improves the product for the next tenant.",
    "d": [
      "Spine step 14 of 14 from the FDE interview sheet.",
      "Field pain on a board becomes a paved road: allowlist, workflow, eval, template."
    ],
    "story": "fde"
  }
});
