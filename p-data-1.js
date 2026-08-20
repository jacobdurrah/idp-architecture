window.IDP_DATA = Object.assign(window.IDP_DATA || {}, {
  "p-cni": {
    "n": "CNI (pod network)",
    "p": "infra",
    "w": "The Container Network Interface gives each pod an IP and a route. Calico, Cilium, or the cloud CNI. kubelet asks CNI at pod start. This is the network, not the mesh.",
    "y": "Without a pod network there is no east-west and no Service. The CNI is how newsfeed-service:v1827 has an address on the node fabric Metal already drew.",
    "d": [
      "One CNI per cluster. Overlay or routed. Policy may live here (NetworkPolicy).",
      "A mesh is policy and mTLS on top. It is not a second CNI.",
      "eBPF CNIs can also implement Services. See the kube-proxy card.",
      "IPAM, routes, and the pod veth (or equivalent) are this hop."
    ],
    "useWhen": "Pods need an IP and a route to other pods and to Services.",
    "useNot": "You are not replacing the VPC with a Service mesh. CNI is the network. Mesh is policy on top.",
    "look": "A node agent plus a pod interface. Calico, Cilium, or the cloud CNI."
  },
  "p-svc": {
    "n": "Kubernetes Service",
    "p": "data",
    "w": "A stable in-cluster name and a set of endpoints. ClusterIP for east-west. NodePort or LoadBalancer when you must expose a port. newsfeed-service is a ClusterIP in front of the four replicas.",
    "y": "Pods die. Endpoints move. A Service is the contract other hops (ingress, mesh, DNS) can name. It is not a mesh and not a store.",
    "d": [
      "ClusterIP is the default. NodePort and LoadBalancer are exposure modes, not different products.",
      "Endpoints (or EndpointSlice) track ready pods. kube-proxy or eBPF consume them.",
      "headless Services exist for stateful sets that need pod DNS. The feed is not that.",
      "Cite v2 ingress and Scenarios serve-6: the L7 hop lands on this object."
    ],
    "useWhen": "A stable name and a set of endpoints. ClusterIP for east-west, NodePort or LB for a front door.",
    "useNot": "A Service is not a mesh and not a database. Do not put session state in the VIP.",
    "look": "A ClusterIP plus EndpointSlices. newsfeed-service points at the four replicas.",
    "seeTab": "v2",
    "seeId": "ingress",
    "seeHref": "v2.html#ingress"
  },
  "p-mesh": {
    "n": "Service mesh",
    "p": "data",
    "w": "mTLS, retries, timeouts, and L7 policy that is not in the app binary. Two shapes: sidecar (a proxy next to each pod) or ambient (a node proxy shared by pods). Same policy either way.",
    "y": "When the fleet is large enough that every binary inventing retries is a tax, the mesh is the platform opinion. It is not a replacement for CNI, and it is not free.",
    "d": [
      "Sidecar: a proxy container in the pod. Strong isolation. Memory and init cost per pod.",
      "Ambient: a node-level proxy (and optional waypoint). Cheaper at fleet scale. Weaker per-pod isolation.",
      "NetworkPolicy plus DNS is enough for a three-service app. Mesh tax is real.",
      "The newsfeed path can run without a mesh. Add one for mTLS and policy, not for fashion."
    ],
    "useWhen": "You need mTLS, retries, and timeout policy that is not in the app binary.",
    "useNot": "A three-service app that only needs a NetworkPolicy. Do not buy a mesh to draw a graph.",
    "look": "A sidecar next to each pod, or an ambient node proxy. Same policy object either way."
  },
  "p-dns": {
    "n": "Cluster DNS",
    "p": "data",
    "w": "CoreDNS (or equivalent) in kube-system. Pods resolve newsfeed.default.svc.cluster.local to the ClusterIP. This is not the public DNS and CDN on v2.",
    "y": "A Service you cannot name is a VIP you will hardcode. Cluster DNS is how the request path stays a name, not an IP in a ConfigMap.",
    "d": [
      "cluster.local is the in-cluster zone. Stub domains and upstreams are platform policy.",
      "v2 dns is the public name and edge cache. Different hop. Cite it so the split stays honest.",
      "A DNS outage inside the cluster looks like a mesh outage. Check CoreDNS first.",
      "headless Services return pod IPs. The feed uses a normal ClusterIP."
    ],
    "useWhen": "Pods resolve Service names (newsfeed.default.svc) on the request path.",
    "useNot": "Public user DNS and CDN. That is the v2 DNS and CDN box, not this one.",
    "look": "CoreDNS in kube-system, answering cluster.local for every Service.",
    "seeTab": "v2",
    "seeId": "dns",
    "seeHref": "v2.html#dns"
  }
});
