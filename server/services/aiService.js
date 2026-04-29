const { OpenAI } = require('openai');

// Conditional initialization to prevent crash without API Key
const openai = process.env.OPENAI_API_KEY && process.env.OPENAI_API_KEY !== 'your_openai_api_key_here'
  ? new OpenAI({ apiKey: process.env.OPENAI_API_KEY })
  : null;

/**
 * Extracts keywords, skills, and tools from a Job Description.
 */
const analyzeJobDescription = async (jdText) => {
  if (!openai) {
    console.warn("⚠️ AI Mock Mode: Returning simulated JD analysis.");
    return {
      hardSkills: ["JavaScript", "React", "Node.js", "Tailwind CSS"],
      softSkills: ["Communication", "Problem Solving", "Teamwork"],
      responsibilities: ["Develop front-end features", "API Integration", "Code Review"],
      keywords: ["React", "Express", "MongoDB", "Tailwind", "Vite"]
    };
  }
  try {
    const response = await openai.chat.completions.create({
      model: "gpt-4o",
      messages: [
        {
          role: "system",
          content: "You are an expert HR Recruiter and ATS Optimizer. Extract core requirements from the job description and return a structured JSON."
        },
        {
          role: "user",
          content: `Extract the following from this Job Description:
          1. Hard Skills (technologies, tools, methodologies)
          2. Soft Skills
          3. Key Responsibilities
          4. Top 5 Keywords (for ATS optimization)

          JD: ${jdText}

          Return ONLY JSON in this format:
          {
            "hardSkills": [],
            "softSkills": [],
            "responsibilities": [],
            "keywords": []
          }`
        }
      ],
      response_format: { type: "json_object" }
    });

    return JSON.parse(response.choices[0].message.content);
  } catch (error) {
    console.error("AI Analysis Error:", error);
    throw new Error("Failed to analyze Job Description");
  }
};

/**
 * Rewrites a bullet point to be more impactful and include a keyword.
 */
const optimizeBulletPoint = async (bulletPoint, keyword) => {
  if (!openai) {
    console.warn("AI Service not configured. Skipping optimization.");
    return bulletPoint;
  }
  try {
    const response = await openai.chat.completions.create({
      model: "gpt-4o",
      messages: [
        {
          role: "system",
          content: "You are a professional resume writer. Rewrite bullet points using the Google XYZ formula: 'Accomplished [X] as measured by [Y], by doing [Z]'."
        },
        {
          role: "user",
          content: `Rewrite this resume bullet point to include the keyword '${keyword}'. 
          Make it concise, punchy, and result-oriented. 
          Original: ${bulletPoint}`
        }
      ]
    });

    return response.choices[0].message.content.trim();
  } catch (error) {
    console.error("AI Rewriting Error:", error);
    return bulletPoint; // Fallback to original
  }
};

/**
 * Generates a personalized cover letter based on Resume and JD.
 */
const generateCoverLetter = async (resumeData, jdText) => {
  if (!openai) {
    console.warn("⚠️ AI Mock Mode: Returning simulated Cover Letter.");
    return `Dear Hiring Manager,

I am writing to express my strong interest in the position highlighted in your job description. With my background in ${resumeData.experience[0]?.role || 'software development'} and my proficiency in modern tech stacks, I am confident in my ability to contribute to your team.

Best regards,
${resumeData.personalInfo.firstName} ${resumeData.personalInfo.lastName}`;
  }
  try {
    const response = await openai.chat.completions.create({
      model: "gpt-4o",
      messages: [
        {
          role: "system",
          content: "You are a professional career coach. Write high-converting, personalized cover letters."
        },
        {
          role: "user",
          content: `Write a cover letter using this information:
          Candidate: ${JSON.stringify(resumeData.personalInfo)}
          Experience: ${JSON.stringify(resumeData.experience)}
          Target Job Description: ${jdText}
          
          The letter should be professional, show cultural fit, and highlight relevant achievements.`
        }
      ]
    });

    return response.choices[0].message.content.trim();
  } catch (error) {
    console.error("Cover Letter Error:", error);
    throw new Error("Failed to generate cover letter");
  }
};

/**
 * UNIQUE FEATURE: Generates tailored interview questions and prep tips.
 */
const generateInterviewPrep = async (resumeData, jdText) => {
  if (!openai) {
    console.warn("⚠️ AI Mock Mode: Returning simulated Interview Prep.");
    return {
      questions: [
        "Can you describe your experience with React and Node.js in high-pressure environments?",
        "How do you handle conflict in a cross-functional engineering team?",
        "Tell us about a time you optimized a slow API. What was the result?",
      ],
      tips: [
        "Focus on your specific contributions to the 'Project X' mentioned in your resume.",
        "They use Tailwind CSS—be ready to explain why you prefer utility-first styling.",
        "Emphasize your problem-solving process using the STAR method."
      ]
    };
  }
  try {
    const response = await openai.chat.completions.create({
      model: "gpt-4o",
      messages: [
        {
          role: "system",
          content: "You are an expert Interview Coach. Analyze the resume and JD to provide the toughest interview questions and strategic prep tips."
        },
        {
          role: "user",
          content: `Analyze this Resume and Job Description:
          Resume: ${JSON.stringify(resumeData)}
          JD: ${jdText}
          
          Return JSON:
          {
            "questions": ["Q1", "Q2", "Q3"],
            "tips": ["Tip 1", "Tip 2", "Tip 3"]
          }`
        }
      ],
      response_format: { type: "json_object" }
    });

    return JSON.parse(response.choices[0].message.content);
  } catch (error) {
    console.error("Interview Prep Error:", error);
    throw new Error("Failed to generate interview prep");
  }
};

/**
 * Parses raw text from a PDF into structured resume data.
 */
const parseResumeText = async (text) => {
  if (!openai) {
    console.warn("⚠️ AI Mock Mode: Returning simulated parsed resume.");
    return {
      personalInfo: { firstName: "John", lastName: "Doe", email: "john@example.com", phone: "123-456-7890", linkedin: "linkedin.com/in/johndoe" },
      summary: "Experienced developer with expertise in full-stack applications.",
      experience: [
        { company: "Tech Corp", role: "Senior Developer", period: "2020 - Present", highlights: ["Led team of 5", "Improved performance by 40%"] }
      ],
      education: [{ school: "University of Technology", degree: "B.S. CS", year: "2018" }],
      skills: ["React", "Node.js", "MongoDB"]
    };
  }
  try {
    const response = await openai.chat.completions.create({
      model: "gpt-4o",
      messages: [
        {
          role: "system",
          content: "You are a specialized Resume Parsing Engine. Convert raw text from a resume into a clean, structured JSON format."
        },
        {
          role: "user",
          content: `Extract structured data from this resume text:
          ${text}

          Return ONLY JSON in this exact format:
          {
            "personalInfo": { "firstName": "", "lastName": "", "email": "", "phone": "", "linkedin": "" },
            "summary": "",
            "experience": [
              { "company": "", "role": "", "period": "", "highlights": ["", ""] }
            ],
            "education": [
              { "school": "", "degree": "", "year": "" }
            ],
            "skills": []
          }`
        }
      ],
      response_format: { type: "json_object" }
    });

    return JSON.parse(response.choices[0].message.content);
  } catch (error) {
    console.error("AI Parsing Error:", error);
    throw new Error("Failed to parse resume text");
  }
};

/**
 * Matches multiple candidates against a job description.
 */
const matchCandidates = async (candidates, jdText) => {
  if (!openai) {
    console.warn("⚠️ AI Mock Mode: Returning simulated candidate matching.");
    return candidates.map((c, i) => ({
      name: `${c.personalInfo.firstName} ${c.personalInfo.lastName}`,
      score: 85 - (i * 10),
      reason: "Matches core requirements but lacks some niche tools."
    }));
  }
  try {
    const response = await openai.chat.completions.create({
      model: "gpt-4o",
      messages: [
        {
          role: "system",
          content: "You are an ATS Matcher. Rank candidates based on how well they fit the job description."
        },
        {
          role: "user",
          content: `Job Description: ${jdText}
          
          Candidates: ${JSON.stringify(candidates.map(c => ({ id: c.id, summary: c.summary, skills: c.skills, experience: c.experience })))}
          
          Compare them and return a ranking JSON:
          [
            { "id": "original_id", "score": 95, "reason": "Detailed explanation of why" }
          ]`
        }
      ],
      response_format: { type: "json_object" }
    });

    const result = JSON.parse(response.choices[0].message.content);
    // Handle if AI returns a wrapper object or an array directly
    return Array.isArray(result) ? result : result.rankings || Object.values(result)[0];
  } catch (error) {
    console.error("AI Matching Error:", error);
    throw new Error("Failed to match candidates");
  }
};

/**
 * Calculates the ATS score and identifies matched/missing keywords.
 */
const calculateScore = async (resumeText, keywords) => {
  if (!openai) {
    console.warn("⚠️ AI Mock Mode: Returning simulated score.");
    return {
      atsScore: 78,
      matchedKeywords: keywords.slice(0, Math.floor(keywords.length / 2)),
      missingKeywords: keywords.slice(Math.floor(keywords.length / 2))
    };
  }
  try {
    const response = await openai.chat.completions.create({
      model: "gpt-4o",
      messages: [
        {
          role: "system",
          content: "You are an ATS Scoring Engine. Compare the resume text against the provided keywords and return a score and keyword analysis."
        },
        {
          role: "user",
          content: `Keywords: ${JSON.stringify(keywords)}
          Resume Text: ${resumeText}
          
          Return JSON:
          {
            "atsScore": 85,
            "matchedKeywords": [],
            "missingKeywords": []
          }`
        }
      ],
      response_format: { type: "json_object" }
    });

    return JSON.parse(response.choices[0].message.content);
  } catch (error) {
    console.error("Score Calculation Error:", error);
    throw new Error("Failed to calculate score");
  }
};

module.exports = {
  analyzeJobDescription,
  optimizeBulletPoint,
  generateCoverLetter,
  generateInterviewPrep,
  parseResumeText,
  matchCandidates,
  calculateScore
};
