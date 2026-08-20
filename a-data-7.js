window.IDP_DATA = Object.assign(window.IDP_DATA || {}, {
  "alerts": {
    "n": "Alerts and SLOs",
    "p": "alert",
    "w": "Burn-rate, canary, image-pull, admit. Pages are traces. The SRE agent reads them. It may open a rollback PR or a fix PR. It does not mute pages without a runbook step. Silence is not a canary pass.",
    "y": "An SLO that does not page is a slide. A page that does not write a ticket is a shout. The board is the alert, the ticket, and the runbook. Agents are allowed to act only through those traces.",
    "d": [
      "Burn-rate alerts over threshold-crossing noise.",
      "Canary fail pages the same as a burn.",
      "Mute requires a runbook step and an expiry.",
      "If the alert pipeline is dark, that is the outage band."
    ],
    "triggers": "SLI burn, canary fail, image-pull or admit spike, missing heartbeat.",
    "stores": "Alert state, silences (owned), SLO counters.",
    "talksTo": "On-call, the SRE agent, incident tickets, the obs-guard."
  },
  "obs-board": {
    "n": "Dashboards, alerts, budgets, tickets",
    "p": "stig",
    "w": "Dashboards, alerts, error budgets, incident tickets, and runbooks are the observability stigmergic space. Telemetry writes the next change. Engineers and agents read this board and open a PR. They do not log into nodes. They do not hold a private war room that replaces the ticket.",
    "y": "This is the top of the loop. A coding agent that never reads production traces will keep shipping the same bug. An SRE agent that never writes a PR will only make noise. When this board goes blank, see the outage band. A blank board is not permission to guess.",
    "d": [
      "The dotted rose and purple rail back to the coding agent and the PR is this write.",
      "Error-budget burn is a trace the next change should respect.",
      "Runbooks are boards. An agent may follow a step. It may not invent one.",
      "If 12 is dark, stop. Resume only when heartbeats return."
    ],
    "triggers": "Continuous emit, a page, a burn, a canary verdict.",
    "stores": "Dashboards, alert state, SLO counters, tickets, runbooks.",
    "talksTo": "The SRE agent, engineers, the coding agent (through the next PR), the obs-guard."
  },
  "sre-agent": {
    "n": "SRE, incident agent",
    "p": "agent",
    "w": "The SRE or incident agent reads pages, traces, and error-budget burn. It may open a rollback PR or a fix PR. It does not mute pages without a runbook step. It does not kubectl. It does not invent a story from a dead collector.",
    "y": "Incidents that live only in a bridge call never become the next change. An agent that writes a rollback PR and a ticket is how the loop closes. Humans still own incident command. The agent is a fast colleague with a board, not a commander.",
    "d": [
      "Reads: pages, traces, error budgets, runbooks, the canary board.",
      "Writes: a rollback or fix PR, a ticket, a comment on the board.",
      "Never: mute without a runbook step, kubectl, a chat-only fix.",
      "If observability is dark, it defers to the obs-guard and pages humans."
    ],
    "triggers": "A page, a burn-rate alert, a canary fail, or a ticket.",
    "stores": "Nothing of its own. Tickets, PRs, and runbooks are the memory.",
    "talksTo": "Alerts, the obs board, Git, engineers, the obs-guard."
  },
  "engineers": {
    "n": "Engineers and agents",
    "p": "ppl",
    "w": "Pages, canaries, capacity, rollback PRs in platform-gitops. Humans and agents share the same boards. Feedback writes the next change. They do not log into nodes. They do not replace a ticket with a huddle that leaves no trace.",
    "y": "The loop is the point of this poster. Telemetry that does not change Git is a museum. Agents that do not write Git are a demo. Humans still own merge and incident command. That is not optional.",
    "d": [
      "Same dashboards, same tickets, same PRs.",
      "A hallway decision is rewritten onto the board or it did not happen.",
      "Capacity that is still not enough becomes a plane-B Terraform change.",
      "When the board is dark, they take the freeze the obs-guard writes."
    ],
    "triggers": "A page, a burn, a canary, a planning cycle.",
    "stores": "Tickets, PRs, runbook updates.",
    "talksTo": "Grafana, alerts, Git, agents (through boards, not as a private bus)."
  },
  "outage-board": {
    "n": "When observability is dark",
    "p": "alert",
    "w": "Heartbeats missing is not all green. Silence is not a canary pass. The missing trace IS the signal, if and only if a heartbeat was expected. Agents must not invent a story from a dead collector. This band is as important as the happy path.",
    "y": "A blank board is not permission to guess. Autonomous improve-the-code loops that keep running on empty dashboards will optimize you into an outage. The outage board is the freeze. It is loud on purpose.",
    "d": [
      "Do not promote. Freeze the GitOps bump and the canary.",
      "Do not let coding or repair agents treat missing metrics as healthy.",
      "Page humans. Prefer last-known-good and synthetic probes.",
      "Resume autonomous improve-the-code loops only when heartbeats return."
    ],
    "triggers": "Missing collector heartbeat, empty scrape, silent alert pipeline, synthetic probe fail.",
    "stores": "Heartbeat state, last-known-good snapshots, freeze records, incident tickets.",
    "talksTo": "The obs-guard, on-call humans, canary, GitOps, every other agent (as a stop sign)."
  },
  "obs-guard": {
    "n": "Observability-guard agent",
    "p": "agent",
    "w": "The observability-guard agent freezes promotions. It does not let coding or repair agents optimize from empty dashboards. It pages humans. It prefers last-known-good and synthetic probes. It does not invent a story from a dead collector. Resume autonomous improve-the-code loops only when heartbeats return.",
    "y": "Every other agent on this poster assumes the board is populated. This agent exists because that assumption fails. The missing trace is the signal, if and only if a heartbeat was expected. Without a guard, stigmergy becomes theater: agents coordinating on a board that is no longer there.",
    "d": [
      "Do not promote. Do not let other agents treat missing metrics as healthy.",
      "Page humans. Prefer last-known-good and synthetic probes.",
      "Never: infer health from silence, unmute a dark pipeline, let a canary pass on empty series.",
      "The freeze is a write on this board. Other agents read it. They do not argue in chat."
    ],
    "triggers": "A missing expected heartbeat, a dead collector, a silent alert path, a synthetic probe fail.",
    "stores": "Freeze state, last-known-good pointers, probe results.",
    "talksTo": "Every agent on this poster (as a stop), on-call humans, the outage board."
  },
  "step1": {
    "n": "1. Local agent and commit",
    "p": "step",
    "w": "The developer and the coding agent work on the laptop. Local lint, types, and unit tests write the first traces. They commit newsfeed-service and push. No kubectl to production. The local board is the first stigmergic space.",
    "y": "If step 1 skips the local board, CI becomes the first teacher and reviewers become formatters. The agent belongs here, on the same path as the human.",
    "d": [
      "Allowed: branch, commit, push, PR.",
      "Forbidden: cluster apply from the laptop.",
      "The coding agent is a colleague, not a deployer.",
      "Badge 1 sits on the commit arrow."
    ],
    "triggers": "The engineer or the coding agent.",
    "stores": "The working tree and the feature branch.",
    "talksTo": "Git, the local board."
  }
});
