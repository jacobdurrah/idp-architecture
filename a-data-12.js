window.IDP_DATA = Object.assign(window.IDP_DATA || {}, {
  "fde-s11": {
    "n": "11. Troubleshoot failures systematically",
    "p": "alert",
    "say": "Trace which tenant, which tool, which retrieval set, and which policy denied. Read boards, not chat archaeology. If observe is dark, freeze autonomous loops.",
    "ask": [
      "Which tenant and which token scope was active on the failing hop?",
      "Which retrieval tags fired, and which policy denied the tool or the document?",
      "What board should already show this, and why is it empty?"
    ],
    "box": "Incident board: tenant, tool, retrieval set, policy decision, trace ids. Freeze switch. Runbook that starts at the board, not at Slack.",
    "fail": "People grep chat. The next incident is slower. You cannot tell a policy deny from a model miss.",
    "bias": "Triage order and freeze conditions are a runbook. Do not let the agent try something else while observe is dark.",
    "w": "Trace which tenant, which tool, which retrieval set, and which policy denied. Read boards, not chat archaeology. If observe is dark, freeze autonomous loops.",
    "y": "People grep chat. The next incident is slower. You cannot tell a policy deny from a model miss.",
    "d": [
      "Ask: (1) Which tenant and which token scope was active on the failing hop? (2) Which retrieval tags fired, and which policy denied the tool or the document? (3) What board should already show this, and why is it empty?",
      "Platform box: Incident board: tenant, tool, retrieval set, policy decision, trace ids. Freeze switch. Runbook that starts at the board, not at Slack.",
      "Deterministic bias: Triage order and freeze conditions are a runbook. Do not let the agent try something else while observe is dark.",
      "Theme: Boards over chat archaeology. Tenant, tool, retrieval, policy on one trace."
    ],
    "story": "fde"
  },
  "fde-s12": {
    "n": "12. Compare alternatives and tradeoffs",
    "p": "step",
    "say": "Name the real forks: more model versus more workflow; shared index versus per-tenant; sync versus async tools. Cost, isolation, and time-to-value have to be on the same slide.",
    "ask": [
      "What isolation do you lose with a shared index, and is that acceptable for this data class?",
      "Which tools must be async because of SLA or human-in-the-loop, and which must be sync?",
      "What is the 90-day cost and risk of the model-heavy path versus the workflow-heavy path?"
    ],
    "box": "Tradeoff matrix: model vs workflow, index shape (shared vs per-tenant), sync vs async tools, cost, isolation, time-to-value.",
    "fail": "The customer hears a stack, not a choice. They cannot defend isolation or cost to their CISO or CFO.",
    "bias": "When isolation, audit, or SLA is the binding constraint, pick workflow and per-tenant index over a larger model.",
    "w": "Name the real forks: more model versus more workflow; shared index versus per-tenant; sync versus async tools. Cost, isolation, and time-to-value have to be on the same slide.",
    "y": "The customer hears a stack, not a choice. They cannot defend isolation or cost to their CISO or CFO.",
    "d": [
      "Ask: (1) What isolation do you lose with a shared index, and is that acceptable for this data class? (2) Which tools must be async because of SLA or human-in-the-loop, and which must be sync? (3) What is the 90-day cost and risk of the model-heavy path versus the workflow-heavy path?",
      "Platform box: Tradeoff matrix: model vs workflow, index shape (shared vs per-tenant), sync vs async tools, cost, isolation, time-to-value.",
      "Deterministic bias: When isolation, audit, or SLA is the binding constraint, pick workflow and per-tenant index over a larger model.",
      "Theme: More model vs more workflow. Shared vs per-tenant index. Sync vs async tools."
    ],
    "story": "fde"
  },
  "fde-s13": {
    "n": "13. Make a concrete customer-facing recommendation",
    "p": "step",
    "say": "One path. What ships in 30 days, what in 90, what is out of scope, and who owns IdP, workflow, allowlist, evals, and the outcome dashboard.",
    "ask": [
      "Who owns the token broker and the tool gateway on day one, named as a team?",
      "What is explicitly out of scope for 90 days, including data classes and write tools?",
      "What 30-day metric proves the recommendation, not the demo?"
    ],
    "box": "30/90 recommendation: in-scope jobs, out-of-scope list, owners (IdP, workflow, allowlist, evals, dashboard), success metrics, freeze rules.",
    "fail": "A menu. The customer cannot act. Six weeks later they are still choosing models.",
    "bias": "The 30-day slice should be mostly workflow, tags, RBAC, and evals. Model judgment only where the job needs it.",
    "w": "One path. What ships in 30 days, what in 90, what is out of scope, and who owns IdP, workflow, allowlist, evals, and the outcome dashboard.",
    "y": "A menu. The customer cannot act. Six weeks later they are still choosing models.",
    "d": [
      "Ask: (1) Who owns the token broker and the tool gateway on day one, named as a team? (2) What is explicitly out of scope for 90 days, including data classes and write tools? (3) What 30-day metric proves the recommendation, not the demo?",
      "Platform box: 30/90 recommendation: in-scope jobs, out-of-scope list, owners (IdP, workflow, allowlist, evals, dashboard), success metrics, freeze rules.",
      "Deterministic bias: The 30-day slice should be mostly workflow, tags, RBAC, and evals. Model judgment only where the job needs it.",
      "Theme: Scoped 30/90. Named owners. Out of scope is part of the recommendation."
    ],
    "story": "fde"
  },
  "fde-s14": {
    "n": "14. Convert field pain into product feedback",
    "p": "stig",
    "say": "Field toil becomes a paved road: a new allowlist, schema, eval, or runbook. Stigmergy: write the pain on a board the product can read. Do not file a prompt tip and walk away.",
    "ask": [
      "What broke for this tenant that the next tenant will also hit?",
      "Which artifact (allowlist, tag, eval, runbook) would have prevented it?",
      "Who reads that board inside product, and on what cadence?"
    ],
    "box": "Feedback board: tenant, toil, proposed paved-road artifact (allowlist, schema, eval, runbook), owner, review cadence.",
    "fail": "Every FDE re-solves the same gap. The product never learns. Toil stays tribal.",
    "bias": "Prefer a new rule, schema, allowlist, or eval over another instruction to the model. Pain becomes policy.",
    "w": "Field toil becomes a paved road: a new allowlist, schema, eval, or runbook. Stigmergy: write the pain on a board the product can read. Do not file a prompt tip and walk away.",
    "y": "Every FDE re-solves the same gap. The product never learns. Toil stays tribal.",
    "d": [
      "Ask: (1) What broke for this tenant that the next tenant will also hit? (2) Which artifact (allowlist, tag, eval, runbook) would have prevented it? (3) Who reads that board inside product, and on what cadence?",
      "Platform box: Feedback board: tenant, toil, proposed paved-road artifact (allowlist, schema, eval, runbook), owner, review cadence.",
      "Deterministic bias: Prefer a new rule, schema, allowlist, or eval over another instruction to the model. Pain becomes policy.",
      "Theme: Toil to system: write the pain on a board the product can read."
    ],
    "story": "fde"
  }
});
