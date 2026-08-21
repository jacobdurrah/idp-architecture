(function(D){
function L(n,h){return{n:n,href:h}}
function T(n,why,parts){return{n:n,why:why,parts:parts}}
function put(t,ks){ks.forEach(function(k){if(D[k])D[k].together=t})}
var ngx=L("ingress-nginx","https://kubernetes.github.io/ingress-nginx/");
var gw=L("Gateway API","https://gateway-api.sigs.k8s.io/"),env=L("Envoy","https://www.envoyproxy.io/");
var cm=L("cert-manager","https://cert-manager.io/");
var kaf=L("Apache Kafka","https://kafka.apache.org/"),kst=L("Kafka Streams","https://kafka.apache.org/documentation/streams/");
var otel=L("OpenTelemetry","https://opentelemetry.io/"),prom=L("Prometheus","https://prometheus.io/"),gra=L("Grafana","https://grafana.com/");
var ist=L("Istio","https://istio.io/"),cil=L("Cilium","https://cilium.io/");
var hpa=L("Horizontal Pod Autoscaler","https://kubernetes.io/docs/tasks/run-application/horizontal-pod-autoscale/");
var ca=L("Cluster Autoscaler","https://github.com/kubernetes/autoscaler");
var nlb=L("AWS NLB","https://aws.amazon.com/elasticloadbalancing/");
put(T("Gateway API + Envoy","One front door. nginx + cert-manager is the still-most-used twin. Gateway API + Envoy is the current direction.",[gw,env,ngx,cm]),["p-ingress"]);
put(T("Kafka + Kafka Streams","One log, many consumers. Flink swaps in when the job is a long-running stream. Confluent is the sold cluster.",[kaf,kst]),["p-kafka"]);
put(T("OpenTelemetry + Prometheus + Grafana","One SDK, scrape or remote-write, one dashboard. Tempo or Loki join when you want traces or logs in the same Grafana.",[otel,prom,gra]),["p-otel"]);
put(T("Istio + Envoy","Sidecar or ambient. Linkerd is the other common pair (Linkerd + its proxy).",[ist,env]),["p-mesh"]);
put(T("Cilium eBPF (replaces kube-proxy)","One dataplane. Do not also run kube-proxy. Calico is the other common CNI, not a combo with Cilium.",[cil]),["p-cni","p-kubeproxy"]);
put(T("HPA + Cluster Autoscaler","HPA adds pods. CA adds nodes a few minutes later. One without the other stalls.",[hpa,ca]),["p-hpa","p-ca"]);
put(T("AWS NLB + ingress-nginx","L4 VIP in front of L7. MetalLB + ingress-nginx on prem. Do not skip a layer and call it a design.",[nlb,ngx]),["p-lb"]);
})(window.IDP_DATA);
