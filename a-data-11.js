window.IDP_DATA = Object.assign(window.IDP_DATA || {}, {
  "fde-s7": {
    "n": "7. Discuss retrieval, grounding, model interaction, and tools",
    "p": "agent",
    "say": "Retrieval is tagged (tenant, system, classification, lineage) or it is not retrieval. Tools are allowlisted MCP verbs behind the gateway. The model judges; mechanical steps stay workflow and rules.",
    "ask": [
      "Which tags are mandatory on every hit, and what happens on a miss or an untagged chunk?",
      "What is the allowlist of tools and arguments for this job, including writes vs reads?",
      "Which steps are mechanical and must not call the model at all?"
    ],
    "box": "Retrieval schema (required tags), tool allowlist (MCP verbs and args), grounding policy (cite or abstain), workflow vs judgment split.",
    "fail": "Ungrounded generation plus open tools. The demo answers fluently and writes to the wrong tenant.",
    "bias": "Mechanical work is workflow and rules. Model only on judgment steps. Tools fail closed outside the allowlist.",
    "w": "Retrieval is tagged (tenant, system, classification, lineage) or it is not retrieval. Tools are allowlisted MCP verbs behind the gateway. The model judges; mechanical steps stay workflow and rules.",
    "y": "Ungrounded generation plus open tools. The demo answers fluently and writes to the wrong tenant.",
    "d": [
      "Ask: (1) Which tags are mandatory on every hit, and what happens on a miss or an untagged chunk? (2) What is the allowlist of tools and arguments for this job, including writes vs reads? (3) Which steps are mechanical and must not call the model at all?",
      "Platform box: Retrieval schema (required tags), tool allowlist (MCP verbs and args), grounding policy (cite or abstain), workflow vs judgment split.",
      "Deterministic bias: Mechanical work is workflow and rules. Model only on judgment steps. Tools fail closed outside the allowlist.",
      "Theme: Tagged retrieval. Allowlisted tools. Model for judgment, not orchestration."
    ],
    "story": "fde"
  },
  "fde-s8": {
    "n": "8. Address privacy, identity, tenant isolation, and auditability",
    "p": "ctrl",
    "say": "RBAC on tools and on data. Tenant isolation at query and at index. Every tool call and every retrieval hit is audited with actor, tenant, and token scope. Identity is human plus agent, never a shared bot password.",
    "ask": [
      "Is isolation enforced at index and query, or only as a sentence in the prompt?",
      "Who is the actor on the audit line: user, agent, or both, and which token scope?",
      "What PII classes are forbidden in prompts, traces, and eval fixtures?"
    ],
    "box": "Isolation policy, RBAC matrix (role x tool x data class), audit schema (actor, tenant, tool, retrieval ids, token), delegation standard.",
    "fail": "Cross-tenant retrieval or an unaudited write. That is an incident, not a product gap.",
    "bias": "Isolation, RBAC, and audit are policy. No model override. Deny by default.",
    "w": "RBAC on tools and on data. Tenant isolation at query and at index. Every tool call and every retrieval hit is audited with actor, tenant, and token scope. Identity is human plus agent, never a shared bot password.",
    "y": "Cross-tenant retrieval or an unaudited write. That is an incident, not a product gap.",
    "d": [
      "Ask: (1) Is isolation enforced at index and query, or only as a sentence in the prompt? (2) Who is the actor on the audit line: user, agent, or both, and which token scope? (3) What PII classes are forbidden in prompts, traces, and eval fixtures?",
      "Platform box: Isolation policy, RBAC matrix (role x tool x data class), audit schema (actor, tenant, tool, retrieval ids, token), delegation standard.",
      "Deterministic bias: Isolation, RBAC, and audit are policy. No model override. Deny by default.",
      "Theme: RBAC on tools and data. Isolation at query and index. Audit every hop."
    ],
    "story": "fde"
  },
  "fde-s9": {
    "n": "9. Define evaluation and hallucination controls",
    "p": "agent",
    "say": "Evals ship with the agent: drift fixtures plus correct-usage checks (allowed tools and args). Fail closed. Hallucination control is cite or ground, or abstain. It is not a nicer prompt.",
    "ask": [
      "What fixture set proves the agent still uses only allowed tools and arguments?",
      "What is the abstain behavior when retrieval is empty, untagged, or cross-tenant?",
      "Who owns the eval gate in CI, and what exact failure blocks a release?"
    ],
    "box": "Eval suite (drift plus correct-usage), fail-closed gate before side effects, grounding/citation rule, board for eval failures.",
    "fail": "You find hallucinations in production. Side effects already happened. Trust is gone.",
    "bias": "Schema validation, allowlist tests, and fail-closed gates are rules. Do not ask the model if it is sure.",
    "w": "Evals ship with the agent: drift fixtures plus correct-usage checks (allowed tools and args). Fail closed. Hallucination control is cite or ground, or abstain. It is not a nicer prompt.",
    "y": "You find hallucinations in production. Side effects already happened. Trust is gone.",
    "d": [
      "Ask: (1) What fixture set proves the agent still uses only allowed tools and arguments? (2) What is the abstain behavior when retrieval is empty, untagged, or cross-tenant? (3) Who owns the eval gate in CI, and what exact failure blocks a release?",
      "Platform box: Eval suite (drift plus correct-usage), fail-closed gate before side effects, grounding/citation rule, board for eval failures.",
      "Deterministic bias: Schema validation, allowlist tests, and fail-closed gates are rules. Do not ask the model if it is sure.",
      "Theme: Evals travel with the agent. Fail closed. Cite or abstain."
    ],
    "story": "fde"
  },
  "fde-s10": {
    "n": "10. Define monitoring, latency, cost, reliability, and operations",
    "p": "obs",
    "say": "SLOs cover availability, freshness, and error budget. SLAs if contracted. Business outcomes (tickets closed, hours saved, conversion) sit next to p95. Latency alone is not ops.",
    "ask": [
      "What is the error budget, and what freezes the agent when it burns?",
      "Which business metric proves the job moved, not just that calls succeeded?",
      "What is the cost per completed job versus the SLA floor, and who sees that board?"
    ],
    "box": "SLO/SLA card, outcome dashboard (tickets, hours, conversion), cost and latency boards, freshness SLO, freeze runbook.",
    "fail": "A fast, cheap, wrong agent. Or a correct agent nobody can operate when retrieval goes stale.",
    "bias": "Freeze, budget burn, and page routing are rules. The model does not decide whether it is healthy.",
    "w": "SLOs cover availability, freshness, and error budget. SLAs if contracted. Business outcomes (tickets closed, hours saved, conversion) sit next to p95. Latency alone is not ops.",
    "y": "A fast, cheap, wrong agent. Or a correct agent nobody can operate when retrieval goes stale.",
    "d": [
      "Ask: (1) What is the error budget, and what freezes the agent when it burns? (2) Which business metric proves the job moved, not just that calls succeeded? (3) What is the cost per completed job versus the SLA floor, and who sees that board?",
      "Platform box: SLO/SLA card, outcome dashboard (tickets, hours, conversion), cost and latency boards, freshness SLO, freeze runbook.",
      "Deterministic bias: Freeze, budget burn, and page routing are rules. The model does not decide whether it is healthy.",
      "Theme: SLO plus SLA plus business outcomes. Not latency alone."
    ],
    "story": "fde"
  }
});
