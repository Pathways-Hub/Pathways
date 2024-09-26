document.addEventListener('DOMContentLoaded', () => {
    const colorChangeButton = document.getElementById('color-change-btn');
    const colorPicker = document.getElementById('text-color-picker');
    const upArrowButton = document.getElementById('up-arrow-btn');
    const downArrowButton = document.getElementById('down-arrow-btn');

    // Toggle visibility of the color picker
    colorChangeButton.addEventListener('click', () => {
        colorPicker.style.display = (colorPicker.style.display === 'none' || colorPicker.style.display === '') ? 'block' : 'none';
    });

    // Apply the selected color to the highlighted text
    colorPicker.addEventListener('input', (e) => {
        const selectedColor = e.target.value;
        applyColorToSelection(selectedColor);
    });

    // Function to apply the selected color to the highlighted text
    function applyColorToSelection(color) {
        const selection = window.getSelection();
        if (!selection.rangeCount) return;

        const range = selection.getRangeAt(0);
        const selectedText = range.toString();

        if (selectedText) {
            const span = document.createElement('span');
            span.style.color = color;
            span.textContent = selectedText;

            // Replace the selected text with the colored span
            range.deleteContents();
            range.insertNode(span);
        }
    }

    // Function to change font size
    function changeFontSize(increment) {
        const selection = window.getSelection();
        if (!selection.rangeCount) return;

        const range = selection.getRangeAt(0);
        const selectedText = range.toString();

        if (selectedText) {
            const parentElement = range.commonAncestorContainer.parentElement;

            // Get the current font size from the selected text
            const computedStyle = window.getComputedStyle(parentElement);
            let currentFontSize = parseFloat(computedStyle.fontSize);

            // Calculate the new font size with the increment, ensuring it doesn't go below 10px
            let newFontSize = Math.max(currentFontSize + increment, 10);
            
            // Apply the new font size
            parentElement.style.fontSize = `${newFontSize}px`;
        }
    }

    // Function to highlight text
    function highlightText() {
        const selection = window.getSelection();
        if (!selection.rangeCount) return;

        const range = selection.getRangeAt(0);
        const selectedText = range.toString();

        if (selectedText) {
            const span = document.createElement('span');
            span.style.backgroundColor = 'yellow'; // Highlight color
            span.textContent = selectedText;

            // Check if already highlighted, if so, remove highlight
            if (range.startContainer.parentElement.style.backgroundColor === 'yellow') {
                range.startContainer.parentElement.style.backgroundColor = ''; // Remove highlight
            } else {
                // Replace the selected text with the highlighted span
                range.deleteContents();
                range.insertNode(span);
            }
        }
    }

    // Event listeners for the up and down arrow buttons
    upArrowButton.addEventListener('click', () => {
        changeFontSize(2);  // Increase font size by 2px
    });

    downArrowButton.addEventListener('click', () => {
        changeFontSize(-2); // Decrease font size by 2px
    });

    // Keyboard shortcuts for increasing, decreasing font size, and highlighting
    document.addEventListener('keydown', (e) => {
        if (e.ctrlKey) {
            if (e.key === '=' || e.key === '+') {
                e.preventDefault(); // Prevent default zoom action
                changeFontSize(2);  // Increase font size by 2px
            }
            if (e.key === '-') {
                e.preventDefault(); // Prevent default zoom action
                changeFontSize(-2); // Decrease font size by 2px
            }
            if (e.key === 'h') {
                e.preventDefault(); // Prevent default action
                highlightText();     // Highlight text
            }
        }
    });
});
