window.IDP_DATA = Object.assign(window.IDP_DATA || {}, {
  "overview": {
    "n": "How to read this map (styles)",
    "p": "step",
    "w": "Styles are how you wire the hop. Plane is the BOM. Numbers here are typical order-of-magnitude bands operators use when choosing, not Jacob's prod metrics and not world records.",
    "y": "newsfeed-service:v1827 and PR #4821 are the through-line. Five repos: app-newsfeed, app-users, platform-gitops, infra-terraform, ci-pipelines.",
    "d": [
      "Eight styles: monolith, layered, microservices, event-driven, CQRS, pipe-and-filter, serverless, microkernel.",
      "Scale chips reuse the Plane utilities. Tap one for reads and writes, then open Plane for the BOM.",
      "A style is a wiring. A utility is a hop. Do not treat this tab as a second Plane."
    ],
    "scale": "Bands, not a capacity plan. Start here, then tap a card.",
    "reads": "What the style or hop typically serves.",
    "writes": "What it typically accepts. Same honesty as reads."
  },
  "st-mono": {
    "n": "Modular monolith",
    "p": "data",
    "w": "One deployable. Modules for feed, graph, and ranking live in one process.",
    "y": "One transaction, one deploy, one on-call. Default for a single product until team or scale forces a cut.",
    "d": [
      "One repo can still be app-newsfeed.",
      "Cache in front of the primary. Do not pretend the modules are a mesh.",
      "Cut when a team or a write budget says so, not for fashion."
    ],
    "example": "newsfeed as one deployable with modules (feed, graph, ranking). One repo can still be app-newsfeed.",
    "whyPick": "One transaction, one deploy, one on-call. Stay here until a team or a scale number forces a cut.",
    "scale": "1–3 teams. Reads 1k–20k/s (cache in front). Writes 100–2k/s to one primary.",
    "reads": "1k–20k/s with a cache in front.",
    "writes": "100–2k/s to one primary.",
    "plane": [
      {
        "n": "Postgres",
        "href": "plane.html#p-sql"
      },
      {
        "n": "Redis",
        "href": "plane.html#p-redis"
      },
      {
        "n": "L7 ingress",
        "href": "plane.html#p-ingress"
      }
    ]
  },
  "st-layer": {
    "n": "Layered / n-tier",
    "p": "data",
    "w": "GET /feed = ingress → newsfeed-service → Redis → Postgres. Classic Serve path.",
    "y": "Everyone can draw it. Cache sits on the read path. Writes stay on the primary.",
    "d": [
      "The hop order is the architecture.",
      "Redis makes the read path possible. Postgres stays truth.",
      "Cite Scenarios Serve: the packet becomes an in-cluster request at ingress."
    ],
    "example": "GET /feed walks ingress, newsfeed-service, Redis, then Postgres. That is Serve.",
    "whyPick": "The path is obvious. Cache on reads. Writes stay on the primary.",
    "scale": "Reads 100–10k/s (10k–100k with Redis). Writes 50–1k/s.",
    "reads": "100–10k/s. 10k–100k/s with Redis in front.",
    "writes": "50–1k/s to the primary.",
    "plane": [
      {
        "n": "L7 ingress",
        "href": "plane.html#p-ingress"
      },
      {
        "n": "Redis",
        "href": "plane.html#p-redis"
      },
      {
        "n": "Postgres",
        "href": "plane.html#p-sql"
      }
    ],
    "seeTab": "scenarios",
    "seeId": "serve-6",
    "seeHref": "scenarios.html#serve-6"
  },
  "st-micro": {
    "n": "Microservices",
    "p": "data",
    "w": "newsfeed-service:v1827, users, ranking. Five repos. Independent deploy of PR #4821.",
    "y": "Team ownership and different scale per hop. Cost is the fan-out and the contract.",
    "d": [
      "Five repos: app-newsfeed, app-users, platform-gitops, infra-terraform, ci-pipelines.",
      "PR #4821 ships one service. The others stay put.",
      "A Service, a mesh, and DNS are the hops. Not a second monolith."
    ],
    "example": "newsfeed-service:v1827, users, ranking. Five repos. PR #4821 ships one service.",
    "whyPick": "Team ownership. Each hop scales on its own. You pay in fan-out and contracts.",
    "scale": "5–50 services. Per service 1k–50k RPS. Writes stay in that service's store.",
    "reads": "1k–50k RPS per service.",
    "writes": "Stay in that service's store.",
    "plane": [
      {
        "n": "Service",
        "href": "plane.html#p-svc"
      },
      {
        "n": "Mesh",
        "href": "plane.html#p-mesh"
      },
      {
        "n": "Cluster DNS",
        "href": "plane.html#p-dns"
      }
    ]
  },
  "st-event": {
    "n": "Event-driven / broker",
    "p": "data",
    "w": "Post created → Kafka → ranking, notify, search index. The writer does not wait.",
    "y": "Time and fan-out. Many readers, one write.",
    "d": [
      "A log, not RPC. Offsets and consumer groups are the contract.",
      "The post row is written first. Kafka is the fan-out.",
      "Cite Plane Kafka and v2 kafka."
    ],
    "example": "A post write lands on Kafka. Ranking, notify, and the search index consume. The writer does not wait.",
    "whyPick": "Time and fan-out. Many readers, one write.",
    "scale": "Produce 1k–100k events/s. Consume N×. Kafka ~10k–100k msgs/s per partition, 10–50 MB/s per partition typical.",
    "reads": "Consume N× the produce rate.",
    "writes": "Produce 1k–100k events/s. ~10k–100k msgs/s per partition typical.",
    "plane": [
      {
        "n": "Kafka",
        "href": "plane.html#p-kafka"
      }
    ],
    "seeTab": "v2",
    "seeId": "kafka",
    "seeHref": "v2.html#kafka"
  },
  "st-cqrs": {
    "n": "CQRS",
    "p": "data",
    "w": "Write a post to Postgres. Read the feed from Redis or a materialized view. Feed reads crush writes (~100:1).",
    "y": "Do not make the write model serve the hot read.",
    "d": [
      "Write model is commands. Read model is the feed.",
      "Search is another read model, fed from Kafka.",
      "The ratio is the reason. ~100:1 is the usual newsfeed shape."
    ],
    "example": "Write a post to Postgres. Read the feed from a Redis / materialized view.",
    "whyPick": "Feed reads crush writes (~100:1). Do not make the write model serve the hot read.",
    "scale": "Writes 100–5k commands/s. Reads 10k–500k/s off the read model.",
    "reads": "10k–500k/s off the read model.",
    "writes": "100–5k commands/s to the write model.",
    "plane": [
      {
        "n": "Postgres",
        "href": "plane.html#p-sql"
      },
      {
        "n": "Redis",
        "href": "plane.html#p-redis"
      },
      {
        "n": "Search",
        "href": "plane.html#p-search"
      }
    ]
  },
  "st-pipe": {
    "n": "Pipe-and-filter",
    "p": "data",
    "w": "Ingest → enrich → rank → cache-warm for the feed. Stream or nightly batch.",
    "y": "Each stage scales and replaces independently.",
    "d": [
      "A stage is a consumer. The contract is the message.",
      "Stream by day or batch by night. Same shape.",
      "Object store holds the heavy intermediates."
    ],
    "example": "Ingest, enrich, rank, then cache-warm the feed. Stream by day or batch by night.",
    "whyPick": "Each stage scales and replaces on its own.",
    "scale": "Stream 10k–100k msgs/s, or TB/night batch.",
    "reads": "Downstream stages read the stream. Cache-warm is a read into Redis.",
    "writes": "Stream 10k–100k msgs/s, or a TB/night batch.",
    "plane": [
      {
        "n": "Kafka",
        "href": "plane.html#p-kafka"
      },
      {
        "n": "Object store",
        "href": "plane.html#p-obj"
      }
    ]
  }
});
