window.IDP_DATA = Object.assign(window.IDP_DATA || {}, {
  "controllermgr": {
    "n": "Controller manager",
    "p": "ctrl",
    "w": "The built-in reconcilers: Deployment, ReplicaSet, Service, Job, and the rest. They are why apply a Deployment becomes running pods. They store nothing durable outside the API.",
    "y": "GitOps writes desired objects. Controllers do the mechanical work of creating pods, endpoints, and rolling updates. If you skip this and script kubectl in CI, you have thrown away the reason Kubernetes exists.",
    "d": [
      "Triggered by changes to watched API objects.",
      "Talks to the API server only.",
      "Rolling deploys, replica counts, and service endpoints live here.",
      "Always on, like the rest of the control plane."
    ]
  },
  "dns": {
    "n": "DNS and CDN",
    "p": "data",
    "w": "Public name and edge cache. Users resolve here first. The CDN terminates some TLS and absorbs static and media traffic so the cluster sees less of it. This is request path, not deploy path.",
    "y": "A product that cannot be named cannot be used. Putting DNS and CDN on the poster keeps the edge honest and stops people from treating the load balancer as the start of the universe.",
    "d": [
      "Provisioned as infra, consumed as data plane.",
      "Certificates and cache policy are desired state.",
      "Media bytes often leave from object storage via the CDN, not via pods.",
      "A DNS change is plane B, not a feature deploy."
    ]
  },
  "lb": {
    "n": "Cloud load balancer",
    "p": "data",
    "w": "The cloud load balancer accepts user traffic and forwards it to ingress. It is provisioned by Terraform (or by the cluster's cloud controller) and is not a CI object. Health checks here are about endpoints, not about Git.",
    "y": "You need a stable, addressable front door that is not a single node. The LB is that door. It is also where you notice that a rollout has shifted traffic, which is how step 9 becomes real to users.",
    "d": [
      "Request traffic, not a deploy trigger.",
      "Health checks shift traffic during a rolling deploy.",
      "Created with the cluster substrate.",
      "Sits in front of ingress, not in front of every pod."
    ]
  },
  "ingress": {
    "n": "Ingress / API gateway",
    "p": "data",
    "w": "Ingress (or an API gateway) maps host and path to the news-feed Service. TLS, routing, and some authn live here. It is desired state in the manifests repo, synced by Argo CD, not hand-edited on a controller box.",
    "y": "Services should not each invent a front door. Ingress is the platform's edge inside the cluster. Changing it is a GitOps change, which means it is reviewed and reversible.",
    "d": [
      "Desired state in Git, like any other workload object.",
      "Routes to News Feed API, then to the fan-out of services.",
      "Not a place to hide deploy scripts.",
      "Badge 9 is the moment traffic can reach the new digest."
    ]
  },
  "nodepool": {
    "n": "Worker node pool",
    "p": "data",
    "w": "The data plane machines. kubelet, kube-proxy, an OTel agent, and application pods live here. kubelet pulls newsfeed-service:v1827 from the artifact registry. A rolling deploy replaces the old replica set. Service discovery and the load balancer shift traffic.",
    "y": "Control plane opinions that never reach a node are fiction. The node pool is where the digest becomes a process, where CPU is spent, and where HPA and the cluster autoscaler have something to count.",
    "d": [
      "Nodes are cattle, added and drained by the cluster autoscaler.",
      "Image pull uses node identity.",
      "PDBs and topology spread keep a rollout from going dark.",
      "OTel agents run on every node."
    ]
  },
  "newsfeed": {
    "n": "News feed service ×4",
    "p": "data",
    "w": "Stateless feed assembly. Four replicas on the hot path, HPA-managed. This is the service whose image (v1827) the rest of the poster traces. It reads users, posts, rankings, and media metadata. It stores nothing durable.",
    "y": "A concrete workload makes the path teachable. News feed is read-heavy, fan-out-heavy, and honest about the data services it needs. The replica count is a live object, not a hope in a runbook.",
    "d": [
      "Triggered by ingress.",
      "Talks to User, Post, Ranking, Media, Notification, and Redis.",
      "Replica ticks sit on the hot path for a reason.",
      "A bad digest here is a canary and a burn-rate alert, then a Git revert."
    ]
  },
  "svc-user": {
    "n": "User service",
    "p": "data",
    "w": "Profile, graph, and authentication. News feed and the edge (session and auth) call it. Identity and graph edges live in Cloud SQL (and a graph store if you have one), not in the pod.",
    "y": "A feed that cannot name a user is a demo. Isolating identity as its own service keeps authz and graph changes from shipping inside the feed binary.",
    "d": [
      "×3 typical. Not the traced image, same path.",
      "Talks to SQL, Redis, and News Feed.",
      "Authn at the edge still depends on this service.",
      "Same CI to GitOps contract as news-feed."
    ]
  },
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
    ]
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
    ]
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
    ]
  }
});
