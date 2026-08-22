window.IDP_DATA = Object.assign(window.IDP_DATA || {}, {
  "host-embedded": {
    "n": "Embedded System",
    "p": "edge",
    "w": "Purpose statement: Embedded System. The K8s API is how software runs from Cloud to being embedded inside platforms like jets or satellites (section 3.2).",
    "y": "Weapons and platforms are in scope (section 1.4: business and weapons systems, C3, embedded, big data, AI).",
    "d": [
      "Still Certified Kubernetes and OCI containers.",
      "The factory produces the artifact. The embedded runtime must still include Kubernetes if it is production under this design.",
      "Do not invent extra platform names beyond the PDF."
    ]
  },
  "host-edge": {
    "n": "Edge Computing",
    "p": "edge",
    "w": "Purpose statement: Edge Computing. Same Certified K8s, same container unit, same Iron Bank harden path.",
    "y": "Edge is a location of the elastic factory, not a different methodology.",
    "d": [
      "Figure 2 notional nodes still apply.",
      "SCSS and mesh rules do not drop because the node is at the edge.",
      "Production still must include Kubernetes."
    ]
  },
  "production": {
    "n": "Production must include Kubernetes",
    "p": "step",
    "w": "Purpose: Kubernetes must be part of the production environment. Figure 5: after gates, the artifact is eligible for production. Deploy may be automated or a human button, then an ATC to turn it on.",
    "y": "A factory that stops at a staging cluster is not this design. The runtime is Certified K8s.",
    "d": [
      "Containerization is how the PDF says you avoid drift across dev, test, staging, production, and classification levels.",
      "Deploy tools: CNCF-certified Kubernetes and service mesh are REQUIRED (Table 11).",
      "newsfeed-service:v1827 is this site's example image that would be delivered to the registry (Table 12)."
    ],
    "see": [
      {
        "n": "Official PDF",
        "href": "https://dodcio.defense.gov/Portals/0/Documents/Library/DoD%20Enterprise%20DevSecOps%20Reference%20Design%20-%20CNCF%20Kubernetes%20w-DD1910_cleared_20211022.pdf"
      }
    ],
    "seeHref": "https://dodcio.defense.gov/Portals/0/Documents/Library/DoD%20Enterprise%20DevSecOps%20Reference%20Design%20-%20CNCF%20Kubernetes%20w-DD1910_cleared_20211022.pdf",
    "seeLabel": "Official PDF (purpose + Figure 5)"
  },
  "logging": {
    "n": "Figure 8. Logging and log analysis",
    "p": "obs",
    "w": "Figure 8: monitoring, logging, log analysis, and alerting. Starts at the pod: application, compute, storage, network, security, and data monitoring. Logs aggregate locally, then can forward to DCO / Tier 2 CSSP after a filter. Local SIEM/SOAR raises incidents.",
    "y": "Section 5.1: continuous monitoring must include behavior and signature-based detection. Table 15 names netflow, centralized logging (REQUIRED), and centralized analysis (PREFERRED).",
    "d": [
      "Cross-cut with policy enforcement and vulnerability management (Table 14).",
      "SCSS supplies the logging agent and runtime defense.",
      "This is the PDF's observe path. High-side traces still do not cross Sides."
    ],
    "see": [
      {
        "n": "Official PDF",
        "href": "https://dodcio.defense.gov/Portals/0/Documents/Library/DoD%20Enterprise%20DevSecOps%20Reference%20Design%20-%20CNCF%20Kubernetes%20w-DD1910_cleared_20211022.pdf"
      }
    ],
    "seeHref": "https://dodcio.defense.gov/Portals/0/Documents/Library/DoD%20Enterprise%20DevSecOps%20Reference%20Design%20-%20CNCF%20Kubernetes%20w-DD1910_cleared_20211022.pdf",
    "seeLabel": "Official PDF (Figure 8, section 5.1)"
  },
  "bigbang": {
    "n": "Big Bang (later practice)",
    "p": "ppl",
    "w": "Big Bang is one instantiation used at all classifications in later DoD practice. It is not a figure in the 2021 PDF. The FAQ is linked so you can see how programs instantiate Certified K8s plus Iron Bank today.",
    "y": "The 2021 design is CSP-agnostic and product-agnostic. Naming Big Bang here is a later-practice pointer, not a rewrite of Figure 5.",
    "d": [
      "Labeled later practice on purpose.",
      "The PDF instead names Platform One as the first DoD-wide approved DevSecOps managed service (https://p1.dso.mil).",
      "Use Factory labels from the PDF. Use Sides for the classification guard."
    ],
    "see": [
      {
        "n": "Big Bang FAQ (all classifications)",
        "href": "https://docs-bigbang.dso.mil/3.26.0/docs/getting-started/faq/"
      },
      {
        "n": "Platform One (named in the 2021 PDF)",
        "href": "https://p1.dso.mil"
      }
    ],
    "seeHref": "https://docs-bigbang.dso.mil/3.26.0/docs/getting-started/faq/",
    "seeLabel": "Big Bang FAQ (later practice)"
  }
});
