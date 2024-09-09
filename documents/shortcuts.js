document.addEventListener('DOMContentLoaded', () => {
    const documentArea = document.querySelector('.document-area');
    const boldButton = document.getElementById('bold-btn');
    const italicButton = document.getElementById('italic-btn');
    const underlineButton = document.getElementById('underline-btn');

    // Toggle bold on the selected text and update the button's state
    function toggleBold() {
        document.execCommand('bold');
        updateBoldButtonState();
    }

    // Toggle italics on the selected text and update the button's state
    function toggleItalic() {
        document.execCommand('italic');
        updateItalicButtonState();
    }

    // Toggle underline on the selected text and update the button's state
    function toggleUnderline() {
        document.execCommand('underline');
        updateUnderlineButtonState();
    }

    // Update the button's active state based on current formatting
    function updateBoldButtonState() {
        const isBold = document.queryCommandState('bold');
        if (isBold) {
            boldButton.classList.add('active');
        } else {
            boldButton.classList.remove('active');
        }
    }

    function updateItalicButtonState() {
        const isItalic = document.queryCommandState('italic');
        if (isItalic) {
            italicButton.classList.add('active');
        } else {
            italicButton.classList.remove('active');
        }
    }

    function updateUnderlineButtonState() {
        const isUnderline = document.queryCommandState('underline');
        if (isUnderline) {
            underlineButton.classList.add('active');
        } else {
            underlineButton.classList.remove('active');
        }
    }

    // Event listener for keyboard shortcuts (Ctrl+B, Ctrl+I, Ctrl+U)
    documentArea.addEventListener('keydown', (e) => {
        // Check if Ctrl + B is pressed for bold
        if (e.ctrlKey && e.key === 'b') {
            e.preventDefault(); // Prevent default action
            toggleBold(); // Toggle bold on selected text
        }
        // Check if Ctrl + I is pressed for italics
        if (e.ctrlKey && e.key === 'i') {
            e.preventDefault(); // Prevent default action
            toggleItalic(); // Toggle italics on selected text
        }
        // Check if Ctrl + U is pressed for underline
        if (e.ctrlKey && e.key === 'u') {
            e.preventDefault(); // Prevent default action
            toggleUnderline(); // Toggle underline on selected text
        }
    });
