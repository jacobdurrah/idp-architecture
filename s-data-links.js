(function(D){
var gha="https://docs.github.com/en/actions";
var esl="https://eslint.org/",ruff="https://docs.astral.sh/ruff/";
var gli="https://golangci-lint.run/",rc="https://docs.rubocop.org/rubocop/latest/index.html";
var clp="https://doc.rust-lang.org/clippy/",ts="https://www.typescriptlang.org/";
var jest="https://jestjs.io/",pyt="https://docs.pytest.org/",ju="https://junit.org/";
var cql="https://codeql.github.com/",sg="https://semgrep.dev/";
var sonar="https://www.sonarsource.com/products/sonarqube/";
var trivy="https://trivy.dev/",snyk="https://snyk.io/";
var dep="https://docs.github.com/en/code-security/getting-started/dependabot-quickstart-guide";
var tc="https://testcontainers.com/",pact="https://pact.io/",pw="https://playwright.dev/";
var kind="https://kind.sigs.k8s.io/",ls="https://www.localstack.cloud/";
var cyp="https://www.cypress.io/",wm="https://wiremock.org/",k3d="https://k3d.io/";
var argo="https://argo-cd.readthedocs.io/en/stable/",argoG="https://github.com/argoproj/argo-cd";
var kyv="https://kyverno.io/",opa="https://www.openpolicyagent.org/";
var gw="https://gateway-api.sigs.k8s.io/",ngx="https://kubernetes.github.io/ingress-nginx/";
var env="https://www.envoyproxy.io/",otel="https://opentelemetry.io/";
function L(n,h){return {n:n,href:h}}
var c={
"ship-3":{
w:"The PR grows status checks. ESLint or golangci-lint or Ruff, Jest or pytest, CodeQL or Semgrep, Trivy. Unit is Jest; distributed integration is Testcontainers / Pact / Playwright / Kind. Fail-closed: a red or skipped required check blocks merge.",
d:["Lint: ESLint, Ruff, golangci-lint, RuboCop, or Clippy. Types: TypeScript when that is the language.","Unit is Jest, pytest, or JUnit. Same gates as the laptop, now durable on the PR.","newsfeed-service:v1827 uses Testcontainers for Postgres+Redis+Kafka, Pact against app-users, Playwright on GET /feed. Kind for cluster-level. LocalStack when the suite needs AWS APIs.","Security: CodeQL or Semgrep, Trivy on the image, Dependabot on deps. CI still has not talked to Kubernetes."],
latest:L("Testcontainers",tc),
common:[L("ESLint",esl),L("Ruff",ruff),L("Jest",jest),L("Pact",pact),L("Playwright",pw),L("Kind",kind),L("CodeQL",cql),L("Trivy",trivy)],
see:[L("golangci-lint",gli),L("pytest",pyt),L("TypeScript",ts),L("Semgrep",sg),L("LocalStack",ls),L("Cypress",cyp),L("WireMock",wm),L("GitHub Actions",gha)],
project:L("GitHub Actions",gha)
},
"ship-6":{latest:L("Kyverno",kyv),common:[L("Open Policy Agent",opa)],project:L("Kyverno",kyv)},
"ship-7":{latest:L("Argo CD",argo),project:L("argoproj/argo-cd",argoG)},
"serve-6":{latest:L("Gateway API",gw),common:[L("ingress-nginx",ngx),L("Envoy",env)],project:L("Gateway API",gw)},
"break-2":{latest:L("OpenTelemetry",otel),project:L("OpenTelemetry",otel)},
"ship-4":{latest:L("containerd","https://containerd.io/"),common:[L("Docker Engine","https://docs.docker.com/engine/")],project:L("containerd","https://containerd.io/")},
"break-4":{latest:L("Argo CD",argo),project:L("argoproj/argo-cd",argoG)},
"ship-5":{w:"CI writes the digest into the Deployment in platform-gitops with Argo CD watching. That write is the deploy. CI still has not talked to Kubernetes.",
d:["Manifest bump is Argo CD GitOps. Promotion is a Git write, not kubectl."],
latest:L("Argo CD",argo),project:L("argoproj/argo-cd",argoG)},
"serve-7":{latest:L("Kubernetes","https://kubernetes.io/"),project:L("Kubernetes","https://kubernetes.io/")}
};
Object.keys(c).forEach(function(k){if(D[k])Object.assign(D[k],c[k]);});
})(window.IDP_DATA);
