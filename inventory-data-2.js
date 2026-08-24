window.IDP_DATA = Object.assign(window.IDP_DATA || {}, {
  "inv-breaker": {
    "n": "20% drop breaker",
    "p": "alert",
    "w": "If today's file is ~20% smaller than the last good snapshot, hold. Do not emit mass absences. Page. A truncated file is Break, not a successful short day.",
    "y": "A short drop that auto-emits will empty search and the VDP for cars that never left.",
    "d": [
      "File story step. Circuit breaker, then human.",
      "Break: truncated upload trips the same hold.",
      "Inferred threshold (~20%). Not a Priya number; label it inferred."
    ],
    "story": "inv-file",
    "payload": "EXAMPLE (fictional)\nbreaker\ndealer=24781\nlast=1200 rows\nnow=910 rows\ndrop=24%\naction=HOLD no mass emit"
  }
});
window.IDP_SCENARIOS = [
  {
    "id": "inv-sold",
    "n": "Sold",
    "blurb": "VehicleSold walks hub, materializer, SoR, then search, VDP, feed, cache.",
    "steps": ["inv-hub", "inv-mat", "inv-sor", "inv-search", "inv-vdp", "inv-feed", "inv-cache"]
  },
  {
    "id": "inv-file",
    "n": "File",
    "blurb": "Dealer snapshot: land, parse, diff, absence rule, 20% breaker, then the hub.",
    "steps": ["inv-dealer", "inv-land", "inv-batch", "inv-diff", "inv-absent", "inv-breaker", "inv-hub"]
  },
  {
    "id": "inv-break",
    "n": "Break",
    "blurb": "Poison or truncate at the worker. TTL cache leaves sold showing. Recon proves it.",
    "steps": ["inv-batch", "inv-breaker", "inv-cache", "inv-vdp", "inv-recon"]
  }
];
