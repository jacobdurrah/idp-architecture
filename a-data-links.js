(function(D){
var gh="https://github.com/",gha="https://docs.github.com/en/actions";
var argo="https://argo-cd.readthedocs.io/en/stable/",argoG="https://github.com/argoproj/argo-cd";
var kyv="https://kyverno.io/",opa="https://www.openpolicyagent.org/";
var otel="https://opentelemetry.io/",prom="https://prometheus.io/",gra="https://grafana.com/";
var hpa="https://kubernetes.io/docs/tasks/run-application/horizontal-pod-autoscale/",ca="https://github.com/kubernetes/autoscaler";
var k8s="https://kubernetes.io/";
var esl="https://eslint.org/",ruff="https://docs.astral.sh/ruff/",gli="https://golangci-lint.run/";
var ts="https://www.typescriptlang.org/",jest="https://jestjs.io/",pyt="https://docs.pytest.org/",ju="https://junit.org/";
var cql="https://codeql.github.com/",sg="https://semgrep.dev/",trivy="https://trivy.dev/",snyk="https://snyk.io/";
var dep="https://docs.github.com/en/code-security/getting-started/dependabot-quickstart-guide";
var tc="https://testcontainers.com/",pact="https://pact.io/",pw="https://playwright.dev/";
var kind="https://kind.sigs.k8s.io/",ls="https://www.localstack.cloud/";
var tf="https://www.terraform.io/",hbr="https://goharbor.io/",ecr="https://aws.amazon.com/ecr/",db="https://docs.docker.com/build/";
var nats="https://nats.io/",rmq="https://www.rabbitmq.com/";
var lk="https://github.com/grafana/loki",tp="https://github.com/grafana/tempo",jae="https://www.jaegertracing.io/";
var dd="https://docs.datadoghq.com/",am="https://prometheus.io/docs/alerting/latest/alertmanager/",pd="https://www.pagerduty.com/";
function L(n,h){return {n:n,href:h}}
var lint={latest:L("Ruff",ruff),common:[L("ESLint",esl),L("golangci-lint",gli)],project:L("ESLint",esl)};
var unit={latest:L("Jest",jest),common:[L("pytest",pyt),L("JUnit",ju)],project:L("Jest",jest)};
var integ={d:["Unit is Jest; distributed integration is Testcontainers / Pact / Playwright / Kind."],latest:L("Testcontainers",tc),common:[L("Pact",pact),L("Playwright",pw),L("Kind",kind),L("LocalStack",ls)],project:L("Testcontainers",tc)};
var arL={latest:L("Argo CD",argo),project:L("argoproj/argo-cd",argoG)};
var gitL={latest:L("GitHub",gh),project:L("GitHub",gh)};
var reg={latest:L("Harbor",hbr),common:[L("Amazon ECR",ecr)],project:L("Harbor",hbr)};
var qL={latest:L("NATS",nats),common:[L("RabbitMQ",rmq)],project:L("NATS",nats)};
var c={
git:gitL,
ci:{
w:"CI is GitHub Actions. Lint is ESLint or Ruff. Unit is Jest or pytest. Distributed integration is Testcontainers / Pact / Playwright / Kind.",
latest:L("GitHub Actions",gha),
common:[L("ESLint",esl),L("Ruff",ruff),L("Jest",jest),L("Testcontainers",tc),L("CodeQL",cql),L("Trivy",trivy)],
project:L("GitHub Actions",gha)
},
argocd:arL,
admission:{latest:L("Kyverno",kyv),common:[L("Open Policy Agent",opa)],project:L("Kyverno",kyv)},
"otel-sdk":{latest:L("OpenTelemetry",otel),common:[L("Prometheus",prom),L("Grafana",gra)],project:L("OpenTelemetry",otel)},
"otel-collector":{latest:L("OpenTelemetry",otel),project:L("OpenTelemetry",otel)},
prometheus:{latest:L("Prometheus",prom),project:L("Prometheus",prom)},
grafana:{latest:L("Grafana",gra),project:L("Grafana",gra)},
hpa:{latest:L("Horizontal Pod Autoscaler",hpa),project:L("HPA docs",hpa)},
ca:{latest:L("Cluster Autoscaler",ca),project:L("kubernetes/autoscaler",ca)},
newsfeed:{latest:L("Kubernetes",k8s),project:L("Kubernetes",k8s)},
"gate-lint":lint,"gate-static":lint,
"gate-type":{latest:L("TypeScript",ts),project:L("TypeScript",ts)},
"gate-compile":{latest:L("TypeScript",ts),project:L("TypeScript",ts)},
"gate-unit":Object.assign({d:["Unit is Jest or pytest. Distributed integration is Testcontainers / Pact / Playwright / Kind."]},unit),
"gate-security":{latest:L("CodeQL",cql),common:[L("Semgrep",sg),L("Trivy",trivy),L("Snyk",snyk)],project:L("CodeQL",cql)},
"gate-deps":{latest:L("Dependabot",dep),common:[L("Trivy",trivy),L("Snyk",snyk)],project:L("Dependabot",dep)},
"gate-policy":{latest:L("Kyverno",kyv),common:[L("Open Policy Agent",opa)],project:L("Kyverno",kyv)},
"checks-board":Object.assign({
w:"The required statuses on the PR are a board. Lint is ESLint or Ruff. Unit is Jest. Distributed integration is Testcontainers / Pact / Playwright / Kind. A red check is a trace the repair agent can read.",
d:["newsfeed-service:v1827 uses Testcontainers for Postgres+Redis+Kafka, Pact against app-users, Playwright on GET /feed."]
},integ),
coordinator:Object.assign({d:["Shards newsfeed-it, users-it, contract, e2e-feed, policy-it onto Testcontainers, Pact, Playwright, or Kind."]},integ),
workers:Object.assign({d:["A slot boots Testcontainers, Pact, Playwright, or Kind, then tears it down."]},integ),
results:{latest:L("GitHub Actions",gha),common:[L("Testcontainers",tc),L("Pact",pact),L("Playwright",pw)],project:L("GitHub Actions",gha)},
step5:integ,"artifacts-board":integ,"local-board":{latest:L("ESLint",esl),common:[L("Jest",jest),L("Ruff",ruff)],project:L("ESLint",esl)},
"scan-board":{latest:L("Trivy",trivy),common:[L("CodeQL",cql),L("Snyk",snyk)],project:L("Trivy",trivy)},
"argo-board":arL,"platform-gitops":arL,bump:arL,
"pr-board":gitL,"app-newsfeed":gitL,"app-users":gitL,"ci-pipelines":{latest:L("GitHub Actions",gha),common:[L("Testcontainers",tc),L("Jest",jest)],project:L("GitHub Actions",gha)},
registry:reg,"image-v1827":reg,build:{latest:L("Docker Build",db),project:L("Docker Build",db)},queue:qL,
loki:{latest:L("Grafana Loki",lk),common:[L("Elasticsearch","https://www.elastic.co/elasticsearch")],project:L("grafana/loki",lk)},
tempo:{latest:L("Grafana Tempo",tp),common:[L("Jaeger",jae),L("Datadog",dd)],project:L("grafana/tempo",tp)},
"infra-terraform":{latest:L("Terraform",tf),project:L("Terraform",tf)},
alerts:{latest:L("Alertmanager",am),common:[L("PagerDuty",pd),L("Datadog",dd)],project:L("Alertmanager",am)},
"obs-board":{latest:L("Grafana",gra),common:[L("Prometheus",prom),L("Datadog",dd)],project:L("Grafana",gra)},
step3:gitL,step4:{latest:L("GitHub Actions",gha),common:[L("Testcontainers",tc),L("Jest",jest)],project:L("GitHub Actions",gha)},
step6:{latest:L("Docker Build",db),project:L("Docker Build",db)},step7:{latest:L("Trivy",trivy),project:L("Trivy",trivy)},
step8:arL,step9:arL,step2:gitL,
"outage-board":{latest:L("Alertmanager",am),common:[L("PagerDuty",pd)],project:L("Alertmanager",am)}
};
Object.keys(c).forEach(function(k){if(D[k])Object.assign(D[k],c[k]);});
})(window.IDP_DATA);
