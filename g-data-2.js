window.IDP_DATA = Object.assign(window.IDP_DATA || {}, {
  "queue": {
    "n": "Job queue",
    "p": "ctrl",
    "w": "The job queue holds sharded work. Workers pull. The coordinator does not reach into a laptop and it does not SSH to a pet runner. Each job names a suite, a timeout, and the shape of the ephemeral environment it needs.",
    "y": "A queue is how you get isolation and parallelism without a shared staging environment. It is also how you see backlog. If the queue grows, you add workers. You do not skip the suite.",
    "d": [
      "Pull-based. Workers claim jobs.",
      "Per-job records: queued, running, done, failed.",
      "Backpressure is visible. It is not hidden in a single agent log.",
      "The queue is not a source of truth for product state."
    ]
  },
  "workers": {
    "n": "Ephemeral workers ×1000s",
    "p": "data",
    "w": "Workers are ephemeral slots. A slot exists for the life of one suite, talks to a per-job environment (namespace, compose stack, or preview cluster), and then disappears. The pool implies hundreds to thousands concurrent. Integration tests do not run on the developer laptop and they do not run on a single CI agent.",
    "y": "Shared staging is where flakes and political blocks are born. Ephemeral per-job environments keep suites isolated and disposable. Scale-out is a worker-pool problem, not a calendar problem.",
    "d": [
      "Nothing durable lives on a worker.",
      "Created for the suite, torn down after the run.",
      "The grid on the poster is the point: this is a fleet, not a box.",
      "Results go back to the PR, not into a tribal spreadsheet."
    ]
  },
  "results": {
    "n": "Results back to the PR",
    "p": "ctrl",
    "w": "Suite completion posts status checks and comments on the pull request. Required statuses block merge. Artifacts are retained for debug. The PR is the inbox. Chat is not the system of record.",
    "y": "If results live in Slack, merge policy cannot see them and history cannot explain them. Putting the result on the PR is what makes fail-closed real. Reviewers and branch protection read the same object.",
    "d": [
      "Status plus logs plus debug artifacts.",
      "A red suite is a blocked merge, not a conversation starter.",
      "Artifacts have a retention policy. They are not eternal.",
      "The same comment shape is used for every suite."
    ]
  },
  "build": {
    "n": "Build service",
    "p": "ctrl",
    "w": "The build service produces immutable OCI images from a green CI SHA. There is no latest tag in production. The build is a function of the commit. It is not a snowflake run on an engineer's laptop. Argo CD never builds images.",
    "y": "If images are built by hand, or rebuilt per environment, you cannot say what is running. A central build service plus a digest is how the rest of the path stays honest. Promotion becomes a pointer change, not a second compilation.",
    "d": [
      "Triggered by a green validation graph on the PR or main SHA.",
      "Build cache and provenance stay with the SHA. Bytes go to the registry.",
      "No latest. No rebuild between environments.",
      "Argo CD is a consumer of digests, not a builder."
    ]
  },
  "registry": {
    "n": "Artifact registry",
    "p": "ctrl",
    "w": "The registry is a storage system, not a CI plugin. It sits between CI and the deployment platform. This poster traces newsfeed-service:v1827. Nodes pull. CI writes. If the digest is not here, Argo CD cannot sync a pod that will start.",
    "y": "The registry is the contract both sides agree on. CI cannot whisper an image into the cluster. The cluster cannot invent bytes that were never stored. Treat it as infrastructure with retention, signing, and an allow-list.",
    "d": [
      "Stores OCI images, SBOM and provenance attestations, signed tags.",
      "Pull credentials are node identity, not a long-lived pipeline secret.",
      "Admission will refuse registries that are not on the allow-list.",
      "Promotion is a new pointer, not a rebuild."
    ]
  },
  "bump": {
    "n": "Deploy manifests bump",
    "p": "ctrl",
    "w": "On a green image publish, CI writes the image digest into the Deployment in the manifests repository. That write is the deploy. The GitOps pull request is policy-gated. CI still has not talked to Kubernetes. Argo CD, already watching, will see the new desired state.",
    "y": "This is the move that turns a stored image into an intent. Without it, a green build is a souvenir. With it, humans review a pointer change and the reconciler does the rest. Product engineers do not apply the manifest.",
    "d": [
      "CI updates Git. Argo CD updates the cluster.",
      "The bump names a digest, not a floating tag.",
      "Reviewers see a one-line intent change and the provenance next to it.",
      "A revert of this commit is a rollback."
    ]
  },
  "cicd": {
    "n": "CI versus CD",
    "p": "ctrl",
    "w": "CI ends at Git. It validates, builds, stores, and records intent. Continuous delivery is Argo CD, an always-on reconciler, not a CI job and not a deploy stage a human runs. The two are adjacent on the poster so the seam is visible. They are not the same process.",
    "y": "Collapsing CI and CD into one pipeline is how clusters pick up CI credentials and how deploys become irreproducible scripts. Splitting them is the whole idea of GitOps: the cluster converges to Git on its own time, with its own identity.",
    "d": [
      "CI has no Kubernetes credentials for production.",
      "Argo CD has no mandate to compile or to push images.",
      "A red CI never produces a bump. A green CI never kubectl-applies.",
      "If someone clicks in the console, that is drift, not CD."
    ]
  },
  "argocd": {
    "n": "Argo CD, watch then diff then sync",
    "p": "ctrl",
    "w": "Argo CD is an always-on reconciler. It watches the manifests repository, diffs desired versus actual, and syncs on drift. It is not a CI job and is not run per PR. CI updates Git. Argo CD updates the cluster. If someone clicks in the cloud console, drift is detected and the cluster is reconciled back to Git.",
    "y": "Pull-based delivery means the cluster never receives CI credentials. The only write path into production Kubernetes for applications is this reconciler talking to the API server. That is how you get auditability and how you make revert a Git operation.",
    "d": [
      "Watch, compare, sync. That is the whole job, forever.",
      "Desired state remains in Git. Argo caches sync status.",
      "It does not build images. It does not plan Terraform.",
      "Continuously running, opposite personality from Terraform."
    ]
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
    ]
  }
});
