window.IDP_DATA = Object.assign(window.IDP_DATA || {}, {
  "gate-deps": {
    "n": "Dependency scan",
    "p": "ctrl",
    "w": "SCA runs as a required status. Known CVEs in the lockfile block merge when policy says they must. The supply agent later reads the same class of finding on the registry scan board and may open an upgrade PR.",
    "y": "A green compile of a vulnerable lockfile is not done. Dependency policy has to be a board, or every team will negotiate in chat. Agents are good at opening upgrade PRs. They are bad at silently pinning a waiver.",
    "d": [
      "Required, fail-closed, policy-driven.",
      "Waivers have owners and expiry.",
      "The same signal reappears at scan-on-push.",
      "An upgrade PR is a new stigmergic write, not a hotfix on main."
    ],
    "triggers": "The pull request, and later a registry scan.",
    "stores": "Check statuses, lockfile, waiver records.",
    "talksTo": "The Git status API and the supply agent (through the scan board)."
  },
  "gate-policy": {
    "n": "Policy checks",
    "p": "ctrl",
    "w": "Policy-as-code runs as a required status: resource limits, no privileged, provenance expectations, repo conventions. CI already asked. Admission will ask again. The status is a trace. The GitOps agent will later read a deny at admit as a different trace.",
    "y": "Shift-left is not a replacement for a gate at the front door. It is how authors (and agents) fail cheaply. A policy that only exists at admit trains people to ignore CI.",
    "d": [
      "Required, fail-closed.",
      "Policy lives in Git, referenced from ci-pipelines.",
      "A skipped policy job is a failed check.",
      "The same rules are evaluated again at admission."
    ],
    "triggers": "The pull request.",
    "stores": "Check statuses and policy decision logs.",
    "talksTo": "The Git status API and, later, the admission chain."
  },
  "checks-board": {
    "n": "Status checks, stigmergic space",
    "p": "stig",
    "w": "The required statuses on the PR are a stigmergic board. A red check is a trace the repair agent can read. A green check is a trace merge queue can read. Nobody needs to ask the author what happened. The environment holds it.",
    "y": "If checks live in a private log and a Slack paste, agents cannot coordinate and humans will merge on a story. The board has to be the Git status API, fail-closed, with artifacts linked.",
    "d": [
      "A skipped required check is a red check.",
      "The repair agent reads the red status and the artifact. It does not DM the author.",
      "Humans still own merge. Green checks are necessary, not sufficient.",
      "This board is the CI view of the PR board."
    ],
    "triggers": "Every required job on the PR.",
    "stores": "Git check statuses and links to logs.",
    "talksTo": "Merge queue, the review agent, the repair agent, branch protection."
  },
  "coordinator": {
    "n": "Test coordinator",
    "p": "ctrl",
    "w": "The coordinator shards the five suites (newsfeed-it, users-it, contract, e2e-feed, policy-it), assigns work to the queue, and enforces timeouts and retries. It is a scheduler, not a shared staging cluster. Results post back to the PR.",
    "y": "Naming the suites is how you stop saying tests and meaning nothing. A coordinator makes shard failures a readable trace. The repair agent needs that trace. A single tests-failed bit is not enough.",
    "d": [
      "Shards by suite and by file or test name.",
      "Timeouts and retries are policy, not folklore.",
      "Ephemeral per-job environments. No shared staging snowflake.",
      "Merge queue only pops green."
    ],
    "triggers": "CI, as a required gate on the PR.",
    "stores": "Shard plan, timeouts, retry counts.",
    "talksTo": "The job queue and the results inbox on the PR."
  },
  "queue": {
    "n": "Job queue",
    "p": "ctrl",
    "w": "Workers pull from a visible backlog. The queue is the board between the coordinator and the ephemeral workers. Depth, age, and retries are traces. An agent does not need to SSH to a runner to know the suite is stuck.",
    "y": "A hidden backlog is how integration tests become a mystery. Making the queue visible is how you scale to thousands of workers without inventing a side channel.",
    "d": [
      "Workers pull. The coordinator does not push secrets to a random VM.",
      "Visible depth is a capacity signal.",
      "Poison messages are a flake board item, not a silent drop.",
      "The repair agent can see which shard never started."
    ],
    "triggers": "The coordinator enqueueing shards.",
    "stores": "Job payloads, lease state, retry counts.",
    "talksTo": "Ephemeral workers and the coordinator."
  },
  "workers": {
    "n": "Ephemeral workers x1000s",
    "p": "data",
    "w": "Workers pull a shard, boot an ephemeral environment (per-job namespace, compose stack, or preview cluster), run the suite, and tear the environment down. Suites in flight: newsfeed-it, users-it, contract, e2e-feed, policy-it. They are data-plane compute, not a standing stage.",
    "y": "Shared staging is how tests lie. Ephemeral per-job environments keep isolation honest. They also produce artifacts the repair agent can read: logs, junit, traces from the job itself.",
    "d": [
      "Scale out is a queue depth problem, not a ticket.",
      "Each job gets a fresh environment and destroys it.",
      "Workers do not hold production credentials.",
      "Suite names stay on the poster so tests cannot mean nothing."
    ],
    "triggers": "A leased job from the queue.",
    "stores": "Nothing durable except the artifact they upload.",
    "talksTo": "The queue, ephemeral test environments, and the results inbox."
  },
  "results": {
    "n": "Results, back to the PR",
    "p": "ctrl",
    "w": "Status and comments post to PR #4821. Required checks block merge. Artifacts are retained. This is the write that turns a thousand worker shards into one board the repair agent and the humans can read.",
    "y": "A result that only lives in a CI UI tab is a private conversation. The PR is the inbox. Agents coordinate here. Merge queue reads here.",
    "d": [
      "Required checks block merge.",
      "Comments name the failing shard, not just tests failed.",
      "Artifacts are linked from the check.",
      "The same write is what the repair agent consumes."
    ],
    "triggers": "Worker completion or timeout.",
    "stores": "Check statuses, comments, retained artifacts.",
    "talksTo": "The PR board and the artifacts board."
  },
  "artifacts-board": {
    "n": "Test artifacts, flake board",
    "p": "stig",
    "w": "Logs, junit, shard traces, and flake records are a stigmergic board. The repair agent reads shard failures and artifacts, then opens a follow-up commit on the same PR. A flake is written here. It is not a hallway story.",
    "y": "Without retained artifacts, a red check is a rumor. Agents cannot repair what they cannot see. Humans cannot either. Retention is part of the contract, not a nice-to-have.",
    "d": [
      "Linked from the required check, not buried in a private bucket.",
      "Flake policy lives here: quarantine, owner, expiry.",
      "The repair agent writes a commit, not a Slack guess.",
      "This board feeds the PR board. It does not replace it."
    ],
    "triggers": "A finished or timed-out shard.",
    "stores": "Logs, reports, traces, flake records.",
    "talksTo": "The repair agent, the results inbox, and humans on the PR."
  }
});
