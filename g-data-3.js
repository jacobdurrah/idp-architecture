window.IDP_DATA = Object.assign(window.IDP_DATA || {}, {
  "terraform": {
    "n": "Terraform plan and apply",
    "p": "infra",
    "w": "Terraform creates the infrastructure. Argo CD deploys workloads onto it. Terraform is invoked (plan/apply) and then exits. Cloud resources follow the infra repo. This is a different life cycle from the numbered application path. App developers never run Terraform to ship a feature.",
    "y": "You need a tool that can mint a VPC and a database. You do not want that tool on the daily path. Making Terraform an explicit, rare, locked operation is how you avoid two writers for the same cloud object and how you keep production credentials off laptops.",
    "d": [
      "plan/apply versus the infra repo, then exit.",
      "Opposite personality from Argo CD (a daemon).",
      "Talks to remote state and to cloud provider APIs.",
      "Not a CI deploy job for application code."
    ]
  },
  "tfstate": {
    "n": "Remote state, locked",
    "p": "infra",
    "w": "Remote state (S3 plus DynamoDB lock, or GCS) is the other half of desired infra state. Git is human-readable intent. The backend is what Terraform last believed it created. The lock prevents concurrent apply.",
    "y": "Without a lock, two applies invent a third reality. Without remote state, laptops become the system of record. This box exists so plane B has a store, just as Git is the store for plane A.",
    "d": [
      "State snapshots and the lock.",
      "Talks to Terraform only.",
      "Not readable as a workflow by product engineers.",
      "A broken lock is an incident, not a retry loop you ignore."
    ]
  },
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
    ]
  },
  "users": {
    "n": "Internet users",
    "p": "ppl",
    "w": "People opening the product. Their traffic enters through DNS and CDN, then the cloud load balancer, then ingress, then the news-feed API. This is request traffic. It is not a deploy path. A deploy does not start because a user arrived.",
    "y": "The poster keeps users visible so the data plane has a reason. Control-plane excellence that cannot serve a request is a museum. Users also generate the SLIs that later drive HPA, pages, and the feedback loop.",
    "d": [
      "Users do not trigger CI, Terraform, or Argo CD.",
      "TLS and routing live at the edge, not in the app pods.",
      "This path is drawn on the left so it does not look like a deploy arrow.",
      "Badge 9 sits on this hop: the change is now serving traffic."
    ]
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
    ]
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
    ]
  },
  "k8s": {
    "n": "Managed Kubernetes",
    "p": "ctrl",
    "w": "Schedule, restart, scale, service discovery, networking, rolling deploys. The API server is the desired/actual gateway. Controllers converge. This cluster was provisioned by Terraform. Argo CD deploys workloads onto it. Product-engineer laptops are not clients of production.",
    "y": "Kubernetes is the runtime contract. It is why a Git digest becomes a running replica set without a human SSH. Managed control plane means the platform team does not run etcd as a hobby.",
    "d": [
      "Control plane plus data plane in one product.",
      "Always on. Not invoked per PR.",
      "Admission evaluates every write.",
      "HPA and cluster autoscaler run here, continuously."
    ]
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
    ]
  },
  "apiserver": {
    "n": "API server",
    "p": "ctrl",
    "w": "Desired/actual gateway. Kubernetes accepts the desired Deployment, Service, HPA, and Ingress here. Every other control loop is a client of this server. etcd sits behind it. Admission webhooks sit in front of persist.",
    "y": "There is one write path into the cluster for applications. Making that path the API server (via Argo CD) is what makes production explainable. Laptops that can talk to this server in production are an incident waiting to be named.",
    "d": [
      "Argo CD, HPA, CA, controllers. Not product-engineer laptops.",
      "Stores nothing itself. etcd is behind it.",
      "Admission evaluates provenance and the registry allow-list again.",
      "API latency is a platform SLO, not only an app SLO."
    ]
  },
  "scheduler": {
    "n": "Scheduler",
    "p": "ctrl",
    "w": "Binds pods to nodes. Once Argo CD has been accepted, the scheduler places the new replica set. It does not pull images. kubelet does that after the bind, using the node's cloud identity.",
    "y": "Placement is policy: resources, topology, taints, affinity. Without a scheduler you have a pile of machines. With one, a digest becomes a running process on a node that can actually pull it.",
    "d": [
      "Triggered by unbound pods in the API.",
      "Writes bindings. Does not pull images.",
      "Respects topology spread and disruption budgets.",
      "Unschedulable pods are a signal for the cluster autoscaler."
    ]
  }
});
