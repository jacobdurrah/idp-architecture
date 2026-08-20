(function(D){
var k8s="https://kubernetes.io/",k8sR="https://kubernetes.io/releases/";
var eks="https://aws.amazon.com/eks/",gke="https://cloud.google.com/kubernetes-engine";
var aks="https://azure.microsoft.com/en-us/products/kubernetes-service";
var ocp="https://www.redhat.com/en/technologies/cloud-computing/openshift";
var gw="https://gateway-api.sigs.k8s.io/",ngx="https://kubernetes.github.io/ingress-nginx/";
var env="https://www.envoyproxy.io/",trf="https://traefik.io/";
var kong="https://konghq.com/products/kong-gateway";
var alb="https://kubernetes-sigs.github.io/aws-load-balancer-controller/";
var ist="https://istio.io/",amb="https://istio.io/latest/docs/ambient/overview/";
var ctr="https://projectcontour.io/",cil="https://cilium.io/";
var cilG="https://github.com/cilium/cilium",cal="https://docs.tigera.io/calico/latest/about/";
var svc="https://kubernetes.io/docs/concepts/services-networking/service/";
var kpx="https://kubernetes.io/docs/reference/networking/virtual-ips/";
var lnk="https://linkerd.io/",dns="https://coredns.io/";
var val="https://valkey.io/",red="https://redis.io/";
var kaf="https://kafka.apache.org/",kst="https://kafka.apache.org/documentation/streams/";
var con="https://www.confluent.io/",pg="https://www.postgresql.org/";
var otel="https://opentelemetry.io/",prom="https://prometheus.io/",gra="https://grafana.com/";
var hpa="https://kubernetes.io/docs/tasks/run-application/horizontal-pod-autoscale/";
var ca="https://github.com/kubernetes/autoscaler";
var nvl="https://www.nvidia.com/en-us/data-center/nvlink/";
var h100="https://www.nvidia.com/en-us/data-center/h100/",hgx="https://www.nvidia.com/en-us/data-center/hgx/";
var mlb="https://metallb.io/",hap="https://www.haproxy.org/";
var elb="https://aws.amazon.com/elasticloadbalancing/";
var minio="https://min.io/",ceph="https://ceph.io/",s3="https://aws.amazon.com/s3/";
var os="https://opensearch.org/",es="https://www.elastic.co/elasticsearch";
var sm="https://spring.io/projects/spring-modulith",sb="https://spring.io/projects/spring-boot";
var rail="https://rubyonrails.org/",nest="https://nestjs.com/";
var nats="https://nats.io/",rmq="https://www.rabbitmq.com/",axon="https://www.axoniq.io/";
var flink="https://flink.apache.org/",air="https://airflow.apache.org/";
var kn="https://knative.dev/",lam="https://aws.amazon.com/lambda/",ofa="https://www.openfaas.com/";
var kyv="https://kyverno.io/",opa="https://www.openpolicyagent.org/";
var ext="https://kubernetes.io/docs/concepts/extend-kubernetes/";
function L(n,h){return {n:n,href:h}}
var clouds=[L("Amazon EKS",eks),L("Google GKE",gke),L("Azure AKS",aks),L("Red Hat OpenShift",ocp)];
var ing={latest:L("Gateway API",gw),common:[L("ingress-nginx",ngx),L("Envoy",env),L("Traefik",trf),L("Kong Gateway",kong)],see:[L("AWS Load Balancer Controller",alb),L("Istio",ist),L("Contour",ctr)],buy:[L("AWS Load Balancer Controller",alb)],project:L("Gateway API",gw)};
var cilL={latest:L("Cilium",cil),common:[L("Calico",cal)],project:L("Cilium",cil)};
var cilP={latest:L("Cilium",cil),common:[L("kube-proxy iptables / IPVS",kpx)],project:L("Cilium",cilG)};
var redL={latest:L("Valkey",val),common:[L("Redis",red)],project:L("Valkey",val)};
var kafL={latest:L("Apache Kafka",kaf),common:[L("Confluent",con)],project:L("Apache Kafka",kaf)};
var sqlL={latest:L("PostgreSQL",pg),project:L("PostgreSQL",pg)};
var otelL={latest:L("OpenTelemetry",otel),common:[L("Prometheus",prom),L("Grafana",gra)],project:L("OpenTelemetry",otel)};
var lbL={latest:L("MetalLB",mlb),common:[L("HAProxy",hap),L("AWS Elastic Load Balancing",elb)],buy:[L("AWS Elastic Load Balancing",elb)],project:L("MetalLB",mlb)};
var objL={latest:L("MinIO",minio),common:[L("Ceph",ceph),L("Amazon S3",s3)],buy:[L("Amazon S3",s3)],project:L("MinIO",minio)};
var seaL={latest:L("OpenSearch",os),common:[L("Elasticsearch",es)],project:L("OpenSearch",os)};
var c={
"st-mono":{latest:L("Spring Modulith",sm),common:[L("Ruby on Rails",rail),L("NestJS",nest)],project:L("Spring Modulith",sm)},
"st-layer":{latest:L("Spring Boot",sb),common:[L("Ruby on Rails",rail)],project:L("Spring Boot",sb)},
"st-micro":{w:"Most microservices today are an OCI image, run as a container, scheduled as a Kubernetes Pod, on a Node that is a VM (or bare metal). That is the default. Not a mystery.",y:"Team ownership and independent deploy. Cost is the fan-out and the contract. The hop is still image, container, Pod, Node.",d:["App builds to an OCI image (Docker / containerd). The image runs as a container.","Kubernetes schedules it as a Pod behind a Service. The Pod sits on a Node: usually a VM (EKS, GKE, or AKS), sometimes bare metal.","Front door is L7 ingress / Gateway API. East-west is ClusterIP or a mesh.","Five repos. PR #4821 ships one image. Argo syncs one Deployment. The pod is newsfeed-service:v1827.","Amazon ECS / Fargate is the other common non-k8s path. It is the exception, not the default."],example:"newsfeed-service:v1827 is an image, then a container, then a Pod on a VM node. Five repos. PR #4821 ships one image. Argo syncs one Deployment.",whyPick:"Team ownership. Each hop scales on its own. The setup is still container, Kubernetes Pod, Node that is a VM.",latest:L("Kubernetes",k8s),common:clouds,buy:clouds,project:L("Kubernetes",k8sR)},
"st-event":{latest:L("NATS",nats),common:[L("Apache Kafka",kaf),L("RabbitMQ",rmq)],project:L("Apache Kafka",kaf)},
"st-cqrs":{latest:L("Axon Framework",axon),common:[L("PostgreSQL",pg),L("Redis",red),L("Valkey",val)],project:L("Axon Framework",axon)},
"st-pipe":{latest:L("Apache Flink",flink),common:[L("Kafka Streams",kst),L("Apache Airflow",air)],project:L("Apache Flink",flink)},
"st-lambda":{latest:L("Knative",kn),common:[L("AWS Lambda",lam),L("OpenFaaS",ofa)],buy:[L("AWS Lambda",lam)],project:L("Knative",kn)},
"st-kernel":{latest:L("Kyverno",kyv),common:[L("Open Policy Agent",opa),L("Kubernetes extension points",ext),L("Envoy",env)],project:L("Kyverno",kyv)},
"ys-ingress":Object.assign({w:"Most used in-cluster is ingress-nginx. Current direction is Gateway API, often with Envoy. Also common: Traefik, Kong, AWS Load Balancer Controller / ALB, Istio, Contour.",y:"Services should not each invent a front door. Name the controller. Open Plane for when to pick the hop.",d:["Most used: ingress-nginx.","Current direction: Gateway API, often fronted by Envoy.","Also common: Traefik, Kong Gateway, AWS Load Balancer Controller / ALB, Istio ingress, Contour.","CPU and TLS dominate before raw packet PPS."]},ing),
"ys-lb":lbL,
"ys-kubeproxy":cilP,
"ys-cni":cilL,
"ys-svc":{latest:L("Kubernetes Service",svc),project:L("Kubernetes Service docs",svc)},
"ys-mesh":{latest:L("Istio ambient",amb),common:[L("Istio sidecar",ist),L("Linkerd",lnk)],project:L("Istio",ist)},
"ys-dns":{latest:L("CoreDNS",dns),project:L("CoreDNS",dns)},
"ys-redis":redL,
"ys-kafka":kafL,
"ys-obj":objL,
"ys-sql":sqlL,
"ys-search":seaL,
"ys-hpa":{latest:L("Horizontal Pod Autoscaler",hpa),project:L("HPA docs",hpa)},
"ys-ca":{latest:L("Cluster Autoscaler",ca),project:L("kubernetes/autoscaler",ca)},
"ys-nvlink":{latest:L("NVIDIA NVLink",nvl),common:[L("NVIDIA H100 (Hopper)",h100)],see:[L("NVIDIA HGX platform",hgx),L("NVIDIA NVLink",nvl)]},
"ys-otel":otelL
};
Object.keys(c).forEach(function(k){if(D[k])Object.assign(D[k],c[k]);});
})(window.IDP_DATA);
