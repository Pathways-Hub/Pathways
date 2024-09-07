// documents/align.js

document.addEventListener('DOMContentLoaded', () => {
    const documentArea = document.querySelector('.document-area');
    const alignLeftButton = document.getElementById('align-left-btn');
    const alignCenterButton = document.getElementById('align-center-btn');
    const alignRightButton = document.getElementById('align-right-btn');

    function alignText(alignType) {
        document.execCommand('justify' + alignType);
    }

    alignLeftButton.addEventListener('click', () => {
        alignText('Left');
    });

    alignCenterButton.addEventListener('click', () => {
        alignText('Center');
    });

    alignRightButton.addEventListener('click', () => {
        alignText('Right');
    });
});
