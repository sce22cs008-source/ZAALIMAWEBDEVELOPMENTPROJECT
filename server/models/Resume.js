const mongoose = require('mongoose');

const ExperienceSchema = new mongoose.Schema({
  company: { type: String, required: true },
  role: { type: String, required: true },
  location: String,
  startDate: String,
  endDate: String, // Or "Present"
  current: { type: Boolean, default: false },
  highlights: [{ type: String }], // Bullet points
});

const EducationSchema = new mongoose.Schema({
  school: { type: String, required: true },
  degree: { type: String, required: true },
  fieldOfStudy: String,
  startDate: String,
  endDate: String,
  gpa: String,
});

const ProjectSchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: String,
  technologies: [{ type: String }],
  link: String,
  highlights: [{ type: String }],
});

const ResumeSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  title: { type: String, default: 'My Resume' },
  personalInfo: {
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    email: { type: String, required: true },
    phone: String,
    linkedin: String,
    website: String,
    address: String,
  },
  summary: { type: String },
  experience: [ExperienceSchema],
  education: [EducationSchema],
  skills: [{ type: String }],
  projects: [ProjectSchema],
  atsScore: { type: Number, default: 0 },
  lastGeneratedAt: { type: Date, default: Date.now }
}, {
  timestamps: true
});

module.exports = mongoose.model('Resume', ResumeSchema);
