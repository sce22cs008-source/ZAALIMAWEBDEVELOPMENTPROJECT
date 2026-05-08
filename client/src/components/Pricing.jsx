import { motion } from 'framer-motion';
import { Check, Zap, Shield, Crown, Star, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

const Pricing = () => {
  const plans = [
    {
      name: "Starter",
      description: "Perfect for exploring our AI capabilities.",
      price: "0",
      features: ["1 Active Resume", "Standard Templates", "Basic ATS Scoring", "PDF Export", "Community Support"],
      btnText: "Get Started Free",
      isPro: false,
      glow: "rgba(255,255,255,0.02)"
    },
    {
      name: "Professional",
      description: "Everything you need for a winning application.",
      price: "19",
      features: ["Unlimited Resumes", "AI Bullet Rewriting", "Cover Letter Generator", "Premium Templates", "Priority Email Support", "LinkedIn Optimization"],
      btnText: "Upgrade to Pro",
      isPro: true,
      glow: "rgba(99, 102, 241, 0.1)"
    }
  ];

  return (
    <div className="min-h-screen bg-dark-bg pt-32 pb-24 px-6 relative overflow-hidden">
      {/* Background Decor */}
      <div className="absolute top-[-5%] left-[-5%] w-[40%] h-[40%] bg-indigo-600/10 rounded-full blur-[140px]"></div>
      <div className="absolute bottom-[-5%] right-[-5%] w-[30%] h-[30%] bg-emerald-600/5 rounded-full blur-[120px]"></div>

      <div className="container mx-auto max-w-6xl relative z-10">
        <div className="text-center mb-20">
          <motion.div
            initial={{ opacity: 1, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <span className="premium-badge mb-6">Investment in Your Future</span>
            <h1 className="text-6xl font-bold mb-6 tracking-tight">
              Simple, <span className="neon-text">Transparent</span> Pricing
            </h1>
            <p className="text-slate-400 text-xl max-w-2xl mx-auto leading-relaxed">
              give me the correct of AI to accelerate your career growth. No hidden fees, cancel anytime.
            </p>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="flex items-center justify-center mt-12 gap-4"
          >
            <span className="text-sm font-bold text-white">Monthly</span>
            <div className="w-14 h-7 bg-white/5 border border-white/10 rounded-full p-1 relative cursor-pointer">
              <div className="w-5 h-5 bg-indigo-500 rounded-full shadow-lg"></div>
            </div>
            <span className="text-sm font-bold text-slate-500">Yearly <span className="text-emerald-400 text-[10px] ml-1">SAVE 20%</span></span>
          </motion.div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
          {plans.map((plan, i) => (
            <motion.div 
              key={i}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 + 0.3 }}
              className={`glass-card p-12 relative overflow-hidden flex flex-col ${
                plan.isPro ? 'border-indigo-500/30 bg-indigo-500/[0.03]' : ''
              }`}
              style={{ boxShadow: plan.isPro ? `0 40px 100px -20px ${plan.glow}` : '' }}
            >
              {plan.isPro && (
                <div className="absolute top-0 right-0">
                  <div className="bg-indigo-600 text-white text-[10px] font-bold px-10 py-1.5 rotate-45 translate-x-10 translate-y-4 shadow-lg uppercase tracking-widest">
                    Best Value
                  </div>
                </div>
              )}
              
              <div className="mb-10">
                <div className="flex items-center gap-3 mb-4">
                  {plan.isPro ? <Crown className="w-6 h-6 text-indigo-400" /> : <Star className="w-6 h-6 text-slate-500" />}
                  <h3 className="text-2xl font-bold">{plan.name}</h3>
                </div>
                <p className="text-slate-400 text-sm leading-relaxed">{plan.description}</p>
              </div>

              <div className="mb-10">
                <div className="flex items-baseline gap-2">
                  <span className="text-5xl font-bold text-white">${plan.price}</span>
                  <span className="text-slate-500 font-medium">/month</span>
                </div>
              </div>
              
              <div className="space-y-5 mb-12 flex-1">
                {plan.features.map((feature, idx) => (
                  <div key={idx} className="flex items-start gap-4 text-slate-300">
                    <div className={`mt-1 flex-shrink-0 w-5 h-5 rounded-full flex items-center justify-center ${plan.isPro ? 'bg-indigo-500/10' : 'bg-white/5'}`}>
                      <Check className={`w-3 h-3 ${plan.isPro ? 'text-indigo-400' : 'text-slate-500'}`} />
                    </div>
                    <span className="text-sm font-medium">{feature}</span>
                  </div>
                ))}
              </div>

              <Link 
                to={plan.isPro ? "/checkout" : "/build"} 
                className={`w-full py-5 rounded-2xl font-bold transition-all duration-300 text-center flex items-center justify-center gap-3 group ${
                  plan.isPro 
                    ? 'bg-indigo-600 hover:bg-indigo-500 text-white shadow-xl shadow-indigo-600/20 active:scale-[0.98]' 
                    : 'bg-white/5 border border-white/10 hover:bg-white/10 text-white active:scale-[0.98]'
                }`}
              >
                {plan.btnText}
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </Link>
            </motion.div>
          ))}
        </div>

        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8 }}
          className="mt-20 text-center"
        >
          <p className="text-slate-500 text-sm flex items-center justify-center gap-2">
            <Shield className="w-4 h-4" /> 256-bit Secure Encryption • 14-Day Money Back Guarantee
          </p>
        </motion.div>
      </div>
    </div>
  );
};

export default Pricing;

