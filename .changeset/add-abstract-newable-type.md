---
"@inversifyjs/common": patch
---

Replace Function with AbstractNewable in ServiceIdentifier type

ServiceIdentifier now uses AbstractNewable instead of Function to better represent abstract classes. This provides better type safety and semantics.
