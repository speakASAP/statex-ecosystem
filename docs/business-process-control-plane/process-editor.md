# BPCP Visual Process Editor

Status: proposed product and frontend requirements
Date: 2026-07-02

## Purpose

Business users must be able to create, inspect, validate, and publish business
processes visually. The editor is part of BPCP, not a separate ad-hoc admin
screen inside marketing-microservice.

## Primary interaction

The editor must support drag-and-drop blocks and arrow connections:

- event blocks;
- condition blocks;
- policy blocks;
- action blocks;
- service capability blocks;
- campaign content blocks;
- validation scenario blocks;
- kill-switch and schedule blocks.

The visual graph is the authoring interface. The saved artifact is a versioned
process document that compiles to BPCP process, policy, and workflow JSON.

## Required views

| View | Purpose |
|---|---|
| Process canvas | Create workflows using blocks and arrows |
| Policy builder | Configure conditions, scopes, percentages, dates, stackability |
| Service capability palette | Show available service capabilities and facts |
| Campaign binding | Connect marketing content to slots and notifications |
| Simulation panel | Run sample carts, customers, products, and dates |
| Diff view | Compare process versions before publish |
| Audit timeline | Show who changed, validated, published, paused, or retired a process |
| Activation calendar | Show scheduled processes and conflicts |
| Kill switch panel | Pause one process or all BPCP decisions |

## Canvas model

```json
{
  "schemaVersion": "bpcp.canvas.v1",
  "processId": "holiday-discount-2026",
  "nodes": [
    {
      "id": "event-cart-updated",
      "type": "event",
      "eventType": "CartUpdated"
    },
    {
      "id": "condition-category",
      "type": "condition",
      "conditionType": "catalog_category_in"
    },
    {
      "id": "action-evaluate-discount",
      "type": "action",
      "actionType": "EvaluateDiscount"
    }
  ],
  "edges": [
    {
      "from": "event-cart-updated",
      "to": "condition-category"
    },
    {
      "from": "condition-category",
      "to": "action-evaluate-discount"
    }
  ]
}
```

## Frontend behavior

- Use an established graph/canvas library instead of hand-rolled drag behavior.
- Blocks must be typed and schema-driven.
- Invalid connections must be blocked immediately.
- The editor must save drafts, not active processes.
- Publishing must require validation success and explicit approval.
- The editor must show service ownership and failure modes.
- The editor must show `[MISSING: ...]` facts instead of hiding gaps.
- Users must be able to test a process with fixture inputs before publishing.

## Suggested frontend components

| Component | Responsibility |
|---|---|
| `ProcessCanvas` | Node graph, edge editing, zoom, selection |
| `NodePalette` | Available events, conditions, actions, capabilities |
| `InspectorPanel` | Edit selected node properties |
| `SimulationPanel` | Run scenarios and show pass/fail evidence |
| `VersionDiffPanel` | Compare draft with active version |
| `PublishGatePanel` | Validation checklist and approval |
| `AuditTimeline` | Activation, pause, rollback, edit history |
| `CapabilityHealthPanel` | Service adapter readiness |

## Recommended visual node types

| Type | Example | Validation |
|---|---|---|
| Event | ProductViewed, CartUpdated, CheckoutStarted, OrderPaid | known event schema |
| Condition | category in set, date window, segment match | typed operands |
| Policy | 10 percent discount, exclusive stacking | monetary constraints |
| Action | ShowBanner, EvaluateDiscount, SendNotification | service capability exists |
| Slot | product_badge, cart_banner, upsell_block | frontend supports slot |
| Simulation | product/category/customer/cart fixture | expected result |

## Auth and permissions

- View drafts: product, marketing, engineering, support.
- Edit drafts: marketing ops and process owners.
- Validate: process owners and engineering.
- Publish: approved business owner plus technical gate.
- Pause: incident owner, platform owner, or authorized process owner.

[MISSING: exact RBAC role names in auth-microservice]

## Validation gates

Before publish:

1. JSON schema validation passes.
2. All service capability refs resolve.
3. All policy rules have typed operands.
4. Simulation fixtures pass.
5. Monetary actions route to pricing authority only.
6. Notification templates exist.
7. Storefront slots exist or are marked unsupported.
8. Activation calendar has no unresolved conflict.
9. Sensitive data scan passes.
10. Audit metadata is complete.
