document.addEventListener('DOMContentLoaded', () => {
    const fontDropdown = document.getElementById('font-dropdown');
    const documentArea = document.querySelector('.document-area');
    const fontUploadBtn = document.getElementById('font-upload-btn');

    // List of diverse fonts
    const fonts = [
        { name: 'Arial', url: '' },
        { name: 'Courier New', url: '' },
        { name: 'Georgia', url: '' },
        { name: 'Comic Sans MS', url: '' },
        { name: 'Impact', url: '' },
        { name: 'Lobster', url: 'https://fonts.googleapis.com/css2?family=Lobster&display=swap' },
        { name: 'Pacifico', url: 'https://fonts.googleapis.com/css2?family=Pacifico&display=swap' },
        { name: 'Indie Flower', url: 'https://fonts.googleapis.com/css2?family=Indie+Flower&display=swap' },
        { name: 'Montserrat', url: 'https://fonts.googleapis.com/css2?family=Montserrat:wght@400&display=swap' },
        { name: 'Playfair Display', url: 'https://fonts.googleapis.com/css2?family=Playfair+Display&display=swap' },
        { name: 'Dancing Script', url: 'https://fonts.googleapis.com/css2?family=Dancing+Script&display=swap' },
        { name: 'Oswald', url: 'https://fonts.googleapis.com/css2?family=Oswald&display=swap' },
        { name: 'Raleway', url: 'https://fonts.googleapis.com/css2?family=Raleway&display=swap' },
        { name: 'Fira Sans', url: 'https://fonts.googleapis.com/css2?family=Fira+Sans&display=swap' },
        { name: 'Nunito', url: 'https://fonts.googleapis.com/css2?family=Nunito&display=swap' }
    ];

    // Function to dynamically add fonts to the dropdown and load the font's style
    function populateFontDropdown() {
        fonts.forEach(font => {
            if (font.url) {
                const link = document.createElement('link');
                link.href = font.url;
                link.rel = 'stylesheet';
                document.head.appendChild(link);
            }

            const option = document.createElement('option');
            option.value = font.name;
            option.textContent = font.name;
            option.style.fontFamily = font.name;
            option.style.fontSize = '14px'; // Adjust font size for better visibility
            fontDropdown.appendChild(option);
        });
    }

    // Function to apply selected font to the highlighted text
    function applyFontToSelection(font) {
        const selection = window.getSelection();
        if (!selection.rangeCount) return;

        const range = selection.getRangeAt(0);
        const selectedText = range.toString();
        const span = document.createElement('span');
        span.style.fontFamily = font;
        span.textContent = selectedText;

        range.deleteContents();
        range.insertNode(span);
    }

    // Function to handle font upload
    function handleFontUpload() {
        const fileInput = document.createElement('input');
        fileInput.type = 'file';
        fileInput.accept = '.ttf,.otf';
        
        fileInput.addEventListener('change', (event) => {
            const file = event.target.files[0];
            if (file) {
                const reader = new FileReader();
                reader.onload = function(e) {
                    const fontFace = new FontFace('CustomFont', e.target.result);
                    fontFace.load().then(function(loadedFontFace) {
                        document.fonts.add(loadedFontFace);

                        // Add uploaded font to the dropdown
                        const fontName = 'CustomFont';
                        fonts.push({ name: fontName, url: '' });
                        const option = document.createElement('option');
                        option.value = fontName;
                        option.textContent = fontName;
                        option.style.fontFamily = fontName;
                        option.style.fontSize = '14px';
                        fontDropdown.appendChild(option);

                        // Apply the uploaded font
                        documentArea.style.fontFamily = `${fontName}, Arial, sans-serif`;
                    });
                };
                reader.readAsArrayBuffer(file);
            }
        });

        fileInput.click(); // Trigger file input dialog
    }

    // Event listener for font dropdown change
    fontDropdown.addEventListener('change', (e) => {
        const selectedFont = e.target.value;
        if (selectedFont === 'default') return; // Do nothing if "default" is selected

        applyFontToSelection(selectedFont);
    });

    // Event listener for font upload button
    fontUploadBtn.addEventListener('click', handleFontUpload);

    // Initialize font dropdown and set default font
    populateFontDropdown();
    documentArea.style.fontFamily = 'Arial, sans-serif';
});
