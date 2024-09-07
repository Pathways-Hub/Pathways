// Create a new img element
const evoImage = document.createElement('img');
evoImage.src = 'images/evo.png';  // Image source
evoImage.alt = 'Evo Image'; // Alt text for accessibility

// Set the image styles to fix its position, size, and offset
evoImage.style.position = 'fixed';
evoImage.style.bottom = '10px';  // Move 10px from the bottom
evoImage.style.left = '20px';    // Move 10px from the left
evoImage.style.zIndex = '9999';  // Ensure it's on top of other elements
evoImage.style.width = '260px';  // Set the width
evoImage.style.height = 'auto';  // Maintain aspect ratio

// Append the image to the body
document.body.appendChild(evoImage);
