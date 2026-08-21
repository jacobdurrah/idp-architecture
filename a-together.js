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
var otel=L("OpenTelemetry","https://opentelemetry.io/"),prom=L("Prometheus","https://prometheus.io/"),gra=L("Grafana","https://grafana.com/");
var tp=L("Grafana Tempo","https://github.com/grafana/tempo"),lk=L("Grafana Loki","https://github.com/grafana/loki");
var hpa=L("Horizontal Pod Autoscaler","https://kubernetes.io/docs/tasks/run-application/horizontal-pod-autoscale/");
var ca=L("Cluster Autoscaler","https://github.com/kubernetes/autoscaler");
var db=L("Docker Build","https://docs.docker.com/build/"),hbr=L("Harbor","https://goharbor.io/"),ecr=L("Amazon ECR","https://aws.amazon.com/ecr/");
var am=L("Alertmanager","https://prometheus.io/docs/alerting/latest/alertmanager/"),pd=L("PagerDuty","https://www.pagerduty.com/");
put(T("GitHub Actions + ESLint + Jest + CodeQL + Trivy","One required check set on the PR. Language linters swap (Ruff, golangci-lint) but the shape stays.",[gha,esl,jest,cql,trivy]),["ci","ci-pipelines","gate-lint","gate-static","gate-type","gate-compile","gate-unit","gate-security","gate-deps","checks-board","scan-board","local-board","step4"]);
put(T("Testcontainers + Pact + Playwright + Kind","Real Postgres Redis Kafka in CI, contract against app-users, browser on GET /feed, cluster when the API server is the fixture. LocalStack only if the suite needs AWS APIs.",[tc,pact,pw,kind]),["step5","coordinator","workers","results","artifacts-board"]);
put(T("GitHub + Argo CD + Kubernetes","PR merges, Argo syncs the Deployment. CI does not talk to the cluster.",[gh,argo,k8s]),["git","argocd","platform-gitops","argo-board","bump","pr-board","app-newsfeed","app-users","step2","step3","step8","step9"]);
put(T("Kubernetes + Kyverno + OPA","Core plus admission plugins. Kyverno is the usual YAML path. OPA when the policy is Rego.",[k8s,kyv,opa]),["admission","gate-policy"]);
put(T("OpenTelemetry + Prometheus + Grafana","One SDK, scrape or remote-write, one dashboard. Tempo or Loki join when you want traces or logs in the same Grafana.",[otel,prom,gra,tp,lk]),["otel-sdk","otel-collector","obs-board"]);
put(T("HPA + Cluster Autoscaler","HPA adds pods. CA adds nodes a few minutes later. One without the other stalls.",[hpa,ca]),["hpa","ca"]);
put(T("Docker Build + Harbor or ECR","Image is the artifact. Registry is where Argo pulls from.",[db,hbr,ecr]),["registry","image-v1827","build","step6"]);
put(T("Prometheus + Alertmanager + PagerDuty","Fire, route, wake a human. Datadog is the sold all-in-one swap.",[prom,am,pd]),["alerts","outage-board"]);
})(window.IDP_DATA);
