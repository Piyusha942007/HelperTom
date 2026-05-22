import { motion } from 'framer-motion';
import { LifeBuoy, Package } from 'lucide-react';

const OrderSupport = () => {
  return (
    <div className="p-4 lg:p-8 max-w-5xl mx-auto space-y-8">
      <div>
        <h1 className="text-3xl font-bold text-slate-900 mb-2">Order Support</h1>
        <p className="text-slate-500">Track orders and manage returns via AI.</p>
      </div>

      <motion.div 
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        className="grid grid-cols-1 md:grid-cols-2 gap-6"
      >
        <div className="bg-white border border-border rounded-2xl shadow-sm p-6">
           <div className="w-12 h-12 bg-blue-50 text-blue-500 rounded-xl flex items-center justify-center mb-4">
              <Package size={24} />
           </div>
           <h3 className="text-lg font-semibold text-slate-900 mb-2">Track an Order</h3>
           <p className="text-sm text-slate-500 mb-4">Enter your order ID to get real-time tracking updates directly from our AI system.</p>
           <button className="px-4 py-2 bg-slate-900 text-white rounded-lg text-sm font-medium w-full hover:bg-slate-800 transition-colors">Track Order</button>
        </div>
        
        <div className="bg-white border border-border rounded-2xl shadow-sm p-6">
           <div className="w-12 h-12 bg-emerald-50 text-emerald-500 rounded-xl flex items-center justify-center mb-4">
              <LifeBuoy size={24} />
           </div>
           <h3 className="text-lg font-semibold text-slate-900 mb-2">Initiate Return</h3>
           <p className="text-sm text-slate-500 mb-4">Not satisfied? Start a return process. Our AI will guide you through the policies.</p>
           <button className="px-4 py-2 bg-white border border-slate-200 text-slate-700 rounded-lg text-sm font-medium w-full hover:bg-slate-50 transition-colors">Start Return</button>
        </div>
      </motion.div>
    </div>
  );
};

export default OrderSupport;
