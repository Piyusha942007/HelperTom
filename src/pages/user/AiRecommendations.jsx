import { motion } from 'framer-motion';
import { Sparkles, ShoppingBag } from 'lucide-react';

const AiRecommendations = () => {
  return (
    <div className="p-4 lg:p-8 max-w-5xl mx-auto space-y-8">
      <div>
        <h1 className="text-3xl font-bold text-slate-900 mb-2">AI Recommendations</h1>
        <p className="text-slate-500">Products handpicked for you by our AI.</p>
      </div>

      <motion.div 
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
      >
        {[1, 2, 3].map((item) => (
          <div key={item} className="bg-white border border-border rounded-2xl shadow-sm overflow-hidden group">
            <div className="h-48 bg-slate-100 flex items-center justify-center group-hover:bg-slate-200 transition-colors">
               <ShoppingBag className="w-12 h-12 text-slate-300" />
            </div>
            <div className="p-5">
              <div className="flex items-center gap-1 text-primary text-xs font-semibold mb-2 bg-primary/10 w-fit px-2 py-1 rounded-md">
                <Sparkles size={12} /> AI Pick
              </div>
              <h3 className="font-semibold text-slate-900 mb-1">Premium Headphones {item}</h3>
              <p className="text-slate-500 text-sm mb-4">Based on your recent search for audio equipment.</p>
              <div className="flex items-center justify-between">
                <span className="font-bold text-lg text-slate-900">$299.00</span>
                <button className="text-sm font-medium text-white bg-slate-900 px-3 py-1.5 rounded-lg hover:bg-slate-800 transition-colors">View</button>
              </div>
            </div>
          </div>
        ))}
      </motion.div>
    </div>
  );
};

export default AiRecommendations;
