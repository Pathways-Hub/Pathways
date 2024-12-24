document.addEventListener("DOMContentLoaded", () => {
    const device = document.getElementById("device");
    const button = document.querySelector(".long-button");

    // Add event listener to the button
    button.addEventListener("click", () => {
        // Create a new editable text element
        const textElement = document.createElement("div");
        textElement.contentEditable = "true";
        textElement.textContent = "Editable Text"; // Placeholder text
        textElement.className = "draggable-text";
        textElement.style.position = "absolute";
        textElement.style.left = "50%";
        textElement.style.top = "50%";
        textElement.style.transform = "translate(-50%, -50%)";
        textElement.style.fontFamily = "Arial, sans-serif";
        textElement.style.fontSize = "16px";
        textElement.style.cursor = "move";
        
        // Prevent text wrapping
        textElement.style.whiteSpace = "nowrap";  // Prevent text from wrapping

        // Style the placeholder text as gray
        textElement.style.color = "gray"; // Placeholder text color
        textElement.setAttribute("data-placeholder", "Editable Text");

        // Append the text to the device
        device.appendChild(textElement);

        makeDraggable(textElement);

        // Listen for changes to handle placeholder text
        textElement.addEventListener("input", handlePlaceholder);
        handlePlaceholder.call(textElement); // Initialize on creation
    });

    // Function to make text draggable
    function makeDraggable(element) {
        let offsetX = 0, offsetY = 0, isDragging = false;

        element.addEventListener("mousedown", (e) => {
            e.stopPropagation(); // Prevent dragging the device
            isDragging = true;

            const rect = element.getBoundingClientRect();
            offsetX = e.clientX - rect.left;
            offsetY = e.clientY - rect.top;

            document.addEventListener("mousemove", moveElement);
            document.addEventListener("mouseup", stopDragging, { once: true });
        });

        function moveElement(e) {
            if (!isDragging) return;

            const newLeft = e.clientX - offsetX;
            const newTop = e.clientY - offsetY;

            // Update the position of the text freely without constraints
            element.style.left = `${newLeft}px`;
            element.style.top = `${newTop}px`;
        }

        function stopDragging() {
            isDragging = false;
            document.removeEventListener("mousemove", moveElement);
        }
    }

    // Handle placeholder text visibility and style
    function handlePlaceholder() {
        const isEmpty = this.textContent.trim() === "";
        if (isEmpty) {
            this.textContent = "Editable Text";  // Placeholder text
            this.style.color = "gray"; // Placeholder gray color
        } else {
            this.style.color = "black"; // User's input color
        }
    }
});
