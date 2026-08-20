window.IDP_DATA = Object.assign(window.IDP_DATA || {}, {
  "svc-notify": {
    "n": "Notifications service",
    "p": "data",
    "w": "Fan-out, push, and email. Domain events on Kafka trigger it. Delivery state and preferences are its store. It talks to external push and email providers and back to User service.",
    "y": "Synchronous notification on the feed path is how you miss SLOs. An async service lets the feed return and lets retries live where they belong. It is also a blast radius you can page independently.",
    "d": [
      "×2 typical.",
      "Triggered by the queue, not by the user request that created the post.",
      "Talks to Kafka, User service, and external providers.",
      "Same golden path. Credentials for providers are not in the image."
    ]
  },
  "autoscaling": {
    "n": "Autoscaling",
    "p": "ctrl",
    "w": "Traffic up, CPU or RPS up, HPA adds pod replicas. If nodes are packed, the cluster autoscaler adds nodes. Traffic down, HPA removes pods, CA drains idle nodes. Signals come from the observability plane, not from CI. Scale-out is not a Terraform apply and not a CI job.",
    "y": "A platform that scales by ticket will be over-provisioned and still page. Closing the loop from SLIs to replicas and nodes is what makes the data plane elastic. The same Prometheus metrics serve dashboards and these controllers.",
    "d": [
      "HPA is the pod loop. CA is the node loop.",
      "Always on, in-cluster.",
      "CI does not scale production.",
      "Capacity that still is not enough becomes a plane-B Terraform change."
    ]
  },
  "hpa": {
    "n": "Horizontal pod autoscaler",
    "p": "ctrl",
    "w": "Pod replica loop. HPA reads metrics (CPU, RPS, custom) and writes replica counts onto Deployments. It is a Kubernetes object, desired in Git, acting continuously. News feed is the example: four replicas is a floor, not a personality.",
    "y": "Humans guessing replica counts will be wrong twice a day. HPA turns SLIs into the only guess that matters. It also makes a bad deploy visible: replicas climb while error rate climbs, which is a canary signal.",
    "d": [
      "Triggered by metrics APIs, continuously.",
      "Stores HPA objects and the replica counts it writes.",
      "Talks to metrics APIs and the API server.",
      "Not a Terraform apply."
    ]
  },
  "ca": {
    "n": "Cluster autoscaler",
    "p": "ctrl",
    "w": "Node loop. If pods are unschedulable, CA adds nodes. If traffic falls and HPA removes pods, CA drains idle nodes. Same telemetry plane as HPA. The rare moment control plane touches plane B without a Terraform run is CA calling the cloud API to mint or retire a VM.",
    "y": "A fixed node pool is either waste or a pending incident. CA makes the node group elastic within the bounds Terraform already created (instance types, max size). Bigger bounds are a plane-B change.",
    "d": [
      "Triggered by unschedulable pods and underused nodes.",
      "Talks to the API server and the cloud provider APIs.",
      "Max size is desired infra, owned by Terraform.",
      "Drains respect PDBs."
    ]
  },
  "sql": {
    "n": "Cloud SQL",
    "p": "data",
    "w": "System of record for users, posts, and the relational slice of the feed. Provisioned by Terraform, consumed by services, never migrated by a CI deploy job. Backups and replicas are plane-B concerns.",
    "y": "Relational data does not belong in a container filesystem. A managed database is the boring store that survives a node drain. Schema changes are versioned and applied by a deliberate job, not by the rolling deploy of v1827.",
    "d": [
      "Triggered by application services.",
      "Created by Terraform, not by Argo CD.",
      "The services that own the tables talk to it.",
      "A feature ship does not apply a database."
    ]
  },
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
    ]
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
    ]
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
    ]
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
    ]
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
    ]
  }
});
