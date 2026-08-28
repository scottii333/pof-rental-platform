# POF Rental Booking Clone

A recreation of the "Easy To Go" car rental booking flow from pofrental.com/easytogo,
built for my first interview project to show my frontend development work.

It reproduces their car rental booking module step by step:

1. Choose a date (pickup and return)
2. Choose a car
3. Choose a protection plan
4. Choose an add-on
5. Payment

The focus is the flow itself. Catalog data (cars, plans, add-ons) is hardcoded so the
full journey works end to end, and the same flow can be wired to a real backend later.

## Stack

- Next.js (App Router) with React and TypeScript
- Server Components for rendering, Client Components for the interactive booking steps

## Running locally

```bash
npm install
npm run dev
```

Then open http://localhost:3000.
