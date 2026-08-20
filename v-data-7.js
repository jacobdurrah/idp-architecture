window.IDP_DATA = Object.assign(window.IDP_DATA || {}, {
  "redis": {
    "n": "Redis",
    "p": "data",
    "w": "Cache and short-lived coordination for the feed path. News feed, ranking, and user services use it. Ephemeral keys. Not the source of truth. Provisioned as a managed service by Terraform.",
    "y": "The feed cannot hit SQL on every fan-out and still keep a latency SLO. Redis is the cheap memory that makes the read path possible. Treating it as truth is how you lose posts on a failover.",
    "d": [
      "Not durable product state.",
      "Talks to News Feed, Ranking, User.",
      "Sized by telemetry, created by Terraform.",
      "A cache miss is normal. A cache as system of record is not."
    ],
    "triggers": "Application services.",
    "stores": "Ephemeral keys. Not the source of truth.",
    "talksTo": "News Feed, Ranking, User."
  },
  "kafka": {
    "n": "Kafka",
    "p": "data",
    "w": "Async fan-out: notifications, feed invalidation, downstream indexers. Producers in the app services write. Consumers (notifications, search indexers) read. Retained streams, not user-facing reads.",
    "y": "Not everything should be on the request path. A log lets you add a consumer next quarter without asking the feed to know about it. It is also how you replay. That is why it is a platform service, not a library inside one binary.",
    "d": [
      "Triggered by producers in app services.",
      "Provisioned by Terraform.",
      "Talks to Notification, search indexers, and any consumer the platform added.",
      "Not a replacement for SQL."
    ],
    "triggers": "Producers in the app services.",
    "stores": "Retained streams, not user-facing reads.",
    "talksTo": "Notification, search indexers, any added consumer."
  },
  "objstore": {
    "n": "Object storage",
    "p": "data",
    "w": "Media bytes. The media service holds metadata and authorization. The bucket holds the objects. The CDN often fetches via signed URLs. Provisioned by Terraform. Versioning and lifecycle are infra policy.",
    "y": "Blobs in block disks attached to pods will be lost. Object storage is the data-plane store that matches how media is actually used: write once, read many, cache at the edge.",
    "d": [
      "Triggered by Media service and the CDN.",
      "Stores blobs, not rows.",
      "Public-by-default is a misconfiguration.",
      "Created by plane B."
    ],
    "triggers": "Media service and the CDN.",
    "stores": "Blobs.",
    "talksTo": "Media service, CDN / signed URLs."
  },
  "search": {
    "n": "Search",
    "p": "data",
    "w": "Index of posts and people. Fed asynchronously from the queue, not from the request path that renders a feed. Query path comes from news feed or a dedicated search API.",
    "y": "Search is a derived view. Building it on the write path of a post is how you miss SLOs. Feeding it from Kafka keeps the system of record thin and lets you rebuild the index.",
    "d": [
      "Triggered by indexers consuming Kafka.",
      "Stores search documents.",
      "Not the source of posts.",
      "Managed service, provisioned by Terraform."
    ],
    "triggers": "Indexers consuming Kafka.",
    "stores": "Search documents.",
    "talksTo": "Query path from News Feed / a dedicated search API."
  },
  "otel-sdk": {
    "n": "OpenTelemetry SDKs",
    "p": "obs",
    "w": "Every production service emits metrics, logs, and traces through the OpenTelemetry SDK (in-process) and a node agent. One vendor-neutral collection layer. Do not emit three competing agent stacks per pod.",
    "y": "If each team picks a different agent, you cannot ask a platform-wide question. OTel is the contract: apps speak one API, the collector decides where bytes go. It is also how a new backend does not become a rewrite.",
    "d": [
      "In-process plus node daemon.",
      "Triggered by the process, continuously, not by a CI step.",
      "Same SDK on news-feed and on the node.",
      "Context propagation is how a user request becomes a trace."
    ],
    "triggers": "The process and the node, continuously. Not a CI step.",
    "stores": "Nothing durable in-process beyond buffers.",
    "talksTo": "OTel collector."
  },
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
    ],
    "triggers": "Emit metrics / logs / traces from every pod and node.",
    "stores": "The collector is a fan-out, not a warehouse.",
    "talksTo": "Prometheus, Grafana, Datadog, Tempo / Jaeger, Loki / Elasticsearch."
  },
  "prometheus": {
    "n": "Prometheus",
    "p": "obs",
    "w": "Metrics store and query. SLIs (RPS, latency, error rate, saturation) are derived here and drive HPA, canary analysis, and paging. HPA and cluster autoscaler consume the same Prometheus metrics the dashboards use. Kubernetes infra metrics live on the same platform.",
    "y": "Dashboards without a query store are screenshots. Prometheus is the store HPA can consume and the store a burn-rate alert can evaluate. It is not optional decoration on the side of the path.",
    "d": [
      "HPA and cluster autoscaler consume the same metrics.",
      "Cardinality is a design problem, not a surprise.",
      "Infra metrics and app metrics share the plane.",
      "A missing metric is a broken contract, like a missing test."
    ],
    "triggers": "The collector, continuously.",
    "stores": "Metrics and the derived SLIs / SLOs.",
    "talksTo": "Alerting, HPA (custom metrics), engineers."
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
    ],
    "triggers": "The collector.",
    "stores": "Logs.",
    "talksTo": "Grafana, incidents."
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
    ],
    "triggers": "The collector.",
    "stores": "Traces.",
    "talksTo": "Grafana, canary analysis."
  }
});
