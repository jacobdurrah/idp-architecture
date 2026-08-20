(function (w) {
  var I="#2C2C2A",U="#5F5E5A",K="#3D3C38",P="#F1F0EB";
  var C="#185FA5",D="#0F6E56",N="#854F0B",H="#2A7AB0",Y="#C4A35A";
  var Cf="#F5F9FC",Df="#E8F5F0",Nf="#F8F1E3",Hf="#EAF3F9";
  function S(h,b){return '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 360 '+h+'" width="100%" style="max-width:360px;margin:8px 0 12px">'+b+"</svg>";}
  function R(x,y,w,h,rx,f,s,sw){return '<rect x="'+x+'" y="'+y+'" width="'+w+'" height="'+h+'" rx="'+(rx||4)+'" fill="'+f+'" stroke="'+s+'" stroke-width="'+(sw||1.4)+'"/>';}
  function T(x,y,s,c,t,a,b){return '<text x="'+x+'" y="'+y+'" text-anchor="'+(a||"middle")+'" font-size="'+s+'" font-weight="'+(b||"400")+'" fill="'+c+'">'+t+"</text>";}
  function L(x1,y1,x2,y2,s,w){return '<line x1="'+x1+'" y1="'+y1+'" x2="'+x2+'" y2="'+y2+'" stroke="'+s+'" stroke-width="'+(w||1.4)+'"/>';}
  function O(cx,cy,r,f,s){return '<circle cx="'+cx+'" cy="'+cy+'" r="'+r+'" fill="'+f+'" stroke="'+s+'" stroke-width="1.4"/>';}

  function serverDrill(){
    return "<h3>Server to pod</h3>"+S(292,
      R(8,8,344,42,6,P,K)+T(180,25,12,I,"Physical server","middle","700")+T(180,40,10,U,"NIC · CPUs · RAM · local NVMe")+
      L(180,50,180,62,K)+R(8,62,344,42,6,Cf,"#378ADD")+T(180,79,12,C,"Hypervisor (KVM)","middle","700")+T(180,94,10,U,"vswitch vs SR-IOV · SmartNIC / DPU")+
      L(180,104,180,116,C)+R(8,116,344,42,6,Cf,"#378ADD")+T(180,133,12,C,"VM = Kubernetes node","middle","700")+T(180,148,10,U,"kubelet · runtime · CNI")+
      L(180,158,180,170,D)+R(8,170,344,42,6,Df,"#1D9E75")+T(180,187,12,D,"Pod","middle","700")+T(180,202,10,U,"containers · namespaces + cgroups")+
      L(180,212,180,224,D)+R(8,224,344,42,6,Df,D,1.6)+T(180,241,12,D,"newsfeed-service:v1827","middle","700")+T(180,256,10,U,"same artifact Golden path ships")+
      T(180,282,10,U,"Worker node pool = these VMs on these slats"));
  }
  function rru(){
    return S(168,
      L(180,14,180,154,K,2)+O(180,18,5,K,K)+
      R(118,28,44,14,2,P,K)+R(198,28,44,14,2,P,K)+T(140,39,9,U,"ant")+T(220,39,9,U,"ant")+
      R(148,52,64,48,6,Nf,N)+T(180,72,11,N,"RRU","middle","700")+T(180,88,9,U,"RF · fiber")+
      L(162,100,150,132,H,1.6)+L(198,100,210,132,H,1.6)+T(180,148,10,U,"pigtail down the mast")+
      T(64,80,10,U,"wind")+T(300,80,10,U,"eCPRI"));
  }
  function bbu(){
    return S(168,
      R(28,20,304,128,8,P,K)+T(180,40,11,I,"hut / CO","middle","700")+
      R(52,52,256,36,4,Nf,N)+T(180,75,12,N,"BBU shelf","middle","700")+
      R(52,100,110,28,4,Hf,H)+T(107,118,10,H,"CPRI in","middle","700")+
      R(198,100,110,28,4,Cf,C)+T(253,118,10,C,"IP out","middle","700")+
      T(180,156,10,U,"clock · schedule · backhaul"));
  }
  function xconnect(){
    return S(156,
      R(28,24,88,108,4,P,K)+R(244,24,88,108,4,P,K)+
      T(72,48,10,I,"cage A","middle","700")+T(288,48,10,I,"cage B","middle","700")+
      R(44,62,56,8,1,U,U)+R(44,78,56,8,1,U,U)+R(260,62,56,8,1,U,U)+R(260,78,56,8,1,U,U)+
      '<path d="M100 82 C150 40 210 40 260 82" fill="none" stroke="'+Y+'" stroke-width="3"/>'+
      T(180,120,11,Y,"yellow jumper","middle","700")+T(180,148,10,U,"meters in the MMR"));
  }
  function tor(){
    return S(176,
      R(96,12,168,152,6,P,K)+R(108,24,144,22,3,Cf,C)+T(180,39,11,C,"ToR 1U","middle","700")+
      L(180,46,180,18,H,1.8)+T(180,16,9,H,"QSFP up")+
      R(112,56,136,14,2,Df,D)+R(112,76,136,14,2,Df,D)+R(112,96,136,14,2,Df,D)+R(112,116,136,14,2,Df,D)+
      T(180,142,10,U,"DAC to slats")+T(180,168,10,U,"first IP hop"));
  }
  function gpu(){
    return S(168,
      R(20,20,320,112,6,P,K)+T(180,40,11,I,"H100-class tray","middle","700")+
      R(36,52,36,48,3,Nf,N)+R(80,52,36,48,3,Nf,N)+R(124,52,36,48,3,Nf,N)+R(168,52,36,48,3,Nf,N)+
      R(212,52,36,48,3,Nf,N)+R(256,52,36,48,3,Nf,N)+R(300,52,28,48,3,Cf,C)+
      T(180,88,9,N,"GPU","middle","700")+T(314,80,8,C,"CPU")+
      L(36,112,328,112,H,2)+T(180,144,10,H,"NVLink · liquid QD")+
      T(180,160,10,U,"40 to 100 kW"));
  }
  function diesel(){
    return S(160,
      R(40,40,180,72,6,Nf,N)+T(130,70,12,N,"genset","middle","700")+T(130,88,10,U,"radiator · ATS")+
      R(236,56,84,56,6,P,K)+T(278,88,10,I,"day tank","middle","700")+
      R(88,20,36,20,2,K,K)+T(180,148,10,U,"pad outside the hall"));
  }
  function liquid(){
    return S(164,
      R(24,28,100,108,6,Hf,H)+T(74,70,11,H,"CDU","middle","700")+T(74,88,9,U,"pumps")+
      L(124,70,168,70,H,2.2)+L(124,92,168,92,C,2.2)+
      R(168,28,168,108,6,P,K)+R(184,44,136,20,2,Nf,N)+R(184,72,136,20,2,Nf,N)+R(184,100,136,20,2,Nf,N)+
      T(252,150,10,U,"manifold into the GPU row"));
  }
  function edfa(){
    return S(156,
      R(36,24,288,100,8,P,K)+T(180,44,11,I,"amp hut","middle","700")+
      R(68,58,224,40,4,Hf,H)+T(180,83,12,H,"EDFA","middle","700")+
      L(20,78,68,78,H,2)+L(292,78,340,78,H,2)+
      T(40,150,10,U,"λ in")+T(320,150,10,U,"λ out")+T(180,150,10,U,"80 to 100 km"));
  }
  function edge(){
    return S(160,
      R(20,20,320,116,8,P,K)+T(180,40,11,I,"hotel cage","middle","700")+
      R(40,56,72,60,4,Df,D)+R(124,56,72,60,4,Df,D)+R(208,56,72,60,4,Cf,C)+
      T(76,90,10,D,"cache","middle","700")+T(160,90,10,D,"CPU","middle","700")+T(244,90,10,C,"ToR","middle","700")+
      R(292,56,32,60,3,Y,Y)+T(180,152,10,U,"short PoP row"));
  }
  function mmr(){
    return S(150,
      R(16,20,328,108,6,P,K)+R(36,40,70,72,3,K,K)+R(145,40,70,72,3,K,K)+R(254,40,70,72,3,K,K)+
      '<path d="M106 70 H145" stroke="'+Y+'" stroke-width="2.4"/>'+
      '<path d="M215 90 H254" stroke="'+Y+'" stroke-width="2.4"/>'+
      T(180,142,10,U,"panels · work orders"));
  }
  function landing(){
    return S(150,
      R(0,100,360,20,0,Hf,H)+T(60,114,9,H,"beach")+
      R(200,28,128,80,6,P,K)+T(264,60,11,I,"CLS","middle","700")+T(264,78,9,U,"PFE · DC")+
      L(80,100,200,88,K,1.6)+T(180,142,10,U,"manhole to hut"));
  }
  function spine(){
    return S(150,
      R(40,24,280,88,6,Cf,C)+T(180,56,12,C,"spine","middle","700")+T(180,76,10,U,"QSFP · ECMP")+
      L(80,112,80,132,D)+L(180,112,180,132,D)+L(280,112,280,132,D)+
      T(180,144,10,U,"every leaf"));
  }
  function ups(){
    return S(148,
      R(28,28,140,80,6,Nf,N)+T(98,72,11,N,"batteries","middle","700")+
      R(192,28,140,80,6,P,K)+T(262,72,11,I,"inverter","middle","700")+
      T(180,136,10,U,"seconds, not hours"));
  }
  function cpurack(){
    return S(168,
      R(110,12,140,140,6,P,K)+R(122,24,116,16,2,Cf,C)+
      R(122,48,116,14,2,Df,D)+R(122,66,116,14,2,Df,D)+R(122,84,116,14,2,Df,D)+R(122,102,116,14,2,Df,D)+
      T(180,156,10,U,"1U slats · 10 to 15 kW"));
  }

  var m={
    "server-drill":serverDrill,
    "cutaway-rru":rru,
    "cutaway-bbu":bbu,
    "cutaway-xconnect":xconnect,
    "cutaway-tor":tor,
    "cutaway-gpu":gpu,
    "cutaway-diesel":diesel,
    "cutaway-liquid":liquid,
    "cutaway-edfa":edfa,
    "cutaway-edge":edge,
    "cutaway-mmr":mmr,
    "cutaway-landing":landing,
    "cutaway-spine":spine,
    "cutaway-ups":ups,
    "cutaway-cpurack":cpurack
  };
  w.IDP_CUTAWAYS=function(id){return m[id]?m[id]():"";};
})(window);
