import { motion } from 'framer-motion';
import { Plus, FileText, History, Settings, ExternalLink, Download, Clock, Zap, MoreVertical } from 'lucide-react';
import { Link } from 'react-router-dom';

const Dashboard = () => {
  const resumes = [
    { id: 1, title: 'Senior Software Engineer', lastEdited: '2 hours ago', score: 94, category: 'Tech' },
    { id: 2, title: 'Product Manager Role', lastEdited: '1 day ago', score: 82, category: 'Management' },
  ];

  return (
    <div className="min-h-screen bg-dark-bg pt-32 pb-20 px-6 relative overflow-hidden">
      {/* Background Decor */}
      <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-indigo-600/10 rounded-full blur-[120px] animate-pulse"></div>
      <div className="absolute bottom-[-10%] right-[-10%] w-[30%] h-[30%] bg-emerald-600/5 rounded-full blur-[100px]"></div>

      <div className="container mx-auto max-w-7xl relative z-10">
        <header className="flex flex-col md:flex-row justify-between items-start md:items-center mb-16 gap-8">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
          >
            <div className="flex items-center gap-3 mb-3">
              <span className="premium-badge">Workspace</span>
              <span className="text-slate-500 text-sm">•</span>
              <span className="text-slate-500 text-sm">2 Resumes</span>
            </div>
            <h1 className="text-5xl font-bold mb-3 tracking-tight">
              Command <span className="neon-text">Center</span>
            </h1>
            <p className="text-slate-400 text-lg max-w-xl">
              Track your performance and manage your professional portfolio with AI-powered insights.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
          >
            <Link to="/build" className="btn-primary group">
              <div className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/10 to-white/0 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000"></div>
              <Plus className="w-5 h-5" />
              <span>Create New Resume</span>
            </Link>
          </motion.div>
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-8 space-y-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {resumes.map((resume, i) => (
                <motion.div 
                  key={resume.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.1 }}
                  className="glass-card group p-8"
                >
                  <div className="flex justify-between items-start mb-8">
                    <div className="w-14 h-14 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center group-hover:scale-110 transition-transform duration-500">
                      <FileText className="w-7 h-7 text-indigo-400" />
                    </div>
                    <div className={`px-4 py-1.5 rounded-full text-[10px] font-bold tracking-widest uppercase ${
                      resume.score > 90 
                        ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20' 
                        : 'bg-indigo-500/10 text-indigo-400 border border-indigo-500/20'
                    }`}>
                      {resume.score}% Match
                    </div>
                  </div>

                  <div className="mb-8">
                    <span className="text-[10px] font-bold text-slate-500 uppercase tracking-widest block mb-2">{resume.category}</span>
                    <h3 className="text-2xl font-bold mb-2 group-hover:text-indigo-400 transition-colors">{resume.title}</h3>
                    <div className="flex items-center gap-4 text-slate-500 text-sm">
                      <span className="flex items-center gap-1.5">
                        <Clock className="w-4 h-4" /> {resume.lastEdited}
                      </span>
                    </div>
                  </div>

                  <div className="flex items-center gap-3">
                    <Link to="/build" className="flex-1 py-3.5 rounded-xl bg-white/5 border border-white/10 hover:bg-white/10 hover:border-white/20 transition-all text-center text-sm font-bold">
                      Edit
                    </Link>
                    <button className="p-3.5 rounded-xl bg-white/5 border border-white/10 hover:bg-indigo-600 hover:border-indigo-600 transition-all group/btn">
                      <Download className="w-5 h-5 group-hover/btn:scale-110 transition-transform" />
                    </button>
                    <button className="p-3.5 rounded-xl bg-white/5 border border-white/10 hover:bg-white/10 transition-all">
                      <Settings className="w-5 h-5" />
                    </button>
                  </div>
                </motion.div>
              ))}
              
              {/* Empty State / Add New */}
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                className="glass-card border-dashed border-white/10 hover:border-indigo-500/40 p-8 flex flex-col items-center justify-center text-center group cursor-pointer"
              >
                <div className="w-16 h-16 rounded-full bg-white/5 flex items-center justify-center mb-4 group-hover:bg-indigo-500/10 transition-colors">
                  <Plus className="w-8 h-8 text-slate-500 group-hover:text-indigo-400 transition-colors" />
                </div>
                <h4 className="text-lg font-bold text-slate-400 group-hover:text-white transition-colors">Add New Resume</h4>
                <p className="text-sm text-slate-500 mt-2">Start from a template or import existing</p>
              </motion.div>
            </div>
          </div>

          {/* Sidebar / Stats */}
          <div className="lg:col-span-4 space-y-8">
            <motion.div 
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              className="glass-card p-8 bg-indigo-600/5 border-indigo-500/20 relative overflow-hidden"
            >
              <div className="absolute top-0 right-0 p-6 opacity-5">
                <Zap className="w-32 h-32" />
              </div>
              <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
                <Zap className="w-5 h-5 text-indigo-400" /> Pro Account
              </h3>
              <p className="text-slate-400 text-sm mb-8 leading-relaxed">
                You're currently on the Pro plan. You have unlimited exports and priority AI processing enabled.
              </p>
              <div className="space-y-4">
                <div className="flex justify-between text-xs font-bold uppercase tracking-widest text-slate-500">
                  <span>AI Credits Used</span>
                  <span>14 / 500</span>
                </div>
                <div className="h-2 bg-white/5 rounded-full overflow-hidden">
                  <div className="h-full bg-indigo-500 w-[5%]" />
                </div>
              </div>
              <button className="w-full mt-8 py-3 rounded-xl bg-white/5 border border-white/10 hover:bg-white/10 transition-all text-xs font-bold uppercase tracking-widest flex items-center justify-center gap-2">
                Manage Subscription <ExternalLink className="w-3 h-3" />
              </button>
            </motion.div>

            <motion.div 
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 }}
              className="glass-card p-8"
            >
              <h3 className="text-lg font-bold mb-6">Quick Actions</h3>
              <div className="space-y-3">
                {['Import PDF', 'Job Search', 'Profile Settings'].map((action) => (
                  <button key={action} className="w-full p-4 rounded-xl bg-white/5 border border-white/5 hover:border-white/20 hover:bg-white/10 transition-all text-left flex items-center justify-between group">
                    <span className="text-sm font-medium">{action}</span>
                    <ArrowRight className="w-4 h-4 text-slate-600 group-hover:text-indigo-400 transition-colors" />
                  </button>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
};

const ArrowRight = ({ className }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" /></svg>
);

export default Dashboard;

