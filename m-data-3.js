window.IDP_DATA = Object.assign(window.IDP_DATA || {}, {
  "power-pdu": {
    "n": "PDUs, busway, A/B to the rack",
    "p": "infra",
    "w": "Power distribution units and busway carry A and B feeds down the aisle to each rack. Dual-corded servers sip both. A single-corded box is a choice to fail with one side.",
    "y": "The last ten meters of power are where most 'mystery' reboots hide. Label the whip.",
    "d": [
      "A/B diversity dies if both cords land on one PDU.",
      "Busway beats a spaghetti of whips in a dense hall.",
      "Typical CPU rack is 10 to 15 kW. GPU rows are 40 to 100 kW.",
      "N+1 and 2N are meaningless if the rack is single-fed."
    ]
  },
  "cooling-crah": {
    "n": "CRAH and hot / cold aisle",
    "p": "infra",
    "w": "Computer-room air handlers push cold air into a cold aisle. Servers throw heat into a hot aisle. Containment is how you stop the two from mixing.",
    "y": "Air is a fluid problem. A missing tile is a hot spot. A hot spot is a throttle, then a trip.",
    "d": [
      "CRAH, not 'the AC'. These are precision units on a chilled-water loop.",
      "Hot / cold aisle containment is the design, not a suggestion.",
      "This works for 10 to 15 kW CPU racks. GPU rows outgrow it.",
      "Set points are a capacity knob. Lower is not always better."
    ]
  },
  "cooling-liquid": {
    "n": "GPU liquid cooling",
    "p": "infra",
    "w": "Direct-to-chip or rear-door heat exchangers for 40 to 100 kW racks. Air cannot move that heat at a temperature the silicon will accept. CDU (coolant distribution) is now a row-level service.",
    "y": "Training and inference density is a cooling problem first. If the liquid plant is late, the H100s are sculptures.",
    "d": [
      "40 to 100 kW per GPU rack, versus 10 to 15 kW typical CPU.",
      "A leak is an incident with a wet floor and a live busway.",
      "CDUs, manifolds, and quick-disconnects are the new PDU.",
      "Ranking (train + infer) lives or dies on this row."
    ]
  },
  "fabric-border": {
    "n": "DC border",
    "p": "data",
    "w": "The building's north-south edge. Provider backbone and peering land here. Southbound is the spine. This is not the ToR, and it is not the IXP. It is the DC's front door.",
    "y": "If every flow hairpins at one pair of border routers, that pair is your region-sized blast radius.",
    "d": [
      "eBGP toward the backbone and toward other buildings.",
      "Default-free or nearly, depending on the provider.",
      "DDoS and ACL policy belong here, not on every leaf.",
      "The packet is still on glass. The next hop is the Clos."
    ]
  },
  "fabric-spine": {
    "n": "Spine (Clos)",
    "p": "data",
    "w": "Non-blocking Clos spine. Every leaf can reach every leaf in a bounded number of hops. ECMP sprays flows. There is no 'core VLAN' story left to tell.",
    "y": "A spine is how you keep east-west cheap inside the building. Without it you invent hairpins and then you invent outages.",
    "d": [
      "ToR to spine to ToR is 5 to 50 μs.",
      "ECMP on 5-tuple. One fat flow is still one path.",
      "Spines do not run your stateful services. They forward.",
      "Failure of one spine is a loss of hash buckets, not a partition, if you built it right."
    ]
  },
  "fabric-leaf": {
    "n": "Leaf",
    "p": "data",
    "w": "The leaf is the other side of the Clos. It faces a row of ToRs or, in some designs, is the ToR. BGP in the DC carries reachability. No STP novel.",
    "y": "Leaf-spine is the contract. Overlay (VPC, Geneve) sits on it. The underlay has to be boring.",
    "d": [
      "BGP-in-DC is the control plane. The data plane is IP or MPLS.",
      "Oversubscription is a stated number, not a surprise.",
      "A leaf is a row-level failure domain.",
      "Server default gateway is usually an anycast VTEP on this tier."
    ]
  },
  "tor": {
    "n": "Top of rack (ToR)",
    "p": "data",
    "w": "A switch that is physically the top of the rack. Down: DAC or AOC to servers. Up: QSFP 100/400G toward the spine. This is the server's first IP hop.",
    "y": "Most 'the network is slow' tickets die here: a bad DAC, a one-uplink rack, or a hash that pinned a flow.",
    "d": [
      "In-rack 1 to 5 μs on DAC.",
      "Uplink is 100G or 400G QSFP.",
      "A/B ToRs exist in some designs. Most GPU rows want two.",
      "The ToR is drawn on every rack on this poster for a reason."
    ]
  },
  "rack-cpu": {
    "n": "General CPU row (stateless / K8s workers)",
    "p": "data",
    "w": "Standard 1U and 2U dual-socket servers. 10 to 15 kW per rack. This is the golden-path worker node pool: VMs on these slats, kubelets on those VMs, pods on those kubelets.",
    "y": "If you cannot point at a row and say 'stateless compute lives here', the platform is a rumor.",
    "d": [
      "DATA PLANE badge sits on this row.",
      "Air-cooled. Hot / cold aisle is enough.",
      "Argo and CI are tenants on ordinary CPU, not a special hall.",
      "Click a slat for the server to VM to pod stack."
    ]
  },
  "rack-mem": {
    "n": "Memory-optimized row (Postgres, Redis)",
    "p": "data",
    "w": "Fewer sockets, much more DRAM, and a NUMA story. Postgres and Redis sit here because a cache miss to disk is an incident and a cache miss to a remote rack is a tax.",
    "y": "Stateful latency is a memory and a locality problem. You do not put the primary on a noisy GPU row to save a floor tile.",
    "d": [
      "DIMM population and channel count are the capacity plan.",
      "These slats still look like 1U. The BOM is different.",
      "Failure domain is the replica set, not the row, if you placed it that way.",
      "Same ToR and same DAC rules as the CPU row."
    ]
  },
  "rack-storage": {
    "n": "Storage-dense row (object / JBODs)",
    "p": "data",
    "w": "JBODs and dense NVMe chassis. Object storage, image layers, and the cold side of the newsfeed. Power is media plus controllers, not GPUs.",
    "y": "Bytes at rest have a floor too: rebuild time, rack weight, and a busway that can feed a lot of drives.",
    "d": [
      "Weight is a structural limit. These rows are heavy.",
      "Rebuild and rebalance are the real SLO, not raw GB.",
      "Object is the artifact store behind newsfeed-service:v1827.",
      "Do not mix this density with liquid GPU manifolds on the same row."
    ]
  },
  "rack-gpu": {
    "n": "GPU row (H100, NVLink, IB / RoCE)",
    "p": "metal",
    "w": "H100-class trays, NVLink inside the node, InfiniBand or RoCE between nodes. 40 to 100 kW per rack. Liquid cooling. This is where ranking trains and where the heavy infer sits.",
    "y": "A GPU row is a different building product. If you treat it like a CPU row you will trip breakers and then you will miss a train.",
    "d": [
      "40 to 100 kW versus 10 to 15 kW typical.",
      "NVLink GPU to GPU is hundreds of ns at about 900 GB/s.",
      "The fabric next to the Ethernet Clos is IB or RoCE.",
      "Click a GPU slat for the same server-to-pod story, with a different BOM."
    ]
  },
  "rack-tpu": {
    "n": "TPU pods (GCP variant)",
    "p": "metal",
    "w": "Google's custom silicon in a dedicated optical mesh. A TPU 'pod' is a machine-room product, not a Kubernetes pod. The interconnect is optical and closed.",
    "y": "This row exists so the poster tells the truth on GCP. You do not ECMP your way into a TPU slice from a random ToR.",
    "d": [
      "Dedicated optical mesh, not the DC Ethernet Clos.",
      "Scheduler and quota are a different control plane.",
      "Cooling and power look more like the GPU row than the CPU row.",
      "A Kubernetes pod that 'uses a TPU' is a claim on this hall."
    ]
  }
});
