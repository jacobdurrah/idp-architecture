window.IDP_DATA = Object.assign(window.IDP_DATA || {}, {
  "inv-overview": {
    "n": "Inventory: file to VDP",
    "p": "step",
    "w": "Dealer files land, become deltas on Event Hubs (Azure log; they left Kafka), get enriched, then one materializer writes a current-state SoR (system of record). Facet search, the VDP (vehicle detail page), and a realtime feed read that state. VIN is the vehicle identification number.",
    "y": "Missing a VIN is a lost sale. A sold unit still showing is an empty stall. Leadership wants the not-selling picture in 10 minutes. Priya, 24 Aug 2026: ~1.7M vehicles, ~5500 dealers, Azure, 104 topics, glued systems / fewer hops.",
    "d": [
      "Known (Priya): Brazil first, then US (~2/3 of US still on the leave-behind). Second legacy app still in play. Factory-to-VIN is later, not this board.",
      "Known: enrich RPO (regular production option codes), images, price math, recalls. Facet search + APIs + realtime feed.",
      "Inferred: strangler (on-prem still authoritative while Azure copies). One materializer. CQRS (writes on the log, reads on SoR and projectors). Search is a projector. Current-state SoR plus the log for replay.",
      "Inferred: Spring Batch + Integration for the file drop (Pritesh career shape, not a claimed live BOM). CDC is the HI name for SoR-to-search copy.",
      "Do not invent a search vendor, Postgres, Redis, GraphQL, AKS, AWS, Oracle, or Kafka-as-current.",
      "Play Sold, File, or Break. EXAMPLE payload uses VIN 1GNEVHKW8EX123456 at Lakeside Chevy 24781. Fictional."
    ]
  },
  "inv-sold": {
    "n": "Sold",
    "p": "step",
    "w": "A VehicleSold event for VIN 1GNEVHKW8EX123456 walks Event Hubs to the materializer, the SoR, then VDP, search, the channel feed, and cache invalidate.",
    "y": "Sold still showing is an empty stall. The hop that loses the sequence is the hop that keeps a buyer on a car that is gone.",
    "d": [
      "EXAMPLE (fictional): dealer 24781 Lakeside Chevy, price 28995, seq 1842, sold at 14:02 ET.",
      "Sold does not wait for RPO, image, price math, or recall enrichers.",
      "VDP re-checks the SoR. Search is a projector, vendor unstated."
    ],
    "story": "inv-sold"
  },
  "inv-file": {
    "n": "File",
    "p": "step",
    "w": "A dealer snapshot drops, lands, parses, diffs the last snapshot, and emits deltas. Absence in today's file is not a sale. A 20% drop holds the file.",
    "y": "If a short file looks like a mass delete, you empty lots that still have cars. Circuit-break, then page.",
    "d": [
      "Known: dealer files, FTP-or-drop, Azure landing.",
      "Inferred: Spring Batch-shaped worker, schema version, DLQ (dead-letter queue). Not a claimed live BOM.",
      "Play the steps. Absence and the 20% breaker are first-class."
    ],
    "story": "inv-file"
  },
  "inv-break": {
    "n": "Break",
    "p": "step",
    "w": "A poison row or truncated file hits the worker. Or a 24h cache TTL leaves a sold VIN on the VDP. Nightly recon is how you find the drift.",
    "y": "A sold-still-showing listing is an empty stall. A poison row must not halt the dealer. DLQ the row, keep the file.",
    "d": [
      "Poison / truncate: schema fail to DLQ. Do not emit a mass absence.",
      "Cache TTL: events invalidate. A 24h TTL is the failure this story names.",
      "Recon: SoR versus projectors. Leadership in 10 minutes if lots are not selling."
    ],
    "story": "inv-break"
  },
  "inv-dealer": {
    "n": "Dealer file",
    "p": "data",
    "w": "A dealer (one of ~5500) drops a snapshot. FTP-or-drop. The row is still a file line, not an event. VIN 1GNEVHKW8EX123456 is one line at Lakeside Chevy 24781.",
    "y": "This is the edge of the system. If the file never leaves the dealer, the lot is invisible and a missing VIN is a lost sale.",
    "d": [
      "Known (Priya): dealer files. Brazil then US.",
      "On-prem is still authoritative for the leave-behind (inferred strangler).",
      "EXAMPLE payload is fictional. Do not treat it as a live VIN."
    ],
    "story": "inv-file",
    "payload": "EXAMPLE (fictional)\nfile row\nVIN=1GNEVHKW8EX123456\ndealer=24781 Lakeside Chevy\nstatus=AVAILABLE\nprice=28995"
  },
  "inv-land": {
    "n": "Landing zone",
    "p": "infra",
    "w": "The drop lands in Azure blob (or the equivalent landing zone). The bytes are durable before anyone parses them. Schema version is not applied yet.",
    "y": "Parse against a moving file and you cannot replay. Land first, then the worker reads a frozen object.",
    "d": [
      "Known: Azure. Not AWS. Not AKS-as-claimed.",
      "Inferred: blob landing. Name is a shape, not a SKU list.",
      "A truncated upload is a Break, not a silent short snapshot."
    ],
    "story": "inv-file",
    "payload": "EXAMPLE (fictional)\nlanded object\ndealer=24781\nfile=lakeside-2026-08-24.snap\nbytes=ok\nschema=unset"
  },
  "inv-batch": {
    "n": "Worker / parse",
    "p": "ctrl",
    "w": "A worker parses the snapshot. Spring Batch-shaped: schema version, row map, DLQ (dead-letter queue) for poison. Pritesh career shape, not a claimed live BOM.",
    "y": "A poison row must not halt the dealer. A truncated file must not look like a successful short snapshot.",
    "d": [
      "Inferred: Spring Batch + Integration for the file drop. Label it inferred.",
      "Break: poison VIN=1GNE...TRUNCATED goes to DLQ. File continues.",
      "Known: glued systems, fewer hops than the old Kafka mesh."
    ],
    "story": "inv-file",
    "payload": "EXAMPLE (fictional)\nparsed row\nVIN=1GNEVHKW8EX123456\ndealer=24781\nstatus=AVAILABLE\nprice=28995\nschema=v4\ndlq=0"
  },
  "inv-diff": {
    "n": "Diff last snapshot",
    "p": "data",
    "w": "Compare this file to the last good snapshot for that dealer. Emit deltas only: new, changed, gone-from-file. Gone-from-file is not VehicleSold.",
    "y": "Re-publishing the whole lot every drop burns 104 topics and hides the real change. Deltas keep Event Hubs honest.",
    "d": [
      "Absence is not a sale. Wait for VehicleSold or a confirmed delete.",
      "A 20% drop versus last snapshot is a circuit break, not a mass emit.",
      "Inferred: snapshot-diff at the edge, then the log."
    ],
    "story": "inv-file",
    "payload": "EXAMPLE (fictional)\ndelta\nVIN=1GNEVHKW8EX123456\ndealer=24781\nop=UPSERT\nstatus=AVAILABLE\nseq=1841"
  },
  "inv-hub": {
    "n": "Event Hubs",
    "p": "infra",
    "w": "Azure Event Hubs, partition by VIN (vehicle identification number). They left Kafka. 104 topics. This is the log the materializer reads. Sold and file deltas share the bus.",
    "y": "A VIN-partitioned log keeps one vehicle in order. Cross-VIN reordering is fine. Cross-event reordering on one VIN is how SoR and search disagree.",
    "d": [
      "Known (Priya): Event Hubs, left Kafka, 104 topics, Azure.",
      "Do not name Kafka as current.",
      "Sold never waits on enrich. VehicleSold can pass here before RPO or images."
    ],
    "payload": "EXAMPLE (fictional)\nevent=VehicleSold\nVIN=1GNEVHKW8EX123456\ndealer=24781 Lakeside Chevy\nprice=28995\nseq=1842\nsoldAt=14:02 ET"
  },
  "inv-rpo": {
    "n": "RPO enricher",
    "p": "data",
    "w": "Attach RPO codes (regular production option codes) to the VIN. Sold does not wait. A listing can publish without the option list; the enricher catches up.",
    "y": "Option codes change how a buyer filters. They must not stall a VehicleSold that has to leave the lot now.",
    "d": [
      "Known: enrich RPO. Factory-to-VIN is later, not this box.",
      "Inferred: enricher is a side path, not a gate on sold."
    ]
  }
});
