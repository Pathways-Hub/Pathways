document.addEventListener('DOMContentLoaded', () => {
    const numberedLinesButton = document.getElementById('numbered-lines-btn');
    const bulletPointsButton = document.getElementById('bullet-points-btn');
    const documentArea = document.querySelector('.document-area');

    // Function to toggle numbered lines (ordered list)
    function toggleNumberedLines() {
        const selection = window.getSelection();
        if (!selection.rangeCount) return;

        const range = selection.getRangeAt(0);
        const selectedText = range.toString();

        // If no text is selected, return
        if (!selectedText.trim()) return;

        const list = document.createElement('ol');
        list.style.marginLeft = '20px';

        selectedText.split('\n').forEach(line => {
            const listItem = document.createElement('li');
            listItem.textContent = line;
            list.appendChild(listItem);
        });

        range.deleteContents();
        range.insertNode(list);
        selection.removeAllRanges();
    }

    // Function to toggle bullet points (unordered list)
    function toggleBulletPoints() {
        const selection = window.getSelection();
        if (!selection.rangeCount) return;

        const range = selection.getRangeAt(0);
        const selectedText = range.toString();

        // If no text is selected, return
        if (!selectedText.trim()) return;

        const list = document.createElement('ul');
        list.style.marginLeft = '20px';

        selectedText.split('\n').forEach(line => {
            const listItem = document.createElement('li');
            listItem.textContent = line;
            list.appendChild(listItem);
        });

        range.deleteContents();
        range.insertNode(list);
        selection.removeAllRanges();
    }

    numberedLinesButton.addEventListener('click', toggleNumberedLines);
    bulletPointsButton.addEventListener('click', toggleBulletPoints);
});
