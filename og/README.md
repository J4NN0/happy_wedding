# happy_wedding

This is the code I originally wrote during my first year of university. Unfortunately for anyone reading it today, at the time I was more focused on the mathematical logic than on writing clean/readable code. Variable names follow a very mathematical style (think `i`, `j`, `k`), comments are a luxury I couldn’t afford, and there’s no pruning or optimisation implemented — it’s a pure, unfiltered brute-force approach.

For a clearer (I hope), more readable version (and to spare yourself some headaches), please refer to the [new implementation](https://github.com/J4NN0/happy-wedding/blob/master/js/seating-optimizer.js).

# Usage

1. Clone repo

       git clone https://github.com/J4NN0/happy_wedding.git
       cd happy_wedding
       
2. Make sure `banquet.txt` file exists and populate it accordingly
 
   1. First line of the file must contain respectively the values `N` (Number of guests), `K` (Number of tables) and `M` (Tables seats).
   2. The other lines form a symmetric matrix with all zeros in the diagonal (the diagonal of the matrix is zero because the person has no interaction with themselves). The value of each position indicates the interactions of the people with each other.
   3. The values of the interactions between people should be go from a minimum of `-5` to a maximum of `5`.
   4. An example of a file could be the following - `6 (5+1)` the number of guests, `2` the number of tables and `3` tables seats (for each table):
  
            6 2 3
            0 5 3 -2 1 1
            5 0 2 4 3 4
            3 2 0 1 5 -4
            -2 4 1 0 3 3
            1 3 5 3 0 2
            1 4 -4 3 2 0

3. Make and run the program: the algorithm, through a recursive function, will calculate the average mood of the room and will give you each person's seating.
4. So, what are you waiting for? Sit down your guests appropriately!
