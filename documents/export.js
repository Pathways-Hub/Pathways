document.addEventListener('DOMContentLoaded', () => {
    const exportButton = document.getElementById('export-btn');

    exportButton.addEventListener('click', () => {
        exportPageAsPDF();
    });

    function exportPageAsPDF() {
        const pageTitle = document.title; // Get the page title
        const element = document.querySelector('.document-container'); // Change this selector if needed

        // Use html2pdf.js library to convert the content to PDF
        html2pdf()
            .from(element)
            .set({
                margin: 10, // Set margin for the PDF
                filename: `${pageTitle}.pdf`,
                html2canvas: {
                    scale: 2,
                    useCORS: true, // Allow cross-origin images
                    backgroundColor: '#ffffff' // White background
                },
                jsPDF: {
                    unit: 'in',
                    format: 'letter',
                    orientation: 'portrait'
                }
            })
            .save();
    }
});
