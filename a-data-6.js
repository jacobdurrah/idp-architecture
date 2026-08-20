window.IDP_DATA = Object.assign(window.IDP_DATA || {}, {
  "canary-board": {
    "n": "Canary verdict, deploy-health",
    "p": "stig",
    "w": "The canary verdict and the deploy-health dashboard are a stigmergic board. The canary-analysis agent compares new-version metrics to baseline. A bad canary becomes a git revert, not a chat message. Silence is not a canary pass.",
    "y": "If the verdict lives in a Zoom call, you do not have progressive delivery. The board has to be queryable: error rate, latency, saturation, versus baseline, with a pass or fail written down. Agents read that write.",
    "d": [
      "Baseline versus candidate, same Prometheus the HPA uses.",
      "A missing heartbeat is not a pass. See the outage band.",
      "Fail writes a revert in platform-gitops.",
      "Pass is a trace too. Promotion is a Git pointer, not a hallway yes."
    ],
    "triggers": "A new digest serving a slice of traffic, or a heartbeat timeout.",
    "stores": "Verdict, metric diffs, promotion or revert pointer.",
    "talksTo": "The canary agent, GitOps, SRE, and the dashboards."
  },
  "canary-agent": {
    "n": "Canary-analysis agent",
    "p": "agent",
    "w": "The canary-analysis agent compares new-version metrics to baseline. On a bad canary it opens a git revert in platform-gitops. It does not page a story. It writes a verdict on the canary board and a revert on Git. It does not treat a dark dashboard as a pass.",
    "y": "Progressive delivery that waits for a human to squint at a graph will ship the bad digest. An agent that can only revert through Git is the right kind of fast. An agent that kubectl-rolls back is another CD system.",
    "d": [
      "Reads: candidate versus baseline SLIs, heartbeat presence.",
      "Writes: a verdict on the canary board, a revert PR on fail.",
      "Never: a pass inferred from missing metrics, a live kubectl rollback.",
      "If observability is dark, it defers to the obs-guard and freezes promotion."
    ],
    "triggers": "A new digest on a slice of traffic, or a heartbeat that stops.",
    "stores": "Nothing of its own. The canary board and Git are the memory.",
    "talksTo": "The canary board, Prometheus, platform-gitops, the obs-guard."
  },
  "otel-sdk": {
    "n": "OTel SDKs",
    "p": "obs",
    "w": "In-process and node agent. One API, every service. Apps and nodes emit continuously. This is not a CI step. The coding agent does not add telemetry later. The template ships the SDK.",
    "y": "Without a single emit path, every service invents a dialect and the collector becomes a museum. The SDK is how traces, metrics, and logs stay joinable. Agents that improve code later will read those joins.",
    "d": [
      "Shipped in the golden service template.",
      "In-process plus a node agent. Both are required.",
      "Always on. Not gated on a feature flag named prod.",
      "This is the first write onto the observability board."
    ],
    "triggers": "The process, always on.",
    "stores": "Nothing durable. It emits.",
    "talksTo": "The OTel collector."
  },
  "otel-collector": {
    "n": "OTel collector",
    "p": "obs",
    "w": "Always-on hop. Sample, redact, route. SDKs talk here. Backends talk here. When this hop dies, the observability board goes blank. Heartbeats from this collector are what the obs-guard expects.",
    "y": "A collector is not optional plumbing. It is the difference between a dark board and a board you can trust. Agents must not invent a story from a dead collector. The missing trace is the signal, if and only if a heartbeat was expected.",
    "d": [
      "Always on. Not a CI step.",
      "Redact before route. Secrets do not belong in Tempo.",
      "Heartbeat is part of the contract, not an afterthought.",
      "A dead collector freezes promotions. See the outage band."
    ],
    "triggers": "SDK emit, continuously.",
    "stores": "In-flight batches only. Durable store is the backends.",
    "talksTo": "Prometheus, Loki or Elastic, Tempo or Jaeger, Datadog. Heartbeats to the obs-guard."
  },
  "prometheus": {
    "n": "Prometheus",
    "p": "obs",
    "w": "SLIs plus the HPA and CA source. Same metrics the dashboards use. Same metrics the canary agent compares. A gap here is not all green. It is a missing heartbeat.",
    "y": "One metrics plane is how you stop arguing about whose graph is real. HPA, canary, and pages have to consume the same series. Agents that optimize from a private exporter will ship a fiction.",
    "d": [
      "HPA and CA consume these metrics.",
      "Canary baseline versus candidate lives here.",
      "Absence of a series that should exist is an alert, not a pass.",
      "Not a replacement for logs or traces."
    ],
    "triggers": "The collector, scrape configs, continuously.",
    "stores": "Time series.",
    "talksTo": "Grafana, HPA, CA, alerts, the canary agent, the SRE agent."
  },
  "loki": {
    "n": "Loki, Elastic",
    "p": "obs",
    "w": "Logs. No SSH. Services write through the collector. Engineers and the SRE agent read here. An agent does not log into a node to just check.",
    "y": "SSH-as-observability is how you lose the board. Logs as a queryable store are how an incident agent can join a request ID to a line without a meeting.",
    "d": [
      "No SSH to production nodes for logs.",
      "Retention and redaction are policy.",
      "Join keys (trace id, request id) are required in the template.",
      "A log gap during an expected heartbeat is an outage signal."
    ],
    "triggers": "The collector, continuously.",
    "stores": "Log streams.",
    "talksTo": "Grafana, the SRE agent, engineers."
  },
  "tempo": {
    "n": "Tempo, Jaeger, Datadog",
    "p": "obs",
    "w": "Traces across the fan-out. Tempo or Jaeger for the open path. Datadog as a unified APM on the same stream, not a second dialect. The SRE agent reads a trace the way a human does: one request, every hop.",
    "y": "A feed that fans out without traces is a guess. Agents that repair from metrics alone will patch the wrong service. Traces are the board that names the hop.",
    "d": [
      "One emit path through the collector.",
      "Datadog is a backend, not a sidecar per language.",
      "Trace id is the join key for logs and errors.",
      "A missing trace when a heartbeat was expected is dark, not healthy."
    ],
    "triggers": "The collector, continuously.",
    "stores": "Trace spans.",
    "talksTo": "Grafana, Datadog UI, the SRE agent, engineers."
  },
  "grafana": {
    "n": "Grafana",
    "p": "obs",
    "w": "Golden dashboards, SSO, SLO board. This is a stigmergic surface humans and agents both read. Dashboards are not decoration. They are the board the next change is written from.",
    "y": "A private dashboard per team is a side channel. Golden dashboards are how a canary agent, an SRE agent, and an engineer agree on what good looks like. SSO is required. Shared links, not screenshots in chat, are the trace.",
    "d": [
      "Golden dashboards ship with the service template.",
      "SLO board is visible. Error-budget burn is a trace.",
      "SSO. No anonymous admin.",
      "Empty panels during an expected heartbeat are an outage, not a pass."
    ],
    "triggers": "Engineers, agents, and alert links.",
    "stores": "Dashboard JSON in Git. Query results from backends.",
    "talksTo": "Prometheus, Loki, Tempo, alerts, the obs board."
  }
});
