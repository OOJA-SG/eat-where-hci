# Eat Where? @ HCI

A lightweight random lunch picker prepared for EAS Connect 2026.

The page uses a curated snapshot of public venue information. It does not ask for or store participant identifiers. Opening, exact distance, route shelter, exact price and availability are not live.

## Optional advanced catalogue — 22 September 2026

The original 36-place picker is unchanged when advanced mode is off. Advanced mode adds 49 Bukit Panjang places (85 total), including 46 exact outlets observed in the MUIS public directory. Five combined-catalogue outlets have official children's-menu evidence; four have explicit non-spicy/no-chilli menu evidence. These sets overlap and are not exhaustive.

Sources are attached to each result in `venue-expansion.js`. MUIS searches: Bukit Panjang and Hillion at https://halal.muis.gov.sg/halal/establishments. Only physical eating outlets were selected; virtual brands, a nursing-home kitchen and ambiguous duplicate/replaced listings were omitted. The directory view did not expose certificate expiry dates. We therefore record listing presence, certificate ID and the actual check date, never an invented expiry date. Halal matches expire from our filter after 30 days without rechecking; menu checks expire after 180 days. Users must check current certification and menu availability before ordering.

Child-friendly means published children's-menu evidence, not a play area, accessibility or seating guarantee. Non-spicy requires an explicitly described option, not an assumption based on cuisine. WOK HEY Bukit Panjang Plaza's own order menu specifies a default of No Chilli for chicken egg fried rice. Price bands are approximate editorial guides, not live prices. Party size is planning context only. Whole hawker centres are never tagged halal based on one stall.

Regression checks: `node --test advanced-options.test.cjs venue-expansion.test.cjs`.
