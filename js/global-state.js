// Global state management
let peopleCount = 1;
let tablesCount = 1;
let people = ['Guest 1'];
let peopleIcons = ['🐶']; // Store icons for each person
let tables = [{ chairs: 1 }];

// Wedding planning global variables
let humorMax = Number.NEGATIVE_INFINITY;
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

// Function to get a random animal emoji
function getRandomAnimalEmoji() {
    const randomIndex = Math.floor(Math.random() * animalEmojis.length);
    return animalEmojis[randomIndex];
}

// Utility functions
function getTotalChairs() {
    return tables.reduce((total, table) => total + table.chairs, 0);
}

function getTotalPeople() {
    return peopleCount;
}
