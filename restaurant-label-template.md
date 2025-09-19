# Label Template — Ramen App Store (MVP)

Use 2x3 thermal stickers. Include:
- Restaurant name
- Order short code (e.g., RAS-1A3F)
- Item name + modifiers (firmness/spice/oil)
- SEAL CODE (6 chars)
- QR code (encodes orderId + sealCode)
- Date/time (local)

Sample (ZPL)
```
^XA
^PW400
^FO20,20^A0N,40,40^FD{{RESTAURANT_NAME}}^FS
^FO20,70^A0N,30,30^FDOrder: {{ORDER_SHORT}}^FS
^FO20,110^A0N,30,30^FDItem: {{ITEM_NAME}}^FS
^FO20,150^A0N,30,30^FDMods: {{MODS}}^FS
^FO20,190^A0N,30,30^FDSeal: {{SEAL_CODE}}^FS
^FO280,20^BQN,2,6^FDQA,order={{ORDER_ID}}&seal={{SEAL_CODE}}^FS
^FO20,230^A0N,25,25^FD{{LOCAL_TIME}}^FS
^XZ
```

Printing notes
- Test legibility; adjust font sizes for long modifiers
- Ensure QR scans reliably through bag window

