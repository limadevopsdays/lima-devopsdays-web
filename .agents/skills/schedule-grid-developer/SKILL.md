---
name: schedule-grid-developer
description: Guides the agent on maintaining and building the desktop CSS Grid schedule board component in the lima-devopsdays-web project. Use this skill when modifying schedule layout row mapping, boundary calculations, gap collapsing, room toggles, and timezone processing.
---

# Schedule CSS Grid Developer Guideline

This guide explains the architecture and layout logic of the desktop schedule board component located in [ScheduleSection](file:///Users/stefani/Documents/Trabajos/lima-devopsdays-web/src/app/components/devopsdays/ScheduleSection/index.tsx).

## 1. Time Mapping Grid Algorithm
The grid does not scale rows linearly. Instead, it maps minutes to grid rows dynamically using a non-linear parser. This allows the timeline to compress massive empty gaps (e.g., lunch, overnight gaps) into a single row.

### The 3-Step Mapper:
1. **Unique Tick Extraction**: Gather start and end minutes of all matching talks, sort them chronologically.
2. **Interval Creation**: Group sorted ticks into intervals. If an interval exceeds 60 minutes and contains no sessions, it is marked as `isCollapsed: true` and mapped to **exactly 1 grid row**. Regular intervals allocate rows linearly (`duration / 5 minutes`).
3. **Position Map**: A `rowMap` maps minutes (`HH:MM`) to specific grid row numbers. Standard cards query `getRowSpan(start, end)` to fetch their exact `gridRowStart` and `gridRowEnd`.

## 2. Dynamic Boundary Collapsing
When filtering by Track (Eje), empty early morning or late evening slots are calculated and automatically collapsed:
- We query the min start time and max end time of all track-matching sessions.
- These boundaries are rounded to clean 30-minute intervals and serve as grid limits (`startMinutes` to `endMinutes`).

## 3. Timezone Source of Truth
Pretalx API data mixes UTC (`Z`) and local timezone (`-05:00`) strings for manual breaks vs standard talks (e.g., `15:50:00Z` vs `11:10:00-05:00`).
- **RULE**: Never use plain `.substring(11, 16)` string slicing directly. Always convert timestamps using `new Date()` and format them explicitly into the America/Lima timezone:
  ```typescript
  const toLimaTimeHM = (isoStr: string) => {
    if (!isoStr) return ''
    const date = new Date(isoStr)
    return date.toLocaleTimeString('en-US', {
      timeZone: 'America/Lima',
      hour12: false,
      hour: '2-digit',
      minute: '2-digit',
    })
  }
  ```
- **Duration calculations** should also always subtract epoch milliseconds: `new Date(end).getTime() - new Date(start).getTime()`.

## 4. Layout Depth Layering (Z-Index)
To ensure concurrent room sessions do not get hidden behind full-width background receso/break rows:
- General full-width breaks must be assigned a lower stack index (`zIndex: 2`).
- Standard room-specific talk cards must be assigned a higher stack index (`zIndex: 4`).
- This naturally allows standard talk columns to float on top of full-width coffee breaks or lunches.

## 5. Room Selection States
- If a room column contains zero matching sessions under active filters, it is collapsed from the layout.
- The corresponding room chip selector at the top must be disabled (`chipDisabled` class, opacity `0.35`, `pointer-events: none`).
