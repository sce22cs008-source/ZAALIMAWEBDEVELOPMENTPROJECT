import { motion } from 'framer-motion';
import { Mail, Lock, ArrowRight, Github, Chrome as Google } from 'lucide-react';
import { Link } from 'react-router-dom';

const SignIn = () => {
  return (
    <div className="min-h-screen bg-dark-bg flex items-center justify-center px-6 py-20 relative overflow-hidden">
      {/* Background Decor */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-primary-600/5 rounded-full blur-[120px]"></div>

      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="glass-card w-full max-w-md p-10 relative z-10"
      >
        <div className="text-center mb-10">
          <h2 className="text-3xl font-bold mb-2">Welcome Back</h2>
          <p className="text-slate-400">Continue building your future today.</p>
        </div>

        <form className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-slate-400 mb-2">Email Address</label>
            <div className="relative">
              <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-500" />
              <input type="email" className="input-field pl-12" placeholder="name@company.com" />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-400 mb-2">Password</label>
            <div className="relative">
              <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-500" />
              <input type="password" className="input-field pl-12" placeholder="••••••••" />
            </div>
            <div className="text-right mt-2">
              <a href="#" className="text-xs text-primary-400 hover:text-primary-300">Forgot password?</a>
            </div>
          </div>

          <button className="btn-primary w-full flex items-center justify-center gap-2">
            Sign In <ArrowRight className="w-4 h-4" />
          </button>
        </form>

        <div className="relative my-10 text-center">
          <div className="absolute inset-0 flex items-center"><div className="w-full border-t border-dark-border"></div></div>
          <span className="relative px-4 bg-[#111] text-xs text-slate-500 uppercase tracking-widest">Or continue with</span>
        </div>

        <div className="grid grid-cols-2 gap-4 mb-10">
          <button className="px-4 py-2.5 rounded-xl border border-dark-border flex items-center justify-center gap-2 hover:bg-white/5 transition-colors">
            <Google className="w-4 h-4" /> Google
          </button>
          <button className="px-4 py-2.5 rounded-xl border border-dark-border flex items-center justify-center gap-2 hover:bg-white/5 transition-colors">
            <Github className="w-4 h-4" /> GitHub
          </button>
        </div>

        <p className="text-center text-sm text-slate-500">
          Don't have an account? <Link to="/pricing" className="text-primary-400 hover:underline">Start for Free</Link>
        </p>
      </motion.div>
    </div>
  );
};

export default SignIn;
