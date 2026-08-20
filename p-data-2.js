window.IDP_DATA = Object.assign(window.IDP_DATA || {}, {
  "p-redis": {
    "n": "Redis (cache)",
    "p": "data",
    "w": "Cache and short-lived coordination on the feed path. News feed, ranking, and user services use it. Ephemeral keys. Not the source of truth. Provisioned as a managed service by Terraform.",
    "y": "The feed cannot hit Postgres on every fan-out and still keep a latency SLO. Redis is the cheap memory that makes the read path possible. Treating it as truth is how you lose posts on a failover.",
    "d": [
      "Hot keys, sessions, ranking candidates. TTL is a feature.",
      "A cache miss is normal. A cache as system of record is not.",
      "Sized by telemetry. Created by Terraform. Not by Argo CD.",
      "newsfeed-service:v1827 reads here. It does not persist here."
    ],
    "useWhen": "Hot keys on the feed path. Session, ranking candidates, fan-out cache.",
    "useNot": "System of record. A failover that loses posts is a design bug.",
    "look": "A managed Redis the feed, ranking, and user services call. Memory, not a disk of posts.",
    "seeTab": "v2",
    "seeId": "redis",
    "seeHref": "v2.html#redis"
  },
  "p-kafka": {
    "n": "Kafka (queue / log)",
    "p": "data",
    "w": "Async fan-out: notifications, feed invalidation, downstream indexers. Producers in the app services write. Consumers (notifications, search) read. Retained streams, not user-facing reads.",
    "y": "Not everything should be on the request path. A log lets you add a consumer next quarter without asking the feed to know about it. It is also how you replay.",
    "d": [
      "A bus, not a request-response RPC. Offsets and consumer groups are the contract.",
      "Not a replacement for Postgres. The post row is written first.",
      "Provisioned by Terraform. Topics are platform objects.",
      "Search and notify consume this log. The thumb does not."
    ],
    "useWhen": "Fan-out that must not sit on the request. Notifications, invalidation, indexers.",
    "useNot": "A request-response bus. Not a replacement for SQL. Not a cache.",
    "look": "A retained log. Producers write. Consumers (notify, search) read later.",
    "seeTab": "v2",
    "seeId": "kafka",
    "seeHref": "v2.html#kafka"
  },
  "p-obj": {
    "n": "Object store",
    "p": "data",
    "w": "Media bytes. The media service holds metadata and authorization. The bucket holds the objects. The CDN often fetches via signed URLs. Provisioned by Terraform. Versioning and lifecycle are infra policy.",
    "y": "Blobs in block disks attached to pods will be lost. Object storage matches how media is used: write once, read many, cache at the edge.",
    "d": [
      "Stores blobs, not rows. Public-by-default is a misconfiguration.",
      "Signed URL, then the CDN. The pod does not stream every byte.",
      "Created by plane B. A feature ship does not create a bucket.",
      "newsfeed-service:v1827 asks media for metadata, not for the file."
    ],
    "useWhen": "Media bytes. Write once, read many, signed URL to the CDN.",
    "useNot": "Rows, or a PVC you will lose on a drain. Not a database.",
    "look": "A bucket. The media service holds metadata and signs the URL.",
    "seeTab": "v2",
    "seeId": "objstore",
    "seeHref": "v2.html#objstore"
  },
  "p-sql": {
    "n": "Postgres",
    "p": "data",
    "w": "System of record for users, posts, and the relational slice of the feed. Provisioned by Terraform, consumed by services, never migrated by a CI deploy job. Backups and replicas are plane-B concerns.",
    "y": "Relational data does not belong in a container filesystem. A managed database is the boring store that survives a node drain. Schema changes are versioned and applied by a deliberate job, not by the rolling deploy of v1827.",
    "d": [
      "Transactions, foreign keys, the post row. This is truth.",
      "Created by Terraform, not by Argo CD. The services that own the tables talk to it.",
      "A feature ship does not apply a database. Schema is its own path.",
      "Replica and backup policy is infra. The feed does not invent it."
    ],
    "useWhen": "Users, posts, and the relational slice of the feed. Transactions.",
    "useNot": "A cache, a log, or blobs. Schema is a deliberate job, not the v1827 rollout.",
    "look": "Managed Postgres. A cylinder. Backups and replicas are plane B.",
    "seeTab": "v2",
    "seeId": "sql",
    "seeHref": "v2.html#sql"
  }
});
