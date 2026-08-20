window.IDP_DATA = Object.assign(window.IDP_DATA || {}, {
  "bgp": {
    "n": "BGP (at the hotel)",
    "p": "ctrl",
    "w": "The control plane of interconnection. eBGP sessions over cross-connects and over the IX fabric. This is where prefixes, MED, and communities decide which way the request leaves the building.",
    "y": "A bad announcement in this hall is a continental event. The data plane is innocent.",
    "d": [
      "Sessions are per-neighbor, over a VLAN or a dedicated jumper.",
      "RPKI and IRR are how you keep a typo from becoming a hijack.",
      "The session is control. The packets still ride the jumper or the IX fabric.",
      "Anycast for the EDGE PoP is a BGP announcement from this same room."
    ]
  },
  "colo": {
    "n": "Colo (power, cooling, remote hands)",
    "p": "metal",
    "w": "The hotel as a landlord: A/B power, chilled water or CRAH, and a remote-hands desk that will reseat a cable at 03:00. Your cage is a tenant. The building is the plant.",
    "y": "Compute in a hotel is still compute. It dies without power and cooling, and you cannot SSH either of those.",
    "d": [
      "A/B feeds. Know which PDU is which before the truck rolls.",
      "Remote hands are a queue, not an SRE.",
      "Cooling tonnage is the real capacity limit, not floor tile.",
      "The EDGE row next door buys this product."
    ]
  },
  "edge-pop": {
    "n": "EDGE cloud / CDN PoP",
    "p": "edge",
    "w": "A small compute and cache footprint inside the hotel or a nearby hall. TLS terminates here. The cache hopes the object is already on disk. Anycast brought the user to this city.",
    "y": "This is the first place the request may be answered without crossing a region. If the feed is cacheable, the region never sees the byte.",
    "d": [
      "Sits in the hotel so it can peer richly and terminate close to the user.",
      "Not a full AZ. A handful of racks, a cache, and a tight failure domain.",
      "Misses go to the region on the next hop.",
      "The EDGE badge on the poster is this box."
    ]
  },
  "anycast": {
    "n": "Anycast + TLS",
    "p": "ctrl",
    "w": "The same service address is announced from many PoPs. BGP plus RTT plus health steer the user to a nearby EDGE. TLS is done on the box that won.",
    "y": "Without anycast, every user pins to one building. With it, a PoP can drain by withdrawing a route.",
    "d": [
      "The user does not pick the PoP. The routing system does.",
      "TLS keys live at the edge. Treat that as a real secret blast radius.",
      "A withdraw is a failover. A bad health check is a stampede.",
      "Cache hit ratio is the only reason this hop is cheap."
    ]
  },
  "region": {
    "n": "Region (metro of 3+ AZs)",
    "p": "infra",
    "w": "A cloud region is a metro: three or more availability zones, each one or more data-center buildings, tied by the provider's dark fiber. It is not a single address.",
    "y": "People say 'us-east-1' as if it were a room. It is a set of buildings and a fiber ring with a product name.",
    "d": [
      "Three AZs is the usual contract for a regional control plane.",
      "Inter-AZ is dark fiber, under 2 ms RTT.",
      "Inter-region rides the provider private backbone, not the public internet, for east-west.",
      "Your VPC drawing sits on this metal."
    ]
  },
  "az": {
    "n": "Availability zone",
    "p": "metal",
    "w": "One AZ is one or more data-center buildings with independent power and cooling from its neighbors. It is a failure domain you can name, not a rack.",
    "y": "This is the unit you spread across. Two replicas in one AZ are one flood plain.",
    "d": [
      "Independent utility feeds and generators, by design.",
      "A building can be an AZ. A campus of buildings can be an AZ.",
      "Control-plane nodes and etcd members belong in separate AZs.",
      "The worker pool for newsfeed-service lives in these buildings."
    ]
  },
  "interaz": {
    "n": "Inter-AZ dark fiber",
    "p": "photon",
    "w": "Provider-owned dark fiber between AZs in the same metro. Budget is under 2 ms RTT. This is why a regional database sync is plausible and a cross-region one is not.",
    "y": "Synchronous replication has a physics budget. Inter-AZ is inside it. Inter-region is not.",
    "d": [
      "AZ to AZ <2 ms RTT.",
      "Dark fiber: the provider lights it. You do not see the wavelengths.",
      "Distance is metro, not long-haul, but the path still is not a straight line.",
      "A metro cut that hits two AZ laterals is the nightmare scenario."
    ]
  },
  "backbone": {
    "n": "Provider private backbone",
    "p": "photon",
    "w": "Inter-region traffic between the provider's own buildings rides a private optical backbone, not the public internet. Cross-US is still about 60 to 70 ms RTT. Transatlantic is still 65 to 75 ms.",
    "y": "Private does not mean faster than glass. It means more control over peering, QoS, and who else is on the fiber.",
    "d": [
      "Same 4.9 μs/km floor. Private is not a wormhole.",
      "Cross-US ~60 to 70 ms RTT. Transatlantic ~65 to 75 ms RTT.",
      "This is the path behind 'multi-region active/active' slides.",
      "Encryption in transit is a policy. Latency is physics."
    ]
  },
  "dc": {
    "n": "Data center (cutaway)",
    "p": "metal",
    "w": "A building whose job is to keep silicon in spec: power, cooling, and a network that reaches a hotel. Everything the other tabs call a cluster lives on this floor.",
    "y": "If you cannot draw power and cooling, you do not have a platform. You have a slide.",
    "d": [
      "Power chain on the left of this row. Cooling on the right.",
      "The network fabric and the racks sit on the next rows.",
      "N+1, 2N, and A/B are the words that decide whether a fault is an incident.",
      "Staff should walk one of these before arguing about pod density."
    ]
  },
  "power-utility": {
    "n": "Utility, transformers, switchgear",
    "p": "infra",
    "w": "Medium-voltage utility service, on-site transformers, and switchgear that make the building's AC bus. This is the first box in the power chain. Everything downstream is a customer of this hop.",
    "y": "A utility sag is a building event. The UPS exists because this hop is not clean.",
    "d": [
      "Two utility feeds if you are lucky and the street allows it.",
      "Transformers are a lead-time item measured in months.",
      "Switchgear is the last place a human can isolate a hall.",
      "This is not software. The runbook is a lockout tag."
    ]
  },
  "power-ups": {
    "n": "UPS",
    "p": "infra",
    "w": "Uninterruptible power: batteries or a rotary, plus inverters. It rides through the seconds while diesel cranks. It does not ride through an hour.",
    "y": "The UPS is a bridge, not a generator. Treat battery runtime as a measured number, not a hope.",
    "d": [
      "Seconds to a few minutes, by design.",
      "N+1 or 2N UPS blocks. Know which halls share a block.",
      "A failed inverter is a step load onto the remaining side.",
      "Downstream is the PDU and the busway, not the rack yet."
    ]
  },
  "power-diesel": {
    "n": "Diesel generators",
    "p": "infra",
    "w": "On-site generators that hold the building when the utility does not. Fuel, air, and a test schedule. Start time is why the UPS exists.",
    "y": "A generator that has not been tested under load is a statue. Compliance is a monthly crank, not a PDF.",
    "d": [
      "Fuel logistics are the long outage. 24 to 72 hours on site is common.",
      "N+1 or 2N. A, B, and the leftover.",
      "Emissions and neighbors are real constraints on how long you can run.",
      "ATS (automatic transfer) is the control plane of this hop."
    ]
  }
});
