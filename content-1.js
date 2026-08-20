window.IDP_CONTENT = Object.assign(window.IDP_CONTENT || {}, {
  overview: {
    name: "How to read this map",
    plane: "both",
    kicker: "Overview",
    does: "This is the staff-review architecture of the internal developer platform. Follow the navy badges 1–12 left to right (commit → validate → build → reconcile → run), then down into observability. The colorful canvas is the source of truth; this drawer is the prose layer on top of it.",
    triggers: "A product engineer commits and opens a pull request. That is the only human trigger on the daily delivery path. Nobody runs a deploy job and nobody applies manifests to production from a laptop.",
    stores: "Desired application state lives in Git. Desired infrastructure lives in infra-terraform plus a remote state backend. Immutable images live in the artifact registry. Runtime state lives in the Kubernetes API.",
    talksTo: "Solid navy arrows are software delivery. Dashed teal is a different life cycle — platform engineers provisioning the cloud. Dotted rose is the learning loop: production talking back to the people who shipped 1–12.",
    extra: "<h3>Keyboard</h3><ul><li><strong>+ / −</strong> zoom · <strong>0</strong> fit · <strong>1–9</strong> jump to a numbered step</li><li>Arrow keys pan · click a box or a chip for the region</li></ul><p class=\"muted\">More pages (CI deep-dive, GitOps, observability) will attach here. Edit diagram.svg or the maps in app.js to iterate.</p>"
  },
  dev: {
    name: "Developer environment",
    plane: "control",
    kicker: "Control plane · Step 1",
    does: "Product engineers write service code on a standardized laptop: language SDK, formatter, linter, typechecker, unit-test runner, platform CLI, golden service templates, local kind/k3d, and secret stubs. Dev tools are a control-plane client, not a tunnel into the cluster.",
    triggers: "The engineer. A commit and an opened pull request are the only human actions on the delivery path. The same CI checks are runnable locally so a push is not the first time a gate is evaluated.",
    stores: "Uncommitted work and feature branches live on the laptop until push. Local kind / k3d clusters are ephemeral and are not a path to production.",
    talksTo: "Git — commit, push, open PR. Auth is SSO plus short-lived credentials. Developers do not helm-apply or click the cloud console to ship a feature."
  },
  "dev-a": {
    name: "Dev A — software developer",
    plane: "control",
    kicker: "Control plane · Step 1",
    does: "One of three product engineers on the path. Writes application code, runs the local toolchain, and pushes a branch. The diagram starts with people, not pipelines.",
    triggers: "Own editor, local checks, then git push.",
    stores: "Working tree on the laptop.",
    talksTo: "Git repositories (app-*)."
  },
  "dev-b": {
    name: "Dev B — software developer",
    plane: "control",
    kicker: "Control plane · Step 1",
    does: "Same role as Dev A / Dev C. The platform does not care which human authored the change; the PR and its required checks are the contract.",
    triggers: "Commit / push.",
    stores: "Local working tree.",
    talksTo: "Git."
  },
  "dev-c": {
    name: "Dev C — software developer",
    plane: "control",
    kicker: "Control plane · Step 1",
    does: "Same role as Dev A / Dev B. Multiple authors exist; one change is still traced 1 → 12.",
    triggers: "Commit / push.",
    stores: "Local working tree.",
    talksTo: "Git."
  },
  "local-code": {
    name: "Local app code",
    plane: "control",
    kicker: "Control plane",
    does: "The inner loop: newsfeed-service on feature/feed-ranking, a mix of uncommitted edits and a pushed branch. Local work stays on the laptop until push.",
    triggers: "The developer saving and committing.",
    stores: "The working tree and the local branch.",
    talksTo: "The standardized toolchain (formatter, typechecker, unit tests) and then Git."
  },
  toolchain: {
    name: "Standardized platform toolchain",
    plane: "control",
    kicker: "Control plane",
    does: "Language SDK / runtime, formatter + linter, typechecker, unit-test runner, platform CLI, golden service template, local kind/k3d, secret stubs / SSO. The CLI scaffolds new services from goldens so every repo looks like every other repo.",
    triggers: "The developer, on every save and before every push.",
    stores: "Nothing durable — it is a client, not a system of record.",
    talksTo: "Local kind/k3d for a cheap inner loop; Git when the change is ready."
  },
  "who-triggers": {
    name: "Who triggers what",
    plane: "control",
    kicker: "Control plane",
    does: "The engineer commits and opens the PR — that is the only human trigger on the delivery path. CI, tests, and the image build are automated. Argo CD is not invoked by the developer; it watches Git and reconciles continuously.",
    triggers: "Human: PR. Machine: everything after.",
    stores: "Nothing here; this panel is the operating rule.",
    talksTo: "Git, CI, Argo CD (watch, not invoke). Never the cluster from a laptop."
  },
  git: {
    name: "Git — source of truth",
    plane: "control",
    kicker: "Control plane · Steps 2, 3, 8",
    does: "Five repositories hold every desired state the platform converges to. Clusters follow Git; Git does not follow the cluster. A gitops manifest change is how a green image becomes a production intent.",
    triggers: "Developers push application repos and open PRs. CI writes the image digest into platform-gitops on a green build. Platform engineers change infra-terraform.",
    stores: "Application code, service config, deployment manifests, infrastructure definitions, and reusable CI pipelines.",
    talksTo: "CI (push / PR events), Argo CD (watch platform-gitops), Terraform (read infra-terraform)."
  },
  "git-repos": {
    name: "Git repositories (source of truth)",
    plane: "control",
    kicker: "Control plane · Step 2",
    does: "The five-repo layout is deliberate. Application code does not live next to cluster YAML, and infrastructure does not live next to CI config. Each repo has its own reviewers and merge policy.",
    triggers: "Pushes and pull requests.",
    stores: "The entire desired-state surface of the platform.",
    talksTo: "CI, Argo CD, Terraform."
  },
  "app-newsfeed": {
    name: "app-newsfeed",
    plane: "control",
    kicker: "Control plane · Step 2",
    does: "Application code and service config for the news-feed service — the change this diagram traces as PR #4821 and image newsfeed-service:v1827.",
    triggers: "Product engineers.",
    stores: "Source, unit tests, service-level config. Not Kubernetes manifests.",
    talksTo: "CI on every PR. A green build produces an image; a follow-up write lands in platform-gitops."
  },
  "app-users": {
    name: "app-users",
    plane: "control",
    kicker: "Control plane · Step 2",
    does: "Application code and service config for the user / graph / authn service. Same contract as app-newsfeed: code here, manifests in platform-gitops.",
    triggers: "Product engineers.",
    stores: "Source and service config.",
    talksTo: "CI, then (on green) platform-gitops."
  },
  "platform-gitops": {
    name: "platform-gitops",
    plane: "control",
    kicker: "Control plane · Step 8",
    does: "Deployment manifests — the desired Kubernetes state. Step 8 lands here: CI writes the image digest (newsfeed-service:v1827) into a Deployment. Argo CD is the only process that applies that intent to the cluster.",
    triggers: "CI, after a green image publish. Humans review the gitops PR; they do not apply it.",
    stores: "Deployments, Services, HPA, Ingress, and related desired-state YAML. Not application source.",
    talksTo: "Argo CD watches this repo continuously."
  },
  "infra-terraform": {
    name: "infra-terraform",
    plane: "control",
    kicker: "Control plane · Plane B",
    does: "Infrastructure definitions as code. This is desired infra state, not desired workload state. App developers never run Terraform to ship a feature.",
    triggers: "Platform engineers, on a deliberate infra change (new node group, new database, new cluster).",
    stores: "VPC, subnets, cluster, node groups, load balancers, databases, IAM, DNS, queues, observability agents — as code.",
    talksTo: "Terraform plan/apply, which talks to the remote state backend and the cloud APIs."
  },
  "ci-pipelines": {
    name: "ci-pipelines",
    plane: "control",
    kicker: "Control plane",
    does: "CI configuration and reusable pipelines. The fail-closed gate set is defined here once and consumed by every app repo.",
    triggers: "Pipeline authors on the platform team; referenced automatically on every app PR.",
    stores: "Workflow definitions, reusable jobs, policy-as-code hooks.",
    talksTo: "The CI platform, which loads these pipelines when a Git push or PR arrives."
  },
  "pr-4821": {
    name: "PR #4821 — newsfeed-service",
    plane: "control",
    kicker: "Control plane · Step 3",
    does: "A first-class object on the path, not a courtesy. Required checks: CI, lint, types, unit, SAST/SCA, policy, integration, review. Merge of the app PR and the later gitops PR are both policy-gated.",
    triggers: "The developer opening the pull request against main. That event starts validation; nothing is deployed yet.",
    stores: "The diff, the review thread, and the check statuses that block merge.",
    talksTo: "CI (triggered by the PR), the distributed test system (reports back here), and branch protection."
  },
  "stored-in-git": {
    name: "What is stored where (in Git)",
    plane: "control",
    kicker: "Control plane",
    does: "Application code → app-* repos. Service / app config → app-* plus gitops. Deployment manifests → platform-gitops. Infrastructure definitions → infra-terraform. CI configuration → ci-pipelines. Desired state lives in Git. Clusters converge to Git — not the other way around.",
    triggers: "Authors of each repo, under that repo’s review policy.",
    stores: "The five-repo split above. Do not collapse it.",
    talksTo: "CI, Argo CD, Terraform — each reads the repo it is allowed to read."
  }
});
window.IDP_CONTENT = Object.assign(window.IDP_CONTENT || {}, {
  ci: {
    name: "CI platform",
    plane: "control",
    kicker: "Control plane · Steps 4–6",
    does: "CI is build plus validation. It is triggered by Git push / pull request; there is no manual “run deploy.” On green it publishes an immutable image and then updates the deployment manifest in platform-gitops. It does not mutate production Kubernetes.",
    triggers: "Git. Fail-closed: a red check blocks merge.",
    stores: "Logs, test artifacts, and the pipeline definition (from ci-pipelines). Not images — those go to the registry.",
    talksTo: "Git (status checks), the distributed test system, the Build Service, the artifact registry, and platform-gitops (step 8)."
  },
  "ci-gates": {
    name: "Validation gates (every PR)",
    plane: "control",
    kicker: "Control plane · Step 4 · fail-closed",
    does: "Compile / build, static analysis, lint, type check, unit tests, SAST, SCA, policy checks. Every PR, no exceptions, fail-closed. A yellow or skipped required check is a failed check.",
    triggers: "The pull request.",
    stores: "Check statuses and retained debug artifacts.",
    talksTo: "The Git status API. Required statuses block merge."
  },
  tests: {
    name: "Distributed integration test system",
    plane: "control",
    kicker: "Control plane · Step 5",
    does: "Not a single machine and not “the CI agent box.” A scheduler shards suites, assigns workers, and enforces timeouts and retries. Suites in flight here include newsfeed-it, users-it, contract, e2e-feed, and policy-it.",
    triggers: "CI, as a required gate on the PR.",
    stores: "Job queue state, per-job logs, and a result that is posted back to the PR.",
    talksTo: "Ephemeral test environments (per-job namespace / compose stack / preview cluster, torn down after the run) and the Git status API."
  },
  "test-scheduler": {
    name: "Test scheduler / coordinator",
    plane: "control",
    kicker: "Control plane · Step 5",
    does: "Shards suites, assigns workers, enforces timeouts and retries. Test orchestration is itself a distributed control plane.",
    triggers: "CI on the PR.",
    stores: "Schedule and lease state for in-flight suites.",
    talksTo: "The job queue and the worker pool."
  },
  "job-queue": {
    name: "Job queue",
    plane: "control",
    kicker: "Control plane · Step 5",
    does: "Holds the sharded work: newsfeed-it, users-it, contract, e2e-feed, policy-it. Workers pull; the coordinator does not reach into a laptop.",
    triggers: "The scheduler.",
    stores: "Queued and in-flight job records.",
    talksTo: "Parallel test workers."
  },
  "test-workers": {
    name: "Parallel test workers",
    plane: "data",
    kicker: "Data-adjacent · Step 5",
    does: "Ephemeral slots (Worker 1…N). The pool implies hundreds to thousands concurrent — integration tests run in parallel workers, not on the developer laptop and not on a single CI agent.",
    triggers: "The job queue.",
    stores: "Nothing durable. A slot exists for the life of one suite.",
    talksTo: "An ephemeral test environment, then the result sink that comments on the PR."
  },
  "ephemeral-env": {
    name: "Ephemeral test environments",
    plane: "data",
    kicker: "Data plane · Step 5",
    does: "Per-job namespace, compose stack, or preview cluster. Created for the suite, torn down after the run. This is how integration tests stay isolated without a shared staging snowflake.",
    triggers: "A worker claiming a job.",
    stores: "Short-lived fixtures and seeded data. Gone when the job ends.",
    talksTo: "The service under test and its fakes / local-data stand-ins."
  },
  "ci-results": {
    name: "Results reported back to the PR",
    plane: "control",
    kicker: "Control plane · Step 5",
    does: "Status checks plus comments. Required statuses block merge. Artifacts are retained for debug. The PR is the inbox; chat is not the system of record.",
    triggers: "Suite completion.",
    stores: "Status, logs, and debug artifacts.",
    talksTo: "Git branch protection."
  },
  "ci-duties": {
    name: "CI responsibilities (and non-responsibilities)",
    plane: "control",
    kicker: "Control plane",
    does: "CI compiles, validates, tests, and produces the image. CI does not mutate production Kubernetes. On green: publish an immutable image, then update the deployment manifest in platform-gitops (step 8). Merge of the app PR and the gitops PR are policy-gated.",
    triggers: "Git.",
    stores: "Pipeline logs and the pointer it writes into Git.",
    talksTo: "Registry (push image) and platform-gitops (write digest). Never the Kubernetes API."
  },
  build: {
    name: "Build Service",
    plane: "control",
    kicker: "Control plane · Step 6",
    does: "Produces immutable OCI images from a green CI SHA. There is no latest tag in production. The build is a function of the commit; it is not a snowflake run on an engineer’s laptop.",
    triggers: "A green validation graph on the PR / main SHA.",
    stores: "Build cache and provenance for the SHA. The image itself is stored in the registry.",
    talksTo: "The artifact registry (push). Argo CD never builds images."
  },
  registry: {
    name: "Central container registry",
    plane: "control",
    kicker: "Control plane · Step 7",
    does: "Harbor / ECR / GCR / Artifact Registry — treat it as a storage system, not a CI plugin. It sits between CI and the deployment platform. Nodes pull; CI writes. If the digest is not here, Argo CD cannot sync a pod that will start.",
    triggers: "The Build Service pushing a tagged, signed image.",
    stores: "OCI images (app + sidecars), SBOM + provenance attestations, Helm/OCI chart packages, signed tags, retention / promotion policy.",
    talksTo: "CI (write), worker-node kubelets (pull, step 11), admission policy (registry allow-list)."
  },
  "image-v1827": {
    name: "newsfeed-service:v1827",
    plane: "control",
    kicker: "Control plane · Step 7",
    does: "The concrete artifact this map traces. Digest sha256:9f3a…c21, linux/amd64, 184 MB, immutable. Promotion is a new pointer (build-sha-a1b2 → v1827), not a rebuild. No rebuild between environments.",
    triggers: "A green CI SHA published by the Build Service.",
    stores: "The bytes of the image plus its attestations.",
    talksTo: "platform-gitops (the digest is written there) and worker nodes (they pull it)."
  },
  "registry-store": {
    name: "What the registry stores",
    plane: "control",
    kicker: "Control plane",
    does: "OCI images (app + sidecars), SBOM + provenance attestations, Helm/OCI chart packages, signed tags, retention and promotion policy. Pull credentials are node identity — not a long-lived secret in a pipeline.",
    triggers: "CI writes; promotion policy moves tags.",
    stores: "The list above. This is the contract the cluster reads.",
    talksTo: "Admission (allow-list) and kubelet image pull."
  },
  promotion: {
    name: "Promotion (immutable)",
    plane: "control",
    kicker: "Control plane",
    does: "build-sha-a1b2 is retagged to v1827 and referenced from gitops. Nodes pull that digest in step 11. There is no rebuild between environments and no mutable latest.",
    triggers: "A promotion policy, usually on merge to the release branch / main.",
    stores: "Tag → digest mappings.",
    talksTo: "platform-gitops (the reference that Argo CD will reconcile)."
  },
  "registry-why": {
    name: "Why the registry sits here",
    plane: "control",
    kicker: "Control plane",
    does: "CI writes. The cluster reads. The registry is the contract: if the digest is not here, Argo CD cannot sync a pod that will start. Image pull is an explicit data-plane hop using the node’s cloud identity.",
    triggers: "Publish from CI; pull from kubelet.",
    stores: "The digest that both sides agree on.",
    talksTo: "CI, Argo CD (indirectly, via a pod that will fail to start otherwise), worker nodes."
  },
  argocd: {
    name: "Argo CD",
    plane: "control",
    kicker: "Control plane · Step 9 · always on",
    does: "Always-on reconciler. Watches platform-gitops, diffs desired vs actual, syncs on drift. It is not a CI job and is not “run” per PR. CI updates Git; Argo CD updates the cluster. If someone clicks in the cloud console, drift is detected and the cluster is reconciled back to Git.",
    triggers: "Git changes in platform-gitops, plus its own resync loop. Not the developer, not the CI “deploy” stage.",
    stores: "Application / project cache and sync status. Desired state remains in Git.",
    talksTo: "Git (watch) and the Kubernetes API server (apply / prune). Never the registry as a builder — it does not build images."
  },
  "argo-loop": {
    name: "Watch · compare · sync",
    plane: "control",
    kicker: "Control plane · Step 9",
    does: "Watch Git (platform-gitops) → compare desired vs actual → sync the cluster (apply / prune / drift). That is the whole job, forever.",
    triggers: "The reconciler’s own loop.",
    stores: "Cache of last-seen Git and live objects.",
    talksTo: "Git and the Kubernetes API."
  },
  "arrow-of-record": {
    name: "Arrow of record",
    plane: "control",
    kicker: "Control plane",
    does: "Git (manifests) → Argo CD → Kubernetes API. App deploy is not infra create — see plane B. Product engineers own the numbered path 1–8; platform engineers own plane B.",
    triggers: "A merged gitops change.",
    stores: "The three hops of the arrow are the system of record for workload intent.",
    talksTo: "Kubernetes API. That is the only write path into the cluster for applications."
  },
  admission: {
    name: "Policy / admission — OPA · Kyverno · PSS",
    plane: "control",
    kicker: "Control plane",
    does: "Provenance, registry allow-list, resource limits. Evaluated at CI and again at admit so a bypassed pipeline still cannot land a bad pod.",
    triggers: "Every object create / update against the API server, and the CI policy check.",
    stores: "Policy-as-code (in Git) and admission decisions.",
    talksTo: "CI (shift-left) and the Kubernetes admission chain."
  },
  "always-on": {
    name: "Continuously running control plane",
    plane: "control",
    kicker: "Control plane",
    does: "These stay up: Argo CD application controller + repo server; Kubernetes API / scheduler / controllers; OTel collector; policy webhook. Terraform is the opposite — invoked (plan/apply), then exits; its desired infra state still lives in Git + remote state.",
    triggers: "Process supervisors and the cluster itself. Not a cron that “deploys.”",
    stores: "Live control state. Desired state remains in Git.",
    talksTo: "Each other, the API server, and (for Terraform) the cloud APIs when a human invokes a run."
  }
});
