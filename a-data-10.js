window.IDP_DATA = Object.assign(window.IDP_DATA || {}, {
  "fde-s4": {
    "n": "4. Define functional and non-functional requirements",
    "p": "ctrl",
    "say": "Functional is the job the agent or workflow must complete. Non-functional is the contract: tenant isolation, audit, p95 latency, cost per query, human-in-the-loop SLA.",
    "ask": [
      "What must be true for every tenant, not just the pilot, including isolation and audit?",
      "What is the p95 and the cost ceiling per completed job, not per token?",
      "When must a human be in the loop, and what is that SLA from page to decision?"
    ],
    "box": "Requirements sheet: jobs, NFRs (isolation, audit, p95, cost/query, HITL SLA), data classes, token scope, retention.",
    "fail": "You ship a clever path with no isolation, no audit, and no latency or cost bound. Finance and security both veto.",
    "bias": "Encode NFRs as policy and workflow gates, not as prompt instructions. Isolation, audit, and HITL are rules.",
    "w": "Functional is the job the agent or workflow must complete. Non-functional is the contract: tenant isolation, audit, p95 latency, cost per query, human-in-the-loop SLA.",
    "y": "You ship a clever path with no isolation, no audit, and no latency or cost bound. Finance and security both veto.",
    "d": [
      "Ask: (1) What must be true for every tenant, not just the pilot, including isolation and audit? (2) What is the p95 and the cost ceiling per completed job, not per token? (3) When must a human be in the loop, and what is that SLA from page to decision?",
      "Platform box: Requirements sheet: jobs, NFRs (isolation, audit, p95, cost/query, HITL SLA), data classes, token scope, retention.",
      "Deterministic bias: Encode NFRs as policy and workflow gates, not as prompt instructions. Isolation, audit, and HITL are rules.",
      "Theme: NFRs are tenant isolation, audit, p95, cost/query, and human-in-loop SLA."
    ],
    "story": "fde"
  },
  "fde-s5": {
    "n": "5. Propose the initial architecture",
    "p": "ctrl",
    "say": "Draw ingress to tagged store to deterministic workflow to gated agent to boards to observe. Use category names: IdP, policy engine, workflow engine, secrets broker, tool gateway, warehouse.",
    "ask": [
      "Where does tagging happen, before the model ever sees a token or a document?",
      "Which plane owns credentials (secrets broker, not the agent) and which plane owns RBAC?",
      "What is out of the agent and inside workflow on day one?"
    ],
    "box": "One-page architecture: planes, trust boundaries, tagged store, workflow vs agent split, boards, observe. Category names, not a vendor dump.",
    "fail": "A vendor collage. Nobody can say where RBAC, tokens, or tenant tags live, so the build becomes a pile of connectors.",
    "bias": "Default the spine to workflow. The agent is a gated judgment box, not the orchestrator.",
    "w": "Draw ingress to tagged store to deterministic workflow to gated agent to boards to observe. Use category names: IdP, policy engine, workflow engine, secrets broker, tool gateway, warehouse.",
    "y": "A vendor collage. Nobody can say where RBAC, tokens, or tenant tags live, so the build becomes a pile of connectors.",
    "d": [
      "Ask: (1) Where does tagging happen, before the model ever sees a token or a document? (2) Which plane owns credentials (secrets broker, not the agent) and which plane owns RBAC? (3) What is out of the agent and inside workflow on day one?",
      "Platform box: One-page architecture: planes, trust boundaries, tagged store, workflow vs agent split, boards, observe. Category names, not a vendor dump.",
      "Deterministic bias: Default the spine to workflow. The agent is a gated judgment box, not the orchestrator.",
      "Theme: Ingress, tagged store, deterministic workflow, gated agent, boards, observe."
    ],
    "story": "fde"
  },
  "fde-s6": {
    "n": "6. Explain data flow, control flow, and trust boundaries",
    "p": "ctrl",
    "say": "Data flow is what moves and how it is tagged. Control flow is who decides. Trust boundaries sit at the IdP, the secrets broker, and the tool gateway. A user-delegated scoped token rides the workflow; the agent never holds a long-lived user password.",
    "ask": [
      "Where does a retrieval stop if the tenant tag does not match, at index or only after the model?",
      "Which hop mints the short-lived token, what is its scope and TTL, and what never sees the user password?",
      "What can the model see that the tool gateway will still refuse, and who owns that deny?"
    ],
    "box": "Flow diagram with two inks: data vs control. Boxes at IdP, secrets broker, tool gateway. Token scope table (actor, scope, TTL, broker). RBAC on tools and on data.",
    "fail": "The agent becomes a second control plane with standing credentials. One prompt can cross a tenant or call a write tool.",
    "bias": "Token mint, tenant match, and tool RBAC are workflow and policy. Never leave them to model judgment.",
    "w": "Data flow is what moves and how it is tagged. Control flow is who decides. Trust boundaries sit at the IdP, the secrets broker, and the tool gateway. A user-delegated scoped token rides the workflow; the agent never holds a long-lived user password.",
    "y": "The agent becomes a second control plane with standing credentials. One prompt can cross a tenant or call a write tool.",
    "d": [
      "Ask: (1) Where does a retrieval stop if the tenant tag does not match, at index or only after the model? (2) Which hop mints the short-lived token, what is its scope and TTL, and what never sees the user password? (3) What can the model see that the tool gateway will still refuse, and who owns that deny?",
      "Platform box: Flow diagram with two inks: data vs control. Boxes at IdP, secrets broker, tool gateway. Token scope table (actor, scope, TTL, broker). RBAC on tools and on data.",
      "Deterministic bias: Token mint, tenant match, and tool RBAC are workflow and policy. Never leave them to model judgment.",
      "Theme: Scoped short-lived tokens ride the workflow. Agent never holds the user password."
    ],
    "story": "fde"
  }
});
