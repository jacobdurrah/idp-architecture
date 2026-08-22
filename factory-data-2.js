window.IDP_DATA = Object.assign(window.IDP_DATA || {}, {
  "phases": {
    "n": "Figure 4. Implementation phases",
    "p": "step",
    "w": "All software factory implementations go through four phases: Design, Instantiate, Verify, Operate and Monitor. Security is applied across all phases. SCSS monitors the application.",
    "y": "These are the PDF's factory phases. They are not a second copy of Develop / Build / Test / Release and Deliver / Deploy / Operate / Monitor (the lifecycle tables).",
    "d": [
      "Design, Instantiate, Verify, Operate and Monitor (Figure 4).",
      "Instantiate: CSP-agnostic CNCF Certified K8s, hardened containers from Iron Bank.",
      "Lifecycle tables later name Develop, Build, Test, Release and Deliver, Deploy, Operate, Monitor."
    ],
    "see": [
      {
        "n": "Official PDF",
        "href": "https://dodcio.defense.gov/Portals/0/Documents/Library/DoD%20Enterprise%20DevSecOps%20Reference%20Design%20-%20CNCF%20Kubernetes%20w-DD1910_cleared_20211022.pdf"
      }
    ],
    "seeHref": "https://dodcio.defense.gov/Portals/0/Documents/Library/DoD%20Enterprise%20DevSecOps%20Reference%20Design%20-%20CNCF%20Kubernetes%20w-DD1910_cleared_20211022.pdf",
    "seeLabel": "Official PDF (Figure 4)"
  },
  "cicd": {
    "n": "Figure 5. CI/CD orchestrator",
    "p": "ctrl",
    "w": "Figure 5 is the containerized software factory. A check-in triggers the CI/CD orchestrator: automated build, SAST, DAST, unit and other tests, then a container security scan. Stages have entrance and exit gates (Table 2).",
    "y": "There is no one size fits all toolchain. The orchestrator is REQUIRED. Tools are pluggable and must come from Iron Bank hardened containers.",
    "d": [
      "If tests pass, the artifact moves to the test environment, then may deploy to production.",
      "Production deploy may be a human button. Turning it on typically needs an Authorization to Connect (ATC).",
      "newsfeed-service:v1827 / PR #4821 is this site's app example of a check-in, not a figure in the PDF."
    ],
    "see": [
      {
        "n": "Official PDF",
        "href": "https://dodcio.defense.gov/Portals/0/Documents/Library/DoD%20Enterprise%20DevSecOps%20Reference%20Design%20-%20CNCF%20Kubernetes%20w-DD1910_cleared_20211022.pdf"
      }
    ],
    "seeHref": "https://dodcio.defense.gov/Portals/0/Documents/Library/DoD%20Enterprise%20DevSecOps%20Reference%20Design%20-%20CNCF%20Kubernetes%20w-DD1910_cleared_20211022.pdf",
    "seeLabel": "Official PDF (Figure 5, Table 2)"
  },
  "ironbank": {
    "n": "Iron Bank (harden / sign)",
    "p": "infra",
    "w": "Iron Bank is the DoD Centralized Artifact Repository (DCAR) of digitally signed, hardened, STIG-compliant containers. The factory and the applications pull different Iron Bank sets. Instantiations must use those hardened containers.",
    "y": "Section 4 says the factory is created from DevSecOps tools stored in Iron Bank. That is the harden and sign step the poster names.",
    "d": [
      "At writing (2021) the PDF said over 300 artifacts, with more added.",
      "Container builder must use an Iron Bank base image in all cases (Table 5).",
      "IL2 public pull is the Sides low-side move. This card is the factory fact."
    ],
    "see": [
      {
        "n": "Iron Bank overview",
        "href": "https://p1docs.dso.mil/iron-bank/overview"
      },
      {
        "n": "Official PDF",
        "href": "https://dodcio.defense.gov/Portals/0/Documents/Library/DoD%20Enterprise%20DevSecOps%20Reference%20Design%20-%20CNCF%20Kubernetes%20w-DD1910_cleared_20211022.pdf"
      },
      {
        "n": "Platform One (named in the PDF)",
        "href": "https://p1.dso.mil"
      }
    ],
    "seeHref": "https://p1docs.dso.mil/iron-bank/overview",
    "seeLabel": "Iron Bank overview"
  },
  "artifact": {
    "n": "Locally centralized artifact repository",
    "p": "infra",
    "w": "Section 3.3. A local repository tied to the factory. It stores Iron Bank pulls and locally developed artifacts: container images, binaries, VM images, archives, documentation.",
    "y": "Figure 1 requires a clear local repo. Programs may use one repo with tags, or separate local and released repos.",
    "d": [
      "This is the factory-side twin of the high-side Harbor mirror on Sides.",
      "Table 5 lists Artifact Repository (container registry) as REQUIRED.",
      "Deliver container to the registry is a Deploy-phase activity (Table 12)."
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
    ]
  },
  "k8s": {
    "n": "CNCF Certified Kubernetes",
    "p": "data",
    "w": "Figure 2. Kubernetes here means a CNCF Certified implementation. It schedules OCI-compliant containers across nodes. The container is the standard unit of deployment. K8s must be part of production.",
    "y": "Without Certified Kubernetes, this reference design does not apply. The API is how the same factory runs Cloud to embedded.",
    "d": [
      "Benefits named: multimodal environment, baked-in SCSS, resiliency, adaptability, GitOps / IaC automation, scalability.",
      "Table 11 lists CNCF-certified Kubernetes as REQUIRED in Deploy.",
      "Platform One is named as the first DoD-wide approved DevSecOps managed service."
    ],
    "see": [
      {
        "n": "CNCF Certified Kubernetes",
        "href": "https://www.cncf.io/certification/software-conformance/"
      },
      {
        "n": "Open Container Initiative",
        "href": "https://opencontainers.org"
      },
      {
        "n": "Official PDF",
        "href": "https://dodcio.defense.gov/Portals/0/Documents/Library/DoD%20Enterprise%20DevSecOps%20Reference%20Design%20-%20CNCF%20Kubernetes%20w-DD1910_cleared_20211022.pdf"
      },
      {
        "n": "Platform One",
        "href": "https://p1.dso.mil"
      }
    ],
    "seeHref": "https://www.cncf.io/certification/software-conformance/",
    "seeLabel": "CNCF software conformance"
  },
  "host-cloud": {
    "n": "Cloud (anywhere)",
    "p": "infra",
    "w": "Purpose statement: elastic factory anywhere, including Cloud. Section 4.2: hosting may be a CSP with a DoD provisional authorization or ATO. Figure 6 is DevSecOps Platform Options.",
    "y": "The design is CSP-agnostic. Cloud is one host, not the only host.",
    "d": [
      "K8s on an authorized Cloud is still under DoD Cloud SRG and DISA SCCA (section 4.3).",
      "Same Iron Bank containers as on-prem. That is the no-drift claim in section 4.1.",
      "Classification split is Sides. This card is the 2021 runtime location."
    ],
    "see": [
      {
        "n": "Official PDF",
        "href": "https://dodcio.defense.gov/Portals/0/Documents/Library/DoD%20Enterprise%20DevSecOps%20Reference%20Design%20-%20CNCF%20Kubernetes%20w-DD1910_cleared_20211022.pdf"
      }
    ]
  },
  "host-onprem": {
    "n": "On Premise / data center",
    "p": "infra",
    "w": "Purpose statement lists On Premise. Section 4.2 allows DoD data centers or on-premises servers. Section 4.3 allows bare metal. Compute, storage, and network may be physical or virtual.",
    "y": "A factory that only exists in one commercial region is not the reference design.",
    "d": [
      "Same Certified K8s and Iron Bank rule.",
      "Figure 6 is the platform-options figure for these hosts.",
      "Disconnected high-side (Sides) is the same stack with the guard closed."
    ]
  }
});
