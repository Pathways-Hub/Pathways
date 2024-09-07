// export.js

document.addEventListener('DOMContentLoaded', () => {
    const exportButton = document.getElementById('export');
    const header = document.getElementById('header');
    const titleInput = document.querySelector('.editable-title'); // Get the workspace title input

    exportButton.addEventListener('click', () => {
        // Hide the header temporarily
        header.style.display = 'none';

        // Retrieve the workspace title or use a default if empty
        const workspaceTitle = titleInput.value.trim() || 'Untitled_Workspace';

        // Capture the screenshot of the workspace excluding the header
        html2canvas(document.body, {
            ignoreElements: element => element === header // Ignore the header
        }).then(canvas => {
            // Create a download link and trigger it to save the image
            const link = document.createElement('a');
            link.href = canvas.toDataURL('image/png'); // Convert canvas to PNG data URL
            link.download = `${workspaceTitle}.png`; // Name of the downloaded file using the workspace title
            link.click(); // Simulate a click on the link to trigger the download

            // Show the header again after the screenshot is taken
            header.style.display = '';
        });
    });
});
