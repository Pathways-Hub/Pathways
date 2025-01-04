// Create the tooltip square element
const square = document.createElement('div');
square.style.position = 'absolute';
square.style.padding = '10px'; // Size of the square
square.style.backgroundColor = 'black';
square.style.color = 'white';
square.style.fontSize = '14px'; // Font size for the text inside the box
square.style.borderRadius = '10px'; // Round the corners of the square
square.style.pointerEvents = 'none'; // Prevent interaction with the square itself
square.style.whiteSpace = 'nowrap'; // Ensure the text doesn't wrap
square.style.display = 'none'; // Initially hide the square
square.style.zIndex = '100'; // Ensure it appears above other content
square.style.textAlign = 'left'; // Align the text to the left
square.style.width = '200px'; // Fixed width for the tooltip square
square.style.maxWidth = '200px'; // Prevent square from expanding too much
square.style.paddingLeft = '10px'; // Add some space from the left side
document.body.appendChild(square);

// Mapping of button IDs to tooltips (image and description)
const buttonDescriptions = {
    'paintBucketButton': { image: 'tools/1colour.png', description: 'Colour Tool' },
    'binButton': { image: 'tools/2delete.png', description: 'Delete' },
    'lineToolButton': { image: 'tools/3line.png', description: 'Line Tool' },
    'squareToolButton': { image: 'tools/4square.png', description: 'Square Tool' },
    'photoImportButton': { image: 'tools/5web.png', description: 'Web Photo Import' },
    'photoButton': { image: 'tools/6image.png', description: 'Photo Import' },
    'pencilButton': { image: 'tools/7pen.png', description: 'Pencil Tool' },
    'eraserButton': { image: 'tools/8rubber.png', description: 'Rubber Tool' },
    'musicButton': { image: 'tools/9audio.png', description: 'Music Import' },
    'cameraButton': { image: 'tools/10video.png', description: 'Web Video Import' },
    'tableButton': { image: 'tools/11table.png', description: 'Table' },
    'stickynote': { image: 'tools/12stick.png', description: 'Sticky Notes' },
    'progress': { image: 'tools/13pro.png', description: 'Progress' },
};

// Function to track mouse movement and update square position
document.addEventListener('mousemove', (event) => {
    square.style.left = `${event.pageX - square.offsetWidth / 2}px`; // Center the square at the mouse position
    square.style.top = `${event.pageY + 30}px`; // Position 30px below the mouse
});

// Add hover effect to each icon button
const iconButtons = document.querySelectorAll('.icon-button');

iconButtons.forEach(button => {
    const buttonId = button.id;
    
    // Only proceed if there is a description for this button
    if (buttonDescriptions[buttonId]) {
        const { image, description } = buttonDescriptions[buttonId];

        // Set up hover effect for each icon button
        button.addEventListener('mouseenter', (e) => {
            // Clear any previous content in the square
            square.innerHTML = ''; 

            // Set up the image and description
            const imgElement = document.createElement('img');
            imgElement.src = image;
            imgElement.style.width = '100%'; // Make the image take up the full width
            imgElement.style.borderRadius = '5px 5px 0 0'; // Rounded top corners for the image

            const descriptionElement = document.createElement('span');
            descriptionElement.textContent = description;
            descriptionElement.style.marginTop = '5px'; // Add space between image and description
            descriptionElement.style.display = 'block'; // Ensure it appears below the image
            
            // Append both the image and description to the square
            square.appendChild(imgElement);
            square.appendChild(descriptionElement);

            // Display the square
            square.style.display = 'block';
        });

        // Hide the tooltip square when the mouse leaves the button
        button.addEventListener('mouseleave', () => {
            square.style.display = 'none';
        });
    }
});
