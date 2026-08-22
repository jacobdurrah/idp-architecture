window.IDP_DATA = Object.assign(window.IDP_DATA || {}, {
  "package": {
    "n": "Agent package (what promotes)",
    "p": "ctrl",
    "w": "The agent package is the thing that crosses the guard. It holds a signed container image (newsfeed-service:v1827 from PR #4821 as the app example), prompts, tool/MCP schemas, an unclass eval set, and IaC.",
    "y": "If you promote a chat, you have no digest, no schema pin, and no eval set. The package is reviewable. A transcript is not.",
    "d": [
      "Assembled on the low-side. Verified on the high-side (Cosign, local registry, local catalog).",
      "Does not include production data or high-side traces.",
      "Same package shape on both sides. The high-side copy is not a sync back."
    ]
  },
  "hi-sipr": {
    "n": "SIPR (~ IL6)",
    "p": "metal",
    "w": "Secret network. Standard DoD mapping is SIPR ~ IL6. Air-gapped or tightly guarded. Same CNCF stack, disconnected. This is a mapping label, not a vendor IL claim.",
    "y": "Secret work cannot sit on the internet or on an IL4-shaped GovCloud fence. The stack is the same. The wires are not.",
    "d": [
      "Standard DoD mapping, not an internal product rating.",
      "Pulls arrive as a promoted package, not as a live registry1 session.",
      "Evals and probers for this enclave live here. Traces stay."
    ],
    "see": [
      {
        "n": "AWS Secret Cloud",
        "href": "https://aws.amazon.com/federal/secret-cloud/"
      }
    ],
    "seeHref": "https://aws.amazon.com/federal/secret-cloud/",
    "seeLabel": "AWS Secret Cloud"
  },
  "hi-jwics": {
    "n": "JWICS (~ IL7)",
    "p": "metal",
    "w": "TS/SCI network. Standard DoD mapping is JWICS ~ IL7. More guarded than SIPR. Same rule: the agent package promotes in. Traces do not promote out.",
    "y": "TS is not a stricter VPC of Secret. It is another enclave with its own catalog, registry, and evals.",
    "d": [
      "Standard DoD mapping, not a vendor claim.",
      "Model IDs must exist in this enclave catalog, not the low-side Bedrock list.",
      "newsfeed-service:v1827 only appears if that image was in a package that this enclave accepted."
    ]
  },
  "hi-registry": {
    "n": "Local registry (Harbor + Cosign)",
    "p": "infra",
    "w": "A Harbor mirror of Iron Bank, plus Cosign verify, inside the enclave. The high-side does not phone registry1. The agent package lands here as a signed image.",
    "y": "Disconnected Kubernetes still needs an OCI registry. The 2021 design names a locally centralized artifact repository for Iron Bank pulls.",
    "d": [
      "Mirror, then verify. Do not run unverified internet tags.",
      "newsfeed-service:v1827 is stored by digest after Cosign.",
      "No high-to-low replication of what this registry learned from production."
    ],
    "see": [
      {
        "n": "Iron Bank overview",
        "href": "https://p1docs.dso.mil/iron-bank/overview"
      },
      {
        "n": "Official DoD PDF",
        "href": "https://dodcio.defense.gov/Portals/0/Documents/Library/DoD%20Enterprise%20DevSecOps%20Reference%20Design%20-%20CNCF%20Kubernetes%20w-DD1910_cleared_20211022.pdf"
      }
    ]
  },
  "hi-catalog": {
    "n": "Enclave model catalog",
    "p": "data",
    "w": "The model ID must exist in that enclave's catalog. A low-side Bedrock ID is not a high-side grant. Prompts and MCP schemas arrive in the agent package and are bound to IDs this catalog lists.",
    "y": "Otherwise a promote smuggles a model the AO never saw.",
    "d": [
      "Catalog is local. Same idea as the local registry.",
      "Prototype on low-side Bedrock. Pin on high-side only if the ID exists here.",
      "Outputs that saw high-side data stay in this enclave."
    ]
  },
  "hi-evals": {
    "n": "High-side evals and probers",
    "p": "obs",
    "w": "Evals and probers live here. Traces stay. The unclass eval set can arrive in the package. Production traces and retrieved classified context do not go back to low-side CI.",
    "y": "A low-side eval cannot see Secret fixtures. A high-side eval that writes home has broken the guard.",
    "d": [
      "Same CNCF observe stack, disconnected.",
      "PR #4821 is a low-side board. High-side has its own boards.",
      "Model outputs that saw high-side data are traces. They stay."
    ]
  }
});
