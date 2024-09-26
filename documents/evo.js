// Create a new img element
const evoImage = document.createElement('img');
evoImage.src = 'documents/evoai.png';  // Image source
evoImage.alt = 'Evo Image'; // Alt text for accessibility

// Set the image styles to fix its position, size, and offset
evoImage.style.position = 'fixed';
evoImage.style.bottom = '10px';  // Move 10px from the bottom
evoImage.style.right = '30px';    // Move 10px from the left
evoImage.style.zIndex = '9999';  // Ensure it's on top of other elements
evoImage.style.width = '50px';  // Set the width
evoImage.style.height = 'auto';  // Maintain aspect ratio

// Append the image to the body
document.body.appendChild(evoImage);

// Function to check the screen width and hide/show the image
function checkScreenSize() {
    if (window.innerWidth <= 768) {
        evoImage.style.display = 'none';  // Hide the image if screen width is 768px or smaller
    } else {
        evoImage.style.display = 'block'; // Show the image if screen width is larger than 768px
    }
}

// Initial check
checkScreenSize();

// Add an event listener to handle screen resize
window.addEventListener('resize', checkScreenSize);
