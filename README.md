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

This seating optimization is a variation of the balanced partitioning problem, which is [NP-Hard](https://en.wikipedia.org/wiki/NP-hardness). The aim is to assign `N` guests to `K` tables, each with a maximum of `M` seats, in a way that maximizes the average mood across all tables that are actually in use. The mood is determined from a symmetric `N × N` interaction matrix, where each entry `(i, j)` represents the mood score when guest `i` and guest `j` are seated together. Positive scores indicate good chemistry, while negative scores reflect tension.

The algorithm takes a brute-force approach, exploring every possible way to seat the guests. It works recursively, starting with the first guest and trying them at each table in turn, then moving on to the next guest, and so on, until everyone is seated. Once a complete seating arrangement is produced, it is scored by summing the pairwise interaction values for all guests sharing a table. The total score for the arrangement is the sum of the scores from all tables, and this value is divided by the number of tables that are actually occupied to produce the average mood score. If this score is higher than any found so far, the current seating arrangement is saved as the best solution.

While this exhaustive method guarantees an optimal solution, the search space grows extremely quickly. Without any optimisation, there are `K^N` possible arrangements to check, and each one can take up to `O(N^2)` time to score because every pair of guests may need to be considered. For even moderately sized weddings, this number becomes very large, making the naïve version impractical.

To make the process more efficient, the implementation uses pruning. It keeps track of how many guests are currently assigned to each table while exploring the search tree. If a table has already reached its maximum capacity, the algorithm stops trying to assign further guests to it for that branch of the search. This prevents a large number of invalid configurations from ever being considered. Similarly, if a table would exceed its capacity before everyone is assigned, the branch is abandoned immediately. These checks cut off significant portions of the search space while still ensuring that the final result is exact.

Despite the pruning, the algorithm still examines all feasible configurations, so for the given problem size the result is guaranteed to be the best possible. For larger events, however, the exponential complexity would still become a bottleneck, and heuristic or approximate methods such as greedy placement, genetic algorithms, or simulated annealing would be needed to find good solutions within a reasonable time.

As an example, suppose we have four guests - Batman, Robin, Joker, and Alfred - with the following interaction matrix:

|        | Batman | Robin | Joker | Alfred |
| -------| -------|-------|-------|--------|
| Batman | 0      | +5    | -5    | +2     |
| Robin  | +5     | 0     | -3    | +2     |
| Joker  | -5     | -3    | 0     | +2     |
| Alfred | +2     | +2    | +2    | 0      |

If there are two tables with two seats each, the optimal arrangement is to seat Batman and Robin together at the first table, and Joker with Alfred at the second. This yields an average mood score of `3.50`, which is the highest possible given the constraints.
