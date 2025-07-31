---
"@inversifyjs/core": patch
---

Updated `BindingService`, `ActivationsService` and `DeactivationsService` to receive a `getParent` param. This way restoring a parent container no longer leads to invalid parent references
