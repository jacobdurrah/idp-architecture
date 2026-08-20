window.IDP_DATA = Object.assign(window.IDP_DATA || {}, {
  "ci": {
    "n": "CI platform",
    "p": "ctrl",
    "w": "CI is build plus validation, triggered by Git push or pull request. There is no manual run-deploy. Fail-closed: a red or skipped required check blocks merge. On green it publishes an immutable image and then updates platform-gitops. It does not mutate production Kubernetes. The gate set lives in ci-pipelines and is consumed by every app repo.",
    "y": "Without a single, required, machine-enforced gate set, every team invents a different definition of done. CI is the contract between a human author and the rest of the path. It is also the last place a bad change is cheap to stop.",
    "d": [
      "Triggered by Git. Never by a human clicking Deploy.",
      "Produces logs, test artifacts, and an image pointer. Not a cluster mutation.",
      "The same pipeline definition is consumed by every app repo.",
      "Merge of the app PR and the later GitOps PR are both policy-gated."
    ],
    "triggers": "Git. Fail-closed: a red check blocks merge.",
    "stores": "Logs, test artifacts, and the pipeline definition (from ci-pipelines). Not images. Those go to the registry.",
    "talksTo": "Git (status checks), the distributed test system, the build service, the artifact registry, and platform-gitops (step 8)."
  },
  "gate-compile": {
    "n": "Compile and build",
    "p": "ctrl",
    "w": "The first gate asks whether the change compiles and produces a build artifact. A broken compile never reaches tests, never reaches the registry, and never becomes a digest that GitOps could point at. The build graph is deterministic for the commit SHA.",
    "y": "Compile failure is the cheapest possible no. Catching it in CI (and locally) keeps later, more expensive gates honest. A platform that skips compile-as-a-required-check will spend its time debugging environments instead of products.",
    "d": [
      "Required on every PR. Fail-closed.",
      "The compile is a function of the commit, not of the laptop that pushed it.",
      "Build cache is fine. Hidden local state is not.",
      "A yellow or skipped required check is a failed check."
    ],
    "triggers": "The pull request.",
    "stores": "Check statuses and retained debug artifacts.",
    "talksTo": "The Git status API. Required statuses block merge. First required status on PR #4821."
  },
  "gate-static": {
    "n": "Static analysis",
    "p": "ctrl",
    "w": "Static analysis walks the tree for bug classes compilers do not care about: nullability, unused results, dangerous APIs, obvious concurrency mistakes. Findings are comments and a required status, not a Slack nudge.",
    "y": "Reviewers should spend attention on design, not on defects a machine can name. Static analysis also encodes house rules so they survive staff turnover. It is cheaper than an incident and faster than a human pass.",
    "d": [
      "Same analyzer versions in CI and on the laptop.",
      "Baseline debt is tracked. New findings on the diff are the gate.",
      "Suppressions require a reason and an owner.",
      "Fail-closed. A skipped analyzer is a failed check."
    ],
    "triggers": "The pull request.",
    "stores": "Check statuses and retained debug artifacts.",
    "talksTo": "The Git status API. Required statuses block merge. Same analyzer versions locally and in ci-pipelines."
  },
  "gate-lint": {
    "n": "Lint",
    "p": "ctrl",
    "w": "Lint enforces formatting and mechanical style so review does not become a taste argument. The golden service template ships the same linter every repo uses. CI reapplies it. There is no special-case formatter per team.",
    "y": "Inconsistent style is not a moral failing. It is merge friction and a signal that the platform toolchain is optional. Making lint required is how the inner loop stays boring, which is the goal.",
    "d": [
      "Format-on-save locally. CI is the backstop, not the formatter of record.",
      "One config, referenced from the shared pipeline.",
      "Do not bike-shed in review. Change the linter if the rule is wrong.",
      "Required, fail-closed."
    ],
    "triggers": "The pull request.",
    "stores": "Check statuses and retained debug artifacts.",
    "talksTo": "The Git status API. Required statuses block merge. One config, referenced from ci-pipelines."
  },
  "gate-type": {
    "n": "Type check",
    "p": "ctrl",
    "w": "The typechecker runs on the PR as a required status. Types are a design tool and a gate, not an optional IDE decoration. A change that does not typecheck does not merge, even if unit tests were skipped or deleted.",
    "y": "Type errors caught here are production errors that never get a chance to become pages. They also keep refactors possible. A platform that lets untyped diffs through will pay for it in integration tests and in incidents.",
    "d": [
      "Required on every PR.",
      "The laptop toolchain uses the same compiler version as CI.",
      "Generated code is checked in or produced by a deterministic step.",
      "Fail-closed. Skipped typecheck is a failure."
    ],
    "triggers": "The pull request.",
    "stores": "Check statuses and retained debug artifacts.",
    "talksTo": "The Git status API. Required statuses block merge. Same compiler version as the laptop toolchain."
  },
  "gate-unit": {
    "n": "Unit tests",
    "p": "ctrl",
    "w": "Unit tests run in CI on every PR, in parallel, with a time budget. They cover domain logic and the service's own edge cases. They do not stand up a cluster and they do not replace integration tests. A red suite blocks merge.",
    "y": "Unit tests are the fastest proof that the change means what the author thinks it means. They are also the regression net that lets the next person refactor. Integration tests are slower and fewer. They cannot be the only net.",
    "d": [
      "Deterministic. No live network, no shared staging.",
      "Required status. Coverage floors are policy, not a dashboard trophy.",
      "Flakes are bugs in the suite. They are not retried into green forever.",
      "Local `unit` target matches CI so a push is not a surprise."
    ],
    "triggers": "The pull request.",
    "stores": "Check statuses and retained debug artifacts.",
    "talksTo": "The Git status API. Required statuses block merge. Coverage floors are policy, not a trophy."
  },
  "gate-security": {
    "n": "Security scan (SAST)",
    "p": "ctrl",
    "w": "Static application security testing runs on the diff and the resulting artifact graph. It looks for injection, secret leakage, unsafe deserialization, and the usual high-confidence classes. Findings file as required checks. A bypass needs a security owner, not a hopeful comment.",
    "y": "Security review that only happens at launch is theater. SAST on every PR is how the platform keeps a baseline without staffing a human on every diff. It is also the first half of defense in depth. Admission will ask again later.",
    "d": [
      "Required, fail-closed.",
      "Secrets detected here never become image layers.",
      "Rule packs are versioned in the shared CI repo.",
      "A suppression is an audit event."
    ],
    "triggers": "The pull request.",
    "stores": "Check statuses and retained debug artifacts.",
    "talksTo": "The Git status API. Required statuses block merge. SAST on the diff. Secrets never become layers."
  }
});
