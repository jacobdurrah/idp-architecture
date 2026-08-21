(function(D){
function L(n,h){return{n:n,href:h}}
function T(n,why,parts){return{n:n,why:why,parts:parts}}
function put(t,ks){ks.forEach(function(k){if(D[k])D[k].together=t})}
var k8s=L("Kubernetes","https://kubernetes.io/"),eks=L("Amazon EKS","https://aws.amazon.com/eks/");
var argo=L("Argo CD","https://argo-cd.readthedocs.io/en/stable/");
var ctr=L("containerd","https://containerd.io/"),sb=L("Spring Boot","https://spring.io/projects/spring-boot");
var red=L("Redis","https://redis.io/"),pg=L("PostgreSQL","https://www.postgresql.org/");
var sm=L("Spring Modulith","https://spring.io/projects/spring-modulith");
var kaf=L("Apache Kafka","https://kafka.apache.org/"),kst=L("Kafka Streams","https://kafka.apache.org/documentation/streams/");
var flink=L("Apache Flink","https://flink.apache.org/");
var lam=L("AWS Lambda","https://aws.amazon.com/lambda/"),gwapi=L("Amazon API Gateway","https://aws.amazon.com/api-gateway/");
var kyv=L("Kyverno","https://kyverno.io/"),opa=L("Open Policy Agent","https://www.openpolicyagent.org/");
var gw=L("Gateway API","https://gateway-api.sigs.k8s.io/"),env=L("Envoy","https://www.envoyproxy.io/");
var egw=L("Envoy Gateway","https://gateway.envoyproxy.io/");
var cm=L("cert-manager","https://cert-manager.io/");
var otel=L("OpenTelemetry","https://opentelemetry.io/"),prom=L("Prometheus","https://prometheus.io/"),gra=L("Grafana","https://grafana.com/");
var ist=L("Istio","https://istio.io/"),cil=L("Cilium","https://cilium.io/");
var hpa=L("Horizontal Pod Autoscaler","https://kubernetes.io/docs/tasks/run-application/horizontal-pod-autoscale/");
var ca=L("Cluster Autoscaler","https://github.com/kubernetes/autoscaler");
var nlb=L("AWS NLB","https://aws.amazon.com/elasticloadbalancing/");
put(T("containerd + Kubernetes + EKS + Gateway API + Argo CD","Image, container, Pod on a VM node, Gateway API front door, GitOps. ingress-nginx was the old front door. Retired March 2026.",[ctr,k8s,eks,gw,argo]),["st-micro"]);
put(T("Gateway API + Spring Boot + Redis + Postgres","GET /feed walks that hop. Cache on the read. Writes stay on the primary.",[gw,sb,red,pg]),["st-layer"]);
put(T("Spring Modulith + Postgres + Redis","One deployable. Modules in-process. Cache in front of one primary.",[sm,pg,red]),["st-mono"]);
put(T("Postgres + Redis + Kafka","Write the command to Postgres, project the feed to Redis, fan-out on Kafka. Axon is optional when you want a framework on that shape.",[pg,red,kaf]),["st-cqrs"]);
put(T("Kafka + Kafka Streams","One log, many consumers. Flink swaps in when the job is a long-running stream. Confluent is the sold cluster.",[kaf,kst]),["st-event","ys-kafka"]);
put(T("Kafka + Flink","Ingest on the log, transform in Flink. Airflow is the batch twin, not the hot path.",[kaf,flink]),["st-pipe"]);
put(T("AWS Lambda + Amazon API Gateway","Idle-to-spike. Not the hot GET /feed path.",[lam,gwapi]),["st-lambda"]);
put(T("Kubernetes + Kyverno + OPA","Core plus admission plugins. Kyverno is the usual YAML path. OPA when the policy is Rego.",[k8s,kyv,opa]),["st-kernel"]);
put(T("Gateway API + Envoy Gateway + cert-manager","One front door. Envoy Gateway is the maintained controller. ingress-nginx was the most-used Ingress controller; Kubernetes retired it March 2026.",[gw,egw,cm]),["ys-ingress"]);
put(T("OpenTelemetry + Prometheus + Grafana","One SDK, scrape or remote-write, one dashboard. Tempo or Loki join when you want traces or logs in the same Grafana.",[otel,prom,gra]),["ys-otel"]);
put(T("Istio + Envoy","Sidecar or ambient. Linkerd is the other common pair (Linkerd + its proxy).",[ist,env]),["ys-mesh"]);
put(T("Cilium eBPF (replaces kube-proxy)","One dataplane. Do not also run kube-proxy. Calico is the other common CNI, not a combo with Cilium.",[cil]),["ys-cni","ys-kubeproxy"]);
put(T("HPA + Cluster Autoscaler","HPA adds pods. CA adds nodes a few minutes later. One without the other stalls.",[hpa,ca]),["ys-hpa","ys-ca"]);
put(T("AWS NLB + Gateway API","L4 VIP in front of L7. MetalLB + Gateway API on prem. Do not pair a new cluster with retired ingress-nginx.",[nlb,gw]),["ys-lb"]);
if(D["st-micro"]&&D["st-micro"].d)D["st-micro"].d.push("Usual combo is containerd + Kubernetes + EKS + Gateway API + Argo CD.");
if(D["ys-ingress"]&&D["ys-ingress"].d)D["ys-ingress"].d.push("Usual combo is Gateway API + Envoy Gateway + cert-manager. Legacy clusters may still have ingress-nginx; it is retired as of March 2026.");
})(window.IDP_DATA);
