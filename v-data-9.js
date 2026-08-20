window.IDP_DATA = Object.assign(window.IDP_DATA || {}, {
  "step8": {
    "n": "8. Write the digest into platform-gitops",
    "p": "ctrl",
    "w": "CI updates the Deployment manifest with newsfeed-service:v1827 (or its digest). That write is the deploy. The gitops PR is policy-gated. CI still has not talked to Kubernetes.",
    "y": "Pull-based delivery is how production stays converged to Git after the humans have gone home.",
    "d": [],
    "triggers": "Green image publish.",
    "stores": "The manifest in platform-gitops.",
    "talksTo": "Argo CD, which is already watching."
  },
  "step9": {
    "n": "9. Argo CD reconciles",
    "p": "ctrl",
    "w": "The always-on reconciler diffs platform-gitops against the API server and syncs, through admission. Drift from a console click is reversed. This is not a CI job.",
    "y": "Pull-based delivery is how production stays converged to Git.",
    "d": [],
    "triggers": "The gitops commit, plus the resync loop.",
    "stores": "Sync status. Desired state stays in Git.",
    "talksTo": "Admission, then the Kubernetes API."
  },
  "step10": {
    "n": "10. Kubernetes API accepts desired state",
    "p": "ctrl",
    "w": "Deployment, Service, HPA, Ingress are written. Admission (OPA / Kyverno / PSS) evaluates provenance and the registry allow-list again.",
    "y": "There is one write path into the cluster for applications.",
    "d": [],
    "triggers": "Argo CD apply.",
    "stores": "etcd, via the API server.",
    "talksTo": "Scheduler, controllers, admission webhooks."
  },
  "app-newsfeed": {
    "n": "app-newsfeed",
    "p": "ctrl",
    "w": "Application code and service config for the news-feed service, the change this poster traces as PR #4821 and image newsfeed-service:v1827. Source, unit tests, and service-level config live here. Kubernetes manifests do not.",
    "y": "Keeping the traced service in its own repo makes reviewers and CI obvious. A green build produces an image. A follow-up write lands in platform-gitops. Product engineers own this merge.",
    "d": [
      "Code here, manifests in platform-gitops.",
      "CI on every PR, from ci-pipelines.",
      "The inner-loop laptop already ran the same gates.",
      "Not a place to hide cluster YAML."
    ],
    "triggers": "Product engineers.",
    "stores": "Source, unit tests, service-level config. Not Kubernetes manifests.",
    "talksTo": "CI on every PR. A green build produces an image. A follow-up write lands in platform-gitops."
  },
  "app-users": {
    "n": "app-users",
    "p": "ctrl",
    "w": "Application code and service config for the user / graph / authn service. Same contract as app-newsfeed: code here, manifests in platform-gitops. The news-feed change may depend on its API. It does not live in the same repository.",
    "y": "A second app repo on the poster is the point. The platform is a contract reused by every service, not a special snowflake around news-feed. Reviewers who know identity own this merge.",
    "d": [
      "Same fail-closed gate set, via ci-pipelines.",
      "Same image + GitOps promotion rules.",
      "Not bundled into app-newsfeed to make the diagram smaller.",
      "Talks to CI, then (on green) platform-gitops."
    ],
    "triggers": "Product engineers.",
    "stores": "Source and service config.",
    "talksTo": "CI, then (on green) platform-gitops."
  },
  "platform-gitops": {
    "n": "platform-gitops",
    "p": "ctrl",
    "w": "Deployment manifests, the desired Kubernetes state. Step 8 lands here: CI writes the image digest (newsfeed-service:v1827) into a Deployment. Argo CD is the only process that applies that intent to the cluster. Humans review the gitops PR. They do not apply it.",
    "y": "This repository is how a stored digest becomes an intent the cluster can converge to. CI still has not talked to Kubernetes. If the digest is not here, Argo CD has nothing new to sync.",
    "d": [
      "Deployments, Services, HPA, Ingress. Not application source.",
      "Promotion is a Git write, not kubectl.",
      "Reviewers think about replicas, probes, resources, rollouts.",
      "Argo CD watches this repo continuously."
    ],
    "triggers": "CI, after a green image publish. Humans review the gitops PR. They do not apply it.",
    "stores": "Deployments, Services, HPA, Ingress, and related desired-state YAML.",
    "talksTo": "Argo CD watches this repo continuously."
  },
  "infra-terraform": {
    "n": "infra-terraform",
    "p": "infra",
    "w": "Infrastructure definitions as code. Desired infra state, not desired workload state. VPC, subnets, cluster, node groups, load balancers, databases, IAM, DNS, queues, observability agents. App developers never run Terraform to ship a feature.",
    "y": "Plane B has to be visible and rare. Encoding the account here is how a new node group is reviewed and reverted. The daily feature path should never need a plan/apply.",
    "d": [
      "Invoked (plan/apply), then exits.",
      "Remote state is locked.",
      "A new replica of news-feed is not this repo.",
      "The cluster this poster deploys onto was created from here."
    ],
    "triggers": "Platform engineers, on a deliberate infra change (new node group, new database, new cluster).",
    "stores": "VPC, subnets, cluster, node groups, load balancers, databases, IAM, DNS, queues, observability agents, as code.",
    "talksTo": "Terraform plan/apply, which talks to the remote state backend and the cloud APIs."
  },
  "ci-pipelines": {
    "n": "ci-pipelines",
    "p": "ctrl",
    "w": "CI configuration and reusable pipelines. The fail-closed gate set is defined here once and consumed by every app repo. Workflow definitions, reusable jobs, policy-as-code hooks.",
    "y": "If every app repo forks its pipeline, fail-closed becomes optional. One repo of pipelines is how the platform keeps compile, SAST, SCA, and policy identical for news-feed and for users.",
    "d": [
      "Referenced automatically on every app PR.",
      "Pipeline authors live on the platform team.",
      "A skipped required check is still a failed check.",
      "This is not where application source lives."
    ],
    "triggers": "Pipeline authors on the platform team. Referenced automatically on every app PR.",
    "stores": "Workflow definitions, reusable jobs, policy-as-code hooks.",
    "talksTo": "The CI platform, which loads these pipelines when a Git push or PR arrives."
  },
  "pr-4821": {
    "n": "PR #4821, newsfeed-service",
    "p": "ctrl",
    "w": "A first-class object on the path, not a courtesy. Required checks: CI, lint, types, unit, SAST/SCA, policy, integration, review. Merge of the app PR and the later gitops PR are both policy-gated. Opening this PR is what starts validation. Nothing is deployed yet.",
    "y": "Branch protection is the contract. If merge can happen without the checks, the rest of the poster is decoration. PR #4821 is the example the map traces so the conversation stays concrete.",
    "d": [
      "Required statuses block merge. A skipped required check is a failure.",
      "Merge queue serializes green PRs so main stays green.",
      "The PR is the inbox. Chat is not the system of record.",
      "Integration results (newsfeed-it, users-it, contract, e2e-feed, policy-it) report here."
    ],
    "triggers": "The developer opening the pull request against main.",
    "stores": "The diff, the review thread, and the check statuses that block merge.",
    "talksTo": "CI (triggered by the PR), the distributed test system (reports back here), and branch protection."
  }
});
