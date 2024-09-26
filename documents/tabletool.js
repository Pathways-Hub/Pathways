document.addEventListener('DOMContentLoaded', () => {
    const insertTableButton = document.getElementById('insert-table-btn');
    const documentArea = document.querySelector('.document-area');

    // Function to insert a table into the document
    function insertTable() {
        // Ask the user for table dimensions (rows and columns)
        const rows = prompt('Enter the number of rows for the table:');
        const cols = prompt('Enter the number of columns for the table:');

        if (rows > 0 && cols > 0) {
            // Check if there's a valid selection in the document area
            const selection = window.getSelection();
            if (!selection.rangeCount || !selection.anchorNode || !documentArea.contains(selection.anchorNode)) {
                // Display an error message if no valid selection is made
                alert('Please place the cursor where you want to insert the table.');
                return;
            }

            // Create the table element
            const table = document.createElement('table');
            table.classList.add('custom-table'); // Use custom table class for styling

            // Create rows and columns
            for (let i = 0; i < rows; i++) {
                const row = document.createElement('tr');
                for (let j = 0; j < cols; j++) {
                    const cell = document.createElement('td');
                    cell.textContent = '\u00A0'; // Add non-breaking space for visual purposes
                    row.appendChild(cell);
                }
                table.appendChild(row);
            }

            // Insert the table inline with the text
            const range = selection.getRangeAt(0);
            range.deleteContents(); // Remove any existing selection
            range.insertNode(table); // Insert the new table

            // Move cursor to the end of the inserted table
            const newRange = document.createRange();
            newRange.setStartAfter(table);
            newRange.collapse(true);
            selection.removeAllRanges();
            selection.addRange(newRange);
        } else {
            alert('Invalid input. Please enter positive numbers for rows and columns.');
        }
    }

    // Event listener for table insert button
    insertTableButton.addEventListener('click', insertTable);
});
