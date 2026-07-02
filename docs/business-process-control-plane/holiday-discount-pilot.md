# Holiday Discount Pilot

Status: implementation planning contract
Date: 2026-07-02
Process id: `holiday-discount-2026`

## Vision

Business users can publish a yearly holiday discount process visually, validate
it before activation, and have every affected storefront and commerce service
honor the same process through explicit contracts.

## Goal impact

The pilot proves that dynamic business logic can change the customer journey
without redeploying storefront code for each promotion. The codebase exposes
stable capabilities; BPCP changes rules, workflows, and schedules.

## Process lifecycle

```text
draft -> validated -> scheduled -> active -> paused -> retired
```

Emergency path:

```text
active -> paused by kill switch -> patched draft -> validated -> active
```

No process can become `scheduled` or `active` until simulation and contract
validation pass.

## Pilot process shape

```json
{
  "processId": "holiday-discount-2026",
  "version": 1,
  "status": "scheduled",
  "activeFrom": "2026-12-01T00:00:00Z",
  "activeTo": "2027-01-07T23:59:59Z",
  "policies": ["holiday-10-percent-selected-categories"],
  "workflows": [
    "product-view-holiday-badge",
    "cart-updated-discount-evaluation",
    "checkout-upsell-suggestion",
    "order-paid-holiday-notification"
  ],
  "killSwitch": true
}
```

## Required service responsibilities

| Service | Pilot responsibility | Must not do |
|---|---|---|
| BPCP | Version, validate, publish, schedule, audit, simulate the process | Own catalog data, payment amounts, or invoice totals |
| marketing-microservice | Campaign content, banners, upsell copy, notification template refs | Own global process execution |
| catalog-microservice | Product/category/tags/eligibility facts | Calculate final discount |
| [MISSING: pricing service owner] | Authoritative discount and final price evaluation | Render marketing copy |
| [MISSING: cart service owner] | Cart discount line and process decision display | Persist final order facts |
| orders-microservice | Immutable applied discount snapshot and lifecycle events | Recalculate discount after order creation |
| payments-microservice | Capture only final amount from order/payment boundary | Interpret campaign rules |
| invoices-microservice | Render invoice discount lines from order snapshot | Re-evaluate campaign eligibility |
| notifications-microservice | Send holiday notification from approved template refs | Decide eligibility |
| auth-microservice | Admin and service identity for BPCP and editor | Store process definitions |
| docs-rag-microservice | Index published process docs and adoption docs | Become canonical source of process truth |
| logging-microservice | Audit events and process decision log ingestion | Change business decisions |
| monitoring-microservice | Metrics, alerts, activation health, kill-switch alerts | Execute workflow actions |
| storefront/channel services | Render approved experience slots | Calculate authoritative discounts |
| warehouse/suppliers | Availability facts for upsell/eligibility if needed | Own discount policy |

## Customer journey

1. Customer opens a product page.
2. Storefront requests product facts and active BPCP experience slots.
3. If eligible, storefront renders holiday badge and campaign message.
4. Customer adds product to cart.
5. Cart/checkout asks authoritative pricing owner to evaluate active promotion.
6. Customer sees discount line and optional upsell.
7. Payment captures only the final order amount.
8. Order stores immutable discount snapshot.
9. Invoice renders discount line from order snapshot.
10. Notifications sends holiday message after payment/order event.

## Backend execution sequence

```text
ProductViewed or ProductPageLoaded
  -> BPCP evaluates active experience workflow
  -> storefront renders slots

CartUpdated
  -> pricing evaluates policy with catalog facts
  -> cart displays quote and discount line

CheckoutStarted
  -> BPCP evaluates upsell workflow
  -> storefront renders upsell slot

OrderCreated
  -> orders persists appliedDiscounts snapshot
  -> payments receives final amount only

OrderPaid
  -> invoice renders discount from order snapshot
  -> notifications sends approved holiday template
```

## Parallel implementation lanes

| Lane | Status | Owner role | Scope | Forbidden files | Expected output | Validation | Merge order |
|---|---|---|---|---|---|---|---|
| BPCP service foundation | ready_parallel | control-plane owner | new BPCP repo, process registry, policy schema, simulation API | service-specific domain DBs | service skeleton and contracts | schema tests, simulation tests | 1 |
| Marketing campaign adapter | dependency-gated | marketing owner | campaign refs, content slots, upsell content | BPCP process storage | campaign API contract | contract tests | 2 |
| Catalog facts adapter | dependency-gated | catalog owner | product facts endpoint and eligibility facts | pricing/order logic | product fact schema | fixture tests | 2 |
| Pricing/cart authority | blocked | commerce owner | final price quote and cart display contract | invoice/payment internals | quote contract | quote simulations | 2 |
| Orders/payment/invoice snapshot | dependency-gated | commerce owner | appliedDiscounts snapshot and invoice rendering | policy evaluation | immutable order and invoice fixtures | event and fixture tests | 3 |
| Notification consumer | dependency-gated | notification owner | post-purchase holiday message | eligibility rules | template ref consumer | event consumer tests | 3 |
| Storefront slots | dependency-gated | frontend/channel owners | badge, banner, cart message, upsell block | monetary calculation | slot rendering | UI smoke | 3 |
| Observability | dependency-gated | platform owner | audit, metrics, alerts | process decision logic | dashboards and alerts | synthetic activation smoke | 4 |
| End-to-end validation | final_integration | integration owner | one process across all services | local-only assumptions | staging validation report | simulation plus live smoke | 5 |

## Blockers

- [MISSING: repository for `business-process-control-plane`]
- [MISSING: authoritative pricing service or pricing module owner]
- [MISSING: cart service or checkout module owner]
- [MISSING: event bus runtime contract for BPCP publication and workflow actions]
- [MISSING: final list of storefronts that must render BPCP slots]
- [MISSING: owner-approved activation calendar and discount legal constraints]

## Validation scenarios

| Scenario | Input | Expected result |
|---|---|---|
| Eligible category | product category is in holiday scope, date active | 10 percent discount quote, badge, cart line |
| Ineligible category | category outside scope | no discount, no misleading badge |
| Expired process | activeTo passed | no discount, no holiday notification |
| Kill switch | process paused | no new discount decisions |
| Existing order | order created before process pause | invoice still uses immutable order snapshot |
| Payment boundary | payment starts after quote | payment sees final amount only |
| Notification | order paid with holiday discount snapshot | one post-purchase holiday message |
| Upsell | eligible checkout basket | upsell slot references approved marketing content |
