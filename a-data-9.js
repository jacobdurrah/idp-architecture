window.IDP_DATA = Object.assign(window.IDP_DATA || {}, {
  "fde": {
    "n": "FDE enterprise (14-step spine)",
    "p": "story",
    "w": "Forward Deployed Engineer interview spine: clarify the customer problem through convert field pain into product feedback. Fourteen steps. RBAC, tenant isolation, credentials under 6+8; deterministic workflow and tools under 7; evals under 9; SLO/SLA and business metrics under 10; toil to pave under 14.",
    "y": "Ship agent shows delivery. This story is how an FDE designs and runs a tenant-safe enterprise agent.",
    "d": [
      "Story bar: Ship agent vs FDE enterprise.",
      "Print wall: print.html · panels 1-4 left to right.",
      "Stigmergy: boards hold traces; agents do not replace the board with chat."
    ],
    "story": "fde"
  },
  "fde-s1": {
    "n": "1. Clarify the customer problem",
    "p": "ctrl",
    "w": "Start with the customer's pain in their words. Name who hurts, what breaks, and why now. Do not jump to models.",
    "y": "A vague problem produces a vague agent. FDE clarity is the first trust boundary.",
    "d": [
      "Spine step 1 of 14 from the FDE interview sheet."
    ],
    "story": "fde"
  },
  "fde-s2": {
    "n": "2. Identify stakeholders and success criteria",
    "p": "ppl",
    "w": "Map buyers, users, security, ops, and who can say no. Write success criteria that are observable, not slogan-level.",
    "y": "Without named stakeholders and success, you cannot defend RBAC, SLO, or a recommendation.",
    "d": [
      "Spine step 2 of 14 from the FDE interview sheet."
    ],
    "story": "fde"
  },
  "fde-s3": {
    "n": "3. Ask focused discovery questions",
    "p": "ppl",
    "w": "Probe systems of record, data ownership, latency budgets, compliance, and which workflows are already deterministic.",
    "y": "Focused questions surface tenant boundaries and tool allowlists before you invent architecture.",
    "d": [
      "Spine step 3 of 14 from the FDE interview sheet."
    ],
    "story": "fde"
  },
  "fde-s4": {
    "n": "4. Define functional and non-functional requirements",
    "p": "ctrl",
    "w": "Functional: jobs the agent must complete. Non-functional: latency, cost, availability, privacy, audit, retention.",
    "y": "Requirements are the contract. Evals, SLO, and SLA hang from them later.",
    "d": [
      "Spine step 4 of 14 from the FDE interview sheet."
    ],
    "story": "fde"
  },
  "fde-s5": {
    "n": "5. Propose the initial architecture",
    "p": "ctrl",
    "w": "Sketch planes: identity, policy, workflow, retrieval, model, tools, boards, observe. Prefer category names (IdP, policy engine, workflow engine, secrets broker, warehouse).",
    "y": "Architecture is a customer-facing story, not a vendor dump.",
    "d": [
      "Spine step 5 of 14 from the FDE interview sheet."
    ],
    "story": "fde"
  },
  "fde-s6": {
    "n": "6. Explain data flow, control flow, and trust boundaries",
    "p": "ctrl",
    "w": "Show where data moves, who decides, and where trust stops. RBAC (role-based access control), tenant isolation, and scoped credential handoff live here.",
    "y": "If trust boundaries are fuzzy, the agent is a second control plane.",
    "d": [
      "Spine step 6 of 14 from the FDE interview sheet.",
      "Trust boundaries include RBAC, tenant isolation, and scoped credential handoff."
    ],
    "story": "fde"
  }
});
