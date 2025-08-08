// People management functions
function setPeopleCount(value) {
    const newCount = parseInt(value);
    if (newCount && newCount >= 1) {
        if (newCount > peopleCount) {
            // Add people
            while (peopleCount < newCount) {
                increasePeople();
            }
        } else if (newCount < peopleCount) {
            // Remove people
            while (peopleCount > newCount && peopleCount > 1) {
                decreasePeople();
            }
        }
    }
    // Update the input to reflect the actual count
    document.getElementById('peopleCount').value = peopleCount;
}

function increasePeople() {
    peopleCount++;
    people.push(`Guest ${peopleCount}`);
    peopleIcons.push(getRandomAnimalEmoji());
    updatePeopleDisplay();
    updateMatrix();
    document.getElementById('peopleCount').value = peopleCount;
}

function decreasePeople() {
    if (peopleCount > 1) {
        peopleCount--;
        people.pop();
        peopleIcons.pop();
        updatePeopleDisplay();
        updateMatrix();
        document.getElementById('peopleCount').value = peopleCount;
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
    
    document.getElementById('peopleCount').value = peopleCount;
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
    
    document.getElementById('peopleCount').value = peopleCount;
}

function updatePersonName(index, name) {
    people[index] = name;
    updateMatrix();
}
