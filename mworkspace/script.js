// Select the editable elements
const note = document.getElementById('note');
const title = document.getElementById('title');

// Load saved content from localStorage (if any)
window.addEventListener('DOMContentLoaded', () => {
    const savedTitle = localStorage.getItem('noteTitle');
    const savedNote = localStorage.getItem('noteContent');
    
    // Load saved title and note content if they exist
    if (savedTitle) {
        title.textContent = savedTitle;
    }
    if (savedNote) {
        note.innerHTML = savedNote;
    }
});

// Save the title and note content to localStorage whenever they change
title.addEventListener('input', () => {
    localStorage.setItem('noteTitle', title.textContent);
});

note.addEventListener('input', () => {
    localStorage.setItem('noteContent', note.innerHTML);
});

// Utility to toggle formatting for selected text
function toggleFormat(command) {
    document.execCommand(command, false, null);
}

// Attach event listeners to taskbar buttons for formatting
document.getElementById('boldButton').addEventListener('click', () => {
    toggleFormat('bold');
});

document.getElementById('italicButton').addEventListener('click', () => {
    toggleFormat('italic');
});
