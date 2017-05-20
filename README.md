# happy_wedding

 Prepare your wedding at best with "happy_wedding"!

# Usage

 The filename must be "banquet" with extension '.txt', then "banquet.txt".
 
 The first line of the file must contain respectively the values N = Number of guests, K = Number of tables and M = Tables seats.
 
 The other lines form a symmetric matrix with no diagonal. 
 
 The value of each position indicates the interaction of the person with each other. For example:
 
                  Trump Putin Renzi
            Trump   0    -2     3
            Putin  -2     0     1
            Renzi   3     1     0

  The diagonal of the matrix is zero because the person has not any interaction with herself. 
  
  Names should not be placed inside the file.
  
  The value of the interaction ranges from a minimum of -5 to a maximum of 5.
  
  An example of a file [6 (5+1) the number of guets, 2 the number of tables and 3 tables seats (for each table)]:
  
            6 2 3
            0 5 3 -2 1 1
            5 0 2 4 3 4
            3 2 0 1 5 -4
            -2 4 1 0 3 3
            1 3 5 3 0 2
            1 4 -4 3 2 0

  The algorithm will calculate the average mood of the room by seating.
  
  So, what are you waiting for? Sit down your guests appropriately!
  
  # Note
  
   Copyright (c) 2017 Federico Gianno
