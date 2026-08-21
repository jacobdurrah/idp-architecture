(function(D){
var dd="https://docs.datadoghq.com/",am="https://prometheus.io/docs/alerting/latest/alertmanager/",pd="https://www.pagerduty.com/";
var vpc="https://aws.amazon.com/vpc/",eks="https://aws.amazon.com/eks/",ecr="https://aws.amazon.com/ecr/";
var sb="https://spring.io/projects/spring-boot",nest="https://nestjs.com/";
var kyv="https://kyverno.io/",opa="https://www.openpolicyagent.org/";
var db="https://docs.docker.com/build/",hbr="https://goharbor.io/";
function L(n,h){return {n:n,href:h}}
var svc={latest:L("Spring Boot",sb),common:[L("NestJS",nest)],project:L("Spring Boot",sb)};
var reg={latest:L("Harbor",hbr),common:[L("Amazon ECR",ecr)],project:L("Harbor",hbr)};
var c={
alerts:{latest:L("Alertmanager",am),common:[L("PagerDuty",pd),L("Datadog",dd)],project:L("Alertmanager",am)},
vpc:{latest:L("Amazon VPC",vpc),buy:[L("Amazon VPC",vpc)],project:L("Amazon VPC",vpc)},
cloud:{latest:L("Amazon EKS",eks),buy:[L("Amazon EKS",eks)],project:L("Amazon EKS",eks)},
"cloud-apis":{latest:L("Amazon EKS",eks),common:[L("Amazon VPC",vpc),L("Amazon ECR",ecr)],project:L("Amazon EKS",eks)},
datadog:{latest:L("Datadog",dd),buy:[L("Datadog",dd)],project:L("Datadog",dd)},
newsfeed:svc,"svc-user":svc,"svc-post":svc,"svc-ranking":svc,"svc-media":svc,"svc-notify":svc,
step6:{latest:L("Docker Build",db),project:L("Docker Build",db)},
step10:{latest:L("Kyverno",kyv),common:[L("Open Policy Agent",opa)],project:L("Kyverno",kyv)},
step11:reg
};
Object.keys(c).forEach(function(k){if(D[k])Object.assign(D[k],c[k]);});
})(window.IDP_DATA);
