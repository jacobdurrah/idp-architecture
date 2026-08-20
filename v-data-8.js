window.IDP_DATA = Object.assign(window.IDP_DATA || {}, {
  "datadog": {
    "n": "Datadog",
    "p": "obs",
    "w": "Unified APM and a second pair of eyes on the same OTel stream. Backends are interchangeable stores and UX. The SDK does not speak Datadog as a special case if you can avoid it. The collector exports here.",
    "y": "Some questions are faster in a commercial UX. That is fine if the collection layer stays yours. Datadog is a backend on this poster, not the identity of the observability plane.",
    "d": [
      "Fed by the collector, not by a second agent if you can help it.",
      "Useful for unified APM and correlation.",
      "Does not replace Prometheus as the HPA source unless you choose that deliberately.",
      "Keys and retention are platform-owned."
    ],
    "triggers": "The collector.",
    "stores": "Unified APM views.",
    "talksTo": "Engineers, paging."
  },
  "grafana": {
    "n": "Grafana",
    "p": "obs",
    "w": "Dashboards and explore. Grafana reads Prometheus, Loki, Tempo, and whatever else the collector feeds. SLOs are visible here. This is not where alerts should secretly live if you can keep them as code.",
    "y": "A shared UX is how the people who shipped 1 through 10 look at the same truth. Folder sprawl is a platform problem. Golden dashboards ship with the golden service template.",
    "d": [
      "Query UX over the backends, not a store of record.",
      "Golden dashboards are reviewed like code.",
      "Explore is for incidents. The SLO board is for the week.",
      "Access is SSO."
    ],
    "triggers": "Humans and burn-rate boards.",
    "stores": "Dashboard JSON, not telemetry.",
    "talksTo": "The backends it queries."
  },
  "alerts": {
    "n": "Alerts and SLOs",
    "p": "alert",
    "w": "Burn-rate alerts, canary metric shifts, infra errors (image-pull, admission denial, API latency). A bad deploy is a burn-rate alert and a canary shift. Remediation is a Git revert in platform-gitops, synced by Argo CD, not a CI re-run of a deploy script.",
    "y": "Observability that does not page and does not change a decision is a hobby. SLOs are how the platform says what matters. Alerts are how that statement becomes a human in the loop.",
    "d": [
      "Derived from the same SLIs that drive HPA.",
      "Product engineers get paged on their SLOs.",
      "Platform team pages on control-plane health.",
      "Canary analysis plus git revert is rollback through Argo."
    ],
    "triggers": "Burn-rate, canary shift, infra error.",
    "stores": "Alert state and SLO error-budget counters.",
    "talksTo": "The people who can merge a gitops rollback or open an infra-terraform change."
  },
  "engineers": {
    "n": "Engineers and platform team",
    "p": "ppl",
    "w": "Production telemetry becomes a page, a canary decision, a capacity plan, or a rollback PR. Canary analysis plus git revert is rollback through Argo. The feedback loop writes next month's infra (Terraform) when saturation says the node group or the database is the answer. Product engineers get paged on their SLOs. Platform team uses the same telemetry for Argo sync, API latency, image-pull errors, admission denials. They do not log into nodes.",
    "y": "A path that does not return to people is automation without learning. This box is why the poster is a loop, not a slide. Next month's infra is written from this week's saturation, not from a guess in Q1.",
    "d": [
      "Rollback is Git, synced by Argo CD.",
      "Capacity is Terraform, on purpose, not daily.",
      "The same telemetry serves both groups.",
      "No SSH as a workflow."
    ],
    "triggers": "SLOs and pages.",
    "stores": "The organization's memory of what shipped and what broke.",
    "talksTo": "Git (rollback PR), Terraform (capacity), and humans."
  },
  "step1": {
    "n": "1. Commit from a standardized laptop",
    "p": "ctrl",
    "w": "A developer writes newsfeed-service on the platform toolchain and commits. Local checks already match CI. This is the only human trigger that will follow.",
    "y": "If shipping requires a second human ritual after the PR, the path will be bypassed. Starting the whole poster with a commit is the operating rule: people write Git, machines do the rest.",
    "d": [],
    "triggers": "The developer.",
    "stores": "The working tree, then the pushed branch.",
    "talksTo": "Git."
  },
  "step2": {
    "n": "2. Desired state in Git",
    "p": "ctrl",
    "w": "The change lands in the right repo. Application code goes to app-newsfeed. The five-repo split (app-*, platform-gitops, infra-terraform, ci-pipelines) is the source of truth the rest of the path reads.",
    "y": "Validation is cheap here and expensive in production. Making every gate required is how the platform defines done without a meeting.",
    "d": [],
    "triggers": "git push.",
    "stores": "The commit.",
    "talksTo": "CI, via webhook."
  },
  "step3": {
    "n": "3. PR #4821 becomes the contract",
    "p": "ctrl",
    "w": "The pull request is a first-class gate. Required checks (CI, lint, types, unit, SAST/SCA, policy, integration, review) must go green. Nothing has been deployed.",
    "y": "Some truths only appear when services talk to each other. The platform owes you that proof without a shared staging snowflake.",
    "d": [],
    "triggers": "Opening the PR against main.",
    "stores": "The diff and the status checks.",
    "talksTo": "CI and reviewers."
  },
  "step4": {
    "n": "4. Fail-closed validation",
    "p": "ctrl",
    "w": "Compile, static analysis, lint, type check, unit tests, SAST, SCA, policy. Fail-closed. A skipped required check is a failure.",
    "y": "A digest is the only artifact the rest of the path can agree on. A rebuild per environment is how you lose the ability to say what is running.",
    "d": [],
    "triggers": "The PR.",
    "stores": "Check statuses and artifacts.",
    "talksTo": "Branch protection."
  },
  "step5": {
    "n": "5. Distributed integration tests",
    "p": "ctrl",
    "w": "A scheduler shards newsfeed-it, users-it, contract, e2e-feed, and policy-it onto a worker pool and ephemeral per-job environments. Results return to PR #4821. Merge queue only pops green.",
    "y": "CI writes. The cluster reads. The registry is the contract in the middle.",
    "d": [],
    "triggers": "CI, as a required gate.",
    "stores": "Job state and logs.",
    "talksTo": "The status-check API."
  },
  "step6": {
    "n": "6. Build an immutable image",
    "p": "ctrl",
    "w": "The build service produces an OCI image from the green SHA. No latest tag. Argo CD will never build this image.",
    "y": "Intent that is not in Git is not intent. The bump is how a stored image becomes something Argo CD can see.",
    "d": [],
    "triggers": "Green validation.",
    "stores": "Build provenance. Bytes go to the registry.",
    "talksTo": "Artifact registry."
  },
  "step7": {
    "n": "7. Store newsfeed-service:v1827",
    "p": "ctrl",
    "w": "The registry accepts the immutable digest sha256:9f3a…c21 (linux/amd64, 184 MB, SBOM + cosign). Promotion is a new pointer, not a rebuild. If the digest is not here, no pod will start.",
    "y": "Keeping CI credentials out of the cluster is a security property and a design property. This badge exists so nobody hides a kubectl behind a job named release.",
    "d": [],
    "triggers": "The build service push.",
    "stores": "Image, SBOM, signatures.",
    "talksTo": "Later: kubelet, on step 11."
  }
});
