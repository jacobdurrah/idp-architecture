(function(D){
var k8s="https://kubernetes.io/releases/",k8sG="https://github.com/kubernetes/kubernetes/releases";
var gw="https://gateway-api.sigs.k8s.io/",ngx="https://kubernetes.github.io/ingress-nginx/",env="https://www.envoyproxy.io/";
var argo="https://argo-cd.readthedocs.io/en/stable/",argoG="https://github.com/argoproj/argo-cd";
var val="https://valkey.io/",red="https://redis.io/",kaf="https://kafka.apache.org/",con="https://www.confluent.io/",pg="https://www.postgresql.org/";
var otel="https://opentelemetry.io/",prom="https://prometheus.io/",gra="https://grafana.com/";
var gha="https://docs.github.com/en/actions";
var esl="https://eslint.org/",ruff="https://docs.astral.sh/ruff/",gli="https://golangci-lint.run/";
var rc="https://docs.rubocop.org/rubocop/latest/index.html",clp="https://doc.rust-lang.org/clippy/",ts="https://www.typescriptlang.org/";
var jest="https://jestjs.io/",pyt="https://docs.pytest.org/",ju="https://junit.org/";
var cql="https://codeql.github.com/",sg="https://semgrep.dev/",sonar="https://www.sonarsource.com/products/sonarqube/";
var trivy="https://trivy.dev/",snyk="https://snyk.io/";
var dep="https://docs.github.com/en/code-security/getting-started/dependabot-quickstart-guide";
var tc="https://testcontainers.com/",pact="https://pact.io/",pw="https://playwright.dev/";
var kind="https://kind.sigs.k8s.io/",ls="https://www.localstack.cloud/",cyp="https://www.cypress.io/";
var wm="https://wiremock.org/",k3d="https://k3d.io/",dag="https://dagger.io/",ra="https://rest-assured.io/";
var kyv="https://kyverno.io/",opa="https://www.openpolicyagent.org/";
function L(n,h){return {n:n,href:h}}
var k8sL={n:"Kubernetes 1.36.3 current, 1.37 next",href:k8s};
var lint={latest:L("Ruff",ruff),common:[L("ESLint",esl),L("golangci-lint",gli),L("RuboCop",rc),L("Clippy",clp)],project:L("ESLint",esl)};
var unit={latest:L("Jest",jest),common:[L("pytest",pyt),L("JUnit",ju)],project:L("Jest",jest)};
var sec={latest:L("CodeQL",cql),common:[L("Semgrep",sg),L("SonarQube",sonar),L("Trivy",trivy),L("Snyk",snyk)],project:L("CodeQL",cql)};
var integ={
w:"Suites in flight: newsfeed-it, users-it, contract, e2e-feed, policy-it. newsfeed-service:v1827 uses Testcontainers for Postgres+Redis+Kafka, Pact against app-users, Playwright on GET /feed. Kind for cluster-level. LocalStack when the suite needs AWS APIs.",
d:["Unit is Jest or pytest. Distributed integration is Testcontainers, Pact, Playwright, Kind.","newsfeed-it brings real Postgres, Redis, and Kafka up with Testcontainers.","contract is Pact against app-users. e2e-feed is Playwright through ingress on GET /feed.","policy-it rehearses admit. Kind or k3d for a real API server. WireMock or LocalStack when a hop is not in-process."],
latest:L("Testcontainers",tc),
common:[L("Pact",pact),L("Playwright",pw),L("Kind",kind),L("LocalStack",ls)],
see:[L("Cypress",cyp),L("k3d",k3d),L("WireMock",wm),L("Dagger",dag),L("REST Assured",ra)],
project:L("Testcontainers",tc)
};
var c={
argocd:{latest:L("Argo CD",argo),project:L("argoproj/argo-cd",argoG)},
redis:{latest:L("Valkey",val),common:[L("Redis",red)],project:L("Valkey",val)},
kafka:{latest:L("Apache Kafka",kaf),common:[L("Confluent",con)],project:L("Apache Kafka",kaf)},
sql:{latest:L("PostgreSQL",pg),project:L("PostgreSQL",pg)},
ingress:{latest:L("Gateway API",gw),common:[L("ingress-nginx",ngx),L("Envoy",env)],project:L("Gateway API",gw)},
k8s:{latest:k8sL,project:L("Kubernetes releases",k8sG)},
apiserver:{latest:k8sL,project:L("Kubernetes releases",k8sG)},
ci:{
w:"CI is GitHub Actions (or the house runner). Lint is ESLint or Ruff. Unit is Jest or pytest. Distributed integration is Testcontainers / Pact / Playwright / Kind. SAST is CodeQL or Semgrep. Trivy on the image.",
latest:L("GitHub Actions",gha),
common:[L("ESLint",esl),L("Ruff",ruff),L("Jest",jest),L("Testcontainers",tc),L("CodeQL",cql),L("Trivy",trivy)],
project:L("GitHub Actions",gha)
},
"gate-lint":lint,
"gate-static":{latest:L("Ruff",ruff),common:[L("ESLint",esl),L("Semgrep",sg)],project:L("ESLint",esl)},
"gate-type":{latest:L("TypeScript",ts),project:L("TypeScript",ts)},
"gate-compile":{latest:L("TypeScript",ts),project:L("TypeScript",ts)},
"gate-unit":Object.assign({
w:"Unit tests run in CI on every PR. Unit is Jest, pytest, or JUnit. They do not stand up a cluster. Distributed integration is Testcontainers / Pact / Playwright / Kind on the suites box.",
d:["Deterministic. No live network, no shared staging.","Unit is Jest or pytest. Integration is the next gate, not this one.","Local unit target matches CI so a push is not a surprise."]
},unit),
"gate-security":sec,
"gate-deps":{latest:L("Dependabot",dep),common:[L("Trivy",trivy),L("Snyk",snyk)],project:L("Dependabot",dep)},
"otel-sdk":{latest:L("OpenTelemetry",otel),common:[L("Prometheus",prom),L("Grafana",gra)],project:L("OpenTelemetry",otel)},
suites:integ,
coordinator:Object.assign({d:["The coordinator shards newsfeed-it, users-it, contract, e2e-feed, policy-it.","Workers boot Testcontainers, Pact, Playwright, or Kind. Dagger if the runner is the house CI."]},integ),
workers:Object.assign({d:["A slot boots Testcontainers (Postgres+Redis+Kafka), Pact, Playwright, or a Kind cluster, then tears it down."]},integ),
results:{latest:L("GitHub Actions",gha),common:[L("Testcontainers",tc),L("Pact",pact),L("Playwright",pw)],project:L("GitHub Actions",gha)},
admission:{latest:L("Kyverno",kyv),common:[L("Open Policy Agent",opa)],project:L("Kyverno",kyv)},
git:{latest:L("GitHub","https://github.com/"),project:L("GitHub","https://github.com/")},
prometheus:{latest:L("Prometheus",prom),project:L("Prometheus",prom)},
grafana:{latest:L("Grafana",gra),project:L("Grafana",gra)},
hpa:{latest:L("Horizontal Pod Autoscaler","https://kubernetes.io/docs/tasks/run-application/horizontal-pod-autoscale/"),project:L("HPA docs","https://kubernetes.io/docs/tasks/run-application/horizontal-pod-autoscale/")},
ca:{latest:L("Cluster Autoscaler","https://github.com/kubernetes/autoscaler"),project:L("kubernetes/autoscaler","https://github.com/kubernetes/autoscaler")},
lb:{latest:L("MetalLB","https://metallb.io/"),common:[L("HAProxy","https://www.haproxy.org/"),L("AWS Elastic Load Balancing","https://aws.amazon.com/elasticloadbalancing/")],buy:[L("AWS Elastic Load Balancing","https://aws.amazon.com/elasticloadbalancing/")],project:L("MetalLB","https://metallb.io/")},
objstore:{latest:L("MinIO","https://min.io/"),common:[L("Ceph","https://ceph.io/"),L("Amazon S3","https://aws.amazon.com/s3/")],buy:[L("Amazon S3","https://aws.amazon.com/s3/")],project:L("MinIO","https://min.io/")},
search:{latest:L("OpenSearch","https://opensearch.org/"),common:[L("Elasticsearch","https://www.elastic.co/elasticsearch")],project:L("OpenSearch","https://opensearch.org/")},
dns:{latest:L("CoreDNS","https://coredns.io/"),project:L("CoreDNS","https://coredns.io/")},
"otel-collector":{latest:L("OpenTelemetry",otel),project:L("OpenTelemetry",otel)},
cicd:{latest:L("GitHub Actions",gha),project:L("GitHub Actions",gha)},
"ci-pipelines":{latest:L("GitHub Actions",gha),common:[L("Testcontainers",tc),L("Jest",jest),L("CodeQL",cql)],project:L("GitHub Actions",gha)},
"platform-gitops":{latest:L("Argo CD",argo),project:L("argoproj/argo-cd",argoG)},
"repo-app":{latest:L("GitHub","https://github.com/"),project:L("GitHub","https://github.com/")}
};
Object.keys(c).forEach(function(k){if(D[k])Object.assign(D[k],c[k]);});
})(window.IDP_DATA);
