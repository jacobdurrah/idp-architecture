window.IDP_DATA = Object.assign(window.IDP_DATA || {}, {
  "scheduler": {
    "n": "Scheduler",
    "p": "ctrl",
    "w": "Binds pods to nodes. Step 11 starts here: the scheduler places the new replica set, then kubelet pulls newsfeed-service:v1827 from the artifact registry using the node's cloud identity.",
    "y": "Placement is policy: resources, topology, taints, affinity. Without a scheduler you have a pile of machines. With one, a digest becomes a running process on a node that can actually pull it.",
    "d": [
      "Triggered by unbound pods in the API.",
      "Writes bindings. Does not pull images.",
      "Respects topology spread and disruption budgets.",
      "Unschedulable pods are a signal for the cluster autoscaler."
    ],
    "triggers": "Unbound pods in the API.",
    "stores": "Bindings, as API objects.",
    "talksTo": "API server. It does not pull images."
  },
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
    ],
    "triggers": "Changes to watched API objects.",
    "stores": "Nothing durable outside the API.",
    "talksTo": "API server only."
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
    ],
    "triggers": "People opening the product.",
    "stores": "Records and cache policy.",
    "talksTo": "Cloud LB."
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
    ],
    "triggers": "User traffic and health checks.",
    "stores": "Endpoint health.",
    "talksTo": "Ingress."
  },
  "ingress": {
    "n": "Ingress / API gateway",
    "p": "data",
    "w": "Ingress (or an API gateway) maps host and path to the News Feed Service. TLS, routing, some authn. Desired state in platform-gitops, synced by Argo CD. Badge 11's traffic shift is visible here.",
    "y": "Services should not each invent a front door. Ingress is the platform's edge inside the cluster. Changing it is a GitOps change, which means it is reviewed and reversible.",
    "d": [
      "Desired state in Git, like any other workload object.",
      "Routes to News Feed API, then to the fan-out of services.",
      "Not a place to hide deploy scripts.",
      "Badge 9 is the moment traffic can reach the new digest."
    ],
    "triggers": "Cloud LB.",
    "stores": "Routing rules, not application state.",
    "talksTo": "News Feed API, then the six app services."
  },
  "nodepool": {
    "n": "Worker node pool",
    "p": "data",
    "w": "Worker nodes are the data plane. Each has kubelet, kube-proxy, an OTel agent, and application pods. kubelet pulls newsfeed-service:v1827. A rolling deploy replaces the old replica set, honoring PDBs and topology spread. kube-proxy (or the dataplane equivalent) keeps Services reachable while endpoints change.",
    "y": "Control plane opinions that never reach a node are fiction. The node pool is where the digest becomes a process, where CPU is spent, and where HPA and the cluster autoscaler have something to count.",
    "d": [
      "Nodes are cattle, added and drained by the cluster autoscaler.",
      "Image pull uses node identity.",
      "PDBs and topology spread keep a rollout from going dark.",
      "OTel agents run on every node."
    ],
    "triggers": "Scheduler bindings and kubelet's own sync loop.",
    "stores": "Container filesystem, image cache, pod network state. Not desired state.",
    "talksTo": "API server (status), artifact registry (image pull), and the node network path to users and datastores."
  },
  "newsfeed": {
    "n": "News feed service ×4",
    "p": "data",
    "w": "Stateless feed assembly. Four replicas on the hot path, HPA-managed. This is the service whose image (v1827, sha256:9f3a…c21) the rest of the diagram traces. It stores nothing durable. It reads users, posts, rankings, and media metadata.",
    "y": "A concrete workload makes the path teachable. News feed is read-heavy, fan-out-heavy, and honest about the data services it needs. The replica count is a live object, not a hope in a runbook.",
    "d": [
      "Triggered by ingress.",
      "Talks to User, Post, Ranking, Media, Notification, and Redis.",
      "Replica ticks sit on the hot path for a reason.",
      "A bad digest here is a canary and a burn-rate alert, then a Git revert."
    ],
    "triggers": "Ingress / API gateway.",
    "stores": "Nothing durable.",
    "talksTo": "User, Post, Ranking, Media, Notification; Redis; the edge."
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
    ],
    "triggers": "News Feed and the edge (session / auth).",
    "stores": "Identity and graph edges in Cloud SQL.",
    "talksTo": "Cloud SQL, Redis, News Feed."
  }
});
