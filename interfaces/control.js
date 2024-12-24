// Initial zoom level
let zoomLevel = 1;

// Function to update the zoom level
function updateZoom() {
    const device = document.getElementById('device');
    const zoomPercentage = document.getElementById('zoom-percentage');

    // Set the scale of the device to zoom in or out
    device.style.transform = `scale(${zoomLevel})`;
    
    // Update the displayed zoom percentage
    zoomPercentage.textContent = `${Math.round(zoomLevel * 100)}%`;
}

// Zoom in function
document.getElementById('zoom-in').addEventListener('click', () => {
    if (zoomLevel < 2) { // Limit max zoom level to 200%
        zoomLevel += 0.1;
        updateZoom();
    }
});

// Zoom out function
document.getElementById('zoom-out').addEventListener('click', () => {
    if (zoomLevel > 0.5) { // Limit min zoom level to 50%
        zoomLevel -= 0.1;
        updateZoom();
    }
});

// Fit button functionality: Fit the device to the screen
document.getElementById('fit-button').addEventListener('click', () => {
    const device = document.getElementById('device');
    
    // Calculate the scale to fit the device into the viewport
    const deviceWidth = device.offsetWidth;
    const deviceHeight = device.offsetHeight;
    
    // Get the dimensions of the content area
    const contentWidth = document.querySelector('.content').offsetWidth;
    const contentHeight = document.querySelector('.content').offsetHeight;

    // Determine the scale factor to fit the device to the screen
    const scaleX = contentWidth / deviceWidth;
    const scaleY = contentHeight / deviceHeight;
    const scale = Math.min(scaleX, scaleY); // Scale proportionally
    
    // Apply the calculated scale
    zoomLevel = scale;
    updateZoom();
});

// Reset button functionality: Reset the device position and zoom
document.getElementById('reset-button').addEventListener('click', () => {
    const device = document.getElementById('device');
    
    // Reset zoom to 100% and update the display
    zoomLevel = 1;
    updateZoom();
    
    // Reset the position of the device to the center
    const content = document.querySelector('.content');
    const contentWidth = content.offsetWidth;
    const contentHeight = content.offsetHeight;
    const deviceWidth = device.offsetWidth;
    const deviceHeight = device.offsetHeight;
    
    // Calculate the position to center the device
    const centerX = (contentWidth - deviceWidth) / 2;
    const centerY = (contentHeight - deviceHeight) / 2;
    
    device.style.left = `${centerX}px`;
    device.style.top = `${centerY}px`;
});

// Dragging functionality
const device = document.getElementById('device');
let isDragging = false;
let offsetX, offsetY;

device.addEventListener('mousedown', (e) => {
    // Start dragging
    isDragging = true;
    offsetX = e.clientX - device.offsetLeft;
    offsetY = e.clientY - device.offsetTop;
    device.style.cursor = 'grabbing'; // Change cursor to grabbing
});

document.addEventListener('mousemove', (e) => {
    if (isDragging) {
        // Move the device
        const x = e.clientX - offsetX;
        const y = e.clientY - offsetY;
        device.style.left = `${x}px`;
        device.style.top = `${y}px`;
    }
});

document.addEventListener('mouseup', () => {
    // Stop dragging
    isDragging = false;
    device.style.cursor = 'move'; // Reset cursor to move
});

// Function to update the page title based on the input field
function updateTitle(inputElement) {
    const newTitle = inputElement.value.trim();
    // Update the browser tab title
    document.title = newTitle || "Untitled Interface"; // Fallback to default if empty
}
