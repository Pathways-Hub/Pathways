document.addEventListener('DOMContentLoaded', () => {
    const colorChangeButton = document.getElementById('color-change-btn');
    const colorPicker = document.getElementById('text-color-picker');
    const upArrowButton = document.getElementById('up-arrow-btn');
    const downArrowButton = document.getElementById('down-arrow-btn');
    const highlightButton = document.getElementById('highlight-btn');

    let isHighlightActive = false;

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

        // Visually toggle color button (active state)
        colorChangeButton.classList.add('active');
        setTimeout(() => {
            colorChangeButton.classList.remove('active');
        }, 500);  // Reset after 0.5 seconds
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

            // Toggle visual state for up/down arrows
            if (increment > 0) {
                upArrowButton.classList.add('active');
                setTimeout(() => upArrowButton.classList.remove('active'), 500);
            } else {
                downArrowButton.classList.add('active');
                setTimeout(() => downArrowButton.classList.remove('active'), 500);
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

    // Apply yellow highlight to selected text or remove highlight
    highlightButton.addEventListener('click', () => {
        toggleHighlight('yellow'); // Default highlight color is yellow
    });

    // Function to toggle highlight color
    function toggleHighlight(color) {
        const selection = window.getSelection();
        if (!selection.rangeCount) return;

        const range = selection.getRangeAt(0);
        const selectedText = range.toString();

        if (selectedText) {
            const parentElement = range.commonAncestorContainer.parentElement;

            // Check if the selected text is already highlighted
            if (parentElement.style.backgroundColor === color) {
                // Remove highlight
                parentElement.style.backgroundColor = '';
                highlightButton.classList.remove('active');
                isHighlightActive = false;
            } else {
                // Apply highlight
                const span = document.createElement('span');
                span.style.backgroundColor = color;
                span.textContent = selectedText;

                // Replace the selected text with the highlighted span
                range.deleteContents();
                range.insertNode(span);

                highlightButton.classList.add('active'); // Visually toggle highlight button
                isHighlightActive = true;
            }
        }
    }

    // Apply Ctrl+H shortcut for highlighting
    document.addEventListener('keydown', (e) => {
        if (e.ctrlKey && e.key === 'h') {
            e.preventDefault();
            toggleHighlight('yellow');
        }
    });
});
