document.addEventListener('DOMContentLoaded', () => {
    const documentArea = document.querySelector('.document-area');
    const boldButton = document.getElementById('bold-btn');
    const italicButton = document.getElementById('italic-btn');
    const underlineButton = document.getElementById('underline-btn');
    const wordCountDisplay = document.getElementById('word-count');
    const addPageButton = document.getElementById('add-page');

    // Improved word count function (similar to Google Docs logic)
    function updateWordCount() {
        let text = documentArea.innerHTML;
        
        // Replace <br> with a space to preserve word boundaries from line breaks
        text = text.replace(/<br\s*\/?>/gi, ' ');

        // Strip all other HTML tags and count only actual text content
        text = text.replace(/<\/?[^>]+(>|$)/g, '');

        // Handle special non-visible characters and ensure they are not counted
        text = text.replace(/&nbsp;/g, ' ');  // Non-breaking space to normal space
        text = text.replace(/\u200B/g, '');   // Remove zero-width space
        
        // Split words by space or newlines and remove empty strings
        const words = text.trim().split(/\s+/).filter(word => word.length > 0);

        wordCountDisplay.textContent = `Words: ${words.length}`;
    }

    function toggleBold() {
        document.execCommand('bold');
        updateBoldButtonState();
    }

    function toggleItalic() {
        document.execCommand('italic');
        updateItalicButtonState();
    }

    function toggleUnderline() {
        document.execCommand('underline');
        updateUnderlineButtonState();
    }

    function updateBoldButtonState() {
        const isBold = document.queryCommandState('bold');
        boldButton.classList.toggle('active', isBold);
    }

    function updateItalicButtonState() {
        const isItalic = document.queryCommandState('italic');
        italicButton.classList.toggle('active', isItalic);
    }

    function updateUnderlineButtonState() {
        const isUnderline = document.queryCommandState('underline');
        underlineButton.classList.toggle('active', isUnderline);
    }

    function handleKeyDown(e) {
        if (e.altKey && e.key === 'b') {
            e.preventDefault();
            toggleBold();
        }
        if (e.altKey && e.key === 'i') {
            e.preventDefault();
            toggleItalic();
        }
        if (e.altKey && e.key === 'u') {
            e.preventDefault();
            toggleUnderline();
        }
    }

    function handleInput() {
        updateWordCount();
    }

    function addPage() {
        const pageNumber = document.querySelectorAll('.document-editor').length + 1;
        const newPage = document.createElement('div');
        newPage.className = 'document-editor';
        newPage.innerHTML = `
            <div class="document-area" contenteditable="true"></div>
            <div class="page-number">Page ${pageNumber}</div>
        `;
        document.querySelector('.pages-container').appendChild(newPage);
        updateWordCount();
    }

    boldButton.addEventListener('click', () => {
        toggleBold();
    });

    italicButton.addEventListener('click', () => {
        toggleItalic();
    });

    underlineButton.addEventListener('click', () => {
        toggleUnderline();
    });

    addPageButton.addEventListener('click', () => {
        addPage();
    });

    document.addEventListener('selectionchange', () => {
        updateBoldButtonState();
        updateItalicButtonState();
        updateUnderlineButtonState();
    });

    documentArea.addEventListener('input', handleInput);
    documentArea.addEventListener('keydown', handleKeyDown);

    // Initial word count update
    updateWordCount();
});
