import { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { updatePersonalInfo, setATSData } from '../store/store';
import axios from 'axios';
import { Sparkles, Download, CheckCircle, AlertCircle, Wand2, FileSearch, User, Briefcase, GraduationCap, ChevronRight, History, Loader2 } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNotification } from '../App';

const SectionHeader = ({ icon: Icon, title, badge }) => (
  <div className="flex items-center justify-between mb-6">
    <div className="flex items-center gap-3">
      <div className="w-10 h-10 rounded-xl bg-indigo-500/10 border border-indigo-500/20 flex items-center justify-center">
        <Icon className="w-5 h-5 text-indigo-400" />
      </div>
      <h3 className="text-xl font-bold text-white tracking-tight">{title}</h3>
    </div>
    {badge && <span className="premium-badge">{badge}</span>}
  </div>
);

const ResumeBuilder = () => {
  const resume = useSelector((state) => state.resume);
  const dispatch = useDispatch();
  const { notify } = useNotification();
  const [jdText, setJdText] = useState('');
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [isOptimizing, setIsOptimizing] = useState(false);
  const [coverLetter, setCoverLetter] = useState('');
  const [interviewPrep, setInterviewPrep] = useState(null);
  const [isPrepping, setIsPrepping] = useState(false);
  const [isScanning, setIsScanning] = useState(false);

  const handleScanPDF = async (e) => {
    const file = e.target.files[0];
    if (!file) return;
    setIsScanning(true);
    const formData = new FormData();
    formData.append('resume', file);
    try {
      const { data } = await axios.post('/api/resumes/scan-resume', formData, {
        headers: { 'Content-Type': 'multipart/form-data' }
      });
      if (data.personalInfo) dispatch(updatePersonalInfo(data.personalInfo));
      notify("Neural scan complete. Resume data successfully imported.", "success");
    } catch (error) {
      console.error("Scan failed", error);
      notify("Scan failed. Ensure the AI backend engine is active.", "error");
    } finally {
      setIsScanning(false);
    }
  };

  const handleAnalyze = async () => {
    if (!jdText) return notify("Please paste a Job Description to begin alignment.", "error");
    setIsAnalyzing(true);
    try {
      const { data: analysis } = await axios.post('/api/resumes/analyze-jd', { jdText });
      const { data: scoreData } = await axios.post('/api/resumes/calculate-score', { 
        resumeText: JSON.stringify(resume), 
        keywords: analysis.keywords 
      });
      dispatch(setATSData(scoreData));
      notify("ATS alignment analysis complete.", "success");
    } catch (error) {
      console.error("Analysis failed", error);
      notify("Analysis failed. Backend unreachable.", "error");
    } finally {
      setIsAnalyzing(false);
    }
  };

  const handleDownloadPDF = async () => {
    try {
      const response = await axios.post('/api/resumes/generate-pdf', resume, { responseType: 'blob' });
      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', `${resume.personalInfo.lastName || 'Resume'}_ATS.pdf`);
      document.body.appendChild(link);
      link.click();
    } catch (error) {
      alert("PDF Engine offline. Check Puppeteer config.");
    }
  };

  return (
    <div className="flex flex-col lg:flex-row h-screen bg-[rgb(var(--bg-dark))] pt-24 overflow-hidden">
      {/* LEFT: Engineering Panel */}
      <div className="w-full lg:w-[45%] p-8 overflow-y-auto border-r border-white/5 custom-scrollbar">
        <header className="mb-10">
          <h2 className="text-4xl font-black mb-3 neon-text tracking-tighter italic">Resume Architect</h2>
          <p className="text-slate-500 text-sm font-medium">Precision engineering for your professional identity.</p>
        </header>

        <div className="space-y-8">
          {/* Quick Scan */}
          <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} className="glass-card p-8 border-dashed border-indigo-500/30 flex flex-col items-center gap-4 group">
            <div className="w-16 h-16 rounded-full bg-indigo-500/5 border border-indigo-500/10 flex items-center justify-center group-hover:scale-110 transition-transform">
              <History className="w-8 h-8 text-indigo-400" />
            </div>
            <div className="text-center">
              <h4 className="text-lg font-bold mb-1">Import Existing Data</h4>
              <p className="text-xs text-slate-500 mb-4">Upload your current PDF to pre-fill the architect.</p>
              <label className="btn-primary cursor-pointer inline-flex items-center gap-2 py-3">
                <Sparkles className="w-4 h-4" />
                {isScanning ? "Processing..." : "Commence Scan"}
                <input type="file" className="hidden" accept=".pdf" onChange={handleScanPDF} />
              </label>
            </div>
          </motion.div>

          {/* Job Alignment */}
          <section className="glass-card p-8">
            <SectionHeader icon={FileSearch} title="Target Objective" badge="ATS Phase 1" />
            <textarea 
              className="input-field min-h-[160px] resize-none text-sm leading-relaxed"
              placeholder="Paste the Job Description to align your resume..."
              value={jdText}
              onChange={(e) => setJdText(e.target.value)}
            />
            <button 
              onClick={handleAnalyze}
              disabled={isAnalyzing}
              className="w-full mt-6 py-4 bg-indigo-600 hover:bg-indigo-500 text-white rounded-2xl font-black text-xs uppercase tracking-[0.2em] transition-all shadow-xl shadow-indigo-500/20 active:scale-95 disabled:opacity-50"
            >
              {isAnalyzing ? "Analyzing Vectors..." : "Execute Alignment"}
            </button>
          </section>

          {/* Core Identity */}
          <section className="glass-card p-8">
            <SectionHeader icon={User} title="Core Identity" />
            <div className="grid grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="text-[10px] font-bold text-slate-500 uppercase tracking-widest ml-1">First Name</label>
                <input 
                  className="input-field" 
                  value={resume.personalInfo.firstName}
                  onChange={(e) => dispatch(updatePersonalInfo({ firstName: e.target.value }))}
                />
              </div>
              <div className="space-y-2">
                <label className="text-[10px] font-bold text-slate-500 uppercase tracking-widest ml-1">Last Name</label>
                <input 
                  className="input-field"
                  value={resume.personalInfo.lastName}
                  onChange={(e) => dispatch(updatePersonalInfo({ lastName: e.target.value }))}
                />
              </div>
            </div>
            <div className="mt-6 space-y-2">
              <label className="text-[10px] font-bold text-slate-500 uppercase tracking-widest ml-1">Professional Email</label>
              <input 
                className="input-field"
                value={resume.personalInfo.email}
                onChange={(e) => dispatch(updatePersonalInfo({ email: e.target.value }))}
              />
            </div>
          </section>

          {/* Strategic Insights */}
          <section className="glass-card p-8 border-l-4 border-indigo-500">
             <SectionHeader icon={Wand2} title="AI Interview Intelligence" />
             {interviewPrep ? (
               <div className="space-y-4">
                  {interviewPrep.questions.map((q, i) => (
                    <div key={i} className="p-4 bg-white/[0.03] rounded-xl border border-white/5 text-xs text-slate-300 flex gap-3">
                      <span className="text-indigo-400 font-bold">Q{i+1}</span> {q}
                    </div>
                  ))}
               </div>
             ) : (
               <p className="text-xs text-slate-500 italic">Generate alignment to unlock interview strategies.</p>
             )}
          </section>
        </div>
      </div>

      {/* RIGHT: Real-time Rendering */}
      <div className="w-full lg:w-[55%] bg-black/40 p-12 overflow-y-auto custom-scrollbar">
        <div className="max-w-[700px] mx-auto">
          <div className="flex justify-between items-center mb-10">
            <div className="flex items-center gap-6">
               <div className="relative">
                  <svg className="w-16 h-16 transform -rotate-90">
                    <circle cx="32" cy="32" r="28" stroke="currentColor" strokeWidth="4" fill="transparent" className="text-white/5" />
                    <circle cx="32" cy="32" r="28" stroke="currentColor" strokeWidth="4" fill="transparent" 
                      strokeDasharray={176} 
                      strokeDashoffset={176 - (176 * resume.atsScore) / 100}
                      className="text-indigo-500 transition-all duration-1000" />
                  </svg>
                  <div className="absolute inset-0 flex items-center justify-center text-sm font-black text-white">{resume.atsScore}%</div>
               </div>
               <div>
                  <h4 className="text-white font-bold">ATS Compatibility</h4>
                  <p className="text-xs text-slate-500">Live score based on JD match</p>
               </div>
            </div>
            <button 
              onClick={handleDownloadPDF}
              className="p-4 rounded-2xl bg-white text-black hover:bg-slate-200 transition-all shadow-xl active:scale-95 flex items-center gap-2 font-bold text-sm"
            >
              <Download className="w-4 h-4" /> Export Document
            </button>
          </div>

          {/* High-Fidelity Preview */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-white text-slate-900 w-full aspect-[1/1.414] shadow-[0_40px_100px_rgba(0,0,0,0.6)] rounded-sm p-16 relative overflow-hidden"
            id="resume-root"
          >
            <div className="absolute top-0 left-0 w-full h-2 bg-indigo-600"></div>
            <header className="mb-10 text-center">
              <h1 className="text-4xl font-black uppercase tracking-tighter mb-2">
                {resume.personalInfo.firstName || 'CANDIDATE'} {resume.personalInfo.lastName || 'NAME'}
              </h1>
              <div className="flex justify-center gap-4 text-[10px] font-bold text-slate-500 uppercase tracking-widest">
                <span>{resume.personalInfo.email}</span>
                <span>•</span>
                <span>{resume.personalInfo.phone}</span>
              </div>
            </header>

            <section className="mb-8">
              <h3 className="text-xs font-black uppercase tracking-[0.3em] text-indigo-600 border-b border-slate-200 pb-2 mb-4">Professional Synopsis</h3>
              <p className="text-[11px] leading-relaxed text-slate-700 italic">
                Performance-driven professional with a background in {resume.experience[0]?.role || 'Industry Specifics'}. Proven track record of delivering high-impact results through strategic execution and technical excellence.
              </p>
            </section>

            <div className="grid grid-cols-3 gap-10">
               <div className="col-span-2">
                  <h3 className="text-xs font-black uppercase tracking-[0.3em] text-indigo-600 border-b border-slate-200 pb-2 mb-6">Experience History</h3>
                  <div className="h-64 border-2 border-dashed border-slate-100 flex items-center justify-center text-slate-300 text-[10px] uppercase font-bold italic">
                    [ Engineering Data Streams ]
                  </div>
               </div>
               <div className="col-span-1">
                  <h3 className="text-xs font-black uppercase tracking-[0.3em] text-indigo-600 border-b border-slate-200 pb-2 mb-6">Technical Core</h3>
                  <div className="flex flex-wrap gap-2">
                    {(resume.skills.length > 0 ? resume.skills : ['Analysis', 'Strategy', 'Execution']).map(skill => (
                      <span key={skill} className="px-2 py-1 bg-slate-100 text-slate-700 text-[9px] font-bold uppercase">{skill}</span>
                    ))}
                  </div>
               </div>
            </div>

            {/* Keyword Match Overlay (Visible only in UI) */}
            <div className="absolute bottom-8 left-16 right-16 flex justify-between items-center opacity-20 pointer-events-none border-t border-slate-100 pt-4">
              <span className="text-[8px] font-black uppercase">CareerForge Precision Audit Verified</span>
              <span className="text-[8px] font-black uppercase">ID: CF-{Math.floor(Math.random()*90000)+10000}</span>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default ResumeBuilder;
