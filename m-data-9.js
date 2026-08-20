(function (D) {
  var A="https://www.arista.com/en/products/7060x6-series";
  var Nx="https://www.cisco.com/c/en/us/products/switches/nexus-9000-series-switches/index.html";
  var Sx="https://www.nvidia.com/en-us/networking/spectrumx/";
  var Bw="https://www.nvidia.com/en-us/data-center/technologies/blackwell-architecture/";
  var H1="https://www.nvidia.com/en-us/data-center/h100/";
  var Hg="https://www.nvidia.com/en-us/data-center/hgx/";
  var Nv="https://www.nvidia.com/en-us/data-center/nvlink/";
  var Er="https://www.ericsson.com/en/portfolio/networks/ericsson-radio-system";
  var ErR="https://www.ericsson.com/en/portfolio/networks/ericsson-radio-system/radio";
  var No="https://www.nokia.com/mobile-networks/ran/macro/radio-heads/";
  var NoB="https://www.nokia.com/mobile-networks/ran/macro/";
  var Co="https://ecatalog.corning.com/optical-communications/US/en/Fiber-Optic-Cable-Assemblies/Indoor-Cable-Assemblies/Two-Fiber-Indoor-Cable-Assemblies/Fiber-Optic-Jumper,-2-F,-LC-Duplex-to-LC-Duplex,-Zipcord-Cable,-Plenum,-2-0-mm-legs/p/fiber-optic-jumper-2-f-zipcord-lc-duplex-to-lc-duplex-plenum-2.0-mm";
  var Vw="https://www.vertiv.com/en-us/products-catalog/thermal-management/high-density-solutions/vertiv-coolchip-cdu/";
  var Cat="https://www.cat.com/en_US/products/new/power-systems/electric-power/diesel-generator-sets/1000028916.html";
  var Ci6="https://www.ciena.com/products/6500";
  var CiW="https://www.ciena.com/products/waveserver";
  var De="https://www.dell.com/en-us/shop/servers/sf/poweredge-datacenter-servers";
  var Hp="https://www.hpe.com/us/en/compute/hpe-proliant-compute.html";
  var Eq="https://www.equinix.com/product-solutions/colocation";
  var EqX="https://www.equinix.com/product-solutions/interconnection-services/cross-connects";
  var Up="https://www.vertiv.com/en-us/products-catalog/critical-power/uninterruptible-power-supplies-ups/liebert--exl-ups/";
  var gpu={
    latest:{n:"NVIDIA Blackwell",href:Bw},
    common:[{n:"NVIDIA H100 (Hopper)",href:H1}],
    see:[{n:"H100 product page",href:H1},{n:"Blackwell architecture",href:Bw}],
    buy:[{n:"NVIDIA HGX platform",href:Hg},{n:"NVIDIA NVLink",href:Nv}]
  };
  var cpu={
    latest:{n:"Dell PowerEdge rack servers",href:De},
    common:[{n:"HPE ProLiant Compute",href:Hp}],
    see:[{n:"Dell PowerEdge catalog",href:De},{n:"HPE ProLiant catalog",href:Hp}],
    buy:[{n:"Dell PowerEdge",href:De},{n:"HPE ProLiant",href:Hp}]
  };
  var tor={
    latest:{n:"Arista 7060X6 (800G)",href:A},
    common:[{n:"Cisco Nexus 9000",href:Nx},{n:"NVIDIA Spectrum-X",href:Sx}],
    see:[{n:"Arista 7060X6 series",href:A},{n:"Cisco Nexus 9000",href:Nx}],
    buy:[{n:"Arista 7060X6",href:A},{n:"Cisco Nexus 9000",href:Nx}]
  };
  var c={
    rru:{
      latest:{n:"Ericsson Radio System",href:Er},
      common:[{n:"Ericsson Radio",href:ErR},{n:"Nokia AirScale RRH",href:No}],
      see:[{n:"Ericsson Radio System",href:Er},{n:"Nokia AirScale radios",href:No}],
      buy:[{n:"Ericsson Radio System",href:Er}]
    },
    bbu:{
      latest:{n:"Ericsson Radio System",href:Er},
      common:[{n:"Nokia AirScale baseband",href:NoB}],
      see:[{n:"Ericsson Radio System",href:Er},{n:"Nokia AirScale baseband",href:NoB}]
    },
    xconnect:{
      latest:{n:"Corning SMF LC duplex jumper",href:Co},
      see:[{n:"Corning LC jumper catalog",href:Co}],
      buy:[{n:"Corning LC jumper",href:Co}]
    },
    tor:tor,
    "rack-gpu":gpu,
    "gpu-slat":gpu,
    "power-diesel":{
      latest:{n:"Cat C175-16 diesel genset",href:Cat},
      see:[{n:"Cat C175-16 product page",href:Cat}],
      buy:[{n:"Cat C175-16",href:Cat}]
    },
    "cooling-liquid":{
      latest:{n:"Vertiv CoolChip CDU",href:Vw},
      see:[{n:"Vertiv CoolChip CDU",href:Vw}],
      buy:[{n:"Vertiv CoolChip CDU",href:Vw}]
    },
    edfa:{
      latest:{n:"Ciena 6500 packet-optical",href:Ci6},
      common:[{n:"Ciena Waveserver",href:CiW}],
      see:[{n:"Ciena 6500",href:Ci6},{n:"Ciena Waveserver",href:CiW}]
    },
    server:cpu,
    "cpu-slat":cpu,
    "edge-pop":{
      see:[{n:"Equinix colocation",href:Eq}]
    },
    mmr:{
      see:[{n:"Equinix colocation",href:Eq},{n:"Equinix Cross Connects",href:EqX}]
    },
    "fabric-spine":tor,
    "power-ups":{
      latest:{n:"Vertiv Liebert EXL UPS",href:Up},
      see:[{n:"Liebert EXL UPS",href:Up}],
      buy:[{n:"Vertiv Liebert EXL",href:Up}]
    },
    "rack-cpu":cpu
  };
  Object.keys(c).forEach(function (k) { if (D[k]) Object.assign(D[k], c[k]); });
})(window.IDP_DATA);
