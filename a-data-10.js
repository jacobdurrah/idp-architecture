window.IDP_DATA = Object.assign(window.IDP_DATA || {}, {
  "fde-gates": {
    "n": "6. Agent loop + gates",
    "p": "agent",
    "w": "Where judgment is needed, the agent loops under mechanical gates: schema validation, evals, score thresholds, fail-closed. A failed gate writes a board trace; it does not silently continue.",
    "y": "Ungated generation ships confident wrongness. Gates make the loop safe enough for a tenant.",
    "d": [
      "Evals and schemas before side effects.",
      "Fail closed: no tool call on invalid plan.",
      "Same through-line as Ship: boards hold the verdict."
    ],
    "story": "fde",
    "triggers": "Workflow step marked needs-judgment.",
    "stores": "Eval scores, validated plans, gate decisions.",
    "talksTo": "Workflow engine, tools via RBAC, boards."
  },
  "fde-boards": {
    "n": "7. Boards (stigmergy)",
    "p": "stig",
    "w": "Stigmergy: coordination through traces in a shared environment, not agent-to-agent chat. Toil, incidents, drift, denials, and eval fails write to shared boards humans and agents both read.",
    "y": "Private agent memory does not improve the platform. A board write is how the next run and the next engineer learn.",
    "d": [
      "Toil tickets, incident pages, drift, deny, eval fail.",
      "Agents never replace the board with a DM.",
      "Same idea as PR / checks / canary on the Ship path."
    ],
    "story": "fde",
    "triggers": "Gate fail, ops pain, drift, or user correction.",
    "stores": "Tickets, runbooks, deny logs, eval traces.",
    "talksTo": "Pave loop, humans, future agent runs."
  },
  "fde-pave": {
    "n": "8. Feedback to pave",
    "p": "step",
    "w": "Ops pain on a board becomes a paved road: a new allowlist entry, a workflow step, a test, or a template. Agent or human fixes once; the platform reuses forever.",
    "y": "Toil that only lives in a hero's head never compounds. The FDE bias is: every repeated pain becomes product.",
    "d": [
      "Toil ticket -> board -> fix PR -> paved road.",
      "Prefer a rule or eval over another prompt tip.",
      "Ship path still delivers the change via Git and gates."
    ],
    "story": "fde",
    "triggers": "Recurring toil or a postmortem action.",
    "stores": "Paved templates, allowlists, regression tests.",
    "talksTo": "Git, CI, policy bundles, workflow defs."
  },
  "fde-slo": {
    "n": "9. Serve + SLO / outcomes",
    "p": "obs",
    "w": "Serve under SLO (service level objective: target reliability) and SLA (service level agreement: contracted floor). Track business outcome metrics (time-to-resolution, tickets avoided, revenue tasks completed), not only latency.",
    "y": "A fast wrong answer is not success. FDE platforms prove value with outcomes and hold the line with SLO/SLA.",
    "d": [
      "SLO dashboards + error budgets; SLA is the contract.",
      "Business metrics beside golden signals.",
      "If observe is dark, freeze autonomous improve loops (same as Ship step 12)."
    ],
    "story": "fde",
    "triggers": "Always-on telemetry and outcome events.",
    "stores": "SLO counters, SLA reports, outcome warehouses.",
    "talksTo": "Boards, pave loop, on-call, customer success."
  }
});
