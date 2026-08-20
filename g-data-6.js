window.IDP_DATA = Object.assign(window.IDP_DATA || {}, {
  "otel-collector": {
    "n": "OTel collector",
    "p": "obs",
    "w": "Always-on control-plane hop. The collector receives from SDKs and agents, processes (sample, redact, route), and fans out to backends. It is not a warehouse. Warehouses are Prometheus, Loki, Tempo, Datadog.",
    "y": "Apps should not know your SaaS keys or your retention policy. The collector is where the platform applies those opinions once. It is also a place you can shed load without asking every binary to change.",
    "d": [
      "Always on, like Argo CD and the API server.",
      "Fan-out, not storage.",
      "Redaction of secrets happens here, not in Grafana.",
      "A collector outage is a platform incident. Apps keep running."
    ]
  },
  "prometheus": {
    "n": "Prometheus",
    "p": "obs",
    "w": "Metrics store and query. SLIs (RPS, latency, error rate, saturation) are derived here and drive HPA, canary analysis, and paging. Kubernetes infra metrics (API server, kubelet, node, network) live on the same platform.",
    "y": "Dashboards without a query store are screenshots. Prometheus is the store HPA can consume and the store a burn-rate alert can evaluate. It is not optional decoration on the side of the path.",
    "d": [
      "HPA and cluster autoscaler consume the same metrics.",
      "Cardinality is a design problem, not a surprise.",
      "Infra metrics and app metrics share the plane.",
      "A missing metric is a broken contract, like a missing test."
    ]
  },
  "loki": {
    "n": "Loki / Elasticsearch",
    "p": "obs",
    "w": "Log store. Applications and kubelets emit logs through OTel. This backend is how you ask what a single replica said during a bad deploy. It is not a substitute for metrics or traces.",
    "y": "SSH to read logs is how node identity dies. A log backend is how the platform keeps the inner loop of incident response off the machines. Retention and PII policy live here.",
    "d": [
      "Query/store, not a shipping path.",
      "Correlate with traces via shared IDs.",
      "Do not treat logs as metrics. That is why Prometheus exists.",
      "Access is SSO, not a shared password."
    ]
  },
  "tempo": {
    "n": "Tempo / Jaeger",
    "p": "obs",
    "w": "Trace store. A user request that fans out across news-feed, user, ranking, and media is one trace. Sampling decisions are platform policy, applied at the collector.",
    "y": "Without traces you cannot say where time went, only that it went. Traces are how a staff engineer debugs a golden-path change that compiled, passed tests, and still hurt tail latency.",
    "d": [
      "Vendor-neutral via OTel.",
      "Sampling is a collector concern.",
      "A deploy annotation on a trace is how you prove v1827 caused a shape.",
      "Not a replacement for metrics-based paging."
    ]
  },
  "datadog": {
    "n": "Datadog",
    "p": "obs",
    "w": "Unified APM and a second pair of eyes on the same OTel stream. Backends are interchangeable stores and UX. The SDK does not speak Datadog as a special case if you can avoid it. The collector exports here.",
    "y": "Some questions are faster in a commercial UX. That is fine if the collection layer stays yours. Datadog is a backend on this poster, not the identity of the observability plane.",
    "d": [
      "Fed by the collector, not by a second agent if you can help it.",
      "Useful for unified APM and correlation.",
      "Does not replace Prometheus as the HPA source unless you choose that deliberately.",
      "Keys and retention are platform-owned."
    ]
  },
  "grafana": {
    "n": "Grafana",
    "p": "obs",
    "w": "Dashboards and explore. Grafana reads Prometheus, Loki, Tempo, and whatever else the collector feeds. SLOs are visible here. This is not where alerts should secretly live if you can keep them as code.",
    "y": "A shared UX is how the people who shipped 1 through 10 look at the same truth. Folder sprawl is a platform problem. Golden dashboards ship with the golden service template.",
    "d": [
      "Query UX over the backends, not a store of record.",
      "Golden dashboards are reviewed like code.",
      "Explore is for incidents. The SLO board is for the week.",
      "Access is SSO."
    ]
  },
  "alerts": {
    "n": "Alerts and SLOs",
    "p": "alert",
    "w": "Burn-rate alerts, canary shifts, infra errors (image-pull, admission denial, API latency). Alert state and SLO error-budget counters live here. A bad deploy is a burn-rate alert and a canary metric shift. Remediation is a GitOps revert, not a CI re-run of a deploy script.",
    "y": "Observability that does not page and does not change a decision is a hobby. SLOs are how the platform says what matters. Alerts are how that statement becomes a human in the loop.",
    "d": [
      "Derived from the same SLIs that drive HPA.",
      "Product engineers get paged on their SLOs.",
      "Platform team pages on control-plane health.",
      "Canary analysis plus git revert is rollback through Argo."
    ]
  },
  "engineers": {
    "n": "Engineers and platform team",
    "p": "ppl",
    "w": "The dotted purple loop closes here. Production telemetry becomes a page, a canary decision, a capacity plan, or a rollback PR. Product engineers own their SLOs. Platform engineers own control-plane health and, rarely, a Terraform change when capacity is the answer. They do not log into nodes.",
    "y": "A path that does not return to people is automation without learning. This box is why the poster is a loop, not a slide. Next month's infra is written from this week's saturation, not from a guess in Q1.",
    "d": [
      "Rollback is Git, synced by Argo CD.",
      "Capacity is Terraform, on purpose, not daily.",
      "The same telemetry serves both groups.",
      "No SSH as a workflow."
    ]
  },
  "step1": {
    "n": "1. Commit and open the PR",
    "p": "step",
    "w": "A developer writes newsfeed-service on the platform toolchain and commits. Local checks already match CI. They push and open a pull request. This is the only human trigger that will follow.",
    "y": "If shipping requires a second human ritual after the PR, the path will be bypassed. Starting the whole poster with a commit is the operating rule: people write Git, machines do the rest.",
    "d": []
  },
  "step2": {
    "n": "2. CI gates",
    "p": "step",
    "w": "The pull request triggers the fail-closed gate set: compile, static analysis, lint, type check, unit tests, security scan, dependency scan, policy. A skipped required check is a failure.",
    "y": "Validation is cheap here and expensive in production. Making every gate required is how the platform defines done without a meeting.",
    "d": []
  },
  "step3": {
    "n": "3. Distributed integration tests",
    "p": "step",
    "w": "A coordinator shards suites onto a worker pool and ephemeral environments. Results return to the PR. This is not one CI agent box and not the developer laptop.",
    "y": "Some truths only appear when services talk to each other. The platform owes you that proof without a shared staging snowflake.",
    "d": []
  },
  "step4": {
    "n": "4. Build an immutable image",
    "p": "step",
    "w": "The build service produces an OCI image from the green SHA. No latest tag. Argo CD will never build this image.",
    "y": "A digest is the only artifact the rest of the path can agree on. A rebuild per environment is how you lose the ability to say what is running.",
    "d": []
  }
});
