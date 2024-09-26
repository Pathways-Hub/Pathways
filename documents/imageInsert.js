document.addEventListener('DOMContentLoaded', () => {
    const documentArea = document.querySelector('.document-area');
    const insertImageButton = document.getElementById('insert-image-btn');

    function insertImage() {
        // Prompt user for the image URL
        const imageUrl = prompt('Enter the URL of the image you want to insert:');

        if (imageUrl) {
            // Create a wrapper div with a resizable class
            const imgWrapper = document.createElement('div');
            imgWrapper.classList.add('resizable-image-wrapper');

            // Create an image element
            const img = document.createElement('img');
            img.src = imageUrl;
            img.classList.add('resizable-image'); // Assign a class for easy styling

            // Create a resize handle
            const resizeHandle = document.createElement('div');
            resizeHandle.classList.add('resize-handle');

            // Append image and handle to the wrapper
            imgWrapper.appendChild(img);
            imgWrapper.appendChild(resizeHandle);

            // Insert the resizable image into the document at the current selection
            const selection = window.getSelection();
            if (!selection.rangeCount) return;

            const range = selection.getRangeAt(0);
            range.deleteContents(); // Remove any existing selection
            range.insertNode(imgWrapper); // Insert the new image wrapper

            // Move cursor to end of the inserted image
            const newRange = document.createRange();
            newRange.setStartAfter(imgWrapper);
            newRange.collapse(true);
            selection.removeAllRanges();
            selection.addRange(newRange);

            // Add resizing functionality
            makeResizable(imgWrapper);

            // Update word count after image insertion
            updateWordCount();
        }
    }

    function makeResizable(element) {
        const resizer = element.querySelector('.resize-handle');
        const img = element.querySelector('img');

        let startX, startY, startWidth, startHeight;

        resizer.addEventListener('mousedown', (e) => {
            e.preventDefault();
            startX = e.clientX;
            startY = e.clientY;
            startWidth = parseInt(document.defaultView.getComputedStyle(img).width, 10);
            startHeight = parseInt(document.defaultView.getComputedStyle(img).height, 10);

            document.addEventListener('mousemove', onMouseMove);
            document.addEventListener('mouseup', onMouseUp);
        });

        function onMouseMove(e) {
            img.style.width = `${startWidth + e.clientX - startX}px`;
            img.style.height = `${startHeight + e.clientY - startY}px`;
        }

        function onMouseUp() {
            document.removeEventListener('mousemove', onMouseMove);
            document.removeEventListener('mouseup', onMouseUp);
        }
    }

    insertImageButton.addEventListener('click', insertImage);
});
