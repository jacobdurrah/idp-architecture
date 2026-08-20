window.IDP_DATA = Object.assign(window.IDP_DATA || {}, {
  "svc-post": {
    "n": "Post service",
    "p": "data",
    "w": "Create and read posts. News feed and authoring clients call it. Post records live in Cloud SQL. Fan-out hints go on the queue so notifications and indexers do not sit on the write path.",
    "y": "Posts are the nouns the feed assembles. Owning them in one service keeps the schema and the write path reviewable. The feed should not have a private table of posts.",
    "d": [
      "×3 typical.",
      "Talks to SQL, Kafka, and News Feed.",
      "Writes are the source of later fan-out.",
      "Same golden path as every other app repo."
    ],
    "triggers": "News Feed and authoring clients.",
    "stores": "Post records in Cloud SQL. Fan-out hints on Kafka.",
    "talksTo": "Cloud SQL, Kafka, News Feed."
  },
  "svc-ranking": {
    "n": "Ranking service",
    "p": "data",
    "w": "Rank and candidate generation for the feed. News feed calls it on request paths that need ranking. It stores model features and candidate caches, not the source of posts.",
    "y": "Ranking is expensive and special, which is why it is not inlined into the feed. Isolating it lets you scale and fail it independently. A ranking outage should degrade, not blank the product.",
    "d": [
      "×3 typical.",
      "Talks to News Feed, Redis, and feature stores behind the poster.",
      "Cache misses are expected. DB as a ranking backend is not.",
      "Same image-and-GitOps rules. Models are versioned artifacts too."
    ],
    "triggers": "News Feed, on paths that need ranking.",
    "stores": "Model features and candidate caches.",
    "talksTo": "News Feed, Redis, feature stores."
  },
  "svc-media": {
    "n": "Media service",
    "p": "data",
    "w": "Images and video metadata. Bytes live in object storage. This service is the index and the authorization gate. News feed and authoring clients call it.",
    "y": "Putting bytes in pods is how you lose them. Media as a service plus a bucket is the boring design that survives a replica restart. The CDN often fetches the object directly after this service signs the URL.",
    "d": [
      "×2 typical.",
      "Metadata in its DB. Objects in the bucket.",
      "Talks to object storage and News Feed.",
      "Authorization stays here. The bucket is not public-by-default."
    ],
    "triggers": "News Feed and authoring clients.",
    "stores": "Metadata in its DB. Objects in the bucket.",
    "talksTo": "Object storage, News Feed."
  },
  "svc-notify": {
    "n": "Notifications service",
    "p": "data",
    "w": "Fan-out, push, and email. Domain events on Kafka trigger it. Delivery state and preferences are its store. It talks to external push and email providers and back to User service.",
    "y": "Synchronous notification on the feed path is how you miss SLOs. An async service lets the feed return and lets retries live where they belong. It is also a blast radius you can page independently.",
    "d": [
      "×2 typical.",
      "Triggered by the queue, not by the user request that created the post.",
      "Talks to Kafka, User service, and external providers.",
      "Same golden path. Credentials for providers are not in the image."
    ],
    "triggers": "Domain events on Kafka.",
    "stores": "Delivery state and preferences.",
    "talksTo": "Kafka, external push / email, User service."
  },
  "autoscaling": {
    "n": "Autoscaling",
    "p": "ctrl",
    "w": "Traffic up, CPU / RPS up, HPA adds replicas. If nodes are packed, cluster autoscaler adds nodes. Traffic down, HPA removes pods, CA drains nodes. Signals come from the same Prometheus metrics the dashboards use, not from CI. Scale-out is not a Terraform apply and not a CI job.",
    "y": "A platform that scales by ticket will be over-provisioned and still page. Closing the loop from SLIs to replicas and nodes is what makes the data plane elastic. The same Prometheus metrics serve dashboards and these controllers.",
    "d": [
      "HPA is the pod loop. CA is the node loop.",
      "Always on, in-cluster.",
      "CI does not scale production.",
      "Capacity that still is not enough becomes a plane-B Terraform change."
    ],
    "triggers": "SLIs: RPS, latency, error rate, saturation, custom metrics.",
    "stores": "Replica and node counts, as live API objects.",
    "talksTo": "Observability backends, API server, cloud provider (for nodes)."
  },
  "hpa": {
    "n": "Horizontal pod autoscaler",
    "p": "ctrl",
    "w": "Pod replica loop. HPA reads metrics (CPU, RPS, custom) and writes replica counts onto Deployments. It is a Kubernetes object, desired in Git, acting continuously. News feed is the example: four replicas is a floor, not a personality.",
    "y": "Humans guessing replica counts will be wrong twice a day. HPA turns SLIs into the only guess that matters. It also makes a bad deploy visible: replicas climb while error rate climbs, which is a canary signal.",
    "d": [
      "Triggered by metrics APIs, continuously.",
      "Stores HPA objects and the replica counts it writes.",
      "Talks to metrics APIs and the API server.",
      "Not a Terraform apply."
    ],
    "triggers": "Metrics from Prometheus / custom metrics APIs, continuously.",
    "stores": "HPA objects and the replica counts it writes onto Deployments.",
    "talksTo": "Metrics APIs and the API server."
  },
  "ca": {
    "n": "Cluster autoscaler",
    "p": "ctrl",
    "w": "Node loop. If pods are unschedulable, CA adds nodes. If traffic falls and HPA removes pods, CA drains idle nodes. Same telemetry plane as HPA. The rare moment control plane touches plane B without a Terraform run is CA calling the cloud API to mint or retire a VM.",
    "y": "A fixed node pool is either waste or a pending incident. CA makes the node group elastic within the bounds Terraform already created (instance types, max size). Bigger bounds are a plane-B change.",
    "d": [
      "Triggered by unschedulable pods and underused nodes.",
      "Talks to the API server and the cloud provider APIs.",
      "Max size is desired infra, owned by Terraform.",
      "Drains respect PDBs."
    ],
    "triggers": "Unschedulable pods and underused nodes.",
    "stores": "Nothing in-cluster beyond the node objects it requests.",
    "talksTo": "API server and the cloud provider APIs that mint VMs. Rare plane-B touch without a Terraform run."
  },
  "sql": {
    "n": "Cloud SQL",
    "p": "data",
    "w": "System of record for users, posts, and the relational slice of the feed. Provisioned by Terraform, consumed by services, never migrated by a CI deploy job. Backups and replicas are plane-B concerns.",
    "y": "Relational data does not belong in a container filesystem. A managed database is the boring store that survives a node drain. Schema changes are versioned and applied by a deliberate job, not by the rolling deploy of v1827.",
    "d": [
      "Triggered by application services.",
      "Created by Terraform, not by Argo CD.",
      "The services that own the tables talk to it.",
      "A feature ship does not apply a database."
    ],
    "triggers": "Application services.",
    "stores": "Relational product data.",
    "talksTo": "The services that own the tables."
  }
});
