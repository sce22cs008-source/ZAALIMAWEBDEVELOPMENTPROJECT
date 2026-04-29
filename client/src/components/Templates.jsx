import { motion, AnimatePresence } from 'framer-motion';
import { Eye, ArrowRight, Layout, Sparkles, Search, Filter, Bookmark, Star, Zap, Clock, ChevronRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useState } from 'react';

const Templates = () => {
  const [activeTab, setActiveTab] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');

  const categories = [
    { name: 'All', icon: <Layout className="w-4 h-4" /> },
    { name: 'Modern', icon: <Sparkles className="w-4 h-4" /> },
    { name: 'Clean', icon: <Zap className="w-4 h-4" /> },
    { name: 'Creative', icon: <Star className="w-4 h-4" /> },
    { name: 'Minimal', icon: <Filter className="w-4 h-4" /> },
    { name: 'Executive', icon: <Bookmark className="w-4 h-4" /> },
  ];

  const templates = [
    { id: 1, name: "Executive Slate", category: "Executive", type: "Premium", img: "https://images.unsplash.com/photo-1586281380349-632531db7ed4?auto=format&fit=crop&q=80&w=600" },
    { id: 2, name: "Atomic Professional", category: "Modern", type: "Free", img: "https://images.unsplash.com/photo-1544652478-6653e09f18a2?auto=format&fit=crop&q=80&w=600" },
    { id: 3, name: "Creative Edge", category: "Creative", type: "Premium", img: "https://images.unsplash.com/photo-1626197031507-c17099753214?auto=format&fit=crop&q=80&w=600" },
    { id: 4, name: "Classic Corporate", category: "Clean", type: "Free", img: "https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?auto=format&fit=crop&q=80&w=600" },
    { id: 5, name: "Minimalist Pro", category: "Minimal", type: "Premium", img: "https://images.unsplash.com/photo-1512485694743-9c9538b4e6e0?auto=format&fit=crop&q=80&w=600" },
    { id: 6, name: "Dark Knight", category: "Modern", type: "Premium", img: "https://images.unsplash.com/photo-1633356122544-f134324a6cee?auto=format&fit=crop&q=80&w=600" },
    { id: 7, name: "Vanguard Elite", category: "Executive", type: "Premium", img: "https://images.unsplash.com/photo-1603201667141-5a2d4c673378?auto=format&fit=crop&q=80&w=600" },
    { id: 8, name: "Synergy Flow", category: "Creative", type: "Free", img: "https://images.unsplash.com/photo-1434030216411-0b793f4b4173?auto=format&fit=crop&q=80&w=600" },
  ];

  const filteredTemplates = templates.filter(t => 
    (activeTab === 'All' || t.category === activeTab) &&
    t.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-dark-bg flex pt-24 relative overflow-hidden">
      {/* Sidebar for Categories - Canva Style */}
      <aside className="w-72 border-r border-white/5 p-8 hidden lg:block overflow-y-auto">
        <h2 className="text-xl font-bold mb-8 flex items-center gap-2">
          <Layout className="w-5 h-5 text-indigo-400" /> Templates
        </h2>
        
        <div className="space-y-2">
          {categories.map((cat) => (
            <button
              key={cat.name}
              onClick={() => setActiveTab(cat.name)}
              className={`w-full flex items-center justify-between px-4 py-3 rounded-xl text-sm font-medium transition-all ${
                activeTab === cat.name 
                  ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-600/20' 
                  : 'text-slate-400 hover:bg-white/5 hover:text-white'
              }`}
            >
              <div className="flex items-center gap-3">
                {cat.icon}
                {cat.name}
              </div>
              <ChevronRight className={`w-4 h-4 transition-transform ${activeTab === cat.name ? 'rotate-90' : ''}`} />
            </button>
          ))}
        </div>

        <div className="mt-12 p-6 glass-card bg-indigo-600/5 border-indigo-500/20">
          <h4 className="text-xs font-bold uppercase tracking-widest text-indigo-400 mb-2">Pro Tip</h4>
          <p className="text-[10px] text-slate-500 leading-relaxed italic">
            "Templates with the Premium badge offer 15% higher ATS scores on average."
          </p>
        </div>
      </aside>

      {/* Main Content Area */}
      <main className="flex-1 p-8 lg:p-12 overflow-y-auto bg-grid">
        <div className="max-w-7xl mx-auto">
          {/* Header & Search */}
          <header className="flex flex-col md:flex-row justify-between items-start md:items-center mb-16 gap-8">
            <div>
              <h1 className="text-4xl font-black mb-3 italic tracking-tight">Design <span className="neon-text">Studio</span></h1>
              <p className="text-slate-400 font-medium">Select a canvas to start your career masterpiece.</p>
            </div>
            
            <div className="relative w-full md:w-96 group">
              <Search className="absolute left-5 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-500 group-focus-within:text-indigo-400 transition-colors" />
              <input 
                type="text" 
                placeholder="Search styles (e.g. Minimal, Tech)..."
                className="input-field pl-14"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
          </header>

          {/* Template Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 gap-8">
            <AnimatePresence mode="popLayout">
              {filteredTemplates.map((temp, i) => (
                <motion.div 
                  key={temp.id}
                  layout
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  transition={{ duration: 0.3, delay: i * 0.05 }}
                  className="group relative"
                >
                  <div className="glass-card overflow-hidden bg-slate-900 aspect-[3/4] relative">
                    <img 
                      src={temp.img} 
                      alt={temp.name} 
                      className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110 opacity-80 group-hover:opacity-100" 
                    />
                    
                    {/* Hover Actions */}
                    <div className="absolute inset-0 bg-black/60 backdrop-blur-[2px] opacity-0 group-hover:opacity-100 transition-all duration-300 flex flex-col items-center justify-center p-8 gap-4">
                      <Link 
                        to="/build" 
                        className="w-full py-4 bg-indigo-600 text-white rounded-2xl font-bold text-center shadow-xl shadow-indigo-600/30 hover:bg-indigo-500 transition-all scale-90 group-hover:scale-100 duration-500"
                      >
                        Customize Template
                      </Link>
                      <button className="w-full py-4 bg-white/10 text-white rounded-2xl font-bold text-center border border-white/10 hover:bg-white/20 transition-all scale-90 group-hover:scale-100 duration-500 flex items-center justify-center gap-2">
                        <Eye className="w-4 h-4" /> Quick Preview
                      </button>
                    </div>

                    {/* Type Badge */}
                    <div className="absolute top-4 right-4">
                      <div className={`px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest backdrop-blur-md border ${
                        temp.type === 'Premium' 
                          ? 'bg-amber-500/20 text-amber-400 border-amber-500/30' 
                          : 'bg-white/10 text-white border-white/20'
                      }`}>
                        {temp.type}
                      </div>
                    </div>
                  </div>

                  <div className="mt-6 flex justify-between items-start px-2">
                    <div>
                      <h3 className="text-lg font-bold text-white group-hover:text-indigo-400 transition-colors">{temp.name}</h3>
                      <p className="text-xs text-slate-500 font-medium flex items-center gap-2 mt-1">
                        <Clock className="w-3 h-3" /> Updated 2d ago • {temp.category}
                      </p>
                    </div>
                    <button className="p-2 text-slate-500 hover:text-white transition-colors">
                      <Bookmark className="w-5 h-5" />
                    </button>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>

          {/* Empty State */}
          {filteredTemplates.length === 0 && (
            <div className="flex flex-col items-center justify-center py-40 text-center">
              <div className="w-20 h-20 bg-white/5 rounded-3xl flex items-center justify-center mb-6 border border-white/5">
                <Search className="w-10 h-10 text-slate-600" />
              </div>
              <h3 className="text-2xl font-bold text-white mb-2">No templates found</h3>
              <p className="text-slate-500">Try adjusting your search or category filters.</p>
              <button 
                onClick={() => {setActiveTab('All'); setSearchQuery('');}}
                className="mt-8 text-indigo-400 font-bold hover:underline"
              >
                Clear all filters
              </button>
            </div>
          )}
        </div>
      </main>
    </div>
  );
};

export default Templates;

