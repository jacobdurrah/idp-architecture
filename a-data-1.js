window.IDP_DATA = Object.assign(window.IDP_DATA || {}, {
  "app-newsfeed": {
    "n": "app-newsfeed",
    "p": "ctrl",
    "w": "Application code and service config for newsfeed-service. PR #4821 lives here. Kubernetes manifests do not. The coding agent opens its branch against this repo. A later GitOps write lands in platform-gitops.",
    "y": "Keeping code next to its tests and away from cluster YAML stops both humans and agents from editing production objects by hand. Reviewers who know the service own this merge.",
    "d": [
      "Source of the commit that becomes newsfeed-service:v1827.",
      "Service config that is not a Kubernetes object stays with the code.",
      "CI configuration is referenced, not forked, so gates stay consistent.",
      "A green build produces an image. A follow-up write lands in the manifests repo."
    ],
    "triggers": "Developers and the coding agent.",
    "stores": "Source, unit tests, service-level config. Not Kubernetes manifests.",
    "talksTo": "CI on every PR. The PR board is the inbox for this repo."
  },
  "app-users": {
    "n": "app-users",
    "p": "ctrl",
    "w": "Application code and service config for the user, graph, and authn service. Same contract as app-newsfeed: code here, manifests in platform-gitops. The news-feed change may depend on its API. It does not live in the same repository.",
    "y": "A second app repo on the poster is the point. The platform is a contract reused by every service, not a special loop around news-feed. Agents use the same contract. Reviewers who know identity own this merge.",
    "d": [
      "Same fail-closed gate set, via ci-pipelines.",
      "Same image and GitOps promotion rules.",
      "Not bundled into app-newsfeed to make the diagram smaller.",
      "Talks to CI, then (on green) platform-gitops."
    ],
    "triggers": "Product engineers and coding agents on that service.",
    "stores": "Source and service config.",
    "talksTo": "CI, then (on green) platform-gitops."
  },
  "platform-gitops": {
    "n": "platform-gitops",
    "p": "ctrl",
    "w": "Deployment manifests, the desired Kubernetes state. Step 8 lands here: CI writes the image digest (newsfeed-service:v1827) into a Deployment. Canary, GitOps, and SRE agents also write here (a revert, a replica floor, a digest pin). Argo CD is the only process that applies that intent.",
    "y": "This repository is how a stored digest becomes an intent the cluster can converge to. CI still has not talked to Kubernetes. If the digest is not here, Argo CD has nothing new to sync. An agent that wants a rollback writes a revert. It does not kubectl-rollout.",
    "d": [
      "Deployments, Services, HPA, Ingress. Not application source.",
      "Promotion is a Git write, not kubectl.",
      "Reviewers think about replicas, probes, resources, rollouts.",
      "Argo CD watches this repo continuously."
    ],
    "triggers": "CI after a green image publish. Supply, GitOps, canary, and SRE agents on drift, deny, or a bad canary.",
    "stores": "Deployments, Services, HPA, Ingress, and related desired-state YAML.",
    "talksTo": "Argo CD watches this repo continuously. Humans review the gitops PR."
  },
  "infra-terraform": {
    "n": "infra-terraform",
    "p": "infra",
    "w": "Infrastructure definitions as code. Desired infra state, not desired workload state. VPC, subnets, cluster, node groups, load balancers, databases, IAM, DNS, queues, observability agents. App developers and coding agents never run Terraform to ship a feature.",
    "y": "Plane B has to be visible and rare. Encoding the account here is how a new node group is reviewed and reverted. The daily feature path, including agent loops, should never need a plan and apply.",
    "d": [
      "Invoked (plan and apply), then exits.",
      "Remote state is locked.",
      "A new replica of news-feed is not this repo.",
      "The cluster this poster deploys onto was created from here."
    ],
    "triggers": "Platform engineers, on a deliberate infra change.",
    "stores": "VPC, subnets, cluster, node groups, load balancers, databases, IAM, DNS, queues, observability agents, as code.",
    "talksTo": "Terraform plan and apply, which talks to the remote state backend and the cloud APIs."
  },
  "ci-pipelines": {
    "n": "ci-pipelines",
    "p": "ctrl",
    "w": "CI configuration and reusable pipelines. The fail-closed gate set is defined here once and consumed by every app repo. Workflow definitions, reusable jobs, policy-as-code hooks. Agents do not get a private pipeline that skips a gate.",
    "y": "If every app repo forks its pipeline, fail-closed becomes optional, and an agent will find the soft one. One repo of pipelines is how the platform keeps compile, SAST, SCA, and policy identical for news-feed and for users.",
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
  "pr-board": {
    "n": "PR #4821, stigmergic space",
    "p": "stig",
    "w": "The PR is the board. Required checks, review comments, bot reviews, and suggested patches all live on it. Agents and humans coordinate by writing on it, not by a side channel. Opening this PR is what starts validation. Nothing is deployed yet. Humans still own merge.",
    "y": "Branch protection is the contract. If merge can happen without the checks, the rest of the poster is decoration. The review agent reads the diff and the red checks and writes comments or a fixup commit. Chat is not the system of record.",
    "d": [
      "Required statuses block merge. A skipped required check is a failure.",
      "Merge queue serializes green PRs so main stays green.",
      "Bot reviews and suggested patches are traces on this board, same as a human comment.",
      "Integration results (newsfeed-it, users-it, contract, e2e-feed, policy-it) report here."
    ],
    "triggers": "The developer or coding agent opening the pull request against main.",
    "stores": "The diff, the review thread, suggested patches, and the check statuses that block merge.",
    "talksTo": "CI, the distributed test system, the review agent, the repair agent, and branch protection."
  },
  "review-agent": {
    "n": "Review agent",
    "p": "agent",
    "w": "The review agent reads the PR diff and the red checks. It writes review comments or a suggested patch, and it may push a fixup commit on the same branch. It does not merge. Humans still own merge. It does not open a side channel with the author.",
    "y": "Review attention is scarce. A machine that can name a missing test or a dangerous API should write that on the PR, where the author and the next agent can see it. A review that only happens in chat never becomes a gate.",
    "d": [
      "Reads: the diff, required check output, repo conventions.",
      "Writes: comments, suggested patches, optional fixup commits.",
      "Never: merge, dismiss a required check, apply to the cluster.",
      "The PR is the board. The agent leaves a trace the repair agent can also read."
    ],
    "triggers": "A new PR, a new commit on the PR, or a check that turned red.",
    "stores": "Nothing of its own. Its memory is the PR thread.",
    "talksTo": "The PR board, CI statuses, and the author (through the PR, not through a private DM)."
  }
});
