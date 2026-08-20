window.IDP_DATA = Object.assign(window.IDP_DATA || {}, {
  "overview": {
    "n": "How to read this map (agents)",
    "p": "step",
    "w": "This is the agent view of the golden path. Follow navy badges 1 through 12: local agent and commit, Git, the PR board, CI traces, test artifacts, build, scan, GitOps, Argo, the API, canary, observe. Then write back to 1. Agents sit beside people and planes. They read and write shared artifacts. They do not hold a private conversation that replaces the board. You named this idea stigmergent. The word on the poster is stigmergic: coordination through traces in a shared environment, not direct chat.",
    "y": "Staff review needs one picture of where an agent is allowed to act. An agent that can kubectl-apply is a second control plane. An agent that can only open a PR is a colleague with a keyboard. Observability is the top of the loop. When that board goes blank, a blank board is not permission to guess. If step 12 is dark, stop.",
    "d": [
      "Dashed rose boxes are stigmergic spaces. The environment holds the trace. Agents and humans read those traces to improve code, hold a ship, or respond when observability is dark.",
      "Solid navy arrows are delivery. Dotted rose and purple is telemetry writing the next change.",
      "Agents never apply to the cluster. A fix is a Git write. Argo is the only applicator.",
      "Tap any box. The panel is the prose layer. The poster is the source of truth."
    ],
    "triggers": "A developer or a coding agent writes a change and opens a pull request. That write is the only daily trigger. An observability page is the other trigger, and it writes back into Git.",
    "stores": "Desired state in Git. Images in the registry. Live state in the Kubernetes API. Traces on the boards: PR, checks, scans, canary, dashboards, tickets.",
    "talksTo": "Agents talk to boards, not to each other as the system of record. Humans still own merge and incident command."
  },
  "developers": {
    "n": "Software developers",
    "p": "ppl",
    "w": "Product engineers write service code on a standardized laptop: language SDK, formatter, linter, typechecker, unit-test runner, platform CLI, golden templates, local kind or k3d, and secret stubs. They commit newsfeed-service, push, and open PR #4821. Dev tools are a control-plane client, not a tunnel into the cluster. Nobody kubectl-applies production from a laptop.",
    "y": "The inner loop has to feel local and cheap, or people (and agents) will invent side doors. A standardized toolchain means a push is not the first time a gate is evaluated. The platform treats the engineer as a control-plane client. The coding agent sits in the same seat.",
    "d": [
      "Local checks match CI so the laptop is a rehearsal, not a special environment.",
      "Auth is SSO plus short-lived credentials. Long-lived cloud keys do not live on laptops.",
      "Developers do not helm-apply, kubectl-apply, or click the cloud console to ship a feature.",
      "The same path is used by every author, human or agent. Merge policy does not care who typed the diff."
    ],
    "triggers": "The engineer. A commit and an opened pull request are the human actions on the delivery path. The same CI checks are runnable locally.",
    "stores": "Uncommitted work and feature branches live on the laptop until push. Local kind or k3d clusters are ephemeral and are not a path to production.",
    "talksTo": "The coding agent (same IDE and CLI). Git (app-newsfeed, app-users). Auth is SSO plus short-lived credentials."
  },
  "coding-agent": {
    "n": "Coding agent",
    "p": "agent",
    "w": "The coding agent sits in the IDE and the platform CLI. It reads local lint, types, and unit tests, and later it reads PR, CI, and observability traces. It writes a branch and a pull request. It never applies to the cluster. It is a control-plane client with a keyboard, not a second deployer.",
    "y": "If the agent can skip the board, it will. Putting it on the same path as the developer is how you keep review, gates, and rollback honest. The first board it reads is local check output. The last board it reads is telemetry. Both are traces, not chat.",
    "d": [
      "Allowed writes: a branch, a commit, a PR, a comment. Not kubectl, not helm, not a cloud console.",
      "It improves the next change by reading traces other agents and humans left on the path.",
      "When observability is dark, it does not invent a story from an empty dashboard. The obs-guard freezes that loop.",
      "Same laptop toolchain as the human. Same fail-closed contract."
    ],
    "triggers": "A developer request, a failing local gate, a red PR check, or a telemetry trace that points at code.",
    "stores": "The working tree, the feature branch, and the PR it opens. Nothing in the cluster.",
    "talksTo": "Local check output, Git, the PR board, and (later) CI, scan, canary, and observability boards."
  },
  "local-board": {
    "n": "Local check output",
    "p": "stig",
    "w": "The working tree plus local gate output is the first stigmergic board. Lint, types, and unit tests write traces onto the laptop. The coding agent and the developer read those traces and change the tree. Nobody needs a meeting to know the file does not typecheck.",
    "y": "A push that is the first evaluation of a gate is how you waste CI and reviewers. The local board is a rehearsal of the PR board. It is also the cheapest place for an agent to fail.",
    "d": [
      "Same linter, typechecker, and unit runner as CI.",
      "A red local gate is a trace. The agent patches the tree. It does not open a side channel.",
      "kind or k3d can add a local runtime trace. That still is not production.",
      "This board dies when the laptop sleeps. The PR board is the durable one."
    ],
    "triggers": "Save, test, or an agent loop on the working tree.",
    "stores": "Compiler, linter, and test output in the workspace. Uncommitted diffs.",
    "talksTo": "The coding agent and the developer. After push, the same signals reappear as CI checks."
  },
  "git": {
    "n": "Git, the shared board",
    "p": "ctrl",
    "w": "Five repositories hold every desired state the platform converges to: app-newsfeed, app-users, platform-gitops, infra-terraform, and ci-pipelines. Clusters follow Git. Git does not follow the cluster. Agents write here (branches and PRs). They do not write to the API server.",
    "y": "Git is the durable stigmergic surface under every later board. A PR, a digest bump, a revert, and a rollback are all Git writes. If an agent could skip Git, the rest of the poster would be a story it told itself.",
    "d": [
      "Application code in app-* repos. Manifests in platform-gitops. Infra in infra-terraform. CI in ci-pipelines.",
      "CI writes the image digest into platform-gitops on a green build.",
      "Argo CD watches platform-gitops. Terraform reads infra-terraform.",
      "Do not collapse the split to make a demo or an agent loop easier."
    ],
    "triggers": "Developers and coding agents push application repos and open PRs. CI writes into platform-gitops on a green build. Supply, GitOps, canary, and SRE agents open follow-up PRs.",
    "stores": "Application code, service config, deployment manifests, infrastructure definitions, and reusable CI pipelines.",
    "talksTo": "CI (push and PR events), Argo CD (watch platform-gitops), every agent that writes a PR."
  }
});
