function toggleMenu() {
  const menu = document.querySelector(".menu-links");
  const icon = document.querySelector(".hamburger-icon");
  menu.classList.toggle("open");
  icon.classList.toggle("open");
}
function generatePDF() {
  // Select the element to convert
  const element = document.getElementById('portfolioContent'); // Adjust this to the main div or section you want to export
  
  // Define PDF options
  const options = {
      margin:       0.5,
      filename:     'Portfolio.pdf',
      image:        { type: 'jpeg', quality: 0.98 },
      html2canvas:  { scale: 2 },
      jsPDF:        { unit: 'in', format: 'letter', orientation: 'portrait' }
  };

  // Convert the element to PDF
  html2pdf().set(options).from(element).save();
}
