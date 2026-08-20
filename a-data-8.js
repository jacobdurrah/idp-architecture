window.IDP_DATA = Object.assign(window.IDP_DATA || {}, {
  "step2": {
    "n": "2. Git",
    "p": "step",
    "w": "The push lands in one of the five repos. Git is the shared board under every later board. Clusters follow Git. Agents write Git. They do not write the cluster.",
    "y": "If step 2 is optional, every later agent is improvising. Desired state has to live here or rollback is a story.",
    "d": [
      "Five repos, one desired-state surface.",
      "The PR will appear in step 3.",
      "No agent skips Git to be faster.",
      "Badge 2 sits on the Git row."
    ],
    "triggers": "A push from a laptop or an agent.",
    "stores": "The commit and the branch.",
    "talksTo": "CI, the PR board."
  },
  "step3": {
    "n": "3. PR board",
    "p": "step",
    "w": "PR #4821 is the main stigmergic space. Required checks, review comments, bot reviews, suggested patches. The review agent writes here. Humans still own merge. Agents and humans coordinate by writing on it, not by a side channel.",
    "y": "Branch protection is the contract. A PR that can merge without checks makes the rest of the path decorative.",
    "d": [
      "The PR is the board.",
      "The review agent does not merge.",
      "Chat is not the system of record.",
      "Badge 3 sits on the PR board."
    ],
    "triggers": "Opening the pull request.",
    "stores": "Diff, thread, statuses.",
    "talksTo": "CI, review agent, repair agent."
  },
  "step4": {
    "n": "4. CI traces",
    "p": "step",
    "w": "Eight fail-closed gates write statuses: compile, static, lint, types, unit, security, deps, policy. A red check is a trace the repair agent can read. Fail-closed. A skipped required check is a failure.",
    "y": "CI is the contract. Without it, agents and humans invent different definitions of done.",
    "d": [
      "Same gate set for every app repo.",
      "Statuses live on the checks board.",
      "No deploy button.",
      "Badge 4 sits on the CI row."
    ],
    "triggers": "The pull request.",
    "stores": "Check statuses and logs.",
    "talksTo": "The PR, the repair agent."
  },
  "step5": {
    "n": "5. Test artifacts",
    "p": "step",
    "w": "Coordinator, queue, ephemeral workers x1000s, results back to the PR. Suites: newsfeed-it, users-it, contract, e2e-feed, policy-it. The repair agent reads shard failures and artifacts and opens a follow-up commit on the same PR.",
    "y": "A red suite without artifacts is a rumor. Retention is part of the path.",
    "d": [
      "Ephemeral per-job environments.",
      "Results post to the PR.",
      "The flake board is stigmergic.",
      "Badge 5 sits on the test row."
    ],
    "triggers": "CI, as a required gate.",
    "stores": "Artifacts, flake records, statuses.",
    "talksTo": "The PR and the repair agent."
  },
  "step6": {
    "n": "6. Build",
    "p": "step",
    "w": "The build service produces an OCI image from the green SHA. No :latest. Argo never builds. The pointer is the only thing later steps can agree on.",
    "y": "A rebuild per environment is how you lose provenance. Agents do not ship laptop images.",
    "d": [
      "Deterministic for the commit.",
      "Output is an image pointer.",
      "Not a cluster mutation.",
      "Badge 6 sits on the build box."
    ],
    "triggers": "A green SHA.",
    "stores": "Build logs and the published digest.",
    "talksTo": "The registry."
  },
  "step7": {
    "n": "7. Scan",
    "p": "step",
    "w": "The registry stores newsfeed-service:v1827 (sha256:9f3a…c21) with SBOM and cosign. Scan-on-push writes the scan board. The supply agent reads findings and opens an upgrade PR.",
    "y": "A digest without a scan is an unverified souvenir. The scan is a trace, not a weekly email.",
    "d": [
      "Allow-listed only.",
      "The supply agent writes a PR, not a retag.",
      "Admission will ask again.",
      "Badge 7 sits on the registry."
    ],
    "triggers": "Publish and scan-on-push.",
    "stores": "Bytes, attestations, findings.",
    "talksTo": "The supply agent and platform-gitops."
  },
  "step8": {
    "n": "8. GitOps",
    "p": "step",
    "w": "CI writes the digest into platform-gitops. That write is the deploy. CI has no cluster credentials. A later revert is the same kind of write.",
    "y": "Promotion as Git is what makes every agent safe. kubectl as promotion is what makes every agent dangerous.",
    "d": [
      "The bump is the deploy.",
      "CI ends at Git.",
      "CD is Argo, always on.",
      "Badge 8 sits on the bump."
    ],
    "triggers": "A signed, scanned digest.",
    "stores": "The manifest change.",
    "talksTo": "Argo CD."
  },
  "step9": {
    "n": "9. Argo",
    "p": "step",
    "w": "Watch, compare, sync. Always on. Pull-based. The GitOps agent reads drift or deny and opens a revert or a fix in Git. It never kubectl-applies.",
    "y": "Argo is the only applicator. Console clicks are drift. Agent clicks are incidents.",
    "d": [
      "Not a CI job.",
      "Drift is a trace on the Argo board.",
      "Sync is convergence, not a deploy button.",
      "Badge 9 sits on Argo."
    ],
    "triggers": "A Git change or a drift interval.",
    "stores": "Sync status and history.",
    "talksTo": "Git (read), the API (apply through admission)."
  },
  "step10": {
    "n": "10. API",
    "p": "step",
    "w": "The Kubernetes API plus admission (OPA, Kyverno, PSS) is the front door. Provenance and allow-list are evaluated again. A deny is a trace. The GitOps agent writes a fix in Git. The object does not sneak in.",
    "y": "Shift-left is not enough. The API is where the cluster tells the truth. Agents do not get a second API.",
    "d": [
      "Every create or update hits admission.",
      "A deny is telemetry and a board write.",
      "No agent talks to kubelet directly.",
      "Badge 10 sits on admission and the API."
    ],
    "triggers": "Argo applying desired state.",
    "stores": "API objects and admission decisions.",
    "talksTo": "Admission, kubelet (later), the Argo board."
  },
  "step11": {
    "n": "11. Canary",
    "p": "step",
    "w": "Nodes pull v1827 and roll it out. Ingress, HPA, CA keep the data plane elastic. The canary-analysis agent compares new-version metrics to baseline. A bad canary becomes a git revert, not a chat message. Silence is not a pass.",
    "y": "A digest that never serves a request is a souvenir. A canary that cannot fail is a rollout with extra steps.",
    "d": [
      "Same Prometheus as the dashboards.",
      "Fail writes a revert in platform-gitops.",
      "If 12 is dark, this step freezes.",
      "Badge 11 sits on image pull and rollout."
    ],
    "triggers": "Admitted pods, then kubelet pull, then a slice of traffic.",
    "stores": "Running containers and the canary verdict.",
    "talksTo": "Registry (pull), the canary board, Git (revert)."
  },
  "step12": {
    "n": "12. Observe, then write back",
    "p": "step",
    "w": "OTel SDKs to collector to backends to Grafana and alerts to engineers and agents. Telemetry writes the next change. The SRE agent may open a rollback PR or a fix PR. If 12 is dark, stop. Do not let agents optimize from empty dashboards.",
    "y": "The path is a loop. A path that ends at a dashboard is a museum. A path that keeps looping when the board is blank is a hazard.",
    "d": [
      "Dotted rose and purple rail back to the coding agent and the PR.",
      "The obs-guard owns the freeze.",
      "Resume autonomous loops only when heartbeats return.",
      "Badge 12 sits on observability."
    ],
    "triggers": "The process, always on. Or a missing heartbeat.",
    "stores": "Backends, SLO counters, tickets.",
    "talksTo": "Engineers, agents, HPA, CA, and (when dark) the obs-guard."
  }
});
