// multiselect.js

document.addEventListener('DOMContentLoaded', () => {
    let isMultiSelectMode = false;
    let selectionRect = document.createElement('div');
    selectionRect.style.position = 'absolute';
    selectionRect.style.border = '2px dashed blue';
    selectionRect.style.backgroundColor = 'rgba(0, 0, 255, 0.1)';
    selectionRect.style.pointerEvents = 'none';
    selectionRect.style.zIndex = '9999';
    document.body.appendChild(selectionRect);

    let startX, startY;

    // Toggle multi-select mode
    document.getElementById('multiSelectButton').addEventListener('click', () => {
        isMultiSelectMode = !isMultiSelectMode;
        selectionRect.style.display = isMultiSelectMode ? 'block' : 'none';
        if (!isMultiSelectMode) {
            clearSelections(); // Clear selections when toggling off
        }
    });

    // Start drawing the selection rectangle
    document.addEventListener('mousedown', (e) => {
        if (isMultiSelectMode) {
            startX = e.clientX;
            startY = e.clientY;
            selectionRect.style.left = `${startX}px`;
            selectionRect.style.top = `${startY}px`;
            selectionRect.style.width = '0px';
            selectionRect.style.height = '0px';
        }
    });

    // Update the size of the selection rectangle
    document.addEventListener('mousemove', (e) => {
        if (isMultiSelectMode && startX !== undefined && startY !== undefined) {
            const currentX = e.clientX;
            const currentY = e.clientY;
            const width = Math.abs(currentX - startX);
            const height = Math.abs(currentY - startY);
            selectionRect.style.width = `${width}px`;
            selectionRect.style.height = `${height}px`;
            selectionRect.style.left = `${Math.min(startX, currentX)}px`;
            selectionRect.style.top = `${Math.min(startY, currentY)}px`;
        }
    });

    // Finalize the selection
    document.addEventListener('mouseup', () => {
        if (isMultiSelectMode) {
            const rect = selectionRect.getBoundingClientRect();
            selectElementsInRect(rect);
            clearSelections(); // Clear the selection rectangle
        }
    });

    // Select elements within the selection rectangle
    function selectElementsInRect(rect) {
        const lines = document.querySelectorAll('.line');
        const stickyNotes = document.querySelectorAll('.sticky-note');

        lines.forEach(line => {
            const lineRect = line.getBoundingClientRect();
            if (isIntersecting(rect, lineRect)) {
                line.classList.add('line-selected');
            } else {
                line.classList.remove('line-selected');
            }
        });

        stickyNotes.forEach(note => {
            const noteRect = note.getBoundingClientRect();
            if (isIntersecting(rect, noteRect)) {
                note.classList.add('sticky-note-selected');
            } else {
                note.classList.remove('sticky-note-selected');
            }
        });
    }

    // Check if two rectangles intersect
    function isIntersecting(rect1, rect2) {
        return !(rect2.left > rect1.right || 
                 rect2.right < rect1.left || 
                 rect2.top > rect1.bottom || 
                 rect2.bottom < rect1.top);
    }

    // Clear the selection rectangle
    function clearSelections() {
        selectionRect.style.width = '0px';
        selectionRect.style.height = '0px';
        selectionRect.style.left = '0px';
        selectionRect.style.top = '0px';
    }
});
