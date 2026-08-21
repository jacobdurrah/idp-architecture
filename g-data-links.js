(function(D){
var gh="https://github.com/",gha="https://docs.github.com/en/actions";
var argo="https://argo-cd.readthedocs.io/en/stable/",argoG="https://github.com/argoproj/argo-cd";
var k8s="https://kubernetes.io/",k8sR="https://kubernetes.io/releases/",k8sG="https://github.com/kubernetes/kubernetes/releases";
var gw="https://gateway-api.sigs.k8s.io/",ngx="https://kubernetes.github.io/ingress-nginx/",env="https://www.envoyproxy.io/";
var val="https://valkey.io/",red="https://redis.io/",kaf="https://kafka.apache.org/",con="https://www.confluent.io/",pg="https://www.postgresql.org/";
var otel="https://opentelemetry.io/",prom="https://prometheus.io/",gra="https://grafana.com/";
var hpa="https://kubernetes.io/docs/tasks/run-application/horizontal-pod-autoscale/",ca="https://github.com/kubernetes/autoscaler";
var esl="https://eslint.org/",ruff="https://docs.astral.sh/ruff/",gli="https://golangci-lint.run/";
var ts="https://www.typescriptlang.org/",jest="https://jestjs.io/",pyt="https://docs.pytest.org/",ju="https://junit.org/";
var cql="https://codeql.github.com/",sg="https://semgrep.dev/",trivy="https://trivy.dev/",snyk="https://snyk.io/";
var dep="https://docs.github.com/en/code-security/getting-started/dependabot-quickstart-guide";
var tc="https://testcontainers.com/",pact="https://pact.io/",pw="https://playwright.dev/";
var kind="https://kind.sigs.k8s.io/",ls="https://www.localstack.cloud/",cyp="https://www.cypress.io/";
var tf="https://www.terraform.io/",hbr="https://goharbor.io/",ecr="https://aws.amazon.com/ecr/",db="https://docs.docker.com/build/";
var nats="https://nats.io/",rmq="https://www.rabbitmq.com/";
var lk="https://github.com/grafana/loki",tp="https://github.com/grafana/tempo",jae="https://www.jaegertracing.io/";
var dd="https://docs.datadoghq.com/",am="https://prometheus.io/docs/alerting/latest/alertmanager/",pd="https://www.pagerduty.com/";
var vpc="https://aws.amazon.com/vpc/",eks="https://aws.amazon.com/eks/";
var sb="https://spring.io/projects/spring-boot",nest="https://nestjs.com/";
var kyv="https://kyverno.io/",opa="https://www.openpolicyagent.org/";
function L(n,h){return {n:n,href:h}}
var k8sL={latest:L("Kubernetes",k8sR),project:L("Kubernetes releases",k8sG)};
var lint={latest:L("Ruff",ruff),common:[L("ESLint",esl),L("golangci-lint",gli)],project:L("ESLint",esl)};
var unit={latest:L("Jest",jest),common:[L("pytest",pyt),L("JUnit",ju)],project:L("Jest",jest)};
var integ={d:["Unit is Jest; distributed integration is Testcontainers / Pact / Playwright / Kind. newsfeed-service:v1827 uses Testcontainers for Postgres+Redis+Kafka, Pact against app-users, Playwright on GET /feed."],latest:L("Testcontainers",tc),common:[L("Pact",pact),L("Playwright",pw),L("Kind",kind),L("LocalStack",ls)],see:[L("Cypress",cyp)],project:L("Testcontainers",tc)};
var arL={latest:L("Argo CD",argo),project:L("argoproj/argo-cd",argoG)};
var tfL={latest:L("Terraform",tf),project:L("Terraform",tf)};
var reg={latest:L("Harbor",hbr),common:[L("Amazon ECR",ecr)],project:L("Harbor",hbr)};
var qL={latest:L("NATS",nats),common:[L("RabbitMQ",rmq)],project:L("NATS",nats)};
var svc={latest:L("Spring Boot",sb),common:[L("NestJS",nest)],project:L("Spring Boot",sb)};
var c={
git:{latest:L("GitHub",gh),project:L("GitHub",gh)},
ci:{
w:"CI is GitHub Actions. Lint is ESLint or Ruff. Unit is Jest or pytest. Distributed integration is Testcontainers / Pact / Playwright / Kind.",
latest:L("GitHub Actions",gha),
common:[L("ESLint",esl),L("Ruff",ruff),L("Jest",jest),L("Testcontainers",tc),L("CodeQL",cql),L("Trivy",trivy)],
project:L("GitHub Actions",gha)
},
argocd:arL,
k8s:k8sL,apiserver:k8sL,
ingress:{latest:L("Gateway API",gw),common:[L("ingress-nginx",ngx),L("Envoy",env)],project:L("Gateway API",gw)},
sql:{latest:L("PostgreSQL",pg),project:L("PostgreSQL",pg)},
redis:{latest:L("Valkey",val),common:[L("Redis",red)],project:L("Valkey",val)},
kafka:{latest:L("Apache Kafka",kaf),common:[L("Confluent",con)],project:L("Apache Kafka",kaf)},
"otel-sdk":{latest:L("OpenTelemetry",otel),common:[L("Prometheus",prom),L("Grafana",gra)],project:L("OpenTelemetry",otel)},
prometheus:{latest:L("Prometheus",prom),project:L("Prometheus",prom)},
grafana:{latest:L("Grafana",gra),project:L("Grafana",gra)},
hpa:{latest:L("Horizontal Pod Autoscaler",hpa),project:L("HPA docs",hpa)},
ca:{latest:L("Cluster Autoscaler",ca),project:L("kubernetes/autoscaler",ca)},
"gate-lint":lint,"gate-static":lint,
"gate-type":{latest:L("TypeScript",ts),project:L("TypeScript",ts)},
"gate-compile":{latest:L("TypeScript",ts),project:L("TypeScript",ts)},
"gate-unit":Object.assign({d:["Unit is Jest or pytest. Distributed integration is Testcontainers / Pact / Playwright / Kind."]},unit),
"gate-security":{latest:L("CodeQL",cql),common:[L("Semgrep",sg),L("Trivy",trivy),L("Snyk",snyk)],project:L("CodeQL",cql)},
"gate-deps":{latest:L("Dependabot",dep),common:[L("Trivy",trivy),L("Snyk",snyk)],project:L("Dependabot",dep)},
"gate-policy":{latest:L("Kyverno",kyv),common:[L("Open Policy Agent",opa)],project:L("Kyverno",kyv)},
coordinator:Object.assign({d:["Shards newsfeed-it, users-it, contract, e2e-feed, policy-it onto Testcontainers, Pact, Playwright, or Kind."]},integ),
workers:Object.assign({d:["A slot boots Testcontainers for Postgres+Redis+Kafka, Pact, Playwright, or Kind, then tears it down."]},integ),
results:{latest:L("GitHub Actions",gha),common:[L("Testcontainers",tc),L("Pact",pact),L("Playwright",pw)],project:L("GitHub Actions",gha)},
lb:{latest:L("MetalLB","https://metallb.io/"),common:[L("AWS Elastic Load Balancing","https://aws.amazon.com/elasticloadbalancing/")],project:L("MetalLB","https://metallb.io/")},
objstore:{latest:L("MinIO","https://min.io/"),common:[L("Amazon S3","https://aws.amazon.com/s3/")],project:L("MinIO","https://min.io/")},
search:{latest:L("OpenSearch","https://opensearch.org/"),common:[L("Elasticsearch","https://www.elastic.co/elasticsearch")],project:L("OpenSearch","https://opensearch.org/")},
dns:{latest:L("CoreDNS","https://coredns.io/"),project:L("CoreDNS","https://coredns.io/")},
"otel-collector":{latest:L("OpenTelemetry",otel),project:L("OpenTelemetry",otel)},
cicd:{latest:L("GitHub Actions",gha),project:L("GitHub Actions",gha)},
step3:integ,registry:reg,build:{latest:L("Docker Build",db),project:L("Docker Build",db)},queue:qL,
loki:{latest:L("Grafana Loki",lk),common:[L("Elasticsearch","https://www.elastic.co/elasticsearch")],project:L("grafana/loki",lk)},
tempo:{latest:L("Grafana Tempo",tp),common:[L("Jaeger",jae),L("Datadog",dd)],project:L("grafana/tempo",tp)},
datadog:{latest:L("Datadog",dd),buy:[L("Datadog",dd)],project:L("Datadog",dd)},
terraform:tfL,"repo-infra":tfL,tfstate:tfL,
"repo-manifests":arL,bump:arL,"repo-app":{latest:L("GitHub",gh),project:L("GitHub",gh)},
"k8s-cp":k8sL,scheduler:k8sL,controllermgr:k8sL,nodepool:k8sL,
autoscaling:{latest:L("Horizontal Pod Autoscaler",hpa),common:[L("Cluster Autoscaler",ca)],project:L("HPA docs",hpa)},
alerts:{latest:L("Alertmanager",am),common:[L("PagerDuty",pd),L("Datadog",dd)],project:L("Alertmanager",am)},
vpc:{latest:L("Amazon VPC",vpc),buy:[L("Amazon VPC",vpc)],project:L("Amazon VPC",vpc)},
cloud:{latest:L("Amazon EKS",eks),buy:[L("Amazon EKS",eks)],project:L("Amazon EKS",eks)},
"cloud-apis":{latest:L("Amazon EKS",eks),common:[L("Amazon VPC",vpc),L("Amazon ECR",ecr)],project:L("Amazon EKS",eks)},
newsfeed:svc,"svc-user":svc,"svc-post":svc,"svc-ranking":svc,"svc-media":svc,"svc-notify":svc,
step2:{latest:L("GitHub Actions",gha),common:[L("ESLint",esl),L("Jest",jest),L("Testcontainers",tc)],project:L("GitHub Actions",gha)},
step4:{latest:L("Docker Build",db),project:L("Docker Build",db)},step5:reg,step6:arL,step8:arL
};
Object.keys(c).forEach(function(k){if(D[k])Object.assign(D[k],c[k]);});
})(window.IDP_DATA);
