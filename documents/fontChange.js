document.addEventListener('DOMContentLoaded', () => {
    const fontDropdown = document.getElementById('font-dropdown');
    const documentArea = document.querySelector('.document-area');
    const fontUploadBtn = document.getElementById('font-upload-btn');

    // List of web fonts
    const fonts = [
        'Arial', 'Courier New', 'Georgia', 'Times New Roman', 'Verdana',
        'Roboto', 'Open Sans', 'Lobster', 'Montserrat', 'Lora',
        'Oswald', 'Raleway', 'Poppins', 'Merriweather', 'Dancing Script',
        'Playfair Display', 'Quicksand', 'Nunito', 'PT Serif', 'Source Sans Pro',
        'Fira Sans', 'Ubuntu', 'Impact', 'Comic Sans MS'
    ];

    // Function to dynamically add fonts to the dropdown
    function populateFontDropdown() {
        fonts.forEach(font => {
            const option = document.createElement('option');
            option.value = font;
            option.textContent = font;
            option.style.fontFamily = font;
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
                        fonts.push(fontName);
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
