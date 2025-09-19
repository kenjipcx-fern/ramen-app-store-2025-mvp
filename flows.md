# End-to-End Flows — MVP

1) Customer Order (Happy Path)
- Search -> Restaurant -> Item customize -> Cart -> Quote -> Checkout -> CONFIRMED -> PREPARING -> READY -> DRIVER_ASSIGNED -> PICKED_UP -> ARRIVING -> DELIVERED -> Review

2) Owner KDS & Packaging
- Orders queue -> Start Prep -> Apply SOP (labels, separation) -> Mark Ready -> Driver Handoff -> Resolve 86

3) Delivery Orchestration
- Ready_by computed -> Request partner driver -> Driver assigned -> Pickup checklist -> POD -> Close

4) Refund/Cancel
- User cancel pre-prep -> Void auth -> Close
- Restaurant cancel during prep -> Partial refund -> Close
- Post-delivery issue -> Evidence -> Refund/credit

