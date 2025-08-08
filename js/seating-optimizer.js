function mood(currentGuestId, sol, interactionMatrix, bestSol, totGuests, totTables, totSeatsPerTable, counts) {
    if (currentGuestId >= totGuests) {
        let totInteractionScore = 0;
        let tablesInUse = totTables;

        for (let tableId = 0; tableId < totTables; tableId++) {
            let tmpInteractionScore = 0;

            for (let guestId = 0; guestId < totGuests; guestId++) {
                if (sol[guestId] !== tableId) 
                    continue;

                for (let g = guestId + 1; g < totGuests; g++) {
                    if (sol[g] === tableId) {
                        tmpInteractionScore += interactionMatrix[guestId][g];
                    }
                }
            }

            if (counts[tableId] === 0) {
                tablesInUse--;
            }
            totInteractionScore += tmpInteractionScore;
        }

        if (tablesInUse === 0) return; // ultra-safety

        const tmpHumor = totInteractionScore / tablesInUse;
        if (tmpHumor > humorMax) {
            humorMax = tmpHumor;
            for (let guestId = 0; guestId < totGuests; guestId++) {
                bestSol[guestId] = sol[guestId];
            }
        }
        return;
    }

    for (let tableId = 0; tableId < totTables; tableId++) {
        if (counts[tableId] >= totSeatsPerTable) 
            continue;
        
        sol[currentGuestId] = tableId;
        counts[tableId]++;
        mood(currentGuestId + 1, sol, interactionMatrix, bestSol, totGuests, totTables, totSeatsPerTable, counts);
        counts[tableId]--;
    }
}

function startWeddingPlanning() {
    const totalSeats = getTotalChairs();
    if (totalSeats < peopleCount) {
        alert(`Not enough seats! You have ${peopleCount} guests but only ${totalSeats} seats available.`);
        return;
    }

    humorMax = Number.NEGATIVE_INFINITY;
    currentSolution = new Array(peopleCount).fill(0);
    bestSolution = new Array(peopleCount).fill(0);
    
    // For simplicity, all tables have the same capacity
    const seatsPerTable = Math.max(...tables.map(table => table.chairs));
    const counts = new Array(tablesCount).fill(0);
    const interactionMatrix = getInteractionMatrix();
    
    console.log('Starting wedding seating optimization...');
    console.log(`Guests: ${peopleCount}, Tables: ${tablesCount}, Max seats per table: ${seatsPerTable}`);

    mood(0, currentSolution, interactionMatrix, bestSolution, peopleCount, tablesCount, seatsPerTable, counts);

    displaySeatingResults();
}

function displaySeatingResults() {
    if (!Number.isFinite(humorMax)) {
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
