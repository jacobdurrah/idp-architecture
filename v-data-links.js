(function(D){
var k8s="https://kubernetes.io/releases/",k8sG="https://github.com/kubernetes/kubernetes/releases";
var gw="https://gateway-api.sigs.k8s.io/",ngx="https://kubernetes.github.io/ingress-nginx/",env="https://www.envoyproxy.io/";
var argo="https://argo-cd.readthedocs.io/en/stable/",argoG="https://github.com/argoproj/argo-cd";
var val="https://valkey.io/",red="https://redis.io/",kaf="https://kafka.apache.org/",con="https://www.confluent.io/",pg="https://www.postgresql.org/";
var otel="https://opentelemetry.io/",prom="https://prometheus.io/",gra="https://grafana.com/";
var gha="https://docs.github.com/en/actions",gh="https://github.com/";
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
var hpa="https://kubernetes.io/docs/tasks/run-application/horizontal-pod-autoscale/",ca="https://github.com/kubernetes/autoscaler";
var mlb="https://metallb.io/",hap="https://www.haproxy.org/",elb="https://aws.amazon.com/elasticloadbalancing/";
var minio="https://min.io/",ceph="https://ceph.io/",s3="https://aws.amazon.com/s3/";
var os="https://opensearch.org/",es="https://www.elastic.co/elasticsearch",dns="https://coredns.io/";
var tf="https://www.terraform.io/",hbr="https://goharbor.io/",ecr="https://aws.amazon.com/ecr/",db="https://docs.docker.com/build/";
var nats="https://nats.io/",rmq="https://www.rabbitmq.com/";
var lk="https://github.com/grafana/loki",tp="https://github.com/grafana/tempo",jae="https://www.jaegertracing.io/";
var dd="https://docs.datadoghq.com/";
function L(n,h){return {n:n,href:h}}
var k8sL={n:"Kubernetes 1.36.3 current, 1.37 next",href:k8s};
var kB={latest:k8sL,project:L("Kubernetes releases",k8sG)};
var lint={latest:L("Ruff",ruff),common:[L("ESLint",esl),L("golangci-lint",gli),L("RuboCop",rc),L("Clippy",clp)],project:L("ESLint",esl)};
var unit={latest:L("Jest",jest),common:[L("pytest",pyt),L("JUnit",ju)],project:L("Jest",jest)};
var integ={
w:"Suites in flight: newsfeed-it, users-it, contract, e2e-feed, policy-it. newsfeed-service:v1827 uses Testcontainers for Postgres+Redis+Kafka, Pact against app-users, Playwright on GET /feed. Kind for cluster-level. LocalStack when the suite needs AWS APIs.",
d:["Unit is Jest or pytest. Distributed integration is Testcontainers, Pact, Playwright, Kind.","newsfeed-it brings real Postgres, Redis, and Kafka up with Testcontainers.","contract is Pact against app-users. e2e-feed is Playwright through ingress on GET /feed.","policy-it rehearses admit. Kind or k3d for a real API server. WireMock or LocalStack when a hop is not in-process."],
latest:L("Testcontainers",tc),common:[L("Pact",pact),L("Playwright",pw),L("Kind",kind),L("LocalStack",ls)],
see:[L("Cypress",cyp),L("k3d",k3d),L("WireMock",wm),L("Dagger",dag),L("REST Assured",ra)],project:L("Testcontainers",tc)};
var gitL={latest:L("GitHub",gh),project:L("GitHub",gh)};
var arL={latest:L("Argo CD",argo),project:L("argoproj/argo-cd",argoG)};
var tfL={latest:L("Terraform",tf),project:L("Terraform",tf)};
var reg={latest:L("Harbor",hbr),common:[L("Amazon ECR",ecr)],project:L("Harbor",hbr)};
var otL={latest:L("OpenTelemetry",otel),common:[L("Prometheus",prom),L("Grafana",gra)],project:L("OpenTelemetry",otel)};
var pol={latest:L("Kyverno",kyv),common:[L("Open Policy Agent",opa)],project:L("Kyverno",kyv)};
var c={
argocd:arL,redis:{latest:L("Valkey",val),common:[L("Redis",red)],project:L("Valkey",val)},
kafka:{latest:L("Apache Kafka",kaf),common:[L("Confluent",con)],project:L("Apache Kafka",kaf)},
sql:{latest:L("PostgreSQL",pg),project:L("PostgreSQL",pg)},
ingress:{latest:L("Gateway API",gw),common:[L("ingress-nginx",ngx),L("Envoy",env)],project:L("Gateway API",gw)},
k8s:kB,apiserver:kB,"k8s-cp":kB,scheduler:kB,controllermgr:kB,
ci:{w:"CI is GitHub Actions (or the house runner). Lint is ESLint or Ruff. Unit is Jest or pytest. Distributed integration is Testcontainers / Pact / Playwright / Kind. SAST is CodeQL or Semgrep. Trivy on the image.",
latest:L("GitHub Actions",gha),common:[L("ESLint",esl),L("Ruff",ruff),L("Jest",jest),L("Testcontainers",tc),L("CodeQL",cql),L("Trivy",trivy)],project:L("GitHub Actions",gha)},
"gate-lint":lint,"gate-static":{latest:L("Ruff",ruff),common:[L("ESLint",esl),L("Semgrep",sg)],project:L("ESLint",esl)},
"gate-type":{latest:L("TypeScript",ts),project:L("TypeScript",ts)},"gate-compile":{latest:L("TypeScript",ts),project:L("TypeScript",ts)},
"gate-unit":Object.assign({d:["Unit is Jest or pytest. Distributed integration is Testcontainers / Pact / Playwright / Kind."]},unit),
"gate-security":{latest:L("CodeQL",cql),common:[L("Semgrep",sg),L("SonarQube",sonar),L("Trivy",trivy),L("Snyk",snyk)],project:L("CodeQL",cql)},
"gate-deps":{latest:L("Dependabot",dep),common:[L("Trivy",trivy),L("Snyk",snyk)],project:L("Dependabot",dep)},
"gate-policy":pol,admission:pol,"otel-sdk":otL,"otel-collector":otL,
suites:integ,step5:integ,
coordinator:integ,workers:integ,
results:{latest:L("GitHub Actions",gha),common:[L("Testcontainers",tc),L("Pact",pact),L("Playwright",pw)],project:L("GitHub Actions",gha)},
git:gitL,"repo-app":gitL,"app-newsfeed":gitL,"app-users":gitL,
prometheus:{latest:L("Prometheus",prom),project:L("Prometheus",prom)},grafana:{latest:L("Grafana",gra),project:L("Grafana",gra)},
hpa:{latest:L("Horizontal Pod Autoscaler",hpa),project:L("HPA docs",hpa)},
ca:{latest:L("Cluster Autoscaler",ca),project:L("kubernetes/autoscaler",ca)},
autoscaling:{latest:L("Horizontal Pod Autoscaler",hpa),common:[L("Cluster Autoscaler",ca)],project:L("HPA docs",hpa)},
lb:{latest:L("MetalLB",mlb),common:[L("HAProxy",hap),L("AWS Elastic Load Balancing",elb)],buy:[L("AWS Elastic Load Balancing",elb)],project:L("MetalLB",mlb)},
objstore:{latest:L("MinIO",minio),common:[L("Ceph",ceph),L("Amazon S3",s3)],buy:[L("Amazon S3",s3)],project:L("MinIO",minio)},
search:{latest:L("OpenSearch",os),common:[L("Elasticsearch",es)],project:L("OpenSearch",os)},
dns:{latest:L("CoreDNS",dns),project:L("CoreDNS",dns)},
cicd:{latest:L("GitHub Actions",gha),project:L("GitHub Actions",gha)},
"ci-pipelines":{latest:L("GitHub Actions",gha),common:[L("Testcontainers",tc),L("Jest",jest),L("CodeQL",cql)],project:L("GitHub Actions",gha)},
"platform-gitops":arL,"repo-manifests":arL,bump:arL,
registry:reg,"image-v1827":reg,build:{latest:L("Docker Build",db),project:L("Docker Build",db)},
queue:{latest:L("NATS",nats),common:[L("RabbitMQ",rmq)],project:L("NATS",nats)},
loki:{latest:L("Grafana Loki",lk),common:[L("Elasticsearch",es)],project:L("grafana/loki",lk)},
tempo:{latest:L("Grafana Tempo",tp),common:[L("Jaeger",jae),L("Datadog",dd)],project:L("grafana/tempo",tp)},
terraform:tfL,"infra-terraform":tfL,"repo-infra":tfL,tfstate:tfL,nodepool:kB,"pr-4821":gitL,step7:reg,step8:arL,step9:arL,step12:otL
};
Object.keys(c).forEach(function(k){if(D[k])Object.assign(D[k],c[k]);});
})(window.IDP_DATA);
