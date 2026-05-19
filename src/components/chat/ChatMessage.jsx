import { Sparkles, User } from 'lucide-react';
import { motion } from 'framer-motion';

export function ChatMessage({ message }) {
  const isUser = message.role === 'user';

  return (
    <motion.div 
      initial={{ opacity: 0, y: 10, scale: 0.98 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ duration: 0.3, ease: 'easeOut' }}
      className={`flex w-full ${isUser ? 'justify-end' : 'justify-start'} mb-6`}
    >
      <div className={`flex gap-4 max-w-[85%] md:max-w-[75%] ${isUser ? 'flex-row-reverse' : 'flex-row'}`}>
        
        {/* Avatar */}
        <div className={`
          flex-shrink-0 w-8 h-8 rounded-lg flex items-center justify-center
          ${isUser 
            ? 'bg-white/10 text-white' 
            : 'bg-[var(--color-primary)]/20 text-[var(--color-primary)] border border-[var(--color-primary)]/30 shadow-[0_0_10px_rgba(139,92,246,0.2)]'}
        `}>
          {isUser ? <User size={16} /> : <Sparkles size={16} />}
        </div>

        {/* Message Bubble */}
        <div className="flex flex-col gap-1.5 min-w-0">
          <div className={`flex items-center gap-2 ${isUser ? 'flex-row-reverse' : 'flex-row'}`}>
            <span className="text-sm font-medium text-white/80">{isUser ? 'You' : 'NexAI'}</span>
            <span className="text-xs text-white/40">{message.timestamp}</span>
          </div>
          
          <div className={`
            px-4 py-3 text-[15px] leading-relaxed relative
            ${isUser 
              ? 'bg-gradient-to-br from-[var(--color-primary)] to-[var(--color-secondary)] text-white rounded-2xl rounded-tr-sm shadow-[0_4px_15px_rgba(139,92,246,0.3)]' 
              : 'bg-[var(--color-surface)]/80 backdrop-blur-md border border-white/10 text-white/90 rounded-2xl rounded-tl-sm'}
          `}>
            {message.content}
          </div>
        </div>
      </div>
    </motion.div>
  );
}
