window.IDP_DATA = Object.assign(window.IDP_DATA || {}, {
  "e-tor-spine": {
    "n": "ToR to spine to ToR",
    "p": "photon",
    "w": "Inside the building Clos. East-west between racks. ECMP over 100/400G. This is the hop your service mesh cannot optimize away.",
    "y": "If two pods in the same AZ are slow, look here before you look at Go channels.",
    "d": [
      "ToR→spine→ToR 5–50 μs.",
      "1500-byte packet ~120 ns to serialize at 100G.",
      "ECMP on 5-tuple. One flow, one path."
    ],
    "medium": "DAC / AOC in-rack, then single-mode or AOC up the Clos.",
    "speed": "Electrical on DAC, then light on the uplink.",
    "latency": "5–50 μs ToR to spine to ToR.",
    "bandwidth": "100/400G QSFP up. Server NICs 25/100G typical.",
    "owner": "The cloud or colo network team."
  },
  "e-dac": {
    "n": "In-rack DAC",
    "p": "photon",
    "w": "Twinax copper from the server NIC to the ToR. A meter or two. 1 to 5 μs. This is the last electrical hop before most designs go optical again.",
    "y": "A cheap cable is a real outage class. Label both ends.",
    "d": [
      "In-rack 1–5 μs.",
      "DAC is copper. AOC is light in the same form factor.",
      "Do not drape it through a hinge and then act surprised."
    ],
    "medium": "Passive twinax DAC (or AOC) inside the rack.",
    "speed": "Electrical (DAC) over one to three meters.",
    "latency": "1–5 μs in-rack.",
    "bandwidth": "25/100G common to the ToR.",
    "owner": "The rack owner. Often the same team as the slat."
  },
  "e-nvlink": {
    "n": "NVLink (GPU to GPU)",
    "p": "photon",
    "w": "Inside the node, GPU to GPU. Hundreds of nanoseconds at about 900 GB/s. This is not Ethernet and it is not a CNI plugin.",
    "y": "If the train is waiting on AllReduce, this hop and the IB/RoCE hop next to it are the floor.",
    "d": [
      "GPU↔GPU ~100s of ns at ~900 GB/s.",
      "NVLink is inside the tray. IB/RoCE is between trays.",
      "You cannot peer this with a ToR and a hope."
    ],
    "medium": "NVLink copper/organic inside the GPU complex.",
    "speed": "~900 GB/s class, hop latency in hundreds of ns.",
    "latency": "~100s of ns GPU to GPU.",
    "bandwidth": "~900 GB/s NVLink. Not a 400G QSFP.",
    "owner": "The GPU node BOM. NVIDIA's interconnect, in this telling."
  },
  "step1": {
    "n": "1. Phone / laptop",
    "p": "step",
    "w": "The request is born on a thumb or a trackpad. RF first, glass later.",
    "y": "The numbered badges are the request, top to bottom. Follow them when a review starts with 'why is this slow'.",
    "d": [
      "Tap the badge or the footer chip.",
      "Each step is a transformation of medium or of building.",
      "The floor under p99 is 4.9 μs per km of glass."
    ]
  },
  "step2": {
    "n": "2. Tower",
    "p": "step",
    "w": "RRU and BBU. Bytes become light. Scheduling is the 1 to 10 ms.",
    "y": "The numbered badges are the request, top to bottom. Follow them when a review starts with 'why is this slow'.",
    "d": [
      "Tap the badge or the footer chip.",
      "Each step is a transformation of medium or of building.",
      "The floor under p99 is 4.9 μs per km of glass."
    ]
  },
  "step3": {
    "n": "3. Wireline",
    "p": "step",
    "w": "CPE to GPON or DOCSIS to the OLT or CMTS at the CO.",
    "y": "The numbered badges are the request, top to bottom. Follow them when a review starts with 'why is this slow'.",
    "d": [
      "Tap the badge or the footer chip.",
      "Each step is a transformation of medium or of building.",
      "The floor under p99 is 4.9 μs per km of glass."
    ]
  },
  "step4": {
    "n": "4. Metro",
    "p": "step",
    "w": "Ring, aggregation, metro core. DWDM starts. 1 to 2 ms.",
    "y": "The numbered badges are the request, top to bottom. Follow them when a review starts with 'why is this slow'.",
    "d": [
      "Tap the badge or the footer chip.",
      "Each step is a transformation of medium or of building.",
      "The floor under p99 is 4.9 μs per km of glass."
    ]
  },
  "step5": {
    "n": "5. Long-haul",
    "p": "step",
    "w": "Right of way plus EDFA every 80 to 100 km. Path longer than the map.",
    "y": "The numbered badges are the request, top to bottom. Follow them when a review starts with 'why is this slow'.",
    "d": [
      "Tap the badge or the footer chip.",
      "Each step is a transformation of medium or of building.",
      "The floor under p99 is 4.9 μs per km of glass."
    ]
  },
  "step6": {
    "n": "6. Subsea",
    "p": "step",
    "w": "Repeaters 60 to 80 km, ~10 kV DC. Landing station, then terrestrial again.",
    "y": "The numbered badges are the request, top to bottom. Follow them when a review starts with 'why is this slow'.",
    "d": [
      "Tap the badge or the footer chip.",
      "Each step is a transformation of medium or of building.",
      "The floor under p99 is 4.9 μs per km of glass."
    ]
  },
  "step7": {
    "n": "7. Carrier hotel",
    "p": "step",
    "w": "MMR, yellow jumper, cages, IXP, BGP, colo. 60 Hudson, Cermak, One Wilshire.",
    "y": "The numbered badges are the request, top to bottom. Follow them when a review starts with 'why is this slow'.",
    "d": [
      "Tap the badge or the footer chip.",
      "Each step is a transformation of medium or of building.",
      "The floor under p99 is 4.9 μs per km of glass."
    ]
  },
  "step8": {
    "n": "8. EDGE PoP",
    "p": "step",
    "w": "Anycast, TLS, cache, inside the hotel. A hit never meets the region.",
    "y": "The numbered badges are the request, top to bottom. Follow them when a review starts with 'why is this slow'.",
    "d": [
      "Tap the badge or the footer chip.",
      "Each step is a transformation of medium or of building.",
      "The floor under p99 is 4.9 μs per km of glass."
    ]
  },
  "step9": {
    "n": "9. Region / AZ",
    "p": "step",
    "w": "A metro of 3+ AZs. Inter-AZ <2 ms RTT. Inter-region on the private backbone.",
    "y": "The numbered badges are the request, top to bottom. Follow them when a review starts with 'why is this slow'.",
    "d": [
      "Tap the badge or the footer chip.",
      "Each step is a transformation of medium or of building.",
      "The floor under p99 is 4.9 μs per km of glass."
    ]
  },
  "step10": {
    "n": "10. Power and cooling",
    "p": "step",
    "w": "Utility to UPS to diesel to PDU, beside CRAH and liquid.",
    "y": "The numbered badges are the request, top to bottom. Follow them when a review starts with 'why is this slow'.",
    "d": [
      "Tap the badge or the footer chip.",
      "Each step is a transformation of medium or of building.",
      "The floor under p99 is 4.9 μs per km of glass."
    ]
  },
  "step11": {
    "n": "11. Fabric",
    "p": "step",
    "w": "Border, spine-leaf Clos, ToR. ECMP. BGP in the DC.",
    "y": "The numbered badges are the request, top to bottom. Follow them when a review starts with 'why is this slow'.",
    "d": [
      "Tap the badge or the footer chip.",
      "Each step is a transformation of medium or of building.",
      "The floor under p99 is 4.9 μs per km of glass."
    ]
  },
  "step12": {
    "n": "12. Racks",
    "p": "step",
    "w": "CPU, memory, storage, GPU, TPU, control cell. Drawn as racks.",
    "y": "The numbered badges are the request, top to bottom. Follow them when a review starts with 'why is this slow'.",
    "d": [
      "Tap the badge or the footer chip.",
      "Each step is a transformation of medium or of building.",
      "The floor under p99 is 4.9 μs per km of glass."
    ]
  }
});
