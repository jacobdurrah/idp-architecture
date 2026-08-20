window.IDP_DATA = Object.assign(window.IDP_DATA || {}, {
  "overview": {
    "n": "How to read this map (metal)",
    "p": "step",
    "w": "This tab is the metal under the other four. The golden path's worker node is a VM on a slat in a rack in an AZ. Follow navy badges 1 through 13: thumb, tower, wireline, metro, long-haul, subsea, carrier hotel, EDGE, region, power and cooling, fabric, racks, server. p99 has a floor: 4.9 μs per km of glass.",
    "y": "Logical diagrams hide the floor. A 70 ms US RTT is not a Kubernetes problem. It is glass, amplifiers, and a path that is longer than the map. Staff review starts here when someone asks why the feed feels slow from another continent.",
    "d": [
      "Every hop is a transformation: radio to light to electrons to light.",
      "Graphite boxes are buildings and racks. Blue edges are photons in fiber. Teal is the data plane. Navy is control.",
      "Tap a box or a link. Edge panels carry medium, speed, latency, bandwidth, and owner.",
      "Click a server slat for the VM and pod stack. The pod is newsfeed-service:v1827."
    ]
  },
  "user-phone": {
    "n": "Phone (RF)",
    "p": "edge",
    "w": "A thumb hits the newsfeed. The handset turns the HTTP request into a radio burst on licensed LTE or 5G NR. The air is not the delay. The scheduler is.",
    "y": "This is where the request is born. If you start the story at the load balancer you have already skipped the hops users pay for.",
    "d": [
      "RF is essentially c. A kilometer of air is about 3 μs.",
      "The 1 to 10 ms you measure is TTI scheduling, HARQ, and the radio grant.",
      "After the BBU, the same bytes become light on fiber.",
      "The laptop path is a sibling, not a replacement. Same request, different first meter."
    ]
  },
  "user-laptop": {
    "n": "Laptop (Wi-Fi to CPE)",
    "p": "edge",
    "w": "The laptop speaks Wi-Fi to a customer-premises modem or ONT. From the CPE onward the path is glass, same as the phone after the tower.",
    "y": "Most staff laptops never touch cellular. The first hop is unlicensed radio, then a wall wart that is already an optical or DOCSIS client.",
    "d": [
      "Wi-Fi is still RF ≈ c. Contention and airtime dominate, not distance.",
      "The CPE is the media converter: electrons and radio become light or RF-on-coax.",
      "After the CPE, treat the path as the wireline row.",
      "Same HTTP request, same later hops, different access medium."
    ]
  },
  "cpe": {
    "n": "CPE (ONT / cable modem)",
    "p": "infra",
    "w": "The customer-premises equipment terminates the last drop. An ONT speaks GPON or XGS-PON. A cable modem speaks DOCSIS. Both hand frames to the access plant toward the central office.",
    "y": "Without a CPE there is no wireline story. The laptop's Wi-Fi dies at this box. The rest of the poster is photons and colo.",
    "d": [
      "ONT: fiber to the home, then Ethernet to the laptop.",
      "DOCSIS: coax plant, then the same Ethernet handoff.",
      "This box is an ISP asset on the user's power and drywall.",
      "From here the request is serialized onto glass or coax toward the OLT or CMTS."
    ]
  },
  "tower": {
    "n": "Cell tower / small cell",
    "p": "metal",
    "w": "A steel or rooftop site. Radios face the handset. Fiber faces the rest of the planet. This is the first building that is not in the user's pocket.",
    "y": "Coverage is a real-estate problem. The tower is leased ground, power, and a backhaul lateral, not a cloud region.",
    "d": [
      "Macro sites and small cells share the same split: RF out, light in.",
      "Power and grounding are first-class. A dark tower is a dark cell.",
      "Backhaul is usually dark fiber or microwave to the metro.",
      "Badge 2 sits here because bytes become light at this site."
    ]
  },
  "rru": {
    "n": "RRU (remote radio unit)",
    "p": "infra",
    "w": "The remote radio unit sits in the wind, on the mast, next to the antennas. It turns baseband samples into RF and back. CPRI or eCPRI carries those samples down to the BBU.",
    "y": "You put the RF as close to the antenna as you can. Cable loss at radio frequencies is why the RRU is not in the hut.",
    "d": [
      "Mast-mounted. Weather, lightning, and a hoist are the ops model.",
      "eCPRI can ride Ethernet and Ethernet can ride fiber.",
      "The air interface ends here. Below this, it is a transport problem.",
      "A failed RRU is a sector outage, not a Kubernetes event."
    ]
  },
  "bbu": {
    "n": "BBU (baseband unit)",
    "p": "infra",
    "w": "The baseband unit sits in the hut or a nearby CO. It runs the MAC and PHY schedule, terminates the radio grant, and emits IP packets onto the backhaul. This is where the request becomes a packet on glass.",
    "y": "Scheduling lives here. The 1 to 10 ms phone-to-tower number is mostly this box, not the speed of radio.",
    "d": [
      "Bytes become light on the far side of the BBU.",
      "vRAN can move this function into a nearby EDGE hall. The physics do not change.",
      "Clock sync (PTP / GPS) is a real dependency.",
      "After this hop, treat the path as fiber."
    ]
  },
  "gpon": {
    "n": "GPON / DOCSIS access plant",
    "p": "infra",
    "w": "The last-mile plant. GPON and XGS-PON share a feeder fiber with splitters. DOCSIS shares a coax tree. Both concentrate many homes onto one OLT or CMTS port at the central office.",
    "y": "Access is a shared medium with a budget. Contention here is not a pod problem.",
    "d": [
      "XGS-PON is 10G-class. Classic GPON is 2.5G down.",
      "DOCSIS 3.1 and 4.0 push gigabit on coax that already exists.",
      "Splitters are passive. The OLT holds the intelligence.",
      "Serialization at 1G for a 1500-byte packet is about 12 μs. Then propagation is distance."
    ]
  },
  "olt": {
    "n": "OLT / CMTS at the CO",
    "p": "infra",
    "w": "The optical line terminal (or CMTS) lives in a central office. It terminates thousands of ONTs or modems and hands IP up to the metro aggregation router.",
    "y": "This is the first telco building that looks like a small data hall: DC power, transmission bays, and a meet-me toward metro fiber.",
    "d": [
      "CO, not a cloud AZ. Different union, different keys, different fire code.",
      "Uplink is usually 100G-class toward the metro ring.",
      "The OLT is the last hop that still knows about PON grants.",
      "From here the packet is just an IP frame on metro glass."
    ]
  },
  "metro-ring": {
    "n": "Metro fiber ring",
    "p": "photon",
    "w": "A ring (or a mesh that pretends to be a ring) around the city. Aggregation sites sit on it. One cut should not isolate a CO. Latency around a metro is 1 to 2 ms.",
    "y": "Metro is where last-mile access becomes a city. If the ring is thin, every later number is a lie.",
    "d": [
      "1 to 2 ms typical around a metro.",
      "Light in fiber is ~204,000 km/s, about 4.9 μs/km one-way.",
      "A 40 km ring is ~200 μs of glass. The rest is nodes.",
      "Protection switching is why it is a ring and not a spur."
    ]
  },
  "agg-router": {
    "n": "Aggregation router",
    "p": "infra",
    "w": "The first IP hop that has seen more than one access node. It folds OLT and BBU backhaul into fewer wavelengths toward the metro core.",
    "y": "You do not run a full-table core at every CO. Aggregation is how you keep the core small and the access dumb.",
    "d": [
      "PE or leaf, depending on who sold it.",
      "Holds access VRFs and QoS that the radio and PON already marked.",
      "Uplink is DWDM-colored or grey 100/400G.",
      "Failure domain is a slice of the city, not a rack."
    ]
  }
});
