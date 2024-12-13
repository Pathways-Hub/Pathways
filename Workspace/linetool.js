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

    document.getElementById("lineToolButton").addEventListener("click", () => {
        currentLine = { points: [], near: false, selected: false };
        lines.push(currentLine);
        draggingPoint = null;
        draggingLine = null;
        selectedLine = null;
        canvas.addEventListener("mousedown", handleMouseDown);
        canvas.addEventListener("mousemove", handleMouseMove);
        canvas.addEventListener("mouseup", handleMouseUp);
    });

    document.getElementById("binButton").addEventListener("click", () => {
        if (selectedLine) {
            // Remove the selected line from the lines array
            lines = lines.filter(line => line !== selectedLine);
            selectedLine = null; // Clear the selection
            drawScene();
        }
    });

    function handleMouseDown(e) {
        const { x, y } = getMousePos(e);

        for (let line of lines) {
            if (line.points.length === 2) {
                // Check if clicked on an endpoint
                for (let i = 0; i < line.points.length; i++) {
                    if (isInsideCircle(x, y, line.points[i])) {
                        draggingPoint = { line, pointIndex: i };
                        return;
                    }
                }

                // Check if clicked on the midpoint rectangle
                const midPoint = getMidPoint(line.points[0], line.points[1]);
                if (isInsideRect(x, y, midPoint)) {
                    draggingLine = line;
                    selectedLine = line; // Mark the line as selected
                    line.selected = true; // Set the selected flag to true
                    drawScene();
                    return;
                }
            }
        }

        // Start a new line if none is being interacted with
        if (currentLine && currentLine.points.length < 2) {
            currentLine.points.push({ x, y });
            if (currentLine.points.length === 2) {
                currentLine = null; // Reset current line once two points are set
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

            // Draw the line
            ctx.beginPath();
            ctx.moveTo(line.points[0].x, line.points[0].y);
            ctx.lineTo(line.points[1].x, line.points[1].y);
            ctx.strokeStyle = line.selected ? "red" : "black"; // Highlight the selected line in red
            ctx.lineWidth = 2;
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
