const pdf = require('pdf-parse');
const parse = (typeof pdf === 'function') ? pdf : (pdf && typeof pdf.default === 'function' ? pdf.default : pdf);

/**
 * Extracts text from a PDF buffer
 * @param {Buffer} dataBuffer 
 * @returns {Promise<string>}
 */
const extractTextFromPDF = async (dataBuffer) => {
  try {
    if (!dataBuffer) throw new Error("No data buffer provided to extractor");
    console.log("📄 Extracting text from PDF (Buffer size:", dataBuffer.length, "bytes)");
    
    const data = await parse(dataBuffer);
    console.log("✅ Text extracted. Length:", data.text?.length || 0);
    
    return data.text;
  } catch (error) {
    console.error("PDF Extraction Error:", error);
    throw new Error("Failed to extract text from PDF: " + error.message);
  }
};

module.exports = {
  extractTextFromPDF
};
