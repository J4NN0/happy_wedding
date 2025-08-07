# Happy Wedding

Imagine you’re planning a wedding. You’ve got a list of guests — friends, family, exes you couldn’t uninvite — and naturally, some of them love each other, some barely tolerate each other, and a few would happily fight over the last slice of cake.

Each guest has a “mood interaction score” with every other guest. For example:
- Batman and Robin are besties: `+5`
- Batman and The Joker? Well… eternal nemesis vibes: `–5`
- Harley Quinn and The Joker? Toxic but high-energy: `+3`
- Alfred gets along with everyone, obviously: `+2` with all

The idea is to seat people together in a way that maximizes the mood in the room — meaning, tables full of people who vibe well, or at least don’t threaten to flip it over.

That’s where this tool comes in. It takes your guest list and their interactions, and finds the best possible seating plan that creates the happiest tables — using nothing but math, recursion, and computational suffering.

# Seating Optimization Logic

The problem is [NP-Hard](https://en.wikipedia.org/wiki/NP-hardness) where the goal is to partition the set of `N` guests into `K` tables (groups), each with `M` elements, and assign a table (group index) to each guest.

The tool uses a brute-force recursive algorithm that explores every possible way to assign guests to tables, in order to maximize the average mood at the wedding. Each guest is assigned to one of the tables. For every complete assignment, the algorithm calculates the total mood for each table by summing the pairwise interactions of all guests seated together (as defined in a symmetric `N × N` matrix), and computes the average mood across all non-empty tables.

While this brute-force approach guarantees the optimal result, it does not scale well. This approach explores every possible seating configuration, which leads to an exponential growth in time. For larger inputs, approximations or heuristic-based methods (like greedy search or genetic algorithms) could offer practical runtime improvements with near-optimal results.

So, based on the example above, here’s what the interaction matrix would look like for Batman, Robin, Joker, and Alfred:

|        | Batman | Robin | Joker | Alfred |
| -------| -------|-------|-------|--------|
| Batman | 0      | +5    | -5    | +2     |
| Robin  | +5     | 0     | -3    | +2     |
| Joker  | -5     | -3    | 0     | +2     |
| Alfred | +2     | +2    | +2    | 0      |

And considering two tables available with two chairs each, the optimal solution would be:
- Table 1: Batman and Robin
- Table 2: Joker and Alfred

With an average mood score of `3.50`.
