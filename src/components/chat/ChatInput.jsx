import { Send, Paperclip, Mic } from 'lucide-react';
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
    <div className="p-4">
      <div className="max-w-4xl mx-auto">
        {/* Suggested Prompts area can go above here if needed */}
        <form 
          onSubmit={handleSubmit}
          className="flex items-end gap-2 glass-panel border border-white/10 rounded-2xl p-2 shadow-lg focus-within:border-violet-500/50 focus-within:ring-1 focus-within:ring-violet-500/50 transition-all bg-slate-900/80"
        >
          <button type="button" className="p-2.5 text-slate-400 hover:text-white transition-colors">
            <Paperclip size={20} />
          </button>
          <textarea
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Type your message..."
            className="flex-1 max-h-32 min-h-[44px] bg-transparent border-none outline-none resize-none py-2.5 px-2 text-white placeholder:text-slate-500"
            rows={1}
            onKeyDown={(e) => {
              if (e.key === 'Enter' && !e.shiftKey) {
                e.preventDefault();
                handleSubmit(e);
              }
            }}
          />
          
          <button type="button" className="p-2.5 text-slate-400 hover:text-white transition-colors hidden sm:block">
            <Mic size={20} />
          </button>

          <button 
            type="submit" 
            disabled={!input.trim()}
            className={`
              p-2.5 rounded-xl flex items-center justify-center transition-all cursor-pointer
              ${input.trim() 
                ? 'bg-gradient-to-r from-violet-600 to-blue-600 text-white shadow-md shadow-violet-500/25 hover:from-violet-500 hover:to-blue-500' 
                : 'bg-white/5 text-slate-500'}
            `}
          >
            <Send size={18} className={input.trim() ? 'ml-0.5' : ''} />
          </button>
        </form>
      </div>
    </div>
  );
}
