(function (D) {
  var s = {
  "overview": {
    "scaleNote": "Numbers are typical order-of-magnitude bands operators use when choosing, not Jacob's prod metrics and not world records."
  },
  "p-lb": {
    "reads": "Packets. 100k–1M+ PPS per pair typical. Connections 100k–1M.",
    "writes": "Same hop. Writes are packets too, not HTTP verbs.",
    "scaleNote": "An NLB pair is a packet device. Host and path do not live here."
  },
  "p-ingress": {
    "reads": "10k–100k RPS per instance, TLS-bound.",
    "writes": "Requests that mutate. Same hop, same instance budget.",
    "scaleNote": "Envoy / nginx class. CPU and TLS dominate before raw packet PPS."
  },
  "p-kubeproxy": {
    "reads": "iptables comfortable at hundreds of Services. IPVS at thousands. eBPF past that.",
    "writes": "Same dataplane. Service and endpoint churn is the cost, not HTTP writes.",
    "scaleNote": "Pick one mode. Do not mix iptables and eBPF on the same node."
  },
  "p-cni": {
    "reads": "Same node PPS as the NIC / eBPF budget. Not an app QPS number.",
    "writes": "Same. East-west packets, not SQL writes.",
    "scaleNote": "A pod IP and a route. QPS belongs to the app and the NIC."
  },
  "p-svc": {
    "reads": "ClusterIP has no extra QPS. It is the kube-proxy / eBPF budget.",
    "writes": "Same. The name is free. The dataplane is not.",
    "scaleNote": "Endpoints move. The Service name does not."
  },
  "p-mesh": {
    "reads": "10k–50k RPS per pod typical before the sidecar is the story. +1–2 ms.",
    "writes": "Same hop. 5–20% CPU tax either way.",
    "scaleNote": "Sidecar or ambient. Tax is real. A three-service app may not need it."
  },
  "p-dns": {
    "reads": "10k–100k queries/s per CoreDNS replica with cache. Apps should cache.",
    "writes": "Dynamic updates are rare. Query load is the read.",
    "scaleNote": "cluster.local, not the public CDN."
  },
  "p-redis": {
    "reads": "100k–1M simple ops/s per shard. In memory.",
    "writes": "Same. Writes are in memory too. Persistence is the other conversation.",
    "scaleNote": "Hot keys. Not truth."
  },
  "p-kafka": {
    "reads": "Consume N× produce. 10k–100k msgs/s per partition typical.",
    "writes": "Produce 10k–100k msgs/s per partition, 10–50 MB/s per partition typical. Cluster 100k–1M+ msgs/s.",
    "scaleNote": "A log, not RPC. Partition count is the scale knob."
  },
  "p-obj": {
    "reads": "Often a CDN. Millions of GETs at the edge.",
    "writes": "PUTs 1k–10k/s per prefix typical.",
    "scaleNote": "Write once, read many."
  },
  "p-sql": {
    "reads": "~10–50k simple reads/s on a primary before replicas. Replicas scale reads only.",
    "writes": "~5–15k simple writes/s on one primary typical.",
    "scaleNote": "Transactions. Not a cache. Schema is its own path."
  },
  "p-search": {
    "reads": "1k–10k queries/s per node typical.",
    "writes": "Bulk index 10k–50k docs/s per node typical.",
    "scaleNote": "Derived. Fed from Kafka. Rebuild is allowed."
  },
  "p-hpa": {
    "reads": "Not a QPS device. Adds pods when RPS or CPU says so.",
    "writes": "Writes replica counts, not user bytes.",
    "scaleNote": "Four is a floor. Node count is CA."
  },
  "p-ca": {
    "reads": "Not on the request path. Adds nodes on a minutes-scale.",
    "writes": "Cloud API calls to mint or drain VMs.",
    "scaleNote": "Inside the Terraform max. Not a request hop."
  },
  "p-nvlink": {
    "reads": "GPU to GPU. Hundreds of GB/s. Not HTTP.",
    "writes": "Same fabric. AllReduce, not a POST.",
    "scaleNote": "Inside the tray. The newsfeed worker is CPU."
  },
  "p-otel": {
    "reads": "10k–100k spans/s per collector typical.",
    "writes": "Export is the write. 1–5% app overhead.",
    "scaleNote": "A dead collector is a blank board."
  }
};
  Object.keys(s).forEach(function (k) { if (D[k]) Object.assign(D[k], s[k]); });
})(window.IDP_DATA);
