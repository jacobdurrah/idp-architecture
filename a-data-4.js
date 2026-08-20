window.IDP_DATA = Object.assign(window.IDP_DATA || {}, {
  "repair-agent": {
    "n": "Repair agent",
    "p": "agent",
    "w": "The repair agent reads shard failures and artifacts, then opens a follow-up commit on the same PR. It may add a test, fix an assertion, or pin a flake with an owner. It does not merge. It does not delete the failing test to go green.",
    "y": "A red integration suite that only a human can decode will sit until Monday. An agent that can read the artifact and write a patch keeps the PR moving. The board stays the PR. The agent does not open a side ticket and forget it.",
    "d": [
      "Reads: red checks, junit, logs, flake board.",
      "Writes: a follow-up commit and a comment that names the shard.",
      "Never: merge, skip a required check, apply to the cluster.",
      "If the artifact is missing, it says so on the PR. It does not invent a cause."
    ],
    "triggers": "A red required check with artifacts, or a flake written on the board.",
    "stores": "Nothing of its own. The PR and the artifact store are the memory.",
    "talksTo": "The checks board, the artifacts board, and the PR."
  },
  "build": {
    "n": "Build service",
    "p": "ctrl",
    "w": "The build service produces an OCI image from the green SHA. No :latest. Argo never builds. The image pointer is the only thing later steps can agree on. Agents do not rebuild on a laptop and sneak the tag in.",
    "y": "A digest that is a function of the commit is how Git, the registry, kubelet, and admission stay honest. Rebuilding per environment is how you lose the ability to say what is running.",
    "d": [
      "Triggered by a green CI SHA.",
      "Deterministic for the commit. Cache is fine. Hidden local state is not.",
      "Argo CD is not a builder.",
      "The output is an image pointer, not a cluster mutation."
    ],
    "triggers": "A green required-gate set on the PR, or a post-merge build of main.",
    "stores": "Build logs and the image it publishes.",
    "talksTo": "The artifact registry (write) and, later, platform-gitops (digest bump)."
  },
  "registry": {
    "n": "Artifact registry",
    "p": "ctrl",
    "w": "CI writes. Nodes pull. SBOM plus cosign. Allow-listed only. The registry is where a green SHA becomes bytes that kubelet can fetch. Scan-on-push writes findings onto the scan board.",
    "y": "If anyone can push any tag, admission is theater. The registry is a control-plane store with a data-plane read path. Agents do not get a personal repository that skips signing.",
    "d": [
      "Allow-listed registries only.",
      "SBOM and cosign are required attestations.",
      "No :latest. Promotion is a new pointer, not a rebuild.",
      "Scan-on-push is a stigmergic write the supply agent reads."
    ],
    "triggers": "The build service publishing a digest.",
    "stores": "Image bytes, attestations, scan results.",
    "talksTo": "Build (write), worker nodes (pull), admission (provenance), the supply agent (scan board)."
  },
  "image-v1827": {
    "n": "newsfeed-service:v1827",
    "p": "ctrl",
    "w": "The concrete artifact this map traces. Digest sha256:9f3a…c21, linux/amd64, 184 MB, immutable. SBOM plus cosign signature. No :latest. Promotion is a new pointer, not a rebuild. No rebuild between environments.",
    "y": "A named digest is the only thing Git, the registry, kubelet, and admission can agree on. Floating tags are how you lose the ability to say what is running. 184 MB and linux/amd64 are on the poster so the artifact feels real.",
    "d": [
      "Triggered by a green CI SHA published by the build service.",
      "Stores the bytes plus attestations.",
      "platform-gitops references this digest. Worker nodes pull it.",
      "Admission will refuse an unsigned or off-allow-list image."
    ],
    "triggers": "A green CI SHA published by the build service.",
    "stores": "The bytes of the image plus its attestations.",
    "talksTo": "platform-gitops (the digest is written there) and worker nodes (they pull it)."
  },
  "bump": {
    "n": "platform-gitops bump",
    "p": "ctrl",
    "w": "CI writes the digest into a Deployment in platform-gitops. That write is the deploy. CI has no cluster credentials. An agent that wants a different digest opens a PR against the same repo. It does not patch the live object.",
    "y": "Promotion as a Git write is what makes rollback a revert and what makes an agent safe. If the bump were a kubectl set image, every agent would become a second CD system.",
    "d": [
      "Digest into Deployment. Reviewers see the pointer.",
      "That write is the deploy. Argo will sync it.",
      "CI ends at Git. CD is Argo, always on.",
      "A canary fail becomes a revert of this write."
    ],
    "triggers": "A published, signed, scanned digest.",
    "stores": "The manifest change in platform-gitops.",
    "talksTo": "Argo CD (watch) and humans who review the gitops PR."
  },
  "scan-board": {
    "n": "Registry scan results",
    "p": "stig",
    "w": "Scan-on-push and CVE findings live on this stigmergic board. The supply agent reads them and opens an upgrade PR (a new stigmergic write). A finding that only exists in a scanner email is not a board.",
    "y": "Supply-chain work is continuous. It cannot depend on a meeting. The scan board is how an agent and a human agree on what is urgent without a side channel.",
    "d": [
      "Findings are attached to a digest, not to a vibe.",
      "Policy says which CVEs block a bump.",
      "The supply agent writes a PR. It does not retag a dirty image as clean.",
      "This board sits next to the registry, and it reports back to Git."
    ],
    "triggers": "Scan-on-push, a scheduled rescan, or a new CVE feed.",
    "stores": "CVE findings, SBOM diffs, waiver records.",
    "talksTo": "The supply agent, admission (provenance), and the app or gitops PR it opens."
  },
  "supply-agent": {
    "n": "Supply-chain agent",
    "p": "agent",
    "w": "The supply-chain agent reads scan-on-push and CVE findings and opens an upgrade PR. That PR is a new stigmergic write on the same path as a feature. It never retags a vulnerable image as safe. It never applies to the cluster.",
    "y": "Human attention cannot watch every digest. An agent that opens a boring upgrade PR is how you keep the allow-list honest. The board is the scan result plus the PR. Chat is optional commentary.",
    "d": [
      "Reads: scan board, SBOM, waiver policy.",
      "Writes: an upgrade PR in the app repo or a pin in gitops.",
      "Never: dismiss a blocking CVE without an owned waiver, kubectl, a force push to main.",
      "The upgrade PR runs the same fail-closed gates."
    ],
    "triggers": "A new finding on the scan board, or a CVE feed that matches a stored SBOM.",
    "stores": "Nothing of its own. Scan results and the PR are the memory.",
    "talksTo": "The scan board, Git, and CI on the upgrade PR."
  }
});
