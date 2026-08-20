window.IDP_DATA = Object.assign(window.IDP_DATA || {}, {
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
    ]
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
    ]
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
    ]
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
    ]
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
    ]
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
    ]
  },
  "gate-deps": {
    "n": "Dependency scan (SCA)",
    "p": "ctrl",
    "w": "Software composition analysis checks direct and transitive dependencies against known vulnerabilities and license policy. A high-severity finding on a reachable package blocks merge. The same scan attests the image later, so the registry is not a second, weaker opinion.",
    "y": "Most of the code you ship is not yours. SCA is how the platform notices a bad transitive bump before it is a production CVE and a weekend. It also stops license surprises at the worst possible time.",
    "d": [
      "Lockfiles are required. Floating ranges are a gate failure.",
      "The same policy evaluates the source graph and the image SBOM.",
      "Pin and bump deliberately. Do not hope `latest` is fine.",
      "Fail-closed for the severity floor the security team publishes."
    ]
  },
  "gate-policy": {
    "n": "Policy checks",
    "p": "ctrl",
    "w": "Policy-as-code evaluates the change against platform rules: allowed base images, required labels, resource requests, no privileged containers, provenance hints. The same family of rules is evaluated again at admit time so a bypassed pipeline still cannot land a bad pod.",
    "y": "A pipeline that can be skipped is not a control. Policy in CI is shift-left. Policy at admission is the backstop. Together they let product engineers move fast without asking the platform team to review every YAML file.",
    "d": [
      "Rules live in Git, reviewed like any other change.",
      "Evaluated in CI and again at the API server.",
      "A skipped policy check is a failed check.",
      "Exceptions are time-bounded and named."
    ]
  },
  "coordinator": {
    "n": "Test coordinator",
    "p": "ctrl",
    "w": "The coordinator is the scheduler for distributed integration testing. It shards suites, assigns workers, enforces timeouts and retries, and is itself a small control plane. It is not a single CI agent box and it is not the developer's laptop.",
    "y": "Integration tests that share one machine become a queue, then a lie. A coordinator lets the platform run hundreds to thousands of suites in parallel without coupling them to a snowflake runner. Timeouts and retries live here so every suite gets the same deal.",
    "d": [
      "Triggered by CI as a required gate on the PR.",
      "Shards work. It does not execute tests itself.",
      "Lease state is short-lived. A dead worker loses its claim.",
      "The PR is the inbox for its decisions, not a chat channel."
    ]
  }
});
