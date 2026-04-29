import { Routes, Route, Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { FileText, Zap, ShieldCheck, ArrowRight, X, Layout, Sparkles, Globe, Shield, Bell, CheckCircle } from 'lucide-react';
import ResumeBuilder from './features/ResumeBuilder';
import Dashboard from './components/Dashboard';
import Templates from './components/Templates';
import Pricing from './components/Pricing';
import SignIn from './components/SignIn';
import CandidateMatcher from './features/CandidateMatcher';
import { useState, createContext, useContext } from 'react';

const NotificationContext = createContext();

export const useNotification = () => useContext(NotificationContext);

const Notification = ({ message, type, onClose }) => (
  <motion.div 
    initial={{ opacity: 0, y: -20, x: 20 }}
    animate={{ opacity: 1, y: 0, x: 0 }}
    exit={{ opacity: 0, scale: 0.95 }}
    className="fixed top-24 right-8 z-[200] glass-card p-6 border-indigo-500/30 flex items-center gap-4 min-w-[320px] shadow-[0_20px_50px_rgba(0,0,0,0.5)]"
  >
    <div className={`w-12 h-12 rounded-2xl flex items-center justify-center ${type === 'success' ? 'bg-emerald-500/10' : 'bg-indigo-500/10'}`}>
      {type === 'success' ? <CheckCircle className="text-emerald-400 w-6 h-6" /> : <Bell className="text-indigo-400 w-6 h-6" />}
    </div>
    <div className="flex-1">
      <h4 className="text-sm font-bold text-white mb-1">{type === 'success' ? 'Success' : 'Notification'}</h4>
      <p className="text-xs text-slate-400 font-medium">{message}</p>
    </div>
    <button onClick={onClose} className="p-2 hover:bg-white/5 rounded-lg transition-colors">
      <X className="w-4 h-4 text-slate-600" />
    </button>
  </motion.div>
);

const NavLink = ({ to, children, icon: Icon }) => {
  const location = useLocation();
  const isActive = location.pathname === to;
  return (
    <Link to={to} className={`relative px-4 py-2 rounded-xl transition-all duration-300 flex items-center gap-2 group ${isActive ? 'text-white' : 'text-slate-400 hover:text-white'}`}>
      {isActive && (
        <motion.div layoutId="nav-glow" className="absolute inset-0 bg-white/5 border border-white/10 rounded-xl -z-10" />
      )}
      <Icon className={`w-4 h-4 ${isActive ? 'text-indigo-400' : 'text-slate-500 group-hover:text-indigo-400'}`} />
      <span className="text-sm font-medium">{children}</span>
    </Link>
  );
};

const FeatureModal = ({ feature, isOpen, onClose }) => {
  if (!isOpen) return null;
  return (
    <AnimatePresence>
      <motion.div 
        initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
        className="fixed inset-0 z-[100] flex items-center justify-center p-6 bg-black/80 backdrop-blur-md"
      >
        <motion.div 
          initial={{ scale: 0.9, y: 20 }} animate={{ scale: 1, y: 0 }}
          className="glass-card w-full max-w-2xl p-10 relative overflow-hidden border-indigo-500/20"
        >
          <div className="absolute -top-24 -right-24 w-64 h-64 bg-indigo-600/20 rounded-full blur-[100px]"></div>
          <button onClick={onClose} className="absolute top-6 right-6 p-2 rounded-lg hover:bg-white/10 transition-colors">
            <X className="w-6 h-6 text-slate-400" />
          </button>
          <div className="w-16 h-16 rounded-2xl bg-indigo-500/10 border border-indigo-500/20 flex items-center justify-center mb-8 shadow-[0_0_20px_rgba(79,70,229,0.2)]">
            {feature.icon}
          </div>
          <h2 className="text-3xl font-bold mb-4">{feature.title}</h2>
          <p className="text-slate-400 text-lg leading-relaxed mb-10">{feature.longDesc}</p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-10">
            {feature.stats.map((stat, i) => (
              <div key={i} className="flex items-center gap-3 text-slate-300">
                <ShieldCheck className="w-5 h-5 text-emerald-400" />
                <span className="text-sm">{stat}</span>
              </div>
            ))}
          </div>
          <Link to="/build" onClick={onClose} className="btn-primary w-full flex items-center justify-center gap-2">
            Initialize Career Forge <ArrowRight className="w-5 h-5" />
          </Link>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};

const Hero = () => {
  const [selectedFeature, setSelectedFeature] = useState(null);

  const features = [
    { 
      icon: <Zap className="w-7 h-7 text-indigo-400" />, 
      title: "Neural Rewrite Engine", 
      desc: "Instant optimization with contextual keyword injection.",
      longDesc: "Our proprietary neural network analyzes thousands of high-performing resumes to rewrite your experience. We focus on impact metrics and senior-level action verbs.",
      stats: ["Metric-driven highlights", "Contextual synonyms", "67% Higher ATS Score"]
    },
    { 
      icon: <Shield className="w-7 h-7 text-emerald-400" />, 
      title: "Quantum ATS Scanner", 
      desc: "Simulate recruiter filters with 99.9% accuracy.",
      longDesc: "Stop getting rejected by silent filters. Our system simulates real ATS software from Workday, Greenhouse, and Lever to ensure your resume is never ignored.",
      stats: ["Keyword density heatmaps", "Parsing validation", "Gap detection"]
    },
    { 
      icon: <Globe className="w-7 h-7 text-amber-400" />, 
      title: "Global Export 2.0", 
      desc: "Format-preserved PDFs optimized for digital parsing.",
      longDesc: "Universal PDF standards that are perfectly readable by both AI parsers and human recruiters. Zero formatting breaks, guaranteed.",
      stats: ["Universal font subsetting", "PDF/A compliance", "Mobile-optimized"]
    }
  ];

  return (
    <div className="relative min-h-screen flex items-center justify-center overflow-hidden pt-20 bg-grid">
      <FeatureModal 
        isOpen={!!selectedFeature} 
        feature={selectedFeature} 
        onClose={() => setSelectedFeature(null)} 
      />
      
      <div className="absolute top-0 left-1/4 w-[500px] h-[500px] bg-indigo-600/10 rounded-full blur-[120px] animate-pulse"></div>
      <div className="absolute bottom-0 right-1/4 w-[500px] h-[500px] bg-emerald-600/10 rounded-full blur-[120px] animate-pulse delay-1000"></div>

      <div className="container mx-auto px-6 relative z-10 text-center">
        <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 1 }}>
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-indigo-400 text-xs font-bold uppercase tracking-widest mb-8">
            <Sparkles className="w-4 h-4 animate-spin-slow" /> CareerForge Pro 2026 Edition
          </div>
          <h1 className="text-6xl md:text-8xl font-black mb-8 leading-[1.1] tracking-tighter">
            Build Resumes with <br />
            <span className="neon-text italic">Atomic Precision.</span>
          </h1>
          <p className="text-slate-400 text-lg md:text-xl max-w-2xl mx-auto mb-12 leading-relaxed font-medium">
            The world's most advanced AI resume engineer. Don't just apply—dominate the applicant pool with metric-driven, ATS-immune documents.
          </p>
          <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
            <Link to="/build" className="btn-primary group">
              Start Building <ArrowRight className="w-5 h-5 inline-block ml-2 group-hover:translate-x-1 transition-transform" />
            </Link>
            <Link to="/match" className="px-8 py-4 rounded-2xl border border-white/10 bg-white/5 hover:bg-white/10 transition-all text-white font-bold text-center">
              Recruiter Center
            </Link>
          </div>
        </motion.div>

        <motion.div 
          initial={{ opacity: 0, y: 50 }} 
          animate={{ opacity: 1, y: 0 }} 
          transition={{ duration: 1, delay: 0.3 }} 
          className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-32 max-w-6xl mx-auto"
        >
          {features.map((feature, i) => (
            <div key={i} onClick={() => setSelectedFeature(feature)} className="glass-card p-10 text-left group cursor-pointer border-white/5">
              <div className="w-14 h-14 rounded-2xl bg-indigo-500/5 border border-white/5 flex items-center justify-center mb-8 group-hover:scale-110 group-hover:border-indigo-500/30 transition-all duration-500">
                {feature.icon}
              </div>
              <h3 className="text-2xl font-bold mb-4 text-white group-hover:text-indigo-400 transition-colors">{feature.title}</h3>
              <p className="text-slate-500 text-sm leading-relaxed mb-6 group-hover:text-slate-400 transition-colors">{feature.desc}</p>
              <div className="flex items-center gap-2 text-indigo-400 text-xs font-bold uppercase tracking-wider opacity-0 group-hover:opacity-100 transition-all translate-y-2 group-hover:translate-y-0">
                Dive Deep <ArrowRight className="w-4 h-4" />
              </div>
            </div>
          ))}
        </motion.div>
      </div>
    </div>
  );
};

function App() {
  const [notification, setNotification] = useState(null);

  const notify = (message, type = 'info') => {
    setNotification({ message, type });
    setTimeout(() => setNotification(null), 5000);
  };

  return (
    <NotificationContext.Provider value={{ notify }}>
      <div className="min-h-screen bg-[rgb(var(--bg-dark))] font-outfit selection:bg-indigo-500/30">
        <AnimatePresence>
          {notification && (
            <Notification 
              message={notification.message} 
              type={notification.type} 
              onClose={() => setNotification(null)} 
            />
          )}
        </AnimatePresence>

        <nav className="fixed top-6 left-1/2 -translate-x-1/2 w-[95%] max-w-5xl z-50">
          <div className="glass-card px-8 h-20 flex items-center justify-between border-white/10 shadow-2xl">
            <Link to="/" className="flex items-center gap-3">
              <div className="w-10 h-10 bg-gradient-to-tr from-indigo-600 to-violet-600 rounded-xl flex items-center justify-center shadow-lg shadow-indigo-500/20 group cursor-pointer overflow-hidden relative">
                 <Zap className="text-white w-6 h-6 fill-current z-10" />
                 <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform"></div>
              </div>
              <span className="text-xl font-black text-white tracking-tighter">FORGE <span className="text-indigo-500 font-normal italic">PRO</span></span>
            </Link>
            <div className="hidden md:flex items-center gap-2">
              <NavLink to="/templates" icon={Layout}>Templates</NavLink>
              <NavLink to="/dashboard" icon={FileText}>Vault</NavLink>
              <NavLink to="/match" icon={Sparkles}>Recruiter Hub</NavLink>
              <NavLink to="/pricing" icon={Globe}>Upgrade</NavLink>
            </div>
            <Link to="/signin" className="px-6 py-2.5 rounded-xl bg-white text-black font-black text-sm hover:bg-slate-200 transition-all shadow-xl active:scale-95">
              ACCESS
            </Link>
          </div>
        </nav>
        <AnimatePresence mode="wait">
          <Routes>
            <Route path="/" element={<Hero />} />
            <Route path="/build" element={<ResumeBuilder />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/match" element={<CandidateMatcher />} />
            <Route path="/templates" element={<Templates />} />
            <Route path="/pricing" element={<Pricing />} />
            <Route path="/signin" element={<SignIn />} />
          </Routes>
        </AnimatePresence>
      </div>
    </NotificationContext.Provider>
  );
}

export default App;

