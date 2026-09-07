# Building an Ops Ecosystem for Northeastern Recreation: ID Scanner and nulostfound

*How a broken front-desk process turned into two production systems, and what it took to keep them from becoming two unrelated one-off tools*

---

## The problem started at the front desk

Before any of this was code, it was a shift at the front desk of the Northeastern University Recreation Center. The department was running on a patchwork of tools that didn't talk to each other: Connect2 handled some workflows, Google Sheets handled others, and both were maintained manually and separately, with no single source of truth. Staff spent real time just keeping the two in sync by hand. On top of that patchwork, two things stood out as broken, over and over:

- Every visitor check-in meant typing ID data in by hand: name, date of birth, ID number, all keyed manually off a driver's license, state ID, or passport. Slow, and one typo away from a wrong record.
- Lost items had no real system behind them. A patron loses a water bottle or a jacket, and the only "search" is a staff member remembering where they put it, or scrolling through a spreadsheet if one was kept up to date that day.

Neither problem was hypothetical. Both happened at every shift, at every facility. So I built a fix for the first one, then the second, and only later noticed they were the same kind of project: internal tools for one department, built to replace a patchwork of manual, disconnected tools with something staff would actually use daily.

## First system: ID Scanner

The first build was an ID-scanning entry-tracking platform. Staff scan a driver's license or state ID (PDF417 barcode) or a passport (MRZ line), the system extracts the data automatically, records the entry, and staff move on to the next person in line instead of typing.

Architecture:

- **Frontend**: Vite, React 19, TypeScript in strict mode, Tailwind, React Router, TanStack Query for server state, Zustand for cross-cutting UI state, react-hook-form with zod for forms. Deployed on Netlify.
- **Backend**: Python 3.13 on Firebase Cloud Functions, Firestore for data, Cloud Storage for signature images, Google Cloud Vision for passport MRZ OCR, and barcode decoding for PDF417 IDs.
- **Auth**: every request goes through a JWT-gated API. The frontend never talks to Firestore or Storage directly.
- **Environments**: two live Firebase projects, one for staging and one for production, with an automated pipeline: staging deploys on every push to main, production deploys when a version tag is pushed.

None of that infrastructure was the point. The point was that a front-desk check-in that used to take real manual typing now takes a scan. Registration time dropped roughly 65% versus the old manual process, and it now runs across 3+ facilities, serving 7,500+ patrons a day.

## Second system: nulostfound

Once the ID Scanner was live, the same department had the same kind of problem on the lost-and-found side. So the second system, nulostfound, followed the same instinct: staff needed to log items with a photo, search and filter what's on hand, and mark items returned (capturing the patron's name and a signature) or donated, without needing individual user accounts to do it.

Architecture:

- **Frontend**: React and Tailwind.
- **Backend**: Netlify Functions as the actual API layer, talking to Firestore directly through the Firebase Admin SDK. A separate, independently-deployed Firebase Cloud Function handles PDF report generation.
- **Auth**: no individual accounts. Two shared, bcrypt-hashed passwords (admin and non-admin) issue a role-bearing JWT on login, which every function call verifies.
- **Data**: item status drives the whole UI, active, returned, donated, or soft-deleted, all in one Firestore collection.
- **Admin tooling**: a stats dashboard, CSV export, and PDF reporting, on top of the same day-to-day add/search/return flow non-admin staff use.

It's live at ureclostfound.netlify.app, and it replaced an all-manual, unsearchable process the same way ID Scanner replaced manual check-ins.

## What makes it an ecosystem, not two side projects

The two systems don't share a codebase, and they don't share a database. What they share is a pattern: the same department, the same "replace a manual front-desk process with something staff will actually use" brief, and the same discipline around keeping a small internal tool small. Neither system reaches for infrastructure it doesn't need. ID Scanner needs OCR and barcode decoding, so it has a real backend service for that. nulostfound needs shared-password access control for two roles, not a full user management system, so that's what it has.

Treating them as one ecosystem instead of two disconnected tools changes how I think about what's next for both of them, rather than just shipping fixes to each in isolation. It also changes what got removed, not just what got added. Before either system existed, check-in and lost-and-found ran through Connect2 and Google Sheets, kept in sync by hand. Consolidating both processes into one in-house ecosystem cut the associated costs by roughly 95% and removed the department's dependency on those third-party tools entirely, along with the manual work of keeping them aligned. Patron data now stays in-house instead of living inside outside vendors' systems, which matters as much for privacy as it does for cost.

## What's next

The most obvious next step is the one that wasn't obvious when I built the first system alone: connecting them. A visitor checking in through ID Scanner could, in principle, be automatically checked against open lost-item reports at the same facility. Beyond that, expanding ID Scanner to more document formats and adding per-facility usage analytics are both natural next steps for a system that's already running in production every day.

---

*Have questions about building internal tools for a real organization, or want to talk through the tradeoffs of shared infrastructure versus separate small deploys? I'd love to connect on LinkedIn. @shrejae*
