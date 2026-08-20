window.IDP_DATA = Object.assign(window.IDP_DATA || {}, {
  "overview": {
    "n": "How to read this poster",
    "p": "step",
    "w": "This is one code change, followed from a laptop to production and back. Read top to bottom: developers commit, CI validates, an image is stored, GitOps records the intent, the cluster converges, users are served, and telemetry returns to the people who shipped it. The numbered navy badges are the golden path. The amber band is a different life cycle: platform engineers provisioning the cloud.",
    "y": "A platform is not a pile of tools. It is a contract: product engineers ship by merging Git, and the cluster follows Git. The poster is the shared picture that staffing, incident response, and onboarding all point at. If a box is not on this path, it is not how a feature reaches users.",
    "d": [
      "Solid arrows are software delivery. Dashed amber is infrastructure. Dotted purple is the learning loop.",
      "Tap any box. The panel is the prose layer. The diagram stays the source of truth.",
      "The news-feed service is the example workload. The same path applies to every service on the platform.",
      "Infrastructure is created rarely. Application delivery happens many times a day."
    ]
  },
  "developers": {
    "n": "Software developers",
    "p": "ppl",
    "w": "Product engineers write service code on a standardized laptop: language SDK, formatter, linter, typechecker, unit-test runner, platform CLI, and golden service templates. They commit, push, and open a pull request. That is the only human trigger on the daily delivery path. Nobody runs a deploy job and nobody applies manifests to production from a laptop.",
    "y": "The inner loop has to feel local and cheap, or people will invent side doors. A standardized toolchain means a push is not the first time a gate is evaluated. The platform treats the engineer as a control-plane client, not as someone with a tunnel into the cluster.",
    "d": [
      "Local checks match CI so the laptop is a rehearsal, not a special environment.",
      "Auth is SSO plus short-lived credentials. Long-lived cloud keys do not live on laptops.",
      "Developers do not helm-apply, kubectl-apply, or click the cloud console to ship a feature.",
      "The same path is used by every author. The platform does not care which human typed the change."
    ]
  },
  "git": {
    "n": "Git, source of truth",
    "p": "ctrl",
    "w": "Git holds every desired state the platform converges to. Clusters follow Git. Git does not follow the cluster. Application code, deployment manifests, and infrastructure definitions live in separate repositories so each surface has its own reviewers and merge policy. A GitOps manifest change is how a green image becomes a production intent.",
    "y": "If desired state lives in tickets, wikis, or a running cluster, nobody can answer what should be true. Git gives you review, history, revert, and a single object that CI, Argo CD, and Terraform can all read. Drift is then a bug, not a workflow.",
    "d": [
      "Application code does not live next to cluster YAML.",
      "Infrastructure does not live next to CI config.",
      "Desired state lives in Git. Runtime state lives in the Kubernetes API.",
      "A revert in Git is a rollback. A click in the console is drift."
    ]
  },
  "repo-app": {
    "n": "App code and CI",
    "p": "ctrl",
    "w": "The application repository holds service source, unit tests, and service-level config for the change this poster traces (newsfeed-service). It also references the shared CI pipeline so every app repo evaluates the same fail-closed gate set. Kubernetes manifests do not live here.",
    "y": "Keeping code next to its tests and away from cluster YAML stops product engineers from editing production objects by hand. CI can build an image from this repo without needing cluster credentials. Reviewers who know the service own this merge.",
    "d": [
      "Source of the commit that becomes newsfeed-service:v1827.",
      "Service config that is not a Kubernetes object stays with the code.",
      "CI configuration is referenced, not forked, so gates stay consistent.",
      "A green build produces an image. A later write lands in the manifests repo."
    ]
  },
  "repo-manifests": {
    "n": "Deploy manifests",
    "p": "ctrl",
    "w": "This repository is the desired Kubernetes state: Deployments, Services, HPA, Ingress, and related YAML. After a green image publish, CI writes the image digest into a Deployment here. Argo CD is the only process that applies that intent to the cluster. Humans review the GitOps pull request. They do not apply it.",
    "y": "Separating manifests from application source is what makes GitOps honest. The cluster has one writer for workload intent. CI never talks to the Kubernetes API. If the digest is not in this repo, Argo CD has nothing new to sync.",
    "d": [
      "This is desired workload state, not application source and not infrastructure.",
      "Promotion is a Git write, not a pipeline step that calls kubectl.",
      "Reviewers here think about replicas, probes, resources, and rollouts.",
      "Argo CD watches this repo continuously."
    ]
  },
  "repo-infra": {
    "n": "Infrastructure Terraform",
    "p": "infra",
    "w": "Infrastructure definitions as code: VPC, cluster, node groups, load balancers, databases, IAM, DNS, queues, and observability agents. This is desired infra state, not desired workload state. App developers never run Terraform to ship a feature. Platform engineers change this repo when the substrate itself must change.",
    "y": "Cloud click-ops cannot be reviewed, reverted, or tested. Encoding the account in Terraform makes plane B visible and rare. The daily feature path should never need a plan/apply. If it does, the platform is missing an abstraction.",
    "d": [
      "Invoked (plan/apply), then exits. Opposite personality from Argo CD.",
      "Remote state is locked. Concurrent apply is a failure, not a race you hope to win.",
      "A new node group or database is this repo. A new replica of news-feed is not.",
      "The cluster this poster deploys onto was created from this repository."
    ]
  },
  "ci": {
    "n": "CI platform",
    "p": "ctrl",
    "w": "CI is build plus validation. It is triggered by a Git push or pull request. There is no manual run-deploy button on the daily path. On green it publishes an immutable image and then updates the deployment manifest. It does not mutate production Kubernetes. Fail-closed: a red or skipped required check blocks merge.",
    "y": "Without a single, required, machine-enforced gate set, every team invents a different definition of done. CI is the contract between a human author and the rest of the path. It is also the last place a bad change is cheap to stop.",
    "d": [
      "Triggered by Git. Never by a human clicking Deploy.",
      "Produces logs, test artifacts, and an image pointer. Not a cluster mutation.",
      "The same pipeline definition is consumed by every app repo.",
      "Merge of the app PR and the later GitOps PR are both policy-gated."
    ]
  }
});
