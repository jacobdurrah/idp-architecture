(function (D) {
  var k8s="https://kubernetes.io/releases/";
  var k8sG="https://github.com/kubernetes/kubernetes/releases";
  var gw="https://gateway-api.sigs.k8s.io/";
  var ngx="https://kubernetes.github.io/ingress-nginx/";
  var env="https://www.envoyproxy.io/";
  var argo="https://argo-cd.readthedocs.io/en/stable/";
  var argoG="https://github.com/argoproj/argo-cd";
  var val="https://valkey.io/";
  var red="https://redis.io/";
  var kaf="https://kafka.apache.org/";
  var con="https://www.confluent.io/";
  var pg="https://www.postgresql.org/";
  var otel="https://opentelemetry.io/";
  var prom="https://prometheus.io/";
  var gra="https://grafana.com/";
  var k8sL={n:"Kubernetes 1.36.3 current, 1.37 next",href:k8s};
  var c={
    argocd:{
      latest:{n:"Argo CD",href:argo},
      project:{n:"argoproj/argo-cd",href:argoG}
    },
    redis:{
      latest:{n:"Valkey",href:val},
      common:[{n:"Redis",href:red}],
      project:{n:"Valkey",href:val}
    },
    kafka:{
      latest:{n:"Apache Kafka",href:kaf},
      common:[{n:"Confluent",href:con}],
      project:{n:"Apache Kafka",href:kaf}
    },
    sql:{
      latest:{n:"PostgreSQL",href:pg},
      project:{n:"PostgreSQL",href:pg}
    },
    ingress:{
      latest:{n:"Gateway API",href:gw},
      common:[{n:"ingress-nginx",href:ngx},{n:"Envoy",href:env}],
      project:{n:"Gateway API",href:gw}
    },
    k8s:{
      latest:k8sL,
      project:{n:"Kubernetes releases",href:k8sG}
    },
    apiserver:{
      latest:k8sL,
      project:{n:"Kubernetes releases",href:k8sG}
    },
    "otel-sdk":{
      latest:{n:"OpenTelemetry",href:otel},
      common:[{n:"Prometheus",href:prom},{n:"Grafana",href:gra}],
      project:{n:"OpenTelemetry",href:otel}
    }
  };
  Object.keys(c).forEach(function (k) { if (D[k]) Object.assign(D[k], c[k]); });
})(window.IDP_DATA);
