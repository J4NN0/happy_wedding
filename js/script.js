// Global state
let peopleCount = 1;
let tablesCount = 1;
let people = ['Guest 1'];
let peopleIcons = ['🐶']; // Store icons for each person
let tables = [{ chairs: 1 }];

// Wedding planning global variables
let humorMax = 0;
let bestSolution = [];
let currentSolution = [];

// Animal emoji array for random selection
const animalEmojis = [
    '🐶', '🐱', '🐭', '🐹', '🐰', '🦊', '🐻', '🐼', '🐨', '🐯', 
    '🦁', '🐮', '🐷', '🐸', '🐵', '🐔', '🐧', '🐦', '🐤', '🦆',
    '🦅', '🦉', '🦇', '🐺', '🐗', '🐴', '🦄', '🐝', '🐛', '🦋',
    '🐌', '🐞', '🐜', '🦗', '🕷️', '🕸️', '🦂', '🦟', '🦠', '🐢',
    '🐍', '🦎', '🦖', '🦕', '🐙', '🦑', '🦐', '🦞', '🦀', '🐡',
    '🐠', '🐟', '🐬', '🐳', '🐋', '🦈', '🐊', '🐅', '🐆', '🦓',
    '🦍', '🦧', '🐘', '🦛', '🦏', '🐪', '🐫', '🦒', '🦘', '🐃',
    '🐂', '🐄', '🐎', '🐖', '🐏', '🐑', '🐐', '🦌', '🐕', '🐩',
    '🐈', '🐓', '🦃', '🦚', '🦜', '🦢', '🦩', '🕊️', '🐇', '🦝',
    '🦨', '🦡', '🦫', '🦦', '🦥', '🐁', '🐀', '🐿️', '🦔'
];

// Initialize the page
document.addEventListener('DOMContentLoaded', function() {
    updatePeopleDisplay();
    updateMatrix();
    updateTablesDisplay();
    updateTotalChairsDisplay();
});

// Function to get a random animal emoji
function getRandomAnimalEmoji() {
    const randomIndex = Math.floor(Math.random() * animalEmojis.length);
    return animalEmojis[randomIndex];
}

// People management functions
function increasePeople() {
    peopleCount++;
    people.push(`Guest ${peopleCount}`);
    peopleIcons.push(getRandomAnimalEmoji());
    updatePeopleDisplay();
    updateMatrix();
}

function decreasePeople() {
    if (peopleCount > 1) {
        peopleCount--;
        people.pop();
        peopleIcons.pop();
        updatePeopleDisplay();
        updateMatrix();
    }
}

function addPerson() {
    const peopleList = document.getElementById('peopleList');
    const newPersonIndex = peopleList.children.length;
    const randomIcon = getRandomAnimalEmoji();
    
    const personItem = document.createElement('div');
    personItem.className = 'person-item';
    personItem.innerHTML = `
        <span class="person-icon">${randomIcon}</span>
        <input type="text" class="person-name" placeholder="Guest name" value="Guest ${newPersonIndex + 1}">
        <button class="remove-person-btn" onclick="removePerson(${newPersonIndex})">-</button>
    `;
    
    peopleList.appendChild(personItem);
    
    // Update the global state
    peopleCount = peopleList.children.length;
    people = Array.from(peopleList.children).map((item, index) => {
        const input = item.querySelector('.person-name');
        return input.value || `Guest ${index + 1}`;
    });
    
    // Update icons array
    peopleIcons = Array.from(peopleList.children).map((item) => {
        const iconElement = item.querySelector('.person-icon');
        return iconElement.textContent;
    });
    
    document.getElementById('peopleCount').textContent = peopleCount;
    updateMatrix();
}

function removePerson(index) {
    if (peopleCount > 1) {
        people.splice(index, 1);
        peopleIcons.splice(index, 1);
        peopleCount--;
        updatePeopleDisplay();
        updateMatrix();
    }
}

function updatePeopleDisplay() {
    const peopleList = document.getElementById('peopleList');
    const peopleCountElement = document.getElementById('peopleCount');
    
    // Clear existing people
    peopleList.innerHTML = '';
    
    // Add people based on current count
    for (let i = 0; i < peopleCount; i++) {
        const personItem = document.createElement('div');
        personItem.className = 'person-item';
        personItem.innerHTML = `
            <span class="person-icon">${peopleIcons[i] || '👤'}</span>
            <input type="text" class="person-name" placeholder="Guest name" value="${people[i] || `Guest ${i + 1}`}" onchange="updatePersonName(${i}, this.value)">
            <button class="remove-person-btn" onclick="removePerson(${i})">-</button>
        `;
        peopleList.appendChild(personItem);
    }
    
    peopleCountElement.textContent = peopleCount;
}

function updatePersonName(index, name) {
    people[index] = name;
    updateMatrix();
}

// Matrix management functions
function updateMatrix() {
    const matrixContainer = document.getElementById('interactionMatrix');
    matrixContainer.innerHTML = '';
    
    if (peopleCount === 0) return;
    
    // Create matrix header row
    const headerRow = document.createElement('div');
    headerRow.className = 'matrix-row';
    
    // Add empty corner cell
    const cornerCell = document.createElement('div');
    cornerCell.className = 'matrix-cell header';
    cornerCell.textContent = '';
    headerRow.appendChild(cornerCell);
    
    // Add column headers
    for (let i = 0; i < peopleCount; i++) {
        const headerCell = document.createElement('div');
        headerCell.className = 'matrix-cell header';
        headerCell.innerHTML = `<span class="matrix-icon">${peopleIcons[i] || '👤'}</span> ${people[i] || `Guest ${i + 1}`}`;
        headerRow.appendChild(headerCell);
    }
    
    matrixContainer.appendChild(headerRow);
    
    // Create matrix rows
    for (let i = 0; i < peopleCount; i++) {
        const row = document.createElement('div');
        row.className = 'matrix-row';
        
        // Add row header
        const rowHeader = document.createElement('div');
        rowHeader.className = 'matrix-cell header';
        rowHeader.innerHTML = `<span class="matrix-icon">${peopleIcons[i] || '👤'}</span> ${people[i] || `Guest ${i + 1}`}`;
        row.appendChild(rowHeader);
        
        // Add matrix cells
        for (let j = 0; j < peopleCount; j++) {
            const cell = document.createElement('div');
            cell.className = 'matrix-cell';
            cell.setAttribute('data-row', i);
            cell.setAttribute('data-col', j);
            
            if (i === j) {
                // Diagonal cells (same person)
                cell.className = 'matrix-cell diagonal';
                cell.textContent = '-';
            } else if (i < j) {
                // Upper triangle - editable
                cell.className = 'matrix-cell input';
                const input = document.createElement('input');
                input.type = 'number';
                input.min = '-5';
                input.max = '5';
                input.placeholder = '-5 to +5';
                input.value = getInteractionScore(i, j) || '0';
                input.onchange = function() {
                    setInteractionScore(i, j, this.value);
                };
                cell.appendChild(input);
            } else {
                // Lower triangle - read-only (mirrors upper triangle)
                cell.className = 'matrix-cell input readonly';
                const input = document.createElement('input');
                input.type = 'number';
                input.min = '-5';
                input.max = '5';
                input.placeholder = '-5 to +5';
                input.value = getInteractionScore(j, i) || '0';
                input.readOnly = true;
                input.style.backgroundColor = '#f0f0f0';
                input.style.color = '#666';
                cell.appendChild(input);
            }
            
            row.appendChild(cell);
        }
        
        matrixContainer.appendChild(row);
    }
}

// Interaction score storage (using localStorage for persistence)
function getInteractionScore(person1, person2) {
    const key = `interaction_${Math.min(person1, person2)}_${Math.max(person1, person2)}`;
    return localStorage.getItem(key) || '';
}

function setInteractionScore(person1, person2, score) {
    const key = `interaction_${Math.min(person1, person2)}_${Math.max(person1, person2)}`;
    localStorage.setItem(key, score);
    
    // Update the symmetric cell in the matrix
    updateSymmetricCell(person1, person2, score);
}

function updateSymmetricCell(person1, person2, score) {
    // Find the symmetric cell and update its display
    const matrixContainer = document.getElementById('interactionMatrix');
    if (!matrixContainer) return;
    
    // Get the symmetric cell (swap row and column)
    const symmetricCell = matrixContainer.querySelector(`[data-row="${person2}"][data-col="${person1}"] input`);
    if (symmetricCell) {
        symmetricCell.value = score;
    }
}

// Tables management functions
function increaseTables() {
    tablesCount++;
    tables.push({ chairs: 1 });
    updateTablesDisplay();
    updateTotalChairsDisplay();
}

function decreaseTables() {
    if (tablesCount > 1) {
        tablesCount--;
        tables.pop();
        updateTablesDisplay();
        updateTotalChairsDisplay();
    }
}

// Total chairs management functions
function increaseTotalChairs() {
    // Add one chair to all tables at the same time
    if (tables.length > 0) {
        for (let i = 0; i < tables.length; i++) {
            tables[i].chairs++;
        }
        updateTablesDisplay();
        updateTotalChairsDisplay();
    }
}

function decreaseTotalChairs() {
    // Remove one chair from all tables at the same time (ensure at least 1 chair per table)
    if (tables.length > 0) {
        let canDecrease = true;
        // Check if all tables have more than 1 chair
        for (let i = 0; i < tables.length; i++) {
            if (tables[i].chairs <= 1) {
                canDecrease = false;
                break;
            }
        }
        
        if (canDecrease) {
            for (let i = 0; i < tables.length; i++) {
                tables[i].chairs--;
            }
            updateTablesDisplay();
            updateTotalChairsDisplay();
        }
    }
}

function updateTotalChairsDisplay() {
    const totalChairsElement = document.getElementById('totalChairsCount');
    if (totalChairsElement && tables.length > 0) {
        // Display chairs per table (assuming all tables have the same number of chairs)
        totalChairsElement.textContent = tables[0].chairs;
    }
}

function addTable() {
    const setupContainer = document.getElementById('setupContainer');
    const newTableIndex = setupContainer.children.length - 1; // Subtract 1 because the add button is also a child
    
    // Get the number of chairs from the previous table (if it exists)
    let previousChairs = 1;
    if (tables.length > 0) {
        previousChairs = tables[tables.length - 1].chairs;
    }
    
    const tableVisual = document.createElement('div');
    tableVisual.className = 'table-visual';
    tableVisual.id = `table${newTableIndex}`;
    tableVisual.innerHTML = `
        <div class="chairs-container" id="chairsContainer${newTableIndex}">
            <div class="table-circle">
                <span class="table-number">${newTableIndex + 1}</span>
            </div>
        </div>
        <button class="remove-table-btn" onclick="removeTable(${newTableIndex})">-</button>
    `;
    
    // Insert the new table before the add button
    const addButton = setupContainer.querySelector('.add-table-btn-side');
    setupContainer.insertBefore(tableVisual, addButton);
    
    // Update the global state
    tablesCount = newTableIndex + 1;
    tables.push({ chairs: previousChairs });
    
    document.getElementById('tablesCount').textContent = tablesCount;
    updateChairsPosition(newTableIndex, previousChairs);
    updateTotalChairsDisplay();
}

function removeTable(index) {
    if (tablesCount > 1) {
        tables.splice(index, 1);
        tablesCount--;
        updateTablesDisplay();
        updateTotalChairsDisplay();
    }
}

function updateTablesDisplay() {
    const setupContainer = document.getElementById('setupContainer');
    const tablesCountElement = document.getElementById('tablesCount');
    
    // Clear existing tables but keep the add button
    const addButton = setupContainer.querySelector('.add-table-btn-side');
    setupContainer.innerHTML = '';
    if (addButton) {
        setupContainer.appendChild(addButton);
    }
    
    // Add tables based on current count
    for (let i = 0; i < tablesCount; i++) {
        const tableVisual = document.createElement('div');
        tableVisual.className = 'table-visual';
        tableVisual.id = `table${i}`;
        tableVisual.innerHTML = `
            <div class="chairs-container" id="chairsContainer${i}">
                <div class="table-circle">
                    <span class="table-number">${i + 1}</span>
                </div>
            </div>
            <button class="remove-table-btn" onclick="removeTable(${i})">-</button>
        `;
        
        // Insert table before the add button
        const currentAddButton = setupContainer.querySelector('.add-table-btn-side');
        setupContainer.insertBefore(tableVisual, currentAddButton);
        
        // Update chairs for this table
        updateChairsPosition(i, tables[i]?.chairs || 1);
    }
    
    tablesCountElement.textContent = tablesCount;
    updateTotalChairsDisplay();
}

function updateChairsPosition(tableIndex, chairCount) {
    const chairsContainer = document.getElementById(`chairsContainer${tableIndex}`);
    if (!chairsContainer) return;
    
    // Clear existing chairs but keep the table circle
    const tableCircle = chairsContainer.querySelector('.table-circle');
    chairsContainer.innerHTML = '';
    if (tableCircle) {
        chairsContainer.appendChild(tableCircle);
    }
    
    for (let i = 0; i < chairCount; i++) {
        const chair = document.createElement('div');
        chair.className = 'chair';
        chair.setAttribute('data-chair', i);
        
        // Position chairs in a circle around the table
        const angle = (i * 360 / chairCount) * (Math.PI / 180);
        const radius = 60; // Distance from center (increased for more space)
        const centerX = 80; // Center of chairs container (160px / 2)
        const centerY = 80; // Center of chairs container (160px / 2)
        
        // Calculate position relative to the center
        const x = centerX + radius * Math.cos(angle);
        const y = centerY + radius * Math.sin(angle);
        
        // Position chair relative to the container
        chair.style.position = 'absolute';
        chair.style.left = `${x}px`;
        chair.style.top = `${y}px`;
        chair.style.transform = 'translate(-50%, -50%)'; // Center the chair on its position
        
        chairsContainer.appendChild(chair);
    }
}

// Utility functions
function getTotalChairs() {
    return tables.reduce((total, table) => total + table.chairs, 0);
}

function getTotalPeople() {
    return peopleCount;
}

// Add some helpful console logging
console.log('Happy Wedding website loaded! 🎉');
console.log('Features:');
console.log('- Add/remove guests');
console.log('- Set interaction scores between guests');
console.log('- Manage tables and chairs per table');
console.log('- All data persists in localStorage'); 

// Wedding seating optimization function
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

// Helper function to get interaction matrix from the UI
function getInteractionMatrix() {
    const matrix = [];
    for (let i = 0; i < peopleCount; i++) {
        matrix[i] = [];
        for (let j = 0; j < peopleCount; j++) {
            if (i === j) {
                matrix[i][j] = 0; // Same person
            } else {
                const score = getInteractionScore(Math.min(i, j), Math.max(i, j));
                matrix[i][j] = parseInt(score) || 0;
            }
        }
    }
    return matrix;
}

// Function to start wedding planning optimization
function startWeddingPlanning() {
    const n = peopleCount; // Number of guests
    const k = tablesCount; // Number of tables
    const totalSeats = getTotalChairs(); // Total available seats
    
    // Check if we have enough seats for all guests
    if (totalSeats < n) {
        alert(`Not enough seats! You have ${n} guests but only ${totalSeats} seats available.`);
        return;
    }
    
    // For simplicity, we'll assume all tables have the same capacity (max chairs from any table)
    const m = Math.max(...tables.map(table => table.chairs));
    
    // Initialize variables
    humorMax = 0;
    currentSolution = new Array(n).fill(0);
    bestSolution = new Array(n).fill(0);
    
    // Get interaction matrix
    const interactionMatrix = getInteractionMatrix();
    
    // Start the optimization
    console.log('Starting wedding seating optimization...');
    console.log(`Guests: ${n}, Tables: ${k}, Max seats per table: ${m}`);
    
    mood(0, currentSolution, interactionMatrix, bestSolution, n, k, m);
    
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