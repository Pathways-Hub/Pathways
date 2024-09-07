// linetool.js

document.addEventListener('DOMContentLoaded', () => {
    let isLineToolActive = false;
    let startX = 0;
    let startY = 0;
    let selectedLine = null;

    // Function to draw a line between two points
    function drawLine(x1, y1, x2, y2) {
        const length = Math.sqrt((x2 - x1) ** 2 + (y2 - y1) ** 2);
        const angle = Math.atan2(y2 - y1, x2 - x1) * 180 / Math.PI;

        const line = document.createElement('div');
        line.className = 'line'; // Use the line class
        line.style.position = 'absolute';
        line.style.backgroundColor = 'black';
        line.style.width = `${length}px`;
        line.style.height = '2px';
        line.style.transformOrigin = '0 0';
        line.style.transform = `rotate(${angle}deg)`;
        line.style.left = `${x1}px`;
        line.style.top = `${y1}px`;

        line.addEventListener('click', () => {
            if (selectedLine) {
                selectedLine.style.backgroundColor = 'black'; // Reset previous selection
            }
            line.style.backgroundColor = 'grey'; // Highlight the selected line
            selectedLine = line;
        });

        document.body.appendChild(line);
    }

    document.getElementById('lineToolButton').addEventListener('click', () => {
        isLineToolActive = !isLineToolActive;
        document.body.style.cursor = isLineToolActive ? 'crosshair' : 'default';
    });

    document.addEventListener('click', (event) => {
        if (isLineToolActive) {
            const header = document.getElementById('header');
            if (header && header.contains(event.target)) {
                return;
            }

            const viewportX = event.clientX + window.scrollX;
            const viewportY = event.clientY + window.scrollY;

            if (startX === 0 && startY === 0) {
                startX = viewportX;
                startY = viewportY;
            } else {
                const endX = viewportX;
                const endY = viewportY;
                drawLine(startX, startY, endX, endY);
                startX = 0;
                startY = 0;
                document.body.style.cursor = 'default';
                isLineToolActive = false;
            }
        }
    });
});
