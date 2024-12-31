document.addEventListener('DOMContentLoaded', () => {
    // Create a style element for the CSS
    const style = document.createElement('style');
    style.innerHTML = `
        /* Sliding Theme Menu */
        #themeMenu {
            position: fixed;
            top: 100px; /* Show the menu further down */
            right: -300px; /* Start off-screen */
            width: 250px;
            background-color: #f8f8f8; /* Off-white to match the header */
            border-radius: 8px;
            z-index: 1000;
            transition: right 0.3s ease-in-out;
            padding: 20px;
        }

        /* Make the menu visible */
        #themeMenu.visible {
            right: 10px; /* Slide into view */
        }

        /* Header inside the menu */
        #themeMenu .menu-header {
            display: flex;
            justify-content: space-between;
            align-items: center;
            font-size: 18px;
            font-weight: bold;
            color: #333;
        }

        /* Close button */
        #themeMenu .close-button {
            background: none;
            border: none;
            font-size: 18px;
            cursor: pointer;
            color: #333;
        }

        #themeMenu .close-button:hover {
            color: #000;
        }

        /* Subtitle for the wallpaper color */
        #themeMenu .subtitle {
            margin-top: 20px;
            font-size: 16px;
            font-weight: 600;
            color: #333;
        }

        /* Color picker styling */
        #themeMenu .color-picker-container {
            margin-top: 10px;
        }

        #themeMenu input[type="color"] {
            width: 100%;
            height: 40px;
            border: none;
            border-radius: 4px;
            cursor: pointer;
            background-color: transparent;
        }

        /* Upload button styling */
        #themeMenu .upload-button-container {
            margin-top: 20px;
        }

        #themeMenu input[type="file"] {
            width: 100%;
            height: 40px;
            border: none;
            border-radius: 4px;
            background-color: #ebf5fe; /* Button background color */
            color: #087fe7; /* Text color */
            font-weight: bold;
            cursor: pointer;
        }

        /* Ensure the file input button doesn't show the file name */
        #themeMenu input[type="file"]::-webkit-file-upload-button {
            background-color: #ebf5fe;
            color: #087fe7;
            font-weight: bold;
            height: 40px;
            width: 100%;
            border: none;
            border-radius: 4px;
            cursor: pointer;
        }

        /* Hover effect for the upload button */
        #themeMenu input[type="file"]:hover {
            background-color: #c7e0ff; /* Lighter blue on hover */
        }

        /* Remove button styling for the uploaded image */
        #themeMenu .remove-button {
            background: none;
            border: none;
            font-size: 18px;
            color: #f44336; /* Red color for the 'X' */
            cursor: pointer;
            position: absolute;
            top: 0;
            right: 0;
        }

        #themeMenu .remove-button:hover {
            color: #d32f2f;
        }

        /* Container to hold the image background preview */
        #themeMenu .image-preview-container {
            margin-top: 20px;
            position: relative;
        }

        /* The uploaded image will be displayed here */
        #themeMenu .image-preview {
            width: 100%;
            height: 100px;
            background-size: cover;
            background-position: center;
            border-radius: 4px;
        }

        /* Subtitle for the toolbar section */
        #themeMenu .toolbar-subtitle {
            margin-top: 30px;
            font-size: 16px;
            font-weight: 600;
            color: #333;
        }

        /* Color picker container for the toolbar section */
        #themeMenu .toolbar-color-picker-container {
            margin-top: 10px;
        }

        /* Subtitle for the icons section */
        #themeMenu .icons-subtitle {
            margin-top: 30px;
            font-size: 16px;
            font-weight: 600;
            color: #333;
        }

        /* Color picker container for the icons section */
        #themeMenu .icons-color-picker-container {
            margin-top: 10px;
        }

        /* Presets Section */
        #themeMenu .presets-section {
            margin-top: 40px;
        }

        #themeMenu .presets-section .preset-button {
            width: 90%;
            padding: 10px;
            background-color: #ebf5fe;
            color: #087fe7;
            border: none;
            border-radius: 4px;
            margin-bottom: 10px;
            cursor: pointer;
            font-weight: bold;
        }

        #themeMenu .preset-button:hover {
            background-color: #c7e0ff;
        }

        #themeMenu .preset-button:focus {
            outline: none;
        }
    `;
    document.head.appendChild(style);

    // Create the sliding menu
    const themeMenu = document.createElement('div');
    themeMenu.id = 'themeMenu';
    themeMenu.innerHTML = `
        <div class="menu-header">
            <span>Themes</span>
            <button id="closeThemeMenu" class="close-button">&times;</button>
        </div>
        <div class="subtitle">Wallpaper</div>
        <div class="color-picker-container">
            <input type="color" id="backgroundColorPicker" value="#f8f8f8">
        </div>
        <div class="upload-button-container">
            <input type="file" id="backgroundUpload" accept="image/*" />
        </div>
        <div class="image-preview-container" id="imagePreviewContainer" style="display:none;">
            <button class="remove-button" id="removeImageButton">&times;</button>
            <div id="imagePreview" class="image-preview"></div>
        </div>
        <div class="toolbar-subtitle">Toolbar</div>
        <div class="toolbar-color-picker-container">
            <input type="color" id="headerColorPicker" value="#f8f8f8">
        </div>
        <div class="icons-subtitle">Icons</div>
        <div class="icons-color-picker-container">
            <input type="color" id="iconsColorPicker" value="#333333">
        </div>
        <div class="presets-section">
            <div class="preset-button" id="defaultPreset">Default</div>
            <div class="preset-button" id="darkModePreset">Dark Mode</div>
            <div class="preset-button" id="skyPreset">Sky Theme</div>
            <div class="preset-button" id="oceanPreset">Ocean Theme</div>
            <div class="preset-button" id="forestPreset">Forest Theme</div>
            <div class="preset-button" id="sunsetPreset">Sunset Theme</div>
        </div>
    `;
    document.body.appendChild(themeMenu);

    // Show the menu when the brush button is clicked
    const brushButton = document.getElementById('brushButton');
    brushButton.addEventListener('click', () => {
        themeMenu.classList.add('visible');
    });

    // Hide the menu when the close button is clicked
    const closeThemeMenu = document.getElementById('closeThemeMenu');
    closeThemeMenu.addEventListener('click', () => {
        themeMenu.classList.remove('visible');
    });

    // Change the background color when the user selects a new color for the wallpaper
    const backgroundColorPicker = document.getElementById('backgroundColorPicker');
    backgroundColorPicker.addEventListener('input', (event) => {
        document.body.style.backgroundColor = event.target.value;
        // Hide the image preview when a new color is selected
        document.getElementById('imagePreviewContainer').style.display = 'none';
    });

    // Change the background image when the user uploads a new image
    const backgroundUpload = document.getElementById('backgroundUpload');
    backgroundUpload.addEventListener('change', (event) => {
        const file = event.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = function(e) {
                // Set the uploaded image as the background
                document.body.style.backgroundImage = `url(${e.target.result})`;
                document.body.style.backgroundSize = 'cover';
                document.body.style.backgroundPosition = 'center';

                // Display the image preview and the remove button
                const imagePreviewContainer = document.getElementById('imagePreviewContainer');
                const imagePreview = document.getElementById('imagePreview');
                imagePreview.style.backgroundImage = `url(${e.target.result})`;
                imagePreviewContainer.style.display = 'block';
            };
            reader.readAsDataURL(file);
        }
    });

    // Remove the background image when the remove button is clicked
    const removeImageButton = document.getElementById('removeImageButton');
    removeImageButton.addEventListener('click', () => {
        document.body.style.backgroundImage = '';
        document.body.style.backgroundColor = '#f8f8f8'; // Reset background color
        document.getElementById('imagePreviewContainer').style.display = 'none'; // Hide the preview
    });

    // Change the header color when the user selects a new color for the header
    const headerColorPicker = document.getElementById('headerColorPicker');
    headerColorPicker.addEventListener('input', (event) => {
        const header = document.getElementById('header');
        header.style.backgroundColor = event.target.value;
    });

    // Change the icon color when the user selects a new color for the icons
    const iconsColorPicker = document.getElementById('iconsColorPicker');
    iconsColorPicker.addEventListener('input', (event) => {
        const iconButtons = document.querySelectorAll('.icon-button');
        iconButtons.forEach(button => {
            button.style.color = event.target.value;
        });
    });

    // Default Preset
    document.getElementById('defaultPreset').addEventListener('click', () => {
        // Reset to default settings
        document.body.style.backgroundColor = '#ffffff';
        document.body.style.backgroundImage = '';
        document.getElementById('imagePreviewContainer').style.display = 'none';
        document.getElementById('header').style.backgroundColor = '#f0f0f0';
        document.querySelectorAll('.icon-button').forEach(button => {
            button.style.color = '#333';
        });
        backgroundColorPicker.value = '#ffffff';
        headerColorPicker.value = '#f0f0f0';
        iconsColorPicker.value = '#333333';
    });

    // Dark Mode Preset
    document.getElementById('darkModePreset').addEventListener('click', () => {
        // Set to dark mode settings
        document.body.style.backgroundColor = '#333333';
        document.body.style.backgroundImage = '';
        document.getElementById('imagePreviewContainer').style.display = 'none';
        document.getElementById('header').style.backgroundColor = '#222222';
        document.querySelectorAll('.icon-button').forEach(button => {
            button.style.color = '#ffffff';
        });
        backgroundColorPicker.value = '#333333';
        headerColorPicker.value = '#222222';
        iconsColorPicker.value = '#ffffff';
    });

    // Sky Theme Preset
    document.getElementById('skyPreset').addEventListener('click', () => {
        // Set to Sky theme settings
        document.body.style.backgroundColor = '#87ceeb'; // Light Sky Blue background
        document.body.style.backgroundImage = '';
        document.getElementById('imagePreviewContainer').style.display = 'none';
        document.getElementById('header').style.backgroundColor = '#add8e6'; // Light Blue header
        document.querySelectorAll('.icon-button').forEach(button => {
            button.style.color = '#ffffff'; // White icons for contrast
        });
        backgroundColorPicker.value = '#87ceeb'; // Sky Blue color for background
        headerColorPicker.value = '#add8e6'; // Light Blue for header
        iconsColorPicker.value = '#ffffff'; // White for icons
    });

    // Ocean Theme Preset
    document.getElementById('oceanPreset').addEventListener('click', () => {
        // Set to Ocean theme settings
        document.body.style.backgroundColor = '#1e3d58'; // Solid Ocean Blue background
        document.getElementById('header').style.backgroundColor = '#002f47'; // Dark Ocean Blue header
        document.querySelectorAll('.icon-button').forEach(button => {
            button.style.color = '#b3e0f7'; // Light Blue icons for contrast
        });
        backgroundColorPicker.value = '#1e3d58'; // Ocean Blue
        headerColorPicker.value = '#002f47'; // Dark Blue header
        iconsColorPicker.value = '#b3e0f7'; // Light Blue icons
    });

    // Forest Theme Preset
    document.getElementById('forestPreset').addEventListener('click', () => {
        // Set to Forest theme settings
        document.body.style.backgroundColor = '#2c6e49'; // Solid Forest Green background
        document.getElementById('header').style.backgroundColor = '#1b3b24'; // Dark Green header
        document.querySelectorAll('.icon-button').forEach(button => {
            button.style.color = '#ffeb91'; // Creamy Yellow icons for a natural feel
        });
        backgroundColorPicker.value = '#2c6e49'; // Forest Green
        headerColorPicker.value = '#1b3b24'; // Dark Green header
        iconsColorPicker.value = '#ffeb91'; // Creamy Yellow icons
    });

    // Sunset Theme Preset
    document.getElementById('sunsetPreset').addEventListener('click', () => {
        // Set to Sunset theme settings
        document.body.style.backgroundColor = '#ff7f50'; // Solid Coral background for the sunset
        document.getElementById('header').style.backgroundColor = '#8b0000'; // Deep Red header
        document.querySelectorAll('.icon-button').forEach(button => {
            button.style.color = '#ffff99'; // Light Yellow icons for a warm look
        });
        backgroundColorPicker.value = '#ff7f50'; // Sunset Orange
        headerColorPicker.value = '#8b0000'; // Deep Red header
        iconsColorPicker.value = '#ffff99'; // Light Yellow icons
    });

    // Placeholder buttons (TBD)
    document.querySelectorAll('.preset-button[id^="tbd"]').forEach(button => {
        button.addEventListener('click', () => {
            alert('This preset is TBD.');
        });
    });
});
