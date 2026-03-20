# UPSC Prep App

## Current State
New project. Scaffolded Motoko backend and React frontend with no application logic yet.

## Requested Changes (Diff)

### Add
- Internet Identity authentication (login, logout, loading state, user info display)
- Protected dashboard route -- only rendered after auth is confirmed
- Dashboard sections: study progress overview, daily targets, quick navigation to subjects
- Clean component structure with scalable folder layout

### Modify
- N/A (new project)

### Remove
- N/A

## Implementation Plan
1. Backend: expose `whoami` principal, store basic user profile (display name, join date)
2. Frontend auth: integrate Caffeine authorization component for Internet Identity
3. Auth flow: loading screen -> login page -> dashboard (principal-gated)
4. Dashboard layout: sidebar nav + main content area
5. Dashboard sections:
   - Study Progress: subject completion percentages
   - Daily Targets: checklist of today's study goals
   - Quick Navigation: subject cards (History, Geography, Polity, Economy, Science, Current Affairs)
6. Component structure:
   - src/components/auth/ -- Login, AuthGuard
   - src/components/dashboard/ -- Dashboard, Sidebar, ProgressCard, TargetList, SubjectCard
   - src/components/layout/ -- Layout, Header
