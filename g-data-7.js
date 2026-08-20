window.IDP_DATA = Object.assign(window.IDP_DATA || {}, {
  "step5": {
    "n": "5. Store the image",
    "p": "step",
    "w": "The registry accepts newsfeed-service:v1827 as an immutable digest. If the digest is not here, no pod will start. Promotion is a new pointer, not a rebuild.",
    "y": "CI writes. The cluster reads. The registry is the contract in the middle.",
    "d": []
  },
  "step6": {
    "n": "6. Bump deploy manifests",
    "p": "step",
    "w": "CI writes the digest into the Deployment in the manifests repo. That write is the deploy. CI still has not talked to Kubernetes.",
    "y": "Intent that is not in Git is not intent. The bump is how a stored image becomes something Argo CD can see.",
    "d": []
  },
  "step7": {
    "n": "7. CI ends, CD begins",
    "p": "step",
    "w": "CI's job is over: validate, build, store, record. Continuous delivery is the always-on reconciler, not a deploy stage in the same pipeline.",
    "y": "Keeping CI credentials out of the cluster is a security property and a design property. This badge exists so nobody hides a kubectl behind a job named release.",
    "d": []
  },
  "step8": {
    "n": "8. Argo CD syncs",
    "p": "step",
    "w": "The always-on reconciler diffs the manifests repo against the API server and syncs. Drift from a console click is reversed. This is not a CI job.",
    "y": "Pull-based delivery is how production stays converged to Git after the humans have gone home.",
    "d": []
  },
  "step9": {
    "n": "9. Serve user traffic",
    "p": "step",
    "w": "The scheduler places pods. Nodes pull the image. A rolling deploy replaces the old replica set. DNS, CDN, load balancer, and ingress shift user traffic onto v1827.",
    "y": "A digest that never serves a request is a souvenir. This badge is the data-plane proof that the golden path completed.",
    "d": []
  },
  "step10": {
    "n": "10. Observe and feed back",
    "p": "step",
    "w": "Each pod and node emits metrics, logs, and traces through OpenTelemetry. SLIs drive HPA, canaries, and pages. A bad deploy is rolled back through Git, not by re-running a deploy script.",
    "y": "The path is a loop. Telemetry is how the next change gets smarter and how this change gets reverted if it was wrong.",
    "d": []
  }
});
