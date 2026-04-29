const puppeteer = require('puppeteer');

/**
 * Generates a PDF from a given HTML content or URL.
 */
const generateResumePDF = async (resumeData) => {
  let browser;
  try {
    browser = await puppeteer.launch({
      headless: "new",
      args: ['--no-sandbox', '--disable-setuid-sandbox']
    });
    
    const page = await browser.newPage();

    // We'll pass the resume data to a template 
    // For now, we simulate by navigating to the client's print route
    // In production, you'd point this to your hosted frontend
    const clientUrl = process.env.CLIENT_URL || 'http://localhost:5173';
    
    // We pass data via local storage or query params for the print view
    await page.goto(`${clientUrl}/print-preview`, {
      waitUntil: 'networkidle0',
    });

    // Wait for the resume to render
    await page.waitForSelector('#resume-root');

    const pdfBuffer = await page.pdf({
      format: 'A4',
      printBackground: true,
      margin: {
        top: '0px',
        right: '0px',
        bottom: '0px',
        left: '0px'
      }
    });

    return pdfBuffer;
  } catch (error) {
    console.error("PDF Generation Error:", error);
    throw error;
  } finally {
    if (browser) await browser.close();
  }
};

module.exports = {
  generateResumePDF
};
