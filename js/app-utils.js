// Application utilities and reset functionality

// Function to reset everything to default state
function resetToDefaults() {
    // Confirm with user
    if (!confirm('Are you sure you want to reset all guests, tables, and interaction scores to default values?')) {
        return;
    }
    
    // Reset global state
    peopleCount = 1;
    tablesCount = 1;
    people = ['Guest 1'];
    peopleIcons = ['🐶'];
    tables = [{ chairs: 1 }];
    
    // Reset UI inputs
    document.getElementById('peopleCount').value = 1;
    document.getElementById('tablesCount').value = 1;
    document.getElementById('totalChairsCount').value = 1;
    
    // Clear localStorage
    localStorage.removeItem('interactionScores');
    
    // Update displays
    updatePeopleDisplay();
    updateMatrix();
    updateTablesDisplay();
    updateTotalChairsDisplay();
    
    console.log('Reset to default state completed! 🔄');
}

// Initialize the page
document.addEventListener('DOMContentLoaded', function() {
    updatePeopleDisplay();
    updateMatrix();
    updateTablesDisplay();
    updateTotalChairsDisplay();
});

// Add some helpful console logging
console.log('Happy Wedding website loaded! 🎉');
console.log('Features:');
console.log('- Add/remove guests');
console.log('- Set interaction scores between guests');
console.log('- Manage tables and chairs per table');
console.log('- All data persists in localStorage');
