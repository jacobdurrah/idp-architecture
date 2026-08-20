window.IDP_DATA = Object.assign(window.IDP_DATA || {}, {
  "p-search": {
    "n": "Search index",
    "p": "data",
    "w": "Index of posts and people. Fed asynchronously from Kafka, not from the request path that renders a feed. Query path comes from news feed or a dedicated search API.",
    "y": "Search is a derived view. Building it on the write path of a post is how you miss SLOs. Feeding it from the log keeps the system of record thin and lets you rebuild the index.",
    "d": [
      "Triggered by indexers consuming Kafka. Stores search documents.",
      "Not the source of posts. Rebuild is allowed and expected.",
      "Managed service, provisioned by Terraform.",
      "A search outage degrades find. It does not blank the feed."
    ],
    "useWhen": "A derived index of posts and people, fed from Kafka.",
    "useNot": "The source of posts. Do not write the index on the post request path.",
    "look": "A search cluster. Query from newsfeed or a search API. Indexers sit on the log.",
    "seeTab": "v2",
    "seeId": "search",
    "seeHref": "v2.html#search"
  },
  "p-hpa": {
    "n": "Horizontal pod autoscaler",
    "p": "ctrl",
    "w": "Pod replica loop. HPA reads metrics (CPU, RPS, custom) and writes replica counts onto Deployments. It is a Kubernetes object, desired in Git, acting continuously. News feed is the example: four replicas is a floor, not a personality.",
    "y": "Humans guessing replica counts will be wrong twice a day. HPA turns SLIs into the only guess that matters. It also makes a bad deploy visible: replicas climb while error rate climbs.",
    "d": [
      "Triggered by metrics APIs, continuously. Not a Terraform apply.",
      "Same Prometheus the dashboards and the canary use.",
      "When observability is dark, do not treat missing metrics as all quiet and scale to one.",
      "Node count is the cluster autoscaler. HPA does not mint VMs."
    ],
    "useWhen": "Replica count should follow SLIs (CPU, RPS, custom) for newsfeed-service:v1827.",
    "useNot": "Node count (that is CA). Not a Terraform apply. Not a missing-metrics scale-to-one.",
    "look": "An HPA object on the News Feed Deployment. Four is a floor.",
    "seeTab": "v2",
    "seeId": "hpa",
    "seeHref": "v2.html#hpa"
  },
  "p-ca": {
    "n": "Cluster autoscaler",
    "p": "ctrl",
    "w": "Node loop. If pods are unschedulable, CA adds nodes. If traffic falls and HPA removes pods, CA drains idle nodes. Same telemetry plane as HPA. The rare moment control plane touches plane B without a Terraform run is CA calling the cloud API to mint or retire a VM.",
    "y": "A fixed node pool is either waste or a pending incident. CA makes the node group elastic within the bounds Terraform already created. Bigger bounds are a plane-B change.",
    "d": [
      "Triggered by unschedulable pods and underused nodes.",
      "Max size is desired infra, owned by Terraform. Drains respect PDBs.",
      "When observability is dark, do not treat silence as permission to drain.",
      "GPU node groups are a different pool. The newsfeed worker is CPU."
    ],
    "useWhen": "Unschedulable pods need nodes, or idle nodes should drain, inside the Terraform max.",
    "useNot": "Bigger instance types or a new GPU pool. That is Terraform. Do not drain on a dark board.",
    "look": "A controller calling the cloud API to mint or retire VMs inside the Terraform max.",
    "seeTab": "v2",
    "seeId": "ca",
    "seeHref": "v2.html#ca"
  },
  "p-nvlink": {
    "n": "NVLink / GPU fabric",
    "p": "metal",
    "w": "Inside the tray, GPU to GPU. Hundreds of nanoseconds at about 900 GB/s. This is not Ethernet and it is not a CNI plugin. IB or RoCE is the hop between trays. The newsfeed worker does not live here.",
    "y": "If the train is waiting on AllReduce, this hop and the IB hop next to it are the floor. Citing Metal keeps Plane honest: the request path BOM and the train path BOM are different racks.",
    "d": [
      "NVLink is inside the tray. IB or RoCE is between trays.",
      "You cannot peer this with a ToR and a hope.",
      "Cite Metal e-nvlink and rack-gpu. Liquid tray, H100-class, quick-disconnects.",
      "newsfeed-service:v1827 is a CPU slat in the general row. Do not schedule it here."
    ],
    "useWhen": "GPU to GPU AllReduce inside the tray. Train and heavy infer.",
    "useNot": "The newsfeed worker. newsfeed-service:v1827 lives on a CPU slat.",
    "look": "NVLink bridges between H100-class GPUs on a liquid tray. Not a 400G QSFP.",
    "seeTab": "metal",
    "seeId": "e-nvlink",
    "seeHref": "metal.html#e-nvlink"
  },
  "p-otel": {
    "n": "OpenTelemetry on the request",
    "p": "obs",
    "w": "Every hop on this poster should emit. The process SDK plus a node agent. One vendor-neutral API. Traces, metrics, and logs on the same request that hit newsfeed-service:v1827. The collector fans out. This is not a CI step.",
    "y": "If each utility invents a dialect, you cannot ask a path-wide question. OTel is the contract: apps speak one API, the collector decides where bytes go. Agents that improve code later will read those joins. Cite Agents otel-sdk.",
    "d": [
      "In-process plus node daemon. Both are required. Shipped in the golden template.",
      "Context propagation is how a user request becomes one trace across ingress, service, Redis, SQL.",
      "A dead collector is a blank board. Do not invent a story. Freeze promotions.",
      "Same Prometheus the HPA and the canary consume."
    ],
    "useWhen": "The request must emit traces, metrics, and logs through one API.",
    "useNot": "A second agent stack per pod. Not a CI step. Not a story invented from a dead collector.",
    "look": "SDK in the process plus a node agent. Collector fans out. Same path the canary reads.",
    "seeTab": "agents",
    "seeId": "otel-sdk",
    "seeHref": "agents.html#otel-sdk"
  }
});
