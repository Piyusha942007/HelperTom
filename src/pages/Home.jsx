import { Link } from 'react-router-dom';
import { Bot, Sparkles, Zap, Shield, ChevronRight } from 'lucide-react';

export function Home() {
  return (
    <div className="min-h-screen bg-[#0f172a] text-slate-100 font-sans selection:bg-violet-500/30">
      {/* Navbar */}
      <nav className="fixed w-full z-50 glass-panel border-b border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-violet-500 to-blue-500 text-white flex items-center justify-center font-bold shadow-lg shadow-violet-500/30">
                HT
              </div>
              <span className="font-bold text-xl tracking-tight text-white">HelperTom</span>
            </div>
            <div className="flex items-center gap-4">
              <Link to="/login" className="text-slate-300 hover:text-white transition-colors text-sm font-medium">
                Admin Login
              </Link>
              <Link to="/chat" className="bg-white text-slate-900 px-4 py-2 rounded-full text-sm font-medium hover:bg-slate-200 transition-colors shadow-[0_0_15px_rgba(255,255,255,0.3)] hover:shadow-[0_0_25px_rgba(255,255,255,0.5)]">
                Try Demo
              </Link>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative pt-32 pb-20 lg:pt-48 lg:pb-32 overflow-hidden">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-violet-500/20 rounded-full blur-[120px] pointer-events-none"></div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-violet-500/30 bg-violet-500/10 text-violet-300 text-sm font-medium mb-8">
            <Sparkles size={16} />
            <span>Next-Gen AI Customer Support</span>
          </div>
          <h1 className="text-5xl lg:text-7xl font-extrabold tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-white via-slate-200 to-slate-400 mb-6">
            Intelligent Support,<br />Automated.
          </h1>
          <p className="text-lg lg:text-xl text-slate-400 max-w-2xl mx-auto mb-10 leading-relaxed">
            Elevate your customer experience with an AI platform that understands context, retrieves documents instantly, and resolves queries in seconds.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link to="/chat" className="flex items-center gap-2 bg-gradient-to-r from-violet-600 to-blue-600 text-white px-8 py-4 rounded-full text-lg font-medium hover:from-violet-500 hover:to-blue-500 transition-all shadow-lg shadow-violet-500/25 hover:shadow-violet-500/40 w-full sm:w-auto justify-center">
              Start Chatting <ChevronRight size={20} />
            </Link>
            <Link to="/admin" className="flex items-center gap-2 bg-white/5 border border-white/10 hover:bg-white/10 text-white px-8 py-4 rounded-full text-lg font-medium transition-all w-full sm:w-auto justify-center">
              View Dashboard
            </Link>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-slate-900/50 border-t border-white/5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-white mb-4">Powerful Features</h2>
            <p className="text-slate-400">Everything you need to deliver world-class support.</p>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                icon: Bot,
                title: "AI-Powered Responses",
                desc: "Natural, context-aware conversations that feel incredibly human."
              },
              {
                icon: Zap,
                title: "Instant Retrieval",
                desc: "RAG architecture ensures factual answers directly from your docs."
              },
              {
                icon: Shield,
                title: "Secure & Analytics",
                desc: "Enterprise-grade security with deep insights into user queries."
              }
            ].map((feat, i) => (
              <div key={i} className="glass-panel p-8 rounded-2xl hover:bg-white/[0.03] transition-colors border border-white/10">
                <div className="w-12 h-12 bg-violet-500/20 text-violet-400 rounded-xl flex items-center justify-center mb-6 shadow-inner shadow-white/10">
                  <feat.icon size={24} />
                </div>
                <h3 className="text-xl font-semibold text-white mb-3">{feat.title}</h3>
                <p className="text-slate-400 leading-relaxed">
                  {feat.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
