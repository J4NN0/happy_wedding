# happy_wedding

Prepare your wedding at best by S\sitting your guests in the best possible way (based on their relationships and/or interactions).

# Usage

1. Clone repo

       git clone https://github.com/J4NN0/happy_wedding.git
       
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

 3. The algorithm, through a recursive function, will calculate the average mood of the room and will give you each person's seating. 
 4. So, what are you waiting for? Sit down your guests appropriately!
