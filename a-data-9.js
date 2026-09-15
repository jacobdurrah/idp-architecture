window.IDP_DATA = Object.assign(window.IDP_DATA || {}, {
  "fde": {
    "n": "FDE enterprise (14-step spine)",
    "p": "story",
    "w": "Forward Deployed Engineer interview spine: clarify the customer problem through convert field pain into product feedback. Fourteen dense cards. Every step carries Say, Ask, Platform box, Fail if skipped, and Deterministic bias. RBAC, tenant isolation, tagged sources, scoped short-lived tokens, deterministic workflow, SLO/SLA plus business outcomes, and toil-to-board feedback run the whole spine, not only steps 6-10.",
    "y": "Ship agent shows delivery. This story is how an FDE designs and runs a tenant-safe enterprise agent, and how field toil becomes a paved road.",
    "d": [
      "Story bar: Ship agent vs FDE enterprise. Ship agent story stays separate.",
      "Print wall: print.html \u00b7 6 tabloid panels left to right. Dense reference, not a slogan poster.",
      "Stigmergy: boards hold traces; agents do not replace the board with chat."
    ],
    "story": "fde"
  },
  "fde-s1": {
    "n": "1. Clarify the customer problem",
    "p": "ctrl",
    "say": "Restate the pain and the constraint in their nouns: who is blocked, what work stalls, and what they already tried. If you cannot say that without saying agent, you do not have a problem yet.",
    "ask": [
      "What is broken today with no agent in the loop, named as a ticket, queue, or handoff?",
      "Which constraint (tenant, data class, SLA, allowed tools) would make a clever demo useless in production?",
      "What did they already automate, and why did that path stall?"
    ],
    "box": "Problem brief on a shared board: actor, pain in their words, constraint, why-now, non-goals. Tag the tenant and data class on the brief from day one.",
    "fail": "Demo chasing. You sell a model instead of a job. Security and ops kill it after the room applauds.",
    "bias": "N/A for wording the problem. Bias discovery toward existing deterministic workflows that already almost work. Do not assume a model is the fix.",
    "w": "Restate the pain and the constraint in their nouns: who is blocked, what work stalls, and what they already tried. If you cannot say that without saying agent, you do not have a problem yet.",
    "y": "Demo chasing. You sell a model instead of a job. Security and ops kill it after the room applauds.",
    "d": [
      "Ask: (1) What is broken today with no agent in the loop, named as a ticket, queue, or handoff? (2) Which constraint (tenant, data class, SLA, allowed tools) would make a clever demo useless in production? (3) What did they already automate, and why did that path stall?",
      "Platform box: Problem brief on a shared board: actor, pain in their words, constraint, why-now, non-goals. Tag the tenant and data class on the brief from day one.",
      "Deterministic bias: N/A for wording the problem. Bias discovery toward existing deterministic workflows that already almost work. Do not assume a model is the fix.",
      "Theme: Tenant, data class, and SLA show up here as constraints, not as later extras."
    ],
    "story": "fde"
  },
  "fde-s2": {
    "n": "2. Identify stakeholders and success criteria",
    "p": "ppl",
    "say": "Success is a measurable: time-to-X, error rate, dollars, tickets closed. Name the people who can block: security, identity, ops, and the data owner, not only the excited buyer.",
    "ask": [
      "Who signs the SLO, and who can stop a tool allowlist or a production token?",
      "What metric moves if this works, who already owns that dashboard, and what is the baseline?",
      "Which tenant or business unit is in scope for the first 30 days, and who speaks for isolation?"
    ],
    "box": "Stakeholder map plus a success card: metric, baseline, target, owner, review date. Include security, ops, and the data owner as named rows, not footnotes.",
    "fail": "A champion loves the demo. Security and ops were never in the room. The project dies at procurement or production access.",
    "bias": "Success criteria themselves are rules (thresholds, SLAs, error budgets). Do not let a qualitative feels smarter replace a measurable outcome.",
    "w": "Success is a measurable: time-to-X, error rate, dollars, tickets closed. Name the people who can block: security, identity, ops, and the data owner, not only the excited buyer.",
    "y": "A champion loves the demo. Security and ops were never in the room. The project dies at procurement or production access.",
    "d": [
      "Ask: (1) Who signs the SLO, and who can stop a tool allowlist or a production token? (2) What metric moves if this works, who already owns that dashboard, and what is the baseline? (3) Which tenant or business unit is in scope for the first 30 days, and who speaks for isolation?",
      "Platform box: Stakeholder map plus a success card: metric, baseline, target, owner, review date. Include security, ops, and the data owner as named rows, not footnotes.",
      "Deterministic bias: Success criteria themselves are rules (thresholds, SLAs, error budgets). Do not let a qualitative feels smarter replace a measurable outcome.",
      "Theme: Security and ops can block. Success is a number tied to a business outcome."
    ],
    "story": "fde"
  },
  "fde-s3": {
    "n": "3. Ask focused discovery questions",
    "p": "ppl",
    "say": "Ask where truth lives, who owns PII, and which automations must stay deterministic. Tag every source you hear: system, tenant, classification, owner, lineage.",
    "ask": [
      "What is the system of record for the job, and what is only a copy or an export?",
      "Who owns PII, and how does it get tagged at ingest rather than in the prompt?",
      "Which existing runbooks, RPA, or workflows must not become free-form model steps?"
    ],
    "box": "Discovery log: sources with tags (tenant, system, classification, lineage), PII owner, existing automations to keep, credential paths already in use.",
    "fail": "You design retrieval against a wiki copy, miss the system of record, and leak PII across tenants because nobody named the tags.",
    "bias": "Prefer existing workflow and allowlisted integrations over a new agent skill whenever the step is already mechanical.",
    "w": "Ask where truth lives, who owns PII, and which automations must stay deterministic. Tag every source you hear: system, tenant, classification, owner, lineage.",
    "y": "You design retrieval against a wiki copy, miss the system of record, and leak PII across tenants because nobody named the tags.",
    "d": [
      "Ask: (1) What is the system of record for the job, and what is only a copy or an export? (2) Who owns PII, and how does it get tagged at ingest rather than in the prompt? (3) Which existing runbooks, RPA, or workflows must not become free-form model steps?",
      "Platform box: Discovery log: sources with tags (tenant, system, classification, lineage), PII owner, existing automations to keep, credential paths already in use.",
      "Deterministic bias: Prefer existing workflow and allowlisted integrations over a new agent skill whenever the step is already mechanical.",
      "Theme: Tag data from all sources now. Keep deterministic automations deterministic."
    ],
    "story": "fde"
  }
});
