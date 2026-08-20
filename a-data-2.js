window.IDP_DATA = Object.assign(window.IDP_DATA || {}, {
  "ci": {
    "n": "CI platform",
    "p": "ctrl",
    "w": "CI is build plus validation, triggered by Git push or pull request. There is no manual run-deploy. Fail-closed: a red or skipped required check blocks merge. On green it publishes an immutable image and then updates platform-gitops. It does not mutate production Kubernetes. The gate set lives in ci-pipelines.",
    "y": "Without a single, required, machine-enforced gate set, every team (and every agent) invents a different definition of done. CI is the contract between an author and the rest of the path. It is also the last place a bad change is cheap to stop.",
    "d": [
      "Triggered by Git. Never by a human or an agent clicking Deploy.",
      "Produces logs, test artifacts, and an image pointer. Not a cluster mutation.",
      "The same pipeline definition is consumed by every app repo.",
      "A red check is a stigmergic trace. The repair agent reads it."
    ],
    "triggers": "Git. Fail-closed: a red check blocks merge.",
    "stores": "Logs, test artifacts, and the pipeline definition (from ci-pipelines). Not images. Those go to the registry.",
    "talksTo": "Git (status checks), the distributed test system, the build service, the artifact registry, and platform-gitops (step 8)."
  },
  "gate-compile": {
    "n": "Compile and build",
    "p": "ctrl",
    "w": "The first gate asks whether the change compiles and produces a build artifact. A broken compile never reaches tests, never reaches the registry, and never becomes a digest that GitOps could point at. The build graph is deterministic for the commit SHA. The status is a trace on the PR.",
    "y": "Compile failure is the cheapest possible no. Catching it in CI (and locally) keeps later, more expensive gates honest. A platform that skips compile as a required check will spend its time debugging environments instead of products.",
    "d": [
      "Required on every PR. Fail-closed.",
      "The compile is a function of the commit, not of the laptop that pushed it.",
      "Build cache is fine. Hidden local state is not.",
      "A yellow or skipped required check is a failed check."
    ],
    "triggers": "The pull request.",
    "stores": "Check statuses and retained debug artifacts.",
    "talksTo": "The Git status API. First required status on PR #4821."
  },
  "gate-static": {
    "n": "Static analysis",
    "p": "ctrl",
    "w": "Static analysis walks the tree for bug classes compilers do not care about: nullability, unused results, dangerous APIs, obvious concurrency mistakes. Findings are comments and a required status, not a Slack nudge. The review agent and the repair agent both read this trace.",
    "y": "Reviewers should spend attention on design, not on defects a machine can name. Static analysis also encodes house rules so they survive staff turnover. It is cheaper than an incident and faster than a human pass.",
    "d": [
      "Same analyzer versions in CI and on the laptop.",
      "Baseline debt is tracked. New findings on the diff are the gate.",
      "Suppressions require a reason and an owner.",
      "Fail-closed. A skipped analyzer is a failed check."
    ],
    "triggers": "The pull request.",
    "stores": "Check statuses and retained debug artifacts.",
    "talksTo": "The Git status API. Same analyzer versions locally and in ci-pipelines."
  },
  "gate-lint": {
    "n": "Lint",
    "p": "ctrl",
    "w": "Lint enforces formatting and mechanical style so review does not become a taste argument. The golden service template ships the same linter every repo uses. CI reapplies it. There is no special-case formatter per team, and no agent-only formatter.",
    "y": "Inconsistent style is not a moral failing. It is merge friction and a signal that the platform toolchain is optional. Making lint required is how the inner loop stays boring, which is the goal.",
    "d": [
      "Format-on-save locally. CI is the backstop, not the formatter of record.",
      "One config, referenced from the shared pipeline.",
      "Do not bike-shed in review. Change the linter if the rule is wrong.",
      "Required, fail-closed."
    ],
    "triggers": "The pull request.",
    "stores": "Check statuses and retained debug artifacts.",
    "talksTo": "The Git status API. One config, referenced from ci-pipelines."
  },
  "gate-type": {
    "n": "Type check",
    "p": "ctrl",
    "w": "The typechecker runs on the PR as a required status. Types are a design tool and a gate, not an optional IDE decoration. A change that does not typecheck does not merge, even if unit tests were skipped or deleted. The coding agent sees the same error locally.",
    "y": "Type errors caught here are production errors that never get a chance to become pages. They also keep refactors possible. A platform that lets untyped diffs through will pay for it in integration tests and in incidents.",
    "d": [
      "Required on every PR.",
      "The laptop toolchain uses the same compiler version as CI.",
      "Deleting tests to dodge a type error is a review finding.",
      "The status is a trace the repair agent can read."
    ],
    "triggers": "The pull request.",
    "stores": "Check statuses and retained debug artifacts.",
    "talksTo": "The Git status API. Same compiler locally and in CI."
  },
  "gate-unit": {
    "n": "Unit tests",
    "p": "ctrl",
    "w": "Unit tests run on the PR as a required status. They are fast, isolated, and owned by the service. A red unit gate is a trace on the checks board. The repair agent reads the failure and the artifact, then opens a follow-up commit.",
    "y": "A change that cannot prove its own functions should not spend integration capacity. Unit tests are the cheapest automated proof after compile. They are also the first board an agent can repair without a cluster.",
    "d": [
      "Required, fail-closed.",
      "Flakes are tracked. A flake is not a merge.",
      "Coverage on new code is a policy, not a vibe.",
      "The same runner is available on the laptop."
    ],
    "triggers": "The pull request.",
    "stores": "Check statuses, test reports, coverage.",
    "talksTo": "The Git status API and the repair agent (through the checks board)."
  },
  "gate-security": {
    "n": "Security scan",
    "p": "ctrl",
    "w": "SAST and related security checks run as a required status. Findings are written onto the PR and onto the scan trail that the supply agent will later read at the registry. A suppressed finding needs an owner and an expiry.",
    "y": "Security that is a weekly meeting is not a gate. Putting SAST on the PR is how a dangerous API dies before it is an image. Agents do not get a bypass because the finding is inconvenient.",
    "d": [
      "Required, fail-closed.",
      "Same rules for human and agent authors.",
      "Baseline debt is tracked. New findings on the diff are the gate.",
      "The trace lives on the PR, not in a private scanner UI."
    ],
    "triggers": "The pull request.",
    "stores": "Check statuses and retained findings.",
    "talksTo": "The Git status API and, later, the registry scan board."
  }
});
