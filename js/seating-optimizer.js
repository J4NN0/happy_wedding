// Wedding seating optimization algorithm
// N = Number of guests
// K = Number of tables  
// M = Table seats
function mood(pos, sol, matr, bestSol, n, k, m) {
    let i = 0, j = 0, t = 0;
    let ris = 0, tot = 0, cntId = 0, nTab = k;
    let humorTmp;

    if (pos >= n) {
        for (i = 0; i < k; i++) {
            ris = 0;
            cntId = 0;
            for (j = 0; j < n; j++) {
                if (sol[j] === i) {
                    cntId++;
                    if (cntId > m) return;
                    for (t = j + 1; t < n; t++) {
                        if (sol[t] === i) {
                            ris += matr[j][t];
                        }
                    }
                }
            }
            if (cntId === 0) {
                nTab--; // empty table
            }
            tot += ris;
        }
        humorTmp = tot / nTab;
        if (humorTmp > humorMax) {
            humorMax = humorTmp;
            for (i = 0; i < n; i++) {
                bestSol[i] = sol[i];
            }
        }
        return;
    }

    for (i = 0; i < k; i++) {
        sol[pos] = i;
        mood(pos + 1, sol, matr, bestSol, n, k, m);
    }
}

// Function to start wedding planning optimization
function startWeddingPlanning() {
    const totalSeats = getTotalChairs();
    if (totalSeats < peopleCount) {
        alert(`Not enough seats! You have ${peopleCount} guests but only ${totalSeats} seats available.`);
        return;
    }
    
    // For simplicity, we'll assume all tables have the same capacity (max chairs from any table)
    const seatsPerTable = Math.max(...tables.map(table => table.chairs));
    
    // Initialize variables
    humorMax = 0;
    currentSolution = new Array(peopleCount).fill(0);
    bestSolution = new Array(peopleCount).fill(0);

    // Get interaction matrix
    const interactionMatrix = getInteractionMatrix();
    
    // Start the optimization
    console.log('Starting wedding seating optimization...');
    console.log(`Guests: ${peopleCount}, Tables: ${tablesCount}, Max seats per table: ${seatsPerTable}`);

    mood(0, currentSolution, interactionMatrix, bestSolution, peopleCount, tablesCount, seatsPerTable);

    // Display results
    displaySeatingResults();
}

// Function to display the optimization results
function displaySeatingResults() {
    if (humorMax === 0) {
        alert('No valid seating arrangement found. Please check your table capacity settings.');
        return;
    }
    
    console.log(`Best humor score: ${humorMax.toFixed(2)}`);
    console.log('Optimal seating arrangement:');
    
    let resultText = `🎉 Optimal Seating Arrangement Found!\n\nHumor Score: ${humorMax.toFixed(2)}\n\n`;
    
    // Group guests by table
    const tableAssignments = {};
    for (let i = 0; i < peopleCount; i++) {
        const tableNum = bestSolution[i];
        if (!tableAssignments[tableNum]) {
            tableAssignments[tableNum] = [];
        }
        tableAssignments[tableNum].push({
            name: people[i],
            icon: peopleIcons[i]
        });
    }
    
    // Display table assignments
    Object.keys(tableAssignments).forEach(tableNum => {
        const tableIndex = parseInt(tableNum);
        resultText += `Table ${tableIndex + 1}:\n`;
        tableAssignments[tableNum].forEach(guest => {
            resultText += `  ${guest.icon} ${guest.name}\n`;
        });
        resultText += '\n';
    });
    
    alert(resultText);
    
    // Also log to console for debugging
    console.log('Table assignments:', tableAssignments);
}
