window.IDP_DATA = Object.assign(window.IDP_DATA || {}, {
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
    ],
    "triggers": "The pull request.",
    "stores": "Check statuses and retained debug artifacts.",
    "talksTo": "The Git status API. Required statuses block merge. Lockfiles required. Floating ranges fail the gate."
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
    ],
    "triggers": "The pull request.",
    "stores": "Check statuses and retained debug artifacts.",
    "talksTo": "The Git status API. Required statuses block merge. Evaluated again at admission (OPA / Kyverno / PSS)."
  },
  "coordinator": {
    "n": "Test coordinator",
    "p": "ctrl",
    "w": "The coordinator shards suites (newsfeed-it, users-it, contract, e2e-feed, policy-it), assigns workers, and enforces timeouts and retries. Test orchestration is itself a distributed control plane. It is not a single CI agent box.",
    "y": "Integration tests that share one machine become a queue, then a lie. A coordinator lets the platform run hundreds to thousands of suites in parallel without coupling them to a snowflake runner. Timeouts and retries live here so every suite gets the same deal.",
    "d": [
      "Triggered by CI as a required gate on the PR.",
      "Shards work. It does not execute tests itself.",
      "Lease state is short-lived. A dead worker loses its claim.",
      "The PR is the inbox for its decisions, not a chat channel."
    ],
    "triggers": "CI on the PR.",
    "stores": "Schedule and lease state for in-flight suites.",
    "talksTo": "The job queue and the worker pool."
  },
  "queue": {
    "n": "Job queue",
    "p": "ctrl",
    "w": "Holds the sharded work: newsfeed-it, users-it, contract, e2e-feed, policy-it. Workers pull. The coordinator does not reach into a laptop.",
    "y": "A queue is how you get isolation and parallelism without a shared staging environment. It is also how you see backlog. If the queue grows, you add workers. You do not skip the suite.",
    "d": [
      "Pull-based. Workers claim jobs.",
      "Per-job records: queued, running, done, failed.",
      "Backpressure is visible. It is not hidden in a single agent log.",
      "The queue is not a source of truth for product state."
    ],
    "triggers": "The scheduler.",
    "stores": "Queued and in-flight job records.",
    "talksTo": "Parallel test workers."
  },
  "workers": {
    "n": "Ephemeral workers ×1000s",
    "p": "data",
    "w": "Ephemeral slots (Worker 1…N). The pool implies hundreds to thousands concurrent. Each job gets its own namespace, compose stack, or preview cluster, torn down after the run. Integration tests do not run on the developer laptop and do not run on a single CI agent.",
    "y": "Shared staging is where flakes and political blocks are born. Ephemeral per-job environments keep suites isolated and disposable. Scale-out is a worker-pool problem, not a calendar problem.",
    "d": [
      "Nothing durable lives on a worker.",
      "Created for the suite, torn down after the run.",
      "The grid on the poster is the point: this is a fleet, not a box.",
      "Results go back to the PR, not into a tribal spreadsheet."
    ],
    "triggers": "The job queue.",
    "stores": "Nothing durable. A slot exists for the life of one suite.",
    "talksTo": "An ephemeral test environment, then the result sink that comments on PR #4821."
  },
  "results": {
    "n": "Results back to the PR",
    "p": "ctrl",
    "w": "Status checks plus comments on PR #4821. Required statuses block merge. Merge queue only pops green. Artifacts are retained for debug. The PR is the inbox.",
    "y": "If results live in Slack, merge policy cannot see them and history cannot explain them. Putting the result on the PR is what makes fail-closed real. Reviewers and branch protection read the same object.",
    "d": [
      "Status plus logs plus debug artifacts.",
      "A red suite is a blocked merge, not a conversation starter.",
      "Artifacts have a retention policy. They are not eternal.",
      "The same comment shape is used for every suite."
    ],
    "triggers": "Suite completion.",
    "stores": "Status, logs, and debug artifacts.",
    "talksTo": "Git branch protection and the merge queue."
  },
  "build": {
    "n": "Build service",
    "p": "ctrl",
    "w": "Produces immutable OCI images from a green CI SHA. There is no latest tag in production. The build is a function of the commit. Argo CD never builds images. The concrete artifact this map traces is newsfeed-service:v1827.",
    "y": "If images are built by hand, or rebuilt per environment, you cannot say what is running. A central build service plus a digest is how the rest of the path stays honest. Promotion becomes a pointer change, not a second compilation.",
    "d": [
      "Triggered by a green validation graph on the PR or main SHA.",
      "Build cache and provenance stay with the SHA. Bytes go to the registry.",
      "No latest. No rebuild between environments.",
      "Argo CD is a consumer of digests, not a builder."
    ],
    "triggers": "A green validation graph on the PR / main SHA.",
    "stores": "Build cache and provenance for the SHA. The image itself is stored in the registry.",
    "talksTo": "The artifact registry (push). Argo CD never builds images."
  }
});
