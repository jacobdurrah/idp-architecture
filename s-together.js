(function(D){
function L(n,h){return{n:n,href:h}}
function T(n,why,parts){return{n:n,why:why,parts:parts}}
function put(t,ks){ks.forEach(function(k){if(D[k])D[k].together=t})}
var gha=L("GitHub Actions","https://docs.github.com/en/actions"),esl=L("ESLint","https://eslint.org/");
var jest=L("Jest","https://jestjs.io/"),cql=L("CodeQL","https://codeql.github.com/"),trivy=L("Trivy","https://trivy.dev/");
var kyv=L("Kyverno","https://kyverno.io/"),opa=L("Open Policy Agent","https://www.openpolicyagent.org/");
var k8s=L("Kubernetes","https://kubernetes.io/");
var gh=L("GitHub","https://github.com/"),argo=L("Argo CD","https://argo-cd.readthedocs.io/en/stable/");
var gw=L("Gateway API","https://gateway-api.sigs.k8s.io/"),egw=L("Envoy Gateway","https://gateway.envoyproxy.io/");
var cm=L("cert-manager","https://cert-manager.io/");
var otel=L("OpenTelemetry","https://opentelemetry.io/"),prom=L("Prometheus","https://prometheus.io/"),gra=L("Grafana","https://grafana.com/");
var db=L("Docker Build","https://docs.docker.com/build/"),hbr=L("Harbor","https://goharbor.io/"),ecr=L("Amazon ECR","https://aws.amazon.com/ecr/");
put(T("GitHub Actions + ESLint + Jest + CodeQL + Trivy","One required check set on the PR. Language linters swap (Ruff, golangci-lint) but the shape stays.",[gha,esl,jest,cql,trivy]),["ship-3"]);
put(T("Kubernetes + Kyverno + OPA","Core plus admission plugins. Kyverno is the usual YAML path. OPA when the policy is Rego.",[k8s,kyv,opa]),["ship-6"]);
put(T("GitHub + Argo CD + Kubernetes","PR merges, Argo syncs the Deployment. CI does not talk to the cluster.",[gh,argo,k8s]),["ship-5","ship-7"]);
put(T("Gateway API + Envoy Gateway + cert-manager","One front door. Envoy Gateway is the maintained controller. ingress-nginx was the most-used Ingress controller; Kubernetes retired it March 2026.",[gw,egw,cm]),["serve-6"]);
put(T("OpenTelemetry + Prometheus + Grafana","One SDK, scrape or remote-write, one dashboard. Tempo or Loki join when you want traces or logs in the same Grafana.",[otel,prom,gra]),["break-2"]);
put(T("Docker Build + Harbor or ECR","Image is the artifact. Registry is where Argo pulls from.",[db,hbr,ecr]),["ship-4"]);
if(D["ship-3"]&&D["ship-3"].d)D["ship-3"].d.push("Usual combo is GitHub Actions + ESLint + Jest + CodeQL + Trivy.");
})(window.IDP_DATA);
