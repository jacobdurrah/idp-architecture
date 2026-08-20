window.IDP_DATA = Object.assign(window.IDP_DATA || {}, {
  "cloud-apis": {
    "n": "Cloud provider APIs",
    "p": "infra",
    "w": "AWS, GCP, or Azure APIs. Terraform is the client. This is where a VPC, a GKE or EKS cluster, Cloud SQL, Redis, Kafka, IAM, and KMS actually come into existence. The data-plane substrate on the right of this band is the result.",
    "y": "The cloud account is the real world. Git and state are opinions about it. Talking to the APIs through Terraform, and only through Terraform for create/destroy, is how the account stays explainable.",
    "d": [
      "VPC, GKE/EKS, SQL, Redis, Kafka, IAM, KMS.",
      "Triggered by Terraform apply, not by application CI.",
      "The cluster Argo CD talks to was minted here.",
      "Console clicks are drift against this intent."
    ],
    "triggers": "Terraform apply.",
    "stores": "The cloud's own resource graph (the real world).",
    "talksTo": "The data-plane substrate: VPC, cluster, nodes, LBs, databases, object storage, IAM, DNS, secrets, queues."
  },
  "users": {
    "n": "Internet users",
    "p": "ppl",
    "w": "Internet users, via DNS / CDN → cloud LB → ingress / API gateway → News Feed API. This is request traffic, not a deploy path. A deploy does not start because a user arrived. Their SLIs later drive HPA, pages, and the feedback loop.",
    "y": "The poster keeps users visible so the data plane has a reason. Control-plane excellence that cannot serve a request is a museum. Users also generate the SLIs that later drive HPA, pages, and the feedback loop.",
    "d": [
      "Users do not trigger CI, Terraform, or Argo CD.",
      "TLS and routing live at the edge, not in the app pods.",
      "This path is drawn on the left so it does not look like a deploy arrow.",
      "Badge 9 sits on this hop: the change is now serving traffic."
    ],
    "triggers": "People opening the product.",
    "stores": "TLS certs and routing rules (ingress), not application state.",
    "talksTo": "News Feed API, then the six app services."
  },
  "cloud": {
    "n": "Cloud provider",
    "p": "data",
    "w": "The running account: network, managed Kubernetes, edge, worker nodes, and managed data services. Terraform provisioned this. Argo CD deploys workloads onto it. Pods, load balancers, and databases are data plane. The API server, HPA, cluster autoscaler, and Argo CD are control plane living here.",
    "y": "A platform without a crisp cloud boundary will leak credentials and confuse life cycles. This box is the substrate. Everything above it is how intent is formed. Everything inside it is how intent becomes packets and rows.",
    "d": [
      "Provisioned by plane B, consumed by the golden path.",
      "The numbered path enters as objects and images, not as SSH.",
      "Managed services are preferred over pets.",
      "Tap inner boxes for the honest detail."
    ],
    "triggers": "A successful Terraform apply created it. Argo CD writes workload objects onto it.",
    "stores": "The running cloud account.",
    "talksTo": "Users at the edge, datastores on the right, OTel on the way out."
  },
  "vpc": {
    "n": "VPC",
    "p": "infra",
    "w": "The virtual network the cluster and data services share: subnets, routing, security groups, private endpoints. User traffic enters from the edge. East-west traffic between services stays inside. Datastores are not on the public internet.",
    "y": "Network is policy you can see. A flat, public default is how test data and production credentials leak. Encoding the VPC in Terraform makes the boundary reviewable.",
    "d": [
      "Created by Terraform, not by application CI.",
      "Private nodes, public edge, explicit peering.",
      "Security groups are desired state, not a ticket.",
      "The cluster and the data services live here together."
    ],
    "triggers": "Terraform apply.",
    "stores": "Subnets, routes, security groups, private endpoints.",
    "talksTo": "The cluster and the managed data services."
  },
  "k8s": {
    "n": "Managed Kubernetes",
    "p": "ctrl",
    "w": "Schedule, restart, scale, service discovery, networking, rolling deploys. The API server is the desired/actual gateway. This cluster was provisioned by Terraform. Argo CD deploys workloads onto it. Step 10 is the API accepting desired objects. Step 11 is kubelet pulling newsfeed-service:v1827.",
    "y": "Kubernetes is the runtime contract. It is why a Git digest becomes a running replica set without a human SSH. Managed control plane means the platform team does not run etcd as a hobby.",
    "d": [
      "Control plane plus data plane in one product.",
      "Always on. Not invoked per PR.",
      "Admission evaluates every write.",
      "HPA and cluster autoscaler run here, continuously."
    ],
    "triggers": "Argo CD writes desired workload objects. HPA and cluster autoscaler write scale decisions from observability signals.",
    "stores": "etcd, via the API server: every Deployment, Pod, Service, HPA, Ingress.",
    "talksTo": "kubelets on worker nodes, the cloud provider (via CCM / CA), and Argo CD."
  },
  "k8s-cp": {
    "n": "Kubernetes control plane",
    "p": "ctrl",
    "w": "API server, scheduler, and controller manager. Together they are the always-on control loop that turns desired objects into running pods. Argo CD is a client of this plane. So are HPA and the cluster autoscaler.",
    "y": "If this plane is unhealthy, GitOps cannot sync and the data plane cannot heal. Treating it as a managed service with its own SLOs is part of owning an IDP, not an afterthought.",
    "d": [
      "Always on, process-supervised by the provider.",
      "Every other control loop is a client of the API server.",
      "Desired state for workloads still lives in Git.",
      "Platform telemetry watches this plane as carefully as the apps."
    ],
    "triggers": "Process supervisors and the cluster itself. Not a cron that deploys.",
    "stores": "Live control state. Desired state remains in Git.",
    "talksTo": "Each other, admission webhooks, kubelets."
  },
  "apiserver": {
    "n": "API server",
    "p": "ctrl",
    "w": "Desired / actual gateway. Step 10: Kubernetes API accepts the desired Deployment / Service / HPA / Ingress after admission. Every other control loop is a client of this server. Product-engineer laptops are not clients of production.",
    "y": "There is one write path into the cluster for applications. Making that path the API server (via Argo CD) is what makes production explainable. Laptops that can talk to this server in production are an incident waiting to be named.",
    "d": [
      "Argo CD, HPA, CA, controllers. Not product-engineer laptops.",
      "Stores nothing itself. etcd is behind it.",
      "Admission evaluates provenance and the registry allow-list again.",
      "API latency is a platform SLO, not only an app SLO."
    ],
    "triggers": "Argo CD, HPA, cluster autoscaler, controllers.",
    "stores": "Nothing itself. etcd is behind it.",
    "talksTo": "etcd, admission webhooks, every controller and kubelet."
  }
});
