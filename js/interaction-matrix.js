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
