// pencil.js

document.addEventListener('DOMContentLoaded', () => {
    let isDrawing = false; // Indicates if drawing mode is active
    let isErasing = false; // Indicates if erasing mode is active
    let isMouseDown = false; // Indicates if the mouse button is pressed
    let currentlySelected = null; // Holds the currently selected element (lines, images, etc.)
    const canvas = document.createElement('canvas');
    canvas.id = 'drawingCanvas';
    canvas.style.position = 'fixed'; // Fixed position to cover the viewport
    canvas.style.top = '0';
    canvas.style.left = '0';
    canvas.style.width = '100%';
    canvas.style.height = '100%';
    canvas.style.pointerEvents = 'none'; // Allow clicks to pass through initially
    canvas.style.zIndex = '999'; // Ensure it is below other elements
    document.body.appendChild(canvas);

    // Initialize canvas context
    const ctx = canvas.getContext('2d');
    ctx.strokeStyle = 'black'; // Drawing color
    ctx.lineWidth = 2; // Line thickness for drawing

    // Resize the canvas to match the viewport
    function resizeCanvas() {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
    }
    window.addEventListener('resize', resizeCanvas);
    resizeCanvas(); // Initial resize

    // Function to start drawing or erasing
    function startAction(event) {
        if (isDrawing || isErasing) {
            const rect = canvas.getBoundingClientRect();
            const x = (event.clientX || event.touches[0].clientX) - rect.left;
            const y = (event.clientY || event.touches[0].clientY) - rect.top;
            ctx.beginPath();
            ctx.moveTo(x, y);
            isMouseDown = true; // Mouse button or pen touch is pressed
        }
    }

    // Function to draw or erase on the canvas
    function performAction(event) {
        if ((isDrawing || isErasing) && isMouseDown) {
            const rect = canvas.getBoundingClientRect();
            const x = (event.clientX || event.touches[0].clientX) - rect.left;
            const y = (event.clientY || event.touches[0].clientY) - rect.top;

            if (isDrawing) {
                ctx.lineWidth = 2; // Set line width for drawing
                ctx.lineTo(x, y);
                ctx.stroke();
            } else if (isErasing) {
                ctx.lineWidth = 20; // Set eraser size (increase this for a larger eraser)
                ctx.globalCompositeOperation = 'destination-out'; // Set compositing mode to erase
                ctx.lineTo(x, y);
                ctx.stroke();
                ctx.globalCompositeOperation = 'source-over'; // Reset compositing mode to default
            }
        }
    }

    // Function to stop drawing or erasing
    function stopAction() {
        if (isDrawing || isErasing) {
            ctx.closePath();
            isMouseDown = false; // Mouse button or pen touch is released
        }
    }

    // Toggle drawing mode when pencil button is clicked
    document.getElementById('pencilButton').addEventListener('click', () => {
        isDrawing = !isDrawing; // Toggle drawing mode
        isErasing = false; // Ensure eraser mode is off
        const pencilIcon = document.getElementById('pencilButton').querySelector('i');

        if (isDrawing) {
            canvas.style.display = 'block'; // Show the canvas
            document.addEventListener('mousedown', startAction);
            document.addEventListener('mousemove', performAction);
            document.addEventListener('mouseup', stopAction);
            document.addEventListener('touchstart', startAction); // Handle touch start
            document.addEventListener('touchmove', performAction); // Handle touch move
            document.addEventListener('touchend', stopAction); // Handle touch end
            disableTextEditing(true); // Disable text editing and creation
            pencilIcon.style.color = 'rgb(77, 77, 77)'; // Change icon color to grey
            console.log('Drawing mode activated');
        } else {
            document.removeEventListener('mousedown', startAction);
            document.removeEventListener('mousemove', performAction);
            document.removeEventListener('mouseup', stopAction);
            document.removeEventListener('touchstart', startAction); // Remove touch event listeners
            document.removeEventListener('touchmove', performAction);
            document.removeEventListener('touchend', stopAction);
            disableTextEditing(false); // Enable text editing and creation
            pencilIcon.style.color = 'black'; // Revert icon color to black
            console.log('Drawing mode deactivated');
        }
    });

    // Toggle eraser mode when eraser button is clicked
    document.getElementById('eraserButton').addEventListener('click', () => {
        isErasing = !isErasing; // Toggle eraser mode
        isDrawing = false; // Ensure drawing mode is off
        const eraserIcon = document.getElementById('eraserButton').querySelector('i');

        if (isErasing) {
            canvas.style.display = 'block'; // Show the canvas
            document.addEventListener('mousedown', startAction);
            document.addEventListener('mousemove', performAction);
            document.addEventListener('mouseup', stopAction);
            document.addEventListener('touchstart', startAction); // Handle touch start
            document.addEventListener('touchmove', performAction); // Handle touch move
            document.addEventListener('touchend', stopAction); // Handle touch end
            disableTextEditing(true); // Disable text editing and creation
            eraserIcon.style.color = 'rgb(77, 77, 77)'; // Change icon color to grey
            console.log('Eraser mode activated');
        } else {
            document.removeEventListener('mousedown', startAction);
            document.removeEventListener('mousemove', performAction);
            document.removeEventListener('mouseup', stopAction);
            document.removeEventListener('touchstart', startAction); // Remove touch event listeners
            document.removeEventListener('touchmove', performAction);
            document.removeEventListener('touchend', stopAction);
            disableTextEditing(false); // Enable text editing and creation
            eraserIcon.style.color = 'black'; // Revert icon color to black
            console.log('Eraser mode deactivated');
        }
    });

    // Function to enable or disable text editing and creation
    function disableTextEditing(disable) {
        const editableElements = document.querySelectorAll('[contenteditable]');
        editableElements.forEach(el => {
            el.contentEditable = !disable; // Disable contentEditable
        });
        document.querySelectorAll('.text-preview, .input-area').forEach(el => {
            el.style.pointerEvents = disable ? 'none' : 'auto'; // Disable pointer events
        });
    }

    // Handle line selection
    document.addEventListener('click', (event) => {
        const target = event.target;

        // If the clicked element is a line
        if (target.classList.contains('line')) {
            // Deselect the previously selected element
            if (currentlySelected) {
                currentlySelected.classList.remove('selected');
                currentlySelected.style.border = 'none'; // Remove border color
            }
            // Select the new line
            currentlySelected = target;
            currentlySelected.classList.add('selected');
            currentlySelected.style.border = '2px solid red'; // Red border for selection
        } else {
            // Deselect the line if clicked outside and not in drawing mode
            if (currentlySelected && !isDrawing && !isErasing) {
                currentlySelected.classList.remove('selected');
                currentlySelected.style.border = 'none'; // Remove border color
                currentlySelected = null;
            }
        }
    });

    // Handle delete button click for lines and other elements
    document.getElementById('binButton').addEventListener('click', () => {
        if (currentlySelected) {
            currentlySelected.remove();
            currentlySelected = null;
        }
    });
});
