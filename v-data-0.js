window.IDP_DATA = Object.assign(window.IDP_DATA || {}, {
  "overview": {
    "n": "How to read this map (v2)",
    "p": "step",
    "w": "This is the presentation view of the internal developer platform. Follow navy badges 1 through 12: commit, Git, PR, CI gates, distributed tests, build, registry, GitOps bump, Argo sync, Kubernetes API, image pull and rollout, observe. The colorful poster is the source of truth. This panel is the prose layer. Solid arrows are software delivery. Dashed amber is plane B (Terraform). Dotted purple is production talking back.",
    "y": "Staff review needs one picture that is specific enough to argue with. v2 keeps the golden-path layout and names the real objects: five repos, PR #4821, newsfeed-service:v1827 (sha256:9f3a…c21), admission, HPA and CA on the same Prometheus metrics. If a box is not on this path, it is not how a feature reaches users.",
    "d": [
      "Product engineers own steps 1 through 8 as Git. Argo CD and Kubernetes own 9 through 11. Telemetry owns 12.",
      "App developers never run Terraform to ship a feature. Plane B is rare on purpose.",
      "Tap any box. Triggers, stores, and talks-to are listed when the original map had them.",
      "Rollback is a Git revert, synced by Argo. It is not a CI re-run of a deploy script."
    ],
    "triggers": "A product engineer commits and opens a pull request. That is the only human trigger on the daily delivery path.",
    "stores": "Desired application state in Git. Desired infrastructure in infra-terraform plus remote state. Immutable images in the registry. Runtime state in the Kubernetes API.",
    "talksTo": "Solid navy is delivery. Dashed amber is provisioning. Dotted purple is the learning loop."
  },
  "developers": {
    "n": "Software developers",
    "p": "ppl",
    "w": "Product engineers write service code on a standardized laptop: language SDK, formatter, linter, typechecker, unit-test runner, platform CLI, golden service templates, local kind/k3d, and secret stubs. They commit newsfeed-service on feature/feed-ranking, push, and open PR #4821. Dev tools are a control-plane client, not a tunnel into the cluster. Nobody helm-applies production from a laptop.",
    "y": "The inner loop has to feel local and cheap, or people will invent side doors. A standardized toolchain means a push is not the first time a gate is evaluated. The platform treats the engineer as a control-plane client, not as someone with a tunnel into the cluster.",
    "d": [
      "Local checks match CI so the laptop is a rehearsal, not a special environment.",
      "Auth is SSO plus short-lived credentials. Long-lived cloud keys do not live on laptops.",
      "Developers do not helm-apply, kubectl-apply, or click the cloud console to ship a feature.",
      "The same path is used by every author. The platform does not care which human typed the change."
    ],
    "triggers": "The engineer. A commit and an opened pull request are the only human actions on the delivery path. The same CI checks are runnable locally.",
    "stores": "Uncommitted work and feature branches live on the laptop until push. Local kind/k3d clusters are ephemeral and are not a path to production.",
    "talksTo": "Git (app-newsfeed, app-users). Auth is SSO plus short-lived credentials."
  },
  "git": {
    "n": "Git, source of truth",
    "p": "ctrl",
    "w": "Five repositories hold every desired state the platform converges to: app-newsfeed, app-users, platform-gitops, infra-terraform, and ci-pipelines. Clusters follow Git. Git does not follow the cluster. A gitops manifest change is how a green image becomes a production intent. PR #4821 is a first-class object on this path, not a courtesy.",
    "y": "The five-repo split is deliberate. Application code does not live next to cluster YAML, and infrastructure does not live next to CI config. Each repo has its own reviewers and merge policy. If you collapse it, you will get the wrong people approving the wrong kind of change.",
    "d": [
      "Application code → app-* repos. Manifests → platform-gitops. Infra → infra-terraform. CI → ci-pipelines.",
      "CI writes the image digest into platform-gitops on a green build.",
      "Argo CD watches platform-gitops. Terraform reads infra-terraform.",
      "Do not collapse the split to make a demo easier."
    ],
    "triggers": "Developers push application repos and open PRs. CI writes into platform-gitops on a green build. Platform engineers change infra-terraform.",
    "stores": "Application code, service config, deployment manifests, infrastructure definitions, and reusable CI pipelines.",
    "talksTo": "CI (push / PR events), Argo CD (watch platform-gitops), Terraform (read infra-terraform)."
  },
  "repo-app": {
    "n": "App code and CI",
    "p": "ctrl",
    "w": "Stand-in on the golden poster for application source. In v2 that surface is split: app-newsfeed (the change this map traces) and app-users. Kubernetes manifests still do not live here.",
    "y": "Keeping code next to its tests and away from cluster YAML stops product engineers from editing production objects by hand. CI can build an image from this repo without needing cluster credentials. Reviewers who know the service own this merge.",
    "d": [
      "Source of the commit that becomes newsfeed-service:v1827.",
      "Service config that is not a Kubernetes object stays with the code.",
      "CI configuration is referenced, not forked, so gates stay consistent.",
      "A green build produces an image. A later write lands in the manifests repo."
    ]
  },
  "repo-manifests": {
    "n": "platform-gitops (deploy manifests)",
    "p": "ctrl",
    "w": "v2 names this repository platform-gitops. Step 8 lands here: CI writes newsfeed-service:v1827 (or its digest) into a Deployment. Argo CD is the only process that applies that intent.",
    "y": "Separating manifests from application source is what makes GitOps honest. The cluster has one writer for workload intent. CI never talks to the Kubernetes API. If the digest is not in this repo, Argo CD has nothing new to sync.",
    "d": [
      "This is desired workload state, not application source and not infrastructure.",
      "Promotion is a Git write, not a pipeline step that calls kubectl.",
      "Reviewers here think about replicas, probes, resources, and rollouts.",
      "Argo CD watches this repo continuously."
    ]
  },
  "repo-infra": {
    "n": "infra-terraform",
    "p": "infra",
    "w": "v2 names this repository infra-terraform. App developers never run Terraform to ship a feature. Platform engineers change it when the substrate itself must change.",
    "y": "Cloud click-ops cannot be reviewed, reverted, or tested. Encoding the account in Terraform makes plane B visible and rare. The daily feature path should never need a plan/apply. If it does, the platform is missing an abstraction.",
    "d": [
      "Invoked (plan/apply), then exits. Opposite personality from Argo CD.",
      "Remote state is locked. Concurrent apply is a failure, not a race you hope to win.",
      "A new node group or database is this repo. A new replica of news-feed is not.",
      "The cluster this poster deploys onto was created from this repository."
    ]
  }
});
