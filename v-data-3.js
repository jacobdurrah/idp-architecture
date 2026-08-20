window.IDP_DATA = Object.assign(window.IDP_DATA || {}, {
  "registry": {
    "n": "Artifact registry",
    "p": "ctrl",
    "w": "Harbor / ECR / GCR / Artifact Registry, treated as a storage system, not a CI plugin. It sits between CI and the deployment platform. Nodes pull. CI writes. If the digest is not here, Argo CD cannot sync a pod that will start. Pull credentials are node identity, not a long-lived secret in a pipeline.",
    "y": "The registry is the contract both sides agree on. CI cannot whisper an image into the cluster. The cluster cannot invent bytes that were never stored. Treat it as infrastructure with retention, signing, and an allow-list.",
    "d": [
      "Stores OCI images, SBOM and provenance attestations, signed tags.",
      "Pull credentials are node identity, not a long-lived pipeline secret.",
      "Admission will refuse registries that are not on the allow-list.",
      "Promotion is a new pointer, not a rebuild."
    ],
    "triggers": "The build service pushing a tagged, signed image.",
    "stores": "OCI images (app + sidecars), SBOM + provenance attestations, Helm/OCI chart packages, signed tags, retention and promotion policy.",
    "talksTo": "CI (write), worker-node kubelets (pull, step 11), admission policy (registry allow-list)."
  },
  "bump": {
    "n": "Deploy manifests bump",
    "p": "ctrl",
    "w": "On a green image publish, CI writes newsfeed-service:v1827 (digest sha256:9f3a…c21) into the Deployment in platform-gitops. That write is the deploy. The gitops PR is policy-gated. CI still has not talked to Kubernetes.",
    "y": "This is the move that turns a stored image into an intent. Without it, a green build is a souvenir. With it, humans review a pointer change and the reconciler does the rest. Product engineers do not apply the manifest.",
    "d": [
      "CI updates Git. Argo CD updates the cluster.",
      "The bump names a digest, not a floating tag.",
      "Reviewers see a one-line intent change and the provenance next to it.",
      "A revert of this commit is a rollback."
    ],
    "triggers": "Green image publish.",
    "stores": "The manifest in platform-gitops.",
    "talksTo": "Argo CD, which is already watching."
  },
  "cicd": {
    "n": "CI versus CD",
    "p": "ctrl",
    "w": "CI ends at Git. It validates, builds, stores, and records intent in platform-gitops. Continuous delivery is Argo CD, always on, pull-based, not a CI job. The cluster never receives CI credentials. Product engineers own the numbered path through the bump. Platform engineers own plane B.",
    "y": "Collapsing CI and CD into one pipeline is how clusters pick up CI credentials and how deploys become irreproducible scripts. Splitting them is the whole idea of GitOps: the cluster converges to Git on its own time, with its own identity.",
    "d": [
      "CI has no Kubernetes credentials for production.",
      "Argo CD has no mandate to compile or to push images.",
      "A red CI never produces a bump. A green CI never kubectl-applies.",
      "If someone clicks in the console, that is drift, not CD."
    ],
    "triggers": "A merged gitops change, then the reconciler. Never a human Deploy button.",
    "stores": "The three hops of the arrow of record: Git (manifests) → Argo CD → Kubernetes API.",
    "talksTo": "Kubernetes API is the only write path into the cluster for applications."
  },
  "argocd": {
    "n": "Argo CD, watch then diff then sync",
    "p": "ctrl",
    "w": "Always-on reconciler. Watches platform-gitops, diffs desired versus actual, syncs on drift. It is not a CI job and is not run per PR. CI updates Git. Argo CD updates the cluster. If someone clicks in the cloud console, drift is detected and the cluster is reconciled back to Git. Pull-based: the cluster never gets CI credentials.",
    "y": "Pull-based delivery means the cluster never receives CI credentials. The only write path into production Kubernetes for applications is this reconciler talking to the API server. That is how you get auditability and how you make revert a Git operation.",
    "d": [
      "Watch, compare, sync. That is the whole job, forever.",
      "Desired state remains in Git. Argo caches sync status.",
      "It does not build images. It does not plan Terraform.",
      "Continuously running, opposite personality from Terraform."
    ],
    "triggers": "Git changes in platform-gitops, plus its own resync loop. Not the developer, not the CI deploy stage.",
    "stores": "Application / project cache and sync status. Desired state remains in Git.",
    "talksTo": "Git (watch) and the Kubernetes API server (apply / prune). Never the registry as a builder."
  },
  "platform-eng": {
    "n": "Platform engineers",
    "p": "ppl",
    "w": "Platform engineers author infrastructure as code and own plane B. They do not merge application features and they do not click-apply production workloads. They change the substrate when node capacity, a new cluster, or a database must be created.",
    "y": "If product engineers must become Terraform operators to ship a feature, the platform is incomplete. Splitting the people is how you keep the daily path short. Platform engineers watch the same telemetry. They act on it with infra changes, not with kubectl.",
    "d": [
      "A ticket or a capacity signal that actually requires new substrate.",
      "They run Terraform. They do not run application deploys.",
      "They review the infra repo and the shared CI pipelines.",
      "Rare, deliberate, reviewed. Not the daily feature path."
    ],
    "triggers": "A ticket or a capacity signal that actually requires new substrate.",
    "stores": "The infra-terraform working tree.",
    "talksTo": "Terraform."
  },
  "terraform": {
    "n": "Terraform plan and apply",
    "p": "infra",
    "w": "Terraform creates the infrastructure. Argo CD deploys workloads onto it. Distinct from the numbered app-delivery path. Terraform is invoked (plan/apply) and then exits. Argo CD is a long-running reconciler. App developers never run Terraform to ship a feature.",
    "y": "You need a tool that can mint a VPC and a database. You do not want that tool on the daily path. Making Terraform an explicit, rare, locked operation is how you avoid two writers for the same cloud object and how you keep production credentials off laptops.",
    "d": [
      "plan/apply versus the infra repo, then exit.",
      "Opposite personality from Argo CD (a daemon).",
      "Talks to remote state and to cloud provider APIs.",
      "Not a CI deploy job for application code."
    ],
    "triggers": "A platform engineer, when node capacity, a new cluster, or a database must be created. Not a CI deploy job.",
    "stores": "Desired infra in infra-terraform. Last-applied in the remote state backend.",
    "talksTo": "Remote state (lock + state) and the cloud provider APIs."
  },
  "tfstate": {
    "n": "Remote state, locked",
    "p": "infra",
    "w": "Remote state (S3 plus DynamoDB lock, or GCS) is the other half of desired infra state. Git is human-readable intent. The backend is what Terraform last believed it created. The lock prevents concurrent apply.",
    "y": "Without a lock, two applies invent a third reality. Without remote state, laptops become the system of record. This box exists so plane B has a store, just as Git is the store for plane A.",
    "d": [
      "State snapshots and the lock.",
      "Talks to Terraform only.",
      "Not readable as a workflow by product engineers.",
      "A broken lock is an incident, not a retry loop you ignore."
    ],
    "triggers": "Every Terraform run.",
    "stores": "State snapshots and the lock.",
    "talksTo": "Terraform only."
  }
});
