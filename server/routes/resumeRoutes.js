const express = require('express');
const router = express.Router();
const Resume = require('../models/Resume');
const { analyzeJobDescription, optimizeBulletPoint, generateCoverLetter, generateInterviewPrep, parseResumeText, matchCandidates, calculateScore } = require('../services/aiService');
const { generateResumePDF } = require('../services/pdfService');
const { extractTextFromPDF } = require('../services/scanService');
const multer = require('multer');

const upload = multer({ storage: multer.memoryStorage() });

// POST: Analyze JD and get keywords
router.post('/analyze-jd', async (req, res) => {
  try {
    const { jdText } = req.body;
    const analysis = await analyzeJobDescription(jdText);
    res.json(analysis);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// POST: Optimize a single bullet point
router.post('/optimize-bullet', async (req, res) => {
  try {
    const { bulletPoint, keyword } = req.body;
    const optimized = await optimizeBulletPoint(bulletPoint, keyword);
    res.json({ optimized });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// POST: Generate Cover Letter
router.post('/generate-cover-letter', async (req, res) => {
  try {
    const { resumeData, jdText } = req.body;
    const coverLetter = await generateCoverLetter(resumeData, jdText);
    res.json({ coverLetter });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// POST: Generate PDF
router.post('/generate-pdf', async (req, res) => {
  try {
    const resumeData = req.body;
    const pdfBuffer = await generateResumePDF(resumeData);
    
    res.set({
      'Content-Type': 'application/pdf',
      'Content-Disposition': 'attachment; filename=resume.pdf',
      'Content-Length': pdfBuffer.length,
    });
    
    res.send(pdfBuffer);
  } catch (error) {
    console.error("PDF Route Error:", error);
    res.status(500).json({ error: "PDF Generation failed. Make sure Puppeteer dependencies are installed." });
  }
});

// POST: Generate Interview Prep (Unique Feature)
router.post('/interview-prep', async (req, res) => {
  try {
    const { resumeData, jdText } = req.body;
    const prepData = await generateInterviewPrep(resumeData, jdText);
    res.json(prepData);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// POST: Scan PDF Resume
router.post('/scan-resume', upload.single('resume'), async (req, res) => {
  try {
    if (!req.file) return res.status(400).json({ error: "No file uploaded" });
    
    const text = await extractTextFromPDF(req.file.buffer);
    const parsedData = await parseResumeText(text);
    
    res.json(parsedData);
  } catch (error) {
    console.error("Scan Route Error:", error);
    res.status(500).json({ error: error.message });
  }
});

// POST: Match multiple candidates against a JD
router.post('/match-candidates', async (req, res) => {
  try {
    const { candidates, jdText } = req.body;
    const rankings = await matchCandidates(candidates, jdText);
    res.json(rankings);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// POST: Calculate ATS Score
router.post('/calculate-score', async (req, res) => {
  try {
    const { resumeText, keywords } = req.body;
    const scoreData = await calculateScore(resumeText, keywords);
    res.json(scoreData);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
