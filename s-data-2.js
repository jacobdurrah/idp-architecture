window.IDP_SCENARIOS = [
  {
    "id": "ship",
    "n": "Ship",
    "blurb": "Code leaves the laptop and changes shape until it is a process on a slat.",
    "steps": [
      "ship-1",
      "ship-2",
      "ship-3",
      "ship-4",
      "ship-5",
      "ship-6",
      "ship-7",
      "ship-8",
      "ship-9"
    ]
  },
  {
    "id": "serve",
    "n": "Serve",
    "blurb": "A thumb uses the service. The request walks the data plane to the same pod.",
    "steps": [
      "serve-1",
      "serve-2",
      "serve-3",
      "serve-4",
      "serve-5",
      "serve-6",
      "serve-7"
    ]
  },
  {
    "id": "break",
    "n": "Break",
    "blurb": "The service errors. Alerts fire. Rollback. An agent reads the stigmergic boards.",
    "steps": [
      "break-1",
      "break-2",
      "break-3",
      "break-4",
      "break-5",
      "break-6"
    ]
  }
];
window.IDP_DATA = Object.assign(window.IDP_DATA || {}, {
  "serve-7":   {
    "n": "The pod",
    "p": "data",
    "w": "The request lands on the same newsfeed-pod Ship landed: newsfeed-service:v1827, cgroups on a VM on a CPU slat. This is the process that answers the thumb.",
    "y": "If you cannot follow the request to this box, Serve is a cartoon and Ship did not finish.",
    "d": [
      "Same artifact. Same slat. Same digest sha256:9f3a…c21.",
      "p99 the user feels is every hop above this, plus this process (Metal).",
      "Cite Metal: newsfeed-pod."
    ],
    "story": "serve",
    "shape": "the process",
    "shapeFrom": "in-cluster request",
    "shapeTo": "newsfeed-pod (same as Ship)",
    "seeTab": "metal",
    "seeId": "newsfeed-pod",
    "seeHref": "metal.html#newsfeed-pod"
  },
  "break-1":   {
    "n": "Error in the pod",
    "p": "alert",
    "w": "The process throws, or the SLO burns. Four replicas on the hot path. A bad digest here is a canary and a burn-rate alert, then a Git revert.",
    "y": "Break starts in the same box Ship ended in. If you page a different service, you are telling a different story.",
    "d": [
      "Stateless feed assembly. It stores nothing durable.",
      "Cite Metal newsfeed-pod and v2 newsfeed.",
      "The replica count is a live object, not a hope in a runbook."
    ],
    "story": "break",
    "shape": "error / SLO burn",
    "shapeFrom": "process",
    "shapeTo": "error / SLO burn",
    "seeTab": "metal",
    "seeId": "newsfeed-pod",
    "seeHref": "metal.html#newsfeed-pod"
  },
  "break-2":   {
    "n": "Telemetry",
    "p": "obs",
    "w": "Spans, metrics, and logs leave the process through the OTel SDK and the collector. When this hop dies, the observability board goes blank.",
    "y": "A collector is not optional plumbing. Agents must not invent a story from a dead collector. The missing trace is the signal, if and only if a heartbeat was expected.",
    "d": [
      "The template ships the SDK. The coding agent does not add telemetry later.",
      "Heartbeats from this collector are what the obs-guard expects.",
      "Cite Agents: otel-sdk, otel-collector."
    ],
    "story": "break",
    "shape": "spans, metrics, logs",
    "shapeFrom": "process",
    "shapeTo": "spans, metrics, logs",
    "seeTab": "agents",
    "seeId": "otel-collector",
    "seeHref": "agents.html#otel-collector"
  },
  "break-3":   {
    "n": "Alert",
    "p": "alert",
    "w": "Burn-rate or error-budget pages fire. Pages are traces. The SRE agent reads them. Silence is not a canary pass.",
    "y": "An SLO that does not page is a slide. A page that does not write a ticket is a shout. The board is the alert, the ticket, and the runbook.",
    "d": [
      "On Agents this is the alerts box and the obs board.",
      "Missing heartbeats are not green. A blank board is not all-clear.",
      "Cite Agents: alerts, obs-board."
    ],
    "story": "break",
    "shape": "page / burn-rate alert",
    "shapeFrom": "burn or error budget",
    "shapeTo": "alert",
    "seeTab": "agents",
    "seeId": "alerts",
    "seeHref": "agents.html#alerts"
  },
  "break-4":   {
    "n": "Rollback / snapshot",
    "p": "ctrl",
    "w": "Live goes back to the last good digest. The canary board can pause or fail. Fail writes a revert in platform-gitops. Argo syncs. It is not a CI re-run of a deploy script.",
    "y": "Rollback is a Git operation. If the only undo is a person with kubectl, Ship was a story you told yourself.",
    "d": [
      "A revert of the bump commit is a rollback (v2).",
      "Silence on the canary board is not a pass (Agents).",
      "Cite v2 argocd and Agents canary-board."
    ],
    "story": "break",
    "shape": "last good digest",
    "shapeFrom": "live",
    "shapeTo": "last good digest",
    "seeTab": "v2",
    "seeId": "argocd",
    "seeHref": "v2.html#argocd"
  },
  "break-5":   {
    "n": "Agent triage",
    "p": "agent",
    "w": "An agent reads the boards (alerts, traces, canary, outage). It does not invent a story if observability is dark. It may open a rollback PR or a ticket. Humans still own incident command.",
    "y": "If observability is dark: missing heartbeats are not green. Freeze promotions. Do not invent a story from a dead collector. That contract is already on the Agents tab (obs-guard, outage-board).",
    "d": [
      "Reads: pages, traces, error budgets, runbooks, the canary board.",
      "Writes: a rollback or fix PR, a ticket, a comment on the board. Never kubectl.",
      "Cite Agents: sre-agent, obs-guard, outage-board."
    ],
    "story": "break",
    "shape": "board traces",
    "shapeFrom": "boards",
    "shapeTo": "agent triage (or a freeze)",
    "seeTab": "agents",
    "seeId": "sre-agent",
    "seeHref": "agents.html#sre-agent"
  },
  "break-6":   {
    "n": "Freeze or repair",
    "p": "agent",
    "w": "Promotion is frozen, or a repair agent writes on CI. The GitOps agent may open a revert. Nobody applies to the cluster. Resume autonomous improve-the-code loops only when heartbeats return.",
    "y": "A blank board is not permission to guess. Autonomous loops that keep running on empty dashboards will optimize you into an outage.",
    "d": [
      "Do not promote. Freeze the GitOps bump and the canary.",
      "Repair agent: reads red checks and artifacts, writes a follow-up commit. It does not merge.",
      "Cite Agents: repair-agent, gitops-agent."
    ],
    "story": "break",
    "shape": "freeze, or a repair PR",
    "shapeFrom": "triage",
    "shapeTo": "promotion frozen, or repair-agent on CI",
    "seeTab": "agents",
    "seeId": "repair-agent",
    "seeHref": "agents.html#repair-agent"
  }
});
