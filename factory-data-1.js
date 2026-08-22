window.IDP_DATA = Object.assign(window.IDP_DATA || {}, {
  "notyet": {
    "n": "NOT YET. Agents and MCP",
    "p": "alert",
    "w": "No DoD reference design covers AI agents, agent orchestration, or MCP. Anyone claiming one is describing something that does not exist. The agent package on Sides is this site's promote unit, not a Department RD.",
    "y": "The work is tasked, not delivered. Until a real RD exists, security is a bridge: NIST AI RMF, SP 800-218 (SSDF), and the MCP spec.",
    "d": [
      "DoD CIO FY25-26 Software Modernization Implementation Plan tasks creating a DevSecOps RD for AI and software-based automation.",
      "Jan 2026 DoW AI Acceleration Strategy names an Agent Network priority.",
      "DoD AI Cybersecurity Risk Management Tailoring Guide v2 (July 2025) is RMF tailoring, not architecture.",
      "newsfeed-service:v1827 / PR #4821 remain the app example. They do not mint a missing RD."
    ],
    "see": [
      {
        "n": "NIST AI RMF",
        "href": "https://www.nist.gov/itl/ai-risk-management-framework"
      },
      {
        "n": "NIST SP 800-218 (SSDF)",
        "href": "https://csrc.nist.gov/pubs/sp/800/218/final"
      },
      {
        "n": "MCP specification",
        "href": "https://modelcontextprotocol.io/"
      },
      {
        "n": "DoD CIO Library",
        "href": "https://dodcio.defense.gov/library/"
      }
    ],
    "seeHref": "https://www.nist.gov/itl/ai-risk-management-framework",
    "seeLabel": "NIST AI RMF (bridge, not a DoD RD)"
  },
  "interconnect": {
    "n": "Figure 1. Kubernetes interconnects (v2.1, stale)",
    "p": "ctrl",
    "w": "Figure 1 names the interconnects that must be present. The DevSecOps platform is three layers: Infrastructure, Platform/Software Factory, and Application(s).",
    "y": "Interconnects let a program tailor tools without dropping core factory capabilities.",
    "d": [
      "Cloud Native Access Point (CNAP) at Infrastructure manages north-south traffic.",
      "A conformant Kubernetes installation in each development environment.",
      "A locally centralized artifact repository hosting Iron Bank (DCAR) hardened containers.",
      "A service mesh inside the orchestrator for east-west traffic.",
      "Mandatory Sidecar Container Security Stack (SCSS) for zero trust at the container."
    ],
    "see": [
      {
        "n": "Official PDF",
        "href": "https://dodcio.defense.gov/Portals/0/Documents/Library/DoD%20Enterprise%20DevSecOps%20Reference%20Design%20-%20CNCF%20Kubernetes%20w-DD1910_cleared_20211022.pdf"
      },
      {
        "n": "CNAP reference design (cited in the PDF)",
        "href": "https://dodcio.defense.gov/Portals/0/Documents/Library/CNAP_RefDesign_v1.0.pdf"
      }
    ],
    "seeHref": "https://dodcio.defense.gov/Portals/0/Documents/Library/DoD%20Enterprise%20DevSecOps%20Reference%20Design%20-%20CNCF%20Kubernetes%20w-DD1910_cleared_20211022.pdf",
    "seeLabel": "Official PDF (Figure 1)"
  },
  "cnap": {
    "n": "CNAP (north-south)",
    "p": "infra",
    "w": "Cloud Native Access Point. Figure 1 places CNAP on the Infrastructure layer to manage all north-south traffic. The PDF describes a zero-trust access path to development, testing, and production enclaves at IL-2, IL-4, and IL-5.",
    "y": "North-south is not the mesh. East-west is the service mesh. Mixing them hides the interconnect the design requires.",
    "d": [
      "Cited from Figure 1 and section 3.1 of the 2021 PDF.",
      "CNAP is an access architecture, not a substitute for Iron Bank or SCSS.",
      "IL-2 / IL-4 / IL-5 here are the PDF's CNAP access levels, not a high-side JWICS claim."
    ],
    "see": [
      {
        "n": "CNAP reference design (PDF footnote)",
        "href": "https://dodcio.defense.gov/Portals/0/Documents/Library/CNAP_RefDesign_v1.0.pdf"
      },
      {
        "n": "Official factory PDF",
        "href": "https://dodcio.defense.gov/Portals/0/Documents/Library/DoD%20Enterprise%20DevSecOps%20Reference%20Design%20-%20CNCF%20Kubernetes%20w-DD1910_cleared_20211022.pdf"
      }
    ],
    "seeHref": "https://dodcio.defense.gov/Portals/0/Documents/Library/CNAP_RefDesign_v1.0.pdf",
    "seeLabel": "CNAP reference design PDF"
  },
  "mesh": {
    "n": "Service mesh (east-west)",
    "p": "photon",
    "w": "Figure 1 and section 3.5. A service mesh inside the K8s orchestrator manages east-west traffic. Table 11 names a control plane (routing policies, authentication certificates) and a data plane (service communication data).",
    "y": "East-west without a mesh is the attack surface the design is trying to close. mTLS and deny-by-default are in the text.",
    "d": [
      "REQUIRED when the application uses microservices (Table 1).",
      "Control plane versus data plane is the document's wording, not this site's Plane tab.",
      "Coupled with behavior detection, the mesh can stop lateral movement."
    ],
    "see": [
      {
        "n": "Official PDF",
        "href": "https://dodcio.defense.gov/Portals/0/Documents/Library/DoD%20Enterprise%20DevSecOps%20Reference%20Design%20-%20CNCF%20Kubernetes%20w-DD1910_cleared_20211022.pdf"
      }
    ],
    "seeHref": "https://dodcio.defense.gov/Portals/0/Documents/Library/DoD%20Enterprise%20DevSecOps%20Reference%20Design%20-%20CNCF%20Kubernetes%20w-DD1910_cleared_20211022.pdf",
    "seeLabel": "Official PDF (section 3.5, Table 11)"
  },
  "scss": {
    "n": "Sidecar Container Security Stack",
    "p": "alert",
    "w": "Figure 3. SCSS is injected into each pod from Iron Bank. Baked-in, not bolt-on. Shares disk and network with the application container while keeping runtimes isolated.",
    "y": "The cyber stack can update without rebuilding the microservice. Zero trust down to the container is a Figure 1 must.",
    "d": [
      "Table 1 REQUIRED pieces include logging agent, log storage, container policy, runtime defense, vulnerability management, CVE service, zero trust to the pod.",
      "Service mesh proxy is REQUIRED if the app uses microservices.",
      "Continuous monitoring, signature scanning, runtime behavior analysis."
    ],
    "see": [
      {
        "n": "Official PDF",
        "href": "https://dodcio.defense.gov/Portals/0/Documents/Library/DoD%20Enterprise%20DevSecOps%20Reference%20Design%20-%20CNCF%20Kubernetes%20w-DD1910_cleared_20211022.pdf"
      },
      {
        "n": "Iron Bank overview",
        "href": "https://p1docs.dso.mil/iron-bank/overview"
      }
    ],
    "seeHref": "https://dodcio.defense.gov/Portals/0/Documents/Library/DoD%20Enterprise%20DevSecOps%20Reference%20Design%20-%20CNCF%20Kubernetes%20w-DD1910_cleared_20211022.pdf",
    "seeLabel": "Official PDF (Figure 3, Table 1)"
  }
});
