window.IDP_DATA = Object.assign(window.IDP_DATA || {}, {
  "inv-img": {
    "n": "Image enricher",
    "p": "data",
    "w": "Attach or refresh images for the VIN. Sold does not wait. A sold unit with a stale photo is still sold.",
    "y": "Image fetch is slow and flaky. Putting it on the sold path is how you keep a car on the VDP after 14:02 ET.",
    "d": [
      "Known: enrich images.",
      "Inferred: async. Failure retries. Never blocks VehicleSold."
    ]
  },
  "inv-price": {
    "n": "Price math",
    "p": "data",
    "w": "Price math on the VIN (fees, offers, dealer overlays). The EXAMPLE list price is 28995. Sold does not wait for a later overlay.",
    "y": "A wrong price is a complaint. A sold car still listed is an empty stall. Rank the stall first.",
    "d": [
      "Known: enrich price math.",
      "Do not invent a pricing vendor."
    ]
  },
  "inv-recall": {
    "n": "Recall enricher",
    "p": "data",
    "w": "Attach open recalls to the VIN. Sold does not wait. A recall flag can arrive after the SoR row already says SOLD.",
    "y": "Recalls are safety copy, not a reason to delay taking a car off the lot.",
    "d": [
      "Known: enrich recalls.",
      "Inferred: side path. Same 'sold never waits' rule as RPO and images."
    ]
  },
  "inv-mat": {
    "n": "Materializer",
    "p": "ctrl",
    "w": "One materializer. Key is VIN+dealer. Applies source sequence. Reads Event Hubs, writes the current-state SoR. Enrichment can arrive later as a follow-on apply.",
    "y": "Two writers are how you get two truths. CQRS (inferred): the log is the write, the SoR is the read model.",
    "d": [
      "Inferred: one materializer, CQRS, source sequence on VIN+dealer.",
      "seq 1842 beats seq 1841. Late enrich does not resurrect AVAILABLE after VehicleSold.",
      "EXAMPLE payload is the event plus any enrich already in hand."
    ],
    "payload": "EXAMPLE (fictional)\napply seq=1842\nkey=1GNEVHKW8EX123456+24781\nevent=VehicleSold\nrpo=pending img=pending\nprice=28995 recalls=pending"
  },
  "inv-sor": {
    "n": "Current-state SoR",
    "p": "data",
    "w": "The SoR (system of record) holds the current row per VIN+dealer. The log is for replay. VDP re-checks here. Search is a copy, not the truth.",
    "y": "If search or a 24h cache is treated as SoR, sold-still-showing becomes normal. The stall stays empty.",
    "d": [
      "Inferred: current-state SoR + log for replay. Do not name Postgres.",
      "Known stake: missing VIN = lost sale. Sold still showing = empty stall.",
      "CDC (change data capture) is the HI name for SoR-to-search copy. Inferred."
    ],
    "payload": "EXAMPLE (fictional)\nSoR row\nkey=1GNEVHKW8EX123456+24781\nstatus=SOLD\nprice=28995\nseq=1842\nsoldAt=14:02 ET"
  },
  "inv-search": {
    "n": "Facet index",
    "p": "data",
    "w": "Facet search is a projector off the SoR (or the log). Vendor unstated. CDC is the HI name for this copy. APIs sit beside it.",
    "y": "Buyers filter make, model, price, RPO. If the projector lags sold, the filter still shows a car that is gone.",
    "d": [
      "Known: facet search + APIs. Do not invent a search vendor.",
      "Inferred: search as projector. CQRS read side.",
      "Nightly recon compares this copy to the SoR."
    ],
    "payload": "EXAMPLE (fictional)\nsearch doc\nVIN=1GNEVHKW8EX123456\ndealer=24781\nstatus=SOLD\nfacets={make,model,price}\nseq=1842"
  },
  "inv-vdp": {
    "n": "VDP re-check",
    "p": "data",
    "w": "The VDP (vehicle detail page) re-checks the SoR before it paints. A search hit is not enough. EXAMPLE: hide 1GNEVHKW8EX123456 after seq 1842.",
    "y": "Search can lag. Cache can lie. The page that names a price and a VIN must ask the SoR.",
    "d": [
      "Known stake: sold-still-showing = empty stall.",
      "Break: if the page trusts a 24h TTL, the stall is empty and the listing is still up.",
      "Factory-to-VIN later. This box is dealer inventory, not the plant."
    ],
    "payload": "EXAMPLE (fictional)\nVDP recheck SoR\nkey=1GNEVHKW8EX123456+24781\n=> SOLD hide listing\nseq=1842"
  },
  "inv-feed": {
    "n": "Channel feed",
    "p": "data",
    "w": "Realtime feed to channels (site, partners, whatever is wired). Same sequence. A sold VIN must leave the feed, not wait for a nightly dump.",
    "y": "A partner that still has AVAILABLE at 14:10 ET after a 14:02 ET sold is the same empty-stall bug, off your lot.",
    "d": [
      "Known: realtime feed. 104 topics on the inside; the feed is the outside.",
      "Do not invent GraphQL or a partner list."
    ],
    "payload": "EXAMPLE (fictional)\nchannel feed\nVIN=1GNEVHKW8EX123456\ndealer=24781\nstatus=SOLD\nseq=1842"
  },
  "inv-cache": {
    "n": "Cache invalidate",
    "p": "data",
    "w": "Invalidate from events, not a 24h TTL. VehicleSold seq 1842 drops vdp:1GNEVHKW8EX123456:24781 now.",
    "y": "A TTL cache is how sold-still-showing lives until morning. That is an empty stall until expiry.",
    "d": [
      "Break story: 24h TTL still serving AVAILABLE after 14:02 ET.",
      "Do not invent Redis. The rule is event-driven invalidate.",
      "Inferred: cache is a projector with a short life, not SoR."
    ],
    "payload": "EXAMPLE (fictional)\ninvalidate\nkey=vdp:1GNEVHKW8EX123456:24781\nreason=VehicleSold\nseq=1842\nnot a 24h TTL"
  },
  "inv-recon": {
    "n": "Nightly recon",
    "p": "obs",
    "w": "Nightly SoR versus projectors (search, feed, cache). Drift is a page, not a dashboard curiosity. 10 minutes to leadership if lots are not selling.",
    "y": "You will miss a daytime sold-still-showing if recon is the only net. Use it for the holes events missed.",
    "d": [
      "Known: 10 min to leadership if not selling.",
      "Inferred: recon is SoR vs projectors. CDC lag shows up here.",
      "Break: recon is how you prove the TTL cache lied."
    ],
    "story": "inv-break",
    "payload": "EXAMPLE (fictional)\nrecon\nSoR=SOLD seq=1842\nsearch=SOLD\nfeed=SOLD\ncache=AVAILABLE (TTL miss)"
  },
  "inv-onprem": {
    "n": "On-prem (strangler)",
    "p": "infra",
    "w": "On-prem is still authoritative for the leave-behind. Second legacy app still in play. Brazil cut over first; ~2/3 of US still on the old side. Inferred strangler, not a claimed program name.",
    "y": "If Azure and on-prem both write the same VIN, you get two lots. The copy is downstream until a dealer is cut over.",
    "d": [
      "Known (Priya): Brazil then US, ~2/3 left, second legacy app.",
      "Inferred: strangler. On-prem still authoritative.",
      "Do not invent Oracle or an on-prem SKU."
    ]
  },
  "inv-absent": {
    "n": "Absence is not a sale",
    "p": "alert",
    "w": "A VIN missing from today's dealer file is not VehicleSold. Do not flip SOLD. Do not wipe the SoR row. Wait for a sold event or a confirmed delete.",
    "y": "File gaps look like mass sold. That is how you hide cars that are still on the lot and lose the next sale.",
    "d": [
      "File story step. Pair with the 20% drop breaker.",
      "Known stake: missing VIN = lost sale (the other direction).",
      "Inferred rule: absence != sale."
    ],
    "story": "inv-file",
    "payload": "EXAMPLE (fictional)\nabsent from file\nVIN=1GNEVHKW8EX123456\ndealer=24781\naction=HOLD\nnot VehicleSold"
  }
});
