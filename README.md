# Happy Wedding

Imagine you’re planning a wedding. You’ve got a list of guests — friends, family, exes you couldn’t uninvite — and naturally, some of them love each other, some barely tolerate each other, and a few would happily fight over the last slice of cake.

Each guest has a “mood interaction score” with every other guest. For example:
- Batman and Robin are besties: +5
- Batman and The Joker? Well… eternal nemesis vibes: –5
- Harley Quinn and The Joker? Toxic but high-energy: +3

The idea is to seat people together in a way that maximizes the mood in the room — meaning, tables full of people who vibe well, or at least don’t threaten to flip it over.

That’s where this tool comes in. It takes your guest list and their interactions, and finds the best possible seating plan that creates the happiest tables — using nothing but math, recursion, and computational suffering.

# Seating Optimization Logic

The problem is [NP-Hard](https://en.wikipedia.org/wiki/NP-hardness) where the goal is to partition the set of `N` guests into `K` tables (groups), each with `M` elements, and assign a table (group index) to each guest.

The tool uses a brute-force recursive algorithm that explores every possible way to assign guests to tables, in order to maximize the average mood at the wedding. Each guest is assigned to one of the tables. For every complete assignment, the algorithm calculates the total mood for each table by summing the pairwise interactions of all guests seated together (as defined in a symmetric `N × N` matrix), and computes the average mood across all non-empty tables.

While this brute-force approach guarantees the optimal result, it does not scale well. This approach explores every possible seating configuration, which leads to an exponential growth in time. For larger inputs, approximations or heuristic-based methods (like greedy search or genetic algorithms) could offer practical runtime improvements with near-optimal results.

# Usage

1. Clone repo

       git clone https://github.com/J4NN0/happy_wedding.git
       cd happy_wedding
       
2. Make sure `banquet.txt` file exists and populate it accordingly
 
   1. First line of the file must contain respectively the values `N` (Number of guests), `K` (Number of tables) and `M` (Tables seats).
   2. The other lines form a symmetric matrix with all zeros in the diagonal (the diagonal of the matrix is zero because the person has no interaction with themselves). The value of each position indicates the interactions of the people with each other. For instance:
 
                  Trump Putin Renzi
            Trump   0    -2     3
            Putin  -2     0     1
            Renzi   3     1     0
  
   3. Names have to not be placed inside the file. Each person is identified by a number which is his position within the file. In the example above, Trump is identified by ID `0`, Putin `1` and Renzi `2`.
  4. The values of the interactions between people should be go from a minimum of `-5` to a maximum of `5`.
  5. An example of a file coudl be the following - `6 (5+1)` the number of guets, `2` the number of tables and `3` tables seats (for each table):
  
            6 2 3
            0 5 3 -2 1 1
            5 0 2 4 3 4
            3 2 0 1 5 -4
            -2 4 1 0 3 3
            1 3 5 3 0 2
            1 4 -4 3 2 0

 3. Make and run the program: the algorithm, through a recursive function, will calculate the average mood of the room and will give you each person's seating. 
 4. So, what are you waiting for? Sit down your guests appropriately!
