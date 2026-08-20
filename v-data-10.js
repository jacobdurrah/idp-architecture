window.IDP_DATA = Object.assign(window.IDP_DATA || {}, {
  "suites": {
    "n": "Integration suites",
    "p": "ctrl",
    "w": "Suites in flight: newsfeed-it, users-it, contract, e2e-feed, and policy-it. A scheduler shards them, assigns workers, and enforces timeouts and retries. Each job gets an ephemeral environment (per-job namespace, compose stack, or preview cluster) that is torn down after the run. Fail-closed. Results post to PR #4821.",
    "y": "Naming the suites is how you stop saying tests and meaning nothing. These five are the contract for a news-feed change. Merge queue does not pop a red PR. Shared staging is not an acceptable substitute.",
    "d": [
      "newsfeed-it and users-it cover the two app repos on this poster.",
      "contract keeps the fan-out honest without a full e2e on every shard.",
      "e2e-feed is the slow proof. policy-it is the admit-time rehearsal.",
      "Ephemeral per-job envs. No shared staging snowflake."
    ],
    "triggers": "CI, as a required gate on the PR.",
    "stores": "Job queue state, per-job logs, and a result posted back to the PR.",
    "talksTo": "Ephemeral test environments and the Git status API."
  },
  "image-v1827": {
    "n": "newsfeed-service:v1827",
    "p": "ctrl",
    "w": "The concrete artifact this map traces. Digest sha256:9f3a…c21, linux/amd64, 184 MB, immutable. SBOM plus cosign signature. No :latest. Promotion is a new pointer (build-sha-a1b2 → v1827), not a rebuild. No rebuild between environments.",
    "y": "A named digest is the only thing Git, the registry, kubelet, and admission can agree on. Floating tags are how you lose the ability to say what is running. 184 MB and linux/amd64 are on the poster so the artifact feels real.",
    "d": [
      "Triggered by a green CI SHA published by the build service.",
      "Stores the bytes plus attestations.",
      "platform-gitops references this digest. Worker nodes pull it.",
      "Admission will refuse an unsigned or off-allow-list image."
    ],
    "triggers": "A green CI SHA published by the build service.",
    "stores": "The bytes of the image plus its attestations.",
    "talksTo": "platform-gitops (the digest is written there) and worker nodes (they pull it)."
  },
  "admission": {
    "n": "Admission, OPA · Kyverno · PSS",
    "p": "ctrl",
    "w": "Policy and admission sit between Argo CD and the API server. Provenance, registry allow-list, resource limits, Pod Security Standards. Evaluated at CI (gate-policy) and again at admit so a bypassed pipeline still cannot land a bad pod. Every object create or update hits this chain.",
    "y": "Shift-left is not a replacement for a gate at the front door. Admission is how the platform stays honest when someone finds a credential or a forgotten context. Allow-list means kubelet will not be asked to pull from a random registry.",
    "d": [
      "OPA, Kyverno, and Pod Security Standards are the example stack.",
      "Policy-as-code lives in Git.",
      "Denials are telemetry. The platform team pages on a spike.",
      "A signed, allow-listed digest is the only image that admits."
    ],
    "triggers": "Every object create / update against the API server, and the CI policy check.",
    "stores": "Policy-as-code (in Git) and admission decisions.",
    "talksTo": "CI (shift-left) and the Kubernetes admission chain."
  },
  "step11": {
    "n": "11. Nodes pull and run",
    "p": "data",
    "w": "Scheduler binds pods. kubelet pulls newsfeed-service:v1827 from the registry using the node's cloud identity. A rolling deploy replaces the old replica set, honoring PDBs and topology spread. kube-proxy keeps Services reachable. The load balancer shifts traffic.",
    "y": "A digest that never serves a request is a souvenir.",
    "d": [],
    "triggers": "Unbound pods, then kubelet.",
    "stores": "Image cache and running containers.",
    "talksTo": "Registry (pull) and the data-plane network (users, databases)."
  },
  "step12": {
    "n": "12. Emit metrics, logs, traces",
    "p": "obs",
    "w": "Each pod and node emits through the OpenTelemetry agent to the collector and then to backends. SLIs drive HPA, canary, and pages. HPA and CA consume the same Prometheus metrics. A bad deploy is rolled back through gitops. The feedback loop writes next month's infra when capacity is the answer.",
    "y": "The path is a loop. Telemetry is how the next change gets smarter.",
    "d": [],
    "triggers": "The process, always on.",
    "stores": "Backends and SLO counters.",
    "talksTo": "Engineers, HPA, cluster autoscaler, and (rarely) Terraform."
  }
});
