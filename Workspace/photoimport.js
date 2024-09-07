// photoimport.js

document.addEventListener('DOMContentLoaded', () => {
    const photoButton = document.getElementById('photoButton');
    let currentlySelected = null; // Track the currently selected image

    photoButton.addEventListener('click', () => {
        // Create an input element to select a file
        const input = document.createElement('input');
        input.type = 'file';
        input.accept = 'image/*'; // Accept only image files

        // When a file is selected
        input.addEventListener('change', (event) => {
            const file = event.target.files[0];
            if (file) {
                const reader = new FileReader();

                reader.onload = function (e) {
                    createImageElement(e.target.result);
                };

                reader.readAsDataURL(file); // Read the file as a data URL
            }
        });

        input.click(); // Trigger file input click
    });

    // Function to create and add an image element
    function createImageElement(src) {
        // Create an image element
        const img = document.createElement('img');
        img.src = src;
        img.style.position = 'absolute'; // Absolute positioning for dragging
        img.style.top = '50px'; // Initial position
        img.style.left = '50px'; // Initial position
        img.style.maxWidth = '200px'; // Example size
        img.style.maxHeight = '200px'; // Example size
        img.classList.add('draggable'); // Add draggable class

        // Add image to the document
        document.body.appendChild(img);

        // Make the image draggable
        img.addEventListener('mousedown', (event) => {
            const shiftX = event.clientX - img.getBoundingClientRect().left;
            const shiftY = event.clientY - img.getBoundingClientRect().top;

            function moveAt(pageX, pageY) {
                img.style.left = pageX - shiftX + 'px';
                img.style.top = pageY - shiftY + 'px';
            }

            function onMouseMove(event) {
                moveAt(event.pageX, event.pageY);
                // Select the image while dragging
                if (currentlySelected !== img) {
                    deselectCurrentlySelected();
                    currentlySelected = img;
                    img.classList.add('selected');
                    enableTextEditing(false); // Disable text editing
                }
            }

            document.addEventListener('mousemove', onMouseMove);

            img.onmouseup = function () {
                document.removeEventListener('mousemove', onMouseMove);
                img.onmouseup = null;
            };

            // Prevent text selection during dragging
            img.ondragstart = function () {
                return false;
            };
        });

        // Make the image selectable by clicking
        img.addEventListener('click', (event) => {
            // Prevent deselection on click
            event.stopPropagation();
            if (currentlySelected !== img) {
                deselectCurrentlySelected();
                currentlySelected = img;
                img.classList.add('selected');
                enableTextEditing(false); // Disable text editing
            }
        });

        // Handle double-click for selection
        img.addEventListener('dblclick', () => {
            if (currentlySelected !== img) {
                deselectCurrentlySelected();
                currentlySelected = img;
                img.classList.add('selected');
                enableTextEditing(false); // Disable text editing
            }
        });
    }

    // Function to deselect the currently selected item
    function deselectCurrentlySelected() {
        if (currentlySelected) {
            currentlySelected.classList.remove('selected');
            currentlySelected = null;
            enableTextEditing(true); // Re-enable text editing
        }
    }

    // Function to enable or disable text editing
    function enableTextEditing(enable) {
        const editableElements = document.querySelectorAll('[contenteditable]');
        editableElements.forEach(el => {
            el.contentEditable = enable; // Enable or disable contentEditable
        });
        document.querySelectorAll('.text-preview, .input-area').forEach(el => {
            el.style.pointerEvents = enable ? 'auto' : 'none'; // Enable or disable pointer events
        });
    }

    // Deselect image when clicking outside of it
    document.addEventListener('click', (event) => {
        if (currentlySelected && !currentlySelected.contains(event.target)) {
            deselectCurrentlySelected();
        }
    });

    // Deselect image when a new text area is created
    document.addEventListener('input', (event) => {
        const target = event.target;
        if (target.isContentEditable) {
            deselectCurrentlySelected();
        }
    });
});
