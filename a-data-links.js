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
function L(n,h){return {n:n,href:h}}
var lint={latest:L("Ruff",ruff),common:[L("ESLint",esl),L("golangci-lint",gli)],project:L("ESLint",esl)};
var unit={latest:L("Jest",jest),common:[L("pytest",pyt),L("JUnit",ju)],project:L("Jest",jest)};
var integ={latest:L("Testcontainers",tc),common:[L("Pact",pact),L("Playwright",pw),L("Kind",kind),L("LocalStack",ls)],project:L("Testcontainers",tc)};
var c={
git:{latest:L("GitHub",gh),project:L("GitHub",gh)},
ci:{
w:"CI is GitHub Actions. Lint is ESLint or Ruff. Unit is Jest or pytest. Distributed integration is Testcontainers / Pact / Playwright / Kind.",
latest:L("GitHub Actions",gha),
common:[L("ESLint",esl),L("Ruff",ruff),L("Jest",jest),L("Testcontainers",tc),L("CodeQL",cql),L("Trivy",trivy)],
project:L("GitHub Actions",gha)
},
argocd:{latest:L("Argo CD",argo),project:L("argoproj/argo-cd",argoG)},
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
results:{latest:L("GitHub Actions",gha),common:[L("Testcontainers",tc),L("Pact",pact),L("Playwright",pw)],project:L("GitHub Actions",gha)}
};
Object.keys(c).forEach(function(k){if(D[k])Object.assign(D[k],c[k]);});
})(window.IDP_DATA);
