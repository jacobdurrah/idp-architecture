window.IDP_DATA = Object.assign(window.IDP_DATA || {}, {
  "overview":   {
    "n": "How to read this map (scenarios)",
    "p": "step",
    "w": "This tab is the stitch. v2 is how a change is admitted. Agents are who reads the traces. Metal is the floor. Play a direction.",
    "y": "One change, three directions. newsfeed-service:v1827 and PR #4821 are the through-line so the conversation stays concrete. A fourth story is another shard, not a new layout.",
    "d": [
      "Ship: code leaves the laptop and becomes a process on a slat.",
      "Serve: a thumb uses the service. The request walks Metal hops to the same pod.",
      "Break: the service errors. Alerts fire. Rollback. An agent reads the boards.",
      "Each frame cites a box on v2, Agents, or Metal. Open in that tab to see the full poster."
    ]
  },
  "ship":   {
    "n": "Ship",
    "p": "story",
    "w": "Code leaves the laptop and changes shape until it is a process on a slat. The artifact is newsfeed-service:v1827. The inbox is PR #4821.",
    "y": "If you cannot name the shape at each hop (commit, review, image, manifest, object, node, pod), the other tabs are disconnected pictures.",
    "d": [
      "Control-plane blue. Nine frames, laptop to CPU slat.",
      "CI never talks to the Kubernetes API. Argo is the only applicator.",
      "The last frame is the same newsfeed-pod Serve and Break will use."
    ],
    "story": "ship"
  },
  "serve":   {
    "n": "Serve",
    "p": "story",
    "w": "A thumb uses the service. The request walks the data plane and the Metal hops to the same pod Ship landed.",
    "y": "Logical diagrams start at the load balancer. Users do not. Serve is the request, not the deploy.",
    "d": [
      "Data-plane green. Seven frames, air to process.",
      "Metro, long-haul, and hotel are one cell. The full 13 hops live on Metal.",
      "Physics numbers (4.9 μs/km, 1–10 ms radio, AZ <2 ms) are Metal's, cited in notes only."
    ],
    "story": "serve"
  },
  "break":   {
    "n": "Break",
    "p": "story",
    "w": "The service errors. Alerts fire. Rollback or snapshot. An agent triages the stigmergic boards.",
    "y": "A blank observability board is not permission to guess. Missing heartbeats are not green. Freeze promotions. Do not invent a story from a dead collector.",
    "d": [
      "Alert red and agent rose. Six frames, error to freeze or repair.",
      "Rollback is a Git revert, synced by Argo. It is not a CI re-run.",
      "Agents read boards. They do not kubectl. Humans own incident command."
    ],
    "story": "break"
  },
  "ship-1":   {
    "n": "Developer commit",
    "p": "ctrl",
    "w": "A product engineer turns a working tree on the laptop into a git commit on app-newsfeed. The change is still only source.",
    "y": "Ship starts when the tree becomes an object Git can name. If the first artifact is an image or a kubectl apply, you skipped the board.",
    "d": [
      "Same laptop toolchain as v2. Local checks already ran.",
      "The author is a control-plane client, not a tunnel into the cluster.",
      "PR #4821 is not open yet. This is the commit that will sit on it."
    ],
    "story": "ship",
    "shape": "git commit",
    "shapeFrom": "working tree",
    "shapeTo": "git commit on app-newsfeed",
    "seeTab": "v2",
    "seeId": "developers",
    "seeHref": "v2.html#developers"
  },
  "ship-2":   {
    "n": "PR #4821",
    "p": "ctrl",
    "w": "The commit becomes a review artifact. PR #4821 is a first-class object on the path, not a courtesy. Opening it starts validation. Nothing is deployed yet.",
    "y": "Branch protection is the contract. The PR is the inbox. Chat is not the system of record. Agents and humans write on the same board.",
    "d": [
      "Required checks: CI, lint, types, unit, SAST/SCA, policy, integration, review.",
      "On Agents this is the PR board, a stigmergic space.",
      "Humans still own merge. Green checks are necessary, not sufficient."
    ],
    "story": "ship",
    "shape": "review artifact",
    "shapeFrom": "commit",
    "shapeTo": "review artifact",
    "seeTab": "v2",
    "seeId": "pr-4821",
    "seeHref": "v2.html#pr-4821"
  },
  "ship-3":   {
    "n": "Checks",
    "p": "ctrl",
    "w": "The PR grows status checks. Compile, lint, unit, security (and the rest of the required set) write traces onto the PR. Fail-closed: a red or skipped required check blocks merge.",
    "y": "If checks live in a private log, agents cannot coordinate and humans will merge on a story. The board is the Git status API.",
    "d": [
      "Same gates as the laptop, now durable on the PR.",
      "On Agents this is the checks board. A red check is a trace the repair agent can read.",
      "CI still has not talked to Kubernetes."
    ],
    "story": "ship",
    "shape": "status checks",
    "shapeFrom": "PR",
    "shapeTo": "status checks (compile, lint, unit, security)",
    "seeTab": "v2",
    "seeId": "ci",
    "seeHref": "v2.html#ci"
  },
  "ship-4":   {
    "n": "Image",
    "p": "ctrl",
    "w": "A green SHA becomes an immutable OCI digest: newsfeed-service:v1827 (sha256:9f3a…c21). SBOM plus cosign. No :latest. No rebuild between environments.",
    "y": "A named digest is the only thing Git, the registry, kubelet, and admission can agree on. Floating tags are how you lose the ability to say what is running.",
    "d": [
      "The concrete artifact this site traces. linux/amd64, 184 MB.",
      "CI writes. Nodes pull. The registry is storage, not a CI plugin.",
      "Admission will refuse an unsigned or off-allow-list image."
    ],
    "story": "ship",
    "shape": "OCI image digest",
    "shapeFrom": "source",
    "shapeTo": "OCI digest newsfeed-service:v1827",
    "seeTab": "v2",
    "seeId": "image-v1827",
    "seeHref": "v2.html#image-v1827"
  },
  "ship-5":   {
    "n": "Manifest bump",
    "p": "ctrl",
    "w": "CI writes the digest into the Deployment in platform-gitops. That write is the deploy. The gitops PR is policy-gated. CI still has not talked to Kubernetes.",
    "y": "This is the move that turns a stored image into an intent. Without it, a green build is a souvenir. A revert of this commit is a rollback.",
    "d": [
      "Desired workload state, not application source.",
      "Promotion is a Git write, not a pipeline step that calls kubectl.",
      "Argo CD watches this repo continuously."
    ],
    "story": "ship",
    "shape": "gitops desired state",
    "shapeFrom": "digest",
    "shapeTo": "gitops desired state in platform-gitops",
    "seeTab": "v2",
    "seeId": "bump",
    "seeHref": "v2.html#bump"
  },
  "ship-6":   {
    "n": "Admission",
    "p": "ctrl",
    "w": "The manifest becomes an admitted Kubernetes object. OPA, Kyverno, and Pod Security Standards sit between Argo and the API server. A bypassed pipeline still cannot land a bad pod.",
    "y": "Shift-left is not a replacement for a gate at the front door. Allow-list means kubelet will not be asked to pull from a random registry.",
    "d": [
      "Evaluated at CI (gate-policy) and again at admit.",
      "A signed, allow-listed digest is the only image that admits.",
      "Denials are telemetry. The platform team pages on a spike."
    ],
    "story": "ship",
    "shape": "admitted Kubernetes object",
    "shapeFrom": "manifest",
    "shapeTo": "admitted Kubernetes object",
    "seeTab": "v2",
    "seeId": "admission",
    "seeHref": "v2.html#admission"
  }
});
