# BPCP Cross-Service Contracts

Status: proposed contract pack
Date: 2026-07-02

## Contract principles

- Contract payloads are versioned.
- Services fail closed on unknown process versions, unknown actions, invalid
  signatures, invalid dates, or schema violations.
- Domain services expose facts and capabilities; BPCP never reaches into their
  databases.
- Monetary finality is owned by the pricing/order/payment boundary, not by BPCP
  or frontend code.
- Process definitions are immutable once active. Corrections create a new
  version.

## Process definition

```json
{
  "schemaVersion": "bpcp.process.v1",
  "processId": "holiday-discount-2026",
  "version": 1,
  "status": "draft",
  "activeFrom": "2026-12-01T00:00:00Z",
  "activeTo": "2027-01-07T23:59:59Z",
  "policyRefs": ["holiday-10-percent-selected-categories"],
  "workflowRefs": ["cart-updated-discount-evaluation"],
  "campaignRefs": ["holiday-2026-main"],
  "createdBy": "user-or-agent-id",
  "approvedBy": "[MISSING: approval authority]",
  "auditRef": "bpcp-audit-id"
}
```

## Policy definition

```json
{
  "schemaVersion": "bpcp.policy.v1",
  "policyId": "holiday-10-percent-selected-categories",
  "priority": 100,
  "stacking": "exclusive",
  "conditions": [
    {
      "type": "date_window",
      "from": "2026-12-01T00:00:00Z",
      "to": "2027-01-07T23:59:59Z"
    },
    {
      "type": "catalog_category_in",
      "categoryIds": ["christmas-gifts", "winter-season"]
    }
  ],
  "effect": {
    "type": "percentage_discount",
    "percent": 10,
    "maxPercent": 10
  }
}
```

## Experience slot decision

Storefronts and channel services can request BPCP slots, but they must not treat
slot decisions as authoritative pricing.

```json
{
  "schemaVersion": "bpcp.experience-decision.v1",
  "processId": "holiday-discount-2026",
  "version": 1,
  "slot": "product_badge",
  "decision": "show",
  "campaignRef": "holiday-2026-main",
  "contentRef": "holiday-badge-short",
  "expiresAt": "2027-01-07T23:59:59Z"
}
```

## Pricing evaluation request

The pricing owner is currently unresolved.

[MISSING: pricing service owner]

```json
{
  "schemaVersion": "commerce.discount-evaluation-request.v1",
  "cartId": "cart_123",
  "customerId": "customer_123",
  "currency": "CZK",
  "items": [
    {
      "productId": "product_123",
      "quantity": 1,
      "baseUnitPrice": 1000,
      "catalogFacts": {
        "categoryIds": ["christmas-gifts"],
        "tags": ["holiday-eligible"]
      }
    }
  ],
  "candidateProcessRefs": ["holiday-discount-2026:1"]
}
```

## Pricing evaluation response

```json
{
  "schemaVersion": "commerce.discount-evaluation-response.v1",
  "cartId": "cart_123",
  "currency": "CZK",
  "subtotal": 1000,
  "discountTotal": 100,
  "total": 900,
  "appliedDiscounts": [
    {
      "processId": "holiday-discount-2026",
      "processVersion": 1,
      "policyId": "holiday-10-percent-selected-categories",
      "amount": 100,
      "reason": "holiday discount 10 percent",
      "source": "pricing-authority"
    }
  ]
}
```

## Order snapshot

Orders must persist applied discounts as immutable facts. Later process edits
must not rewrite existing order discount evidence.

```json
{
  "schemaVersion": "orders.applied-discounts.v1",
  "orderId": "order_123",
  "currency": "CZK",
  "appliedDiscounts": [
    {
      "processId": "holiday-discount-2026",
      "processVersion": 1,
      "policyId": "holiday-10-percent-selected-categories",
      "amount": 100,
      "displayName": "Holiday discount",
      "auditRef": "bpcp-decision-456"
    }
  ]
}
```

## Events

Suggested BPCP events:

| Event | Producer | Consumers |
|---|---|---|
| `bpcp.process.published.v1` | BPCP | Marketing, storefronts, pricing, monitoring |
| `bpcp.process.paused.v1` | BPCP | All consumers |
| `bpcp.process.retired.v1` | BPCP | All consumers |
| `bpcp.policy.evaluated.v1` | Pricing/BPCP adapter | Logging, monitoring |
| `bpcp.workflow.action_requested.v1` | BPCP | Service adapters |
| `bpcp.workflow.action_completed.v1` | Service adapters | BPCP, logging |

Known order events from previous integration work include
`orders.order.created.v1` and `orders.order.updated.v1`; service owners must
re-check current producer contracts before wiring new consumers.

## API surfaces

Suggested BPCP API:

```text
GET  /api/processes
POST /api/processes
GET  /api/processes/:processId/versions/:version
POST /api/processes/:processId/versions/:version/validate
POST /api/processes/:processId/versions/:version/publish
POST /api/processes/:processId/versions/:version/pause
POST /api/evaluate/experience-slot
POST /api/simulate
GET  /api/audit/processes/:processId
```

Suggested service adapter API:

```text
GET  /api/bpcp/capabilities
POST /api/bpcp/actions/:actionType/dry-run
POST /api/bpcp/actions/:actionType/execute
GET  /api/bpcp/health
```

## Capability discovery

Each affected service should expose or document:

- service name;
- supported BPCP action types;
- supported facts;
- required auth;
- idempotency key rules;
- dry-run support;
- failure modes;
- owner and validation command.

## Security

- BPCP admin UI uses auth-microservice hosted auth and RBAC.
- Service-to-service calls use service identity, not user browser tokens.
- Published process definitions are signed or version-hashed.
- Every process activation, pause, and rollback is audit logged.
- Sensitive payloads must be redacted before logging.

## Fail-closed cases

Services must reject or ignore:

- unknown `schemaVersion`;
- inactive process version;
- expired process;
- unsigned or untrusted process decision;
- action request without idempotency key;
- monetary decision from a non-authoritative source;
- process state that cannot be verified within timeout.
