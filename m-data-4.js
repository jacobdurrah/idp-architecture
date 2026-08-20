window.IDP_DATA = Object.assign(window.IDP_DATA || {}, {
  "control-cell": {
    "n": "Control-plane CPU cell",
    "p": "ctrl",
    "w": "A dedicated CPU cell for the Kubernetes API, etcd, and the few boxes that must not drown in tenant noise. Separate failure domain from worker slats. Argo and CI stay ordinary CPU tenants, not guests here.",
    "y": "etcd on a noisy worker is how you turn a tenant loop into a regional control-plane outage. Put the API somewhere you can name.",
    "d": [
      "CONTROL PLANE badge sits on this cell.",
      "API and etcd are here. Workers are not.",
      "Argo / CI run as ordinary CPU tenants on the data-plane row.",
      "Same rack language. Different blast radius."
    ]
  },
  "server": {
    "n": "Physical server (slat)",
    "p": "metal",
    "w": "A 1U or 2U slat: NIC, CPUs, RAM, local NVMe. Dual cords on A/B. DAC to the ToR. This is the machine. Everything above it is software you could lose on a reboot.",
    "y": "The golden-path worker node is not this slat. It is a VM on this slat. Click through the diagram in the panel.",
    "d": [
      "NIC, two sockets, DRAM, a few NVMe devices.",
      "SmartNIC or DPU can offload vswitch, crypto, and storage.",
      "SR-IOV bypasses the vswitch when the workload paid for it.",
      "newsfeed-service:v1827 will run in a pod on a VM on this box."
    ],
    "diagram": "server-drill"
  },
  "cpu-slat": {
    "n": "CPU slat (worker)",
    "p": "data",
    "w": "An ordinary CPU slat in the general row. Same BOM class as its neighbors. The worker node pool is many of these, virtualized.",
    "y": "You scale the data plane by adding slats and the VMs on them, not by widening a container.",
    "d": [
      "10 to 15 kW rack budget, air-cooled.",
      "This slat is interchangeable. That is the point.",
      "The panel diagram is the same server to pod stack.",
      "Do not put etcd here."
    ],
    "diagram": "server-drill"
  },
  "gpu-slat": {
    "n": "GPU slat (H100 class)",
    "p": "metal",
    "w": "A dense tray: GPUs, NVLink, a CPU complex that exists to feed them, and a NIC that speaks IB or RoCE. The pod that lands here is a train or a heavy infer, not the newsfeed worker.",
    "y": "Same virtualization story, different thermal and fabric contract. Do not schedule this like a 1U CPU.",
    "d": [
      "NVLink inside. IB or RoCE east-west.",
      "Liquid first. Air is a backup story at this density.",
      "The panel diagram still applies: hypervisor, VM, kubelet, pod.",
      "Ranking train and infer share this slat class."
    ],
    "diagram": "server-drill"
  },
  "hypervisor": {
    "n": "Hypervisor (KVM)",
    "p": "ctrl",
    "w": "KVM on the slat. It carves VMs that the platform treats as Kubernetes nodes. The physical NIC is shared through a virtual switch, or given away through SR-IOV, or offloaded to a DPU.",
    "y": "Multi-tenancy starts here. If the hypervisor is a pet, the node pool is a lie.",
    "d": [
      "KVM is the default story. The contract is a VM that looks like a node.",
      "vswitch vs SR-IOV is a latency and isolation choice.",
      "A DPU can move vswitch and storage off the host CPUs.",
      "Live migration is a policy, not a right, on GPU slats."
    ]
  },
  "vm-node": {
    "n": "VM = Kubernetes node",
    "p": "ctrl",
    "w": "The VM is the node. kubelet, container runtime, and CNI live inside it. The golden-path 'worker node pool' is a bag of these VMs, not a bag of slats.",
    "y": "Autoscaling adds VMs (and maybe slats). It does not add magic. If the slat is full, the VM does not appear.",
    "d": [
      "kubelet talks to the API in the control-plane cell.",
      "The node has a budget: CPU, RAM, disk, NIC, and a failure domain.",
      "Taints and labels are how GPU slats stay GPU slats.",
      "This is the object the Cluster Autoscaler bargains for."
    ]
  },
  "pod": {
    "n": "Pod (namespaces + cgroups)",
    "p": "data",
    "w": "A pod is cgroups and namespaces on the node, plus a pause container and one or more app containers. It is not a VM. It is a scheduled slice of a VM that is already a slice of a slat.",
    "y": "If you think a pod 'is the server', you will overbook the slat and then you will page.",
    "d": [
      "Namespaces isolate the view. cgroups isolate the budget.",
      "The sandbox is only as strong as the runtime and the node.",
      "CNI gives the pod an address on the vswitch (or SR-IOV).",
      "The request that started on a thumb lands here."
    ]
  },
  "newsfeed-pod": {
    "n": "newsfeed-service:v1827",
    "p": "data",
    "w": "The same artifact Golden path ships. Image digest from the registry, manifest from platform-gitops, applied by Argo, running in this pod on a VM on a CPU slat in an AZ.",
    "y": "The whole poster exists so this process can answer the thumb. If you cannot follow the request to this box, the other tabs are fiction.",
    "d": [
      "Same image tag the golden path produced.",
      "Stateless worker. Horizontal. CPU row, not GPU.",
      "p99 the user feels is every hop above this, plus this process.",
      "Observe it from the other tabs. Power it from this one."
    ]
  },
  "e-rf": {
    "n": "RF hop (phone to tower)",
    "p": "photon",
    "w": "The handset to the RRU. Licensed LTE or 5G NR in air. The bytes are radio. They are not yet light.",
    "y": "People blame distance. On this hop, RF is essentially c. The number you feel is the scheduler.",
    "d": [
      "RF ≈ c. A city cell is microseconds of air.",
      "HARQ and the grant sit in the 1 to 10 ms.",
      "After the BBU the medium changes."
    ],
    "medium": "Licensed cellular radio (LTE / 5G NR) in air.",
    "speed": "≈ c in air. Not the floor you will feel.",
    "latency": "1–10 ms phone to tower (scheduling, not distance).",
    "bandwidth": "Tens to hundreds of Mbps per user, shared on the sector.",
    "owner": "Mobile network operator. The handset is the user's."
  },
  "e-wifi": {
    "n": "Wi-Fi hop (laptop to CPE)",
    "p": "photon",
    "w": "Unlicensed radio from the laptop to the CPE. Same physics as other RF: ≈ c, and contention dominates.",
    "y": "The laptop path has to join the glass story at the CPE. This hop is the join.",
    "d": [
      "RF ≈ c. Airtime and retries are the delay.",
      "The CPE is the media converter.",
      "After this, treat the path as wireline."
    ],
    "medium": "Unlicensed Wi-Fi (802.11) in air, then Ethernet to the CPE.",
    "speed": "≈ c in air, then a short copper jumper.",
    "latency": "Airtime and retries dominate. Distance does not.",
    "bandwidth": "Shared channel. Hundreds of Mbps typical in a home.",
    "owner": "The user owns the AP. The ISP owns the CPE behind it."
  },
  "e-backhaul": {
    "n": "Tower backhaul",
    "p": "photon",
    "w": "Fiber (sometimes microwave) from the BBU hut to the metro. After the BBU, the request is light on this lateral.",
    "y": "A tower without backhaul is a sculpture. This is the hop that puts the cell on the city's ring.",
    "d": [
      "Usually dark fiber or a leased wavelength.",
      "Light in fiber ~204,000 km/s, about 4.9 μs/km one-way.",
      "Microwave is the exception and the backup."
    ],
    "medium": "Single-mode fiber (or microwave) from the site to metro.",
    "speed": "~204,000 km/s in glass (≈2/3 c, n≈1.468).",
    "latency": "4.9 μs/km one-way of glass, plus the hut.",
    "bandwidth": "10/100G-class laterals are common.",
    "owner": "MNO or a dark-fiber lessor."
  }
});
