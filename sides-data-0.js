window.IDP_DATA = Object.assign(window.IDP_DATA || {}, {
  "overview": {
    "n": "Low-side to high-side",
    "p": "step",
    "w": "A classification split, not a staging/prod metaphor. Left is unclassified / CUI. Right is Secret / TS. The middle is a one-way guard. The agent package is what promotes. newsfeed-service:v1827 and PR #4821 are the app example that can ride in that package.",
    "y": "High-side traces and retrieved classified context must not walk back to the internet. The same CNCF stack can run on both sides, disconnected.",
    "d": [
      "Low-side: internet or GovCloud, prototypes, CI on unclass fixtures. Iron Bank (IL2 public) is pulled here.",
      "The package goes low to high. Production data, user traces, classified context, and model outputs that saw high-side data do not go high to low.",
      "High-side: SIPR ~ IL6, JWICS ~ IL7 (standard DoD mapping, not a vendor claim). Local registry, Cosign verify, evals stay.",
      "This tab is an IDP reading. Official DoD factory language lives on Factory."
    ],
    "see": [
      {
        "n": "DoD Enterprise DevSecOps Reference Design (CNCF Kubernetes, Oct 2021)",
        "href": "https://dodcio.defense.gov/Portals/0/Documents/Library/DoD%20Enterprise%20DevSecOps%20Reference%20Design%20-%20CNCF%20Kubernetes%20w-DD1910_cleared_20211022.pdf"
      },
      {
        "n": "CNCF Landscape Guide",
        "href": "https://landscape.cncf.io/guide#introduction"
      },
      {
        "n": "Iron Bank overview",
        "href": "https://p1docs.dso.mil/iron-bank/overview"
      }
    ],
    "seeHref": "https://dodcio.defense.gov/Portals/0/Documents/Library/DoD%20Enterprise%20DevSecOps%20Reference%20Design%20-%20CNCF%20Kubernetes%20w-DD1910_cleared_20211022.pdf",
    "seeLabel": "Official DoD PDF (DD1910 cleared, Oct 2021)"
  },
  "lo-internet": {
    "n": "Internet (unclass / CUI)",
    "p": "data",
    "w": "Commercial internet is the open low-side. Prototypes, public docs, and unclass fixtures live here. newsfeed-service:v1827 can be built and reviewed as PR #4821 before any promotion.",
    "y": "You need a place that can see the public catalog and talk to commercial CI. That is not the high-side.",
    "d": [
      "Unclassified / CUI only. No production high-side data.",
      "Pull Iron Bank here (IL2 public). Do not expect a push of classified traces back out.",
      "The agent package is assembled here, then promoted. The app example is newsfeed-service:v1827."
    ]
  },
  "lo-govcloud": {
    "n": "GovCloud fence (FedRAMP High / IL4-shaped)",
    "p": "infra",
    "w": "A managed federal boundary on the low-side. Inherited FedRAMP High / IL4 fence. A named example is Knox on AWS GovCloud (June 2026 PR). That is a fence example, not a classification claim for any vendor product.",
    "y": "Some low-side work needs a federal boundary without crossing into Secret. The fence is inherited ATO shape, not a high-side enclave.",
    "d": [
      "Still low-side. CUI can sit here. Secret and TS do not.",
      "Knox on AWS GovCloud is cited only as a public FedRAMP High example.",
      "Same CNCF stack as the rest of the factory, still connected enough to pull Iron Bank."
    ],
    "see": [
      {
        "n": "Vannevar FedRAMP High through Knox (PR, June 2026)",
        "href": "https://www.prnewswire.com/news-releases/vannevar-achieves-fedramp-high-authorization-through-partnership-with-knox-systems-302807632.html"
      }
    ],
    "seeHref": "https://www.prnewswire.com/news-releases/vannevar-achieves-fedramp-high-authorization-through-partnership-with-knox-systems-302807632.html",
    "seeLabel": "June 2026 PR: FedRAMP High through Knox"
  },
  "lo-bedrock": {
    "n": "Prototypes and Bedrock catalog",
    "p": "data",
    "w": "Low-side model work uses a commercial or GovCloud Bedrock catalog. Prototypes, prompts, and tool/MCP schemas are drafted here. The model ID that ships high-side must later exist in that enclave catalog.",
    "y": "You cannot invent a high-side model ID on the internet. You can prototype the agent package against an unclass catalog.",
    "d": [
      "Commercial or GovCloud Bedrock is a low-side catalog.",
      "Prompts and MCP schemas go in the package that promotes.",
      "High-side will refuse a model ID that is not in its own catalog."
    ]
  },
  "lo-ci": {
    "n": "CI and unclass evals",
    "p": "ctrl",
    "w": "CI builds the image and runs evals on unclassified fixtures. PR #4821 is the review board. The agent package is the thing CI stamps, not a chat log.",
    "y": "Gates have to fail closed on the low-side before a one-way promote. High-side evals are a different board and they stay there.",
    "d": [
      "Fixtures are unclass. Do not smuggle production traces into CI.",
      "newsfeed-service:v1827 is the app image CI produces.",
      "The agent package also carries prompts, schemas, the unclass eval set, and IaC."
    ]
  },
  "lo-ironbank": {
    "n": "Iron Bank pull (IL2 public)",
    "p": "infra",
    "w": "Iron Bank (registry1) is the DoD centralized artifact repository of hardened, signed containers. It is IL2 public. You pull here on the low-side. The high-side later mirrors what it is allowed to hold.",
    "y": "A factory that invents its own base images skips the hardened set the 2021 reference design names.",
    "d": [
      "IL2 public. Pull, do not treat it as a high-side registry.",
      "The official design stores Iron Bank pulls in a locally centralized artifact repository.",
      "High-side uses a Harbor mirror and Cosign verify, not a live internet pull."
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
    ],
    "seeHref": "https://p1docs.dso.mil/iron-bank/overview",
    "seeLabel": "Iron Bank overview"
  },
  "guard": {
    "n": "One-way guard",
    "p": "alert",
    "w": "A classification split. The package goes low to high. Production data, user traces, retrieved classified context, and model outputs that saw high-side data do not go high to low. This is not staging versus prod.",
    "y": "If the guard is two-way, the high-side is just another VPC. The point of the split is that traces stay.",
    "d": [
      "Goes: container image, prompts, tool/MCP schemas, unclass eval set, IaC.",
      "Does not go: production data, user traces, classified retrieval, high-side model outputs.",
      "The agent package is the promote unit. newsfeed-service:v1827 is the app example inside it."
    ]
  },
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
  }
});
