// Type-level opt-in for React canary APIs (ViewTransition). Lives in a .d.ts
// so the bundler never sees it — `react/canary` is types-only, not a runtime module.
/// <reference types="react/canary" />
