document.addEventListener('DOMContentLoaded', () => {
    const documentArea = document.querySelector('.document-area');
    const boldButton = document.getElementById('bold-btn');
    const italicButton = document.getElementById('italic-btn');
    const underlineButton = document.getElementById('underline-btn');
    const wordCountDisplay = document.getElementById('word-count');
    const addPageButton = document.getElementById('add-page');

    function updateWordCount() {
        const text = documentArea.textContent || '';
        const words = text.trim().split(/\s+/).filter(word => word.length > 0).length;
        wordCountDisplay.textContent = `Words: ${words}`;
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

    function handleInput(e) {
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
