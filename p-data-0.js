window.IDP_DATA = Object.assign(window.IDP_DATA || {}, {
  "overview": {
    "n": "How to read this map (plane)",
    "p": "step",
    "w": "This is the catalog of data-plane utilities the request actually uses. Follow newsfeed-service:v1827 from the edge of the cluster, through the in-cluster path, into the newsfeed BOM, then scale and GPU, then observe. Each card says when to pick the utility and when not to.",
    "y": "v2 is how a change is admitted. Agents read the traces. Metal is the floor. Scenarios play Ship, Serve, Break. Plane is the BOM of the hop: which utility sits on the path, and which one you should have picked.",
    "d": [
      "Edge: L4 LB, L7 ingress, kube-proxy (iptables, IPVS, eBPF), CNI.",
      "In-cluster: Service, mesh, cluster DNS.",
      "State and flow: Redis, Kafka, object store, Postgres, search. That is the newsfeed BOM.",
      "Scale and GPU: HPA, cluster autoscaler, NVLink. Observe: OTel on the request.",
      "Tap a card. When to use, when not, and what it looks like sit in the panel."
    ],
    "useWhen": "Start here. Then tap a card on the path the request uses.",
    "useNot": "Do not treat this tab as a second v2. v2 admits the change. Plane names the hop.",
    "look": "Five bands. Edge, in-cluster path, newsfeed BOM, scale and GPU, observe."
  },
  "p-lb": {
    "n": "L4 load balancer",
    "p": "data",
    "w": "A cloud or hardware L4 balancer accepts user bytes and forwards them to a backend set. It health-checks node ports or a target group. It is provisioned by Terraform or the cloud controller, not by CI. newsfeed-service:v1827 is not an LB object.",
    "y": "You need a stable, addressable front door that is not a single node. The L4 hop is that door. Host and path do not live here.",
    "d": [
      "VIP plus health checks. TCP or UDP. Not HTTP routing.",
      "Sits in front of ingress, not in front of every pod.",
      "Serve walks this hop after the metal path. Cite v2 lb.",
      "A feature ship does not recreate the balancer."
    ],
    "useWhen": "You need a stable VIP and health-checked backends, and you do not yet care about host or path.",
    "useNot": "Host and path routing, TLS for many names, or per-route auth. That is ingress.",
    "look": "A cloud NLB or a hardware pair in front of the cluster, health-checking node ports.",
    "seeTab": "v2",
    "seeId": "lb",
    "seeHref": "v2.html#lb"
  },
  "p-ingress": {
    "n": "L7 Ingress / Gateway API",
    "p": "data",
    "w": "Ingress or Gateway API maps host and path to the News Feed Service. TLS, routing, some authn. Desired state in platform-gitops, synced by Argo CD. This is the hop Serve names as Ingress + Service.",
    "y": "Services should not each invent a front door. Ingress is the platform edge inside the cluster. Changing it is a GitOps change, which means it is reviewed and reversible.",
    "d": [
      "HTTP and HTTPS. Host, path, headers. Not a second L4.",
      "Gateway API is the successor shape. Same job. Most used in-cluster: ingress-nginx. Often Envoy.",
      "Also common: Traefik, Kong Gateway, AWS Load Balancer Controller / ALB, Istio, Contour.",
      "Routes to newsfeed-service, then the fan-out.",
      "Cite Scenarios Serve: the packet becomes an in-cluster request here."
    ],
    "useWhen": "Host and path to a Service, TLS, and one front door for newsfeed-service:v1827.",
    "useNot": "Raw L4, or a second front door invented inside each service binary.",
    "look": "An in-cluster controller mapping feed.example.com to the News Feed Service.",
    "seeTab": "scenarios",
    "seeId": "serve-6",
    "seeHref": "scenarios.html#serve-6"
  },
  "p-kubeproxy": {
    "n": "kube-proxy, IPVS, eBPF",
    "p": "data",
    "w": "The node dataplane that turns a Service ClusterIP into packet forwarding. Three modes, one card: kube-proxy iptables, kube-proxy IPVS, or an eBPF dataplane that replaces kube-proxy (Cilium and friends).",
    "y": "A Service that never becomes a packet rule is fiction. This hop is how newsfeed-service:v1827 is reachable from other pods while endpoints change.",
    "d": [
      "iptables: a chain per Service. Fine at small scale. Rule cost grows with Services and endpoints.",
      "IPVS: an in-kernel load table. Better at many Services. Still a kube-proxy mode.",
      "eBPF: the CNI dataplane can skip kube-proxy and steer in the kernel. Run one dataplane, not two.",
      "Pick one mode for the cluster. Do not mix iptables and eBPF on the same node and call it a design."
    ],
    "useWhen": "You need ClusterIP to become forwarding on each node, and you have not already replaced this hop.",
    "useNot": "You already run a CNI eBPF dataplane as the Service implementation. Do not also run kube-proxy.",
    "look": "A daemon on every node rewriting or steering Service traffic. iptables, IPVS, or eBPF."
  }
});
