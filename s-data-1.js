window.IDP_DATA = Object.assign(window.IDP_DATA || {}, {
  "ship-7":   {
    "n": "Reconcile",
    "p": "ctrl",
    "w": "Argo CD watches platform-gitops, diffs desired versus live, and syncs. It is not a CI job. Pull-based: the cluster never gets CI credentials.",
    "y": "The only write path into production Kubernetes for applications is this reconciler. That is how revert stays a Git operation.",
    "d": [
      "Watch, compare, sync. That is the whole job, forever.",
      "On Agents the sync status is the Argo board. Silence is a signal, not a pass.",
      "If someone clicks in the cloud console, drift is detected and reconciled back to Git."
    ],
    "story": "ship",
    "shape": "live cluster state",
    "shapeFrom": "desired",
    "shapeTo": "live (Argo)",
    "seeTab": "v2",
    "seeId": "argocd",
    "seeHref": "v2.html#argocd"
  },
  "ship-8":   {
    "n": "Node",
    "p": "infra",
    "w": "The admitted object is scheduled onto a VM that is a kube node. The VM lives on a hypervisor on a slat. The golden-path worker pool is a bag of these VMs.",
    "y": "Autoscaling adds VMs (and maybe slats). It does not add magic. If the slat is full, the VM does not appear.",
    "d": [
      "kubelet, runtime, and CNI live inside the VM.",
      "Metal draws the stack: slat, hypervisor, VM, node.",
      "This is the object the Cluster Autoscaler bargains for."
    ],
    "story": "ship",
    "shape": "kube node VM",
    "shapeFrom": "object",
    "shapeTo": "VM that is a kube node on a slat",
    "seeTab": "metal",
    "seeId": "vm-node",
    "seeHref": "metal.html#vm-node"
  },
  "ship-9":   {
    "n": "Pod on metal",
    "p": "data",
    "w": "The node runs cgroups and namespaces. The process is newsfeed-service:v1827 on a CPU slat in the general row. This is the pod Serve will hit and Break will page on.",
    "y": "The whole Ship story exists so this process can answer a thumb. If you cannot follow the digest to this box, the other tabs are fiction.",
    "d": [
      "Same image tag v2 produced. Stateless worker. CPU row, not GPU.",
      "A pod is a scheduled slice of a VM that is already a slice of a slat.",
      "Cite Metal: newsfeed-pod, pod, cpu-slat, rack-cpu."
    ],
    "story": "ship",
    "shape": "process on a slat",
    "shapeFrom": "node",
    "shapeTo": "cgroups + newsfeed-service:v1827 on a CPU slat",
    "seeTab": "metal",
    "seeId": "newsfeed-pod",
    "seeHref": "metal.html#newsfeed-pod"
  },
  "serve-1":   {
    "n": "Thumb",
    "p": "edge",
    "w": "A thumb hits the newsfeed. The handset turns the HTTP request into a radio burst on licensed LTE or 5G NR. The air is not the delay. The scheduler is.",
    "y": "This is where the request is born. If you start the story at the load balancer you have already skipped the hops users pay for.",
    "d": [
      "RF is essentially c. A kilometer of air is about 3 μs (Metal).",
      "The 1–10 ms you measure is TTI scheduling, HARQ, and the radio grant (Metal).",
      "Cite Metal: user-phone, e-rf."
    ],
    "story": "serve",
    "shape": "RF in air",
    "shapeFrom": "thumb",
    "shapeTo": "RF in air",
    "seeTab": "metal",
    "seeId": "user-phone",
    "seeHref": "metal.html#user-phone"
  },
  "serve-2":   {
    "n": "Tower",
    "p": "metal",
    "w": "A steel or rooftop site. Radios face the handset. The BBU emits IP onto backhaul. This is where bytes become light.",
    "y": "Coverage is a real-estate problem. The 1–10 ms phone-to-tower number is mostly the BBU schedule, not the speed of radio (Metal).",
    "d": [
      "RRU on the mast. BBU in the hut or a nearby CO.",
      "After this hop, treat the path as fiber.",
      "Cite Metal: tower, bbu."
    ],
    "story": "serve",
    "shape": "light on fiber",
    "shapeFrom": "bytes",
    "shapeTo": "light",
    "seeTab": "metal",
    "seeId": "tower",
    "seeHref": "metal.html#tower"
  },
  "serve-3":   {
    "n": "Glass to the hotel",
    "p": "photon",
    "w": "Metro ring, long-haul as needed, then a carrier hotel. This cell compresses those hops. The full 13 live on Metal. Light in fiber is about 4.9 μs/km one-way (Metal).",
    "y": "You do not need every amplifier on this storyboard. You do need to remember the request is still photons, not a Service object.",
    "d": [
      "Metro around a city is 1 to 2 ms typical (Metal).",
      "The hotel is interconnection: meet-me, cross-connect, colo under one roof.",
      "Cite Metal: metro-ring, hotel, xconnect. Do not invent numbers."
    ],
    "story": "serve",
    "shape": "photons to a meet-me",
    "shapeFrom": "glass",
    "shapeTo": "hotel",
    "seeTab": "metal",
    "seeId": "hotel",
    "seeHref": "metal.html#hotel"
  },
  "serve-4":   {
    "n": "EDGE or miss",
    "p": "edge",
    "w": "An EDGE PoP or CDN cache may answer here. TLS can terminate. A miss goes on to the region and the AZ. Anycast brought the user to this city.",
    "y": "This is the first place the request may be answered without crossing a region. If the feed is cacheable, the region never sees the byte.",
    "d": [
      "Not a full AZ. A handful of racks, a cache, and a tight failure domain.",
      "Inter-AZ budget on Metal is under 2 ms RTT. Cite that when the miss lands in-region.",
      "Cite Metal: edge-pop, az."
    ],
    "story": "serve",
    "shape": "cache hit or regional miss",
    "shapeFrom": "EDGE",
    "shapeTo": "hit, or miss to region",
    "seeTab": "metal",
    "seeId": "edge-pop",
    "seeHref": "metal.html#edge-pop"
  },
  "serve-5":   {
    "n": "DC fabric",
    "p": "data",
    "w": "Inside the building: border, then Clos spine, then ToR. East-west is cheap. This is the hop a service mesh cannot optimize away.",
    "y": "If two pods in the same AZ are slow, look here before you look at the process. Metal's ToR to spine to ToR is 5–50 μs.",
    "d": [
      "ToR is the server's first IP hop. Down: DAC. Up: 100/400G toward the spine.",
      "ECMP on 5-tuple. One fat flow is still one path.",
      "Cite Metal: fabric-spine, tor."
    ],
    "story": "serve",
    "shape": "in-building packet",
    "shapeFrom": "border",
    "shapeTo": "spine, then ToR",
    "seeTab": "metal",
    "seeId": "fabric-spine",
    "seeHref": "metal.html#fabric-spine"
  },
  "serve-6":   {
    "n": "Ingress + Service",
    "p": "data",
    "w": "The packet becomes an in-cluster request. Cloud LB, then Ingress (or an API gateway) maps host and path to the News Feed Service. Desired state in platform-gitops.",
    "y": "Services should not each invent a front door. Ingress is the platform's edge inside the cluster. Changing it is a GitOps change.",
    "d": [
      "The LB is provisioned by Terraform or the cloud controller, not by CI.",
      "Badge 11 on v2 is the moment traffic can reach the new digest.",
      "Cite v2: ingress, lb."
    ],
    "story": "serve",
    "shape": "in-cluster request",
    "shapeFrom": "packet",
    "shapeTo": "in-cluster request",
    "seeTab": "v2",
    "seeId": "ingress",
    "seeHref": "v2.html#ingress"
  }
});
