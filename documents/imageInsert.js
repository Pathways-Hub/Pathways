document.addEventListener('DOMContentLoaded', () => {
    const documentArea = document.querySelector('.document-area');
    const insertImageButton = document.getElementById('insert-image-btn');

    function insertImage(imageUrl) {
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

            // Update word count after image insertion (if you have such functionality)
            updateWordCount();
        }
    }

    function makeResizable(element) {
        const resizer = element.querySelector('.resize-handle');
        const img = element.querySelector('img');

        let startX, startY, startWidth, startHeight, aspectRatio;

        resizer.addEventListener('mousedown', (e) => {
            e.preventDefault();
            startX = e.clientX;
            startY = e.clientY;
            startWidth = parseInt(document.defaultView.getComputedStyle(img).width, 10);
            startHeight = parseInt(document.defaultView.getComputedStyle(img).height, 10);

            // Calculate the aspect ratio (width / height)
            aspectRatio = startWidth / startHeight;

            document.addEventListener('mousemove', onMouseMove);
            document.addEventListener('mouseup', onMouseUp);
        });

        function onMouseMove(e) {
            let newWidth = startWidth + e.clientX - startX;
            let newHeight = startHeight + e.clientY - startY;

            // If Shift key is pressed, maintain the aspect ratio
            if (e.shiftKey) {
                newHeight = newWidth / aspectRatio; // Adjust height based on aspect ratio
            }

            // Apply the new width and height to the image
            img.style.width = `${newWidth}px`;
            img.style.height = `${newHeight}px`;
        }

        function onMouseUp() {
            document.removeEventListener('mousemove', onMouseMove);
            document.removeEventListener('mouseup', onMouseUp);
        }
    }

    // Image URL insertion button functionality
    insertImageButton.addEventListener('click', () => {
        const imageUrl = prompt('Enter the URL of the image you want to insert:');
        insertImage(imageUrl);
    });

    // Handle paste event for copied images
    documentArea.addEventListener('paste', (event) => {
        const clipboardItems = event.clipboardData.items;
        for (let i = 0; i < clipboardItems.length; i++) {
            const item = clipboardItems[i];

            if (item.type.indexOf("image") !== -1) {
                const blob = item.getAsFile();
                const reader = new FileReader();
                reader.onload = (e) => {
                    insertImage(e.target.result); // Insert the copied image as base64
                };
                reader.readAsDataURL(blob); // Convert the image to a base64 string
                event.preventDefault(); // Prevent default paste behavior for images
            }
        }
    });
});
