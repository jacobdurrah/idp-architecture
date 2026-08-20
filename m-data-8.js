(function (D) {
  var c = {
    rru: {
      look: "A weatherproof box bolted to the mast, next to the antennas. Fins, a fiber pigtail down the tower, and RF jumpers a few meters long.",
      job: "Turn baseband samples into RF and back. The air interface ends at this box.",
      whyShape: "RF cable loss is brutal. You put the radio next to the antenna and send light down the mast, not coax.",
      diagram: "cutaway-rru"
    },
    bbu: {
      look: "A 19-inch shelf in a hut or CO. Front-to-back airflow, CPRI or eCPRI ports, and a GPS or PTP clock feed.",
      job: "Run the MAC and PHY schedule, terminate the radio grant, and emit IP onto the backhaul.",
      whyShape: "The schedule is compute, not RF. Keep it indoors with power, clock, and a fiber plant.",
      diagram: "cutaway-bbu"
    },
    xconnect: {
      look: "A yellow single-mode jumper, a few meters, dressed on a panel between two cages. LC or MPO on each end.",
      job: "Physically join two tenants so packets never touch the public internet.",
      whyShape: "Meters of glass beat a street trench. The politics are the work order, not the fiber.",
      diagram: "cutaway-xconnect"
    },
    tor: {
      look: "A 1U switch on the top RU of the rack. Down-facing DAC ports, QSFP cages toward the spine.",
      job: "Be the server's first IP hop. Down to NICs, up to the Clos.",
      whyShape: "Short copper stays in the rack. Optics start at the uplink. One box, one failure domain.",
      diagram: "cutaway-tor"
    },
    "rack-gpu": {
      look: "A dense tray: a row of H100-class GPUs, NVLink bridges, a CPU complex that feeds them, and liquid quick-disconnects on the manifold.",
      job: "Train and heavy infer. The newsfeed worker does not live here.",
      whyShape: "Power and heat force a short, fat tray. Air cannot move 40 to 100 kW at a temperature the silicon will accept.",
      diagram: "cutaway-gpu"
    },
    "gpu-slat": {
      look: "A dense tray: a row of H100-class GPUs, NVLink bridges, a CPU complex that feeds them, and liquid quick-disconnects on the manifold.",
      job: "Train and heavy infer. The newsfeed worker does not live here.",
      whyShape: "Power and heat force a short, fat tray. Air cannot move 40 to 100 kW at a temperature the silicon will accept.",
      diagram: "cutaway-gpu"
    },
    "power-diesel": {
      look: "Skid-mounted gensets outside the hall. Radiators, exhaust stacks, a day tank, and an ATS cabinet on the wall.",
      job: "Hold the building when the utility does not. The UPS only covers the crank.",
      whyShape: "Diesel is energy density you can store on a pad. A battery that lasts 72 hours is a warehouse.",
      diagram: "cutaway-diesel"
    },
    "cooling-liquid": {
      look: "A CDU cabinet at the end of the row. Manifolds, drip trays, and hoses with quick-disconnects into each GPU rack.",
      job: "Move heat from chip to facility water. Air is a backup story at this density.",
      whyShape: "Water carries heat that air cannot. The plant sits at row scale so a leak stays a row incident.",
      diagram: "cutaway-liquid"
    },
    edfa: {
      look: "A 1U or 2U shelf in a hut. Pump lasers, an erbium coil you never see, and SC or LC ports in and out.",
      job: "Boost every wavelength on the pair without turning them into packets.",
      whyShape: "Glass eats light. An optical amp every 80 to 100 km is cheaper than electrical regen and has no IP address.",
      diagram: "cutaway-edfa"
    },
    server: {
      look: "A 1U slat: dual sockets, DIMM rows, a few NVMe bays, dual PSUs, and a NIC that faces the ToR on DAC.",
      job: "Be the machine. VMs, kubelets, and pods are slices of this box.",
      whyShape: "1U is the unit you can swap, air-cool, and pack 40-high in a rack. Density without a liquid plant.",
      diagram: "server-drill"
    },
    "cpu-slat": {
      look: "A 1U slat: dual sockets, DIMM rows, a few NVMe bays, dual PSUs, and a NIC that faces the ToR on DAC.",
      job: "Be the machine. VMs, kubelets, and pods are slices of this box.",
      whyShape: "1U is the unit you can swap, air-cool, and pack 40-high in a rack. Density without a liquid plant.",
      diagram: "server-drill"
    },
    "edge-pop": {
      look: "A short row in a hotel cage: a few CPU racks, a cache, a pair of ToRs, and a cross-connect back to the MMR.",
      job: "Terminate TLS and hope the object is already on disk. Anycast brought the user to this city.",
      whyShape: "Small on purpose. A handful of racks next to rich peering beats a full AZ a metro away.",
      diagram: "cutaway-edge"
    },
    mmr: {
      look: "A locked room of vertical panels. Hundreds of labeled ports, a ladder rack of yellow and orange jumpers, and a work-order printer.",
      job: "Document and pull every interconnect in the building.",
      whyShape: "One room, one inventory. Cross-connects that wander the loading dock are how hotels stop being hotels.",
      diagram: "cutaway-mmr"
    },
    landing: {
      look: "A hardened hut behind the beach manhole. PFE racks, high-voltage DC bus, and a terrestrial backhaul bay.",
      job: "Power the wet repeaters and hand the colors to metro glass.",
      whyShape: "You land a cable where the beach and the permits are, then you buy a lateral. Not a cloud region.",
      diagram: "cutaway-landing"
    },
    "fabric-spine": {
      look: "A row of modular chassis or pizza boxes in the network cage. Fat QSFP uplinks from every leaf. No servers in this rack.",
      job: "Forward east-west. Every leaf reaches every leaf in a bounded number of hops.",
      whyShape: "A Clos spine is all ports and no payload. Keep it dense and boring so the leaves can be the edge.",
      diagram: "cutaway-spine"
    },
    "power-ups": {
      look: "Battery strings or a rotary, plus inverter cabinets in a power room. Thick DC bus bars, not a rack of servers.",
      job: "Ride through the seconds while diesel cranks. It does not ride through an hour.",
      whyShape: "The UPS is a bridge. Batteries are energy for minutes, sitting next to the switchgear, not in the white space.",
      diagram: "cutaway-ups"
    },
    "rack-cpu": {
      look: "A standard 42U rack of 1U and 2U slats, A/B whips, a ToR on top, and cold-aisle faces.",
      job: "Host the stateless worker pool. VMs on these slats become kubelets.",
      whyShape: "Air and 10 to 15 kW are enough. This is the row you can clone when the platform needs more workers.",
      diagram: "cutaway-cpurack"
    }
  };
  Object.keys(c).forEach(function (k) { if (D[k]) Object.assign(D[k], c[k]); });
})(window.IDP_DATA);
