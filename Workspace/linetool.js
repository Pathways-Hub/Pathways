document.addEventListener("DOMContentLoaded", () => {
    const canvas = document.createElement("canvas");
    const ctx = canvas.getContext("2d");
    document.body.appendChild(canvas);
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    const circleRadius = 6;
    const rectSize = 12;
    const proximityThreshold = 8;

    let lines = []; // Stores all the lines
    let currentLine = null; // The line being drawn
    let draggingPoint = null;
    let draggingLine = null;
    let selectedLine = null; // The line currently selected for deletion

    // Colors for the color tool
    const colors = ["black", "red", "blue", "green", "orange", "purple"];
    let currentColorIndex = 0; // Start with the first color

    // Create the information popup
    const infoPopup = document.createElement("div");
    infoPopup.style.position = "fixed";
    infoPopup.style.bottom = "20px";
    infoPopup.style.left = "50%";
    infoPopup.style.transform = "translateX(-50%)";
    infoPopup.style.backgroundColor = "grey";
    infoPopup.style.color = "white";
    infoPopup.style.padding = "10px 20px";
    infoPopup.style.borderRadius = "5px";
    infoPopup.style.fontFamily = "Arial, sans-serif";
    infoPopup.style.fontSize = "14px";
    infoPopup.style.textAlign = "center";
    infoPopup.style.display = "none"; // Initially hidden
    infoPopup.innerHTML = `
        <strong>Information</strong><br>
        Please select two points to create your line.
    `;
    document.body.appendChild(infoPopup);

    function showInfoPopup() {
        infoPopup.style.display = "block";
    }

    function hideInfoPopup() {
        infoPopup.style.display = "none";
    }

    document.getElementById("lineToolButton").addEventListener("click", () => {
        currentLine = { points: [], near: false, selected: false, color: colors[currentColorIndex] };
        lines.push(currentLine);
        draggingPoint = null;
        draggingLine = null;
        selectedLine = null;
        canvas.addEventListener("mousedown", handleMouseDown);
        canvas.addEventListener("mousemove", handleMouseMove);
        canvas.addEventListener("mouseup", handleMouseUp);

        // Show the information popup
        showInfoPopup();
    });

    document.getElementById("binButton").addEventListener("click", () => {
        if (selectedLine) {
            // Remove the selected line from the lines array
            lines = lines.filter(line => line !== selectedLine);
            selectedLine = null; // Clear the selection
            drawScene();
        }
    });

    document.getElementById("paintBucketButton").addEventListener("click", () => {
        // Cycle through the colors
        currentColorIndex = (currentColorIndex + 1) % colors.length;

        if (selectedLine) {
            // Apply the current color to the selected line
            selectedLine.color = colors[currentColorIndex];
        }

        drawScene();
    });

    function handleMouseDown(e) {
        const { x, y } = getMousePos(e);

        // Reset selection unless clicking a line
        let clickedLine = false;

        for (let line of lines) {
            if (line.points.length === 2) {
                // Check if clicked on an endpoint
                for (let i = 0; i < line.points.length; i++) {
                    if (isInsideCircle(x, y, line.points[i])) {
                        draggingPoint = { line, pointIndex: i };
                        line.selected = true; // Select the line
                        selectedLine = line;
                        clickedLine = true;
                        drawScene();
                        return;
                    }
                }

                // Check if clicked on the midpoint rectangle
                const midPoint = getMidPoint(line.points[0], line.points[1]);
                if (isInsideRect(x, y, midPoint)) {
                    draggingLine = line;
                    line.selected = true; // Select the line
                    selectedLine = line;
                    clickedLine = true;
                    drawScene();
                    return;
                }
            }
        }

        // If no line was clicked, clear selection
        if (!clickedLine) {
            clearSelection();
            drawScene();
        }

        // Start a new line if none is being interacted with
        if (currentLine && currentLine.points.length < 2) {
            currentLine.points.push({ x, y });

            // Hide the popup if the line is complete
            if (currentLine.points.length === 2) {
                currentLine = null; // Reset current line once two points are set
                hideInfoPopup();
            }
        }
    }

    function handleMouseMove(e) {
        const { x, y } = getMousePos(e);

        if (draggingPoint) {
            // Move the dragged endpoint
            draggingPoint.line.points[draggingPoint.pointIndex] = { x, y };
        } else if (draggingLine) {
            // Move the whole line
            const dx = x - getMidPoint(draggingLine.points[0], draggingLine.points[1]).x;
            const dy = y - getMidPoint(draggingLine.points[0], draggingLine.points[1]).y;

            draggingLine.points[0].x += dx;
            draggingLine.points[0].y += dy;
            draggingLine.points[1].x += dx;
            draggingLine.points[1].y += dy;
        } else {
            // Check proximity to lines
            for (let line of lines) {
                if (line.points.length === 2) {
                    line.near = isNearLine(x, y, line.points[0], line.points[1]);
                }
            }
        }

        drawScene();
    }

    function handleMouseUp() {
        draggingPoint = null;
        draggingLine = null;
    }

    function drawScene() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);

        for (let line of lines) {
            if (line.points.length < 2) continue;

            const midPoint = getMidPoint(line.points[0], line.points[1]);

            // Draw the red border for selected lines
            if (line.selected) {
                ctx.beginPath();
                ctx.moveTo(line.points[0].x, line.points[0].y);
                ctx.lineTo(line.points[1].x, line.points[1].y);
                ctx.strokeStyle = "red";
                ctx.lineWidth = 4; // Border width
                ctx.stroke();
            }

            // Draw the main line
            ctx.beginPath();
            ctx.moveTo(line.points[0].x, line.points[0].y);
            ctx.lineTo(line.points[1].x, line.points[1].y);
            ctx.strokeStyle = line.color || "black"; // Use the line's color
            ctx.lineWidth = 2; // Main line width
            ctx.stroke();

            // Draw the points and midpoint only if near the line
            if (line.near || line.selected) {
                for (let point of line.points) {
                    ctx.beginPath();
                    ctx.arc(point.x, point.y, circleRadius, 0, Math.PI * 2);
                    ctx.fillStyle = "blue";
                    ctx.fill();
                }

                ctx.fillStyle = "blue";
                ctx.fillRect(midPoint.x - rectSize / 2, midPoint.y - rectSize / 2, rectSize, rectSize);
            }
        }
    }

    function clearSelection() {
        selectedLine = null;
        for (let line of lines) {
            line.selected = false; // Unselect all lines
        }
    }

    function getMousePos(e) {
        const rect = canvas.getBoundingClientRect();
        return {
            x: e.clientX - rect.left,
            y: e.clientY - rect.top,
        };
    }

    function isInsideCircle(x, y, point) {
        const dx = x - point.x;
        const dy = y - point.y;
        return Math.sqrt(dx * dx + dy * dy) <= circleRadius;
    }

    function isInsideRect(x, y, rectCenter) {
        return (
            x >= rectCenter.x - rectSize / 2 &&
            x <= rectCenter.x + rectSize / 2 &&
            y >= rectCenter.y - rectSize / 2 &&
            y <= rectCenter.y + rectSize / 2
        );
    }

    function getMidPoint(p1, p2) {
        return {
            x: (p1.x + p2.x) / 2,
            y: (p1.y + p2.y) / 2,
        };
    }

    function isNearLine(x, y, p1, p2) {
        // Calculate the distance from the point to the line
        const a = p2.y - p1.y;
        const b = p1.x - p2.x;
        const c = p2.x * p1.y - p1.x * p2.y;

        const distance = Math.abs(a * x + b * y + c) / Math.sqrt(a * a + b * b);
        return distance <= proximityThreshold;
    }
});
