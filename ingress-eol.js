(function(D){
function L(n,h){return{n:n,href:h}}
var gw="https://gateway-api.sigs.k8s.io/",eg="https://gateway.envoyproxy.io/";
var tr="https://traefik.io/",kg="https://konghq.com/products/kong-gateway";
var ngx="https://kubernetes.github.io/ingress-nginx/";
var ret="https://kubernetes.io/blog/2025/11/11/ingress-nginx-retirement/";
var alb="https://kubernetes-sigs.github.io/aws-load-balancer-controller/";
var ist="https://istio.io/",ct="https://projectcontour.io/";
var land="https://landscape.cncf.io/guide#introduction";
var mig="https://www.cncf.io/blog/2026/04/13/ingress-nginx-to-envoy-gateway-migration-on-cncf-internal-services-cluster/";
var guide=L("CNCF Landscape Guide",land);
var o={
latest:L("Gateway API",gw),
common:[L("Envoy Gateway",eg),L("Traefik",tr),L("Kong Gateway",kg)],
see:[L("ingress-nginx (retired Mar 2026)",ret),L("ingress-nginx project",ngx),guide,L("CNCF Envoy Gateway migration",mig),L("Contour",ct),L("AWS Load Balancer Controller",alb),L("Istio",ist)],
project:L("Gateway API",gw)
};
var wd={
w:"The hop is Gateway API, usually Envoy Gateway. ingress-nginx was the most-used Ingress controller. Kubernetes retired it March 2026 (no more releases, bugfixes, or security updates). Existing installs still run. Do not start a new cluster on it.",
d:["Latest: Gateway API + Envoy Gateway.","Also used: Traefik, Kong, Contour, AWS Load Balancer Controller, Istio.","ingress-nginx: retired March 2026. See the Kubernetes retirement post.","The Ingress API itself is not retired. It is feature-frozen. The controller is what died.","CNCF moved its services cluster off ingress-nginx to Envoy Gateway in April 2026. That is the in-practice combo."]
};
["p-ingress","ys-ingress","ingress","serve-6"].forEach(function(k){if(D[k])Object.assign(D[k],o)});
["p-ingress","ys-ingress"].forEach(function(k){if(D[k])Object.assign(D[k],wd)});
if(D["ys-ingress"]&&D["ys-ingress"].d)D["ys-ingress"].d.push("Usual combo is Gateway API + Envoy Gateway + cert-manager. Legacy clusters may still have ingress-nginx; it is retired as of March 2026.");
["overview"].forEach(function(k){
  if(!D[k])return;
  if(!D[k].see)D[k].see=[];
  var has=D[k].see.some(function(x){return x&&x.href===land});
  if(!has)D[k].see.push(guide);
  D[k].project=guide;
  if(D[k].d)D[k].d.push("CNCF Landscape Guide is how to read the current project catalog.");
});
})(window.IDP_DATA);
