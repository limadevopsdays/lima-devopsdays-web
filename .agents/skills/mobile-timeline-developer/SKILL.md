---
name: mobile-timeline-developer
description: Guides the agent on maintaining and building the mobile chronological timeline feed, collapsible hourly accordions, and space compression systems in the lima-devopsdays-web project. Use this skill when modifying mobile responsiveness, time grouping, collapsing behaviors, and mobile CSS spacing.
---

# Mobile Schedule Timeline Developer Guideline

This guide explains the architecture and layout logic of the mobile chronological timeline view located in [ScheduleSection](file:///Users/stefani/Documents/Trabajos/lima-devopsdays-web/src/app/components/devopsdays/ScheduleSection/index.tsx).

## 1. Clean Responsive Show/Hide Toggle
To switch between desktop grid layout and mobile chronological timeline view without sub-pixel viewport gaps, avoid complex min-width media queries. Use the cascading override pattern in [index.module.css](file:///Users/stefani/Documents/Trabajos/lima-devopsdays-web/src/app/components/devopsdays/ScheduleSection/index.module.css):
- By default, set the mobile container `.boardMobile` to `display: none`.
- Under the `@media (max-width: 768px)` media query:
  - Set the desktop `.board` to `display: none !important`.
  - Set the mobile `.boardMobile` to `display: flex`.

## 2. Hourly Timeline Grouping
On mobile, multiple concurrent room columns are collapsed into a single vertical chronological feed.
- Sessions are grouped under top-level hour blocks (e.g., `11:00`, `12:00`) by splitting their start times: `talk.start.split(':')[0] + ':00'`.
- The talk cards inside the hourly group show their exact start/end ranges (e.g. `11:10 - 11:35`) for precision.

## 3. Collapsible Hour Accordions (Collapsed by Default)
- Accordions track active states via `expandedTimeSlots` state array (`string[]`).
- By default, all hour blocks are **collapsed**. Tapping on the hour header toggles the slot inside `expandedTimeSlots`.
- **"Mis Favoritos" (My Schedule) Auto-expansion**: When toggled, a `useEffect` scans the user's starred talks and automatically populates `expandedTimeSlots` with their hour blocks so the user's agenda is fully visible by default. It collapses back to empty when toggling favorites off.
- **Header Badges**: When collapsed, the header displays a compact label with the total count of hidden talks (e.g. `(5 eventos)`) next to a Lucide `ChevronDown` arrow.

## 4. Break Deduplication
Pretalx duplicates manually created breaks (like coffee breaks/recesos) for each room.
- To prevent listing the same break 6 times in a row on mobile, the chronological mapping loop skips adding breaks that share the same start time, end time, and title within the time group:
  ```typescript
  if (isBreak) {
    const hasDuplicate = group.talks.some(
      (t) =>
        t.title.toLowerCase() === talk.title.toLowerCase() &&
        t.start === talk.start &&
        t.end === talk.end
    )
    if (hasDuplicate) return
  }
  ```

## 5. UI Spacing & Compression Rules
To ensure the timeline fits comfortably on mobile screens:
- **No Left colored borders**: Keep talk card borders flat and simple (`border: 1px solid #e2e8f0` all around). Avoid heavy borders that feel like generic AI templates.
- **Horizontal Speaker Lists**: Align speaker avatars and names horizontally using `flex-direction: row` and `flex-wrap: wrap` to prevent vertical stacking bloat.
- **Header & Card Paddings**: Maintain tight padding (e.g. `0.3rem 0.6rem` for headers, `0.6rem 0.75rem` for cards) and tight vertical gaps (`mobileTimeGroup` gap of `0.4rem`) to reduce overall height.
