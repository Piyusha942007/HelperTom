import { Paperclip, Mic, Send } from 'lucide-react';
import { useState } from 'react';

export function ChatInput({ onSend }) {
  const [input, setInput] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (input.trim()) {
      onSend(input);
      setInput('');
    }
  };

  return (
    <div className="p-4 bg-gradient-to-t from-[#09090b] via-[#09090b]/90 to-transparent pt-10">
      <div className="max-w-4xl mx-auto relative">
        <form 
          onSubmit={handleSubmit}
          className="bg-[var(--color-surface)]/80 backdrop-blur-xl border border-white/10 rounded-2xl p-2 flex items-end gap-2 shadow-2xl focus-within:border-[var(--color-primary)]/50 transition-colors"
        >
          <button type="button" className="p-2.5 text-white/50 hover:text-white transition-colors rounded-xl hover:bg-white/5 flex-shrink-0 cursor-pointer">
            <Paperclip size={20} />
          </button>
          
          <textarea
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Ask NexAI anything..."
            className="flex-1 max-h-32 min-h-[44px] bg-transparent border-none outline-none resize-none py-2.5 text-white placeholder:text-white/40 scrollbar-hide"
            rows={1}
            onKeyDown={(e) => {
              if (e.key === 'Enter' && !e.shiftKey) {
                e.preventDefault();
                handleSubmit(e);
              }
            }}
          />
          
          <div className="flex items-center gap-1 flex-shrink-0">
            <button type="button" className="p-2.5 text-white/50 hover:text-white transition-colors rounded-xl hover:bg-white/5 cursor-pointer">
              <Mic size={20} />
            </button>
            <button 
              type="submit" 
              disabled={!input.trim()}
              className={`
                p-2.5 rounded-xl flex items-center justify-center transition-all cursor-pointer
                ${input.trim() 
                  ? 'bg-[var(--color-primary)] text-white shadow-[0_0_15px_rgba(139,92,246,0.4)] hover:bg-[var(--color-secondary)]' 
                  : 'bg-white/5 text-white/30'}
              `}
            >
              <Send size={18} className={input.trim() ? 'ml-0.5' : ''} />
            </button>
          </div>
        </form>
        <p className="text-center text-xs text-white/30 mt-3 font-medium">
          AI Assistant can make mistakes. Consider verifying important information.
        </p>
      </div>
    </div>
  );
}
