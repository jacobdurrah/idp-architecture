window.IDP_DATA = Object.assign(window.IDP_DATA || {}, {
  "metro-core": {
    "n": "Metro core",
    "p": "infra",
    "w": "A handful of sites that hold the city's default route toward long-haul and toward the carrier hotels. Full-ish tables. This is where DWDM stops being optional.",
    "y": "If every packet to another city hairpins through one building, that building is a blast radius with a street address.",
    "d": [
      "Usually two to four buildings, not twelve.",
      "Peers into hotels and into the long-haul ROADM layer.",
      "DWDM starts in earnest on the far side.",
      "Staff should know which two buildings those are."
    ]
  },
  "dwdm": {
    "n": "DWDM (dense wavelength division)",
    "p": "photon",
    "w": "One fiber pair carries many colors. About 96 or more channels, each a 400G-class wavelength, on a pair. ROADMs switch colors without lighting the packet layer.",
    "y": "Fiber is scarce. Colors are how you multiply a right of way. Without DWDM, long-haul is a truck roll and a new trench.",
    "d": [
      "~96+ channels × 400G-class per λ per fiber pair.",
      "A pair is two strands. Capacity is quoted on pairs, not on a single strand.",
      "ROADM sites are huts and hotels, not Kubernetes nodes.",
      "The latency floor is still 4.9 μs/km of glass. Colors do not go faster."
    ]
  },
  "longhaul": {
    "n": "Long-haul terrestrial",
    "p": "photon",
    "w": "Intercity glass in a right of way: rail, highway, pipeline. The path is longer than the map. NYC to Chicago is about 1,200 km of fiber for ~9 ms one-way, not the great-circle distance.",
    "y": "p99 between regions is this path plus the amplifiers on it. You cannot kubectl your way around a railroad.",
    "d": [
      "Right of way follows someone else's trench.",
      "NYC to Chicago ~9 ms one-way on ~1,200 km of fiber.",
      "Cross-US ~60 to 70 ms RTT.",
      "Diverse paths matter. Two wavelengths in one conduit are one backhoe."
    ]
  },
  "edfa": {
    "n": "EDFA (erbium-doped fiber amplifier)",
    "p": "infra",
    "w": "Every 80 to 100 km an erbium-doped amplifier boosts the wavelengths without converting them to packets. Huts, power, and a padlock. No IP address you will ever ping.",
    "y": "Glass eats light. Without EDFAs the long-haul row is a dark line on a slide.",
    "d": [
      "Spacing: 80 to 100 km terrestrial.",
      "Optical, not electrical regeneration, on modern routes.",
      "Each hut is power, HVAC, and a generator or a very long battery.",
      "A failed amplifier is a color outage across a state."
    ]
  },
  "subsea": {
    "n": "Subsea cable",
    "p": "photon",
    "w": "A few fibers in a steel and tar package, laid on the seabed. Repeaters every 60 to 80 km, powered at about 10 kV DC from the shore. Transatlantic RTT is about 65 to 75 ms.",
    "y": "Oceans do not have trucks. A cut is a splice ship and a calendar, not a ticket.",
    "d": [
      "Repeaters 60 to 80 km. Shore power ~10 kV DC.",
      "Transatlantic ~65 to 75 ms RTT.",
      "Capacity is DWDM on a handful of fiber pairs.",
      "The route is not a straight line. It avoids trawl grounds and other cables."
    ]
  },
  "landing": {
    "n": "Cable landing station",
    "p": "metal",
    "w": "The beach manhole and the building behind it. High-voltage DC plant for the repeaters, power feed equipment, and a backhaul lateral to the nearest carrier hotel or metro core.",
    "y": "You do not land a cable in a cloud region. You land it in a hardened hut, then you buy glass to a hotel.",
    "d": [
      "PFE (power feed equipment) is the interesting kit.",
      "Beach manhole, then a duct into the station.",
      "From here it is terrestrial again: laterals toward hotels.",
      "Permitting and a beach are the long pole, not the transceiver."
    ]
  },
  "hotel": {
    "n": "Carrier hotel",
    "p": "metal",
    "w": "A building whose product is interconnection. 60 Hudson in New York, 350 East Cermak in Chicago, One Wilshire in Los Angeles. Meet-me rooms, carrier cages, an IXP, and colo halls under one roof.",
    "y": "This is where networks meet without digging a street. If your packet changes providers, it often does it in a building like this.",
    "d": [
      "Not a cloud region. A real-estate and cross-connect business.",
      "Tenants bring their own routers. The building sells power, cooling, and copper or fiber jumpers.",
      "A fire or a flood here is a multi-provider event.",
      "The EDGE PoP in the next row often sits in this same hall."
    ]
  },
  "mmr": {
    "n": "Meet-me room (MMR)",
    "p": "metal",
    "w": "The room where the building's interconnects are documented and pulled. Carriers, clouds, and enterprises meet on a panel, not on the public internet.",
    "y": "Without an MMR you are running patch cords across a loading dock. The MMR is how a hotel stays a hotel.",
    "d": [
      "Every cross-connect is a work order and a monthly bill.",
      "Physical access is badged and escorted. This is not a self-serve VPC console.",
      "The MMR is a blast radius. Treat it like a spine.",
      "Photos of the panel are a security incident."
    ]
  },
  "xconnect": {
    "n": "Cross-connect (yellow jumper)",
    "p": "photon",
    "w": "A short fiber or copper jumper, often drawn yellow, between two tenants. Meters, not kilometers. The latency is serialization plus a walk across a cage, not 4.9 μs/km.",
    "y": "This is the cheapest interconnect you will ever buy, and the one with the most politics. A missing jumper is an outage that looks like BGP.",
    "d": [
      "Single-mode fiber jumper, or occasionally DAC / coaxial for older meets.",
      "Delivery is remote hands and a ticket, measured in hours to days.",
      "Diverse MMRs and diverse cages are how you avoid a single panel.",
      "The yellow on the poster is the jumper, not a logical peering session."
    ]
  },
  "cage": {
    "n": "Carrier cage",
    "p": "metal",
    "w": "A locked footprint. A carrier or a cloud parks routers, optical gear, and a staff badge policy. Power and cooling are building services. The routers are the tenant's.",
    "y": "Peering is a conversation between cages, not between logos on a slide. Someone has to rack the box.",
    "d": [
      "Cages are failure domains with keys.",
      "Remote hands can swap a transceiver. They cannot debug your IGP.",
      "Hot and cold aisle still apply. Density is lower than a GPU hall.",
      "The same building may hold a dozen competitors."
    ]
  },
  "ixp": {
    "n": "IXP and route servers",
    "p": "ctrl",
    "w": "An Internet exchange: a shared layer-2 fabric and a pair of route servers. Members peer over the fabric. The route server is a convenience, not a requirement. Many still run bilateral BGP.",
    "y": "Public peering is how you skip transit for a slice of traffic. The IXP is a switch and a policy, sitting in this hotel.",
    "d": [
      "Route servers simplify multilateral peering. They do not forward packets.",
      "The forwarding path is member-to-member on the IX fabric.",
      "Port speed is 100G-class and climbing.",
      "An IX outage is a traffic shift onto transit, not a dark user."
    ]
  }
});
