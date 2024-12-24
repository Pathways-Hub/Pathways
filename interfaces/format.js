document.addEventListener("DOMContentLoaded", () => {
    // Add event listeners for the keyboard shortcuts
    document.addEventListener("keydown", (e) => {
        // Ensure the target is editable and only respond when a valid key combination is pressed
        if (document.activeElement.contentEditable === "true") {
            if (e.ctrlKey || e.metaKey) {
                switch (e.key) {
                    case "b":
                        e.preventDefault(); // Prevent the default behavior (e.g., opening bookmarks)
                        toggleBold();
                        break;
                    case "u":
                        e.preventDefault();
                        toggleUnderline();
                        break;
                    case "i":
                        e.preventDefault();
                        toggleItalic();
                        break;
                }
            }
        }
    });

    // Function to toggle bold
    function toggleBold() {
        document.execCommand("bold", false, null);
    }

    // Function to toggle underline
    function toggleUnderline() {
        document.execCommand("underline", false, null);
    }

    // Function to toggle italic
    function toggleItalic() {
        document.execCommand("italic", false, null);
    }
});
