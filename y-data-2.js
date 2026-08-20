window.IDP_DATA = Object.assign(window.IDP_DATA || {}, {
  "ys-redis": {
    "n": "Redis (cache)",
    "p": "data",
    "w": "Scale band for the Redis (cache) hop. Same utility as Plane p-redis.",
    "y": "Styles and Plane agree on the band. Open Plane for when to pick the hop.",
    "d": [
      "Hot keys. Not truth."
    ],
    "reads": "100k–1M simple ops/s per shard. In memory.",
    "writes": "Same. Writes are in memory too. Persistence is the other conversation.",
    "scaleNote": "Hot keys. Not truth.",
    "scale": "Hot keys. Not truth.",
    "plane": [
      {
        "n": "Redis",
        "href": "plane.html#p-redis"
      }
    ],
    "seeTab": "plane",
    "seeId": "p-redis",
    "seeHref": "plane.html#p-redis"
  },
  "ys-kafka": {
    "n": "Kafka (queue / log)",
    "p": "data",
    "w": "Scale band for the Kafka (queue / log) hop. Same utility as Plane p-kafka.",
    "y": "Styles and Plane agree on the band. Open Plane for when to pick the hop.",
    "d": [
      "A log, not RPC. Partition count is the scale knob."
    ],
    "reads": "Consume N× produce. 10k–100k msgs/s per partition typical.",
    "writes": "Produce 10k–100k msgs/s per partition, 10–50 MB/s per partition typical. Cluster 100k–1M+ msgs/s.",
    "scaleNote": "A log, not RPC. Partition count is the scale knob.",
    "scale": "A log, not RPC. Partition count is the scale knob.",
    "plane": [
      {
        "n": "Kafka",
        "href": "plane.html#p-kafka"
      }
    ],
    "seeTab": "plane",
    "seeId": "p-kafka",
    "seeHref": "plane.html#p-kafka"
  },
  "ys-obj": {
    "n": "Object store",
    "p": "data",
    "w": "Scale band for the Object store hop. Same utility as Plane p-obj.",
    "y": "Styles and Plane agree on the band. Open Plane for when to pick the hop.",
    "d": [
      "Write once, read many."
    ],
    "reads": "Often a CDN. Millions of GETs at the edge.",
    "writes": "PUTs 1k–10k/s per prefix typical.",
    "scaleNote": "Write once, read many.",
    "scale": "Write once, read many.",
    "plane": [
      {
        "n": "Object store",
        "href": "plane.html#p-obj"
      }
    ],
    "seeTab": "plane",
    "seeId": "p-obj",
    "seeHref": "plane.html#p-obj"
  },
  "ys-sql": {
    "n": "Postgres",
    "p": "data",
    "w": "Scale band for the Postgres hop. Same utility as Plane p-sql.",
    "y": "Styles and Plane agree on the band. Open Plane for when to pick the hop.",
    "d": [
      "Transactions. Not a cache. Schema is its own path."
    ],
    "reads": "~10–50k simple reads/s on a primary before replicas. Replicas scale reads only.",
    "writes": "~5–15k simple writes/s on one primary typical.",
    "scaleNote": "Transactions. Not a cache. Schema is its own path.",
    "scale": "Transactions. Not a cache. Schema is its own path.",
    "plane": [
      {
        "n": "Postgres",
        "href": "plane.html#p-sql"
      }
    ],
    "seeTab": "plane",
    "seeId": "p-sql",
    "seeHref": "plane.html#p-sql"
  },
  "ys-search": {
    "n": "Search index",
    "p": "data",
    "w": "Scale band for the Search index hop. Same utility as Plane p-search.",
    "y": "Styles and Plane agree on the band. Open Plane for when to pick the hop.",
    "d": [
      "Derived. Fed from Kafka. Rebuild is allowed."
    ],
    "reads": "1k–10k queries/s per node typical.",
    "writes": "Bulk index 10k–50k docs/s per node typical.",
    "scaleNote": "Derived. Fed from Kafka. Rebuild is allowed.",
    "scale": "Derived. Fed from Kafka. Rebuild is allowed.",
    "plane": [
      {
        "n": "Search index",
        "href": "plane.html#p-search"
      }
    ],
    "seeTab": "plane",
    "seeId": "p-search",
    "seeHref": "plane.html#p-search"
  },
  "ys-hpa": {
    "n": "Horizontal pod autoscaler",
    "p": "ctrl",
    "w": "Scale band for the Horizontal pod autoscaler hop. Same utility as Plane p-hpa.",
    "y": "Styles and Plane agree on the band. Open Plane for when to pick the hop.",
    "d": [
      "Four is a floor. Node count is CA."
    ],
    "reads": "Not a QPS device. Adds pods when RPS or CPU says so.",
    "writes": "Writes replica counts, not user bytes.",
    "scaleNote": "Four is a floor. Node count is CA.",
    "scale": "Four is a floor. Node count is CA.",
    "plane": [
      {
        "n": "Horizontal pod autoscaler",
        "href": "plane.html#p-hpa"
      }
    ],
    "seeTab": "plane",
    "seeId": "p-hpa",
    "seeHref": "plane.html#p-hpa"
  },
  "ys-ca": {
    "n": "Cluster autoscaler",
    "p": "ctrl",
    "w": "Scale band for the Cluster autoscaler hop. Same utility as Plane p-ca.",
    "y": "Styles and Plane agree on the band. Open Plane for when to pick the hop.",
    "d": [
      "Inside the Terraform max. Not a request hop."
    ],
    "reads": "Not on the request path. Adds nodes on a minutes-scale.",
    "writes": "Cloud API calls to mint or drain VMs.",
    "scaleNote": "Inside the Terraform max. Not a request hop.",
    "scale": "Inside the Terraform max. Not a request hop.",
    "plane": [
      {
        "n": "Cluster autoscaler",
        "href": "plane.html#p-ca"
      }
    ],
    "seeTab": "plane",
    "seeId": "p-ca",
    "seeHref": "plane.html#p-ca"
  },
  "ys-nvlink": {
    "n": "NVLink / GPU fabric",
    "p": "metal",
    "w": "Scale band for the NVLink / GPU fabric hop. Same utility as Plane p-nvlink.",
    "y": "Styles and Plane agree on the band. Open Plane for when to pick the hop.",
    "d": [
      "Inside the tray. The newsfeed worker is CPU."
    ],
    "reads": "GPU to GPU. Hundreds of GB/s. Not HTTP.",
    "writes": "Same fabric. AllReduce, not a POST.",
    "scaleNote": "Inside the tray. The newsfeed worker is CPU.",
    "scale": "Inside the tray. The newsfeed worker is CPU.",
    "plane": [
      {
        "n": "NVLink / GPU fabric",
        "href": "plane.html#p-nvlink"
      }
    ],
    "seeTab": "plane",
    "seeId": "p-nvlink",
    "seeHref": "plane.html#p-nvlink"
  },
  "ys-otel": {
    "n": "OpenTelemetry",
    "p": "obs",
    "w": "Scale band for the OpenTelemetry hop. Same utility as Plane p-otel.",
    "y": "Styles and Plane agree on the band. Open Plane for when to pick the hop.",
    "d": [
      "A dead collector is a blank board."
    ],
    "reads": "10k–100k spans/s per collector typical.",
    "writes": "Export is the write. 1–5% app overhead.",
    "scaleNote": "A dead collector is a blank board.",
    "scale": "A dead collector is a blank board.",
    "plane": [
      {
        "n": "OpenTelemetry",
        "href": "plane.html#p-otel"
      }
    ],
    "seeTab": "plane",
    "seeId": "p-otel",
    "seeHref": "plane.html#p-otel"
  }
});
