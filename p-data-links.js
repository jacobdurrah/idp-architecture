(function (D) {
  var cil="https://cilium.io/";
  var cilG="https://github.com/cilium/cilium";
  var cal="https://docs.tigera.io/calico/latest/about/";
  var k8sR="https://kubernetes.io/releases/";
  var k8sG="https://github.com/kubernetes/kubernetes/releases";
  var svc="https://kubernetes.io/docs/concepts/services-networking/service/";
  var kpx="https://kubernetes.io/docs/reference/networking/virtual-ips/";
  var gw="https://gateway-api.sigs.k8s.io/";
  var ngx="https://kubernetes.github.io/ingress-nginx/";
  var env="https://www.envoyproxy.io/";
  var ist="https://istio.io/";
  var amb="https://istio.io/latest/docs/ambient/overview/";
  var lnk="https://linkerd.io/";
  var dns="https://coredns.io/";
  var val="https://valkey.io/";
  var red="https://redis.io/";
  var kaf="https://kafka.apache.org/";
  var con="https://www.confluent.io/";
  var pg="https://www.postgresql.org/";
  var otel="https://opentelemetry.io/";
  var prom="https://prometheus.io/";
  var gra="https://grafana.com/";
  var hpa="https://kubernetes.io/docs/tasks/run-application/horizontal-pod-autoscale/";
  var ca="https://github.com/kubernetes/autoscaler";
  var nvl="https://www.nvidia.com/en-us/data-center/nvlink/";
  var h100="https://www.nvidia.com/en-us/data-center/h100/";
  var hgx="https://www.nvidia.com/en-us/data-center/hgx/";
  var c={
    "p-ingress":{
      latest:{n:"Gateway API",href:gw},
      common:[{n:"ingress-nginx",href:ngx},{n:"Envoy",href:env}],
      project:{n:"Gateway API",href:gw}
    },
    "p-kubeproxy":{
      latest:{n:"Cilium 1.20.0",href:cil},
      common:[{n:"kube-proxy iptables / IPVS",href:kpx}],
      project:{n:"Cilium",href:cilG}
    },
    "p-cni":{
      latest:{n:"Cilium 1.20.0",href:cil},
      common:[{n:"Calico",href:cal}],
      project:{n:"Cilium",href:cil}
    },
    "p-svc":{
      latest:{n:"Kubernetes Service",href:svc},
      project:{n:"Kubernetes Service docs",href:svc}
    },
    "p-mesh":{
      latest:{n:"Istio ambient",href:amb},
      common:[{n:"Istio sidecar",href:ist},{n:"Linkerd",href:lnk}],
      project:{n:"Istio",href:ist}
    },
    "p-dns":{
      latest:{n:"CoreDNS",href:dns},
      project:{n:"CoreDNS",href:dns}
    },
    "p-redis":{
      latest:{n:"Valkey",href:val},
      common:[{n:"Redis",href:red}],
      project:{n:"Valkey",href:val}
    },
    "p-kafka":{
      latest:{n:"Apache Kafka",href:kaf},
      common:[{n:"Confluent",href:con}],
      project:{n:"Apache Kafka",href:kaf}
    },
    "p-sql":{
      latest:{n:"PostgreSQL",href:pg},
      project:{n:"PostgreSQL",href:pg}
    },
    "p-hpa":{
      latest:{n:"Horizontal Pod Autoscaler",href:hpa},
      project:{n:"HPA docs",href:hpa}
    },
    "p-ca":{
      latest:{n:"Cluster Autoscaler",href:ca},
      project:{n:"kubernetes/autoscaler",href:ca}
    },
    "p-nvlink":{
      latest:{n:"NVIDIA NVLink",href:nvl},
      common:[{n:"NVIDIA H100 (Hopper)",href:h100}],
      see:[{n:"NVIDIA HGX platform",href:hgx},{n:"NVIDIA NVLink",href:nvl}]
    },
    "p-otel":{
      latest:{n:"OpenTelemetry",href:otel},
      common:[{n:"Prometheus",href:prom},{n:"Grafana",href:gra}],
      project:{n:"OpenTelemetry",href:otel}
    }
  };
  Object.keys(c).forEach(function (k) { if (D[k]) Object.assign(D[k], c[k]); });
})(window.IDP_DATA);
