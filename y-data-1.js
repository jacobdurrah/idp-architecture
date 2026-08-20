window.IDP_DATA = Object.assign(window.IDP_DATA || {}, {
  "st-lambda": {
    "n": "Serverless / FaaS",
    "p": "data",
    "w": "Image resize, webhook, a cron that is not always-on. Not the hot GET /feed path.",
    "y": "Idle-to-spike. Pay per invoke. Downstream SQL still caps writes.",
    "d": [
      "Good for burst work that is not the feed SLO.",
      "Concurrency is a platform knob. The store you call is the real cap.",
      "Do not put the hot GET /feed path here."
    ],
    "example": "Image resize, a webhook, a cron. Not the hot GET /feed path.",
    "whyPick": "Idle-to-spike. Pay per invoke. The store you call still caps writes.",
    "scale": "0 to 10k–100k concurrent. Reads burst. Writes limited by the store you call.",
    "reads": "Burst. 0 to 10k–100k concurrent.",
    "writes": "Limited by the store you call."
  },
  "st-kernel": {
    "n": "Microkernel / plugin",
    "p": "data",
    "w": "The IDP itself (admission plugins, Argo, policy). Browser, IDE, and kube extension points.",
    "y": "Stable core, features as plugins, blast radius isolated.",
    "d": [
      "The core stays small. A plugin carries a feature.",
      "Admission, Argo, and policy are the IDP shape.",
      "This is a platform team style, not a feed QPS style."
    ],
    "example": "The IDP itself. Admission plugins, Argo, policy. Browser, IDE, and kube extension points.",
    "whyPick": "Stable core. Features as plugins. Blast radius stays isolated.",
    "scale": "Core is small RPS. Plugins carry the feature load. Platform team, not the feed QPS.",
    "reads": "Core is small RPS. Plugins carry the feature load.",
    "writes": "Platform team traffic, not the feed QPS."
  },
  "ys-lb": {
    "n": "L4 load balancer",
    "p": "data",
    "w": "Scale band for the L4 load balancer hop. Same utility as Plane p-lb.",
    "y": "Styles and Plane agree on the band. Open Plane for when to pick the hop.",
    "d": [
      "An NLB pair is a packet device. Host and path do not live here."
    ],
    "reads": "Packets. 100k–1M+ PPS per pair typical. Connections 100k–1M.",
    "writes": "Same hop. Writes are packets too, not HTTP verbs.",
    "scaleNote": "An NLB pair is a packet device. Host and path do not live here.",
    "scale": "An NLB pair is a packet device. Host and path do not live here.",
    "plane": [
      {
        "n": "L4 load balancer",
        "href": "plane.html#p-lb"
      }
    ],
    "seeTab": "plane",
    "seeId": "p-lb",
    "seeHref": "plane.html#p-lb"
  },
  "ys-ingress": {
    "n": "L7 Ingress / Gateway",
    "p": "data",
    "w": "Scale band for the L7 Ingress / Gateway hop. Same utility as Plane p-ingress.",
    "y": "Styles and Plane agree on the band. Open Plane for when to pick the hop.",
    "d": [
      "Envoy / nginx class. CPU and TLS dominate before raw packet PPS."
    ],
    "reads": "10k–100k RPS per instance, TLS-bound.",
    "writes": "Requests that mutate. Same hop, same instance budget.",
    "scaleNote": "Envoy / nginx class. CPU and TLS dominate before raw packet PPS.",
    "scale": "Envoy / nginx class. CPU and TLS dominate before raw packet PPS.",
    "plane": [
      {
        "n": "L7 Ingress / Gateway",
        "href": "plane.html#p-ingress"
      }
    ],
    "seeTab": "plane",
    "seeId": "p-ingress",
    "seeHref": "plane.html#p-ingress"
  },
  "ys-kubeproxy": {
    "n": "kube-proxy / eBPF",
    "p": "data",
    "w": "Scale band for the kube-proxy / eBPF hop. Same utility as Plane p-kubeproxy.",
    "y": "Styles and Plane agree on the band. Open Plane for when to pick the hop.",
    "d": [
      "Pick one mode. Do not mix iptables and eBPF on the same node."
    ],
    "reads": "iptables comfortable at hundreds of Services. IPVS at thousands. eBPF past that.",
    "writes": "Same dataplane. Service and endpoint churn is the cost, not HTTP writes.",
    "scaleNote": "Pick one mode. Do not mix iptables and eBPF on the same node.",
    "scale": "Pick one mode. Do not mix iptables and eBPF on the same node.",
    "plane": [
      {
        "n": "kube-proxy / eBPF",
        "href": "plane.html#p-kubeproxy"
      }
    ],
    "seeTab": "plane",
    "seeId": "p-kubeproxy",
    "seeHref": "plane.html#p-kubeproxy"
  },
  "ys-cni": {
    "n": "CNI (pod network)",
    "p": "infra",
    "w": "Scale band for the CNI (pod network) hop. Same utility as Plane p-cni.",
    "y": "Styles and Plane agree on the band. Open Plane for when to pick the hop.",
    "d": [
      "A pod IP and a route. QPS belongs to the app and the NIC."
    ],
    "reads": "Same node PPS as the NIC / eBPF budget. Not an app QPS number.",
    "writes": "Same. East-west packets, not SQL writes.",
    "scaleNote": "A pod IP and a route. QPS belongs to the app and the NIC.",
    "scale": "A pod IP and a route. QPS belongs to the app and the NIC.",
    "plane": [
      {
        "n": "CNI",
        "href": "plane.html#p-cni"
      }
    ],
    "seeTab": "plane",
    "seeId": "p-cni",
    "seeHref": "plane.html#p-cni"
  },
  "ys-svc": {
    "n": "Kubernetes Service",
    "p": "data",
    "w": "Scale band for the Kubernetes Service hop. Same utility as Plane p-svc.",
    "y": "Styles and Plane agree on the band. Open Plane for when to pick the hop.",
    "d": [
      "Endpoints move. The Service name does not."
    ],
    "reads": "ClusterIP has no extra QPS. It is the kube-proxy / eBPF budget.",
    "writes": "Same. The name is free. The dataplane is not.",
    "scaleNote": "Endpoints move. The Service name does not.",
    "scale": "Endpoints move. The Service name does not.",
    "plane": [
      {
        "n": "Kubernetes Service",
        "href": "plane.html#p-svc"
      }
    ],
    "seeTab": "plane",
    "seeId": "p-svc",
    "seeHref": "plane.html#p-svc"
  },
  "ys-mesh": {
    "n": "Service mesh",
    "p": "data",
    "w": "Scale band for the Service mesh hop. Same utility as Plane p-mesh.",
    "y": "Styles and Plane agree on the band. Open Plane for when to pick the hop.",
    "d": [
      "Sidecar or ambient. Tax is real. A three-service app may not need it."
    ],
    "reads": "10k–50k RPS per pod typical before the sidecar is the story. +1–2 ms.",
    "writes": "Same hop. 5–20% CPU tax either way.",
    "scaleNote": "Sidecar or ambient. Tax is real. A three-service app may not need it.",
    "scale": "Sidecar or ambient. Tax is real. A three-service app may not need it.",
    "plane": [
      {
        "n": "Service mesh",
        "href": "plane.html#p-mesh"
      }
    ],
    "seeTab": "plane",
    "seeId": "p-mesh",
    "seeHref": "plane.html#p-mesh"
  },
  "ys-dns": {
    "n": "Cluster DNS",
    "p": "data",
    "w": "Scale band for the Cluster DNS hop. Same utility as Plane p-dns.",
    "y": "Styles and Plane agree on the band. Open Plane for when to pick the hop.",
    "d": [
      "cluster.local, not the public CDN."
    ],
    "reads": "10k–100k queries/s per CoreDNS replica with cache. Apps should cache.",
    "writes": "Dynamic updates are rare. Query load is the read.",
    "scaleNote": "cluster.local, not the public CDN.",
    "scale": "cluster.local, not the public CDN.",
    "plane": [
      {
        "n": "Cluster DNS",
        "href": "plane.html#p-dns"
      }
    ],
    "seeTab": "plane",
    "seeId": "p-dns",
    "seeHref": "plane.html#p-dns"
  }
});
