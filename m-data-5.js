window.IDP_DATA = Object.assign(window.IDP_DATA || {}, {
  "e-gpon": {
    "n": "GPON / DOCSIS drop",
    "p": "photon",
    "w": "CPE to OLT or CMTS. Shared access plant. Serialization at 1G for a 1500-byte packet is about 12 μs. Then propagation is distance.",
    "y": "Last-mile is a shared medium with a budget. It is not a VPC subnet.",
    "d": [
      "GPON / XGS-PON on fiber, or DOCSIS on coax.",
      "1500-byte packet ~12 μs to serialize at 1G, ~120 ns at 100G.",
      "Then 4.9 μs/km if the drop is glass."
    ],
    "medium": "PON fiber with splitters, or coax (DOCSIS).",
    "speed": "~204,000 km/s on the fiber drop. Coax is slower and shorter.",
    "latency": "Serialization plus a short plant. Metro has not started.",
    "bandwidth": "GPON 2.5G down, XGS-PON 10G-class, shared per splitter.",
    "owner": "The access ISP."
  },
  "e-metro": {
    "n": "Metro ring hop",
    "p": "photon",
    "w": "Around the city on the ring. Aggregation to metro core. DWDM may already be coloring the pair.",
    "y": "This is the 1 to 2 ms most 'local' calls actually pay.",
    "d": [
      "Metro ring 1–2 ms.",
      "4.9 μs/km of glass. A 40 km ring is ~200 μs of light.",
      "The rest is routers and protection switch."
    ],
    "medium": "Metro dark fiber or DWDM, often a ring.",
    "speed": "~204,000 km/s (≈2/3 c, n≈1.468).",
    "latency": "1–2 ms typical around a metro.",
    "bandwidth": "100/400G-class, many colors if DWDM is up.",
    "owner": "Metro carrier or the access ISP's transport arm."
  },
  "e-longhaul": {
    "n": "Long-haul terrestrial hop",
    "p": "photon",
    "w": "Intercity glass in a rail, highway, or pipeline right of way. EDFA every 80 to 100 km. The path is longer than the map.",
    "y": "NYC to Chicago is ~9 ms one-way because the fiber is ~1,200 km, not because BGP is shy.",
    "d": [
      "NYC↔Chicago ~9 ms one-way (fiber path ~1,200 km).",
      "Cross-US ~60–70 ms RTT.",
      "EDFA every 80–100 km."
    ],
    "medium": "DWDM on terrestrial fiber in a shared right of way.",
    "speed": "~204,000 km/s. Colors do not go faster.",
    "latency": "4.9 μs/km one-way. NYC to Chicago ~9 ms. Cross-US ~60–70 ms RTT.",
    "bandwidth": "~96+ channels × 400G-class per λ per fiber pair.",
    "owner": "Long-haul carrier. The RoW is often a railroad or a pipeline."
  },
  "e-subsea": {
    "n": "Subsea hop",
    "p": "photon",
    "w": "Wet glass. Repeaters every 60 to 80 km, powered at about 10 kV DC from the landing station. Transatlantic RTT is 65 to 75 ms.",
    "y": "There is no alternative medium. Satellites are a different poster and a worse number.",
    "d": [
      "Repeaters 60–80 km, shore ~10 kV DC.",
      "Transatlantic ~65–75 ms RTT.",
      "A cut is a ship, not a ticket."
    ],
    "medium": "Armored subsea fiber, optically amplified.",
    "speed": "~204,000 km/s in the fiber, in a cable that is not a straight line.",
    "latency": "Transatlantic ~65–75 ms RTT. Floor is still 4.9 μs/km.",
    "bandwidth": "DWDM on a handful of pairs. 400G-class per λ.",
    "owner": "Cable consortium. Landing parties on each shore."
  },
  "e-crossconnect": {
    "n": "Cross-connect jumper",
    "p": "photon",
    "w": "A yellow jumper in the MMR. Meters of fiber or copper between two cages. Politics measured in weeks. Light measured in nanoseconds.",
    "y": "This is the hop people call 'peering' when they mean 'a person pulled a cable'.",
    "d": [
      "Meters, not kilometers. Propagation is noise.",
      "Serialization at 100G for 1500 bytes is ~120 ns.",
      "Delivery is remote hands."
    ],
    "medium": "Single-mode fiber jumper (sometimes copper) in the MMR.",
    "speed": "~204,000 km/s over a few meters. Treat as zero.",
    "latency": "Serialization plus a patch panel. Not 4.9 μs/km in any way that matters.",
    "bandwidth": "1/10/100/400G, whatever both cages agreed to light.",
    "owner": "The hotel sells the jumper. Each tenant owns a side."
  },
  "e-pni": {
    "n": "PNI (private network interconnect)",
    "p": "photon",
    "w": "A dedicated interconnect between two networks, usually in this hotel, usually on a cross-connect plus a bilateral BGP session. Not the IX fabric.",
    "y": "When traffic is large and steady, PNI is cheaper and cleaner than IX ports or transit.",
    "d": [
      "Bilateral, not multilateral.",
      "Same jumper physics as e-crossconnect, plus a session.",
      "Used between clouds, CDNs, and carriers."
    ],
    "medium": "Dedicated fiber jumper (PNI) in a hotel or a campus.",
    "speed": "~204,000 km/s over meters.",
    "latency": "Hotel-local. Serialization at 100G is ~120 ns per frame.",
    "bandwidth": "100/400G-class ports, often several in a bundle.",
    "owner": "The two networks. The hotel bills the cross-connect."
  },
  "e-pop-region": {
    "n": "EDGE PoP to region",
    "p": "photon",
    "w": "Cache miss. The PoP fetches from origin in the region on provider or carrier glass. This may be metro (1 to 2 ms) or long-haul if the origin is in another city.",
    "y": "A miss turns an EDGE win into a regional RTT. Hit ratio is the only reason the EDGE row exists.",
    "d": [
      "Metro if origin is in-city: 1–2 ms.",
      "Otherwise the long-haul numbers apply.",
      "TLS may already be done at the PoP."
    ],
    "medium": "Metro or long-haul fiber from the hotel toward the AZ campus.",
    "speed": "~204,000 km/s (≈2/3 c, n≈1.468).",
    "latency": "Metro 1–2 ms, or the long-haul floor if origin is far.",
    "bandwidth": "100/400G-class, often a PNI into the cloud.",
    "owner": "CDN or cloud EDGE team, plus the transport provider."
  },
  "e-interaz": {
    "n": "Inter-AZ hop",
    "p": "photon",
    "w": "Dark fiber between AZs in the same metro. The budget is under 2 ms RTT. Synchronous replication lives or dies on this number.",
    "y": "If your 'AZ diversity' path is actually inter-region, you will find out during the first failover.",
    "d": [
      "AZ↔AZ <2 ms RTT.",
      "4.9 μs/km on a metro path.",
      "Provider dark fiber, not the public internet."
    ],
    "medium": "Provider-owned dark fiber in the metro.",
    "speed": "~204,000 km/s.",
    "latency": "AZ↔AZ <2 ms RTT.",
    "bandwidth": "Multi-Tb/s campuses. You see a quota, not the pair.",
    "owner": "The cloud provider."
  },
  "e-interregion": {
    "n": "Inter-region backbone hop",
    "p": "photon",
    "w": "Provider private backbone between regions. Cross-US ~60 to 70 ms RTT. Transatlantic ~65 to 75 ms RTT. Private is not a wormhole.",
    "y": "Active/active across regions is a physics statement. The floor is glass.",
    "d": [
      "Cross-US ~60–70 ms RTT.",
      "Transatlantic ~65–75 ms RTT.",
      "NYC↔Chicago ~9 ms one-way if those are the regions."
    ],
    "medium": "Provider private DWDM backbone.",
    "speed": "~204,000 km/s. Same n≈1.468.",
    "latency": "Cross-US ~60–70 ms RTT. Transatlantic ~65–75 ms RTT.",
    "bandwidth": "~96+ channels × 400G-class per λ per pair, times many pairs.",
    "owner": "The cloud provider's transport org."
  }
});
