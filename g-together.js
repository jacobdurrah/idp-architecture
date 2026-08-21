(function(D){
function L(n,h){return{n:n,href:h}}
function T(n,why,parts){return{n:n,why:why,parts:parts}}
function put(t,ks){ks.forEach(function(k){if(D[k])D[k].together=t})}
var gha=L("GitHub Actions","https://docs.github.com/en/actions"),esl=L("ESLint","https://eslint.org/");
var jest=L("Jest","https://jestjs.io/"),cql=L("CodeQL","https://codeql.github.com/"),trivy=L("Trivy","https://trivy.dev/");
var tc=L("Testcontainers","https://testcontainers.com/"),pact=L("Pact","https://pact.io/");
var pw=L("Playwright","https://playwright.dev/"),kind=L("Kind","https://kind.sigs.k8s.io/");
var k8s=L("Kubernetes","https://kubernetes.io/"),kyv=L("Kyverno","https://kyverno.io/"),opa=L("Open Policy Agent","https://www.openpolicyagent.org/");
var gh=L("GitHub","https://github.com/"),argo=L("Argo CD","https://argo-cd.readthedocs.io/en/stable/");
var gw=L("Gateway API","https://gateway-api.sigs.k8s.io/"),env=L("Envoy","https://www.envoyproxy.io/");
var egw=L("Envoy Gateway","https://gateway.envoyproxy.io/");
var cm=L("cert-manager","https://cert-manager.io/");
var otel=L("OpenTelemetry","https://opentelemetry.io/"),prom=L("Prometheus","https://prometheus.io/"),gra=L("Grafana","https://grafana.com/");
var tp=L("Grafana Tempo","https://github.com/grafana/tempo"),lk=L("Grafana Loki","https://github.com/grafana/loki");
var kaf=L("Apache Kafka","https://kafka.apache.org/"),kst=L("Kafka Streams","https://kafka.apache.org/documentation/streams/");
var hpa=L("Horizontal Pod Autoscaler","https://kubernetes.io/docs/tasks/run-application/horizontal-pod-autoscale/");
var ca=L("Cluster Autoscaler","https://github.com/kubernetes/autoscaler");
var nlb=L("AWS NLB","https://aws.amazon.com/elasticloadbalancing/");
var db=L("Docker Build","https://docs.docker.com/build/"),hbr=L("Harbor","https://goharbor.io/"),ecr=L("Amazon ECR","https://aws.amazon.com/ecr/");
var am=L("Alertmanager","https://prometheus.io/docs/alerting/latest/alertmanager/"),pd=L("PagerDuty","https://www.pagerduty.com/");
var vpc=L("Amazon VPC","https://aws.amazon.com/vpc/"),eks=L("Amazon EKS","https://aws.amazon.com/eks/");
put(T("GitHub Actions + ESLint + Jest + CodeQL + Trivy","One required check set on the PR. Language linters swap (Ruff, golangci-lint) but the shape stays.",[gha,esl,jest,cql,trivy]),["ci","cicd","gate-lint","gate-static","gate-type","gate-compile","gate-unit","gate-security","gate-deps","step2"]);
put(T("Testcontainers + Pact + Playwright + Kind","Real Postgres Redis Kafka in CI, contract against app-users, browser on GET /feed, cluster when the API server is the fixture. LocalStack only if the suite needs AWS APIs.",[tc,pact,pw,kind]),["step3","coordinator","workers","results"]);
put(T("GitHub + Argo CD + Kubernetes","PR merges, Argo syncs the Deployment. CI does not talk to the cluster.",[gh,argo,k8s]),["git","argocd","repo-manifests","bump","repo-app","step6","step8"]);
put(T("Kubernetes + Kyverno + OPA","Core plus admission plugins. Kyverno is the usual YAML path. OPA when the policy is Rego.",[k8s,kyv,opa]),["gate-policy"]);
put(T("Gateway API + Envoy Gateway + cert-manager","One front door. Envoy Gateway is the maintained controller. ingress-nginx was the most-used Ingress controller; Kubernetes retired it March 2026.",[gw,egw,cm]),["ingress"]);
put(T("OpenTelemetry + Prometheus + Grafana","One SDK, scrape or remote-write, one dashboard. Tempo or Loki join when you want traces or logs in the same Grafana.",[otel,prom,gra,tp,lk]),["otel-sdk","otel-collector"]);
put(T("Kafka + Kafka Streams","One log, many consumers. Flink swaps in when the job is a long-running stream. Confluent is the sold cluster.",[kaf,kst]),["kafka"]);
put(T("HPA + Cluster Autoscaler","HPA adds pods. CA adds nodes a few minutes later. One without the other stalls.",[hpa,ca]),["hpa","ca","autoscaling"]);
put(T("AWS NLB + Gateway API","L4 VIP in front of L7. MetalLB + Gateway API on prem. Do not pair a new cluster with retired ingress-nginx.",[nlb,gw]),["lb"]);
put(T("Docker Build + Harbor or ECR","Image is the artifact. Registry is where Argo pulls from.",[db,hbr,ecr]),["registry","build","step4","step5"]);
put(T("Prometheus + Alertmanager + PagerDuty","Fire, route, wake a human. Datadog is the sold all-in-one swap.",[prom,am,pd]),["alerts","datadog"]);
put(T("Amazon VPC + Amazon EKS","The cluster lives in a VPC. Nodes are VMs in that network.",[vpc,eks]),["vpc","cloud","cloud-apis"]);
})(window.IDP_DATA);
