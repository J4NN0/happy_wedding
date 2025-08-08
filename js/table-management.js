// Tables management functions
function setTablesCount(value) {
    const newCount = parseInt(value);
    if (newCount && newCount >= 1) {
        if (newCount > tablesCount) {
            // Get the current chairs per table setting
            const totalChairsElement = document.getElementById('totalChairsCount');
            const chairsFromInput = totalChairsElement ? parseInt(totalChairsElement.value) : 1;
            const currentChairsPerTable = tables.length > 0 ? tables[0].chairs : 1;
            const chairsToUse = chairsFromInput || currentChairsPerTable;
            
            // Add tables with the current chairs setting
            while (tablesCount < newCount) {
                tablesCount++;
                tables.push({ chairs: chairsToUse });
            }
        } else if (newCount < tablesCount) {
            // Remove tables
            while (tablesCount > newCount && tablesCount > 1) {
                tablesCount--;
                tables.pop();
            }
        }
        updateTablesDisplay();
        updateTotalChairsDisplay();
    }
    // Update the input to reflect the actual count
    document.getElementById('tablesCount').value = tablesCount;
}

function increaseTables() {
    tablesCount++;
    // Get the current chairs per table setting
    const currentChairsPerTable = tables.length > 0 ? tables[0].chairs : 1;
    const totalChairsElement = document.getElementById('totalChairsCount');
    const chairsFromInput = totalChairsElement ? parseInt(totalChairsElement.value) : 1;
    const chairsToUse = chairsFromInput || currentChairsPerTable;
    
    tables.push({ chairs: chairsToUse });
    updateTablesDisplay();
    updateTotalChairsDisplay();
    document.getElementById('tablesCount').value = tablesCount;
}

function decreaseTables() {
    if (tablesCount > 1) {
        tablesCount--;
        tables.pop();
        updateTablesDisplay();
        updateTotalChairsDisplay();
        document.getElementById('tablesCount').value = tablesCount;
    }
}

// Total chairs management functions
function setTotalChairsCount(value) {
    const newChairs = parseInt(value);
    if (newChairs && newChairs >= 1) {
        // Set all tables to have the same number of chairs
        for (let i = 0; i < tables.length; i++) {
            tables[i].chairs = newChairs;
        }
        updateTablesDisplay();
        updateTotalChairsDisplay();
    }
    // Update the input to reflect the actual count
    document.getElementById('totalChairsCount').value = tables.length > 0 ? tables[0].chairs : 1;
}

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
        totalChairsElement.value = tables[0].chairs;
    }
}

// Individual table chair management functions
function setChairsCount(tableIndex, value) {
    const newChairs = parseInt(value);
    if (newChairs && newChairs >= 1 && tableIndex < tables.length) {
        tables[tableIndex].chairs = newChairs;
        updateChairsPosition(tableIndex, newChairs);
        
        // Update total chairs display if all tables have the same number
        const allSameChairs = tables.every(table => table.chairs === tables[0].chairs);
        if (allSameChairs) {
            updateTotalChairsDisplay();
        }
    }
    // Update the input to reflect the actual count
    const chairsCountElement = document.getElementById(`chairsCount${tableIndex}`);
    if (chairsCountElement) {
        chairsCountElement.value = tables[tableIndex]?.chairs || 1;
    }
}

function increaseChairs(tableIndex) {
    if (tableIndex < tables.length) {
        tables[tableIndex].chairs++;
        updateChairsPosition(tableIndex, tables[tableIndex].chairs);
        
        // Update the counter display for this table
        const chairsCountElement = document.getElementById(`chairsCount${tableIndex}`);
        if (chairsCountElement) {
            chairsCountElement.value = tables[tableIndex].chairs;
        }
        
        // Update total chairs display if all tables have the same number
        const allSameChairs = tables.every(table => table.chairs === tables[0].chairs);
        if (allSameChairs) {
            updateTotalChairsDisplay();
        }
    }
}

function decreaseChairs(tableIndex) {
    if (tableIndex < tables.length && tables[tableIndex].chairs > 1) {
        tables[tableIndex].chairs--;
        updateChairsPosition(tableIndex, tables[tableIndex].chairs);
        
        // Update the counter display for this table
        const chairsCountElement = document.getElementById(`chairsCount${tableIndex}`);
        if (chairsCountElement) {
            chairsCountElement.value = tables[tableIndex].chairs;
        }
        
        // Update total chairs display if all tables have the same number
        const allSameChairs = tables.every(table => table.chairs === tables[0].chairs);
        if (allSameChairs) {
            updateTotalChairsDisplay();
        }
    }
}

function addTable() {
    const setupContainer = document.getElementById('setupContainer');
    const newTableIndex = setupContainer.children.length - 1; // Subtract 1 because the add button is also a child
    
    // Get the current chairs per table setting from the input
    const totalChairsElement = document.getElementById('totalChairsCount');
    const chairsFromInput = totalChairsElement ? parseInt(totalChairsElement.value) : 1;
    
    // Get chairs from existing tables or use input value
    let chairsToUse = chairsFromInput;
    if (tables.length > 0) {
        // If we have existing tables, prefer the input value but fall back to existing table chairs
        chairsToUse = chairsFromInput || tables[tables.length - 1].chairs;
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
    tables.push({ chairs: chairsToUse });
    
    document.getElementById('tablesCount').value = tablesCount;
    updateChairsPosition(newTableIndex, chairsToUse);
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
    
    tablesCountElement.value = tablesCount;
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
