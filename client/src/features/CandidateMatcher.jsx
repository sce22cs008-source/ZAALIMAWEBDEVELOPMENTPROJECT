import { useState } from 'react';
import axios from 'axios';
import { motion, AnimatePresence } from 'framer-motion';
import { Users, Upload, FileSearch, CheckCircle, ChevronRight, AlertCircle, Loader2, Target, Award, BrainCircuit, UserPlus } from 'lucide-react';
import { useNotification } from '../App';

const CandidateMatcher = () => {
  const [jdText, setJdText] = useState('');
  const [candidates, setCandidates] = useState([]);
  const [isScanning, setIsScanning] = useState(false);
  const [isMatching, setIsMatching] = useState(false);
  const [rankings, setRankings] = useState(null);
  const { notify } = useNotification();

  const handleUploadResumes = async (e) => {
    const files = Array.from(e.target.files);
    if (files.length === 0) return;
    setIsScanning(true);
    const newCandidates = [];
    for (const file of files) {
      const formData = new FormData();
      formData.append('resume', file);
      try {
        const { data } = await axios.post('/api/resumes/scan-resume', formData, {
          headers: { 'Content-Type': 'multipart/form-data' }
        });
        newCandidates.push({ ...data, id: Math.random().toString(36).substr(2, 9), fileName: file.name });
      } catch (error) {
        console.error(`Failed to scan ${file.name}`, error);
        notify(`Failed to scan ${file.name}`, "error");
      }
    }
    setCandidates(prev => [...prev, ...newCandidates]);
    notify(`${newCandidates.length} candidates ingested into neural pool.`, "success");
    setIsScanning(false);
  };

  const handleMatch = async () => {
    if (!jdText || candidates.length === 0) return notify("Job parameters and candidate pool required.", "error");
    setIsMatching(true);
    try {
      const { data } = await axios.post('/api/resumes/match-candidates', { candidates, jdText });
      setRankings(data);
      notify("Neural matching matrix generated successfully.", "success");
    } catch (error) {
      notify("Matching engine execution error.", "error");
    } finally {
      setIsMatching(false);
    }
  };

  const handleSelectCandidate = (candidate) => {
    notify(`${candidate.personalInfo.firstName} ${candidate.personalInfo.lastName} has been selected for this position!`, "success");
  };

  return (
    <div className="min-h-screen bg-[rgb(var(--bg-dark))] pt-32 pb-20 px-6 bg-grid">
      <div className="container mx-auto max-w-7xl">
        <header className="mb-16">
          <div className="premium-badge mb-4 inline-block">Enterprise Recruiter Suite</div>
          <h1 className="text-5xl font-black mb-6 tracking-tighter italic">
            Talent <span className="neon-text">Acquisition Hub</span>
          </h1>
          <p className="text-slate-500 max-w-3xl text-lg font-medium leading-relaxed">
            Harnessing neural matching to identify top-tier talent. Our system evaluates multi-dimensional fit based on technical synergy and professional trajectory.
          </p>
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
          {/* CONTROL PANEL */}
          <div className="lg:col-span-4 space-y-8">
            <section className="glass-card p-8 border-white/5">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 rounded-xl bg-emerald-500/10 flex items-center justify-center">
                  <Target className="text-emerald-400 w-5 h-5" />
                </div>
                <h3 className="text-lg font-bold">1. Parameters</h3>
              </div>
              <textarea 
                className="input-field min-h-[220px] text-sm leading-relaxed"
                placeholder="Paste Job Description for vector analysis..."
                value={jdText}
                onChange={(e) => setJdText(e.target.value)}
              />
            </section>

            <section className="glass-card p-8 border-white/5">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 rounded-xl bg-indigo-500/10 flex items-center justify-center">
                  <BrainCircuit className="text-indigo-400 w-5 h-5" />
                </div>
                <h3 className="text-lg font-bold">2. Data Ingestion</h3>
              </div>
              <label className="w-full h-40 border-2 border-dashed border-white/10 rounded-2xl flex flex-col items-center justify-center cursor-pointer hover:border-indigo-500/50 hover:bg-white/5 transition-all group">
                <Upload className="w-10 h-10 text-slate-600 mb-3 group-hover:text-indigo-400 transition-colors" />
                <span className="text-xs text-slate-500 font-bold uppercase tracking-widest text-center px-6">
                  {isScanning ? "Neural Processing..." : "Inject PDF Resumes"}
                </span>
                <input type="file" multiple accept=".pdf" className="hidden" onChange={handleUploadResumes} disabled={isScanning} />
              </label>

              {candidates.length > 0 && (
                <div className="mt-8 space-y-3">
                  <h4 className="text-[10px] font-bold text-slate-600 uppercase tracking-widest px-1">Active Pool ({candidates.length})</h4>
                  {candidates.map((c) => (
                    <div key={c.id} className="flex items-center justify-between p-4 bg-white/[0.03] rounded-xl border border-white/5 text-xs font-bold text-slate-400">
                      <span className="truncate">{c.personalInfo.firstName} {c.personalInfo.lastName}</span>
                      <div className="w-2 h-2 rounded-full bg-emerald-500 shadow-[0_0_8px_rgba(16,185,129,0.5)]" />
                    </div>
                  ))}
                </div>
              )}
            </section>

            <button 
              onClick={handleMatch}
              disabled={isMatching || candidates.length === 0}
              className="btn-primary w-full py-5 text-sm uppercase tracking-[0.25em] flex items-center justify-center gap-3 disabled:opacity-50"
            >
              {isMatching ? <Loader2 className="w-5 h-5 animate-spin" /> : <>Run Neural Matching <ChevronRight className="w-5 h-5" /></>}
            </button>
          </div>

          {/* ANALYSIS DISPLAY */}
          <div className="lg:col-span-8">
            <div className="glass-card p-10 min-h-[700px] border-white/5">
              <div className="flex items-center justify-between mb-12">
                <h3 className="text-2xl font-black italic tracking-tight">Sync Rankings</h3>
                <div className="flex gap-2">
                   <div className="w-3 h-3 rounded-full bg-white/10" />
                   <div className="w-3 h-3 rounded-full bg-white/10" />
                   <div className="w-3 h-3 rounded-full bg-white/10" />
                </div>
              </div>
              
              {!rankings ? (
                <div className="flex flex-col items-center justify-center h-[500px] text-slate-600">
                  <div className="w-24 h-24 rounded-3xl bg-white/[0.02] flex items-center justify-center mb-6 border border-white/5">
                    <Award className="w-12 h-12 opacity-10" />
                  </div>
                  <p className="font-medium">Awaiting parameter input and member data...</p>
                </div>
              ) : (
                <div className="space-y-6">
                  <AnimatePresence>
                    {rankings.map((rank, index) => {
                      const candidate = candidates.find(c => c.id === rank.id) || candidates[index];
                      return (
                        <motion.div 
                          key={rank.id || index}
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: index * 0.1 }}
                          className="group relative p-8 bg-white/[0.02] border border-white/5 rounded-3xl hover:bg-white/[0.04] hover:border-indigo-500/30 transition-all duration-500"
                        >
                          <div className="flex items-start justify-between">
                            <div className="flex items-center gap-6">
                              <div className="w-16 h-16 rounded-2xl bg-indigo-600/10 flex items-center justify-center text-indigo-400 font-black text-2xl border border-indigo-500/20">
                                0{index + 1}
                              </div>
                              <div>
                                <h4 className="text-xl font-black text-white group-hover:text-indigo-400 transition-colors">
                                  {candidate.personalInfo.firstName} {candidate.personalInfo.lastName}
                                </h4>
                                <p className="text-sm text-slate-500 font-medium">{candidate.personalInfo.email}</p>
                              </div>
                            </div>
                            
                            <div className="flex items-center gap-8">
                              <button 
                                onClick={() => handleSelectCandidate(candidate)}
                                className="p-4 rounded-2xl bg-indigo-500/10 border border-indigo-500/20 text-indigo-400 hover:bg-indigo-500 hover:text-white transition-all group/btn"
                              >
                                <UserPlus className="w-6 h-6 group-hover/btn:scale-110 transition-transform" />
                              </button>
                              <div className="text-right">
                                <div className="text-4xl font-black text-white leading-none mb-1">{rank.score}%</div>
                                <div className="premium-badge !bg-emerald-500/10 !text-emerald-400 !border-emerald-500/20">Fit Score</div>
                              </div>
                            </div>
                          </div>

                          <div className="mt-8 p-6 bg-black/40 rounded-2xl border border-white/5 relative overflow-hidden group/box">
                            <div className="absolute top-0 left-0 w-1 h-full bg-indigo-500/50" />
                            <h5 className="text-[10px] font-black text-slate-500 uppercase tracking-widest mb-3 flex items-center gap-2">
                               <BrainCircuit className="w-3 h-3 text-indigo-500" /> Neural Insight
                            </h5>
                            <p className="text-sm text-slate-400 leading-relaxed font-medium">{rank.reason}</p>
                          </div>

                          <div className="mt-8 flex flex-wrap gap-2">
                            {candidate.skills.slice(0, 6).map(skill => (
                              <span key={skill} className="px-3 py-1.5 bg-white/5 text-slate-400 text-[10px] rounded-lg font-bold uppercase tracking-widest border border-white/5 group-hover:border-indigo-500/20 group-hover:text-indigo-300 transition-all">
                                {skill}
                              </span>
                            ))}
                          </div>
                        </motion.div>
                      );
                    })}
                  </AnimatePresence>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CandidateMatcher;
