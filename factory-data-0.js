window.IDP_DATA = Object.assign(window.IDP_DATA || {}, {
  "overview": {
    "n": "DoD DevSecOps doctrine, not one PDF",
    "p": "step",
    "w": "Current DoD DevSecOps doctrine is Fundamentals v2.5 (approved Oct 2024) plus the Activities and Tools Guidebook v2.5 (April 2025). The CNCF Kubernetes reference design is still v2.1 (Sept/Oct 2021). It was nominally expired a year after publication and was never revised. Treat it as a stale-but-still-listed interconnect spec (Iron Bank, CNAP, sidecar security stack, service mesh). This tab is a reading, not a replacement.",
    "y": "Staff review mixes current doctrine, a leftover interconnect spec, a 2022 successor design, and a gap: no DoD reference design covers AI agents, agent orchestration, or MCP.",
    "d": [
      "NOW: Fundamentals v2.5. Activities and Tools v2.5 is listed on the CIO library. An exact April 2025 PDF filename was not verified here, so that card links the library.",
      "INTERCONNECT (stale, still listed): CNCF Kubernetes v2.1. Figures below are from that PDF only.",
      "SUCCESSOR DESIGN: CNCF Multi-Cluster Kubernetes v1.0 (July 2022). Also 2022: AWS Managed Services RD, Cloud/GitHub-Azure RD.",
      "NOT YET: no DoD RD for agents or MCP. FY25-26 Software Modernization Implementation Plan tasks one. Jan 2026 DoW AI Acceleration Strategy names an Agent Network priority. The July 2025 AI Cybersecurity Risk Management Tailoring Guide v2 is RMF tailoring, not architecture.",
      "Agent and MCP security today: bridge NIST AI RMF, SP 800-218, and the MCP spec. Not a DoD RD. newsfeed-service:v1827 / PR #4821 stay the app example."
    ],
    "see": [
      {
        "n": "DoD CIO Library",
        "href": "https://dodcio.defense.gov/library/"
      },
      {
        "n": "Fundamentals v2.5",
        "href": "https://dodcio.defense.gov/Portals/0/Documents/Library/DoD%20Enterprise%20DevSecOps%20Fundamentals%20v2.5.pdf"
      },
      {
        "n": "CNCF Kubernetes v2.1 (stale, still listed)",
        "href": "https://dodcio.defense.gov/Portals/0/Documents/Library/DoD%20Enterprise%20DevSecOps%20Reference%20Design%20-%20CNCF%20Kubernetes%20w-DD1910_cleared_20211022.pdf"
      },
      {
        "n": "CNCF Multi-Cluster Kubernetes v1.0",
        "href": "https://dodcio.defense.gov/Portals/0/Documents/Library/DoDReferenceDesign-CNCFMulti-ClusterKubernetes.pdf"
      },
      {
        "n": "State of DevSecOps (Mar 2025)",
        "href": "https://dodcio.defense.gov/Portals/0/Documents/Library/DevSecOpsStateOf.pdf"
      }
    ],
    "seeHref": "https://dodcio.defense.gov/Portals/0/Documents/Library/DoD%20Enterprise%20DevSecOps%20Fundamentals%20v2.5.pdf",
    "seeLabel": "Current doctrine: Fundamentals v2.5"
  },
  "now": {
    "n": "NOW. Fundamentals v2.5",
    "p": "step",
    "w": "Current doctrine is DoD Enterprise DevSecOps Fundamentals v2.5 (approved Oct 2024). The Activities and Tools Guidebook v2.5 (April 2025) sits beside it. The March 2025 State of DevSecOps report cites the revised Fundamentals.",
    "y": "Do not treat the 2021 Kubernetes reference design as the living doctrine. Doctrine moved. That PDF did not.",
    "d": [
      "Fundamentals v2.5 is the educational compendium. Reference designs only augment required tools. They do not replace Fundamentals.",
      "Activities and Tools v2.5 is listed on the CIO library as DoW Enterprise DevSecOps Activities and Tools Guidebook. This build could not verify a distinct April 2025 PDF URL, so the link is the library.",
      "State of DevSecOps (March 2025) cites the newly revised Fundamentals."
    ],
    "see": [
      {
        "n": "Fundamentals v2.5 PDF",
        "href": "https://dodcio.defense.gov/Portals/0/Documents/Library/DoD%20Enterprise%20DevSecOps%20Fundamentals%20v2.5.pdf"
      },
      {
        "n": "DoD CIO Library (Activities and Tools v2.5 listing)",
        "href": "https://dodcio.defense.gov/library/"
      },
      {
        "n": "State of DevSecOps, March 2025",
        "href": "https://dodcio.defense.gov/Portals/0/Documents/Library/DevSecOpsStateOf.pdf"
      }
    ],
    "seeHref": "https://dodcio.defense.gov/Portals/0/Documents/Library/DoD%20Enterprise%20DevSecOps%20Fundamentals%20v2.5.pdf",
    "seeLabel": "Fundamentals v2.5 PDF"
  },
  "stale": {
    "n": "INTERCONNECT. CNCF Kubernetes v2.1 (stale)",
    "p": "alert",
    "w": "Still v2.1 (Sept 2021 / DD1910 cleared 22 Oct 2021). Nominally expired a year after publication. Never revised. Still listed. Use it only as the interconnect spec: Iron Bank, CNAP, Sidecar Container Security Stack, service mesh. The figure cards below are that document, labeled as such.",
    "y": "A listed PDF is not current doctrine. Selling it as today's factory is the error this tab is here to stop.",
    "d": [
      "For CNCF Certified Kubernetes implementations only, in that document.",
      "Visualize only names extracted from that PDF. Do not promote it to v2.5.",
      "2022 also published AWS Managed Services RD and Cloud/GitHub-Azure RD (library lists drafts)."
    ],
    "see": [
      {
        "n": "CNCF Kubernetes v2.1 PDF",
        "href": "https://dodcio.defense.gov/Portals/0/Documents/Library/DoD%20Enterprise%20DevSecOps%20Reference%20Design%20-%20CNCF%20Kubernetes%20w-DD1910_cleared_20211022.pdf"
      },
      {
        "n": "DoD CIO Library",
        "href": "https://dodcio.defense.gov/library/"
      }
    ],
    "seeHref": "https://dodcio.defense.gov/Portals/0/Documents/Library/DoD%20Enterprise%20DevSecOps%20Reference%20Design%20-%20CNCF%20Kubernetes%20w-DD1910_cleared_20211022.pdf",
    "seeLabel": "Stale interconnect spec (v2.1 PDF)"
  },
  "successor": {
    "n": "SUCCESSOR. Multi-Cluster v1.0",
    "p": "ctrl",
    "w": "Closest successor design is DoD Enterprise DevSecOps Reference Design: CNCF Multi-Cluster Kubernetes v1.0 (July 2022). It is a design, not a rewrite of Fundamentals v2.5.",
    "y": "If you need a Kubernetes reference design after 2021, start here, then read current Fundamentals. Do not invent figure labels for this PDF on this poster.",
    "d": [
      "July 2022. Listed on the CIO library next to the stale single-cluster CNCF Kubernetes RD.",
      "Also 2022: AWS Managed Services RD, Cloud/GitHub-Azure RD.",
      "This card is a pointer. Figures on this poster stay the 2021 interconnect names only."
    ],
    "see": [
      {
        "n": "CNCF Multi-Cluster Kubernetes v1.0",
        "href": "https://dodcio.defense.gov/Portals/0/Documents/Library/DoDReferenceDesign-CNCFMulti-ClusterKubernetes.pdf"
      },
      {
        "n": "DoD CIO Library",
        "href": "https://dodcio.defense.gov/library/"
      }
    ],
    "seeHref": "https://dodcio.defense.gov/Portals/0/Documents/Library/DoDReferenceDesign-CNCFMulti-ClusterKubernetes.pdf",
    "seeLabel": "Multi-Cluster v1.0 PDF"
  }
});
