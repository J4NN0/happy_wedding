# happy_wedding

 Prepare your wedding at best with "happy_wedding"!

# Usage

 The file "banquet.txt" must exists.
 
 The first line of the file must contain respectively the values N = Number of guests, K = Number of tables and M = Tables seats.
 
 The other lines form a symmetric matrix with all zeros in the diagonal. 
 
 The value of each position indicates the interactions of the people with each other. For example:
 
                  Trump Putin Renzi
            Trump   0    -2     3
            Putin  -2     0     1
            Renzi   3     1     0

  The diagonal of the matrix is zero because the person has not any interaction with herself. 
  
  Names should not be placed inside the file.
  
  The values of the interactions between people should be go from a minimum of -5 to a maximum of 5.
  
  An example of a file [6 (5+1) the number of guets, 2 the number of tables and 3 tables seats (for each table)]:
  
            6 2 3
            0 5 3 -2 1 1
            5 0 2 4 3 4
            3 2 0 1 5 -4
            -2 4 1 0 3 3
            1 3 5 3 0 2
            1 4 -4 3 2 0

  The algorithm, through a recursive function, will calculate the average mood of the room and will give you each person's seating.
  
  So, what are you waiting for? Sit down your guests appropriately!
