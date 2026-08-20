window.IDP_CONTENT = Object.assign(window.IDP_CONTENT || {}, {
  k8s: {
    name: "Kubernetes cluster (managed)",
    plane: "both",
    kicker: "Control + data · Steps 10–11",
    does: "Schedule, restart, scale, service discovery, networking, rolling deploys. The API server is the desired/actual gateway. Controllers converge. This cluster was provisioned by Terraform; Argo CD deploys workloads onto it.",
    triggers: "Argo CD writes desired workload objects. HPA and Cluster Autoscaler write scale decisions from observability signals.",
    stores: "etcd, via the API server: every Deployment, Pod, Service, HPA, Ingress.",
    talksTo: "kubelets on worker nodes, the cloud provider (via CCM / CA), and Argo CD."
  },
  "api-server": {
    name: "API Server",
    plane: "control",
    kicker: "Control plane · Step 10",
    does: "Desired / actual gateway. Step 10: Kubernetes API accepts the desired Deployment / Service / HPA / Ingress. Every other control loop is a client of this server.",
    triggers: "Argo CD, HPA, Cluster Autoscaler, controllers — not product-engineer laptops in production.",
    stores: "Nothing itself — etcd is behind it.",
    talksTo: "etcd, admission webhooks, every controller and kubelet."
  },
  scheduler: {
    name: "Scheduler",
    plane: "control",
    kicker: "Control plane · Step 11",
    does: "Binds pods to nodes. Step 11 starts here: the scheduler places the new replicaset, then kubelet pulls newsfeed-service:v1827 from the artifact registry.",
    triggers: "Unbound pods in the API.",
    stores: "Bindings, as API objects.",
    talksTo: "API server. It does not pull images."
  },
  "controller-mgr": {
    name: "Controller Manager",
    plane: "control",
    kicker: "Control plane",
    does: "The built-in reconcilers: Deployment, ReplicaSet, Service, Job, and the rest. They are why “apply a Deployment” becomes running pods.",
    triggers: "Changes to watched API objects.",
    stores: "Nothing durable outside the API.",
    talksTo: "API server only."
  },
  hpa: {
    name: "Horizontal Pod Autoscaler",
    plane: "control",
    kicker: "Control plane",
    does: "Pod replica loop. Traffic up → CPU / RPS up → HPA adds replicas. Signals come from the observability plane, not from CI. Scale-out is not a Terraform apply and not a CI job.",
    triggers: "Metrics from Prometheus / custom metrics APIs, continuously.",
    stores: "HPA objects and the replica counts it writes onto Deployments.",
    talksTo: "Metrics APIs and the API server."
  },
  "cluster-autoscaler": {
    name: "Cluster Autoscaler",
    plane: "control",
    kicker: "Control plane",
    does: "Node loop. If nodes are packed, CA adds nodes. If traffic falls and HPA removes pods, CA drains idle nodes. Same telemetry plane as HPA.",
    triggers: "Unschedulable pods and underused nodes.",
    stores: "Nothing in-cluster beyond the node objects it requests.",
    talksTo: "API server and the cloud provider APIs that actually mint VMs. That is the rare moment control plane touches plane B without a Terraform run."
  },
  workers: {
    name: "Worker nodes — data plane",
    plane: "data",
    kicker: "Data plane · Step 11",
    does: "Three nodes shown, each with kube-proxy, an OTel agent, and application pods. kubelet pulls newsfeed-service:v1827 from the artifact registry. A rolling deploy replaces the old replicaset; service discovery and the load balancer shift traffic.",
    triggers: "Scheduler bindings and kubelet’s own sync loop.",
    stores: "Container filesystem, image cache, pod network state. Not desired state.",
    talksTo: "API server (status), artifact registry (image pull), and the node network path to users and datastores."
  },
  app: {
    name: "News Feed — production application",
    plane: "data",
    kicker: "Data plane",
    does: "A simplified but honest distributed news feed: News Feed, User, Post, Recommendation, Media, and Notification services, plus PostgreSQL, Redis, Kafka / Pub/Sub, object storage, and search. Replica ticks sit on the hot path.",
    triggers: "Internet users, via DNS / CDN → cloud LB → ingress / API gateway → News Feed API.",
    stores: "Posts, graphs, media metadata, notification fanout — in the managed data services, not in the pods.",
    talksTo: "The data services on the right, and OTel on the way out."
  },
  "edge-path": {
    name: "Internet path (data plane)",
    plane: "data",
    kicker: "Data plane",
    does: "Users → DNS / CDN → cloud load balancer → ingress / API gateway → News Feed API. This is request traffic, not a deploy path.",
    triggers: "People opening the product.",
    stores: "TLS certs and routing rules (ingress), not application state.",
    talksTo: "News Feed API, then the six app services."
  },
  "newsfeed-svc": {
    name: "News Feed Service",
    plane: "data",
    kicker: "Data plane · ×4 · HPA",
    does: "Stateless feed assembly. Four replicas on the hot path, HPA-managed. This is the service whose image (v1827) the rest of the diagram traces.",
    triggers: "Ingress / API gateway.",
    stores: "Nothing durable. Reads users, posts, rankings, media metadata.",
    talksTo: "User, Post, Recommendation, Media, Notification; Redis; the edge."
  },
  "user-svc": {
    name: "User Service",
    plane: "data",
    kicker: "Data plane · ×3",
    does: "Profile, graph, authn.",
    triggers: "News Feed and the edge (session / auth).",
    stores: "Identity and graph edges in PostgreSQL / the graph store.",
    talksTo: "PostgreSQL, Redis, News Feed."
  },
  "post-svc": {
    name: "Post Service",
    plane: "data",
    kicker: "Data plane · ×3",
    does: "Create / read posts.",
    triggers: "News Feed and authoring clients.",
    stores: "Post records in PostgreSQL; fanout hints on the queue.",
    talksTo: "PostgreSQL, Kafka / Pub/Sub, News Feed."
  },
  "reco-svc": {
    name: "Recommendation Service",
    plane: "data",
    kicker: "Data plane · ×3",
    does: "Rank and candidate generation for the feed.",
    triggers: "News Feed, on each request path that needs ranking.",
    stores: "Model features and candidate caches, not the source of posts.",
    talksTo: "News Feed, Redis, feature stores behind the diagram."
  },
  "media-svc": {
    name: "Media Service",
    plane: "data",
    kicker: "Data plane · ×2",
    does: "Images / video metadata. Bytes live in object storage; this service is the index and the authorization gate.",
    triggers: "News Feed and authoring clients.",
    stores: "Metadata in its DB; objects in the bucket.",
    talksTo: "Object storage, News Feed."
  },
  "notify-svc": {
    name: "Notification Service",
    plane: "data",
    kicker: "Data plane · ×2",
    does: "Fanout, push, email.",
    triggers: "Domain events on Kafka / Pub/Sub.",
    stores: "Delivery state and preferences.",
    talksTo: "The queue, external push / email providers, User Service."
  },
  postgres: {
    name: "PostgreSQL / Cloud SQL",
    plane: "data",
    kicker: "Data plane · managed",
    does: "System of record for users, posts, and the relational slice of the feed. Provisioned by Terraform, consumed by services, never migrated by a CI “deploy” job.",
    triggers: "Application services.",
    stores: "Relational product data.",
    talksTo: "The services that own the tables. Backups and replicas are plane-B concerns."
  },
  redis: {
    name: "Redis",
    plane: "data",
    kicker: "Data plane · managed",
    does: "Cache and short-lived coordination for the feed path.",
    triggers: "Application services.",
    stores: "Ephemeral keys. Not the source of truth.",
    talksTo: "News Feed, Recommendation, User."
  },
  kafka: {
    name: "Kafka / Pub/Sub",
    plane: "data",
    kicker: "Data plane · managed",
    does: "Async fanout — notifications, feed invalidation, downstream indexers.",
    triggers: "Producers in the app services.",
    stores: "Retained streams, not user-facing reads.",
    talksTo: "Notification, search indexers, any consumer the platform team added."
  },
  "object-store": {
    name: "Object storage",
    plane: "data",
    kicker: "Data plane · managed",
    does: "Media bytes. The Media Service holds metadata and authorization; the bucket holds the objects.",
    triggers: "Media Service and the CDN.",
    stores: "Blobs.",
    talksTo: "Media Service, CDN / signed URLs."
  },
  search: {
    name: "Search",
    plane: "data",
    kicker: "Data plane · managed",
    does: "Index of posts and people. Fed asynchronously from the queue, not from the request path that renders a feed.",
    triggers: "Indexers consuming Kafka / Pub/Sub.",
    stores: "Search documents.",
    talksTo: "Query path from News Feed / a dedicated search API."
  },
  "autoscale-loop": {
    name: "Autoscaling feedback loop",
    plane: "both",
    kicker: "Control loop over a data plane",
    does: "Traffic up → CPU / RPS up → HPA adds pod replicas. If nodes are packed → Cluster Autoscaler adds nodes. Traffic down → HPA removes pods → CA drains nodes. Signals come from the observability plane, not from CI. HPA and CA run continuously in-cluster.",
    triggers: "SLIs: RPS, latency, error rate, saturation, custom metrics.",
    stores: "Replica and node counts, as live API objects.",
    talksTo: "Observability backends, API server, cloud provider (for nodes)."
  },
  "workload-path": {
    name: "How a workload reaches a running prod pod",
    plane: "both",
    kicker: "Steps 1–12 in one column",
    does: "1–8 happen off-cluster (developer → Git → CI → image → gitops manifest). 9 Argo CD reads platform-gitops and diffs against the API server. 10 API accepts the desired Deployment / Service / HPA / Ingress. 11 Scheduler places pods; kubelet pulls newsfeed-service:v1827; rolling deploy replaces the old replicaset; the load balancer shifts traffic. 12 Each pod and node emits metrics, logs, and traces through the OpenTelemetry agent.",
    triggers: "The merged gitops change, then the reconcilers.",
    stores: "Git (intent), registry (bytes), API server (live), backends (telemetry).",
    talksTo: "Every plane on this map. Continuously running in this boundary: API server, scheduler, controller manager, kubelet, Argo CD, OTel agents, HPA, Cluster Autoscaler, and the application pods themselves."
  }
});
window.IDP_CONTENT = Object.assign(window.IDP_CONTENT || {}, {
  terraform: {
    name: "Infrastructure provisioning — plane B",
    plane: "control",
    kicker: "Control plane · dashed teal",
    does: "Terraform creates the infrastructure. Argo CD deploys workloads onto it. Distinct from the numbered app-delivery path. App developers never run Terraform to ship a feature. Terraform is invoked (plan/apply) and then exits; Argo CD is a long-running reconciler.",
    triggers: "A platform engineer, when node capacity, a new cluster, or a database must be created. Not a CI “deploy” job.",
    stores: "Desired infra in infra-terraform; last-applied in the remote state backend.",
    talksTo: "Remote state (lock + state) and the cloud provider APIs, which mint VPC, subnets, cluster, nodes, load balancers, databases, object storage, IAM, DNS, secrets, queues."
  },
  "platform-eng": {
    name: "Platform engineer",
    plane: "control",
    kicker: "Control plane · Plane B",
    does: "Authors infrastructure as code. Owns plane B. Does not merge application features and does not click-apply production workloads.",
    triggers: "A ticket or a capacity signal that actually requires new substrate.",
    stores: "The infra-terraform working tree.",
    talksTo: "Terraform."
  },
  "tf-engine": {
    name: "Terraform (IaC)",
    plane: "control",
    kicker: "Control plane · invoke, then exit",
    does: "plan/apply versus infra-terraform. Cloud resources follow Git. Opposite personality from Argo CD: a CLI run, not a daemon.",
    triggers: "Platform engineer (or a tightly gated infra pipeline — still not the app CI).",
    stores: "Nothing itself. State is remote.",
    talksTo: "Remote state backend and cloud provider APIs."
  },
  "remote-state": {
    name: "Remote state backend",
    plane: "control",
    kicker: "Control plane · store",
    does: "S3 + DynamoDB lock, or GCS. The lock prevents concurrent apply. This is the other half of desired infra state — Git is human-readable intent; the backend is what Terraform last believed it created.",
    triggers: "Every Terraform run.",
    stores: "State snapshots and the lock.",
    talksTo: "Terraform only."
  },
  "cloud-apis": {
    name: "Cloud provider APIs",
    plane: "control",
    kicker: "Control plane · apply",
    does: "AWS / GCP / Azure APIs. Terraform is the client. This is where a VPC or a database actually comes into existence.",
    triggers: "Terraform apply.",
    stores: "The cloud’s own resource graph (the real world).",
    talksTo: "The data-plane substrate on the right of this band."
  },
  "cluster-ready": {
    name: "Kubernetes + network + data services, ready for Argo CD",
    plane: "data",
    kicker: "Data plane substrate",
    does: "VPC, subnets, cluster, nodes, load balancers, databases, object storage, IAM, DNS, secrets, queues — the thing Argo CD deploys onto. Pods, load balancers, databases are data plane. API server, HPA, CA, Argo CD are control plane.",
    triggers: "A successful Terraform apply.",
    stores: "The running cloud account.",
    talksTo: "Argo CD (once the API server is up) and the application data plane."
  },
  "infra-caption": {
    name: "Second flow — infrastructure",
    plane: "control",
    kicker: "Dashed teal · not steps 1–12",
    does: "Platform Engineer → Terraform → remote state → Cloud Provider APIs → network / Kubernetes / LB / DB / storage → cluster ready for Argo CD. If node capacity, a new cluster, or a database must be created, that is this flow. Caption on the diagram: Terraform creates the infrastructure. Argo CD deploys workloads onto it.",
    triggers: "Platform engineers.",
    stores: "infra-terraform + remote state.",
    talksTo: "The cloud, then (indirectly) Argo CD, which finds an API server that already exists."
  },
  otel: {
    name: "Observability platform",
    plane: "control",
    kicker: "Control plane · Step 12 · dotted rose",
    does: "Every production service and Kubernetes node emits metrics, logs, and traces. OpenTelemetry is the vendor-neutral collection layer; backends are interchangeable stores / UX. Do not emit three competing agent stacks per pod. Observability is not a dead end — it feeds engineering.",
    triggers: "The process and the node, continuously. Not a CI step.",
    stores: "Backends: Prometheus (metrics), Grafana (dashboards), Datadog (unified APM), Tempo / Jaeger (traces), Loki / Elasticsearch (logs).",
    talksTo: "HPA, canary analysis, paging, capacity planning, and the people who shipped 1–12."
  },
  "otel-path": {
    name: "Collection path",
    plane: "both",
    kicker: "Step 12",
    does: "Apps / K8s nodes → OTel SDK / agent (in-process + node daemon) → OTel collector (always-on control-plane hop) → backends. Agents run on every node (data-plane adjacency, control purpose).",
    triggers: "Emit metrics / logs / traces from every pod and node.",
    stores: "The collector is a fan-out, not a warehouse. Warehouses are the backends.",
    talksTo: "Prometheus, Grafana, Datadog, Tempo / Jaeger, Loki / Elasticsearch."
  },
  "otel-backends": {
    name: "Telemetry backends",
    plane: "control",
    kicker: "Control plane · query / store",
    does: "Backends are query/store systems. SLIs (RPS, latency, error rate, saturation) are derived here and drive HPA, canary analysis, and paging — not a dashboard graveyard. Also in: Kubernetes infra metrics (API server, kubelet, node, network) on the same platform.",
    triggers: "The collector, continuously.",
    stores: "Metrics, logs, traces, and the derived SLIs / SLOs.",
    talksTo: "Alerting, HPA (custom metrics), engineers."
  },
  feedback: {
    name: "Feedback to engineering",
    plane: "control",
    kicker: "Dotted rose · closes the loop",
    does: "Production telemetry → OTel → Datadog / Prometheus → alerts / SLOs → engineers / platform team. The same path feeds incident response, deployment health, canary analysis, autoscaling signals, capacity planning, SLO error budgets, cost / cardinality, and release rollback.",
    triggers: "Burn-rate, canary shift, infra error (image-pull, admission denial, API latency).",
    stores: "Alert state and SLO error-budget counters.",
    talksTo: "The people who can merge a gitops rollback or open an infra-terraform change. They do not log into nodes."
  },
  "telemetry-behavior": {
    name: "How telemetry changes engineering behavior",
    plane: "control",
    kicker: "Closes the loop",
    does: "A bad deploy is a burn-rate alert and a canary metric shift — Argo CD / gitops rollback is the remediation, not a CI re-run of a deploy script. HPA and Cluster Autoscaler consume metrics from this plane. Platform team uses the same telemetry for control-plane health (Argo CD sync, API server latency, image-pull errors, admission denials). Product engineers get paged on their SLOs. Capacity planning (new node groups, bigger DBs) feeds back into plane B: Terraform. That is the rare, deliberate infra change — not the daily feature path.",
    triggers: "SLOs and pages.",
    stores: "The organization’s memory of what shipped and what broke.",
    talksTo: "Git (rollback PR), Terraform (capacity), and humans."
  },
  "step-1": {
    name: "1 — Commit from a standardized laptop",
    plane: "control",
    kicker: "Step 1 of 12",
    does: "A developer writes newsfeed-service on the platform toolchain and commits. Local checks already match CI. This is the only human trigger that will follow.",
    triggers: "The developer.",
    stores: "The working tree, then the pushed branch.",
    talksTo: "Git."
  },
  "step-2": {
    name: "2 — Desired state in Git",
    plane: "control",
    kicker: "Step 2 of 12",
    does: "The change lands in the right repo. Application code goes to app-newsfeed. The five-repo split (app-*, platform-gitops, infra-terraform, ci-pipelines) is the source of truth the rest of the path reads.",
    triggers: "git push.",
    stores: "The commit.",
    talksTo: "CI, via webhook."
  },
  "step-3": {
    name: "3 — PR #4821 becomes the contract",
    plane: "control",
    kicker: "Step 3 of 12",
    does: "The pull request is a first-class gate. Required checks (CI, lint, types, unit, SAST/SCA, policy, integration, review) must go green. Nothing has been deployed.",
    triggers: "Opening the PR against main.",
    stores: "The diff and the status checks.",
    talksTo: "CI and reviewers."
  },
  "step-4": {
    name: "4 — Fail-closed validation",
    plane: "control",
    kicker: "Step 4 of 12",
    does: "Compile, static analysis, lint, type check, unit tests, SAST, SCA, policy. Fail-closed. A skipped required check is a failure.",
    triggers: "The PR.",
    stores: "Check statuses and artifacts.",
    talksTo: "Branch protection."
  },
  "step-5": {
    name: "5 — Distributed integration tests",
    plane: "control",
    kicker: "Step 5 of 12",
    does: "A scheduler shards suites onto a worker pool and ephemeral environments. Results return to the PR. This is not one CI agent box and not the developer laptop.",
    triggers: "CI, as a required gate.",
    stores: "Job state and logs.",
    talksTo: "The status-check API."
  },
  "step-6": {
    name: "6 — Build an immutable image",
    plane: "control",
    kicker: "Step 6 of 12",
    does: "The Build Service produces an OCI image from the green SHA. No latest tag. Argo CD will never build this image.",
    triggers: "Green validation.",
    stores: "Build provenance. Bytes go to the registry.",
    talksTo: "Artifact registry."
  },
  "step-7": {
    name: "7 — Store newsfeed-service:v1827",
    plane: "control",
    kicker: "Step 7 of 12",
    does: "The registry accepts the immutable digest. Promotion is a new pointer, not a rebuild. If the digest is not here, no pod will start.",
    triggers: "The Build Service push.",
    stores: "Image, SBOM, signatures.",
    talksTo: "Later: kubelet, on step 11."
  },
  "step-8": {
    name: "8 — Write the digest into platform-gitops",
    plane: "control",
    kicker: "Step 8 of 12",
    does: "CI updates the Deployment manifest with newsfeed-service:v1827 (or its digest). That write is the deploy. The gitops PR is policy-gated. CI still has not talked to Kubernetes.",
    triggers: "Green image publish.",
    stores: "The manifest in platform-gitops.",
    talksTo: "Argo CD, which is already watching."
  },
  "step-9": {
    name: "9 — Argo CD reconciles",
    plane: "control",
    kicker: "Step 9 of 12",
    does: "The always-on reconciler diffs platform-gitops against the API server and syncs. Drift from a console click is reversed. This is not a CI job.",
    triggers: "The gitops commit, plus the resync loop.",
    stores: "Sync status. Desired state stays in Git.",
    talksTo: "Kubernetes API."
  },
  "step-10": {
    name: "10 — Kubernetes API accepts desired state",
    plane: "control",
    kicker: "Step 10 of 12",
    does: "Deployment, Service, HPA, Ingress are written. Admission (OPA / Kyverno / PSS) evaluates provenance and the registry allow-list again.",
    triggers: "Argo CD apply.",
    stores: "etcd, via the API server.",
    talksTo: "Scheduler, controllers, admission webhooks."
  },
  "step-11": {
    name: "11 — Nodes pull and run",
    plane: "data",
    kicker: "Step 11 of 12",
    does: "Scheduler binds pods. kubelet pulls newsfeed-service:v1827 from the registry using the node’s cloud identity. A rolling deploy replaces the old replicaset; service discovery and the load balancer shift traffic.",
    triggers: "Unbound pods, then kubelet.",
    stores: "Image cache and running containers.",
    talksTo: "Registry (pull) and the data-plane network (users, databases)."
  },
  "step-12": {
    name: "12 — Emit metrics, logs, traces",
    plane: "control",
    kicker: "Step 12 of 12",
    does: "Each pod and node emits through the OpenTelemetry agent / daemon to the collector and then to backends. SLIs drive HPA, canary, and pages. A bad deploy is rolled back through gitops, not by re-running a deploy script.",
    triggers: "The process, always on.",
    stores: "Backends and SLO counters.",
    talksTo: "Engineers, HPA, Cluster Autoscaler, and — rarely — Terraform, when capacity is the answer."
  }
});
