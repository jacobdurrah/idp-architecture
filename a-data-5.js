window.IDP_DATA = Object.assign(window.IDP_DATA || {}, {
  "argocd": {
    "n": "Argo CD, always on",
    "p": "ctrl",
    "w": "Watch, compare, sync. Pull-based. Always on. Not a CI job. The cluster never receives CI credentials. Console clicks are drift. Agents do not click Sync. They write Git and let Argo converge.",
    "y": "GitOps is honest only if Argo is the only applicator. An agent with kubectl is a second Argo with worse audit. Drift is a trace on the Argo board. The GitOps agent reads it and opens a revert or a manifest fix.",
    "d": [
      "Watches platform-gitops continuously.",
      "Compare is desired versus live. Sync applies and prunes.",
      "Not a CI job. Opposite personality from Terraform.",
      "A human clicking Sync is a smell. An agent clicking Sync is an incident."
    ],
    "triggers": "A Git change in platform-gitops, or a drift interval.",
    "stores": "Application status, sync history, drift.",
    "talksTo": "Git (read), the Kubernetes API (apply through admission), the GitOps agent (through the Argo board)."
  },
  "admission": {
    "n": "Admission, OPA, Kyverno, PSS",
    "p": "ctrl",
    "w": "Policy and admission sit between Argo CD and the API server. Provenance, registry allow-list, resource limits, Pod Security Standards. Evaluated at CI (gate-policy) and again at admit so a bypassed pipeline still cannot land a bad pod. Every object create or update hits this chain. This is step 10 on this poster: the API does not accept a story, it accepts an object that passes.",
    "y": "Shift-left is not a replacement for a gate at the front door. Admission is how the platform stays honest when someone (or an agent) finds a credential or a forgotten context. Allow-list means kubelet will not be asked to pull from a random registry.",
    "d": [
      "OPA, Kyverno, and Pod Security Standards are the example stack.",
      "Policy-as-code lives in Git.",
      "Denials are telemetry. They are also a stigmergic trace on the Argo board.",
      "A signed, allow-listed digest is the only image that admits."
    ],
    "triggers": "Every object create or update against the API server, and the CI policy check.",
    "stores": "Policy-as-code (in Git) and admission decisions.",
    "talksTo": "CI (shift-left), the Kubernetes admission chain, the GitOps agent (deny as a trace)."
  },
  "argo-board": {
    "n": "Argo sync, drift, admission",
    "p": "stig",
    "w": "Sync status, drift, and admission decisions are a stigmergic board. The GitOps agent reads a drift or a deny and opens a revert or a manifest fix in Git. It never kubectl-applies. Silence on this board (no heartbeat from Argo) is a signal, not a pass.",
    "y": "If drift is only a red badge in a UI someone might open, agents cannot hold the ship. The board has to be queryable status plus a ticket or a PR. Console clicks that fix live state are drift you chose.",
    "d": [
      "Desired versus live is the only comparison that matters.",
      "A deny is a trace. The fix is a Git write.",
      "An agent does not click Sync to hide drift.",
      "This board sits between Argo, admission, and Git."
    ],
    "triggers": "A sync, a drift poll, or an admission deny.",
    "stores": "Application health, sync revisions, deny logs.",
    "talksTo": "The GitOps agent, Argo CD, admission, platform-gitops."
  },
  "gitops-agent": {
    "n": "GitOps agent",
    "p": "agent",
    "w": "The GitOps agent reads drift or an admission deny and opens a revert or a manifest fix in Git. It never kubectl-applies. It never clicks Sync to paper over a live edit. It treats the cluster as a projection of platform-gitops, not as a scratch pad.",
    "y": "Drift that waits for a human to notice is how production diverges. An agent that can only write Git is safe enough to run continuously. An agent that can apply is a rogue control plane.",
    "d": [
      "Reads: Argo sync status, drift, admission decisions.",
      "Writes: a revert PR or a manifest fix in platform-gitops.",
      "Never: kubectl apply, helm, a console edit, a force sync of a dirty cluster.",
      "Humans still review the gitops PR when policy says so."
    ],
    "triggers": "Drift detected, an admission deny, or a canary revert request written on the canary board.",
    "stores": "Nothing of its own. The Argo board and Git are the memory.",
    "talksTo": "The Argo board, platform-gitops, and (for a revert) the canary or SRE agent through those boards."
  },
  "newsfeed": {
    "n": "News feed service x4",
    "p": "data",
    "w": "The traced workload. v1827, sha256:9f3a…c21, HPA. Four replicas is a floor, not a personality. Ingress sends user traffic here. It talks to User, Post, Ranking, Media, and Notifications. It stores nothing durable.",
    "y": "A digest that never serves a request is a souvenir. This box is where step 11 becomes user-visible. A bad digest here is a canary and a burn-rate alert, then a Git revert.",
    "d": [
      "Talks to User, Post, Ranking, Media, Notification, and Redis.",
      "Replica ticks sit on the hot path for a reason.",
      "The canary-analysis agent compares this version to baseline.",
      "A bad canary becomes a git revert, not a chat message."
    ],
    "triggers": "Ingress and the API gateway.",
    "stores": "Nothing durable.",
    "talksTo": "User, Post, Ranking, Media, Notification, Redis, the edge. Emits to OTel."
  },
  "hpa": {
    "n": "Horizontal pod autoscaler",
    "p": "ctrl",
    "w": "Pod replica loop. HPA reads metrics (CPU, RPS, custom) and writes replica counts onto Deployments. It is a Kubernetes object, desired in Git, acting continuously. News feed is the example: four replicas is a floor.",
    "y": "Humans guessing replica counts will be wrong twice a day. HPA turns SLIs into the only guess that matters. When observability is dark, HPA must not treat missing metrics as all quiet, scale to one. That is an obs-guard rule.",
    "d": [
      "Triggered by metrics APIs, continuously.",
      "Stores HPA objects and the replica counts it writes.",
      "Talks to metrics APIs and the API server.",
      "Not a Terraform apply. Not an agent clicking scale."
    ],
    "triggers": "Metrics from Prometheus or custom metrics APIs, continuously.",
    "stores": "HPA objects and the replica counts it writes onto Deployments.",
    "talksTo": "Metrics APIs and the API server. Same Prometheus the dashboards use."
  },
  "ca": {
    "n": "Cluster autoscaler",
    "p": "ctrl",
    "w": "Node loop. If pods are unschedulable, CA adds nodes. If traffic falls and HPA removes pods, CA drains idle nodes. Same telemetry plane as HPA. The rare moment control plane touches plane B without a Terraform run is CA calling the cloud API to mint or retire a VM.",
    "y": "A fixed node pool is either waste or a pending incident. CA makes the node group elastic within the bounds Terraform already created. When observability is dark, CA must not treat silence as permission to drain.",
    "d": [
      "Triggered by unschedulable pods and underused nodes.",
      "Talks to the API server and the cloud provider APIs.",
      "Max size is desired infra, owned by Terraform.",
      "Drains respect PDBs."
    ],
    "triggers": "Unschedulable pods and underused nodes.",
    "stores": "Nothing in-cluster beyond the node objects it requests.",
    "talksTo": "API server and the cloud provider APIs that mint VMs."
  }
});
