document.addEventListener('DOMContentLoaded', () => {
    const documentArea = document.querySelector('.document-area');
    const uploadImageButton = document.getElementById('upload-image-btn');

    // Function to handle file upload and insert image into the document
    function uploadImage() {
        // Create a file input element
        const fileInput = document.createElement('input');
        fileInput.type = 'file';
        fileInput.accept = 'image/*'; // Only accept image files

        // Handle file selection
        fileInput.addEventListener('change', (event) => {
            const file = event.target.files[0];
            if (file) {
                const reader = new FileReader();
                
                reader.onload = function(e) {
                    // Create a wrapper div with a resizable class
                    const imgWrapper = document.createElement('div');
                    imgWrapper.classList.add('resizable-image-wrapper');

                    // Create an image element
                    const img = document.createElement('img');
                    img.src = e.target.result;
                    img.style.width = '500px'; // Set default width
                    img.style.height = 'auto'; // Maintain aspect ratio
                    img.style.maxWidth = '100%'; // Ensure image fits within document area

                    // Add image to the wrapper
                    imgWrapper.appendChild(img);

                    // Insert image wrapper into the document at the current selection
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
                    addResizeFunctionality(imgWrapper);

                    // Update word count after image insertion
                    updateWordCount();
                };

                reader.readAsDataURL(file); // Read the file as a data URL
            }
        });

        fileInput.click(); // Trigger file input dialog
    }

    // Function to add resizing functionality to the image wrapper
    function addResizeFunctionality(wrapper) {
        const img = wrapper.querySelector('img');
        
        // Create a resize handle
        const resizeHandle = document.createElement('div');
        resizeHandle.classList.add('resize-handle');
        wrapper.appendChild(resizeHandle);

        // Style the resize handle
        resizeHandle.style.width = '20px';
        resizeHandle.style.height = '20px';
        resizeHandle.style.backgroundColor = 'rgba(0, 0, 0, 0.5)';
        resizeHandle.style.position = 'absolute';
        resizeHandle.style.bottom = '0';
        resizeHandle.style.right = '0';
        resizeHandle.style.cursor = 'se-resize';
        resizeHandle.style.borderRadius = '50%';
        resizeHandle.style.display = 'none'; // Hide by default

        // Show resize handle on hover
        wrapper.addEventListener('mouseover', () => {
            resizeHandle.style.display = 'block';
        });
        wrapper.addEventListener('mouseout', () => {
            resizeHandle.style.display = 'none';
        });

        // Add resize functionality
        let isResizing = false;

        resizeHandle.addEventListener('mousedown', (e) => {
            e.preventDefault();
            isResizing = true;
        });

        document.addEventListener('mousemove', (e) => {
            if (isResizing) {
                const rect = wrapper.getBoundingClientRect();
                const width = e.clientX - rect.left;
                const height = e.clientY - rect.top;

                // Constrain the image to the document area if needed
                if (width > 0 && height > 0) {
                    img.style.width = `${width}px`;
                    img.style.height = `${height}px`;
                }
            }
        });

        document.addEventListener('mouseup', () => {
            isResizing = false;
        });
    }

    // Event listener for file upload button
    uploadImageButton.addEventListener('click', uploadImage);
});
